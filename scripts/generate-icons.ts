/**
 * Genere les icones de la plateforme a partir du logo source.
 *
 *   npm run icons
 *
 * Source   : logo.png (racine du depot)
 * Sorties  : public/brand/logo.png, public/icons/*.png, public/favicon.ico
 *
 * Pourquoi un script plutot que des fichiers a la main : le logo affiche dans
 * l'interface, la favicon, les icones d'installation PWA et l'icone maskable
 * doivent tous deriv�� du meme fichier source, sinon ils divergent des la
 * premiere modification du logo.
 *
 * Deux traitements sont appliques a la source :
 *
 * 1. RECADRAGE. Le fichier source est un carre de 1254 px dans lequel le
 *    dessin n'occupe qu'une petite zone, le reste etant transparent. Sans
 *    recadrage, le logo rendu dans un carre de 36 px n'afficherait qu'une
 *    marque minuscule au centre. On supprime donc les marges avant tout
 *    redimensionnement.
 *
 * 2. ICONE MASKABLE. Android applique une forme decorative (cercle, carre
 *    arrondi, goutte) sur toute la surface de l'icone et rogne les bords : un
 *    fond transparent fait disparaitre le logo aux angles. Cette seule icone
 *    recoit donc un fond opaque, avec le logo centre dans la zone sure.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/** Les scripts npm tournent depuis la racine du depot. */
const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "logo.png");
const BRAND_DIR = path.join(ROOT, "public", "brand");
const ICONS_DIR = path.join(ROOT, "public", "icons");

/** Transparent : sert de reference au recadrage des marges. */
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/**
 * Fond des icones opaques : le `--background` clair de globals.css.
 * Le logo est bleu marine fonce, il n'est lisible que sur une surface claire.
 */
const LIGHT_SURFACE = "#f8fafc";

/** Logo reduit dans la zone sure d'une icone maskable (60% du canevas). */
const MASKABLE_LOGO_RATIO = 0.6;

/** Logo livre a l'interface, en pleine largeur. */
const BRAND_WIDTH = 512;

const SIZES = [16, 32, 48, 96, 128, 192, 256, 384, 512] as const;

/** Tailles embarquees dans le favicon.ico multi-resolution. */
const ICO_SIZES = [16, 32, 48] as const;

async function main(): Promise<void> {
  await mkdir(BRAND_DIR, { recursive: true });
  await mkdir(ICONS_DIR, { recursive: true });

  const source = await sharp(SOURCE).metadata();
  console.log(
    `Source : logo.png ${source.width}x${source.height}, ` +
      `couverture ${(await opaqueRatio(SOURCE)).toFixed(0)}%`,
  );

  // Une seule decroissance de la source, reutilisee par toutes les sorties.
  const logo = await sharp(SOURCE)
    .trim({ background: TRANSPARENT, threshold: 8 })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const info = await sharp(logo).metadata();
  console.log(`  recadre : ${info.width}x${info.height} (ratio ${(info.width / info.height).toFixed(2)})`);

  // Logo pour l'interface : marges supprimees, largeur fixe.
  await sharp(logo)
    .resize({ width: BRAND_WIDTH, withoutEnlargement: false })
    .png({ compressionLevel: 9 })
    .toFile(path.join(BRAND_DIR, "logo.png"));
  console.log(`  public/brand/logo.png (${BRAND_WIDTH} px de large)`);

  for (const size of SIZES) {
    await sharp(logo)
      .resize(size, size, { fit: "contain", background: TRANSPARENT })
      .png({ compressionLevel: 9 })
      .toFile(path.join(ICONS_DIR, `icon-${size}.png`));
  }
  console.log(`  ${SIZES.length} icones PNG`);

  // Apple : fond opaque, iOS ne tolere pas la transparence sur cet ecran.
  await sharp(logo)
    .resize(180, 180, { fit: "contain", background: LIGHT_SURFACE })
    .flatten({ background: LIGHT_SURFACE })
    .png({ compressionLevel: 9 })
    .toFile(path.join(ICONS_DIR, "apple-touch-icon.png"));
  console.log("  apple-touch-icon.png (180, fond opaque)");

  const inner = Math.round(512 * MASKABLE_LOGO_RATIO);
  const centered = await sharp(logo).resize(inner, inner, { fit: "contain" }).png().toBuffer();
  await sharp({
    create: { width: 512, height: 512, channels: 4, background: LIGHT_SURFACE },
  })
    .composite([{ input: centered, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(ICONS_DIR, "icon-maskable-512.png"));
  console.log("  icon-maskable-512.png (512, fond opaque, zone sure)");

  await writeIco(logo, ICO_SIZES);
  console.log(`  favicon.ico (${ICO_SIZES.join(", ")})`);
}

/** Part des pixels réellement visibles, pour juger si le recadrage est utile. */
async function opaqueRatio(file: string): Promise<number> {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let opaque = 0;
  for (let i = 3; i < data.length; i += info.channels) {
    if (data[i]! > 127) opaque += 1;
  }
  return (100 * opaque) / (info.width * info.height);
}

/**
 * Construit un favicon.ico multi-resolution.
 *
 * Un ICO accepte des images PNG embarquees telles quelles (Windows Vista et
 * plus) : on ecrit l'en-tete ICONDIR, une entree ICONDIRENTRY par taille, puis
 * les donnees PNG a la suite.
 */
async function writeIco(logo: Buffer, sizes: readonly number[]): Promise<void> {
  const images = await Promise.all(
    sizes.map(async (size) => ({
      size,
      data: await sharp(logo)
        .resize(size, size, { fit: "contain", background: TRANSPARENT })
        .png({ compressionLevel: 9 })
        .toBuffer(),
    })),
  );

  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const directorySize = HEADER_SIZE + ENTRY_SIZE * images.length;

  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0); // reserve
  header.writeUInt16LE(1, 2); // type 1 = icone
  header.writeUInt16LE(images.length, 4);

  let offset = directorySize;
  const entries = images.map((image) => {
    const entry = Buffer.alloc(ENTRY_SIZE);
    // 0 est la convention pour 256 px ; on reste ici en dessous.
    entry.writeUInt8(image.size, 0); // largeur
    entry.writeUInt8(image.size, 1); // hauteur
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserve
    entry.writeUInt16LE(1, 4); // plans couleur
    entry.writeUInt16LE(32, 6); // bits par pixel
    entry.writeUInt32LE(image.data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += image.data.length;
    return entry;
  });

  await writeFile(
    path.join(ROOT, "public", "favicon.ico"),
    Buffer.concat([header, ...entries, ...images.map((image) => image.data)]),
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
