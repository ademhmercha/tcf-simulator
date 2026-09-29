import type { Prisma } from "@prisma/client";

import { LEVELS, type Level, type SectionType } from "@/config/enums";
import { computeCefrLevel, getScoringProfile, scoreToLevel } from "@/config/scoring";
import type {
  AttemptResult,
  CategoryStat,
  LevelStat,
  ReviewQuestion,
  SectionResult,
} from "@/lib/types";

// ---------------------------------------------------------------------------
// Calcul et agregation des resultats.
//
// Fonctions pures : aucune requete, aucune dependance a Prisma. Directement
// testables avec Vitest, et reutilisables tel quel par le mode correction.
// ---------------------------------------------------------------------------

export type AnswerRow = {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean;
  flagged: boolean;
  timeSpentSec: number | null;
  question: {
    id: string;
    number: number;
    prompt: string;
    level: string;
    category: string | null;
    points: number;
    explanation: string;
    sectionId: string;
    documentId: string | null;
    document: { title: string; content: string } | null;
    section: {
      id: string;
      type: string;
      title: string;
      order: number;
      durationMinutes: number;
    };
    options: Array<{ id: string; label: string; text: string; isCorrect: boolean }>;
  };
};

/**
 * Ensemble des identifiants de questions notees justes.
 * Regle : une reponse absente est fausse ; la correction est toujours
 * comparee a l'option selectionnee, jamais au champ `isCorrect` stocke,
 * qui pourrait etre desynchronise.
 */
export function correctQuestionIds(answers: AnswerRow[]): Set<string> {
  const ids = new Set<string>();
  for (const answer of answers) {
    if (!answer.selectedOptionId) continue;
    const selected = answer.question.options.find((o) => o.id === answer.selectedOptionId);
    if (selected?.isCorrect) ids.add(answer.questionId);
  }
  return ids;
}

export function sumPoints(answers: AnswerRow[], correctIds: Set<string>): number {
  let total = 0;
  for (const answer of answers) {
    if (correctIds.has(answer.questionId)) total += answer.question.points;
  }
  return total;
}

export function maxPoints(answers: AnswerRow[]): number {
  let total = 0;
  for (const answer of answers) total += answer.question.points;
  return total;
}

export function aggregateByLevel(answers: AnswerRow[], correctIds: Set<string>): LevelStat[] {
  const buckets = new Map<Level, { total: number; correct: number }>();
  for (const level of LEVELS) buckets.set(level, { total: 0, correct: 0 });

  for (const answer of answers) {
    const bucket = buckets.get(answer.question.level as Level);
    if (!bucket) continue;
    bucket.total += 1;
    if (correctIds.has(answer.questionId)) bucket.correct += 1;
  }

  return LEVELS.map((level) => {
    const bucket = buckets.get(level)!;
    return {
      level,
      total: bucket.total,
      correct: bucket.correct,
      ratio: bucket.total === 0 ? 0 : bucket.correct / bucket.total,
    };
  }).filter((stat) => stat.total > 0);
}

/** Categories les moins reussies en tete (priorites de travail). */
export function aggregateByCategory(
  answers: AnswerRow[],
  correctIds: Set<string>,
  limit = 10,
): CategoryStat[] {
  const buckets = new Map<string, { total: number; correct: number }>();

  for (const answer of answers) {
    const key = answer.question.category?.trim() || "Non categorise";
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { total: 0, correct: 0 };
      buckets.set(key, bucket);
    }
    bucket.total += 1;
    if (correctIds.has(answer.questionId)) bucket.correct += 1;
  }

  return [...buckets.entries()]
    .map(([category, b]) => ({
      category,
      total: b.total,
      correct: b.correct,
      ratio: b.total === 0 ? 0 : b.correct / b.total,
    }))
    .sort((a, b) => a.ratio - b.ratio || b.total - a.total)
    .slice(0, limit);
}

export function buildReview(answers: AnswerRow[], correctIds: Set<string>): ReviewQuestion[] {
  return answers
    .map((answer) => {
      const correctOption = answer.question.options.find((o) => o.isCorrect);
      return {
        id: answer.question.id,
        number: answer.question.number,
        prompt: answer.question.prompt,
        level: answer.question.level as Level,
        category: answer.question.category,
        points: answer.question.points,
        explanation: answer.question.explanation,
        sectionId: answer.question.section.id,
        sectionType: answer.question.section.type as SectionType,
        documentId: answer.question.documentId,
        documentTitle: answer.question.document?.title ?? null,
        documentContent: answer.question.document?.content ?? null,
        options: [...answer.question.options]
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((o) => ({ id: o.id, label: o.label, text: o.text, isCorrect: o.isCorrect })),
        selectedOptionId: answer.selectedOptionId,
        isCorrect: correctIds.has(answer.questionId),
        flagged: answer.flagged,
        timeSpentSec: answer.timeSpentSec,
        correctOptionId: correctOption?.id ?? "",
      } satisfies ReviewQuestion;
    });
}

/** Trie la correction par epreuve puis par numero de question. */
export function sortReview(review: ReviewQuestion[]): ReviewQuestion[] {
  return [...review].sort((a, b) => {
    if (a.sectionType !== b.sectionType) {
      return a.sectionType === "STRUCTURE" ? -1 : 1;
    }
    return a.number - b.number;
  });
}

// ------------------------------- Bareme -----------------------------------

export interface GradeInput {
  attempt: {
    id: string;
    status: string;
    startedAt: Date;
    finishedAt: Date | null;
    scoringProfile: string | null;
    test: { id: string; title: string; slug: string };
  };
  sectionRuns: Array<{
    sectionId: string;
    type: string;
    title: string;
    order: number;
    durationMinutes: number;
  }>;
  answers: AnswerRow[];
}

