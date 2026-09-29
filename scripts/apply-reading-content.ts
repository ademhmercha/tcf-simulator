import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { CE_INPUTS, CE_LEVEL_PLAN, buildCeSection } from "../data/ce";
import { CE_LONG_MAX_LINES, CE_LONG_MIN_LINES } from "../data/ce/types";

/**
 * Regenere la comprehension ecrite de tous les tests.
 *
 * La section de structure de la langue n'est pas touchee : seule la
 * comprehension ecrite est reconstruite depuis `data/ce`, puis reinjectee dans
 * `data/tcf_practice_5_tests_250_questions.json`, qui reste la source consommee
 * par le seed.
 *
 * Usage : npm run content:reading
 */

const ROOT = process.cwd();
const JSON_PATH = join(ROOT, "data", "tcf_practice_5_tests_250_questions.json");

interface ContentFile {
  metadata: Record<string, unknown>;
  tests: Array<{
    id: string;
    title: string;
    description?: string;
    sections: {
      structure_de_la_langue: { questionCount: number; questions: unknown[] };
      comprehension_ecrite: { questionCount: number; questions: unknown[] };
    };
  }>;
}

const content = JSON.parse(readFileSync(JSON_PATH, "utf8")) as ContentFile;
const dryRun = process.argv.includes("--check");

console.log("Comprehension ecrite : reconstruction\n");

let totalQuestions = 0;
let totalDocuments = 0;

for (const input of CE_INPUTS) {
  const test = content.tests.find((t) => t.id === input.testId);
  if (!test) throw new Error(`Test introuvable dans le JSON : ${input.testId}`);

  const section = buildCeSection(input.testId, input.testNo, input.shorts, input.longs);

  test.sections.comprehension_ecrite = {
    questionCount: section.questionCount,
    questions: section.questions,
  };

  // Controles de coherence avec la demande.
  const byLevel = new Map<string, number>();
  for (const question of section.questions) {
    byLevel.set(question.level, (byLevel.get(question.level) ?? 0) + 1);
  }
  for (const plan of CE_LEVEL_PLAN) {
    const actual = byLevel.get(plan.level) ?? 0;
    if (actual !== plan.count) {
      throw new Error(
        `${input.testId} : ${plan.level} = ${actual}, attendu ${plan.count}.`,
      );
    }
  }

  // Les 20 questions A1 -> B2 viennent en tete, les 10 textes longs ferment la
  // section.
  const firstHigh = section.questions.findIndex(
    (q) => q.level === "C1" || q.level === "C2",
  );
  if (firstHigh !== 20) {
    throw new Error(
      `${input.testId} : les questions C1/C2 commencent a la position ${firstHigh + 1} au lieu de 21.`,
    );
  }

  // Les documents courts sont des textes courts sur une seule ligne ; les
  // documents longs sont les dix textes de 11 a 13 lignes du test.
  const longDocs = section.documents.filter((d) => d.lineCount >= CE_LONG_MIN_LINES);
  const shortDocs = section.documents.filter((d) => d.lineCount < CE_LONG_MIN_LINES);
  const shortCount = shortDocs.length;
  if (longDocs.length !== 10) {
    throw new Error(`${input.testId} : ${longDocs.length} texte(s) long(s) au lieu de 10.`);
  }
  if (shortCount !== 20) {
    throw new Error(`${input.testId} : ${shortCount} document(s) court(s) au lieu de 20.`);
  }
  if (longDocs.some((d) => d.lineCount < CE_LONG_MIN_LINES || d.lineCount > CE_LONG_MAX_LINES)) {
    throw new Error(
      `${input.testId} : un texte long ne fait pas ${CE_LONG_MIN_LINES} a ${CE_LONG_MAX_LINES} lignes.`,
    );
  }

  // Une seule question par document.
  const byDoc = new Map<string, number>();
  for (const question of section.questions) {
    byDoc.set(question.documentId, (byDoc.get(question.documentId) ?? 0) + 1);
  }
  for (const [documentId, count] of byDoc) {
    if (count !== 1) {
      throw new Error(`${input.testId} : document ${documentId} porte ${count} questions.`);
    }
  }

  const spread = CE_LEVEL_PLAN.map(
    (p) => `${p.level}:${byLevel.get(p.level) ?? 0}`,
  ).join(" ");

  console.log(`  ${input.testId} : ${section.questionCount} questions`);
  console.log(`     ${spread}`);
  console.log(
    `     ${section.documents.length} documents (${shortCount} courts, ${longDocs.length} longs)`,
  );
  for (const doc of longDocs) {
    console.log(`       ${doc.code}  ${doc.title}  (${doc.lineCount} lignes)`);
  }

  totalQuestions += section.questionCount;
  totalDocuments += section.documents.length;
}

if (dryRun) {
  console.log(`\n  Verification seule : ${totalQuestions} questions, ${totalDocuments} documents.`);
  process.exit(0);
}

writeFileSync(JSON_PATH, `${JSON.stringify(content, null, 2)}\n`, "utf8");
console.log(
  `\n  ${JSON_PATH} mis a jour : ${totalQuestions} questions, ${totalDocuments} documents.`,
);
