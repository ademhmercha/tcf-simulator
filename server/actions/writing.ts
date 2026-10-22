"use server";

import { computeSelfScore } from "@/data/writing";
import { zodFieldErrors, type FormState } from "@/lib/form-state";
import { auth } from "@/server/auth";
import { recordWritingAttempt, WritingError } from "@/server/services/writing";
import { RECORD_WRITING_ATTEMPT_SCHEMA } from "@/server/validation/writing";

// ---------------------------------------------------------------------------
// Server Action du module « Expression écrite ».
//
// L'epreuve se passe sur papier : l'action n'enregistre que le temps passe,
// le nombre de mots, la checklist d'auto-evaluation et un commentaire. Le
// score d'auto-evaluation est recalcule cote serveur (jamais recu du client).
// ---------------------------------------------------------------------------

export async function recordWritingAttemptAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();
  const userId = session?.user?.id;

  const rawChecklist = formData.get("checklist");
  let checklist: Record<string, boolean> = {};
  if (typeof rawChecklist === "string" && rawChecklist.trim()) {
    try {
      const parsed: unknown = JSON.parse(rawChecklist);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
          checklist[key] = value === true;
        }
      }
    } catch {
      checklist = {};
    }
  }

  const parsed = RECORD_WRITING_ATTEMPT_SCHEMA.safeParse({
    slug: formData.get("slug"),
    durationSeconds: formData.get("durationSeconds"),
    wordCount: formData.get("wordCount"),
    checklist,
    notes: formData.get("notes") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Les informations envoyees sont invalides.",
      fieldErrors: zodFieldErrors(parsed.error.issues),
    };
  }

  // Visiteur non connecte : la page reste utilisable, seule la sauvegarde est
  // proposee (le message invite a creer un compte).
  if (!userId) {
    return {
      status: "error",
      message: "Connectez-vous pour enregistrer votre tentative.",
      redirectTo: "/fr/login?next=%2Fecriture",
    };
  }

  const { slug, durationSeconds, wordCount, checklist: savedChecklist, notes } = parsed.data;

  try {
    await recordWritingAttempt(userId, {
      slug,
      durationSeconds,
      wordCount,
      checklist: savedChecklist,
      selfScore: computeSelfScore(savedChecklist),
      notes: notes && notes.length > 0 ? notes : null,
    });
  } catch (error) {
    if (error instanceof WritingError) {
      return { status: "error", message: "Le sujet est introuvable." };
    }
    throw error;
  }

  return {
    status: "success",
    message: "Tentative enregistree.",
    redirectTo: "/fr/ecriture/historique",
  };
}
