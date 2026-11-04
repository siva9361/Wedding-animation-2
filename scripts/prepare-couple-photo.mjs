import sharp from "sharp";

await sharp("public/images/couple-original.jpg").rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 90 }).toFile("public/images/couple.webp");
await sharp("output/references/printed-invitation.png").rotate(270).resize({ width: 1800 }).png().toFile("output/references/printed-invitation-readable.png");
console.log("Prepared the supplied couple photo and readable invitation reference.");
