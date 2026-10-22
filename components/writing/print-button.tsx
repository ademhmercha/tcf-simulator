"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Declenche l'impression de la feuille depuis le navigateur. */
export function PrintButton({ label }: { label: string }): React.JSX.Element {
  return (
    <Button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
    >
      <Printer className="size-4" aria-hidden />
      {label}
    </Button>
  );
}
