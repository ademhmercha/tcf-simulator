import { describe, expect, it } from "vitest";

import {
  WRITING_LEVELS,
  WRITING_TASKS,
  WRITING_THEMES,
} from "@/config/enums";
import {
  computeSelfScore,
  countChecked,
  themeSlug,
  WRITING_CHECKLIST_IDS,
  WRITING_PROMPTS,
} from "@/data/writing";

// Slug d'URL attendu : minuscules, chiffres, tirets (ex: "t1-b2-01-reclamation").
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("catalogue des sujets d'expression ecrite", () => {
  it("contient 30 sujets valides", () => {
    expect(WRITING_PROMPTS).toHaveLength(30);
  });

  it("a des slugs uniques et valides", () => {
    const slugs = WRITING_PROMPTS.map((prompt) => prompt.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(SLUG_RE);
    }
  });

  it("a des niveaux et taches issus des enums metier", () => {
    for (const prompt of WRITING_PROMPTS) {
      expect(WRITING_TASKS).toContain(prompt.task);
      expect(WRITING_LEVELS).toContain(prompt.level);
      expect(WRITING_THEMES).toContain(prompt.theme);
    }
  });

  it("respecte les fourchettes de mots et les durees de chaque tache", () => {
    const expected: Record<number, { min: number; max: number; minutes: number }> = {
      1: { min: 60, max: 120, minutes: 10 },
      2: { min: 120, max: 150, minutes: 20 },
      3: { min: 120, max: 180, minutes: 30 },
    };

    for (const prompt of WRITING_PROMPTS) {
      const rule = expected[prompt.task];
      if (!rule) throw new Error(`tache inconnue : ${prompt.task}`);
      expect(prompt.minWords).toBe(rule.min);
      expect(prompt.maxWords).toBe(rule.max);
      expect(prompt.durationMin).toBe(rule.minutes);
      expect(prompt.minWords).toBeLessThan(prompt.maxWords);
    }
  });

  it("donne deux documents aux seuls sujets de tache 3", () => {
    for (const prompt of WRITING_PROMPTS) {
      if (prompt.task === 3) {
        expect(prompt.documents).toHaveLength(2);
      } else {
        expect(prompt.documents).toHaveLength(0);
      }
    }
  });

  it("fournit plan, phrases utiles et erreurs pour chaque sujet", () => {
    for (const prompt of WRITING_PROMPTS) {
      expect(prompt.plan.length).toBeGreaterThan(0);
      expect(prompt.usefulPhrases.length).toBeGreaterThan(0);
      expect(prompt.commonMistakes.length).toBeGreaterThan(0);
    }
  });

  it("attribue un rang d'affichage continu", () => {
    WRITING_PROMPTS.forEach((prompt, index) => {
      expect(prompt.order).toBe(index + 1);
    });
  });
});

describe("normalisation des themes", () => {
  it("retire les accents et les accents graves", () => {
    expect(themeSlug("Études")).toBe("etudes");
    expect(themeSlug("Société")).toBe("societe");
    expect(themeSlug("environnement")).toBe("environnement");
  });

  it("remplace les espaces et la ponctuation par des tirets", () => {
    expect(themeSlug("Vie quotidienne")).toBe("vie-quotidienne");
  });
});

describe("checklist d'auto-evaluation", () => {
  it("a des identifiants uniques", () => {
    expect(new Set(WRITING_CHECKLIST_IDS).size).toBe(WRITING_CHECKLIST_IDS.length);
  });

  it("calcule un score proportionnel aux cases cochees", () => {
    expect(computeSelfScore({})).toBe(0);
    const all = Object.fromEntries(
      WRITING_CHECKLIST_IDS.map((id) => [id, true]),
    ) as Record<string, boolean>;
    expect(computeSelfScore(all)).toBe(100);
    expect(countChecked(all)).toBe(WRITING_CHECKLIST_IDS.length);
  });

  it("ignore les cles inconnues", () => {
    const checklist = Object.fromEntries(
      WRITING_CHECKLIST_IDS.slice(0, 4).map((id) => [id, true]),
    ) as Record<string, boolean>;
    checklist.inconnu = true;
    expect(countChecked(checklist)).toBe(4);
    expect(computeSelfScore(checklist)).toBe(Math.round((4 / WRITING_CHECKLIST_IDS.length) * 100));
  });
});
