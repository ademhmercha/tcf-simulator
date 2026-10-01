import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Activity,
  Award,
  CheckCircle2,
  Clock,
  FileQuestion,
  Gauge,
  ListChecks,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import Link from "next/link";

import { AdminAuditLog } from "@/components/admin/audit-log";
import { ActivityChart, LevelDistributionChart } from "@/components/admin/charts";
import { KpiCard } from "@/components/admin/kpi-card";
import { Alert } from "@/components/ui/alert";
import { Badge, LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { requireAdmin } from "@/server/admin";
import { getRecentAuditLog } from "@/server/services/admin-audit";
import { getAdminOverview } from "@/server/services/admin-stats";

// ---------------------------------------------------------------------------
// Vue d'ensemble de la plateforme.
//
// Les agregats proviennent d'un service unique, mis en cache 60 secondes : le
// rendu ne fait donc AUCUNE requete de base propre, et l'ouverture de la page
// reste instantanee meme avec des centaines de milliers de reponses.
// ---------------------------------------------------------------------------

const STATUS_VARIANTS = {
  SUBMITTED: "success",
  IN_PROGRESS: "default",
  EXPIRED: "warning",
  ABANDONED: "destructive",
} as const;

export default async function AdminOverviewPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("admin.overview");
  const tUsers = await getTranslations("admin.users");

  await requireAdmin();

  const [overview, auditLog] = await Promise.all([getAdminOverview(), getRecentAuditLog(8)]);

  return (
    <div className="space-y-8">
      {/* -------------------------- Indicateurs ------------------------- */}
      <section aria-label={t("users")} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            icon={Users}
            label={t("users")}
            value={String(overview.users.total)}
            hint={`${overview.users.candidates} ${tUsers("candidates").toLowerCase()} · ${overview.users.admins} ${tUsers("admins").toLowerCase()}`}
            delay={0}
          />
          <KpiCard
            icon={UserPlus}
            label={t("newUsers")}
            value={`+${overview.users.newLast30d}`}
            hint={`+${overview.users.newLast7d} ${t("last7d")}`}
            delay={60}
          />
          <KpiCard
            icon={ListChecks}
            label={t("tests")}
            value={String(overview.content.tests)}
            hint={`${overview.content.published} ${t("publishedTests")} · ${overview.content.drafts} ${t("draftTests")}`}
            delay={120}
          />
          <KpiCard
            icon={FileQuestion}
            label={t("questions")}
            value={String(overview.content.questions)}
            hint={`${overview.content.documents} ${t("documents")}`}
            delay={180}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            icon={CheckCircle2}
            label={t("attempts")}
            value={String(overview.attempts.total)}
            hint={`${overview.attempts.last7d} ${t("last7d")} · ${overview.attempts.last30d} ${t("last30d")}`}
            delay={0}
          />
          <KpiCard
            icon={TrendingUp}
            label={t("completionRate")}
            value={`${overview.performance.completionRate} %`}
            ratio={overview.performance.completionRate}
            hint={`${overview.attempts.submitted} ${t("submitted")} · ${overview.attempts.inProgress} ${t("inProgress")}`}
            delay={60}
          />
          <KpiCard
            icon={Target}
            label={t("accuracy")}
            value={
              overview.performance.accuracy === null
                ? "-"
                : `${overview.performance.accuracy} %`
            }
            ratio={overview.performance.accuracy}
            hint={`${overview.performance.answers.toLocaleString("fr-FR")} ${t("responses")}`}
            delay={120}
          />
          <KpiCard
            icon={Award}
            label={t("avgScore")}
            value={overview.performance.avgTcfScore === null ? "-" : `${overview.performance.avgTcfScore}`}
            level={overview.performance.avgLevel}
            hint={
              overview.performance.avgPercentage === null
                ? undefined
                : `${overview.performance.avgPercentage} % ${t("ofMax")}`
            }
            delay={180}
          />
        </div>
      </section>

      {/* --------------------------- Graphiques ------------------------- */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{t("activityTitle")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("activitySubtitle")}</p>
          </CardHeader>
          <CardContent>
            <ActivityChart points={overview.activity} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("levelChart")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("levelChartSubtitle")}</p>
          </CardHeader>
          <CardContent>
            <LevelDistributionChart slices={overview.levelDistribution} />
          </CardContent>
        </Card>
      </section>

      {/* ------------------------ Activite recente ----------------------- */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>{t("recentActivity")}</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/${params.locale}/admin/users`}>{t("seeAll")}</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {overview.recentActivity.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">{t("noActivity")}</p>
            ) : (
              <ul className="divide-y divide-border">
                {overview.recentActivity.map((row) => (
                  <li key={row.attemptId} className="flex flex-wrap items-center gap-3 p-4 text-sm">
                    <Badge
                      variant={STATUS_VARIANTS[row.status as keyof typeof STATUS_VARIANTS] ?? "outline"}
                      size="sm"
                    >
                      {t(`status.${row.status}`)}
                    </Badge>

                    <span className="min-w-0 truncate font-medium">{row.userName}</span>
                    <span className="min-w-0 truncate text-muted-foreground">{row.testTitle}</span>

                    <span className="ms-auto flex shrink-0 items-center gap-2">
                      {row.cefrLevel ? <LevelBadge level={row.cefrLevel} size="sm" /> : null}
                      {row.totalScore !== null ? (
                        <span className="font-display font-bold tabular-nums">
                          {row.totalScore}/{row.maxScore ?? "-"}
                        </span>
                      ) : null}
                      <time
                        className="hidden text-xs text-muted-foreground sm:inline"
                        dateTime={row.startedAt}
                      >
                        {new Date(row.startedAt).toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </time>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("usersHealth")}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <HealthRow
                icon={Activity}
                label={t("activeUsers")}
                value={overview.users.activeLast30d}
                total={overview.users.total}
              />
              <HealthRow
                icon={Gauge}
                label={t("completionRate")}
                value={Math.round(overview.performance.completionRate)}
                total={100}
                unit="%"
              />
              <HealthRow
                icon={Clock}
                label={t("expired")}
                value={overview.attempts.expired}
                total={overview.attempts.total}
              />
              <HealthRow
                icon={ListChecks}
                label={t("publishedTests")}
                value={overview.content.published}
                total={overview.content.tests}
              />
            </CardContent>
          </Card>

          <AdminAuditLog entries={auditLog} />
        </div>
      </section>

      {/* --------------------------- Confidentialite --------------------- */}
      <Alert variant="info" title={t("privacyTitle")}>
        {t("privacyBody")}
      </Alert>

      <p className="text-xs text-muted-foreground">
        {t("generatedAt", {
          date: new Date(overview.generatedAt).toLocaleString("fr-FR", {
            dateStyle: "short",
            timeStyle: "short",
          }),
          seconds: 60,
        })}
      </p>
    </div>
  );
}

/** Ligne de « sante » de la plateforme : une valeur sur un total. */
function HealthRow({
  icon: Icon,
  label,
  value,
  total,
  unit = "",
}: {
  icon: typeof Activity;
  label: string;
  value: number;
  total: number;
  unit?: string;
}): React.JSX.Element {
  return (
    <div className="space-y-1">
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5" aria-hidden />
        {label}
      </p>
      <p className="font-display text-lg font-bold tabular-nums">
        {value.toLocaleString("fr-FR")}
        {unit}
        <span className="ms-1 text-xs font-normal text-muted-foreground">
          / {total.toLocaleString("fr-FR")}
          {unit}
        </span>
      </p>
    </div>
  );
}