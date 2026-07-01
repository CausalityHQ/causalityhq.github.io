# Causality — Landing Page Design Specification

> **Direction:** "Datasheet." Causality's own mark is a stroke-drawn schematic (a brain fused with a gear), so the whole page is built in that language: everything is **drawn, ruled, labelled, and specified** — never illustrated or glowed. The products are documented like real instruments, with specification tables and labelled diagrams, because for a technical buyer **the spec beats the adjective**.
>
> Grafted refinements folded in: vector-semantic product diagrams and a hero embeddings/brain-gear motif; an editorial hairline-row Services list; a footer colophon and a 66ch prose discipline; a single-`mailto:` consultative close.
>
> **This document is the single source of truth for implementation.** Every token, ratio, copy string, and behaviour below is production-final unless flagged `TODO`. All contrast ratios in this document were computed against WCAG 2.2 relative-luminance and are correct as written.

---

## 1. Overview & Design Principles

Causality is a group of experienced machine-learning researchers and software developers who close the gap between businesses and modern software solutions. The landing page must read, in five seconds, as **senior, research-grade, and engineered** — the opposite of the purple-gradient AI-startup template its audience (CTOs, heads of data, technical founders) has learned to distrust.

The organizing metaphor is the **precision engineering datasheet**. A warm off-white blueprint canvas is organized by a faint modular grid; content lives in hairline-bordered cards and honest data tables; metadata sits in the margins as monospace reference tags (`SVC-01`, `PRD/SIEVE`, `DEPLOY: ON-PREM`). SIEVE and STRUCTURA are documented like real components — with specifications tables and labelled architecture/vector diagrams — so a technical buyer can **evaluate**, not merely feel.

### Core principles

1. **Drawn, not glowed.** No gradients, no glassmorphism, no glowing orbs, no stock neural-net renders, no 3D blobs, **and no drop shadows anywhere — including the sticky header.** Flat and hairline throughout. Separation comes from whitespace and 1px rules; the only depth cue permitted is a border darkening on hover.
2. **Show the spec.** Prefer tables, key/value blocks, and labelled diagrams over marketing bullets. Every product claim is a row a buyer can point at.
3. **The page performs the value prop.** A quiet narrative arc runs top→bottom: raw/scattered data at the top progressively becomes structured, searchable, and actionable as you scroll — mirroring what Causality does to data. This is expressed in **copy and static diagrams**, not in scroll theatrics.
4. **Lime is a sniper, not a flood.** `#95D600` appears only where an engineer's eye should land — one active diagram node, one status dot, one ruled underline, one button fill per view. It is **never** used for body, link, or small text on a light surface. This rule is encoded as tokens so it cannot drift.
5. **Density but calm.** Information is tight _inside_ blocks; whitespace is generous _between_ them. Everything snaps to the grid; nothing floats.
6. **Honest and consultative.** The primary CTA is a single `mailto:` — "One email. A real engineer replies." No lead-gen form, no dark patterns, and no trust mark or metric ships unless it is verifiably true (see §6 §02).
7. **Quality is non-negotiable.** WCAG 2.2 AA floor (AAA where feasible), Lighthouse 100/100/100/100, self-hosted fonts, zero CLS, semantic landmarks, visible focus, reduced-motion support.

### What makes this distinctive vs. generic AI sites

Generic AI landing pages reach for: a purple→blue gradient, a glowing 3D orb or abstract "neural" render, vague superlatives ("harness the power of AI"), a hero screenshot in a floating browser chrome, and three identical feature cards with rounded 16px corners and soft shadows. **This design does none of that.** Its distinctiveness is structural, not decorative:

- **The datasheet register.** Monospace reference tags, corner registration ticks, `§NN` section markers, and honest specification tables make the page read like engineering documentation — a register no competitor's marketing site uses, and exactly the one this audience trusts.
- **The brand mark is the design system.** Every drawn element (diagram nodes, connectors, icons, ticks) inherits the mark's single-weight stroke, rounded joins, `currentColor` ink, and one-lime-accent-per-figure rule. The brain (research) and gear (engineering) are literally the two things the company sells; the site is drawn in their language.
- **The differentiator is shown, not asserted.** SIEVE's on-premise guarantee is a diagram with a blocked egress arrow labelled `NO DATA EGRESS`, not a bullet point.
- **Restraint as signal.** Flat, hairline, one accent colour, near-zero JS. In a category defined by visual excess, disciplined quietness reads as seniority.

---

## 2. Brand Foundations

### 2.1 The mark

The logo is the wordmark **"Causality"** plus a **brain-fused-with-a-gear** mark, drawn in single-weight stroke (not fill). It fuses two ideas the company actually sells:

- **Brain → research / cognition / applied ML.**
- **Gear → engineering / software that ships / machinery.**

The mark is a _technical figure_ — the language of a paper or a datasheet, not a mascot. Every drawn element on the site (diagram nodes, connectors, corner ticks, icons) inherits its stroke language: single weight, rounded joins, `currentColor` ink, one lime accent per figure.

**Canonical asset:** `https://causality.pl/assets/img/brand/Causality-logos_monster.png`

### 2.2 Logo usage rules

| Rule                                      | Spec                                                                                                                                                                                                      |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preferred format**                      | Self-hosted inline **SVG** (`currentColor`-aware) for the header/footer wordmark + mark, so it inherits ink/lime by context and scales with zero raster blur. Keep the PNG only as an OG/social fallback. |
| **Clear space**                           | Minimum clear space around the lockup = height of the "C" cap on all sides.                                                                                                                               |
| **Minimum size**                          | Mark ≥ 24px; full lockup ≥ 120px wide. Below that, use the mark alone.                                                                                                                                    |
| **Colour on light**                       | Wordmark + mark in `--ink` (`#0B0F0A`). The lime accent within the mark may render in `--lime` (`#95D600`) as a **graphic** (non-text) element only.                                                      |
| **Colour on dark (forest band / footer)** | Wordmark + mark in white or `--lime`; lime on forest = **8.78:1** (safe as graphic or large text).                                                                                                        |
| **Don'ts**                                | No drop shadows, no gradients, no recolouring the mark to non-brand hues, no stretching, no placing on busy imagery, no lime fill behind lime text.                                                       |
| **Alt text**                              | `alt="Causality"` on the linked home logo. Decorative repeats are `aria-hidden`.                                                                                                                          |

---

## 3. Colour System (Light Theme)

The palette is a **warm off-white blueprint**: never pure `#FFFFFF` for the page canvas (that reads clinical), with a whisper of green in the neutrals so lime never looks alien. **Every ratio below was recomputed against the exact pairing shown and is accurate.** The lime discipline is encoded as tokens — the "how lime may be used" rules are part of the token contract.

### 3.1 Neutrals & surfaces

| Token                 | Hex       | Usage                                                         | Contrast note                     |
| --------------------- | --------- | ------------------------------------------------------------- | --------------------------------- |
| `--bg`                | `#FAFAF7` | Page canvas (warm off-white paper)                            | `--ink` on it = **18.48:1** (AAA) |
| `--bg-rule`           | `#F2F3EE` | Page gutter / faint edge band                                 | decorative                        |
| `--surface`           | `#FFFFFF` | Cards, tables, spec insets                                    | `--ink` on it = **19.32:1** (AAA) |
| `--surface-sunk`      | `#F6F7F2` | Table zebra rows, inset code, diagram plates                  | `--ink` on it = **18.5:1** (AAA)  |
| `--surface-lime-wash` | `#EEF7D6` | Rare "active spec" highlight cell (e.g. SIEVE Deployment row) | `--ink` on it = **17.40:1** (AAA) |

### 3.2 Ink / text scale (on `--surface` / `--bg`)

