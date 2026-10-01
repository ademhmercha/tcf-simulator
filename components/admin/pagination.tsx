import { ChevronLeft, ChevronRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Pagination de la liste des utilisateurs.
//
// Composant serveur : la pagination passe par des liens, donc elle fonctionne
// sans JavaScript et chaque page est rendue cote serveur. L'etat des filtres
// (`q`, `filter`, `sort`) est conserve dans l'URL a chaque deplacement.
// ---------------------------------------------------------------------------

export function Pagination({
  page,
  pageCount,
  params,
}: {
  page: number;
  pageCount: number;
  /** Query string courante, sans `page`. */
  params: Record<string, string>;
}): React.JSX.Element {
  if (pageCount <= 1) return <></>;

  function href(target: number): string {
    const search = new URLSearchParams(params);
    if (target > 1) search.set("page", String(target));
    const queryString = search.toString();
    return `/admin/users${queryString ? `?${queryString}` : ""}`;
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-3">
      <PageLink href={href(page - 1)} disabled={page <= 1} direction="prev" page={page - 1} />
      <span className="text-sm text-muted-foreground">
        {page} / {pageCount}
      </span>
      <PageLink
        href={href(page + 1)}
        disabled={page >= pageCount}
        direction="next"
        page={page + 1}
      />
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  direction,
  page,
}: {
  href: string;
  disabled: boolean;
  direction: "prev" | "next";
  page: number;
}): React.JSX.Element {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const className = cn(
    "inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium transition-colors",
    disabled
      ? "pointer-events-none text-muted-foreground/50"
      : "hover:bg-muted hover:text-foreground",
  );

  if (disabled) {
    return (
      <span className={className} aria-disabled>
        <Icon className="size-4" aria-hidden />
        {page}
      </span>
    );
  }

  return (
    <Link href={href} className={className} rel={direction === "next" ? "next" : "prev"}>
      <Icon className="size-4" aria-hidden />
      {page}
    </Link>
  );
}