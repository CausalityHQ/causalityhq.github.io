/**
 * One-time generator for raster brand assets that can't be inline SVG:
 *   - public/og/causality-og.png   (1200×630 social card — datasheet still)
 *   - public/apple-touch-icon.png  (180×180)
 *   - public/icon-192.png / icon-512.png (PWA / manifest)
 *   - public/favicon-32.png        (legacy raster fallback)
 *
 * Outputs are committed static assets — CI does not regenerate them. Run with:
 *   pnpm --filter @causality/web run assets
 *
 * No custom-font text is rasterized (avoids system-font drift); the OG card
 * composites the official lime lockup PNG onto a vector datasheet background.
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pub = resolve(root, 'public');
const logoPath = resolve(root, 'src/assets/brand/causality-wordmark.png');

const BG = '#FAFAF7';
const GRID = '#ECEEE6';
const TICK = '#D6DACF';
const LIME = '#95D600';
const INK = '#0B0F0A';

/** L-shaped registration tick at (x,y), `len` long, pointing into `dir`. */
function tick(x, y, len, dx, dy) {
  return `<path d="M${x + dx * len} ${y} L${x} ${y} L${x} ${y + dy * len}" stroke="${TICK}" stroke-width="1.5" fill="none" />`;
}

function ogBackground(w, h) {
  const lines = [];
  const step = 40;
  for (let x = step; x < w; x += step)
    lines.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${GRID}" stroke-width="1"/>`);
  for (let y = step; y < h; y += step)
    lines.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${GRID}" stroke-width="1"/>`);
  const inset = 40;
  const ticks = [
    tick(inset, inset, 22, 1, 1),
    tick(w - inset, inset, 22, -1, 1),
    tick(inset, h - inset, 22, 1, -1),
    tick(w - inset, h - inset, 22, -1, -1),
  ].join('');
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
       <rect width="${w}" height="${h}" fill="${BG}"/>
       <g opacity="0.6">${lines.join('')}</g>
       ${ticks}
       <rect x="${inset}" y="${inset}" width="${w - inset * 2}" height="${h - inset * 2}" fill="none" stroke="${TICK}" stroke-width="1"/>
       <line x1="${w / 2 - 70}" y1="${h - 150}" x2="${w / 2 + 70}" y2="${h - 150}" stroke="${LIME}" stroke-width="4"/>
     </svg>`,
  );
}

async function main() {
  await mkdir(resolve(pub, 'og'), { recursive: true });

  // --- OG card: background + centered official lockup ---
  const W = 1200;
  const H = 630;
  const logo = await sharp(logoPath).resize({ width: 660, withoutEnlargement: false }).toBuffer();
  const logoMeta = await sharp(logo).metadata();
  await sharp(ogBackground(W, H))
    .composite([
      {
        input: logo,
        left: Math.round((W - (logoMeta.width ?? 660)) / 2),
        top: Math.round((H - (logoMeta.height ?? 165)) / 2) - 20,
      },
    ])
    .png()
    .toFile(resolve(pub, 'og/causality-og.png'));

  // --- App icons (mark on ink tile) ---
  const tileSvg = (size) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">
         <rect width="48" height="48" rx="10" fill="${INK}"/>
         <g fill="none" stroke="${LIME}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            transform="translate(24 24) scale(0.82) translate(-24 -24)">
           <path d="M37 24 41 24 M33.19 33.19 36.02 36.02 M24 37 24 41 M14.81 33.19 11.98 36.02 M11 24 7 24 M14.81 14.81 11.98 11.98 M24 11 24 7 M33.19 14.81 36.02 11.98"/>
           <circle cx="24" cy="24" r="13"/>
           <path d="M24 12 C 21 16 27 20 24 24 C 21 28 27 32 24 35"/>
           <path d="M19 16 C 15.5 19 16.5 24 20 26"/>
           <path d="M29 16 C 32.5 19 31.5 24 28 26"/>
         </g>
         <circle cx="24" cy="24" r="1.9" fill="#ffffff"/>
       </svg>`,
    );

  for (const [name, size] of [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
    ['favicon-32.png', 32],
  ]) {
    await sharp(tileSvg(size)).resize(size, size).png().toFile(resolve(pub, name));
  }

  console.log('✓ generated OG image + app icons in public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
