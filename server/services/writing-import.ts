import type { PrismaClient } from "@prisma/client";

import { WRITING_PROMPTS } from "@/data/writing";

// ---------------------------------------------------------------------------
// Import des sujets d'expression ecrite.
//
// Le catalogue statique (`data/writing_prompts.json`) est la source de verite :
// l'import ecrit son miroir dans la table `writing_prompts`, qui porte les
// tentatives via cle etrangere.
//
// L'upsert se fait sur `slug` : le script peut etre relance sans dupliquer.
// ---------------------------------------------------------------------------

export interface WritingImportStats {
  created: number;
  updated: number;
  total: number;
}

/** Ecrit les 30 sujets dans la table `writing_prompts`. Idempotent. */
export async function importWritingPrompts(
  db: PrismaClient,
  log: (message: string) => void = () => {},
): Promise<WritingImportStats> {
  let created = 0;
  let updated = 0;

  for (const prompt of WRITING_PROMPTS) {
    const data = {
      task: prompt.task,
      level: prompt.level,
      theme: prompt.theme,
      title: prompt.title,
      instructions: prompt.instructions,
      documents: JSON.stringify(prompt.documents),
      minWords: prompt.minWords,
      maxWords: prompt.maxWords,
      durationMin: prompt.durationMin,
      plan: JSON.stringify(prompt.plan),
      usefulPhrases: JSON.stringify(prompt.usefulPhrases),
      commonMistakes: JSON.stringify(prompt.commonMistakes),
      order: prompt.order,
      isPublished: true,
    };

    const existing = await db.writingPrompt.findUnique({
      where: { slug: prompt.slug },
      select: { id: true },
    });

    if (existing) {
      await db.writingPrompt.update({ where: { slug: prompt.slug }, data });
      updated += 1;
    } else {
      await db.writingPrompt.create({ data: { slug: prompt.slug, ...data } });
      created += 1;
    }
  }

  log(`  Sujets crees : ${created}`);
  log(`  Sujets mis a jour : ${updated}`);

  return { created, updated, total: WRITING_PROMPTS.length };
}
