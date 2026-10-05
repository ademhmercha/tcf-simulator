import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Garde-fous du deploiement.
 *
 * Ces assertions portent sur `scripts/prisma.mjs`, qui pilote `prisma generate`
 * pendant `npm run build`. Une valeur de `DATABASE_PROVIDER` erronee ne
 * produit pas une erreur de compilation : elle produit un bundle qui se casse a
 * la premiere requete, avec le seul message « An error occurred in the Server
 * Components render ». Le build doit donc echouer bruyamment, ici.
 */

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const SCRIPT = "scripts/prisma.mjs";

function runPrismaWrapper(
  env: Record<string, string>,
  args: string[] = [],
): { status: number | null; output: string } {
  const result = spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: ROOT,
    encoding: "utf8",
    env: { ...process.env, ...env },
  });
  return { status: result.status, output: `${result.stdout ?? ""}${result.stderr ?? ""}` };
}

describe("scripts/prisma.mjs — DATABASE_PROVIDER", () => {
  it("refuse une valeur inconnue", () => {
    const { status, output } = runPrismaWrapper({ DATABASE_PROVIDER: "mysql" });

    expect(status).toBe(1);
    expect(output).toContain('doit valoir "sqlite" ou "postgresql"');
  });

  it("refuse une variable absente plutot que de retomber sur sqlite", () => {
    const { status, output } = runPrismaWrapper({ DATABASE_PROVIDER: "" });

    expect(status).toBe(1);
    expect(output).toContain("All Environments");
  });

  it("refuse sqlite sur Vercel, ou la valeur passe mais casse le deploiement", () => {
    // Sans ce garde-fou, le build SUCCEIT : le miroir SQLite est versionne,
    // `prisma generate` produit un client SQLite, et chaque page lisant la
    // base echoue ensuite avec « Server Components render ».
    const { status, output } = runPrismaWrapper({
      DATABASE_PROVIDER: "sqlite",
      VERCEL: "1",
    });

    expect(status).toBe(1);
    expect(output).toContain("Vercel");
    expect(output).toContain("postgresql");
  });

  it("accepte sqlite en local", () => {
    // En developpement le miroir SQLite est le comportement voulu : on ne doit
    // surtout pas le casser. `validate` verifie le schema sans toucher la base,
    // donc le wrapper doit laisser la commande aboutir.
    const { status } = runPrismaWrapper({ DATABASE_PROVIDER: "sqlite", VERCEL: "" }, [
      "validate",
    ]);

    expect(status).toBe(0);
  });
});
