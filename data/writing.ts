/**
 * Expression ecrite : catalogue des sujets d'entrainement.
 *
 * Source de verite : `data/writing_prompts.json` (30 sujets B2-C2).
 * Ce module transforme le JSON brut en donnees typees et validees (Zod), et
 * expose les helpers partages par le seed, les pages et les tests.
 *
 * L'epreuve TCF d'expression ecrite se passe SUR PAPIER : le site ne fournit
 * que la consigne, le chronometre, une feuille a imprimer et une
 * auto-evaluation. Aucun texte n'est saisi ni corrige par une IA.
 */
import { z } from "zod";

import {
  WRITING_LEVELS,
  WRITING_TASKS,
  type WritingLevel,
  type WritingTask,
  type WritingTheme,
} from "../config/enums";
import rawPrompts from "./writing_prompts.json";

// ---------------------------------------------------------------------------
// Schema du JSON source
// ---------------------------------------------------------------------------

const DocumentSchema = z.object({
  author: z.string().min(1),
  text: z.string().min(1),
});

const PromptSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug d'ecriture invalide"),
  task: z.number().int().refine(
    (value): value is WritingTask => (WRITING_TASKS as readonly number[]).includes(value),
    "tache invalide",
  ),
  level: z.enum(WRITING_LEVELS),
  theme: z.string().min(1),
  title: z.string().min(1),
  instructions: z.string().min(1),
  documents: z.array(DocumentSchema),
  min_words: z.number().int().positive(),
  max_words: z.number().int().positive(),
  duration_min: z.number().int().positive(),
  plan: z.array(z.string().min(1)),
  useful_phrases: z.array(z.string().min(1)),
  common_mistakes: z.array(z.string().min(1)),
});

const RawPrompt = PromptSchema.array().min(1);

// ---------------------------------------------------------------------------
// Types publics
// ---------------------------------------------------------------------------

export interface WritingDocument {
  author: string;
  text: string;
}

export interface WritingPromptInput {
  slug: string;
  task: WritingTask;
  level: WritingLevel;
  /** Theme normalise en slug ascii (ex. "etudes") : c'est la valeur stockee. */
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
  /** Rang d'affichage (1 = premier sujet de la liste). */
  order: number;
}

/**
 * Normalise un theme en slug ascii ("etudes").
 *
 * Les URL de filtre et la colonne `theme` de la base utilisent cette forme :
 * elle reste lisible en query string et ne depend d'aucun encodage.
 */
export function themeSlug(theme: string): string {
  return theme
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const parsed = RawPrompt.safeParse(rawPrompts);
if (!parsed.success) {
  throw new Error(
    `data/writing_prompts.json invalide : ${parsed.error.issues
      .map((issue) => `${issue.path.join(".")} ${issue.message}`)
      .join("; ")}`,
  );
}

const RAW_PROMPTS = parsed.data;

/** Sujets du catalogue, valides et normalises. */
export const WRITING_PROMPTS: readonly WritingPromptInput[] = RAW_PROMPTS.map(
  (prompt, index) => ({
    slug: prompt.slug,
    task: prompt.task,
    level: prompt.level,
    theme: themeSlug(prompt.theme) as WritingTheme,
    title: prompt.title,
    instructions: prompt.instructions,
    documents: prompt.documents,
    minWords: prompt.min_words,
    maxWords: prompt.max_words,
    durationMin: prompt.duration_min,
    plan: prompt.plan,
    usefulPhrases: prompt.useful_phrases,
    commonMistakes: prompt.common_mistakes,
    order: index + 1,
  }),
);

/** Libelle accentue d'origine de chaque theme (slug ascii -> libelle). */
export const WRITING_THEME_LABELS: Readonly<Record<string, string>> = RAW_PROMPTS.reduce<
  Record<string, string>
>((acc, prompt) => {
  acc[themeSlug(prompt.theme)] = prompt.theme;
  return acc;
}, {});

/** Theme lisible (accent rendu) a partir de son slug ascii. */
export function themeLabel(slug: string): string {
  return WRITING_THEME_LABELS[slug] ?? slug;
}

// ---------------------------------------------------------------------------
// Checklist d'auto-evaluation
// ---------------------------------------------------------------------------

/**
 * Items de la checklist d'auto-evaluation, dans l'ordre d'affichage.
 *
 * Les libelles sont traduits (namespace i18n `writing.checklist.<id>`) :
 * cette liste ne contient que des identifiants stables, utilises comme cles
 * de la colonne `checklist` (JSON) dans la base.
 */
export const WRITING_CHECKLIST_IDS = [
  "consigne",
  "longueur",
  "registre",
  "organisation",
  "connecteurs",
  "relecture",
  "exemples",
  "lisibilite",
] as const;

export type WritingChecklistId = (typeof WRITING_CHECKLIST_IDS)[number];

/** Nombre d'items de la checklist : sert au calcul du score. */
export const WRITING_CHECKLIST_SIZE = WRITING_CHECKLIST_IDS.length;

/**
 * Calcule le score d'auto-evaluation : pourcentage de cases cochees.
 *
 * Le resultat est un indicateur d'entrainement, jamais une note officielle.
 */
export function computeSelfScore(checklist: Record<string, boolean>): number {
  const checked = WRITING_CHECKLIST_IDS.filter((id) => checklist[id] === true).length;
  return Math.round((checked / WRITING_CHECKLIST_SIZE) * 100);
}

/** Nombre de cases cochees (detail affiche a cote du pourcentage). */
export function countChecked(checklist: Record<string, boolean>): number {
  return WRITING_CHECKLIST_IDS.filter((id) => checklist[id] === true).length;
}
