import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { BookOpenCheck, Clock, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getCorrectionsIndex } from "@/server/services/corrections";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "corrections" });
  return {
    title: t("indexTitle"),
    description: t("indexSubtitle"),
    robots: { index: false, follow: false },
  };
}

export default async function CorrectionsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("corrections");
  const tt = await getTranslations("tests");

  const session = await auth();
  if (!session?.user) {
    redirect(`/fr/login?next=${encodeURIComponent("/fr/corrections")}`);
  }

  const tests = await getCorrectionsIndex(session.user.id);

  return (
    <div className="container py-12">
      <header className="animate-fade-up mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("indexEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("indexTitle")}</h1>
        <p className="mt-4 text-muted-foreground">{t("indexSubtitle")}</p>
      </header>

      {tests.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">{t("empty")}</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tests.map((test, index) => (
            <Card
              key={test.id}
              className="animate-fade-up border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h2 className="font-display text-lg font-bold">{test.title}</h2>
                  {test.description ? (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {test.description}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpenCheck className="size-3.5" aria-hidden />
                    {tt("questionCount", { count: test.questionCount })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5" aria-hidden />
                    {tt("duration", { minutes: test.durationMinutes })}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FileText className="size-3.5" aria-hidden />
                    {t("sectionCount", { count: test.sectionCount })}
                  </span>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                  <Button asChild size="sm">
                    <Link href={`/corrections/${test.slug}`}>{t("viewCorrection")}</Link>
                  </Button>
                  {test.attemptCount > 0 ? (
                    <span className="text-xs text-muted-foreground">
                      {t("alreadyAttempted", { count: test.attemptCount })}
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
