"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { auth } from "@/server/auth";
import {
  AttemptError,
  countMistakes,
  getAttemptState,
  retryMistakes,
  startAttempt,
  submitSection,
} from "@/server/services/attempts";

// ---------------------------------------------------------------------------
// Server Actions de l'espace candidat.
//
// Elles redirigent vers l'ecran d'examen : c'est le seul endroit ou les
// questions sont chargees, et jamais avant validation de la tentative.
// ---------------------------------------------------------------------------

async function currentUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

/** SectionRun actuellement jouable d'une tentative (null si elle est terminee). */
async function liveSectionRunId(userId: string, attemptId: string): Promise<string | null> {
  const state = await getAttemptState(userId, attemptId);
  if (!state) return null;
  const now = Date.now();
  const run = state.sectionRuns.find(
    (r) => r.status === "IN_PROGRESS" && r.expiresAt.getTime() > now,
  );
  return run?.id ?? null;
}

export async function startAttemptAction(formData: FormData): Promise<void> {
  const userId = await currentUserId();
  if (!userId) redirect("/fr/login?next=%2Ftests");

  const testId = String(formData.get("testId") ?? "");
  if (!testId) redirect("/fr/tests");

  try {
    const attemptId = await startAttempt(userId, testId);
    const sectionRunId = await liveSectionRunId(userId, attemptId);
    if (!sectionRunId) redirect(`/fr/results/${attemptId}`);
    redirect(`/fr/exam/${sectionRunId}`);
  } catch (error) {
    if (error instanceof AttemptError) redirect("/fr/tests");
    throw error;
  }
}

export async function submitSectionAction(formData: FormData): Promise<void> {
  const userId = await currentUserId();
  if (!userId) redirect("/fr/login");

  const sectionRunId = String(formData.get("sectionRunId") ?? "");
  const run = sectionRunId
    ? await prisma.sectionRun.findUnique({
        where: { id: sectionRunId },
        select: { attemptId: true },
      })
    : null;
  if (!run) redirect("/fr/tests");

  const nextRunId = await submitSection(userId, sectionRunId);
  if (!nextRunId) {
    redirect(`/fr/results/${run.attemptId}`);
  }
  redirect(`/fr/exam/${nextRunId}`);
}

export async function retryMistakesAction(formData: FormData): Promise<void> {
  const userId = await currentUserId();
  if (!userId) redirect("/fr/login");

  const attemptId = String(formData.get("attemptId") ?? "");
  if (!attemptId) redirect("/fr/history");

  try {
    const newAttemptId = await retryMistakes(userId, attemptId);
    const sectionRunId = await liveSectionRunId(userId, newAttemptId);
    if (!sectionRunId) redirect(`/fr/results/${newAttemptId}`);
    redirect(`/fr/exam/${sectionRunId}`);
  } catch (error) {
    if (error instanceof AttemptError) redirect(`/fr/results/${attemptId}`);
    throw error;
  }
}

export async function mistakesCountAction(attemptId: string): Promise<number> {
  const userId = await currentUserId();
  if (!userId) return 0;
  return countMistakes(userId, attemptId);
}

export async function deleteAttemptAction(formData: FormData): Promise<void> {
  const userId = await currentUserId();
  if (!userId) redirect("/fr/login");

  const attemptId = String(formData.get("attemptId") ?? "");
  if (attemptId) {
    await prisma.attempt.deleteMany({ where: { id: attemptId, userId } });
  }
  redirect("/fr/history");
}
