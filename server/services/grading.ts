import type { Prisma } from "@prisma/client";

import { type Level, type SectionType } from "@/config/enums";
import {
  DEFAULT_SCORING_PROFILE,
  SCORE_MAX,
  computeSimulatedScore,
  pointsToNextBand,
  scoreToLevel,
  type ScorePart,
} from "@/config/scoring";
import type { AttemptResult, CategoryStat, ReviewQuestion, SectionResult } from "@/lib/types";

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
    test: { id: string; title: string; slug: string };
  };
  /** Toutes les epreuves du test, avec leur nombre de questions. */
  sections: Array<{
    sectionId: string;
    type: string;
    title: string;
    order: number;
    durationMinutes: number;
    questionCount: number;
  }>;
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
  /** Nombre de bonnes reponses par epreuve. */
  structureCorrect: number | null;
  comprehensionCorrect: number | null;
  structureTotal: number | null;
  comprehensionTotal: number | null;
  /** Score simule sur l'echelle 0-699. */
  totalScore: number;
  maxScore: number;
  /** `null` sous 100 points : A1 non atteint. */
  cefrLevel: Level | null;
  /** Pourcentage final, entre 0 et 1. */
  scorePercentage: number;
  /** Points manquants pour le palier suivant, 0 au sommet. */
  missingToNextLevel: number;
  scoringProfile: string;
  sections: SectionResult[];
  sectionScores: Map<string, { score: number; maxScore: number }>;
  correctIds: Set<string>;
}

/**
 * Note une tentative terminee.
 *
 * Chaque epreuve du test est ramenee a un pourcentage de reussite, puis les
 * pourcentages sont averages : les deux parties pessent le meme poids, quel que
 * soit leur nombre de questions. Le resultat est converti en score sur
 * l'echelle 0-699 puis en niveau CECRL (voir `config/scoring.ts`).
 *
 * Toute epreuve non traitee compte comme entierement fausse, qu'il s'agisse
 * d'une question sans reponse ou d'une epreuve jamais commencee.
 */
export function grade(input: GradeInput): GradeOutput {
  const correctIds = correctQuestionIds(input.answers);

  const runsByOrder = [...input.sectionRuns].sort((a, b) => a.order - b.order);
  const sections: SectionResult[] = [];
  const sectionScores = new Map<string, { score: number; maxScore: number }>();
  const parts = new Map<string, ScorePart>();

  // Nombre de questions du test pour chaque epreuve : c'est le denominateur
  // affiche ET la base du bareme, pour toute tentative comme pour une reprise
  // sur les erreurs.
  //
  // Une question non traitee est une erreur. Comme une ligne `Answer` n'est
  // creee qu'a la premiere sauvegarde d'une question (voir `saveAnswer`),
  // compter les lignes revient a ne noter que les questions touchees : un
  // candidat ayant repondu juste a 2 questions sur 20 obtenait 100 % sur son
  // epreuve au lieu de 10 %, et le score global etait gonfle d'autant. Le
  // denominateur est donc toujours le nombre de questions du test.
  const totals = new Map(input.sections.map((section) => [section.sectionId, section.questionCount]));

  // Toutes les epreuves du test sont notees, y compris celles qu'un abandon a
  // laisse de cote. Une epreuve jamais commencee vaut zero, exactement comme
  // une question jamais reponse : la filtrer sur les epreuves jouees ferait
  // peser la seule epreuve faite de 100 % au lieu de 50 %, et une epreuve
  // reussie donnerait un score parfait alors que la seconde n'a jamais ete
  // ouverte. Le bareme ne depend donc d'aucun perimetre de reprise : une
  // reprise sur les erreurs est notee comme un test complet.
  const orderedSections = [...input.sections].sort((a, b) => a.order - b.order);

  for (const section of orderedSections) {
    const run = runsByOrder.find((candidate) => candidate.sectionId === section.sectionId);
    const rows = input.answers.filter((a) => a.question.sectionId === section.sectionId);
    const type = section.type as SectionType;

    const correct = rows.filter((a) => correctIds.has(a.questionId)).length;
    const playedTotal = rows.length;
    const total = totals.get(section.sectionId) ?? playedTotal;
    const answered = rows.filter((a) => a.selectedOptionId !== null).length;
    const flagged = rows.filter((a) => a.flagged).length;
    const ratio = total === 0 ? 0 : correct / total;

    // `score` designe ici le nombre de bonnes reponses, sur `maxScore`
    // questions : c'est ce que l'ecran affiche (« 16 / 20 »).
    if (run) sectionScores.set(section.sectionId, { score: correct, maxScore: total });

    const existing = parts.get(type);
    parts.set(
      type,
      existing ? { correct: existing.correct + correct, total: existing.total + total } : { correct, total },
    );

    sections.push({
      sectionId: section.sectionId,
      type,
      title: section.title,
      score: correct,
      maxScore: total,
      ratio,
      answered,
      total,
      correct,
      flagged,
      durationMinutes: section.durationMinutes,
    });
  }

  const structure = parts.get("STRUCTURE");
  const comprehension = parts.get("COMPREHENSION_ECRITE");
  const simulated = computeSimulatedScore([structure, comprehension].filter(isScorePart));

  return {
    structureCorrect: structure?.correct ?? null,
    comprehensionCorrect: comprehension?.correct ?? null,
    structureTotal: structure?.total ?? null,
    comprehensionTotal: comprehension?.total ?? null,
    totalScore: simulated.score,
    maxScore: SCORE_MAX,
    cefrLevel: simulated.level,
    scorePercentage: simulated.percentage,
    missingToNextLevel: pointsToNextBand(simulated.score),
    scoringProfile: DEFAULT_SCORING_PROFILE.id,
    sections,
    sectionScores,
    correctIds,
  };
}

