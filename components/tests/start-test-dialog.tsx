"use client";

import { useTranslations } from "next-intl";
import { PlayCircle, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { startAttemptAction } from "@/server/actions/attempts";

/**
 * Boite de confirmation avant de lancer le chronometre. Le declenchement du
 * chronometre se fait uniquement au submit de `startAttemptAction` cote
 * serveur : aucune echeance n'est creee avant validation.
 */
export function StartTestDialog({
  testId,
  inProgress = false,
  size = "default",
  className,
}: {
  testId: string;
  inProgress?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}): React.JSX.Element {
  const t = useTranslations("tests");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={size}
          variant={inProgress ? "accent" : "default"}
          className={className}
        >
          {inProgress ? <PlayCircle aria-hidden /> : <ShieldAlert aria-hidden />}
          {inProgress ? t("resumeAttempt") : t("start")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{inProgress ? t("resumeAttempt") : t("startConfirm")}</DialogTitle>
          <DialogDescription>{t("startConfirmBody")}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <form action={startAttemptAction} className="w-full">
            <input type="hidden" name="testId" value={testId} />
            <Button type="submit" className="w-full" size="lg">
              <PlayCircle aria-hidden />
              {inProgress ? t("resumeAttempt") : t("startNow")}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
