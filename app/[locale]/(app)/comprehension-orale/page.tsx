import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { SeriesCard } from "@/components/listening/series-card";
import { LevelBadge } from "@/components/ui/badge";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import {
  getListeningSeriesList,
  LISTENING_LEVELS,
} from "@/server/services/listening";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "co" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ComprehensionOralePage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("co");

  const session = await auth();
  if (!session?.user?.id) redirect("/fr/login?next=%2Fcomprehension-orale");

  const series = await getListeningSeriesList(session.user.id);

  // Tri : niveaux CECRL dans l'ordre, palettes melangees a la fin.
  const rank = (level: string): number => {
    const single = LISTENING_LEVELS.indexOf(level as (typeof LISTENING_LEVELS)[number]);
    if (single !== -1) return single;
    return LISTENING_LEVELS.length + 1;
  };
  const sorted = [...series].sort((a, b) => rank(a.level) - rank(b.level));

  const groups = new Map<string, typeof sorted>();
  for (const serie of sorted) {
    const list = groups.get(serie.level) ?? [];
    list.push(serie);
    groups.set(serie.level, list);
  }

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("pageEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("pageTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("pageSubtitle")}</p>
      </header>

      <div className="mt-12 space-y-10">
        {[...groups.entries()].map(([level, items]) => (
          <section key={level} aria-label={`Niveau ${level}`}>
            <div className="mb-4 flex items-center gap-3">
              <LevelBadge level={level} />
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium text-muted-foreground">
                {items.length} {items.length > 1 ? "séries" : "série"}
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((serie) => (
                <SeriesCard key={serie.id} serie={serie} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}