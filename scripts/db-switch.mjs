#!/usr/bin/env node
/**
 * Bascule de fournisseur de base de donnees.
 *
 * `prisma/schema.prisma` est la source de verite unique (PostgreSQL).
 * Ce script le copie vers `prisma/schema.sqlite.prisma` en remplacant
 * uniquement le bloc `datasource`, puis synchronize Prisma Client.
 *
 *   node scripts/db-switch.mjs sqlite
 *   node scripts/db-switch.mjs postgres
 *   node scripts/db-switch.mjs sqlite --no-generate
 */

import { readFileSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const PROVIDERS = {
  sqlite: { url: "file:./dev.db", envKey: "DATABASE_URL_SQLITE" },
  postgres: { url: env("DATABASE_URL"), envKey: "DIRECT_URL" },
};

function env(key) {
  return process.env[key] ?? "";
}

function loadDotEnv() {
  const file = join(ROOT, ".env");
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    if (process.env[key] !== undefined) continue;
    process.env[key] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

const target = process.argv[2];
const skipGenerate = process.argv.includes("--no-generate");

if (!PROVIDERS[target]) {
  console.error(`Usage: node scripts/db-switch.mjs <sqlite|postgres> [--no-generate]`);
  process.exit(1);
}

loadDotEnv();

const canonical = join(ROOT, "prisma", "schema.prisma");
const source = readFileSync(canonical, "utf8");

const DATASOURCE_RE = /datasource\s+db\s*\{[^}]*\}/;

if (!DATASOURCE_RE.test(source)) {
  console.error("ERREUR: bloc `datasource db { ... }` introuvable dans prisma/schema.prisma");
  process.exit(1);
}

const url = PROVIDERS[target].url;
if (!url) {
  console.error(`ERREUR: DATABASE_URL est vide. Definissez-la dans .env pour utiliser PostgreSQL.`);
  process.exit(1);
}

const replacement = `datasource db {\n  provider = "${target}"\n  url      = env("DATABASE_URL")\n}`;
const generated = source.replace(DATASOURCE_RE, replacement);

// En-tete d'avertissement pour le fichier genere.
const header = [
  "// ===========================================================================",
  "// GENERE AUTOMATIQUEMENT - NE PAS EDITER A LA MAIN.",
  "// Source : prisma/schema.prisma  ·  Regenerer avec : npm run db:use:sqlite",
  "// Utilise pour le developpement local sans serveur PostgreSQL.",
  "// ===========================================================================",
  "",
].join("\n");

const outPath = join(ROOT, "prisma", `schema.${target === "sqlite" ? "sqlite" : "postgres"}.prisma`);
writeFileSync(outPath, header + generated, "utf8");

// Nettoyage du miroir de l'autre fournisseur pour eviter toute confusion.
const other = target === "sqlite" ? "postgres" : "sqlite";
const stale = join(ROOT, "prisma", `schema.${other}.prisma`);
if (existsSync(stale)) rmSync(stale);

const schemaFlag = target === "sqlite" ? "--schema=prisma/schema.sqlite.prisma" : "";
if (target === "sqlite") {
  // Prisma lit le schema par defaut ; on garde aussi la coherence pour `prisma generate`.
  console.log("[db] schema actif : prisma/schema.sqlite.prisma (provider=sqlite)");
} else {
  console.log("[db] schema actif : prisma/schema.prisma (provider=postgresql)");
}

if (!skipGenerate) {
  console.log("[db] prisma generate...");
  execSync(`npx prisma generate ${schemaFlag}`, { cwd: ROOT, stdio: "inherit" });
}

console.log(`[db] Provider configure : ${target}`);
console.log(`[db] DATABASE_URL       : ${url.replace(/:[^:@/]+@/, ":***@")}`);
console.log("[db] Executez ensuite : npm run db:push && npm run db:seed");
