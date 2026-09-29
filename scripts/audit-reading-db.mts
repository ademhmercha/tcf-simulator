import { PrismaClient } from "@prisma/client";

import { CE_LONG_MAX_LINES, CE_LONG_MIN_LINES } from "../data/ce/types";

const db = new PrismaClient();

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const expected = { A1: 5, A2: 5, B1: 5, B2: 5, C1: 5, C2: 5 };
const expectedPerLevel = 5;
/** Les 20 questions A1 -> B2 ouvrent la section, les 10 longues la ferment. */
const shortCount = 20;

const problems: string[] = [];

const sections = await db.section.findMany({
  include: {
    questions: { select: { code: true, level: true, number: true, documentId: true } },
    test: { select: { code: true, title: true } },
  },
  orderBy: [{ order: "desc" }],
});

for (const section of sections) {
  const counts: Record<string, number> = {};
  for (const question of section.questions) {
    counts[question.level] = (counts[question.level] ?? 0) + 1;
  }
  const spread = levels.map((l) => `${l}:${counts[l] ?? 0}`).join(" ");
  const planned = levels.map((l) => `${l}:${expected[l]}`).join(" ");
  const numbers = section.questions.map((q) => q.number).sort((a, b) => a - b);
  const sequential = numbers.every((n, i) => n === i + 1);
  const order = section.questions
    .sort((a, b) => a.number - b.number)
    .map((q) => q.level);
  const highAtEnd = order.slice(0, shortCount).every((l) => l !== "C1" && l !== "C2");
  const matchesPlan = levels.every((l) => (counts[l] ?? 0) === expectedPerLevel);

  console.log(
    `${section.test.code} ${section.type.padEnd(19)} declare:${String(section.questionCount).padStart(3)} reel:${String(section.questions.length).padStart(3)}  ${spread}`,
  );
  if (section.type === "COMPREHENSION_ECRITE") {
    const docs = await db.document.count({ where: { sectionId: section.id } });
    const linked = section.questions.filter((q) => q.documentId).length;
    const orphans = await db.document.count({
      where: { sectionId: section.id, questions: { none: {} } },
    });
    console.log(
      `   attendu ${planned}  numeros continus:${sequential ? "oui" : "NON"}  C1C2 en fin:${highAtEnd ? "oui" : "NON"}  documents:${docs}  questions liees:${linked}/${section.questions.length}  documents orphelins:${orphans}`,
    );
    if (!matchesPlan) problems.push(`${section.test.code} : repartition des niveaux non conforme`);
    if (!highAtEnd) problems.push(`${section.test.code} : les niveaux C1/C2 ne sont pas en fin de section`);
    if (orphans > 0) problems.push(`${section.test.code} : ${orphans} document(s) sans question`);
    if (linked !== section.questions.length) {
      problems.push(`${section.test.code} : ${section.questions.length - linked} question(s) sans document`);
    }
  }
}

const questions = await db.question.count();
const documents = await db.document.count();
const linkedQuestions = await db.question.count({ where: { documentId: { not: null } } });
const longDocuments = await db.document.findMany({
  select: { content: true },
});

console.log(`\nQuestions en base: ${questions} dont ${linkedQuestions} liees a un document`);
console.log(`Documents en base: ${documents}`);
console.log(
  `Textes de ${CE_LONG_MIN_LINES} a ${CE_LONG_MAX_LINES} lignes: ${
    longDocuments.filter((d) => {
      const n = d.content.split("\n").length;
      return n >= CE_LONG_MIN_LINES && n <= CE_LONG_MAX_LINES;
    }).length
  }`,
);
console.log(
  `Documents sans question: ${
    await db.document.count({ where: { questions: { none: {} } } })
  }`,
);

await db.$disconnect();

if (problems.length === 0) {
  console.log("\nAudit conforme.");
} else {
  console.error(`\n${problems.length} probleme(s) :`);
  for (const problem of problems) console.error(`  [KO] ${problem}`);
  process.exit(1);
}
