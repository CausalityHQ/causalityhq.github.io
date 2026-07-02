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

/** SIEVE interactive demo copy (INTERACTIVE.md §B). */
export interface SieveDemo {
  plateTitle: string;
  badge: string;
  meter: string;
  presetsLabel: string;
  /** 4 topic-cluster zone labels (infra, search, privacy, multimodal). */
  clusters: string[];
  /** Visible/announced narration lines: idle, searching, done template. */
  narrateIdle: string;
  /** 4 plain-language scroll-step captions (business audience). */
  steps: string[];
  /** 4 query phrases; presets[0] must equal docs[0]. */
  presets: string[];
  /** 12 corpus labels (D1..D12). */
  docs: string[];
  laneQuery: string;
  laneEmbed: string;
  laneSpace: string;
  btnRun: string;
  btnRunAria: string;
  btnReplay: string;
  btnReset: string;
  btnResetAria: string;
  resultsTitle: string;
  colRank: string;
  colDoc: string;
  colScore: string;
  nearest: string;
  liveSet: string;
  liveSearching: string;
  liveResult: string;
  figureTitle: string;
  figureDesc: string;
  /** Template: {q} {n1} {s1} {n2} {s2} {n3} {s3}. */
  figcaptionTpl: string;
}

/** STRUCTURA interactive walkthrough copy (INTERACTIVE.md §C). */
export interface StructuraDemo {
  label: string;
  intro: string;
  statusReady: string;
  /** "STEP {n} / 5" */
  stepReadout: string;
  /** 5 mono step captions. */
  captions: string[];
  /** 5 plain-language step sentences for the aria-live region. */
  sr: string[];
  /** 6 node labels: supplier, order, product, invoice, shipment, status. */
  nodes: string[];
  anchor: string;
  /** 5 relation labels: supplies, contains, billed-by, ships, status. */
  rels: string[];
  browserUrl: string;
  browserField: string;
  browserButton: string;
  browserButtonDone: string;
  ctrlPrev: string;
  ctrlNext: string;
  ctrlPlay: string;
  ctrlPause: string;
  ctrlReplay: string;
  hintKeyboard: string;
  figcaption: string;
  laneInput: string;
  laneGraph: string;
  laneAction: string;
  agentLabel: string;
  /** 5 short field names shown during extraction. */
  extractChips: string[];
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
      labelFocus: string;
      labelMode: string;
      labelDeploy: string;
      labelBased: string;
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
    perimeterDataStore: string;
    perimeterQuery: string;
    perimeterBlocked: string;
    demo: SieveDemo;
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
    /** Now 5 stages (INTERACTIVE.md §C). */
    stages: string[];
    demo: StructuraDemo;
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
  };
}
