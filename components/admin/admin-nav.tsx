"use client";

import { BarChart3, LayoutDashboard, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Navigation de l'espace d'administration.
//
// Seules les trois sections livrees sont listees. Les libelles de contenu et
// d'import existent deja dans les traductions : les ajouter ici sans la page
// correspondante donnerait un lien mort.
// ---------------------------------------------------------------------------

const ITEMS = [
  { href: "/admin", label: "overview", icon: LayoutDashboard },
  { href: "/admin/stats", label: "stats", icon: BarChart3 },
  { href: "/admin/users", label: "users", icon: Users },
] as const;

export function AdminNav(): React.JSX.Element {
  const t = useTranslations("admin.nav");
  const pathname = usePathname();

  return (
    <nav aria-label={t("section")} className="flex gap-1 overflow-x-auto lg:flex-col">
      {ITEMS.map((item) => {
        // Correspondance par prefixe : sans cela, une fiche `/admin/users/abc`
        // ne laisserait aucun lien actif et l'utilisateur perdrait le fil de la
        // navigation. La racine `/admin` reste une correspondance exacte pour
        // ne pas s'allumer aussi sur toutes les sous-pages.
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden />
            {t(item.label)}
          </Link>
        );
      })}
    </nav>
  );
}