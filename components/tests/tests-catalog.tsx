"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, BookOpenCheck, FileText, Headphones, PenLine } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type View = "written" | "oral";

interface TestsCatalogProps {
  written: React.ReactNode;
  oral: React.ReactNode;
  writtenCount: number;
  oralCount: number;
  vocabCount: number;
  writingCount: number;
}

export function TestsCatalog({
  written,
  oral,
  writtenCount,
  oralCount,
  vocabCount,
  writingCount,
}: TestsCatalogProps) {
  const t = useTranslations("tests");
  const [view, setView] = useState<View | null>(null);

  if (view !== null) {
    return (
      <div className="mx-auto mt-12 max-w-4xl animate-fade-up">
        <button
          type="button"
          onClick={() => setView(null)}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          {t("backChoice")}
        </button>
        {view === "written" ? written : oral}
      </div>
    );
  }

  return (
    <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => setView("written")}
        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-surface/60 p-6 text-left transition-all hover:border-primary/40 hover:shadow-lg sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <BookOpenCheck className="size-6 text-primary" aria-hidden />
        </span>
        <span className="text-xl font-bold transition-colors group-hover:text-primary">
          {t("writtenColumn")}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {t("writtenColumnSub")}
        </span>
        <span className="mt-1 text-sm font-semibold text-primary">
          {t("writtenCount", { count: writtenCount })}
        </span>
        <ArrowRight
          className="absolute end-6 top-6 size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </button>

      <button
        type="button"
        onClick={() => setView("oral")}
        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-surface/60 p-6 text-left transition-all hover:border-primary/40 hover:shadow-lg sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <Headphones className="size-6 text-primary" aria-hidden />
        </span>
        <span className="text-xl font-bold transition-colors group-hover:text-primary">
          {t("oralColumn")}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {t("oralColumnSub")}
        </span>
        <span className="mt-1 text-sm font-semibold text-primary">
          {t("seriesCount", { count: oralCount })}
        </span>
        <ArrowRight
          className="absolute end-6 top-6 size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </button>

      <Link
        href="/vocabulaire"
        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-surface/60 p-6 text-left transition-all hover:border-primary/40 hover:shadow-lg sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <FileText className="size-6 text-primary" aria-hidden />
        </span>
        <span className="text-xl font-bold transition-colors group-hover:text-primary">
          {t("vocabColumn")}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {t("vocabColumnSub")}
        </span>
        <span className="mt-1 text-sm font-semibold text-primary">
          {t("seriesCount", { count: vocabCount })}
        </span>
        <ArrowRight
          className="absolute end-6 top-6 size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>

      <Link
        href="/ecriture"
        className="group relative flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-surface/60 p-6 text-left transition-all hover:border-primary/40 hover:shadow-lg sm:p-8"
      >
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
          <PenLine className="size-6 text-primary" aria-hidden />
        </span>
        <span className="text-xl font-bold transition-colors group-hover:text-primary">
          {t("writingColumn")}
        </span>
        <span className="text-sm leading-relaxed text-muted-foreground">
          {t("writingColumnSub")}
        </span>
        <span className="mt-1 text-sm font-semibold text-primary">
          {t("writingCount", { count: writingCount })}
        </span>
        <ArrowRight
          className="absolute end-6 top-6 size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
          aria-hidden
        />
      </Link>
    </div>
  );
}
