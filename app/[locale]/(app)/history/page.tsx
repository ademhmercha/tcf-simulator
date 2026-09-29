import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";

import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getAttemptHistory } from "@/server/services/attempts";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Historique" };
}

export default async function HistoryPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("history");

  const session = await auth();
  if (!session?.user) redirect(`/fr/login?next=${encodeURIComponent("/fr/history")}`);

  const history = await getAttemptHistory(session.user.id);

  // Moyennes par test, pour comparer les tentatives d'un meme epreuve.
  const byTest = new Map<string, { title: string; count: number; totalRatio: number }>();
  for (const attempt of history) {
    if (!attempt.maxScore) continue;
    const entry = byTest.get(attempt.testId) ?? {
      title: attempt.testTitle,
      count: 0,
      totalRatio: 0,
    };
    entry.count += 1;
    entry.totalRatio += (attempt.totalScore ?? 0) / attempt.maxScore;
    byTest.set(attempt.testId, entry);
  }

  return (
    <div className="container space-y-8 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </header>

      {history.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <CalendarDays className="size-8 text-muted-foreground" aria-hidden />
            <p className="font-semibold">{t("empty")}</p>
            <p className="text-sm text-muted-foreground">{t("emptyBody")}</p>
            <Button asChild>
              <Link href="/tests">{t("startTest")}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...byTest.entries()].map(([testId, entry]) => (
              <li key={testId}>
                <Card className="h-full">
                  <CardContent className="space-y-2 p-5">
                    <h2 className="font-display text-sm font-bold">{entry.title}</h2>
                    <p className="font-display text-2xl font-extrabold tabular-nums">
                      {Math.round((entry.totalRatio / entry.count) * 100)} %
                    </p>
                    <Progress value={(entry.totalRatio / entry.count) * 100} />
                    <p className="text-xs text-muted-foreground">
                      {t("attemptsCount", { count: entry.count })}
                    </p>                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <ul className="space-y-3">
            {history.map((attempt) => {
              const ratio =
                attempt.maxScore && attempt.maxScore > 0
                  ? ((attempt.totalScore ?? 0) / attempt.maxScore) * 100
                  : 0;

              return (
                <li key={attempt.id}>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="min-w-0 space-y-1">
                          <p className="truncate font-display font-bold">{attempt.testTitle}</p>
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="size-3.5" aria-hidden />
                              {new Date(attempt.startedAt).toLocaleDateString("fr-FR")}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3.5" aria-hidden />
                              {Math.floor(attempt.totalTimeSec / 60)} min
                            </span>
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                          {attempt.cefrLevel ? (
                            <LevelBadge level={attempt.cefrLevel} size="sm" />
                          ) : null}
                          <span className="font-display text-lg font-extrabold tabular-nums">
                            {attempt.totalScore ?? "-"}
                            <span className="text-sm text-muted-foreground">
                              /{attempt.maxScore ?? "-"}
                            </span>
                          </span>
                          <Button asChild size="sm" variant="ghost">
                            <Link href={`/results/${attempt.id}`}>{t("viewResults")}</Link>
                          </Button>
                        </div>
                      </div>

                      <Progress value={ratio} className="mt-4" />
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
