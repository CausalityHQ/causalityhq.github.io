# Causality — landing page

Bilingual (EN / PL), fully static marketing site for **Causality** — a bespoke
applied‑AI software company (services + two products, **SIEVE** and
**STRUCTURA**). Built to a "datasheet" design language: a warm off‑white
blueprint canvas, hairline rules, monospace reference tags, and a disciplined
lime `#95D600` accent.

- **Design source of truth:** [`design.md`](./design.md)
- **Live target:** https://causality.pl (GitHub Pages, custom domain)

## Quality bars (enforced)

| Bar                             | How                                                                                |
| ------------------------------- | ---------------------------------------------------------------------------------- |
| **WCAG 2.2 A/AA**               | `axe-core` gate — 0 violations required ([`scripts/a11y.mjs`](./scripts/a11y.mjs)) |
| **Lighthouse 100/100/100/100**  | `@lhci/cli` asserts every category = 1.0 on the static build                       |
| **Types / Lint / Format**       | `astro check` · `eslint` (+ jsx‑a11y) · `prettier` — run on every commit           |
| **Zero CLS, self‑hosted fonts** | inline SVG art, `@fontsource` WOFF2 subsets, preloaded critical faces              |

## Stack

- **[Astro](https://astro.build)** 7 — static output, zero client framework
- **[Tailwind CSS](https://tailwindcss.com)** v4 (CSS‑first `@theme` tokens)
- **[Turborepo](https://turbo.build)** + **[pnpm](https://pnpm.io)** workspaces
- **TypeScript**, **ESLint** (flat config), **Prettier**, **Husky** + lint‑staged
- Self‑hosted **Space Grotesk** (display), **Inter** (body), **IBM Plex Mono** (labels)

## Layout

```
.
├── apps/web/                 # the Astro site (@causality/web)
│   ├── src/
│   │   ├── i18n/             # typed en.ts / pl.ts dictionaries + helpers
│   │   ├── layouts/          # BaseLayout (head, SEO, JSON-LD, fonts)
│   │   ├── components/       # UI + sections/ + SVG diagrams
│   │   ├── scripts/          # tiny progressive-enhancement JS
│   │   ├── styles/global.css # design tokens (Tailwind @theme)
│   │   └── pages/            # index.astro (EN, /) · pl/index.astro (PL, /pl/)
│   ├── public/               # CNAME, robots.txt, icons, OG image, manifest
│   └── scripts/generate-assets.mjs   # regenerates OG + app icons (sharp)
├── scripts/a11y.mjs          # axe-core WCAG gate
├── design.md                 # full design specification
├── lighthouserc.json         # Lighthouse CI assertions (all = 100)
└── .github/workflows/        # ci.yml (quality) · deploy.yml (Pages)
```

## Develop

```bash
pnpm install
pnpm dev                      # http://localhost:4321
```

### Scripts (run from the repo root)

| Command                                    | What                                                     |
| ------------------------------------------ | -------------------------------------------------------- |
| `pnpm dev` / `pnpm build` / `pnpm preview` | Astro dev / static build / preview                       |
| `pnpm check`                               | Type + template diagnostics (`astro check`)              |
| `pnpm lint`                                | ESLint (+ accessibility rules)                           |
| `pnpm format` / `pnpm format:check`        | Prettier write / verify                                  |
| `pnpm a11y:ci`                             | Build‑serve‑audit with axe‑core (WCAG 2.2 A/AA)          |
| `pnpm lighthouse`                          | Lighthouse CI (asserts 100 across all categories)        |
| `pnpm verify`                              | `build` → `a11y:ci` → `lighthouse` (the full local gate) |
| `pnpm --filter @causality/web assets`      | Regenerate OG image + app icons                          |

A **pre‑commit hook** (Husky) runs Prettier + ESLint on staged files and then
`astro check`, so type/lint/format errors never land in a commit.

## Internationalisation

English is the default locale at `/`; Polish is served at `/pl/`. All copy lives
in typed per‑locale dictionaries (`src/i18n/en.ts`, `src/i18n/pl.ts`) that both
satisfy the same `Content` type, so the two languages can't drift out of sync.
`hreflang`, `canonical`, and `og:locale` are emitted per page.

## Deploy (GitHub Pages · custom domain)

Pushing to `main` triggers [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml),
which builds `apps/web` and publishes `dist/` to GitHub Pages.

One‑time repo setup:

1. **Settings → Pages → Build and deployment → Source:** _GitHub Actions_.
2. **Custom domain:** `public/CNAME` already contains `causality.pl`. Point DNS at
   GitHub Pages (apex `A`/`AAAA` records to GitHub's IPs, or a `CNAME` on `www`)
   and confirm the domain under Settings → Pages. Enable _Enforce HTTPS_.
3. Astro `site` is `https://causality.pl` and `base` is `/` — no path prefix.

Every push and PR also runs [`ci.yml`](./.github/workflows/ci.yml): format → lint →
typecheck → build → **accessibility** → **Lighthouse**.

## Notes for the client

- **Contact:** the single CTA is `mailto:hello@causality.pl` — make sure that
  inbox exists.
- **Trust marks:** the positioning strip intentionally ships **without** partner /
  accelerator / grant logos. Only add a `RECOGNISED BY` row for affiliations you
  can verify (see the integrity gate in `design.md` §6 / §02).
- **Logo:** the header/footer use an inline‑SVG interpretation of the brain‑gear
  mark plus the wordmark set in Space Grotesk (so it inherits ink on light and
  white on the forest band). The official raster lockup is used for the social /
  OG card. Drop in an official inline SVG later if you have one.
