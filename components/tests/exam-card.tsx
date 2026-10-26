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
      <CardContent className="flex h-20 flex-col justify-center gap-2 p-2 sm:p-2 lg:flex-row lg:items-center lg:gap-3">
        <div className="flex flex-1 items-center gap-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary font-display text-xs font-extrabold text-primary-foreground">
            {test.order}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                {t("eyebrow")}
              </p>
              <h2 className="text-sm font-bold leading-none">{test.title}</h2>
              <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileQuestion className="size-3.5" aria-hidden />
                  {tt("questionCount", { count: test.questionCount })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" aria-hidden />
                  {tt("duration", { minutes: test.durationMinutes ?? 0 })}
                </span>
              </div>
            </div>

            <div className="mt-1 flex flex-wrap gap-1">
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

        <div className="shrink-0 lg:h-16 lg:w-64 xl:w-72">
          {finished ? (
            <div className="flex h-full items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1.5">
              <div className="flex items-center gap-2">
                <p className="font-display text-xl font-extrabold tabular-nums">
                  {test.bestTotalScore}
                  <span className="text-xs font-bold text-muted-foreground">
                    /{test.bestMaxScore}
                  </span>
                </p>
                {test.bestLevel ? <LevelBadge level={test.bestLevel} size="sm" /> : null}
              </div>
              {test.bestSections.length > 0 ? (
                <div className="flex items-center gap-2">
                  {test.bestSections.map((section: TestSectionResult) => (
                    <div key={section.type} className="text-center">
                      <p className="text-[0.6rem] uppercase leading-none text-muted-foreground">
                        {sectionLabel(section.type).slice(0, 4)}
                      </p>
                      <p className="text-xs font-bold tabular-nums leading-tight">
                        {section.scaledScore}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="flex h-full items-center rounded-lg border border-dashed bg-muted/20 px-2.5 py-1.5">
              <p className="text-xs text-muted-foreground">
                {inProgress ? t("inProgressHint") : t("notStartedHint")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
