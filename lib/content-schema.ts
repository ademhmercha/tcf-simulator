import { z } from "zod";
import { LEVELS, OPTION_LABELS, SECTION_TYPES, TEST_KINDS } from "@/config/enums";

// ---------------------------------------------------------------------------
// Modele des fichiers de contenu JSON :
//   - `data/tcf_practice_5_tests_250_questions.json` (series d'entrainement)
//   - `data/tcf_full_tests_10x70.json`              (examens blancs)
// et schemas d'import CSV. Utilises par le seed, le script d'import et
// l'assistant d'import de l'espace admin.
// ---------------------------------------------------------------------------

export const OptionsSchema = z.object({
  A: z.string().min(1),
  B: z.string().min(1),
  C: z.string().min(1),
  D: z.string().min(1),
});

export const StructureQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1, "Question vide"),
  options: OptionsSchema,
  correctAnswer: z.enum(OPTION_LABELS),
  explanation: z.string().min(1, "Explication manquante"),
  level: z.enum(LEVELS),
  category: z.string().optional().default(""),
});

export const ComprehensionQuestionSchema = StructureQuestionSchema.extend({
  documentId: z.string().min(1),
  documentTitle: z.string().min(1),
  document: z.string().min(1, "Document vide"),
});

/**
 * Question de comprehension orale : l'audio est la seule source de l'enonce.
 * La transcription est stockee en base pour les corriges, jamais envoyee
 * pendant l'epreuve.
 */
export const ComprehensionOraleQuestionSchema = StructureQuestionSchema.extend({
  audioUrl: z
    .string()
    .min(1, "Audio manquant")
    .regex(/^\/audio\/.+\.mp3$/, "audioUrl doit pointer vers un .mp3 de /audio"),
  transcription: z.string().min(1, "Transcription manquante"),
});

/** Duree propre a une epreuve (heures/minutes de l'examen blanc). */
const SectionDurationSchema = z.number().int().min(1).max(300).optional();

export const StructureSectionSchema = z.object({
  questionCount: z.number().int().nonnegative(),
  durationMinutes: SectionDurationSchema,
  questions: z.array(StructureQuestionSchema).min(1),
});

export const ComprehensionSectionSchema = z.object({
  questionCount: z.number().int().nonnegative(),
  durationMinutes: SectionDurationSchema,
  questions: z.array(ComprehensionQuestionSchema).min(1),
});

export const ComprehensionOraleSectionSchema = z.object({
  questionCount: z.number().int().nonnegative(),
  durationMinutes: SectionDurationSchema,
  questions: z.array(ComprehensionOraleQuestionSchema).min(1),
});

/** Verifie que le nombre annonce correspond au contenu et que les codes sont uniques. */
function checkSection(
  section: { questionCount: number; questions: Array<{ id: string }> },
  path: (string | number)[],
  ctx: z.RefinementCtx,
): void {
  if (section.questionCount !== section.questions.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: [...path, "questionCount"],
      message: `questionCount (${section.questionCount}) ne correspond pas au nombre de questions (${section.questions.length}).`,
    });
  }

  const seen = new Set<string>();
  for (const [index, question] of section.questions.entries()) {
    if (seen.has(question.id)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [...path, "questions", index, "id"],
        message: `Code de question en double : ${question.id}.`,
      });
    }
    seen.add(question.id);
  }
}

export const TestContentSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().min(1),
    description: z.string().optional().default(""),
    kind: z.enum(TEST_KINDS).default("PRACTICE"),
    sections: z.object({
      comprehension_orale: ComprehensionOraleSectionSchema.optional(),
      structure_de_la_langue: StructureSectionSchema,
      comprehension_ecrite: ComprehensionSectionSchema,
    }),
  })
  .superRefine((test, ctx) => {
    checkSection(test.sections.structure_de_la_langue, ["sections", "structure_de_la_langue"], ctx);
    checkSection(test.sections.comprehension_ecrite, ["sections", "comprehension_ecrite"], ctx);

    if (test.sections.comprehension_orale) {
      checkSection(test.sections.comprehension_orale, ["sections", "comprehension_orale"], ctx);
    }

    if (test.kind === "FULL" && !test.sections.comprehension_orale) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sections", "comprehension_orale"],
        message: "Un examen blanc (FULL) doit comporter une comprehension orale.",
      });
    }

    if (test.kind === "PRACTICE" && test.sections.comprehension_orale) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["sections", "comprehension_orale"],
        message:
          "Une serie d'entrainement (PRACTICE) ne comporte pas de comprehension orale : utilisez kind=FULL.",
      });
    }
  });

export const ContentFileSchema = z.object({
  metadata: z
    .object({
      name: z.string().optional(),
      version: z.string().optional(),
      language: z.string().optional(),
      disclaimer: z.string().optional(),
      reference: z.string().optional(),
    })
    .passthrough()
    .optional(),
  tests: z.array(TestContentSchema).min(1),
});

export type ContentFile = z.infer<typeof ContentFileSchema>;
export type ContentTest = z.infer<typeof TestContentSchema>;
export type ContentQuestion = z.infer<typeof ComprehensionQuestionSchema>;
export type ContentStructureQuestion = z.infer<typeof StructureQuestionSchema>;
export type ContentListeningQuestion = z.infer<typeof ComprehensionOraleQuestionSchema>;

export const SECTION_KEY_TO_TYPE = {
  comprehension_orale: "COMPREHENSION_ORALE",
  structure_de_la_langue: "STRUCTURE",
  comprehension_ecrite: "COMPREHENSION_ECRITE",
} as const satisfies Record<string, (typeof SECTION_TYPES)[number]>;

// --------------------------- Import CSV / JSON ----------------------------

/**
 * Format CSV (une ligne par question). Colonnes :
 *
 *   test_code,test_title,test_description,test_kind,section_type,section_title,
 *   duration_minutes,question_number,question_code,level,category,
 *   document_code,document_title,document_content,audio_url,transcription,
 *   prompt,option_a,option_b,option_c,option_d,correct_answer,explanation,points
 *
 * `test_kind` vaut PRACTICE (defaut) ou FULL. Une ligne COMPREHENSION_ORALE
 * exige `audio_url` et une transcription ; le document reste reserve a la
 * comprehension ecrite.
 */
export const CSV_COLUMNS = [
  "test_code",
  "test_title",
  "test_description",
  "test_kind",
  "section_type",
  "section_title",
  "duration_minutes",
  "question_number",
  "question_code",
  "level",
  "category",
  "document_code",
  "document_title",
  "document_content",
  "audio_url",
  "transcription",
  "prompt",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "correct_answer",
  "explanation",
  "points",
] as const;

export type CsvColumn = (typeof CSV_COLUMNS)[number];

export const CsvRowSchema = z.object({
  test_code: z.string().min(1, "test_code est requis"),
  test_title: z.string().min(1, "test_title est requis"),
  test_description: z.string().optional().default(""),
  test_kind: z.enum(TEST_KINDS).optional().default("PRACTICE"),
  section_type: z.enum(SECTION_TYPES),
  section_title: z.string().optional().default(""),
  duration_minutes: z.coerce.number().int().min(1).max(300).optional(),
  question_number: z.coerce.number().int().min(1),
  question_code: z.string().optional().default(""),
  level: z.enum(LEVELS),
  category: z.string().optional().default(""),
  document_code: z.string().optional().default(""),
  document_title: z.string().optional().default(""),
  document_content: z.string().optional().default(""),
  audio_url: z.string().optional().default(""),
  transcription: z.string().optional().default(""),
  prompt: z.string().min(1, "prompt est requis"),
  option_a: z.string().min(1, "option_a est requis"),
  option_b: z.string().min(1, "option_b est requis"),
  option_c: z.string().min(1, "option_c est requis"),
  option_d: z.string().min(1, "option_d est requis"),
  correct_answer: z.enum(OPTION_LABELS, {
    errorMap: () => ({ message: "correct_answer doit valoir A, B, C ou D" }),
  }),
  explanation: z.string().min(1, "explanation est requise"),
  points: z.coerce.number().int().min(1).max(10).optional(),
});

