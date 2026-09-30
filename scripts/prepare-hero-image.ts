/**
 * Prepare la photo de fond du hero.
 *
 *   npm run assets:hero
 *
 * Source : paris4k.jpg (racine du depot)
 * Sortie : public/images/hero-paris.jpg
 *
 * Pourquoi une etape de traitement
 *
 * Le fichier source pese 13 Ko pour 352x220 px. A l'ecran, en fond pleine
 * largeur sur un ecran 1440 px ou 2560 px, il est agrandi d'un facteur 5 a 7 :
 * le navigateur ne peut que l'etaler, et le resultat se voit immediatement sous
 * forme de blocs colores.
 *
 * Deux traitements sont appliques une seule fois, ici :
 *
 * 1. AGRANDISSEMENT AU FILTRE LANCZOS, qui lisse lesaretes. Plus fin que le
 *    bicubique du navigateur, il evite les marches d'escalier sur les
 *    contours.
 *
 * 2. FLOU LEGER ET PRECALCUL. Un flou de 1,2 px est fondu dans l'image : les
 *    artefacts d'agrandissement disparaissent au lieu d'etre reproduits a
 *    chaque affichage.
 *
 * Ce flou n'est PAS fait en CSS. Un `filter: blur()` combine a une animation
 * `transform` force le navigateur a recalculer le flou a chaque image, sur une
 * couche de la taille de l'ecran : c'est exactement le que l'on veut eviter
 * dans une animation qui doit rester fluide. En cuisinant le flou dans le
 * fichier, l'animation ne manipule que des transformations, que le GPU prend
 * en charge.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/** Les scripts npm tournent depuis la racine du depot. */
const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "paris4k.jpg");
const OUTPUT_DIR = path.join(ROOT, "public", "images");
const OUTPUT = path.join(OUTPUT_DIR, "hero-paris.jpg");

/** Largeur cible : couvre les ecrans larges sans fichier lourd inutile. */
const TARGET_WIDTH = 1920;

/** Sigma du flou, en pixels de la source apres agrandissement. */
const BLUR_SIGMA = 1.2;

/** Saturation legerement renforcee pour tenir face a la vignette appliquee. */
const SATURATION = 1.06;

const QUALITY = 82;

async function main(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const source = await sharp(SOURCE).metadata();
  console.log(`Source : ${source.width}x${source.height}`);

  if (source.width >= TARGET_WIDTH) {
    console.log(
      `  deja en ${TARGET_WIDTH} px ou plus : aucun agrandissement necessaire, ` +
        "seul le flou est applique",
    );
  }

  const { size } = await sharp(SOURCE)
    .resize({ width: TARGET_WIDTH, withoutEnlargement: false, kernel: "lanczos3" })
    .blur(BLUR_SIGMA)
    .modulate({ saturation: SATURATION })
    .jpeg({ quality: QUALITY, mozjpeg: true, progressive: true })
    .toFile(OUTPUT);

  console.log(`  public/images/hero-paris.jpg (${TARGET_WIDTH} px, ${Math.round(size / 1024)} Ko)`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
