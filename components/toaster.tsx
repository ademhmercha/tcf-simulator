"use client";

import { Toaster as SonnerToaster } from "sonner";

import { useTheme } from "@/components/theme-provider";

/**
 * Notifications accessibles (role=status / aria-live gere par sonner).
 * Le style suit le theme afin de rester lisible en mode sombre.
 */
export function Toaster(): React.JSX.Element {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme}
      position="top-center"
      offset={16}
      duration={4500}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast:
            "group rounded-xl border border-border bg-card text-card-foreground shadow-strong text-sm",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground rounded-lg",
          cancelButton: "bg-muted text-muted-foreground rounded-lg",
          error: "border-destructive/40",
          success: "border-success/40",
        },
      }}
    />
  );
}
