import { describe, expect, it } from "vitest";

import {
  SCORE_MAX,
  computeSimulatedScore,
  pointsToNextBand,
  scoreToLevel,
} from "@/config/scoring";

// Le bareme de la page de resultats est la fonctionnalite la plus critique de
// l'application : ces tests verrouillent la conversion score -> niveau et
// l'echelle 0-699.

describe("scoreToLevel", () => {
  it("laisse A1 non atteint sous 100 points", () => {
    expect(scoreToLevel(0)).toBeNull();
    expect(scoreToLevel(99)).toBeNull();
    expect(scoreToLevel(100)).toBe("A1");
  });

  it("place chaque palier sur 100 points jusqu'a C2", () => {
    expect(scoreToLevel(199)).toBe("A1");
    expect(scoreToLevel(200)).toBe("A2");
    expect(scoreToLevel(299)).toBe("A2");
    expect(scoreToLevel(300)).toBe("B1");
    expect(scoreToLevel(399)).toBe("B1");
    expect(scoreToLevel(400)).toBe("B2");
    expect(scoreToLevel(500)).toBe("C1");
    expect(scoreToLevel(600)).toBe("C2");
    expect(scoreToLevel(699)).toBe("C2");
  });

  it("borne les valeurs hors echelle", () => {
    expect(scoreToLevel(-50)).toBeNull();
    expect(scoreToLevel(5000)).toBe("C2");
  });
});

describe("pointsToNextBand", () => {
  it("indique les points manquants pour le palier suivant", () => {
    expect(pointsToNextBand(0)).toBe(100);
    expect(pointsToNextBand(150)).toBe(50);
    expect(pointsToNextBand(699)).toBe(0);
  });
});

describe("computeSimulatedScore", () => {
  it("donne le meme poids a une epreuve de 20 et une epreuve de 30", () => {
    // 16/20 = 80 %, 21/30 = 70 %, moyenne 75 % -> 0.75 x 699 = 524.
    const result = computeSimulatedScore([
      { correct: 16, total: 20 },
      { correct: 21, total: 30 },
    ]);
    expect(result.percentage).toBeCloseTo(0.75, 10);
    expect(result.score).toBe(524);
    expect(result.level).toBe("C1");
  });

  it("ignore une epreuve sans question notee", () => {
    const result = computeSimulatedScore([
      { correct: 16, total: 20 },
      { correct: 0, total: 0 },
    ]);
    expect(result.score).toBe(559);
    expect(result.level).toBe("C1");
  });

  it("renvoie 0 et A1 non atteint sans epreuve", () => {
    expect(computeSimulatedScore([])).toEqual({ score: 0, level: null, percentage: 0 });
  });

  it("borne un pourcentage hors bornes", () => {
    expect(computeSimulatedScore([{ correct: 25, total: 20 }]).score).toBe(SCORE_MAX);
    expect(computeSimulatedScore([{ correct: -5, total: 20 }]).score).toBe(0);
  });

  it("reste coherent avec le niveau pour un resultat mediocre", () => {
    const result = computeSimulatedScore([
      { correct: 5, total: 20 },
      { correct: 8, total: 30 },
    ]);
    expect(result.score).toBe(181);
    expect(result.level).toBe("A1");
  });
});
