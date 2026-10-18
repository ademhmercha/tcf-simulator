import { siteConfig } from "@/config/site";

/** URL de base sans slash final (les URLs absolues sont obligatoires en JSON-LD). */
function baseUrl(): string {
  return siteConfig.url.replace(/\/$/, "");
}

/** Identite de l'editeur du site. */
export function organizationJsonLd(): Record<string, unknown> {
  const base = baseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: base,
    logo: `${base}/brand/logo.png`,
    description: siteConfig.description,
  };
}

/** Site lui-meme, en francais (seule locale servie). */
export function websiteJsonLd(): Record<string, unknown> {
  const base = baseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${base}/${siteConfig.locale}`,
    inLanguage: "fr",
  };
}

/** Questions frequentes, pour les resultats enrichis Google. */
export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