| Token       | Hex       | Usage                                            | Ratio (on white / on `--bg`)                |
| ----------- | --------- | ------------------------------------------------ | ------------------------------------------- |
| `--ink`     | `#0B0F0A` | Primary text, all headings                       | **19.32:1 / 18.48:1** (AAA)                 |
| `--ink-700` | `#2A3326` | Strong body, secondary headings, lead paragraphs | **13.13:1 / 12.57:1** (AAA)                 |
| `--muted`   | `#4A5247` | Default supporting body prose                    | **8.11:1 / 7.76:1** (AAA)                   |
| `--muted-2` | `#5C6459` | Captions, dense table body (≥14px)               | **6.14:1 / 5.88:1** (AA normal · AAA large) |
| `--meta`    | `#5F6659` | Monospace datasheet labels / ref tags            | **5.95:1 / 5.69:1** (AA)                    |

> **Margin rule (encoded as a comment beside the tokens):** `--muted-2` and `--meta` are the thinnest tokens in the set (AA, not AAA). They pass at every surface they touch — verified: `--meta` on `--surface-sunk` = **5.52:1**, on `--surface-lime-wash` ≈ **5.4:1**, both above the 4.5:1 small-text floor. **Body prose defaults to `--muted` (AAA).** Only mono labels and captions use the AA tokens. Never introduce a new green-tinted supporting colour below these ratios.

### 3.3 Borders / hairlines / grid

Borders here are **decorative separators, never the sole carrier of information** — so they are exempt from the 3:1 non-text-contrast requirement (that requirement applies only to graphics/UI states a user _must perceive to operate the interface_). Any border that also communicates state (e.g. the active-card lime rule, the focus ring) meets 3:1 separately; see §3.4 and §3.6.

| Token             | Hex       | Usage                                                      | vs `--surface`            |
| ----------------- | --------- | ---------------------------------------------------------- | ------------------------- |
| `--hairline`      | `#E3E6DE` | Default 1px card & table rule                              | 1.26:1 (decorative only)  |
| `--border`        | `#D6DACF` | Standard divider / hover edge                              | 1.42:1 (decorative only)  |
| `--border-strong` | `#C9CEC1` | Emphasized frame, hover-active card edge                   | 1.61:1 (decorative only)  |
| `--grid-line`     | `#ECEEE6` | Faint modular blueprint grid (behind hero + framed blocks) | decorative, `aria-hidden` |

### 3.4 Lime system (the anchor — four sanctioned roles only)

`--lime` `#95D600` on white is **1.77:1** — it **fails** text contrast and is **forbidden for any body, link, small-text, or small-icon use on a light surface.** It is deployed only these four ways:

| #   | Role                                                                                                                       | Token(s)                                              | Ratio / rule                                                                                                                                                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Fill with dark text** (primary buttons, badges, active spec chip)                                                        | bg `--lime` `#95D600`, text `--ink-on-lime` `#16210E` | **9.46:1** (AAA)                                                                                                                                                                                                |
| 2   | **Border / rule / underline that carries state** (active-nav underline, primary-card top-rule, active diagram-node stroke) | `--lime` `#95D600`, **rendered ≥3px**                 | 1.77:1 is below the 3:1 non-text bar, therefore **any lime rule that communicates state must be ≥3px thick AND redundant with a text label or position** (see §9). Purely decorative lime rules may be thinner. |
| 3   | **Status / graphic marks** (status dot, active node fill, vector edges, thin icon strokes)                                 | `--lime` `#95D600`                                    | non-text graphic; **always paired with a word** so colour is never the sole signal                                                                                                                              |
| 4   | **Large display graphic** (hero motif fills/lines, forest-band accents)                                                    | `--lime` `#95D600`                                    | non-text graphic                                                                                                                                                                                                |

> **Contrast honesty note:** because `--lime` alone is only 1.77:1 against light, we do **not** rely on a lime outline as the sole indicator of any interactive state on light surfaces. State is always doubled: lime + a text label, lime + a position change, or lime + the dark `--focus` ring. This keeps us compliant with SC 1.4.11 (non-text contrast) and SC 1.4.1 (use of colour) even though the lime hue itself is low-contrast by nature.

Supporting lime tokens:

| Token                 | Hex       | Usage                                                                                                                                                 | Ratio                                                                           |
| --------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `--lime-hover`        | `#86C200` | Primary-button hover fill (with `--ink-on-lime` text)                                                                                                 | **7.73:1** (AAA)                                                                |
| `--lime-text`         | `#4C6E00` | The **only** lime-flavoured colour allowed as **text/icon on a light surface** — inline emphasis, a lime-tinted keyword, a small "on-prem" tick label | **5.94:1 / 5.68:1** on white/`--bg` (AA); on `--surface-sunk` = **5.51:1** (AA) |
| `--ink-on-lime`       | `#16210E` | Text/icon sitting on a lime fill                                                                                                                      | **9.46:1** on `--lime` (AAA)                                                    |
| `--surface-lime-wash` | `#EEF7D6` | see §3.1                                                                                                                                              | `--ink` on it 17.40:1                                                           |

### 3.5 Inverted band (forest — footer + on-prem CTA)

| Token                  | Hex       | Usage                                                                                                                                                                 | Ratio                             |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `--forest`             | `#16281C` | Inverted band + footer background                                                                                                                                     | —                                 |
| `--on-forest`          | `#FFFFFF` | Text on forest                                                                                                                                                        | **15.51:1** (AAA)                 |
| `--on-forest-muted`    | `#C9D2C0` | Supporting body on forest                                                                                                                                             | **9.94:1** (AAA)                  |
| `--lime` on `--forest` | `#95D600` | **On forest, lime may be used more freely** — large labels, headings, rules, underlines (still not tiny body text; 8.78:1 comfortably passes large-text and non-text) | **8.78:1** (AAA large / non-text) |

### 3.6 State & focus

| Token       | Hex            | Usage                                                                                                                        | Ratio                                                                                |
| ----------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--focus`   | `#16281C`      | Focus ring: 2px solid + 2px offset — **never lime-only**                                                                     | **15.51:1** vs white; ≥3:1 non-text against every surface it borders (SC 2.4.13 met) |
| `--error`   | `#A31414`      | Form error text/border (muted crimson)                                                                                       | **7.87:1** on white (AAA)                                                            |
| `--success` | _(no own hex)_ | Success state = `--lime` graphic **plus** an `--ink`/`--muted` text word (e.g. `AVAILABLE`); colour is never the sole signal | —                                                                                    |

> **Encoded anti-drift rule (put this in a code comment beside the tokens):** _Lime is never text on a light surface. Text that must read green uses `--lime-text` (`#4C6E00`). Lime touches type only (a) as a background under `--ink-on-lime`, or (b) on the forest band. Any lime rule that signals state is ≥3px and redundant with a label or position._

---

## 4. Typography

Three self-hosted families, all **SIL OFL**, all variable and subsettable, shipped as subset **WOFF2** (Latin + Latin-Extended covering Polish diacritics: ą ć ę ł ń ó ś ź ż). Installed via `@fontsource-variable`:

- **`@fontsource-variable/space-grotesk`** — Display / headings. Weights: 500, 600, 700. Its slightly mechanical, engineered geometry rhymes with the Causality wordmark without cloning it.
- **`@fontsource-variable/inter`** — Body / UI / tables. Weights: 400, 500, 600. Neutral, screen-optimized, excellent small-size legibility, full Polish support. Enable `font-feature-settings: "tnum" 1;` (tabular figures) in tables and metrics.
- **`@fontsource-variable/ibm-plex-mono`** — The datasheet signature: every metadata label, spec key, reference number, diagram annotation. Weights: 400, 500. Tracked `+0.04em`; uppercase for labels.

