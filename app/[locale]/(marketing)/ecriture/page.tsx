import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { WritingFilters } from "@/components/writing/writing-filters";
import { WritingPromptCard } from "@/components/writing/writing-prompt-card";
import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { listWritingPrompts } from "@/server/services/writing";
import { WRITING_FILTERS_SCHEMA } from "@/server/validation/writing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "writing" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: { canonical: absoluteUrl(`/${params.locale}/ecriture`) },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: absoluteUrl(`/${params.locale}/ecriture`),
    },
  };
}

export default async function EcriturePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { task?: string; level?: string; theme?: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("writing");

  // Filtres venus de la query string : on ignore toute valeur invalide plutot
  // que de la transmettre a Prisma.
  const parsed = WRITING_FILTERS_SCHEMA.safeParse({
    task: searchParams.task,
    level: searchParams.level,
    theme: searchParams.theme,
  });
  const filters = parsed.success ? parsed.data : {};

  const prompts = await listWritingPrompts(filters);

  return (
    <>
      <section className="border-b border-border bg-surface">
        <div className="container py-14 sm:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("list.title")}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl">
              {t("list.title")}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("list.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="container space-y-10 py-12 sm:py-14">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="text-base font-bold">{t("list.intro")}</h2>
        </section>

        <WritingFilters
          activeTask={filters.task ?? null}
          activeLevel={filters.level ?? null}
          activeTheme={filters.theme ?? null}
        />

        <section className="space-y-5">
          <p className="text-sm text-muted-foreground">
            {prompts.length} {t("list.count")}
          </p>
          {prompts.length === 0 ? (
            <p className="text-muted-foreground">{t("list.empty")}</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {prompts.map((prompt) => (
                <WritingPromptCard key={prompt.slug} prompt={prompt} />
              ))}
            </div>
          )}
        </section>

        <Button asChild variant="outline" size="sm">
          <Link href="/tests">
            <ArrowRight className="rotate-180" aria-hidden />
            {t("list.backToSeries")}
          </Link>
        </Button>
      </div>
    </>
  );
}
