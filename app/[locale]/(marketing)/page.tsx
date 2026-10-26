import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Gauge,
  Headphones,
  MonitorSmartphone,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Timer,
  UserPlus,
} from "lucide-react";

import { Reveal } from "@/components/marketing/reveal";
import { HeroBackdrop } from "@/components/marketing/hero-backdrop";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LOCALES, type AppLocale } from "@/config/enums";
import { absoluteUrl } from "@/config/site";
import { VOCABULAIRE_SERIES } from "@/data/vocabulaire";
import { getPublishedTests } from "@/server/services/attempts";
import { getListeningSeriesList } from "@/server/services/listening";
import { auth } from "@/server/auth";
import { faqJsonLd } from "@/lib/structured-data";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "landing.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: { canonical: absoluteUrl(`/${params.locale}`) },
  };
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
  const signedIn = Boolean(session?.user);
  const [tests, series] = await Promise.all([
    getPublishedTests(session?.user?.id, "PRACTICE"),
    getListeningSeriesList(session?.user?.id),
  ]);
  const firstTest = tests[0];

  const writtenTests = tests.length;
  const writtenQuestions = tests.reduce((sum, test) => sum + test.questionCount, 0);
  const seriesCount = series.length;
  const oralQuestions = series.reduce((sum, serie) => sum + serie.questionCount, 0);
  const vocabCount = VOCABULAIRE_SERIES.length;
  const totalQuestions = writtenQuestions + oralQuestions;

  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    question: t(`faq.q${n}`),
    answer: t(`faq.a${n}`),
  }));

  const pillars = [
    {
      icon: BookOpenCheck,
      title: t("prep.writtenTitle"),
      body: t("prep.writtenBody"),
      bullets: [
        t("prep.writtenBullet1"),
        t("prep.writtenBullet2"),
        t("prep.writtenBullet3"),
      ],
      meta: t("prep.writtenMeta", { count: writtenTests }),
      cta: t("prep.writtenCta"),
      href: signedIn ? "/tests" : "/register",
    },
    {
      icon: Headphones,
      title: t("prep.oralTitle"),
      body: t("prep.oralBody"),
      bullets: [t("prep.oralBullet1"), t("prep.oralBullet2"), t("prep.oralBullet3")],
      meta: t("prep.oralMeta", { count: seriesCount }),
      cta: t("prep.oralCta"),
      href: signedIn ? "/tests" : "/register",
    },
    {
      icon: FileText,
      title: t("prep.vocabTitle"),
      body: t("prep.vocabBody"),
      bullets: [t("prep.vocabBullet1"), t("prep.vocabBullet2"), t("prep.vocabBullet3")],
      meta: t("prep.vocabMeta", { count: vocabCount }),
      cta: signedIn ? t("prep.vocabCta") : t("prep.vocabCtaGuest"),
      href: signedIn ? "/vocabulaire" : "/register",
    },
  ];

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* ------------------------------- Hero ------------------------------ */}
      <section className="relative isolate overflow-hidden">
        <HeroBackdrop src="/images/hero-paris.jpg" />
        <div className="hero-grid absolute inset-0 -z-10 opacity-70" aria-hidden />
        <div
          className="hero-aurora animate-aurora-pan pointer-events-none absolute -inset-1/4 -z-10 opacity-70"
          aria-hidden
        />
        <div className="container py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="outline"
              className="mb-6 animate-scale-in gap-2 rounded-full px-3.5 py-1.5"
            >
              <Sparkles className="size-3.5" aria-hidden />
              {t("hero.eyebrow")}
            </Badge>

            <h1 className="animate-fade-up text-4xl font-extrabold leading-[1.08] [animation-delay:80ms] sm:text-5xl lg:text-6xl">
              {t("hero.titlePrefix")}{" "}
              <span className="text-gradient">{t("hero.titleAccent")}</span>
              <br />
              {t("hero.titleSuffix")}
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground [animation-delay:160ms] sm:text-lg">
              {t("hero.subtitle")}
            </p>

            <div className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 [animation-delay:240ms] sm:flex-row">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href={session?.user ? "/examens" : "/register"}>
                  Commencer les examens blancs
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href={signedIn ? "/tests" : "/register"}>
                  Séries d'entraînement
                </Link>
              </Button>
            </div>

            <ul className="animate-fade-up mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground [animation-delay:320ms]">
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
            { value: writtenTests, label: t("stats.tests"), icon: ClipboardCheck },
            { value: seriesCount, label: t("stats.oralSeries"), icon: Headphones },
            { value: totalQuestions, label: t("stats.questions"), icon: BookOpenCheck },
            { value: "100%", label: t("stats.explanation"), icon: Sparkles },
          ].map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90} className="h-full">
              <Card className="h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium">
                <CardContent className="flex flex-col items-center gap-1 p-6 text-center">
                  <stat.icon className="size-5 text-primary" aria-hidden />
                  <dd className="font-display text-3xl font-extrabold">{stat.value}</dd>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ------------------------------ Fonctions -------------------------- */}
      <section className="container py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("features.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("features.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("features.subtitle")}</p>
        </Reveal>

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
          ].map((feature, index) => (
            <Reveal key={feature.title} delay={index * 70} className="h-full">
              <Card className="group h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium">
                <CardContent className="p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ Format ----------------------------- */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{t("exam.eyebrow")}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("exam.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("exam.subtitle")}</p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("exam.oralTitle"),
                body: t("exam.oralBody"),
                meta: t("exam.oralMeta"),
                icon: Headphones,
              },
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
            ].map((section, index) => (
              <Reveal key={section.title} delay={index * 110} className="h-full">
                <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-medium">
                  <CardContent className="p-7">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
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
              </Reveal>
            ))}
          </div>

          <Reveal delay={160} className="mt-8">
            <ul className="flex flex-wrap justify-center gap-3">
              {[t("exam.badgeA"), t("exam.badgeB")].map((badge) => (
                <li key={badge}>
                  <Badge variant="secondary" className="rounded-full px-3.5 py-1.5">
                    {badge}
                  </Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- Comment ca marche --------------------- */}
      <section className="container py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("howItWorks.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("howItWorks.title")}</h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: t("howItWorks.step1Title"), body: t("howItWorks.step1Body") },
            { title: t("howItWorks.step2Title"), body: t("howItWorks.step2Body") },
            { title: t("howItWorks.step3Title"), body: t("howItWorks.step3Body") },
          ].map((step, index) => (
            <Reveal key={step.title} delay={index * 120} className="h-full">
              <Card className="group h-full border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium">
                <CardContent className="p-7">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------------------------------ Preparation ------------------------ */}
      <section className="border-y border-border bg-surface py-20">
        <div className="container">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Préparation</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Examens blancs et séries d'entraînement</h2>
            <p className="mt-4 text-muted-foreground">
              Choisis entre des examens blancs complets dans les conditions du TCF ou des séries d'entraînement ciblées.
            </p>
          </Reveal>

          <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal delay={0} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-strong">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <ClipboardCheck className="size-6" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-xl font-bold">Examens blancs</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  Trois épreuves enchaînées, du niveau A1 au C2, dans les conditions réelles du TCF Tout public.
                </p>
                <ul className="relative mt-5 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">70 questions • 90 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">Compréhension orale, maîtrise de la langue, compréhension écrite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">Note sur 699, niveau CECRL et correction détaillée</span>
                  </li>
                </ul>
                <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary">10 examens blancs</span>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={signedIn ? "/examens" : "/register"}>
                      Commencer les examens blancs
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
            <Reveal delay={100} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-strong">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
                  <BookOpenCheck className="size-6" aria-hidden />
                </span>
                <h3 className="relative mt-5 text-xl font-bold">Séries d'entraînement</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  Entraîne-toi épreuve par épreuve avec des séries ciblées pour progresser efficacement.
                </p>
                <ul className="relative mt-5 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">Compréhension orale, structure, compréhension écrite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">Corrigé détaillé et explications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    <span className="text-muted-foreground">Idéal pour cibler tes points faibles</span>
                  </li>
                </ul>
                <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-primary">{writtenTests} séries • {seriesCount} CO</span>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={signedIn ? "/tests" : "/register"}>
                      Séries d'entraînement
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary-soft/50 px-6 py-8 sm:px-10">
              <span
                aria-hidden
                className="animate-drift pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl"
              />
              <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
                <div className="max-w-xl">
                  <h3 className="text-xl font-bold sm:text-2xl">{t("prep.signupTitle")}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t("prep.signupBody")}
                  </p>
                  <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground sm:justify-start">
                    {[
                      t("prep.signupPoint1"),
                      t("prep.signupPoint2"),
                      t("prep.signupPoint3"),
                    ].map((point) => (
                      <li key={point} className="flex items-center gap-1.5">
                        <CheckCircle2 className="size-4 text-success" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:items-end">
                  {signedIn ? (
                    <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                      <Link href="/dashboard">{t("cta.buttonExisting")}</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild size="lg" variant="accent" className="w-full sm:w-auto">
                        <Link href="/register">
                          <UserPlus aria-hidden />
                          {t("prep.signupCta")}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full sm:w-auto"
                      >
                        <Link href="/login">{t("prep.signupLogin")}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- FAQ ------------------------------- */}
      <section className="container py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t("faq.eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t("faq.title")}</h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <details
                key={n}
                className="group px-6 py-5 transition-colors hover:bg-muted/40 open:bg-muted/40"
              >
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
        </Reveal>
      </section>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="container pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-primary px-6 py-14 text-center text-primary-foreground shadow-medium sm:px-12">
            <span
              className="animate-drift pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-primary-foreground/10 blur-2xl"
              aria-hidden
            />
            <span
              className="animate-float pointer-events-none absolute -bottom-20 -right-14 size-64 rounded-full bg-accent/25 blur-3xl"
              aria-hidden
            />
            <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t("cta.title")}</h2>
            <p className="relative mt-3 mx-auto max-w-xl text-primary-foreground/85">
              {t("cta.subtitle")}
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
            <p className="relative mt-6 text-xs text-primary-foreground/70">
              {t("stats.questions")}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
