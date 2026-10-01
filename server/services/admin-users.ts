import "server-only";

import type { Prisma } from "@prisma/client";
import { z } from "zod";

import { LEVELS, ROLES, isLevel, levelIndex, type Level, type Role } from "@/config/enums";
import { prisma, textSearch } from "@/lib/db";
import type { AdminWriteError } from "@/lib/admin-errors";

// ---------------------------------------------------------------------------
// Administration des comptes.
//
// REGLES DE SECURITE APPLICABLES A TOUT CE FICHIER
//
//  1. « AUCUN ADMIN NE PEUT SE SUPPRIMER NI SE RETIRE SON PROPRE ROLE ».
//     Sans cette garde, un administrateur unique se verrouille hors de la
//     plateforme et il ne reste que la ligne de commande pour intervenir.
//
//  2. « LE DERNIER ADMINISTRATEUR EST INTROUVABLE ». Toute operation qui
//     laisserait zero administrateur est refusee.
//
//  3. Les ecritures passent par des ecritures conditionnelles (compare-and-set)
//     plutot que par un `update` suivi d'une verification : l'etat attendu est
//     alors verifie et l'ecriture appliquees dans la meme instruction SQL, ce
//     qui ferme la fenetre entre la lecture et l'ecriture (TOCTOU).
//
//  4. L'autorite reelle est revalidee en base par `requireAdminActor()` avant
//     d'appeler ces fonctions : le role inscrit dans le JWT ne suffit jamais.
//
//  5. Le detail des reponses d'un candidat est masque par defaut. Il n'est
//     produit que par `getAttemptAnswersForAdmin()`, dont l'appel est trace.
//
// PORTEE REELLE DE LA REGLE « DERNIER ADMINISTRATEUR »
//
// Ce qui garantit « au moins un administrateur » n'est pas le compte, c'est
// `FORBIDDEN_SELF` : un acteur ne peut pas se cibler lui-meme, et il est
// verifie ADMIN en base juste avant. Toute cible distincte laisse donc au moins
// l'acteur.
//
// Consequence : la branche `LAST_ADMIN` (`admins <= 1`) est INATTEIGNABLE en
// invocation sequentielle. Elle est conservee comme filet, mais elle ne protege
// pas du risque reel, qui est la DEMUTUALISATION CONCURRENTE : deux
// administrateurs A et B se retrogradant au meme instant lisent chacun
// `admins = 2` et reussissent tous les deux, laissant zero administrateur.
//
// Fermer ce trou demande un verrou (serialisable, ou verrouillage applicatif par
// nom de ligne) et sort du cadre de cette fonction. A traiter si le risque est
// juge acceptable ; en attendant, ne pas presenter ce compte comme une garantie.
// ---------------------------------------------------------------------------

// ------------------------------ Constantes -------------------------------

export const USERS_PER_PAGE = 20;

const SORTS = ["recent", "name", "attempts"] as const;
export type UserSort = (typeof SORTS)[number];

/** Tentatives listees sur la fiche d'un candidat. */
const USER_ATTEMPTS_TAKE = 25;

/** Points faibles affiches sur la fiche d'un candidat. */
const WEAK_POINTS_TAKE = 15;

// ------------------------------- Liste -----------------------------------

export const USER_LIST_SCHEMA = z.object({
  page: z.coerce.number().int().min(1).max(10_000).catch(1),
  q: z.string().trim().max(120).catch(""),
  /** `ALL` est une meta-valeur : aucun compte ne porte reellement ce role. */
  filter: z.enum(["ALL", "USER", "ADMIN"]).catch("ALL"),
  sort: z.enum(SORTS).catch("recent"),
});

/**
 * Type de sortie du schema : c'est lui qui est manipule ensuite.
 *
 * `z.input` decrit ce que le parseur ACCEPTE (donc `unknown` pour un nombre
 * converti par `coerce`), pas ce qu'il PRODUIT. Utiliser le mauvais des deux
 * ferait transiter des `unknown` jusqu'a Prisma.
 */
