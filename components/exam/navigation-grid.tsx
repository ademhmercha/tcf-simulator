"use client";

import { useTranslations } from "next-intl";
import { Check, Flag } from "lucide-react";

import type { ExamQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Grille de navigation entre les questions de l'epreuve. */
export function NavigationGrid({
  questions,
  currentIndex,
  onSelect,
}: {
  questions: ExamQuestion[];
  currentIndex: number;
  onSelect: (index: number) => void;
}): React.JSX.Element {
  const t = useTranslations("exam");

  return (
    <nav aria-label={t("reviewNav")} className="flex flex-wrap gap-1.5">
      {questions.map((question, index) => {
        const isCurrent = index === currentIndex;
        const isAnswered = question.selectedOptionId !== null;
        const state = isCurrent ? t("legendCurrent") : isAnswered ? t("answered") : t("unanswered");

        return (
          <button
            key={question.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={`${t("question")} ${question.number} - ${state}`}
            className={cn(
              "relative size-9 rounded-lg border text-sm font-semibold transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              isAnswered
                ? "border-success/40 bg-success/15 text-success hover:bg-success/25"
                : "border-border bg-muted/40 text-muted-foreground hover:bg-muted",
            )}
          >
            {question.number}

            {isAnswered ? (
              <Check
                className="absolute -right-1 -top-1 size-3.5 rounded-full bg-success p-0.5 text-white"
                aria-hidden
              />
            ) : null}

            {question.flagged ? (
              <Flag
                className="absolute -bottom-1 -left-1 size-3.5 rounded-full bg-warning p-0.5 text-white"
                aria-hidden
              />
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
