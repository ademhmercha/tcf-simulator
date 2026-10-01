import "server-only";

import { unstable_cache, revalidateTag } from "next/cache";

import { LEVELS, isLevel, levelIndex, type Level } from "@/config/enums";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Statistiques de la plateforme pour l'espace d'administration.
//
// STRATEGIE DE PERFORMANCE
//
//  1. AUCUNE LIGNE BRUTE NE REMONTE AU RENDU. Les series sont agregees en base
//     (`count`, `groupBy`, `aggregate`) ou en JS a partir de colonnes minimales
//     (par exemple `startedAt` seul pour une serie temporelle).
//
//  2. FENETRE DE QUALITE. Les agregats question/par-question ne portent que sur
//     les tentatives TERMINEES des `QUALITY_WINDOW_DAYS` derniers jours. C'est
//     ce qui empeche le cout de la page de degringoler a mesure que la base
//     grossit, et c'est aussi plus pertinent : on juge le contenu actuel, pas
//     celui d'il y a deux ans.
//
//  3. REQUETES PARALLELES. Les lectures independantes partent ensemble
//     (`Promise.all`) au lieu d'etre cascadees.
//
//  4. CACHE DE 60 SECONDES. Ces agregats sont couteux et reserves a
//     l'administrateur : une minute de tolerance est invisible et absorbe la
//     rafraichissement de la base.
// ---------------------------------------------------------------------------

/** Fenetre des agregats de qualite du contenu. */
const QUALITY_WINDOW_DAYS = 90;

/** Periode des series temporelles (inscriptions, activite). */
const TIMESERIES_DAYS = 30;

/** Nombre minimum de reponses avant qu'une question soit analyseable. */
const MIN_RESPONSES_PER_QUESTION = 5;

/** Nombre de questions listees dans chaque classement. */
const TOP_QUESTIONS = 20;

const DAY_MS = 86_400_000;

/** Duree de vie du cache des agregats admin. */
const STATS_REVALIDATE_SECONDS = 60;

/** Tentatives terminees dans la fenetre : le denominateur de la qualite. */
const IN_QUALITY_WINDOW = {
  status: "SUBMITTED",
  finishedAt: { gte: new Date(Date.now() - QUALITY_WINDOW_DAYS * DAY_MS) },
} as const;

// ------------------------------- Types ------------------------------------

export interface TimeseriesPoint {
  /** Date ISO courte « 2026-04-01 » : cle de serie. */
  date: string;
  count: number;
}

/**
 * Point d'activite journaliere.
 *
 * `started` et `submitted` partagent la MEME fenetre et la meme liste de dates :
 * les series sont donc directement superposables dans un graphique, sans avoir a
 * recaler des index cote rendu.
 */
export interface ActivityPoint {
  date: string;
  started: number;
  submitted: number;
}

export interface LevelSlice {
  level: Level;
  count: number;
}

export interface CategoryStat {
  category: string;
  responses: number;
  correct: number;
  /** Ratio de reussite entre 0 et 1. */
  ratio: number;
}

export interface LevelStat {
  level: Level;
  questions: number;
  responses: number;
  correct: number;
  ratio: number;
}

export interface QuestionStat {
  questionId: string;
  code: string | null;
  prompt: string;
  testTitle: string;
  sectionType: string;
  level: string;
  category: string | null;
  responses: number;
  correct: number;
  /** Ratio de reussite entre 0 et 1. */
  ratio: number;
}

export interface DistractorStat {
  optionId: string;
  label: string;
  text: string;
  questionId: string;
  questionPrompt: string;
  selections: number;
  /** Part des reponses de la question, entre 0 et 1. */
  share: number;
}

export interface TestActivityStat {
  testId: string;
  title: string;
  isPublished: boolean;
  attempts: number;
  submitted: number;
  /** Score moyen du test (bareme TCF 0-699) ou null si aucune note. */
  avgScore: number | null;
  /** Score moyen ramene au maximum du test, en pourcentage. */
  avgPercentage: number | null;
  /** Nombre d'utilisateurs distincts ayant termine ce test. */
  distinctUsers: number;
}

