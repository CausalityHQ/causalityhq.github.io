/**
 * Accessibility gate — runs axe-core 4.x (the same engine Lighthouse uses)
 * against every page and fails ONLY on real WCAG 2.2 A/AA *violations*.
 *
 * axe "incomplete" results (e.g. bgOverlap behind a decorative overlay, text
 * inside a role="img" SVG, non-BMP glyphs) are "needs manual review" — not
 * failures — so they are reported for the record but do not fail the build.
 * This matches how Lighthouse scores accessibility.
 *
 * Usage: node scripts/a11y.mjs <url> [url...]
 */
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('usage: node scripts/a11y.mjs <url> [url...]');
  process.exit(2);
}

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
let totalViolations = 0;

for (const url of urls) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  // Emulate reduced motion: scroll-/motion-gated reveals collapse to their full
  // resolved state, so axe tests the complete, visible content (not a transient
  // mid-animation frame). This is the canonical accessible rendering.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Scroll the whole page so every reveal/draw reaches its final state.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise((r) => setTimeout(r, 80));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));

  await page.addScriptTag({ path: axePath });
  const results = await page.evaluate(async (tags) => {
    // eslint-disable-next-line no-undef
    return await axe.run(document, { runOnly: { type: 'tag', values: tags } });
  }, WCAG_TAGS);

  const { violations, incomplete } = results;
  totalViolations += violations.length;

  console.log(`\n▏ ${url}`);
  console.log(`  violations: ${violations.length}   incomplete (review): ${incomplete.length}`);
  for (const v of violations) {
    console.log(`  ✘ [${v.impact}] ${v.id} — ${v.help}`);
    v.nodes.slice(0, 5).forEach((n) => console.log(`      ${n.target.join(' ')}`));
  }
  if (incomplete.length) {
    const byId = {};
    incomplete.forEach((i) => (byId[i.id] = (byId[i.id] || 0) + i.nodes.length));
    console.log(
      `  ⓘ review-only: ${Object.entries(byId)
        .map(([k, n]) => `${k}×${n}`)
        .join(', ')}`,
    );
  }
  await page.close();
}

await browser.close();

console.log(
  `\n${totalViolations === 0 ? '✓ PASS' : '✘ FAIL'} — ${totalViolations} WCAG 2.2 A/AA violation(s) across ${urls.length} page(s)`,
);
process.exit(totalViolations === 0 ? 0 : 1);
