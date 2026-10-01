import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, Info, Users } from "lucide-react";

import { RatioBarChart, levelColor, successColor } from "@/components/admin/charts";
import { KpiCard } from "@/components/admin/kpi-card";
import { TruncatedText } from "@/components/admin/truncated-text";
import { Alert } from "@/components/ui/alert";
import { Badge, LevelBadge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AppLocale } from "@/config/enums";
import { requireAdmin } from "@/server/admin";
import { getAdminStats } from "@/server/services/admin-stats";

// ---------------------------------------------------------------------------
// Statistiques de la plateforme.
//
// Deux familles de mesures, a ne pas confondre :
//
//  1. LA QUALITE DU CONTENU (questions, distracteurs) repose sur les
//     reponses. Elle sert a detecter un enonce ambigu ou une bonne reponse
//     contestable. Fenetre glissante de 90 jours : on juge le contenu actuel.
//
//  2. LA PERFORMANCE DES CANDIDATS (niveaux, tests) repose sur les tentatives
//     notees, sans fenetre : c'est un indicateur de long terme.
//
// Chaque tableau indique son echantillon. Sans cela, un taux de reussite calcule
// sur 3 reponses serait lu comme une statistique alors que c'est du bruit.
// ---------------------------------------------------------------------------

export default async function AdminStatsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  const t = await getTranslations("admin.stats");

  await requireAdmin();

  const stats = await getAdminStats();

  const hasSample = stats.totalResponses > 0;

  return (
    <div className="space-y-8">
      {/* -------------------------- Synthese ---------------------------- */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon={CheckCircle2}
          label={t("successRate")}
          value={stats.successRate === null ? "-" : `${stats.successRate} %`}
          ratio={stats.successRate}
          hint={t("responsesCount", { count: stats.totalResponses })}
        />
        <KpiCard
          icon={Users}
          label={t("sampleSize", { count: stats.sampleSize })}
          value={stats.sampleSize.toLocaleString("fr-FR")}
          hint={t("window", { days: stats.windowDays })}
        />
        <KpiCard
          icon={AlertTriangle}
          label={t("hardestCount", { count: stats.hardestQuestions.length })}
          value={String(stats.hardestQuestions.length)}
        />
        <KpiCard
          icon={Info}
          label={t("ambiguousCount", { count: stats.ambiguousQuestions.length })}
          value={String(stats.ambiguousQuestions.length)}
        />
      </section>

      {!hasSample ? <Alert variant="info">{t("emptyState")}</Alert> : null}

      {/* ------------------ Reussite par niveau et theme ---------------- */}
      <section className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("byLevel")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("byLevelSubtitle")}</p>
          </CardHeader>
          <CardContent>
            <RatioBarChart
              data={stats.byLevel.map((row) => ({
                key: row.level,
                label: row.level,
                ratio: row.ratio,
              }))}
              colorFor={(row) => levelColor(row.label)}
              emptyLabel={t("emptyState")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("byCategory")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("byCategorySubtitle")}</p>
          </CardHeader>
          <CardContent>
            <RatioBarChart
              data={stats.byCategory.slice(0, 10).map((row) => ({
                key: row.category,
                label: row.category,
                ratio: row.ratio,
              }))}
              colorFor={(row) => successColor(row.ratio)}
              emptyLabel={t("emptyState")}
            />
          </CardContent>
        </Card>
      </section>

      {/* ------------------- Activite par test ------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{t("attemptsPerTest")}</h2>
          <p className="text-sm text-muted-foreground">{t("attemptsPerTestSubtitle")}</p>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th scope="col" className="p-4 font-semibold">{t("test")}</th>
                    <th scope="col" className="p-4 font-semibold">{t("published")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("attempts")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("candidates")}</th>
                    <th scope="col" className="p-4 text-right font-semibold">{t("avgScore")}</th>
                    <th scope="col" className="p-4 font-semibold">{t("success")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats.attemptsPerTest.map((row) => (
                    <tr key={row.testId}>
                      <td className="p-4 font-medium">{row.title}</td>
                      <td className="p-4">
                        <Badge variant={row.isPublished ? "success" : "outline"} size="sm">
                          {row.isPublished ? t("yes") : t("no")}
                        </Badge>
                      </td>
                      <td className="p-4 text-right tabular-nums">{row.attempts}</td>
                      <td className="p-4 text-right tabular-nums">{row.distinctUsers}</td>
                      <td className="p-4 text-right tabular-nums">
                        {row.avgScore === null ? "-" : row.avgScore}
                      </td>
                      <td className="p-4">
                        {row.avgPercentage === null ? (
                          <span className="text-muted-foreground">-</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Progress
                              className="h-1.5 w-20"
                              value={row.avgPercentage}
                              indicatorClassName={
                                row.avgPercentage >= 70
                                  ? "bg-success"
                                  : row.avgPercentage >= 40
                                    ? "bg-warning"
                                    : "bg-destructive"
                              }
                            />
                            <span className="text-xs tabular-nums text-muted-foreground">
                              {row.avgPercentage} %
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------ Qualite du contenu -------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{t("questionsStats")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("minResponses", { count: stats.minResponsesPerQuestion })} ·{" "}
            {t("window", { days: stats.windowDays })}
          </p>
        </div>

        <QuestionTable
          title={t("hardestQuestions")}
          hint={t("hardestHint")}
          rows={stats.hardestQuestions}
          emptyLabel={t("emptyState")}
          tone="destructive"
        />

        <QuestionTable
          title={t("ambiguous")}
          hint={t("ambiguousHint")}
          rows={stats.ambiguousQuestions}
          emptyLabel={t("emptyState")}
          tone="warning"
        />

        <QuestionTable
          title={t("tooEasy")}
          hint={t("tooEasyHint")}
          rows={stats.tooEasyQuestions}
          emptyLabel={t("emptyState")}
          tone="success"
        />
      </section>

      {/* -------------------- Propositions problematiques ---------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{t("distractorsNeverChosen")}</h2>
          <p className="text-sm text-muted-foreground">{t("distractorsHint")}</p>
        </div>

        <Card>
          <CardContent className="p-0">
            {stats.distractors.length === 0 ? (
              <p className="p-8 text-center text-sm text-muted-foreground">{t("emptyState")}</p>
            ) : (
              <ul className="divide-y divide-border">
                {stats.distractors.map((option) => (
                  <li key={option.optionId} className="space-y-1.5 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <TruncatedText
                        text={`${option.label}. ${option.text}`}
                        className="flex-1 font-medium"
                      />
                      <Badge variant={option.share < 0.05 ? "destructive" : "warning"} size="sm">
                        {option.selections === 0
                          ? t("neverChosen")
                          : t("chosenShare", { percent: Math.round(option.share * 100) })}
                      </Badge>
                    </div>
                    <TruncatedText text={option.questionPrompt} className="text-muted-foreground" />
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function QuestionTable({
  title,
  hint,
  rows,
  emptyLabel,
  tone,
}: {
  title: string;
  hint: string;
  rows: Array<{
    questionId: string;
    code: string | null;
    prompt: string;
    testTitle: string;
    level: string;
    responses: number;
    correct: number;
    ratio: number;
  }>;
  emptyLabel: string;
  tone: "destructive" | "warning" | "success";
}): React.JSX.Element {
  const t = useTranslations("admin.stats");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </CardHeader>
      <CardContent className="p-0">
        {rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          <ul className="divide-y divide-border">
            {rows.map((row) => (
              <li key={row.questionId} className="space-y-2 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-1">
                    <TruncatedText text={row.prompt} className="font-medium" />
                    <p className="text-xs text-muted-foreground">
                      {row.code ? `${row.code} · ` : ""}
                      {row.testTitle}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <LevelBadge level={row.level} size="sm" />
                    <Badge
                      variant={tone}
                      size="sm"
                    >
                      {Math.round(row.ratio * 100)} %
                    </Badge>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">
                  {t("sampleSize", { count: row.responses })} ·{" "}
                  {t("correctCount", { count: row.correct })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}