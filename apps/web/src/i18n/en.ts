import type { Content } from './types';

export const en: Content = {
  lang: 'en',

  meta: {
    title: 'Causality — Applied AI, research-grade software',
    description:
      'Machine-learning researchers and software engineers who put state-of-the-art AI to work in your business. SIEVE for on-premise semantic search; STRUCTURA for structured extraction and agents.',
    ogTitle: 'Causality — Applied AI, research-grade software',
    ogDescription:
      'ML researchers and software engineers putting state-of-the-art AI to work — on-premise capable.',
    ogLocale: 'en',
    ogLocaleAlternate: 'pl',
  },

  nav: {
    services: 'Services',
    products: 'Products',
    approach: 'Approach',
    about: 'About',
    contact: 'Contact',
    talkToUs: 'Talk to us',
    primaryLabel: 'Primary',
    skipToContent: 'Skip to content',
    langLabel: 'Language',
    talkToUsAria: 'Talk to us — email hello@causality.pl',
  },

  hero: {
    eyebrow: 'APPLIED AI · RESEARCH-GRADE SOFTWARE',
    h1: 'Close the gap between your business and modern AI.',
    lead: 'We are machine-learning researchers and software engineers. We put state-of-the-art AI to work in your daily operations — so you grow, without the pain.',
    ctaPrimary: 'Talk to us',
    ctaSecondary: 'See the products',
    motifTitle: 'Causality — a semantic vector field forming a brain-and-gear silhouette',
    motifDesc:
      'Scattered vector nodes on a faint grid; a few lime nodes are joined by lime edges that resolve into the Causality brain-and-gear mark.',
    spec: {
      labelFocus: 'FOCUS',
      labelMode: 'MODE',
      labelDeploy: 'DEPLOY',
      labelBased: 'BASED',
      focus: 'Applied AI',
      mode: 'Bespoke + Products',
      deploy: 'Cloud or On-prem',
      based: 'EU',
      statusLabel: 'STATUS',
      statusValue: 'AVAILABLE',
    },
  },

  trust: {
    label: 'POSITION',
    line: 'Research-grade AI, built to run inside your business.',
    chips: ['EU-BASED', 'ON-PREM CAPABLE', 'RESEARCH-LED', 'BESPOKE + PRODUCTS'],
  },

  services: {
    tag: '§03 / SERVICES',
    h2: 'Four ways we put modern AI to work.',
    items: [
      {
        ref: 'SVC-01',
        title: 'Bespoke Applied-AI Software',
        summary: 'State-of-the-art methods, engineered into your product and your workflows.',
        keys: ['custom models', 'integration', 'production-grade'],
        primary: true,
      },
      {
        ref: 'SVC-02',
        title: 'AI Research',
        summary: 'Published-lab rigour, aimed at your hardest and most specific problems.',
        keys: ['evaluation', 'novel methods', 'benchmarking'],
      },
      {
        ref: 'SVC-03',
        title: 'Software Development',
        summary: 'Reliable, maintainable systems around the models — not notebooks.',
        keys: ['APIs', 'pipelines', 'MLOps'],
      },
      {
        ref: 'SVC-04',
        title: 'Ready-to-Use Products',
        summary: 'SIEVE and STRUCTURA — state-of-the-art AI your team can use today.',
        keys: ['SIEVE', 'STRUCTURA', 'on-prem'],
      },
    ],
  },

  productsIntro: {
    tag: '§04 / PRODUCTS',
    h2: 'Two products, documented.',
    frame:
      'State-of-the-art methods, packaged so your team can use them today. Below: what each does, its specifications, and how it deploys.',
  },

  sieve: {
    ref: 'PRD/SIEVE',
    name: 'SIEVE',
    h3: 'Semantic search & data understanding.',
    body: 'SIEVE searches and understands your data by meaning, not keywords, using our proprietary vector spaces. It indexes text, documents, and multimodal content into a semantic space where the right answer is the nearest neighbour.',
    specCaption: 'SIEVE — capability specifications',
    specHeadCapability: 'CAPABILITY',
    specHeadDetail: 'DETAIL',
    specs: [
      { capability: 'Semantic search', detail: 'Query by meaning; nearest-neighbour retrieval' },
      { capability: 'Multimodal indexing', detail: 'Text, documents, images, and more' },
      { capability: 'Vector spaces', detail: 'Proprietary embeddings, tuned to your domain' },
      {
        capability: 'Deployment',
        detail: 'Fully on-premise — data never leaves your infrastructure',
        highlight: true,
      },
    ],
    cta: 'Talk to us about SIEVE',
    ctaAria: 'Talk to us about SIEVE — email hello@causality.pl',
    diagramTitle: 'SIEVE on-premise architecture — data never leaves the customer perimeter',
    diagramDesc:
      'A schematic. A dashed customer-perimeter boundary encloses the data store and SIEVE. A query vector snaps to its nearest neighbour inside the perimeter. An arrow attempting to leave the perimeter is blocked and labelled NO DATA EGRESS.',
    diagramSummary:
      'How it deploys: SIEVE runs entirely inside your infrastructure. Your data store and the semantic index sit within a customer perimeter; queries resolve to their nearest neighbour in-place. Nothing crosses the boundary — there is no data egress.',
    perimeterLabel: 'CUSTOMER PERIMETER',
    egressLabel: 'NO DATA EGRESS',
    perimeterDataStore: 'DATA STORE',
    perimeterQuery: 'QUERY',
    perimeterBlocked: 'blocked at perimeter',
    demo: {
      plateTitle: 'SIEVE · SEMANTIC SEARCH',
      badge: 'RUNNING LOCALLY · NO DATA LEAVES YOUR BROWSER',
      meter: '0 REQUESTS',
      presetsLabel: 'SAMPLE QUERY',
      clusters: ['INFRASTRUCTURE', 'SEARCH', 'DATA PRIVACY', 'MULTIMODAL'],
      narrateIdle:
        'Pick a sample query, then press Run — SIEVE finds the closest documents by meaning.',
      steps: [
        'Ask a question the way you’d say it out loud — no keywords, no special syntax.',
        'SIEVE reads it for meaning and places it on a map of your documents by topic.',
        'It instantly surfaces the closest matches — even when the exact words differ.',
        'And it all runs inside your own systems — your data never leaves.',
      ],
      presets: [
        'on-prem vector database',
        'find documents by meaning',
        'keep customer data private',
        'search images and audio',
      ],
      docs: [
        'on-prem vector database',
        'kubernetes cluster config',
        'air-gapped deployment',
        'nearest-neighbour retrieval',
        'semantic ranking',
        'embedding index build',
        'GDPR data residency',
        'PII redaction',
        'access-control policy',
        'image embedding',
        'audio transcript search',
        'PDF table extraction',
      ],
      laneQuery: 'QUERY',
      laneEmbed: 'EMBED · dim 16 (demo)',
      laneSpace: 'SEMANTIC SPACE · nearest neighbour',
      btnRun: 'Run search',
      btnRunAria: 'Run semantic search on the selected query',
      btnReplay: 'Replay',
      btnReset: 'Reset',
      btnResetAria: 'Reset the demo',
      resultsTitle: 'RANKED RESULTS',
      colRank: 'RANK',
      colDoc: 'DOCUMENT',
      colScore: 'COSINE',
      nearest: 'NEAREST',
      liveSet: 'Query set: {q}',
      liveSearching: 'Searching locally',
      liveResult: 'Top match: {n1}, cosine {s1}. Three nearest neighbours found. No data was sent.',
      figureTitle: 'SIEVE semantic search — a query resolves to its nearest neighbours, locally',
      figureDesc:
        'A 2D semantic space of twelve topic-clustered documents. A sample query is dropped in and its three nearest neighbours are highlighted with cosine similarity scores. All computation runs in the browser.',
      figcaptionTpl:
        'How it works: SIEVE turns your query into a vector and finds the nearest documents by meaning. Here, ‘{q}’ matches ‘{n1}’ (cosine {s1}), ‘{n2}’ ({s2}) and ‘{n3}’ ({s3}). Everything runs locally — no data leaves your browser.',
    },
  },

  structura: {
    ref: 'PRD/STRUCTURA',
    name: 'STRUCTURA',
    h3: 'Structured extraction, knowledge bases & agents.',
    body: 'STRUCTURA turns unstructured, multimodal data into a structured knowledge base — then runs custom agents that use that knowledge to take actions on the web and automate daily work.',
    specCaption: 'STRUCTURA — capability specifications',
    specHeadCapability: 'CAPABILITY',
    specHeadDetail: 'DETAIL',
    specs: [
      { capability: 'Input', detail: 'Unstructured, multimodal data' },
      { capability: 'Extraction', detail: 'Structured fields, entities, relations' },
      { capability: 'Knowledge base', detail: 'Queryable, connected to SIEVE spaces' },
      {
        capability: 'Agents / automation',
        detail: 'Custom agents act on the web, automate workflows',
        highlight: true,
      },
    ],
    cta: 'Talk to us about STRUCTURA',
    ctaAria: 'Talk to us about STRUCTURA — email hello@causality.pl',
    diagramTitle: 'STRUCTURA pipeline — from unstructured data to agents that act',
    diagramDesc:
      'A left-to-right pipeline. Scattered document, image, and audio glyphs resolve into an ordered knowledge graph, which flows to an agent node that takes actions on the web.',
    diagramSummary:
      'How it flows: unstructured multimodal input is extracted into structured fields and relations, assembled into a queryable knowledge base, and handed to custom agents that act on the web to automate daily work.',
    stages: [
      'Unstructured multimodal input',
      'Extraction into structured fields',
      'Assembled into a queryable knowledge base',
      'Agent reads and updates the knowledge base',
      'Agent acts on the web to automate the task',
    ],
    demo: {
      label: 'STRUCTURA · INTERACTIVE WALKTHROUGH',
      intro:
        'An example: step through it — three messy sources become a knowledge graph, and an agent reads it, updates it, and acts.',
      statusReady: 'READY · press Play or step through',
      stepReadout: 'STEP {n} / 5',
      captions: [
        'INPUT · 3 sources · PO.pdf, pallet.jpg, vm.m4a',
        'EXTRACT · 7 fields · 3 entities · 2 relations',
        'KNOWLEDGE BASE · 5 nodes · 5 relations · queryable',
        'AGENT · read Order→Invoice · wrote status=DUE',
        'ACTION · typed INV-2231 · clicked Schedule → SCHEDULED',
      ],
      sr: [
        'Step 1 of 5. Three unstructured sources arrive: a purchase-order PDF, a photo of a pallet, and a voicemail clip.',
        'Step 2 of 5. STRUCTURA extracts seven structured fields — supplier, order, product, quantity, amount, invoice, shipment.',
        'Step 3 of 5. The fields assemble into a queryable knowledge graph of five connected entities.',
        'Step 4 of 5. The agent reads from Order to Invoice, finds invoice INV-2231 is unpaid and now due, and writes a new status DUE into the knowledge base.',
        'Step 5 of 5. Using what it learned, the agent enters invoice INV-2231 into the payment form and clicks Schedule. The payment is now scheduled. This is an illustrative example, not a live transaction.',
      ],
      nodes: [
        'Supplier · Acme Foods',
        'Order · PO-4471',
        'Product · Frozen Peas ×1200',
        'Invoice · INV-2231 · €8,420',
        'Shipment · SH-889',
        'STATUS · DUE',
      ],
      anchor: 'ANCHOR',
      rels: ['supplies', 'contains', 'billed-by', 'ships', 'status'],
      browserUrl: 'pay.acme-erp.internal',
      browserField: 'Invoice #',
      browserButton: 'Schedule payment',
      browserButtonDone: 'SCHEDULED',
      ctrlPrev: 'Previous step',
      ctrlNext: 'Next step',
      ctrlPlay: 'Play walkthrough',
      ctrlPause: 'Pause walkthrough',
      ctrlReplay: 'Replay walkthrough from start',
      hintKeyboard: 'Use arrow keys to step; the Play button toggles playback.',
      laneInput: 'INPUT',
      laneGraph: 'KNOWLEDGE GRAPH',
      laneAction: 'AGENT ACTION',
      agentLabel: 'AGENT',
      extractChips: ['Supplier', 'Order', 'Quantity', 'Amount', 'Invoice'],
      figcaption:
        'How it flows: unstructured multimodal input is extracted into structured fields and relations, assembled into a queryable knowledge base, and handed to custom agents that read it, update it, and act on the web to automate daily work. The scenario shown is an illustrative example.',
    },
  },

  about: {
    tag: '§07 / ABOUT',
    h2: 'A team of researchers and engineers.',
    body: 'We are a group of experienced machine-learning researchers and software developers closing the gap between businesses and modern software solutions. Our services let you use state-of-the-art AI in daily work to grow the business — without pain.',
    roster: ['Research', 'ML Engineering', 'Software', 'Product'],
  },

  approach: {
    tag: '§08 / APPROACH',
    h2: 'From your problem to a running system.',
    steps: [
      {
        n: '01',
        title: 'Scope & research',
        body: 'We study your data and problem, and tell you honestly whether AI is the right tool.',
      },
      {
        n: '02',
        title: 'Build',
        body: 'Bespoke system or one of our products — engineered to ship, not a demo.',
      },
      {
        n: '03',
        title: 'Deploy & support',
        body: 'Cloud or fully on-premise. You own it; we support it.',
      },
    ],
  },

  finalCta: {
    tag: '§09 / CONTACT',
    h2: "Let's talk about your data.",
    sub: "Tell us the problem. We'll tell you honestly whether AI is the right tool — and how to keep your data yours.",
    ctaPrimary: 'Talk to us',
    reassurance: 'ONE EMAIL. A REAL ENGINEER REPLIES.',
  },

  footer: {
    tagline: 'Applied AI, research-grade software.',
    productsTitle: 'Products',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    copyright: '© 2026 Causality. All rights reserved.',
  },
};
