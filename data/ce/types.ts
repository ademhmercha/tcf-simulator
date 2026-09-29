/**
 * Comprehension ecrite : types partages.
 *
 * Regle de composition : chaque texte donne exactement UNE question. Les
 * niveaux sont equilibres dans chaque section :
 *
 *   5 A1 + 5 A2 + 5 B1 + 5 B2 + 5 C1 + 5 C2 = 30 questions
 *
 * Les 20 questions A1 -> B2 s'appuient sur des documents courts (annonces,
 * horaires, reglements). Les 10 questions C1/C2 s'appuient sur des textes
 * longs de 12 ou 13 lignes, sur les themes imposes : agriculture,
 * environnement, societe, economie, art, litterature, science, technologie.
 */

export type CeAnswer = "A" | "B" | "C" | "D";
export type CeOptions = [string, string, string, string];

/** Question d'un texte long. */
export interface CeLongQuestion {
  prompt: string;
  options: Record<CeAnswer, string>;
  correctAnswer: CeAnswer;
  explanation: string;
  level: "C1" | "C2";
}

export interface CeLongDocument {
  /** Code unique dans la section (ex: "T1-C1-01"). */
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

/** Un texte long : une seule question. */
export function doc(
  code: string,
  title: string,
  content: string,
  question: [CeLongQuestion["prompt"], CeOptions, CeAnswer, string],
  level: "C1" | "C2",
): CeLongDocument {
  return {
    code,
    title,
    content,
    questions: [
      {
        prompt: question[0],
        options: { A: question[1][0], B: question[1][1], C: question[1][2], D: question[1][3] },
        correctAnswer: question[2],
        explanation: question[3],
        level,
      },
    ],
  };
}

/** Nom de la rubrique, utilise dans les titres. */
export type CeTopic =
  | "Agriculture"
  | "Environnement"
  | "Societe"
  | "Economie"
  | "Art"
  | "Litterature"
  | "Science"
  | "Technologie";
