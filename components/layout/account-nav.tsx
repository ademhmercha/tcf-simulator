import { getTranslations } from "next-intl/server";

import { LogoutButton } from "@/components/layout/logout-button";
import { Link } from "@/i18n/navigation";
import { initials } from "@/lib/nav";

/**
 * Bloc compte de l'en-tete : identite cliquable (vers le tableau de bord) et
 * bouton de deconnexion toujours visible. Volontairement sans menu deroulant,
 * pour que rien d'essentiel ne soit cache.
 */
export async function AccountNav({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("nav");
  const display = name || email;

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/dashboard"
        aria-label={t("dashboard")}
        title={t("dashboard")}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-2 py-1.5 shadow-soft transition-colors hover:bg-primary-soft"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-[0.7rem] font-bold text-primary-foreground">
          {initials(name, email)}
        </span>
        <span className="hidden max-w-[9rem] truncate text-sm font-semibold sm:inline">
          {display}
        </span>
      </Link>

      <LogoutButton className="hidden md:inline-flex" labelClassName="hidden lg:inline" />
    </div>
  );
}
