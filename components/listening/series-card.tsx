import { Headphones } from "lucide-react";

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
}

interface SeriesCardProps {
  serie: SeriesCardData;
}

/**
 * Carte d'une serie de comprehension orale : niveau, volume de questions et
 * meilleur score de l'utilisateur. Clique sur l'ensemble de la carte.
 */
export function SeriesCard({ serie }: SeriesCardProps): React.JSX.Element {
  const palette = serie.level;
  // Les palettes melangees ("B1-B2") n'ont pas de couleur CSS : on repart sur
  // le premier niveau pour la pastille et le compteur de questions.
  const colorKey = serie.level.split("-")[0]?.toLowerCase() ?? "b1";

  return (
    <Link href={`/comprehension-orale/${serie.slug}`} className="group block">
      <Card className="h-full transition-all duration-200 hover:border-primary/40 hover:shadow-medium">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <LevelBadge size="sm" level={palette} className="gap-1">
              <Headphones className="-ml-0.5 h-3 w-3" aria-hidden />
            </LevelBadge>
            <span
              className="shrink-0 rounded-full border-transparent bg-primary/5 px-2 py-0.5 text-xs font-semibold"
              style={{ color: `hsl(var(--level-${colorKey}) / 1)` }}
            >
              {serie.questionCount} questions
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="group-hover:text-primary transition-colors">
            {serie.title}
          </CardTitle>
          {serie.description ? (
            <p className="mt-2 text-sm text-muted-foreground">{serie.description}</p>
          ) : null}
          <p className="mt-4 text-xs font-medium text-muted-foreground">
            {serie.listenings === 1 ? "Une seule écoute" : `${serie.listenings} écoutes`} ·
            {serie.bestScore === null
              ? " pas encore commencée"
              : ` meilleur score ${serie.bestScore} / ${serie.maxScore ?? "?"}`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}