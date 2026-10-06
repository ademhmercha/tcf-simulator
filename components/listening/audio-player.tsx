"use client";

import * as React from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AudioPlayerHandle {
  play: () => Promise<boolean>;
  pause: () => void;
}

interface AudioPlayerProps {
  src: string;
  /** Seconde toute interaction utilisateur : la lecture n'est jamais forcee. */
  onEnded?: () => void;
  className?: string;
}

/**
 * Lecteur audio HTML5 minimal. La page pilote la lecture via le handle
 * `AudioPlayerHandle` et recoit l'evenement `onEnded` (fin de l'ecoute).
 * `preload="auto"` permet de charger l'audio de la question suivante a
 * l'avance pour une lecture immediate, sans temps de chargement.
 */
export const AudioPlayer = React.forwardRef<AudioPlayerHandle, AudioPlayerProps>(
  function AudioPlayer({ src, onEnded, className }, ref) {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = React.useState(false);

    const play = React.useCallback(async () => {
      const el = audioRef.current;
      if (!el) return false;
      try {
        await el.play();
        return true;
      } catch {
        return false;
      }
    }, []);

    const pause = React.useCallback(() => {
      audioRef.current?.pause();
    }, []);

    const restart = React.useCallback(() => {
      const el = audioRef.current;
      if (!el) return;
      el.currentTime = 0;
      void play();
    }, [play]);

    React.useImperativeHandle(ref, () => ({ play, pause }), [play, pause]);

    return (
      <div className={cn("flex w-full items-center gap-3", className)}>
        <audio
          ref={audioRef}
          src={src}
          preload="auto"
          className="hidden"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            onEnded?.();
          }}
        />
        <Button
          type="button"
          size="icon"
          variant="accent"
          aria-label={playing ? "Mettre en pause" : "Écouter"}
          className="shrink-0"
          onClick={() => {
            if (playing) {
              pause();
            } else {
              void play();
            }
          }}
        >
          {playing ? <Pause /> : <Play />}
        </Button>
        <Button type="button" size="sm" variant="ghost" className="gap-1.5" onClick={restart}>
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Réécouter
        </Button>
      </div>
    );
  },
);
AudioPlayer.displayName = "AudioPlayer";