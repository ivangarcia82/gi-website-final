// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Generando Ideas — fully static promotional-products marketing site (output → dist).
// The contact form posts to a native Vercel Serverless Function at /api/contact
// (see ./api/contact.js), which lives outside Astro and is auto-detected by
// Vercel — so no SSR adapter is needed.
export default defineConfig({
  site: 'https://generandoideas.com',
  integrations: [sitemap()],
  // Trailing slashes off → clean URLs like /servicios, /servicios/promo
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
