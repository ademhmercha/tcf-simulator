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

export type { PrismaClient };
