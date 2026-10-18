/**
 * Bots d'IA a bloquer (scraping / clonage du contenu).
 *
 * Liste utilisee a deux endroits et volontairement partagee :
 * - `middleware.ts` rejette la requete (403) si le User-Agent en contient un ;
 * - `app/robots.ts` publie la meme liste dans `robots.txt`, qui n'est qu'un
 *   conseil aux crawlers polis.
 *
 * Les deux doivent rester alignes : un `robots.txt` qui autorise ce que le
 * middleware rejette, ou l'inverse, n'a aucun sens pour l'indexation.
 */
export const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ChatGPT",
  "OAI-SearchBot",
  "OpenAI",
  "OpenAI-Bot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "Meta-ExternalFetcher",
  "Diffbot",
  "FacebookBot",
  "Amazonbot",
  "YouBot",
  "SemrushBot",
  "DataForSeoBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "PetalBot",
  "Seekr",
  "ExaBot",
  "FirecrawlBot",
  "Crawl4AI",
  "MistralAI-User",
  "Cohere-AI",
  "HuggingFace-Bot",
  "ScraperBot",
  "YandexBot",
  "JinaBot",
] as const;

/** Sous-chaines minuscules, pour le test de User-Agent du middleware. */
export const AI_BOT_TOKENS: readonly string[] = AI_BOTS.map((bot) => bot.toLowerCase());
