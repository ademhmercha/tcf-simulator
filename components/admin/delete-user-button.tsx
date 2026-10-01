"use client";

import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";
import { deleteUserAction } from "@/server/actions/admin";

// ---------------------------------------------------------------------------
// Suppression d'un compte.
//
// Bouton redoute, protege par un `confirm()` natif (simple, accessible). La
// Server Action revalide le role en base et interdit la suppression du dernier
// administrateur comme l'auto-suppression.
// ---------------------------------------------------------------------------

function DeleteButton({ label, disabled }: { label: string; disabled: boolean }): React.JSX.Element {
  const t = useTranslations("admin.users");
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      size="sm"
      disabled={disabled || pending}
      loading={pending}
    >
      {pending ? (
        t("deleting")
      ) : (
        <>
          <Trash2 className="size-4" aria-hidden />
          {label}
        </>
      )}
    </Button>
  );
}

export function DeleteUserButton({
  userId,
  name,
  disabled = false,
}: {
  userId: string;
  name: string;
  disabled?: boolean;
}): React.JSX.Element {
  const t = useTranslations("admin.users");
  const [state, formAction] = useFormState(deleteUserAction, INITIAL_FORM_STATE);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        const message = t("deleteConfirm", { name: name || t("unknown") });
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      <input type="hidden" name="userId" value={userId} />

      <DeleteButton label={t("delete")} disabled={disabled} />

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-1 text-xs font-medium text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}