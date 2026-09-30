import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";
import { Award, BookOpenCheck, ClipboardCheck, Clock, Flag, Target } from "lucide-react";

import { PrintButton } from "@/components/results/print-button";
import { RetakeFullButton, RetakeMistakesButton } from "@/components/results/retake-buttons";
import { ReviewList } from "@/components/results/review-list";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppLocale } from "@/config/enums";
import { SCORE_BANDS } from "@/config/scoring";
import { examConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { SECOND, formatDuration } from "@/lib/time";
import { auth } from "@/server/auth";
import { countMistakes, getAttemptResult } from "@/server/services/attempts";

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
  if (!session?.user) redirect(`/fr/login?next=${encodeURIComponent(`/fr/results/${params.attemptId}`)}`);

  const result = await getAttemptResult(session.user.id, params.attemptId).catch(() => null);
  if (!result) notFound();

  // Une tentative encore en cours n'a pas de correction : on renvoie vers l'epreuve.
  if (result.status === "IN_PROGRESS") {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-extrabold">{t("stillInProgress")}</h1>
        <Button asChild className="mt-6">
          <Link href="/tests">{t("continueExam")}</Link>
        </Button>
      </div>
    );
  }

  const mistakes = await countMistakes(session.user.id, result.attemptId);

  const budgetSec = examConfig.totalDurationMinutes * 60;
  const elapsedSec = Math.round(
    (Date.parse(result.finishedAt ?? result.startedAt) - Date.parse(result.startedAt)) / SECOND,
  );
  // Le chronometre est global : une tentative remontee plus tard que l'echeance
  // est plafonnee, sinon l'ecart d'affichage depasserait le budget.
  const usedSec = Math.max(0, Math.min(budgetSec, elapsedSec));

  const parts = [
    {
      key: "languageMastery",
      correct: result.structureCorrect ?? 0,
      total: result.structureTotal ?? 0,
    },
    {
      key: "writtenComprehension",
      correct: result.comprehensionCorrect ?? 0,
      total: result.comprehensionTotal ?? 0,
    },
  ];

  // « Points forts » et « A retravailler » se lisent sur les THEMES, jamais sur
  // les niveaux CECRL : afficher un niveau par question revelerait la
  // difficulte du contenu.
  const strengths = result.byCategory.filter((stat) => stat.ratio >= 0.7);
  const weaknesses = result.byCategory.filter((stat) => stat.ratio < 0.5);

  return (
    <div className="container space-y-10 py-12">
      {/* ----------------------------- Score ----------------------------- */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
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
            <RetakeMistakesButton attemptId={result.attemptId} mistakesCount={mistakes} />
            <Button asChild variant="ghost">
              <Link href={`/corrections/${result.testSlug}`}>
                <BookOpenCheck className="size-4" aria-hidden />
                {tc("viewCorrection")}
              </Link>
            </Button>
            <RetakeFullButton testId={result.testId} />
            <PrintButton />
          </div>
        </div>

        <Card className="border-primary/25">
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <h2 className="flex items-center gap-2 text-lg font-bold sm:col-span-2">
                <ClipboardCheck className="size-5 text-primary" aria-hidden />
                {t("summary")}
              </h2>

              {parts.map((part) => (
                <div key={part.key} className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-xs text-muted-foreground">{t(part.key)}</p>
                  <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">
                    {part.correct}
                    <span className="text-base font-bold text-muted-foreground">
                      /{part.total}
                    </span>
                  </p>
                  {part.total > 0 ? (
                    <Progress value={(part.correct / part.total) * 100} className="mt-2" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="grid gap-5 border-t pt-6 sm:grid-cols-3">
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

              <div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden />
                  {t("timeUsed")}
                </p>
                <p className="mt-1 font-display text-2xl font-bold tabular-nums">
                  {formatDuration(usedSec * SECOND)}
                  <span className="text-base text-muted-foreground">
                    /{formatDuration(budgetSec * SECOND)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("avgTime")} : {Math.round(result.avgTimeSec)} s
                </p>
              </div>
            </div>

            <p className="rounded-lg bg-muted/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
              {t("disclaimer")}
            </p>
          </CardContent>
        </Card>
      </header>

      {/* ----------------------- Details par epreuve ---------------------- */}
      <section className="grid gap-4 md:grid-cols-2">
        {result.sections.map((section) => (
          <Card key={section.sectionId}>
            <CardContent className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold">{section.title}</h2>
                {section.maxScore > 0 ? (
                  <span className="text-sm font-semibold text-primary">
                    {Math.round(section.ratio * 100)} %
                  </span>
                ) : null}
              </div>

              <p className="font-display text-2xl font-extrabold tabular-nums">
                {section.correct}
                <span className="text-sm text-muted-foreground">/{section.total}</span>
              </p>

              <Progress
                value={section.maxScore > 0 ? (section.score / section.maxScore) * 100 : 0}
              />

              <dl className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>
                  <dt>{t("correct")}</dt>
                  <dd className="font-semibold text-success">{section.correct}</dd>
                </div>
                <div>
                  <dt>{t("answered")}</dt>
                  <dd className="font-semibold">
                    {section.answered}/{section.total}
                  </dd>
                </div>
                <div>
                  <dt>{t("flagged")}</dt>
                  <dd className="font-semibold text-warning">{section.flagged}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* ------------------------- Par categorie ------------------------- */}
      {result.byCategory.length > 0 ? (
        <section className="space-y-4">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Target className="size-5 text-primary" aria-hidden />
            {t("byCategory")}
          </h2>

          <Card>
            <CardContent className="space-y-3 p-5">
              {result.byCategory.map((stat) => (
                <div key={stat.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stat.category}</span>
                    <span className="text-muted-foreground">
                      {stat.correct}/{stat.total}
                    </span>
                  </div>
                  <Progress value={stat.ratio} />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      ) : null}

      {/* --------------------------- Analyse --------------------------- */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="space-y-2 p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Award className="size-4 text-success" aria-hidden />
              {t("strengths")}
            </h2>
            {strengths.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {strengths.map((stat) => (
                  <li key={stat.category} className="flex items-center justify-between gap-2">
                    <span className="truncate">{stat.category}</span>
                    <span className="shrink-0 text-muted-foreground">
                      {Math.round(stat.ratio)} %
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t("noResults")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Target className="size-4 text-destructive" aria-hidden />
              {t("weaknesses")}
            </h2>
            {weaknesses.length > 0 ? (
              <ul className="space-y-1 text-sm">
                {weaknesses.map((stat) => (
                  <li key={stat.category} className="flex items-center justify-between gap-2">
                    <span className="truncate">{stat.category}</span>
                    <span className="shrink-0 text-muted-foreground">
                      {Math.round(stat.ratio)} %
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t("noResults")}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-2 p-5">
            <h2 className="flex items-center gap-2 font-bold">
              <Flag className="size-4 text-warning" aria-hidden />
              {t("slowestQuestions")}
            </h2>
            {result.slowest.length > 0 ? (
              <ol className="space-y-1 text-sm">
                {result.slowest.map((question) => (
                  <li key={question.id} className="flex items-center justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      {t("reviewTitle")} {question.number}
                    </span>
                    <span className="shrink-0 font-semibold">
                      {Math.round((question.timeSpentSec ?? 0) / 60)} min
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-muted-foreground">{t("noResults")}</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* -------------------------- Correction -------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{t("reviewTitle")}</h2>
          <p className="text-sm text-muted-foreground">{t("reviewSub")}</p>
        </div>
        <ReviewList questions={result.review} />
      </section>
    </div>
  );
}
