#!/usr/bin/env node
/**
 * Wrapper Prisma : ajoute automatiquement `--schema` selon DATABASE_PROVIDER.
 *
 *   DATABASE_PROVIDER=sqlite     -> prisma/schema.sqlite.prisma
 *   DATABASE_PROVIDER=postgresql -> prisma/schema.prisma
 *
 * Usage : node scripts/prisma.mjs db push --force-reset
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const envFile = join(ROOT, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

/**
 * Fournisseur de base de donnees, resolu SANS valeur par defaut.
 *
 * Pourquoi ne pas retomber sur `sqlite` en cas d'absence ? parce que ce fichier
 * pilote aussi `npm run build`. Sur Vercel, une variable d'environnement peut
 * etre declaree pour l'execution mais absente du lot de build : `prisma
 * generate` partait alors sur le miroir SQLite, produisait un client Prisma
 * SQLite, et le deploiement se retrouvait a interroger Postgres avec un moteur
 * SQLite. Le symptome etait une erreur « Server Components render » sur TOUTES
 * les pages lisant la base, sans message cote client.
 *
 * On prefere donc un build bruyant a un build silencieusement casse.
 */
function resolveProvider() {
  const raw = process.env.DATABASE_PROVIDER;

  if (raw === "sqlite" || raw === "postgresql") return raw;

  console.error(
    `\n[prisma] DATABASE_PROVIDER vaut ${JSON.stringify(raw ?? "undefined")} : ` +
      `elle doit valoir "sqlite" ou "postgresql".\n` +
      `[prisma] Definis-la dans .env (local) ou dans les variables Vercel, ` +
      `POUR LES BUILDS ET POUR L'EXECUTION (portee "All Environments").\n`,
  );
  process.exit(1);
}

const provider = resolveProvider();
const schemaPath =
  provider === "sqlite" ? "prisma/schema.sqlite.prisma" : "prisma/schema.prisma";

if (!existsSync(join(ROOT, schemaPath))) {
  console.error(
    `[prisma] Schema introuvable : ${schemaPath}\n` +
      `[prisma] Lancez d'abord : npm run db:use:${provider}`,
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const hasSchemaFlag = args.some((a) => a.startsWith("--schema"));
const finalArgs = hasSchemaFlag ? args : [...args, `--schema=${schemaPath}`];

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(npx, ["prisma", ...finalArgs], {
  cwd: ROOT,
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
});

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (err) => {
  console.error("[prisma]", err.message);
  process.exit(1);
});
