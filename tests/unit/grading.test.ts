import { describe, expect, it } from "vitest";

import type { AnswerRow, GradeInput } from "@/server/services/grading";
import { correctQuestionIds, grade, mistakeQuestionIds } from "@/server/services/grading";

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

describe("grade - tentative partielle", () => {
  it("compte les questions non traitees comme des erreurs", () => {
    // Une ligne Answer n'existe que pour les questions touchees : ici une seule
    // reponse par epreuve, les 19 et 29 autres questions sont vierges.
    const result = grade(
      input({
        answers: [
          ...series(STRUCTURE.sectionId, 1, 0),
          ...series(COMPREHENSION.sectionId, 1, 0),
        ],
      }),
    );

    expect(result.structureCorrect).toBe(0);
    expect(result.structureTotal).toBe(20);
    expect(result.comprehensionCorrect).toBe(0);
    expect(result.comprehensionTotal).toBe(30);
    // (0 % + 0 %) / 2 = 0 % -> 0/699, A1 non atteint.
    expect(result.totalScore).toBe(0);
    expect(result.cefrLevel).toBeNull();
    expect(result.sections.map((section) => [section.answered, section.total])).toEqual([
      [1, 20],
      [1, 30],
    ]);
  });

  it("note sur le bareme complet malgre une seule question touchee", () => {
    // Une seule question repondue et juste : 1/20 et 1/30 valent 5 % et 3.3 %,
    // soit 4 % -> 29/699. Compter les lignes Answer donnerait 100 % sur chaque
    // epreuve, donc 699/699.
    const result = grade(
      input({
        answers: [
          ...series(STRUCTURE.sectionId, 1, 1),
          ...series(COMPREHENSION.sectionId, 1, 1),
        ],
      }),
    );

    expect(result.structureCorrect).toBe(1);
    expect(result.comprehensionCorrect).toBe(1);
    expect(result.totalScore).toBe(29);
    expect(result.cefrLevel).toBeNull();
    expect(result.sections.map((section) => section.ratio)).toEqual([0.05, 1 / 30]);
  });

  it("distingue une question effacee d'une question jamais vue", () => {
    // Les deux ont une ligne Answer, mais une option choisie compte comme
    // reponse : `answered` ne doit pas les confondre avec le total.
    const cleared = {
      ...answer(STRUCTURE.sectionId, 2, false),
      selectedOptionId: null,
      isCorrect: false,
    };
    const result = grade(
      input({
        answers: [...series(STRUCTURE.sectionId, 1, 1), cleared, ...series(COMPREHENSION.sectionId, 1, 0)],
      }),
    );

    expect(result.structureCorrect).toBe(1);
    expect(result.structureTotal).toBe(20);
    expect(result.sections[0]).toMatchObject({ answered: 1, total: 20, correct: 1 });
  });

  it("note a zero une epreuve entierement vierge", () => {
    const result = grade(
      input({
        answers: series(STRUCTURE.sectionId, 1, 0),
      }),
    );

    expect(result.structureCorrect).toBe(0);
    expect(result.structureTotal).toBe(20);
    expect(result.comprehensionCorrect).toBe(0);
    expect(result.comprehensionTotal).toBe(30);
    expect(result.sections.map((section) => section.answered)).toEqual([1, 0]);
    expect(result.totalScore).toBe(0);
  });
});

describe("mistakeQuestionIds", () => {
  const QUESTIONS = [
    ...Array.from({ length: 20 }, (_, i) => ({ id: `s-${i + 1}`, sectionId: "sec-structure" })),
    ...Array.from({ length: 30 }, (_, i) => ({ id: `c-${i + 1}`, sectionId: "sec-comprehension" })),
  ];

  it("retraite les questions vierges et les erreurs, pas seulement les lignes Answer", () => {
    // Seules trois questions repondues, dont une seule juste.
    const ids = mistakeQuestionIds({
      sectionIds: ["sec-structure", "sec-comprehension"],
      questions: QUESTIONS,
      focus: null,
      correctIds: new Set(["s-1"]),
    });

    expect(ids).toHaveLength(49);
    expect(ids).toContain("s-2");
    expect(ids).toContain("c-30");
    expect(ids).not.toContain("s-1");
  });

  it("respecte le perimetre d'une reprise ciblee", () => {
    const ids = mistakeQuestionIds({
      sectionIds: ["sec-structure", "sec-comprehension"],
      questions: QUESTIONS,
      focus: new Set(["s-1", "s-2", "s-3"]),
      correctIds: new Set(["s-2"]),
    });

    expect(ids).toEqual(["s-1", "s-3"]);
  });

  it("ignore les questions d'une epreuve non jouee", () => {
    const ids = mistakeQuestionIds({
      sectionIds: ["sec-structure"],
      questions: QUESTIONS,
      focus: null,
      correctIds: new Set<string>(),
    });

    expect(ids).toHaveLength(20);
    expect(ids.every((id) => id.startsWith("s-"))).toBe(true);
  });

  it("renvoie une liste vide quand tout est juste", () => {
    const ids = mistakeQuestionIds({
      sectionIds: ["sec-structure"],
      questions: QUESTIONS,
      focus: null,
      correctIds: new Set(QUESTIONS.filter((q) => q.sectionId === "sec-structure").map((q) => q.id)),
    });

    expect(ids).toEqual([]);
  });

  it("ne double pas une question listee plusieurs fois", () => {
    const ids = mistakeQuestionIds({
      sectionIds: ["sec-structure", "sec-structure"],
      questions: [{ id: "s-1", sectionId: "sec-structure" }],
      focus: null,
      correctIds: new Set<string>(),
    });

    expect(ids).toEqual(["s-1"]);
  });
});

describe("grade - reprise sur les erreurs et epreuve jamais commencee", () => {
  it("affiche 2/20 et 0/30 et non 2/10 et 0/15", () => {
    // Reprise ciblee : seules les questions ratees sont rejouees.
    const result = grade(
      input({
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

  it("note a zero une epreuve jamais commencee", () => {
    // Abandon apres la langue : l'ecrite n'a pas de SectionRun terminee.
    const result = grade(
      input({
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

  it("ne gonfle pas le score quand l'epreuve non commencee est la seule omission", () => {
    // Sans l'epreuve non jouee, une langue parfaite pese 100 % et donne
    // 699/699 : c'est le piege. Les deux parties doivent peser 50 % chacune,
    // donc (100 % + 0 %) / 2 = 50 %, soit 349.5 -> 350.
    const result = grade(
      input({
        sectionRuns: [STRUCTURE],
        answers: series(STRUCTURE.sectionId, 20, 20),
      }),
    );

    expect(result.structureCorrect).toBe(20);
    expect(result.comprehensionCorrect).toBe(0);
    expect(result.totalScore).toBe(350);
    expect(result.cefrLevel).toBe("B1");
    expect(result.sections.map((section) => section.answered)).toEqual([20, 0]);
  });

  it("valide une reprise entierement reussie sur les deux epreuves", () => {
    const result = grade(
      input({
        answers: [...series(STRUCTURE.sectionId, 10, 10), ...series(COMPREHENSION.sectionId, 15, 15)],
      }),
    );

    expect(result.structureCorrect).toBe(10);
    expect(result.comprehensionCorrect).toBe(15);
    expect(result.totalScore).toBe(350);
    expect(result.cefrLevel).toBe("B1");
  });
});
