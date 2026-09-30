import { isSectionType } from "@/config/enums";
import { examConfig } from "@/config/site";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/db";
import type {
  CorrectionIndexEntry,
  CorrectionQuestion,
  CorrectionSection,
  SectionOrder,
  TestCorrection,
} from "@/lib/types";
import { getPublishedTests } from "@/server/services/attempts";

// ---------------------------------------------------------------------------
// Service des corriges.
//
// Point sensible : avec `grading.ts`, ce module est le seul endroit ou
// `Option.isCorrect` est lu pour etre affiche au candidat. Il ne doit jamais
// etre appele depuis le code de l'examen : tant que l'epreuve n'est pas
// terminee, aucune bonne reponse ne doit transiter vers le client.
//
// Les pages de corrige sont reservees aux utilisateurs connectes : la garde
// d'authentification vit dans les pages, comme partout ailleurs dans ce
// projet (aucun layout ne verifie la session).
// ---------------------------------------------------------------------------

const CORRECTION_INCLUDE = {
  sections: {
    orderBy: { order: "asc" as const },
    include: {
      questions: {
        orderBy: { number: "asc" as const },
        include: { options: true, document: true },
      },
    },
  },
} as const;

type CorrectionRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  isPublished: boolean;
  sections: Array<{
    id: string;
    type: string;
    title: string;
    instructions: string | null;
    durationMinutes: number;
    questions: Array<{
      id: string;
      number: number;
      prompt: string;
      level: string;
      category: string | null;
      points: number;
      explanation: string;
      document: { code: string; title: string; content: string } | null;
      options: Array<{ id: string; label: string; text: string; isCorrect: boolean }>;
    }>;
  }>;
};

function toSectionOrder(value: string): SectionOrder {
  return isSectionType(value) ? value : "STRUCTURE";
}

/**
 * Lecture brute du corrige, mise en cache.
 *
 * Un corrige represente environ mille lignes (50 questions, 200 options, 30
 * documents) et ne depend que du contenu : c'est le gros poste de base de
 * données de cette section, il ne doit pas etre rejoue a chaque visite.
 *
 * Comme le catalogue de tests, le contenu est ecrit en base par des scripts
 * (`npm run db:seed`, imports) qui ne peuvent pas invalider le cache depuis
 * le serveur : la fenetre de revalidation absorbe le decalage.
 */
const CORRECTION_REVALIDATE_SECONDS = 900;

const getCorrectionRow = unstable_cache(
  async (slug: string): Promise<CorrectionRow | null> => {
    const row = await prisma.test.findUnique({
      where: { slug },
      include: CORRECTION_INCLUDE,
    });
    return (row as unknown as CorrectionRow | null) ?? null;
  },
  ["test-correction-row"],
  { revalidate: CORRECTION_REVALIDATE_SECONDS, tags: ["tests"] },
);

/**
 * Corrige complet d'un test publie : enonces, options, bonne reponse et
 * explication, document de comprehension ecrit inclus.
 *
 * Retourne `null` si le test n'existe pas ou n'est pas publie, afin que la
 * page affiche une 404.
 */
export async function getTestCorrection(slug: string): Promise<TestCorrection | null> {
  const test = await getCorrectionRow(slug);

  if (!test || !test.isPublished) return null;

  const sections: CorrectionSection[] = test.sections.map((section) => {
    const sectionType = toSectionOrder(section.type);

    const questions: CorrectionQuestion[] = section.questions.map((question) => {
      const options = [...question.options]
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((option) => ({
          id: option.id,
          label: option.label,
          text: option.text,
          isCorrect: option.isCorrect,
        }));

      return {
        id: question.id,
        number: question.number,
        prompt: question.prompt,
        category: question.category,
        points: question.points,
        explanation: question.explanation,
        sectionId: section.id,
        sectionType,
        documentTitle: question.document?.title ?? null,
        documentContent: question.document?.content ?? null,
        options,
        correctOptionId: options.find((option) => option.isCorrect)?.id ?? "",
      };
    });

    return {
      id: section.id,
      type: sectionType,
      title: section.title,
      instructions: section.instructions,
      durationMinutes: section.durationMinutes,
      questions,
    };
  });

  const all = sections.flatMap((section) => section.questions);

  return {
    id: test.id,
    slug: test.slug,
    title: test.title,
    description: test.description,
    order: test.order,
    durationMinutes: examConfig.totalDurationMinutes,
    questionCount: all.length,
    sections,
  };
}

/**
 * Index des corriges : un billet par test publie, enrichi de la progression de
 * l'utilisateur pour eviter d'ouvrir deux requetes identiques.
 */
export async function getCorrectionsIndex(
  userId?: string,
): Promise<CorrectionIndexEntry[]> {
  const tests = await getPublishedTests(userId);

  return tests.map((test) => ({
    id: test.id,
    slug: test.slug,
    title: test.title,
    description: test.description,
    order: test.order,
    questionCount: test.questionCount,
    durationMinutes: examConfig.totalDurationMinutes,
    sectionCount: test.sections.length,
    attemptCount: test.attemptCount,
    bestTotalScore: test.bestTotalScore,
    bestMaxScore: test.bestMaxScore,
    bestLevel: test.bestLevel,
  }));
}
