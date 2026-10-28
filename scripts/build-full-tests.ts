import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { FULL_TESTS } from "../data/full_tests";
import {
  FULL_READING_LENGTH,
  FULL_TEST_DURATIONS,
  FULL_TEST_LEVELS,
  FULL_TEST_SIZE,
  fullTestAudioUrl,
  fullTestId,
  fullTestTitle,
  type FullAnswer,
  type FullLevel,
  type FullOptions,
  type FullTestInput,
} from "../data/full_tests/types";
import { ContentFileSchema, type ContentFile } from "../lib/content-schema";

/**
 * Compilation des examens blancs.
 *
 * Usage :
 *   npm run content:full         # valide puis ecrit le JSON
 *   npm run content:full:check   # validation seule (CI, avant commit)
 *
 * Le JSON produit (`data/tcf_full_tests_10x70.json`) est la source du seed.
 * Sans recompilation, une modification des modules `data/full_tests/*.ts`
 * reste sans effet en base.
 */

const ROOT = resolve(process.cwd());
const OUTPUT = join(ROOT, "data", "tcf_full_tests_10x70.json");
const checkOnly = process.argv.includes("--check");

const ANSWERS: FullAnswer[] = ["A", "B", "C", "D"];

function countLevels(questions: Array<{ level: FullLevel }>): Map<FullLevel, number> {
  const counts = new Map<FullLevel, number>();
  for (const question of questions) {
    counts.set(question.level, (counts.get(question.level) ?? 0) + 1);
  }
  return counts;
}

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("fr");
}

/** Retourne la liste des erreurs ; vide si l'examen est publiable. */
export function validateFullTest(test: FullTestInput): string[] {
  const errors: string[] = [];
  const label = `Examen ${test.number}`;

  if (!Number.isInteger(test.number) || test.number < 1 || test.number > 20) {
    errors.push(`${label} : le numero doit etre un entier de 1 a 20.`);
  }

  const sections = [
    {
      key: "listening" as const,
      questions: test.listening,
      expected: FULL_TEST_SIZE.listening,
    },
    {
      key: "structure" as const,
      questions: test.structure,
      expected: FULL_TEST_SIZE.structure,
    },
    {
      key: "reading" as const,
      questions: test.reading.map((document) => document.question),
      expected: FULL_TEST_SIZE.reading,
    },
  ];

  for (const section of sections) {
    if (section.questions.length !== section.expected) {
      errors.push(
        `${label} : ${section.key} contient ${section.questions.length} questions au lieu de ${section.expected}.`,
      );
    }
  }

  const expectedLevels = FULL_TEST_LEVELS;
  for (const section of sections) {
    const key = section.key;
    const actual = countLevels(section.questions);
    const expected = expectedLevels[key];

    for (const [level, count] of Object.entries(expected)) {
      if ((actual.get(level as FullLevel) ?? 0) !== count) {
        errors.push(
          `${label} : ${key} doit contenir ${count} question(s) de niveau ${level} (actuel : ${actual.get(level as FullLevel) ?? 0}).`,
        );
      }
    }

    let previous = 0;
    for (const [index, question] of section.questions.entries()) {
      const rank = ["A1", "A2", "B1", "B2", "C1", "C2"].indexOf(question.level);
      if (rank < previous) {
        errors.push(
          `${label} : ${key}, question ${index + 1} (${question.level}) rompt la progression des niveaux.`,
        );
      }
      previous = rank;
    }
  }

  // Structure : exactement deux questions de conjugaison, explicitement taguees.
  const conjugaison = test.structure.filter(
    (question) => normalize(question.category) === "conjugaison",
  );
  if (conjugaison.length !== 2) {
    errors.push(
      `${label} : structure doit comporter exactement 2 questions de conjugaison (actuel : ${conjugaison.length}).`,
    );
  }

  // Comprehension ecrite : une question par document, longueur conforme au niveau.
  for (const [index, document] of test.reading.entries()) {
    const range = FULL_READING_LENGTH[document.question.level as keyof typeof FULL_READING_LENGTH];
    if (range) {
      const length = document.text.trim().length;
      if (length < range[0] || length > range[1]) {
        errors.push(
          `${label} : texte ${index + 1} (${document.question.level}) fait ${length} caracteres, attendu entre ${range[0]} et ${range[1]}.`,
        );
      }
    }
  }

  // Champs et propositions : aucune proposition vide ni dupliquee.
  const allQuestions = [
    ...test.listening.map((question, index) => ({ question, where: `CO ${index + 1}` })),
    ...test.structure.map((question, index) => ({ question, where: `ST ${index + 1}` })),
    ...test.reading.map((document, index) => ({
      question: document.question,
      where: `CE ${index + 1}`,
    })),
  ];

  for (const { question, where } of allQuestions) {
    if (question.prompt.trim().length < 5) {
      errors.push(`${label} : ${where} a un enonce vide ou trop court.`);
    }
    if (question.explanation.trim().length < 20) {
      errors.push(`${label} : ${where} a une explication trop courte.`);
    }
    const options = question.options.map((option) => option.trim());
    if (options.some((option) => option.length === 0)) {
      errors.push(`${label} : ${where} contient une proposition vide.`);
    }
    if (new Set(options.map(normalize)).size !== options.length) {
      errors.push(`${label} : ${where} contient des propositions identiques.`);
    }
    if (where.startsWith("ST") && !question.category?.trim()) {
      errors.push(`${label} : ${where} n'a pas de categorie.`);
    }
  }

  // La repartition des bonnes reponses est equilibree a la compilation
  // (`balanceAnswers`) : le redacteur peut donc toujours placer la bonne
  // reponse en A sans creer de motif exploitable dans le JSON publie.
  return errors;
}

