import type { MetadataRoute } from "next";

import { absoluteUrl, siteConfig } from "@/config/site";

// Volontairement statique : ne pas interroger la base pendant le build, sinon
// un deploiement echoue des que la base est injoignable. Le catalogue
// (/tests) et les fiches (/vocabulaire) sont desormais proteges par session :
// on ne les declare plus comme pages explorables.
import { WRITING_PROMPTS } from "@/data/writing";

const PATHS = ["", "/guide", "/login", "/register", "/legal/terms", "/legal/privacy", "/ecriture"];

function priority(path: string): number {
  if (path === "") return 1;
  if (path === "/guide") return 0.8;
  if (path === "/ecriture") return 0.8;
  if (path.startsWith("/ecriture/")) return 0.7;
  return 0.3;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths = [
    ...PATHS,
    ...WRITING_PROMPTS.map((prompt) => `/ecriture/${prompt.slug}`),
  ];

  return paths.map((path) => ({
    url: absoluteUrl(`/${siteConfig.locale}${path}`),
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: priority(path),
  }));
}
