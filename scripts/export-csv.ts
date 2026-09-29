import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { PrismaClient } from "@prisma/client";

import { arg, hasFlag, loadDotEnv, ROOT, separator } from "./cli-utils";
import { toCsv } from "../lib/csv";
import { CSV_COLUMNS } from "../lib/content-schema";

// ---------------------------------------------------------------------------
// Export du contenu vers un CSV (modele d'import + sauvegarde).
//
//   npm run export:csv                       # toute la base -> data/export.csv
//   npm run export:csv -- --test=test-01     # un seul test
//   npm run export:csv -- --template         # CSV modele (en-tetes + exemple)
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

const TEMPLATE_ROW: Record<string, unknown> = {
  test_code: "test-06",
  test_title: "TCF Entrainement - Test 6",
  test_description: "Questions originales d'entrainement.",
  section_type: "STRUCTURE",
  section_title: "Structure de la langue",
  duration_minutes: "20",
  question_number: "1",
  question_code: "ST6-01",
  level: "A1",
  category: "articles",
  document_code: "",
  document_title: "",
  document_content: "",
  prompt: "Marie a achete ___ nouvelle voiture.",
  option_a: "un",
  option_b: "une",
  option_c: "des",
  option_d: "du",
  correct_answer: "B",
  explanation: "« voiture » est feminin singulier.",
  points: "1",
};

async function main(): Promise<void> {
  const outDir = join(ROOT, "data");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  if (hasFlag("template")) {
    const target = join(outDir, "import-template.csv");
    writeFileSync(target, toCsv(CSV_COLUMNS, [TEMPLATE_ROW]), "utf8");
    console.log(`Modele ecrit : data/import-template.csv`);
    console.log(`Colonnes (${CSV_COLUMNS.length}) :`);
    console.log(`  ${CSV_COLUMNS.join(", ")}`);
    return;
  }

  const testCode = arg("test");
  const tests = await db.test.findMany({
    where: testCode ? { code: testCode } : undefined,
    orderBy: { order: "asc" },
    include: {
      sections: {
        orderBy: { order: "asc" },
        include: {
          documents: { orderBy: { order: "asc" } },
          questions: { orderBy: { number: "asc" }, include: { options: true } },
        },
      },
    },
  });

  const rows: Array<Record<string, unknown>> = [];

  for (const test of tests) {
    for (const section of test.sections) {
      const docById = new Map(section.documents.map((d) => [d.id, d]));
      for (const question of section.questions) {
        const optionByLabel = new Map(question.options.map((o) => [o.label, o]));
        const document = question.documentId ? docById.get(question.documentId) : undefined;
        const correct = question.options.find((o) => o.isCorrect)?.label ?? "";
        rows.push({
          test_code: test.code ?? test.slug,
          test_title: test.title,
          test_description: test.description ?? "",
          section_type: section.type,
          section_title: section.title,
          duration_minutes: section.durationMinutes,
          question_number: question.number,
          question_code: question.code ?? "",
          level: question.level,
          category: question.category ?? "",
          document_code: document?.code ?? "",
          document_title: document?.title ?? "",
          document_content: document?.content ?? "",
          prompt: question.prompt,
          option_a: optionByLabel.get("A")?.text ?? "",
          option_b: optionByLabel.get("B")?.text ?? "",
          option_c: optionByLabel.get("C")?.text ?? "",
          option_d: optionByLabel.get("D")?.text ?? "",
          correct_answer: correct,
          explanation: question.explanation,
          points: question.points,
        });
      }
    }
  }

  const name = testCode ? `export-${testCode}.csv` : "export.csv";
  const target = join(outDir, name);
  writeFileSync(target, toCsv(CSV_COLUMNS, rows), "utf8");

  console.log(`Export ecrit : data/${name}`);
  console.log(`Tests         : ${tests.length}`);
  console.log(`Questions     : ${rows.length}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
