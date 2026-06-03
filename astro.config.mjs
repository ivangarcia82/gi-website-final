// @ts-check
import { defineConfig } from 'astro/config';

// Generando Ideas — static promotional-products marketing site.
// Faithful Astro replica of the Claude Design HTML/CSS/JS prototype.
export default defineConfig({
  site: 'https://generandoideas.com',
  // Trailing slashes off → clean URLs like /servicios, /servicios/promo
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
});
