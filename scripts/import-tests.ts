import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { PrismaClient } from "@prisma/client";

import {
  importContentFile,
  importCsvRows,
  parseContentJson,
} from "../server/services/content-import";
import { parseCsv } from "../lib/csv";
import { getServerEnv } from "../lib/env";
import { arg, hasFlag, loadDotEnv, ROOT, separator } from "./cli-utils";

// ---------------------------------------------------------------------------
// Import de contenu en masse.
//
//   npm run import:tests                       # data/...json (configure par .env)
//   npm run import:tests -- --file=mon.json     # autre JSON
//   npm run import:tests -- --file=export.csv   # CSV
//   npm run import:tests -- --draft             # sans publier
//
// Idempotent : les tests sont mis a jour via leur `code` puis `slug`.
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

async function main(): Promise<void> {
  const env = getServerEnv();
  const fileArg = arg("file") ?? env.TCF_SOURCE_JSON;
  const publish = !hasFlag("draft");

  // Un nom de fichier seul est recherche dans data/ par commodite.
  const candidates = [
    join(ROOT, fileArg),
    join(ROOT, "data", fileArg),
    join(ROOT, `${fileArg}.json`),
    join(ROOT, `${fileArg}.csv`),
  ];
  const filePath = candidates.find((p) => existsSync(p));

  if (!filePath) {
    throw new Error(
      `Fichier introuvable : ${fileArg}\n` +
        `Cherche dans : ${candidates.map((c) => c.replace(ROOT, ".")).join(", ")}`,
    );
  }

  const raw = readFileSync(filePath, "utf8");
  const isCsv = filePath.toLowerCase().endsWith(".csv");

  const before = await db.test.count();

  console.log("");
  console.log("Import TCF Simulator");
  separator();
  console.log(`  Fichier     : ${fileArg}`);
  console.log(`  Format      : ${isCsv ? "CSV" : "JSON"}`);
  console.log(`  Publication : ${publish ? "oui" : "non (brouillon)"}`);
  console.log("");

  const stats = isCsv
    ? await importCsvRows(db, parseCsv(raw).rows, { publish, log: (m) => console.log(m) })
    : await importContentFile(db, parseContentJson(raw), {
        publish,
        startOrder: before + 1,
        log: (m) => console.log(m),
      });

  const after = await db.test.count();

  console.log("");
  separator();
  console.log(`  Tests en base      : ${before} -> ${after}`);
  console.log(`  Tests crees        : ${stats.testsCreated}`);
  console.log(`  Tests mis a jour   : ${stats.testsUpdated}`);
  console.log(`  Sections           : ${stats.sectionsCreated + stats.sectionsUpdated}`);
  console.log(`  Documents          : ${stats.documentsCreated + stats.documentsUpdated}`);
  console.log(`  Questions (total)  : ${await db.question.count()}`);
  console.log(`  Documents (total)  : ${await db.document.count()}`);
  console.log(`  Options ecrites    : ${stats.optionsWritten}`);
  console.log("OK\n");
}

main()
  .catch((error: unknown) => {
    console.error("\nECHEC DE L'IMPORT\n");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
