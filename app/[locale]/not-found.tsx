import { getTranslations } from "next-intl/server";
import { Compass, Home, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

/** 404 localise : declenchee par `notFound()` depuis n'importe quelle page. */
export default async function LocaleNotFound(): Promise<React.JSX.Element> {
  const t = await getTranslations("errors");

  return (
    <div className="container flex min-h-[70dvh] items-center justify-center py-16">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <SearchX className="size-7" aria-hidden />
        </span>

        <p className="mt-6 font-display text-6xl font-extrabold text-muted-foreground/30">404</p>
        <h1 className="mt-2 text-2xl font-extrabold">{t("notFound")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("notFoundBody")}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="size-4" aria-hidden />
              {t("backHome")}
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/tests">
              <Compass className="size-4" aria-hidden />
              Voir les tests
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
