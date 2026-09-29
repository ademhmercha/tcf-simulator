import type { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { examConfig } from "@/config/site";
import {
  ContentFileSchema,
  CsvRowSchema,
  SECTION_KEY_TO_TYPE,
  type CsvRow,
  type ContentFile,
} from "@/lib/content-schema";
import { slugify } from "@/lib/slug";

// ---------------------------------------------------------------------------
// Moteur d'import du contenu.
//
// Point d'entree unique partage par :
//   - `prisma/seed.ts`             (base JSON fournie)
//   - `scripts/import-tests.ts`    (CLI)
//   - l'assistant d'import de l'espace admin (CSV/JSON)
//
// Garanties :
//   - upsert par `code` : rejouer l'import est sans effet de bord
//   - aucune bonne reponse n'est jamais envoyee au client par ce module
// ---------------------------------------------------------------------------

const DEFAULT_SECTION_TITLES: Record<string, string> = {
  STRUCTURE: "Structure de la langue",
  COMPREHENSION_ECRITE: "Comprehension ecrite",
};

const DEFAULT_SECTION_INSTRUCTIONS: Record<string, string> = {
  STRUCTURE:
    "Pour chaque question, choisissez la forme correcte qui complete la phrase. Une seule reponse est correcte.",
  COMPREHENSION_ECRITE:
    "Lisez le document puis repondez aux questions qui s'y rapportent. Une seule reponse est correcte par question.",
};

export interface ImportStats {
  testsCreated: number;
  testsUpdated: number;
  sectionsCreated: number;
  sectionsUpdated: number;
  documentsCreated: number;
  documentsUpdated: number;
  questionsCreated: number;
  questionsUpdated: number;
  optionsWritten: number;
  durationMinutes: number;
}

function emptyStats(): ImportStats {
  return {
    testsCreated: 0,
    testsUpdated: 0,
    sectionsCreated: 0,
    sectionsUpdated: 0,
    documentsCreated: 0,
    documentsUpdated: 0,
    questionsCreated: 0,
    questionsUpdated: 0,
    optionsWritten: 0,
    durationMinutes: 0,
  };
}

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

/**
 * Ecrit les propositions sans jamais changer leur identifiant.
 *
 * Contrainte critique : `Answer.selectedOptionId` pointe vers `Option.id` avec
 * `onDelete: SetNull`. Supprimer puis recreer les options viderait donc toutes
 * les reponses deja enregistrees par les candidats. On upsert donc sur
 * `(questionId, label)`, et l'on ne supprime que les propositions eventuellement
 * surnumeraires (au-dela de A..D).
 */
async function syncOptions(
  db: PrismaClient,
  questionId: string,
  options: Record<(typeof OPTION_LABELS)[number], string>,
  correctLabel: string,
): Promise<void> {
  const existing = await db.option.findMany({
    where: { questionId },
    select: { id: true, label: true },
  });

  const keep = new Set<string>();
  for (const label of OPTION_LABELS) {
    const current = existing.find((o) => o.label === label);
    if (current) {
      keep.add(current.id);
      await db.option.update({
        where: { id: current.id },
        data: { text: options[label], isCorrect: label === correctLabel },
      });
    } else {
      const created = await db.option.create({
        data: { questionId, label, text: options[label], isCorrect: label === correctLabel },
        select: { id: true },
      });
      keep.add(created.id);
    }
  }

  const obsolete = existing.filter((o) => !keep.has(o.id)).map((o) => o.id);
  if (obsolete.length > 0) {
    await db.option.deleteMany({ where: { id: { in: obsolete } } });
  }
}

export interface ImportOptions {
  /** Publier les tests a la fin de l'import. */
  publish?: boolean;
  /** Ordre de publication (commence a 1). */
  startOrder?: number;
  /** Duree forcee pour la section STRUCTURE. */
  structureDuration?: number;
  /** Duree forcee pour la section COMPREHENSION_ECRITE. */
  comprehensionDuration?: number;
  /** Journal detaille. */
  log?: (message: string) => void;
}

// ===========================================================================
// Import du fichier JSON
// ===========================================================================

export function parseContentJson(raw: string): ContentFile {
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(`JSON invalide : ${(error as Error).message}`);
  }
  const parsed = ContentFileSchema.safeParse(json);
  if (!parsed.success) {
    const details = parsed.error.issues
      .slice(0, 12)
      .map((i) => `  - ${i.path.join(".") || "(racine)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Structure du fichier de contenu invalide :\n${details}`);
  }
  return parsed.data;
}

