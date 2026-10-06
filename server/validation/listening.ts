import { z } from "zod";

// ---------------------------------------------------------------------------
// Schemas Zod de la comprehension orale.
// ---------------------------------------------------------------------------

export const CoLetterSchema = z.enum(["A", "B", "C", "D"]);

/** Soumission d'une serie : toutes les reponses de la passation. */
export const SUBMIT_LISTENING_SCHEMA = z.object({
  seriesSlug: z.string().trim().min(1).max(120),
  answers: z
    .array(
      z.object({
        questionId: z.string().min(1).max(64),
        selectedLetter: CoLetterSchema.nullable(),
      }),
    )
    .min(1, "Aucune reponse a corriger"),
});