import { getTranslations } from "next-intl/server";

import { AccountNav } from "@/components/layout/account-nav";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggleButton } from "@/components/theme-toggle";
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
    { href: "/examens", label: t("exams") },
    { href: "/guide", label: t("guide") },
    ...(user ? [{ href: "/dashboard", label: t("dashboard") }] : []),
    ...(isAdmin ? [{ href: "/admin", label: t("admin") }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 items-center gap-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-display text-[0.95rem] font-extrabold tracking-tight"
        >
          <BrandLogo priority className="h-9" imageClassName="h-7" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <DesktopNav links={links.slice(1)} />

        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <AccountNav name={user.name ?? ""} email={user.email ?? ""} />
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

          <MobileNav
            links={links}
            signedIn={Boolean(user)}
            name={user?.name ?? ""}
            email={user?.email ?? ""}
          />
        </div>
      </div>
    </header>
  );
}
