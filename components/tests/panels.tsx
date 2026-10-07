import { getTranslations } from "next-intl/server";
import { BookOpenCheck, Headphones } from "lucide-react";

// ---------------------------------------------------------------------------
// Panneaux du catalogue (ecrit / comprehension orale), partages entre la page
// d'accueil (section « Les tests ») et la serie d'entrainement (/tests).
// ---------------------------------------------------------------------------

import { SeriesCard, type SeriesCardData } from "@/components/listening/series-card";
import { TestCard } from "@/components/tests/test-card";
import { LevelBadge } from "@/components/ui/badge";
import type { TestSummary } from "@/lib/types";
import { LISTENING_LEVELS } from "@/server/services/listening";

export async function WrittenPanel({
  tests,
  signedIn,
  compact = false,
}: {
  tests: TestSummary[];
  signedIn: boolean;
  compact?: boolean;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("tests");

  return (
    <section
      aria-label={t("writtenColumn")}
      className="rounded-2xl border border-border/70 bg-surface/60 p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <BookOpenCheck className="size-5 text-primary" aria-hidden />
        <h2 className="text-xl font-bold">{t("writtenColumn")}</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{t("writtenColumnSub")}</p>

      {tests.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">{t("emptyWritten")}</p>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} compact={compact} signedIn={signedIn} />
          ))}
        </div>
      )}
    </section>
  );
}

export async function OralPanel({
  series,
  signedIn,
}: {
  series: SeriesCardData[];
  signedIn: boolean;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("tests");
  const tc = await getTranslations("co");

  // Tri des series : niveaux CECRL dans l'ordre, palettes melangees a la fin.
  const rank = (level: string): number => {
    const single = LISTENING_LEVELS.indexOf(level as (typeof LISTENING_LEVELS)[number]);
    if (single !== -1) return single;
    return LISTENING_LEVELS.length + 1;
  };
  const sorted = [...series].sort((a, b) => rank(a.level) - rank(b.level));

  const groups = new Map<string, SeriesCardData[]>();
  for (const serie of sorted) {
    const list = groups.get(serie.level) ?? [];
    list.push(serie);
    groups.set(serie.level, list);
  }

  return (
    <section
      aria-label={t("oralColumn")}
      className="rounded-2xl border border-border/70 bg-surface/60 p-5 sm:p-6"
    >
      <div className="flex items-center gap-3">
        <Headphones className="size-5 text-primary" aria-hidden />
        <h2 className="text-xl font-bold">{t("oralColumn")}</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{t("oralColumnSub")}</p>

      {sorted.length === 0 ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">{tc("emptySeries")}</p>
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
  );
}