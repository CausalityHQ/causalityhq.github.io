# INTERACTIVE.md — Causality landing-page interactive pieces

**Status:** implementation-ready master spec.
**Scope:** three lazy-loaded, WCAG-2.2-AA, Lighthouse-100-safe interactive pieces for `apps/web`:
**A** hero moving-graph, **B** SIEVE semantic-search demo, **C** STRUCTURA extraction→graph→agent demo.
**Non-negotiable:** Lighthouse must stay **100/100/100/100** on both EN and PL (`lighthouserc.json` asserts every category `minScore 1` as a hard `error`, `preset: desktop`, `numberOfRuns: 3`); `node scripts/a11y.mjs` must stay at **0 WCAG violations**.

This document has folded in every adversarial-critique fix. Where a critique found a factual error about the codebase, the correction is stated inline as **[VERIFIED]**.

---

## 0. Shared implementation notes (read first)

### 0.1 Verified codebase facts (do not re-derive)

- **`enhance.ts` does NOT dynamic-import anything today.** Its single `IntersectionObserver` (lines 31–43) adds `is-visible`/`is-drawn` then calls `obs.unobserve(el)` on the **first** intersection — it is a one-shot reveal trigger and is **structurally incapable of detecting an element leaving the viewport.** Any "pause the loop when off-screen" logic must live in its own observer inside the demo module. **Do not claim reuse of the existing observer for pausing.**
- The reveal/draw CSS (`global.css` lines 279–309) is gated behind **both** `.js` **and** `@media (prefers-reduced-motion: no-preference)`. Default (no-JS / reduced-motion) state is the **final** state. Reuse `.draw-path` (stroke-dashoffset, 700ms `cubic-bezier(0.4,0,0.2,1)`, `--draw-delay`, `pathLength="1"`) and `.draw-fade` (opacity 400ms, `--fade-delay`) verbatim for all SVG draw-in.
- The **only** looping animation on the page is `.status-dot--pulse` (2s `status-pulse`, `global.css` 254–267), disabled under reduced motion. **design.md §8.7: "One looping motion, and only one."** No demo may add a second permanent loop.
- Focus ring: `--color-focus: #16281c`, `outline: 2px solid var(--color-focus)` + `2px` offset (`global.css` ~160). Lime is used for focus **only** on `.on-forest`. All three demos are on light surfaces → focus stays ink.
- **There is NO `.sr-only` / `.visually-hidden` / `clip-path` utility in the codebase.** It must be added (see §0.4) before any `aria-live` region can be relied upon.
- `scripts/a11y.mjs` runs puppeteer at **1280×900, fine pointer, NO `prefers-reduced-motion`**, scrolls the full page top→bottom (`y += 500`, 80ms dwell) so every reveal fires, then runs axe with tags `wcag2a/2aa/21a/21aa/22aa/best-practice`. **Consequence:** the a11y gate exercises the **live, JS-mounted** demo DOM, not the static fallback. Every ARIA attribute below is under live axe scrutiny. Spec and self-test the mounted state as rigorously as the static one.
- `HeroMotif.astro` constants (reuse exactly): `K=6.2, OX=61.2, OY=41.2`; `nodes[18]` (2D pairs), `edges[11]`, `A=[210,116] B=[210,190] C=[291,190] D=[150,252]`, `limeEdges=[[D,B,0],[A,B,1],[B,C,2]]`, viewBox `0 0 420 380`.
- `PerimeterDiagram.astro` viewBox `0 0 460 340`; `PipelineDiagram.astro` viewBox `0 0 640 200` and ships a `role="img"` SVG + an ordered `<ol>` of **4** stages + `<figcaption>`.

### 0.2 Lazy-load contract (all three demos)

