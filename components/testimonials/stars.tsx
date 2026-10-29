import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

/** Note en etoiles, en lecture seule. */
export function Stars({
  value,
  className,
}: {
  value: number;
  className?: string;
}): React.JSX.Element {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`${value} / 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          aria-hidden
          className={cn(
            "size-4",
            n <= value ? "fill-warning text-warning" : "fill-transparent text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}
