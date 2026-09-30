import { describe, expect, it } from "vitest";

import type { AnswerRow, GradeInput } from "@/server/services/grading";
import { correctQuestionIds, grade } from "@/server/services/grading";

// Une epreuve = 20 questions, l'autre = 30, comme dans les 5 tests TCF.
const STRUCTURE = {
  sectionId: "sec-structure",
  type: "STRUCTURE",
  title: "Structure",
  order: 1,
  durationMinutes: 60,
};
const COMPREHENSION = {
  sectionId: "sec-comprehension",
  type: "COMPREHENSION_ECRITE",
  title: "Comprehension ecrite",
  order: 2,
  durationMinutes: 60,
};

const SECTIONS = [
  { ...STRUCTURE, questionCount: 20 },
  { ...COMPREHENSION, questionCount: 30 },
];

/**
 * Une reponse notee. `correct` indique si l'option choisie est la bonne :
 * c'est toujours l'option qui fait foi, jamais le drapeau stocke.
 */
function answer(sectionId: string, number: number, correct: boolean): AnswerRow {
  const goodId = `${sectionId}-q${number}-a`;
  const badId = `${sectionId}-q${number}-b`;
  return {
    questionId: `${sectionId}-q${number}`,
    selectedOptionId: correct ? goodId : badId,
    isCorrect: !correct,
    flagged: false,
    timeSpentSec: 30,
    question: {
      id: `${sectionId}-q${number}`,
      number,
      prompt: `Question ${number}`,
      category: "Grammaire",
      points: 1,
      explanation: "Explication",
      sectionId,
      documentId: null,
      document: null,
      section: {
        id: sectionId,
        type: sectionId === STRUCTURE.sectionId ? STRUCTURE.type : COMPREHENSION.type,
        title: sectionId === STRUCTURE.sectionId ? STRUCTURE.title : COMPREHENSION.title,
        order: sectionId === STRUCTURE.sectionId ? STRUCTURE.order : COMPREHENSION.order,
        durationMinutes: 60,
      },
      options: [
        { id: goodId, label: "A", text: "Bonne", isCorrect: true },
        { id: badId, label: "B", text: "Fausse", isCorrect: false },
      ],
    },
  };
}

function input(overrides: Partial<GradeInput> = {}): GradeInput {
  return {
    attempt: {
      id: "attempt-1",
      status: "SUBMITTED",
      startedAt: new Date("2026-01-01T10:00:00.000Z"),
      finishedAt: new Date("2026-01-01T11:00:00.000Z"),
      test: { id: "test-1", title: "Test 1", slug: "test-1" },
    },
    focused: false,
    sections: SECTIONS,
    sectionRuns: [STRUCTURE, COMPREHENSION],
    answers: [],
    ...overrides,
  };
}

/** Repartition : `correct` bonnes reponses puis des erreurs jusqu'a `count`. */
function series(sectionId: string, count: number, correct: number): AnswerRow[] {
  return Array.from({ length: count }, (_, index) => answer(sectionId, index + 1, index < correct));
}

describe("correctQuestionIds", () => {
  it("ignore une question sans reponse, meme si le drapeau dit juste", () => {
    const unanswered = { ...answer(STRUCTURE.sectionId, 1, true), selectedOptionId: null };
    const ids = correctQuestionIds([unanswered]);
    expect(ids.size).toBe(0);
  });

  it("suit l'option selectionnee et non le drapeau stocke", () => {
    // Drapeau desynchronise : la reponse est fausse, le drapeau dit vrai.
    const desynced = { ...answer(STRUCTURE.sectionId, 2, false), isCorrect: true };
    expect(correctQuestionIds([desynced]).size).toBe(0);
  });
});

describe("grade - tentative complete", () => {
  it("note sur le bareme complet 20 et 30", () => {
    const result = grade(
      input({
        answers: [...series(STRUCTURE.sectionId, 20, 10), ...series(COMPREHENSION.sectionId, 30, 15)],
      }),
    );

    expect(result.structureCorrect).toBe(10);
    expect(result.structureTotal).toBe(20);
    expect(result.comprehensionCorrect).toBe(15);
    expect(result.comprehensionTotal).toBe(30);
    // (50 % + 50 %) / 2 = 50 % -> 350/699.
    expect(result.totalScore).toBe(350);
    expect(result.cefrLevel).toBe("B1");
    expect(result.sections).toHaveLength(2);
    expect([...result.sectionScores.values()]).toEqual([
      { score: 10, maxScore: 20 },
      { score: 15, maxScore: 30 },
    ]);
  });
});

describe("grade - reprise sur les erreurs", () => {
  it("affiche 2/20 et 0/30 et non 2/10 et 0/15", () => {
    // Reprise ciblee : seules les questions ratees sont rejouees.
    const result = grade(
      input({
        focused: true,
        answers: [...series(STRUCTURE.sectionId, 10, 2), ...series(COMPREHENSION.sectionId, 15, 0)],
      }),
    );

    expect(result.structureCorrect).toBe(2);
    expect(result.structureTotal).toBe(20);
    expect(result.comprehensionCorrect).toBe(0);
    expect(result.comprehensionTotal).toBe(30);
    // (10 % + 0 %) / 2 = 5 % -> 35/699, A1 non atteint.
    expect(result.totalScore).toBe(35);
    expect(result.cefrLevel).toBeNull();
    // Le nombre de questions rejouees reste visible, mais n'est plus le
    // denominateur affiche.
    expect(result.sections.map((section) => [section.answered, section.total])).toEqual([
      [10, 20],
      [15, 30],
    ]);
  });

  it("complete avec zero l'epreuve non retravaellee", () => {
    const result = grade(
      input({
        focused: true,
        sectionRuns: [STRUCTURE],
        answers: series(STRUCTURE.sectionId, 7, 2),
      }),
    );

    expect(result.sections).toHaveLength(2);
    expect(result.structureCorrect).toBe(2);
    expect(result.structureTotal).toBe(20);
    expect(result.comprehensionCorrect).toBe(0);
    expect(result.comprehensionTotal).toBe(30);
    expect(result.totalScore).toBe(35);
    // Seul l'epreuve rejouee porte un score persiste.
    expect([...result.sectionScores.keys()]).toEqual([STRUCTURE.sectionId]);
  });

  it("valide une reprise entierement reussie sur les deux epreuves", () => {
    const result = grade(
      input({
        focused: true,
        answers: [...series(STRUCTURE.sectionId, 10, 10), ...series(COMPREHENSION.sectionId, 15, 15)],
      }),
    );

    expect(result.structureCorrect).toBe(10);
    expect(result.comprehensionCorrect).toBe(15);
    expect(result.totalScore).toBe(350);
    expect(result.cefrLevel).toBe("B1");
  });
});