> **No serif is grafted in.** The three-family engineered voice is more coherent, and a fourth optical-size family is a font-loading cost we refuse in service of Lighthouse 100.

### 4.1 Loading strategy (zero CLS)

- **Preload** only the two hero-critical faces: Space Grotesk 600 and Inter 400 (subset WOFF2), `rel="preload" as="font" type="font/woff2" crossorigin`.
- **Do not use `font-display: swap`** (its FOUT reflow is a CLS risk). Use `font-display: optional` (or `block` with a very short block period), **and** define metric-matched fallback `@font-face` faces with `size-adjust` / `ascent-override` / `descent-override` so the fallback and the web font occupy identical box metrics. Result: **no layout shift** whichever font paints first. Local fallback stacks: Space Grotesk → system geometric sans; Inter → system UI sans; Plex Mono → `ui-monospace`.
- Self-hosted only — **no external font requests, no `@import` from a CDN**.

### 4.2 Type scale

Base = 16px = `1rem`. Scale ratio ≈ **1.250** (major third). Large sizes use `clamp()` fluid between mobile (~85% of desktop) and desktop. All `clamp()` values below have a fixed minimum, a viewport-relative middle, and a fixed maximum, so they never shift after first paint.

| Role                  | Family / Weight            | Size (rem / px)                           | Line-height | Tracking           | Usage                                                                                                                                |
| --------------------- | -------------------------- | ----------------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Display XL / H1**   | Space Grotesk 600          | `clamp(2.5rem, 5vw, 3.815rem)` / 40→61    | 1.02        | -0.02em            | Hero headline (one per page)                                                                                                         |
| **H2**                | Space Grotesk 600          | `clamp(1.9rem, 3.5vw, 2.441rem)` / 30→39  | 1.08        | -0.015em           | Section titles                                                                                                                       |
| **H3**                | Space Grotesk 600          | `clamp(1.35rem, 2vw, 1.563rem)` / 22→25   | 1.15        | -0.01em            | Card / spec / product titles                                                                                                         |
| **H4**                | Space Grotesk 500          | `1.25rem` / 20                            | 1.2         | 0                  | Sub-headings                                                                                                                         |
| **Product name**      | Space Grotesk 700, caps    | `1.25rem` / 20                            | 1.2         | +0.06em, uppercase | `SIEVE`, `STRUCTURA` designators                                                                                                     |
| **Lead**              | Inter 400                  | `clamp(1.125rem, 1.4vw, 1.25rem)` / 18→20 | 1.6         | 0                  | Intro paragraphs (`--ink-700`)                                                                                                       |
| **Body**              | Inter 400                  | `1rem` / 16                               | 1.65        | 0                  | Running prose (`--muted`), **max 66ch**                                                                                              |
| **Body-sm**           | Inter 400/500              | `0.875rem` / 14                           | 1.5         | 0                  | Dense table body, captions (`--muted-2`)                                                                                             |
| **Meta / mono label** | IBM Plex Mono 500          | `0.75rem` / 12                            | 1.4         | +0.06em, uppercase | Section tags, spec keys, eyebrows (`--meta`)                                                                                         |
| **Micro-mono**        | IBM Plex Mono 400          | `0.6875rem` / 11                          | 1.4         | +0.04em            | Ref numbers, `DOC REF` colophon (`--meta`) — used only for **non-essential** metadata; never for information a user must read to act |
| **Stat numeral**      | Space Grotesk 500, tabular | `clamp(2rem, 4vw, 3rem)` / 32→48          | 1.0         | -0.01em            | Metrics — **only if truthful and sourced**                                                                                           |

**Scale coherence check:** the H-scale (61 / 39 / 25 / 20) tracks the 1.25 ratio cleanly; H4 and Product-name deliberately share 20px because they are peers (a sub-heading and a designator), differentiated by weight and tracking rather than size, which keeps the ramp uncluttered. Body (16) → Body-sm (14) → Meta (12) → Micro (11) is a tight, intentional descent; 11px is fenced to non-essential metadata so no readability-critical text lives there.

### 4.3 Usage rules

- **Headings are never lime** — always `--ink` (lime fails heading contrast on light).
- **Mono labels are the connective tissue** that makes the page a spec sheet; use them for every section tag and spec key.
- **Numbers** in tables/metrics use Inter `tnum` or Plex Mono for column alignment.
- **Prose caps at 66ch** (`--measure`) for readability; tables and diagrams may run full width.
- **Product names** always render as tracked caps to read as component designators, in every locale.

---

## 5. Spacing, Grid, Container, Radius, Border Tokens

### 5.1 Spacing scale (4px base, 8px rhythm)

`--space-1:4px` · `--space-2:8px` · `--space-3:12px` · `--space-4:16px` · `--space-6:24px` · `--space-8:32px` · `--space-12:48px` · `--space-16:64px` · `--space-24:96px` · `--space-32:128px`

- **Between major sections:** 96px desktop / 64px mobile (`--space-24` / `--space-16`).
- **Card internal padding:** 24–32px (`--space-6`–`--space-8`); product cards 32–40px.
- Every section opens with a full-width top hairline + a left-margin mono `§NN / LABEL` tag.

### 5.2 Grid & container

| Token               | Value                          | Note                                                                      |
| ------------------- | ------------------------------ | ------------------------------------------------------------------------- |
| `--container`       | `1200px`                       | Max content width                                                         |
| `--container-bleed` | `1320px`                       | "Drawing frame" — faint grid rules + section hairlines bleed to this edge |
| `--measure`         | `66ch`                         | Long-form prose cap                                                       |
| Columns             | 12                             | Optional faint `--grid-line` verticals inside framed blocks               |
| Gutter / gap        | `24px` desktop / `16px` mobile |                                                                           |
| Page padding        | `clamp(24px, 5vw, 64px)`       | 24 mobile / 48 tablet / 64 desktop                                        |

**Responsive column steps:** 12 → 8 (≤1024px) → 4 (≤768px). Product spec tables become stacked key/value rows on mobile (**no horizontal scroll**). Diagrams reflow to a vertical stack. Content reflows to 320px and zooms to 400% without loss.

### 5.3 Radius, elevation, borders

