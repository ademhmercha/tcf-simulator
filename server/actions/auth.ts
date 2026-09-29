"use server";

import { AuthError } from "next-auth";

import {
  AUTH_RATE_LIMITS,
  GENERIC_AUTH_MESSAGE,
  hashPassword,
  rateLimit,
} from "@/lib/security";
import { INITIAL_FORM_STATE, zodFieldErrors, type FormState } from "@/lib/form-state";
import { prisma } from "@/lib/db";
import { signIn, signOut } from "@/server/auth";
import {
  FORGOT_PASSWORD_SCHEMA,
  LOGIN_SCHEMA,
  REGISTER_SCHEMA,
} from "@/server/validation/auth";

// ---------------------------------------------------------------------------
// Server Actions d'authentification.
//
// Chaque action renvoie un `FormState` compatible avec `useFormState` cote
// client. Les messages d'erreur restent generiques pour ne jamais reveler
// l'existence d'un compte.
// ---------------------------------------------------------------------------

export async function registerAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = REGISTER_SCHEMA.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certaines informations sont invalides.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const { name, email, password } = parsed.data;

  const limit = rateLimit(`register:${email}`, AUTH_RATE_LIMITS.register);
  if (!limit.ok) {
    return {
      status: "error",
      message: "Trop de tentatives. Patientez quelques minutes avant de reessayer.",
    };
  }

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    return {
      status: "error",
      fieldErrors: { email: "Un compte existe deja avec cette adresse." },
    };
  }

  const passwordHash = await hashPassword(password);

  try {
    await prisma.user.create({
      data: { name, email, passwordHash, role: "USER", locale: "fr" },
    });
  } catch {
    return {
      status: "error",
      message: "La creation du compte a echoue. Reessayez dans un instant.",
    };
  }

  // Connexion automatique puis redirection (signIn leve une redirection Next).
  await signIn("credentials", {
    email,
    password,
    redirectTo: "/fr/dashboard",
  });

  return INITIAL_FORM_STATE;
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const next = formData.get("next");
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = LOGIN_SCHEMA.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Certaines informations sont invalides.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const { email, password } = parsed.data;
  const redirectTo =
    typeof next === "string" && next.startsWith("/") && !next.startsWith("//")
      ? next
      : "/fr/dashboard";

  try {
    await signIn("credentials", { email, password, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        status: "error",
        message: "Adresse e-mail ou mot de passe incorrect.",
      };
    }
    // Redirection Next (NEXT_REDIRECT) : doit remonter telle quelle.
    throw error;
  }

  return INITIAL_FORM_STATE;
}

export async function forgotPasswordAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = FORGOT_PASSWORD_SCHEMA.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return {
      status: "error",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const limit = rateLimit(
    `forgot:${parsed.data.email}`,
    AUTH_RATE_LIMITS.forgotPassword,
  );
  if (!limit.ok) {
    return {
      status: "error",
      message: "Trop de demandes. Patientez quelques minutes avant de reessayer.",
    };
  }

  // L'envoi d'e-mail n'est pas configure dans cet environnement. On renvoie
  // volontairement la meme reponse, que le compte existe ou non.
  return { status: "success", message: GENERIC_AUTH_MESSAGE };
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/fr" });
}