export type UserListInput = z.output<typeof USER_LIST_SCHEMA>;

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  lastActivityAt: string | null;
  attempts: number;
  submitted: number;
  /** Score moyen sur le bareme TCF, ou null si aucune tentative notee. */
  avgScore: number | null;
  avgPercentage: number | null;
  bestScore: number | null;
}

export interface AdminUserList {
  rows: AdminUserRow[];
  total: number;
  page: number;
  perPage: number;
  pageCount: number;
}

const USER_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
} satisfies Prisma.UserSelect;

interface UserAggregate {
  attempts: number;
  submitted: number;
  lastActivityAt: Date | null;
  avgScore: number | null;
  avgMax: number | null;
  bestScore: number | null;
}

/**
 * Liste paginee des comptes, avec leurs statistiques.
 *
 * Les compteurs ne sont PAS obtenus par `include: { attempts }` : charger les
 * tentatives d'une page pour les agreger en JS reviendrait a ramener des
 * milliers de lignes en memoire. Deux `groupBy` suffisent, servis par les index
 * `[userId, startedAt]` et `[status]` de `Attempt`, combines a l'egalite de
 * `userId`.
 */
export async function listUsers(input: UserListInput): Promise<AdminUserList> {
  const perPage = USERS_PER_PAGE;

  const where: Prisma.UserWhereInput = {
    ...(input.filter === "ALL" ? {} : { role: input.filter }),
    ...(input.q
      ? { OR: [{ name: textSearch(input.q) }, { email: textSearch(input.q) }] }
      : {}),
  };

  // Tri integralement en SQL : la pagination reste donc coherente d'une page a
  // l'autre, ce qu'un tri en JS sur la page courante ne garantirait pas.
  const orderBy: Prisma.UserOrderByWithRelationInput = (() => {
    switch (input.sort) {
      case "name":
        return { name: "asc" };
      case "attempts":
        return { attempts: { _count: "desc" } };
      default:
        return { createdAt: "desc" };
    }
  })();

  const total = await prisma.user.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  // Une page hors borne (suite d'un filtre qui a retreci la base) ne doit pas
  // renvoyer une page vide : on la recadre.
  const page = Math.min(input.page, pageCount);

  const users = await prisma.user.findMany({
    where,
    orderBy,
    skip: (page - 1) * perPage,
    take: perPage,
    select: USER_SELECT,
  });

  const ids = users.map((user) => user.id);
  const aggregates = ids.length
    ? await loadUserAggregates(ids)
    : new Map<string, UserAggregate>();

  return {
    rows: users.map((user) => toAdminUserRow(user, aggregates.get(user.id))),
    total,
    page,
    perPage,
    pageCount,
  };
}

async function loadUserAggregates(ids: string[]): Promise<Map<string, UserAggregate>> {
  const [all, scored] = await Promise.all([
    prisma.attempt.groupBy({
      by: ["userId"],
      where: { userId: { in: ids } },
      _count: { _all: true },
      _max: { startedAt: true },
    }),
    prisma.attempt.groupBy({
      by: ["userId"],
      where: { userId: { in: ids }, status: "SUBMITTED", totalScore: { not: null } },
      _count: { _all: true },
      _avg: { totalScore: true, maxScore: true },
      _max: { totalScore: true },
    }),
  ]);

  const scoredByUser = new Map(
    scored.map((row) => [
      row.userId,
      {
        submitted: row._count._all,
        avgScore: row._avg.totalScore,
        avgMax: row._avg.maxScore,
        bestScore: row._max.totalScore,
      },
    ]),
  );

  return new Map(
    all.map((row) => {
      const aggregate = scoredByUser.get(row.userId);
      return [
        row.userId,
        {
          attempts: row._count._all,
          submitted: aggregate?.submitted ?? 0,
          lastActivityAt: row._max.startedAt,
          avgScore: aggregate?.avgScore ?? null,
          avgMax: aggregate?.avgMax ?? null,
          bestScore: aggregate?.bestScore ?? null,
        } satisfies UserAggregate,
      ];
    }),
  );
}

function toAdminUserRow(
  user: { id: string; name: string; email: string; role: string; createdAt: Date },
  aggregate: UserAggregate | undefined,
): AdminUserRow {
  const avgScore = aggregate?.avgScore ?? null;
  const avgMax = aggregate?.avgMax ?? null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    createdAt: user.createdAt.toISOString(),
    lastActivityAt: aggregate?.lastActivityAt?.toISOString() ?? null,
    attempts: aggregate?.attempts ?? 0,
    submitted: aggregate?.submitted ?? 0,
    avgScore: avgScore === null ? null : Math.round(avgScore),
    avgPercentage:
      avgScore !== null && avgMax ? Math.round((avgScore / avgMax) * 1000) / 10 : null,
    bestScore: aggregate?.bestScore ?? null,
  };
}

// ------------------------------- Detail ----------------------------------

export interface AdminUserAttempt {
  id: string;
  testId: string;
  testTitle: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  /** Duree totale de la tentative, en secondes, ou null si en cours. */
  durationSec: number | null;
  totalScore: number | null;
  maxScore: number | null;
  structureScore: number | null;
  comprehensionScore: number | null;
  cefrLevel: Level | null;
  /** Nombre de questions ratees (portee du bouton « revoir mes erreurs »). */
  mistakes: number;
}

export interface AdminUserWeakPoint {
  questionId: string;
  code: string | null;
  prompt: string;
  level: string;
  category: string | null;
  testTitle: string;
  seen: number;
  failed: number;
  /** Taux de reussite du candidat sur cette question, entre 0 et 1. */
  ratio: number;
}

export interface AdminUserCategoryStat {
  category: string;
  responses: number;
  correct: number;
  ratio: number;
}

export interface AdminUserDetail {
  id: string;
  name: string;
  email: string;
  role: Role;
  locale: string;
  createdAt: string;
  emailVerified: string | null;
  stats: {
    attempts: number;
    submitted: number;
    inProgress: number;
    /** Temps de reponse cumule sur toutes les tentatives, en secondes. */
    totalTimeSec: number;
    avgScore: number | null;
    avgPercentage: number | null;
    bestScore: number | null;
    bestLevel: Level | null;
    avgLevel: Level | null;
    lastActivityAt: string | null;
  };
  attempts: AdminUserAttempt[];
  weakPoints: AdminUserWeakPoint[];
  byCategory: AdminUserCategoryStat[];
}

/**
 * Fiche d'un candidat.
 *
 * AUCUNE reponse n'est renvoyee ici : uniquement des compteurs agreges et des
 * scores. Le detail des choix effectues passe obligatoirement par
 * `getAttemptAnswersForAdmin()`, qui est trace dans le journal d'administration.
 */
