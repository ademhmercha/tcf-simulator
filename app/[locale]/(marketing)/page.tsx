import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Gauge,
  MonitorSmartphone,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";

import { TestCard } from "@/components/tests/test-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/config/site";
import { LOCALES, type AppLocale } from "@/config/enums";
import { getPublishedTests } from "@/server/services/attempts";
import { auth } from "@/server/auth";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "landing.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  if (!(LOCALES as readonly string[]).includes(params.locale)) notFound();
  setRequestLocale(params.locale);

  const t = await getTranslations("landing");

  const session = await auth();
  const tests = await getPublishedTests(session?.user?.id);
  const firstTest = tests[0];

  return (
    <>
      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative overflow-hidden">
        <div className="hero-grid absolute inset-0 -z-10" aria-hidden />
        <div className="container py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 gap-2 rounded-full px-3.5 py-1.5">
              <Sparkles className="size-3.5" aria-hidden />
              {t("hero.eyebrow")}
            </Badge>

            <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">
              {t("hero.titlePrefix")}{" "}
              <span className="text-gradient">{t("hero.titleAccent")}</span>
              <br />
              {t("hero.titleSuffix")}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href={session?.user ? "/tests" : "/register"}>{t("hero.ctaPrimary")}</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href="/tests">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-success" aria-hidden />
                {t("hero.trustNoAccount")}
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-success" aria-hidden />
                {t("hero.trustInstant")}
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-success" aria-hidden />
                {t("hero.trustResume")}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------ Chiffres --------------------------- */}
      <section className="container pb-4">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { value: features.testCount, label: t("stats.tests"), icon: ClipboardCheck },
            { value: features.totalQuestions, label: t("stats.questions"), icon: BookOpenCheck },
            { value: 6, label: t("stats.levels"), icon: Target },
            { value: "100%", label: t("stats.explanation"), icon: Sparkles },
          ].map((stat) => (
            <Card key={stat.label} className="border-border/70">
              <CardContent className="flex flex-col items-center gap-1 p-6 text-center">
                <stat.icon className="size-5 text-primary" aria-hidden />
                <dd className="font-display text-3xl font-extrabold">{stat.value}</dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </CardContent>
            </Card>
          ))}
        </dl>
      </section>

      {/* ------------------------------ Fonctions -------------------------- */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("features.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("features.subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Timer, title: t("features.timerTitle"), body: t("features.timerBody") },
            {
              icon: ShieldCheck,
              title: t("features.autosaveTitle"),
              body: t("features.autosaveBody"),
            },
            {
              icon: BookOpenCheck,
              title: t("features.correctionTitle"),
              body: t("features.correctionBody"),
            },
            {
              icon: BarChart3,
              title: t("features.analyticsTitle"),
              body: t("features.analyticsBody"),
            },
            {
              icon: RefreshCcw,
              title: t("features.mistakesTitle"),
              body: t("features.mistakesBody"),
            },
            {
              icon: MonitorSmartphone,
              title: t("features.mobileTitle"),
              body: t("features.mobileBody"),
            },
          ].map((feature) => (
            <Card key={feature.title} className="border-border/70 transition-shadow hover:shadow-medium">
              <CardContent className="p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <feature.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ------------------------------ Format ----------------------------- */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{t("exam.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("exam.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("exam.subtitle")}</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                title: t("exam.structureTitle"),
                body: t("exam.structureBody"),
                meta: t("exam.structureMeta"),
                icon: Gauge,
              },
              {
                title: t("exam.comprehensionTitle"),
                body: t("exam.comprehensionBody"),
                meta: t("exam.comprehensionMeta"),
                icon: BookOpenCheck,
              },
            ].map((section) => (
              <Card key={section.title} className="overflow-hidden">
                <CardContent className="p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <section.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary">
                    <Clock className="size-4" aria-hidden />
                    {section.meta}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {[t("exam.badgeA"), t("exam.badgeB"), t("exam.badgeC")].map((badge) => (
              <li key={badge}>
                <Badge variant="secondary" className="rounded-full px-3.5 py-1.5">
                  {badge}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------- Comment ca marche --------------------- */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("howItWorks.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("howItWorks.title")}</h2>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: t("howItWorks.step1Title"), body: t("howItWorks.step1Body") },
            { title: t("howItWorks.step2Title"), body: t("howItWorks.step2Body") },
            { title: t("howItWorks.step3Title"), body: t("howItWorks.step3Body") },
          ].map((step, index) => (
            <li key={step.title}>
              <Card className="h-full border-border/70">
                <CardContent className="p-7">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>

      {/* ------------------------------ Tests ------------------------------ */}
      {tests.length > 0 ? (
        <section className="border-y border-border bg-surface py-20">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">{t("testsPreview.eyebrow")}</p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                {t("testsPreview.title")}
              </h2>
              <p className="mt-4 text-muted-foreground">{t("testsPreview.subtitle")}</p>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tests.map((test) => (
                <TestCard key={test.id} test={test} compact signedIn={Boolean(session?.user)} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/tests">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------- FAQ ------------------------------- */}
      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("faq.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("faq.title")}</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <details key={n} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                {t(`faq.q${n}`)}
                <span
                  className="shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t(`faq.a${n}`)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="container pb-8">
        <div className="rounded-3xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground shadow-medium sm:px-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {session?.user ? (
              <>
                <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                  <Link href={firstTest ? `/tests/${firstTest.slug}` : "/tests"}>
                    {t("cta.buttonExisting")}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="ghost"
                  className="w-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                >
                  <Link href="/tests">{t("hero.ctaSecondary")}</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="xl" variant="accent" className="w-full sm:w-auto">
                  <Link href="/register">{t("cta.button")}</Link>
                </Button>
                <Button
                  asChild
                  size="xl"
                  variant="ghost"
                  className="w-full border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
                >
                  <Link href="/login">{t("cta.buttonExisting")}</Link>
                </Button>
              </>
            )}
          </div>
          <p className="mt-6 text-xs text-primary-foreground/70">
            {t("exam.badgeC")} &middot; {t("stats.questions")} &middot; {t("stats.levels")}
          </p>
        </div>
      </section>
    </>
  );
}
