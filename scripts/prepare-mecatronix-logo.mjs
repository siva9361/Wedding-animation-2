import sharp from "sharp";

const source = process.argv[2] ?? "public/images/mecatronix-emblem-source.png";
await sharp(source)
  .trim()
  .resize({ height: 120 })
  .webp({ quality: 90, alphaQuality: 100 })
  .toFile("public/images/mecatronix-emblem.webp");
console.log("Saved public/images/mecatronix-emblem.webp");
