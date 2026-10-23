import { describe, expect, it } from "vitest";

import { FULL_TESTS } from "@/data/full_tests";
import {
  FULL_TEST_SIZE,
  fullTestAudioUrl,
  fullTestId,
  fullTestSlug,
  fullTestTitle,
} from "@/data/full_tests/types";
import { buildContentFile, validateFullTests } from "@/scripts/build-full-tests";
import { ContentFileSchema } from "@/lib/content-schema";

const ANSWERS = ["A", "B", "C", "D"] as const;

describe("examens blancs", () => {
  it("passe toutes les validations editoriales", () => {
    expect(validateFullTests(FULL_TESTS)).toEqual([]);
  });

  it("respecte les volumes et les identites derives du numero", () => {
    for (const test of FULL_TESTS) {
      expect(test.listening).toHaveLength(FULL_TEST_SIZE.listening);
      expect(test.structure).toHaveLength(FULL_TEST_SIZE.structure);
      expect(test.reading).toHaveLength(FULL_TEST_SIZE.reading);

      expect(fullTestId(test.number)).toBe(`full-${String(test.number).padStart(2, "0")}`);
      expect(fullTestSlug(test.number)).toBe(`examen-blanc-tcf-${test.number}`);
      expect(fullTestTitle(test.number)).toBe(`Examen blanc TCF ${test.number}`);
    }
  });

  it("produit un fichier de contenu conforme au schema du seed", () => {
    const content = buildContentFile(FULL_TESTS);
    expect(() => ContentFileSchema.parse(content)).not.toThrow();

    for (const test of content.tests) {
      expect(test.kind).toBe("FULL");
      const sections = Object.values(test.sections);
      const total = sections.reduce((sum, section) => sum + (section?.questions.length ?? 0), 0);
      expect(total).toBe(70);

      expect(test.sections.comprehension_orale?.durationMinutes).toBe(25);
      expect(test.sections.structure_de_la_langue?.durationMinutes).toBe(20);
      expect(test.sections.comprehension_ecrite?.durationMinutes).toBe(45);
    }
  });

  it("associe chaque question de comprehension orale a un audio unique", () => {
    const content = buildContentFile(FULL_TESTS);
    const urls: string[] = [];

    for (const test of content.tests) {
      const questions = test.sections.comprehension_orale?.questions ?? [];
      questions.forEach((question, index) => {
        expect(question.audioUrl).toBe(
          fullTestAudioUrl(Number(test.id.slice(-2)), index),
        );
        expect(question.transcription?.trim().length).toBeGreaterThan(0);
        urls.push(question.audioUrl!);
      });
    }

    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      expect(url).toMatch(/^\/audio\/examens\/full-\d{2}\/\d{2}\.mp3$/);
    }
  });

  it("equilibre les bonnes reponses sans creer de motif exploitable", () => {
    const content = buildContentFile(FULL_TESTS);

    for (const test of content.tests) {
      for (const section of Object.values(test.sections)) {
        const counts = new Map<string, number>();
        for (const question of section?.questions ?? []) {
          counts.set(question.correctAnswer, (counts.get(question.correctAnswer) ?? 0) + 1);
        }
        const values = ANSWERS.map((letter) => counts.get(letter) ?? 0);
        expect(Math.max(...values) - Math.min(...values)).toBeLessThanOrEqual(1);
      }
    }
  });
});
