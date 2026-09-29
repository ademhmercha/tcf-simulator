import { z } from "zod";

import { EmailSchema, PasswordSchema } from "@/lib/security";

// ---------------------------------------------------------------------------
// Schemas Zod d'authentification. Isoles dans leur propre module afin que les
// Server Actions et les formulaires partagent exactement la meme validation.
// ---------------------------------------------------------------------------

export const LOGIN_SCHEMA = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Mot de passe requis").max(128),
});

export const REGISTER_SCHEMA = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caracteres").max(80),
  email: EmailSchema,
  password: PasswordSchema,
});

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: EmailSchema,
});

export const RESET_PASSWORD_SCHEMA = z.object({
  token: z.string().min(10),
  password: PasswordSchema,
});

export const UPDATE_PROFILE_SCHEMA = z.object({
  name: z.string().trim().min(2).max(80),
  locale: z.enum(["fr"]),
});
