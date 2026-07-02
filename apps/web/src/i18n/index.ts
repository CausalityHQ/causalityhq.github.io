import type { Content } from './types';
import { en } from './en';
import { pl } from './pl';
import { type Locale, LOCALES, DEFAULT_LOCALE, BRAND } from './constants';

export type { Content } from './types';
export { type Locale, LOCALES, DEFAULT_LOCALE, BRAND } from './constants';

export const dictionaries: Record<Locale, Content> = { en, pl };

/** Content dictionary for a locale. */
export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

/** The single-page home URL for a locale (EN at `/`, others prefixed). */
export function localeHome(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`;
}

/** Absolute URL for a locale's home, for canonical/hreflang/OG. */
export function localeUrl(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? `${BRAND.siteUrl}/` : `${BRAND.siteUrl}/${locale}/`;
}

/** The other locale (for the language toggle on a two-locale site). */
export const OTHER_LOCALE: Record<Locale, Locale> = { en: 'pl', pl: 'en' };

/** hreflang alternates for every locale + x-default. `path` (e.g. 'eu-project/')
 * is appended to each locale root for non-home pages. */
export function hreflangAlternates(path = ''): { hreflang: string; href: string }[] {
  return [
    ...LOCALES.map((l) => ({ hreflang: l, href: `${localeUrl(l)}${path}` })),
    { hreflang: 'x-default', href: `${localeUrl(DEFAULT_LOCALE)}${path}` },
  ];
}
