import { prisma } from "@/lib/db";
import {
  WRITING_LEVELS,
  WRITING_TASKS,
  WRITING_THEMES,
  type WritingLevel,
  type WritingTask,
  type WritingTheme,
} from "@/config/enums";
import {
  WRITING_PROMPTS,
  type WritingDocument,
  type WritingPromptInput,
} from "@/data/writing";

// ---------------------------------------------------------------------------
// Service du module « Expression écrite ».
//
// Regles :
//  1. L'epreuve se passe SUR PAPIER : le site ne stocke aucun texte redige,
//     seulement le temps passe, le nombre de mots, la checklist d'auto-
//     evaluation et un eventuel commentaire.
//  2. Le catalogue des 30 sujets est fige dans `data/writing_prompts.json`
//     (`data/writing.ts`). La table `writing_prompts` en est le miroir en base :
//     elle porte les tentatives via cle etrangere.
//  3. Si la table est vide (import non joue), le catalogue statique prend le
//     relais : les pages publiques restent accessibles sans base alimentee.
// ---------------------------------------------------------------------------

export interface WritingPromptView {
  id: string | null;
  slug: string;
  task: WritingTask;
  level: WritingLevel;
  theme: WritingTheme;
  title: string;
  instructions: string;
  documents: WritingDocument[];
  minWords: number;
  maxWords: number;
  durationMin: number;
  plan: string[];
  usefulPhrases: string[];
  commonMistakes: string[];
}

export interface WritingAttemptView {
  id: string;
  slug: string;
  title: string;
  task: WritingTask;
  level: WritingLevel;
  theme: WritingTheme;
  startedAt: Date;
  finishedAt: Date | null;
  durationSeconds: number | null;
  wordCount: number | null;
  checklist: Record<string, boolean>;
  selfScore: number | null;
  notes: string | null;
}

export interface WritingFilters {
  task?: WritingTask;
  level?: WritingLevel;
  theme?: WritingTheme;
}

export class WritingError extends Error {
  constructor(
    message: string,
    readonly code: "NOT_FOUND" | "FORBIDDEN" | "EMPTY",
  ) {
    super(message);
    this.name = "WritingError";
  }
}

/** Lit un tableau JSON stocke en colonne texte. Renvoie `[]` si illisible. */
function parseStringArray(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string");
    }
  } catch {
    // Donnee illisible : on degrade vers une liste vide plutot que de casser la page.
  }
  return [];
}

/** Lit un objet JSON stocke en colonne texte (checklist). */
function parseBooleanMap(value: string): Record<string, boolean> {
  try {
    const parsed: unknown = JSON.parse(value);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const result: Record<string, boolean> = {};
      for (const [key, item] of Object.entries(parsed as Record<string, unknown>)) {
        result[key] = item === true;
      }
      return result;
    }
  } catch {
    // Donnee illisible : on degrade vers une checklist vide.
  }
  return {};
}

function parseDocuments(value: string): WritingDocument[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item): item is WritingDocument =>
          Boolean(item) &&
          typeof item === "object" &&
          typeof (item as WritingDocument).author === "string" &&
          typeof (item as WritingDocument).text === "string",
      );
    }
  } catch {
    // Donnee illisible : on degrade vers une liste vide.
  }
  return [];
}

type PromptRow = {
  id: string;
  slug: string;
  task: number;
  level: string;
  theme: string;
  title: string;
  instructions: string;
  documents: string;
  minWords: number;
  maxWords: number;
  durationMin: number;
  plan: string;
  usefulPhrases: string;
  commonMistakes: string;
};

function rowToView(row: PromptRow): WritingPromptView {
  return {
    id: row.id,
    slug: row.slug,
    task: row.task as WritingTask,
    level: row.level as WritingLevel,
    theme: row.theme as WritingTheme,
    title: row.title,
    instructions: row.instructions,
    documents: parseDocuments(row.documents),
    minWords: row.minWords,
    maxWords: row.maxWords,
    durationMin: row.durationMin,
    plan: parseStringArray(row.plan),
    usefulPhrases: parseStringArray(row.usefulPhrases),
    commonMistakes: parseStringArray(row.commonMistakes),
  };
}

