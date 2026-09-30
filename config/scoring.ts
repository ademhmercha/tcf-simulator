import type { Level } from "./enums";

// ---------------------------------------------------------------------------
// Bareme d'entrainement, sur l'echelle 0-699 du TCF.
//
// ATTENTION : ce bareme est une SIMULATION pedagogique. Il ne reproduit pas le
// bareme officiel, qui depend du niveau d'entree du candidat, de sa nationalite
// et de son parcours. Il donne un ordre de grandeur, pas une note d'examen.
//
// Regle de calcul, identique a celle demandee :
//
//   pourcentage_langue    = langue_correctes / langue_total
//   pourcentage_comprehension = comprehension_correctes / comprehension_total
//   pourcentage_final     = (pourcentage_langue + pourcentage_comprehension) / 2
//   score                 = round(pourcentage_final * 699)
//
// Les deux parties pesent donc le meme poids : 16/20 en langue et 21/30 en
// comprehension valent (0.80 + 0.70) / 2 = 0.75, soit 524/699, niveau C1.
//
// Pour ajuster : modifiez uniquement ce fichier. Aucun autre changement n'est
// necessaire (le nom du profil est memorise sur chaque Attempt).
// ---------------------------------------------------------------------------

/** Score maximal de l'echelle. */
export const SCORE_MAX = 699;

export interface ScoreBand {
  readonly min: number;
  readonly max: number;
  /** `null` = palier « A1 non atteint ». */
  readonly level: Level | null;
}

/** Correspondance score -> niveau. 100 points par palier, de 0 a 699. */
export const SCORE_BANDS: readonly ScoreBand[] = [
  { min: 0, max: 99, level: null },
  { min: 100, max: 199, level: "A1" },
  { min: 200, max: 299, level: "A2" },
  { min: 300, max: 399, level: "B1" },
  { min: 400, max: 499, level: "B2" },
  { min: 500, max: 599, level: "C1" },
  { min: 600, max: 699, level: "C2" },
];

/**
 * Convertit un score 0-699 en niveau CECRL.
 *
 * Retourne `null` sous 100 points : le candidat n'a pas atteint le niveau A1,
 * ce qui n'est pas la meme chose qu'une tentative non notee.
 */
export function scoreToLevel(score: number): Level | null {
  const clamped = Math.max(0, Math.min(SCORE_MAX, Math.round(score)));
  return SCORE_BANDS.find((band) => clamped >= band.min && clamped <= band.max)?.level ?? null;
}

/** Nombre de points manquants pour atteindre le palier suivant. */
export function pointsToNextBand(score: number): number {
  const clamped = Math.max(0, Math.min(SCORE_MAX, Math.round(score)));
  const next = SCORE_BANDS.find((band) => band.min > clamped);
  return next ? next.min - clamped : 0;
}

/** Une epreuve : nombre de bonnes reponses et nombre de questions notees. */
export interface ScorePart {
  readonly correct: number;
  readonly total: number;
}

export interface SimulatedScore {
  /** Score simule, de 0 a 699, arrondi a l'entier le plus proche. */
  readonly score: number;
  /** `null` sous 100 points : A1 non atteint. */
  readonly level: Level | null;
  /** Pourcentage final, entre 0 et 1. */
  readonly percentage: number;
}

/**
 * Calcule le score simule a partir des resultats par epreuve.
 *
 * Chaque epreuve contribue pour une moitie du resultat, quelle que soit sa
 * taille : une epreuve de 20 questions compte autant qu'une epreuve de 30.
 */
export function computeSimulatedScore(parts: readonly ScorePart[]): SimulatedScore {
  const usable = parts.filter((part) => part.total > 0);

  if (usable.length === 0) {
    return { score: 0, level: null, percentage: 0 };
  }

  const percentage =
    usable.reduce((sum, part) => sum + Math.min(1, Math.max(0, part.correct / part.total)), 0) /
    usable.length;

  const score = Math.max(0, Math.min(SCORE_MAX, Math.round(percentage * SCORE_MAX)));

  return { score, level: scoreToLevel(score), percentage };
}

export interface ScoringProfile {
  readonly id: string;
  readonly label: string;
}

/** Nom du bareme, memorise sur chaque tentative pour la tracabilite. */
export const DEFAULT_SCORING_PROFILE: ScoringProfile = {
  id: "tcf-699-v1",
  label: "Echelle TCF 0-699 (estimation d'entrainement)",
};

/** Correspondance niveau + libelle pedagogique, pour l'affichage. */
export const LEVEL_METADATA: Record<
  Level,
  { order: number; color: string; tone: "foundation" | "independent" | "advanced" }
> = {
  A1: { order: 1, color: "hsl(var(--level-a1))", tone: "foundation" },
  A2: { order: 2, color: "hsl(var(--level-a2))", tone: "foundation" },
  B1: { order: 3, color: "hsl(var(--level-b1))", tone: "independent" },
  B2: { order: 4, color: "hsl(var(--level-b2))", tone: "independent" },
  C1: { order: 5, color: "hsl(var(--level-c1))", tone: "advanced" },
  C2: { order: 6, color: "hsl(var(--level-c2))", tone: "advanced" },
};

export function levelTone(level: Level): "foundation" | "independent" | "advanced" {
  return LEVEL_METADATA[level].tone;
}
