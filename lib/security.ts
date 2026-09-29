import bcrypt from "bcryptjs";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Hachage de mots de passe, comparaison a temps constant et rate limiting.
//
// Ce module est volontairement depourvu du marqueur `server-only` afin de
// pouvoir etre reutilise par les scripts Node (seed, CLI) en plus du runtime
// Next.js. Il ne contient aucune constante secrete : les cles et hashes
// restent dans la base. La protection effective est assuree par :
//   - `import "server-only"` dans server/auth.ts
//   - la directive "use server" de chaque Server Action
//   - le fait qu'aucun composant client n'importe ce module
// ---------------------------------------------------------------------------

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string | null): Promise<boolean> {
  if (!hash) return false;
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

/**
 * Comparaison a temps constant. Utilisee pour verifier un jeton opaque
 * (CSRF, jetons de session) afin d'eviter les timing attacks.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

// ------------------------------ Mots de passe -----------------------------

export const PasswordSchema = z
  .string()
  .min(10, "Le mot de passe doit contenir au moins 10 caracteres")
  .max(128, "Mot de passe trop long")
  .regex(/[a-z]/, "Il doit contenir au moins une minuscule")
  .regex(/[A-Z]/, "Il doit contenir au moins une majuscule")
  .regex(/[0-9]/, "Il doit contenir au moins un chiffre");

export const EmailSchema = z
  .string()
  .min(3)
  .max(254)
  .email("Adresse e-mail invalide")
  .transform((v) => v.trim().toLowerCase());

export const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caracteres").max(80),
  email: EmailSchema,
  password: PasswordSchema,
});

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, "Mot de passe requis").max(128),
});

// -------------------------- Protection anti-bruit -----------------------

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  /** Secondes avant re-essai. */
  retryAfterSec: number;
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

/** Nettoyage periodique des buckets expires (evite une fuite memoire). */
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Rate limiting en memoire, par fenetre glissante fixe.
 * Suffisant pour un deploiement mono-instance (Vercel Functions etant
 * ephemeres). Pour un deploiement multi-instances, remplacer par un backend
 * partage (Upstash Redis) - voir README section "Securite".
 */
export function rateLimit(
  key: string,
  options: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, remaining: options.limit - 1, retryAfterSec: 0 };
  }

  bucket.count += 1;
  const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));

  if (bucket.count > options.limit) {
    return { ok: false, remaining: 0, retryAfterSec };
  }
  return { ok: true, remaining: options.limit - bucket.count, retryAfterSec };
}

export const AUTH_RATE_LIMITS = {
  login: { limit: 8, windowMs: 5 * 60_000 },
  register: { limit: 5, windowMs: 15 * 60_000 },
  forgotPassword: { limit: 3, windowMs: 15 * 60_000 },
} as const;

/** Reponse uniforme pour eviter d'encoder si un e-mail existe. */
export const GENERIC_AUTH_MESSAGE =
  "Si un compte correspond a cette adresse, vous recevrez un lien de reinitialisation.";