export async function importContentFile(
  db: PrismaClient,
  content: ContentFile,
  options: ImportOptions = {},
): Promise<ImportStats> {
  const log = options.log ?? (() => {});
  const stats = emptyStats();
  const startOrder = options.startOrder ?? 1;

  const structureDuration = options.structureDuration ?? examConfig.defaultDurationMinutes.STRUCTURE;
  const comprehensionDuration =
    options.comprehensionDuration ?? examConfig.defaultDurationMinutes.COMPREHENSION_ECRITE;

  for (const [testIndex, test] of content.tests.entries()) {
    const order = startOrder + testIndex;
    const slug = slugify(test.title) || test.id;

    const existingTest = await db.test.findFirst({
      where: { OR: [{ code: test.id }, { slug }] },
      select: { id: true },
    });

    const testData = {
      code: test.id,
      title: test.title,
      slug: existingTest?.id ? slug : slug,
      description: test.description || null,
      order,
      isPublished: options.publish ?? false,
      durationMinutes: structureDuration + comprehensionDuration,
    };

    const savedTest = existingTest
      ? await db.test.update({
          where: { id: existingTest.id },
          data: testData,
        })
      : await db.test.create({ data: testData });

    if (existingTest) stats.testsUpdated += 1;
    else stats.testsCreated += 1;
    log(`  Test ${savedTest.order}. ${savedTest.title} (${existingTest ? "mis a jour" : "cree"})`);

    // ---------------------------- Sections -----------------------------
    // Union discriminee sur `type` : la `questions` associee est ainsi
    // automatiquement reduite (StructureQuestion[] ou ComprehensionQuestion[]).
    const sectionInputs = [
      {
        type: "STRUCTURE" as const,
        duration: structureDuration,
        order: 1,
        questions: test.sections.structure_de_la_langue.questions,
      },
      {
        type: "COMPREHENSION_ECRITE" as const,
        duration: comprehensionDuration,
        order: 2,
        questions: test.sections.comprehension_ecrite.questions,
      },
    ];

    for (const sectionInput of sectionInputs) {
      const count = sectionInput.questions.length;

      const existingSection = await db.section.findFirst({
        where: { testId: savedTest.id, type: sectionInput.type },
        select: { id: true },
      });

      const sectionData = {
        testId: savedTest.id,
        type: sectionInput.type,
        title: DEFAULT_SECTION_TITLES[sectionInput.type] ?? sectionInput.type,
        instructions: DEFAULT_SECTION_INSTRUCTIONS[sectionInput.type] ?? null,
        durationMinutes: sectionInput.duration,
        questionCount: count,
        order: sectionInput.order,
      };

      const section = existingSection
        ? await db.section.update({ where: { id: existingSection.id }, data: sectionData })
        : await db.section.create({ data: sectionData });

      if (existingSection) stats.sectionsUpdated += 1;
      else stats.sectionsCreated += 1;

      stats.durationMinutes += section.durationMinutes;

      // --------------------------- Documents ---------------------------
      if (sectionInput.type === "COMPREHENSION_ECRITE") {
        const docMap = new Map<string, { title: string; content: string }>();
        const docOrder = new Map<string, number>();
        for (const question of sectionInput.questions) {
          const key = question.documentId;
          if (!docMap.has(key)) {
            docMap.set(key, { title: question.documentTitle, content: question.document });
            docOrder.set(key, docOrder.size + 1);
          }
        }

        for (const [code, doc] of docMap) {
          const existingDoc = await db.document.findUnique({
            where: { sectionId_code: { sectionId: section.id, code } },
            select: { id: true },
          });
          const docData = {
            sectionId: section.id,
            code,
            title: doc.title,
            content: doc.content,
            order: docOrder.get(code) ?? 0,
          };
          if (existingDoc) {
            await db.document.update({ where: { id: existingDoc.id }, data: docData });
            stats.documentsUpdated += 1;
          } else {
            await db.document.create({ data: docData });
            stats.documentsCreated += 1;
          }
        }
        log(`     ${docMap.size} documents`);
      }

      // --------------------------- Questions ---------------------------
      // Resolution document -> question en amont : evite d'avoir a reduire
      // l'union de types a l'interieur de la boucle partagee.
      const documentIdByQuestion = new Map<string, string | null>();
      if (sectionInput.type === "COMPREHENSION_ECRITE") {
        for (const question of sectionInput.questions) {
          const doc = await db.document.findUnique({
            where: { sectionId_code: { sectionId: section.id, code: question.documentId } },
            select: { id: true },
          });
          documentIdByQuestion.set(question.id, doc?.id ?? null);
        }
      }

      for (const [qIndex, question] of sectionInput.questions.entries()) {
        const number = qIndex + 1;
        const documentId = documentIdByQuestion.get(question.id) ?? null;

        const existingQuestion = question.id
          ? await db.question.findUnique({
              where: { sectionId_code: { sectionId: section.id, code: question.id } },
              select: { id: true },
            })
          : null;

        const questionData = {
          sectionId: section.id,
          documentId,
          code: question.id,
          number,
          prompt: question.question,
          level: question.level,
          category: question.category || null,
          points: 1,
          explanation: question.explanation,
        };

        const savedQuestion = existingQuestion
          ? await db.question.update({ where: { id: existingQuestion.id }, data: questionData })
          : await db.question.create({ data: questionData });

        if (existingQuestion) stats.questionsUpdated += 1;
        else stats.questionsCreated += 1;

        // Options : identifiants preserves (voir `syncOptions`).
        await syncOptions(
          db,
          savedQuestion.id,
          {
            A: question.options.A,
            B: question.options.B,
            C: question.options.C,
            D: question.options.D,
          },
          question.correctAnswer,
        );
        stats.optionsWritten += OPTION_LABELS.length;
      }
      log(`     ${sectionInput.type}: ${count} questions`);
    }
  }

  return stats;
}

