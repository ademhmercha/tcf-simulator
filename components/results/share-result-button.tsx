"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Share2 } from "lucide-react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";

/**
 * Partage du resultat via l'API Web Share (mobile), avec repli sur la copie du
 * lien dans le presse-papiers. Le resultat reste prive : on ne partage qu'un
 * texte et l'URL, jamais le detail des reponses.
 */
export function ShareResultButton({
  title,
  text,
}: {
  title: string;
  text: string;
}): React.JSX.Element {
  const t = useTranslations("results");
  const [copied, setCopied] = useState(false);

  async function share(): Promise<void> {
    const url = window.location.href;
    const payload = { title, text, url };

    try {
      track("share_click");
    } catch {
      // Ignorer si l'Analytics n'est pas disponible.
    }

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(payload);
        return;
      } catch {
        // Partage annule ou indisponible : on retombe sur la copie.
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Presse-papiers inaccessible : aucun repli possible, on ne fait rien.
    }
  }

  return (
    <Button type="button" variant="ghost" onClick={share}>
      {copied ? (
        <Check className="size-4 text-success" aria-hidden />
      ) : (
        <Share2 className="size-4" aria-hidden />
      )}
      {copied ? t("shareCopied") : t("share")}
    </Button>
  );
}
