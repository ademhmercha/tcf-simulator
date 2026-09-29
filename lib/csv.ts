import { slugify } from "@/lib/slug";

// ---------------------------------------------------------------------------
// Parser CSV minimal mais correct pour notre cas d'usage : valeurs separees
// par des virgules, champsoptionnels entre guillemets, guillemets doublés
// pour l'echappement, retours a la ligne toleres dans un champ.
// ---------------------------------------------------------------------------

export interface CsvParseResult {
  header: string[];
  rows: Array<Record<string, string>>;
  errors: string[];
}

export function parseCsv(input: string, delimiter = ","): CsvParseResult {
  const text = input.replace(/^\uFEFF/, "");
  const records: string[][] = [];
  const errors: string[] = [];

  let field = "";
  let record: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      continue;
    }

    if (char === delimiter) {
      record.push(field);
      field = "";
      continue;
    }

    if (char === "\r") continue;

    if (char === "\n") {
      record.push(field);
      field = "";
      if (record.some((c) => c.trim() !== "")) records.push(record);
      record = [];
      continue;
    }

    field += char;
  }

  record.push(field);
  if (record.some((c) => c.trim() !== "")) records.push(record);

  if (inQuotes) errors.push("Guillemet non ferme detecte.");

  const header = (records.shift() ?? []).map((h) => h.trim());
  const rows = records.map((r) => {
    const obj: Record<string, string> = {};
    header.forEach((key, index) => {
      obj[key] = r[index] ?? "";
    });
    return obj;
  });

  return { header, rows, errors };
}

/** Serialise des lignes en CSV (utilise par `npm run export:csv`). */
export function toCsv(header: readonly string[], rows: ReadonlyArray<Record<string, unknown>>): string {
  const escape = (value: unknown): string => {
    const s = value === null || value === undefined ? "" : String(value);
    return /["\n\r,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [header.join(",")];
  for (const row of rows) {
    lines.push(header.map((h) => escape(row[h])).join(","));
  }
  return `${lines.join("\r\n")}\r\n`;
}

export { slugify };
