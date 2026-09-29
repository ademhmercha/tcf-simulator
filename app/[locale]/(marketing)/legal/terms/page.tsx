import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LegalPage } from "@/components/legal/legal-page";
import type { AppLocale } from "@/config/enums";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "legal" });
  return { title: t("terms.title"), description: t("terms.metaDescription") };
}

export default async function TermsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");

  return (
    <LegalPage
      title={t("terms.title")}
      updated={t("terms.updated")}
      intro={[t("terms.intro1"), t("terms.intro2")]}
      sections={[
        {
          heading: t("terms.objectTitle"),
          paragraphs: [t("terms.objectBody")],
        },
        {
          heading: t("terms.accountTitle"),
          paragraphs: [t("terms.accountBody")],
          bullets: [
            t("terms.accountAccurate"),
            t("terms.accountPassword"),
            t("terms.accountNotify"),
            t("terms.accountClose"),
          ],
        },
        {
          heading: t("terms.useTitle"),
          paragraphs: [t("terms.useBody")],
          bullets: [
            t("terms.usePersonal"),
            t("terms.useNoCheat"),
            t("terms.useNoAbuse"),
            t("terms.useNoResell"),
          ],
        },
        {
          heading: t("terms.contentTitle"),
          paragraphs: [t("terms.contentBody1"), t("terms.contentBody2")],
        },
        {
          heading: t("terms.availabilityTitle"),
          paragraphs: [t("terms.availabilityBody")],
        },
        {
          heading: t("terms.liabilityTitle"),
          paragraphs: [t("terms.liabilityBody1"), t("terms.liabilityBody2")],
        },
        {
          heading: t("terms.changesTitle"),
          paragraphs: [t("terms.changesBody")],
        },
        {
          heading: t("terms.contactTitle"),
          paragraphs: [t("terms.contactBody")],
        },
      ]}
    />
  );
}
