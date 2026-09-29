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
  return { title: t("privacy.title"), description: t("privacy.metaDescription") };
}

export default async function PrivacyPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("legal");

  return (
    <LegalPage
      title={t("privacy.title")}
      updated={t("privacy.updated")}
      intro={[t("privacy.intro1"), t("privacy.intro2")]}
      sections={[
        {
          heading: t("privacy.dataTitle"),
          paragraphs: [t("privacy.dataBody")],
          bullets: [
            t("privacy.dataAccount"),
            t("privacy.dataAttempts"),
            t("privacy.dataTechnical"),
            t("privacy.dataNoSell"),
          ],
        },
        {
          heading: t("privacy.useTitle"),
          paragraphs: [t("privacy.useBody")],
          bullets: [
            t("privacy.useProvide"),
            t("privacy.useProgress"),
            t("privacy.useSecurity"),
            t("privacy.useAggregate"),
          ],
        },
        {
          heading: t("privacy.hostingTitle"),
          paragraphs: [t("privacy.hostingBody")],
        },
        {
          heading: t("privacy.retentionTitle"),
          paragraphs: [t("privacy.retentionBody")],
        },
        {
          heading: t("privacy.rightsTitle"),
          paragraphs: [t("privacy.rightsBody")],
          bullets: [
            t("privacy.rightsAccess"),
            t("privacy.rightsRectify"),
            t("privacy.rightsErase"),
            t("privacy.rightsPortability"),
          ],
        },
        {
          heading: t("privacy.cookiesTitle"),
          paragraphs: [t("privacy.cookiesBody")],
        },
        {
          heading: t("privacy.childrenTitle"),
          paragraphs: [t("privacy.childrenBody")],
        },
        {
          heading: t("privacy.contactTitle"),
          paragraphs: [t("privacy.contactBody")],
        },
      ]}
    />
  );
}
