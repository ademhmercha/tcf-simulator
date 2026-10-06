/**
 * Comprehension orale : types partages.
 *
 * Le contenu est declare dans `data/co/index.ts` (CO_SERIES) et consomme par
 * le seed (prisma/seed.ts) et par le script de synthese audio
 * (scripts/generate-co-audio.ts).
 */
export type CoAnswer = "A" | "B" | "C" | "D";

/** Voix de synthese autorisees pour la generation des fichiers audio. */
export const CO_VOICES = ["fr-FR-DeniseNeural", "fr-FR-HenriNeural"] as const;
export type CoVoice = (typeof CO_VOICES)[number];

/** Debit de synthese (pourcentage) selon le niveau, pour un TCF plus fidele. */
export const CO_RATE_BY_LEVEL: Record<string, string> = {
  A1: "-15%",
  A2: "-10%",
  B1: "-5%",
  B2: "0%",
  C1: "+5%",
  C2: "+8%",
};

export interface CoQuestionInput {
  /** Texte exact lu a voix haute et stocke dans `ListeningQuestion.transcription`. */
  transcription: string;
  prompt: string;
  options: [string, string, string, string];
  correct: CoAnswer;
  explanation: string;
}

export interface CoSeriesInput {
  slug: string;
  title: string;
  /** A1 | A2 | B1 | B2 | C1 | C2, ou palette melangee (ex: "B1-B2"). */
  level: string;
  order: number;
  description: string;
  /** Nombre d'ecoutes autorisees par fichier audio. */
  listenings: number;
  questions: CoQuestionInput[];
}

/** Chemin public d'un fichier audio genere, ex: /audio/co/co-a1/03.mp3 */
export function coAudioUrl(seriesSlug: string, itemIndex: number): string {
  const n = String(itemIndex + 1).padStart(2, "0");
  return `/audio/co/${seriesSlug}/${n}.mp3`;
}