// ===========================================================================
// Import CSV (espace admin + script CLI)
// ===========================================================================

export async function importCsvRows(
  db: PrismaClient,
  rawRows: Array<Record<string, unknown>>,
  options: ImportOptions = {},
): Promise<ImportStats> {
  const log = options.log ?? (() => {});

  // Normalisation + validation (meme chemin que l'apercu de l'admin).
  const { analyzeRows } = await import("@/lib/content-schema");
  const { valid, preview } = analyzeRows(rawRows);

  if (valid.length === 0) {
    const detail = preview.issues
      .slice(0, 8)
      .map((i) => `  - ligne ${i.row} (${i.field}) : ${i.message}`)
      .join("\n");
    throw new Error(`Aucune ligne exploitable.\n${detail}`);
  }

  const { stats } = await importCsvRowsIntoContent(db, valid, options);
  log(`  ${valid.length} lignes importees, ${preview.errorRows} ligne(s) en erreur ignoree(s).`);
  return stats;
}

async function importCsvRowsIntoContent(
  db: PrismaClient,
  rows: CsvRow[],
  options: ImportOptions,
): Promise<{ stats: ImportStats; content: ContentFile }> {
  const log = options.log ?? (() => {});
  const stats = emptyStats();
  const startOrder = options.startOrder ?? 1;

  // Regroupement : test_code -> section_type -> questions
  const testCodes = [...new Set(rows.map((r) => r.test_code))];

  for (const [testIndex, testCode] of testCodes.entries()) {
    const testRows = rows.filter((r) => r.test_code === testCode);
    const first = testRows[0];
    if (!first) continue;

    const title = first.test_title;
    const slug = slugify(title) || testCode;

    const existingTest = await db.test.findFirst({
      where: { OR: [{ code: testCode }, { slug }] },
      select: { id: true },
    });

    const durations = [
      ...new Set(testRows.map((r) => r.duration_minutes).filter(Boolean)),
    ] as number[];
    const testData = {
      code: testCode,
      title,
      slug,
      description: first.test_description || null,
      order: startOrder + testIndex,
      isPublished: options.publish ?? false,
      durationMinutes:
        durations.reduce<number>((sum, d) => sum + (d ?? 0), 0) || undefined,
    };

    const savedTest = existingTest
      ? await db.test.update({ where: { id: existingTest.id }, data: testData })
      : await db.test.create({ data: testData });
    if (existingTest) stats.testsUpdated += 1;
    else stats.testsCreated += 1;
    log(`  Test ${savedTest.order}. ${savedTest.title} (${existingTest ? "mis a jour" : "cree"})`);

    const sectionTypes = ["STRUCTURE", "COMPREHENSION_ECRITE"] as const;
    for (const [sectionIndex, sectionType] of sectionTypes.entries()) {
      const sectionRows = testRows.filter((r) => r.section_type === sectionType);
      if (sectionRows.length === 0) continue;

      const explicitTitle = sectionRows.find((r) => r.section_title)?.section_title;
      const duration =
        sectionRows.find((r) => r.duration_minutes)?.duration_minutes ??
        (sectionType === "STRUCTURE"
          ? examConfig.defaultDurationMinutes.STRUCTURE
          : examConfig.defaultDurationMinutes.COMPREHENSION_ECRITE);

      const existingSection = await db.section.findFirst({
        where: { testId: savedTest.id, type: sectionType },
        select: { id: true },
      });

      const sectionData = {
        testId: savedTest.id,
        type: sectionType,
        title:
          explicitTitle || DEFAULT_SECTION_TITLES[sectionType] || sectionType,
        instructions: DEFAULT_SECTION_INSTRUCTIONS[sectionType] ?? null,
        durationMinutes: duration,
        questionCount: sectionRows.length,
        order: sectionIndex + 1,
      };

      const section = existingSection
        ? await db.section.update({ where: { id: existingSection.id }, data: sectionData })
        : await db.section.create({ data: sectionData });
      if (existingSection) stats.sectionsUpdated += 1;
      else stats.sectionsCreated += 1;
      stats.durationMinutes += duration;

      // Documents
      const documentIds = new Set<string>();
      if (sectionType === "COMPREHENSION_ECRITE") {
        for (const row of sectionRows) {
          if (!row.document_code) continue;
          if (documentIds.has(row.document_code)) continue;
          documentIds.add(row.document_code);

          const existingDoc = await db.document.findUnique({
            where: { sectionId_code: { sectionId: section.id, code: row.document_code } },
            select: { id: true },
          });
          const docData = {
            sectionId: section.id,
            code: row.document_code,
            title: row.document_title || row.document_code,
            content: row.document_content || "",
            order: documentIds.size,
          };
          if (existingDoc) {
            await db.document.update({ where: { id: existingDoc.id }, data: docData });
            stats.documentsUpdated += 1;
          } else {
            await db.document.create({ data: docData });
            stats.documentsCreated += 1;
          }
        }
      }

      // Questions
      const ordered = [...sectionRows].sort((a, b) => a.question_number - b.question_number);
      for (const [qIndex, row] of ordered.entries()) {
        const documentId = row.document_code
          ? (
              await db.document.findUnique({
                where: { sectionId_code: { sectionId: section.id, code: row.document_code } },
                select: { id: true },
              })
            )?.id ?? null
          : null;

        const code = row.question_code || `${testCode}-${sectionType}-${row.question_number}`;
        const existingQuestion = await db.question.findUnique({
          where: { sectionId_code: { sectionId: section.id, code } },
          select: { id: true },
        });

        const questionData = {
          sectionId: section.id,
          documentId,
          code,
          number: qIndex + 1,
          prompt: row.prompt,
          level: row.level,
          category: row.category || null,
          points: row.points ?? 1,
          explanation: row.explanation,
        };

        const savedQuestion = existingQuestion
          ? await db.question.update({ where: { id: existingQuestion.id }, data: questionData })
          : await db.question.create({ data: questionData });
        if (existingQuestion) stats.questionsUpdated += 1;
        else stats.questionsCreated += 1;

        await syncOptions(
          db,
          savedQuestion.id,
          {
            A: row.option_a,
            B: row.option_b,
            C: row.option_c,
            D: row.option_d,
          },
          row.correct_answer,
        );
        stats.optionsWritten += OPTION_LABELS.length;
      }
      log(`     ${sectionType}: ${sectionRows.length} questions, ${documentIds.size} documents`);
    }
  }

  return { stats, content: { tests: [] } };
}
// ------------------------------- Utilitaires ------------------------------

export const CsvRowParse = CsvRowSchema;
export const SECTION_TYPE_BY_KEY = SECTION_KEY_TO_TYPE;
export type { CsvRow };
