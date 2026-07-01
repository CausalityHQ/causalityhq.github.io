// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://causality.pl',
  base: '/',
  trailingSlash: 'ignore',
  compressHTML: true,
  // Fonts are self-hosted via @fontsource (@font-face imported in global.css,
  // hero-critical faces preloaded in BaseLayout). No runtime external font
  // requests. See design.md §4 / §10.
  i18n: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          pl: 'pl',
        },
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
