import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { AlertCircle, CheckCircle2, Clock, FileQuestion, Flag, Save, ShieldAlert } from "lucide-react";

import { StartTestDialog } from "@/components/tests/start-test-dialog";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDurationHuman } from "@/lib/time";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getAttemptHistory, getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tests" });
  return { title: `${t("listTitle")} - ${params.slug}` };
}

export default async function TestDetailPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("tests");

  const session = await auth();
  const userId = session?.user?.id;

  // `getPublishedTests` agrege les donnees de progression du candidat
  // (tentative en cours, meilleur score) : on l'utilise plutot que
  // `getTestBySlug`, qui ne renvoie que la fiche publique du test.
  const tests = await getPublishedTests(userId);
  const test = tests.find((item) => item.slug === params.slug);
  if (!test) notFound();

  const history = userId ? await getAttemptHistory(userId) : [];
  const attempts = history.filter((attempt) => attempt.testId === test.id);
  const inProgress = attempts.find((attempt) => attempt.status === "IN_PROGRESS") ?? null;

  return (
    <div className="container py-12">
      <nav aria-label="Fil dAriane" className="mb-6 text-sm text-muted-foreground">
        <Link href="/tests" className="hover:text-primary">
          {t("listTitle")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{test.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <header>
            <p className="eyebrow">Test {test.order}</p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">{test.title}</h1>
            {test.description ? (
              <p className="mt-4 leading-relaxed text-muted-foreground">{test.description}</p>
            ) : null}
          </header>

          <dl className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <FileQuestion className="size-5 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">{t("totalQuestions")}</dt>
                  <dd className="font-display text-lg font-bold">{test.questionCount}</dd>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <Clock className="size-5 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">{t("totalDuration")}</dt>
                  <dd className="font-display text-lg font-bold">
                    {test.durationMinutes
                      ? formatDurationHuman(test.durationMinutes * 60_000)
                      : "-"}
                  </dd>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-5">
                <CheckCircle2 className="size-5 text-primary" aria-hidden />
                <div>
                  <dt className="text-xs text-muted-foreground">{t("alreadyAttempted")}</dt>
                  <dd className="font-display text-lg font-bold">
                    {t("attemptCount", { count: attempts.length })}
                  </dd>
                </div>
              </CardContent>
            </Card>
          </dl>

          {test.bestTotalScore !== null && test.bestMaxScore ? (
            <p className="rounded-xl border border-success/40 bg-success/10 px-4 py-3 text-sm font-semibold text-success">
              {t("bestResult", {
                score: test.bestTotalScore,
                max: test.bestMaxScore,
                level: test.bestLevel ?? "-",
              })}
            </p>
          ) : null}

          <section aria-labelledby="epreuves">
            <h2 id="epreuves" className="text-xl font-bold">
              {t("sectionsTitle")}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {test.sections.map((section) => (
                <Card key={section.id}>
                  <CardContent className="p-5">
                    <h3 className="font-bold">{section.title}</h3>
                    {section.instructions ? (
                      <p className="mt-2 text-sm text-muted-foreground">{section.instructions}</p>
                    ) : null}
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center gap-1.5">
                        <FileQuestion className="size-4" aria-hidden />
                        {section.questionCount} questions
                      </li>
                      {section.documentCount > 0 ? (
                        <li className="flex items-center gap-1.5">
                          <FileQuestion className="size-4" aria-hidden />
                          {t("documentsCount", { count: section.documentCount })}
                        </li>
                      ) : null}
                    </ul>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="size-3.5 shrink-0" aria-hidden />
                      {t("sharedTimer", { minutes: test.durationMinutes })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section aria-labelledby="regles">
            <h2 id="regles" className="text-xl font-bold">
              {t("rulesTitle")}
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                { icon: Clock, text: t("rules.timer") },
                { icon: ShieldAlert, text: t("rules.auto") },
                { icon: AlertCircle, text: t("rules.one") },
                { icon: Flag, text: t("rules.flag") },
                { icon: Save, text: t("rules.save") },
                { icon: CheckCircle2, text: t("rules.honesty") },
              ].map((rule) => (
                <li key={rule.text} className="flex items-start gap-3 text-sm">
                  <rule.icon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span className="text-muted-foreground">{rule.text}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* --------------------------- Panneau lateral ------------------------- */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className={inProgress ? "border-accent/40" : "border-primary/25"}>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">
                {inProgress ? t("resumeAttempt") : t("start")}
              </h2>

              {inProgress ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  {test.inProgressRemainingMs
                    ? t("resumeHint", {
                        time: formatDurationHuman(test.inProgressRemainingMs),
                      })
                    : null}
                </p>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">{t("startConfirmBody")}</p>
              )}

              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {t("readyQuiet")}
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  {t("readyTime", { minutes: test.durationMinutes ?? 0 })}
                </li>
              </ul>

              <div className="mt-5">
                {userId ? (
                  <StartTestDialog
                    testId={test.id}
                    inProgress={Boolean(inProgress)}
                    size="lg"
                    className="w-full"
                  />
                ) : (
                  <Button asChild size="lg" className="w-full">
                    <Link href="/register">{t("start")}</Link>
                  </Button>
                )}
              </div>

              {attempts.length > 0 ? (
                <div className="mt-6 border-t border-border pt-4">
                  <h3 className="text-sm font-semibold">Historique</h3>
                  <ul className="mt-3 space-y-1">
                    {attempts.slice(0, 5).map((attempt) => (
                      <li key={attempt.id}>
                        <Link
                          href={`/results/${attempt.id}`}
                          className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                        >
                          <span className="text-muted-foreground">
                            {new Date(attempt.startedAt).toLocaleDateString("fr-FR")}
                          </span>
                          <span className="font-semibold">
                            {attempt.totalScore ?? "-"}/{attempt.maxScore ?? "-"}
                          </span>
                          {attempt.cefrLevel ? (
                            <LevelBadge level={attempt.cefrLevel} size="sm" />
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
