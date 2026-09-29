import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import { PrismaClient } from "@prisma/client";

import { arg, hasFlag, loadDotEnv, ROOT, separator } from "./cli-utils";
import { parseCsv } from "../lib/csv";
import { analyzeRows } from "../lib/content-schema";
import { importCsvRows } from "../server/services/content-import";

// ---------------------------------------------------------------------------
// Import CSV depuis un fichier local (pratique pour la CI ou de gros lots).
// L'assistant d'import de l'espace admin est le chemin recommande.
//
//   npm run import:csv -- --file=data/mon-test.csv --publish
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

async function main(): Promise<void> {
  const file = arg("file") ?? "data/import-template.csv";

  if (!existsSync(resolveDataDir())) mkdirSync(resolveDataDir(), { recursive: true });
  const fullPath = join(ROOT, file);
  if (!existsSync(fullPath)) {
    throw new Error(
      `Fichier CSV introuvable : ${file}\nGenerez un modele avec : npm run export:csv -- --template`,
    );
  }

  const raw = readFileSync(fullPath, "utf8");
  const { rows, errors } = parseCsv(raw);
  if (errors.length) console.warn(`  Avertissements CSV : ${errors.join(", ")}`);

  const { preview } = analyzeRows(rows);

  console.log("");
  console.log("Import CSV");
  separator();
  console.log(`  Fichier   : ${file}`);
  console.log(`  Lignes    : ${preview.totalRows}`);
  console.log(`  Valides   : ${preview.validRows}`);
  console.log(`  En erreur : ${preview.errorRows}`);
  for (const test of preview.tests) {
    console.log(`  ${test.testCode} : ${test.title}`);
    for (const s of test.sections) {
      console.log(
        `      ${s.type.padEnd(22)} ${String(s.questionCount).padStart(3)} questions, ${s.documentCount} documents`,
      );
    }
  }

  if (preview.issues.length > 0) {
    console.log("\n  Anomalies :");
    for (const issue of preview.issues.slice(0, 25)) {
      console.log(`    [${issue.severity}] ligne ${issue.row} ${issue.field} : ${issue.message}`);
    }
    if (preview.issues.length > 25) console.log(`    ... et ${preview.issues.length - 25} autres`);
  }

  if (preview.validRows === 0) throw new Error("Aucune ligne valide, import annule.");

  const publish = hasFlag("publish");
  const stats = await importCsvRows(db, rows, { publish, log: (m) => console.log(m) });

  console.log("");
  separator();
  console.log(`  Tests crees / maj : ${stats.testsCreated} / ${stats.testsUpdated}`);
  console.log(`  Questions        : ${stats.questionsCreated} / ${stats.questionsUpdated}`);
  console.log(`  Options ecrites  : ${stats.optionsWritten}`);
  console.log("OK\n");
}

function resolveDataDir(): string {
  return join(ROOT, "data");
}

main()
  .catch((error: unknown) => {
    console.error("\nECHEC DE L'IMPORT CSV\n");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
