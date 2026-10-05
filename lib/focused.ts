// ---------------------------------------------------------------------------
// Perimetre d'une reprise ciblee sur les erreurs.
//
// Isole de `server/services/attempts.ts` pour rester reutilisable par les
// scripts de maintenance, qui ne doivent pas charger le service complet.
// ---------------------------------------------------------------------------

/**
 * Lit `Attempt.focusedQuestionIds`.
 *
 * Retourne `null` pour une tentative normale (toutes les questions de la
 * section sont jouables) et un `Set` de questions pour une reprise ciblee.
 * Une valeur corrompue est traitee comme « pas de filtre » afin de ne jamais
 * bloquer un candidat sur une donnee de base invalide.
 */
export function parseFocusedQuestionIds(raw: string | null): Set<string> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return new Set(parsed.filter((value): value is string => typeof value === "string"));
  } catch {
    return null;
  }
}