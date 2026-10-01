"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

import type { Role } from "@/config/enums";
import type { AdminActionError } from "@/lib/admin-errors";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";
import { rateLimit } from "@/lib/security";
import { requireAdminActor } from "@/server/admin";
import { ADMIN_ACTIONS, recordAdminAction } from "@/server/services/admin-audit";
import { revalidateAdminStats } from "@/server/services/admin-stats";
import {
  deleteUserAccount,
  getAttemptAnswersForAdmin,
  setUserRole,
  type AdminAnswerRow,
} from "@/server/services/admin-users";

// ---------------------------------------------------------------------------
// Server Actions de l'espace d'administration.
//
// DEUX PRINCIPES, appliques a chaque action :
//
//  1. `requireAdminActor()` relit le role EN BASE avant toute operation. Le
//     role du JWT est fige a la connexion et vit 30 jours : sans cette
//     relecture, un administrateur retrograde conserverait le pouvoir de
//     supprimer des comptes pendant toute la duree de sa session.
//
//  2. `rateLimit()` borne les ecritures et les consultations de donnees
//     sensibles. Boucler sur une action d'administration n'est pas un risque
//     theorique : l'extraction massive de reponses l'est.
//
// Les messages d'erreur sont derives d'un code ferme : ils ne revelent jamais
// l'etat reel de la base au-dela de ce que l'appelant est deja cense savoir.
// ---------------------------------------------------------------------------

/** Ecritures : tres peu d'appui dans le temps. */
const ADMIN_WRITE_LIMITS = { limit: 20, windowMs: 60_000 } as const;

/** Consultation de reponses : plus large, mais toujours bornee. */
const ADMIN_REVEAL_LIMITS = { limit: 30, windowMs: 60_000 } as const;

/**
 * Messages associes aux codes d'erreur.
 *
 * Volontairement generiques : LAST_ADMIN ne dit pas s'il existe un autre
 * administrateur, et NOT_FOUND est identique que le compte n'ait jamais existe
 * ou qu'il vienne d'etre supprime.
 *
 * Ce sont des FONCTIONS, et non des constantes exportees : un fichier
 * "use server" ne peut exporter que des Server Actions asynchrones, un helper
 * synchrone exporte y provoquerait une erreur de build.
 */
function messageFor(code: AdminActionError): string {
  switch (code) {
    case "FORBIDDEN_SELF":
      return "Vous ne pouvez pas modifier votre propre compte.";
    case "LAST_ADMIN":
      return "Operation impossible : ce compte est le dernier administrateur.";
    case "INVALID_ROLE":
      return "Role inconnu.";
    case "RATE_LIMITED":
      return "Trop d'appels. Patientez quelques instants.";
    default:
      return "Ce compte est introuvable.";
  }
}

/** Invalide les vues d'administration qui pourraient afficher le changement. */
function refreshAdminViews(userId: string): void {
  revalidateAdminStats();
  revalidatePath("/[locale]/admin", "page");
  revalidatePath("/[locale]/admin/users", "page");
  revalidatePath(`/[locale]/admin/users/${userId}`, "page");
}

// ------------------------------ Roles -------------------------------------

export async function updateUserRoleAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const actor = await requireAdminActor();

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "") as Role;
  if (!userId) return { status: "error", message: messageFor("NOT_FOUND") };

  const limit = rateLimit(`admin:role:${actor.id}`, ADMIN_WRITE_LIMITS);
  if (!limit.ok) {
    return { status: "error", message: messageFor("RATE_LIMITED") };
  }

  const result = await setUserRole(actor.id, userId, role);
  if (!result.ok) {
    return { status: "error", message: messageFor(result.error) };
  }

  await recordAdminAction({
    adminId: actor.id,
    action: ADMIN_ACTIONS.updateRole,
    targetId: userId,
    metadata: { role },
  });

  refreshAdminViews(userId);
  return INITIAL_FORM_STATE;
}

// --------------------------- Suppression ----------------------------------

export async function deleteUserAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const actor = await requireAdminActor();

  const userId = String(formData.get("userId") ?? "");
  if (!userId) return { status: "error", message: messageFor("NOT_FOUND") };

  const limit = rateLimit(`admin:delete:${actor.id}`, ADMIN_WRITE_LIMITS);
  if (!limit.ok) {
    return { status: "error", message: messageFor("RATE_LIMITED") };
  }

  const result = await deleteUserAccount(actor.id, userId);
  if (!result.ok) {
    return { status: "error", message: messageFor(result.error) };
  }

  await recordAdminAction({
    adminId: actor.id,
    action: ADMIN_ACTIONS.deleteUser,
    targetId: userId,
  });

  refreshAdminViews(userId);

  // Le compte n'existe plus : rester sur sa fiche ne montrerait qu'un 404.
  // `getLocale()` plutot qu'une locale codee en dur, sinon la redirection
  // emmenerait un visiteur `/en` vers `/fr`.
  redirect(`/${await getLocale()}/admin/users`);
}

// ------------------ Consultation tracee du detail des reponses ------------

export interface RevealAnswersState {
  status: "idle" | "error" | "success";
  code?: AdminActionError;
  attemptId?: string;
  answers?: AdminAnswerRow[];
}

/**
 * Deverrouille le detail des reponses d'une tentative.
 *
 * Action la plus sensible de l'espace : elle fait remonter les choix du
 * candidat. Elle est donc (a) reservee a un role revalide en base, (b) bornee en
 * debit, (c) tracee avec l'identifiant de l'administrateur et de la cible.
 *
 * Les donnees renvoyees restent en memoire cote client : elles ne passent ni
 * dans l'URL ni dans le HTML initial, donc un simple rechargement les efface.
 * La consultation est "explicite et ephemere" par construction.
 */
export async function revealAttemptAnswersAction(
  _prev: RevealAnswersState,
  formData: FormData,
): Promise<RevealAnswersState> {
  const actor = await requireAdminActor();

  const userId = String(formData.get("userId") ?? "");
  const attemptId = String(formData.get("attemptId") ?? "");
  if (!userId || !attemptId) {
    return { status: "error", code: "NOT_FOUND" };
  }

  const limit = rateLimit(`admin:reveal:${actor.id}`, ADMIN_REVEAL_LIMITS);
  if (!limit.ok) return { status: "error", code: "RATE_LIMITED" };

  const result = await getAttemptAnswersForAdmin(userId, attemptId);
  if (!result.ok) return { status: "error", code: "NOT_FOUND" };

  // `strict: true` : la trace est une condition d'acces. Si le journal ne peut
  // pas etre ecrit, les reponses ne sont pas transmises — c'est le seul moyen
  // de garantir que le masquage par defaut laisse systematiquement une preuve.
  try {
    await recordAdminAction({
      adminId: actor.id,
      action: ADMIN_ACTIONS.viewAnswers,
      targetId: attemptId,
      metadata: { userId, answerCount: result.answers.length },
      strict: true,
    });
  } catch {
    return { status: "error", code: "AUDIT_UNAVAILABLE" };
  }

  return { status: "success", attemptId: result.attemptId, answers: result.answers };
}