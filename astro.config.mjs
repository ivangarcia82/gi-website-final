// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Generando Ideas — promotional-products marketing site.
// Output stays static (every page is prerendered) EXCEPT routes that opt out
// with `export const prerender = false` — currently just the contact API route,
// which runs as a Vercel serverless function so it can send email via Resend.
export default defineConfig({
  site: 'https://generandoideas.com',
  integrations: [sitemap()],
  adapter: vercel(),
  // Trailing slashes off → clean URLs like /servicios, /servicios/promo
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