export interface RecentActivityRow {
  attemptId: string;
  userId: string;
  userName: string;
  testTitle: string;
  status: string;
  totalScore: number | null;
  maxScore: number | null;
  cefrLevel: string | null;
  startedAt: string;
}

export interface AdminOverview {
  users: {
    total: number;
    admins: number;
    candidates: number;
    newLast7d: number;
    newLast30d: number;
    activeLast30d: number;
  };
  content: {
    tests: number;
    published: number;
    drafts: number;
    questions: number;
    documents: number;
  };
  attempts: {
    total: number;
    submitted: number;
    inProgress: number;
    expired: number;
    abandoned: number;
    last7d: number;
    last30d: number;
  };
  performance: {
    /** Tentatives terminees / tentatives creees, en pourcentage 0-100. */
    completionRate: number;
    answers: number;
    correctAnswers: number;
    /** Reussite globale en pourcentage 0-100. */
    accuracy: number | null;
    /** Score moyen du bareme TCF (0-699). */
    avgTcfScore: number | null;
    avgPercentage: number | null;
    avgLevel: Level | null;
  };
  registrations: TimeseriesPoint[];
  activity: ActivityPoint[];
  levelDistribution: LevelSlice[];
  recentActivity: RecentActivityRow[];
  generatedAt: string;
}

export interface AdminStats {
  windowDays: number;
  minResponsesPerQuestion: number;
  sampleSize: number;
  /** Taux de reussite global de la fenetre, en pourcentage 0-100. */
  successRate: number | null;
  totalResponses: number;
  levelDistribution: LevelSlice[];
  attemptsPerTest: TestActivityStat[];
  hardestQuestions: QuestionStat[];
  ambiguousQuestions: QuestionStat[];
  tooEasyQuestions: QuestionStat[];
  byLevel: LevelStat[];
  byCategory: CategoryStat[];
  /** Propositions incorrectes des questions les plus faibles. */
  distractors: DistractorStat[];
}

// ------------------------------ Utilitaires -------------------------------

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Serie continue : chaque jour de la fenetre a une entree, meme a zero. */
function buildDaySeries(days: number, counts: Map<string, number>): TimeseriesPoint[] {
  const now = Date.now();
  const points: TimeseriesPoint[] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const key = dayKey(new Date(now - offset * DAY_MS));
    points.push({ date: key, count: counts.get(key) ?? 0 });
  }
  return points;
}

/**
 * Serie d'activite a deux canaux (tentatives commencees / terminees).
 *
 * Les deux series sont construites sur la meme boucle : c'est la garantie que
 * `activity[i].started` et `activity[i].submitted` designent le MEME jour.
 */
function buildActivitySeries(
  days: number,
  started: Map<string, number>,
  submitted: Map<string, number>,
): ActivityPoint[] {
  const now = Date.now();
  const points: ActivityPoint[] = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const key = dayKey(new Date(now - offset * DAY_MS));
    points.push({
      date: key,
      started: started.get(key) ?? 0,
      submitted: submitted.get(key) ?? 0,
    });
  }
  return points;
}

function increment(counts: Map<string, number>, key: string): void {
  counts.set(key, (counts.get(key) ?? 0) + 1);
}

function percent(part: number, total: number): number | null {
  return total > 0 ? Math.round((part / total) * 1000) / 10 : null;
}

/**
 * Niveau moyen d'une cohorte.
 *
 * Moyenne ARITHMETIQUE des indices de niveau, chaque tentative pesant le meme
 * poids. Une moyenne d'indices n'est pas un niveau reellement obtenu : elle
 * indique une tendance (« cet etudiant est en progression vers B1 »), ce qu'un
 * arrondi au niveau superieur masquerait. Ne pas lire ce resultat comme une
 * certification.
 */
function averageLevel(levels: Level[]): Level | null {
  if (levels.length === 0) return null;
  const mean = levels.reduce((sum, level) => sum + levelIndex(level), 0) / levels.length;
  return LEVELS[Math.min(Math.round(mean), LEVELS.length - 1)] ?? null;
}

