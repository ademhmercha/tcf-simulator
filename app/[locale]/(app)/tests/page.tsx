import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { TestCard } from "@/components/tests/test-card";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tests" });
  return { title: t("listTitle"), description: t("listSubtitle") };
}

export default async function TestsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("tests");

  const session = await auth();
  const tests = await getPublishedTests(session?.user?.id);

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("listTitle")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("listSubtitle")}</h1>
      </header>

      {tests.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Aucun test publie pour le moment. Lancez{" "}
          <code className="font-mono text-sm">npm run db:seed</code> pour charger le contenu.
        </p>
      ) : (
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} signedIn={Boolean(session?.user)} />
          ))}
        </div>
      )}

      <p className="mt-14 text-center text-sm text-muted-foreground">
        <Link href="/dashboard" className="font-semibold text-primary hover:underline">
          Tableau de bord
        </Link>
      </p>
    </div>
  );
}
