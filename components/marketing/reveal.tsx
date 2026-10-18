"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Apparition douce au defilement.
 *
 * Les sections situees sous la ligne de flottaison se revelent quand elles
 * entrent dans le champ de vision, au lieu de s'animer une seule fois au
 * chargement (quand personne ne les voit encore).
 *
 * Le composant est un simple conteneur : il observe son propre noeud via
 * `IntersectionObserver`, ajoute les classes de transition une fois visible,
 * puis se deconnecte pour ne plus consommer de ressources. En l'absence de
 * JavaScript, ou si la personne a demande moins d'animations, le contenu est
 * simplement affiche sans transition.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
