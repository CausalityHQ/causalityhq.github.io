/**
 * Extract every user-visible string into a single editable JSON for Polish
 * review: `{ "<dot.path>": { en, pl } }`, in content order. Edit the `pl`
 * values, hand the file back, and it can be written straight into pl.ts by path.
 *
 * Usage: node scripts/pl-review.mjs   → writes ../../polish-review.json
 */
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const { en } = await import(resolve(here, '../src/i18n/en.ts'));
const { pl } = await import(resolve(here, '../src/i18n/pl.ts'));

// Keys that are locale-invariant tokens (codes/IDs) — skip so the reviewer only
// sees real prose to improve. Matched against the LAST path segment or full path.
const SKIP_PATHS = new Set(['lang']);

const get = (obj, path) => path.reduce((o, k) => (o == null ? o : o[k]), obj);

const out = {};
const walk = (node, path) => {
  if (typeof node === 'string') {
    const key = path.join('.');
    if (SKIP_PATHS.has(key)) return;
    const plVal = get(pl, path) ?? '';
    // Skip locale-invariant tokens (brand names, IDs, emails, codes) — they are
    // byte-identical across locales, so there is nothing to improve.
    if (plVal === node) return;
    out[key] = { en: node, pl: plVal };
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, [...path, String(i)]));
    return;
  }
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) walk(node[k], [...path, k]);
  }
};
walk(en, []);

const dest = resolve(here, '../../../polish-review.json');
writeFileSync(dest, JSON.stringify(out, null, 2) + '\n', 'utf8');
console.log(`wrote ${Object.keys(out).length} strings → ${dest}`);
