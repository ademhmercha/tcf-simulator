import { DEFAULT_LOCALE, LOCALES } from "@/config/enums";

// ---------------------------------------------------------------------------
// Routing i18n.
//
// La plateforme est livree en francais uniquement : `/fr/...` est la seule
// locale active et toute autre valeur est redirigee vers le francais.
// Pour ajouter une langue (ex. "en") : ajoutez-la a LOCALES dans config/enums.ts,
// deposez le fichier i18n/messages/<locale>.json, puis mettez a jour
// localeNames ci-dessous. Le reste fonctionne deja.
// ---------------------------------------------------------------------------

export { LOCALES, DEFAULT_LOCALE };

export const locales = LOCALES;
export const defaultLocale = DEFAULT_LOCALE;

export type Locale = (typeof LOCALES)[number];

export const localeNames: Record<Locale, { native: string; short: string; dir: "ltr" | "rtl" }> = {
  fr: { native: "Francais", short: "FR", dir: "ltr" },
};
