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

export default async function ExamCorrectionPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const te = await getTranslations("exams");

  const session = await auth();
  if (!session?.user) {
    redirect(
      `/fr/login?next=${encodeURIComponent(`/fr/examens/${params.slug}/corrige`)}`,
    );
  }

  const test = await getTestCorrection(params.slug, "FULL");
  if (!test) notFound();

  return <CorrectionView test={test} backHref="/examens" backLabel={te("title")} />;
}
