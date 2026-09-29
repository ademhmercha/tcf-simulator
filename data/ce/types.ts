/**
 * Textes longs C1/C2 de la comprehension ecrite.
 *
 * Chaque test recoit trois documents (art, environnement, societe) de 12 ou 13
 * lignes. Voir `data/ce/index.ts` pour l'assemblage et le plan de repartition.
 */

export type CeAnswer = "A" | "B" | "C" | "D";
export type CeOptions = [string, string, string, string];

export interface CeLongQuestion {
  prompt: string;
  options: Record<CeAnswer, string>;
  correctAnswer: CeAnswer;
  explanation: string;
  level: "C1" | "C2";
}

export interface CeLongDocument {
  /** Code unique dans la section (ex: "T1-ART1"). */
  code: string;
  title: string;
  /** 12 ou 13 lignes separees par des retours a la ligne. */
  content: string;
  questions: CeLongQuestion[];
}

export function lines(...rows: string[]): string {
  return rows.join("\n");
}

/** Question courte : [enonce, propositions, reponse, explication]. */
export type CeShortTuple = [string, CeOptions, CeAnswer, string];

/** Document court : [titre, contenu, questions]. */
export type CeShortDocTuple = [string, string, CeShortTuple[]];

export function doc(
  code: string,
  title: string,
  content: string,
  questions: Array<[CeShortTuple, "C1" | "C2"]>,
): CeLongDocument {
  return {
    code,
    title,
    content,
    questions: questions.map(([[prompt, options, correctAnswer, explanation], level]) => ({
      prompt,
      options: { A: options[0], B: options[1], C: options[2], D: options[3] },
      correctAnswer,
      explanation,
      level,
    })),
  };
}
