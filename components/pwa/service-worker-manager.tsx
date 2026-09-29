"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

/**
 * Enregistre le service worker et gere les evenements PWA lies au reseau.
 *
 * - Hors ligne / retour en ligne : notifications `pwa.offlineReady`.
 * - Mise a jour du service worker : notification persistante avec action
 *   "Actualiser", qui active le nouveau worker puis recharge la page.
 *
 * L'enregistrement est limite a la production : en developpement, un cache
 * service worker servirait des bundles perimes et masquerait les
 * modifications en cours.
 */
export function ServiceWorkerManager(): null {
  const t = useTranslations("pwa");

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;
    let reloading = false;

    const waitForActivation = (worker: ServiceWorker): void => {
      worker.addEventListener("statechange", () => {
        if (worker.state !== "installed") return;
        void navigator.serviceWorker
          .getRegistration()
          .then((current) => current?.active)
          .then((active) => {
            if (!active || active === worker) return;
            toast(t("updateAvailable"), {
              id: "pwa-update",
              duration: Infinity,
              action: {
                label: t("updateAction"),
                onClick: () => {
                  reloading = true;
                  worker.postMessage({ type: "SKIP_WAITING" });
                },
              },
            });
          })
          .catch(() => undefined);
      });
    };

    void navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((result) => {
        registration = result;
        if (registration.waiting && navigator.serviceWorker.controller) {
          waitForActivation(registration.waiting);
        }
        registration.addEventListener("updatefound", () => {
          const installing = registration?.installing;
          if (installing) waitForActivation(installing);
        });
      })
      .catch(() => undefined);

    // Le nouveau worker prend le controle une fois active : on recharge pour
    // servir les assets de la version precedente coherente.
    let reloadingController = false;
    const onControllerChange = (): void => {
      if (reloading || reloadingController) return;
      reloadingController = true;
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    const onOnline = (): void => {
      toast.dismiss("pwa-offline");
    };
    const onOffline = (): void => {
      toast(t("offlineReady"), { id: "pwa-offline", duration: Infinity });
    };

    if (!navigator.onLine) onOffline();
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    return () => {
      navigator.serviceWorker.removeEventListener(
        "controllerchange",
        onControllerChange
      );
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [t]);

  return null;
}
