import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/.astro/**',
      '**/.turbo/**',
      '**/node_modules/**',
      '**/.lighthouseci/**',
      'pnpm-lock.yaml',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  // Accessibility rules for Astro templates (jsx-a11y ported to .astro)
  ...astro.configs['jsx-a11y-recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      // Astro components legitimately use undefined component-scoped names in frontmatter
    },
  },
);
