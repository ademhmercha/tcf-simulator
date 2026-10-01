import { cn } from "@/lib/utils";

/**
 * Enonce tronque visuellement dans un tableau dense.
 *
 * Le texte complet reste dans le DOM (le troncature est purement CSS, donc
 * accessible et copiable) et l'attribut `title` donne le contenu integral au
 * survol. Aucun JavaScript : les pages d'administration restent lisibles meme si
 * un script echoue, ce qui est le pire moment pour perdre une ligne de contexte.
 */
export function TruncatedText({
  text,
  lines = 2,
  className,
}: {
  text: string;
  lines?: 2 | 3;
  className?: string;
}): React.JSX.Element {
  return (
    <p
      title={text}
      className={cn(
        lines === 3 ? "line-clamp-3" : "line-clamp-2",
        "text-sm leading-snug",
        className,
      )}
    >
      {text}
    </p>
  );
}