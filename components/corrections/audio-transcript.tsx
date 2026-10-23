"use client";

import { FileText, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Audio et transcription d'une question de comprehension orale.
 *
 * Reserve aux ecrans d'apres-epreuve (resultats, corriges) : pendant l'examen,
 * l'audio se joue une seule fois et la transcription n'est jamais envoyee.
 */
export function AudioTranscript({
  audioUrl,
  transcription,
}: {
  audioUrl: string | null;
  transcription: string | null;
}): React.JSX.Element | null {
  const t = useTranslations("corrections");

  if (!audioUrl && !transcription) return null;

  return (
    <div className="space-y-3 rounded-xl border border-border/70 bg-muted/30 p-3">
      {audioUrl ? (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Headphones className="size-3.5" aria-hidden />
            {t("audio")}
          </p>
          <audio controls preload="metadata" src={audioUrl} className="w-full" />
        </div>
      ) : null}

      {transcription ? (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <FileText className="size-3.5" aria-hidden />
            {t("transcription")}
          </p>
          <p className="rounded-lg border border-border/60 bg-card p-3 text-sm leading-relaxed">
            {transcription}
          </p>
        </div>
      ) : null}
    </div>
  );
}
