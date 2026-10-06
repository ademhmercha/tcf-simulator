import { describe, expect, it, vi } from "vitest";

// Le service cote serveur instancie Prisma a l'import : on le neutralise, car
// ces tests portent uniquement sur la fonction pure de correction.
vi.mock("@/lib/db", () => ({ prisma: {} }));

import { gradeListeningSerie } from "@/server/services/listening";

// La correction de comprehension orale comptabilise les points par question :
// chaque bonne reponse vaut un point, une question sans reponse est fausse.

const questions = [
  { id: "q1", correctLetter: "A" as const },
  { id: "q2", correctLetter: "B" as const },
  { id: "q3", correctLetter: "C" as const },
];

describe("gradeListeningSerie", () => {
  it("note 1 point par bonne reponse", () => {
    const graded = gradeListeningSerie(questions, [
      { questionId: "q1", selectedLetter: "A" },
      { questionId: "q2", selectedLetter: "B" },
    ]);
    expect(graded).toEqual([
      { questionId: "q1", selectedLetter: "A", isCorrect: true },
      { questionId: "q2", selectedLetter: "B", isCorrect: true },
      { questionId: "q3", selectedLetter: null, isCorrect: false },
    ]);
  });

  it("considere une question sans reponse comme fausse", () => {
    const graded = gradeListeningSerie(questions, [
      { questionId: "q1", selectedLetter: null },
    ]);
    expect(graded[0]!).toEqual({ questionId: "q1", selectedLetter: null, isCorrect: false });
  });

  it("considere une question ignoree par le client comme fausse", () => {
    const graded = gradeListeningSerie(questions, [{ questionId: "q2", selectedLetter: "B" }]);
    expect(graded.map((g) => [g.questionId, g.isCorrect])).toEqual([
      ["q1", false],
      ["q2", true],
      ["q3", false],
    ]);
  });

  it("ignore une question inconnue de la serie", () => {
    const graded = gradeListeningSerie(questions, [
      { questionId: "q1", selectedLetter: "A" },
      { questionId: "inconnue", selectedLetter: "D" },
    ]);
    expect(graded).toHaveLength(3);
    expect(graded[0]!.isCorrect).toBe(true);
  });

  it("garde la derniere reponse en cas de double envoi", () => {
    const graded = gradeListeningSerie(questions, [
      { questionId: "q1", selectedLetter: "A" },
      { questionId: "q1", selectedLetter: "C" },
    ]);
    expect(graded[0]).toEqual({ questionId: "q1", selectedLetter: "C", isCorrect: false });
  });

  it("repartit correctement un score mixte", () => {
    const graded = gradeListeningSerie(questions, [
      { questionId: "q1", selectedLetter: "A" },
      { questionId: "q2", selectedLetter: "D" },
      { questionId: "q3", selectedLetter: "C" },
    ]);
    expect(graded.filter((g) => g.isCorrect)).toHaveLength(2);
  });
});