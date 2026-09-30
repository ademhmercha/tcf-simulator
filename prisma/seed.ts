import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaClient } from "@prisma/client";

import { computeSimulatedScore, DEFAULT_SCORING_PROFILE, SCORE_MAX } from "../config/scoring";
import { importContentFile, parseContentJson } from "../server/services/content-import";
import { getServerEnv } from "../lib/env";
import { hashPassword } from "../lib/security";

// ---------------------------------------------------------------------------
// Seed : charge les 5 tests depuis data/tcf_practice_5_tests_250_questions.json
// et cree les comptes de demonstration.
//
//   npm run db:seed
//
// Idempotent : relancer le seed met a jour le contenu sans le dupliquer.
// ---------------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

function loadDotEnv(): void {
  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    const key = match[1];
    if (!key) continue;
    if (process.env[key] !== undefined) continue;
    process.env[key] = (match[2] ?? "").trim().replace(/^["']|["']$/g, "");
  }
}

loadDotEnv();

const db = new PrismaClient();

function heading(text: string): void {
  console.log(`\n${"=".repeat(64)}\n  ${text}\n${"=".repeat(64)}`);
}

async function seedUsers(): Promise<void> {
  heading("Comptes");

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@tcf-simulator.local";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "Admin!2345";
  const demoEmail = process.env.SEED_DEMO_EMAIL ?? "candidat@tcf-simulator.local";
  const demoPassword = process.env.SEED_DEMO_PASSWORD ?? "Candidat!2345";

  const adminHash = await hashPassword(adminPassword);
  const admin = await db.user.upsert({
    where: { email: adminEmail },
    update: { name: "Administrateur", role: "ADMIN", passwordHash: adminHash },
    create: {
      email: adminEmail,
      name: "Administrateur",
      role: "ADMIN",
      passwordHash: adminHash,
      locale: "fr",
    },
  });
  console.log(`  Admin   : ${admin.email}`);

  const demoHash = await hashPassword(demoPassword);
  const demo = await db.user.upsert({
    where: { email: demoEmail },
    update: { name: "Candidat Demo", role: "USER", passwordHash: demoHash },
    create: {
      email: demoEmail,
      name: "Candidat Demo",
      role: "USER",
      passwordHash: demoHash,
      locale: "fr",
    },
  });
  console.log(`  Candidat: ${demo.email}`);
  console.log(`  Mot de passe admin    : ${adminPassword}`);
  console.log(`  Mot de passe candidat : ${demoPassword}`);
}

async function seedTests(): Promise<void> {
  heading("Tests");

  const env = getServerEnv();
  const sourcePath = resolve(ROOT, env.TCF_SOURCE_JSON);

  if (!existsSync(sourcePath)) {
    throw new Error(
      `Fichier de contenu introuvable : ${sourcePath}\n` +
        `Placez votre JSON dans data/ ou definissez TCF_SOURCE_JSON dans .env.`,
    );
  }

  const raw = readFileSync(sourcePath, "utf8");
  const content = parseContentJson(raw);

  console.log(`  Source : ${env.TCF_SOURCE_JSON}`);
  console.log(`  Tests  : ${content.tests.length}`);
  console.log("");

  const stats = await importContentFile(db, content, {
    publish: env.TCF_SEED_PUBLISH,
    startOrder: 1,
    log: (message) => console.log(message),
  });

  console.log("");
  console.log("  Resume :");
  console.log(`    Tests crees / mis a jour : ${stats.testsCreated} / ${stats.testsUpdated}`);
  console.log(`    Sections creees / maj   : ${stats.sectionsCreated} / ${stats.sectionsUpdated}`);
  console.log(`    Documents crees / maj   : ${stats.documentsCreated} / ${stats.documentsUpdated}`);
  console.log(`    Questions creees / maj  : ${stats.questionsCreated} / ${stats.questionsUpdated}`);
  console.log(`    Options ecrites         : ${stats.optionsWritten}`);
  console.log(`    Duree totale (5 tests)  : ${stats.durationMinutes} min`);
}

async function seedDemoAttempts(): Promise<void> {
  heading("Tentatives de demonstration");

  const demoEmail = process.env.SEED_DEMO_EMAIL ?? "candidat@tcf-simulator.local";
  const user = await db.user.findUnique({ where: { email: demoEmail } });
  if (!user) {
    console.log("  Compte candidat absent, ignore.");
    return;
  }

  // Le seed doit rester rejouable : on supprime les tentatives deja generees
  // plutot que d'en creer de nouvelles a chaque execution.
  const previousCount = await db.attempt.count({ where: { userId: user.id } });
  if (previousCount > 0) {
    await db.attempt.deleteMany({ where: { userId: user.id } });
    console.log(`  ${previousCount} tentative(s) precedente(s) supprimee(s).`);
  }

  const tests = await db.test.findMany({
    orderBy: { order: "asc" },
    include: {
      sections: { orderBy: { order: "asc" } },
    },
  });

  // Progression realiste : Test 1 et 2 faibles, Test 3 moyen, Test 4 bon.
  const targets = [
    { testIndex: 0, ratio: 0.52 },
    { testIndex: 1, ratio: 0.58 },
    { testIndex: 2, ratio: 0.66 },
    { testIndex: 3, ratio: 0.76 },
  ];

  for (const target of targets) {
    const test = tests[target.testIndex];
    if (!test) continue;

    const attempt = await db.attempt.create({
      data: {
        userId: user.id,
        testId: test.id,
        status: "SUBMITTED",
        startedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (5 - test.order)),
        finishedAt: new Date(),
        scoringProfile: DEFAULT_SCORING_PROFILE.id,
      },
    });

    const parts = new Map<string, { correct: number; total: number }>();

    for (const section of test.sections) {
      const questions = await db.question.findMany({
        where: { sectionId: section.id },
        orderBy: { number: "asc" },
        include: { options: true },
      });

      const runExpires = new Date();
      await db.sectionRun.create({
        data: {
          attemptId: attempt.id,
          sectionId: section.id,
          status: "SUBMITTED",
          startedAt: new Date(),
          expiresAt: runExpires,
          finishedAt: runExpires,
        },
      });

      // `score` designe le nombre de bonnes reponses, `maxScore` le nombre de
      // questions : c'est ce que le resultat affiche (« 16 / 20 »).
      let sectionScore = 0;
      let sectionMax = 0;

      for (const question of questions) {
        const max = 1;
        sectionMax += max;
        // Determinisme : le ratio pilote l'echantillon, on alterne pour varier.
        const hash = (question.number * 31 + test.order * 7) % 100;
        const correct = hash < Math.round(target.ratio * 100);

        let selectedOptionId: string | null = null;
        let isCorrect = false;

        if (correct) {
          selectedOptionId = question.options.find((o) => o.isCorrect)?.id ?? null;
          isCorrect = true;
          sectionScore += max;
        } else if (hash % 3 !== 0) {
          selectedOptionId =
            question.options.find((o) => !o.isCorrect && o.label === "A")?.id ??
            question.options.find((o) => !o.isCorrect)?.id ??
            null;
          isCorrect = false;
        }

        await db.answer.create({
          data: {
            attemptId: attempt.id,
            questionId: question.id,
            selectedOptionId,
            isCorrect,
            flagged: false,
            timeSpentSec: 25 + ((question.number * 13 + test.order * 5) % 70),
          },
        });
      }

      await db.sectionRun.updateMany({
        where: { attemptId: attempt.id, sectionId: section.id },
        data: { score: sectionScore, maxScore: sectionMax },
      });

      parts.set(section.type, { correct: sectionScore, total: sectionMax });

      if (section.type === "STRUCTURE") {
        await db.attempt.update({ where: { id: attempt.id }, data: { structureScore: sectionScore } });
      } else {
        await db.attempt.update({
          where: { id: attempt.id },
          data: { comprehensionScore: sectionScore },
        });
      }
    }

    const simulated = computeSimulatedScore([...parts.values()]);

    await db.attempt.update({
      where: { id: attempt.id },
      data: {
        totalScore: simulated.score,
        maxScore: SCORE_MAX,
        cefrLevel: simulated.level,
      },
    });

    console.log(
      `  ${test.title} : ${simulated.score}/${SCORE_MAX} -> ${simulated.level ?? "A1 non atteint"}`,
    );
  }
}

async function main(): Promise<void> {
  console.log("Seed TCF Simulator");
  console.log(`  NODE_ENV      : ${process.env.NODE_ENV ?? "development"}`);
  console.log(`  DATABASE_URL  : ${(process.env.DATABASE_URL ?? "").replace(/:[^:@/]+@/, ":***@")}`);

  await seedUsers();
  await seedTests();
  await seedDemoAttempts();

  heading("Termine");
  console.log("  Lancer l'application : npm run dev");
  console.log("  Puis ouvrir         : http://localhost:3000\n");
}

main()
  .catch((error: unknown) => {
    console.error("\nECHEC DU SEED\n");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