export async function getUserDetail(userId: string): Promise<AdminUserDetail | null> {
  const [
    user,
    activityAgg,
    scoreAgg,
    bestAttempt,
    statusGroups,
    attempts,
    timeAgg,
    levelGroups,
    perQuestion,
    failures,
  ] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          locale: true,
          createdAt: true,
          emailVerified: true,
        },
      }),
      prisma.attempt.aggregate({
        where: { userId },
        _count: { _all: true },
        _max: { startedAt: true },
      }),
      prisma.attempt.aggregate({
        where: { userId, status: "SUBMITTED", totalScore: { not: null } },
        _max: { totalScore: true },
        _avg: { totalScore: true, maxScore: true },
      }),
      // Meilleure tentative : son CEFR doit venir de la tentative qui a obtenu
      // CE SCORE, pas des 25 dernieres. Les deux peuvent etre des tentatives
      // differentes, sinon le niveau affiche serait faux.
      prisma.attempt.findFirst({
        where: { userId, status: "SUBMITTED", totalScore: { not: null } },
        orderBy: { totalScore: "desc" },
        select: { cefrLevel: true },
      }),
      prisma.attempt.groupBy({
        by: ["status"],
        where: { userId },
        _count: { _all: true },
      }),
      prisma.attempt.findMany({
        where: { userId },
        orderBy: { startedAt: "desc" },
        take: USER_ATTEMPTS_TAKE,
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
          test: { select: { id: true, title: true } },
        },
      }),
      prisma.answer.aggregate({
        where: { attempt: { userId } },
        _sum: { timeSpentSec: true },
      }),
      prisma.attempt.groupBy({
        by: ["cefrLevel"],
        where: { userId, status: "SUBMITTED", cefrLevel: { not: null } },
        _count: { _all: true },
      }),
      // Points faibles : uniquement des compteurs, jamais le choix du candidat.
      prisma.answer.groupBy({
        by: ["questionId"],
        where: { attempt: { userId, status: "SUBMITTED" } },
        _count: { _all: true },
      }),
      prisma.answer.groupBy({
        by: ["questionId"],
        where: { attempt: { userId, status: "SUBMITTED" }, isCorrect: false },
        _count: { _all: true },
      }),
    ]);

  if (!user) return null;

  const statusCount = (status: string): number =>
    statusGroups.find((group) => group.status === status)?._count._all ?? 0;

  const attemptIds = attempts.map((attempt) => attempt.id);
  const mistakeCounts =
    attemptIds.length > 0 ? await countMistakesByAttempt(attemptIds) : new Map<string, number>();

  const failuresByQuestion = new Map(failures.map((row) => [row.questionId, row._count._all]));
  const responsesByQuestion = new Map(
    perQuestion.map((row) => [row.questionId, row._count._all]),
  );

  // Les metadonnees sont chargees pour TOUTES les questions vues, pas seulement
  // les ratees : le profil par competence doit decrire l'ensemble des reponses du
  // candidat. Sinon une competence ou il reussit toujours n'apparaitrait pas, et
  // le graphique donnerait l'impression qu'il ne l'a jamais travaillee.
  const answeredQuestionIds = [...responsesByQuestion.keys()];
  const questionMeta =
    answeredQuestionIds.length > 0
      ? await prisma.question.findMany({
          where: { id: { in: answeredQuestionIds } },
          select: {
            id: true,
            code: true,
            prompt: true,
            level: true,
            category: true,
            section: { select: { test: { select: { title: true } } } },
          },
        })
      : [];

  const metaByQuestion = new Map(questionMeta.map((question) => [question.id, question]));

  const weakPoints: AdminUserWeakPoint[] = [];
  const categoryBuckets = new Map<string, { responses: number; correct: number }>();

  for (const [questionId, seen] of responsesByQuestion) {
    const meta = metaByQuestion.get(questionId);
    if (!meta) continue;

    const failed = failuresByQuestion.get(questionId) ?? 0;

    const category = meta.category?.trim();
    if (category) {
      const bucket = categoryBuckets.get(category) ?? { responses: 0, correct: 0 };
      bucket.responses += seen;
      bucket.correct += seen - failed;
      categoryBuckets.set(category, bucket);
    }

    // Point faible uniquement si le candidat s'est trompe au moins une fois.
    if (failed === 0) continue;

    weakPoints.push({
      questionId,
      code: meta.code,
      prompt: meta.prompt,
      level: meta.level,
      category: meta.category,
      testTitle: meta.section.test.title,
      seen,
      failed,
      ratio: seen > 0 ? (seen - failed) / seen : 0,
    });
  }

  weakPoints.sort((a, b) => a.ratio - b.ratio || b.seen - a.seen);

  const avgScore = scoreAgg._avg.totalScore;
  const avgMax = scoreAgg._avg.maxScore;
  const bestScore = scoreAgg._max.totalScore;
  const bestLevel = bestAttempt?.cefrLevel;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as Role,
    locale: user.locale,
    createdAt: user.createdAt.toISOString(),
    emailVerified: user.emailVerified?.toISOString() ?? null,
    stats: {
      attempts: activityAgg._count._all,
      submitted: statusCount("SUBMITTED"),
      inProgress: statusCount("IN_PROGRESS"),
      totalTimeSec: timeAgg._sum.timeSpentSec ?? 0,
      avgScore: avgScore === null ? null : Math.round(avgScore),
      avgPercentage:
        avgScore !== null && avgMax ? Math.round((avgScore / avgMax) * 1000) / 10 : null,
      bestScore,
      bestLevel: bestLevel && isLevel(bestLevel) ? bestLevel : null,
      avgLevel: averageLevelOf(levelGroups),
      lastActivityAt: activityAgg._max.startedAt?.toISOString() ?? null,
    },
    attempts: attempts.map((attempt) => ({
      id: attempt.id,
      testId: attempt.test.id,
      testTitle: attempt.test.title,
      status: attempt.status,
      startedAt: attempt.startedAt.toISOString(),
      finishedAt: attempt.finishedAt?.toISOString() ?? null,
      durationSec: attempt.finishedAt
        ? Math.round((attempt.finishedAt.getTime() - attempt.startedAt.getTime()) / 1000)
        : null,
      totalScore: attempt.totalScore,
      maxScore: attempt.maxScore,
      structureScore: attempt.structureScore,
      comprehensionScore: attempt.comprehensionScore,
      cefrLevel:
        attempt.cefrLevel && isLevel(attempt.cefrLevel) ? attempt.cefrLevel : null,
      mistakes: mistakeCounts.get(attempt.id) ?? 0,
    })),
    weakPoints: weakPoints.slice(0, WEAK_POINTS_TAKE),
    byCategory: [...categoryBuckets.entries()]
      .map(([category, bucket]) => ({
        category,
        responses: bucket.responses,
        correct: bucket.correct,
        ratio: bucket.responses > 0 ? bucket.correct / bucket.responses : 0,
      }))
      .sort((a, b) => b.responses - a.responses)
      .slice(0, 12),
  };
}

