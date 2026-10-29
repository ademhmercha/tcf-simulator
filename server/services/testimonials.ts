import "server-only";

import type { TestimonialStatus } from "@/config/enums";
import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Avis candidats.
//
// Un compte = un avis. Toute creation ou modification repasse en `PENDING` :
// seul un administrateur peut publier. Les lectures publiques ne renvoient que
// des champs d'affichage (jamais l'e-mail ni l'identifiant du compte).
// ---------------------------------------------------------------------------

export interface PublicTestimonial {
  id: string;
  displayName: string;
  city: string | null;
  level: string | null;
  rating: number;
  comment: string;
}

export interface OwnTestimonial extends PublicTestimonial {
  status: TestimonialStatus;
}

/**
 * Avis publies, pour la page d'accueil.
 *
 * Tolerant a une table absente (schema pas encore pousse en production) : la
 * landing ne doit jamais tomber a cause d'une fonctionnalite annexe.
 */
export async function getApprovedTestimonials(limit = 6): Promise<PublicTestimonial[]> {
  try {
    return await prisma.testimonial.findMany({
      where: { status: "APPROVED" },
      orderBy: [{ rating: "desc" }, { updatedAt: "desc" }],
      take: limit,
      select: {
        id: true,
        displayName: true,
        city: true,
        level: true,
        rating: true,
        comment: true,
      },
    });
  } catch (error) {
    console.error("[testimonials] lecture impossible", error);
    return [];
  }
}

export async function getOwnTestimonial(userId: string): Promise<OwnTestimonial | null> {
  try {
    const row = await prisma.testimonial.findUnique({
      where: { userId },
      select: {
        id: true,
        displayName: true,
        city: true,
        level: true,
        rating: true,
        comment: true,
        status: true,
      },
    });
    return row ? { ...row, status: row.status as TestimonialStatus } : null;
  } catch (error) {
    console.error("[testimonials] lecture impossible", error);
    return null;
  }
}

export interface TestimonialInput {
  displayName: string;
  city?: string;
  level?: string;
  rating: number;
  comment: string;
}

/** Cree ou met a jour l'avis du candidat ; il repasse en attente de moderation. */
export async function saveOwnTestimonial(userId: string, input: TestimonialInput): Promise<void> {
  const data = {
    displayName: input.displayName,
    city: input.city ?? null,
    level: input.level ?? null,
    rating: input.rating,
    comment: input.comment,
    status: "PENDING",
  };
  await prisma.testimonial.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}

export interface AdminTestimonialRow extends PublicTestimonial {
  status: TestimonialStatus;
  createdAt: Date;
  updatedAt: Date;
  userEmail: string;
}

/** Tous les avis, a moderer en premier. */
export async function listTestimonialsForAdmin(): Promise<AdminTestimonialRow[]> {
  const rows = await prisma.testimonial.findMany({
    orderBy: { updatedAt: "desc" },
    take: 200,
    select: {
      id: true,
      displayName: true,
      city: true,
      level: true,
      rating: true,
      comment: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      user: { select: { email: true } },
    },
  });

  const order: Record<string, number> = { PENDING: 0, APPROVED: 1, REJECTED: 2 };
  return rows
    .map(({ user, status, ...rest }) => ({
      ...rest,
      status: status as TestimonialStatus,
      userEmail: user.email,
    }))
    .sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));
}

/** Retourne `false` si l'avis n'existe pas. */
export async function setTestimonialStatus(
  id: string,
  status: TestimonialStatus,
): Promise<boolean> {
  const result = await prisma.testimonial.updateMany({ where: { id }, data: { status } });
  return result.count > 0;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const result = await prisma.testimonial.deleteMany({ where: { id } });
  return result.count > 0;
}
