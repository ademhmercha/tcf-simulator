"use client";

import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { Loader2, RefreshCw, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { retryMistakesAction, startAttemptAction } from "@/server/actions/attempts";

function MistakesButton({
  label,
  size,
}: {
  label: string;
  size?: React.ComponentProps<typeof Button>["size"];
}): React.JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size={size}>
      {pending ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : (
        <RotateCcw className="size-4" aria-hidden />
      )}
      {label}
    </Button>
  );
}

/**
 * Relance ciblee sur les seules questions manquees. L'action serveur cree une
 * nouvelle tentative : la precedente reste intacte dans l'historique.
 */
export function RetakeMistakesButton({
  attemptId,
  mistakesCount,
  size = "default",
}: {
  attemptId: string;
  mistakesCount: number;
  size?: React.ComponentProps<typeof Button>["size"];
}): React.JSX.Element | null {
  const t = useTranslations("results");

  if (mistakesCount === 0) return null;

  return (
    <form action={retryMistakesAction} className="contents">
      <input type="hidden" name="attemptId" value={attemptId} />
      <MistakesButton label={t("retakeMistakes")} size={size} />
    </form>
  );
}

/** Repart d'une tentative complete sur le meme test. */
export function RetakeFullButton({
  testId,
  size = "default",
}: {
  testId: string;
  size?: React.ComponentProps<typeof Button>["size"];
}): React.JSX.Element {
  const t = useTranslations("results");

  return (
    <form action={startAttemptAction} className="contents">
      <input type="hidden" name="testId" value={testId} />
      <Button type="submit" variant="outline" size={size}>
        <RefreshCw className="size-4" aria-hidden />
        {t("retakeFull")}
      </Button>
    </form>
  );
}
