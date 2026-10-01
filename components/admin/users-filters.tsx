"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Filtres de la liste des utilisateurs.
 *
 * L'etat vit dans l'URL (`?q=&filter=&sort=&page=`) et non dans un state React :
 * une recherche est ainsi partageable, survivant au rechargement, et rendue
 * cote serveur — aucune liste de comptes n'est telechargee « a l'aveugle » pour
 * etre filtree dans le navigateur.
 */
export function UsersFilters({
  total,
}: {
  total: number;
}): React.JSX.Element {
  const t = useTranslations("admin.users");
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const filter = searchParams.get("filter") ?? "ALL";
  const sort = searchParams.get("sort") ?? "recent";

  /** Pousser une nouvelle query : la page revient toujours a 1 apres un filtre. */
  function apply(next: Record<string, string>): void {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value && value !== "ALL") params.set(key, value);
      else params.delete(key);
    }
    params.delete("page");
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "?");
  }

  // Le champ suit l'URL quand celle-ci change (retour arriere, lien partage).
  const [draft, setDraft] = useState(query);
  useEffect(() => setDraft(query), [query]);

  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        apply({ q: draft.trim() });
      }}
    >
      <div className="relative min-w-[12rem] flex-1">
        <Search
          className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          name="q"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="ps-9 pe-9"
          maxLength={120}
        />
        {draft ? (
          <button
            type="button"
            onClick={() => {
              setDraft("");
              apply({ q: "" });
            }}
            className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={t("clearSearch")}
          >
            <X className="size-3.5" aria-hidden />
          </button>
        ) : null}
      </div>

      <Select value={filter} onValueChange={(value) => apply({ filter: value })}>
        <SelectTrigger className="w-[9.5rem]" aria-label={t("filterRole")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">{t("filterAll")}</SelectItem>
          <SelectItem value="USER">{t("candidates")}</SelectItem>
          <SelectItem value="ADMIN">{t("admins")}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(value) => apply({ sort: value })}>
        <SelectTrigger className="w-[11rem]" aria-label={t("sortBy")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">{t("sortRecent")}</SelectItem>
          <SelectItem value="name">{t("sortName")}</SelectItem>
          <SelectItem value="attempts">{t("sortAttempts")}</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="outline" size="sm" className="h-11">
        {t("apply")}
      </Button>

      <p className="ms-auto text-sm text-muted-foreground">
        {t("resultCount", { count: total })}
      </p>
    </form>
  );
}