export interface GradeOutput {
  structureScore: number | null;
  comprehensionScore: number | null;
  totalScore: number;
  maxScore: number;
  cefrLevel: Level | null;
  scoringProfile: string;
  sections: SectionResult[];
  sectionScores: Map<string, { score: number; maxScore: number }>;
  correctIds: Set<string>;
}

export function grade(input: GradeInput): GradeOutput {
  const profile = getScoringProfile(input.attempt.scoringProfile);
  const correctIds = correctQuestionIds(input.answers);

  const runsByOrder = [...input.sectionRuns].sort((a, b) => a.order - b.order);
  const sections: SectionResult[] = [];
  const sectionScores = new Map<string, { score: number; maxScore: number }>();
  const totals = new Map<SectionType, { score: number; max: number }>();

  for (const run of runsByOrder) {
    const rows = input.answers.filter((a) => a.question.sectionId === run.sectionId);
    const score = sumPoints(rows, correctIds);
    const max = maxPoints(rows);
    const type = run.type as SectionType;

    const correct = rows.filter((a) => correctIds.has(a.questionId)).length;
    const answered = rows.filter((a) => a.selectedOptionId !== null).length;
    const flagged = rows.filter((a) => a.flagged).length;

    sectionScores.set(run.sectionId, { score, maxScore: max });

    const bucket = totals.get(type);
    if (bucket) {
      bucket.score += score;
      bucket.max += max;
    } else {
      totals.set(type, { score, max });
    }

    sections.push({
      sectionId: run.sectionId,
      type,
      title: run.title,
      score,
      maxScore: max,
      ratio: max === 0 ? 0 : score / max,
      answered,
      total: rows.length,
      correct,
      flagged,
      level: rows.length > 0 ? scoreToLevel(score, type, profile) : null,
      durationMinutes: run.durationMinutes,
    });
  }

  const structure = totals.get("STRUCTURE");
  const comprehension = totals.get("COMPREHENSION_ECRITE");

  return {
    structureScore: structure?.score ?? null,
    comprehensionScore: comprehension?.score ?? null,
    totalScore: sumPoints(input.answers, correctIds),
    maxScore: maxPoints(input.answers),
    cefrLevel: computeCefrLevel(
      {
        STRUCTURE: structure?.score,
        COMPREHENSION_ECRITE: comprehension?.score,
      },
      {
        STRUCTURE: structure?.max ?? 0,
        COMPREHENSION_ECRITE: comprehension?.max ?? 0,
      },
      profile,
    ),
    scoringProfile: profile.id,
    sections,
    sectionScores,
    correctIds,
  };
}

// --------------------------- Progression de niveau -----------------------

export interface LevelGap {
  /** Niveau correspondant au score actuel. */
  current: Level | null;
  /** Niveau Immediately superieur, ou null au sommet de l'echelle. */
  next: Level | null;
  /** Points manquants pour atteindre `next`. 0 si deja au sommet. */
  missing: number;
}

/** Ecart au niveau suivant pour une epreuve donnee. */
export function levelGap(score: number, section: SectionType): LevelGap {
  const profile = getScoringProfile();
  const bands = [...profile.bandsBySection[section]].sort((a, b) => a.min - b.min);

  let current: Level | null = null;
  for (const band of bands) {
    if (score >= band.min) current = band.level;
    else break;
  }

  const nextBand = bands.find((band) => score < band.min);
  if (!nextBand) return { current, next: null, missing: 0 };

  return { current, next: nextBand.level, missing: nextBand.min - score };
}

/** Niveau suivant sur l'echelle CECRL. */
export function nextLevel(level: Level | null): Level | null {
  if (!level) return "A1";
  const index = LEVELS.indexOf(level);
  if (index === -1 || index >= LEVELS.length - 1) return null;
  return LEVELS[index + 1] ?? null;
}

// ---------------------------- Construction du resultat -------------------

export function buildAttemptResult(input: GradeInput, output: GradeOutput): AttemptResult {
  const review = sortReview(buildReview(input.answers, output.correctIds));
  const totalTimeSec = input.answers.reduce((sum, a) => sum + (a.timeSpentSec ?? 0), 0);
  const timed = input.answers.filter((a) => a.timeSpentSec !== null);
  const avgTimeSec = timed.length === 0 ? 0 : Math.round(totalTimeSec / timed.length);

  const slowest = review
    .filter((q) => q.timeSpentSec !== null && q.timeSpentSec > 0)
    .sort((a, b) => (b.timeSpentSec ?? 0) - (a.timeSpentSec ?? 0))
    .slice(0, 5);

  return {
    attemptId: input.attempt.id,
    testId: input.attempt.test.id,
    testTitle: input.attempt.test.title,
    testSlug: input.attempt.test.slug,
    status: input.attempt.status,
    startedAt: input.attempt.startedAt.toISOString(),
    finishedAt: input.attempt.finishedAt?.toISOString() ?? null,
    totalScore: output.totalScore,
    maxScore: output.maxScore,
    structureScore: output.structureScore,
    comprehensionScore: output.comprehensionScore,
    cefrLevel: output.cefrLevel,
    scoringProfile: output.scoringProfile,
    sections: output.sections,
    byLevel: aggregateByLevel(input.answers, output.correctIds),
    byCategory: aggregateByCategory(input.answers, output.correctIds),
    review,
    totalTimeSec,
    avgTimeSec,
    slowest,
  };
}

export type AttemptWithAnswers = Prisma.AttemptGetPayload<{
  include: {
    test: { select: { id: true; title: true; slug: true } };
    sectionRuns: { include: { section: true } };
    answers: {
      include: {
        question: { include: { options: true; document: true; section: true } };
      };
    };
  };
}>;
