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
    euProjects: 'EU projects',
    oss: 'Open source',
    primaryLabel: 'Primary',
    skipToContent: 'Skip to content',
    langLabel: 'Language',
    talkToUsAria: 'Talk to us — email research@causality.pl',
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
    h2: 'Production-grade AI, ready on day one.',
    frame:
      'SIEVE and STRUCTURA put state-of-the-art AI in your team’s hands today — search that understands meaning, and agents that turn your data into action. Deploy in the cloud or fully on your own infrastructure.',
  },

  ingest: {
    label: 'SOURCES',
    types: ['Documents', 'Systems & databases', 'Images', 'Recordings'],
    email: 'Forward an email',
    note: 'Bring in data from anywhere — files, business systems, photos, audio. Or simply forward an email to your Causality inbox, and it’s ready to use in seconds.',
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
    ctaAria: 'Talk to us about SIEVE — email research@causality.pl',
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
        'Feed it everything — documents, business systems, images, recordings. Forward an email and it’s searchable in seconds.',
        'Ask a question the way you’d say it out loud — no keywords, no special syntax.',
        'SIEVE reads it for meaning and places it on the same map as your data.',
        'The closest documents light up — even when they don’t share a single word.',
        'You get a ranked shortlist, most relevant first — and nothing ever leaves your systems.',
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
    ctaAria: 'Talk to us about STRUCTURA — email research@causality.pl',
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
        'An example that runs on its own: emails arrive over time, the agent keeps your knowledge base up to date, waits for what’s missing, and acts on the web when everything lines up.',
      statusReady: 'READY · press Play or step through',
      stepReadout: 'STEP {n} / 5',
      captions: [
        'INGEST · any source · file · system · photo · email',
        'EMAIL 1 · order confirmed · +Order +Product +Shipment',
        'AGENT · watching · awaiting the matching invoice',
        'EMAIL 2 · invoice INV-2231 · matched → Order · status DUE',
        'ACTION · portal · typed INV-2231 · Schedule → SCHEDULED',
      ],
      sr: [
        'Step 1 of 5. Data flows in from any source — files, business systems, photos, recordings, or a simply forwarded email. Everything lands in one place, ready to use.',
        'Step 2 of 5. A first email arrives: Acme confirms order PO-4471. STRUCTURA reads it and records the order, product and shipment in your knowledge base.',
        'Step 3 of 5. There’s nothing to pay yet, so the agent keeps watching — waiting for the matching invoice to arrive.',
        'Step 4 of 5. A second email lands with invoice INV-2231. The agent matches it to the order, confirms the amounts line up, and marks it Due in the knowledge base.',
        'Step 5 of 5. Now everything reconciles, so the agent opens the payment portal, enters invoice INV-2231 and schedules the payment — closing the loop end to end. This is an illustrative example, not a live transaction.',
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
      inboxLabel: 'INBOX',
      emails: ['Fwd: Order confirmation — Acme Foods', 'Fwd: Invoice INV-2231 — Acme Foods'],
      waitNote: 'Watching — waiting for the matching invoice',
      agentWatch: 'watching',
      agentAct: 'acting on the web',
      figcaption:
        'How it flows: emails and other sources arrive over time; STRUCTURA keeps a queryable knowledge base up to date, and a custom agent watches for what’s missing, reconciles it, and acts on the web to automate daily work. The scenario shown is an illustrative example.',
    },
  },

  about: {
    tag: '§07 / ABOUT',
    h2: 'A team of researchers and engineers.',
    body: 'We are a group of experienced machine-learning researchers and software developers closing the gap between businesses and modern software solutions. Our services let you use state-of-the-art AI in daily work to grow the business — without pain.',
    roster: ['Research', 'ML Engineering', 'Software', 'Product'],
    teamLabel: 'Research leaders',
    team: [
      {
        name: 'Roman Bartusiak',
        role: 'Co-founder · ML Research',
        note: 'Published ML/NLP researcher (h-index 5); co-creator of LEPISZCZE, the Polish NLP benchmark.',
        linkedin: 'https://www.linkedin.com/in/romanbartusiak/',
        scholar: 'https://scholar.google.com/citations?user=mk68epwAAAAJ&hl=en',
      },
      {
        name: 'Krzysztof Sobota',
        role: 'Co-founder · ML Engineering',
        note: 'Senior ML engineer, AGH University — delivery across our EU-funded R&D projects.',
        linkedin: 'https://www.linkedin.com/in/sobota',
      },
    ],
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

  eu: {
    metaTitle: 'EU-funded projects — Causality',
    metaDescription:
      'Research and development projects carried out by Causality with co-financing from the European Union — programmes, project numbers and funding amounts.',
    tag: '§ EU FUNDING',
    h1: 'EU-funded projects',
    intro:
      'Causality carries out research and development co-financed by the European Union. Details of our ongoing and completed EU projects are set out below.',
    coFunded: 'Co-funded by the European Union',
    disclosure: 'Project co-financed by the European Union.',
    backHome: 'Back to home',
    beneficiaryLabel: 'Beneficiary',
    programmeLabel: 'Programme',
    actionLabel: 'Action',
    numberLabel: 'Project number',
    institutionLabel: 'Implementing authority',
    valueLabel: 'Project value',
    euFundingLabel: 'EU funding',
    cofinancingLabel: 'EU co-financing',
    scopeLabel: 'Scope',
    projects: [
      {
        title:
          'Developing a flexible, general-purpose method for generating high-quality, reliable text and image data to build commercial machine-learning solutions',
        paragraphs: [
          'CAUSALITY PROSTA SPÓŁKA AKCYJNA has received EU funding for the project “Development of a flexible and universal method for generating high-quality, reliable text and image data for building commercial machine-learning solutions”, under the European Funds for a Modern Economy 2021–2027 programme, Priority: Support for entrepreneurs, Action: SMART Path, no. FENG.01.01-IP.02-2364/23.',
          'The project sets out to develop a flexible, general-purpose method for generating high-quality, reliable text and image data for building commercial machine-learning (ML) solutions.',
        ],
        tasksIntro: 'The solution is delivered through four research tasks:',
        tasks: [
          'Developing generative models that produce synthetic text data from user-supplied patterns, preserving semantic correctness and minimising hallucination (industrial research).',
          'Integrating the text-generation solution into a complete, microservice-based architecture (development work).',
          'Developing generative models that produce synthetic visual data (images) from user-supplied patterns, preserving semantic correctness and minimising hallucination (industrial research).',
          'Integrating the visual-data-generation solution into a complete, microservice-based architecture (development work).',
        ],
        paragraphsAfter: [
          'The result of the project will take the form of a web platform with an API, brought to market by Causality. It will first be offered to companies building artificial-intelligence (AI) software, including ML, letting them broaden their customer base and speed up development of such software. Its general-purpose nature makes it applicable to any industry, and it is especially useful in areas that demand very high accuracy (e.g. medicine, finance, industry) and where training data is scarce or of poor quality.',
          'The approach taken to synthetic-data generation will provide a competitive advantage by ensuring higher quality and reliability of the generated data.',
        ],
        beneficiary: 'CAUSALITY PROSTA SPÓŁKA AKCYJNA',
        programme: 'Fundusze Europejskie dla Nowoczesnej Gospodarki 2021–2027',
        action: 'Priorytet: Wsparcie dla przedsiębiorców · Działanie: Ścieżka SMART',
        number: 'FENG.01.01-IP.02-2364/23',
        value: '10 052 632,00 PLN',
        funding: '7 223 363,75 PLN',
        fundingKind: 'eu',
      },
      {
        title: 'A semantic search and data-exploration engine accessible to business users',
        paragraphs: [
          'CAUSALITY PROSTA SPÓŁKA AKCYJNA carried out the project “A semantic search and data-exploration engine accessible to business users” under Action 1.1: R&D projects of enterprises, Sub-action 1.1.1 — industrial research and development work carried out by enterprises — of the Smart Growth Operational Programme 2014–2020.',
          'The project was co-financed by the European Union under call 1/1.1.1/2022 — Fast Track — Digital Innovations.',
        ],
        beneficiary: 'CAUSALITY PROSTA SPÓŁKA AKCYJNA',
        programme: 'Program Operacyjny Inteligentny Rozwój 2014–2020',
        action: 'Działanie 1.1: Projekty B+R przedsiębiorstw · Poddziałanie 1.1.1',
        number: 'POIR.01.01.01-00-0178/22',
        institution: 'Narodowe Centrum Badań i Rozwoju',
        value: '5 520 888,16 PLN',
        funding: '4 181 246,47 PLN',
        fundingKind: 'cofinancing',
      },
    ],
  },

  oss: {
    metaTitle: 'Open source — Causality',
    metaDescription:
      'Open-source software from Causality, including BORSUK — a Rust similarity-search engine that streams vectors from Parquet on disk or S3-compatible storage.',
    tag: '§ OPEN SOURCE',
    h1: 'Open-source software',
    intro:
      'We build in the open. These are the projects our research and engineering work has spun out — free to use, inspect and build on.',
    stackLabel: 'STACK',
    visit: 'Visit project',
    backHome: 'Back to home',
    projects: [
      {
        name: 'BORSUK',
        tagline: 'Blob-Oriented Retrieval with Segmental Unified KNN',
        description:
          'A similarity-search engine written in Rust that keeps memory use low by reading vector blocks straight from Parquet files — on local disk or S3-compatible object storage (AWS S3, MinIO, SeaweedFS) — instead of loading everything into RAM. It ships native Python (PyO3) and TypeScript (N-API) APIs and a rich set of metrics: dense-vector, histogram, set-like and string similarity.',
        href: 'https://causality.pl/borsuk/',
        stack: ['Rust', 'Python', 'TypeScript', 'Parquet', 'S3'],
      },
    ],
  },
};
