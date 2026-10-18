import type { MetadataRoute } from "next";

import { AI_BOTS } from "@/config/blocked-bots";
import { absoluteUrl, siteConfig } from "@/config/site";

// Les espaces connectes (tableau de bord, historique, resultats, correction,
// passage de l'epreuve) exigent une session : inutile de les faire explorer.
// Meme logique pour le catalogue et les fiches : depuis que l'acces est
// reserve aux utilisateurs connectes, un robot ne verrait qu'une redirection.
const PRIVATE_PATHS = [
  "/dashboard",
  "/history",
  "/results",
  "/corrections",
  "/exam",
  "/tests",
  "/vocabulaire",
  "/api",
];

// Chemins sans prefixe de locale (fichiers PDF statiques des fiches).
const PRIVATE_PATHS_NO_LOCALE = ["/pdf"];

/**
 * Fichier `robots.txt` unique.
 *
 * `app/robots.ts` est la seule source : un `public/robots.txt` existait
 * en parallele et, selon la plateforme, c'est l'un ou l'autre qui etait servi
 * (Vercel servait celui-ci, `next start` celui-la). Deux contenus divergents
 * pour la meme URL, c'est un robots.txt different entre developpement et
 * production — on supprime donc le fichier statique.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Bots d'IA a ne pas reutiliser pour du scraping ou du clonage.
      ...AI_BOTS.map((bot) => ({ userAgent: bot, disallow: "/" as const })),
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          ...PRIVATE_PATHS.map((path) => `/${siteConfig.locale}${path}`),
          ...PRIVATE_PATHS_NO_LOCALE,
        ],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