/** Distance a 50 % : plus elle est faible, plus le taux est « pile au milieu ». */
function distanceFromHalf(ratio: number): number {
  return Math.abs(ratio - 0.5);
}

// ------------------------- Vue d'ensemble ---------------------------------

const getOverview = unstable_cache(
  async (): Promise<AdminOverview> => {
    const now = Date.now();
    const last7d = new Date(now - 7 * DAY_MS);
    const last30d = new Date(now - 30 * DAY_MS);

    const [
      userTotal,
      adminTotal,
      new7d,
      new30d,
      active30d,
      testTotal,
      published,
      questionTotal,
      documentTotal,
      attemptTotal,
      submitted,
      inProgress,
      expired,
      abandoned,
      attempts7d,
      attempts30d,
      scoreAgg,
      answerTotal,
      correctTotal,
      levelGroups,
      registeredUsers,
      windowAttempts,
      recent,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { createdAt: { gte: last7d } } }),
      prisma.user.count({ where: { createdAt: { gte: last30d } } }),
      // Un utilisateur est « actif » s'il a au moins une tentative sur 30 jours.
      prisma.user.count({ where: { attempts: { some: { startedAt: { gte: last30d } } } } }),

      prisma.test.count(),
      prisma.test.count({ where: { isPublished: true } }),
      prisma.question.count(),
      prisma.document.count(),

      prisma.attempt.count(),
      prisma.attempt.count({ where: { status: "SUBMITTED" } }),
      prisma.attempt.count({ where: { status: "IN_PROGRESS" } }),
      prisma.attempt.count({ where: { status: "EXPIRED" } }),
      prisma.attempt.count({ where: { status: "ABANDONED" } }),
      prisma.attempt.count({ where: { startedAt: { gte: last7d } } }),
      prisma.attempt.count({ where: { startedAt: { gte: last30d } } }),

      prisma.attempt.aggregate({
        where: { status: "SUBMITTED", totalScore: { not: null }, maxScore: { not: null } },
        _avg: { totalScore: true, maxScore: true },
      }),
      prisma.answer.count(),
      // `isCorrect` est un booleen : Prisma ne peut pas le sommer. Un `count`
      // filtre est l'equivalent portable, et il utilise l'index
      // `[questionId, isCorrect]` de `Answer`.
      prisma.answer.count({ where: { isCorrect: true } }),
      prisma.attempt.groupBy({
        by: ["cefrLevel"],
        where: { status: "SUBMITTED", cefrLevel: { not: null } },
        _count: { _all: true },
      }),

      // Series temporelles : on ne lit QUE les colonnes necessaires (index
      // couvrant [status, startedAt]) et on regroupe en JS. Il n'existe pas de
      // fonction de troncature de date identique sur PostgreSQL et SQLite,
      // Prisma n'expose donc pas ce regroupement de facon portable.
      prisma.user.findMany({
        where: { createdAt: { gte: last30d } },
        select: { createdAt: true },
      }),
      prisma.attempt.findMany({
        where: { startedAt: { gte: last30d } },
        select: { startedAt: true, status: true },
      }),

      prisma.attempt.findMany({
        orderBy: { startedAt: "desc" },
        take: 8,
        select: {
          id: true,
          status: true,
          startedAt: true,
          totalScore: true,
          maxScore: true,
          cefrLevel: true,
          test: { select: { title: true } },
          user: { select: { id: true, name: true } },
        },
      }),
    ]);

    const registrationCounts = new Map<string, number>();
    for (const user of registeredUsers) increment(registrationCounts, dayKey(user.createdAt));

    const startedCounts = new Map<string, number>();
    const submittedCounts = new Map<string, number>();
    for (const attempt of windowAttempts) {
      const key = dayKey(attempt.startedAt);
      increment(startedCounts, key);
      if (attempt.status === "SUBMITTED") increment(submittedCounts, key);
    }

    const levelDistribution: LevelSlice[] = LEVELS.map((level) => ({
      level,
      count: levelGroups.find((group) => group.cefrLevel === level)?._count._all ?? 0,
    })).filter((slice) => slice.count > 0);

    const finished = attemptTotal - inProgress;
    const avgScore = scoreAgg._avg.totalScore ?? null;
    const avgMax = scoreAgg._avg.maxScore ?? null;

    return {
      users: {
        total: userTotal,
        admins: adminTotal,
        candidates: userTotal - adminTotal,
        newLast7d: new7d,
        newLast30d: new30d,
        activeLast30d: active30d,
      },
      content: {
        tests: testTotal,
        published,
        drafts: testTotal - published,
        questions: questionTotal,
        documents: documentTotal,
      },
      attempts: {
        total: attemptTotal,
        submitted,
        inProgress,
        expired,
        abandoned,
        last7d: attempts7d,
        last30d: attempts30d,
      },
      performance: {
        completionRate: percent(finished, attemptTotal) ?? 0,
        answers: answerTotal,
        correctAnswers: correctTotal,
        accuracy: percent(correctTotal, answerTotal),
        avgTcfScore: avgScore === null ? null : Math.round(avgScore),
        avgPercentage:
          avgScore !== null && avgMax ? Math.round((avgScore / avgMax) * 1000) / 10 : null,
        avgLevel: averageLevel(
          levelGroups.flatMap((group) =>
            group.cefrLevel && isLevel(group.cefrLevel)
              ? Array<Level>(group._count._all).fill(group.cefrLevel)
              : [],
          ),
        ),
      },
      registrations: buildDaySeries(TIMESERIES_DAYS, registrationCounts),
      activity: buildActivitySeries(TIMESERIES_DAYS, startedCounts, submittedCounts),
      levelDistribution,
      recentActivity: recent.map((row) => ({
        attemptId: row.id,
        userId: row.user.id,
        userName: row.user.name,
        testTitle: row.test.title,
        status: row.status,
        totalScore: row.totalScore,
        maxScore: row.maxScore,
        cefrLevel: row.cefrLevel,
        startedAt: row.startedAt.toISOString(),
      })),
      generatedAt: new Date(now).toISOString(),
    };
  },
  ["admin-overview"],
  { revalidate: STATS_REVALIDATE_SECONDS, tags: ["admin-stats"] },
);

