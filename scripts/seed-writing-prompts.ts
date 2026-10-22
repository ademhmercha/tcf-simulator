import { PrismaClient } from "@prisma/client";

import { importWritingPrompts } from "../server/services/writing-import";
import { WRITING_PROMPTS } from "../data/writing";
import { loadDotEnv, separator } from "./cli-utils";

// ---------------------------------------------------------------------------
// Import des sujets d'expression ecrite.
//
//   npm run writing:seed
//
// Source : `data/writing_prompts.json` (30 sujets B2-C2, catalogues dans
// `data/writing.ts`). Upsert sur `slug` : le script peut etre relance sans
// creer de doublon.
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

async function main(): Promise<void> {
  console.log("");
  console.log("Import des sujets d'expression ecrite");
  separator();
  console.log(`  Catalogue : ${WRITING_PROMPTS.length} sujets`);
  console.log("");

  const stats = await importWritingPrompts(db, (message) => console.log(message));

  const total = await db.writingPrompt.count();

  console.log("");
  separator();
  console.log(`  Total en base : ${total}`);
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
