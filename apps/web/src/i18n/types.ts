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

/** A named team member for the About section. Name + profile URLs are
 * locale-invariant; role and note are translated. */
export interface TeamMember {
  name: string;
  role: string;
  note?: string;
  linkedin?: string;
  scholar?: string;
}

/** One EU-funded R&D project (funding-disclosure page). Official titles,
 * programmes, numbers and amounts are locale-invariant; only `summary` is
 * translated. `fundingKind` selects the label (EU funding vs co-financing). */
export interface EuProject {
  title: string;
  /** Description paragraphs shown before the task list. */
  paragraphs: string[];
  /** Optional research-task list, with an intro line. */
  tasksIntro?: string;
  tasks?: string[];
  /** Description paragraphs shown after the task list (outcome, advantage). */
  paragraphsAfter?: string[];
  beneficiary: string;
  programme: string;
  action: string;
  number: string;
  institution?: string;
  value: string;
  funding: string;
  fundingKind: 'eu' | 'cofinancing';
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
  /** 5 plain-language scroll-step captions (business audience; step 1 = ingest). */
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
  /** Event-driven scenario: an inbox that receives two forwarded emails. */
  inboxLabel: string;
  /** 2 forwarded-email subject lines — event 1 (order), event 2 (invoice). */
  emails: string[];
  /** "waiting for the matching invoice" note shown while the agent watches. */
  waitNote: string;
  /** Agent state chips: watching (step 3) and acting (step 5). */
  agentWatch: string;
  agentAct: string;
}

/** One open-source project (software / OSS page). */
export interface OssProject {
  name: string;
  /** Expanded name / one-line tagline. */
  tagline: string;
  description: string;
  /** External project URL. */
  href: string;
  /** Tech chips, e.g. ['Rust', 'Python', 'TypeScript']. */
  stack: string[];
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
    /** Header/footer link to the EU-funding disclosure page. */
    euProjects: string;
    /** Header/footer link to the open-source / software page. */
    oss: string;
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
    /** Per-card link label on the landing teaser. */
    learnMore: string;
    /** Meta for the dedicated /products/ page. */
    metaTitle: string;
    metaDescription: string;
  };

  /** Shared "data ingestion" scene that opens both product demos. */
  ingest: {
    label: string;
    /** 4 source-type chips: documents, systems/DB, images, recordings. */
    types: string[];
    /** Emphasised chip — forward an email straight to the system. */
    email: string;
    /** One-line explainer under the chips. */
    note: string;
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
    teamLabel: string;
    team: TeamMember[];
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

  /** EU-funding disclosure page (/eu-project/). */
  eu: {
    metaTitle: string;
    metaDescription: string;
    tag: string;
    h1: string;
    intro: string;
    /** EU emblem caption ("Co-funded by the European Union"). */
    coFunded: string;
    /** Standard co-funding statement shown per project. */
    disclosure: string;
    backHome: string;
    beneficiaryLabel: string;
    programmeLabel: string;
    actionLabel: string;
    numberLabel: string;
    institutionLabel: string;
    valueLabel: string;
    euFundingLabel: string;
    cofinancingLabel: string;
    scopeLabel: string;
    projects: EuProject[];
  };

  /** Open-source / software page (/open-source/). */
  oss: {
    metaTitle: string;
    metaDescription: string;
    tag: string;
    h1: string;
    intro: string;
    stackLabel: string;
    visit: string;
    backHome: string;
    projects: OssProject[];
  };
}
