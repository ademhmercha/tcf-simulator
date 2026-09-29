import TEST1 from "./test-01";
import TEST2 from "./test-02";
import TEST3 from "./test-03";
import TEST4 from "./test-04";
import TEST5 from "./test-05";
import SHORTS1 from "./shorts-01";
import SHORTS2 from "./shorts-02";
import SHORTS3 from "./shorts-03";
import SHORTS4 from "./shorts-04";
import SHORTS5 from "./shorts-05";
import type { CeLongDocument, CeShortDocTuple } from "./types";

/**
 * Assemblage des sections de comprehension ecrite.
 *
 * Chaque section compte 30 questions, une question par document :
 *   5 A1 + 5 A2 + 5 B1 + 5 B2 = 20 questions courtes (documents courts)
 *   5 C1 + 5 C2 = 10 questions longues (textes de 12 ou 13 lignes)
 *
 * Les 20 questions A1 -> B2 sont placees en tete de section, et les 10
 * textes longs ferment l'epreuve.
 */

export interface CeBuiltQuestion {
  id: string;
  documentId: string;
  documentTitle: string;
  document: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  level: string;
  category: string;
}

export interface CeBuiltSection {
  questionCount: number;
  questions: CeBuiltQuestion[];
  /** Documents dans l'ordre d'apparition (pour le panneau de lecture). */
  documents: Array<{ code: string; title: string; lineCount: number }>;
}

/** Repartition cible, dans l'ordre de presentation. */
export const CE_LEVEL_PLAN = [
  { level: "A1", count: 5 },
  { level: "A2", count: 5 },
  { level: "B1", count: 5 },
  { level: "B2", count: 5 },
  { level: "C1", count: 5 },
  { level: "C2", count: 5 },
] as const;

export const CE_TOTAL = CE_LEVEL_PLAN.reduce((sum, row) => sum + row.count, 0);

type ShortBundle = Record<"A1" | "A2" | "B1" | "B2", CeShortDocTuple[]>;

function shortQuestions(
  testNo: number,
  prefix: string,
  bundle: ShortBundle,
  level: "A1" | "A2" | "B1" | "B2",
  out: CeBuiltQuestion[],
): void {
  const docs = bundle[level];
  const expected = CE_LEVEL_PLAN.find((row) => row.level === level)!.count;
  if (docs.length !== expected) {
    throw new Error(
      `${prefix} ${level} : ${docs.length} document(s) au lieu de ${expected}.`,
    );
  }
  for (const [title, , questions] of docs) {
    if (questions.length !== 1) {
      throw new Error(
        `${prefix} ${level} « ${title} » : ${questions.length} question(s), une seule attendue.`,
      );
    }
  }

  for (const [title, content, questions] of docs) {
    const code = `T${testNo}-${level}${out.length + 1}`;
    for (const [prompt, options, correctAnswer, explanation] of questions) {
      out.push({
        id: `${prefix}-${level}-${String(out.length + 1).padStart(2, "0")}`,
        documentId: code,
        documentTitle: title,
        document: content,
        question: prompt,
        options: { A: options[0], B: options[1], C: options[2], D: options[3] },
        correctAnswer,
        explanation,
        level,
        category: "compréhension écrite",
      });
    }
  }
}

function longQuestions(
  testNo: number,
  prefix: string,
  documents: CeLongDocument[],
  level: "C1" | "C2",
  out: CeBuiltQuestion[],
): void {
  for (const document of documents) {
    if (document.questions.length !== 1) {
      throw new Error(
        `${prefix} texte ${document.code} : ${document.questions.length} question(s), une seule attendue.`,
      );
    }
  }

  const questions = documents.flatMap((doc) =>
    doc.questions.filter((q) => q.level === level),
  );
  const expected = CE_LEVEL_PLAN.find((row) => row.level === level)!.count;
  if (questions.length !== expected) {
    throw new Error(
      `${prefix} ${level} : ${questions.length} question(s) au lieu de ${expected}.`,
    );
  }

  for (const document of documents) {
    for (const question of document.questions) {
      if (question.level !== level) continue;
      out.push({
        id: `${prefix}-${level}-${String(out.length + 1).padStart(2, "0")}`,
        documentId: document.code,
        documentTitle: document.title,
        document: document.content,
        question: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
        level,
        category: "compréhension écrite",
      });
    }
  }
}

/** Verifie qu'un texte long fait bien 12 ou 13 lignes. */
function checkLongDocument(testNo: number, code: string, content: string): void {
  const count = content.split("\n").length;
  if (count < 12 || count > 13) {
    throw new Error(
      `Test ${testNo} document ${code} : ${count} lignes (attendu 12 ou 13).`,
    );
  }
}

/** Verifie qu'une question est exploitable : 4 propositions distinctes. */
function checkQuestion(question: CeBuiltQuestion): void {
  const values = Object.values(question.options);
  if (values.some((v) => v.trim().length === 0)) {
    throw new Error(`${question.id} : proposition vide.`);
  }
  if (new Set(values).size !== 4) {
    throw new Error(`${question.id} : propositions dupliquees.`);
  }
  if (!question.explanation.trim()) {
    throw new Error(`${question.id} : explication manquante.`);
  }
  if (!["A", "B", "C", "D"].includes(question.correctAnswer)) {
    throw new Error(`${question.id} : reponse invalide.`);
  }
}

export function buildCeSection(
  testId: string,
  testNo: number,
  shorts: ShortBundle,
  longs: CeLongDocument[],
): CeBuiltSection {
  const prefix = `CE${testNo}`;
  const questions: CeBuiltQuestion[] = [];

  shortQuestions(testNo, prefix, shorts, "A1", questions);
  shortQuestions(testNo, prefix, shorts, "A2", questions);
  shortQuestions(testNo, prefix, shorts, "B1", questions);
  shortQuestions(testNo, prefix, shorts, "B2", questions);

  for (const document of longs) checkLongDocument(testNo, document.code, document.content);
  longQuestions(testNo, prefix, longs, "C1", questions);
  longQuestions(testNo, prefix, longs, "C2", questions);

  if (questions.length !== CE_TOTAL) {
    throw new Error(`${testId} : ${questions.length} questions au lieu de ${CE_TOTAL}.`);
  }
  for (const question of questions) checkQuestion(question);

  // Documents dans l'ordre d'apparition, avec leur nombre de lignes.
  const seen = new Set<string>();
  const documents: CeBuiltSection["documents"] = [];
  for (const question of questions) {
    if (seen.has(question.documentId)) continue;
    seen.add(question.documentId);
    documents.push({
      code: question.documentId,
      title: question.documentTitle,
      lineCount: question.document.split("\n").length,
    });
  }

  return { questionCount: questions.length, questions, documents };
}

export const CE_INPUTS: Array<{
  testId: string;
  testNo: number;
  shorts: ShortBundle;
  longs: CeLongDocument[];
}> = [
  { testId: "test-01", testNo: 1, shorts: SHORTS1, longs: TEST1 },
  { testId: "test-02", testNo: 2, shorts: SHORTS2, longs: TEST2 },
  { testId: "test-03", testNo: 3, shorts: SHORTS3, longs: TEST3 },
  { testId: "test-04", testNo: 4, shorts: SHORTS4, longs: TEST4 },
  { testId: "test-05", testNo: 5, shorts: SHORTS5, longs: TEST5 },
];
