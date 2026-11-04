# Wedding visual assets

The current couple portrait is the family's supplied photograph, optimized to
WebP without generative edits. The original is preserved as
`public/images/couple-original.jpg`. The older generated sample is retained as an
unused asset. Decorative lamp and leaf assets were generated with the built-in
image generation tool, then compressed to WebP while preserving transparency.

| Asset | Saved file | Intended use |
| --- | --- | --- |
| Brass lamp | `public/images/brass-kuthuvilakku.webp` | Realistic kuthuvilakku at the doors and invitation; flames are animated separately in CSS. |
| Couple photo | `public/images/couple.webp` | Supplied photograph of Suresh and Vaanmathi; the original photo is preserved separately. |
| Previous sample | `public/images/couple-sample.webp` | Unused previous sample; no longer displayed in the invitation. |
| Mango leaf | `public/images/mango-leaf.webp` | Individually animated realistic mango leaf repeated along a draped cord. |

## Mango leaf reference and prompt

The web search reference was [TOPpng's photographic leaf garland](https://toppng.com/free-image/flower-thoranam-s-PNG-free-PNG-Images_98975), uploaded by Djghassan Love in 2019 and listed for personal use. Its public preview is saved as `public/images/mango-leaf-thoranam-source.png`. The full download requires a CAPTCHA. The built-in image generation tool used the visible preview as a reference to create the clean isolated leaf. The shipped leaf is AI-created, not an unaltered source photograph.

Final prompt: Use case: background-extraction / botanical website asset. The reference shows photographic real green mango leaves in a traditional South Indian maavilai thoranam. Create a single clean isolated fresh MANGO LEAF cutout matching the exact realistic leaf textures from this reference, one leaf ONLY, with a very short thin stem at the top and pointed leaf tip hanging straight down. Narrow long natural lanceolate leaf with a slight asymmetric curve, prominent cream-green central midrib, many subtle real branching veins, gently rippled edges, rich deep fresh green glossy natural surface, believable warm daylight highlights, botanical photographic realism. Portrait composition, whole leaf fully visible, stem at top center, tip at bottom center. Leaf fills 80 percent of height, narrow width appropriate to long mango leaves. Completely transparent background, no checkerboard, no white rectangle, no words, no other objects or flowers, no garland string, no multiple leaves. Purpose: this individual cutout will be hung repeatedly along a rope and independently animated in a wedding invitation.

## Final lamp prompt

Use case: product-mockup. Create one photorealistic traditional Tamil South Indian polished brass kuthuvilakku oil lamp as a website cutout asset. Entire tall lamp visible, straight on at very slightly elevated angle. Accurate elegant turned brass stem with rounded ornamental sections, wide tiered circular pedestal, shallow open oil bowl at roughly 32 percent from the top, small central engraved annam bird finial extending above the bowl. Three visible cotton wicks on the front left, center and right lip of the bowl, UNLIT with no fire, no glow, no smoke; website will animate flames separately. Rich authentic worn golden brass, beautiful fine engraving, realistic metallic highlights, warm soft studio light, isolated object, generous transparent margins, portrait composition. No text, people, additional objects, floor, background, or shadows outside the object. Transparent background.

## Final sample portrait prompt

Use case: photorealistic-natural. Create a tasteful sample wedding portrait of a fictional adult Tamil South Indian bride and groom standing together in a warmly lit heritage wedding courtyard. Waist-up portrait, both faces clear and smiling naturally toward the camera, groom on left in cream silk veshti and shirt with subtle gold detailing, bride on right in deep maroon and antique gold Kanchipuram silk saree, traditional tasteful temple jewelry, jasmine flowers in her hair. Simple white jasmine and red rose wedding garlands. Rich warm soft light, natural skin texture, elegant editorial wedding photography, softly out of focus greenery and brass temple details. Portrait image 3:4 composition with headroom, no text, no watermark. This is a sample fictional couple, not meant to represent real people.

To compress replacement source assets with the same settings:

```sh
bun scripts/prepare-visual-assets.mjs path/to/lamp.png path/to/portrait.png
```