function staticToView(prompt: WritingPromptInput): WritingPromptView {
  return {
    id: null,
    slug: prompt.slug,
    task: prompt.task,
    level: prompt.level,
    theme: prompt.theme,
    title: prompt.title,
    instructions: prompt.instructions,
    documents: prompt.documents,
    minWords: prompt.minWords,
    maxWords: prompt.maxWords,
    durationMin: prompt.durationMin,
    plan: prompt.plan,
    usefulPhrases: prompt.usefulPhrases,
    commonMistakes: prompt.commonMistakes,
  };
}

const PROMPT_SELECT = {
  id: true,
  slug: true,
  task: true,
  level: true,
  theme: true,
  title: true,
  instructions: true,
  documents: true,
  minWords: true,
  maxWords: true,
  durationMin: true,
  plan: true,
  usefulPhrases: true,
  commonMistakes: true,
} as const;

function matchesFilters(
  prompt: WritingPromptView,
  filters: WritingFilters,
): boolean {
  if (filters.task !== undefined && prompt.task !== filters.task) return false;
  if (filters.level !== undefined && prompt.level !== filters.level) return false;
  if (filters.theme !== undefined && prompt.theme !== filters.theme) return false;
  return true;
}

/**
 * Catalogue des sujets, filtres optionnels.
 *
 * La base est la source de reference ; si elle est vide, le catalogue statique
 * prend le relais (import des sujets non joue).
 */
export async function listWritingPrompts(
  filters: WritingFilters = {},
): Promise<WritingPromptView[]> {
  const rows = await prisma.writingPrompt.findMany({
    where: {
      isPublished: true,
      ...(filters.task !== undefined ? { task: filters.task } : {}),
      ...(filters.level !== undefined ? { level: filters.level } : {}),
      ...(filters.theme !== undefined ? { theme: filters.theme } : {}),
    },
    orderBy: [{ task: "asc" }, { level: "asc" }, { order: "asc" }],
    select: PROMPT_SELECT,
  });

  if (rows.length > 0) return rows.map(rowToView);

  return WRITING_PROMPTS.filter((prompt) =>
    matchesFilters(staticToView(prompt), filters),
  ).map(staticToView);
}

/** Un sujet par son slug, ou `null`. */
export async function getWritingPromptBySlug(
  slug: string,
): Promise<WritingPromptView | null> {
  const row = await prisma.writingPrompt.findUnique({
    where: { slug },
    select: PROMPT_SELECT,
  });
  if (row) return rowToView(row);

  const staticPrompt = WRITING_PROMPTS.find((prompt) => prompt.slug === slug);
  return staticPrompt ? staticToView(staticPrompt) : null;
}

/**
 * Garantit l'existence de la ligne `writing_prompts` pour un slug.
 *
 * Les tentatives y sont rattachees par cle etrangere : si l'import des sujets
 * n'a pas ete joue, on cree la ligne a la volee depuis le catalogue statique.
 */
export async function ensureWritingPrompt(slug: string): Promise<string> {
  const existing = await prisma.writingPrompt.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (existing) return existing.id;

  const prompt = WRITING_PROMPTS.find((item) => item.slug === slug);
  if (!prompt) throw new WritingError("Sujet introuvable", "NOT_FOUND");

  const created = await prisma.writingPrompt.create({
    data: {
      slug: prompt.slug,
      task: prompt.task,
      level: prompt.level,
      theme: prompt.theme,
      title: prompt.title,
      instructions: prompt.instructions,
      documents: JSON.stringify(prompt.documents),
      minWords: prompt.minWords,
      maxWords: prompt.maxWords,
      durationMin: prompt.durationMin,
      plan: JSON.stringify(prompt.plan),
      usefulPhrases: JSON.stringify(prompt.usefulPhrases),
      commonMistakes: JSON.stringify(prompt.commonMistakes),
      order: prompt.order,
      isPublished: true,
    },
    select: { id: true },
  });
  return created.id;
}

