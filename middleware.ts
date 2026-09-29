import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES } from "@/config/enums";

/**
 * Middleware i18n.
 *
 * La plateforme est livree en francais uniquement : la racine `/` est
 * redirigee vers `/fr` et toute locale inconnue retombe sur le francais.
 *
 * Pour ajouter une langue : ajoutez-la a LOCALES (config/enums.ts), deposez
 * `i18n/messages/<locale>.json`, puis completez `localeNames` dans
 * i18n/routing.ts. Aucune autre modification n'est necessaire.
 */
const handleI18n = createMiddleware({
  locales: [...LOCALES],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  // On ne se base pas sur l'en-tete Accept-Language : la langue est un choix
  // explicite de l'utilisateur, et la detection automatique rendrait les
  // URLs non canoniques (differents partages, SEO, mise en cache).
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  return handleI18n(request);
}

export const config = {
  matcher: [
    /*
     * 1) Toutes les routes de page, a l'exception :
     *    - des fichiers statiques (contiennent un point)
     *    - des prefixes techniques (_next, api, service worker, manifest)
     */
    "/((?!_next|_vercel|api|sw\\.js|workbox|.*\\..*).*)",
    /*
     * 2) Les assets situes sous un prefixe de locale doivent etre servis
     *    tels quels, sans passer par la logique de locale.
     */
    "/(fr)/(.*)",
  ],
};
