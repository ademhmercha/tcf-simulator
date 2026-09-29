import { NextResponse } from "next/server";

import { auth } from "@/server/auth";
import { getClock } from "@/server/services/attempts";

/**
 * Resynchronisation du chronometre.
 *
 * Le client etant susceptible de mettre en veille son onglet, il demande
 * periodiquement l'heure serveur autoritaire au lieu de se fier a son
 * compteur local.
 */
export async function GET(
  _request: Request,
  { params }: { params: { sectionRunId: string } },
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const clock = await getClock(params.sectionRunId, session.user.id);
  if (!clock) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json(clock);
}
