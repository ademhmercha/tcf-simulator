import { prisma } from "@/lib/db";
import { DEFAULT_SCORING_PROFILE } from "@/config/scoring";
import { examConfig } from "@/config/site";
import { type Level, type SectionType } from "@/config/enums";
import { unstable_cache } from "next/cache";
import type { AttemptResult, AttemptSummary, ExamPayload, TestSummary } from "@/lib/types";
import {
  buildAttemptResult,
  grade,
  type AnswerRow,
  type GradeInput,
} from "@/server/services/grading";

// ---------------------------------------------------------------------------
// Service des tentatives d'examen.
//
// Regles fondamentales :
//
//  1. LE SERVEUR EST L'AUTORITE SUR LE TEMPS.
//     Le chronometre est GLOBAL : `expiresAt` vaut `startedAt + 60 min` et est
//     recopie a l'identique sur chaque SectionRun de la tentative. Il n'est
//     jamais modifie par le client, et passer a l'epreuve suivante ne rend
//     aucun temps. Chaque lecture recalcule le temps restant a partir de
//     `expiresAt` et de l'horloge serveur.
//
//  2. AUCUNE BONNE REPONSE NE PART VERS LE CLIENT.
//     Les requetes de l'epreuve utilisent des `select` explicites ou
//     omettent `Option.isCorrect`.
//
//  3. ECRITURES IDEMPOTENTES.
//     Les reponses sont upsert sur (attemptId, questionId).
// ---------------------------------------------------------------------------

/** Relations necessaires au calcul d'un resultat. */
const RESULT_INCLUDE = {
  test: { select: { id: true, title: true, slug: true } },
  sectionRuns: { include: { section: true } },
  answers: {
    include: {
      question: { include: { options: true, document: true, section: true } },
    },
  },
} as const;

/**
 * Lit `Attempt.focusedQuestionIds`.
 *
 * Retourne `null` pour une tentative normale (toutes les questions de la
 * section sont jouables) et un `Set` de questions pour une reprise ciblee.
 * Une valeur corrompue est treatee comme « pas de filtre » afin de ne jamais
 * bloquer un candidat sur une donnee de base invalide.
 */
function parseFocusedQuestionIds(raw: string | null): Set<string> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return new Set(parsed.filter((value): value is string => typeof value === "string"));
  } catch {
    return null;
  }
}

type ResultRow = {
  id: string;
  status: string;
  startedAt: Date;
  finishedAt: Date | null;
  scoringProfile: string | null;
  focusedQuestionIds: string | null;
  structureScore: number | null;
  comprehensionScore: number | null;
  totalScore: number | null;
  maxScore: number | null;
  cefrLevel: string | null;
  test: { id: string; title: string; slug: string };
  sectionRuns: Array<{
    id: string;
    sectionId: string;
    status: string;
    score: number | null;
    maxScore: number | null;
    section: {
      id: string;
      type: string;
      title: string;
      order: number;
      durationMinutes: number;
    };
  }>;
  answers: AnswerRow[];
};

export class AttemptError extends Error {
  constructor(
    message: string,
    readonly code:
      | "NOT_FOUND"
      | "FORBIDDEN"
      | "EXPIRED"
      | "ALREADY_SUBMITTED"
      | "NO_QUESTIONS"
      | "VALIDATION",
  ) {
    super(message);
    this.name = "AttemptError";
  }
}

// ============================ Lecture des donnees ========================

/**
 * Donnees minimales d'un test pour la liste et la fiche detail.
 *
 * Aucun niveau CECRL n'est lu ici : les questions ne sont comptees que pour
 * `_count`, la difficulte reste cote serveur.
 */
const TEST_INCLUDE = {
  sections: {
    orderBy: { order: "asc" as const },
    include: {
      _count: { select: { questions: true, documents: true } },
    },
  },
} as const;

