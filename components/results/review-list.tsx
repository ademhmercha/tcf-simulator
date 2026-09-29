"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  ChevronDown,
  FileText,
  Flag,
  Lightbulb,
  XCircle,
} from "lucide-react";

import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReviewQuestion } from "@/lib/types";

type Filter = "all" | "errors" | "correct" | "flagged" | "unanswered";

const FILTERS: Filter[] = ["all", "errors", "correct", "flagged", "unanswered"];

/**
 * Correction detaillee. Les bonnes reponses ne sont charges qu'ici, une fois
 * l'epreuve terminee : elles ne transitent jamais pendant l'examen.
 */
export function ReviewList({ questions }: { questions: ReviewQuestion[] }): React.JSX.Element {
  const t = useTranslations("results");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    switch (filter) {
      case "errors":
        return questions.filter((question) => !question.isCorrect);
      case "correct":
        return questions.filter((question) => question.isCorrect);
      case "flagged":
        return questions.filter((question) => question.flagged);
      case "unanswered":
        return questions.filter((question) => question.selectedOptionId === null);
      default:
        return questions;
    }
  }, [filter, questions]);

  const toggle = (id: string) => {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((value) => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={filter === value ? "default" : "outline"}
            onClick={() => setFilter(value)}
          >
            {t(`filter${value.charAt(0).toUpperCase()}${value.slice(1)}`)}
            <span className="ml-1 text-xs opacity-70">
              {value === "all"
                ? questions.length
                : questions.filter((question) => {
                    if (value === "errors") return !question.isCorrect;
                    if (value === "correct") return question.isCorrect;
                    if (value === "flagged") return question.flagged;
                    return question.selectedOptionId === null;
                  }).length}
            </span>
          </Button>
        ))}
      </div>

      <ul className="space-y-3">
        {filtered.map((question) => {
          const isOpen = open.has(question.id);
          const chosen = question.options.find(
            (option) => option.id === question.selectedOptionId,
          );

          return (
            <li
              key={question.id}
              className="overflow-hidden rounded-2xl border border-border/70 bg-card"
            >
              <button
                type="button"
                onClick={() => toggle(question.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-3 p-4 text-left transition-colors hover:bg-muted/40 sm:p-5"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                    question.isCorrect
                      ? "bg-success/15 text-success"
                      : "bg-destructive/15 text-destructive",
                  )}
                >
                  {question.isCorrect ? (
                    <CheckCircle2 className="size-4" aria-hidden />
                  ) : (
                    <XCircle className="size-4" aria-hidden />
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-muted-foreground">
                      {t("reviewTitle")} {question.number}
                    </span>
                    <LevelBadge level={question.level} size="sm" />
                    {question.flagged ? (
                      <Flag className="size-3.5 text-warning" aria-label={t("flagged")} />
                    ) : null}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed">{question.prompt}</span>
                  {question.documentTitle ? (
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <FileText className="size-3.5" aria-hidden />
                      {question.documentTitle}
                    </span>
                  ) : null}
                </span>

                <ChevronDown
                  className={cn(
                    "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>

              {isOpen ? (
                <div className="space-y-3 border-t border-border/70 p-4 sm:p-5">
                  <ul className="space-y-2">
                    {question.options.map((option) => {
                      const isChosen = option.id === question.selectedOptionId;
                      const isCorrect = option.isCorrect;

                      return (
                        <li
                          key={option.id}
                          className={cn(
                            "flex items-start gap-3 rounded-lg border p-3 text-sm",
                            isCorrect
                              ? "border-success/40 bg-success/10"
                              : isChosen
                                ? "border-destructive/40 bg-destructive/10"
                                : "border-border/70",
                          )}
                        >
                          <span className="font-bold">{option.label}.</span>
                          <span className="flex-1">{option.text}</span>
                          {isCorrect ? (
                            <span className="shrink-0 text-xs font-semibold text-success">
                              {t("correctAnswer")}
                            </span>
                          ) : null}
                          {isChosen && !isCorrect ? (
                            <span className="shrink-0 text-xs font-semibold text-destructive">
                              {t("yourAnswer")}
                            </span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {!chosen ? (
                    <p className="text-sm text-muted-foreground">{t("noAnswer")}</p>
                  ) : null}

                  {question.explanation ? (
                    <p className="flex items-start gap-2 rounded-lg bg-accent/40 p-3 text-sm">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {question.explanation}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          {t("noResults")}
        </p>
      ) : null}
    </div>
  );
}
