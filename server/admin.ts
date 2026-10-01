import "server-only";

import { notFound } from "next/navigation";

import { DEFAULT_LOCALE } from "@/config/enums";
import type { Role } from "@/config/enums";
import { prisma } from "@/lib/db";
import { auth } from "@/server/auth";

// ---------------------------------------------------------------------------
// Garde-fou de l'espace d'administration.
//
// Le middleware (`middleware.ts`) ne verifie que la PRESENCE d'un cookie de
// session : c'est un filtre rapide, pas une autorisation. L'autorite reste ici.
//
// Deux niveaux de verification, volontairement distincts :
//
//  1. `requireAdmin()` - pour les vues AGREGEES et sans donnee nominative
//     (vue d'ensemble, statistiques). Le role est lu dans le JWT, donc sans
//     requete base : l'ouverture de ces pages ne coute aucune lecture.
//
//  2. `requireAdminActor()` - des que la page expose une DONNEE PERSONNELLE
//     (liste des comptes, fiche d'un candidat) ou pour toute ecriture ou
//     consultation de reponses. Le role est relu en base a chaque appel : un
//     administrateur retrograde perd immediatement l'acces, au lieu de le
//     conserver pendant les 30 jours de vie de son JWT.
//
// Le role d'une session est fige a la connexion. Se fier a lui pour afficher des
// noms et des e-mails reviendrait a laisser la declassement sans effet reel.
//
// Un acces non autorise leve `notFound()` (404) plutot qu'une 403 : la page
// d'interdiction ne doit pas confirmer a un visiteur que `/admin` existe.
// ---------------------------------------------------------------------------

export interface AdminActor {
  id: string;
  email: string;
  name: string;
  role: Role;
}

/**
 * Session admin lue depuis le JWT, sans requete base.
 *
 * Reservee aux vues AGREGEES et non nominatives. Ne jamais l'utiliser pour
 * afficher un nom, un e-mail ou un score.
 */
export async function requireAdmin(): Promise<AdminActor> {
  const session = await auth();
  const user = session?.user;

  if (!user?.id || user.role !== "ADMIN") notFound();

  return {
    id: user.id,
    email: user.email ?? "",
    name: user.name ?? "",
    role: "ADMIN",
  };
}

/**
 * Administrateur revalide en base.
 *
 * A utiliser imperativement des que la page expose une donnee personnelle, et
 * avant toute ecriture. `expectedRole` permet a une action de verifier le role
 * qu'elle s'attend a trouver.
 */
export async function requireAdminActor(expectedRole: Role = "ADMIN"): Promise<AdminActor> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) notFound();

  // Le JWT peut declarer ADMIN alors que la base ne l'est plus : on compare les
  // deux, et la base fait foi.
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user || user.role !== expectedRole) notFound();

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as Role,
  };
}

/** Locale de l'URL, utilisee pour les redirections hors contexte de page. */
export const ADMIN_LOGIN_REDIRECT = `/${DEFAULT_LOCALE}/login`;