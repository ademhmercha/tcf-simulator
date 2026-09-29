import { getTranslations } from "next-intl/server";
import { GraduationCap, ShieldCheck } from "lucide-react";

import { siteConfig } from "@/config/site";

export async function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("auth");

  return (
    <div className="container flex min-h-[calc(100dvh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-medium">
            <GraduationCap className="size-6" aria-hidden />
          </span>
          <h1 className="mt-5 text-2xl font-extrabold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-medium sm:p-7">
          {children}
        </div>

        <p className="mt-6 flex items-start gap-2 text-center text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>
            {t("legalNotice")} {siteConfig.name}.
          </span>
        </p>
      </div>
    </div>
  );
}
