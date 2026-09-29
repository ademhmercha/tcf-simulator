import { readFileSync } from "node:fs";

const src = JSON.parse(
  readFileSync("C:/Users/ademh/AppData/Local/Temp/opencode/content-backup.json", "utf8"),
);
const dst = JSON.parse(readFileSync("data/tcf_practice_5_tests_250_questions.json", "utf8"));

const j = (v: unknown) => JSON.stringify(v);

console.log("test   langue        CE          langue inchangee");
for (let i = 0; i < 5; i += 1) {
  const a = src.tests[i];
  const b = dst.tests[i];
  const langBefore = a.sections.structure_de_la_langue.questionCount;
  const langAfter = b.sections.structure_de_la_langue.questionCount;
  const ceBefore = a.sections.comprehension_ecrite.questionCount;
  const ceAfter = b.sections.comprehension_ecrite.questionCount;
  const same = j(a.sections.structure_de_la_langue) === j(b.sections.structure_de_la_langue);
  console.log(
    `test-0${i + 1}  ${langBefore}/${langAfter}     ${ceBefore}/${ceAfter}     ${same ? "OUI" : "NON <<<"}`,
  );
}

console.log(`\nmetadata identique : ${j(src.metadata) === j(dst.metadata) ? "OUI" : "NON"}`);
console.log(`titres identiques  : ${j(src.tests.map((t: any) => t.title)) === j(dst.tests.map((t: any) => t.title)) ? "OUI" : "NON"}`);
console.log(`cles de sections   : ${j(Object.keys(dst.tests[0].sections))}`);

// Verifie que chaque question CE suit bien le plan et l'ordre.
const plan = ["A1", "A1", "A1", "A1", "A2", "A2", "A2", "A2", "B1", "B1", "B1", "B1", "B2", "B2", "B2", "B2", "B2", ...Array(7).fill("C1"), ...Array(6).fill("C2")];
let problems = 0;
for (const test of dst.tests) {
  const qs = test.sections.comprehension_ecrite.questions;
  const levels = qs.map((q: any) => q.level);
  if (j(levels) !== j(plan)) {
    problems += 1;
    console.log(`  ${test.id} : ordre des niveaux incorrect`);
  }
  const ids = new Set(qs.map((q: any) => q.id));
  if (ids.size !== qs.length) {
    problems += 1;
    console.log(`  ${test.id} : identifiants dupliques`);
  }
  for (const q of qs) {
    const opts = Object.values(q.options as Record<string, string>);
    if (new Set(opts).size !== 4) {
      problems += 1;
      console.log(`  ${test.id} ${q.id} : propositions dupliquees`);
    }
    if (!q.explanation || !q.document || !q.documentTitle) {
      problems += 1;
      console.log(`  ${test.id} ${q.id} : champ manquant`);
    }
    if (opts.some((o) => /[^\p{L}\p{N}\p{P}\p{Zs}%€]|\p{C}/u.test(o as string))) {
      problems += 1;
      console.log(`  ${test.id} ${q.id} : caractere suspect dans les options`);
    }
  }
}
console.log(`\n${problems === 0 ? "Aucun probleme detecte." : `${problems} probleme(s).`}`);

// Les 13 questions longues doivent etre les dernieres.
for (const test of dst.tests) {
  const qs = test.sections.comprehension_ecrite.questions;
  const longs = qs.slice(17);
  const docs = new Set(longs.map((q: any) => q.documentId));
  console.log(
    `  ${test.id} : ${longs.length} questions longues sur ${docs.size} textes, niveaux ${[...new Set(longs.map((q: any) => q.level))].join("/")}`,
  );
}