/** Controles transverses : numeros, textes et transcriptions uniques. */
export function validateFullTests(tests: FullTestInput[]): string[] {
  const errors = tests.flatMap(validateFullTest);

  const numbers = new Set<number>();
  const prompts = new Map<string, string>();
  const readings = new Map<string, string>();
  const transcriptions = new Map<string, string>();
  const titles = new Map<string, string>();

  for (const test of tests) {
    if (numbers.has(test.number)) errors.push(`Examen ${test.number} : numero en double.`);
    numbers.add(test.number);

    for (const document of test.reading) {
      const title = normalize(document.title);
      if (titles.has(title)) {
        errors.push(`Examen ${test.number} : titre de texte en double (« ${document.title} »).`);
      }
      titles.set(title, document.title);

      const text = normalize(document.text);
      if (readings.has(text)) {
        errors.push(`Examen ${test.number} : texte de comprehension ecrite en double.`);
      }
      readings.set(text, document.title);
    }

    for (const question of [...test.listening, ...test.structure, ...test.reading.map((d) => d.question)]) {
      const prompt = normalize(question.prompt);
      if (prompts.has(prompt)) {
        errors.push(`Examen ${test.number} : enonce en double (« ${question.prompt} »).`);
      }
      prompts.set(prompt, String(test.number));
    }

    for (const question of test.listening) {
      const transcription = normalize(question.transcription);
      if (transcriptions.has(transcription)) {
        errors.push(`Examen ${test.number} : transcription audio en double.`);
      }
      transcriptions.set(transcription, String(test.number));
    }
  }

  return errors;
}

function optionsOf(options: [string, string, string, string]): Record<FullAnswer, string> {
  return { A: options[0], B: options[1], C: options[2], D: options[3] };
}

/**
 * Lettres cibles pour une section : repartition equilibree, ordre mélange de
 * façon déterministe (même contenu => même JSON, donc pas de diff inutile).
 */
function targetLetters(count: number, seed: number): FullAnswer[] {
  const letters = Array.from({ length: count }, (_, index) => ANSWERS[index % ANSWERS.length]!);
  let state = (seed * 2654435761) >>> 0;

  for (let index = letters.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const swapWith = state % (index + 1);
    const current = letters[index]!;
    letters[index] = letters[swapWith]!;
    letters[swapWith] = current;
  }

  return letters;
}

/**
 * Déplace la bonne réponse à la lettre cible en échangeant deux propositions.
 *
 * Les examens publics ne doivent pas présenter de motif de réponse (tout en A,
 * ou une alternance régulière). Le rédacteur travaille donc avec l'ordre qui
 * lui semble le plus naturel ; la compilation équilibre les lettres.
 */
