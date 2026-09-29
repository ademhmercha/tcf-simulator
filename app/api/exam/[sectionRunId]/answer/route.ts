import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/server/auth";
import { AttemptError, saveAnswer } from "@/server/services/attempts";

const BodySchema = z.object({
  questionId: z.string().min(1),
  selectedOptionId: z.string().min(1).nullable(),
  flagged: z.boolean(),
  timeSpentSec: z.number().int().min(0).max(86_400).optional(),
});

/**
 * Sauvegarde d'une reponse.
 *
 * Le serveur reste seul juge de la validite (appartenance de la question a
 * l'epreuve, expiration du chronometre) : le client n'envoie que des
 * identifiants.
 */
export async function POST(
  request: Request,
  { params }: { params: { sectionRunId: string } },
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  try {
    const result = await saveAnswer({
      userId: session.user.id,
      sectionRunId: params.sectionRunId,
      ...parsed.data,
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AttemptError) {
      const status =
        error.code === "EXPIRED"
          ? 409
          : error.code === "FORBIDDEN"
            ? 403
            : error.code === "NOT_FOUND"
              ? 404
              : 400;
      return NextResponse.json({ error: error.code, message: error.message }, { status });
    }
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
