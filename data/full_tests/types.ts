/**
 * Examens blancs : modele de redaction.
 *
 * Chaque examen est declare dans un module `test-NN.ts`, puis compile vers
 * `data/tcf_full_tests_10x70.json` par `npm run content:full`. Le JSON produit
 * est la seule source lue par le seed : modifier un module sans recompiler ne
 * change donc rien en base.
 *
 * Le redacteur ne fournit ni identifiants, ni numeros, ni URL audio : le
 * compilateur les derive du numero de l'examen et de l'ordre des questions. Il
 * verifie aussi les volumes, les niveaux et les longueurs des textes.
 */

export type FullLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type FullAnswer = "A" | "B" | "C" | "D";

export type FullOptions = [string, string, string, string];

/** Question a choix multiple (structure, comprehension ecrite). */
export interface FullQuestion {
  prompt: string;
  options: FullOptions;
  correct: FullAnswer;
  explanation: string;
  level: FullLevel;
  category: string;
}

/** Question de comprehension orale : la transcription est lue par la synthese. */
export interface FullListeningQuestion extends FullQuestion {
  /**
   * Texte exact lu a voix haute. Il doit etre autonome : pendant l'epreuve,
   * le candidat n'entend que l'audio.
   */
  transcription: string;
}

/** Texte de comprehension ecrite : un document, une question. */
export interface FullReadingDocument {
  title: string;
  text: string;
  question: Omit<FullQuestion, "category"> & { category?: string };
}

export interface FullTestInput {
  /** Numero de l'examen, de 1 a 20. Determine aussi l'identifiant et le slug. */
  number: number;
  description: string;
  /** 25 questions, niveaux A1 -> C2. */
  listening: FullListeningQuestion[];
  /** 20 questions, niveaux A2 -> C2, dont exactement 2 de conjugaison. */
  structure: FullQuestion[];
  /** 25 documents, un par question, niveaux B1 -> C2. */
  reading: FullReadingDocument[];
}

/** Identite visuelle et technique d'un examen. */
export const FULL_TEST_SIZE = {
  listening: 25,
  structure: 20,
  reading: 25,
} as const;

export const FULL_TEST_DURATIONS = {
  listening: 25,
  structure: 20,
  reading: 45,
} as const;

export const FULL_TEST_LEVELS = {
  listening: {
    A1: 3,
    A2: 4,
    B1: 5,
    B2: 6,
    C1: 4,
    C2: 3,
  },
  structure: {
    A2: 2,
    B1: 5,
    B2: 7,
    C1: 4,
    C2: 2,
  },
  reading: {
    B1: 5,
    B2: 10,
    C1: 5,
    C2: 5,
  },
} as const satisfies Record<string, Partial<Record<FullLevel, number>>>;

/** Longueur attendue des textes de comprehension ecrite, en caracteres. */
export const FULL_READING_LENGTH = {
  B1: [180, 260],
  B2: [300, 450],
  C1: [650, 850],
  C2: [800, 1000],
} as const satisfies Record<string, readonly [number, number]>;

export const fullTestId = (number: number): string =>
  `full-${String(number).padStart(2, "0")}`;

export const fullTestTitle = (number: number): string => `Examen blanc TCF ${number}`;

export const fullTestSlug = (number: number): string =>
  `examen-blanc-tcf-${number}`;

export function fullTestAudioUrl(number: number, index: number): string {
  const n = String(index + 1).padStart(2, "0");
  return `/audio/examens/${fullTestId(number)}/${n}.mp3`;
}

/** Aide a typer un module sans annotation repetitive. */
export function defineFullTest(test: FullTestInput): FullTestInput {
  return test;
}
