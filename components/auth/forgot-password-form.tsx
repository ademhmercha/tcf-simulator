"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import { forgotPasswordAction } from "@/server/actions/auth";

function SubmitButton(): React.JSX.Element {
  const t = useTranslations("auth");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" loading={pending}>
      {pending ? t("forgotSending") : t("forgotSubmit")}
    </Button>
  );
}

export function ForgotPasswordForm(): React.JSX.Element {
  const t = useTranslations("auth");
  const [state, formAction] = useFormState(forgotPasswordAction, INITIAL_FORM_STATE);

  if (state.status === "success") {
    return (
      <div className="space-y-5">
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl border border-success/40 bg-success/10 px-3.5 py-3 text-sm text-success"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link href="/fr/login">{t("forgotBack")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.message}
        </p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
        />
        {state.fieldErrors?.email ? (
          <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <SubmitButton />

      <p className="text-center text-sm">
        <Link href="/fr/login" className="font-semibold text-primary hover:underline">
          {t("forgotBack")}
        </Link>
      </p>
    </form>
  );
}
