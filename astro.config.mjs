// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Generando Ideas — static promotional-products marketing site.
// Faithful Astro replica of the Claude Design HTML/CSS/JS prototype.
export default defineConfig({
  site: 'https://generandoideas.com',
  integrations: [sitemap()],
  // Trailing slashes off → clean URLs like /servicios, /servicios/promo
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
