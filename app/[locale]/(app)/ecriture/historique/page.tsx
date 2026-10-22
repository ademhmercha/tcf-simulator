import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import {
  getWritingProgress,
  listWritingAttempts,
  type WritingAttemptView,
} from "@/server/services/writing";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "writing" });
  return { title: t("history.title"), description: t("history.subtitle") };
}

function formatDuration(seconds: number | null): string {
  if (!seconds || seconds <= 0) return "—";
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes > 0 ? `${minutes} min ${String(rest).padStart(2, "0")} s` : `${rest} s`;
}

export default async function WritingHistoryPage({
  params,
}: {
  params: { locale: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("writing");
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/fr/login?next=${encodeURIComponent("/fr/ecriture/historique")}`);
  }

  const [attempts, progress] = await Promise.all([
    listWritingAttempts(session.user.id),
    getWritingProgress(session.user.id),
  ]);

  return (
    <div className="container space-y-8 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{t("history.title")}</h1>
        <p className="text-muted-foreground">{t("history.subtitle")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{t("progress.attempts")}</p>
            <p className="mt-1 text-2xl font-extrabold">{progress.attempts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{t("progress.average")}</p>
            <p className="mt-1 text-2xl font-extrabold">{progress.averageScore}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{t("progress.best")}</p>
            <p className="mt-1 text-2xl font-extrabold">{progress.bestScore}%</p>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-3">
        {attempts.length === 0 ? (
          <p className="text-muted-foreground">{t("history.empty")}</p>
        ) : (
          attempts.map((attempt: WritingAttemptView) => (
            <Card key={attempt.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <p className="font-semibold">{attempt.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(`task.${attempt.task}`)} • {attempt.level} •{" "}
                    {t(`theme.${attempt.theme}`)}
                  </p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t("history.words")}</p>
                    <p className="font-semibold">{attempt.wordCount ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("history.time")}</p>
                    <p className="font-semibold">{formatDuration(attempt.durationSeconds)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("history.score")}</p>
                    <p className="font-semibold">{attempt.selfScore ?? 0}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t("history.date")}</p>
                    <p className="font-semibold">
                      {attempt.finishedAt
                        ? attempt.finishedAt.toLocaleDateString("fr-FR")
                        : "—"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>

      <Link
        href="/ecriture"
        className="inline-flex text-sm font-semibold text-primary hover:underline"
      >
        {t("detail.back")}
      </Link>
    </div>
  );
}
