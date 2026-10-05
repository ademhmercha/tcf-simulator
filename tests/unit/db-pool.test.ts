import { describe, expect, it } from "vitest";

import {
  isSessionPooler,
  resolveDatasourceUrl,
  SERVERLESS_CONNECTION_LIMIT,
} from "@/lib/db-url";

/**
 * Pool de connexions Prisma.
 *
 * Le defaut de Prisma vaut `nb_cpu * 2 + 1` connexions par instance. En
 * serverless chaque instance garde son module en memoire, donc son pool, et le
 * pooler Postgres est partage : le deploiement echoue en `EMAXCONNSESSION` des
 * que la capacite est atteinte, sur toutes les pages lisant la base.
 */

const SESSION_URL =
  "postgresql://postgres.ref:pw@aws-0-eu-west-2.pooler.supabase.com:5432/postgres?schema=public";
const TRANSACTION_URL =
  "postgresql://postgres.ref:pw@aws-0-eu-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true&schema=public";

describe("resolveDatasourceUrl", () => {
  it("laisse l'URL intacte hors serverless", () => {
    expect(resolveDatasourceUrl(SESSION_URL, false)).toBe(SESSION_URL);
  });

  it("plafonne le pool en serverless", () => {
    const url = resolveDatasourceUrl(TRANSACTION_URL, true);

    expect(url).toContain(`connection_limit=${SERVERLESS_CONNECTION_LIMIT}`);
    expect(url.startsWith(TRANSACTION_URL)).toBe(true);
  });

  it("ajoute le parametre avec & quand la query string existe deja", () => {
    expect(resolveDatasourceUrl(`${TRANSACTION_URL}&x=1`, true)).toBe(
      `${TRANSACTION_URL}&x=1&connection_limit=${SERVERLESS_CONNECTION_LIMIT}`,
    );
  });

  it("ajoute le parametre avec ? quand la query string est vide", () => {
    expect(resolveDatasourceUrl("postgresql://u:p@h:5432/db", true)).toBe(
      `postgresql://u:p@h:5432/db?connection_limit=${SERVERLESS_CONNECTION_LIMIT}`,
    );
  });

  it("respecte un connection_limit deja pose dans l'environnement", () => {
    const url = `${TRANSACTION_URL}&connection_limit=5`;

    // Une valeur explicite reste prioritaire : on ne double pas le parametre.
    expect(resolveDatasourceUrl(url, true)).toBe(url);
  });

  it("ne touche pas au miroir SQLite", () => {
    expect(resolveDatasourceUrl("file:./dev.db", true)).toBe("file:./dev.db");
  });
});

describe("isSessionPooler", () => {
  it("detecte le pooler Supabase en mode session", () => {
    expect(isSessionPooler(SESSION_URL)).toBe(true);
  });

  it("laisse passer le mode transaction", () => {
    expect(isSessionPooler(TRANSACTION_URL)).toBe(false);
  });

  it("ne confond pas un autre hote sur le port 5432", () => {
    expect(isSessionPooler("postgresql://u:p@db.example.com:5432/db")).toBe(false);
  });

  it("renvoie false sur une URL illisible", () => {
    expect(isSessionPooler("file:./dev.db")).toBe(false);
    expect(isSessionPooler("")).toBe(false);
  });
});