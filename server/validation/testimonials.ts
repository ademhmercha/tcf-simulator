import { z } from "zod";

import { LEVELS } from "@/config/enums";

// ---------------------------------------------------------------------------
// Validation du formulaire d'avis. Champs courts et bornes strictes : le texte
// est affiche publiquement apres moderation.
// ---------------------------------------------------------------------------

const clean = (value: string): string => value.replace(/\s+/g, " ").trim();

export const TESTIMONIAL_COMMENT_MIN = 20;
export const TESTIMONIAL_COMMENT_MAX = 400;

export const SUBMIT_TESTIMONIAL_SCHEMA = z.object({
  displayName: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Indique un prénom.").max(40, "40 caractères maximum.")),
  city: z
    .string()
    .transform(clean)
    .pipe(z.string().max(40, "40 caractères maximum."))
    .optional()
    .transform((value) => (value ? value : undefined)),
  level: z
    .string()
    .optional()
    .transform((value) => (value && (LEVELS as readonly string[]).includes(value) ? value : undefined)),
  rating: z.coerce
    .number({ invalid_type_error: "Choisis une note." })
    .int()
    .min(1, "Choisis une note.")
    .max(5, "Choisis une note."),
  comment: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .min(TESTIMONIAL_COMMENT_MIN, `Écris au moins ${TESTIMONIAL_COMMENT_MIN} caractères.`)
        .max(TESTIMONIAL_COMMENT_MAX, `${TESTIMONIAL_COMMENT_MAX} caractères maximum.`),
    ),
  consent: z.literal("on", {
    errorMap: () => ({ message: "Ton accord est nécessaire pour publier ton avis." }),
  }),
});

export type SubmitTestimonialInput = z.infer<typeof SUBMIT_TESTIMONIAL_SCHEMA>;
