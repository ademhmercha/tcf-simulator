import { getTranslations } from "next-intl/server";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export async function SiteFooter(): Promise<React.JSX.Element> {
  const t = await getTranslations("footer");

  const productLinks = [
    { href: "/tests", label: t("tests") },
    { href: "/guide", label: t("guide") },
    { href: "/dashboard", label: t("dashboard") },
  ];

  const legalLinks = [
    { href: "/legal/privacy", label: t("privacy") },
    { href: "/legal/terms", label: t("terms") },
  ];

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-display font-extrabold">
              <BrandLogo className="h-9" imageClassName="h-7" />
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("disclaimerBody")}
            </p>
          </div>

          <FooterColumn title={t("product")} links={productLinks} />
          <FooterColumn title={t("legal")} links={legalLinks} />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            {t("disclaimer")} &mdash; {new Date().getFullYear()} {siteConfig.name}. {t("rights")}
          </p>
          <p className="flex items-center gap-3">
            <span>{t("langLabel")} : Fran&ccedil;ais</span>
            {/* Version deployee : permet de verifier d'un coup d'oeil que le
                site tourne bien sur le dernier commit pousse. */}
            <span
              className="rounded border border-border px-1.5 py-0.5 font-mono text-xs"
              title="Version deployee"
            >
              {buildLabel()}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Commit deploye, injecte par Vercel au build ; `local` en developpement. */
function buildLabel(): string {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA;
  return sha ? sha.slice(0, 7) : "local";
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}): React.JSX.Element {
  return (
    <div>
      <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
