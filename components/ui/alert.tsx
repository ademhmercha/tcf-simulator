import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative flex w-full gap-3 rounded-xl border p-4 text-sm [&>svg]:size-5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/50 text-foreground",
        info: "border-primary/25 bg-primary-soft/60 text-foreground",
        success: "border-success/25 bg-success/10 text-foreground",
        warning: "border-warning/30 bg-warning/10 text-foreground",
        destructive: "border-destructive/25 bg-destructive/10 text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
}

const ICONS = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: XCircle,
} as const;

function Alert({ className, variant = "default", title, children, ...props }: AlertProps): React.JSX.Element {
  const Icon = ICONS[variant ?? "default"];
  return (
    <div role={variant === "destructive" ? "alert" : "status"} className={cn(alertVariants({ variant }), className)} {...props}>
      <Icon aria-hidden className={cn(
        variant === "destructive" && "text-destructive",
        variant === "success" && "text-success",
        variant === "warning" && "text-warning",
        variant === "info" && "text-primary",
      )} />
      <div className="min-w-0 flex-1 space-y-1">
        {title ? <p className="font-semibold leading-tight">{title}</p> : null}
        <div className="text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline">{children}</div>
      </div>
    </div>
  );
}

export { Alert, alertVariants };
