import "server-only";

import { headers } from "next/headers";

import { prisma } from "@/lib/db";

// ---------------------------------------------------------------------------
// Journal d'administration.
//
// Toute action sensible de l'espace admin passe par ici. Le journal existe
// d'abord pour une raison de SURETE : le detail des reponses d'un candidat est
// masque par defaut, son deverrouillage doit laisser une trace nominative.
//
// Regles de redaction :
//  - `metadata` n'accueille que des identifiants et des compteurs ;
//  - jamais le contenu d'une reponse, jamais d'e-mail, jamais de hash.
//
// ECHEC D'ECRITURE, DEUX POLITIQUES
//
// Par defaut (`strict: false`), l'echec n'annule pas l'action metier : on ne
// bloque pas une suppression de compte parce que le journal est momentanement
// indisponible, et l'erreur est seulement signalee.
//
// Pour une CONSULTATION de donnees sensibles, c'est l'inverse qui s'applique
// (`strict: true`) : si le journal ne peut pas etre ecrit, la reponse n'est pas
// transmise. Un journal qui saute en silence ne prouve rien, et une consultation
// non tracee est exactement ce que le masquage par defaut doit empecher.
// ---------------------------------------------------------------------------

export const ADMIN_ACTIONS = {
  /** Consultation du detail des reponses d'un candidat. */
  viewAnswers: "ADMIN_VIEW_ANSWERS",
  /** Changement de role d'un compte. */
  updateRole: "ADMIN_UPDATE_ROLE",
  /** Suppression definitive d'un compte et de ses donnees. */
  deleteUser: "ADMIN_DELETE_USER",
} as const;

export type AdminAction = (typeof ADMIN_ACTIONS)[keyof typeof ADMIN_ACTIONS];

export interface AuditInput {
  adminId: string;
  action: AdminAction;
  /** userId pour une action sur un compte, attemptId pour une consultation. */
  targetId?: string | null;
  /** Details non sensibles. Serialise en JSON par le service. */
  metadata?: Record<string, string | number | boolean | null>;
  /**
   * `true` : une panne du journal fait echouer l'appelant.
   * `false` (defaut) : l'appelant est ignore, l'erreur est seulement tracee.
   */
  strict?: boolean;
}

/** Echec d'ecriture du journal, distingue par le mode `strict`. */
export class AuditUnavailableError extends Error {
  constructor(action: AdminAction, cause: unknown) {
    super(`Journal d'administration indisponible (${action})`, { cause });
    this.name = "AuditUnavailableError";
  }
}

/**
 * Adresse IP du client.
 *
 * `x-forwarded-for` est une chaine de proxies : seule sa premiere entree est
 * la socket d'origine. Elle est filtree sur une longueur plausible, car la
 * valeur transmise par le client n'est pas fiable et ne doit pas non plus
 * polluer la colonne.
 */
async function clientIp(): Promise<string | null> {
  try {
    const list = await headers();
    const raw = list.get("x-forwarded-for") ?? list.get("x-real-ip");
    if (!raw) return null;
    const first = raw.split(",")[0]?.trim() ?? "";
    // IPv4 (et IPv6 compressee) suffisent : au-dela, la valeur est du bruit.
    return /^[0-9a-fA-F:.]{3,45}$/.test(first) ? first : null;
  } catch {
    return null;
  }
}

export async function recordAdminAction(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        adminId: input.adminId,
        action: input.action,
        targetId: input.targetId ?? null,
        metadata: input.metadata ? JSON.stringify(input.metadata) : null,
        ip: await clientIp(),
      },
      select: { id: true },
    });
  } catch (error) {
    // Journal indisponible. En mode strict (consultation de reponses) l'erreur
    // remonte : mieux vaut refuser une lecture que la laisser sans trace.
    console.error("[admin] audit non ecrit", input.action, error);
    if (input.strict) throw new AuditUnavailableError(input.action, error);
  }
}

export interface AuditEntry {
  id: string;
  action: string;
  targetId: string | null;
  metadata: Record<string, unknown> | null;
  ip: string | null;
  createdAt: string;
  adminName: string;
}

/** Journal recent, pour l'affichage dans l'espace admin. */
export async function getRecentAuditLog(limit = 20): Promise<AuditEntry[]> {
  const rows = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: Math.min(Math.max(limit, 1), 100),
    select: {
      id: true,
      action: true,
      targetId: true,
      metadata: true,
      ip: true,
      createdAt: true,
      admin: { select: { name: true } },
    },
  });

  return rows.map((row) => ({
    id: row.id,
    action: row.action,
    targetId: row.targetId,
    metadata: parseMetadata(row.metadata),
    ip: row.ip,
    createdAt: row.createdAt.toISOString(),
    adminName: row.admin?.name ?? "Compte supprime",
  }));
}

function parseMetadata(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}