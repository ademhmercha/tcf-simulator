import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { DEFAULT_LOCALE, LOCALES, type AppLocale } from "@/config/enums";

// ---------------------------------------------------------------------------
// Configuration next-intl. Le chargeur de messages est statique pour permettre
// l'inlining des traductions dans le bundle serveur.
// ---------------------------------------------------------------------------

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: AppLocale = LOCALES.includes(requested as AppLocale)
    ? (requested as AppLocale)
    : DEFAULT_LOCALE;

  if (!LOCALES.includes(locale)) notFound();

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    timeZone: "Europe/Paris",
    now: new Date(),
  };
});
