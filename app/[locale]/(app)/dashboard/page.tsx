import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { ArrowRight, Award, CheckCircle2, Clock, Sparkles, Target, TrendingUp } from "lucide-react";

import { StartTestDialog } from "@/components/tests/start-test-dialog";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getAttemptHistory, getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Tableau de bord" };
}

export default async function DashboardPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("dashboard");

  const session = await auth();
  if (!session?.user) redirect(`/fr/login?next=${encodeURIComponent("/fr/dashboard")}`);

  const [tests, history] = await Promise.all([
    getPublishedTests(session.user.id),
    getAttemptHistory(session.user.id),
  ]);

  const completed = history.filter((attempt) => attempt.status === "SUBMITTED");
  const inProgress = tests.find((test) => test.inProgressAttemptId);
  const last = completed[0];
  const firstName = session.user.name?.split(" ")[0] ?? "";

  const average = (() => {
    const scored = completed.filter((attempt) => attempt.maxScore);
    if (scored.length === 0) return null;
    const total = scored.reduce(
      (sum, attempt) => sum + ((attempt.totalScore ?? 0) / (attempt.maxScore ?? 1)) * 100,
      0,
    );
    return Math.round(total / scored.length);
  })();

  const best = completed
    .filter((attempt) => attempt.totalScore !== null)
    .reduce<number | null>(
      (max, attempt) => (max === null ? attempt.totalScore : Math.max(max, attempt.totalScore ?? 0)),
      null,
    );

  const totalTimeSec = history.reduce((sum, attempt) => sum + attempt.totalTimeSec, 0);
  const accuracy = (() => {
    if (completed.length === 0) return null;
    const points = completed.reduce((sum, attempt) => sum + (attempt.totalScore ?? 0), 0);
    const max = completed.reduce((sum, attempt) => sum + (attempt.maxScore ?? 0), 0);
    return max > 0 ? Math.round((points / max) * 100) : null;
  })();

  const recommendations = buildRecommendations(accuracy, history.length, {
    start: t("startTest"),
    noAttemptsHint: t("noAttemptsHint"),
    available: t("availableTests"),
    availableSub: t("availableTestsSub"),
    compare: t("compare"),
    noData: t("noData"),
    strengths: t("strengths"),
    strengthsSub: t("recommendationsSub"),
    weaknesses: t("weaknesses"),
    spendMoreTime: t("noRecommendations"),
    recommendationsSub: t("recommendationsSub"),
  });

  return (
    <div className="container space-y-10 py-12">
      {/* ----------------------------- Accueil ----------------------------- */}
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          {firstName ? t("greeting", { name: firstName }) : t("greeting", { name: "" })}
        </h1>
        <p className="text-muted-foreground">{t("greetingSub")}</p>
      </header>

      {/* --------------------- Tentative en cours ------------------------- */}
      {inProgress ? (
        <Card className="border-accent/40 bg-accent/5">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div>
              <h2 className="font-display text-lg font-bold">{t("inProgress")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{inProgress.title}</p>
            </div>
            <StartTestDialog
              testId={inProgress.id}
              inProgress
              size="lg"
              className="whitespace-nowrap"
            />
          </CardContent>
        </Card>
      ) : null}

      {/* -------------------------- Statistiques -------------------------- */}
      <section aria-label={t("statsCompleted")}>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={CheckCircle2}
            label={t("statsCompleted")}
            value={String(completed.length)}
          />
          <StatCard
            icon={Award}
            label={t("statsLastScore")}
            value={
              last && last.maxScore ? `${last.totalScore}/${last.maxScore}` : "-"
            }
            hint={last?.cefrLevel ? <LevelBadge level={last.cefrLevel} size="sm" /> : null}
          />
          <StatCard
            icon={Target}
            label={t("accuracy")}
            value={accuracy === null ? "-" : `${accuracy} %`}
            hint={average !== null ? `${t("averageScore")} : ${average} %` : null}
          />
          <StatCard
            icon={Clock}
            label={t("totalTime")}
            value={`${Math.floor(totalTimeSec / 3600)} h`}
            hint={best !== null ? `${t("bestScore")} : ${best}` : null}
          />
        </dl>
      </section>

      {/* ------------------------ Progression ---------------------------- */}
      {completed.length > 0 ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{t("progression")}</h2>
            <p className="text-sm text-muted-foreground">{t("progressionSub")}</p>
          </div>

          <Card>
            <CardContent className="p-5">
              <ul className="space-y-3">
                {completed.slice(0, 8).reverse().map((attempt) => {
                  const previous = completed[completed.indexOf(attempt) + 1];
                  const currentRatio = attempt.maxScore
                    ? (attempt.totalScore ?? 0) / attempt.maxScore
                    : 0;
                  const previousRatio =
                    previous && previous.maxScore
                      ? (previous.totalScore ?? 0) / previous.maxScore
                      : null;
                  const delta =
                    previousRatio === null
                      ? null
                      : Math.round((currentRatio - previousRatio) * 100);

                  return (
                    <li key={attempt.id} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <Link
                          href={`/results/${attempt.id}`}
                          className="truncate font-medium hover:text-primary"
                        >
                          {attempt.testTitle}
                        </Link>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="tabular-nums text-muted-foreground">
                            {attempt.totalScore}/{attempt.maxScore}
                          </span>
                          {delta !== null ? (
                            <span
                              className={
                                delta >= 0
                                  ? "text-xs font-semibold text-success"
                                  : "text-xs font-semibold text-destructive"
                              }
                            >
                              {delta >= 0 ? "+" : ""}
                              {delta} %
                            </span>
                          ) : null}
                        </span>
                      </div>
                      <Progress value={currentRatio * 100} />
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </section>
      ) : null}

      {/* --------------------- Tests disponibles ------------------------- */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{t("availableTests")}</h2>
            <p className="text-sm text-muted-foreground">{t("availableTestsSub")}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href="/tests">
              {t("viewHistory")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {tests.map((test) => (
            <li key={test.id}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-bold">{test.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {test.levels.map((level) => (
                        <LevelBadge key={level} level={level} size="sm" />
                      ))}
                    </div>
                  </div>

                  <dl className="flex gap-4 text-xs text-muted-foreground">
                    <div>
                      <dt>{t("attempts")}</dt>
                      <dd className="font-semibold text-foreground">{test.attemptCount}</dd>
                    </div>
                    {test.bestTotalScore !== null ? (
                      <div>
                        <dt>{t("bestScore")}</dt>
                        <dd className="font-semibold text-foreground">
                          {test.bestTotalScore}/{test.bestMaxScore}
                        </dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <StartTestDialog
                      testId={test.id}
                      inProgress={Boolean(test.inProgressAttemptId)}
                      size="sm"
                    />
                    {test.bestTotalScore !== null ? (
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/results/${test.bestAttemptId ?? ""}`}>
                          {t("viewResults")}
                        </Link>
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* --------------------- Tentatives recentes ----------------------- */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">{t("recentAttempts")}</h2>
          {history.length > 0 ? (
            <Button asChild variant="ghost" size="sm">
              <Link href="/history">{t("viewHistory")}</Link>
            </Button>
          ) : null}
        </div>

        {history.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
              <Sparkles className="size-8 text-primary" aria-hidden />
              <p className="font-semibold">{t("noAttempts")}</p>
              <p className="text-sm text-muted-foreground">{t("noAttemptsHint")}</p>
              <Button asChild>
                <Link href="/tests">{t("startTest")}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {history.slice(0, 6).map((attempt) => (
                  <li key={attempt.id}>
                    <Link
                      href={`/results/${attempt.id}`}
                      className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{attempt.testTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attempt.startedAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        {attempt.cefrLevel ? (
                          <LevelBadge level={attempt.cefrLevel} size="sm" />
                        ) : null}
                        <span className="font-display font-bold tabular-nums">
                          {attempt.totalScore ?? "-"}/{attempt.maxScore ?? "-"}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </section>

      {/* ---------------------- Recommandations ------------------------- */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="size-5 text-primary" aria-hidden />
          {t("recommendations")}
        </h2>

        <ul className="grid gap-3 md:grid-cols-3">
          {recommendations.map((item) => (
            <li key={item.title}>
              <Card className="h-full border-border/70">
                <CardContent className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Award;
  label: string;
  value: string;
  hint?: React.ReactNode;
}): React.JSX.Element {
  return (
    <Card>
      <CardContent className="space-y-1 p-5">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className="size-3.5" aria-hidden />
          {label}
        </p>
        <p className="font-display text-2xl font-extrabold tabular-nums">{value}</p>
        {hint ? <div className="text-xs text-muted-foreground">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}

/** Conseils generiques derives des performances, sans montant de seuil fige. */
function buildRecommendations(
  accuracy: number | null,
  attempts: number,
  labels: {
    start: string;
    noAttemptsHint: string;
    available: string;
    availableSub: string;
    compare: string;
    noData: string;
    strengths: string;
    strengthsSub: string;
    weaknesses: string;
    spendMoreTime: string;
    recommendationsSub: string;
  },
): Array<{ title: string; body: string }> {
  if (attempts === 0) {
    return [
      { title: labels.start, body: labels.noAttemptsHint },
      { title: labels.available, body: labels.availableSub },
      { title: labels.compare, body: labels.noData },
    ];
  }

  return [
    {
      title: labels.strengths,
      body:
        accuracy !== null && accuracy >= 70 ? labels.strengthsSub : labels.recommendationsSub,
    },
    {
      title: labels.weaknesses,
      body: accuracy !== null && accuracy < 50 ? labels.spendMoreTime : labels.recommendationsSub,
    },
    { title: labels.compare, body: labels.recommendationsSub },
  ];
}
