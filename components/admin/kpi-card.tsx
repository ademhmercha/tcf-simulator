import type { LucideIcon } from "lucide-react";

import { Badge, LevelBadge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * Tuile d'indicateur du tableau de bord admin.
 *
 * Composant serveur : aucun etat, aucune dependance client. Le `hint` accepte
 * du JSX pour les badges de niveau ou les mini-barres, ce qui evite de dupliquer
 * la mise en page pour chaque indicateur.
 */
export function KpiCard({
  icon: Icon,
  label,
  value,
  hint,
  level,
  ratio,
  delay = 0,
  className,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  /** Badge de niveau CECRL affiche sous la valeur. */
  level?: string | null;
  /** Progression 0-100 : affichee en mini-barre sous la valeur. */
  ratio?: number | null;
  delay?: number;
  className?: string;
}): React.JSX.Element {
  return (
    <Card
      className={cn("animate-fade-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="space-y-1.5 p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Icon className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{label}</span>
        </p>

        <p className="font-display text-2xl font-extrabold tabular-nums">{value}</p>

        {typeof ratio === "number" && Number.isFinite(ratio) ? (
          <Progress
            className="h-1.5"
            value={Math.max(0, Math.min(100, ratio))}
            label={`${Math.round(ratio)} %`}
          />
        ) : null}

        {level ? <LevelBadge level={level} size="sm" /> : null}
        {hint && !level ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}

/** Petit compteur utilise dans les en-tetes de section. */
export function CountBadge({ value, className }: { value: number; className?: string }): React.JSX.Element {
  return (
    <Badge variant="secondary" className={className}>
      {value}
    </Badge>
  );
}