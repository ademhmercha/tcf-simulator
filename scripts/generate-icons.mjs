/**
 * Generateur d'icones PWA.
 *
 * Le projet ne dispose d'aucun outil de rastérisation (ni sharp, ni SVG
 * loader). Plutot que d'embarquer des binaires opaques, les icones sont
 * dessinees ici a partir de formes geometriques puis encodees en PNG avec
 * le seul module natif `zlib`.
 *
 * Le rendu utilise des fonctions de distance signee (SDF) et un
 * suréchantillonnage 4x, ce qui donne des bords lisses sans bibliotheque.
 *
 * Usage : node scripts/generate-icons.mjs
 */
import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "public", "icons");
const SS = 4; // facteur de suréchantillonnage

// ---------------------------------------------------------------- PNG ------

const CRC_TABLE = (() => {
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  return table;
})();

function crc32(buffer) {
  let crc = -1;
  for (const byte of buffer) crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

/** Encode un buffer RGBA (w * h * 4) en PNG. */
function encodePng(rgba, width, height) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // profondeur 8 bits
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression deflate
  ihdr[11] = 0; // filtre adaptatif
  ihdr[12] = 0; // pas d'entrelacement

  // Chaque scanline est prefixee par son type de filtre (0 = aucun).
  const raw = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Assemble plusieurs PNG en un conteneur ICO (format Vista+). */
function encodeIco(pngBuffers) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservé
  header.writeUInt16LE(1, 2); // type 1 = icône
  header.writeUInt16LE(pngBuffers.length, 4);

  const entries = [];
  let offset = 6 + pngBuffers.length * 16;
  for (const { size, png } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size; // largeur (0 = 256)
    entry[1] = size >= 256 ? 0 : size; // hauteur
    entry[2] = 0; // palette
    entry[3] = 0; // reservé
    entry.writeUInt16LE(1, 4); // plans
    entry.writeUInt16LE(32, 6); // bits par pixel
    entry.writeUInt32BE(0, 8);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((item) => item.png)]);
}

// ------------------------------------------------------------- Dessin ------

const hex = (value) => [
  parseInt(value.slice(1, 3), 16),
  parseInt(value.slice(3, 5), 16),
  parseInt(value.slice(5, 7), 16),
];

// Couleurs alignees sur les variables CSS de `app/globals.css`.
const TOP = hex("#2f63d8"); // --primary éclairci
const BOTTOM = hex("#1b3f9e"); // --primary
const ACCENT = hex("#f48525"); // --accent
const INK = hex("#f8fafc"); // --primary-foreground

const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/** Distance signée à un rectangle arrondi (négative = intérieur). */
function sdRoundRect(x, y, cx, cy, halfW, halfH, radius) {
  const qx = Math.abs(x - cx) - (halfW - radius);
  const qy = Math.abs(y - cy) - (halfH - radius);
  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    radius
  );
}

/** Distance signée à un segment (extrémités arrondies). */
function sdSegment(px, py, ax, ay, bx, by) {
  const pax = px - ax;
  const pay = py - ay;
  const bax = bx - ax;
  const bay = by - ay;
  const h = Math.min(1, Math.max(0, (pax * bax + pay * bay) / (bax * bax + bay * bay)));
  return Math.hypot(pax - bax * h, pay - bay * h);
}

/**
 * Couleur d'un point, en coordonnées normalisées [0, 1].
 * `maskable` remplit tout le carre et reduit le dessin (zone de surete).
 */
function sample(x, y, maskable) {
  const scale = maskable ? 0.62 : 1;
  const inset = maskable ? 0 : 0;

  // Fond
  const bgDistance = maskable
    ? -1
    : sdRoundRect(x, y, 0.5, 0.5, 0.5 - inset, 0.5 - inset, 0.22);
  if (bgDistance > 0) return null;

  let color = mix(TOP, BOTTOM, Math.min(1, Math.max(0, y * 1.15 - 0.05)));

  // Recentrage du dessin pour les icones maskable.
  const px = maskable ? (x - 0.5) / scale + 0.5 : x;
  const py = maskable ? (y - 0.5) / scale + 0.5 : y;

  // Coche de validation : deux segments.
  const stroke = 0.052;
  const check = Math.min(
    sdSegment(px, py, 0.30, 0.52, 0.435, 0.655),
    sdSegment(px, py, 0.435, 0.655, 0.71, 0.35),
  );
  if (check - stroke <= 0) {
    color = mix(color, INK, 1);
  }

  // Soulignement : suggere la ligne de texte corrigee.
  const barY = 0.775;
  const barHalf = 0.20;
  const barThickness = 0.030;
  const inBarX = Math.abs(px - 0.5) <= barHalf;
  const inBarY = Math.abs(py - barY) <= barThickness;
  if (inBarX && inBarY) {
    color = mix(color, ACCENT, 0.92);
  }

  return color;
}

function render(size, maskable = false) {
  const rgba = Buffer.alloc(size * size * 4);
  const samples = SS * SS;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;

      for (let sy = 0; sy < SS; sy += 1) {
        for (let sx = 0; sx < SS; sx += 1) {
          const px = (x + (sx + 0.5) / SS) / size;
          const py = (y + (sy + 0.5) / SS) / size;
          const color = sample(px, py, maskable);
          if (color) {
            r += color[0];
            g += color[1];
            b += color[2];
            a += 255;
          }
        }
      }

      const index = (y * size + x) * 4;
      const alpha = a / samples;
      // Les composantes ne sont ponderees que par la couverture, afin de
      // conserver des bords propres quand la couleur change brutalement.
      const covered = alpha > 0 ? a / 255 : 0;
      rgba[index] = covered > 0 ? Math.round(r / covered) : 0;
      rgba[index + 1] = covered > 0 ? Math.round(g / covered) : 0;
      rgba[index + 2] = covered > 0 ? Math.round(b / covered) : 0;
      rgba[index + 3] = Math.round(alpha);
    }
  }

  return encodePng(rgba, size, size);
}

// -------------------------------------------------------------- Ecriture ---

mkdirSync(OUT_DIR, { recursive: true });

const targets = [
  { file: "icon-16.png", size: 16 },
  { file: "icon-32.png", size: 32 },
  { file: "icon-48.png", size: 48 },
  { file: "icon-96.png", size: 96 },
  { file: "icon-128.png", size: 128 },
  { file: "apple-touch-icon.png", size: 180 },
  { file: "icon-192.png", size: 192 },
  { file: "icon-256.png", size: 256 },
  { file: "icon-384.png", size: 384 },
  { file: "icon-512.png", size: 512 },
  { file: "icon-maskable-512.png", size: 512, maskable: true },
];

const cache = new Map();
for (const target of targets) {
  const key = `${target.size}:${Boolean(target.maskable)}`;
  if (!cache.has(key)) cache.set(key, render(target.size, Boolean(target.maskable)));
  const png = cache.get(key);
  writeFileSync(path.join(OUT_DIR, target.file), png);
  console.log(`  ${target.file.padEnd(26)} ${target.size}x${target.size}  ${png.length} o`);
}

const favicon = encodeIco([
  { size: 16, png: cache.get("16:false") },
  { size: 32, png: cache.get("32:false") },
  { size: 48, png: cache.get("48:false") },
]);
writeFileSync(path.join(process.cwd(), "public", "favicon.ico"), favicon);
console.log(`  favicon.ico               16/32/48       ${favicon.length} o`);

console.log("\nIcones generees dans public/icons.");
