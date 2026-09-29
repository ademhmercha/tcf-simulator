"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DocumentView } from "@/lib/types";

/**
 * Colonne document de l'epreuve. Sur ecrans larges elle reste visible a cote
 * des questions ; sur mobile elle est repliee derriere un bouton.
 *
 * Le panneau ne possede aucune navigation propre : le texte affiche suit
 * exactement la question courante, comme dans la section de structure de la
 * langue ou le texte est porte par la question. Un seul « Suivant » pilote
 * donc simultanement le texte et la question.
 */
export function DocumentPanel({
  documents,
  activeDocumentId,
}: {
  documents: DocumentView[];
  activeDocumentId: string | null;
}): React.JSX.Element | null {
  const t = useTranslations("exam");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (documents.length === 0) return null;

  const index = Math.max(
    0,
    documents.findIndex((document) => document.id === activeDocumentId),
  );
  const active = documents[index];
  if (!active) return null;

  const body = (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {t("document")}
          </p>
          <h2 className="font-display text-lg font-bold">{active.title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("documentOf", { index: index + 1, total: documents.length })} &middot;{" "}
            {active.code}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X className="size-5" aria-hidden />
          <span className="sr-only">{tCommon("close")}</span>
        </Button>
      </div>

      {active.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={active.imageUrl}
          alt=""
          className="max-h-72 w-full rounded-lg border border-border object-contain"
        />
      ) : null}

      <div className="max-h-[45vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border/70 bg-muted/30 p-4 text-sm leading-relaxing lg:max-h-[60vh]">
        {active.content}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:sticky lg:top-6 lg:block lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-border/70 lg:bg-card lg:p-5">
        {body}
      </aside>

      {open ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-background p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("document")}
        >
          {body}
        </div>
      ) : (
        <Button type="button" variant="outline" size="sm" className="lg:hidden" onClick={() => setOpen(true)}>
          <FileText className="size-4" aria-hidden />
          {t("document")}
        </Button>
      )}
    </>
  );
}
