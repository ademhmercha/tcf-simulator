import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { DEFAULT_LOCALE, LOCALES } from "@/config/enums";

// ---------------------------------------------------------------------------
// Navigation locale (next-intl).
//
// Tous les liens internes doivent passer par ces helpers afin que le prefixe
// de locale soit toujours present (`/fr/...`) et que les redirections restent
// coherentes avec le middleware.
// ---------------------------------------------------------------------------

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: [...LOCALES],
    defaultLocale: DEFAULT_LOCALE,
    localePrefix: "always",
  });
