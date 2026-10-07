import { prisma } from "@/lib/db";
import { type Level } from "@/config/enums";

// ---------------------------------------------------------------------------
// Service des series de comprehension orale.
//
// Regles :
//  1. Le client ne recoit jamais la bonne reponse ni la transcription avant la
//     fin : la session n'expose que la question et les 4 propositions.
//  2. La correction (score, transcriptions, explications) n'est lue qu'en base,
//     via l'identifiant du resultat — jamais depuis le client.
//  3. Chaque passage cree une nouvelle ligne ListeningResult : l'historique des
//     scores de la serie est conserve.
// ---------------------------------------------------------------------------

export type CoLetter = "A" | "B" | "C" | "D";

export interface ListeningPayloadQuestion {
  id: string;
  order: number;
  audioUrl: string;
  prompt: string;
  options: Record<CoLetter, string>;
}

export interface ListeningSeriesPayload {
  series: {
    id: string;
    slug: string;
    title: string;
    level: string;
    description: string | null;
    listenings: number;
    questionCount: number;
  };
  questions: ListeningPayloadQuestion[];
}

export interface ListeningCorrection {
  series: {
    id: string;
    slug: string;
    title: string;
    level: string;
  };
  score: number;
  maxScore: number;
  createdAt: Date;
  questions: Array<{
    id: string;
    order: number;
    audioUrl: string;
    prompt: string;
    options: Record<CoLetter, string>;
    correctLetter: CoLetter;
    transcription: string;
    explanation: string;
    selectedLetter: CoLetter | null;
    isCorrect: boolean;
  }>;
}

export class ListeningError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_FOUND" | "FORBIDDEN" | "EMPTY",
  ) {
    super(message);
    this.name = "ListeningError";
  }
}

const SERIES_SELECT = {
  id: true,
  slug: true,
  title: true,
  level: true,
  order: true,
  description: true,
  listenings: true,
} as const;

/** Serie + nombre de questions, pour la liste des series. Sans `userId`,
 *  retourne le catalogue sans progression (cotes visiteurs). */
export async function getListeningSeriesList(
  userId?: string,
): Promise<
  Array<{
    id: string;
    slug: string;
    title: string;
    level: string;
    order: number;
    description: string | null;
    listenings: number;
    questionCount: number;
    bestScore: number | null;
    maxScore: number | null;
    bestResultId: string | null;
  }>
> {
  const series = await prisma.listeningSeries.findMany({
    orderBy: [{ level: "asc" }, { order: "asc" }],
    select: {
      ...SERIES_SELECT,
      _count: { select: { questions: true } },
    },
  });

  const bestBySeries = new Map<string, { score: number; maxScore: number; id: string }>();
  if (userId) {
    const results = await prisma.listeningResult.findMany({
      where: { userId },
      select: { seriesId: true, score: true, maxScore: true, id: true },
    });
    for (const row of results) {
      const current = bestBySeries.get(row.seriesId);
      if (!current || row.score > current.score) {
        bestBySeries.set(row.seriesId, { score: row.score, maxScore: row.maxScore, id: row.id });
      }
    }
  }

  return series.map((serie) => ({
    id: serie.id,
    slug: serie.slug,
    title: serie.title,
    level: serie.level,
    order: serie.order,
    description: serie.description,
    listenings: serie.listenings,
    questionCount: serie._count.questions,
    bestScore: bestBySeries.get(serie.id)?.score ?? null,
    maxScore: bestBySeries.get(serie.id)?.maxScore ?? null,
    bestResultId: bestBySeries.get(serie.id)?.id ?? null,
  }));
}

const toOptions = (
  row: { optionA: string; optionB: string; optionC: string; optionD: string },
): Record<CoLetter, string> => ({
  A: row.optionA,
  B: row.optionB,
  C: row.optionC,
  D: row.optionD,
});

/**
 * Donnees d'une session de serie : les questions SANS la bonne reponse ni la
 * transcription (voir regle 1).
 */
