import { GraduationCap } from "lucide-react";

import { ThemeToggleButton } from "@/components/theme-toggle";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

// Groupe "auth" : entete minimal, sans navigation ni pied de page, pour
// concentrer l'attention sur le formulaire.
export default function AuthLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border/70">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display font-extrabold">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden />
            </span>
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>
          <ThemeToggleButton />
        </div>
      </header>

      <main id="contenu" className="flex-1">
        {children}
      </main>
    </div>
  );
}
