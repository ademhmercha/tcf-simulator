import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const levels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const expected = { A1: 4, A2: 4, B1: 4, B2: 5, C1: 7, C2: 6 };

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
  const highAtEnd = order.slice(0, 17).every((l) => l !== "C1" && l !== "C2");

  console.log(
    `${section.test.code} ${section.type.padEnd(19)} declare:${String(section.questionCount).padStart(3)} reel:${String(section.questions.length).padStart(3)}  ${spread}`,
  );
  if (section.type === "COMPREHENSION_ECRITE") {
    const docs = await db.document.count({ where: { sectionId: section.id } });
    const linked = section.questions.filter((q) => q.documentId).length;
    console.log(
      `   attendu ${planned}  numeros continus:${sequential ? "oui" : "NON"}  C1C2 en fin:${highAtEnd ? "oui" : "NON"}  documents:${docs}  questions liees:${linked}/${section.questions.length}`,
    );
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
  `Textes de 12 ou 13 lignes: ${
    longDocuments.filter((d) => {
      const n = d.content.split("\n").length;
      return n === 12 || n === 13;
    }).length
  }`,
);
console.log(
  `Documents sans question: ${
    (await db.document.count({ where: { questions: { none: {} } } }))
  }`,
);

await db.$disconnect();
