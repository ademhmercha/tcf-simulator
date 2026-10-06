"use server";

import { redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { ListeningError, submitListeningSeries } from "@/server/services/listening";
import { SUBMIT_LISTENING_SCHEMA } from "@/server/validation/listening";

// ---------------------------------------------------------------------------
// Server Action de la comprehension orale.
//
// C'est le seul chemin d'enregistrement d'une passation : le score est calcule
// et ecrit cote serveur, puis redirection vers la page de correction.
// ---------------------------------------------------------------------------

export async function submitListeningAction(formData: FormData): Promise<void> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/fr/login?next=%2Fcomprehension-orale");

  const rawAnswers = formData.get("answers");
  let parsed;
  try {
    parsed = SUBMIT_LISTENING_SCHEMA.safeParse({
      seriesSlug: String(formData.get("seriesSlug") ?? ""),
      answers: typeof rawAnswers === "string" ? JSON.parse(rawAnswers) : null,
    });
  } catch {
    redirect("/fr/comprehension-orale");
    return;
  }
  if (!parsed.success) redirect("/fr/comprehension-orale");

  const { seriesSlug, answers } = parsed.data;

  try {
    const { resultId } = await submitListeningSeries(seriesSlug, userId, answers);
    redirect(`/fr/comprehension-orale/${seriesSlug}/correction?result=${resultId}`);
  } catch (error) {
    if (error instanceof ListeningError) redirect("/fr/comprehension-orale");
    throw error;
  }
}