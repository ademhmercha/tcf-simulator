import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Lock, ShieldCheck } from "lucide-react";

import { AdminNav } from "@/components/admin/admin-nav";
import { Badge } from "@/components/ui/badge";
import type { AppLocale } from "@/config/enums";
import { requireAdmin } from "@/server/admin";

// ---------------------------------------------------------------------------
// Layout de l'espace d'administration.
//
// `requireAdmin()` est appele ICI, et dans chaque page enfant. Une seule garde
// suffirait au routage, mais la repetition est deliberee : chaque page verifie
// sa propre autorisation, donc l'oubli d'un garde dans un sous-dossier ne peut
// pas exposer de donnees.
//
// `notFound()` plutot qu'une 403 : la page d'interdiction ne doit pas confirmer
// a un visiteur que `/admin` existe.
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("admin");
  const admin = await requireAdmin();

  return (
    <div className="container space-y-8 py-10">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold sm:text-3xl">
            <ShieldCheck className="size-6 text-primary" aria-hidden />
            {t("title")}
          </h1>

          {/* Rappel permanent du contexte : evite de confondre cette zone avec
              l'espace candidat. */}
          <Badge variant="outline" className="gap-1.5">
            <Lock className="size-3" aria-hidden />
            {t("secureArea")}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AdminNav />
          <p className="mt-4 hidden text-xs text-muted-foreground lg:block">
            {t("signedInAs", { name: admin.name || admin.email })}
          </p>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}