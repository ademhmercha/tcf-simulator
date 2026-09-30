import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Les espaces-connected (tableau de bord, historique, resultats, correction,
// passage de l'epreuve) exigent une session : inutile de les faire explorer.
const PRIVATE_PATHS = [
  "/dashboard",
  "/history",
  "/results",
  "/corrections",
  "/exam",
  "/api",
];

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_PATHS.map((path) => `/${siteConfig.locale}${path}`),
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
