import { Skeleton } from "@/components/ui/skeleton";

/** Squelette affiche pendant le chargement d'une correction. */
export default function ResultsLoading(): React.JSX.Element {
  return (
    <div className="container space-y-10 py-12">
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-1/2" />
      </div>
      <Skeleton className="h-40 rounded-2xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton key={index} className="h-20 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
