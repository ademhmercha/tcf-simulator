import fs from "fs";
import path from "path";

/**
 * Verifie que le contenu de data/ce ne contient que des caracteres latins.
 * Detecte les ideogrammes CJK, cyrillique, arabe, etc., qui-resultent
 * souvent d'une corruption de saisie.
 */

const dir = "data/ce";
const allowed = new Set(["«", "»", "“", "”", "‘", "’", "—", "–", "…", " ", "•", "€", "’"]);

let issues = 0;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
  const full = path.join(dir, file);
  const lines = fs.readFileSync(full, "utf8").split("\n");

  lines.forEach((raw, index) => {
    // On n'analyse que le contenu des chaines entre guillemets.
    const matches = raw.match(/"(?:[^"\\]|\\.)*"/g);
    if (!matches) return;

    for (const literal of matches) {
      for (const ch of literal) {
        const code = ch.codePointAt(0)!;
        const isAscii = code < 0x80;
        const isLatin =
          (code >= 0xc0 && code <= 0x24f) || (code >= 0x1e00 && code <= 0x1eff);
        if (isAscii || isLatin || allowed.has(ch)) continue;
        console.log(
          `${file}:${index + 1} U+${code.toString(16).toUpperCase().padStart(4, "0")} "${ch}" :: ${raw.trim().slice(0, 100)}`,
        );
        issues++;
        break;
      }
    }
  });
}

console.log(
  issues === 0
    ? "OK : aucun caractere non latin dans data/ce."
    : `${issues} ligne(s) avec caractere non latin.`,
);
process.exit(issues === 0 ? 0 : 1);