type TestRow = {
  id: string;
  code: string | null;
  title: string;
  slug: string;
  description: string | null;
  order: number;
  isPublished: boolean;
  durationMinutes: number | null;
  sections: Array<{
    id: string;
    type: string;
    title: string;
    instructions: string | null;
    durationMinutes: number;
    order: number;
    _count: { questions: number; documents: number };
  }>;
};

type AttemptLight = {
  id: string;
  testId: string;
  status: string;
  totalScore: number | null;
  maxScore: number | null;
  cefrLevel: string | null;
  sectionRuns: Array<{ sectionId: string; expiresAt: Date; status: string }>;
};

function toTestSummary(test: TestRow, attempts: AttemptLight[]): TestSummary {
  const now = Date.now();

  let inProgressAttemptId: string | null = null;
  let inProgressSectionId: string | null = null;
  let inProgressRemainingMs: number | null = null;

  for (const attempt of attempts) {
    if (attempt.status !== "IN_PROGRESS") continue;
    const run = attempt.sectionRuns.find(
      (r) => r.status === "IN_PROGRESS" && r.expiresAt.getTime() > now,
    );
    if (!run) continue;
    inProgressAttemptId = attempt.id;
    inProgressSectionId = run.sectionId;
    inProgressRemainingMs = run.expiresAt.getTime() - now;
    break;
  }

  let bestTotalScore: number | null = null;
  let bestMaxScore: number | null = null;
  let bestLevel: Level | null = null;
  let bestAttemptId: string | null = null;
  for (const attempt of attempts) {
    if (attempt.status !== "SUBMITTED") continue;
    if (attempt.totalScore === null || attempt.maxScore === null) continue;
    if (bestTotalScore === null || attempt.totalScore > bestTotalScore) {
      bestTotalScore = attempt.totalScore;
      bestMaxScore = attempt.maxScore;
      bestLevel = (attempt.cefrLevel as Level | null) ?? null;
      bestAttemptId = attempt.id;
    }
  }

  return {
    id: test.id,
    slug: test.slug,
    title: test.title,
    description: test.description,
    order: test.order,
    // Budget global unique : c'est lui qui pilote le chronometre et l'affichage.
    // Les durees par epreuve en base sont ignorees (duree indicative de contenu).
    durationMinutes: examConfig.totalDurationMinutes,
    questionCount: test.sections.reduce((sum, s) => sum + s._count.questions, 0),
    sections: [...test.sections]
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        id: s.id,
        type: s.type as SectionType,
        title: s.title,
        instructions: s.instructions,
        durationMinutes: s.durationMinutes,
        questionCount: s._count.questions,
        order: s.order,
        documentCount: s._count.documents,
      })),
    attemptCount: attempts.length,
    bestTotalScore,
    bestMaxScore,
    bestLevel,
    bestAttemptId,
    inProgressAttemptId,
    inProgressSectionId,
    inProgressRemainingMs,
  };
}

/**
 * Catalogue des tests publies, mis en cache.
 *
 * Cette requete charge les sections, leurs compteurs de questions et de
 * documents, ainsi que le niveau de chaque question : c'est la lecture la
 * plus lourdes du site, et son resultat ne depend que du contenu. Elle est
 * donc isolee dans une fonction `unstable_cache` pour ne pas etre rejouee a
 * chaque affichage.
 *
 * La progression de l'utilisateur n'est PAS dans le cache : elle est lue
 * ensuite, en direct, et fusionnee par `toTestSummary`.
 *
 * `npm run db:seed` et les imports de contenu ecrivent en base depuis un
 * script, hors du serveur : ils ne peuvent pas invalider le cache. La fenetre
 * de revalidation absorbe donc ce decalage.
 */
const CATALOG_REVALIDATE_SECONDS = 300;

const getPublishedTestRows = unstable_cache(
  async (): Promise<TestRow[]> => {
    const rows = await prisma.test.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc" },
      include: TEST_INCLUDE,
    });
    return rows as unknown as TestRow[];
  },
  ["published-test-rows"],
  { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ["tests"] },
);

