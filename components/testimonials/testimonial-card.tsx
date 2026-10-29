import { MessageSquareHeart } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Stars } from "@/components/testimonials/stars";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { OwnTestimonial } from "@/server/services/testimonials";

/** Encart « Ton avis » de la page de resultats. */
export async function TestimonialCard({
  defaultName,
  existing,
}: {
  defaultName: string;
  existing: OwnTestimonial | null;
}): Promise<React.JSX.Element> {
  const t = await getTranslations("testimonials");

  return (
    <Card className="border-primary/25 bg-primary-soft/30">
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <MessageSquareHeart className="size-5 text-primary" aria-hidden />
              {existing ? t("yourReview") : t("title")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {existing ? t("editHint") : t("lead")}
            </p>
          </div>
          {existing ? (
            <div className="flex items-center gap-2">
              <Stars value={existing.rating} />
              <Badge variant={existing.status === "APPROVED" ? "default" : "outline"}>
                {t(`status.${existing.status}`)}
              </Badge>
            </div>
          ) : null}
        </div>

        <TestimonialForm defaultName={defaultName} existing={existing} />
      </CardContent>
    </Card>
  );
}
