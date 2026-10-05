import { PrismaClient } from "@prisma/client";

import { parseFocusedQuestionIds } from "../lib/focused";
import { grade, type AnswerRow, type GradeInput } from "../server/services/grading";
import { loadDotEnv } from "./cli-utils";

// ---------------------------------------------------------------------------
// Recalcul des scores deja persistes.
//
//   npm run db:rescore
//   npm run db:rescore -- --dry-run
//   npm run db:rescore -- --attempt=<id>
//
// Necessaire apres une correction du bareme : `totalScore`, `cefrLevel` et les
// scores par epreuve sont ecrits une seule fois, a la soumission. Les pages de
// resultat recalculent a la lecture et se corrigent donc seules, mais le tableau
// de bord, l'historique et l'administration lisent la valeur persistee : sans ce
// script, les anciennes tentatives y gardent un score faux.
//
// Le bareme n'est jamais modifie en base : seul le resultat du calcul est
// reecrit, et `--dry-run` affiche l'ecart sans rien enregistrer.
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

const ATTEMPT_SELECT = {
  id: true,
  status: true,
  startedAt: true,
  finishedAt: true,
  focusedQuestionIds: true,
  totalScore: true,
  structureScore: true,
  comprehensionScore: true,
  cefrLevel: true,
  test: {
    select: {
      id: true,
      title: true,
      slug: true,
      sections: {
        select: {
          id: true,
          type: true,
          title: true,
          order: true,
          durationMinutes: true,
          _count: { select: { questions: true } },
        },
      },
    },
  },
  sectionRuns: { include: { section: true } },
  answers: {
    include: { question: { include: { options: true, document: true, section: true } } },
  },
} as const;

type AttemptRow = {
  id: string;
  status: string;
  startedAt: Date;
  finishedAt: Date | null;
  focusedQuestionIds: string | null;
  totalScore: number | null;
  structureScore: number | null;
  comprehensionScore: number | null;
  cefrLevel: string | null;
  test: {
    id: string;
    title: string;
    slug: string;
    sections: {
      id: string;
      type: string;
      title: string;
      order: number;
      durationMinutes: number;
      _count: { questions: number };
    }[];
  };
  sectionRuns: {
    id: string;
    status: string;
    section: {
      id: string;
      type: string;
      title: string;
      order: number;
      durationMinutes: number;
    };
  }[];
  answers: AnswerRow[];
};

function toGradeInput(row: AttemptRow): GradeInput {
  return {
    attempt: {
      id: row.id,
      status: row.status,
      startedAt: row.startedAt,
      finishedAt: row.finishedAt,
      test: row.test,
    },
    focused: parseFocusedQuestionIds(row.focusedQuestionIds) !== null,
    sections: row.test.sections.map((section) => ({
      sectionId: section.id,
      type: section.type,
      title: section.title,
      order: section.order,
      durationMinutes: section.durationMinutes,
      questionCount: section._count.questions,
    })),
    sectionRuns: row.sectionRuns
      .filter((run) => run.status !== "IN_PROGRESS")
      .map((run) => ({
        sectionId: run.section.id,
        type: run.section.type,
        title: run.section.title,
        order: run.section.order,
        durationMinutes: run.section.durationMinutes,
      })),
    answers: row.answers,
  };
}

async function main(): Promise<void> {
  const dryRun = process.argv.includes("--dry-run");
  const only = process.argv.find((a) => a.startsWith("--attempt="))?.slice("--attempt=".length);

  const rows = (await db.attempt.findMany({
    where: { status: "SUBMITTED", ...(only ? { id: only } : {}) },
    select: ATTEMPT_SELECT,
  })) as unknown as AttemptRow[];

  console.log(
    `${dryRun ? "Simulation" : "Recalcul"} : ${rows.length} tentative(s) soumise(s).`,
  );
  if (dryRun) console.log("Retirez --dry-run pour ecrire en base.\n");

  let changed = 0;

  for (const row of rows) {
    const output = grade(toGradeInput(row));

    const same =
      row.totalScore === output.totalScore &&
      row.structureScore === output.structureCorrect &&
      row.comprehensionScore === output.comprehensionCorrect &&
      row.cefrLevel === output.cefrLevel;

    if (same) continue;

    changed += 1;
    console.log(`  ${row.test.title} — ${row.id}`);
    console.log(
      `    score  : ${row.totalScore ?? "-"} -> ${output.totalScore} / ${output.maxScore}` +
        `  (niveau ${row.cefrLevel ?? "-"} -> ${output.cefrLevel ?? "A1 non atteint"})`,
    );
    console.log(
      `    langue : ${row.structureScore ?? "-"} -> ${output.structureCorrect ?? "-"} / ${output.structureTotal ?? "-"}`,
    );
    console.log(
      `    ecrite : ${row.comprehensionScore ?? "-"} -> ${output.comprehensionCorrect ?? "-"} / ${output.comprehensionTotal ?? "-"}`,
    );

    if (dryRun) continue;

    await db.$transaction([
      ...row.sectionRuns
        .filter((run) => run.status !== "IN_PROGRESS")
        .map((run) => {
          const score = output.sectionScores.get(run.section.id);
          return db.sectionRun.update({
            where: { id: run.id },
            data: { score: score?.score ?? 0, maxScore: score?.maxScore ?? 0 },
          });
        }),
      db.attempt.update({
        where: { id: row.id },
        data: {
          structureScore: output.structureCorrect,
          comprehensionScore: output.comprehensionCorrect,
          totalScore: output.totalScore,
          maxScore: output.maxScore,
          cefrLevel: output.cefrLevel,
        },
      }),
    ]);
  }

  console.log(
    dryRun
      ? `\n${changed} tentative(s) changeraient.`
      : `\n${changed} mise(s) a jour, ${rows.length - changed} deja correcte(s).`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });