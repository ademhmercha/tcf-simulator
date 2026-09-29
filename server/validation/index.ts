import "server-only";

import { z } from "zod";

// ---------------------------------------------------------------------------
// Schemas Zod des Server Actions.
// Une seule source de verite partagee par :
//   - les Server Actions (validation serveur, fait autoritaire)
//   - les formulaires clients (retours d'erreur champ par champ)
//   - les Server Components (validation des params d'URL)
// ---------------------------------------------------------------------------

// ------------------------------ Examens ----------------------------------

/** Reponse a une question (sauvegarde automatique). */
export const SAVE_ANSWER_SCHEMA = z.object({
  sectionRunId: z.string().min(1),
  questionId: z.string().min(1),
  selectedOptionId: z.string().min(1).nullable(),
  flagged: z.boolean(),
  timeSpentSec: z.number().int().min(0).max(7200).optional(),
});

export const SUBMIT_SECTION_SCHEMA = z.object({
  sectionRunId: z.string().min(1),
});

export const START_ATTEMPT_SCHEMA = z.object({
  testId: z.string().min(1),
});

/** Nouvelle tentative ciblee sur les erreurs d'une tentative precedente. */
export const RETRY_MISTAKES_SCHEMA = z.object({
  attemptId: z.string().min(1),
});

// ------------------------------ Admin ------------------------------------

export const ADMIN_TEST_SCHEMA = z.object({
  title: z.string().trim().min(3, "Titre trop court").max(120),
  description: z.string().trim().max(2000).optional().default(""),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, "Le slug ne peut contenir que des minuscules, chiffres et tirets")
    .max(80)
    .optional(),
  order: z.coerce.number().int().min(0).max(999).default(1),
  isPublished: z.boolean().default(false),
});

export const ADMIN_SECTION_SCHEMA = z.object({
  sectionId: z.string().min(1),
  title: z.string().trim().min(3).max(120),
  instructions: z.string().trim().max(4000).optional().default(""),
  durationMinutes: z.coerce.number().int().min(1).max(300),
});

export const ADMIN_OPTION_SCHEMA = z.object({
  label: z.enum(["A", "B", "C", "D"]),
  text: z.string().trim().min(1, "Le texte de la proposition est requis").max(600),
  isCorrect: z.boolean().default(false),
});

export const ADMIN_QUESTION_SCHEMA = z.object({
  sectionId: z.string().min(1),
  questionId: z.string().min(1).optional(),
  documentId: z.string().min(1).nullable().optional(),
  number: z.coerce.number().int().min(1).max(9999),
  prompt: z.string().trim().min(1, "L'enonce est requis").max(2000),
  level: z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]),
  category: z.string().trim().max(120).optional().default(""),
  points: z.coerce.number().int().min(1).max(10).default(1),
  explanation: z.string().trim().min(1, "L'explication est requise").max(4000),
  options: z
    .array(ADMIN_OPTION_SCHEMA)
    .length(4, "Quatre propositions sont requises")
    .refine((opts) => opts.filter((o) => o.isCorrect).length === 1, {
      message: "Exactement une proposition doit etre correcte",
    }),
});

export const ADMIN_DOCUMENT_SCHEMA = z.object({
  sectionId: z.string().min(1),
  documentId: z.string().min(1).optional(),
  code: z
    .string()
    .trim()
    .min(1)
    .max(60)
    .regex(/^[A-Za-z0-9_-]+$/, "Le code ne peut contenir que des lettres, chiffres, - et _"),
  title: z.string().trim().min(1).max(200),
  content: z.string().trim().min(1, "Le contenu du document est requis").max(20000),
});

export const ADMIN_USER_ROLE_SCHEMA = z.object({
  userId: z.string().min(1),
  role: z.enum(["USER", "ADMIN"]),
});

// --------------------------- Utilitaires ---------------------------------

export type ActionState =
  | { status: "idle" }
  | { status: "success"; message?: string; data?: Record<string, unknown> }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const INITIAL_ACTION_STATE: ActionState = { status: "idle" };

/** Transforme une erreur Zod en message unique lisible. */
export function zodMessage(error: z.ZodError): string {
  const first = error.issues[0];
  if (!first) return "Donnees invalides";
  const path = first.path.join(".");
  return path ? `${path}: ${first.message}` : first.message;
}

export function zodFieldErrors(error: z.ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    (out[key] ??= []).push(issue.message);
  }
  return out;
}
