import { setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getAttemptHistory } from "@/server/services/attempts";

/**
 * `/results` n'a pas de page propre : on redirige vers la correction la plus
 * recente, ou vers le tableau de bord si le candidat n'a rien passe.
 */
export default async function ResultsIndexPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<never> {
  setRequestLocale(params.locale);

  const session = await auth();
  if (!session?.user) redirect(`/fr/login?next=${encodeURIComponent("/fr/results")}`);

  const history = await getAttemptHistory(session.user.id);
  const latest = history[0];

  redirect(latest ? `/fr/results/${latest.id}` : "/fr/dashboard");
}