function balanceAnswers<T extends { options: FullOptions; correct: FullAnswer }>(
  questions: T[],
  seed: number,
): T[] {
  const targets = targetLetters(questions.length, seed);

  return questions.map((question, index) => {
    const target = targets[index]!;
    if (target === question.correct) return question;

    const options = [...question.options] as FullOptions;
    const from = ANSWERS.indexOf(question.correct);
    const to = ANSWERS.indexOf(target);
    const swapped = options[from]!;
    options[from] = options[to]!;
    options[to] = swapped;

    return { ...question, options, correct: target };
  });
}

export function buildContentFile(tests: FullTestInput[]): ContentFile {
  return {
    metadata: {
      name: "Examens blancs TCF Tout public",
      version: "1",
      language: "fr",
      disclaimer:
        "Questions originales inspirees du format general du TCF Tout public. Les examens ne proviennent pas de France Education international.",
    },
    tests: [...tests]
      .sort((a, b) => a.number - b.number)
      .map((test) => {
        const prefix = `T${test.number}`;
        const listening = balanceAnswers(test.listening, test.number * 100 + 1);
        const structure = balanceAnswers(test.structure, test.number * 100 + 2);
        const readingQuestions = balanceAnswers(
          test.reading.map((document) => document.question),
          test.number * 100 + 3,
        );
        const reading = test.reading.map((document, index) => ({
          ...document,
          question: readingQuestions[index]!,
        }));

        return {
          id: fullTestId(test.number),
          title: fullTestTitle(test.number),
          description: test.description,
          kind: "FULL" as const,
          sections: {
            comprehension_orale: {
              questionCount: test.listening.length,
              durationMinutes: FULL_TEST_DURATIONS.listening,
              questions: listening.map((question, index) => ({
                id: `CO${test.number}-${String(index + 1).padStart(2, "0")}`,
                question: question.prompt,
                options: optionsOf(question.options),
                correctAnswer: question.correct,
                explanation: question.explanation,
                level: question.level,
                category: question.category,
                audioUrl: fullTestAudioUrl(test.number, index),
                transcription: question.transcription,
              })),
            },
            structure_de_la_langue: {
              questionCount: test.structure.length,
              durationMinutes: FULL_TEST_DURATIONS.structure,
              questions: structure.map((question, index) => ({
                id: `ST${test.number}-${String(index + 1).padStart(2, "0")}`,
                question: question.prompt,
                options: optionsOf(question.options),
                correctAnswer: question.correct,
                explanation: question.explanation,
                level: question.level,
                category: question.category,
              })),
            },
            comprehension_ecrite: {
              questionCount: test.reading.length,
              durationMinutes: FULL_TEST_DURATIONS.reading,
              questions: reading.map((document, index) => ({
                id: `CE${test.number}-${String(index + 1).padStart(2, "0")}`,
                documentId: `${prefix}-D${String(index + 1).padStart(2, "0")}`,
                documentTitle: document.title,
                document: document.text,
                question: document.question.prompt,
                options: optionsOf(document.question.options),
                correctAnswer: document.question.correct,
                explanation: document.question.explanation,
                level: document.question.level,
                category: document.question.category ?? "comprehension ecrite",
              })),
            },
          },
        };
      }),
  };
}

function main(): void {
  const errors = validateFullTests(FULL_TESTS);
  if (errors.length > 0) {
    console.error(`\n${errors.length} erreur(s) de contenu :\n`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  const content = buildContentFile(FULL_TESTS);
  // Le schema est celui du seed : on valide ici pour ne jamais produire un JSON
  // que l'import refuserait.
  ContentFileSchema.parse(content);

  const questions = content.tests.reduce(
    (sum, test) =>
      sum +
      Object.values(test.sections).reduce(
        (sectionSum, section) => sectionSum + (section?.questions.length ?? 0),
        0,
      ),
    0,
  );

  console.log("");
  console.log(`Examens valides : ${content.tests.length}`);
  console.log(`Questions       : ${questions}`);
  console.log(`Audio           : ${content.tests.length * FULL_TEST_SIZE.listening} fichiers`);
  console.log(`Sortie          : ${OUTPUT}`);
  console.log("");

  if (checkOnly) {
    console.log("Mode verification : aucun fichier ecrit.");
    return;
  }

  mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  console.log("JSON ecrit. Puis : npm run audio:examens && npm run db:seed");
}

// Le module est aussi importe par les tests unitaires : ne compiler que s'il
// est execute directement (`tsx scripts/build-full-tests.ts`).
const invokedDirectly =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) main();
