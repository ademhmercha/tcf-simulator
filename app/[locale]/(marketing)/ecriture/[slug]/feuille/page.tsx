import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { PrintButton } from "@/components/writing/print-button";
import { Button } from "@/components/ui/button";
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
    title: `${t("sheet.title")} â€” ${prompt.title}`,
    alternates: { canonical: absoluteUrl(`/${params.locale}/ecriture/${params.slug}/feuille`) },
    robots: { index: false, follow: false },
  };
}

export default async function WritingSheetPage({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("writing");
  const prompt = await getWritingPromptBySlug(params.slug);
  if (!prompt) notFound();

  const lines = 30;

  return (
    <div className="container space-y-6 py-10 print:max-w-none print:px-0 print:py-0">
      <header className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold">{t("sheet.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("sheet.footer")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintButton label={t("sheet.print")} />
          <Button asChild variant="outline">
            <Link href={`/ecriture/${prompt.slug}`}>
              <ArrowLeft className="size-4" aria-hidden />
              {t("sheet.back")}
            </Link>
          </Button>
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-white p-8 text-black shadow-soft print:m-0 print:w-[210mm] print:rounded-none print:border-0 print:p-[15mm] print:shadow-none">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/20 pb-4">
          <div className="space-y-1">
            <p className="text-sm">
              {t("sheet.name")} : __________________________
            </p>
            <p className="text-sm">
              {t("sheet.date")} : ____/____/________
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm">TCF Simulator â€” {t("sheet.title")}</p>
            <p className="text-sm">
              {t("sheet.task")} {prompt.task} â€¢ {prompt.level}
            </p>
          </div>
        </div>

        <div className="mb-4 space-y-1">
          <p className="text-sm font-semibold">
            {t("sheet.subject")} : {prompt.title}
          </p>
          <p className="text-xs">
            {prompt.minWords}â€“{prompt.maxWords} {t("detail.words")} â€¢ {prompt.durationMin}{" "}
            {t("detail.minutes")}
          </p>
        </div>

        <div className="space-y-0">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="flex items-center border-b border-black/10 py-3"
              style={{ minHeight: "28px" }}
            >
              <span className="w-8 text-[10px] text-black/40">{index + 1}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-black/60">{t("sheet.footer")}</p>
      </section>
    </div>
  );
}
