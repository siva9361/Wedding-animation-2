import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const [lampSource, portraitSource] = process.argv.slice(2);
if (!lampSource || !portraitSource) throw new Error("Usage: bun scripts/prepare-visual-assets.mjs <lamp.png> <portrait.png>");
await mkdir("public/images", { recursive: true });
const assets = [
  { source: lampSource, target: "public/images/brass-kuthuvilakku.webp", width: 640 },
  { source: portraitSource, target: "public/images/couple-sample.webp", width: 900 },
];
for (const asset of assets) {
  await sharp(asset.source).resize({ width: asset.width, withoutEnlargement: true }).webp({ quality: 85, alphaQuality: 95 }).toFile(asset.target);
  const metadata = await sharp(asset.target).metadata();
  console.log(JSON.stringify({ path: asset.target, width: metadata.width, height: metadata.height, hasAlpha: metadata.hasAlpha }));
}