| Token         | Value                         | Usage                                                                                                                                                                                               |
| ------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--radius`    | `4px`                         | Cards, buttons, tables — tight/technical, **never pillowy**                                                                                                                                         |
| `--radius-sm` | `2px`                         | Chips, tags                                                                                                                                                                                         |
| `--elevation` | **none**                      | **No shadows in any state, including the sticky header.** Depth on hover = border darkens (`--hairline → --border-strong`); the header, when scrolled, gains only a 1px `--hairline` bottom border. |
| `--rule`      | `1px solid var(--hairline)`   | Default hairline                                                                                                                                                                                    |
| `--rule-lime` | `3px solid var(--lime)`       | State-bearing accent: primary-card top-rule, active-nav underline (thickened to 3px so it clears the non-text-contrast floor)                                                                       |
| Corner ticks  | L-shaped 1px `--border` marks | Registration marks at the 4 corners of hero + product frames (drafting-paper motif); `aria-hidden`                                                                                                  |

---

## 6. Page Structure — Section-by-Section

Order top→bottom. Each section opens with a full-width top `--hairline` and a left-margin mono `§NN / LABEL` tag. The narrative arc (raw → structured → searchable → actionable) is threaded through the copy and diagrams.

---

### §00 — Header / Nav (`<header>`, sticky)

**Purpose:** Orient, route, and present the single primary CTA. Establishes the datasheet register instantly.

**Layout:** Sticky top bar (64px), sitting on `--bg`, gaining a 1px `--hairline` bottom border **only** after 80px of scroll (no shadow, ever). Left: line-art Causality mark + wordmark (inline SVG, `--ink`). Right: nav + language toggle + CTA. The **skip link precedes everything** in the DOM.

**Copy / elements:**

- Nav (Inter 500): `Services` · `Products` · `Approach` · `About` · `Contact`
- Active nav item marked by a **3px lime underline** (`--rule-lime`) **and** `aria-current="true"` (colour is never the sole signal).
- Language toggle: mono segmented control `[ EN | PL ]`, `aria-current` on the active locale, real `<a hreflang>` links to `/` and `/pl/`.
- Primary button: **"Talk to us"** (lime fill, `--ink-on-lime` text) → `mailto:hello@causality.pl`.

**Diagram/illustration:** none (the mark only).

---

### §01 — Hero (`<section aria-labelledby="hero-h1">`)

**Purpose:** State the thesis and the one differentiator (data control) in five seconds; give a memorable, ownable brand signature.

**Layout:** Corner-registered "datasheet header" frame, faint blueprint grid behind, 12-col split — **left 7 cols** (text), **right 5 cols** (motif + spec card). No stock imagery, no glow. The motif's box has an explicit reserved aspect-ratio so nothing shifts as it draws.

**Copy:**

- **Eyebrow** (mono): `APPLIED AI · RESEARCH-GRADE SOFTWARE`
- **H1:** **"Close the gap between your business and modern AI."**
- **Lead** (Inter 400, `--ink-700`, ≤66ch): "We are machine-learning researchers and software engineers. We put state-of-the-art AI to work in your daily operations — so you grow, without the pain."
- **Primary CTA:** **"Talk to us"** → `mailto:hello@causality.pl`
- **Secondary CTA:** **"See the products ↓"** (ghost/hairline button, scrolls to §05)

**Right column — two stacked elements:**

1. **Hero motif (the brand signature).** A single inline **SVG embeddings field**: ~24–30 nodes on the faint grid, most in `--muted`/`--border` ink, with **3–4 lime nodes connected by lime vector edges that resolve into a subtle brain-fused-with-gear silhouette**. One node carries a mono coordinate annotation (e.g. `⟨0.83, -0.12⟩`). The figure literally visualizes "embeddings + the brand mark." It has an explicit `viewBox` and fixed box so it never causes CLS.
   - `role="img"`, `<title>Causality — a semantic vector field forming a brain-and-gear silhouette</title>`, and a plain-text `<desc>` summary.
2. **Spec card** (hairline card, mono key/value rows) beneath the motif:
   ```
   FOCUS   : Applied AI
   MODE    : Bespoke + Products
   DEPLOY  : Cloud or On-prem
   BASED   : EU
   STATUS  : ● AVAILABLE          (lime status dot + the word AVAILABLE)
   ```

---

### §02 — Positioning strip (`<section aria-labelledby="trust-h2">`)

**Purpose:** A quiet, honest one-line credibility restatement. **No fabricated trust marks.**

**Layout:** A thin ruled band. Mono label left; a single positioning line as the visible content.

**Copy:**

- **Mono label:** `POSITION`
- **Positioning line (H2, may be visually understated but is a real heading):** "Research-grade AI, built to run inside your business."

> **Integrity gate (hard):** This section ships **without** partner/recognition logos by default. A `RECOGNISED BY` logo row (monochrome, uniform height, on hairline separators, no lime) may be added **only** if each mark is a genuine, permitted affiliation confirmed by the client. Do **not** invent or assume trust marks (e.g. accelerator, grant, or agency logos) — an unverifiable badge is a worse trust signal than none. The same rule governs every numeric stat on the page.

---

### §03 — What We Do / Services (`<section aria-labelledby="services-h2">`)

**Purpose:** Enumerate the four services with editorial calm and mono spec tags. Uses an **editorial capability-row** layout (hairline-separated list) rather than four boxed cards — more senior, still tagged.

**Layout:** Section header (`§03 / SERVICES` + H2). Four **capability rows** separated by 1px `--hairline`, each with: a mono ref tag left (`SVC-01`…`SVC-04`), a Space Grotesk H4 title, a one-line `--ink` summary, 2–3 mono capability keywords, a small schematic line icon, and a **lime `→` glyph that nudges +3px right on hover**. The primary row (SVC-01) carries a 3px lime left-rule (state-bearing, so ≥3px).

**Copy:**

- **H2:** "Four ways we put modern AI to work."
- **SVC-01 — Bespoke Applied-AI Software.** "State-of-the-art methods, engineered into your product and your workflows." · keys: `custom models` · `integration` · `production-grade`
- **SVC-02 — AI Research.** "Published-lab rigour, aimed at your hardest and most specific problems." · keys: `evaluation` · `novel methods` · `benchmarking`
- **SVC-03 — Software Development.** "Reliable, maintainable systems around the models — not notebooks." · keys: `APIs` · `pipelines` · `MLOps`
- **SVC-04 — Ready-to-Use Products.** "SIEVE and STRUCTURA — state-of-the-art AI your team can use today." · keys: `SIEVE` · `STRUCTURA` · `on-prem`

**Illustration:** one thin schematic line icon per row (stroke matched to the mark).

---

### §04 — Products Intro (`<section aria-labelledby="products-h2">`)

**Purpose:** Frame the two flagship products as documented instruments; open the narrative's "structured / searchable / actionable" phase.

**Layout:** Section opener only. `§04 / PRODUCTS` tag + H2 + one-line frame.

**Copy:**

- **H2:** "Two products, documented."
- **Frame line:** "State-of-the-art methods, packaged so your team can use them today. Below: what each does, its specifications, and how it deploys."

---

### §05 — Product: SIEVE (`<section aria-labelledby="sieve-h3">`)

**Purpose:** Document SIEVE as a real component and make **on-premise / no data egress** the visual thesis — the single strongest differentiator in the whole design.

**Layout:** Two-column documentation block. **Left:** ref tag, product name, description, and a real **specifications table**. **Right:** the **on-prem architecture diagram** with vector-styled internal nodes.

**Copy (left):**

- **Mono ref:** `PRD/SIEVE`
- **Product name:** `SIEVE`
- **H3:** "Search and understand your data by meaning."
- **Body (≤66ch, `--muted`):** "SIEVE searches and understands your data by _meaning_, not keywords, using our proprietary vector spaces. It indexes text, documents, and multimodal content into a semantic space where the right answer is simply the nearest neighbour — and it can run **entirely inside your infrastructure**."
- **Specifications table** (`<table>` with `<caption>`, `<th scope>`, zebra `--surface-sunk`, tabular figures):

  | CAPABILITY          | DETAIL                                                                                                                                               |
  | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
  | Semantic search     | Query by meaning; nearest-neighbour retrieval                                                                                                        |
  | Multimodal indexing | Text, documents, images, and more                                                                                                                    |
  | Vector spaces       | Proprietary embeddings, tuned to your domain                                                                                                         |
  | **Deployment**      | **Fully on-premise — your data never leaves your infrastructure** _(row highlighted with `--surface-lime-wash`, lime status dot + the word ON-PREM)_ |

- **CTA:** **"Talk to us about SIEVE"** → `mailto:hello@causality.pl?subject=SIEVE`

**Right — On-prem architecture diagram (the differentiator visual):**
A hairline schematic. A **dashed lime `CUSTOMER PERIMETER`** boundary encloses the data store + SIEVE nodes. Inside, the nodes are rendered in the **embeddings/vector style** — a small cluster with a query vector snapping to its nearest lime neighbour. An arrow attempting to leave the perimeter is **explicitly cut/blocked**, annotated in mono: **`NO DATA EGRESS`**.

- `role="img"`, `<title>`, `<desc>`, **and an adjacent plain-text summary** so a screen-reader user receives the "data never leaves the perimeter" claim without seeing the drawing. The claim is also stated in the spec table, so it never depends on the diagram alone.

---

### §06 — Product: STRUCTURA (`<section aria-labelledby="structura-h3">`)

**Purpose:** Document STRUCTURA (structured extraction + knowledge base + agents that act). Mirror SIEVE's layout (columns swapped) for rhythm; advance the narrative to "actionable."

**Layout:** Two-column, **mirrored** (diagram left, docs right). Same table + diagram apparatus as SIEVE.

**Copy:**

- **Mono ref:** `PRD/STRUCTURA`
- **Product name:** `STRUCTURA`
- **H3:** "Turn messy data into a knowledge base — then let agents act on it."
- **Body (≤66ch, `--muted`):** "STRUCTURA extracts structured facts from unstructured, multimodal data and assembles them into a queryable knowledge base. Custom agents then use that knowledge to **take actions on the web and automate daily work** — the repetitive tasks your team shouldn't be doing by hand."
- **Specifications table:**

  | CAPABILITY          | DETAIL                                                |
  | ------------------- | ----------------------------------------------------- |
  | Input               | Unstructured, multimodal data (documents, web, media) |
  | Extraction          | Structured fields, entities, and relations            |
  | Knowledge base      | Queryable; pairs with SIEVE's semantic spaces         |
  | Agents / automation | Custom agents act on the web and automate workflows   |

- **CTA:** **"Talk to us about STRUCTURA"** → `mailto:hello@causality.pl?subject=STRUCTURA`

**Diagram — Pipeline / chaos→graph→action flow (vector-styled):**
Scattered document / pixel / audio glyphs (grey) on the left resolve into an **ordered lime node-graph / knowledge tree**, which then flows to an **agent → action** node. Drawn as ruled nodes with mono stage labels: `[ Unstructured multimodal input ] → [ Extraction ] → [ Knowledge base ] → [ Agents → actions on the web ]`. The agent/action node is the lime focal beat.

- `role="img"`, `<title>`, `<desc>`, adjacent plain-text summary of the pipeline. The four pipeline stages are also legible from the spec table, so the diagram is never the sole carrier.

---

### §07 — Who We Are / Team (`<section aria-labelledby="about-h2">`)

**Purpose:** Human, senior credibility without stocky headshots.

**Layout:** Short H2 + the full positioning paragraph + an optional restrained roster (discipline labels in mono, or named people once confirmed). Line-art avatar frames only if real photos exist.

**Copy:**

- **H2:** "A team of researchers and engineers."
- **Body (≤66ch):** "We are a group of experienced machine-learning researchers and software developers, closing the gap between businesses and modern software solutions. Our services let you use state-of-the-art AI in daily work to grow your business — without the pain."
- **Optional roster (mono):** `Research` · `ML Engineering` · `Software` · `Product` (replace with named people once confirmed; do not invent).

---

### §08 — Approach / How We Work (`<section aria-labelledby="approach-h2">`)

**Purpose:** Show the research→engineering→delivery method as a procedure, mirroring the brain-gear mark.

**Layout:** Section header (`§08 / APPROACH`). A **3-step ruled procedure** with mono step numbers, hairline connectors, one-line `--muted` descriptions.

**Copy:**

- **H2:** "From your problem to a running system."
- **01 — Scope & research.** "We study your data and your problem, and tell you honestly whether AI is the right tool."
- **02 — Build.** "A bespoke system or one of our products — engineered to ship, not a demo."
- **03 — Deploy & support.** "Cloud or fully on-premise. You own it; we support it."

---

### §09 — Final CTA (inverted forest band) (`<section aria-labelledby="cta-h2">`)

**Purpose:** The single consultative close. One `mailto:`, no form.

**Layout:** Full-width `--forest` band, corner-registered, faint lime embeddings grid behind. Lime is allowed more prominently here (large label + button). Centred-left composition.

**Copy:**

- **H2 (white, with a lime keyword underline):** "Let's talk about your data."
- **Sub (Inter, `--on-forest-muted`):** "Tell us the problem. We'll tell you honestly whether AI is the right tool — and how to keep your data yours."
- **Primary CTA:** **"Talk to us"** (lime fill, `--ink-on-lime` text) → `mailto:hello@causality.pl`
- **Email shown as selectable mono text:** `hello@causality.pl`
- **Reassurance line (mono):** `ONE EMAIL. A REAL ENGINEER REPLIES.`

---

### §10 — Footer / Colophon (inverted forest, `<footer>`)

**Purpose:** Navigation, legal, and the **datasheet colophon** that seals the document metaphor.

**Layout:** Continuous with the CTA band (`--forest`). Mono company block + nav columns + language toggle + email + EU funding notice + copyright + a final mono colophon / `DOC REF` line.

**Copy:**

- **Company block (mono):** `CAUSALITY · EU`
- **Nav columns:** **Products** (SIEVE, STRUCTURA) · **Company** (Services, Approach, About) · **Contact** (`hello@causality.pl`, GitHub)
- **Language toggle:** `[ EN | PL ]` (real `hreflang` links)
- **EU notice:** EU-project funding acknowledgment + flag link _(retained from the current site for compliance — `TODO`: paste the exact required wording and beneficiary details before publish)._
- **Copyright:** `© 2026 Causality. All rights reserved.`
- **Colophon (mono, `--on-forest-muted`):** `Set in Space Grotesk, Inter & IBM Plex Mono. Built with Astro.`
- **DOC REF signature (micro-mono, `--on-forest-muted`):** `DOC REF: CAUSALITY-LP · REV 2026.07`

The skip-link target and a "back to top" link may also live here.

---

## 7. Component Inventory

High-level props/variants. Build as Astro components, Tailwind-styled from the tokens above.

| Component                         | Props / Variants                                                                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`Topbar`**                      | `activeNav`, `locale` (`en`/`pl`); sticky; scroll-aware 1px hairline (no shadow); contains `LanguageToggle`, primary `Button`; skip-link precedes it in DOM.                                     |
| **`SkipLink`**                    | Visually hidden until focus; `href="#main"`; dark `--focus` ring.                                                                                                                                |
| **`Button`**                      | `variant`: `primary` (lime fill / `--ink-on-lime` text), `secondary` (hairline border, `--ink` text, lime underline on hover); `href` or `as="button"`; icon slot (`↓`, `→`); ≥44px target.      |
| **`LanguageToggle`**              | Mono segmented `[EN                                                                                                                                                                              | PL]`; `aria-current`on active; real`<a hreflang>`to`/`and`/pl/`; instant full-page nav. |
| **`MonoLabel` / `RefTag`**        | `text`; uppercase tracked; variants: eyebrow, section `§NN`, spec key, `PRD/…` ref, `SVC-0N`.                                                                                                    |
| **`SectionHeader`**               | `tag` (`§04 / PRODUCTS`), `title` (H2), optional `frame` line; renders top hairline + left-margin tag.                                                                                           |
| **`SpecCard`**                    | Hairline card, `--radius`; optional `primary` → 3px lime top-rule; pinned mono ref (top-right); slot for key/value rows.                                                                         |
| **`KeyValueBlock`**               | Array of `{key, value}`; mono keys (`--meta`), `--ink` values, tabular figures; reflows to stacked rows on mobile.                                                                               |
| **`SpecTable`**                   | `caption`, columns, rows; `<th scope>`, zebra `--surface-sunk`, tabular figures; optional `highlightRow` (`--surface-lime-wash` + status dot + word); mobile → key/value pairs, **no h-scroll**. |
| **`StatusDot`**                   | `state`: `available` (lime) / `neutral` (ink); **always** paired with a text label.                                                                                                              |
| **`SchematicIcon`**               | Thin line-icon set, stroke matched to the logo; `currentColor`; used in capability rows.                                                                                                         |
| **`CapabilityRow`**               | `ref` (`SVC-0N`), `title`, `summary`, `keys[]`, `icon`; hairline separator; lime `→` glyph nudges +3px on hover; `primary` → 3px lime left-rule.                                                 |
| **`ProductBlock`**                | `ref`, `name`, `heading`, `body`, `specTable`, `diagram`, `cta`, `mirrored` (bool for L/R swap).                                                                                                 |
| **`PerimeterDiagram`** (SIEVE)    | Dashed lime `CUSTOMER PERIMETER`, vector-styled internal nodes, blocked egress arrow, `NO DATA EGRESS` annotation; `role="img"` + `<title>`/`<desc>` + adjacent text summary.                    |
| **`PipelineDiagram`** (STRUCTURA) | Chaos glyphs → lime node-graph → agent/action node; mono stage labels; lime output focal node; a11y parity text.                                                                                 |
| **`HeroMotif`**                   | Embeddings field forming a brain/gear silhouette; explicit `viewBox` + reserved box (no CLS); `role="img"` + descriptions.                                                                       |
| **`CornerTicks`**                 | L-shaped hairline registration marks on framed blocks; `aria-hidden`.                                                                                                                            |
| **`BlueprintGrid`**               | Faint `--grid-line` background; `aria-hidden`; behind hero + framed blocks + forest band.                                                                                                        |
| **`PositionStrip`**               | Mono label + single positioning H2; optional verified-logo row (off by default).                                                                                                                 |
| **`ProcedureStepper`**            | Mono step numbers, hairline connectors, one-line descriptions.                                                                                                                                   |
| **`InvertedBand`**                | Forest bg; hosts final CTA + footer; lime freely usable at large sizes.                                                                                                                          |
| **`Footer`**                      | Nav columns, language toggle, email, EU notice, copyright, colophon + `DOC REF`.                                                                                                                 |
| **`FocusRing` utility**           | 2px `--focus` + 2px offset; `:focus-visible`; never removed.                                                                                                                                     |
| **`ReducedMotion` wrapper**       | Gates all transforms/draws behind `prefers-reduced-motion`.                                                                                                                                      |

---

## 8. Motion & Interaction

Motion is instrument-like — a datasheet being _read_, not a marketing site performing. All motion is **transform/opacity only** (GPU-cheap, no layout shift) and fully reduced-motion aware. Nothing on the page depends on motion to be understood.

1. **Section reveals.** On first intersection (IntersectionObserver, **once**): 8px `translateY` + opacity fade, 320ms `cubic-bezier(0.2, 0.6, 0.2, 1)`, staggered 40ms across a card/row group.
2. **Hero motif draw-in (the signature).** The hero motif SVG "plots in" via `stroke-dashoffset` (~700ms); nodes fade/scale `0.6→1` with a soft settle. The 3–4 lime nodes/edges are lime **from their first frame** — we do **not** stage a colour "reveal" of a connector, because a colour change that carries no information reads as gimmick and (if ever load-bearing) would violate use-of-colour rules. The lime is a static compositional focal point; only the plotting-in is animated. Runs once.
3. **Diagram draw-in.** SIEVE perimeter + STRUCTURA pipeline lines render via `stroke-dashoffset` (~600ms), like a schematic being plotted; the lime active/output node settles in **last** as the focal beat. The final (reduced-motion or post-animation) state is identical.
4. **Hover states.** Buttons: fill shifts to `--lime-hover` (~120ms), 1px inset on `:active`. Secondary buttons: lime underline wipes L→R (200ms). Capability rows: lime `→` glyph translates +3px. Cards: border `--hairline → --border-strong` (150ms), **no shadow**. Table rows: background to `--surface-sunk`.
5. **Active-nav underline** slides between items (200ms).
6. **Sticky header** gains its 1px hairline after 80px scroll (no padding jump, no shadow, no reflow).
7. **One looping motion, and only one:** the lime `● AVAILABLE` status dot pulses (opacity 1→0.4, 2s ease). **Disabled under reduced motion** (stays solid lime).
8. **Language toggle:** instant full-page nav, no animation.

**No** parallax (an optional ≤6px pointer-parallax on the hero motif is permitted only on desktop fine-pointer devices, disabled for touch and reduced-motion), **no** auto-carousels, **no** scroll-jacking, **no** glow pulses.

**`@media (prefers-reduced-motion: reduce)`:** reveals become instant opacity with no transform; all `stroke-dashoffset` draws are skipped (final state shown, including all lime nodes and edges); the status dot stops pulsing (solid lime); any count-ups show their final value immediately. **Zero CLS in every case** — the reserved boxes are identical whether or not motion runs.

---

## 9. Accessibility (WCAG 2.2 AA floor, AAA where feasible)

- **Landmarks:** `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, each `<section aria-labelledby="…">`, `<footer>`. Exactly one `<h1>`; strict, non-skipping heading order (h1 → h2 → h3). Product blocks may use `<article>`.
- **Skip link:** first focusable element in the DOM, visible on focus, targets `#main`.
- **Contrast (verified, recomputed):** `--ink` 19.32:1, `--ink-700` 13.13:1, `--muted` 8.11:1 (all AAA). The only AA-not-AAA text tokens are `--muted-2` (6.14:1 normal / AAA large), `--meta` (5.69–5.95:1, down to 5.4:1 on tinted surfaces), and `--lime-text` (5.51–5.94:1) — all above the 4.5:1 small-text floor. Forest band: white 15.51:1, `--on-forest-muted` 9.94:1, lime-on-forest 8.78:1 (all AAA / large-safe). Error 7.87:1.
- **Lime rule enforced by tokens:** `--lime` (1.77:1 on light) is never body/small text. It only fills-with-dark-text (9.46:1), draws state-bearing rules at **≥3px** doubled with a label/position, marks status (always beside a word), or appears as a large graphic / on the forest band.
- **Non-text contrast (SC 1.4.11):** every UI component/graphic a user must perceive to operate meets ≥3:1 through a dark ink stroke or the dark `--focus` ring — never through lime alone. Decorative hairlines are exempt (they carry no operable information); wherever a hairline _does_ separate distinct interactive regions, an adjacent ink label or spacing carries the meaning.
- **Focus (SC 2.4.13):** 2px `--focus` (`#16281C`) ring + 2px offset on every interactive element via `:focus-visible`; never removed; never lime-only; ≥3:1 against adjacent colours. Sticky-header offset handled with `scroll-margin-top` so focused targets aren't obscured (SC 2.4.11).
- **Colour never the sole signal (SC 1.4.1):** status dots, lime accents, active-nav underline, and diagram focal nodes are **always** paired with a text label or `aria-current` (`AVAILABLE`, `ON-PREM`, `NO DATA EGRESS`, `aria-current="true"`).
- **Diagrams:** decorative SVG is `aria-hidden`. Meaningful SVG (hero motif, SIEVE perimeter, STRUCTURA pipeline) uses `role="img"` + descriptive `<title>`/`<desc>` **and** an adjacent plain-text summary; additionally, every load-bearing claim in a diagram (on-prem/no-egress; the extraction→knowledge→agent stages) is **also present in the spec tables**, so no selling point depends on the drawing.
- **Tables:** `<caption>`, `<th scope>`, tabular figures; reflow to key/value pairs on mobile (no horizontal scroll — SC 1.4.10 reflow).
- **Links/buttons:** discernible accessible names; the `mailto:` CTA announces it opens email (`aria-label="Talk to us — email hello@causality.pl"`); the address is also shown as selectable text.
- **Forms:** none by default (single mailto). If a contact form is ever added: visible labels, `aria-describedby` errors, `--error` text (7.87:1), errors never colour-only.
- **Targets (SC 2.5.8):** ≥24×24px minimum; nav/buttons/toggle ≥44px; tap spacing ≥8px.
- **Language:** `<html lang="en">` at `/`, `<html lang="pl">` at `/pl/`; `hreflang` alternates; toggle uses `aria-current` and text labels (never flags alone).
- **Motion:** `prefers-reduced-motion` fully honoured (§8); no autoplay, no parallax on touch.
- **Zoom/reflow:** content reflows to 320px and zooms to 400% without loss of content or function (fluid clamps, 66ch measure).
- **Images:** logo `alt="Causality"`; any real partner marks alt-labelled; decorative grid/ticks `aria-hidden`.

