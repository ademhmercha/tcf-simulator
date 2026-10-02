import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Volontairement statique : ne pas interroger la base pendant le build, sinon
// un deploiement echoue des que la base est injoignable. Les pages de tests
// restent exploreables et sont trouvees par le maillage interne.
const PATHS = ["", "/tests", "/guide", "/login", "/register", "/legal/terms", "/legal/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  return PATHS.map((path) => ({
    url: `${base}/${siteConfig.locale}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/tests" ? 0.8 : path === "/guide" ? 0.7 : 0.3,
  }));
}
