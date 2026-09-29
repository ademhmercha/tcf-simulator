import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, BookOpenCheck, Clock, FileText } from "lucide-react";

import { CorrectionList } from "@/components/corrections/correction-list";
import { LevelBadge } from "@/components/ui/badge";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getTestCorrection } from "@/server/services/corrections";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "corrections" });
  return {
    title: t("testTitle"),
    description: t("indexSubtitle"),
    robots: { index: false, follow: false },
  };
}

export default async function TestCorrectionPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("corrections");
  const tt = await getTranslations("tests");

  const session = await auth();
  if (!session?.user) {
    redirect(
      `/fr/login?next=${encodeURIComponent(`/fr/corrections/${params.slug}`)}`,
    );
  }

  const test = await getTestCorrection(params.slug);
  if (!test) notFound();

  return (
    <div className="container space-y-10 py-12">
      <Link
        href="/corrections"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden />
        {t("backToList")}
      </Link>

      <header className="animate-fade-up space-y-4">
        <p className="eyebrow">{t("testTitle")}</p>
        <h1 className="text-3xl font-extrabold sm:text-4xl">{test.title}</h1>
        {test.description ? (
          <p className="max-w-3xl text-muted-foreground">{test.description}</p>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpenCheck className="size-4" aria-hidden />
            {tt("questionCount", { count: test.questionCount })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            {tt("duration", { minutes: test.durationMinutes })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="size-4" aria-hidden />
            {t("sectionCount", { count: test.sections.length })}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {test.levels.map((level) => (
            <LevelBadge key={level} level={level} size="sm" />
          ))}
        </div>

        <p className="max-w-2xl rounded-xl border border-border/70 bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
          {t("warning")}
        </p>
      </header>

      {test.sections.map((section) => (
        <section key={section.id} className="space-y-5">
          <div className="animate-fade-up space-y-1">
            <h2 className="text-xl font-bold">{section.title}</h2>
            <p className="text-sm text-muted-foreground">
              {tt("questionCount", { count: section.questions.length })} &middot;{" "}
              {tt("duration", { minutes: section.durationMinutes })}
            </p>
            {section.instructions ? (
              <p className="text-sm text-muted-foreground">{section.instructions}</p>
            ) : null}
          </div>

          <CorrectionList questions={section.questions} />
        </section>
      ))}
    </div>
  );
}
