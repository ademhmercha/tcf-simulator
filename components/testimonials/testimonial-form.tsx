"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LEVELS } from "@/config/enums";
import { INITIAL_FORM_STATE } from "@/lib/form-state";
import { cn } from "@/lib/utils";
import { submitTestimonialAction } from "@/server/actions/testimonials";
import {
  TESTIMONIAL_COMMENT_MAX,
  TESTIMONIAL_COMMENT_MIN,
} from "@/server/validation/testimonials";
import type { OwnTestimonial } from "@/server/services/testimonials";

// ---------------------------------------------------------------------------
// Formulaire d'avis (page de resultats). Un seul avis par compte : le
// formulaire est prerempli avec l'avis existant, que le candidat peut modifier
// (il repasse alors en moderation).
// ---------------------------------------------------------------------------

function Submit({ editing }: { editing: boolean }): React.JSX.Element {
  const t = useTranslations("testimonials");
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} loading={pending}>
      {pending ? t("sending") : editing ? t("update") : t("submit")}
    </Button>
  );
}

export function TestimonialForm({
  defaultName,
  existing,
}: {
  defaultName: string;
  existing: OwnTestimonial | null;
}): React.JSX.Element {
  const t = useTranslations("testimonials");
  const [state, formAction] = useFormState(submitTestimonialAction, INITIAL_FORM_STATE);
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [hover, setHover] = useState(0);
  const [length, setLength] = useState(existing?.comment.length ?? 0);

  const shown = hover || rating;
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <p className="text-sm font-semibold" id="rating-label">
          {t("rating")}
        </p>
        <div
          className="mt-2 flex items-center gap-1"
          role="radiogroup"
          aria-labelledby="rating-label"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={t("ratingValue", { n })}
              onMouseEnter={() => setHover(n)}
              onClick={() => setRating(n)}
              className="rounded-md p-0.5 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star
                className={cn(
                  "size-8 transition-colors",
                  n <= shown ? "fill-warning text-warning" : "fill-transparent text-muted-foreground/40",
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating || ""} />
        {errors.rating ? <p className="mt-1 text-xs text-destructive">{errors.rating}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="displayName">{t("name")}</Label>
          <Input
            id="displayName"
            name="displayName"
            defaultValue={existing?.displayName ?? defaultName}
            placeholder={t("namePlaceholder")}
            maxLength={40}
            aria-invalid={Boolean(errors.displayName)}
          />
          {errors.displayName ? (
            <p className="text-xs text-destructive">{errors.displayName}</p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="city">{t("city")}</Label>
          <Input
            id="city"
            name="city"
            defaultValue={existing?.city ?? ""}
            placeholder={t("cityPlaceholder")}
            maxLength={40}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="level">{t("level")}</Label>
          <select
            id="level"
            name="level"
            defaultValue={existing?.level ?? ""}
            className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-sm focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/25"
          >
            <option value="">{t("levelNone")}</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="comment">{t("comment")}</Label>
        <Textarea
          id="comment"
          name="comment"
          defaultValue={existing?.comment ?? ""}
          placeholder={t("commentPlaceholder")}
          maxLength={TESTIMONIAL_COMMENT_MAX}
          rows={4}
          aria-invalid={Boolean(errors.comment)}
          onChange={(event) => setLength(event.target.value.length)}
        />
        <div className="flex justify-between text-xs">
          <span className="text-destructive">{errors.comment ?? ""}</span>
          <span
            className={cn(
              "tabular-nums text-muted-foreground",
              length > 0 && length < TESTIMONIAL_COMMENT_MIN && "text-warning",
            )}
          >
            {length} / {TESTIMONIAL_COMMENT_MAX}
          </span>
        </div>
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={Boolean(existing)}
            className="mt-0.5 size-4 shrink-0 rounded border-input accent-primary"
          />
          {t("consent")}
        </label>
        {errors.consent ? <p className="mt-1 text-xs text-destructive">{errors.consent}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Submit editing={Boolean(existing)} />
        {state.message ? (
          <p
            role="status"
            className={cn(
              "text-sm",
              state.status === "success" ? "font-medium text-success" : "text-destructive",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
