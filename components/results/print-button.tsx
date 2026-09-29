"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Impression / export PDF de la correction. */
export function PrintButton(): React.JSX.Element {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()}>
      <Printer className="size-4" aria-hidden />
      Imprimer
    </Button>
  );
}
