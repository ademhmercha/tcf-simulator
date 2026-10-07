import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { OralPanel, WrittenPanel } from "@/components/tests/panels";
import { TestsCatalog } from "@/components/tests/tests-catalog";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getPublishedTests } from "@/server/services/attempts";
import { getListeningSeriesList } from "@/server/services/listening";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "tests" });
  return { title: t("pageTitle"), description: t("pageSubtitle") };
}

export default async function TestsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("tests");

  const session = await auth();
  const signedIn = Boolean(session?.user);

  const [tests, series] = await Promise.all([
    getPublishedTests(session?.user?.id),
    getListeningSeriesList(session?.user?.id),
  ]);

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("pageEyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("pageTitle")}</h1>
        <p className="mt-3 text-muted-foreground">{t("pageSubtitle")}</p>
      </header>

      <TestsCatalog
        written={<WrittenPanel tests={tests} signedIn={signedIn} />}
        oral={<OralPanel series={series} signedIn={signedIn} />}
        writtenCount={tests.length}
        oralCount={series.length}
      />
    </div>
  );
}