import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Download, ExternalLink, FileText } from "lucide-react";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/config/enums";
import { getVocabulaireDocument, getVocabulaireSerie } from "@/data/vocabulaire";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "vocab" });
  const serie = getVocabulaireSerie(params.slug);
  const title = serie?.title ?? t("pageTitle");
  return { title: `${title} · ${t("pageTitle")}` };
}

export default async function VocabulaireSeriePage({
  params,
  searchParams,
}: {
  params: { locale: AppLocale; slug: string };
  searchParams: { doc?: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("vocab");

  const serie = getVocabulaireSerie(params.slug);
  if (!serie) notFound();

  const doc = getVocabulaireDocument(serie, searchParams.doc);
  const pdfUrl = `/pdf/vocabulaire/${doc.file}`;

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      <header className="border-b border-border/70 bg-surface/60">
        <div className="container flex flex-wrap items-center gap-3 py-3">
          <Button asChild size="sm" variant="outline">
            <Link href="/vocabulaire">
              <FileText aria-hidden />
              {t("backToList")}
            </Link>
          </Button>

          <div className="flex min-w-0 flex-1 items-center gap-2">
            <h1 className="truncate text-sm font-bold sm:text-base">{serie.title}</h1>
            {serie.level ? (
              <Badge size="sm" variant="outline" className="hidden sm:inline-flex">
                {serie.level}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="ghost">
              <a href={pdfUrl} target="_blank" rel="noreferrer">
                <ExternalLink aria-hidden />
                <span className="hidden sm:inline">{t("openNewTab")}</span>
              </a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href={pdfUrl} download={doc.file}>
                <Download aria-hidden />
                <span className="hidden sm:inline">{t("download")}</span>
              </a>
            </Button>
          </div>
        </div>

        {serie.documents.length > 1 ? (
          <div className="container flex flex-wrap gap-2 pb-3">
            {serie.documents.map((item) => {
              const active = item.id === doc.id;
              return (
                <Link
                  key={item.id}
                  href={`/vocabulaire/${serie.slug}?doc=${item.id}`}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 text-sm font-semibold transition-colors",
                    active
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-border/70 text-muted-foreground hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : null}
      </header>

      <div className="flex-1 bg-muted/30">
        <iframe src={pdfUrl} title={`${serie.title} — ${doc.label}`} className="h-full w-full border-0" />
      </div>
    </div>
  );
}
