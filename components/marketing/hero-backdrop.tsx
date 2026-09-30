"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Fond photo du hero de la page d'accueil.
 *
 * Trois couches s'empilent, de l'arriere vers l'avant :
 *
 *   1. la photo, en Ken Burns continu ;
 *   2. une vignette derriere le bloc de texte, qui garantit la lisibilite du
 *      titre et des boutons quelle que soit la photo ;
 *   3. la trame et les halos animes deja presents sur le hero.
 *
 * DEUX ANIMATIONS, DEUX TECHNIQUES
 *
 * Ken Burns (zoom lent, en boucle) est une animation CSS : elle ne demande
 * rien a JavaScript et tourne sur le compositeur, meme si l'onglet est en
 * arriere-plan. Il est defini dans `globals.css` (`.hero-photo`).
 *
 * La parallaxe au defilement, elle, ne peut pas etre une animation CSS : elle
 * depend de la position de la page. Elle est donc appliquee en JavaScript, via
 * un `requestAnimationFrame` groupe : le gestionnaire de scroll ne fait que
 * poser un drapeau, et une seule mise a jour du style est executee par image
 * affichee. Ecrire `style.transform` directement dans le gestionnaire de
 * scroll ferait recalculer la mise en page autant de fois que le navigateur
 * recoit d'evenements, souvent plus vite que l'ecran ne se rafraichit.
 *
 * Seule la transformation est animee, jamais `top`/`height` : le navigateur
 * n'a donc pas a recalculer la mise en page pendant le defilement.
 *
 * Le mouvement s'annule si la personne a demande moins d'animations : le
 * reglage global de `globals.css` neutralise le CSS, et l'effet JavaScript
 * s'abstient ici de s'installer.
 */

/** Deplacement de la photo, en pixels, pour 1000 px de defilement. */
const PARALLAX_PER_PIXEL = 0.16;

/** Plafond du deplacement : au-dela, la photo sort de l'ecran. */
const PARALLAX_MAX = 130;

/**
 * Marge verticale de la couche photo.
 *
 * La photo est plus haute que le hero pour qu'un deplacement vers le bas ne
 * laisse jamais voir le fond a travers le bord superieur.
 */
const OVERSCAN = "-inset-y-[18%]";

export function HeroBackdrop({
  src,
  className,
  overlayClassName,
}: {
  src: string;
  className?: string;
  overlayClassName?: string;
}): React.JSX.Element {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const apply = (): void => {
      frame = 0;
      const offset = Math.min(window.scrollY * PARALLAX_PER_PIXEL, PARALLAX_MAX);
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const schedule = (): void => {
      if (frame === 0) frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <>
      {/* 1. Photo : zoom lent handled par CSS, parallaxe JavaScript. */}
      <div
        ref={layerRef}
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 ${OVERSCAN} -z-10 will-change-transform ${className ?? ""}`}
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={78}
          className="hero-photo object-cover"
        />
      </div>

      {/* 2. Vignettes : lisibilite du texte, et fondu vers les sections. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/35 via-background/55 to-background ${overlayClassName ?? ""}`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(52% 46% at 50% 44%, hsl(var(--background) / 0.94) 0%, hsl(var(--background) / 0.78) 52%, transparent 82%)",
        }}
      />
    </>
  );
}
