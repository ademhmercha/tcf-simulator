import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { GoogleSignInSection } from "@/components/auth/google-sign-in";
import { RegisterForm } from "@/components/auth/register-form";
import { auth, googleEnabled } from "@/server/auth";
import type { AppLocale } from "@/config/enums";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "auth" });
  return { title: t("registerTitle"), description: t("registerSubtitle") };
}

export default async function RegisterPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("auth");

  const session = await auth();
  if (session?.user) redirect("/fr/dashboard");

  return (
    <AuthShell title={t("registerTitle")} subtitle={t("registerSubtitle")}>
      <RegisterForm />
      <Suspense fallback={null}>
        <GoogleSignInSection enabled={googleEnabled} />
      </Suspense>
    </AuthShell>
  );
}
