import { PrismaClient } from "@prisma/client";

// Singleton Prisma : en développement, Next.js recharge les modules à chaud et
// on ne veut pas ouvrir un nouveau pool de connexions à chaque rechargement.

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
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
