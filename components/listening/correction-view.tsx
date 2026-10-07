import { CheckCircle2, Info, MessageSquareText, XCircle } from "lucide-react";

import { AudioPlayer } from "@/components/listening/audio-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { CoLetter, ListeningCorrection } from "@/server/services/listening";
import { cn } from "@/lib/utils";

interface CorrectionViewProps {
  correction: ListeningCorrection;
}

/** Marqueur de reponse de l'utilisateur, aligne sur l'option. */
function AnswerChip({
  letter,
  correct,
  user,
}: {
  letter: CoLetter;
  correct: CoLetter;
  user: CoLetter | null;
}): React.JSX.Element | null {
  if (letter !== correct && letter !== user) return null;
  const isUser = letter === user;
  const isGood = letter === correct;
  if (isGood && isUser) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Votre réponse
      </span>
    );
  }
  if (isGood) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Bonne réponse
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-destructive">
      <XCircle className="h-3.5 w-3.5" aria-hidden />
      Votre réponse
    </span>
  );
}

export function CorrectionView({ correction }: CorrectionViewProps): React.JSX.Element {
  const percent = correction.maxScore
    ? Math.round((correction.score / correction.maxScore) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <Card className="border-primary/30">
        <CardContent className="pt-6 text-center">
          <p className="text-sm font-medium text-muted-foreground">{correction.series.title}</p>
          <p className="mt-2 text-4xl font-extrabold tabular-nums">
            {correction.score}
            <span className="text-lg font-semibold text-muted-foreground">
              {" "}
              / {correction.maxScore}
            </span>
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">{percent} %</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button asChild size="sm">
              <Link href={`/comprehension-orale/${correction.series.slug}`}>Recommencer</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/tests">Toutes les séries</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {correction.questions.map((question) => {
          const user = question.selectedLetter;
          const good = question.correctLetter;
          const answeredRight = user === good;
          return (
            <Card key={question.id} className={answeredRight ? "" : "border-destructive/40"}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-sm font-semibold">
                    Question {question.order} · {question.prompt}
                  </CardTitle>
                  {answeredRight ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <AudioPlayer src={question.audioUrl} />

                <div className="mt-3 grid gap-1.5 text-sm">
                  {(["A", "B", "C", "D"] as CoLetter[]).map((letter) => (
                    <div
                      key={letter}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg border px-3 py-2",
                        letter === good && "border-success/50 bg-success/8",
                        letter === user && letter !== good && "border-destructive/50 bg-destructive/6",
                      )}
                    >
                      <span>
                        <span className="font-bold">{letter}.</span>{" "}
                        {question.options[letter]}
                      </span>
                      <AnswerChip letter={letter} correct={good} user={user} />
                    </div>
                  ))}
                </div>

                {user === null ? (
                  <p className="mt-2 text-xs font-medium text-muted-foreground">
                    Sans réponse. La bonne réponse est {good}.
                  </p>
                ) : null}

                <div className="mt-4 rounded-xl bg-secondary/60 p-4 text-sm">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <MessageSquareText className="h-3.5 w-3.5" aria-hidden />
                    Transcription
                  </p>
                  <p className="mt-2 leading-relaxed">{question.transcription}</p>
                </div>

                <div className="mt-3 rounded-xl border bg-card p-4 text-sm">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    <Info className="h-3.5 w-3.5" aria-hidden />
                    Explication
                  </p>
                  <p className="mt-2 leading-relaxed">{question.explanation}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}