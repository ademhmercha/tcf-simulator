import { Skeleton } from "@/components/ui/skeleton";

/** Squelette pendant le chargement de l'epreuve. */
export default function ExamLoading(): React.JSX.Element {
  return (
    <div className="container space-y-6 py-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-20 w-full" />
          {Array.from({ length: 4 }, (_, index) => (
            <Skeleton key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
