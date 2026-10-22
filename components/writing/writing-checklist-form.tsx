"use client";

import { useMemo, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WRITING_CHECKLIST_IDS, computeSelfScore, countChecked } from "@/data/writing";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import { recordWritingAttemptAction } from "@/server/actions/writing";

function SubmitButton(): React.JSX.Element {
  const t = useTranslations("writing.evaluation");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" loading={pending}>
      {pending ? t("saving") : t("save")}
    </Button>
  );
}

/**
 * Etape d'auto-evaluation, enregistree cote serveur.
 *
 * Le score est recalcule par le serveur a partir de la checklist : le client
 * n'envoie que des cases a cocher, jamais une note.
 */
export function WritingChecklistForm({
  slug,
  durationSeconds,
  minWords,
  maxWords,
}: {
  slug: string;
  durationSeconds: number;
  minWords: number;
  maxWords: number;
}): React.JSX.Element {
  const t = useTranslations("writing.evaluation");
  const tc = useTranslations("writing.checklist");
  const [state, formAction] = useFormState(recordWritingAttemptAction, INITIAL_FORM_STATE);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [wordCount, setWordCount] = useState("");

  const score = useMemo(() => computeSelfScore(checked), [checked]);
  const count = useMemo(() => countChecked(checked), [checked]);

  const words = Number.parseInt(wordCount, 10);
  const hasWords = Number.isFinite(words);
  const tooShort = hasWords && words > 0 && words < minWords;
  const tooLong = hasWords && words > maxWords;

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="durationSeconds" value={String(durationSeconds)} />
      <input type="hidden" name="wordCount" value={hasWords ? String(words) : "0"} />
      <input type="hidden" name="checklist" value={JSON.stringify(checked)} />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{t("wordsLabel")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("wordsHint")}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {t("score")}
            </p>
            <p className="font-display text-3xl font-extrabold tabular-nums">{score}%</p>
            <p className="text-xs text-muted-foreground">
              {count} / {WRITING_CHECKLIST_IDS.length} {t("checked")}
            </p>
          </div>
        </div>

        <div className="mt-4 max-w-xs space-y-2">
          <Label htmlFor="writing-words">{t("wordsLabel")}</Label>
          <Input
            id="writing-words"
            name="words"
            type="number"
            inputMode="numeric"
            min={0}
            max={5000}
            value={wordCount}
            onChange={(event) => setWordCount(event.target.value)}
            aria-describedby="writing-words-hint"
          />
          <p id="writing-words-hint" className="text-xs text-muted-foreground">
            {t("wordsHint")}
          </p>
          {tooShort ? (
            <p className="flex items-start gap-2 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {t("wordsTooShort")}
            </p>
          ) : null}
          {tooLong ? (
            <p className="flex items-start gap-2 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
              {t("wordsTooLong")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-lg font-bold">{t("checklistTitle")}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        <div className="mt-5 space-y-2.5">
          {WRITING_CHECKLIST_IDS.map((id) => (
            <label
              key={id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-primary-soft/40"
            >
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[hsl(var(--primary))]"
                checked={Boolean(checked[id])}
                onChange={(event) =>
                  setChecked((previous) => ({ ...previous, [id]: event.target.checked }))
                }
              />
              <span className="text-sm leading-relaxed">{tc(id)}</span>
            </label>
          ))}
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="flex flex-wrap items-center gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{state.message}</span>
          {state.redirectTo ? (
            <a href={state.redirectTo} className="font-semibold underline">
              {t("loginRequired")}
            </a>
          ) : null}
        </div>
      ) : null}

      {state.status === "success" ? (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{t("saved")}</span>
          {state.redirectTo ? (
            <a href={state.redirectTo} className="font-semibold underline">
              {t("historyLink")}
            </a>
          ) : null}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}
