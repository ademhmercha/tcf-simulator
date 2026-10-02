"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export interface GuideTocItem {
  id: string;
  number: string;
  label: string;
}

/**
 * Sommaire du guide.
 *
 * Cote client uniquement pour le suivi de lecture : un `IntersectionObserver`
 * marque la section visible et la ligne correspondante du sommaire. Le rendu
 * initial est rendu cote serveur, donc la page reste indexable et lisible
 * meme si le script n'est pas execute.
 *
 * Les ancres sont des liens purs (`#id`) : le sommaire ne franchit pas la
 * frontiere de locale, il reste donc independant du routage i18n.
 */
export function GuideToc({
  items,
  title,
}: {
  items: GuideTocItem[];
  title: string;
}): React.JSX.Element {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // La marge haute compense la hauteur de l'en-tete colle ; la marge basse
      // fait qu'une section devient active lorsqu'elle atteint le tiers
      // superieur de la fenetre, et non des son premier pixel visible.
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    // `self-start` est indispensable : sans lui, l'element de grille est
    // etire sur toute la hauteur de la colonne de contenu, et `sticky` devient
    // inoperant (la boite depasse la fenetre, donc rien ne peut rester colle).
    <nav aria-label={title} className="self-start lg:sticky lg:top-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </p>
      <ol className="mt-4 space-y-0.5 border-l border-border">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l-2 py-2 pl-4 text-sm transition-colors",
                  isActive
                    ? "border-primary font-semibold text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tabular-nums",
                    isActive ? "text-primary" : "text-muted-foreground/70",
                  )}
                  aria-hidden
                >
                  {item.number}
                </span>
                <span className="min-w-0">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
