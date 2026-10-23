import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound, redirect } from "next/navigation";

import { TestOverview } from "@/components/tests/test-overview";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getAttemptHistory, getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "exams" });
  return { title: `${t("title")} - ${params.slug}`, robots: { index: false, follow: false } };
}

export default async function ExamDetailPage({
  params,
}: {
  params: { locale: AppLocale; slug: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("exams");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    redirect(
      `/${params.locale}/login?next=${encodeURIComponent(
        `/${params.locale}/examens/${params.slug}`,
      )}`,
    );
  }

  const tests = await getPublishedTests(userId, "FULL");
  const test = tests.find((item) => item.slug === params.slug);
  if (!test) notFound();

  const history = await getAttemptHistory(userId);
  const attempts = history.filter((attempt) => attempt.testId === test.id);

  return (
    <TestOverview
      test={test}
      attempts={attempts}
      basePath="/examens"
      backLabel={t("title")}
    />
  );
}
