import { prisma } from "@/lib/db";
import { DEFAULT_SCORING_PROFILE, computeSectionScore } from "@/config/scoring";
import { examConfig } from "@/config/site";
import { type Level, type SectionType, type TestKind } from "@/config/enums";
import { unstable_cache } from "next/cache";
import type { AttemptResult, AttemptSummary, ExamPayload, TestSummary } from "@/lib/types";
import { parseFocusedQuestionIds } from "@/lib/focused";
import {
  buildAttemptResult,
  grade,
  mistakeQuestionIds,
  type AnswerRow,
  type GradeInput,
} from "@/server/services/grading";

// ---------------------------------------------------------------------------
// Service des tentatives d'examen.
//
// Regles fondamentales :
//
//  1. LE SERVEUR EST L'AUTORITE SUR LE TEMPS.
//     Serie d'entrainement (PRACTICE) : le chronometre est GLOBAL,
//     `expiresAt = startedAt + 60 min`, recopie sur chaque SectionRun ; passer
//     a l'epreuve suivante ne rend aucun temps.
//     Examen blanc (FULL) : chaque epreuve a son propre chronometre
//     (`startedAt + duree de l'epreuve`), comme au TCF. Aucune valeur de temps
//     n'est jamais acceptee depuis le client : chaque lecture recalcule le
//     temps restant a partir de `expiresAt` et de l'horloge serveur.
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
  test: {
    select: {
      id: true,
      title: true,
      slug: true,
      kind: true,
      // Nombre de questions par epreuve : c'est le denominateur affiche
      // (« 16 / 20 »), y compris pour une reprise ciblee sur les erreurs.
      sections: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          type: true,
          title: true,
          order: true,
          durationMinutes: true,
          _count: { select: { questions: true } },
        },
      },
    },
  },
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
  test: {
    id: string;
    title: string;
    slug: string;
    kind: string;
    sections: Array<{
      id: string;
      type: string;
      title: string;
      order: number;
      durationMinutes: number;
      _count: { questions: number };
    }>;
  };
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
  kind: string;
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
  sectionRuns: Array<{
    sectionId: string;
    expiresAt: Date;
    status: string;
    score: number | null;
    maxScore: number | null;
  }>;
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

  const bestAttempt =
    bestAttemptId === null ? null : attempts.find((attempt) => attempt.id === bestAttemptId) ?? null;

  // Detail par epreuve de la meilleure tentative : les cartes d'examen peuvent
  // ainsi afficher les trois notes sans requete supplementaire.
  const bestSections = bestAttempt
    ? [...test.sections]
        .sort((a, b) => a.order - b.order)
        .flatMap((section) => {
          const run = bestAttempt.sectionRuns.find(
            (candidate) =>
              candidate.sectionId === section.id &&
              candidate.status !== "IN_PROGRESS" &&
              candidate.score !== null &&
              candidate.maxScore !== null &&
              candidate.maxScore > 0,
          );
          if (!run || run.score === null || run.maxScore === null) return [];
          return [
            {
              type: section.type as SectionType,
              scaledScore: computeSectionScore(run.score, run.maxScore),
              correct: run.score,
              total: run.maxScore,
            },
          ];
        })
    : [];

  const kind = test.kind as TestKind;

  // Un examen blanc se joue epreuve par epreuve (25 + 20 + 45 min) : le budget
  // affiche est la somme des durees. Une serie d'entrainement conserve le
  // chronometre global unique de 60 minutes.
  const durationMinutes =
    kind === "FULL"
      ? test.sections.reduce((sum, section) => sum + section.durationMinutes, 0)
      : examConfig.totalDurationMinutes;

  return {
    id: test.id,
    slug: test.slug,
    title: test.title,
    description: test.description,
    order: test.order,
    kind,
    durationMinutes,
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
    bestSections,
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

export async function getPublishedTests(
  userId?: string,
  kind?: TestKind,
): Promise<TestSummary[]> {
  const allTests = await getPublishedTestRows();
  const tests = kind ? allTests.filter((test) => test.kind === kind) : allTests;

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
        select: {
          sectionId: true,
          expiresAt: true,
          status: true,
          score: true,
          maxScore: true,
        },
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

export async function getTestBySlug(
  slug: string,
  kind?: TestKind,
): Promise<TestSummary | null> {
  const test = await getPublishedTestRowBySlug(slug);
  if (!test) return null;
  if (kind && test.kind !== kind) return null;
  return toTestSummary(test, []);
}

// ============================ Demarrage d'une tentative ==================

/**
 * Echeance d'ouverture d'une epreuve.
 *
 * - `PRACTICE` : budget global unique, ancre sur le debut de la tentative. Le
 *   changement d'epreuve ne redemarre pas le chronometre.
 * - `FULL` : chaque epreuve dispose de sa duree propre, a partir du moment ou
 *   elle s'ouvre (25 min de CO, puis 20 min de structure, puis 45 min de CE).
 *
 * Le temps n'est jamais calcule ni transmis par le client : cette fonction est
 * la seule source de `SectionRun.expiresAt`.
 */
function sectionDeadline(
  kind: TestKind,
  section: { durationMinutes: number },
  attemptStartedAt: Date,
  openedAt: Date,
): Date {
  if (kind === "FULL") {
    return new Date(openedAt.getTime() + section.durationMinutes * 60_000);
  }
  return new Date(attemptStartedAt.getTime() + examConfig.totalDurationMinutes * 60_000);
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
      expiresAt: sectionDeadline(test.kind as TestKind, firstSection, now, now),
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

  // Plus aucune epreuve ouverte et valide : on enchaine sur la suivante. Pour
  // un examen blanc, cela evite qu'un candidat revenu apres l'expiration de la
  // comprehension orale soit jete sur l'ecran de resultats alors que la
  // structure et la comprehension ecrite restent a passer. `advanceAttempt`
  // finalise de lui-meme si le budget global d'une serie d'entrainement est
  // epuise ou si toutes les epreuves ont ete jouees.
  await advanceAttempt(attempt.id);

  const resumed = await prisma.attempt.findUnique({
    where: { id: attempt.id },
    include: { sectionRuns: true },
  });
  if (!resumed || resumed.status !== "IN_PROGRESS") return null;
  return resumed;
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
      // Comprehension orale : seul le chemin de l'audio est expose. La
      // transcription reste en base et n'est lue que par les corriges.
      audioUrl: true,
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
        audioUrl: q.audioUrl,
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
      test: { select: { kind: true, sections: { orderBy: { order: "asc" } } } },
      sectionRuns: { select: { id: true, sectionId: true, status: true, expiresAt: true } },
    },
  });
  if (!attempt) return null;

  const now = Date.now();

  const live = attempt.sectionRuns.find(
    (run) => run.status === "IN_PROGRESS" && run.expiresAt.getTime() > now,
  );
  if (live) return live.id;

  // Une epreuve laissee ouverte apres son echeance doit compter comme jouee :
  // sinon `advanceAttempt` la rouvrirait avec une nouvelle echeance, offrant un
  // temps infini a qui quitte la page sans soumettre (examen blanc).
  const stale = attempt.sectionRuns.filter(
    (run) => run.status === "IN_PROGRESS" && run.expiresAt.getTime() <= now,
  );
  if (stale.length > 0) {
    await prisma.sectionRun.updateMany({
      where: { id: { in: stale.map((run) => run.id) } },
      data: { status: "EXPIRED", finishedAt: new Date(now) },
    });
  }

  const done = new Set(
    attempt.sectionRuns
      .filter((run) => run.status !== "IN_PROGRESS" || run.expiresAt.getTime() <= now)
      .map((run) => run.sectionId),
  );

  // Tentative ciblee « refaire mes erreurs » : seules les epreuves contenant des
  // erreurs a retraiter existent.
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

  // Serie d'entrainement : meme echeance que la premiere epreuve, le budget de
  // 60 minutes est global. Examen blanc : nouvelle epreuve, nouveau chrono.
  const kind = attempt.test.kind as TestKind;
  const expiresAt = sectionDeadline(kind, next, attempt.startedAt, new Date(now));

  // Le budget global est epuise (serie d'entrainement). Ouvrir l'epreuve
  // suivante avec cette echeance deja depassee livrerait au candidat une page
  // qui expire aussitot, qui renverrait a son tour vers les resultats : une
  // chaine de pages et d'ecritures inutiles pour un examen dont le temps est
  // fini. On finalise.
  if (expiresAt.getTime() <= now) {
    await finalizeAttempt(attemptId);
    return null;
  }

  const existing = attempt.sectionRuns.find((r) => r.sectionId === next.id);
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
  const sections = row.test.sections.map((section) => ({
    sectionId: section.id,
    type: section.type,
    title: section.title,
    order: section.order,
    durationMinutes: section.durationMinutes,
    questionCount: section._count.questions,
  }));

  return {
    attempt: {
      id: row.id,
      status: row.status,
      startedAt: row.startedAt,
      finishedAt: row.finishedAt,
      test: row.test,
    },
    // Le bareme porte sur toutes les epreuves du test, reprise comprise.
    sections,
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
        listeningScore: output.listeningCorrect,
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
      listeningScore: true,
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
    listeningCorrect: attempt.listeningScore,
    structureCorrect: attempt.structureScore,
    comprehensionCorrect: attempt.comprehensionScore,
    cefrLevel: attempt.cefrLevel as Level | null,
    totalTimeSec: attempt.answers.reduce((sum, a) => sum + (a.timeSpentSec ?? 0), 0),
  }));
}

