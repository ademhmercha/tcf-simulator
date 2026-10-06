import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

import { CorrectionView } from "@/components/listening/correction-view";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getListeningCorrection, ListeningError } from "@/server/services/listening";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "co" });
  return { title: t("correctionMetaTitle"), description: t("correctionMetaDescription") };
}

export default async function ListeningCorrectionPage({
  params,
  searchParams,
}: {
  params: { locale: AppLocale; slug: string };
  searchParams: { result?: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("co");

  const session = await auth();
  if (!session?.user?.id) redirect("/fr/login?next=%2Fcomprehension-orale");

  const resultId = searchParams.result;
  if (!resultId) redirect(`/fr/comprehension-orale/${params.slug}`);

  let correction;
  try {
    correction = await getListeningCorrection(resultId, session.user.id);
  } catch (error) {
    if (error instanceof ListeningError) notFound();
    throw error;
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-6">
        <Button asChild size="sm" variant="outline" className="mb-5">
          <Link href="/comprehension-orale">← {t("backToList")}</Link>
        </Button>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{t("correctionTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("correctionSubtitle")}</p>
      </div>

      <CorrectionView correction={correction} />
    </div>
  );
}