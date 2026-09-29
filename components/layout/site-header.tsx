import { getTranslations } from "next-intl/server";
import { GraduationCap } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggleButton } from "@/components/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { auth } from "@/server/auth";

interface NavItem {
  href: string;
  label: string;
}

export async function SiteHeader(): Promise<React.JSX.Element> {
  const t = await getTranslations("nav");
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role === "ADMIN";

  const links: NavItem[] = [
    { href: "/", label: t("home") },
    { href: "/tests", label: t("tests") },
    ...(user
      ? [
          { href: "/dashboard", label: t("dashboard") },
          { href: "/history", label: t("history") },
          { href: "/corrections", label: t("corrections") },
        ]
      : []),
    ...(isAdmin ? [{ href: "/admin", label: t("admin") }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 items-center gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-[0.95rem] font-extrabold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft">
            <GraduationCap className="size-5" aria-hidden />
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav aria-label={t("menu")} className="ml-2 hidden items-center gap-1 md:flex">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <UserMenu
              name={user.name ?? ""}
              email={user.email ?? ""}
              isAdmin={isAdmin}
            />
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link href="/login">{t("login")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">{t("register")}</Link>
              </Button>
            </>
          )}

          <div className="hidden md:block">
            <ThemeToggleButton />
          </div>

          <MobileNav links={links} signedIn={Boolean(user)} />
        </div>
      </div>
    </header>
  );
}
