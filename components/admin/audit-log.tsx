import { AlertTriangle, Info } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminErrorKey, type AdminActionError } from "@/lib/admin-errors";
import type { AuditEntry } from "@/server/services/admin-audit";

// ---------------------------------------------------------------------------
// Journal d'administration.
//
// Affiche qui a consulte, degrade ou supprime quoi. Il est volontairement
// visible : un journal que personne ne regarde ne sert a rien.
// ---------------------------------------------------------------------------

const ACTION_VARIANTS: Record<string, "default" | "warning" | "destructive" | "outline"> = {
  ADMIN_VIEW_ANSWERS: "warning",
  ADMIN_UPDATE_ROLE: "default",
  ADMIN_DELETE_USER: "destructive",
};

export function AdminAuditLog({ entries }: { entries: AuditEntry[] }): React.JSX.Element {
  const t = useTranslations("admin.audit");

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 p-10 text-center">
          <Info className="size-7 text-muted-foreground" aria-hidden />
          <p className="font-semibold">{t("empty")}</p>
          <p className="text-sm text-muted-foreground">{t("emptyHint")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {entries.map((entry) => (
            <li key={entry.id} className="flex flex-wrap items-center gap-3 p-4 text-sm">
              <Badge variant={ACTION_VARIANTS[entry.action] ?? "outline"} size="sm">
                {t(`actions.${entry.action}`)}
              </Badge>

              <span className="min-w-0 truncate">{entry.adminName}</span>

              {entry.metadata?.answerCount !== undefined ? (
                <span className="text-muted-foreground">
                  {t("answerCount", { count: Number(entry.metadata.answerCount) })}
                </span>
              ) : null}

              <time
                className="ms-auto shrink-0 text-xs text-muted-foreground"
                dateTime={entry.createdAt}
              >
                {new Date(entry.createdAt).toLocaleString("fr-FR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </time>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/** Bandeau d'alerte pour un code d'erreur admin, a placer dans une page. */
export function AdminErrorAlert({ code }: { code: AdminActionError }): React.JSX.Element {
  const t = useTranslations("admin");
  return (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
      {t(adminErrorKey(code))}
    </div>
  );
}