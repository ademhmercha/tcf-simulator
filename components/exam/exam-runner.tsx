"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CloudOff,
  Info,
  Loader2,
  Send,
  WifiOff,
} from "lucide-react";

import { DocumentPanel } from "@/components/exam/document-panel";
import { ExamTimer } from "@/components/exam/exam-timer";
import { NavigationGrid } from "@/components/exam/navigation-grid";
import { QuestionCard } from "@/components/exam/question-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/navigation";
import { timerPhase } from "@/lib/time";
import type { ExamPayload, ExamQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";

const HEARTBEAT_MS = 30_000;
const SAVE_DEBOUNCE_MS = 400;

type SaveState = "idle" | "saving" | "saved" | "error";

/** Reponse mise en file d'attente, telle qu'envoyee a `saveAnswer`. */
interface PendingAnswer {
  selectedOptionId: string | null;
  flagged: boolean;
  timeSpentSec: number;
}

interface ClockResponse {
  expiresAt: number;
  serverNow: number;
  remainingMs: number;
}

/**
 * Coeur de l'epreuve.
 *
 * Principes :
 * - le serveur est seul autoritaire du temps : le client ne fait que
 *   convertir `expiresAt` en une echeance locale et resynchronise periodiquement ;
 * - les reponses sont des identifiants envoyes a `saveAnswer`, qui revalide
 *   tout cote serveur ;
 * - les modifications sont mises en file d'attente et drainées une par une,
 *   ce qui garantit l'ordre et evite deux requetes concurrentes pour une
 *   meme question.
 */
export function ExamRunner({ payload }: { payload: ExamPayload }): React.JSX.Element {
  const t = useTranslations("exam");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [questions, setQuestions] = useState<ExamQuestion[]>(payload.questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remaining, setRemaining] = useState(
    Math.max(0, payload.expiresAt - payload.serverNow),
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [online, setOnline] = useState(true);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [timeUpOpen, setTimeUpOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // "save" = des reponses n'ont pas pu etre enregistrees avant soumission,
  // "submit" = la soumission elle-meme a echoue.
  const [submitError, setSubmitError] = useState<"save" | "submit" | null>(null);

  // Echeance locale calculee a partir de l'horloge serveur.
  const deadlineRef = useRef(Date.now() + (payload.expiresAt - payload.serverNow));
  // File d'attente des sauvegardes : Map<questionId, patch>.
  const pendingRef = useRef(new Map<string, PendingAnswer>());
  // Temps passe sur chaque question, en secondes cumulees.
  const timeSpentRef = useRef<Record<string, number>>({});
  const debounceRef = useRef(0);
  const flushingRef = useRef(false);
  const submittedRef = useRef(false);

  const current = questions[currentIndex];
  const answeredCount = useMemo(
    () => questions.filter((question) => question.selectedOptionId !== null).length,
    [questions],
  );
  const activeDocumentId = current?.documentId ?? null;
  const hasDocuments = payload.documents.length > 0;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const applyServerClock = useCallback((expiresAt: number, serverNow: number) => {
    deadlineRef.current = Date.now() + (expiresAt - serverNow);
  }, []);

  // ----------------------------- Sauvegarde ------------------------------

  const flush = useCallback(async (): Promise<boolean> => {
    if (flushingRef.current) return pendingRef.current.size === 0;
    flushingRef.current = true;

    try {
      while (pendingRef.current.size > 0) {
        const entry = pendingRef.current.entries().next();
        if (entry.done) break;
        const [questionId, patch] = entry.value;
        pendingRef.current.delete(questionId);

        setSaveState("saving");
        try {
          const response = await fetch(`/api/exam/${payload.sectionRunId}/answer`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ questionId, ...patch }),
          });

          if (response.status === 409) {
            // Temps ecoule cote serveur : on bascule sur l'ecran de fin.
            setTimeUpOpen(true);
            return false;
          }

          if (!response.ok) {
            // On remet en file : l'ordre reste preserve.
            pendingRef.current.set(questionId, patch);
            setSaveState("error");
            return false;
          }

          const data = (await response.json()) as { expiresAt: number; serverNow: number };
          applyServerClock(data.expiresAt, data.serverNow);
          setSaveState("saved");
        } catch {
          pendingRef.current.set(questionId, patch);
          setSaveState("error");
          return false;
        }
      }
      return true;
    } finally {
      flushingRef.current = false;
    }
  }, [applyServerClock, payload.sectionRunId]);

  const enqueue = useCallback(
    (questionId: string, patch: Omit<PendingAnswer, "timeSpentSec">) => {
      pendingRef.current.set(questionId, {
        ...patch,
        timeSpentSec: timeSpentRef.current[questionId] ?? 0,
      });
      window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => void flush(), SAVE_DEBOUNCE_MS);
    },
    [flush],
  );

  // --------------------------- Chronometre -------------------------------

  const submit = useCallback(async (): Promise<void> => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitting(true);
    setSubmitError(null);

    // On tente d'ecouler les sauvegardes en attente avant de soumettre.
    // Soumettre alors que des reponses sont encore en file les ferait perdre :
    // elles ne sont pas en base, donc elles seraient corrigées comme non
    // repondues. On refuse donc de soumettre et on previent le candidat.
    const drained = await flush();
    if (!drained) {
      submittedRef.current = false;
      setSubmitting(false);
      setSubmitError("save");
      return;
    }

    try {
      const response = await fetch(`/api/exam/${payload.sectionRunId}/submit`, { method: "POST" });
      if (!response.ok) throw new Error(`submit_${response.status}`);

      const data = (await response.json()) as {
        finished: boolean;
        nextSectionRunId?: string;
        attemptId?: string;
      };

      if (data.finished) {
        router.push(data.attemptId ? `/results/${data.attemptId}` : "/results");
      } else if (data.nextSectionRunId) {
        router.push(`/exam/${data.nextSectionRunId}`);
      } else {
        router.push("/results");
      }
    } catch {
      // Sans message, le bouton sembrait inerte et le candidat pouvait
      // recliquer indefiniment.
      submittedRef.current = false;
      setSubmitting(false);
      setSubmitError("submit");
    }
  }, [flush, payload.sectionRunId, router]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      const left = Math.max(0, deadlineRef.current - Date.now());
      setRemaining(left);
      if (left <= 0 && !submittedRef.current) void submit();
    }, 500);
    return () => window.clearInterval(tick);
  }, [submit]);

  useEffect(() => {
    const beat = window.setInterval(async () => {
      if (document.hidden) return;
      try {
        const response = await fetch(`/api/exam/${payload.sectionRunId}/heartbeat`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const clock = (await response.json()) as ClockResponse;
        applyServerClock(clock.expiresAt, clock.serverNow);
      } catch {
        // La resynchronisation est opportuniste : l'echance reste valide.
      }
    }, HEARTBEAT_MS);
    return () => window.clearInterval(beat);
  }, [applyServerClock, payload.sectionRunId]);

  // -------------------------- Etat du reseau -----------------------------

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Protection contre la fermeture d'onglet tant que des reponses sont en vol.
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (pendingRef.current.size === 0) return;
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // Reprise apres interruption : on tente d'ecouler le reliquat local.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible" && pendingRef.current.size > 0) void flush();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [flush]);

  // Comptabilise le temps passe sur la question courante. Cette valeur est
  // jointe a la prochaine sauvegarde : elle alimente l'analyse de vitesse de
  // la page de resultats.
  useEffect(() => {
    const questionId = current?.id;
    if (!questionId) return;
    const tick = window.setInterval(() => {
      timeSpentRef.current[questionId] = (timeSpentRef.current[questionId] ?? 0) + 1;
    }, 1000);
    return () => window.clearInterval(tick);
  }, [current?.id]);

  // ------------------------ Actions ----------------------------------

  const selectOption = useCallback(
    (optionId: string) => {
      setQuestions((previous) => {
        const next = previous.map((question, index) =>
          index === currentIndex ? { ...question, selectedOptionId: optionId } : question,
        );
        const updated = next[currentIndex];
        if (updated) {
          enqueue(updated.id, {
            selectedOptionId: updated.selectedOptionId,
            flagged: updated.flagged,
          });
        }
        return next;
      });
    },
    [currentIndex, enqueue],
  );

  const toggleFlag = useCallback(() => {
    setQuestions((previous) => {
      const next = previous.map((question, index) =>
        index === currentIndex ? { ...question, flagged: !question.flagged } : question,
      );
      const updated = next[currentIndex];
      if (updated) {
        enqueue(updated.id, {
          selectedOptionId: updated.selectedOptionId,
          flagged: updated.flagged,
        });
      }
      return next;
    });
  }, [currentIndex, enqueue]);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= questions.length) return;
      // On re-enregistre la question quittée pour ne perdre ni la reponse ni le
      // temps passe dessus depuis la derniere sauvegarde.
      const leaving = questions[currentIndex];
      if (leaving) {
        enqueue(leaving.id, {
          selectedOptionId: leaving.selectedOptionId,
          flagged: leaving.flagged,
        });
      }
      setCurrentIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentIndex, enqueue, questions],
  );

  // ------------------------ Raccourcis clavier ---------------------------

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const key = event.key.toLowerCase();
      const option = current?.options.find(
        (item) => item.label.toLowerCase() === key,
      );
      if (option) {
        event.preventDefault();
        selectOption(option.id);
        return;
      }

      switch (key) {
        case "arrowright":
          event.preventDefault();
          goTo(currentIndex + 1);
          break;
        case "arrowleft":
          event.preventDefault();
          goTo(currentIndex - 1);
          break;
        case "f":
          event.preventDefault();
          toggleFlag();
          break;
        case "enter":
          event.preventDefault();
          setSubmitOpen(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, currentIndex, goTo, selectOption, toggleFlag]);

  // --------------------------- Rendu -------------------------------------

  const phase = timerPhase(remaining, { medium: 300, critical: 60 });
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="flex min-h-dvh flex-col">
      {/* --------------------------- En-tete --------------------------- */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted-foreground">
              {t("questionOf", {
                index: payload.sectionIndex + 1,
                total: payload.sectionCount,
              })}
            </p>
            <h1 className="truncate font-display text-base font-bold sm:text-lg">
              {payload.sectionTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <SaveIndicator state={saveState} online={online} />
            <ExamTimer remaining={remaining} phase={phase} />
          </div>
        </div>

        <div className="h-1 w-full bg-muted">
          <Progress value={progress} className="h-1 rounded-none" />
        </div>
      </header>

      {/* --------------------------- Alertes --------------------------- */}
      <div className="container space-y-3 pt-4">
        {payload.restored ? (
          <InfoBanner tone="info" icon={Info} title={t("restored")} body={t("restoredBody")} />
        ) : null}
        {!online ? (
          <InfoBanner tone="warning" icon={WifiOff} title={t("offline")} body={t("offline")} />
        ) : null}
        {phase === "critical" && remaining > 0 ? (
          <InfoBanner
            tone="danger"
            icon={AlertTriangle}
            title={t("timeUp")}
            body={t("timeRemaining")}
          />
        ) : null}
      </div>

      {/* ---------------------------- Corps ---------------------------- */}
      <div className="container flex-1 py-6">
        <div className={hasDocuments ? "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""}>
          {hasDocuments ? (
            <DocumentPanel documents={payload.documents} activeDocumentId={activeDocumentId} />
          ) : null}

          <div className="min-w-0 space-y-6">
            {payload.instructions ? (
              <p className="rounded-xl border border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
                {payload.instructions}
              </p>
            ) : null}

            {current ? (
              <section className="rounded-2xl border border-border/70 bg-card p-5 sm:p-7">
                <QuestionCard
                  question={current}
                  onSelect={selectOption}
                  onToggleFlag={toggleFlag}
                />
              </section>
            ) : null}

            {/* Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="size-4" aria-hidden />
                {tCommon("previous")}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {t("questionOf", {
                  index: currentIndex + 1,
                  total: questions.length,
                })}
              </div>

              {isLast ? (
                <Button type="button" onClick={() => setSubmitOpen(true)}>
                  <Send className="size-4" aria-hidden />
                  {t("submitSection")}
                </Button>
              ) : (
                <Button type="button" onClick={() => goTo(currentIndex + 1)}>
                  {t("next")}
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
              )}
            </div>

            {/* Grille + legendes */}
            <section className="rounded-2xl border border-border/70 bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold">{t("sectionProgress")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("answeredOf", {
                    index: answeredCount,
                    total: questions.length,
                  })}
                </p>
              </div>

              <div className="mt-4">
                <NavigationGrid questions={questions} currentIndex={currentIndex} onSelect={goTo} />
              </div>

              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <span className="size-3 rounded bg-success/40" aria-hidden />
                  {t("legendAnswered")}
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="size-3 rounded bg-muted" aria-hidden />
                  {t("legendUnanswered")}
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-warning" aria-hidden />
                  {t("legendFlagged")}
                </li>
              </ul>

              <details className="mt-4 text-xs text-muted-foreground">
                <summary className="cursor-pointer font-semibold">{t("shortcutsTitle")}</summary>
                <ul className="mt-2 space-y-1">
                  <li>{t("shortcutChoose")}</li>
                  <li>{t("shortcutNext")}</li>
                  <li>{t("shortcutPrevious")}</li>
                  <li>{t("shortcutFlag")}</li>
                  <li>{t("shortcutSubmit")}</li>
                </ul>
              </details>
            </section>
          </div>
        </div>
      </div>

      {/* ------------------------ Confirmation ------------------------ */}
      <Dialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("submitConfirm")}</DialogTitle>
            <DialogDescription>{t("submitConfirmBody")}</DialogDescription>
          </DialogHeader>

          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("answered")}</span>
              <span className="font-semibold text-success">{answeredCount}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("unanswered")}</span>
              <span className="font-semibold text-destructive">
                {questions.length - answeredCount}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">{t("flagged")}</span>
              <span className="font-semibold text-warning">
                {questions.filter((question) => question.flagged).length}
              </span>
            </li>
          </ul>

          {questions.length - answeredCount > 0 ? (
            <p className="flex items-start gap-2 rounded-lg bg-warning/10 p-3 text-sm text-warning">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                {t("submitWithUnanswered", {
                  count: questions.length - answeredCount,
                })}
            </p>
          ) : null}

          {submitError ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {t(submitError === "save" ? "submitBlockedUnsaved" : "submitFailed")}
            </p>
          ) : null}

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={() => setSubmitOpen(false)}>
              {t("keepWorking")}
            </Button>
            <Button type="button" onClick={() => void submit()} disabled={submitting}>
              {submitting ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <CheckCircle2 className="size-4" aria-hidden />
              )}
              {t("confirmSubmit")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------------- Temps ecoule --------------------------- */}
      <Dialog open={timeUpOpen} onOpenChange={() => undefined}>
        <DialogContent className="sm:max-w-md" hideClose>
          <DialogHeader>
            <DialogTitle>{t("timeUpTitle")}</DialogTitle>
              <DialogDescription>
                {t("timeUpBody", { section: payload.sectionTitle })}
              </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => router.push("/results")}>
              {t("seeResults")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ============================ Sous-composants =========================== */

function SaveIndicator({ state, online }: { state: SaveState; online: boolean }): React.JSX.Element {
  const t = useTranslations("exam");

  if (!online || state === "error") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive">
        <CloudOff className="size-4" aria-hidden />
        <span className="hidden sm:inline">{t("saveFailed")}</span>
      </span>
    );
  }

  if (state === "saving") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        <span className="hidden sm:inline">{t("saving")}</span>
      </span>
    );
  }

  if (state === "saved") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
        <CheckCircle2 className="size-4" aria-hidden />
        <span className="hidden sm:inline">{t("autosaved")}</span>
      </span>
    );
  }

  return <span className="hidden text-xs text-muted-foreground sm:inline">{t("autosaved")}</span>;
}

function InfoBanner({
  tone,
  icon: Icon,
  title,
  body,
}: {
  tone: "info" | "warning" | "danger";
  icon: typeof Info;
  title: string;
  body: string;
}): React.JSX.Element {
  const tones = {
    info: "border-info/40 bg-info/10 text-info",
    warning: "border-warning/40 bg-warning/10 text-warning",
    danger: "border-destructive/40 bg-destructive/10 text-destructive",
  } as const;

  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-3 text-sm", tones[tone])}>
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="opacity-80">{body}</p>
      </div>
    </div>
  );
}
