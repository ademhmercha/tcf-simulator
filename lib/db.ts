import { PrismaClient } from "@prisma/client";

import { isServerless, isSessionPooler, resolveDatasourceUrl } from "@/lib/db-url";

// Singleton Prisma : en développement, Next.js recharge les modules à chaud et
// on ne veut pas ouvrir un nouveau pool de connexions à chaque rechargement.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const datasourceUrl = resolveDatasourceUrl(process.env.DATABASE_URL ?? "");

/**
 * Alerte sur la configuration qui a mis le site hors service.
 *
 * En mode session, PgBouncer réserve un vrai backend PostgreSQL par connexion
 * cliente : le pool total est borné (une quinzaine sur Supabase) et le deploiement
 * echoue en `EMAXCONNSESSION` des que quelques fonctions serverless sont warm.
 * Chaque page lisant la base rend alors « An error occurred in the Server
 * Components render », sans detail exploitable cote client.
 *
 * On ne bloque pas le demarrage — la configuration fonctionne au ralenti et peut
 * tenir a faible trafic — mais le diagnostic ne saurai etre devoile qu'apres
 * coup, une fois les logs Vercel perdus.
 */
if (isServerless() && isSessionPooler(datasourceUrl)) {
  console.warn(
    `[prisma] DATABASE_URL utilise le pooler en MODE SESSION (port 5432).\n` +
      `[prisma] Chaque fonction serverless garde son propre pool et le pooler est\n` +
      `[prisma] partage : le deploiement echouera en EMAXCONNSESSION des que la\n` +
      `[prisma] capacite est atteinte. Utilisez le pooler en mode TRANSACTION :\n` +
      `[prisma] port 6543 et pgbouncer=true dans DATABASE_URL.`,
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl,
    log:
      process.env.NODE_ENV === "development"
        ? ["warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Vrai si la base active est PostgreSQL.
 *
 * `DATABASE_PROVIDER` est la source de verite unique du projet : c'est lui que
 * lisent `scripts/prisma.mjs` et `scripts/db-switch.mjs` pour choisir le schema.
 *
 * Ce flag n'est la que pour une difference de comportement entre les deux
 * moteurs : `contains` de Prisma devient un `ILIKE` sur PostgreSQL, mais un
 * `LIKE` sur SQLite, dont le comportement est deja insensible a la casse pour
 * l'ASCII. Poser `mode: "insensitive"` sur SQLite est rejete par Prisma ; il
 * faut donc choisir explicitement le filtre selon le moteur.
 */
export const isPostgres = process.env.DATABASE_PROVIDER !== "sqlite";

/** Filtre de recherche textuelle insensible a la casse, portable SQLite/Postgres. */
export function textSearch(value: string): { contains: string; mode?: "insensitive" } {
  return isPostgres ? { contains: value, mode: "insensitive" } : { contains: value };
}

export type { PrismaClient };
