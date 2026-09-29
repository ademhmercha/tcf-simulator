import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation de l'environnement. Volontairement tolérante pour permettre le
// build (Next évalue les modules au build) mais stricte au runtime serveur.
// ---------------------------------------------------------------------------

const serverSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL est requis"),
  DATABASE_PROVIDER: z.enum(["sqlite", "postgresql"]).default("sqlite"),
  AUTH_SECRET: z.string().min(16, "AUTH_SECRET doit faire au moins 16 caracteres"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  TCF_SOURCE_JSON: z.string().default("data/tcf_practice_5_tests_250_questions.json"),
  TCF_SEED_PUBLISH: z
    .string()
    .default("true")
    .transform((v) => v !== "false"),
  SEED_ADMIN_EMAIL: z.string().email().optional(),
  SEED_ADMIN_PASSWORD: z.string().optional(),
  SEED_DEMO_EMAIL: z.string().email().optional(),
  SEED_DEMO_PASSWORD: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;

  const parsed = serverSchema.safeParse({
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PROVIDER: process.env.DATABASE_PROVIDER,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    TCF_SOURCE_JSON: process.env.TCF_SOURCE_JSON,
    TCF_SEED_PUBLISH: process.env.TCF_SEED_PUBLISH,
    SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL || undefined,
    SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || undefined,
    SEED_DEMO_EMAIL: process.env.SEED_DEMO_EMAIL || undefined,
    SEED_DEMO_PASSWORD: process.env.SEED_DEMO_PASSWORD || undefined,
  });

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Configuration d'environnement invalide :\n${issues}\n\n` +
        `Copiez .env.example vers .env et renseignez les valeurs manquantes.`,
    );
  }

  cached = parsed.data;
  return cached;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
