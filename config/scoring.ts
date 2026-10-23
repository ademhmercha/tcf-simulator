import type { Level } from "./enums";

// ---------------------------------------------------------------------------
// Bareme d'entrainement, sur l'echelle 0-699 du TCF.
//
// ATTENTION : ce bareme est une SIMULATION pedagogique. Il ne reproduit pas le
// bareme officiel, qui depend du niveau d'entree du candidat, de sa nationalite
// et de son parcours. Il donne un ordre de grandeur, pas une note d'examen.
//
// Regle de calcul appliquee a chaque tentative :
//
//   score_epreuve = round(bonnes_epreuve / total_epreuve * 699)
//   score_global  = round(moyenne(score_epreuve1, ... score_epreuveN))
//   niveau        = palier CECRL du score_global
//
// Un examen blanc compte trois epreuves (comprehension orale, structure de la
// langue, comprehension ecrite) a poids egal ; une serie d'entrainement en
// compte deux (structure, comprehension ecrite). Une epreuve jamais ouverte
// vaut 0, comme une question sans reponse.
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
 * Chaque epreuve contribue pour une part egale du resultat, quelle que soit sa
 * taille : une epreuve de 20 questions compte autant qu'une epreuve de 30.
 *
 * @deprecated Utiliser `computeSectionScore` + `computeOverallScore` : c'est le
 * bareme applique aux examens blancs (score arrondi par epreuve, puis moyenne
 * des epreuves). Conserve pour les anciennes tentatives a deux epreuves.
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

/**
 * Score d'une epreuve sur l'echelle 0-699.
 *
 * Regle officielle de la simulation : `arrondi(bonnes / total * 699)`. Le
 * denominateur est toujours le nombre de questions de l'epreuve (une question
 * sans reponse compte faux), jamais le nombre de questions traitees.
 */
export function computeSectionScore(correct: number, total: number): number {
  if (!Number.isFinite(correct) || !Number.isFinite(total) || total <= 0) return 0;
  const ratio = Math.min(1, Math.max(0, correct / total));
  return Math.round(ratio * SCORE_MAX);
}

/**
 * Score global : moyenne arrondie des scores d'epreuve.
 *
 * Un examen blanc a trois epreuves (CO, structure, CE) ; une serie
 * d'entrainement en a deux. Chaque epreuve pese donc le meme poids.
 */
export function computeOverallScore(sectionScores: readonly number[]): SimulatedScore {
  const usable = sectionScores
    .filter((value) => Number.isFinite(value))
    .map((value) => Math.max(0, Math.min(SCORE_MAX, Math.round(value))));

  if (usable.length === 0) {
    return { score: 0, level: null, percentage: 0 };
  }

  const score = Math.round(
    usable.reduce((sum, value) => sum + value, 0) / usable.length,
  );
  const clamped = Math.max(0, Math.min(SCORE_MAX, score));

  return {
    score: clamped,
    level: scoreToLevel(clamped),
    percentage: clamped / SCORE_MAX,
  };
}

export interface ScoringProfile {
  readonly id: string;
  readonly label: string;
}

/** Nom du bareme, memorise sur chaque tentative pour la tracabilite. */
export const DEFAULT_SCORING_PROFILE: ScoringProfile = {
  id: "tcf-699-v2",
  label: "Echelle TCF 0-699 (score par epreuve, moyenne des epreuves)",
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
