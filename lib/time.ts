/** Utilitaires de temps utilisees par le chronometre (client + serveur). */

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;

/** Formate une duree en millisecondes vers "MM:SS" (ou "H:MM:SS"). */
export function formatDuration(ms: number): string {
  const safe = Math.max(0, ms);
  const totalSeconds = Math.floor(safe / SECOND);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return hours > 0
    ? `${hours}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

/** Formate une duree en millisecondes vers une version lisible ("1 h 25 min"). */
export function formatDurationHuman(ms: number, locale = "fr"): string {
  const totalMinutes = Math.round(Math.max(0, ms) / MINUTE);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const minute = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "minute",
    unitDisplay: "short",
  });
  const hour = new Intl.NumberFormat(locale, {
    style: "unit",
    unit: "hour",
    unitDisplay: "short",
  });

  if (hours === 0) return minute.format(minutes);
  if (minutes === 0) return hour.format(hours);
  return `${hour.format(hours)} ${minute.format(minutes)}`;
}

/** Duree restante en millisecondes, garantie >= 0. */
export function remainingMs(expiresAtMs: number, nowMs: number): number {
  return Math.max(0, expiresAtMs - nowMs);
}

export type TimerPhase = "normal" | "warning" | "critical" | "expired";

export function timerPhase(
  remaining: number,
  thresholds: { medium: number; critical: number },
): TimerPhase {
  if (remaining <= 0) return "expired";
  if (remaining <= thresholds.critical * SECOND) return "critical";
  if (remaining <= thresholds.medium * SECOND) return "warning";
  return "normal";
}
