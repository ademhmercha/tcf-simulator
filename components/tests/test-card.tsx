import { getTranslations } from "next-intl/server";
import { BookOpenCheck, Clock, FileQuestion, PlayCircle, Trophy } from "lucide-react";

import { StartTestDialog } from "@/components/tests/start-test-dialog";
import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { TestSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { startAttemptAction } from "@/server/actions/attempts";

/**
 * Carte de test. Rendue cote serveur : le bouton « Commencer » est un POST
 * vers `startAttemptAction`, qui cree (ou reprend) la tentative puis
 * redirige vers l'epreuve en cours.
 *
 * Trois etats :
 * - jamais passe : bouton « Commencer » uniquement ;
 * - en cours : bouton « Reprendre » ;
 * - termine : score, niveau CECRL et bouton « Refaire ».
 *
 * Le corrige (`/corrections/<slug>`) est toujours accessible, meme avant de
 * passer le test : les cartes ne revelent ni la reponse ni l'explication.
 */
export async function TestCard({
  test,
  compact = false,
  signedIn,
}: {
  test: TestSummary;
  compact?: boolean;
  signedIn: boolean;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("landing.testsPreview");
  const tt = await getTranslations("tests");
  const tc = await getTranslations("corrections");

  const finished = test.bestTotalScore !== null && test.bestMaxScore !== null;
  const inProgress = Boolean(test.inProgressAttemptId);

  const bestPercent =
    test.bestTotalScore !== null && test.bestMaxScore
      ? Math.round((test.bestTotalScore / test.bestMaxScore) * 100)
      : null;

  return (
    <Card className="flex h-full flex-col border-border/70 transition-shadow hover:shadow-medium">
      <CardContent className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Test {test.order}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug">{test.title}</h3>

        {test.description && !compact ? (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{test.description}</p>
        ) : null}

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <FileQuestion className="size-4" aria-hidden />
            {t("questionCount", { count: test.questionCount })}
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            {t("duration", { minutes: test.durationMinutes ?? 0 })}
          </li>
        </ul>

        {finished ? (
          <div className="mt-4 rounded-xl bg-surface p-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-semibold">
                <Trophy className="size-3.5 text-accent" aria-hidden />
                {t("bestScore")}
              </span>
              <span className="flex items-center gap-2 font-bold">
                <LevelBadge level={test.bestLevel ?? "A1"} size="sm" />
                {test.bestTotalScore}/{test.bestMaxScore} &middot; {bestPercent} %
              </span>
            </div>
            <Progress value={bestPercent ?? 0} className="mt-2 h-1.5" />
          </div>
        ) : null}

        <div className="mt-5 flex flex-col gap-2 pt-1">
          {inProgress ? (
            <Button asChild className="w-full" variant="accent">
              <Link href={`/tests/${test.slug}`}>{t("resume")}</Link>
            </Button>
          ) : finished ? (
            <StartTestDialog
              testId={test.id}
              size="sm"
              label={tt("redo")}
              className="w-full"
            />
          ) : signedIn ? (
            <form action={startAttemptAction}>
              <input type="hidden" name="testId" value={test.id} />
              <Button type="submit" className="w-full">
                <PlayCircle aria-hidden />
                {t("start")}
              </Button>
            </form>
          ) : (
            <Button asChild className="w-full">
              <Link href="/register">{t("start")}</Link>
            </Button>
          )}

          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link href={`/corrections/${test.slug}`}>
              <BookOpenCheck aria-hidden />
              {tc("viewCorrection")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}