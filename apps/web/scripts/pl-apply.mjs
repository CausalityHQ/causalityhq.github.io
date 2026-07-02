/**
 * Apply an edited polish-review.json back into pl.ts. Imports the current `pl`
 * dictionary, overlays each edited `pl` value by dot-path, and re-serialises the
 * whole object in en.ts style (single quotes, unquoted identifier keys). Run
 * Prettier + astro check afterwards to normalise/verify.
 *
 * Usage: node scripts/pl-apply.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const reviewPath = resolve(here, '../../../polish-review.json');
const plPath = resolve(here, '../src/i18n/pl.ts');

const edited = JSON.parse(readFileSync(reviewPath, 'utf8'));
const { pl } = await import(plPath);

const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
const setPath = (obj, path, val) => {
  const ks = path.split('.');
  let o = obj;
  for (let i = 0; i < ks.length - 1; i++) o = o?.[ks[i]];
  if (o == null) return false;
  o[ks[ks.length - 1]] = val;
  return true;
};

let changed = 0;
let missing = [];
for (const [path, entry] of Object.entries(edited)) {
  if (!entry || typeof entry.pl !== 'string') continue;
  const cur = getPath(pl, path);
  if (cur === undefined) {
    missing.push(path);
    continue;
  }
  if (cur !== entry.pl) changed++;
  setPath(pl, path, entry.pl);
}

const quote = (s) =>
  "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
const identKey = (k) => (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : quote(k));
const ser = (v, ind) => {
  const pad = '  '.repeat(ind);
  const pad1 = '  '.repeat(ind + 1);
  if (typeof v === 'string') return quote(v);
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) {
    if (v.length === 0) return '[]';
    return '[\n' + v.map((x) => pad1 + ser(x, ind + 1)).join(',\n') + ',\n' + pad + ']';
  }
  const keys = Object.keys(v);
  return (
    '{\n' +
    keys.map((k) => pad1 + identKey(k) + ': ' + ser(v[k], ind + 1)).join(',\n') +
    ',\n' +
    pad +
    '}'
  );
};

const src =
  `import type { Content } from './types';\n\n` +
  `// Polish dictionary. Values maintained via scripts/pl-review.mjs + pl-apply.mjs.\n` +
  `export const pl: Content = ${ser(pl, 0)};\n`;
writeFileSync(plPath, src, 'utf8');

console.log(`applied ${changed} changed value(s) into pl.ts`);
if (missing.length) console.log(`skipped ${missing.length} unknown path(s):`, missing.slice(0, 10));
