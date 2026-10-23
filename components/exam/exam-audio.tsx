"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2, Headphones, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type AudioState = "idle" | "playing" | "ended" | "error";

/**
 * Lecteur de comprehension orale : UNE SEULE ecoute.
 *
 * Le lecteur natif n'est jamais affiche (`controls` absent) : sans barre de
 * progression cliquable, le candidat ne peut ni revenir en arriere, ni mettre
 * en pause, ni relancer la piste. L'etat « deja ecoute » est conserve en
 * `sessionStorage` pour qu'un rechargement de page ne rouvre pas l'ecoute.
 *
 * Cette protection reste cote client : elle decourage la reecoute, elle ne
 * peut pas la rendre impossible techniquement (le fichier audio est public).
 */
export function ExamAudio({
  src,
  audioKey,
  className,
}: {
  src: string;
  /** Cle stable (tentative + question) pour memoriser l'ecoute. */
  audioKey: string;
  className?: string;
}): React.JSX.Element {
  const t = useTranslations("exam");
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [state, setState] = React.useState<AudioState>("idle");
  const [progress, setProgress] = React.useState(0);

  const storageKey = `exam-audio:${audioKey}`;

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setProgress(0);

    try {
      if (window.sessionStorage.getItem(storageKey) === "played") {
        setState("ended");
        setProgress(100);
        return;
      }
    } catch {
      // Stockage indisponible (navigation privee restrictive) : le lecteur
      // fonctionne quand meme, sans memorisation.
    }

    setState("idle");
  }, [storageKey, src]);

  const start = React.useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || state === "playing" || state === "ended") return;

    try {
      audio.currentTime = 0;
      setProgress(0);
      await audio.play();
    } catch {
      setState("error");
    }
  }, [state]);

  return (
    <div className={cn("space-y-3 rounded-xl border border-primary/25 bg-accent/20 p-4", className)}>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        className="hidden"
        onPlay={() => {
          setState("playing");
          try {
            window.sessionStorage.setItem(storageKey, "played");
          } catch {
            // Sans stockage, l'ecoute reste simplement limitee a cet ecran.
          }
        }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
          setProgress((audio.currentTime / audio.duration) * 100);
        }}
        onEnded={() => {
          setState("ended");
          setProgress(100);
        }}
        onError={() => setState("error")}
      />

      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Headphones className="size-4" aria-hidden />
        </span>

        <div className="min-w-0 flex-1 space-y-2">
          {state === "idle" || state === "playing" ? (
            <>
              <Button
                type="button"
                variant="accent"
                className="gap-2"
                disabled={state === "playing"}
                onClick={() => void start()}
              >
                <Play className="size-4" aria-hidden />
                {state === "playing" ? t("listening") : t("listen")}
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">{t("listenOnce")}</p>
            </>
          ) : null}

          {state === "playing" ? <Progress value={progress} aria-hidden /> : null}

          {state === "ended" ? (
            <p
              role="status"
              className="flex items-center gap-2 text-sm font-semibold text-success"
            >
              <CheckCircle2 className="size-4 shrink-0" aria-hidden />
              {t("listenEnded")}
            </p>
          ) : null}

          {state === "error" ? (
            <div className="space-y-2">
              <p role="alert" className="flex items-start gap-2 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t("audioError")}
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => void start()}
              >
                <RotateCcw className="size-3.5" aria-hidden />
                {t("listen")}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
