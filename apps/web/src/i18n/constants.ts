// Locale-invariant values. These read as designators and stay in EN in both
// locales (design.md §12.1): product names, the contact email, mono ref tags,
// diagram annotations, and the datasheet colophon signature.

export const BRAND = {
  siteUrl: 'https://causality.pl',
  email: 'hello@causality.pl',
  emailHref: 'mailto:hello@causality.pl',
  emailHrefSieve: 'mailto:hello@causality.pl?subject=SIEVE',
  emailHrefStructura: 'mailto:hello@causality.pl?subject=STRUCTURA',
  productSieve: 'SIEVE',
  productStructura: 'STRUCTURA',
  docRef: 'DOC REF: CAUSALITY-LP · REV 2026.07',
  companyBlock: 'CAUSALITY · EU',
} as const;

export const LOCALES = ['en', 'pl'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
