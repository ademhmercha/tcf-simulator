import { LEVELS, type Level } from "@/config/enums";

// ---------------------------------------------------------------------------
// Types de domaine partages entre le serveur et le client.
// Aucune bonne reponse ne doit transiter par ces types pendant l'examen :
// `ExamQuestion` ne contient volontairement que `label` et `text`.
// ---------------------------------------------------------------------------

export const SECTION_ORDER = ["STRUCTURE", "COMPREHENSION_ECRITE"] as const;
export type SectionOrder = (typeof SECTION_ORDER)[number];

export interface SectionSummary {
  id: string;
  type: SectionOrder;
  title: string;
  instructions: string | null;
  durationMinutes: number;
  questionCount: number;
  order: number;
  documentCount: number;
}

export interface TestSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
  durationMinutes: number | null;
  questionCount: number;
  levels: Level[];
  sections: SectionSummary[];
  attemptCount: number;
  bestTotalScore: number | null;
  bestMaxScore: number | null;
  bestLevel: Level | null;
  /** Identifiant de la tentative ayant obtenu `bestTotalScore`. */
  bestAttemptId: string | null;
  inProgressAttemptId: string | null;
  inProgressSectionId: string | null;
  inProgressRemainingMs: number | null;
}

export interface DocumentView {
  id: string;
  code: string;
  title: string;
  content: string;
  imageUrl: string | null;
  order: number;
}

export interface ExamOption {
  id: string;
  label: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  number: number;
  prompt: string;
  level: Level;
  points: number;
  documentId: string | null;
  category: string | null;
  options: ExamOption[];
  /** Etat local restaure depuis le serveur. */
  selectedOptionId: string | null;
  flagged: boolean;
}

export interface ExamPayload {
  sectionRunId: string;
  attemptId: string;
  testId: string;
  testTitle: string;
  sectionId: string;
  sectionType: SectionOrder;
  sectionTitle: string;
  sectionIndex: number;
  sectionCount: number;
  instructions: string | null;
  /** Horodatage serveur autoritaire (ms epoch). */
  expiresAt: number;
  /** Instant serveur de construction de la charge utile : sert a calculer
   *  l'offset horloge et a afficher le bon temps restant immediatement. */
  serverNow: number;
  questions: ExamQuestion[];
  documents: DocumentView[];
  /** true si la tentative reprend apres une interruption. */
  restored: boolean;
}

export interface ReviewOption extends ExamOption {
  isCorrect: boolean;
}

export interface ReviewQuestion {
  id: string;
  number: number;
  prompt: string;
  level: Level;
  category: string | null;
  points: number;
  explanation: string;
  sectionId: string;
  sectionType: SectionOrder;
  documentId: string | null;
  documentTitle: string | null;
  documentContent: string | null;
  options: ReviewOption[];
  selectedOptionId: string | null;
  isCorrect: boolean;
  flagged: boolean;
  timeSpentSec: number | null;
  correctOptionId: string;
}

export interface LevelStat {
  level: Level;
  total: number;
  correct: number;
  ratio: number;
}

export interface CategoryStat {
  category: string;
  total: number;
  correct: number;
  ratio: number;
}

export interface SectionResult {
  sectionId: string;
  type: SectionOrder;
  title: string;
  score: number;
  maxScore: number;
  ratio: number;
  answered: number;
  total: number;
  correct: number;
  flagged: number;
  level: Level | null;
  durationMinutes: number;
}

export interface AttemptResult {
  attemptId: string;
  testId: string;
  testTitle: string;
  testSlug: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  totalScore: number;
  maxScore: number;
  structureScore: number | null;
  comprehensionScore: number | null;
  cefrLevel: Level | null;
  scoringProfile: string | null;
  sections: SectionResult[];
  byLevel: LevelStat[];
  byCategory: CategoryStat[];
  review: ReviewQuestion[];
  totalTimeSec: number;
  avgTimeSec: number;
  slowest: ReviewQuestion[];
}

export interface AttemptSummary {
  id: string;
  testId: string;
  testTitle: string;
  testSlug: string;
  testOrder: number;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  totalScore: number | null;
  maxScore: number | null;
  structureScore: number | null;
  comprehensionScore: number | null;
  cefrLevel: Level | null;
  totalTimeSec: number;
}

export const ALL_LEVELS = LEVELS;
