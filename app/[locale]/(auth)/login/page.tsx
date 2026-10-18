import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { GoogleSignInSection } from "@/components/auth/google-sign-in";
import { LoginForm } from "@/components/auth/login-form";
import { Skeleton } from "@/components/ui/skeleton";
import { auth, googleEnabled } from "@/server/auth";
import type { AppLocale } from "@/config/enums";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "auth" });
  return { title: t("loginTitle"), description: t("loginSubtitle") };
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: { locale: AppLocale };
  searchParams?: { next?: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("auth");

  // Contenu protege : on explique pourquoi la connexion est demandee.
  const next = typeof searchParams?.next === "string" ? searchParams.next : undefined;

  // Un utilisateur deja connecte n'a rien a faire ici.
  const session = await auth();
  if (session?.user) redirect("/fr/dashboard");

  return (
    <AuthShell
      title={t("loginTitle")}
      subtitle={t("loginSubtitle")}
      notice={next ? t("loginNotice") : undefined}
    >
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
      <Suspense fallback={null}>
        <GoogleSignInSection enabled={googleEnabled} />
      </Suspense>
    </AuthShell>
  );
}

function LoginSkeleton(): React.JSX.Element {
  return (
    <div className="space-y-5">
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}
