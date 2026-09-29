"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/** Evenement non standard emis par Chromium avant l'affichage du dialogue. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "tcf-pwa-install-dismissed";

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/**
 * Invite a installer l'application.
 *
 * Le dialogue n'est propose que si le navigateur a emis
 * `beforeinstallprompt` (donc l'app est installable) et que l'utilisateur ne
 * l'a pas deja refuse. Aucun rejeu de l'evenement n'est tente apres un refus :
 * Chromium ne le reemet pas, l'invite disparait donc d'elle-meme.
 */
export function InstallPrompt(): React.JSX.Element | null {
  const t = useTranslations("pwa");
  const pathname = usePathname();
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  // L'epreuve occupe tout l'ecran : aucune banniere ne doit la recouvrir.
  const isExam = pathname.startsWith(`/${siteConfig.locale}/exam`);

  useEffect(() => {
    if (isStandalone() || isExam) return;
    if (window.localStorage.getItem(DISMISS_KEY) === "1") return;

    const onBeforeInstall = (raw: Event): void => {
      raw.preventDefault();
      setEvent(raw as BeforeInstallPromptEvent);
      setVisible(true);
    };

    const onInstalled = (): void => {
      setVisible(false);
      setEvent(null);
      window.localStorage.setItem(DISMISS_KEY, "1");
      toast.success(t("installed"));
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [isExam, t]);

  const install = useCallback(async () => {
    if (!event) return;
    setVisible(false);
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") {
      window.localStorage.setItem(DISMISS_KEY, "1");
    }
    setEvent(null);
  }, [event]);

  const dismiss = useCallback(() => {
    setVisible(false);
    window.localStorage.setItem(DISMISS_KEY, "1");
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("installTitle")}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-96"
    >
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-strong">
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-96.png"
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-xl"
          />
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold">{t("installTitle")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("installBody")}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={install}>
            {t("installAction")}
          </Button>
          <Button size="sm" variant="ghost" onClick={dismiss}>
            {t("dismiss")}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {siteConfig.name} · {siteConfig.locale.toUpperCase()}
        </p>
      </div>
    </div>
  );
}
