import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { BookOpenCheck, ClipboardCheck } from "lucide-react";

import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppLocale } from "@/config/enums";
import { SCORE_BANDS } from "@/config/scoring";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getAttemptResult } from "@/server/services/attempts";

/** Libelle du palier suivant, pour « X points pour B2 ». */
function nextBandLevel(score: number): string {
  const band = SCORE_BANDS.find((b) => b.min > score);
  return band?.level ?? "-";
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Resultats", robots: { index: false, follow: false } };
}

export default async function ResultsPage({
  params,
}: {
  params: { locale: AppLocale; attemptId: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("results");
  const tc = await getTranslations("corrections");

  const session = await auth();
  if (!session?.user) {
    redirect(`/fr/login?next=${encodeURIComponent(`/fr/results/${params.attemptId}`)}`);
  }

  const result = await getAttemptResult(session.user.id, params.attemptId).catch(() => null);
  if (!result) notFound();

  // Une tentative encore en cours n'a pas de correction : on renvoie vers l'epreuve.
  if (result.status === "IN_PROGRESS") {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-extrabold">{t("stillInProgress")}</h1>
        <Button asChild className="mt-6">
          <Link href={result.testKind === "FULL" ? "/examens" : "/tests"}>
            {t("continueExam")}
          </Link>
        </Button>
      </div>
    );
  }

  const correctionHref =
    result.testKind === "FULL"
      ? `/examens/${result.testSlug}/corrige`
      : `/corrections/${result.testSlug}`;

  return (
    <div className="container max-w-4xl space-y-8 py-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{result.testTitle}</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t("title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {new Date(result.finishedAt ?? result.startedAt).toLocaleString("fr-FR")}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">{t("backToDashboard")}</Link>
          </Button>
          <Button asChild>
            <Link href={correctionHref}>
              <BookOpenCheck className="size-4" aria-hidden />
              {tc("viewCorrection")}
            </Link>
          </Button>
        </div>
      </header>

      <Card className="border-primary/25">
        <CardContent className="space-y-6 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ClipboardCheck className="size-5 text-primary" aria-hidden />
            {t("summary")}
          </h2>

          <div
            className={`grid gap-4 ${
              result.sections.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {result.sections.map((section) => (
              <div key={section.sectionId} className="rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {section.title}
                </p>
                <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">
                  {section.scaledScore}
                  <span className="text-base font-bold text-muted-foreground">/699</span>
                </p>
                {section.maxScore > 0 ? (
                  <Progress
                    value={(section.score / section.maxScore) * 100}
                    className="mt-3"
                  />
                ) : null}
                <p className="mt-2 text-xs text-muted-foreground">
                  {t("correctOutOf", { correct: section.correct, total: section.total })}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">{t("estimatedScore")}</p>
              <p className="mt-1 font-display text-4xl font-extrabold tabular-nums">
                {result.totalScore}
                <span className="text-lg text-muted-foreground">/{result.maxScore}</span>
              </p>
              <p className="mt-1 text-sm font-semibold text-primary">
                {Math.round(result.scorePercentage * 100)} %
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">{t("yourLevel")}</p>
              <div className="mt-2">
                {result.cefrLevel ? (
                  <LevelBadge level={result.cefrLevel} size="lg" />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">
                    {t("levelNotReached")}
                  </span>
                )}
              </div>
              {result.cefrLevel && result.missingToNextLevel > 0 ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("pointsToNext", {
                    count: result.missingToNextLevel,
                    level: nextBandLevel(result.totalScore),
                  })}
                </p>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
