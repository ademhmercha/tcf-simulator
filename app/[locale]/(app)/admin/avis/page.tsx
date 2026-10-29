import { getTranslations, setRequestLocale } from "next-intl/server";

import { ModerationButtons } from "@/components/admin/moderation-buttons";
import { Stars } from "@/components/testimonials/stars";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AppLocale } from "@/config/enums";
import { requireAdminActor } from "@/server/admin";
import { listTestimonialsForAdmin } from "@/server/services/testimonials";

export const dynamic = "force-dynamic";

// Page nominative (e-mail des auteurs) : l'administrateur est relu en base.
export default async function AdminReviewsPage({
  params,
}: {
  params: { locale: AppLocale };
}): Promise<React.JSX.Element> {
  setRequestLocale(params.locale);
  await requireAdminActor();

  const t = await getTranslations("admin.reviews");
  const tStatus = await getTranslations("testimonials.status");
  const reviews = await listTestimonialsForAdmin();
  const pending = reviews.filter((review) => review.status === "PENDING").length;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="flex items-center gap-3 text-xl font-bold">
          {t("title")}
          {pending > 0 ? <Badge variant="warning">{`${t("pending")} : ${pending}`}</Badge> : null}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("lead")}</p>
      </div>

      {reviews.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          {t("empty")}
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <Card>
                <CardContent className="space-y-3 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <Stars value={review.rating} />
                      <Badge
                        variant={
                          review.status === "APPROVED"
                            ? "default"
                            : review.status === "PENDING"
                              ? "warning"
                              : "outline"
                        }
                      >
                        {tStatus(review.status)}
                      </Badge>
                    </div>
                    <time
                      dateTime={review.updatedAt.toISOString()}
                      className="text-xs text-muted-foreground"
                    >
                      {review.updatedAt.toLocaleDateString("fr-FR")}
                    </time>
                  </div>

                  <p className="text-sm leading-relaxed">« {review.comment} »</p>

                  <p className="text-xs text-muted-foreground">
                    <strong className="text-foreground">{review.displayName}</strong>
                    {review.city ? ` · ${review.city}` : ""}
                    {review.level ? ` · ${review.level}` : ""} — {t("by")} {review.userEmail}
                  </p>

                  <ModerationButtons id={review.id} status={review.status} />
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