// ============================ Refaire mes erreurs =======================

/**
 * Questions a retraiter, pour plusieurs tentatives en une seule lecture.
 *
 * Source unique de verite partagee par `retryMistakes`, `countMistakes` et le
 * compteur d'erreurs de l'administration : les trois affichages doivent dire la
 * meme chose, et une question non traitee y compte comme une erreur. `userId`
 * restreint la lecture aux tentatives du candidat.
 */
export async function mistakeQuestionIdsByAttempt(
  attemptIds: string[],
  userId?: string,
): Promise<Map<string, string[]>> {
  const result = new Map<string, string[]>();
  if (attemptIds.length === 0) return result;

  const attempts = await prisma.attempt.findMany({
    where: { id: { in: attemptIds }, ...(userId ? { userId } : {}) },
    select: {
      id: true,
      focusedQuestionIds: true,
      sectionRuns: { where: { status: { not: "IN_PROGRESS" } }, select: { sectionId: true } },
    },
  });

  const playedByAttempt = new Map<string, string[]>(
    attempts.map((attempt) => [
      attempt.id,
      [...new Set(attempt.sectionRuns.map((run) => run.sectionId))],
    ]),
  );

  const allSectionIds = [...new Set([...playedByAttempt.values()].flat())];

  const questions = allSectionIds.length
    ? await prisma.question.findMany({
        where: { sectionId: { in: allSectionIds } },
        select: { id: true, sectionId: true },
      })
    : [];

  const correctRows = attempts.length
    ? await prisma.answer.findMany({
        where: { attemptId: { in: attempts.map((a) => a.id) }, isCorrect: true },
        select: { attemptId: true, questionId: true },
      })
    : [];

  const correctByAttempt = new Map<string, Set<string>>();
  for (const row of correctRows) {
    const set = correctByAttempt.get(row.attemptId) ?? new Set<string>();
    set.add(row.questionId);
    correctByAttempt.set(row.attemptId, set);
  }

  for (const attempt of attempts) {
    result.set(
      attempt.id,
      mistakeQuestionIds({
        sectionIds: playedByAttempt.get(attempt.id) ?? [],
        questions,
        focus: parseFocusedQuestionIds(attempt.focusedQuestionIds),
        correctIds: correctByAttempt.get(attempt.id) ?? new Set<string>(),
      }),
    );
  }

  return result;
}

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
      test: { select: { kind: true } },
      sectionRuns: { where: { status: { not: "IN_PROGRESS" } }, select: { sectionId: true } },
    },
  });

  if (!source) throw new AttemptError("Tentative introuvable", "NOT_FOUND");
  if (source.status === "IN_PROGRESS") {
    throw new AttemptError("Cette tentative est encore en cours", "ALREADY_SUBMITTED");
  }

  const scope = await mistakeQuestionIdsByAttempt([attemptId], userId);
  const questionIds = scope.get(attemptId) ?? [];
  if (questionIds.length === 0) {
    throw new AttemptError("Aucune erreur a retraiter", "NO_QUESTIONS");
  }

  const sections = await prisma.section.findMany({
    where: { id: { in: [...new Set(source.sectionRuns.map((run) => run.sectionId))] } },
    orderBy: { order: "asc" },
    select: { id: true, durationMinutes: true },
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
      expiresAt: sectionDeadline(source.test.kind as TestKind, first, now, now),
    },
  });

  return attempt.id;
}

/** Nombre de questions ratees dans une tentative (libelle du bouton). */
export async function countMistakes(userId: string, attemptId: string): Promise<number> {
  const scope = await mistakeQuestionIdsByAttempt([attemptId], userId);
  return (scope.get(attemptId) ?? []).length;
}
