import { cn } from "@/lib/utils";

/** Squelette de chargement generique (a11y : aria-busy cote parent). */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn("skeleton h-4 w-full", className)} aria-hidden {...props} />;
}

/** Ligne de tableau en chargement. */
function SkeletonRow({ columns = 4 }: { columns?: number }): React.JSX.Element {
  return (
    <div className="flex items-center gap-4 border-b border-border/60 p-4 last:border-0">
      <Skeleton className="h-4 w-8" />
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4", i % 2 === 0 ? "flex-1" : "w-24 flex-none")} />
      ))}
    </div>
  );
}

/** Groupe de lignes pour listes et tableaux. */
function SkeletonList({ rows = 4, className }: { rows?: number; className?: string }): React.JSX.Element {
  return (
    <div className={cn("space-y-3", className)} role="status" aria-busy="true">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-xl" />
      ))}
      <span className="sr-only">Chargement en cours</span>
    </div>
  );
}

export { Skeleton, SkeletonRow, SkeletonList };
