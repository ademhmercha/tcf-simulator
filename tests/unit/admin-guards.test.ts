import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// `server-only` est un marqueur : il leve une erreur hors contexte React
// Server. Sous Vitest il faut donc le neutraliser, sinon le service ne peut pas
// etre importe du tout.
vi.mock("server-only", () => ({}));

import { prisma } from "@/lib/db";
import {
  deleteUserAccount,
  getAttemptAnswersForAdmin,
  setUserRole,
} from "@/server/services/admin-users";

// ---------------------------------------------------------------------------
// Gardes d'ecriture de l'espace d'administration.
//
// Ces regles ne sont pas exprimees par l'interface mais par le service. Un
// formulaire qui les contourne (requete mimee, ancienne version du JS) ne doit
// pas pouvoir demarrer un administrateur unique ni detruire ses propres donnees.
//
// Ces tests s'executent sur la base de developpement. Deux precautions :
//  - tous les objets crees portent un prefixe unique, nettoye en `afterAll` ;
//  - les roles des administrateurs EXISTANTS sont captures puis restaures, car
//    le test « dernier administrateur » doit temporarily les retrograder.
// ---------------------------------------------------------------------------

const STAMP = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const USER_PREFIX = `admin-guard-`;
const TEST_PREFIX = `admin-guard-test-`;

async function createUser(role: "ADMIN" | "USER") {
  return prisma.user.create({
    data: {
      email: `${USER_PREFIX}${role.toLowerCase()}-${STAMP}-${Math.random().toString(36).slice(2, 8)}@test.local`,
      name: "Jeton de test",
      role,
      // Le service ne compare jamais les empreintes : un hash factice suffit
      // et evite de payer bcrypt pour chaque jeton.
      passwordHash: "not-a-real-hash",
      locale: "fr",
    },
  });
}

let preexistingAdminIds: string[] = [];

beforeAll(async () => {
  preexistingAdminIds = (
    await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } })
  ).map((row) => row.id);
});

// Nettoyage apres CHAQUE test, pas seulement a la fin : un jeton
// administrateur laisse par un test precedent fausserait le comptage du test
// suivant (« dernier administrateur »).
afterEach(async () => {
  await prisma.user.deleteMany({ where: { email: { contains: USER_PREFIX } } });
  await prisma.test.deleteMany({ where: { slug: { contains: TEST_PREFIX } } });
});

afterAll(async () => {
  // Restauration indispensable : sans elle, `npm test` laisserait le compte
  // administrateur de developpement en role candidat.
  if (preexistingAdminIds.length > 0) {
    await prisma.user.updateMany({
      where: { id: { in: preexistingAdminIds } },
      data: { role: "ADMIN" },
    });
  }
  await prisma.$disconnect();
});

describe("setUserRole", () => {
  it("refuse qu'un administrateur retire son propre role", async () => {
    const admin = await createUser("ADMIN");

    expect(await setUserRole(admin.id, admin.id, "USER")).toEqual({
      ok: false,
      error: "FORBIDDEN_SELF",
    });
    expect((await prisma.user.findUnique({ where: { id: admin.id } }))?.role).toBe("ADMIN");
  });

  it("l'acteur ne peut pas se retrograder : c'est lui qui garantit qu'un admin reste", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("USER");

    // Deux administrateurs seulement, dont l'acteur.
    await prisma.user.updateMany({
      where: { role: "ADMIN", id: { not: actor.id } },
      data: { role: "USER" },
    });
    expect(await prisma.user.count({ where: { role: "ADMIN" } })).toBe(1);

    // L'acteur qui se cible lui-meme est refuse : c'est cette regle, et non le
    // comptage, qui empeche de finir a zero administrateur.
    expect(await setUserRole(actor.id, actor.id, "USER")).toEqual({
      ok: false,
      error: "FORBIDDEN_SELF",
    });

    // La cible est un candidat : la promotion aboutit normalement.
    expect(await setUserRole(actor.id, target.id, "ADMIN")).toMatchObject({ ok: true });
    expect(await prisma.user.count({ where: { role: "ADMIN" } })).toBe(2);
  });

  it("retrograder un autre administrateur est autorise", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("ADMIN");

    // L'acteur subsiste apres l'operation : la plateforme n'est pas verrouillee.
    expect(await setUserRole(actor.id, target.id, "USER")).toMatchObject({
      ok: true,
      role: "USER",
    });
    expect((await prisma.user.findUnique({ where: { id: target.id } }))?.role).toBe("USER");
    expect((await prisma.user.findUnique({ where: { id: actor.id } }))?.role).toBe("ADMIN");
  });

  it("refuse un role inconnu", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("USER");

    expect(await setUserRole(actor.id, target.id, "SUPERUSER" as never)).toEqual({
      ok: false,
      error: "INVALID_ROLE",
    });
  });

  it("refuse une cible inexistante", async () => {
    const actor = await createUser("ADMIN");

    expect(await setUserRole(actor.id, "cuid-inexistant", "ADMIN")).toEqual({
      ok: false,
      error: "NOT_FOUND",
    });
  });

  it("promotion et retrogradation ordinaires", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("USER");

    expect(await setUserRole(actor.id, target.id, "ADMIN")).toMatchObject({
      ok: true,
      role: "ADMIN",
    });
    expect((await prisma.user.findUnique({ where: { id: target.id } }))?.role).toBe("ADMIN");

    expect(await setUserRole(actor.id, target.id, "USER")).toMatchObject({
      ok: true,
      role: "USER",
    });
    expect((await prisma.user.findUnique({ where: { id: target.id } }))?.role).toBe("USER");
  });

  it("un role deja pose est un succes sans ecriture", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("USER");

    expect(await setUserRole(actor.id, target.id, "USER")).toEqual({ ok: true, role: "USER" });
  });
});

