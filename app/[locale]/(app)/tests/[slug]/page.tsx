import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

import { TestOverview } from "@/components/tests/test-overview";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getAttemptHistory, getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tests" });
  return { title: `${t("listTitle")} - ${params.slug}` };
}

export default async function TestDetailPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("tests");

  const session = await auth();
  const userId = session?.user?.id;
  // Le middleware filtre deja les anonymes ; on revalide ici car un cookie
  // present peut ne plus correspondre a une session valide.
  if (!userId) {
    redirect(
      `/${params.locale}/login?next=${encodeURIComponent(
        `/${params.locale}/tests/${params.slug}`,
      )}`,
    );
  }

  // `getPublishedTests` agrege les donnees de progression du candidat
  // (tentative en cours, meilleur score) : on l'utilise plutot que
  // `getTestBySlug`, qui ne renvoie que la fiche publique du test.
  const tests = await getPublishedTests(userId, "PRACTICE");
  const test = tests.find((item) => item.slug === params.slug);
  if (!test) notFound();

  const history = await getAttemptHistory(userId);
  const attempts = history.filter((attempt) => attempt.testId === test.id);

  return (
    <TestOverview
      test={test}
      attempts={attempts}
      basePath="/tests"
      backLabel={t("listTitle")}
    />
  );
}