export interface RecordAttemptInput {
  slug: string;
  durationSeconds: number;
  wordCount: number;
  checklist: Record<string, boolean>;
  selfScore: number;
  notes?: string | null;
  startedAt?: Date;
}

/** Enregistre une tentative d'expression ecrite pour un utilisateur. */
export async function recordWritingAttempt(
  userId: string,
  input: RecordAttemptInput,
): Promise<WritingAttemptView> {
  const promptId = await ensureWritingPrompt(input.slug);
  const prompt = await prisma.writingPrompt.findUniqueOrThrow({
    where: { id: promptId },
    select: { slug: true, title: true, task: true, level: true, theme: true },
  });

  const attempt = await prisma.writingAttempt.create({
    data: {
      userId,
      promptId,
      startedAt: input.startedAt ?? new Date(),
      finishedAt: new Date(),
      durationSeconds: input.durationSeconds,
      wordCount: input.wordCount,
      checklist: JSON.stringify(input.checklist),
      selfScore: input.selfScore,
      notes: input.notes ?? null,
    },
    select: { id: true, startedAt: true, finishedAt: true },
  });

  return {
    id: attempt.id,
    slug: prompt.slug,
    title: prompt.title,
    task: prompt.task as WritingTask,
    level: prompt.level as WritingLevel,
    theme: prompt.theme as WritingTheme,
    startedAt: attempt.startedAt,
    finishedAt: attempt.finishedAt,
    durationSeconds: input.durationSeconds,
    wordCount: input.wordCount,
    checklist: input.checklist,
    selfScore: input.selfScore,
    notes: input.notes ?? null,
  };
}

/** Historique des tentatives d'un utilisateur, de la plus recente a la plus ancienne. */
export async function listWritingAttempts(userId: string): Promise<WritingAttemptView[]> {
  const attempts = await prisma.writingAttempt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      startedAt: true,
      finishedAt: true,
      durationSeconds: true,
      wordCount: true,
      checklist: true,
      selfScore: true,
      notes: true,
      prompt: { select: { slug: true, title: true, task: true, level: true, theme: true } },
    },
  });

  return attempts.map((attempt) => ({
    id: attempt.id,
    slug: attempt.prompt.slug,
    title: attempt.prompt.title,
    task: attempt.prompt.task as WritingTask,
    level: attempt.prompt.level as WritingLevel,
    theme: attempt.prompt.theme as WritingTheme,
    startedAt: attempt.startedAt,
    finishedAt: attempt.finishedAt,
    durationSeconds: attempt.durationSeconds,
    wordCount: attempt.wordCount,
    checklist: parseBooleanMap(attempt.checklist),
    selfScore: attempt.selfScore,
    notes: attempt.notes,
  }));
}

export interface WritingProgress {
  attempts: number;
  averageScore: number;
  bestScore: number;
  lastAttemptAt: Date | null;
}

/** Petit indicateur de progression : nombre de tentatives et moyenne. */
export async function getWritingProgress(userId: string): Promise<WritingProgress> {
  const attempts = await prisma.writingAttempt.findMany({
    where: { userId },
    select: { selfScore: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  if (attempts.length === 0) {
    return { attempts: 0, averageScore: 0, bestScore: 0, lastAttemptAt: null };
  }

  const scores = attempts
    .map((attempt) => attempt.selfScore)
    .filter((score): score is number => typeof score === "number");
  const total = scores.reduce((sum, score) => sum + score, 0);

  return {
    attempts: attempts.length,
    averageScore: scores.length > 0 ? Math.round(total / scores.length) : 0,
    bestScore: scores.length > 0 ? Math.max(...scores) : 0,
    lastAttemptAt: attempts[0]?.createdAt ?? null,
  };
}

/** Valeurs proposees dans les filtres de la liste des sujets. */
export const WRITING_FILTER_OPTIONS = {
  tasks: WRITING_TASKS,
  levels: WRITING_LEVELS,
  themes: WRITING_THEMES,
} as const;
