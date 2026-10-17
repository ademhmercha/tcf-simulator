import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { getVocabulaireDocument, VOCABULAIRE_SERIES } from "@/data/vocabulaire";

// Slug d'URL attendu : minuscules, chiffres, tirets (ex: "les-transports").
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Nom de fichier prudent : pas d'espaces ni de caracteres accentues, pour
// que l'URL /pdf/vocabulaire/<file> reste canonique sans encodage.
const FILE_RE = /^[A-Za-z0-9._-]+\.pdf$/;

describe("manifeste vocabulaire", () => {
  it("a des slugs uniques et valides", () => {
    const slugs = VOCABULAIRE_SERIES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(SLUG_RE);
    }
  });

  it("a des titres non vides et au moins un document par serie", () => {
    for (const serie of VOCABULAIRE_SERIES) {
      expect(serie.title.trim().length).toBeGreaterThan(0);
      expect(serie.documents.length).toBeGreaterThan(0);
    }
  });

  it("a des identifiants de document uniques et valides par serie", () => {
    for (const serie of VOCABULAIRE_SERIES) {
      const ids = serie.documents.map((doc) => doc.id);
      expect(new Set(ids).size).toBe(ids.length);
      for (const doc of serie.documents) {
        expect(doc.id).toMatch(SLUG_RE);
        expect(doc.label.trim().length).toBeGreaterThan(0);
        expect(doc.file).toMatch(FILE_RE);
      }
    }
  });

  it("pointe vers des PDF presents dans public/pdf/vocabulaire", () => {
    for (const serie of VOCABULAIRE_SERIES) {
      for (const doc of serie.documents) {
        const path = join(process.cwd(), "public", "pdf", "vocabulaire", doc.file);
        expect(existsSync(path), `PDF manquant : public/pdf/vocabulaire/${doc.file}`).toBe(true);
      }
    }
  });

  it("retombe sur le premier document quand l'identifiant est inconnu", () => {
    for (const serie of VOCABULAIRE_SERIES) {
      const first = serie.documents[0]!;
      expect(getVocabulaireDocument(serie, undefined)).toBe(first);
      expect(getVocabulaireDocument(serie, "inexistant")).toBe(first);
      if (serie.documents.length > 1) {
        expect(getVocabulaireDocument(serie, serie.documents[1]!.id)).toBe(serie.documents[1]);
      }
    }
  });
});
