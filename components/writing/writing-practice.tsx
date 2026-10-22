"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpenCheck, ClipboardCheck } from "lucide-react";

import { WritingChecklistForm } from "@/components/writing/writing-checklist-form";
import { WritingTimer } from "@/components/writing/writing-timer";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { WritingPromptView } from "@/server/services/writing";

/**
 * Deroule l'entrainement : chronometre, puis auto-evaluation.
 *
 * L'epreuve se fait sur papier, sur la feuille du candidat : la page ne
 * propose aucune zone de texte. Le bouton « J'ai terminé » ouvre l'etape
 * d'auto-evaluation et les aides.
 */
export function WritingPractice({
  prompt,
}: {
  prompt: WritingPromptView;
}): React.JSX.Element {
  const t = useTranslations("writing");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [finished, setFinished] = useState(false);

  return (
    <div className="space-y-6">
      <WritingTimer durationMin={prompt.durationMin} onElapsedChange={setElapsedSeconds} />

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => setFinished(true)}>
          <ClipboardCheck className="size-4" aria-hidden />
          {t("evaluation.open")}
        </Button>
      </div>

      <Alert variant="info" title={t("detail.paperNotice")} />

      {finished ? (
        <div className="space-y-6">
          <WritingChecklistForm
            slug={prompt.slug}
            durationSeconds={elapsedSeconds}
            minWords={prompt.minWords}
            maxWords={prompt.maxWords}
          />

          <Card>
            <CardContent className="space-y-6 p-6">
              <div>
                <h2 className="text-lg font-bold">{t("aids.title")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("aids.subtitle")}</p>
              </div>

              <Aids
                icon={<BookOpenCheck className="size-4" aria-hidden />}
                title={t("aids.plan")}
                items={prompt.plan}
              />
              <Aids
                icon={<BookOpenCheck className="size-4" aria-hidden />}
                title={t("aids.phrases")}
                items={prompt.usefulPhrases}
              />
              <Aids
                icon={<BookOpenCheck className="size-4" aria-hidden />}
                title={t("aids.mistakes")}
                items={prompt.commonMistakes}
              />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function Aids({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
}): React.JSX.Element {
  if (items.length === 0) return <></>;
  return (
    <section>
      <h3 className="flex items-center gap-2 text-sm font-bold text-primary">
        {icon}
        {title}
      </h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
