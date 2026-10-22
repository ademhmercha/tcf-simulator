import { getTranslations } from "next-intl/server";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { WritingPromptView } from "@/server/services/writing";

export async function WritingPromptCard({
  prompt,
}: {
  prompt: WritingPromptView;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("writing");

  return (
    <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-medium">
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(`task.${prompt.task}`)}</Badge>
          <Badge variant="outline">{prompt.level}</Badge>
          <Badge variant="outline">{t(`theme.${prompt.theme}`)}</Badge>
        </div>
        <div>
          <h3 className="text-lg font-bold leading-snug">{prompt.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {prompt.minWords}–{prompt.maxWords} {t("card.words")} • {prompt.durationMin}{" "}
            {t("card.minutes")}
          </p>
        </div>
        <div className="mt-auto">
          <Link
            href={`/ecriture/${prompt.slug}`}
            className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            {t("card.start")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
