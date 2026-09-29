"use client";

import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";

import { formatDuration, type TimerPhase } from "@/lib/time";
import { cn } from "@/lib/utils";

const PHASE_STYLES: Record<TimerPhase, string> = {
  normal: "border-border bg-card text-foreground",
  warning: "border-warning/50 bg-warning/10 text-warning",
  critical: "border-destructive/50 bg-destructive/10 text-destructive animate-pulse",
  expired: "border-destructive bg-destructive text-destructive-foreground",
};

/**
 * Affichage du temps restant. Le composant ne decrementre rien lui-meme : il
 * recoit la valeur recalculee par le parent, de sorte qu'une seule horloge
 * pilote l'ensemble de l'interface.
 */
export function ExamTimer({
  remaining,
  phase,
}: {
  remaining: number;
  phase: TimerPhase;
}): React.JSX.Element {
  const t = useTranslations("exam");

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border px-4 py-2 font-display text-lg font-bold tabular-nums",
        PHASE_STYLES[phase],
      )}
      role="timer"
      aria-live={phase === "critical" || phase === "expired" ? "assertive" : "off"}
    >
      <Clock className="size-5" aria-hidden />
      <span className="sr-only">{t("timeRemaining")}</span>
      <span aria-hidden>{formatDuration(remaining)}</span>
    </div>
  );
}