export function getAdminOverview(): Promise<AdminOverview> {
  return getOverview();
}

// ------------------------- Statistiques detaillees ------------------------

const getStats = unstable_cache(
  async (): Promise<AdminStats> => {
    const [sample, perQuestion, correctPerQuestion] = await Promise.all([
      prisma.attempt.count({ where: IN_QUALITY_WINDOW }),
      prisma.answer.groupBy({
        by: ["questionId"],
        where: { attempt: IN_QUALITY_WINDOW },
        _count: { _all: true },
      }),
      prisma.answer.groupBy({
        by: ["questionId"],
        where: { attempt: IN_QUALITY_WINDOW, isCorrect: true },
        _count: { _all: true },
      }),
    ]);

    // Niveau et theme se lisent sur la question : on ne charge que les
    // metadonnees des questions effectivement repondues dans la fenetre.
    const questionIds = perQuestion.map((row) => row.questionId);
    const [questions, levelDistribution, perTest] = await Promise.all([
      prisma.question.findMany({
        where: { id: { in: questionIds } },
        select: {
          id: true,
          code: true,
          prompt: true,
          level: true,
          category: true,
          section: { select: { type: true, test: { select: { title: true } } } },
        },
      }),
      prisma.attempt.groupBy({
        by: ["cefrLevel"],
        where: { status: "SUBMITTED" },
        _count: { _all: true },
      }),
      getPerTestStats(),
    ]);

    const correctByQuestion = new Map(
      correctPerQuestion.map((row) => [row.questionId, row._count._all]),
    );
    const metaByQuestion = new Map(questions.map((question) => [question.id, question]));

    const allQuestionStats: QuestionStat[] = [];
    for (const row of perQuestion) {
      const meta = metaByQuestion.get(row.questionId);
      if (!meta) continue;
      const correct = correctByQuestion.get(row.questionId) ?? 0;
      allQuestionStats.push({
        questionId: row.questionId,
        code: meta.code,
        prompt: meta.prompt,
        testTitle: meta.section.test.title,
        sectionType: meta.section.type,
        level: meta.level,
        category: meta.category,
        responses: row._count._all,
        correct,
        ratio: row._count._all > 0 ? correct / row._count._all : 0,
      });
    }

    // Echantillon credible : sous le seuil, un taux de reussite est du bruit
    // (2 reponses justes sur 3 ne renseignent pas sur le contenu).
    const reliable = allQuestionStats.filter(
      (stat) => stat.responses >= MIN_RESPONSES_PER_QUESTION,
    );

    const hardestQuestions = [...reliable]
      .sort((a, b) => a.ratio - b.ratio || b.responses - a.responses)
      .slice(0, TOP_QUESTIONS);

    const tooEasyQuestions = [...reliable]
      .filter((stat) => stat.ratio > 0.95)
      .sort((a, b) => b.ratio - a.ratio || b.responses - a.responses)
      .slice(0, TOP_QUESTIONS);

    // « Ambigu » : entre 30 % et 75 % de reussite sur un echantillon credible,
    // et le plus proche possible de 50 %. En dessous la question est difficile,
    // au-dessus elle ne discrimine pas ; au milieu, la bonne reponse est
    // probablement contestable.
    const ambiguousQuestions = reliable
      .filter((stat) => stat.ratio >= 0.3 && stat.ratio <= 0.75)
      .sort((a, b) => distanceFromHalf(a.ratio) - distanceFromHalf(b.ratio))
      .slice(0, TOP_QUESTIONS);

    const distractors = await getDistractorStats(hardestQuestions, perQuestion);

    return {
      windowDays: QUALITY_WINDOW_DAYS,
      minResponsesPerQuestion: MIN_RESPONSES_PER_QUESTION,
      sampleSize: sample,
      successRate: percent(
        allQuestionStats.reduce((sum, stat) => sum + stat.correct, 0),
        allQuestionStats.reduce((sum, stat) => sum + stat.responses, 0),
      ),
      totalResponses: allQuestionStats.reduce((sum, stat) => sum + stat.responses, 0),
      levelDistribution: LEVELS.map((level) => ({
        level,
        count: levelDistribution.find((group) => group.cefrLevel === level)?._count._all ?? 0,
      })).filter((slice) => slice.count > 0),
      attemptsPerTest: perTest,
      hardestQuestions,
      ambiguousQuestions,
      tooEasyQuestions,
      byLevel: aggregateByLevel(reliable),
      byCategory: aggregateByCategory(reliable),
      distractors,
    };
  },
  ["admin-stats-detail"],
  { revalidate: STATS_REVALIDATE_SECONDS, tags: ["admin-stats"] },
);

