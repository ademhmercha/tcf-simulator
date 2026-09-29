import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { CE_LEVEL_PLAN } from "../data/ce";

/**
 * Verifie le JSON genere apres regeneration de la comprehension ecrite.
 *
 *   - la section de structure de la langue doit etre inchangee
 *   - la comprehension ecrite doit suivre le plan 5 A1 -> 5 C2 = 30
 *   - chaque document doit porter exactement une question
 *
 * Usage : npm run content:reading:verify -- [chemin/vers/reference.json]
 */

const ROOT = process.cwd();
const TARGET = join(ROOT, "data", "tcf_practice_5_tests_250_questions.json");

/** Repertoire temporaire, facultatif, servant de reference « avant ». */
const BACKUP_DIR = join(process.env.TEMP ?? join(ROOT, ".tmp"), "opencode");
const BACKUP = process.argv[2] ?? join(BACKUP_DIR, "content-backup.json");

interface ContentFile {
  metadata: Record<string, unknown>;
  tests: Array<{
    id: string;
    title: string;
    sections: {
      structure_de_la_langue: { questionCount: number; questions: unknown[] };
      comprehension_ecrite: { questionCount: number; questions: Question[] };
    };
  }>;
}

interface Question {
  id: string;
  documentId: string;
  documentTitle: string;
  document: string;
  level: string;
  options: Record<string, string>;
  explanation: string;
}

const target = JSON.parse(readFileSync(TARGET, "utf8")) as ContentFile;
const plan = CE_LEVEL_PLAN.flatMap((row) => Array<string>(row.count).fill(row.level));
const expectedTotal = plan.length;

let problems = 0;

function check(condition: boolean, message: string): void {
  if (condition) return;
  problems += 1;
  console.log(`  [KO] ${message}`);
}

for (const test of target.tests) {
  const questions = test.sections.comprehension_ecrite.questions;

  check(
    questions.length === expectedTotal,
    `${test.id} : ${questions.length} questions au lieu de ${expectedTotal}`,
  );
  check(
    JSON.stringify(questions.map((q) => q.level)) === JSON.stringify(plan),
    `${test.id} : ordre des niveaux incorrect`,
  );
  check(
    new Set(questions.map((q) => q.id)).size === questions.length,
    `${test.id} : identifiants dupliques`,
  );

  const byDoc = new Map<string, number>();
  for (const question of questions) {
    byDoc.set(question.documentId, (byDoc.get(question.documentId) ?? 0) + 1);
  }
  check(
    byDoc.size === questions.length,
    `${test.id} : ${byDoc.size} documents pour ${questions.length} questions (une question par document attendu)`,
  );

  const longs = questions.filter((q) => q.document.split("\n").length >= 12);
  check(longs.length === 10, `${test.id} : ${longs.length} texte(s) long(s) au lieu de 10`);

  for (const question of questions) {
    const options = Object.values(question.options);
    check(new Set(options).size === 4, `${test.id} ${question.id} : propositions dupliquees`);
    check(
      Boolean(question.explanation && question.document && question.documentTitle),
      `${test.id} ${question.id} : champ manquant`,
    );
    check(
      !options.some((o) => /[^\p{L}\p{N}\p{P}\p{Zs}%€]|\p{C}/u.test(o)),
      `${test.id} ${question.id} : caractere suspect dans les options`,
    );
  }

  console.log(
    `  ${test.id} : ${questions.length} questions, ${byDoc.size} documents, ${longs.length} textes longs`,
  );
}

// Comparaison avec une sauvegarde, si elle existe.
if (existsSync(BACKUP)) {
  const before = JSON.parse(readFileSync(BACKUP, "utf8")) as ContentFile;
  check(
    JSON.stringify(before.metadata) === JSON.stringify(target.metadata),
    "metadata modifie",
  );
  check(
    JSON.stringify(before.tests.map((t) => t.title)) ===
      JSON.stringify(target.tests.map((t) => t.title)),
    "titres de tests modifies",
  );
  before.tests.forEach((reference, i) => {
    const test = target.tests[i];
    if (!test) {
      check(false, `le test ${reference.id} a disparu`);
      return;
    }
    check(
      JSON.stringify(reference.sections.structure_de_la_langue) ===
        JSON.stringify(test.sections.structure_de_la_langue),
      `${test.id} : la structure de la langue a ete modifiee`,
    );
  });
  console.log(`  reference comparee : ${BACKUP}`);
} else {
  console.log(`  aucune reference fournie : verification de la langue ignoree (${BACKUP})`);
}

console.log(problems === 0 ? "\nAucun probleme detecte." : `\n${problems} probleme(s).`);
process.exit(problems === 0 ? 0 : 1);
