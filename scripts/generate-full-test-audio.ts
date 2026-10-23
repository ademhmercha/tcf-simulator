import { existsSync, mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync, spawn } from "node:child_process";

import { FULL_TESTS } from "../data/full_tests";
import { fullTestAudioUrl, fullTestId } from "../data/full_tests/types";
import { CO_RATE_BY_LEVEL, CO_VOICES, type CoVoice } from "../data/co/types";

/**
 * Synthese audio des examens blancs.
 *
 * Utilise `edge-tts` (voix neurales Microsoft, gratuites, aucun compte) :
 *   pip install edge-tts
 *
 * Usage :
 *   npm run audio:examens              # genere les MP3 manquants (idempotent)
 *   npm run audio:examens -- --force   # regenere TOUS les fichiers
 *   npm run audio:examens -- --check   # verifie que tous les MP3 existent
 *
 * Les fichiers sont ecrits dans `public/audio/examens/<testId>/<nn>.mp3`.
 * Lancer `npm run content:full` avant, puis `npm run db:seed` apres.
 */

const ROOT = resolve(process.cwd());
const AUDIO_ROOT = join(ROOT, "public", "audio", "examens");

const checkOnly = process.argv.includes("--check");
const force = process.argv.includes("--force");

type Job = { text: string; voice: CoVoice; rate: string; outPath: string; label: string };

function collectJobs(): Job[] {
  const jobs: Job[] = [];
  for (const test of FULL_TESTS) {
    const voice = CO_VOICES[(test.number - 1) % CO_VOICES.length] as CoVoice;
    test.listening.forEach((question, index) => {
      const url = fullTestAudioUrl(test.number, index);
      jobs.push({
        text: question.transcription,
        voice,
        rate: CO_RATE_BY_LEVEL[question.level] ?? "0%",
        outPath: join(ROOT, "public", url),
        label: `${fullTestId(test.number)}/${String(index + 1).padStart(2, "0")}`,
      });
    });
  }
  return jobs;
}

const rateArg = (rate: string): string[] =>
  rate === "0%" ? [] : [`--rate=${rate}`];

function generate(job: Job): Promise<boolean> {
  return new Promise((resolvePromise) => {
    const workPath = `${job.outPath}.part`;

    const args = [
      "-m",
      "edge_tts",
      "--voice",
      job.voice,
      ...rateArg(job.rate),
      "--text",
      job.text,
      "--write-media",
      workPath,
    ];

    const child = spawn("python", args, { stdio: "ignore" });
    child.on("error", (err) => {
      console.error(`  ${job.label} : echec du lancement de python (${err.message})`);
      resolvePromise(false);
    });
    child.on("exit", (code) => {
      if (code === 0 && existsSync(workPath) && statSync(workPath).size > 0) {
        if (existsSync(job.outPath)) rmSync(job.outPath);
        renameSync(workPath, job.outPath);
        console.log(`  OK ${job.label} (${(statSync(job.outPath).size / 1024).toFixed(1)} ko)`);
        resolvePromise(true);
      } else {
        if (existsSync(workPath)) rmSync(workPath);
        console.error(`  ECHEC ${job.label} (code=${code})`);
        resolvePromise(false);
      }
    });
  });
}

async function runPool(jobs: Job[], concurrency: number): Promise<number> {
  let index = 0;
  let failures = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (index < jobs.length) {
      const job = jobs[index++]!;
      if (!force && existsSync(job.outPath) && statSync(job.outPath).size > 0) {
        console.log(`  - ${job.label} (deja genere)`);
        continue;
      }
      const ok = await generate(job);
      if (!ok) failures += 1;
    }
  });
  await Promise.all(workers);
  return failures;
}

async function main(): Promise<void> {
  const jobs = collectJobs();

  console.log("");
  console.log(`Examens blancs : ${jobs.length} fichiers a traiter`);
  console.log(`  cible   : public/audio/examens/<testId>/<nn>.mp3`);
  console.log(`  mode    : ${checkOnly ? "verification seule" : force ? "regeneration forcee" : "idempotent"}`);
  console.log("");

  if (checkOnly) {
    const missing = jobs.filter((job) => !existsSync(job.outPath) || statSync(job.outPath).size === 0);
    if (missing.length === 0) {
      console.log(`OK : les ${jobs.length} fichiers audio existent.`);
    } else {
      console.error(`MANQUANT(S) : ${missing.length} fichier(s) absent(s) :`);
      for (const job of missing) console.error(`  - ${job.label} -> ${job.outPath}`);
      process.exit(1);
    }
    return;
  }

  if (!existsSync(AUDIO_ROOT)) mkdirSync(AUDIO_ROOT, { recursive: true });
  for (const test of FULL_TESTS) {
    mkdirSync(join(AUDIO_ROOT, fullTestId(test.number)), { recursive: true });
  }

  // 2 workers : pas de surcharge de l'API vocale.
  const failures = await runPool(jobs, 2);
  if (failures > 0) {
    console.error(`\n${failures} fichier(s) en echec. Verifiez : pip install edge-tts`);
    process.exit(1);
  }
  console.log(`\nTermine : ${jobs.length} fichiers audio sont prets.`);
  console.log("Puis : npm run db:seed");
}

function checkPython(): boolean {
  try {
    execSync("python -m edge_tts --help", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

if (!checkOnly && !checkPython()) {
  console.error(
    "\n[audio:examens] `edge-tts` est introuvable.\n" +
      "  Installez-le :  pip install edge-tts\n" +
      "  (voix neurales Microsoft gratuites, aucun compte requis)",
  );
  process.exit(1);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
