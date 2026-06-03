# Generando Ideas — Sitio web (Astro)

Réplica fiel en [Astro](https://astro.build) del prototipo de **Generando Ideas**, una empresa
mexicana de artículos promocionales. El diseño original se mockupeó en Claude Design (React +
Babel + CSS) y aquí se reconstruyó como un sitio estático multipágina, manteniendo el sistema
visual, las animaciones y todas las interacciones.

## Requisitos

- Node.js `>=18.20.8` (probado con v20)
- npm

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build estático a ./dist
npm run preview    # previsualizar el build de producción
```

## Estructura

```
src/
  data/site.ts            # toda la data del sitio (catálogos, servicios, productos,
                          # testimonios, oficinas, blog, vacantes) + mapa de imágenes
  styles/global.css       # sistema de diseño completo (port de styles.css del prototipo)
  layouts/Layout.astro    # shell HTML: head, fuentes, Nav, Footer, scripts globales
  components/
    Nav.astro, Footer.astro, Logo.astro
    Hero.astro, Ticker.astro, ProcessSection.astro
    ServicesShowcase.astro          # 3 layouts: mosaic (default) / list / stacked
    CatalogsCarousel.astro, TestimonialsCarousel.astro
    MexicoMap.astro                 # mapa SVG interactivo de oficinas
  pages/
    index.astro                     # Inicio
    conocenos.astro                 # Conócenos
    servicios/index.astro           # Servicios
    servicios/[id].astro            # Detalle por servicio (promo, fulfillment, …)
    catalogo.astro                  # Catálogo (carrusel + filtro + lightbox)
    contacto.astro                  # Contacto (formulario validado + mapa)
    blog/index.astro                # Blog (filtro por categoría)
    blog/[slug].astro               # Artículo
    bolsa-de-trabajo/index.astro    # Bolsa de trabajo
    bolsa-de-trabajo/[id].astro     # Detalle de vacante
public/
  favicon.svg
```

## Interacciones (vanilla JS, sin frameworks en el cliente)

- **Scroll reveal** y **carruseles** (catálogos / testimonios) — `Layout.astro`
- **Catálogo**: filtro por categoría + lightbox de producto/catálogo — `catalogo.astro`
- **Contacto**: validación de formulario con mensajes de error + estado de éxito; mapa de México
  con selección de oficina sincronizada con la lista — `contacto.astro`
- **Blog**: filtro por categoría que re-renderiza destacado + grid — `blog/index.astro`

## Decisiones de replicación

- **SPA → multipágina**: el prototipo era una SPA de React con ruteo en cliente (`go(page)`). En
  Astro se reconstruyó como sitio multipágina con file-based routing y URLs limpias en español
  (`/conocenos`, `/servicios/promo`, `/bolsa-de-trabajo`, …) — mejor SEO y navegación nativa.
- **Sin React en el cliente**: las interacciones se reimplementaron en JavaScript vanilla. El
  sitio publicado no carga React/Babel; es HTML/CSS + scripts ligeros.
- **Panel "Tweaks" omitido**: el toggle de layout de servicios (mosaic/list/stacked) era una
  herramienta del editor de Claude Design (se comunicaba con la ventana padre vía `postMessage`),
  no parte del sitio. Se usa el layout `mosaic` por defecto; los tres layouts siguen disponibles
  como prop en `ServicesShowcase`.
- **Imágenes**: se referencian las mismas URLs de Unsplash del prototipo (ver `IMAGES` en
  `src/data/site.ts`, exactas a `__metas.txt`). Para producción real conviene sustituirlas por
  fotografía propia del catálogo.

## Paleta y tipografía

- Azul corporativo `#0b5fbf`, naranja `#f39200`, acento magenta `#ff3b8b`, menta `#00c896`,
  neutros cálidos sobre papel `#fafaf7`.
- **Space Grotesk** (display), **Inter** (cuerpo), **JetBrains Mono** (etiquetas/mono).
