"use client";

import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import { moderateTestimonialAction } from "@/server/actions/testimonials";
import type { TestimonialStatus } from "@/config/enums";

// ---------------------------------------------------------------------------
// Boutons de moderation d'un avis. Chaque bouton envoie sa decision dans le
// meme formulaire ; le serveur revalide l'administrateur en base.
// ---------------------------------------------------------------------------

function Decision({
  value,
  label,
  variant,
}: {
  value: "APPROVED" | "REJECTED" | "DELETE";
  label: string;
  variant: "default" | "outline" | "ghost";
}): React.JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      name="decision"
      value={value}
      size="sm"
      variant={variant}
      disabled={pending}
      className={value === "DELETE" ? "text-destructive hover:text-destructive" : undefined}
    >
      {label}
    </Button>
  );
}

export function ModerationButtons({
  id,
  status,
}: {
  id: string;
  status: TestimonialStatus;
}): React.JSX.Element {
  const t = useTranslations("admin.reviews");
  const [state, formAction] = useFormState(moderateTestimonialAction, INITIAL_FORM_STATE);

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={id} />
      {status !== "APPROVED" ? <Decision value="APPROVED" label={t("approve")} variant="default" /> : null}
      {status !== "REJECTED" ? <Decision value="REJECTED" label={t("reject")} variant="outline" /> : null}
      <Decision value="DELETE" label={t("delete")} variant="ghost" />
      {state.status === "error" ? (
        <span role="alert" className="text-xs text-destructive">
          {state.message}
        </span>
      ) : null}
    </form>
  );
}
