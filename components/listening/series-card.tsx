import { getTranslations } from "next-intl/server";
import { Headphones, PlayCircle, RotateCcw, Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelBadge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

export interface SeriesCardData {
  id: string;
  slug: string;
  title: string;
  level: string;
  description: string | null;
  questionCount: number;
  listenings: number;
  bestScore: number | null;
  maxScore: number | null;
  bestResultId: string | null;
}

interface SeriesCardProps {
  serie: SeriesCardData;
  signedIn: boolean;
}

/**
 * Carte d'une serie de comprehension orale : niveau, volume de questions et
 * etat de la serie pour l'utilisateur.
 *
 * - jamais commencee : bouton « Commencer » uniquement (aucun corrige, pour ne
 *   pas reveler les reponses avant d'avoir tente) ;
 * - terminee : meilleur score, boutons « Refaire » et « Voir le corrige ».
 */
export async function SeriesCard({
  serie,
  signedIn,
}: SeriesCardProps): Promise<React.JSX.Element> {
  const t = await getTranslations("co");

  const palette = serie.level;
  // Les palettes melangees ("B1-B2") n'ont pas de couleur CSS : on repart sur
  // le premier niveau pour la pastille et le compteur de questions.
  const colorKey = serie.level.split("-")[0]?.toLowerCase() ?? "b1";
  const done = serie.bestScore !== null && serie.maxScore !== null;
  const sessionHref = `/comprehension-orale/${serie.slug}`;
  const correctionHref =
    serie.bestResultId !== null
      ? `/comprehension-orale/${serie.slug}/correction?result=${serie.bestResultId}`
      : sessionHref;

  return (
    <Card className="flex h-full flex-col border-border/70 transition-all duration-200 hover:border-primary/40 hover:shadow-medium">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <LevelBadge size="sm" level={palette} className="gap-1">
            <Headphones className="-ml-0.5 h-3 w-3" aria-hidden />
          </LevelBadge>
          <span
            className="shrink-0 rounded-full border-transparent bg-primary/5 px-2 py-0.5 text-xs font-semibold"
            style={{ color: `hsl(var(--level-${colorKey}) / 1)` }}
          >
            {serie.questionCount} {t("questions")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CardTitle>{serie.title}</CardTitle>
        {serie.description ? (
          <p className="mt-2 text-sm text-muted-foreground">{serie.description}</p>
        ) : null}

        <p className="mt-3 text-xs font-medium text-muted-foreground">
          {serie.listenings === 1 ? t("listenOnce") : `${serie.listenings} ${t("listeningsLabel")}`}
        </p>

        <div className="mt-auto pt-4">
          {done ? (
            <>
              <div className="rounded-xl bg-surface p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Trophy className="size-3.5 text-accent" aria-hidden />
                    {t("bestScore")}
                  </span>
                  <span className="font-bold tabular-nums">
                    {serie.bestScore}/{serie.maxScore}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <Button asChild size="sm" className="w-full">
                  <Link href={sessionHref}>
                    <RotateCcw aria-hidden />
                    {t("redo")}
                  </Link>
                </Button>
                <Button asChild size="sm" variant="ghost" className="w-full">
                  <Link href={correctionHref}>{t("viewCorrection")}</Link>
                </Button>
              </div>
            </>
          ) : (
            <Button asChild size="sm" className="w-full">
              <Link href={signedIn ? sessionHref : "/register"}>
                <PlayCircle aria-hidden />
                {t("start")}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}