/** Fiche d'un test publie, avec la meme fenetre de cache que le catalogue. */
const getPublishedTestRowBySlug = unstable_cache(
  async (slug: string): Promise<TestRow | null> => {
    const row = await prisma.test.findUnique({ where: { slug }, include: TEST_INCLUDE });
    return (row as unknown as TestRow | null) ?? null;
  },
  ["published-test-row-by-slug"],
  { revalidate: CATALOG_REVALIDATE_SECONDS, tags: ["tests"] },
);

export async function getPublishedTests(userId?: string): Promise<TestSummary[]> {
  const tests = await getPublishedTestRows();

  if (!userId) return tests.map((test) => toTestSummary(test, []));

  const attempts = await prisma.attempt.findMany({
    where: { userId, testId: { in: tests.map((t) => t.id) } },
    select: {
      id: true,
      testId: true,
      status: true,
      totalScore: true,
      maxScore: true,
      cefrLevel: true,
      sectionRuns: {
        where: { status: "IN_PROGRESS" },
        select: { sectionId: true, expiresAt: true, status: true },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  const byTest = new Map<string, AttemptLight[]>();
  for (const attempt of attempts) {
    const list = byTest.get(attempt.testId) ?? [];
    list.push(attempt);
    byTest.set(attempt.testId, list);
  }

  return tests.map((test) => toTestSummary(test, byTest.get(test.id) ?? []));
}

export async function getTestBySlug(slug: string): Promise<TestSummary | null> {
  const test = await getPublishedTestRowBySlug(slug);
  return test ? toTestSummary(test, []) : null;
}

// ============================ Demarrage d'une tentative ==================

/**
 * Echeance unique d'une tentative.
 *
 * Le chronometre est global : les epreuves se partagent le meme budget, fixe a
 * la creation de la tentative. Enregistrer `expiresAt` sur chaque SectionRun
 * avec cette valeur autorise toujours le serveur a trancher, tout en
 * garantissant qu'aucun passage dans une epreuve ne rend du temps.
 */
function globalDeadline(startedAt: Date): Date {
  return new Date(startedAt.getTime() + examConfig.totalDurationMinutes * 60_000);
}

/**
 * Cree la tentative et demarre la premiere epreuve (Structure).
 * Si une tentative IN_PROGRESS non expiree existe deja, elle est renvoyee :
 * un double clic sur « Commencer » ne doit jamais creer de doublon.
 */
export async function startAttempt(userId: string, testId: string): Promise<string> {
  const test = await prisma.test.findUnique({
    where: { id: testId },
    include: { sections: { orderBy: { order: "asc" } } },
  });
  if (!test || !test.isPublished) throw new AttemptError("Test introuvable", "NOT_FOUND");

  const existing = await findResumableAttempt(userId, testId);
  if (existing) return existing.id;

  const firstSection = test.sections[0];
  if (!firstSection) throw new AttemptError("Ce test ne comporte aucune epreuve", "NO_QUESTIONS");

  const now = new Date();
  const attempt = await prisma.attempt.create({
    data: {
      userId,
      testId,
      status: "IN_PROGRESS",
      startedAt: now,
      scoringProfile: DEFAULT_SCORING_PROFILE.id,
    },
    select: { id: true },
  });

  await prisma.sectionRun.create({
    data: {
      attemptId: attempt.id,
      sectionId: firstSection.id,
      status: "IN_PROGRESS",
      startedAt: now,
      expiresAt: globalDeadline(now),
    },
  });

  return attempt.id;
}

/** Tentative non expiree ; si toutes les epreuves sont terminees, la finalise. */
export async function findResumableAttempt(userId: string, testId: string) {
  const attempt = await prisma.attempt.findFirst({
    where: { userId, testId, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
    include: { sectionRuns: true },
  });
  if (!attempt) return null;

  const now = Date.now();
  const live = attempt.sectionRuns.find(
    (run) => run.status === "IN_PROGRESS" && run.expiresAt.getTime() > now,
  );
  if (live) return attempt;

  await finalizeAttempt(attempt.id);
  return null;
}

// ============================ Chargement de l'epreuve ====================

/**
 * Charge utile d'examen.
 *
 * `select` explicite : `isCorrect` n'apparait dans aucune requete de cette
 * fonction. Le client ne recoit que `id`, `label` et `text` des propositions.
 */
export async function getExamPayload(userId: string, sectionRunId: string): Promise<ExamPayload> {
  const sectionRun = await prisma.sectionRun.findUnique({
    where: { id: sectionRunId },
    select: {
      id: true,
      attemptId: true,
      sectionId: true,
      status: true,
      expiresAt: true,
      attempt: { select: { userId: true, focusedQuestionIds: true } },
    },
  });

  if (!sectionRun) throw new AttemptError("Epreuve introuvable", "NOT_FOUND");
  if (sectionRun.attempt.userId !== userId) throw new AttemptError("Acces refuse", "FORBIDDEN");

  if (sectionRun.expiresAt.getTime() <= Date.now()) {
    await expireSectionRun(sectionRun.id, sectionRun.attemptId);
    throw new AttemptError("Temps ecoule", "EXPIRED");
  }
  if (sectionRun.status !== "IN_PROGRESS") {
    throw new AttemptError("Cette epreuve est terminee", "ALREADY_SUBMITTED");
  }

  const section = await prisma.section.findUnique({
    where: { id: sectionRun.sectionId },
    select: {
      id: true,
      testId: true,
      type: true,
      title: true,
      instructions: true,
      documents: { orderBy: { order: "asc" } },
    },
  });
  if (!section) throw new AttemptError("Epreuve introuvable", "NOT_FOUND");

  const test = await prisma.test.findUnique({
    where: { id: section.testId },
    select: { title: true, sections: { orderBy: { order: "asc" }, select: { id: true } } },
  });
  if (!test) throw new AttemptError("Test introuvable", "NOT_FOUND");

  // Tentative ciblee « refaire mes erreurs » : on ne charge que ces questions.
  const focus = parseFocusedQuestionIds(sectionRun.attempt.focusedQuestionIds);

  const questions = await prisma.question.findMany({
    where: {
      sectionId: section.id,
      ...(focus ? { id: { in: [...focus] } } : {}),
    },
    orderBy: { number: "asc" },
    select: {
      id: true,
      number: true,
      prompt: true,
      points: true,
      documentId: true,
      category: true,
      // SELECT STRICT : aucune bonne reponse envoyee au client, et AUCUN
      // niveau CECRL. Le candidat ne doit pas pouvoir deduire la difficulte
      // d'une question (le champ `level` resterait lisible dans le payload).
      options: {
        orderBy: { label: "asc" },
        select: { id: true, label: true, text: true },
      },
    },
  });

  if (questions.length === 0) {
    throw new AttemptError("Aucune question dans cette epreuve", "NO_QUESTIONS");
  }

  const answers = await prisma.answer.findMany({
    where: {
      attemptId: sectionRun.attemptId,
      questionId: { in: questions.map((q) => q.id) },
    },
    select: { questionId: true, selectedOptionId: true, flagged: true },
  });
  const answerByQuestion = new Map(answers.map((a) => [a.questionId, a]));

  const orderedIds = test.sections.map((s) => s.id);
  const sectionIndex = orderedIds.indexOf(section.id);

  const usedDocumentIds = [...new Set(questions.map((q) => q.documentId).filter(Boolean))] as string[];

  return {
    sectionRunId: sectionRun.id,
    attemptId: sectionRun.attemptId,
    testId: section.testId,
    testTitle: test.title,
    sectionId: section.id,
    sectionType: section.type as SectionType,
    sectionTitle: section.title,
    sectionIndex: sectionIndex === -1 ? 0 : sectionIndex,
    sectionCount: orderedIds.length,
    instructions: section.instructions,
    expiresAt: sectionRun.expiresAt.getTime(),
    serverNow: Date.now(),
    documents: section.documents
      .filter((d) => usedDocumentIds.length === 0 || usedDocumentIds.includes(d.id))
      .map((d) => ({
        id: d.id,
        // Pas de `code` : certains codes internes encodent le niveau CECRL
        // du document (T1-C1-01). Le candidat voit « Document 3 / 10 ».
        title: d.title,
        content: d.content,
        imageUrl: d.imageUrl,
        order: d.order,
      })),
    questions: questions.map((q) => {
      const answer = answerByQuestion.get(q.id);
      return {
        id: q.id,
        number: q.number,
        prompt: q.prompt,
        // Pas de `level` : la difficulte CECRL ne doit jamais atteindre le client.
        points: q.points,
        documentId: q.documentId,
        category: q.category,
        options: q.options,
        selectedOptionId: answer?.selectedOptionId ?? null,
        flagged: answer?.flagged ?? false,
      };
    }),
    restored: answers.length > 0,
  };
}

// ============================ Sauvegarde des reponses ====================

export interface SaveAnswerInput {
  userId: string;
  sectionRunId: string;
  questionId: string;
  selectedOptionId: string | null;
  flagged: boolean;
  timeSpentSec?: number;
}

export interface SaveAnswerResult {
  saved: boolean;
  expiresAt: number;
  serverNow: number;
  expiresSoon: boolean;
}

/**
 * Enregistre une reponse. Le serveur verifie toujours :
 *   - la propriete de la tentative ;
 *   - que l'epreuve est encore dans les temps ;
 *   - que la question ET l'option appartiennent a cette euvre.
 *
 * Si le temps est ecoule, l'epreuve est automatiquement soumise et une
 * erreur `EXPIRED` est levee : le client bascule alors sur l'ecran de resultats.
 */
export async function saveAnswer(input: SaveAnswerInput): Promise<SaveAnswerResult> {
  const sectionRun = await prisma.sectionRun.findUnique({
    where: { id: input.sectionRunId },
    select: {
      id: true,
      attemptId: true,
      sectionId: true,
      status: true,
      expiresAt: true,
      attempt: { select: { userId: true, focusedQuestionIds: true } },
    },
  });

  if (!sectionRun) throw new AttemptError("Epreuve introuvable", "NOT_FOUND");
  if (sectionRun.attempt.userId !== input.userId) {
    throw new AttemptError("Acces refuse", "FORBIDDEN");
  }

  const now = Date.now();
  const deadline = sectionRun.expiresAt.getTime();

  if (deadline <= now || sectionRun.status !== "IN_PROGRESS") {
    await expireSectionRun(sectionRun.id, sectionRun.attemptId);
    throw new AttemptError("Temps ecoule", "EXPIRED");
  }

  // Une reprise ciblee ne rejoue qu'un sous-ensemble de questions : le serveur
  // refuse donc toute reponse hors de cette liste, meme si la question
  // appartient bien a la meme section.
  const focus = parseFocusedQuestionIds(sectionRun.attempt.focusedQuestionIds);
  if (focus && !focus.has(input.questionId)) {
    throw new AttemptError("Question hors du perimetre de la reprise", "VALIDATION");
  }

  // La question doit exister ET appartenir a CETTE epreuve. Cette verification
  // est obligatoire meme sans option choisie : sinon une question inexistante
  // provoquerait une violation de cle etrangere au lieu d'une erreur propre.
  const question = await prisma.question.findFirst({
    where: { id: input.questionId, sectionId: sectionRun.sectionId },
    select: { id: true },
  });
  if (!question) {
    throw new AttemptError("Question hors de cette epreuve", "VALIDATION");
  }

  const option = input.selectedOptionId
    ? await prisma.option.findFirst({
        where: {
          id: input.selectedOptionId,
          // L'option doit bien etre proposee par CETTE question.
          questionId: input.questionId,
        },
        select: { id: true, isCorrect: true },
      })
    : null;

  if (input.selectedOptionId && !option) {
    throw new AttemptError("Proposition invalide", "VALIDATION");
  }

  await prisma.answer.upsert({
    where: {
      attemptId_questionId: { attemptId: sectionRun.attemptId, questionId: input.questionId },
    },
    create: {
      attemptId: sectionRun.attemptId,
      questionId: input.questionId,
      selectedOptionId: option?.id ?? null,
      isCorrect: option?.isCorrect ?? false,
      flagged: input.flagged,
      timeSpentSec: input.timeSpentSec ?? 0,
    },
    update: {
      selectedOptionId: option?.id ?? null,
      isCorrect: option?.isCorrect ?? false,
      flagged: input.flagged,
      ...(input.timeSpentSec !== undefined ? { timeSpentSec: input.timeSpentSec } : {}),
    },
  });

  return {
    saved: true,
    expiresAt: sectionRun.expiresAt.getTime(),
    serverNow: Date.now(),
    expiresSoon: deadline - now <= examConfig.timerWarnings.critical * 1000,
  };
}

/** Resynchronise l'horloge du client avec le serveur. */
export async function getClock(sectionRunId: string, userId: string) {
  const sectionRun = await prisma.sectionRun.findUnique({
    where: { id: sectionRunId },
    select: {
      id: true,
      attemptId: true,
      status: true,
      expiresAt: true,
      attempt: { select: { userId: true } },
    },
  });
  if (!sectionRun || sectionRun.attempt.userId !== userId) return null;

  const remainingMs = Math.max(0, sectionRun.expiresAt.getTime() - Date.now());

  if (remainingMs === 0 && sectionRun.status === "IN_PROGRESS") {
    await expireSectionRun(sectionRun.id, sectionRun.attemptId);
  }

  return {
    serverNow: Date.now(),
    expiresAt: sectionRun.expiresAt.getTime(),
    remainingMs,
    status: sectionRun.status,
  };
}

// ============================ Soumission / expiration ====================

async function expireSectionRun(sectionRunId: string, attemptId: string): Promise<void> {
  await prisma.sectionRun.updateMany({
    where: { id: sectionRunId, status: "IN_PROGRESS" },
    data: { status: "EXPIRED", finishedAt: new Date() },
  });
  await advanceAttempt(attemptId);
}

/**
 * Soumet une epreuve puis enchainе sur la suivante si elle existe.
 * Retourne l'identifiant de la prochaine SectionRun, ou null si le test est
 * termine (tentative finalisee et corrigee).
 */
export async function submitSection(userId: string, sectionRunId: string): Promise<string | null> {
  const sectionRun = await prisma.sectionRun.findUnique({
    where: { id: sectionRunId },
    select: {
      id: true,
      attemptId: true,
      status: true,
      attempt: { select: { userId: true } },
    },
  });

  if (!sectionRun) throw new AttemptError("Epreuve introuvable", "NOT_FOUND");
  if (sectionRun.attempt.userId !== userId) throw new AttemptError("Acces refuse", "FORBIDDEN");

  await prisma.sectionRun.updateMany({
    where: { id: sectionRunId, status: "IN_PROGRESS" },
    data: { status: "SUBMITTED", finishedAt: new Date() },
  });

  return advanceAttempt(sectionRun.attemptId);
}

/**
 * Apres chaque fin d'epreuve :
 *  - si une epreuve reste, cree/reactive sa SectionRun avec sa propre echeance ;
 *  - sinon finalise la tentative (score + niveau CECRL).
 */
async function advanceAttempt(attemptId: string): Promise<string | null> {
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    select: {
      id: true,
      startedAt: true,
      focusedQuestionIds: true,
      test: { select: { sections: { orderBy: { order: "asc" } } } },
      sectionRuns: { select: { id: true, sectionId: true, status: true, expiresAt: true } },
    },
  });
  if (!attempt) return null;

  const now = Date.now();

  const live = attempt.sectionRuns.find(
    (run) => run.status === "IN_PROGRESS" && run.expiresAt.getTime() > now,
  );
  if (live) return live.id;

  const done = new Set(
    attempt.sectionRuns.filter((r) => r.status !== "IN_PROGRESS").map((r) => r.sectionId),
  );

  // Pour une tentative ciblee, seules les epreuves contenant des erreurs
  // a retraiter existent.
  let candidates = attempt.test.sections.filter((s) => !done.has(s.id));

  const focus = parseFocusedQuestionIds(attempt.focusedQuestionIds);
  if (focus) {
    const withErrors = await prisma.question.findMany({
      where: { id: { in: [...focus] } },
      select: { sectionId: true },
      distinct: ["sectionId"],
    });
    const relevant = new Set(withErrors.map((q) => q.sectionId));
    candidates = candidates.filter((s) => relevant.has(s.id));
  }

  const next = candidates[0];
  if (!next) {
    await finalizeAttempt(attemptId);
    return null;
  }

  const existing = attempt.sectionRuns.find((r) => r.sectionId === next.id);
  // Meme echeance que la premiere epreuve : le budget de 60 minutes est global.
  const expiresAt = globalDeadline(attempt.startedAt);

  if (existing) {
    await prisma.sectionRun.update({
      where: { id: existing.id },
      data: { status: "IN_PROGRESS", expiresAt },
    });
    return existing.id;
  }

  const created = await prisma.sectionRun.create({
    data: {
      attemptId,
      sectionId: next.id,
      status: "IN_PROGRESS",
      startedAt: new Date(now),
      expiresAt,
    },
    select: { id: true },
  });
  return created.id;
}

// ============================ Finalisation et correction =================

async function loadResultRow(attemptId: string, userId?: string): Promise<ResultRow | null> {
  const row = await prisma.attempt.findFirst({
    where: { id: attemptId, ...(userId ? { userId } : {}) },
    include: RESULT_INCLUDE,
  });
  return row as unknown as ResultRow | null;
}

function toGradeInput(row: ResultRow): GradeInput {
  return {
    attempt: {
      id: row.id,
      status: row.status,
      startedAt: row.startedAt,
      finishedAt: row.finishedAt,
      test: row.test,
    },
    sectionRuns: row.sectionRuns
      .filter((run) => run.status !== "IN_PROGRESS")
      .map((run) => ({
        sectionId: run.sectionId,
        type: run.section.type,
        title: run.section.title,
        order: run.section.order,
        durationMinutes: run.section.durationMinutes,
      })),
    answers: row.answers,
  };
}

/** Calcule et persiste le score global et le niveau CECRL. */
export async function finalizeAttempt(attemptId: string): Promise<void> {
  const row = await loadResultRow(attemptId);
  if (!row) return;

  const output = grade(toGradeInput(row));

  const scoreUpdates = row.sectionRuns
    .filter((run) => run.status !== "IN_PROGRESS")
    .map((run) => {
      const score = output.sectionScores.get(run.sectionId);
      return prisma.sectionRun.update({
        where: { id: run.id },
        data: { score: score?.score ?? 0, maxScore: score?.maxScore ?? 0 },
      });
    });

  await prisma.$transaction([
    ...scoreUpdates,
    prisma.attempt.update({
      where: { id: attemptId },
      data: {
        status: "SUBMITTED",
        finishedAt: row.finishedAt ?? new Date(),
        structureScore: output.structureCorrect,
        comprehensionScore: output.comprehensionCorrect,
        totalScore: output.totalScore,
        maxScore: output.maxScore,
        cefrLevel: output.cefrLevel,
        scoringProfile: output.scoringProfile,
      },
    }),
  ]);
}

export async function getAttemptResult(
  userId: string,
  attemptId: string,
): Promise<AttemptResult | null> {
  const row = await loadResultRow(attemptId, userId);
  if (!row) return null;

  // Une tentative encore en cours n'est pas corrigee.
  if (row.status === "IN_PROGRESS") return null;

  const input = toGradeInput(row);
  return buildAttemptResult(input, grade(input));
}

/** Etat d'une tentative pour la page de detail (utilise par le dashboard). */
export async function getAttemptState(userId: string, attemptId: string) {
  return prisma.attempt.findFirst({
    where: { id: attemptId, userId },
    select: {
      id: true,
      status: true,
      focusedQuestionIds: true,
      test: { select: { id: true, title: true, slug: true } },
      sectionRuns: {
        orderBy: { createdAt: "asc" },
        select: { id: true, status: true, expiresAt: true, sectionId: true },
      },
    },
  });
}

// ============================ Historique ================================

export async function getAttemptHistory(userId: string): Promise<AttemptSummary[]> {
  const attempts = await prisma.attempt.findMany({
    where: { userId, status: { in: ["SUBMITTED", "EXPIRED"] } },
    orderBy: { startedAt: "desc" },
    select: {
      id: true,
      status: true,
      startedAt: true,
      finishedAt: true,
      totalScore: true,
      maxScore: true,
      structureScore: true,
      comprehensionScore: true,
      cefrLevel: true,
      test: { select: { id: true, title: true, slug: true, order: true } },
      answers: { select: { timeSpentSec: true } },
    },
  });

  return attempts.map((attempt) => ({
    id: attempt.id,
    testId: attempt.test.id,
    testTitle: attempt.test.title,
    testSlug: attempt.test.slug,
    testOrder: attempt.test.order,
    status: attempt.status,
    startedAt: attempt.startedAt.toISOString(),
    finishedAt: attempt.finishedAt?.toISOString() ?? null,
    totalScore: attempt.totalScore,
    maxScore: attempt.maxScore,
    structureCorrect: attempt.structureScore,
    comprehensionCorrect: attempt.comprehensionScore,
    cefrLevel: attempt.cefrLevel as Level | null,
    totalTimeSec: attempt.answers.reduce((sum, a) => sum + (a.timeSpentSec ?? 0), 0),
  }));
}

// ============================ Refaire mes erreurs =======================

/**
 * Cree une tentative ciblee sur les questions ratees d'une tentative
 * precedente. La liste exacte est memorisee dans
 * `Attempt.focusedQuestionIds` : l'epreuve ne charge alors que ces questions.
 */
export async function retryMistakes(userId: string, attemptId: string): Promise<string> {
  const source = await prisma.attempt.findFirst({
    where: { id: attemptId, userId },
    select: {
      id: true,
      testId: true,
      status: true,
      answers: {
        where: { isCorrect: false },
        select: { questionId: true, question: { select: { sectionId: true } } },
      },
    },
  });

  if (!source) throw new AttemptError("Tentative introuvable", "NOT_FOUND");
  if (source.status === "IN_PROGRESS") {
    throw new AttemptError("Cette tentative est encore en cours", "ALREADY_SUBMITTED");
  }

  const questionIds = [...new Set(source.answers.map((a) => a.questionId))];
  if (questionIds.length === 0) {
    throw new AttemptError("Aucune erreur a retraiter", "NO_QUESTIONS");
  }

  const sections = await prisma.section.findMany({
    where: { id: { in: [...new Set(source.answers.map((a) => a.question.sectionId))] } },
    orderBy: { order: "asc" },
    select: { id: true },
  });

  if (sections.length === 0) throw new AttemptError("Aucune epreuve a retraiter", "NO_QUESTIONS");

  const now = new Date();
  const attempt = await prisma.attempt.create({
    data: {
      userId,
      testId: source.testId,
      status: "IN_PROGRESS",
      startedAt: now,
      scoringProfile: DEFAULT_SCORING_PROFILE.id,
      focusedQuestionIds: JSON.stringify(questionIds),
    },
    select: { id: true },
  });

  const first = sections[0]!;
  await prisma.sectionRun.create({
    data: {
      attemptId: attempt.id,
      sectionId: first.id,
      status: "IN_PROGRESS",
      startedAt: now,
      expiresAt: globalDeadline(now),
    },
  });

  return attempt.id;
}

/** Nombre de questions ratees dans une tentative (libelle du bouton). */
export async function countMistakes(userId: string, attemptId: string): Promise<number> {
  return prisma.answer.count({
    where: { attemptId, isCorrect: false, attempt: { userId } },
  });
}
