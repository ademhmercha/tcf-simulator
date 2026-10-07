import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookOpenCheck, Headphones } from "lucide-react";

import { SeriesCard } from "@/components/listening/series-card";
import { TestCard } from "@/components/tests/test-card";
import { LevelBadge } from "@/components/ui/badge";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getPublishedTests } from "@/server/services/attempts";
import {
  getListeningSeriesList,
  LISTENING_LEVELS,
} from "@/server/services/listening";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tests" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function TestsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("tests");
  const tc = await getTranslations("co");

  const session = await auth();
  const signedIn = Boolean(session?.user);

  const [tests, series] = await Promise.all([
    getPublishedTests(session?.user?.id),
    getListeningSeriesList(session?.user?.id),
  ]);

  // Tri des series : niveaux CECRL dans l'ordre, palettes melangees a la fin.
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

      <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
        {/* ----------------- Langue / Comprehension ecrite ----------------- */}
        <section className="rounded-2xl border border-border/70 bg-surface/60 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="size-5 text-primary" aria-hidden />
            <h2 className="text-xl font-bold">{t("writtenColumn")}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t("writtenColumnSub")}</p>

          {tests.length === 0 ? (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Aucun test publie pour le moment. Lancez{" "}
              <code className="font-mono text-xs">npm run db:seed</code> pour charger le contenu.
            </p>
          ) : (
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} signedIn={signedIn} />
              ))}
            </div>
          )}
        </section>

        {/* --------------------- Comprehension orale ------------------------ */}
        <section className="rounded-2xl border border-border/70 bg-surface/60 p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Headphones className="size-5 text-primary" aria-hidden />
            <h2 className="text-xl font-bold">{t("oralColumn")}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t("oralColumnSub")}</p>

          {sorted.length === 0 ? (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              {tc("emptySeries")}
            </p>
          ) : (
            <div className="mt-5 space-y-7">
              {[...groups.entries()].map(([level, items]) => (
                <section key={level} aria-label={`Niveau ${level}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <LevelBadge level={level} />
                    <span className="h-px flex-1 bg-border" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {t("seriesCount", { count: items.length })}
                    </span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((serie) => (
                      <SeriesCard key={serie.id} serie={serie} signedIn={signedIn} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}