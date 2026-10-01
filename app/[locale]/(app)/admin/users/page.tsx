import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldAlert, UserX } from "lucide-react";

import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { Pagination } from "@/components/admin/pagination";
import { RoleSelect } from "@/components/admin/role-select";
import { UsersFilters } from "@/components/admin/users-filters";
import { Alert } from "@/components/ui/alert";
import { Badge, LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { requireAdminActor } from "@/server/admin";
import { listUsers, USER_LIST_SCHEMA } from "@/server/services/admin-users";

// ---------------------------------------------------------------------------
// Liste des comptes.
//
// La pagination, le filtre et la recherche vivent dans l'URL et sont appliques
// COTE SERVEUR : aucune liste d'utilisateurs n'est jamais telechargee en entier
// pour etre filtree dans le navigateur.
//
// Les filtres sont valides par Zod avant d'atteindre Prisma : une query string
// arbitraire ne peut donc pas injecter de critere non prevu.
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<Metadata> {
  setRequestLocale(params.locale);
  return { title: "Utilisateurs", robots: { index: false, follow: false } };
}

export default async function AdminUsersPage({
  params,
  searchParams,
}: {
  params: { locale: AppLocale };
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("admin.users");
  const tCommon = await getTranslations("common");

  // Donnees nominatives (noms, e-mails, scores) : le role est relu en base.
  const admin = await requireAdminActor();

  const raw = {
    page: first(searchParams.page),
    q: first(searchParams.q),
    filter: first(searchParams.filter),
    sort: first(searchParams.sort),
  };
  const input = USER_LIST_SCHEMA.parse(raw);
  const list = await listUsers(input);

  // Query string transmise a la pagination, filtres conserves, `page` exclu.
  const linkParams: Record<string, string> = {};
  if (input.q) linkParams.q = input.q;
  if (input.filter !== "ALL") linkParams.filter = input.filter;
  if (input.sort !== "recent") linkParams.sort = input.sort;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold">{t("title")}</h2>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <UsersFilters total={list.total} />

      {list.rows.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 p-12 text-center">
            <UserX className="size-8 text-muted-foreground" aria-hidden />
            <p className="font-semibold">{t("noUsers")}</p>
            {input.q ? (
              <p className="text-sm text-muted-foreground">{t("noResults")}</p>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th scope="col" className="p-4 font-semibold">{t("user")}</th>
                    <th scope="col" className="p-4 font-semibold">{t("role")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("attempts")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("avgScore")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("bestScore")}</th>
                    <th scope="col" className="p-4 font-semibold">{t("lastActivity")}</th>
                    <th scope="col" className="p-4 font-semibold">{t("actions")}</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {list.rows.map((user) => {
                    const isSelf = user.id === admin.id;

                    return (
                      <tr key={user.id} className="align-middle">
                        {/* ------------------- Identite ------------------- */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-bold text-primary"
                            >
                              {initials(user.name, user.email)}
                            </span>
                            <div className="min-w-0">
                              <p className="flex items-center gap-2 font-medium">
                                <span className="truncate">{user.name}</span>
                                {isSelf ? (
                                  <Badge variant="outline" size="sm">{t("you")}</Badge>
                                ) : null}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                              <p className="text-xs text-muted-foreground">
                                {t("joined")} {formatDate(user.createdAt)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* --------------------- Role -------------------- */}
                        <td className="p-4">
                          {isSelf ? (
                            // Le serveur interdit l'auto-modification : on ne
                            // propose pas un controle qui echouerait.
                            <Badge variant="solid" size="sm">{t("admin")}</Badge>
                          ) : (
                            <RoleSelect userId={user.id} currentRole={user.role} />
                          )}
                        </td>

                        {/* ------------------ Statistiques --------------- */}
                        <td className="p-4 text-right tabular-nums">
                          <span className="font-semibold">{user.attempts}</span>
                          <p className="text-xs text-muted-foreground">
                            {user.submitted} {t("completed")}
                          </p>
                        </td>

                        <td className="p-4 text-right tabular-nums">
                          {user.avgScore === null ? (
                            <span className="text-muted-foreground">-</span>
                          ) : (
                            <>
                              <span className="font-semibold">{user.avgScore}</span>
                              <p className="text-xs text-muted-foreground">
                                {user.avgPercentage} %
                              </p>
                            </>
                          )}
                        </td>

                        <td className="p-4 text-right tabular-nums">
                          {user.bestScore === null ? (
                            <span className="text-muted-foreground">-</span>
                          ) : (
                            user.bestScore
                          )}
                        </td>

                        <td className="p-4 text-muted-foreground">
                          {user.lastActivityAt ? formatDate(user.lastActivityAt) : t("never")}
                        </td>

                        {/* -------------------- Actions ------------------ */}
                        <td className="p-4">
                          <div className="flex flex-col items-start gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/admin/users/${user.id}`}>{t("viewDetails")}</Link>
                            </Button>
                            {isSelf ? null : (
                              <DeleteUserButton userId={user.id} name={user.name} />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Pagination page={list.page} pageCount={list.pageCount} params={linkParams} />

      <Alert variant="warning" title={t("deleteWarningTitle")}>
        {t("deleteWarningBody")}
      </Alert>

      <p className="text-xs text-muted-foreground">
        {tCommon("total")} : {list.total}
      </p>
    </div>
  );
}

/** Premierelement d'un parametre de query string (une ou plusieurs valeurs). */
function first(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function initials(name: string, email: string): string {
  const source = name.trim() || email.split("@")[0] || "?";
  const parts = source.split(/[\s._-]+/).filter(Boolean);
  return (parts.slice(0, 2).map((part) => part[0] ?? "").join("") || "?").toUpperCase();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}