---

## 10. Performance (Lighthouse 100/100/100/100)

- **Static output.** Astro → fully static HTML/CSS; GitHub Pages, custom domain `causality.pl`, base `/`.
- **Fonts:** self-hosted subset WOFF2 via `@fontsource-variable/*`; preload only the two hero-critical faces; metric-matched fallbacks (`size-adjust` / `ascent-override` / `descent-override`) with `font-display: optional` to eliminate FOUT/CLS; no external font requests.
- **Images:** the hero and product visuals are **inline SVG line art** — no raster hero, so no LCP image weight and no image CLS. Any raster (OG image only) is optimized and has explicit `width`/`height`. The PNG logo is a social/OG fallback only, never rendered on-page.
- **No CLS (target 0):** explicit dimensions / `aspect-ratio` on all media and framed diagram boxes; reserved motif space; metric-matched fonts; `position: sticky` header (no reflow); all reveals transform/opacity only; no late-injected banners.
- **CSS:** Tailwind with content-based purge → minimal shipped CSS; tokens as CSS custom properties; no render-blocking third parties.
- **JS budget:** near-zero. Only a tiny IntersectionObserver reveal script + native `<a>` language nav + a reduced-motion guard. No framework runtime shipped to the client (prefer static; Astro islands only if strictly required). `type="module"`, deferred, no blocking scripts.
- **Preconnect/DNS:** none needed (fully self-hosted).
- **LCP:** the H1 text (Space Grotesk, preloaded) — a text LCP, fast. **INP/TBT:** trivial (minimal JS). **CLS:** 0.
- **Realism note:** Lighthouse 100 across all four categories is achievable _for this spec_ specifically because there is no hero raster, no web-font FOUT, no client framework, and no third-party script. The two live risks to watch in CI are (a) an un-preloaded or non-metric-matched font sneaking a CLS in, and (b) an OG/raster image without dimensions — both are caught by the existing `lighthouserc.json` budget and `.pa11yci.json` in the repo.

