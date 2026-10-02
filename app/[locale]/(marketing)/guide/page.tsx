import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Check,
  ExternalLink,
  FileText,
  Headphones,
  Languages,
  MonitorSmartphone,
  Printer,
  Timer,
} from "lucide-react";

import { GuideToc, type GuideTocItem } from "@/components/guide/guide-toc";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "guide" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function GuidePage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("guide");

  const session = await auth();
  const signedIn = Boolean(session?.user);
  const primaryCta = signedIn ? t("ctaPrimaryAuth") : t("ctaPrimary");
  const primaryHref = signedIn ? "/tests" : "/register";
  const secondaryCta = signedIn ? t("ctaSecondaryAuth") : t("ctaSecondary");
  const secondaryHref = signedIn ? "/dashboard" : "/tests";

  const toc: GuideTocItem[] = [
    { id: "epreuves", number: t("sections.epreuves.number"), label: t("sections.epreuves.nav") },
    { id: "duree", number: t("sections.duree.number"), label: t("sections.duree.nav") },
    {
      id: "preparation",
      number: t("sections.preparation.number"),
      label: t("sections.preparation.nav"),
    },
    { id: "methode", number: t("sections.methode.number"), label: t("sections.methode.nav") },
    {
      id: "ressources",
      number: t("sections.ressources.number"),
      label: t("sections.ressources.nav"),
    },
    {
      id: "conseils",
      number: t("sections.conseils.number"),
      label: t("sections.conseils.nav"),
    },
    {
      id: "avertissement",
      number: t("sections.avertissement.number"),
      label: t("sections.avertissement.nav"),
    },
  ];

  return (
    <>
      {/* ------------------------------ En-tete ----------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-border bg-surface">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />
        <div className="container py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <p className="eyebrow">{t("eyebrow")}</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("subtitle")}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">{t("updated")}</p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" className="w-full sm:w-auto">
                  <Link href={primaryHref}>{primaryCta}</Link>
                </Button>
                <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                  <Link href={secondaryHref}>{secondaryCta}</Link>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {t("facts.title")}
                </h2>
                <dl className="mt-5 divide-y divide-border">
                  {[
                    { term: t("facts.organismeLabel"), detail: t("facts.organismeValue") },
                    { term: t("facts.epreuvesLabel"), detail: t("facts.epreuvesValue") },
                    { term: t("facts.dureeLabel"), detail: t("facts.dureeValue") },
                    { term: t("facts.attestationLabel"), detail: t("facts.attestationValue") },
                  ].map((row) => (
                    <div key={row.term} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {row.term}
                      </dt>
                      <dd className="text-sm font-semibold">{row.detail}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ------------------------------- Corps ------------------------------ */}
      <div className="container py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <GuideToc items={toc} title={t("tocTitle")} />

          <div className="min-w-0 max-w-3xl">
            {/* 01 - Les epreuves */}
            <section id="epreuves" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.epreuves.number")}
                title={t("sections.epreuves.title")}
                lead={t("sections.epreuves.lead")}
              />

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {[
                  {
                    key: "oral",
                    icon: Headphones,
                    title: t("sections.epreuves.oralTitle"),
                    body: t("sections.epreuves.oralBody"),
                    tip: t("sections.epreuves.oralTip"),
                  },
                  {
                    key: "structure",
                    icon: Languages,
                    title: t("sections.epreuves.structureTitle"),
                    body: t("sections.epreuves.structureBody"),
                    tip: t("sections.epreuves.structureTip"),
                  },
                  {
                    key: "ecrit",
                    icon: FileText,
                    title: t("sections.epreuves.ecritTitle"),
                    body: t("sections.epreuves.ecritBody"),
                    tip: t("sections.epreuves.ecritTip"),
                  },
                ].map((test) => (
                  <Card key={test.key} className="flex h-full flex-col">
                    <CardContent className="flex h-full flex-col p-6">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <test.icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-base font-bold">{test.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {test.body}
                      </p>
                      <div className="mt-auto border-t border-border pt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                          {t("sections.epreuves.tipLabel")}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {test.tip}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Alert
                variant="info"
                className="mt-6"
                title={t("sections.epreuves.noteTitle")}
              >
                {t("sections.epreuves.noteBody")}
              </Alert>
            </section>

            <Divider />

            {/* 02 - La duree */}
            <section id="duree" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.duree.number")}
                title={t("sections.duree.title")}
                lead={t("sections.duree.lead")}
              />

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: MonitorSmartphone,
                    label: t("sections.duree.computerLabel"),
                    value: t("sections.duree.computerValue"),
                    hint: t("sections.duree.computerHint"),
                  },
                  {
                    icon: Printer,
                    label: t("sections.duree.paperLabel"),
                    value: t("sections.duree.paperValue"),
                    hint: t("sections.duree.paperHint"),
                  },
                ].map((mode) => (
                  <Card key={mode.label}>
                    <CardContent className="p-6">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <mode.icon className="size-5" aria-hidden />
                      </span>
                      <dt className="mt-4 text-sm font-semibold text-muted-foreground">
                        {mode.label}
                      </dt>
                      <dd className="mt-1 font-display text-3xl font-extrabold tracking-tight">
                        {mode.value}
                      </dd>
                      <p className="mt-2 text-sm text-muted-foreground">{mode.hint}</p>
                    </CardContent>
                  </Card>
                ))}
              </dl>

              <Alert
                variant="default"
                className="mt-6"
                title={t("sections.duree.noteTitle")}
              >
                {t("sections.duree.noteBody")}
              </Alert>
            </section>

            <Divider />

            {/* 03 - Comment se preparer */}
            <section id="preparation" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.preparation.number")}
                title={t("sections.preparation.title")}
                lead={t("sections.preparation.lead")}
              />

              <ol className="mt-8 border-y border-border">
                {[
                  {
                    number: "01",
                    title: t("sections.preparation.learnTitle"),
                    body: t("sections.preparation.learnBody"),
                  },
                  {
                    number: "02",
                    title: t("sections.preparation.trainTitle"),
                    body: t("sections.preparation.trainBody"),
                  },
                  {
                    number: "03",
                    title: t("sections.preparation.mockTitle"),
                    body: t("sections.preparation.mockBody"),
                  },
                ].map((step) => (
                  <li
                    key={step.number}
                    className="grid gap-3 py-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="font-display text-2xl font-extrabold leading-none tabular-nums text-primary/70">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <Divider />

            {/* 04 - La methode */}
            <section id="methode" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.methode.number")}
                title={t("sections.methode.title")}
                lead={t("sections.methode.lead")}
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { key: "q1", title: t("sections.methode.q1Title"), body: t("sections.methode.q1Body") },
                  { key: "q2", title: t("sections.methode.q2Title"), body: t("sections.methode.q2Body") },
                ].map((question) => (
                  <Card key={question.key} className="bg-surface shadow-none">
                    <CardContent className="p-6">
                      <h3 className="text-base font-bold leading-snug">{question.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {question.body}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("sections.methode.flowLabel")}
              </p>
              <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  t("sections.methode.flow1"),
                  t("sections.methode.flow2"),
                  t("sections.methode.flow3"),
                  t("sections.methode.flow4"),
                  t("sections.methode.flow5"),
                  t("sections.methode.flow6"),
                ].map((label, index) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft font-mono text-xs font-semibold tabular-nums text-primary">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold">{label}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {t("sections.methode.flowNote")}
              </p>
            </section>

            <Divider />

            {/* 05 - Les ressources */}
            <section id="ressources" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.ressources.number")}
                title={t("sections.ressources.title")}
                lead={t("sections.ressources.lead")}
              />

              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                {[
                  {
                    key: "tv5monde",
                    tag: t("sections.ressources.partnerLabel"),
                    title: t("sections.ressources.tvTitle"),
                    body: t("sections.ressources.tvBody"),
                    url: t("sections.ressources.tvUrl"),
                    href: "https://apprendre.tv5monde.com/fr/tcf",
                  },
                  {
                    key: "fei",
                    tag: t("sections.ressources.officialLabel"),
                    title: t("sections.ressources.feiTitle"),
                    body: t("sections.ressources.feiBody"),
                    url: t("sections.ressources.feiUrl"),
                    href: "https://www.france-education-international.fr/",
                  },
                  {
                    key: "rfi",
                    tag: t("sections.ressources.complementaryLabel"),
                    title: t("sections.ressources.rfiTitle"),
                    body: t("sections.ressources.rfiBody"),
                    url: t("sections.ressources.rfiUrl"),
                    href: "https://francaisfacile.rfi.fr/fr/",
                  },
                ].map((resource) => (
                  <a
                    key={resource.key}
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <ExternalLink className="size-5" aria-hidden />
                      </span>
                      <Badge variant="outline">{resource.tag}</Badge>
                    </div>
                    <h3 className="mt-4 text-base font-bold">{resource.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {resource.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 break-all font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                      {resource.url}
                      <ExternalLink
                        className="size-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                      <span className="sr-only">- {t("sections.ressources.openLabel")}</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <Divider />

            {/* 06 - Les conseils */}
            <section id="conseils" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.conseils.number")}
                title={t("sections.conseils.title")}
              />

              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {[
                  {
                    key: "oral",
                    icon: Headphones,
                    title: t("sections.conseils.oralTitle"),
                    items: [
                      t("sections.conseils.oralItems1"),
                      t("sections.conseils.oralItems2"),
                      t("sections.conseils.oralItems3"),
                      t("sections.conseils.oralItems4"),
                    ],
                  },
                  {
                    key: "structure",
                    icon: Languages,
                    title: t("sections.conseils.structureTitle"),
                    items: [
                      t("sections.conseils.structureItems1"),
                      t("sections.conseils.structureItems2"),
                      t("sections.conseils.structureItems3"),
                    ],
                  },
                  {
                    key: "ecrit",
                    icon: FileText,
                    title: t("sections.conseils.ecritTitle"),
                    items: [
                      t("sections.conseils.ecritItems1"),
                      t("sections.conseils.ecritItems2"),
                      t("sections.conseils.ecritItems3"),
                      t("sections.conseils.ecritItems4"),
                    ],
                  },
                ].map((block) => (
                  <Card key={block.key} className="h-full">
                    <CardContent className="p-6">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                        <block.icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-base font-bold">{block.title}</h3>
                      <ul className="mt-4 space-y-2.5">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-7">
                <div className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-soft">
                    <Timer className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold">{t("sections.conseils.tempsTitle")}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t("sections.conseils.tempsBody")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Divider />

            {/* 07 - Avertissement */}
            <section id="avertissement" className="scroll-mt-24">
              <SectionHeading
                number={t("sections.avertissement.number")}
                title={t("sections.avertissement.title")}
              />

              <Alert
                variant="warning"
                className="mt-8"
                title={t("sections.avertissement.warningTitle")}
              >
                {t("sections.avertissement.warningBody")}
              </Alert>

              <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-7">
                <h3 className="text-base font-bold">{t("sections.avertissement.objectiveTitle")}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t("sections.avertissement.objectiveBody")}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ------------------------------- CTA ------------------------------- */}
      <section className="border-t border-border bg-surface">
        <div className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t("endTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("endSubtitle")}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" className="w-full sm:w-auto">
                <Link href={primaryHref}>{primaryCta}</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="w-full sm:w-auto">
                <Link href={secondaryHref}>{secondaryCta}</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">{t("endNote")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  number,
  title,
  lead,
}: {
  number: string;
  title: string;
  lead?: string;
}): React.JSX.Element {
  return (
    <header>
      <p className="font-mono text-xs font-semibold tabular-nums tracking-[0.18em] text-primary">
        {number}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      {lead ? <p className="mt-3 leading-relaxed text-muted-foreground">{lead}</p> : null}
    </header>
  );
}

function Divider(): React.JSX.Element {
  return <div className="my-14 h-px bg-border" aria-hidden />;
}
