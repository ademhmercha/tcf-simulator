"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WRITING_LEVELS, WRITING_TASKS, WRITING_THEMES } from "@/config/enums";
import { useRouter } from "@/i18n/navigation";

/**
 * Filtres de la liste des sujets (tache, niveau, theme).
 *
 * Les filtres vivent dans la query string : chaque combinaison est donc
 * partageable et indexable.
 */
export function WritingFilters({
  activeTask,
  activeLevel,
  activeTheme,
}: {
  activeTask: number | null;
  activeLevel: string | null;
  activeTheme: string | null;
}): React.JSX.Element {
  const t = useTranslations("writing");
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string | null): void {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `/ecriture?${query}` : "/ecriture", { scroll: false });
  }

  return (
    <section
      aria-label={t("list.filters")}
      className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-3"
    >
      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("list.task")}
        </span>
        <Select value={activeTask ? String(activeTask) : "all"} onValueChange={(value) => update("task", value === "all" ? null : value)}>
          <SelectTrigger aria-label={t("list.task")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("list.all")}</SelectItem>
            {WRITING_TASKS.map((value) => (
              <SelectItem key={value} value={String(value)}>
                {t(`task.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("list.level")}
        </span>
        <Select value={activeLevel ?? "all"} onValueChange={(value) => update("level", value === "all" ? null : value)}>
          <SelectTrigger aria-label={t("list.level")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("list.all")}</SelectItem>
            {WRITING_LEVELS.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("list.theme")}
        </span>
        <Select value={activeTheme ?? "all"} onValueChange={(value) => update("theme", value === "all" ? null : value)}>
          <SelectTrigger aria-label={t("list.theme")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("list.all")}</SelectItem>
            {WRITING_THEMES.map((value) => (
              <SelectItem key={value} value={value}>
                {t(`theme.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
