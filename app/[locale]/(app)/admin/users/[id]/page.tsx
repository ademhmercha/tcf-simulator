import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock, Mail, MailCheck, Target, TrendingUp, Trophy } from "lucide-react";

import { RatioBarChart, successColor } from "@/components/admin/charts";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { KpiCard } from "@/components/admin/kpi-card";
import { RevealAnswers } from "@/components/admin/reveal-answers";
import { RoleSelect } from "@/components/admin/role-select";
import { TruncatedText } from "@/components/admin/truncated-text";
import { Badge, LevelBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { Link } from "@/i18n/navigation";
import { formatDuration } from "@/lib/time";
import { requireAdminActor } from "@/server/admin";
import { getUserDetail } from "@/server/services/admin-users";

// ---------------------------------------------------------------------------
// Fiche d'un candidat.
//
// `requireAdminActor()` et non `requireAdmin()` : cette page contient des
// donnees personnelles (nom, e-mail, score, points faibles). Le role est relu en
// base a CHAQUE ouverture, sans quoi un administrateur retrograde conserverait
// l'acces a tout l'historique d'un candidat pendant les 30 jours de vie de son
// JWT.
//
// AUCUNE REPONSE N'EST RENVOYEE par cette page : uniquement des compteurs. Le
// detail des choix passe par `RevealAnswers`, qui appelle une action tracee.
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: { locale: AppLocale; id: string };
}): Promise<Metadata> {
  setRequestLocale(params.locale);
  return { title: "Fiche candidat", robots: { index: false, follow: false } };
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: { locale: AppLocale; id: string };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("admin.userDetail");

  const admin = await requireAdminActor();
  const user = await getUserDetail(params.id);

  // Compte supprime entre-temps : 404, pas « inexistant » distingue de « supprime ».
  if (!user) notFound();

  const isSelf = user.id === admin.id;

  return (
    <div className="space-y-8">
      {/* ---------------------------- Identite -------------------------- */}
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/users" className="gap-1.5">
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </Link>
        </Button>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <h2 className="flex flex-wrap items-center gap-2 text-2xl font-bold">
              {user.name}
              {isSelf ? <Badge variant="outline">{t("you")}</Badge> : null}
            </h2>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                {user.emailVerified ? (
                  <MailCheck className="size-4 text-success" aria-hidden />
                ) : (
                  <Mail className="size-4" aria-hidden />
                )}
                {user.email}
              </span>
              <span>{t("joined", { date: formatDate(user.createdAt) })}</span>
              <span>
                {user.emailVerified
                  ? t("verified", { date: formatDate(user.emailVerified) })
                  : t("notVerified")}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isSelf ? (
              <Badge variant="solid">{t("admin")}</Badge>
            ) : (
              <>
                <RoleSelect userId={user.id} currentRole={user.role} />
                <DeleteUserButton userId={user.id} name={user.name} />
              </>
            )}
          </div>
        </div>
      </header>

      {/* --------------------------- Synthese --------------------------- */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={Trophy}
          label={t("bestScore")}
          value={user.stats.bestScore === null ? "-" : String(user.stats.bestScore)}
          level={user.stats.bestLevel}
        />
        <KpiCard
          icon={TrendingUp}
          label={t("avgScore")}
          value={user.stats.avgScore === null ? "-" : String(user.stats.avgScore)}
          level={user.stats.avgLevel}
          hint={
            user.stats.avgPercentage === null
              ? undefined
              : `${user.stats.avgPercentage} %`
          }
        />
        <KpiCard
          icon={Target}
          label={t("attempts")}
          value={String(user.stats.attempts)}
          hint={`${user.stats.submitted} ${t("completed")} · ${user.stats.inProgress} ${t("inProgress")}`}
        />
        <KpiCard
          icon={Clock}
          label={t("totalTime")}
          value={formatDuration(user.stats.totalTimeSec * 1000)}
          hint={
            user.stats.lastActivityAt
              ? t("lastActivity", { date: formatDate(user.stats.lastActivityAt) })
              : t("neverActive")
          }
        />
      </section>

      {/* --------------------- Profil par competence -------------------- */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("skills")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("skillsSubtitle")}</p>
          </CardHeader>
          <CardContent>
            <RatioBarChart
              data={user.byCategory.map((row) => ({
                key: row.category,
                label: row.category,
                ratio: row.ratio,
              }))}
              colorFor={(row) => successColor(row.ratio)}
              emptyLabel={t("noSkills")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("weakPoints")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("weakPointsSubtitle")}</p>
          </CardHeader>
          <CardContent className="p-0">
            {user.weakPoints.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">{t("noWeakPoints")}</p>
            ) : (
              <ul className="divide-y divide-border">
                {user.weakPoints.map((point) => (
                  <li key={point.questionId} className="space-y-1.5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <TruncatedText text={point.prompt} className="min-w-0 flex-1 font-medium" />
                      <div className="flex shrink-0 items-center gap-2">
                        <LevelBadge level={point.level} size="sm" />
                        <Badge
                          variant={point.ratio >= 0.5 ? "warning" : "destructive"}
                          size="sm"
                        >
                          {t("successRate", { percent: Math.round(point.ratio * 100) })}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {point.code ? `${point.code} · ` : ""}
                      {point.category ?? "-"} · {point.testTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("mistakes", { failed: point.failed, seen: point.seen })}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ------------------------- Historique --------------------------- */}
      <section className="space-y-4">
        <div>
          <h3 className="text-xl font-bold">{t("attemptsHistory")}</h3>
          <p className="text-sm text-muted-foreground">{t("attemptsHistorySubtitle")}</p>
        </div>

        {user.attempts.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center text-sm text-muted-foreground">
              {t("noAttempts")}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {user.attempts.map((attempt) => (
              <Card key={attempt.id}>
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="font-semibold">{attempt.testTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(attempt.startedAt)}
                        {attempt.durationSec !== null
                          ? ` · ${formatDuration(attempt.durationSec * 1000)}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          attempt.status === "SUBMITTED"
                            ? "success"
                            : attempt.status === "IN_PROGRESS"
                              ? "default"
                              : "destructive"
                        }
                        size="sm"
                      >
                        {t(`status.${attempt.status}`)}
                      </Badge>
                      {attempt.cefrLevel ? (
                        <LevelBadge level={attempt.cefrLevel} size="sm" />
                      ) : null}
                      {attempt.mistakes > 0 ? (
                        <Badge variant="warning" size="sm">
                          {t("mistakesCount", { count: attempt.mistakes })}
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  {attempt.status === "SUBMITTED" ? (
                    <dl className="grid gap-3 text-sm sm:grid-cols-3">
                      <ScoreCell
                        label={t("total")}
                        value={attempt.totalScore}
                        max={attempt.maxScore}
                      />
                      <ScoreCell
                        label={t("structure")}
                        value={attempt.structureScore}
                        max={attempt.maxScore ? attempt.maxScore / 2 : null}
                      />
                      <ScoreCell
                        label={t("comprehension")}
                        value={attempt.comprehensionScore}
                        max={attempt.maxScore ? attempt.maxScore / 2 : null}
                      />
                    </dl>
                  ) : null}

                  {attempt.status === "SUBMITTED" ? (
                    // Le detail des reponses n'est jamais rendu ici : il faut une
                    // action explicite, tracee dans le journal d'administration.
                    <RevealAnswers
                      userId={user.id}
                      attemptId={attempt.id}
                      attemptLabel={attempt.testTitle}
                    />
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/** Cellule « score / maximum » du detail d'une tentative. */
function ScoreCell({
  label,
  value,
  max,
}: {
  label: string;
  value: number | null;
  max: number | null;
}): React.JSX.Element {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="font-display text-lg font-bold tabular-nums">
        {value === null ? "-" : value}
        <span className="ms-1 text-xs font-normal text-muted-foreground">
          / {max === null ? "-" : Math.round(max)}
        </span>
      </dd>
    </div>
  );
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}