import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

import { ListeningSession } from "@/components/listening/listening-session";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getListeningSeriesBySlug, ListeningError } from "@/server/services/listening";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "co" });
  const payload = await getListeningSeriesBySlug(params.slug).catch(() => null);
  const title = payload?.series.title ?? t("metaTitle");
  return { title: `${title} · ${t("metaTitle")}` };
}

export default async function ListeningSeriesPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("co");

  const session = await auth();
  if (!session?.user?.id) redirect("/fr/login?next=%2Fcomprehension-orale");

  let payload;
  try {
    payload = await getListeningSeriesBySlug(params.slug);
  } catch (error) {
    if (error instanceof ListeningError) notFound();
    throw error;
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-6 flex items-center justify-between gap-3">
        <Button asChild size="sm" variant="outline">
          <Link href="/tests">← {t("backToList")}</Link>
        </Button>
        <LevelBadge level={payload.series.level} size="sm" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-extrabold sm:text-3xl">{payload.series.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("seriesHint")}</p>
      </div>

      <ListeningSession payload={payload} />
    </div>
  );
}