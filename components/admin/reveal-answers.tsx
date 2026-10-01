"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { useTranslations } from "next-intl";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

import { Badge, LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDuration } from "@/lib/time";
import {
  revealAttemptAnswersAction,
  type RevealAnswersState,
} from "@/server/actions/admin";

// ---------------------------------------------------------------------------
// Deverrouillage du detail des reponses d'une tentative.
//
// Le masquage est maintenu en permanence : le detail n'existe pas dans la page
// tant que l'admin n'a pas clique. Une fois obtenu, il est conserve dans
// l'etat du composant et peut etre masque de nouveau SANS nouvelle requete —
// masquer n'est pas une consultation.
//
// Chaque AFFICHAGE passe par la Server Action, donc par une ligne
// `ADMIN_VIEW_ANSWERS` dans le journal. Un simple `display: none` n'aurait pas
// trace l'acces : c'est le point de securite de ce composant.
// ---------------------------------------------------------------------------

const INITIAL: RevealAnswersState = { status: "idle" };

export function RevealAnswers({
  userId,
  attemptId,
  attemptLabel,
}: {
  userId: string;
  attemptId: string;
  attemptLabel: string;
}): React.JSX.Element {
  const t = useTranslations("admin.users");
  const [state, formAction, pending] = useFormState(revealAttemptAnswersAction, INITIAL);
  const [hidden, setHidden] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const answers = state.status === "success" ? state.answers : null;
  const visible = answers !== null && !hidden;

  useEffect(() => {
    if (state.status !== "success") return;
    setHidden(false);
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state]);

  return (
    <div
      ref={containerRef}
      className="space-y-3 rounded-xl border border-dashed border-border p-4"
    >
      <form
        action={formAction}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="attemptId" value={attemptId} />

        <div className="min-w-0">
          <p className="font-medium">{attemptLabel}</p>
          <p className="text-xs text-muted-foreground">{t("revealHint")}</p>
        </div>

        {/* Masquer : action purement visuelle, aucun appel, aucune trace. */}
        {visible ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => setHidden(true)}>
            <EyeOff className="size-4" aria-hidden />
            {t("hideAnswers")}
          </Button>
        ) : (
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={pending}
            loading={pending}
          >
            {!pending ? <Eye className="size-4" aria-hidden /> : null}
            {t("revealAnswers")}
          </Button>
        )}
      </form>

      {state.status === "error" && state.code ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {t(`errors.${state.code}`)}
        </p>
      ) : null}

      {visible && answers && answers.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("answersDetail")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {answers.map((answer) => (
              <div
                key={answer.questionId}
                className="space-y-2 rounded-xl border border-border p-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="min-w-0 font-medium leading-tight">
                    {answer.questionNumber}. {answer.prompt}
                  </p>
                  <div className="flex shrink-0 items-center gap-2">
                    <LevelBadge level={answer.level} size="sm" />
                    {answer.isCorrect ? (
                      <Badge variant="success" size="sm">{t("correct")}</Badge>
                    ) : (
                      <Badge variant="destructive" size="sm">{t("incorrect")}</Badge>
                    )}
                    {answer.flagged ? (
                      <Badge variant="warning" size="sm">{t("flagged")}</Badge>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span>
                    {t("section")}: {answer.sectionTitle}
                  </span>
                  {answer.category ? <span>{t("category")}: {answer.category}</span> : null}
                  {answer.timeSpentSec !== null ? (
                    <span>
                      {t("timeSpent")}: {formatDuration(answer.timeSpentSec * 1000)}
                    </span>
                  ) : null}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ChoiceBox
                    label={t("selected")}
                    pickedLabel={answer.selectedLabel}
                    pickedText={answer.selectedText}
                    emptyLabel={t("notAnswered")}
                    tone={answer.isCorrect ? "success" : "destructive"}
                  />
                  <ChoiceBox
                    label={t("correctAnswer")}
                    pickedLabel={answer.correctLabel}
                    pickedText={answer.correctText}
                    tone="success"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}

      {visible && answers && answers.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("noAnswers")}</p>
      ) : null}
    </div>
  );
}

/** Encart « reponse du candidat » ou « reponse attendue ». */
function ChoiceBox({
  label,
  pickedLabel,
  pickedText,
  emptyLabel,
  tone = "muted",
}: {
  label: string;
  pickedLabel: string | null;
  pickedText: string | null;
  emptyLabel?: string;
  tone?: "muted" | "success" | "destructive";
}): React.JSX.Element {
  const t = useTranslations("admin.users");

  if (pickedLabel === null && pickedText === null) {
    return (
      <div className="rounded-lg bg-muted/60 p-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-muted-foreground">{emptyLabel ?? "-"}</p>
      </div>
    );
  }

  return (
    <details
      open
      className={`rounded-lg border p-2.5 ${
        tone === "success"
          ? "border-success/40 bg-success/5"
          : tone === "destructive"
            ? "border-destructive/40 bg-destructive/5"
            : "border-border bg-muted/60"
      }`}
    >
      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        <ChevronDown className="size-3 transition-transform open:rotate-180" aria-hidden />
      </summary>
      <p className="mt-1 text-sm">
        <span className="font-display font-bold">{pickedLabel ?? "-"}</span>
        {pickedText ? <> — {pickedText}</> : null}
      </p>
    </details>
  );
}