// Draws the 16-bit style character portrait used in the infobox (public/me.png)
// and the browser-tab icon (app/icon.png).
// The pixel grid and colors live in lib/sprite.js. Edit them there, then run:
//   npm run sprite
import sharp from "sharp";
import path from "node:path";
import { PALETTE, SPRITE } from "../lib/sprite.js";


const SCALE = 16; // each sprite pixel becomes 16x16 real pixels
const out = process.argv[2] || path.join(process.cwd(), "public", "me.png");

const w = 32, h = SPRITE.length;
const raw = Buffer.alloc(w * h * 3);
SPRITE.forEach((row, y) => {
  if (row.length !== w) throw new Error(`Row ${y} is ${row.length} wide, expected ${w}: "${row}"`);
  [...row].forEach((ch, x) => {
    const hex = PALETTE[ch];
    if (!hex) throw new Error(`Unknown color "${ch}" at row ${y}, col ${x}`);
    const n = parseInt(hex.slice(1), 16);
    raw.set([n >> 16, (n >> 8) & 255, n & 255], (y * w + x) * 3);
  });
});

await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
  .resize(w * SCALE, h * SCALE, { kernel: "nearest" })
  .png({ palette: true })
  .toFile(out);

console.log(`Saved ${out} (${w}x${h} sprite at ${SCALE}x)`);

// Favicon: a square crop of the head (rows 0-29, cols 1-30), saved where Next.js
// picks it up automatically for the browser tab and search results.
if (!process.argv[2]) {
  const icon = path.join(process.cwd(), "app", "icon.png");
  await sharp(raw, { raw: { width: w, height: h, channels: 3 } })
    .extract({ left: 1, top: 0, width: 30, height: 30 })
    .resize(480, 480, { kernel: "nearest" })
    .png({ palette: true })
    .toFile(icon);
  console.log(`Saved ${icon} (favicon)`);
}