---

## 11. SEO / Meta / i18n

### 11.1 Per-page meta

**EN (`/`):**

- `<title>`: `Causality — Applied AI, research-grade software`
- `<meta name="description">`: `Machine-learning researchers and software engineers who put state-of-the-art AI to work in your business. SIEVE for on-premise semantic search; STRUCTURA for structured extraction and agents.`

**PL (`/pl/`):**

- `<title>`: `Causality — Stosowana AI, oprogramowanie klasy badawczej`
- `<meta name="description">`: `Badacze uczenia maszynowego i inżynierowie oprogramowania, którzy wdrażają najnowocześniejszą AI w Twojej firmie. SIEVE — wyszukiwanie semantyczne on-premise; STRUCTURA — ekstrakcja danych i agenci.`

### 11.2 hreflang & canonical

On every page `<head>` (canonical is self-per-locale):

```html
<link rel="alternate" hreflang="en" href="https://causality.pl/" />
<link rel="alternate" hreflang="pl" href="https://causality.pl/pl/" />
<link rel="alternate" hreflang="x-default" href="https://causality.pl/" />
<link rel="canonical" href="https://causality.pl/" />
```

### 11.3 Open Graph / Twitter

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Causality" />
<meta property="og:title" content="Causality — Applied AI, research-grade software" />
<meta
  property="og:description"
  content="ML researchers and software engineers putting state-of-the-art AI to work — on-premise capable."
