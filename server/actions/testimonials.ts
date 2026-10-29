"use server";

import { revalidatePath } from "next/cache";

import { TestimonialStatusSchema } from "@/config/enums";
import { zodFieldErrors, type FormState } from "@/lib/form-state";
import { rateLimit } from "@/lib/security";
import { auth } from "@/server/auth";
import { requireAdminActor } from "@/server/admin";
import { ADMIN_ACTIONS, recordAdminAction } from "@/server/services/admin-audit";
import {
  deleteTestimonial,
  saveOwnTestimonial,
  setTestimonialStatus,
} from "@/server/services/testimonials";
import { SUBMIT_TESTIMONIAL_SCHEMA } from "@/server/validation/testimonials";

// ---------------------------------------------------------------------------
// Server Actions des avis.
//
// Le candidat n'ecrit que SON avis (identifiant lu dans la session, jamais
// dans le formulaire), et il repart toujours en moderation. L'administrateur
// est revalide en base avant chaque decision.
// ---------------------------------------------------------------------------

const SUBMIT_LIMITS = { limit: 5, windowMs: 10 * 60_000 } as const;
const MODERATE_LIMITS = { limit: 60, windowMs: 60_000 } as const;

function refreshViews(): void {
  revalidatePath("/[locale]", "page");
  revalidatePath("/[locale]/admin/avis", "page");
}

export async function submitTestimonialAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return { status: "error", message: "Connecte-toi pour laisser un avis." };
  }

  if (!rateLimit(`testimonial:${userId}`, SUBMIT_LIMITS).ok) {
    return { status: "error", message: "Trop de tentatives. Réessaie dans quelques minutes." };
  }

  const parsed = SUBMIT_TESTIMONIAL_SCHEMA.safeParse({
    displayName: formData.get("displayName") ?? "",
    city: formData.get("city") ?? "",
    level: formData.get("level") ?? undefined,
    rating: formData.get("rating"),
    comment: formData.get("comment") ?? "",
    consent: formData.get("consent") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Vérifie les champs en rouge.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  const { consent: _consent, ...input } = parsed.data;
  await saveOwnTestimonial(userId, input);
  refreshViews();

  return {
    status: "success",
    message: "Merci ! Ton avis sera publié après validation par notre équipe.",
    token: Date.now(),
  };
}

export async function moderateTestimonialAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const actor = await requireAdminActor();

  if (!rateLimit(`moderate:${actor.id}`, MODERATE_LIMITS).ok) {
    return { status: "error", message: "Trop d'appels. Patientez quelques instants." };
  }

  const id = String(formData.get("id") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (!id) return { status: "error", message: "Avis introuvable." };

  if (decision === "DELETE") {
    const ok = await deleteTestimonial(id);
    if (!ok) return { status: "error", message: "Avis introuvable." };
    await recordAdminAction({
      adminId: actor.id,
      action: ADMIN_ACTIONS.moderateTestimonial,
      targetId: id,
      metadata: { decision: "DELETE" },
    });
  } else {
    const status = TestimonialStatusSchema.safeParse(decision);
    if (!status.success) return { status: "error", message: "Décision inconnue." };
    const ok = await setTestimonialStatus(id, status.data);
    if (!ok) return { status: "error", message: "Avis introuvable." };
    await recordAdminAction({
      adminId: actor.id,
      action: ADMIN_ACTIONS.moderateTestimonial,
      targetId: id,
      metadata: { decision: status.data },
    });
  }

  refreshViews();
  return { status: "success", message: "Décision enregistrée.", token: Date.now() };
}
