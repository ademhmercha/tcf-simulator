// ---------------------------------------------------------------------------
// Etat partage des formulaires pilotes par Server Actions (React `useFormState`).
// Ce module n'est ni "use client" ni "use server" : il est importable des deux
// cotes.
// ---------------------------------------------------------------------------

export interface FormState {
  status: "idle" | "error" | "success";
  message?: string;
  /** Erreurs par champ, telles que renvoyees par Zod. */
  fieldErrors?: Record<string, string>;
  /** Donnees utiles renvoyees par l'action (ex. URL de redirection). */
  redirectTo?: string;
  /** Jeton anti-repetition, incremente a chaque reponse pour relancer l'action. */
  token?: number;
}

export const INITIAL_FORM_STATE: FormState = { status: "idle" };

export function zodFieldErrors(
  issues: Array<{ path: Array<string | number>; message: string }>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path.join(".") || "global";
    if (!result[key]) result[key] = issue.message;
  }
  return result;
}
