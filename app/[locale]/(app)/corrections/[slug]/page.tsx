import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

import { CorrectionView } from "@/components/corrections/correction-view";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getTestCorrection } from "@/server/services/corrections";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "corrections" });
  return {
    title: t("testTitle"),
    description: t("indexSubtitle"),
    robots: { index: false, follow: false },
  };
}

export default async function TestCorrectionPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("corrections");

  const session = await auth();
  if (!session?.user) {
    redirect(
      `/fr/login?next=${encodeURIComponent(`/fr/corrections/${params.slug}`)}`,
    );
  }

  const test = await getTestCorrection(params.slug);
  if (!test) notFound();

  // Un examen blanc a sa propre page de corrige, avec son propre fil d'Ariane.
  if (test.kind === "FULL") {
    redirect(`/${params.locale}/examens/${params.slug}/corrige`);
  }

  return (
    <CorrectionView test={test} backHref="/corrections" backLabel={t("backToList")} />
  );
}
