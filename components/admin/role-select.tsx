"use client";

import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateUserRoleAction } from "@/server/actions/admin";
import type { Role } from "@/config/enums";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";

// ---------------------------------------------------------------------------
// Changement de role d'un utilisateur.
//
// Un `<select>` Radix ne soumet pas de formulaire tout seul : la modification
// reste en attente jusqu'au clic sur « Enregistrer ». Aucun changement de role
// n'est donc applique par un simple changement de liste, ce qui serait
// irreversible d'une erreur de clic.
//
// Le composant n'est pas rendu pour le compte de l'acteur : le serveur
// refuse l'auto-modification (`FORBIDDEN_SELF`), autant ne pas proposer un
// controle qui echouerait toujours.
// ---------------------------------------------------------------------------

function SubmitRole(): React.JSX.Element {
  const t = useTranslations("admin.users");
  const tCommon = useTranslations("common");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending} loading={pending}>
      {pending ? t("saving") : tCommon("save")}
    </Button>
  );
}

export function RoleSelect({
  userId,
  currentRole,
  canEdit = true,
}: {
  userId: string;
  currentRole: Role;
  canEdit?: boolean;
}): React.JSX.Element {
  const t = useTranslations("admin.users");
  const tCommon = useTranslations("common");
  const [state, formAction] = useFormState(updateUserRoleAction, INITIAL_FORM_STATE);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />

      <Select name="role" defaultValue={currentRole} disabled={!canEdit}>
        <SelectTrigger className="h-8 w-28" aria-label={t("changeRole")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USER">{t("user")}</SelectItem>
          <SelectItem value="ADMIN">{t("admin")}</SelectItem>
        </SelectContent>
      </Select>

      {canEdit ? <SubmitRole /> : null}

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-xs text-destructive">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}