async function countMistakesByAttempt(attemptIds: string[]): Promise<Map<string, number>> {
  const rows = await prisma.answer.groupBy({
    by: ["attemptId"],
    where: { attemptId: { in: attemptIds }, isCorrect: false },
    _count: { _all: true },
  });
  return new Map(rows.map((row) => [row.attemptId, row._count._all]));
}

/**
 * Niveau moyen obtenu sur les tentatives notees.
 *
 * Comme dans `admin-stats`, c'est une moyenne d'indices : une tendance, pas un
 * niveau certifie.
 */
function averageLevelOf(
  groups: Array<{ cefrLevel: string | null; _count: { _all: number } }>,
): Level | null {
  const levels = groups.flatMap((group) =>
    group.cefrLevel && isLevel(group.cefrLevel)
      ? Array<Level>(group._count._all).fill(group.cefrLevel)
      : [],
  );
  if (levels.length === 0) return null;
  const mean = levels.reduce((sum, level) => sum + levelIndex(level), 0) / levels.length;
  return LEVELS[Math.min(Math.round(mean), LEVELS.length - 1)] ?? null;
}

// ------------- Consultation tracee du detail des reponses -----------------

export interface AdminAnswerRow {
  questionId: string;
  questionNumber: number;
  prompt: string;
  level: string;
  category: string | null;
  sectionTitle: string;
  selectedOptionId: string | null;
  selectedLabel: string | null;
  selectedText: string | null;
  correctOptionId: string;
  correctLabel: string | null;
  correctText: string | null;
  isCorrect: boolean;
  flagged: boolean;
  timeSpentSec: number | null;
}

export type RevealAnswersResult =
  | { ok: true; attemptId: string; answers: AdminAnswerRow[] }
  | { ok: false; error: "NOT_FOUND" };

/**
 * Detail des reponses d'UNE tentative.
 *
 * Fonction distincte de `getUserDetail` et volontairement glyphee : c'est le
 * seul point du code ou les choix du candidat remontent vers le navigateur d'un
 * administrateur. L'appelant doit avoir revale le role ET trace l'evenement.
 *
 * `userId` n'est pas optionnel : la tentative est recherchee dans le perimetre
 * du candidat, ce qui empeche d'extraire les reponses d'un autre compte en
 * devinant un identifiant.
 */
