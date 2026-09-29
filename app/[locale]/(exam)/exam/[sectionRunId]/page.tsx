import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { ExamAccessDenied } from "@/components/exam/exam-access-denied";
import { ExamRunner } from "@/components/exam/exam-runner";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { AttemptError, getExamPayload } from "@/server/services/attempts";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Epreuve en cours", robots: { index: false, follow: false } };
}

export default async function ExamPage({
  params,
}: {
  params: { locale: AppLocale; sectionRunId: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);

  const session = await auth();
  if (!session?.user) {
    redirect(`/fr/login?next=${encodeURIComponent(`/fr/exam/${params.sectionRunId}`)}`);
  }

  let payload;
  try {
    payload = await getExamPayload(session.user.id, params.sectionRunId);
  } catch (error) {
    if (error instanceof AttemptError) {
      if (error.code === "EXPIRED") {
        // L'epreuve a ete soumise automatiquement : on renvoie vers les
        // resultats plutot que d'afficher une erreur.
        redirect("/fr/results");
      }
      return <ExamAccessDenied code={error.code} />;
    }
    throw error;
  }

  return <ExamRunner payload={payload} />;
}
