import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors [&_svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        accent: "border-transparent bg-accent/15 text-accent",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-muted-foreground",
        success: "border-transparent bg-success/12 text-success",
        destructive: "border-transparent bg-destructive/12 text-destructive",
        warning: "border-transparent bg-warning/15 text-warning",
        solid: "border-transparent bg-primary text-primary-foreground",
      },
      size: {
        default: "",
        sm: "px-2 py-0 text-[0.6875rem]",
        lg: "px-3.5 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps): React.JSX.Element {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

/** Badge de niveau CECRL avec la couleur de l'echelle de difficulte. */
function LevelBadge({
  level,
  levelColor,
  children,
  className,
  size,
}: {
  level: string;
  /** Couleur CSS a utiliser (par defaut le niveau, minuscule). */
  levelColor?: string;
  children?: React.ReactNode;
  className?: string;
  size?: BadgeProps["size"];
}): React.JSX.Element {
  // Les palettes melangees ("B1-B2") n'ont pas de couleur dediee : on repart
  // sur le premier niveau de l'echelle.
  const key = (levelColor ?? level.split("-")[0] ?? level).toLowerCase();
  return (
    <div
      className={cn(
        badgeVariants({ variant: "default", size }),
        "border-transparent",
        className,
      )}
      style={{
        backgroundColor: `hsl(var(--level-${key}) / 0.14)`,
        color: `hsl(var(--level-${key}))`,
      }}
    >
      {children}
      {level}
    </div>
  );
}

export { Badge, LevelBadge, badgeVariants };
