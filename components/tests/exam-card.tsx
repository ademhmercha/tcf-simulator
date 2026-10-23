import { getTranslations } from "next-intl/server";
import {
  BookOpenCheck,
  Clock,
  FileQuestion,
  PlayCircle,
  Trophy,
} from "lucide-react";

import { StartTestDialog } from "@/components/tests/start-test-dialog";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { SectionType } from "@/config/enums";
import type { TestSectionResult, TestSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { startAttemptAction } from "@/server/actions/attempts";

/**
 * Carte verticale d'un examen blanc.
 *
 * Elle affiche, a droite, les notes de la meilleure tentative terminee : score
 * global sur 699, niveau CECRL et detail des trois epreuves. Tant qu'aucune
 * tentative n'est terminee, la zone reste un emplacement vide explicite.
 */
export async function ExamCard({
  test,
  signedIn,
}: {
  test: TestSummary;
  signedIn: boolean;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("exams");
  const tt = await getTranslations("tests");
  const tr = await getTranslations("results");
  const tc = await getTranslations("corrections");

  const finished = test.bestTotalScore !== null && test.bestMaxScore !== null;
  const inProgress = Boolean(test.inProgressAttemptId);
  const detailHref = `/examens/${test.slug}`;
  const correctionHref = `/examens/${test.slug}/corrige`;
  const bestPercent =
    test.bestTotalScore !== null && test.bestMaxScore
      ? Math.round((test.bestTotalScore / test.bestMaxScore) * 100)
      : 0;

  const sectionLabel = (type: SectionType): string => {
    if (type === "COMPREHENSION_ORALE") return tr("listening");
    if (type === "STRUCTURE") return tr("languageMastery");
    return tr("writtenComprehension");
  };

  return (
    <Card className="border-border/70 transition-shadow hover:shadow-medium">
      <CardContent className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-stretch">
        <div className="flex flex-1 items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary font-display text-lg font-extrabold text-primary-foreground">
            {test.order}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-1 text-xl font-extrabold leading-snug">{test.title}</h2>

            {test.description ? (
              <p className="mt-2 text-sm text-muted-foreground">{test.description}</p>
            ) : null}

            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <FileQuestion className="size-4" aria-hidden />
                {tt("questionCount", { count: test.questionCount })}
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {tt("duration", { minutes: test.durationMinutes ?? 0 })}
              </li>
              <li className="flex items-center gap-1.5">
                <Trophy className="size-4" aria-hidden />
                {t("attemptCount", { count: test.attemptCount })}
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {inProgress ? (
                <Button asChild>
                  <Link href={detailHref}>
                    <PlayCircle aria-hidden />
                    {t("resumeExam")}
                  </Link>
                </Button>
              ) : finished ? (
                <>
                  <Button asChild>
                    <Link href={`/results/${test.bestAttemptId ?? ""}`}>
                      {t("viewResult")}
                    </Link>
                  </Button>
                  <StartTestDialog
                    testId={test.id}
                    size="sm"
                    label={t("redoExam")}
                  />
                </>
              ) : signedIn ? (
                <form action={startAttemptAction}>
                  <input type="hidden" name="testId" value={test.id} />
                  <Button type="submit">
                    <PlayCircle aria-hidden />
                    {t("startExam")}
                  </Button>
                </form>
              ) : (
                <Button asChild>
                  <Link href="/register">{t("startExam")}</Link>
                </Button>
              )}

              <Button asChild variant="ghost" size="sm">
                <Link href={correctionHref}>
                  <BookOpenCheck aria-hidden />
                  {tc("viewCorrection")}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="shrink-0 lg:w-72 xl:w-80">
          {finished ? (
            <div className="flex h-full flex-col rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("bestResult")}
                  </p>
                  <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">
                    {test.bestTotalScore}
                    <span className="text-base font-bold text-muted-foreground">
                      /{test.bestMaxScore}
                    </span>
                  </p>
                </div>
                {test.bestLevel ? <LevelBadge level={test.bestLevel} size="lg" /> : null}
              </div>

              <Progress value={bestPercent} className="mt-3 h-1.5" />

              {test.bestSections.length > 0 ? (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {test.bestSections.map((section: TestSectionResult) => (
                    <div
                      key={section.type}
                      className="rounded-lg bg-background/70 px-1.5 py-2 text-center"
                    >
                      <p className="text-[0.625rem] font-semibold uppercase leading-tight text-muted-foreground">
                        {sectionLabel(section.type)}
                      </p>
                      <p className="mt-1 font-display text-lg font-bold tabular-nums">
                        {section.scaledScore}
                      </p>
                      <p className="text-[0.625rem] text-muted-foreground">
                        {section.correct}/{section.total}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-full min-h-28 flex-col justify-center rounded-2xl border border-dashed bg-muted/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {inProgress ? t("inProgress") : t("notStarted")}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {inProgress ? t("inProgressHint") : t("notStartedHint")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
