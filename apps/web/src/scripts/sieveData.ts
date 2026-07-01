/**
 * SIEVE demo data + layout (INTERACTIVE.md §B.2/§B.3). Shared by the static
 * Astro render (SieveDemo.astro) and the client state machine (sieveDemo.ts) so
 * coordinates never drift. Curated + deterministic — no model, no network.
 *
 * Labels are supplied per-locale from i18n; here we keep only the structure:
 * ids, topic clusters, 2D coordinates and the curated nearest-neighbour scores.
 */
export interface Doc {
  id: string;
  topic: 'infra' | 'search' | 'privacy' | 'multimodal';
  x: number; // 0..100 semantic-space coord
  y: number;
}
export interface Preset {
  id: string;
  labelIndex: number; // index into i18n presets[]
  qx: number;
  qy: number;
  neighbours: { doc: number; score: number }[]; // doc = index into CORPUS
}

// D1..D12 (index 0..11), four clean topic clusters.
export const CORPUS: Doc[] = [
  { id: 'D1', topic: 'infra', x: 22, y: 26 },
  { id: 'D2', topic: 'infra', x: 30, y: 20 },
  { id: 'D3', topic: 'infra', x: 18, y: 34 },
  { id: 'D4', topic: 'search', x: 52, y: 44 },
  { id: 'D5', topic: 'search', x: 60, y: 38 },
  { id: 'D6', topic: 'search', x: 48, y: 52 },
  { id: 'D7', topic: 'privacy', x: 26, y: 72 },
  { id: 'D8', topic: 'privacy', x: 34, y: 78 },
  { id: 'D9', topic: 'privacy', x: 20, y: 66 },
  { id: 'D10', topic: 'multimodal', x: 78, y: 30 },
  { id: 'D11', topic: 'multimodal', x: 84, y: 44 },
  { id: 'D12', topic: 'multimodal', x: 72, y: 52 },
];

// P1 (index 0) query phrase equals CORPUS[0] label; ties broken by lower id.
export const PRESETS: Preset[] = [
  {
    id: 'P1',
    labelIndex: 0,
    qx: 24,
    qy: 28,
    neighbours: [
      { doc: 0, score: 0.96 },
      { doc: 2, score: 0.91 },
      { doc: 1, score: 0.88 },
    ],
  },
  {
    id: 'P2',
    labelIndex: 1,
    qx: 50,
    qy: 46,
    neighbours: [
      { doc: 3, score: 0.94 },
      { doc: 4, score: 0.9 },
      { doc: 5, score: 0.86 },
    ],
  },
  {
    id: 'P3',
    labelIndex: 2,
    qx: 28,
    qy: 70,
    neighbours: [
      { doc: 6, score: 0.93 },
      { doc: 8, score: 0.89 },
      { doc: 7, score: 0.87 },
    ],
  },
  {
    id: 'P4',
    labelIndex: 3,
    qx: 80,
    qy: 40,
    neighbours: [
      { doc: 9, score: 0.92 },
      { doc: 10, score: 0.9 },
      { doc: 11, score: 0.85 },
    ],
  },
];

// --- Layout (viewBox 0 0 520 400: the 2D semantic space fills the stage) ---
export const VBW = 520;
export const VBH = 400;
const SX = 44;
const SY = 48;
const SW = 432;
const SH = 312;
/** Map a 0..100 semantic coord to the SVG space. */
export function toSvg(x: number, y: number): [number, number] {
  return [SX + (x / 100) * SW, SY + (y / 100) * SH];
}
/** Query origin (top-centre) before it drops into the space. */
export const QUERY_ORIGIN: [number, number] = [260, 14];

/** Cosine score, dot form for SVG chips / column alignment. */
export function scoreDot(s: number): string {
  return s.toFixed(2);
}
/** Cosine score for prose — Polish uses a decimal comma. */
export function scoreProse(s: number, locale: string): string {
  return locale === 'pl' ? s.toFixed(2).replace('.', ',') : s.toFixed(2);
}
