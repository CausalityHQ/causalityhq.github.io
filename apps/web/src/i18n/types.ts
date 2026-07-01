// Shared shape for every locale dictionary. Both en.ts and pl.ts must satisfy
// `Content`, which keeps the two languages structurally in sync at build time.

export interface SpecRow {
  capability: string;
  detail: string;
  /** Highlighted "active spec" row (lime wash + status dot). */
  highlight?: boolean;
}

export interface ServiceItem {
  /** Locale-invariant ref tag, e.g. "SVC-01". */
  ref: string;
  title: string;
  summary: string;
  keys: string[];
  /** Primary row carries the 2px lime left-rule. */
  primary?: boolean;
}

export interface ApproachStep {
  n: string;
  title: string;
  body: string;
}

export interface Content {
  /** BCP-47 lang for <html lang>. */
  lang: 'en' | 'pl';

  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    /** OG locale, e.g. "en" / "pl". */
    ogLocale: string;
    ogLocaleAlternate: string;
  };

  nav: {
    services: string;
    products: string;
    approach: string;
    about: string;
    contact: string;
    talkToUs: string;
    /** aria-label for the primary nav landmark. */
    primaryLabel: string;
    /** Skip-link text. */
    skipToContent: string;
    /** aria-label for the language switcher group. */
    langLabel: string;
    /** aria-label describing the mailto CTA. */
    talkToUsAria: string;
  };

  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    /** Accessible name + description for the hero motif SVG. */
    motifTitle: string;
    motifDesc: string;
    spec: {
      focus: string;
      mode: string;
      deploy: string;
      based: string;
      statusLabel: string;
      statusValue: string;
    };
  };

  trust: {
    label: string;
    line: string;
    /** Truthful attribute chips (no invented partner logos). */
    chips: string[];
  };

  services: {
    tag: string;
    h2: string;
    items: ServiceItem[];
  };

  productsIntro: {
    tag: string;
    h2: string;
    frame: string;
  };

  sieve: {
    ref: string;
    name: string;
    h3: string;
    body: string;
    specCaption: string;
    specHeadCapability: string;
    specHeadDetail: string;
    specs: SpecRow[];
    cta: string;
    ctaAria: string;
    /** Accessible description + adjacent summary for the perimeter diagram. */
    diagramTitle: string;
    diagramDesc: string;
    diagramSummary: string;
    perimeterLabel: string;
    egressLabel: string;
  };

  structura: {
    ref: string;
    name: string;
    h3: string;
    body: string;
    specCaption: string;
    specHeadCapability: string;
    specHeadDetail: string;
    specs: SpecRow[];
    cta: string;
    ctaAria: string;
    diagramTitle: string;
    diagramDesc: string;
    diagramSummary: string;
    stages: string[];
  };

  about: {
    tag: string;
    h2: string;
    body: string;
    roster: string[];
  };

  approach: {
    tag: string;
    h2: string;
    steps: ApproachStep[];
  };

  finalCta: {
    tag: string;
    h2: string;
    sub: string;
    ctaPrimary: string;
    reassurance: string;
  };

  footer: {
    tagline: string;
    productsTitle: string;
    companyTitle: string;
    contactTitle: string;
    copyright: string;
    colophon: string;
  };
}