Add **one** small block to `enhance.ts` (it is already loaded on every page via `<script>import '../scripts/enhance.ts'</script>` in `BaseLayout`, so this adds bytes to an already-present module, not a new script tag — but it introduces the project's **first `import()` code-split point**, which must be re-baselined in CI):

```ts
// --- Lazy interactive demos (dynamic import on scroll-near) ----------------
// Separate observer: threshold 0, does NOT unobserve, so it can also PAUSE.
// Gated on reduced-motion? NO — the demos are operable (step/replay) and must
// remain usable by reduced-motion users; the modules themselves honor
// matchMedia('(prefers-reduced-motion: reduce)') at render time (snap, no tween).
if ('IntersectionObserver' in window) {
  const demos: Array<[string, () => Promise<{ mount(el: HTMLElement): void }>]> = [
    ['[data-demo="hero"]', () => import('./heroField')],
    ['[data-demo="sieve"]', () => import('./sieveDemo')],
    ['[data-demo="structura"]', () => import('./structuraDemo')],
  ];
  for (const [sel, load] of demos) {
    const el = document.querySelector<HTMLElement>(sel);
    if (!el) continue;
    let mounted = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !mounted) {
            mounted = true;
            load()
              .then((m) => m.mount(el))
              .catch(() => {}); // fail → static SVG stays
          }
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(el);
  }
}
```

- **HERO is the exception on reduced-motion:** it is ambient/decorative, so `heroField.mount()` first-lines `if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;` — the canvas never initializes, the static SVG is the whole experience. (Cheaper to check inside `mount` than to branch the loader.)
- Vite code-splits each `import()` into its own hashed chunk fetched **only** on scroll-near. During Lighthouse's non-scrolling trace, SIEVE (§05) and STRUCTURA (§06) are below the fold → never intersect → never fetched → TBT/bootup/unused-JS stay at the verified `0`. HERO is above the fold, so its chunk **will** load in the trace — see §0.3 for why that is still safe.

### 0.3 Keeping Lighthouse 100 (the five hard rules)

1. **Zero critical JS.** Every demo is a separate `import()` chunk. Confirm after build that no `<link rel="modulepreload">` is emitted for these chunks (they must NOT enter the critical path). Verify: `pnpm --filter web build` then inspect `dist/**/*.html` for modulepreload of `heroField/sieveDemo/structuraDemo`.
2. **No heavy deps.** Zero npm additions. Vanilla TS only. No three.js / transformers.js / WASM / model download / network at runtime. The "embeddings" are curated 2D coordinates + a tiny hash function computed with `Math.sin`/bit-ops — genuinely client-side, nothing fetched.
3. **CLS = 0.** Every animated node pre-exists in server-rendered DOM at its final geometry and is only transformed/faded/`stroke-dashoffset`-ed. Toolbars, captions, live regions, and result lists **ship in static Astro markup** (never JS-injected). Reserve worst-case (usually Polish) caption/lane heights per breakpoint.
4. **TBT/INP protection.** No idle `requestAnimationFrame`. SIEVE/STRUCTURA are CSS-transition + single `setTimeout` chains (cancellable). HERO's rAF loop is `cancelAnimationFrame`-ed on its **own** IntersectionObserver exit and on `visibilitychange` (`document.hidden`). No per-frame allocation. Animate `transform`/`opacity`/`stroke-dashoffset` only.
5. **LCP untouched.** LCP is the preloaded `<h1>` (Space Grotesk). No demo adds a raster image, web font, or third-party request. HERO canvas is `aria-hidden` and `position:absolute` over an already-painted SVG — see §A for the LCP proof requirement.

**HERO-specific perf note (above the fold):** the hero chunk loads during the trace. It is `~2.8 KB` gz, does zero network I/O, and its first paint is a hard-swap on the first rAF frame (no crossfade — see §A choreography). The static SVG remains the LCP candidate. **You must prove, not assert, this:** build `apps/web/dist`, run Lighthouse `preset: desktop` locally, confirm `performance == 1` and LCP element is the H1 across all 3 runs **before merge**. This is the single biggest hero risk.

### 0.4 Shared prerequisites to add once

Add a visually-hidden utility to `global.css` (nothing equivalent exists today — SIEVE and STRUCTURA `aria-live` regions depend on it; **never use `display:none`**, which suppresses SR announcement):

```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
```

No shared "canvas helper" is needed: only HERO uses canvas; SIEVE and STRUCTURA are SVG+DOM and reuse the existing `.draw-path`/`.draw-fade` CSS. Each demo ships as one `~3–4 KB` gz vanilla-TS module with **zero** shared runtime.

### 0.5 i18n & CI

- Every new user-facing string is a key in `i18n/types.ts` **first** (the build asserts EN/PL structural parity), then `en.ts` + `pl.ts`. Full copy tables are in each piece below.
- **Locale-invariant tokens** (never translated): `SIEVE`, `STRUCTURA`, `PO-4471`, `INV-2231`, `SH-889`, `pay.acme-erp.internal`, coordinate digits/brackets `⟨0.83, -0.12⟩`, cosine numerals. Polish prose uses decimal commas (`0,96`), but mono coordinate/cosine **display** values stay dot-form for column alignment (stated per string).
- **Re-baseline CI** after adding the first `import()` in `enhance.ts`: run `pnpm --filter web build`, `lhci autorun`, and `node scripts/a11y.mjs http://localhost:PORT/ http://localhost:PORT/pl/`. Add a **second a11y pass** under reduced motion so the static-fallback DOM is also gated (see §0.6).

### 0.6 Testing checklist (run before merge)

1. `pnpm --filter web build` — confirm three separate demo chunks, no modulepreload of them.
2. Local Lighthouse (`preset desktop`) on `/` and `/pl/`: all four categories `== 1`, LCP element is `#hero-h1`, CLS `== 0`, across 3 runs.
3. `node scripts/a11y.mjs` on both locales (default emulation → tests **live** demos): 0 violations.
4. **Add & run** a second axe pass with `page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])` before scrolling, so the static path is CI-tested too. Extend `a11y.mjs` with an env flag `A11Y_REDUCE=1` and call it twice in CI.
5. Manual: keyboard-only walkthrough of each demo; VoiceOver/NVDA spot-check of live regions; `prefers-reduced-motion` toggled ON mid-session (demos must snap, not tween); 360px width (CLS + target sizes); DPR 2 retina (hero fill cost).
6. bfcache/back-forward: no thrown console errors on unmount (best-practices penalizes console errors) — wrap timers/observers in idempotent teardown.

---

## A. Hero moving-graph — "The field, quietly observed"

### A.1 Final concept

An animated, pixel-faithful upgrade of `HeroMotif.astro` that lives in the **existing right `lg:col-span-5` figure slot — beside the H1 (`col-span-7`), above the spec card. It is NOT behind the headline** (**[VERIFIED]** the shipped layout places the motif in its own right column; the earlier "behind the hero text" framing describes a layout that does not exist — do not relocate it).

**What it does, after folding in the critique:**

- On scroll-near (and only if motion is allowed), a `~2.8 KB` Canvas 2D module hard-swaps in on the first rAF frame and plays the **one-shot draw-in** (the same lime "line of reasoning" the shipped SVG already animates), then goes **STILL**.
- The **only** ongoing motion is the **explicitly-sanctioned ≤6px desktop-fine-pointer parallax probe** (design.md §8 permits exactly this). It moves the nearest ~6 ambient nodes toward the pointer **while the pointer is over the figure**, and settles them back to rest when it leaves. When the pointer is absent, the instrument is at rest.
- **DROPPED (critique fixes):** the "forever ambient drift" loop and the "B-node breathe" — both violated §8.7 "one looping motion, and only one," both burned off-screen CPU, and a perpetually shimmering field reads as a toy. A precision instrument at rest is **still**.
- **DROPPED (critique fix):** the 4 transparent focusable `<button>` coordinate hit-targets and the `role="status" aria-live="off"` span. The coordinates are **decorative garnish, not data** (the concept admitted they "convey no information"), and 44px targets on nodes B[210,190]/C[291,190] would overlap at realistic rendered widths (SC 2.5.8). Ship the motif as a **single `aria-hidden`-canvas + `role="img"` figure** with the shipped `<title>`/`<desc>` as the text alternative. Zero new tab stops before the CTA.
- Under reduced-motion / no-JS / no-canvas / coarse pointer / import failure, the **exact current `HeroMotif.astro` SVG** is the whole experience — it already IS the resolved end state (all lime nodes, edges, and the `⟨0.83, -0.12⟩` tag). CLS-safe, honest, on-brand.

**Big idea in one line:** the datasheet motif comes to life at instrument-idle tempo — it draws once, then waits to be probed — never a marketing loop.

### A.2 Choreography timeline

All coordinates are in the shipped 420×380 space (reuse `K/OX/OY`, `nodes`, `edges`, `A/B/C/D`, `limeEdges`). "Focal" = the single lime beat.

| Beat             | Trigger                                                            | What animates                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Duration / easing                      | Lime focal                                                               |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------ |
| **0 — Reserved** | server render (0ms)                                                | Static `HeroMotif.astro` SVG paints in the reserved `aspect-ratio: 420/380` box. LCP-safe, CLS-0. If JS never runs / reduced-motion → this is everything.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | none                                   | lime present from frame 1 (static)                                       |
| **1 — Handoff**  | first rAF after `mount()`                                          | Canvas (`aria-hidden`) is `position:absolute inset-0` over the SVG at identical box metrics. On the **first successful rAF frame** the figure gets `.canvas-active`, which sets the SVG's canvas-owned layers (`ambient web`, `ambient nodes`, `lime edges`) to `opacity:0` and reveals the canvas. **Hard swap, no crossfade.** The faint brand-mark `<g>` and the coordinate `<text>` stay as real DOM (crisp). **[VERIFIED fix]** the parent `<figure>` carries `data-reveal` (12px translateY) — so the swap must happen **after `.is-visible` settles OR without any crossfade**; a hard swap on the first frame at rest avoids any "jump" during the reveal slide. If the 2D context is unavailable, `mount()` returns and the SVG stays. | instant                                | none                                                                     |
| **2 — Draw-in**  | once, right after handoff                                          | Canvas re-plays the shipped lime edges via a drawn-fraction `t: 0→1` (canvas equivalent of `stroke-dashoffset`), staggered exactly like `HeroMotif`'s `--draw-delay` math: D→B delay 180ms, A→B 440ms, B→C 700ms; each edge 700ms `cubic-bezier(0.4,0,0.2,1)`. When B→C completes, its endpoint lime node scales `0.85→1.0`, 260ms `ease-out-quart` (`cubic-bezier(0.165,0.84,0.44,1)`).                                                                                                                                                                                                                                                                                                                                                        | ~180–1160ms once                       | **the final edge B→C + its endpoint node** (one accent beat, fires once) |
| **3 — At rest**  | after draw-in                                                      | Nothing animates. The field is drawn and still. rAF continues **only** to service pointer probes (§Beat 4); with no pointer over the figure the loop still runs but does zero visual work — **so it is paused** (see A.6): if `!probeActive` for >250ms and no pending settle, `cancelAnimationFrame` and re-arm on `pointerenter`.                                                                                                                                                                                                                                                                                                                                                                                                             | —                                      | none                                                                     |
| **4 — Probe**    | `pointermove` over figure, `(hover:hover) and (pointer:fine)` only | The nearest ~6 ambient nodes lerp toward the pointer by ≤6px (`pos += (target - pos) * 0.08` per frame → natural ease-out). On `pointerleave`, targets return to base; nodes settle over ~400ms then the loop parks. **Disabled entirely on coarse/touch pointers and reduced-motion.** Never enough amplitude to touch the frozen lime structure.                                                                                                                                                                                                                                                                                                                                                                                              | continuous while pointer present, ≤6px | none (aesthetic only)                                                    |

Total scripted motion: one 1.16s draw-in, then silence until probed. No permanent loop.

### A.3 Technical approach

- **Renderer: Canvas 2D** (`heroField.ts`, `apps/web/src/scripts/heroField.ts`). Rationale: 18 ambient dots + 11 flexing hairlines + 3 lime edges redrawn on probe frames is Canvas's strength; mutating 30+ SVG attributes per frame would thrash style/layout. Text and the brand-mark stay as real DOM (SVG) for crispness and a11y.
- **DOM ownership:** the `<figure>` keeps the full shipped SVG. New: a sibling `<canvas aria-hidden="true" class="hero-canvas">` absolutely positioned over it. The canvas owns: ambient web, ambient dots, lime edges, lime nodes (drawn identically to the SVG values so the hard swap registers pixel-exactly). The SVG's faint brand mark and the `⟨0.83,-0.12⟩` coordinate group stay visible DOM at all times.
- **Data structures** (reuse from `HeroMotif`, no RNG at runtime):
  - `nodes: Float32Array` length 36 (18 × [x,y]) — base positions, copied from the shipped `nodes` array.
  - `disp: Float32Array` length 36 — current probe displacement per node (starts 0).
  - `edges: Uint8Array` of index pairs into `nodes` (convert the shipped literal `edges` to index pairs once so the web flexes when a node is displaced).
  - `LIME = { A, B, C, D }` consts; `LIME_EDGES = [[D,B,0],[A,B,1],[B,C,2]]`.
  - DPR-aware: backing store = `cssW*dpr, cssH*dpr`, `dpr = Math.min(devicePixelRatio, 2)`; `ctx.scale(dpr,dpr)`; all draw math in CSS px in the 420×380 space (scale factor = cssW/420).
- **Per-frame (probe only):** no allocations. Hoist all constants. One `beginPath()` for all hairlines, one for all ambient dots, one for lime edges. Compute displaced positions into `disp` in place. Guard: if `!ctx` return (fall back to SVG).
- **KB budget:** `~2.8 KB` min+gz, zero deps.
- **Lazy-load:** via the §0.2 loader (`[data-demo="hero"]` on the `<figure>`). `mount()` first-lines the reduced-motion short-circuit and the `matchMedia('(hover:hover) and (pointer:fine)')` check (if coarse/touch, still do the one-shot draw-in but skip the probe listeners).
- **CLS = 0:** `<figure>` reserves `aspect-ratio: 420/380`; canvas is `position:absolute; inset:0` in that reserved box; SVG never leaves flow; the swap is opacity-only on canvas-owned layers. Nothing reflows.
- **60fps:** transform/draw only; DPR capped at 2; single rAF that parks itself when idle; pause on own IO exit + `visibilitychange`.

### A.4 Interaction & ARIA

- **No controls.** This is an ambient decorative motif; adding chrome breaks the datasheet register. Interaction is limited to the passive pointer probe.
- **No focusable elements added.** (Critique fix — dropped the 4 no-op buttons.)
- **ARIA:**
  - `<canvas aria-hidden="true">` — decorative.
  - The parent `<figure role="img" aria-labelledby="hero-motif-title hero-motif-desc">` — unchanged from today; `<title>`/`<desc>` are the text alternative.
  - The one visible coordinate `<text>⟨0.83, -0.12⟩</text>` stays exactly as shipped.
- **Contrast/colour:** lime is graphic fill/stroke only; the coordinate tag is `--color-meta #5F6659` (5.95:1) on `--color-surface`. No lime text on light. Colour never sole signal (coordinate value is text).

### A.5 Reduced-motion / no-JS static fallback

The **exact current `HeroMotif.astro` SVG**, unchanged: viewBox `0 0 420 380`; faint brain+gear mark at `translate(61.2 41.2) scale(6.2)` `#E3E6DE` 0.5px; 11 hairline edges `#E3E6DE` among 18 ambient nodes `#C9CEC1 r=2.4`; 3 lime edges `#95D600` 2px fully drawn; 4 lime nodes (A/C/D `r=3.4`, B `r=4.6` + `r=8.5` ring); coordinate leader + `<text>⟨0.83, -0.12⟩` in `#5F6659`. Under reduced-motion / no-JS / coarse pointer / no-canvas / import failure this is shown with no animation. A complete, meaningful figure — never a blank canvas.

### A.6 Perf guardrails (hero-specific)

- rAF is created only during draw-in and during active probing; parked (`cancelAnimationFrame`) otherwise.
- **Dedicated** `IntersectionObserver({ threshold: 0 })` (NOT the shipped one-shot observer) parks the loop when the hero leaves the viewport, plus a `visibilitychange` handler for `document.hidden`. **[VERIFIED fix]** — this is the actual off-screen-CPU protection; the shipped observer cannot do it.
- Zero per-frame allocation; DPR ≤ 2; hard swap (no crossfade paint the LCP analyzer could catch).
- **Prove LCP:** local Lighthouse run confirms `#hero-h1` is LCP and `performance == 1` before merge.

### A.7 Aesthetic fit

Datasheet tokens only: ambient dots `#C9CEC1`, hairlines/faint mark `#E3E6DE`, lime `#95D600` graphic-only, coordinate tag `#5F6659` mono. One accent beat (the B→C draw completion). Lime static from frame 1 (design.md §8.2 — no colour reveal). The ≤6px probe is the one §8-sanctioned interaction. No gradient/glow/shadow/bounce; easing is `ease-out-quart`/`expo` and the design's `cubic-bezier(0.2,0.6,0.2,1)`. Reads as a semantic space quietly observed through a spec sheet.

### A.8 Copy (unchanged from shipped — reuse existing `hero.motifTitle`/`hero.motifDesc` keys)

**EN**

- `hero.motifTitle` = `Causality — a semantic vector field forming a brain-and-gear silhouette`
- `hero.motifDesc` = `Scattered vector nodes on a faint grid; a few lime nodes are joined by lime edges that resolve into the Causality brain-and-gear mark.`
- visible coordinate tag (in-SVG, locale-invariant) = `⟨0.83, -0.12⟩`

**PL**

- `hero.motifTitle` = `Causality — semantyczne pole wektorowe układające się w sylwetkę mózgu i koła zębatego`
- `hero.motifDesc` = `Rozproszone węzły wektorowe na delikatnej siatce; kilka limonkowych węzłów łączą limonkowe krawędzie, które układają się w znak marki Causality — mózg z kołem zębatym.`
- visible coordinate tag = `⟨0.83, -0.12⟩` (locale-invariant)

_(No node-aria strings — the buttons were dropped.)_

---

## B. SIEVE demo — "Semantic search, running locally"

### B.1 Final concept

A replayable "bench test" of SIEVE, placed **full-width below the existing two-column block in §05** (`ProductSieve.astro`), with a hairline separator and its own mono sub-tag. The `PerimeterDiagram` is **proof-of-place** (where it runs: inside your perimeter); this demo is **proof-of-function** (what it does: nearest-neighbour retrieval). Distinct sub-panels, one datasheet voice.

**Core flow:** pick one of **4 preset queries** (or type a phrase) → tokens stamp in → a query point drops into a **2D semantic space** of **12 topic-clustered labelled documents** → the **k=3 nearest neighbours** light lime with cosine scores → a **ranked results list** resolves. Persistent mono badge `RUNNING LOCALLY · NO DATA LEAVES YOUR BROWSER` (with a lime status dot + the word). Everything deterministic and curated.

**Critique fixes folded in:**

- **DROPPED the animated "0 KB SENT" ticking meter.** A counter whose job is to animate to zero is theatre, not measurement. Keep the badge text + a **static** `0 REQUESTS` spec annotation. Zero is more convincing stated once than counted up to (cf. `PerimeterDiagram` just stating `NO DATA EGRESS`).
- **CUT the 16-bar EMBED lane** to a single compact `EMBED · dim 16` tick/annotation. The bar chart was the highest gimmick-per-pixel element, most strongly implied a real production embedding (truthfulness risk), didn't resolve toward the brand mark, and crowded §05. The 2D space is the money shot and shares the mark's node/edge grammar.
- **PRESETS-ONLY for v1.** The free-text hash path (FNV-1a→mulberry32) produced semantically-wrong rankings for paraphrases — the exact falsifying test a skeptical buyer runs, which exposes that the presets are curated. Ship the 4 curated, always-correct presets. _(Optional later enhancement: a lexically-real token-overlap embedding — see B.9. Not v1.)_
- **REFRAME as mechanism, not product output.** Copy says "how nearest-neighbour retrieval works," never "SIEVE embedding your query with the proprietary model." The `(demo)` qualifier stays on any dimension annotation. Designer-facing "proprietary vector space made concrete" language does **not** appear in user-facing copy.
- **radiogroup semantics fixed** (see B.6): container is `role="radiogroup"`, not `role="group"`.
- **SVG `<desc>` is generic** (never states a specific result) because the SVG mutates per query; all result specifics live in the `aria-live` region + the `<ol>` + the `<figcaption>`.
- **`aria-live` region ships EMPTY**; the resolved narrative lives only in the visible `<figcaption>`.
- **Byte-budget honesty:** this is 0 KB of **critical JS**, but the full resolved-state fallback SVG adds `~4–6 KB` of HTML to every visitor on both locales (counted in total weight, parsed at load). Cheap and gzips well; won't drop perf below 100; but state it accurately in the PR.

Renderer: **inline SVG + `~3.5 KB` gz vanilla JS**. No canvas. Reuses the existing `.draw-path`/`.draw-fade` CSS, free hi-DPI, real `<text>`, trivial a11y.

### B.2 Sample corpus — exact 2D coordinates & topics

A **100×100** field (SVG maps it into the space lane's viewport). 12 documents, 4 clean topic clusters. `k=3` fixed. Ties broken by lower `id`.

```
INFRA / DEPLOY (top-left)
  D1  on-prem vector database        (22, 26)
  D2  kubernetes cluster config      (30, 20)
  D3  air-gapped deployment          (18, 34)

SEARCH / RETRIEVAL (mid)
  D4  nearest-neighbour retrieval    (52, 44)
  D5  semantic ranking               (60, 38)
  D6  embedding index build          (48, 52)

DATA-PRIVACY (bottom-left)
  D7  GDPR data residency            (26, 72)
  D8  PII redaction                  (34, 78)
  D9  access-control policy          (20, 66)

MULTIMODAL (right)
  D10 image embedding                (78, 30)
  D11 audio transcript search        (84, 44)
  D12 PDF table extraction           (72, 52)
```

### B.3 Preset queries → query point + curated neighbours

Scores are **curated cosine** values (authored for polish; consistent with cluster proximity). Non-neighbour docs stay `--border` ink.

```
P1  on-prem vector database    q(24,28)  →  D1 0.96 (NEAREST), D3 0.91, D2 0.88   [default / fallback]
P2  find documents by meaning  q(50,46)  →  D4 0.94,           D5 0.90, D6 0.86
P3  keep customer data private q(28,70)  →  D7 0.93,           D9 0.89, D8 0.87
P4  search images and audio    q(80,40)  →  D10 0.92,          D11 0.90, D12 0.85
```

Selecting a preset **arms** but does **not** auto-run (avoids surprise motion). Pressing **Run** plays the choreography for the armed preset.

### B.4 Choreography timeline

viewBox suggestion for the space lane: `0 0 720 460` (desktop); `<768px` stacks to a square `0 0 460 460` (class swap done **before** animation, never during).

| Beat                     | Window                  | What animates                                                                                                                                                                                                                                                                                                                                                                              | Easing                                       |
| ------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **0 — Idle/armed**       | static, server-rendered | Plate: `SIEVE · SEMANTIC SEARCH` title, badge `RUNNING LOCALLY · NO DATA LEAVES YOUR BROWSER` + lime dot, static `0 REQUESTS`, 4 preset chips (P1 `aria-checked=true`), all 12 doc points in `--border`/`--muted` ink with mono labels, grid behind, dim query point at origin. `[Run]` primary, `[Reset]` ghost. This IS the reduced-motion frame minus the resolved answer.              | none                                         |
| **1 — Query commit**     | 0→220ms                 | Chosen phrase's token cells stamp L→R, each `opacity 0→1 scale 0.85→1`, stagger 28ms (≤6 tokens ≈170ms tail). Thin ink caret underlines the token row.                                                                                                                                                                                                                                     | `ease-out-quart cubic-bezier(0.22,1,0.36,1)` |
| **2 — Embed tick**       | 200→420ms               | The single `EMBED · dim 16 (demo)` annotation resolves with a 3px lime baseline tick fading in (`opacity 0→1`, 200ms) — the one lime accent of this beat, signalling "vector computed here, locally." _(No 16-bar chart.)_                                                                                                                                                                 | `ease-out`                                   |
| **3 — Query drop**       | 420→700ms               | Lime query point animates `translateY` from the embed annotation down into the 2D space, settling at its curated coord with `scale 1.0→1.06→1.0` (no bounce). Faint concentric search-radius ring fades in (`opacity 0→0.5`, 240ms) then out.                                                                                                                                              | `ease-out-quart`, 280ms                      |
| **4 — Neighbours light** | 700→1300ms              | Thin lime leader lines draw from query point to the 3 NN via `stroke-dashoffset` (each 300ms, `cubic-bezier(0.4,0,0.2,1)`), staggered 120ms nearest-first. As each completes: target doc point `--border → lime` fill + 9px lime halo ring fades in + mono cosine chip (`0.96`, in `--ink`) fades in beside it.                                                                            | staggered cascade                            |
| **5 — Ranked list**      | 1300→1700ms             | Beneath the stage, the pre-reserved 3-row `<ol>` reveals (existing section-reveal grammar: 8px translateY + opacity, 320ms `cubic-bezier(0.2,0.6,0.2,1)`, stagger 60ms). Each row: mono rank, doc label, hairline mini score-bar (width = score, **redundant** with the text), right-aligned cosine (tabular figures). Row 1 has a 3px lime left-rule **doubled with the word `NEAREST`**. | section-reveal                               |
| **6 — Settle**           | 1700ms+                 | Search-radius ring gone; leaders/halos hold. `[Run]` relabels to `[Replay]`. No looping animation at rest. Selecting a different chip cross-fades neighbours/list out (150ms) back to Beat 0 for the new query.                                                                                                                                                                            | —                                            |

**Reduced-motion / no-JS:** collapse to **Beat 6 end state for P1**, painted instantly with zero transitions (tokens present, lime query point at (24,28), D1/D3/D2 lime with chips 0.96/0.91/0.88, leaders solid, `<ol>` resolved with the #1 lime rule). CLS = 0 because viewBox + list container heights are identical in both paths.

### B.5 Technical approach

- **Files:** `apps/web/src/components/sections/ProductSieve.astro` (add the demo sub-panel below the existing grid), `apps/web/src/components/SieveDemo.astro` (server-rendered resolved-P1 SVG + controls + empty live region + `<ol>` + `<figcaption>`), `apps/web/src/scripts/sieveDemo.ts` (`~3.5 KB` gz state machine).
- **Renderer:** inline SVG + DOM. **No canvas** (~30–45 discrete labelled marks, not hundreds of particles). Reuses `.draw-path`/`.draw-fade`.
- **Data** (`~1 KB` inline const, curated, no fetch): `CORPUS: {id,label,x,y,topic}[]` (B.2), `PRESETS: {id,phrase,tokens[],qx,qy,neighbours:[{id,score}]}[]` (B.3). Bars/free-text machinery removed for v1.
- **State machine:** `STEPS = 0..6`; `render(step)` toggles `data-state` attributes; CSS does the motion. A single cancellable `setTimeout` chain drives auto-choreography on Run. No rAF.
- **Lazy-load:** §0.2 loader on `[data-demo="sieve"]`. Below the fold → never fetched in the Lighthouse trace.
- **CLS = 0:** demo container has explicit `min-height`; SVG has fixed viewBox + `h-auto w-full`; the `<ol>` reserves exactly 3 rows in the DOM from first paint (opacity-revealed, not inserted); bar widths (mini score-bars) use `transform: scaleX` from a fixed origin, not `width`; the `<768px` square-viewBox reflow is a class swap with its **own** reserved height per breakpoint.
- **60fps / INP:** ≤~10 concurrent transitions, all `opacity`/`transform`/`stroke-dashoffset`; setTimeout chain cancellable on Reset/Replay/chip-change; motion lands in INP (post-interaction) not TBT — smoke-test on mid-range mobile.

### B.6 Interaction & ARIA

- **Preset chips:** `<div role="radiogroup" aria-label="Sample query">` containing 4 `<button role="radio" aria-checked>` with **roving tabindex** (arrow keys move within group, only the checked one is `tabindex=0`), Enter/Space selects. Selecting arms + updates the live region (`Query set: <phrase>`); does **not** auto-run. Selected chip: 3px lime bottom-rule **+ `aria-checked`** (colour never sole signal). **[VERIFIED fix]** parent is `role="radiogroup"` (not `role="group"`), or axe `aria-required-parent` fails and breaks accessibility == 1.
- **[Run] / [Replay]:** `<button>` primary (lime fill, `--ink-on-lime` label). `aria-label="Run semantic search on the selected query"`; after a run, name/text → `Replay`.
- **[Reset]:** ghost `<button>`, `aria-label="Reset the demo"`; returns to Beat 0 for the current preset, clears the timeout chain.
- **Keyboard:** Tab order = radiogroup → Run → Reset. Arrow keys only within the radiogroup. Result rows are non-interactive `<li>` (not focusable). `focus-visible` = global 2px `--focus` + 2px offset.
- **Hover (fine-pointer only):** hovering a doc point shows a mono tooltip with **just the doc label** (**[VERIFIED fix]** — drop the `⟨x,y⟩` coord; the 0–100 map position is not the "dim 16" vector and implies a dimensional contradiction). Tooltip is supplementary; SVG score chips are non-focusable `<text>` in `--ink`/`--meta`, never lime text, never lime-on-lime.
- **`aria-live` region:** `<p class="visually-hidden" aria-live="polite" aria-atomic="true">` ships **empty** in static markup; JS sets `textContent` per beat (debounced to one announcement per transition): `set → searching → result`. The final result string uses `aria-atomic="true"` so it reads as one unit.
- **Stage SVG:** `role="img" aria-labelledby="sieve-demo-title sieve-demo-desc"`; `<desc>` is **generic** ("a 2D semantic space of twelve topic-clustered documents"), never a specific result. Individual points are NOT separate AT stops. Whole demo is a `<figure>` with a `<figcaption>` (the result prose). Badge is real `<p>` text (the "no data leaves your browser" claim is readable text, not baked into the drawing).

### B.7 Reduced-motion / no-JS fallback

Server-renders the **resolved P1 end state** (B.4 Beat 6) instantly, zero transitions: plate + title + badge (lime dot + word) + static `0 REQUESTS`; the P1 tokens stamped; `EMBED · dim 16 (demo)` annotation + lime baseline tick; 12 doc points with labels; lime query point at (24,28); D1/D3/D2 lime-filled with chips 0.96/0.91/0.88 and solid leaders; the `<ol>` fully resolved — row 1 `on-prem vector database · 0.96` with the 3px lime left-rule + `NEAREST`. `[Run]`/`[Reset]` render (inert without JS). `<figcaption>` states the same result in prose. Box dimensions byte-identical to the animated path → CLS = 0. **Also gate this path in CI** via the reduced-motion axe pass (§0.6).

### B.8 Aesthetic fit

`--surface-sunk` hairline plate (matching `PerimeterDiagram`'s frame) + `CornerTicks`; faint `--grid-line` blueprint behind the 2D space; Plex Mono for every label/score; the `⟨x,y⟩` annotation form **not** used for doc tooltips (dropped); one lime accent per beat escalating to the single lime #1 rule (lime is a sniper). Single-weight strokes, rounded joins, `--border`/`--muted` ambient, lime reserved for query/neighbour/answer. Radius 4px plate / 2px chips. No gradient/glow/shadow/bounce; `ease-out-quart`/`expo` settles. `--surface-lime-wash` optional tint on the #1 row.

### B.9 Optional later enhancement (NOT v1)

If free-text is later added: give it a **lexically-real** embedding — token-overlap (bag of shared lowercased word-stems) between the typed phrase and the 12 doc labels, ranked by overlap then cluster proximity — so synonyms of doc words actually rank near them and a paraphrase does not return nonsense. Clamp to length ≥ 3. Ship behind the same `hidden`-until-JS input. This preserves honesty; the pure hash path does not.

### B.10 Copy — EN

```
sieve.demo.plateTitle      = SIEVE · SEMANTIC SEARCH
sieve.demo.badge           = RUNNING LOCALLY · NO DATA LEAVES YOUR BROWSER
sieve.demo.meter           = 0 REQUESTS
sieve.demo.presetsLabel    = SAMPLE QUERY
sieve.demo.p1              = on-prem vector database
sieve.demo.p2              = find documents by meaning
sieve.demo.p3              = keep customer data private
sieve.demo.p4              = search images and audio
sieve.demo.laneQuery       = QUERY
sieve.demo.laneEmbed       = EMBED · dim 16 (demo)
sieve.demo.laneSpace       = SEMANTIC SPACE · nearest neighbour
sieve.demo.btnRun          = Run search
sieve.demo.btnRunAria      = Run semantic search on the selected query
sieve.demo.btnReplay       = Replay
sieve.demo.btnReset        = Reset
sieve.demo.btnResetAria    = Reset the demo
sieve.demo.resultsTitle    = RANKED RESULTS
sieve.demo.colRank         = RANK
sieve.demo.colDoc          = DOCUMENT
sieve.demo.colScore        = COSINE
sieve.demo.nearest         = NEAREST
sieve.demo.liveSet         = Query set: {phrase}
sieve.demo.liveSearching   = Searching locally
sieve.demo.liveResult      = Top match: {phrase}, cosine {score}. {k} nearest neighbours found. No data was sent.
sieve.demo.tooltip         = {label}
sieve.demo.figureTitle     = SIEVE semantic search — a query resolves to its nearest neighbours, locally
sieve.demo.figureDesc      = A 2D semantic space of twelve topic-clustered documents. A sample query is dropped in and its three nearest neighbours are highlighted with cosine similarity scores. All computation runs in the browser.
sieve.demo.figcaption      = How it works: SIEVE turns your query into a vector and finds the nearest documents by meaning. Here, ‘on-prem vector database’ matches ‘on-prem vector database’ (cosine 0.96), ‘air-gapped deployment’ (0.91) and ‘kubernetes cluster config’ (0.88). Everything runs locally — no data leaves your browser.
```

### B.11 Copy — PL

```
sieve.demo.plateTitle      = SIEVE · WYSZUKIWANIE SEMANTYCZNE
sieve.demo.badge           = DZIAŁA LOKALNIE · ŻADNE DANE NIE OPUSZCZAJĄ PRZEGLĄDARKI
sieve.demo.meter           = 0 ŻĄDAŃ
sieve.demo.presetsLabel    = PRZYKŁADOWE ZAPYTANIE
sieve.demo.p1              = baza wektorowa on-prem
sieve.demo.p2              = znajdź dokumenty według znaczenia
sieve.demo.p3              = zachowaj prywatność danych klientów
sieve.demo.p4              = przeszukaj obrazy i dźwięk
sieve.demo.laneQuery       = ZAPYTANIE
sieve.demo.laneEmbed       = OSADZENIE · wymiar 16 (demo)
sieve.demo.laneSpace       = PRZESTRZEŃ SEMANTYCZNA · najbliższy sąsiad
sieve.demo.btnRun          = Uruchom wyszukiwanie
sieve.demo.btnRunAria      = Uruchom wyszukiwanie semantyczne dla wybranego zapytania
sieve.demo.btnReplay       = Odtwórz ponownie
sieve.demo.btnReset        = Zresetuj
sieve.demo.btnResetAria    = Zresetuj demo
sieve.demo.resultsTitle    = WYNIKI W RANKINGU
sieve.demo.colRank         = POZ.
sieve.demo.colDoc          = DOKUMENT
sieve.demo.colScore        = KOSINUS
sieve.demo.nearest         = NAJBLIŻSZY
sieve.demo.liveSet         = Ustawiono zapytanie: {phrase}
sieve.demo.liveSearching   = Wyszukiwanie lokalnie
sieve.demo.liveResult      = Najlepsze dopasowanie: {phrase}, kosinus {score}. Znaleziono {k} najbliższych sąsiadów. Żadne dane nie zostały wysłane.
sieve.demo.tooltip         = {label}
sieve.demo.figureTitle     = Wyszukiwanie semantyczne SIEVE — zapytanie odnajduje najbliższych sąsiadów, lokalnie
sieve.demo.figureDesc      = Dwuwymiarowa przestrzeń semantyczna dwunastu dokumentów pogrupowanych tematycznie. Umieszczane jest w niej przykładowe zapytanie, a trzej najbliżsi sąsiedzi zostają wyróżnieni wynikami podobieństwa kosinusowego. Całość obliczana jest w przeglądarce.
sieve.demo.figcaption      = Jak to działa: SIEVE zamienia Twoje zapytanie w wektor i znajduje najbliższe dokumenty według znaczenia. Tutaj ‘baza wektorowa on-prem’ pasuje do ‘baza wektorowa on-prem’ (kosinus 0,96), ‘wdrożenie air-gapped’ (0,91) oraz ‘konfiguracja klastra kubernetes’ (0,88). Wszystko działa lokalnie — żadne dane nie opuszczają przeglądarki.
```

> **i18n note:** doc-point labels (D1–D12) are the same source strings as the preset phrases where they overlap; translate the _display_ labels (they carry meaning) but keep cosine display values dot-form (`0.96`) for column alignment. Polish prose in `figcaption`/`liveResult` uses decimal commas.

---

## C. STRUCTURA demo — "unstructured → knowledge → the agent acts"

### C.1 Final concept

A replayable, step-through "operating console" in §06 (`ProductStructura.astro`) that dramatizes STRUCTURA's thesis: messy multimodal inputs → a queryable knowledge graph → an agent reads it, writes a new fact, then **acts in a browser-chrome mockup** using what it learned. ONE fixed-height plate, **three always-visible ruled lanes** (never a context-hiding slideshow): **[1] INPUTS** (left) · **[2] KNOWLEDGE GRAPH** (center, the star) · **[3] AGENT ACTION** (right, a 1px browser wireframe). A **5-step** choreography lights each lane; the graph is the persistent spine.

**Critique fixes folded in (these are load-bearing corrections):**

- **[VERIFIED] `enhance.ts` has no dynamic import.** The lazy-load is a **required edit** (§0.2), not "reuse the existing observer." Say so in the PR.
- **[VERIFIED] `PipelineDiagram.astro` must be rewritten** to BE the new 5-node labelled frame-0 (Supplier/Order/Product/Invoice/Shipment + Status), with an updated viewBox/reserved box. The current abstract 4-circle graph (viewBox `0 0 640 200`) is **not** a truthful final frame of the new story. The "replaces nothing / byte-identical" framing was false — be honest that this component is rewritten.
- **[VERIFIED] the static `<ol>` becomes 5 stages** (or the 5 steps are framed as sub-beats of the existing 4) so SR "Step 4 of 5" narration doesn't contradict a 4-item list. Update `types.ts stages` typing + `en.ts`/`pl.ts`.
- **CUT the character-by-character typing.** The field value resolves as **one opacity fade** of the pre-set mono string — same claim, no "watch the robot type" theatre, less code.
- **REDUCE lime to 3 beats** (not 4): drop Beat-2's lime underline tick (extraction settles to ink only). Lime fires at **structure** (ANCHOR ring, Beat 3), the **written DUE node/edge** (Beat 4), and the **SCHEDULED button border** (Beat 5) — three clean left→center→right hits.
- **Constrain the browser-chrome wireframe** hard: no window controls, no traffic-light dots, no favicon; address bar = a single hairline rule with mono text; the "button" is a hairline rect whose **border** goes lime (not fill), label doubles as the state word. (design.md warns against "floating screenshot in fake chrome.")
- **Add an "example scenario" marker** to the intro copy (EN `example` / PL `przykład`) so the ERP "Schedule payment" action is not read as a claim of live autonomous payment execution.
- **Add `.visually-hidden`** (§0.4) — no `.sr-only`/`.sr-status` exists today; the `aria-live` plan depends on it.
- **`aria-live` region + toolbar ship in static Astro markup** (empty region; buttons present but inert until `.js`+mount) so nothing is injected at runtime → CLS 0.
- **Do NOT globally rebind Space** inside the group (the Play button handles Space natively; double-binding double-fires). Bind **only ArrowLeft/ArrowRight** at the group level.
- **Reduced-motion contract decided:** the module **DOES mount** under reduced motion, and `render(step)` checks live `matchMedia('(prefers-reduced-motion: reduce)').matches` to **snap** each step instantly (no transitions). This lets reduced-motion users still step/read at their own pace. _(This overrides the hero's "don't mount under reduce" rule — STRUCTURA is operable, the hero is ambient.)_ Remove all contradictory "never imported under reduce" prose.
- Load-bearing identifiers (`INV-2231`, etc.) live inside the 5 `aria-live` sentences, since SVG nodes are `aria-hidden` and the current generic `<ol>` doesn't carry them.

### C.2 Exact knowledge graph — nodes, edges, agent read/write, browser action

Graph-lane space: viewBox `0 0 520 240` (reserve `aspect-ratio: 520/240` + per-breakpoint min-heights; test the **longest PL caption** at 360/768/desktop).

```
NODES  (id, label, x, y)
  supplier  Supplier · Acme Foods            (70, 60)
  order     Order · PO-4471                   (190, 110)   anchor: true
  product   Product · Frozen Peas ×1200       (70, 170)
  invoice   Invoice · INV-2231 · €8,420       (310, 70)
  shipment  Shipment · SH-889                 (310, 160)
  status    STATUS · DUE                       (430, 70)   written: true (appears Beat 4)

EDGES  (from, to, relation)
  supplier → order     supplies
  order    → product   contains
  order    → invoice   billed-by
  order    → shipment  ships
  invoice  → status    status        (written Beat 4, lime from first frame)

AGENT
  read:  ['order', 'invoice']         (lime pulse-dot runs Order→Invoice edge)
  rule:  Invoice INV-2231 · due 2026-07-01 · unpaid  → status = DUE
  write: node 'status' + edge invoice→status

BROWSER ACTION  (right lane, 1px wireframe)
  url:    pay.acme-erp.internal
  field:  Invoice #  →  value 'INV-2231'   (single opacity fade, NOT typed char-by-char)
  button: 'Schedule payment'  →  'SCHEDULED'  (border goes lime ≥3px, label doubles the state word)
```

### C.3 Choreography timeline (5 steps)

Renderer: **hybrid, no canvas** — graph + agent traversal are inline SVG (`.draw-path`/`.draw-fade`); input chips, captions, toolbar, and browser wireframe are HTML/CSS. `<25` moving elements → SVG/DOM holds 60fps and keeps focus/selectable text.

| Step                         | What animates                                                                                                                                                                                                                                                                                                                                                                        | Duration / easing                                                                                       | Lime focal                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **0 — Idle**                 | Static resolved-but-dimmed frame: 3 input glyphs, full ink graph, agent docked, browser wireframe showing completed action greyed. Mono status `READY · press Play or step through`. Byte-identical to reduced-motion/no-JS. Lime dormant (all ink).                                                                                                                                 | none                                                                                                    | none                                                                                                                            |
| **1 — Inputs arrive**        | 3 glyphs (doc/image/audio) lift `translateY 10px` + `opacity 0→1`, stagger 80ms; thin ink guide-line draws toward extraction. Caption `INPUT · 3 sources · PO.pdf, pallet.jpg, vm.m4a`.                                                                                                                                                                                              | 320ms `cubic-bezier(0.2,0.6,0.2,1)`; ~560ms total                                                       | **none** (inputs are grey chaos; lime is earned by structure)                                                                   |
| **2 — Extraction**           | Field chips slide `8px` + fade into a central stack, stagger 90ms (Supplier=Acme Foods, PO=PO-4471, Qty=1200, Amount=€8,420, Invoice=INV-2231…); 1px ink connectors draw toward future node positions. Caption `EXTRACT · 7 fields · 3 entities · 2 relations`.                                                                                                                      | 220ms `ease-out`; ~900ms total                                                                          | **none** (dropped the lime underline tick — extraction settles to ink only)                                                     |
| **3 — Graph assembles**      | 5 nodes settle into fixed coords `opacity + scale 0.7→1`, stagger 70ms in dependency order; 5 edges draw (`stroke-dashoffset` 420ms, stagger 120ms) with mono relation labels fading at 60% along each edge. Caption `KNOWLEDGE BASE · 5 nodes · 5 relations · queryable`.                                                                                                           | 300ms `cubic-bezier(0.2,0.6,0.2,1)`; ~1300ms total                                                      | **Order node gets a 3px lime ANCHOR ring + the word `ANCHOR`** (structure high point)                                           |
| **4 — Agent reads & writes** | Agent node (ink) slides in from right, docks (240ms); a lime pulse-dot runs Order→Invoice (lime dash offset, 500ms) = "reading." On arrival it evaluates the curated rule and WRITES: new `STATUS · DUE` node scales `0.7→1` (260ms) + new lime edge invoice→status draws (`stroke-dashoffset` 360ms). Graph visibly grows. Caption `AGENT · read Order→Invoice · wrote status=DUE`. | ~1200ms total                                                                                           | **the written Status node + its edge, lime from first frame** (brightest moment, right-of-center, leads toward the action lane) |
| **5 — Agent acts**           | Browser wireframe activates: value `INV-2231` **fades in** as one mono string in the `Invoice #` field; focus ring lands on the button (140ms); button label cross-fades `Schedule payment → SCHEDULED` and its **border** goes lime (≥3px, doubled with the word). Caption `ACTION · typed INV-2231 · clicked Schedule → SCHEDULED`. A `REPLAY` affordance appears.                 | ~200ms fades; total run ~4.2s; auto-advance dwell 900ms in Play; `ease-out-quart` throughout, no bounce | **the button's confirmed lime border** (final lime, far right — sweep complete)                                                 |

Three lime beats total: structure (3) → written fact (4) → action (5). Play stops at step 5 (never loops).

### C.4 Technical approach

- **Files:** `apps/web/src/components/PipelineDiagram.astro` (**rewritten** to the 5-node labelled frame-0 + new viewBox + reserved box), `apps/web/src/components/StructuraDemo.astro` (static plate: graph SVG frame-0, input glyphs, browser wireframe, toolbar buttons, empty `aria-live` region, 5-item `<ol>`, `<figcaption>`), `apps/web/src/scripts/structuraDemo.ts` (`~3.5–4 KB` gz state machine).
- **Data** (`~0.8 KB` curated const, JS-owned, no fetch): the C.2 `NODES/EDGES/AGENT/BROWSER_ACTION` plus `STEPS = 6` frame states (0..5), each an array of node/edge/chip ids to reveal. `render(step)` toggles `data-state` attributes; CSS transitions animate (unless reduced-motion → snap). Determinism = always clean.
- **Lazy-load:** §0.2 loader on `[data-demo="structura"]`. Below the fold → never fetched in the Lighthouse trace. Verify a separate `structuraDemo` chunk emits and the entry bundle does not grow ~4 KB.
- **CLS = 0:** whole plate reserved via `aspect-ratio` + per-breakpoint `min-height`; every animated element pre-exists in static DOM and only transforms/fades; **toolbar and `aria-live` region ship in static markup** (buttons inert until `.js`+mount, region empty); caption uses a fixed min-height reserved for the **longest PL string** (e.g. `AGENT · odczyt Zamówienie→Faktura · zapis status=ZALEGŁA`) tested at 360/768/desktop; the `<768px` stacked-lane layout has its own reserved height and collapses the browser wireframe to a one-line `typed INV-2231 → SCHEDULED` summary card.
- **60fps / low INP:** `transform`/`opacity`/`stroke-dashoffset` only; ≤25 elements move at once; `will-change` added JIT to the currently-animating group, removed on `transitionend`; a single cancellable `setTimeout` chain (no idle rAF); no filters/shadows/gradients. All handlers try/catch-clean and idempotent on unmount/bfcache (best-practices penalizes console errors).

### C.5 Interaction & ARIA

- **Toolbar** (mono, under the plate, all real `<button>`, ≥44px targets, ≥8px spacing): `[◀ Prev] [Play ▶ / Pause ❚❚] [Next ▶] [↻ Replay]` + a mono `STEP {n} / 5` readout. Prev disabled at 0, Next disabled at 5 (real `disabled`). Toolbar ships in static markup.
- **Keyboard:** native buttons = full keyboard. When focus is inside the plate `role="group"`, **ArrowRight = Next, ArrowLeft = Prev** (`preventDefault` only when the group has focus, so page scroll elsewhere is unaffected). **Do NOT bind Space** — the Play button handles it natively (**[VERIFIED fix]** — group-level Space would double-fire). Focus never trapped; Tab exits normally. `focus-visible` = global 2px `--focus` + 2px offset (ink; §06 is on light, not `.on-forest`).
- **Play:** OFF by default; auto-advances with 900ms dwell; **stops at step 5** (never loops — §8.7). Any manual control pauses Play. Toggling announces via `aria-live`.
- **Hover (fine-pointer only):** hovering a graph node raises a mono tooltip with its full field string (positioned div, not `title` attr). Nodes are **`aria-hidden` and non-focusable** (no `tabindex`) → the tooltip is mouse-only and purely redundant (all load-bearing identifiers are in the `aria-live` sentences + `<ol>`).
- **ARIA:**
  - Interactive region: `<div role="group" aria-label="STRUCTURA interactive walkthrough" aria-describedby="structura-diagram-desc">`.
  - Graph SVG: `role="img" aria-labelledby="structura-diagram-title structura-diagram-desc"`; inner nodes `aria-hidden`.
  - `aria-live`: `<p class="visually-hidden" aria-live="polite" aria-atomic="true">` ships **empty**; JS sets `textContent` = one plain-language sentence per step (5 total). Each sentence carries every load-bearing identifier (e.g. Step 4 includes "status DUE", Step 5 includes "INV-2231").
  - Buttons: `aria-label` `Previous step` / `Next step`; Play toggles `aria-pressed` + `aria-label` `Play walkthrough` / `Pause walkthrough`; `Replay walkthrough from start`. `STEP {n} / 5` readout is `aria-hidden="true"` (redundant with the live region → avoid double-announce).
  - Browser wireframe: `aria-hidden="true"` (decorative dramatization); its outcome is in the live region + final caption.

### C.6 Reduced-motion / no-JS / no-IO fallback

The **rewritten** `PipelineDiagram.astro` static figure (the 5-node labelled frame-0 with the resolved graph + written Status node + agent docked + browser wireframe showing the completed action, lime present from first paint), plus the **5-item** ordered `<ol>` (mono `01–05` markers) and the `<figcaption>` summary. Under reduced motion the module **still mounts** and `render(step)` snaps each step instantly (operable, no motion). Under no-JS/no-IO the toolbar stays inert and the static figure + `<ol>` + `<figcaption>` are the complete, meaningful experience. **Gate this path in CI** via the reduced-motion axe pass (§0.6).

### C.7 Aesthetic fit

`bg-surface-sunk` rounded-4px hairline plate + corner registration ticks; graph nodes = single-weight ink strokes, rounded joins (the mark's language); edges = 1px ink hairlines with mono relation labels; captions = IBM Plex Mono +0.06em uppercase `--meta`. Toolbar reads as instrument controls (mono labels, 4px radius, hairline borders, border-darken on hover, never shadow). Lime = sniper: exactly 3 focal moments traveling left→center→right (chaos→structure→action). Browser wireframe stays a 1px schematic (no glossy render). Easing `ease-out-quart`/`expo` + the design's `cubic-bezier(0.2,0.6,0.2,1)`/`(0.4,0,0.2,1)`; no bounce/glow/gradient. Tokens only: `bg #FAFAF7`, `surface-sunk #F6F7F2`, `surface #FFFFFF`, `ink #0B0F0A`, `ink-700 #2A3326`, `muted #4A5247`, `meta #5F6659`, `hairline #E3E6DE`, `border-strong #C9CEC1`, `lime #95D600` (graphic only), `lime-text #4C6E00` (only lime text), `ink-on-lime #16210E`, `focus #16281C`.

### C.8 Copy — EN

```
structura.demo.label          = STRUCTURA · INTERACTIVE WALKTHROUGH
structura.demo.intro          = An example: step through it — three messy sources become a knowledge graph, and an agent reads it, updates it, and acts.
structura.demo.statusReady    = READY · press Play or step through
structura.demo.stepReadout    = STEP {n} / 5
structura.demo.step1Caption   = INPUT · 3 sources · PO.pdf, pallet.jpg, vm.m4a
structura.demo.step1Sr        = Step 1 of 5. Three unstructured sources arrive: a purchase-order PDF, a photo of a pallet, and a voicemail clip.
structura.demo.step2Caption   = EXTRACT · 7 fields · 3 entities · 2 relations
structura.demo.step2Sr        = Step 2 of 5. STRUCTURA extracts seven structured fields — supplier, order, product, quantity, amount, invoice, shipment.
structura.demo.step3Caption   = KNOWLEDGE BASE · 5 nodes · 5 relations · queryable
structura.demo.step3Sr        = Step 3 of 5. The fields assemble into a queryable knowledge graph of five connected entities.
structura.demo.step4Caption   = AGENT · read Order→Invoice · wrote status=DUE
structura.demo.step4Sr        = Step 4 of 5. The agent reads from Order to Invoice, finds invoice INV-2231 is unpaid and now due, and writes a new status DUE into the knowledge base.
structura.demo.step5Caption   = ACTION · typed INV-2231 · clicked Schedule → SCHEDULED
structura.demo.step5Sr        = Step 5 of 5. Using what it learned, the agent enters invoice INV-2231 into the payment form and clicks Schedule. The payment is now scheduled. This is an illustrative example, not a live transaction.
structura.demo.nodeSupplier   = Supplier · Acme Foods
structura.demo.nodeOrder      = Order · PO-4471
structura.demo.nodeProduct    = Product · Frozen Peas ×1200
structura.demo.nodeInvoice    = Invoice · INV-2231 · €8,420
structura.demo.nodeShipment   = Shipment · SH-889
structura.demo.nodeStatus     = STATUS · DUE
structura.demo.anchor         = ANCHOR
structura.demo.relSupplies    = supplies
structura.demo.relContains    = contains
structura.demo.relBilledBy    = billed-by
structura.demo.relShips        = ships
structura.demo.relStatus       = status
structura.demo.browserUrl      = pay.acme-erp.internal
structura.demo.browserField    = Invoice #
structura.demo.browserButton   = Schedule payment
structura.demo.browserButtonDone = SCHEDULED
structura.demo.ctrlPrev        = Previous step
structura.demo.ctrlNext        = Next step
structura.demo.ctrlPlay        = Play walkthrough
structura.demo.ctrlPause       = Pause walkthrough
structura.demo.ctrlReplay      = Replay walkthrough from start
structura.demo.hintKeyboard    = Use arrow keys to step; the Play button toggles playback.

# Static <ol> — now 5 stages (was 4):
structura.stages[0] = Unstructured multimodal input
structura.stages[1] = Extraction into structured fields
structura.stages[2] = Assembled into a queryable knowledge base
structura.stages[3] = Agent reads and updates the knowledge base
structura.stages[4] = Agent acts on the web to automate the task
structura.demo.figcaption = How it flows: unstructured multimodal input is extracted into structured fields and relations, assembled into a queryable knowledge base, and handed to custom agents that read it, update it, and act on the web to automate daily work. The scenario shown is an illustrative example.
```

### C.9 Copy — PL

```
structura.demo.label          = STRUCTURA · INTERAKTYWNY PRZEWODNIK
structura.demo.intro          = Przykład: przejdź krok po kroku — trzy nieuporządkowane źródła stają się grafem wiedzy, a agent go czyta, aktualizuje i działa.
structura.demo.statusReady    = GOTOWE · naciśnij Odtwórz lub przechodź po krokach
structura.demo.stepReadout    = KROK {n} / 5
structura.demo.step1Caption   = WEJŚCIE · 3 źródła · PO.pdf, pallet.jpg, vm.m4a
structura.demo.step1Sr        = Krok 1 z 5. Napływają trzy nieustrukturyzowane źródła: PDF zamówienia, zdjęcie palety i wiadomość głosowa.
structura.demo.step2Caption   = EKSTRAKCJA · 7 pól · 3 encje · 2 relacje
structura.demo.step2Sr        = Krok 2 z 5. STRUCTURA wydobywa siedem ustrukturyzowanych pól — dostawca, zamówienie, produkt, ilość, kwota, faktura, wysyłka.
structura.demo.step3Caption   = BAZA WIEDZY · 5 węzłów · 5 relacji · przeszukiwalna
structura.demo.step3Sr        = Krok 3 z 5. Pola układają się w przeszukiwalny graf wiedzy z pięciu połączonych encji.
structura.demo.step4Caption   = AGENT · odczyt Zamówienie→Faktura · zapis status=ZALEGŁA
structura.demo.step4Sr        = Krok 4 z 5. Agent czyta od Zamówienia do Faktury, stwierdza, że faktura INV-2231 jest niezapłacona i wymagalna, i zapisuje w bazie wiedzy nowy status ZALEGŁA.
structura.demo.step5Caption   = DZIAŁANIE · wpisano INV-2231 · kliknięto Zaplanuj → ZAPLANOWANO
structura.demo.step5Sr        = Krok 5 z 5. Wykorzystując zdobytą wiedzę, agent wpisuje fakturę INV-2231 w formularz płatności i klika Zaplanuj. Płatność jest zaplanowana. To ilustracyjny przykład, a nie rzeczywista transakcja.
structura.demo.nodeSupplier   = Dostawca · Acme Foods
structura.demo.nodeOrder      = Zamówienie · PO-4471
structura.demo.nodeProduct    = Produkt · Mrożony groszek ×1200
structura.demo.nodeInvoice    = Faktura · INV-2231 · 8 420 €
structura.demo.nodeShipment   = Wysyłka · SH-889
structura.demo.nodeStatus     = STATUS · ZALEGŁA
structura.demo.anchor         = KOTWICA
structura.demo.relSupplies    = dostarcza
structura.demo.relContains    = zawiera
structura.demo.relBilledBy    = fakturowane-przez
structura.demo.relShips        = wysyła
structura.demo.relStatus       = status
structura.demo.browserUrl      = pay.acme-erp.internal
structura.demo.browserField    = Nr faktury
structura.demo.browserButton   = Zaplanuj płatność
structura.demo.browserButtonDone = ZAPLANOWANO
structura.demo.ctrlPrev        = Poprzedni krok
structura.demo.ctrlNext        = Następny krok
structura.demo.ctrlPlay        = Odtwórz przewodnik
structura.demo.ctrlPause       = Wstrzymaj przewodnik
structura.demo.ctrlReplay      = Odtwórz przewodnik od początku
structura.demo.hintKeyboard    = Użyj strzałek, aby przechodzić po krokach; przycisk Odtwórz przełącza odtwarzanie.

# Statyczna lista <ol> — teraz 5 etapów (było 4):
structura.stages[0] = Nieustrukturyzowane dane multimodalne
structura.stages[1] = Ekstrakcja do ustrukturyzowanych pól
structura.stages[2] = Złożenie w przeszukiwalną bazę wiedzy
structura.stages[3] = Agent czyta i aktualizuje bazę wiedzy
structura.stages[4] = Agent działa w sieci, automatyzując zadanie
structura.demo.figcaption = Jak to przebiega: nieustrukturyzowane dane multimodalne są wydobywane do ustrukturyzowanych pól i relacji, składane w przeszukiwalną bazę wiedzy i przekazywane niestandardowym agentom, którzy ją czytają, aktualizują i działają w sieci, automatyzując codzienną pracę. Pokazany scenariusz jest przykładem ilustracyjnym.
```

> **i18n note:** node/relation/status **labels carry meaning → translated**. `SIEVE/STRUCTURA/PO-4471/INV-2231/SH-889/pay.acme-erp.internal` stay locale-invariant. Reserve the caption min-height against the **longest** rendered string across BOTH locales (Polish captions are longer).

---

## D. Consolidated pre-merge gate

| Check          | Command / method                                                                                                    | Pass criterion                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Chunks lazy    | `pnpm --filter web build` + inspect `dist/**/*.html`                                                                | 3 separate demo chunks; **no** modulepreload of them                            |
| Lighthouse     | local `lhci autorun` (`preset desktop`) on `/` and `/pl/`                                                           | perf/a11y/best-practices/seo all `== 1`, CLS `== 0`, LCP `= #hero-h1`, 3/3 runs |
| a11y (live)    | `node scripts/a11y.mjs http://localhost:PORT/ .../pl/`                                                              | 0 WCAG violations (tests mounted demos)                                         |
| a11y (reduced) | same, with `page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}])` (add `A11Y_REDUCE=1` flag) | 0 WCAG violations (tests static fallbacks)                                      |
| i18n parity    | build assertion                                                                                                     | EN/PL structurally in sync (all keys present)                                   |
| Manual         | keyboard-only + SR + 360px + DPR2 + reduced-motion-toggled-mid-session + bfcache                                    | operable, no console errors, no CLS, no double-announce                         |

**One-line summary:** three lazy, dependency-free, `~3–4 KB` demos that never load in the Lighthouse trace (SIEVE/STRUCTURA below the fold; hero is a hard-swap over an already-painted SVG), each degrading to a meaningful static resolved state under reduced-motion/no-JS, each with rigorous mounted-and-static ARIA — preserving 100/100/100/100 and 0 WCAG violations by construction.
