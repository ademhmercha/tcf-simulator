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
      <CardContent className="flex flex-col gap-3 p-3 sm:p-4 lg:flex-row lg:items-center lg:gap-4">
        <div className="flex flex-1 items-start gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-2xl bg-primary font-display text-sm font-extrabold text-primary-foreground">
            {test.order}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("eyebrow")}
            </p>
            <h2 className="mt-0.5 text-base font-bold leading-tight">{test.title}</h2>

            <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <FileQuestion className="size-4" aria-hidden />
                {tt("questionCount", { count: test.questionCount })}
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {tt("duration", { minutes: test.durationMinutes ?? 0 })}
              </li>
            </ul>

            <div className="mt-2 flex flex-wrap gap-2">
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
            <div className="flex h-full flex-col rounded-2xl border border-primary/20 bg-primary/5 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("bestResult")}
                  </p>
                  <p className="mt-0.5 font-display text-2xl font-extrabold tabular-nums">
                    {test.bestTotalScore}
                    <span className="text-base font-bold text-muted-foreground">
                      /{test.bestMaxScore}
                    </span>
                  </p>
                </div>
                {test.bestLevel ? <LevelBadge level={test.bestLevel} size="lg" /> : null}
              </div>

              <Progress value={bestPercent} className="mt-2 h-1.5" />

              {test.bestSections.length > 0 ? (
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  {test.bestSections.map((section: TestSectionResult) => (
                    <div
                      key={section.type}
                      className="rounded-lg bg-background/70 px-1 py-1.5 text-center"
                    >
                      <p className="text-[0.625rem] font-semibold uppercase leading-tight text-muted-foreground">
                        {sectionLabel(section.type)}
                      </p>
                      <p className="mt-0.5 font-display text-base font-bold tabular-nums">
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
            <div className="flex h-full min-h-20 flex-col justify-center rounded-2xl border border-dashed bg-muted/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {inProgress ? t("inProgress") : t("notStarted")}
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {inProgress ? t("inProgressHint") : t("notStartedHint")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
