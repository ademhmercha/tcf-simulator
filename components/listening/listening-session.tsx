"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Headphones, Loader2, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { submitListeningAction } from "@/server/actions/listening";
import type { CoLetter, ListeningSeriesPayload } from "@/server/services/listening";
import { cn } from "@/lib/utils";

type Phase = "listen" | "answer";

interface ListeningSessionProps {
  payload: ListeningSeriesPayload;
}

const LETTERS: CoLetter[] = ["A", "B", "C", "D"];

export function ListeningSession({ payload }: ListeningSessionProps): React.JSX.Element {
  const t = useTranslations("co");

  const { series, questions } = payload;
  const [status, setStatus] = React.useState<"intro" | "running" | "sending">("intro");
  const [index, setIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("listen");
  const [listened, setListened] = React.useState(false);
  const [listenCount, setListenCount] = React.useState(0);
  const [selected, setSelected] = React.useState<Record<string, CoLetter | null>>({});

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  // Index toujours borne pendant une session : questions[index] est garanti.
  const current = questions[index]!;
  const optionKeys = ["A", "B", "C", "D"] as const;

  // Prechargement de l'audio suivant pour une lecture immediate.
  React.useEffect(() => {
    const next = questions[index + 1];
    if (!next) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "audio";
    link.href = next.audioUrl;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [index, questions]);

  const begin = (): void => {
    setStatus("running");
    setIndex(0);
    setPhase("listen");
    setListened(false);
    setListenCount(0);
    setSelected({});
  };

  const startListening = async (): Promise<void> => {
    const el = audioRef.current;
    if (!el || listened) return;
    try {
      await el.play();
      setListenCount((c) => c + 1);
    } catch {
      // Lecture bloquee (autoplay) : on force l'interaction.
    }
  };

  const advance = (letter: CoLetter | null): void => {
    const nextAnswers = { ...selected, [current.id]: letter };
    setSelected(nextAnswers);

    if (index + 1 >= questions.length) {
      setStatus("sending");
      void submit(nextAnswers);
      return;
    }

    setIndex((i) => i + 1);
    setPhase("listen");
    setListened(false);
    setListenCount(0);
  };

  const submit = async (answers: Record<string, CoLetter | null>): Promise<void> => {
    const formData = new FormData();
    formData.set("seriesSlug", series.slug);
    formData.set(
      "answers",
      JSON.stringify(
        Object.entries(answers).map(([questionId, selectedLetter]) => ({
          questionId,
          selectedLetter,
        })),
      ),
    );
    await submitListeningAction(formData);
  };

  // Raccourcis clavier : A/B/C/D pour choisir, Entree pour valider.
  React.useEffect(() => {
    if (status !== "running" || phase !== "answer") return;
    const onKey = (event: KeyboardEvent): void => {
      const key = event.key.toLowerCase();
      if (LETTERS.map((l) => l.toLowerCase()).includes(key as string)) {
        event.preventDefault();
        setSelected((prev) => ({ ...prev, [current.id]: key.toUpperCase() as CoLetter }));
        return;
      }
      if (event.key === "Enter" && selected[current.id]) {
        event.preventDefault();
        advance(selected[current.id] ?? null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, phase, current.id, selected[current.id]]);

  if (status === "intro") {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Headphones className="mx-auto h-10 w-10 text-primary" aria-hidden />
          <h2 className="mt-4 text-xl font-bold">{series.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {series.questionCount} {t("questions")} ·{" "}
            {series.listenings === 1 ? t("listenOnce") : `${series.listenings} ${t("listeningsLabel")}`}
          </p>
          {series.description ? (
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {series.description}
            </p>
          ) : null}
          <Button size="lg" className="mt-6" onClick={begin}>
            <Play className="h-4 w-4" aria-hidden />
            {t("start")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isLast = index + 1 >= questions.length;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between text-sm font-medium">
          <span>
            {t("question")} {index + 1} / {questions.length}
          </span>
          <span className="text-muted-foreground">
            {Math.round(((index + (phase === "answer" ? 1 : 0)) / questions.length) * 100)}%
          </span>
        </div>
        <Progress value={(index / questions.length) * 100} className="mt-2" />
      </div>

      <audio
        ref={audioRef}
        src={current.audioUrl}
        preload="auto"
        className="hidden"
        onEnded={() => {
          setPhase("answer");
          setListened(true);
        }}
      />

      {phase === "listen" ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {listened ? t("listeningDone") : t("listenHint")}
            </p>
            <Button
              size="lg"
              variant="accent"
              className="mx-auto mt-4 flex h-16 w-16 rounded-full p-0"
              aria-label={t("listenBtn")}
              onClick={() => void startListening()}
              disabled={listened || status === "sending"}
            >
              <Play className="h-6 w-6" aria-hidden />
            </Button>
            {series.listenings > 1 && listened && listenCount < series.listenings ? (
              <p className="mt-3 text-xs text-muted-foreground">
                {series.listenings - listenCount} {t("listeningLeft")}
              </p>
            ) : null}
            <p className="mt-4 text-xs text-muted-foreground">{t("listenOnce")}</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <p className="font-semibold leading-relaxed">{current.prompt}</p>
            <div className="mt-4 grid gap-2.5">
              {optionKeys.map((optionKey) => {
                const active = selected[current.id] === optionKey;
                return (
                  <button
                    key={optionKey}
                    type="button"
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [current.id]: optionKey }))
                    }
                    className={cn(
                      "flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all",
                      "hover:border-primary/50 hover:bg-primary-soft",
                      active && "border-primary bg-primary/8 ring-1 ring-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                      )}
                    >
                      {optionKey}
                    </span>
                    <span className="text-sm leading-relaxed">
                      {current.options[optionKey]}
                    </span>
                    {active ? (
                      <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-primary" aria-hidden />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                disabled={!selected[current.id] || status === "sending"}
                onClick={() => advance(selected[current.id] ?? null)}
              >
                {status === "sending" ? (
                  <Loader2 className="animate-spin" aria-hidden />
                ) : isLast ? (
                  t("finish")
                ) : (
                  t("validate")
                )}
              </Button>
              {!isLast ? (
                <button
                  type="button"
                  onClick={() => advance(null)}
                  className="text-xs font-medium text-muted-foreground hover:text-primary"
                >
                  {t("skip")}
                </button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}