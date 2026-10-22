"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Pause, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Chronometre de l'expression ecrite.
 *
 * Le candidat ecrit sur papier : le chronometre ne fait que mesurer le temps
 * de redaction et alerte a la fin. Il ne declenche aucune note.
 */
export function WritingTimer({
  durationMin,
  onElapsedChange,
}: {
  durationMin: number;
  onElapsedChange?: (elapsedSeconds: number) => void;
}): React.JSX.Element {
  const t = useTranslations("writing.timer");
  const totalSeconds = Math.max(1, durationMin * 60);
  const [remaining, setRemaining] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    if (remaining <= 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => {
      setRemaining((previous) => {
        const next = previous <= 1 ? 0 : previous - 1;
        if (next === 0) setRunning(false);
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, remaining]);

  useEffect(() => {
    onElapsedChange?.(totalSeconds - remaining);
  }, [onElapsedChange, remaining, totalSeconds]);

  const elapsed = totalSeconds - remaining;
  const isOver = remaining === 0;
  const isLow = remaining <= 60 && !isOver;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-soft",
        isOver && "border-destructive/50 bg-destructive/5",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t("label")}
          </p>
          <p
            className={cn(
              "mt-1 font-mono text-4xl font-extrabold tabular-nums",
              (isLow || isOver) && "text-destructive",
            )}
            aria-live="polite"
          >
            {formatClock(remaining)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("elapsed")} : {formatClock(elapsed)}
          </p>
          {isOver ? (
            <p role="alert" className="mt-2 text-sm font-semibold text-destructive">
              {t("timeUp")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant={running ? "outline" : "default"} onClick={() => setRunning((value) => !value)}>
            {running ? (
              <>
                <Pause className="size-4" aria-hidden />
                {t("pause")}
              </>
            ) : (
              <>
                <Play className="size-4" aria-hidden />
                {remaining === totalSeconds ? t("start") : t("resume")}
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRunning(false);
              setRemaining(totalSeconds);
              deadlineRef.current = null;
            }}
          >
            <RotateCcw className="size-4" aria-hidden />
            {t("reset")}
          </Button>
        </div>
      </div>
    </div>
  );
}