export async function getAttemptAnswersForAdmin(
  userId: string,
  attemptId: string,
): Promise<RevealAnswersResult> {
  const attempt = await prisma.attempt.findFirst({
    where: { id: attemptId, userId },
    select: {
      id: true,
      answers: {
        orderBy: { question: { number: "asc" } },
        select: {
          questionId: true,
          selectedOptionId: true,
          isCorrect: true,
          flagged: true,
          timeSpentSec: true,
          question: {
            select: {
              number: true,
              prompt: true,
              level: true,
              category: true,
              section: { select: { title: true } },
              options: { select: { id: true, label: true, text: true, isCorrect: true } },
            },
          },
        },
      },
    },
  });

  if (!attempt) return { ok: false, error: "NOT_FOUND" };

  return {
    ok: true,
    attemptId: attempt.id,
    answers: attempt.answers.map((answer) => {
      const correct = answer.question.options.find((option) => option.isCorrect);
      const selected = answer.question.options.find(
        (option) => option.id === answer.selectedOptionId,
      );
      return {
        questionId: answer.questionId,
        questionNumber: answer.question.number,
        prompt: answer.question.prompt,
        level: answer.question.level,
        category: answer.question.category,
        sectionTitle: answer.question.section.title,
        selectedOptionId: answer.selectedOptionId,
        selectedLabel: selected?.label ?? null,
        // Le libelle et le texte d'une proposition sont extraits du contenu du
        // test, que l'admin consulte de toute facon : les afficher n'expose rien
        // que la ligne « correct / incorrect » ne revele deja.
        selectedText: selected?.text ?? null,
        correctOptionId: correct?.id ?? "",
        correctLabel: correct?.label ?? null,
        correctText: correct?.text ?? null,
        isCorrect: answer.isCorrect,
        flagged: answer.flagged,
        timeSpentSec: answer.timeSpentSec,
      };
    }),
  };
}

// ------------------------------ Ecritures ---------------------------------

export type { AdminWriteError };

export type AdminWriteResult =
  | { ok: true; role?: Role }
  | { ok: false; error: AdminWriteError };

/**
 * Change le role d'un compte.
 *
 * Le compte de l'administrateur est exclu par construction : impossible de se
 * retirer son propre role, meme en cas d'erreur d'interface ou de requete
 * mimee.
 */
export async function setUserRole(
  actorId: string,
  targetId: string,
  role: Role,
): Promise<AdminWriteResult> {
  if (!(ROLES as readonly string[]).includes(role)) return { ok: false, error: "INVALID_ROLE" };
  if (actorId === targetId) return { ok: false, error: "FORBIDDEN_SELF" };

  return prisma.$transaction(async (tx) => {
    const target = await tx.user.findUnique({
      where: { id: targetId },
      select: { id: true, role: true },
    });
    if (!target) return { ok: false as const, error: "NOT_FOUND" as const };
    if (target.role === role) return { ok: true as const, role };

    // Filet de securite, non atteignable en invocation sequentielle : voir la
    // note de portee en tete de fichier.
    if (target.role === "ADMIN" && role === "USER") {
      const admins = await tx.user.count({ where: { role: "ADMIN" } });
      if (admins <= 1) return { ok: false as const, error: "LAST_ADMIN" as const };
    }

    // Compare-and-set : n'ecrit que si le role est encore celui qu'on a lu.
    const written = await tx.user.updateMany({
      where: { id: targetId, role: target.role },
      data: { role },
    });
    if (written.count !== 1) return { ok: false as const, error: "INVALID_TARGET" as const };

    return { ok: true as const, role };
  });
}

/**
 * Supprime definitivement un compte et toutes ses donnees.
 *
 * Le schema declare des `onDelete: Cascade` sur Attempt et Session : la
 * suppression entraine donc tentatives, epreuves, reponses et sessions. Cette
 * irreversibilite est le comportement attendu pour une donnee personnelle.
 */
export async function deleteUserAccount(
  actorId: string,
  targetId: string,
): Promise<AdminWriteResult> {
  if (actorId === targetId) return { ok: false, error: "FORBIDDEN_SELF" };

  return prisma.$transaction(async (tx) => {
    const target = await tx.user.findUnique({
      where: { id: targetId },
      select: { id: true, role: true },
    });
    if (!target) return { ok: false as const, error: "NOT_FOUND" as const };

    // Filet, non atteignable en invocation sequentielle (voir la note de portee).
    if (target.role === "ADMIN") {
      const admins = await tx.user.count({ where: { role: "ADMIN" } });
      if (admins <= 1) return { ok: false as const, error: "LAST_ADMIN" as const };
    }

    const deleted = await tx.user.deleteMany({ where: { id: targetId, role: target.role } });
    if (deleted.count !== 1) return { ok: false as const, error: "INVALID_TARGET" as const };

    return { ok: true as const };
  });
}