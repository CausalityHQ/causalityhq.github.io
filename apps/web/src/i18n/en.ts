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
      'Extraction',
      'Knowledge base',
      'Agents → actions on the web',
    ],
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
