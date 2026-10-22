"use client";

import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DesktopNav({
  links,
}: {
  links: Array<{ href: string; label: string }>;
}): React.JSX.Element {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("menu")} className="ml-2 hidden items-center gap-1 md:flex">
      {links.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary-soft font-semibold text-primary"
                : "text-muted-foreground hover:bg-primary-soft hover:text-primary",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
