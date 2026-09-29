"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, ChevronDown, FileText, Lightbulb, Search } from "lucide-react";

import { LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Level } from "@/config/enums";
import { ALL_LEVELS, type CorrectionQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

type LevelFilter = Level | "all";

/**
 * Corrigé detaille d'une épreuve : chaque question avec ses options, la bonne
 * réponse et l'explication. Les questions sont repliees par defaut, car une
 * épreuve de compréhension écrite affiche un document par question.
 */
export function CorrectionList({
  questions,
}: {
  questions: CorrectionQuestion[];
}): React.JSX.Element {
  const t = useTranslations("corrections");
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<LevelFilter>("all");
  const [open, setOpen] = useState<Set<string>>(new Set());

  const levels = useMemo(
    () => ALL_LEVELS.filter((candidate) => questions.some((q) => q.level === candidate)),
    [questions],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return questions.filter((question) => {
      if (level !== "all" && question.level !== level) return false;
      if (!needle) return true;

      return (
        question.prompt.toLowerCase().includes(needle) ||
        question.explanation.toLowerCase().includes(needle) ||
        (question.documentTitle ?? "").toLowerCase().includes(needle) ||
        question.options.some((option) => option.text.toLowerCase().includes(needle))
      );
    });
  }, [level, query, questions]);

  const toggle = (id: string) => {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOpen = filtered.length > 0 && filtered.every((question) => open.has(question.id));

  const toggleAll = () => {
    setOpen(allOpen ? new Set() : new Set(filtered.map((question) => question.id)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
            className="pl-9"
          />
        </div>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={toggleAll}
          disabled={filtered.length === 0}
        >
          {allOpen ? t("hideAll") : t("showAll")}
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={level === "all" ? "default" : "outline"}
          onClick={() => setLevel("all")}
        >
          {t("filterAll")}
          <span className="ml-1 text-xs opacity-70">{questions.length}</span>
        </Button>

        {levels.map((candidate) => {
          const count = questions.filter((question) => question.level === candidate).length;

          return (
            <Button
              key={candidate}
              type="button"
              size="sm"
              variant={level === candidate ? "default" : "outline"}
              onClick={() => setLevel(candidate)}
            >
              {candidate}
              <span className="ml-1 text-xs opacity-70">{count}</span>
            </Button>
          );
        })}
      </div>

      <ul className="space-y-3">
        {filtered.map((question) => {
          const isOpen = open.has(question.id);

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
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-xs font-bold tabular-nums text-primary">
                  {question.number}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <LevelBadge level={question.level} size="sm" />
                    {question.category ? (
                      <span className="text-xs text-muted-foreground">{question.category}</span>
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
                <div className="space-y-4 border-t border-border/70 p-4 sm:p-5">
                  {question.documentContent ? (
                    <DocumentBlock
                      content={question.documentContent}
                      title={question.documentTitle}
                    />
                  ) : null}

                  <ul className="space-y-2">
                    {question.options.map((option) => (
                      <li
                        key={option.id}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border p-3 text-sm",
                          option.isCorrect
                            ? "border-success/40 bg-success/10"
                            : "border-border/70",
                        )}
                      >
                        <span className="font-bold">{option.label}.</span>
                        <span className="flex-1">{option.text}</span>
                        {option.isCorrect ? (
                          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-success">
                            <CheckCircle2 className="size-3.5" aria-hidden />
                            {t("correctAnswer")}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>

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

/**
 * Document de compréhension écrite, une ligne par entrée. Les explanations
 * renvoient souvent à « la dernière ligne » : la numérotation permet de les
 * vérifier. La numérotation suit l'ordre brut du texte, les lignes vides de fin
 * sont donc retirees sans décaler les indices.
 */
function DocumentBlock({
  content,
  title,
}: {
  content: string;
  title: string | null;
}): React.JSX.Element {
  const t = useTranslations("corrections");
  const lines = content.replace(/\s+$/, "").split("\n");

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <FileText className="size-3.5" aria-hidden />
        {t("document")}
        {title ? <span className="font-normal normal-case"> — {title}</span> : null}
      </p>

      <ol className="max-h-80 space-y-1 overflow-y-auto rounded-xl border border-border/70 bg-muted/30 p-4 text-sm leading-relaxed">
        {lines.map((line, index) => (
          <li key={index} className="flex gap-3">
            <span
              className="w-5 shrink-0 text-right text-xs tabular-nums text-muted-foreground"
              aria-hidden
            >
              {index + 1}
            </span>
            <span>
              <span className="sr-only">{t("lineLabel", { number: index + 1 })}: </span>
              {line}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