export async function getListeningSeriesBySlug(
  slug: string,
): Promise<ListeningSeriesPayload> {
  const serie = await prisma.listeningSeries.findUnique({
    where: { slug },
    include: {
      questions: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          order: true,
          audioUrl: true,
          prompt: true,
          optionA: true,
          optionB: true,
          optionC: true,
          optionD: true,
        },
      },
    },
  });
  if (!serie) throw new ListeningError("Serie introuvable", "NOT_FOUND");

  return {
    series: {
      id: serie.id,
      slug: serie.slug,
      title: serie.title,
      level: serie.level,
      description: serie.description,
      listenings: serie.listenings,
      questionCount: serie.questions.length,
    },
    questions: serie.questions.map((q) => ({
      id: q.id,
      order: q.order,
      audioUrl: q.audioUrl,
      prompt: q.prompt,
      options: toOptions(q),
    })),
  };
}

export interface AnswerInput {
  questionId: string;
  selectedLetter: CoLetter | null;
}

/**
 * Correction pure : calcule les resultats question par question.
 *
 * - Une question sans reponse compte comme erronnee (selectedLetter null).
 * - Une question inconnue de la serie est ignoree.
 * - Une question envoyee deux fois conserve la derniere reponse.
 */
export function gradeListeningSerie(
  questions: Array<{ id: string; correctLetter: CoLetter }>,
  answers: AnswerInput[],
): Array<{
  questionId: string;
  selectedLetter: CoLetter | null;
  isCorrect: boolean;
}> {
  const byId = new Map(answers.map((a) => [a.questionId, a.selectedLetter]));
  return questions.map((question) => {
    const selected = byId.get(question.id) ?? null;
    return {
      questionId: question.id,
      selectedLetter: selected,
      isCorrect: selected === question.correctLetter,
    };
  });
}

/**
 * Enregistre une passation : cree le resultat et ses reponses, puis retourne
 * le resultat. Le score est calcule cote serveur (regle 2).
 */
export async function submitListeningSeries(
  slug: string,
  userId: string,
  answers: AnswerInput[],
): Promise<{ resultId: string; score: number; maxScore: number }> {
  if (!answers.length) throw new ListeningError("Aucune reponse", "EMPTY");

  const serie = await prisma.listeningSeries.findUnique({
    where: { slug },
    include: {
      questions: {
        orderBy: { order: "asc" },
        select: { id: true, correctLetter: true },
      },
    },
  });
  if (!serie) throw new ListeningError("Serie introuvable", "NOT_FOUND");

  const graded = gradeListeningSerie(
    serie.questions.map((q) => ({
      id: q.id,
      correctLetter: q.correctLetter as CoLetter,
    })),
    answers,
  );

  const score = graded.filter((g) => g.isCorrect).length;
  const maxScore = serie.questions.length;

  const result = await prisma.listeningResult.create({
    data: {
      userId,
      seriesId: serie.id,
      score,
      maxScore,
      answers: {
        create: graded.map((g) => ({
          questionId: g.questionId,
          selectedLetter: g.selectedLetter,
          isCorrect: g.isCorrect,
        })),
      },
    },
    select: { id: true },
  });

  return { resultId: result.id, score, maxScore };
}

/** Lecture de la correction, uniquement si le resultat appartient a l'utilisateur. */
export async function getListeningCorrection(
  resultId: string,
  userId: string,
): Promise<ListeningCorrection> {
  const result = await prisma.listeningResult.findUnique({
    where: { id: resultId },
    include: {
      series: true,
      answers: true,
    },
  });
  if (!result || result.userId !== userId) {
    throw new ListeningError("Resultat introuvable", "FORBIDDEN");
  }

  const questions = await prisma.listeningQuestion.findMany({
    where: { seriesId: result.seriesId },
    orderBy: { order: "asc" },
  });
  const answersByQuestion = new Map(result.answers.map((a) => [a.questionId, a]));

  return {
    series: {
      id: result.series.id,
      slug: result.series.slug,
      title: result.series.title,
      level: result.series.level,
    },
    score: result.score,
    maxScore: result.maxScore,
    createdAt: result.createdAt,
    questions: questions.map((q) => ({
      id: q.id,
      order: q.order,
      audioUrl: q.audioUrl,
      prompt: q.prompt,
      options: toOptions(q),
      correctLetter: q.correctLetter as CoLetter,
      transcription: q.transcription,
      explanation: q.explanation,
      selectedLetter: (answersByQuestion.get(q.id)?.selectedLetter as CoLetter | null) ?? null,
      isCorrect: answersByQuestion.get(q.id)?.isCorrect ?? false,
    })),
  };
}

/** Niveaux CECRL connus, pour le tri et les pastilles de la liste. */
export const LISTENING_LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];