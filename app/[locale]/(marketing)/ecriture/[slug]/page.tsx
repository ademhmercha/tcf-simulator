import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Printer } from "lucide-react";

import { WritingPractice } from "@/components/writing/writing-practice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { absoluteUrl } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getWritingPromptBySlug } from "@/server/services/writing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const prompt = await getWritingPromptBySlug(params.slug);
  if (!prompt) return {};
  const t = await getTranslations({ locale: params.locale, namespace: "writing" });
  return {
    title: `${prompt.title} | ${t("list.title")}`,
    description: prompt.instructions.slice(0, 160),
    alternates: { canonical: absoluteUrl(`/${params.locale}/ecriture/${params.slug}`) },
    openGraph: {
      title: prompt.title,
      description: prompt.instructions.slice(0, 160),
      url: absoluteUrl(`/${params.locale}/ecriture/${params.slug}`),
    },
  };
}

export default async function EcritureSujetPage({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("writing");
  const prompt = await getWritingPromptBySlug(params.slug);
  if (!prompt) notFound();

  return (
    <div className="container space-y-8 py-12">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(`task.${prompt.task}`)}</Badge>
          <Badge variant="outline">{prompt.level}</Badge>
          <Badge variant="outline">{t(`theme.${prompt.theme}`)}</Badge>
        </div>
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{prompt.title}</h1>
        <p className="text-sm text-muted-foreground">
          {prompt.minWords}â€“{prompt.maxWords} {t("detail.words")} â€¢ {prompt.durationMin}{" "}
          {t("detail.minutes")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-lg font-bold">{t("detail.instructions")}</h2>
              <p className="whitespace-pre-wrap leading-relaxed">{prompt.instructions}</p>
            </CardContent>
          </Card>

          {prompt.documents.length > 0 ? (
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-lg font-bold">{t("detail.documents")}</h2>
                {prompt.documents.map((document, index) => (
                  <article key={index} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-semibold">{document.author}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                      {document.text}
                    </p>
                  </article>
                ))}
              </CardContent>
            </Card>
          ) : null}

          <WritingPractice
            prompt={prompt}
            printHref={`/ecriture/${prompt.slug}/feuille`}
          />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card>
            <CardContent className="space-y-4 p-6">
              <h2 className="text-base font-bold">{t("detail.requirements")}</h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">{t("list.task")}</dt>
                  <dd className="font-semibold">{t(`task.${prompt.task}`)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("list.level")}</dt>
                  <dd className="font-semibold">{prompt.level}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("list.theme")}</dt>
                  <dd className="font-semibold">{t(`theme.${prompt.theme}`)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("detail.words")}</dt>
                  <dd className="font-semibold">
                    {prompt.minWords}â€“{prompt.maxWords}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("detail.minutes")}</dt>
                  <dd className="font-semibold">{prompt.durationMin}</dd>
                </div>
              </dl>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/ecriture/${prompt.slug}/feuille`}>
                  <Printer className="size-4" aria-hidden />
                  {t("detail.print")}
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground">{t("detail.printHint")}</p>

              <Button asChild variant="ghost" className="w-full">
                <Link href="/ecriture">{t("detail.back")}</Link>
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
