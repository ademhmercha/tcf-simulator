import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { WritingPromptCard } from "@/components/writing/writing-prompt-card";
import { WritingFilters } from "@/components/writing/writing-filters";
import type { WritingLevel, WritingTask, WritingTheme } from "@/config/enums";
import { absoluteUrl } from "@/config/site";
import { listWritingPrompts } from "@/server/services/writing";

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

  const task = searchParams.task ? (Number(searchParams.task) as WritingTask) : undefined;
  const level = searchParams.level as WritingLevel | undefined;
  const theme = searchParams.theme as WritingTheme | undefined;

  const prompts = await listWritingPrompts({ task, level, theme });

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
          activeTask={task ?? null}
          activeLevel={level ?? null}
          activeTheme={theme ?? null}
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
      </div>
    </>
  );
}
