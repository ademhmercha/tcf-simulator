export const siteConfig = {
  name: "TCF Simulator",
  shortName: "TCF",
  description:
    "Plateforme d'entrainement au TCF : 5 tests blancs complets, correction detaillee et niveau CECRL estime.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  locale: "fr",
  keywords: [
    "TCF",
    "TCF Tout public",
    "test blanc TCF",
    "TCF preparation",
    "CECRL",
    "niveau A1 A2 B1 B2 C1 C2",
    "francais",
  ],
} as const;

export const examConfig = {
  /**
   * Budget de temps de la tentative, en minutes.
   *
   * Un SEUL chronometre couvre l'ensemble du test : les deux epreuves se
   * partagent cette duree globale, elle ne repart pas a zero entre la
   * Structure et la Comprehension ecrite.
   */
  totalDurationMinutes: 60,
  /**
   * Duree indicative par epreuve, en minutes. Decrit le volume de contenu et
   * sert de recommandation de travail dans les corriges ; elle ne pilote pas le
   * chronometre, qui est global (voir `totalDurationMinutes`).
   */
  recommendedSectionMinutes: {
    STRUCTURE: 20,
    COMPREHENSION_ECRITE: 60,
  } as const,
  /** Seuils d'alerte visuelle du chronometre (secondes restantes). */
  timerWarnings: {
    medium: 5 * 60,
    critical: 60,
  },
  /** Delai de grace (secondes) tolere par le serveur avant expiration stricte. */
  graceSeconds: 3,
  /** Intervalle de synchronisation client/serveur (ms). */
  heartbeatIntervalMs: 30_000,
  /** Intervalle de sauvegarde des reponses (ms). */
  autosaveDebounceMs: 400,
  shortcuts: {
    choose: ["a", "b", "c", "d"] as const,
    previous: "arrowleft",
    next: "arrowright",
    flag: "f",
    submit: "enter",
  },
} as const;

export const features = {
  questionCountPerTest: 50,
  structureQuestions: 20,
  comprehensionQuestions: 30,
  testCount: 5,
  totalQuestions: 250,
} as const;
