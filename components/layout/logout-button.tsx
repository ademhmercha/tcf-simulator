"use client";

import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/server/actions/auth";

interface LogoutButtonProps {
  className?: string;
  /** Masque le libelle (ex. icone seule sous `lg`). */
  labelClassName?: string;
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
}

function SubmitButton({
  label,
  labelClassName,
  size,
  fullWidth,
}: {
  label: string;
  labelClassName?: string;
  size: "sm" | "default" | "lg";
  fullWidth: boolean;
}): React.JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size={size}
      loading={pending}
      aria-label={label}
      className={cn(
        "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
        fullWidth && "w-full",
      )}
    >
      {pending ? null : <LogOut aria-hidden />}
      <span className={labelClassName}>{label}</span>
    </Button>
  );
}

/**
 * Deconnexion toujours accessible : un vrai bouton, rendu comme un POST de
 * server action (jamais un simple lien, pour ne pas exposer la deconnexion a
 * une requete GET).
 */
export function LogoutButton({
  className,
  labelClassName,
  size = "sm",
  fullWidth = false,
}: LogoutButtonProps): React.JSX.Element {
  const t = useTranslations("nav");
  return (
    <form
      action={logoutAction}
      className={cn(fullWidth ? "flex w-full" : "inline-flex", className)}
    >
      <SubmitButton
        label={t("logout")}
        labelClassName={labelClassName}
        size={size}
        fullWidth={fullWidth}
      />
    </form>
  );
}
