"use client";

import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";

import { LogoutButton } from "@/components/layout/logout-button";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/navigation";
import { initials, isActivePath } from "@/lib/nav";

export function MobileNav({
  links,
  signedIn,
  name = "",
  email = "",
}: {
  links: Array<{ href: string; label: string }>;
  signedIn: boolean;
  name?: string;
  email?: string;
}): React.JSX.Element {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="md:hidden" aria-label={t("openMenu")}>
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>

      <SheetContent side="end" className="w-[min(20rem,85vw)] p-0">
        <SheetHeader className="border-b border-border p-5 pb-4 text-left">
          <SheetTitle className="text-base">{t("menu")}</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 p-4" aria-label={t("menu")}>
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-primary-soft font-semibold text-primary" : "hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {signedIn ? (
            <div className="mt-3 flex flex-col gap-3 border-t border-border pt-4">
              <div className="flex items-center gap-3 px-1">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  {initials(name, email)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{name || email}</p>
                  {name ? (
                    <p className="truncate text-xs text-muted-foreground">{email}</p>
                  ) : null}
                </div>
              </div>

              <LogoutButton fullWidth size="default" />
            </div>
          ) : (
            <Link
              href="/login"
              className="mt-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {t("login")}
            </Link>
          )}

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">{t("closeMenu")}</span>
            <ThemeToggleButton />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
