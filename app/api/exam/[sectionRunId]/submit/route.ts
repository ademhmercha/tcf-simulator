import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { auth } from "@/server/auth";
import { AttemptError, submitSection } from "@/server/services/attempts";

/**
 * Soumission d'une epreuve.
 *
 * Repond `nextSectionRunId` s'il reste une epreuve a passer, sinon
 * `finished: true` : le client redirige alors vers la page de resultats.
 */
export async function POST(
  _request: Request,
  { params }: { params: { sectionRunId: string } },
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const run = await prisma.sectionRun.findUnique({
    where: { id: params.sectionRunId },
    select: { attemptId: true },
  });
  if (!run) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  try {
    const nextSectionRunId = await submitSection(session.user.id, params.sectionRunId);
    return NextResponse.json(
      nextSectionRunId
        ? { finished: false, nextSectionRunId }
        : { finished: true, attemptId: run.attemptId },
    );
  } catch (error) {
    if (error instanceof AttemptError) {
      const status = error.code === "FORBIDDEN" ? 403 : 400;
      return NextResponse.json({ error: error.code, message: error.message }, { status });
    }
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