/>
<meta property="og:url" content="https://causality.pl/" />
<meta property="og:locale" content="en" />
<meta property="og:locale:alternate" content="pl" />
<meta property="og:image" content="https://causality.pl/assets/img/og/causality-og.png" />
<!-- 1200×630, light datasheet still with mark + lime accent -->
<meta name="twitter:card" content="summary_large_image" />
```

### 11.4 Sitemap & robots

- `sitemap.xml` listing `/` and `/pl/` with `hreflang` alternates (`@astrojs/sitemap`).
- `robots.txt` allowing all, pointing to the sitemap. _(Both already exist in `apps/web/public/` — keep in sync with the built routes.)_

### 11.5 JSON-LD (in `<head>`)

**Organization:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Causality",
  "url": "https://causality.pl",
  "logo": "https://causality.pl/assets/img/brand/Causality-logos_monster.png",
  "email": "hello@causality.pl",
  "description": "A group of experienced machine-learning researchers and software developers closing the gap between businesses and modern software solutions.",
  "areaServed": "EU",
  "knowsAbout": [
    "Applied AI",
    "Machine Learning",
    "Semantic Search",
    "Vector Spaces",
    "Information Extraction",
    "AI Agents"
  ]
}
```

**Product — SIEVE:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SIEVE",
  "brand": { "@type": "Brand", "name": "Causality" },
  "description": "Semantic data search and understanding on proprietary vector spaces, with fully on-premise deployment — your data never leaves your infrastructure.",
  "category": "Software > Semantic Search"
}
```

**Product — STRUCTURA:**

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "STRUCTURA",
  "brand": { "@type": "Brand", "name": "Causality" },
  "description": "Structured data extraction and knowledge-base building from unstructured, multimodal data, plus custom agents that act on the web to automate daily work.",
  "category": "Software > Information Extraction & Automation"
}
```

---

## 12. i18n Content Model

### 12.1 Structure

- **Default (EN)** served at `/`; **Polish (PL)** at `/pl/`. Both fully static, prerendered.
- Copy lives in a **per-locale content dictionary** (`src/i18n/en.ts`, `src/i18n/pl.ts`), keyed by section (`hero.h1`, `services.svc01.title`, …). Components receive strings via a `t(key)` lookup selected by the route's locale. **No runtime i18n library on the client** — resolution happens at build time. A build-time assertion checks that every key present in `en.ts` also exists in `pl.ts` (and vice-versa) so a locale can never ship with a missing string.
- Product names (`SIEVE`, `STRUCTURA`), the email (`hello@causality.pl`), and mono ref tags (`SVC-01`, `PRD/SIEVE`, `§NN`, `DOC REF`) are **locale-invariant**. The diagram annotations `CUSTOMER PERIMETER` and `NO DATA EGRESS` and the pipeline stage labels **are translated in PL** (they carry meaning, not just designators) — see the table below — but kept terse.
- `<html lang>` and `hreflang` set per route (§11.2). The `LanguageToggle` links the current page to its counterpart locale.

### 12.2 EN ↔ PL — all headlines, CTAs & load-bearing labels

