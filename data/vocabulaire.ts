/**
 * Manifeste des series de vocabulaire (fiches PDF).
 *
 * Pour ajouter une fiche :
 *  1. deposer le(s) PDF dans `public/pdf/vocabulaire/` (nom ascii simple :
 *     lettres minuscules, chiffres, tirets — pas d'espaces ni d'accents) ;
 *  2. ajouter une entree ci-dessous (slug unique, titre, documents).
 *
 * Une serie peut regrouper plusieurs documents : ex. un « Questionnaire » et
 * son « Corrige », presentes en onglets dans la visionneuse. Les PDF sont
 * servis par Next depuis `public/` et affiches directement dans le site via
 * une visionneuse integree (iframe, meme origine — le header
 * `X-Frame-Options: SAMEORIGIN` pour `/pdf/` est pose dans next.config.mjs).
 * Aucune base de donnees : `tests/unit/vocabulaire.test.ts` verifie la
 * coherence entre ce manifeste et les fichiers presents.
 */

export interface VocabulaireDocument {
  /** Identifiant d'onglet : /fr/vocabulaire/<slug>?doc=<id> */
  id: string;
  /** Libelle affiche dans l'onglet (ex. « Questionnaire », « Corrige »). */
  label: string;
  /** Nom du fichier dans public/pdf/vocabulaire/ */
  file: string;
}

export interface VocabulaireSerie {
  /** Identifiant d'URL : /fr/vocabulaire/<slug> */
  slug: string;
  title: string;
  description: string | null;
  /** Niveau CECRL facultatif (affiche en pastille) */
  level: string | null;
  /** Nombre de questions, affiche sur la carte (facultatif). */
  questionCount: number | null;
  /** Au moins un document ; le premier est l'onglet par defaut. */
  documents: readonly VocabulaireDocument[];
}

export const VOCABULAIRE_SERIES: readonly VocabulaireSerie[] = [
  {
    slug: "revision-vocabulaire-b2-c1-c2",
    title: "Révision de vocabulaire français — Série 1",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-corrige.pdf",
      },
    ],
  },
  {
    slug: "revision-vocabulaire-b2-c1-c2-serie2",
    title: "Révision de vocabulaire français — Série 2",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-serie2-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-serie2-corrige.pdf",
      },
    ],
  },
  {
    slug: "revision-vocabulaire-b2-c1-c2-serie3",
    title: "Révision de vocabulaire français — Série 3",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-serie3-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-serie3-corrige.pdf",
      },
    ],
  },
  {
    slug: "revision-vocabulaire-b2-c1-c2-serie4",
    title: "Révision de vocabulaire français — Série 4",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-serie4-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-serie4-corrige.pdf",
      },
    ],
  },
  {
    slug: "revision-vocabulaire-b2-c1-c2-serie5",
    title: "Révision de vocabulaire français — Série 5",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-serie5-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-serie5-corrige.pdf",
      },
    ],
  },
  {
    slug: "revision-vocabulaire-b2-c1-c2-serie6",
    title: "Révision de vocabulaire français — Série 6",
    description:
      "50 questions à choix multiple pour réviser le vocabulaire des niveaux B2, C1 et C2, avec grille de réponses et corrigé détaillé.",
    level: "B2-C1-C2",
    questionCount: 50,
    documents: [
      {
        id: "questionnaire",
        label: "Questionnaire",
        file: "revision-vocabulaire-b2-c1-c2-serie6-questionnaire.pdf",
      },
      {
        id: "corrige",
        label: "Corrigé",
        file: "revision-vocabulaire-b2-c1-c2-serie6-corrige.pdf",
      },
    ],
  },
];

/** Retourne la fiche correspondant au slug, ou null. */
export function getVocabulaireSerie(slug: string): VocabulaireSerie | null {
  return VOCABULAIRE_SERIES.find((serie) => serie.slug === slug) ?? null;
}

/** Retourne le document demande d'une serie, ou le premier par defaut. */
export function getVocabulaireDocument(
  serie: VocabulaireSerie,
  docId: string | undefined,
): VocabulaireDocument {
  const found = serie.documents.find((doc) => doc.id === docId);
  return found ?? serie.documents[0]!;
}
