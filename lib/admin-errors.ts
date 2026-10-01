// ---------------------------------------------------------------------------
// Codes d'erreur de l'espace d'administration.
//
// Ce module est volontairement SANS `server-only` : il est importe a la fois par
// les services (types) et par les composants clients (libelles traduits).
// Il ne contient aucune donnee, aucun secret et aucune logique metier.
//
// Le message affichant n'est jamais construit a partir de l'etat de la base :
// un code suffit, ce qui empeche de divulguer « il existe un autre
// administrateur » ou « ce compte a bien existe ».
// ---------------------------------------------------------------------------

export type AdminWriteError =
  | "FORBIDDEN_SELF"
  | "LAST_ADMIN"
  | "NOT_FOUND"
  | "INVALID_ROLE"
  | "INVALID_TARGET";

/**
 * Erreurs d'ACTION (message affiche a l'admin), et non d'ecriture metier :
 * s'y ajoutent la limitation de debit et l'indisponibilite du journal.
 */
export type AdminActionError = AdminWriteError | "RATE_LIMITED" | "AUDIT_UNAVAILABLE";

/** Cle de traduction traduite pour chaque code. */
const ERROR_KEYS: Record<AdminActionError, string> = {
  FORBIDDEN_SELF: "errors.forbiddenSelf",
  LAST_ADMIN: "errors.lastAdmin",
  INVALID_ROLE: "errors.invalidRole",
  INVALID_TARGET: "errors.failed",
  RATE_LIMITED: "errors.rateLimited",
  NOT_FOUND: "errors.notFound",
  AUDIT_UNAVAILABLE: "errors.auditUnavailable",
};

/** Message traduit d'un code d'erreur, via `useTranslations("admin")`. */
export function adminErrorKey(code: AdminActionError): string {
  return ERROR_KEYS[code] ?? ERROR_KEYS.NOT_FOUND;
}