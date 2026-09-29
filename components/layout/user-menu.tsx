"use client";

import { useTranslations } from "next-intl";
import { History, LayoutDashboard, LogOut, Shield } from "lucide-react";
import { useFormStatus } from "react-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { logoutAction } from "@/server/actions/auth";

function initials(name: string, email: string): string {
  const source = name.trim() || email.split("@")[0] || "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((p) => p[0] ?? "");
  return (letters.join("") || "?").toUpperCase();
}

function LogoutItem(): React.JSX.Element {
  const t = useTranslations("nav");
  const { pending } = useFormStatus();
  return (
    <DropdownMenuItem asChild disabled={pending}>
      <form action={logoutAction} className="w-full">
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
        >
          <LogOut className="size-4" aria-hidden />
          {t("logout")}
        </button>
      </form>
    </DropdownMenuItem>
  );
}

export function UserMenu({
  name,
  email,
  isAdmin,
}: {
  name: string;
  email: string;
  isAdmin: boolean;
}): React.JSX.Element {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const itemClass = (href: string): string =>
    pathname.startsWith(href) ? "bg-primary-soft font-semibold text-primary" : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={name || email}
          className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 shadow-soft transition-colors hover:bg-primary-soft"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-[0.7rem] font-bold text-primary-foreground">
            {initials(name, email)}
          </span>
          <span className="hidden max-w-[9rem] truncate text-sm font-semibold sm:inline">
            {name || email}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate text-sm font-semibold">{name || email}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/dashboard" className={itemClass("/dashboard")}>
            <LayoutDashboard className="size-4" aria-hidden />
            {t("dashboard")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/history" className={itemClass("/history")}>
            <History className="size-4" aria-hidden />
            {t("history")}
          </Link>
        </DropdownMenuItem>

        {isAdmin ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className={itemClass("/admin")}>
                <Shield className="size-4" aria-hidden />
                {t("admin")}
              </Link>
            </DropdownMenuItem>
          </>
        ) : null}

        <DropdownMenuSeparator />
        <LogoutItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
