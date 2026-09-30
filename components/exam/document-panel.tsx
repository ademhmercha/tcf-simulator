"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FileText, Maximize2, Minimize2, Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { DocumentView } from "@/lib/types";

/**
 * Colonne document de l'epreuve de comprehension ecrite. Sur ecrans larges elle
 * reste visible a cote des questions ; sur mobile elle est repliee derriere un
 * bouton.
 *
 * Lecture : quatre corps de texte, de `text-[0.95rem]` a `text-xl`, avec une
 * longueur de ligne bornee pour rester confortable. Le choix est memorise dans
 * le navigateur : il reste le meme d'une question a l'autre et d'une session a
 * l'autre. Le plein ecran affiche le document seul, sur toute la largeur, avec
 * le texte agrandi d'un cran ; `Echap` en sort.
 *
 * Le panneau ne possede aucune navigation propre : le texte affiche suit
 * exactement la question courante, comme dans la section de structure de la
 * langue ou le texte est porte par la question. Un seul « Suivant » pilote
 * donc simultanement le texte et la question.
 */

/** Classes Tailwind explicites : le purgeur ne peut pas suivre une classe construite. */
const SIZES = [
  { text: "text-[0.95rem] leading-relaxed", title: "text-base" },
  { text: "text-[1.1rem] leading-relaxed", title: "text-lg" },
  { text: "text-[1.3rem] leading-relaxed", title: "text-xl" },
  { text: "text-[1.5rem] leading-loose", title: "text-2xl" },
] as const;

/** Index valide dans `SIZES`. */
type SizeIndex = 0 | 1 | 2 | 3;

const LAST: SizeIndex = 3;

function clampSize(index: number): SizeIndex {
  if (index <= 0) return 0;
  if (index >= LAST) return LAST;
  return index as SizeIndex;
}

const STORAGE_KEY = "tcf:document-text-size";

function readStoredSize(): SizeIndex {
  if (typeof window === "undefined") return 1;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw === null ? Number.NaN : Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return 1;
  return clampSize(parsed);
}

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
  const [expanded, setExpanded] = useState(false);
  const [size, setSize] = useState<SizeIndex>(1);

  // La taille est lue apres le premier rendu : le composant est rendu sur le
  // serveur, `localStorage` n'existe pas la.
  useEffect(() => {
    setSize(readStoredSize());
  }, []);

  const changeSize = (delta: number) => {
    setSize((current) => {
      const next = clampSize(current + delta);
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  useEffect(() => {
    if (!open && !expanded) return;
    // `Echap` ferme. Aucun raccourci lettre n'est ajoute ici : le runner
    // d'epreuve reserve deja les touches pour la selection des reponses.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setExpanded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, expanded]);

  if (documents.length === 0) return null;

  const index = Math.max(
    0,
    documents.findIndex((document) => document.id === activeDocumentId),
  );
  const active = documents[index];
  if (!active) return null;

  const text = SIZES[size].text;
  const title = SIZES[size].title;
  // En plein ecran, le texte gagne un cran : la colonne devient pleine largeur.
  const expandedText = SIZES[clampSize(size + 1)].text;

  const header = (
    <>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {t("document")}
        </p>
        <h2 className={`font-display font-bold ${title}`}>{active.title}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {t("documentOf", { index: index + 1, total: documents.length })}
        </p>
      </div>
    </>
  );

  /** Barre de controle : taille du texte et plein ecran. */
  const controls = (
    <div className="flex shrink-0 items-center gap-1">
      <div
        className="flex items-center rounded-lg border border-border"
        role="group"
        aria-label={t("textSize")}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-r-none"
          disabled={size === 0}
          onClick={() => changeSize(-1)}
        >
          <Minus className="size-4" aria-hidden />
          <span className="sr-only">{t("decreaseText")}</span>
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-l-none"
          disabled={size === SIZES.length - 1}
          onClick={() => changeSize(1)}
        >
          <Plus className="size-4" aria-hidden />
          <span className="sr-only">{t("increaseText")}</span>
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8"
        onClick={() => setExpanded(true)}
      >
        <Maximize2 className="size-4" aria-hidden />
        <span className="sr-only">{t("expandDocument")}</span>
      </Button>
    </div>
  );

  const content = (
    <div className="mt-4">
      {active.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={active.imageUrl}
          alt=""
          className="max-h-72 w-full rounded-lg border border-border object-contain"
        />
      ) : null}

      <div
        className={`mt-4 max-h-[45vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border/70 bg-card p-5 text-foreground shadow-sm lg:max-h-[60vh] ${text}`}
      >
        {active.content}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:sticky lg:top-6 lg:block lg:max-h-[calc(100dvh-3rem)] lg:overflow-y-auto lg:rounded-2xl lg:border lg:border-border/70 lg:bg-card lg:p-5">
        <div className="flex items-start justify-between gap-3">
          {header}
          {controls}
        </div>
        {content}
      </aside>

      {expanded ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={t("document")}
        >
          <div className="container max-w-3xl py-8">
            <div className="sticky top-0 -mx-1 flex items-start justify-between gap-3 bg-background/95 px-1 pb-4 pt-1 backdrop-blur">
              <div className="min-w-0">{header}</div>
              <div className="flex shrink-0 items-center gap-1">
                {controls}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setExpanded(false)}
                >
                  <Minimize2 className="size-4" aria-hidden />
                  <span className="sr-only">{t("collapseDocument")}</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8"
                  onClick={() => setExpanded(false)}
                >
                  <X className="size-5" aria-hidden />
                  <span className="sr-only">{tCommon("close")}</span>
                </Button>
              </div>
            </div>

            {active.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.imageUrl}
                alt=""
                className="max-h-64 w-full rounded-lg border border-border object-contain"
              />
            ) : null}

            <div
              className={`mt-4 max-h-[calc(100dvh-9rem)] overflow-y-auto whitespace-pre-wrap rounded-2xl border border-border/70 bg-card p-6 text-foreground shadow-sm ${expandedText}`}
            >
              {active.content}
            </div>
          </div>
        </div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-background p-4 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={t("document")}
        >
          <div className="flex items-start justify-between gap-3">
            {header}
            <div className="flex shrink-0 items-center gap-1">
              {controls}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" aria-hidden />
                <span className="sr-only">{tCommon("close")}</span>
              </Button>
            </div>
          </div>
          {content}
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
