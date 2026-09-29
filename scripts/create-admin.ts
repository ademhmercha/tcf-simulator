import { PrismaClient } from "@prisma/client";

import { hashPassword, PasswordSchema } from "../lib/security";
import { arg, loadDotEnv } from "./cli-utils";

// ---------------------------------------------------------------------------
// Creation / reinitialisation d'un compte administrateur.
//
//   npm run admin:create -- --email=admin@x.com --password="Motdepasse1"
// ---------------------------------------------------------------------------

loadDotEnv();

const db = new PrismaClient();

async function main(): Promise<void> {
  const email = (arg("email") ?? process.env.SEED_ADMIN_EMAIL ?? "admin@tcf-simulator.local")
    .trim()
    .toLowerCase();
  const rawPassword = arg("password") ?? process.env.SEED_ADMIN_PASSWORD ?? "Admin!2345";
  const name = arg("name") ?? "Administrateur";

  const passwordCheck = PasswordSchema.safeParse(rawPassword);
  if (!passwordCheck.success) {
    console.error("Mot de passe trop faible :");
    for (const issue of passwordCheck.error.issues) console.error(`  - ${issue.message}`);
    process.exit(1);
  }

  const passwordHash = await hashPassword(rawPassword);

  const user = await db.user.upsert({
    where: { email },
    update: { role: "ADMIN", name, passwordHash },
    create: { email, name, role: "ADMIN", passwordHash, locale: "fr" },
  });

  console.log(`Administrateur pret : ${user.email} (role=${user.role})`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
