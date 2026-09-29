import type { Level, SectionType } from "./enums";

// ---------------------------------------------------------------------------
// Bareme CECRL - PROVISOIRE ET NON OFFICIEL.
//
// Les niveaux « teste » du TCF renvoient une echelle de scores distincte des
// niveaux CECRL « optimise ». Les seuils ci-dessous sont une approximation
// pedagogique destinee a l'entrainement : ils servent a situer le candidat
// dans une fourchette de niveau, pas a prevoir un resultat d'examen.
//
// Pour ajuster : modifiez uniquement ce fichier. Aucun autre changement n'est
// necessaire (le nom du profil est memorise sur chaque Attempt).
// ---------------------------------------------------------------------------

export interface ScoringBand {
  readonly level: Level;
  /** Score minimum (en points bruts) requis pour atteindre ce niveau. */
  readonly min: number;
}

export interface ScoringProfile {
  readonly id: string;
  readonly label: string;
  /** Bareme par epreuve : points necessaires pour atteindre chaque niveau. */
  readonly bandsBySection: Record<SectionType, readonly ScoringBand[]>;
}

export const DEFAULT_SCORING_PROFILE: ScoringProfile = {
  id: "approx-2026-v1",
  label: "Bareme d'entrainement (approximation non officielle)",
  bandsBySection: {
    // 20 questions
    STRUCTURE: [
      { level: "A1", min: 0 },
      { level: "A2", min: 8 },
      { level: "B1", min: 12 },
      { level: "B2", min: 15 },
      { level: "C1", min: 17 },
      { level: "C2", min: 19 },
    ],
    // 30 questions
    COMPREHENSION_ECRITE: [
      { level: "A1", min: 0 },
      { level: "A2", min: 12 },
      { level: "B1", min: 18 },
      { level: "B2", min: 23 },
      { level: "C1", min: 26 },
      { level: "C2", min: 29 },
    ],
  },
};

const PROFILES: Record<string, ScoringProfile> = {
  [DEFAULT_SCORING_PROFILE.id]: DEFAULT_SCORING_PROFILE,
};

export function getScoringProfile(id?: string | null): ScoringProfile {
  if (id && PROFILES[id]) return PROFILES[id];
  return DEFAULT_SCORING_PROFILE;
}

/**
 * Convertit un score brut d'epreuve en niveau CECRL.
 * Retourne null si l'epreuve n'a pas ete traitee.
 */
export function scoreToLevel(
  score: number,
  section: SectionType,
  profile: ScoringProfile = DEFAULT_SCORING_PROFILE,
): Level {
  const bands = profile.bandsBySection[section];
  const firstBand = bands?.[0];
  if (!bands || bands.length === 0 || !firstBand) return "A1";
  let result: Level = firstBand.level;
  for (const band of bands) {
    if (score >= band.min) result = band.level;
    else break;
  }
  return result;
}

/**
 * Note globale : moyenne des pourcentages de reussite des epreuves traitees,
 * puis conversion via le bareme de l'epreuve la plus basse (la plus limitante).
 *
 * Exigence pedagogique : on ne peut pas declarer un C2 global si la structure
 * de la langue n'est pas au C2.
 */
export function computeCefrLevel(
  scores: Partial<Record<SectionType, number>>,
  maxScores: Partial<Record<SectionType, number>>,
  profile: ScoringProfile = DEFAULT_SCORING_PROFILE,
): Level | null {
  const order: SectionType[] = ["STRUCTURE", "COMPREHENSION_ECRITE"];
  const levels: Level[] = [];

  for (const section of order) {
    const score = scores[section];
    const max = maxScores[section];
    if (score === undefined || max === undefined || max <= 0) continue;
    levels.push(scoreToLevel(score, section, profile));
  }

  if (levels.length === 0) return null;
  const order2 = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
  const worst = levels.reduce((min, l) => (order2.indexOf(l) < order2.indexOf(min) ? l : min));
  return worst;
}

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
