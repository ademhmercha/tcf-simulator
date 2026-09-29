import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Utilitaires partages par les scripts CLI (tsx / node).
// Evite de dupliquer le chargement du fichier .env et des arguments.
// ---------------------------------------------------------------------------

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Charge .env dans process.env sans ecraser les variables deja definies. */
export function loadDotEnv(fileName = ".env"): void {
  const envPath = join(ROOT, fileName);
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = match[1];
    if (key === undefined) continue;
    if (process.env[key] !== undefined) continue;
    process.env[key] = (match[2] ?? "").trim().replace(/^["']|["']$/g, "");
  }
}

/** Lit un option CLI de la forme --nom=valeur. */
export function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.split("=").slice(1).join("=");
}

/** Teste la presence d'un option CLI de la forme --nom. */
export function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

/** Enveloppe les commandes CLI avec une sortie homogene. */
export function section(title: string): void {
  console.log(`\n${"=".repeat(64)}\n  ${title}\n${"=".repeat(64)}`);
}

export function separator(): void {
  console.log("-".repeat(64));
}
