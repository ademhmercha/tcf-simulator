import { getTranslations } from "next-intl/server";
import { ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/** Ecran affiche quand une SectionRun n'est pas jouable par cet utilisateur. */
export async function ExamAccessDenied({
  code,
}: {
  code: string;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("errors");

  return (
    <div className="container flex min-h-dvh items-center justify-center py-16">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <ShieldAlert className="size-7" aria-hidden />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold">
          {code === "FORBIDDEN" ? t("forbidden") : t("notFound")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {code === "FORBIDDEN" ? t("forbiddenBody") : t("notFoundBody")}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/tests">{t("backHome")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard">Tableau de bord</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
