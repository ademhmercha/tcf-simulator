import { z } from "zod";

import { WRITING_LEVELS, WRITING_TASKS, WRITING_THEMES } from "@/config/enums";
import { WRITING_CHECKLIST_IDS } from "@/data/writing";

// ---------------------------------------------------------------------------
// Schemas Zod du module « Expression écrite ».
// ---------------------------------------------------------------------------

/** Filtres de la liste des sujets (query string). */
export const WRITING_FILTERS_SCHEMA = z.object({
  task: z.coerce
    .number()
    .int()
    .refine(
      (value): value is (typeof WRITING_TASKS)[number] =>
        (WRITING_TASKS as readonly number[]).includes(value),
      "Tache invalide",
    )
    .optional(),
  level: z.enum(WRITING_LEVELS).optional(),
  theme: z.enum(WRITING_THEMES).optional(),
});

/** Checklist d'auto-evaluation : uniquement les identifiants connus. */
export const WRITING_CHECKLIST_SCHEMA = z
  .object(
    Object.fromEntries(WRITING_CHECKLIST_IDS.map((id) => [id, z.boolean().optional()])) as Record<
      string,
      z.ZodOptional<z.ZodBoolean>
    >,
  )
  .partial();

/**
 * Enregistrement d'une tentative.
 *
 * Le score d'auto-evaluation n'est pas recu du client : il est recalcule cote
 * serveur a partir de la checklist (indicateur d'entrainement, pas une note).
 */
export const RECORD_WRITING_ATTEMPT_SCHEMA = z.object({
  slug: z.string().trim().min(1).max(120),
  durationSeconds: z.coerce.number().int().min(0).max(60 * 60 * 8),
  wordCount: z.coerce.number().int().min(0).max(5000),
  checklist: z.record(z.boolean()).default({}),
  notes: z.string().trim().max(2000).optional(),
});
