import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Clock, FileQuestion, Layers, Target } from "lucide-react";

import { ExamCard } from "@/components/tests/exam-card";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { auth } from "@/server/auth";
import { getPublishedTests } from "@/server/services/attempts";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "exams" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ExamsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("exams");

  // Le middleware renvoie deja les visiteurs anonymes, mais chaque page reste
  // seule autoritaire sur la session.
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/${params.locale}/login?next=${encodeURIComponent(`/${params.locale}/examens`)}`);
  }

  const tests = await getPublishedTests(session.user.id, "FULL");

  const facts = [
    { icon: Layers, label: t("facts.sections") },
    { icon: FileQuestion, label: t("facts.questions") },
    { icon: Clock, label: t("facts.duration") },
    { icon: Target, label: t("facts.scale") },
  ];

  return (
    <div className="container py-12">
      <header className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </header>

      <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        {facts.map((fact) => (
          <li
            key={fact.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm text-muted-foreground"
          >
            <fact.icon className="size-4 text-primary" aria-hidden />
            {fact.label}
          </li>
        ))}
      </ul>

      {tests.length > 0 ? (
        <ul className="mx-auto mt-10 max-w-5xl space-y-4">
          {tests.map((test) => (
            <li key={test.id}>
              <ExamCard test={test} signedIn />
            </li>
          ))}
        </ul>
      ) : (
        <Card className="mx-auto mt-10 max-w-xl border-dashed">
          <CardContent className="p-8 text-center">
            <h2 className="text-lg font-bold">{t("emptyTitle")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("empty")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