describe("deleteUserAccount", () => {
  it("refuse l'auto-suppression", async () => {
    const admin = await createUser("ADMIN");

    expect(await deleteUserAccount(admin.id, admin.id)).toEqual({
      ok: false,
      error: "FORBIDDEN_SELF",
    });
    expect(await prisma.user.findUnique({ where: { id: admin.id } })).not.toBeNull();
  });

  it("permet de supprimer un autre administrateur", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("ADMIN");

    await prisma.user.updateMany({
      where: { role: "ADMIN", id: { notIn: [actor.id, target.id] } },
      data: { role: "USER" },
    });
    expect(await prisma.user.count({ where: { role: "ADMIN" } })).toBe(2);

    // L'acteur reste administrateur apres la suppression.
    expect(await deleteUserAccount(actor.id, target.id)).toEqual({ ok: true });
    expect(await prisma.user.findUnique({ where: { id: target.id } })).toBeNull();
    expect(await prisma.user.count({ where: { role: "ADMIN" } })).toBe(1);
  });

  it("supprime le compte et ses donnees en cascade", async () => {
    const actor = await createUser("ADMIN");
    const target = await createUser("USER");
    const test = await createTestWithQuestion();

    const attempt = await prisma.attempt.create({
      data: {
        userId: target.id,
        testId: test.testId,
        status: "SUBMITTED",
        startedAt: new Date(),
        finishedAt: new Date(),
        totalScore: 1,
        maxScore: 1,
        answers: { create: [{ questionId: test.questionId, isCorrect: true }] },
      },
    });

    expect(await deleteUserAccount(actor.id, target.id)).toEqual({ ok: true });
    expect(await prisma.user.findUnique({ where: { id: target.id } })).toBeNull();
    expect(await prisma.attempt.findUnique({ where: { id: attempt.id } })).toBeNull();
    expect(await prisma.answer.count({ where: { attemptId: attempt.id } })).toBe(0);
  });

  it("refuse une cible inexistante", async () => {
    const actor = await createUser("ADMIN");

    expect(await deleteUserAccount(actor.id, "cuid-inexistant")).toEqual({
      ok: false,
      error: "NOT_FOUND",
    });
  });
});

describe("getAttemptAnswersForAdmin", () => {
  it("n'expose que les reponses de la tentative demandee", async () => {
    const owner = await createUser("USER");
    const stranger = await createUser("USER");
    const admin = await createUser("ADMIN");

    const test = await createTestWithQuestion();
    const option = test.wrongOptionId;

    const attempt = await prisma.attempt.create({
      data: {
        userId: owner.id,
        testId: test.testId,
        status: "SUBMITTED",
        startedAt: new Date(),
        finishedAt: new Date(),
        totalScore: 0,
        maxScore: 1,
        answers: {
          create: [{ questionId: test.questionId, selectedOptionId: option, isCorrect: false }],
        },
      },
    });

    const own = await getAttemptAnswersForAdmin(owner.id, attempt.id);
    expect(own.ok).toBe(true);
    if (own.ok) {
      expect(own.answers).toHaveLength(1);
      const [answer] = own.answers;
      expect(answer?.selectedOptionId).toBe(option);
      expect(answer?.correctLabel).toBe("A");
      expect(answer?.correctText).toBe("Bonne reponse");
    }

    // Un tiers ne peut pas extraire ces reponses en connaissant l'identifiant
    // de la tentative : c'est la protection contre l'IDOR.
    expect(await getAttemptAnswersForAdmin(stranger.id, attempt.id)).toEqual({
      ok: false,
      error: "NOT_FOUND",
    });

    // MEME un administrateur doit passer par le perimetre du candidat : le
    // service ne doit jamais devenir une porte d'entree transverse.
    expect(await getAttemptAnswersForAdmin(admin.id, attempt.id)).toEqual({
      ok: false,
      error: "NOT_FOUND",
    });
  });

  it("signale une tentative inexistante", async () => {
    const admin = await createUser("ADMIN");

    expect(await getAttemptAnswersForAdmin(admin.id, "cuid-inexistant")).toEqual({
      ok: false,
      error: "NOT_FOUND",
    });
  });
});

/** Test minimal contenant une question, ses options et l'identifiant de la section. */
async function createTestWithQuestion() {
  const created = await prisma.test.create({
    data: {
      title: `Test garde ${STAMP}`,
      slug: `${TEST_PREFIX}${STAMP}`,
      durationMinutes: 10,
      sections: {
        create: {
          title: "Epreuve",
          type: "STRUCTURE",
          order: 1,
          durationMinutes: 10,
          // Champ denormalise : le service l'ajoute apres l'import, un jeu
          // d'essai doit le renseigner comme le ferait le code de production.
          questionCount: 1,
          questions: {
            create: {
              number: 1,
              prompt: "Enonce de controle",
              level: "A2",
              points: 1,
              // Champ obligatoire en base, sans valeur par defaut.
              explanation: "Explication de controle",
              options: {
                create: [
                  { label: "A", text: "Bonne reponse", isCorrect: true },
                  { label: "B", text: "Mauvaise reponse", isCorrect: false },
                ],
              },
            },
          },
        },
      },
    },
    include: { sections: { include: { questions: { include: { options: true } } } } },
  });

  // Un jeu d'essai incomplet doit echouer bruyamment plutot que de renvoyer des
  // identifiants vides que les tests ensuite reutiliseraient.
  const question = created.sections[0]?.questions[0];
  if (!question) throw new Error("fixture: section ou question absente");
  const wrong = question.options.find((option) => !option.isCorrect);
  if (!wrong) throw new Error("fixture: option fausse absente");

  return {
    testId: created.id,
    questionId: question.id,
    wrongOptionId: wrong.id,
  };
}