/**
 * Propositions incorrectes des questions les plus faibles.
 *
 * Une distraction jamais choisie signale une formulation a corriger. Le volume
 * reste borne par TOP_QUESTIONS, et l'analyse tient en deux requetes quelle que
 * soit la taille de la base.
 */
async function getDistractorStats(
  analysed: QuestionStat[],
  perQuestion: Array<{ questionId: string; _count: { _all: number } }>,
): Promise<DistractorStat[]> {
  if (analysed.length === 0) return [];

  const analysedIds = analysed.map((stat) => stat.questionId);

  const [options, selectionGroups] = await Promise.all([
    prisma.option.findMany({
      where: { questionId: { in: analysedIds }, isCorrect: false },
      select: { id: true, label: true, text: true, questionId: true },
    }),
    prisma.answer.groupBy({
      by: ["selectedOptionId"],
      where: { attempt: IN_QUALITY_WINDOW, selectedOptionId: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const selectionsByOption = new Map<string, number>();
  for (const row of selectionGroups) {
    if (row.selectedOptionId) {
      selectionsByOption.set(row.selectedOptionId, row._count._all);
    }
  }

  const responsesByQuestion = new Map(
    perQuestion.map((row) => [row.questionId, row._count._all]),
  );
  const statByQuestion = new Map(analysed.map((stat) => [stat.questionId, stat]));

  return options
    .map((option) => {
      const stat = statByQuestion.get(option.questionId);
      const responses = responsesByQuestion.get(option.questionId) ?? 0;
      const selections = selectionsByOption.get(option.id) ?? 0;
      return {
        optionId: option.id,
        label: option.label,
        text: option.text,
        questionId: option.questionId,
        questionPrompt: stat?.prompt ?? "",
        selections,
        share: responses > 0 ? selections / responses : 0,
      };
    })
    .sort((a, b) => a.share - b.share || a.label.localeCompare(b.label))
    .slice(0, TOP_QUESTIONS);
}

function aggregateByLevel(stats: QuestionStat[]): LevelStat[] {
  const buckets = new Map<Level, { questions: Set<string>; responses: number; correct: number }>();

  for (const stat of stats) {
    if (!isLevel(stat.level)) continue;
    const bucket = buckets.get(stat.level) ?? {
      questions: new Set<string>(),
      responses: 0,
      correct: 0,
    };
    bucket.questions.add(stat.questionId);
    bucket.responses += stat.responses;
    bucket.correct += stat.correct;
    buckets.set(stat.level, bucket);
  }

  return LEVELS.filter((level) => buckets.has(level)).map((level) => {
    const bucket = buckets.get(level)!;
    return {
      level,
      questions: bucket.questions.size,
      responses: bucket.responses,
      correct: bucket.correct,
      ratio: bucket.responses > 0 ? bucket.correct / bucket.responses : 0,
    };
  });
}

function aggregateByCategory(stats: QuestionStat[]): CategoryStat[] {
  const buckets = new Map<string, { responses: number; correct: number }>();

  for (const stat of stats) {
    const category = stat.category?.trim();
    if (!category) continue;
    const bucket = buckets.get(category) ?? { responses: 0, correct: 0 };
    bucket.responses += stat.responses;
    bucket.correct += stat.correct;
    buckets.set(category, bucket);
  }

  return [...buckets.entries()]
    .map(([category, bucket]) => ({
      category,
      responses: bucket.responses,
      correct: bucket.correct,
      ratio: bucket.responses > 0 ? bucket.correct / bucket.responses : 0,
    }))
    .sort((a, b) => b.responses - a.responses);
}

async function getPerTestStats(): Promise<TestActivityStat[]> {
  const tests = await prisma.test.findMany({
    orderBy: { order: "asc" },
    select: {
      id: true,
      title: true,
      isPublished: true,
      _count: { select: { attempts: true } },
      attempts: {
        where: { status: "SUBMITTED", totalScore: { not: null }, maxScore: { not: null } },
        select: { totalScore: true, maxScore: true, userId: true },
      },
    },
  });

  return tests.map((test) => {
    const scored = test.attempts;
    const sum = scored.reduce((total, attempt) => total + (attempt.totalScore ?? 0), 0);
    const avg = scored.length > 0 ? sum / scored.length : null;
    // Chaque test a le meme bareme : la premiere note notee suffit de denominateur.
    const reference = scored.find((attempt) => attempt.maxScore)?.maxScore ?? null;

    return {
      testId: test.id,
      title: test.title,
      isPublished: test.isPublished,
      attempts: test._count.attempts,
      submitted: scored.length,
      avgScore: avg === null ? null : Math.round(avg),
      avgPercentage:
        avg !== null && reference ? Math.round((avg / reference) * 1000) / 10 : null,
      distinctUsers: new Set(scored.map((attempt) => attempt.userId)).size,
    };
  });
}

export function getAdminStats(): Promise<AdminStats> {
  return getStats();
}

/**
 * Invalide les agregats en cache.
 *
 * Appele apres toute ecriture d'administration (changement de role, suppression
 * d'un compte) pour que la vue d'ensemble ne reste pas figee sur un comptage
 * perime.
 */
export function revalidateAdminStats(): void {
  revalidateTag("admin-stats");
}