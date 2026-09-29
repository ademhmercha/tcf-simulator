"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertOctagon, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Filet de securite du segment de locale. Les erreurs attendues du domaine
 * (tentative expiree, acces refuse) sont gerees dans les pages concernees :
 * ce composant ne declenche que les erreurs inattendues.
 */
export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[70dvh] items-center justify-center py-16">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertOctagon className="size-7" aria-hidden />
        </span>

        <h1 className="mt-6 text-2xl font-extrabold">{t("generic")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("genericBody")}</p>

        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-muted-foreground/70">{error.digest}</p>
        ) : null}

        <Button type="button" onClick={reset} className="mt-8">
          <RotateCcw className="size-4" aria-hidden />
          Reessayer
        </Button>
      </div>
    </div>
  );
}