function isScorePart(part: ScorePart | undefined): part is ScorePart {
  return part !== undefined;
}

// ---------------------------- Refaire mes erreurs --------------------------

export interface MistakeScope {
  /** Sections effectivement jouees par la tentative. */
  sectionIds: readonly string[];
  /** Questions de ces sections, avec leur section. */
  questions: ReadonlyArray<{ id: string; sectionId: string }>;
  /** Perimetre d'une reprise ciblee, `null` pour un test complet. */
  focus: ReadonlySet<string> | null;
  /** Questions notees justes. */
  correctIds: ReadonlySet<string>;
}

/**
 * Questions a retraiter apres une tentative terminee.
 *
 * Une question non traitee est une erreur : le replay porte donc sur toutes les
 * questions des sections jouees, moins les seules reponses justes. Compter les
 * lignes `Answer` `isCorrect: false` ignorerait les questions vierges — or c'est
 * precisement le cas le plus frequent : un candidat qui laisse le test en plan
 * verrait « aucune erreur a retraiter » alors que son score est tres bas.
 *
 * Une reprise reste limitee a son perimetre : on ne rejoue que les questions
 * deja ciblees par la tentative source, moins celles reussies depuis.
 */
export function mistakeQuestionIds(scope: MistakeScope): string[] {
  const pool = scope.focus
    ? [...scope.focus]
    : scope.questions
        .filter((question) => scope.sectionIds.includes(question.sectionId))
        .map((question) => question.id);

  return [...new Set(pool)].filter((id) => !scope.correctIds.has(id));
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
    structureCorrect: output.structureCorrect,
    structureTotal: output.structureTotal,
    comprehensionCorrect: output.comprehensionCorrect,
    comprehensionTotal: output.comprehensionTotal,
    scorePercentage: output.scorePercentage,
    missingToNextLevel: output.missingToNextLevel,
    cefrLevel: output.cefrLevel,
    scoringProfile: output.scoringProfile,
    sections: output.sections,
    byCategory: aggregateByCategory(input.answers, output.correctIds),
    review,
    totalTimeSec,
    avgTimeSec,
    slowest,
  };
}

export type AttemptWithAnswers = Prisma.AttemptGetPayload<{
  include: {
    test: {
      select: {
        id: true;
        title: true;
        slug: true;
        sections: {
          select: {
            id: true;
            type: true;
            title: true;
            order: true;
            durationMinutes: true;
            _count: { select: { questions: true } };
          };
        };
      };
    };
    sectionRuns: { include: { section: true } };
    answers: {
      include: {
        question: { include: { options: true, document: true, section: true } };
      };
    };
  };
}>;
