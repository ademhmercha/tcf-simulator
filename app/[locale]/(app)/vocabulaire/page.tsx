import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { VOCABULAIRE_SERIES, type VocabulaireSerie } from "@/data/vocabulaire";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "vocab" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

async function VocabCard({ serie }: { serie: VocabulaireSerie }): Promise<React.JSX.Element> {
  const t = await getTranslations("vocab");

  return (
    <Card className="flex h-full flex-col border-border/70 transition-all duration-200 hover:border-primary/40 hover:shadow-medium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="size-5 text-primary" aria-hidden />
          </span>
          <div className="flex items-center gap-2">
            {serie.questionCount !== null ? (
              <span className="text-xs font-semibold text-muted-foreground">
                {t("questionCount", { count: serie.questionCount })}
              </span>
            ) : null}
            {serie.level ? (
              <Badge size="sm" variant="outline">
                {serie.level}
              </Badge>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CardTitle>{serie.title}</CardTitle>
        {serie.description ? (
          <p className="mt-2 text-sm text-muted-foreground">{serie.description}</p>
        ) : null}
        <div className="mt-auto pt-4">
          <Button asChild size="sm" className="w-full">
            <Link href={`/vocabulaire/${serie.slug}`}>
              <FileText aria-hidden />
              {t("openCard")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default async function VocabulairePage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("vocab");

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("pageEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("pageTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("pageSubtitle")}</p>
      </header>

      {VOCABULAIRE_SERIES.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {VOCABULAIRE_SERIES.map((serie) => (
            <VocabCard key={serie.slug} serie={serie} />
          ))}
        </div>
      )}

      <div className="mx-auto mt-12 max-w-4xl">
        <Button asChild variant="outline" size="sm">
          <Link href="/tests">
            <ArrowRight className="rotate-180" aria-hidden />
            {t("backToTests")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