export type CsvRow = z.infer<typeof CsvRowSchema>;

// ------------------------------ Analyse CSV ------------------------------

export interface ImportIssue {
  row: number;
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface ImportPreview {
  totalRows: number;
  validRows: number;
  errorRows: number;
  tests: Array<{
    testCode: string;
    title: string;
    sections: Array<{ type: string; questionCount: number; documentCount: number }>;
  }>;
  issues: ImportIssue[];
}

/** Analyse une ligne CSV deja parsee en objet (clés = colonnes). */
export function analyzeRows(rows: Array<Record<string, unknown>>): {
  valid: CsvRow[];
  preview: ImportPreview;
} {
  const valid: CsvRow[] = [];
  const issues: ImportIssue[] = [];

  rows.forEach((raw, index) => {
    const rowNumber = index + 2; // +1 entete, +1 base 1
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      normalized[key.trim().toLowerCase()] =
        value === null || value === undefined ? "" : String(value).trim();
    }

    // Document obligatoire pour la comprehension ecrite
    if (
      normalized.section_type === "COMPREHENSION_ECRITE" &&
      (!normalized.document_code || !normalized.document_content)
    ) {
      issues.push({
        row: rowNumber,
        field: "document_code",
        message:
          "Une question de COMPREHENSION_ECRITE exige document_code et document_content.",
        severity: "error",
      });
    }

    // Audio obligatoire pour la comprehension orale
    if (
      normalized.section_type === "COMPREHENSION_ORALE" &&
      (!normalized.audio_url || !normalized.transcription)
    ) {
      issues.push({
        row: rowNumber,
        field: "audio_url",
        message:
          "Une question de COMPREHENSION_ORALE exige audio_url et transcription.",
        severity: "error",
      });
    }

    const parsed = CsvRowSchema.safeParse(normalized);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        issues.push({
          row: rowNumber,
          field: issue.path.join(".") || "(ligne)",
          message: issue.message,
          severity: "error",
        });
      }
      return;
    }

    if (
      parsed.data.section_type !== "COMPREHENSION_ECRITE" &&
      parsed.data.document_code
    ) {
      issues.push({
        row: rowNumber,
        field: "document_code",
        message: `Ignore : document_code renseigne sur une section ${parsed.data.section_type}.`,
        severity: "warning",
      });
    }

    if (
      parsed.data.section_type !== "COMPREHENSION_ORALE" &&
      (parsed.data.audio_url || parsed.data.transcription)
    ) {
      issues.push({
        row: rowNumber,
        field: "audio_url",
        message: `Ignore : audio_url/transcription renseignes sur une section ${parsed.data.section_type}.`,
        severity: "warning",
      });
    }

    valid.push(parsed.data);
  });

  const testMap = new Map<
    string,
    {
      testCode: string;
      title: string;
      kind: string;
      sections: Map<string, { q: Set<number>; d: Set<string> }>;
    }
  >();

  for (const row of valid) {
    if (!testMap.has(row.test_code)) {
      testMap.set(row.test_code, {
        testCode: row.test_code,
        title: row.test_title,
        kind: row.test_kind,
        sections: new Map(),
      });
    }
    const entry = testMap.get(row.test_code)!;
    if (!entry.sections.has(row.section_type)) {
      entry.sections.set(row.section_type, { q: new Set(), d: new Set() });
    }
    const sec = entry.sections.get(row.section_type)!;
    sec.q.add(row.question_number);
    if (row.document_code) sec.d.add(row.document_code);
  }

  const preview: ImportPreview = {
    totalRows: rows.length,
    validRows: valid.length,
    errorRows: rows.length - valid.length,
    tests: [...testMap.values()].map((t) => ({
      testCode: t.testCode,
      title: t.title,
      sections: [...t.sections.entries()].map(([type, s]) => ({
        type,
        questionCount: s.q.size,
        documentCount: s.d.size,
      })),
    })),
    issues,
  };

  return { valid, preview };
}
