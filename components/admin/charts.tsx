"use client";

import { useTranslations } from "next-intl";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ActivityPoint, LevelSlice } from "@/server/services/admin-stats";

// ---------------------------------------------------------------------------
// Graphiques de l'espace d'administration.
//
// COULEURS : les variables du theme stockent des CANAUX HSL, pas une couleur
// (`--primary: 222 71% 41%`). Les utiliser directement produirait
// `var(--primary)`, que le navigateur ne sait pas interpreter : le remplissage
// retomberait sur `none` et le graphique serait muet. Il faut donc reconstruire
// la couleur : `hsl(var(--primary))`.
//
// Recharts est reserve au client : ces composants sont marques "use client" et ne
// recoivent que des donnees deja agregees, jamais de requete.
// ---------------------------------------------------------------------------

const AXIS_STYLE = { fontSize: 11 } as const;

/** Enveloppe une variable du theme en couleur CSS exploitable. */
const hsl = (token: string): string => `hsl(var(${token}))`;

const GRID_COLOR = hsl("--border");
const TOOLTIP_STYLE = {
  background: hsl("--popover"),
  border: `1px solid ${hsl("--border")}`,
  borderRadius: "0.75rem",
  color: hsl("--popover-foreground"),
  fontSize: "0.75rem",
} as const;

/** Palette des niveaux CECRL, alignee sur `LevelBadge`. */
const LEVEL_TOKENS: Record<string, string> = {
  A1: "--level-a1",
  A2: "--level-a2",
  B1: "--level-b1",
  B2: "--level-b2",
  C1: "--level-c1",
  C2: "--level-c2",
};

/** Couleur d'un niveau CECRL. Exposition partagee avec les pages. */
export function levelColor(level: string): string {
  return LEVEL_TOKENS[level] ? hsl(LEVEL_TOKENS[level]) : hsl("--primary");
}

/**
 * Courbe d'activite journaliere.
 *
 * `points` contient deja une entree par jour de la fenetre, zéros compris : sans
 * cela Recharts relierait deux dates distantes et donnerait l'illusion d'une
 * activite continue.
 */
export function ActivityChart({
  points,
  height = 240,
}: {
  points: ActivityPoint[];
  height?: number;
}): React.JSX.Element {
  const t = useTranslations("admin.overview");
  const series = points.map((point) => ({ ...point, label: shortDate(point.date) }));

  return (
    <div style={{ height }} className="w-full" role="img" aria-label={t("activityChart")}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="admin-started" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={hsl("--primary")} stopOpacity={0.35} />
              <stop offset="100%" stopColor={hsl("--primary")} stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="admin-submitted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={hsl("--success")} stopOpacity={0.3} />
              <stop offset="100%" stopColor={hsl("--success")} stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="label" tick={AXIS_STYLE} stroke={GRID_COLOR} tickLine={false} axisLine={false} />
          <YAxis tick={AXIS_STYLE} stroke={GRID_COLOR} tickLine={false} axisLine={false} allowDecimals={false} width={40} />
          <Tooltip contentStyle={TOOLTIP_STYLE} labelStyle={{ fontWeight: 600 }} />

          <Area
            type="monotone"
            dataKey="started"
            name={t("chartStarted")}
            stroke={hsl("--primary")}
            strokeWidth={2}
            fill="url(#admin-started)"
          />
          <Area
            type="monotone"
            dataKey="submitted"
            name={t("chartSubmitted")}
            stroke={hsl("--success")}
            strokeWidth={2}
            fill="url(#admin-submitted)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Barres horizontales d'un ratio 0-1 (reussite par niveau, theme, test). */
export function RatioBarChart({
  data,
  height,
  emptyLabel,
  colorFor,
}: {
  data: Array<{ key: string; label: string; ratio: number }>;
  height?: number;
  emptyLabel: string;
  /** Permet de colorer par niveau CECRL ou par seuil de reussite. */
  colorFor?: (row: (typeof data)[number]) => string;
}): React.JSX.Element {
  if (data.length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">{emptyLabel}</p>;
  }

  // Recharts lit la valeur dans `percent` : le ratio 0-1 est converti ici, une
  // seule fois, plutot que dans chaque appel de rendu.
  const rows = data.map((row) => ({ ...row, percent: Math.round(row.ratio * 100) }));

  return (
    <div
      style={{ height: height ?? Math.max(160, rows.length * 34) }}
      className="w-full"
      role="img"
      aria-label={emptyLabel}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={rows}
          layout="vertical"
          margin={{ top: 4, right: 32, bottom: 4, left: 8 }}
          barCategoryGap={6}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={AXIS_STYLE}
            stroke={GRID_COLOR}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={AXIS_STYLE}
            stroke={GRID_COLOR}
            tickLine={false}
            axisLine={false}
            width={92}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(value) => [`${value} %`]} />
          <Bar dataKey="percent" radius={[0, 6, 6, 0]} maxBarSize={22}>
            {rows.map((row) => (
              <Cell key={row.key} fill={colorFor ? colorFor(row) : hsl("--primary")} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Repartition des niveaux CECRL atteints. */
export function LevelDistributionChart({
  slices,
  height = 240,
}: {
  slices: LevelSlice[];
  height?: number;
}): React.JSX.Element {
  const t = useTranslations("admin.overview");

  if (slices.length === 0) {
    return (
      <p className="flex h-full items-center justify-center py-10 text-center text-sm text-muted-foreground">
        {t("noLevels")}
      </p>
    );
  }

  return (
    <div style={{ height }} className="w-full" role="img" aria-label={t("levelChart")}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={slices} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
          <XAxis dataKey="level" tick={AXIS_STYLE} stroke={GRID_COLOR} tickLine={false} axisLine={false} />
          <YAxis tick={AXIS_STYLE} stroke={GRID_COLOR} tickLine={false} axisLine={false} allowDecimals={false} width={36} />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: hsl("--muted"), opacity: 0.4 }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
            {slices.map((slice) => (
              <Cell key={slice.level} fill={levelColor(slice.level)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Couleur de reussite : verte au-dessus de 70 %, ambre au milieu, rouge en dessous. */
export function successColor(ratio: number): string {
  if (ratio >= 0.7) return hsl("--success");
  if (ratio >= 0.4) return hsl("--warning");
  return hsl("--destructive");
}

/** « 2026-04-01 » -> « 01/04 ». */
function shortDate(iso: string): string {
  const [, month, day] = iso.split("-");
  return `${day}/${month}`;
}