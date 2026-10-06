"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AlertCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { googleSignInAction } from "@/server/actions/auth";

/** Logo Google officiel (couleurs de marque), dessine inline, taille 18 px. */
function GoogleLogo(): React.JSX.Element {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 48 48" className="shrink-0">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/** Traduit le code d'erreur OAuth d'Auth.js en message francais. */
function useGoogleError(): string | null {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const code = searchParams.get("error");
  if (!code) return null;
  // AccessDenied : l'utilisateur a annule ou refuse l'autorisation Google.
  if (code === "AccessDenied") return t("googleErrorDenied");
  return t("googleError");
}

export function GoogleSignInSection({ enabled }: { enabled: boolean }): React.JSX.Element | null {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = React.useState(false);
  const error = useGoogleError();

  if (!enabled) return null;

  const redirectTo =
    typeof searchParams.get("next") === "string" &&
    (searchParams.get("next") as string).startsWith("/") &&
    !(searchParams.get("next") as string).startsWith("//")
      ? (searchParams.get("next") as string)
      : "/fr/dashboard";

  const start = (): void => {
    if (pending) return;
    setPending(true);
    void googleSignInAction(redirectTo).catch(() => setPending(false));
  };

  const dismissError = (): void => {
    // On retire le parametre ?error= de l'URL sans recharger la page.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("error");
    const qs = params.toString();
    router.replace(qs ? `${window.location.pathname}?${qs}` : window.location.pathname, {
      scroll: false,
    });
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span className="h-px flex-1 bg-border" aria-hidden />
        <span>{t("or")}</span>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{error}</span>
          <button
            type="button"
            onClick={dismissError}
            aria-label="Fermer"
            className="ml-auto shrink-0 rounded p-0.5 text-destructive/70 hover:text-destructive"
          >
            <X className="size-4" aria-hidden />
          </button>
        </p>
      ) : null}

      <Button
        type="button"
        variant="outline"
        size="lg"
        className="mt-4 w-full min-h-[44px]"
        loading={pending}
        disabled={pending}
        onClick={start}
      >
        <GoogleLogo />
        {t("loginWithGoogle")}
      </Button>

      <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
        {t("googleSameEmail")}
      </p>
    </div>
  );
}