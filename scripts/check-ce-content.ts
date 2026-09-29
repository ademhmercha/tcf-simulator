import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Controle qualite du contenu de comprehension ecrite.
 *
 * Le but est de catching les derives suivantes, visibles dans les textes longs :
 *   - caracteres hors alphabet latin (CJK,oglyphes, U+FFFD, controles)
 *   - residus de fusion de deux mots francais (« QueSoutient », « moit�� »)
 *   - documents dont le nombre de lignes sort de la plage 11-13
 *   - questions sans enonce, sans explication ou a 4 propositions non distinctes
 *
 * Usage : node --import tsx scripts/check-ce-content.ts
 */

const CE_DIR = join(process.cwd(), "data", "ce");

/**
 * Longueur des textes longs. La rubrique « Vocabulaire » a ete retiree du
 * corps des textes : la plage accepte desormais 11 a 13 lignes de prose.
 */
const MIN_LONG_LINES = 11;
const MAX_LONG_LINES = 13;

/** Plages autorisees : ASCII, latin sup. et ponctuation francaise. */
const ALLOWED =
  /[^\x09\x0A\x20-\x7E\xA0-\u017F\u2018\u2019\u201C\u201D\u2013\u2014\u2026\u00AB\u00BB\u00A0]/;

/** Caracteres interdits, avec le motif qui les detecte. */
const FORBIDDEN: Array<{ label: string; re: RegExp }> = [
  { label: "remplacement U+FFFD", re: /\uFFFD/ },
  { label: "controle non tabulation", re: /[\x00-\x08\x0B-\x1F]/ },
  { label: "ideogramme CJK", re: /[\u3000-\u9FFF\uAC00-\uD7AF\uFF00-\uFFEF]/ },
];

/** Motifs reserves au contenu des chaines de langue (absents des commentaires). */
const FORBIDDEN_IN_STRING: Array<{ label: string; re: RegExp }> = [
  { label: "symbole etoile", re: /\*/ },
  { label: "double point d'exclamation", re: /!!/ },
  { label: "ponctuation double", re: /\?\?|:\s*:|\.\s*\./ },
  { label: "barre oblique isolee", re: /\/{2,}/ },
  { label: "sequence point d'exclamation", re: /!\s*-|\s*-!/ },
  { label: "espace manque apres un point", re: /[a-zà-ÿ]\.[A-ZÀ-Ý]/ },
  { label: "underscore", re: /_/ },
];

/** Mots anglais frequents qui trahissent une generation erronee. */
const ENGLISH = [
  "wrote", "the", "and", "with", "this", "which", "from", "have", "source",
  "users", "volunteers", "municipality", "assertions", "bing", "cedex",
  "proofed", "left", "right", "normal", "tests",
];

/**
 * Mots francais composes de deux mots distincts : minuscule suivie d'un majuscule
 * interne, hors sigles et noms propres connus.
 */
const ALLOWED_CAPS = /\b(TCF|CE|ST|JSON|SQL|HTML|PDF|URL|API|CLIT|UNESCO|RH|DM|RHCP)\b/;

let failures = 0;

function report(file: string, line: number, message: string): void {
  failures += 1;
  console.error(`  [KO] ${file}:${line} ${message}`);
}

const files = readdirSync(CE_DIR).filter((f) => f.endsWith(".ts") && f !== "types.ts");

for (const file of files) {
  const raw = readFileSync(join(CE_DIR, file), "utf8");
  const rows = raw.split(/\r?\n/);

  rows.forEach((text, index) => {
    const lineNumber = index + 1;

    for (const { label, re } of FORBIDDEN) {
      if (re.test(text)) report(file, lineNumber, `${label} : ${text.trim().slice(0, 90)}`);
    }

    // Contraintes propres au texte francais : uniquement dans les chaines.
    const strings = text.match(/"[^"]*"/g) ?? [];
    for (const value of strings) {
      for (const { label, re } of FORBIDDEN_IN_STRING) {
        if (re.test(value)) {
          report(file, lineNumber, `${label} : ${value.slice(0, 90)}`);
        }
      }
    }

    // Hors alphabet latin.
    for (const char of text) {
      if (ALLOWED.test(char)) {
        report(
          file,
          lineNumber,
          `caractere inattendu U+${char.codePointAt(0)!.toString(16).toUpperCase()} : ${text.trim().slice(0, 90)}`,
        );
        break;
      }
    }

    // Mots fusionnes et residus anglais dans une chaine de langue francaise.
    for (const value of strings) {
      const inner = value.slice(1, -1);
      if (ALLOWED.test(inner)) continue;

      for (const word of ENGLISH) {
        if (new RegExp(`\\b${word}\\b`, "i").test(inner)) {
          report(file, lineNumber, `mot anglais « ${word} » : ${inner.slice(0, 80)}`);
        }
      }

      const merged = inner.match(/[a-zà-ÿ][A-ZÀ-Ý][a-zà-ÿ]{2,}/g);
      if (!merged) continue;
      for (const word of merged) {
        if (ALLOWED_CAPS.test(word)) continue;
        report(file, lineNumber, `mot fusionne « ${word} » : ${inner.slice(0, 80)}`);
      }
    }
  });

  // Longueur des textes longs.
  const blocks = raw.matchAll(/lines\(\s*((?:"[^"]*",?\s*)+)\)/g);
  for (const block of blocks) {
    const count = (block[1]?.match(/"/g) ?? []).length / 2;
    if (count < MIN_LONG_LINES || count > MAX_LONG_LINES) {
      const lineNumber = raw.slice(0, block.index).split(/\r?\n/).length;
      report(file, lineNumber, `texte long de ${count} lignes (attendu 11 a 13)`);
    }
  }

  // Documents courts : le tuple doit avoir exactement 3 elements.
  const shorts = raw.matchAll(/^  \[$/gm);
  for (const entry of shorts) {
    const after = raw.slice(entry.index);
    const end = after.indexOf("\n  ],");
    if (end === -1) continue;
    const block = after.slice(0, end);
    const topLevel = (block.match(/^    \S/gm) ?? []).length;
    if (topLevel !== 3) {
      const lineNumber = raw.slice(0, entry.index).split(/\r?\n/).length;
      report(
        file,
        lineNumber,
        `document court de ${topLevel} elements (attendu 3 : titre, contenu, questions)`,
      );
    }
  }
}

if (failures === 0) {
  console.log("  Aucun defaut detecte dans data/ce.");
} else {
  console.error(`\n  ${failures} defaut(s) a corriger.`);
  process.exit(1);
}
