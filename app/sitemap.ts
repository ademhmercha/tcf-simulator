import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

// Volontairement statique : ne pas interroger la base pendant le build, sinon
// un deploiement echoue des que la base est injoignable. Le catalogue
// (/tests) et les fiches (/vocabulaire) sont desormais proteges par session :
// on ne les declare plus comme pages explorables.
const PATHS = ["", "/guide", "/login", "/register", "/legal/terms", "/legal/privacy"];

function priority(path: string): number {
  if (path === "") return 1;
  if (path === "/guide") return 0.8;
  return 0.3;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PATHS.map((path) => ({
    url: absoluteUrl(`/${siteConfig.locale}${path}`),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: priority(path),
  }));
}
