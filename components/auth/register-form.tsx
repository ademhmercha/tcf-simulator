"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { AlertCircle, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import { registerAction } from "@/server/actions/auth";

const RULES = [
  { id: "length", label: "10 caracteres minimum" },
  { id: "lower", label: "Une minuscule" },
  { id: "upper", label: "Une majuscule" },
  { id: "digit", label: "Un chiffre" },
];

function SubmitButton(): React.JSX.Element {
  const t = useTranslations("auth");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" loading={pending}>
      {pending ? t("registering") : t("register")}
    </Button>
  );
}

export function RegisterForm(): React.JSX.Element {
  const t = useTranslations("auth");
  const [state, formAction] = useFormState(registerAction, INITIAL_FORM_STATE);

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
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder={t("namePlaceholder")}
          aria-invalid={Boolean(state.fieldErrors?.name)}
        />
        {state.fieldErrors?.name ? (
          <p className="text-xs text-destructive">{state.fieldErrors.name}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        {state.fieldErrors?.email ? (
          <p className="text-xs text-destructive">{state.fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          placeholder={t("passwordPlaceholder")}
          aria-invalid={Boolean(state.fieldErrors?.password)}
        />
        {state.fieldErrors?.password ? (
          <p className="text-xs text-destructive">{state.fieldErrors.password}</p>
        ) : null}
        <PasswordRules />
      </div>

      <SubmitButton />

      <p className="text-xs leading-relaxed text-muted-foreground">{t("consent")}</p>

      <p className="text-center text-sm text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link href="/fr/login" className="font-semibold text-primary hover:underline">
          {t("login")}
        </Link>
      </p>
    </form>
  );
}

function PasswordRules(): React.JSX.Element {
  return (
    <ul className="grid grid-cols-2 gap-1.5 pt-1">
      {RULES.map((rule) => (
        <li key={rule.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Check className="size-3.5 text-success" aria-hidden />
          {rule.label}
        </li>
      ))}
    </ul>
  );
}
