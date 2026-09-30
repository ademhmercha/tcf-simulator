"use client";

import { useId } from "react";
import { useTranslations } from "next-intl";
import { Flag, Star } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ExamQuestion } from "@/lib/types";

/**
 * Carte de la question courante : consigne, options, marqueur de relecture.
 *
 * Aucun niveau CECRL n'est affiche ni recu : la difficulte d'une question doit
 * rester inconnue du candidat pendant toute l'epreuve.
 */
export function QuestionCard({
  question,
  onSelect,
  onToggleFlag,
}: {
  question: ExamQuestion;
  onSelect: (optionId: string) => void;
  onToggleFlag: () => void;
}): React.JSX.Element {
  const t = useTranslations("exam");
  const groupId = useId();

  return (
    <article className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("question")} {question.number}
        </p>

        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={question.flagged}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <Star className={question.flagged ? "size-4 fill-warning text-warning" : "size-4"} aria-hidden />
          {question.flagged ? t("unflag") : t("markForReview")}
        </button>
      </header>

      <p className="text-lg leading-relaxed">{question.prompt}</p>

      <RadioGroup
        value={question.selectedOptionId ?? ""}
        onValueChange={onSelect}
        aria-label={`${t("question")} ${question.number}`}
      >
        {question.options.map((option) => {
          const id = `${groupId}-${option.id}`;
          return (
            <label
              key={option.id}
              htmlFor={id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent/20 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent/40"
            >
              <RadioGroupItem id={id} value={option.id} className="mt-0.5" />
              <span className="flex-1 text-sm leading-relaxed">
                <span className="font-bold">{option.label}.</span> {option.text}
              </span>
            </label>
          );
        })}
      </RadioGroup>

      {question.flagged ? (
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Flag className="size-3.5" aria-hidden />
          {t("flagged")}
        </p>
      ) : null}
    </article>
  );
}
