import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Usage: bun scripts/prepare-mango-leaf.mjs <generated-leaf.png>");
await sharp(source)
  .extract({ left: 280, top: 10, width: 430, height: 1500 })
  .resize({ height: 480 })
  .webp({ quality: 88, alphaQuality: 100 })
  .toFile("public/images/mango-leaf.webp");
console.log("Saved public/images/mango-leaf.webp");
