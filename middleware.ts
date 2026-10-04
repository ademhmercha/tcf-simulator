import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";

import { DEFAULT_LOCALE, LOCALES, type AppLocale } from "@/config/enums";

/**
 * Middleware : localisation + garde de session.
 *
 * 1) LOCALISATION
 *    La plateforme est livree en francais uniquement : la racine `/` est
 *    redirigee vers `/fr` et toute locale inconnue retombe sur le francais.
 *
 *    Pour ajouter une langue : ajoutez-la a LOCALES (config/enums.ts), deposez
 *    `i18n/messages/<locale>.json`, puis completez `localeNames` dans
 *    i18n/routing.ts. Aucune autre modification n'est necessaire.
 *
 * 2) GARDE DE SESSION
 *    Les pages protegees exigent une session. Cette verification vit ici, et
 *    non dans les pages, pour une raison precise : le layout appelle `auth()`
 *    pour afficher l'en-tete, la reponse commence donc a etre streamed avant
 *    que la page ne redirectionne. Un `redirect()` declenche apres le premier
 *    octet ne peut plus changer le code HTTP : le visiteur anonyme recevait un
 *    200 contenant l'instruction de redirection, et non un 307. Le middleware
 *    s'execute avant tout rendu, donc il repond un vrai 307 et evite
 *    egalement d'aller interroger la base pour une page qui va rediriger.
 *
 *    La presence du cookie n'est qu'un filtre rapide : chaque page conserve
 *    son `auth()` et reste seule autoritaire sur la session.
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

/** Prefices de route reserves aux utilisateurs connectes. */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/history",
  "/results",
  "/corrections",
  "/exam",
  "/admin",
] as const;

/**
 * Noms du cookie de session Auth.js : `__Secure-` en HTTPS (production),
 * nom nu en HTTP (developpement local).
 */
const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"] as const;

export default function middleware(request: NextRequest) {
  // Bloquer les bots IA (scraping/clone)
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";
  const blockedBots = [
    "gptbot",
    "chatgpt-user",
    "chatgpt",
    "oai-searchbot",
    "openai",
    "openai-bot",
    "claudebot",
    "claude-web",
    "anthropic-ai",
    "perplexitybot",
    "perplexity-user",
    "google-extended",
    "googlebot-extended",
    "applebot-extended",
    "ccbot",
    "bytespider",
    "meta-externalagent",
    "meta-externalfetcher",
    "diffbot",
    "facebookbot",
    "amazonbot",
    "youbot",
    "semrushbot",
    "dataforseobot",
    "ahrefsbot",
    "mj12bot",
    "dotbot",
    "petalbot",
    "seekr",
    "exabot",
  ];
  if (blockedBots.some((bot) => userAgent.includes(bot))) {
    return new NextResponse(null, { status: 403 });
  }

  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const first = segments[0] as AppLocale | undefined;
  const localized = Boolean(first && (LOCALES as readonly string[]).includes(first));
  const locale = localized ? (first as AppLocale) : DEFAULT_LOCALE;
  const route = `/${segments.slice(localized ? 1 : 0).join("/")}`;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`),
  );

  if (isProtected && !SESSION_COOKIES.some((name) => request.cookies.has(name))) {
    const login = new URL(`/${locale}/login`, request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  const response = handleI18n(request);
  response.headers.set(
    "X-Robots-Tag",
    "noindex, nofollow, noarchive, nosnippet, noimageindex"
  );
  return response;
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
