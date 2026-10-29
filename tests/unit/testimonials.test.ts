import { describe, expect, it } from "vitest";

import {
  SUBMIT_TESTIMONIAL_SCHEMA,
  TESTIMONIAL_COMMENT_MAX,
} from "@/server/validation/testimonials";

const valid = {
  displayName: "  Sarra   M. ",
  city: " Tunis ",
  level: "B2",
  rating: "5",
  comment: "Les examens blancs sont très proches de l'épreuve réelle, et les corrections m'ont aidée.",
  consent: "on",
};

describe("validation des avis", () => {
  it("normalise les espaces et convertit la note", () => {
    const result = SUBMIT_TESTIMONIAL_SCHEMA.parse(valid);
    expect(result.displayName).toBe("Sarra M.");
    expect(result.city).toBe("Tunis");
    expect(result.rating).toBe(5);
  });

  it("refuse l'avis sans consentement de publication", () => {
    const { consent: _consent, ...rest } = valid;
    expect(SUBMIT_TESTIMONIAL_SCHEMA.safeParse(rest).success).toBe(false);
  });

  it("refuse une note hors de 1 à 5", () => {
    expect(SUBMIT_TESTIMONIAL_SCHEMA.safeParse({ ...valid, rating: "0" }).success).toBe(false);
    expect(SUBMIT_TESTIMONIAL_SCHEMA.safeParse({ ...valid, rating: "6" }).success).toBe(false);
    expect(SUBMIT_TESTIMONIAL_SCHEMA.safeParse({ ...valid, rating: "" }).success).toBe(false);
  });

  it("borne la longueur du commentaire", () => {
    expect(SUBMIT_TESTIMONIAL_SCHEMA.safeParse({ ...valid, comment: "Trop court" }).success).toBe(false);
    expect(
      SUBMIT_TESTIMONIAL_SCHEMA.safeParse({ ...valid, comment: "a".repeat(TESTIMONIAL_COMMENT_MAX + 1) })
        .success,
    ).toBe(false);
  });

  it("ignore un niveau inconnu et une ville vide", () => {
    const result = SUBMIT_TESTIMONIAL_SCHEMA.parse({ ...valid, level: "Z9", city: "  " });
    expect(result.level).toBeUndefined();
    expect(result.city).toBeUndefined();
  });
});
