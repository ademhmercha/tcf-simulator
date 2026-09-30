import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Logo de la plateforme.
 *
 * Source unique : `logo.png` a la racine du depot. Le fichier servi dans
 * `public/brand/logo.png` en est une version recadree, generee par
 * `npm run icons` : le fichier source est un carre de 1254 px dans lequel le
 * dessin n'occupe qu'une petite zone, le reste etant transparent. Sans ce
 * recadrage, le logo tiendrait dans une boite de 36 px sans presque rien
 * afficher.
 *
 * Ce composant est le seul endroit ou le logo est declare : l'en-tete, le
 * pied de page et les ecrans de connexion passent tous par ici, pour qu'un
 * changement de logo se fasse en un seul endroit.
 *
 * Note sur le contraste : le dessin est bleu marine fonce. Sur le fond clair
 * il se suffit a lui-meme, mais il disparaitrait sur le fond sombre du mode
 * nuit : un cartouche blanc est donc ajoute dans ce seul cas.
 */
export function BrandLogo({
  className,
  imageClassName,
  priority = false,
}: {
  /** Taille du cartouche, pas de l'image. */
  className?: string;
  /** Ajustement de l'image elle-meme. */
  imageClassName?: string;
  /** `true` uniquement pour une image au-dessus de la ligne de flottaison. */
  priority?: boolean;
}): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center dark:rounded-lg dark:bg-white dark:p-1",
        className,
      )}
    >
      <Image
        src="/brand/logo.png"
        alt=""
        aria-hidden
        width={826}
        height={976}
        priority={priority}
        className={cn("h-7 w-auto", imageClassName)}
      />
    </span>
  );
}
