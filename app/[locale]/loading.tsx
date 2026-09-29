import { Skeleton } from "@/components/ui/skeleton";

/** Squelette global du segment de locale. */
export default function LocaleLoading(): React.JSX.Element {
  return (
    <div className="container space-y-8 py-12">
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-48 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