| Key                      | EN                                                                                                                                                       | PL                                                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero eyebrow**         | `APPLIED AI · RESEARCH-GRADE SOFTWARE`                                                                                                                   | `STOSOWANA AI · OPROGRAMOWANIE KLASY BADAWCZEJ`                                                                                                                |
| **Hero H1**              | Close the gap between your business and modern AI.                                                                                                       | Zlikwiduj dystans między Twoją firmą a nowoczesną AI.                                                                                                          |
| **Hero lead**            | We are machine-learning researchers and software engineers. We put state-of-the-art AI to work in your daily operations — so you grow, without the pain. | Jesteśmy badaczami uczenia maszynowego i inżynierami oprogramowania. Wdrażamy najnowocześniejszą AI do Twojej codziennej pracy — abyś rozwijał firmę bez bólu. |
| **CTA primary**          | Talk to us                                                                                                                                               | Porozmawiajmy                                                                                                                                                  |
| **CTA secondary (hero)** | See the products ↓                                                                                                                                       | Zobacz produkty ↓                                                                                                                                              |
| **Position label**       | POSITION                                                                                                                                                 | POZYCJA                                                                                                                                                        |
| **Position line**        | Research-grade AI, built to run inside your business.                                                                                                    | AI klasy badawczej, stworzona, by działać wewnątrz Twojej firmy.                                                                                               |
| **Services H2**          | Four ways we put modern AI to work.                                                                                                                      | Cztery sposoby, w jakie wdrażamy nowoczesną AI.                                                                                                                |
| **SVC-01 title**         | Bespoke Applied-AI Software                                                                                                                              | Dedykowane oprogramowanie AI                                                                                                                                   |
| **SVC-01 summary**       | State-of-the-art methods, engineered into your product and your workflows.                                                                               | Najnowocześniejsze metody, wbudowane w Twój produkt i procesy.                                                                                                 |
| **SVC-02 title**         | AI Research                                                                                                                                              | Badania nad AI                                                                                                                                                 |
| **SVC-02 summary**       | Published-lab rigour, aimed at your hardest and most specific problems.                                                                                  | Rygor publikującego laboratorium, skierowany na Twoje najtrudniejsze problemy.                                                                                 |
| **SVC-03 title**         | Software Development                                                                                                                                     | Rozwój oprogramowania                                                                                                                                          |
| **SVC-03 summary**       | Reliable, maintainable systems around the models — not notebooks.                                                                                        | Niezawodne, utrzymywalne systemy wokół modeli — nie notatniki.                                                                                                 |
| **SVC-04 title**         | Ready-to-Use Products                                                                                                                                    | Gotowe produkty                                                                                                                                                |
| **SVC-04 summary**       | SIEVE and STRUCTURA — state-of-the-art AI your team can use today.                                                                                       | SIEVE i STRUCTURA — najnowocześniejsza AI, z której Twój zespół skorzysta już dziś.                                                                            |
| **Products H2**          | Two products, documented.                                                                                                                                | Dwa produkty, udokumentowane.                                                                                                                                  |
| **Products frame**       | State-of-the-art methods, packaged so your team can use them today.                                                                                      | Najnowocześniejsze metody, spakowane tak, by Twój zespół mógł ich użyć już dziś.                                                                               |
| **SIEVE H3**             | Search and understand your data by meaning.                                                                                                              | Przeszukuj i rozumiej swoje dane według znaczenia.                                                                                                             |
| **SIEVE deploy row**     | Fully on-premise — your data never leaves your infrastructure.                                                                                           | W pełni on-premise — Twoje dane nigdy nie opuszczają Twojej infrastruktury.                                                                                    |
| **SIEVE CTA**            | Talk to us about SIEVE                                                                                                                                   | Zapytaj nas o SIEVE                                                                                                                                            |
| **STRUCTURA H3**         | Turn messy data into a knowledge base — then let agents act on it.                                                                                       | Zamień chaos danych w bazę wiedzy — i pozwól agentom działać na jej podstawie.                                                                                 |
| **STRUCTURA CTA**        | Talk to us about STRUCTURA                                                                                                                               | Zapytaj nas o STRUCTURA                                                                                                                                        |
| **Diagram: perimeter**   | CUSTOMER PERIMETER                                                                                                                                       | PERYMETR KLIENTA                                                                                                                                               |
| **Diagram: egress**      | NO DATA EGRESS                                                                                                                                           | DANE NIE WYCHODZĄ                                                                                                                                              |
| **Pipeline stages**      | Input → Extraction → Knowledge base → Agents → actions                                                                                                   | Wejście → Ekstrakcja → Baza wiedzy → Agenci → działania                                                                                                        |
| **About H2**             | A team of researchers and engineers.                                                                                                                     | Zespół badaczy i inżynierów.                                                                                                                                   |
| **Approach H2**          | From your problem to a running system.                                                                                                                   | Od Twojego problemu do działającego systemu.                                                                                                                   |
| **Approach 01**          | Scope & research                                                                                                                                         | Analiza i badania                                                                                                                                              |
| **Approach 02**          | Build                                                                                                                                                    | Budowa                                                                                                                                                         |
| **Approach 03**          | Deploy & support                                                                                                                                         | Wdrożenie i wsparcie                                                                                                                                           |
| **CTA band H2**          | Let's talk about your data.                                                                                                                              | Porozmawiajmy o Twoich danych.                                                                                                                                 |
| **CTA band sub**         | Tell us the problem. We'll tell you honestly whether AI is the right tool — and how to keep your data yours.                                             | Opisz nam problem. Uczciwie powiemy, czy AI to właściwe narzędzie — i jak zachować kontrolę nad danymi.                                                        |
| **CTA reassurance**      | ONE EMAIL. A REAL ENGINEER REPLIES.                                                                                                                      | JEDEN E-MAIL. ODPOWIADA PRAWDZIWY INŻYNIER.                                                                                                                    |
| **Footer colophon**      | Set in Space Grotesk, Inter & IBM Plex Mono. Built with Astro.                                                                                           | Złożone krojami Space Grotesk, Inter i IBM Plex Mono. Zbudowane w Astro.                                                                                       |
| **Nav: Services**        | Services                                                                                                                                                 | Usługi                                                                                                                                                         |
| **Nav: Products**        | Products                                                                                                                                                 | Produkty                                                                                                                                                       |
| **Nav: Approach**        | Approach                                                                                                                                                 | Podejście                                                                                                                                                      |
| **Nav: About**           | About                                                                                                                                                    | O nas                                                                                                                                                          |
| **Nav: Contact**         | Contact                                                                                                                                                  | Kontakt                                                                                                                                                        |

> Locale-invariant (identical in both locales): `SIEVE`, `STRUCTURA`, `hello@causality.pl`, all `§NN` / `SVC-0N` / `PRD/…` mono tags, `DOC REF`, `[ EN | PL ]`.

---

## Appendix — Build Checklist (Definition of Done)

- [ ] Tokens implemented as CSS custom properties; lime anti-drift rule (§3.6) commented beside them; `--rule-lime` is 3px.
- [ ] Three `@fontsource-variable` families installed, subset, preloaded (two hero faces), metric-matched fallbacks, `font-display: optional`; no external font requests.
- [ ] All sections built in order (§00–§10) with exact EN copy; PL dictionary complete; build-time key-parity assertion passes.
- [ ] SIEVE perimeter + STRUCTURA pipeline + hero motif SVGs drawn with `role="img"` + `<title>`/`<desc>` + adjacent text summaries; every load-bearing claim also in a spec table; decorative SVG `aria-hidden`.
- [ ] Skip link, landmarks, single `<h1>`, non-skipping heading order, `:focus-visible` rings verified.
- [ ] Contrast audit passes at the **recomputed** ratios in §3; lime never text-on-light; state-bearing lime rules ≥3px and doubled with label/position.
- [ ] `prefers-reduced-motion` disables all draws/transforms; status dot stops pulsing; final state identical to animated end state; CLS = 0 either way.
- [ ] No shadows anywhere, including the scrolled sticky header (hairline only).
- [ ] hreflang, canonical, OG, sitemap, JSON-LD (Organization + both Products) in place; `public/robots.txt` + sitemap in sync with routes.
- [ ] `§02` ships with **no** trust logos unless each is client-confirmed; no unsourced stat anywhere; EU funding notice wording confirmed.
- [ ] `pa11y` (via `.pa11yci.json`) and Lighthouse CI (`lighthouserc.json`) pass: 100/100/100/100, CLS = 0, near-zero client JS.
