import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums metier.
//
// stockes en colonnes `String` (et non enums Prisma) afin que le schema
// fonctionne a l'identique sur PostgreSQL et SQLite. La validation Zod ci-dessous
// constitue la source de verite applicative.
// ---------------------------------------------------------------------------

export const ROLES = ["USER", "ADMIN"] as const;
export const RoleSchema = z.enum(ROLES);
export type Role = z.infer<typeof RoleSchema>;

export const SECTION_TYPES = ["STRUCTURE", "COMPREHENSION_ECRITE"] as const;
export const SectionTypeSchema = z.enum(SECTION_TYPES);
export type SectionType = z.infer<typeof SectionTypeSchema>;

export const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export const LevelSchema = z.enum(LEVELS);
export type Level = z.infer<typeof LevelSchema>;

export const OPTION_LABELS = ["A", "B", "C", "D"] as const;
export const OptionLabelSchema = z.enum(OPTION_LABELS);
export type OptionLabel = z.infer<typeof OptionLabelSchema>;

export const ATTEMPT_STATUSES = ["IN_PROGRESS", "SUBMITTED", "EXPIRED", "ABANDONED"] as const;
export const AttemptStatusSchema = z.enum(ATTEMPT_STATUSES);
export type AttemptStatus = z.infer<typeof AttemptStatusSchema>;

export const SECTION_RUN_STATUSES = ["IN_PROGRESS", "SUBMITTED", "EXPIRED"] as const;
export const SectionRunStatusSchema = z.enum(SECTION_RUN_STATUSES);
export type SectionRunStatus = z.infer<typeof SectionRunStatusSchema>;

/**
 * Locales livrees.
 *
 * Le francais est la seule langue de la plateforme. Le catalogue anglais est
 * conserve sur disque (`i18n/messages/en.json`) et peut etre reactive en
 * ajoutant "en" a cette liste : tout le reste (routes, middleware, commutation
 * de langue) est deja en place.
 */
export const LOCALES = ["fr"] as const;
export const LocaleSchema = z.enum(LOCALES);
export type AppLocale = z.infer<typeof LocaleSchema>;

export const DEFAULT_LOCALE: AppLocale = "fr";

/** Aucune locale RTL livree : la plateforme est integralement en LTR. */
export const RTL_LOCALES: readonly AppLocale[] = [];

export function isRtlLocale(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

export function isLevel(value: string): value is Level {
  return (LEVELS as readonly string[]).includes(value);
}

export function isSectionType(value: string): value is SectionType {
  return (SECTION_TYPES as readonly string[]).includes(value);
}

/** Indice de difficulte (0 = A1 ... 5 = C2). */
export function levelIndex(level: string): number {
  const i = LEVELS.indexOf(level as Level);
  return i === -1 ? 0 : i;
}
