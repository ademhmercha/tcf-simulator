// ---------------------------------------------------------------------------
// Construction de l'URL de datasource Prisma.
//
// Isolé de `lib/db.ts` pour rester testable : importer ce module ne cree
// aucun client et n'ouvre aucune connexion.
// ---------------------------------------------------------------------------

/**
 * Connexions autorisees par instance de fonction serveur.
 *
 * Prisma calcule sa taille de pool a partir du nombre de vCPU
 * (`nb_cpu * 2 + 1`). Sur Vercel une instance garde son module en memoire
 * entre les requetes : chaque instance warm tient donc son propre pool. Avec
 * un pool par instance, quelques fonctions suffisent a saturer un pooler
 * partage, et le site tombe en `EMAXCONNSESSION` / P1001 sur *toutes* les pages
 * lisant la base. On plafonne donc a 1 : les requetes concurrentes sont
 * serialisees par le pool (attente bornee par `pool_timeout`), ce qui reste
 * inoffensif pour ce volume, contre un pool par instance qui rend le site
 * entier indisponible.
 */
export const SERVERLESS_CONNECTION_LIMIT = 1;

/** Vrai sur Vercel et sur toute fonction AWS Lambda. */
export function isServerless(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

/**
 * Vrai pour l'URL du pooler Supabase en *mode session* (port 5432).
 *
 * Le mode session de PgBouncer reserve un vrai backend PostgreSQL par
 * connexion cliente jusqu'a la fermeture de la session : le pool est alors
 * limite a une quinzaine de connexions au total. C'est la configuration a
 * proscrire en serverless, ou le pooler en mode transaction (port 6543)
 * multiplexe de nombreuses clientes sur les memes backends.
 */
export function isSessionPooler(url: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  return parsed.port === "5432" && parsed.hostname.endsWith("pooler.supabase.com");
}

/**
 * URL de datasource effective.
 *
 * `connection_limit` deja present est respecte tel quel : une valeur posee
 * dans l'environnement reste prioritaire. Sinon, on l'ajoute uniquement en
 * serverless, ou le defaut calcule sur le nombre de vCPU est inadapté. Les URL
 * `file:` du miroir SQLite sont laissees intactes : le parametre n'a pas de
 * sens hors PostgreSQL et le chemin de la base serait abime.
 */
export function resolveDatasourceUrl(raw: string, serverless = isServerless()): string {
  if (!serverless) return raw;
  if (!/^postgres(ql)?:/i.test(raw)) return raw;
  if (/[?&]connection_limit=/.test(raw)) return raw;
  return `${raw}${raw.includes("?") ? "&" : "?"}connection_limit=${SERVERLESS_CONNECTION_LIMIT}`;
}