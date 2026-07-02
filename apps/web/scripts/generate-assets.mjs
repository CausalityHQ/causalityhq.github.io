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
import { mkdir, writeFile } from 'node:fs/promises';
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

/**
 * Recolour the flat official lockup (lime on transparent) to a solid `hex`,
 * preserving its exact alpha shape. Used to produce the ink (light bg) and
 * white (forest bg) on-page logos from the real brand asset.
 */
async function recolorLogo(hex, outPath) {
  const img = sharp(logoPath).ensureAlpha();
  const meta = await img.metadata();
  const { width, height } = meta;
  const alpha = await img.clone().extractChannel('alpha').raw().toBuffer();
  await sharp({ create: { width, height, channels: 3, background: hex } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toFile(outPath);
}

/**
 * Crop the brain-gear mark out of the lockup (it sits at x≈5..162, before the
 * divider), trim it tight, and recolour to `hex`. Returns the coloured PNG
 * buffer + its dimensions. Used for the hero icon and the favicons.
 */
async function markBuffer(hex) {
  const cropped = await sharp(logoPath)
    .extract({ left: 0, top: 0, width: 205, height: 215 })
    .png()
    .toBuffer();
  const buf = await sharp(cropped).trim({ threshold: 10 }).toBuffer();
  const { width, height } = await sharp(buf).metadata();
  const alpha = await sharp(buf).ensureAlpha().extractChannel('alpha').raw().toBuffer();
  const png = await sharp({ create: { width, height, channels: 3, background: hex } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  return { png, width, height };
}

async function markIcon(hex, outPath) {
  const { png } = await markBuffer(hex);
  await writeFile(outPath, png);
}

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

  // --- On-page logos: real lockup recoloured ink (light) + white (forest) ---
  const brand = resolve(root, 'src/assets/brand');
  await recolorLogo(INK, resolve(brand, 'causality-wordmark-black.png'));
  await recolorLogo('#FFFFFF', resolve(brand, 'causality-wordmark-white.png'));
  await markIcon(INK, resolve(brand, 'causality-mark-ink.png'));
  await markIcon(LIME, resolve(brand, 'causality-mark-lime.png'));

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

  // --- App icons: the REAL brain-gear mark (recoloured white) on an ink tile ---
  const markWhite = await markBuffer('#FFFFFF');
  const tile = (size) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="${INK}"/></svg>`,
    );

  for (const [name, size] of [
    ['apple-touch-icon.png', 180],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
    ['favicon-32.png', 32],
  ]) {
    // Fill most of the tile so the fine brain-gear line-art stays legible at
    // favicon sizes; apple-touch keeps a touch more safe-area padding.
    const ratio = name === 'apple-touch-icon.png' ? 0.66 : 0.82;
    const markW = Math.round(size * ratio);
    const markH = Math.round((markW * markWhite.height) / markWhite.width);
    const mark = await sharp(markWhite.png).resize(markW, markH).png().toBuffer();
    await sharp(tile(size))
      .composite([
        { input: mark, left: Math.round((size - markW) / 2), top: Math.round((size - markH) / 2) },
      ])
      .png()
      .toFile(resolve(pub, name));
  }

  // --- favicon.svg: ink tile + the real mark embedded (crisp tile, raster mark) ---
  const favMark = await sharp(markWhite.png).resize({ width: 320 }).png().toBuffer();
  const fmw = 40;
  const fmh = Math.round((fmw * markWhite.height) / markWhite.width);
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="10" fill="${INK}"/>
  <image x="${(48 - fmw) / 2}" y="${(48 - fmh) / 2}" width="${fmw}" height="${fmh}" href="data:image/png;base64,${favMark.toString('base64')}"/>
</svg>
`;
  await writeFile(resolve(pub, 'favicon.svg'), faviconSvg);

  console.log('✓ generated OG image + favicon + app icons in public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
