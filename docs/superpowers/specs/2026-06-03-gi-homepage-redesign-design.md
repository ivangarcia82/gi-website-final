# Generando Ideas — Homepage Redesign (Apple-grade)

**Date:** 2026-06-03
**Status:** Approved direction — pending spec sign-off
**Scope:** Global design-system evolution + Homepage (`/`) flagship. Inner pages roll out in a later cycle reusing the new system.
**Branch:** `redesign/homepage-apple`

---

## 1. Goal

Rebuild the Generando Ideas homepage to feel like a high-end Apple product page — cinematic scroll choreography, generous spatial discipline, premium materials — **while preserving the brand's existing palette, content, and warm personality**. The current site is a competent Astro replica of a Claude Design prototype; this redesign raises it from "good" to "memorable / award-grade."

Success = a visitor scrolling the homepage experiences deliberate, physics-driven motion (not decorative jiggle), reads a clear story (one-stop promo partner → services → catalogs → process → proof → close), and the page feels expensive on both desktop and mobile.

## 2. Hard Constraints (do not violate)

- **Palette unchanged.** Brand blue `#0b5fbf`, orange `#f39200`, magenta `#ff3b8b`, mint `#00c896`, warm neutrals on paper `#fafaf7`. Tokens in `src/styles/global.css` `:root` stay as the source of truth.
- **Content preserved.** All copy, stats, services, catalogs, testimonials, offices in `src/data/site.ts` are reused. Two *new* sections (impact band, closing CTA) are assembled from existing data — no invented facts.
- **Stack stays Astro** (static output, `astro@^5.13`). No framework migration. Vanilla TS islands + GSAP/Lenis only.
- **Spanish (`lang="es"`).** Fix English leaks in the current hero/nav (`★ Your one-stop solution`, `Your brand here.`) → Spanish equivalents.
- **Accessibility & reduced motion.** Everything must work and read with `prefers-reduced-motion: reduce` (all scroll choreography degrades to static or simple fades). Keyboard-navigable nav + mobile drawer. Contrast AA on text.
- **No emojis** in markup/content (per taste skill). Icons = inline SVG primitives (current site already uses inline SVG; keep that — no new icon dependency required).

## 3. Approved Decisions

| Decision | Choice |
|---|---|
| Hero | **B — Cinematic Stage** (headline top, wide product stage that fades into paper, zoom-parallax on scroll) |
| Scope | Homepage flagship first; design system built to be reused by inner pages later |
| Aesthetic | **Confident blend** — Apple spatial discipline + brand color energy as deliberate accents |
| Body font | **Inter → Geist** (display **Space Grotesk** kept, mono **JetBrains Mono** kept). Reversible. |
| Motion engine | **GSAP + ScrollTrigger + Lenis** smooth-scroll, loaded only on pages that need it |
| New sections | Impact/stats band, strong closing CTA |
| Mobile nav | Real animated drawer (replaces current `display:none` link-hiding) |

## 4. Design System Evolution

The redesign **extends** `global.css` rather than replacing it. New work lives in additive layers so inner pages keep rendering until migrated.

### 4.1 Typography
- **Display:** Space Grotesk (unchanged) — 600/700, `letter-spacing: -0.03em`, `line-height: 0.9–0.95`.
- **Body:** Geist (new) replacing Inter. Loaded via Google Fonts `Geist:wght@400;500;600`, `--font-body` updated. Self-host fallback documented if CDN unavailable; system-ui fallback in the stack already.
- **Mono:** JetBrains Mono (unchanged) — eyebrows, labels, stat units, numeric data.
- **Scale:** keep `clamp()` fluid display sizes. Hero h1 `clamp(48px, 6.5vw, 104px)`. Section h2 `clamp(38px, 5vw, 72px)`.

### 4.2 Color usage rules
- Warm paper canvas; color used as **deliberate accent**, not decoration. Max one dominant accent per section.
- Retire the hero's 3-blob rainbow (`blob-1/2/3`) → replaced by Cinematic Stage. Keep one optional soft single-hue tint where a section needs warmth.
- Light/dark rhythm across the page (see 5).

### 4.3 Materials
- Surfaces: `--radius-lg`/`--radius-xl` (28–40px) on major containers; keep existing radii tokens.
- Shadows: tinted to brand blue (existing `--shadow-*` already do `rgba(6,46,95,…)`). Add a wide "diffusion" shadow utility for floated cards.
- Glass: nav uses true refraction glass — `backdrop-blur` + 1px inner border (`border-white/?`) + `inset 0 1px 0 rgba(255,255,255,.x)` (taste skill "Liquid Glass").

### 4.4 Motion engine (new)
- `Lenis` for smooth scroll, initialized once globally in a client island; respects reduced-motion (disabled → native scroll).
- `GSAP` + `ScrollTrigger` for pin/scrub/draw/parallax. **No `window.addEventListener('scroll')`.**
- All scroll triggers registered in **isolated client `<script>` modules** with strict teardown (kill triggers + Lenis on `astro:before-swap`/unload). Animate only `transform`/`opacity`.
- Spring/eased feel: GSAP eases (`power3.out`, custom `cubic-bezier(0.16,1,0.3,1)`); magnetic CTA via pointer math on `transform` only (no React, no per-frame state in DOM attributes).
- Perpetual micro-motion (marquee, count shimmer) isolated, paused when offscreen / reduced-motion.

## 5. Homepage Section Spec

Order top→bottom. Each section: content source, layout, motion mechanic, responsive collapse, states.

1. **Nav (`Nav.astro` upgrade)** — `NAV_ITEMS`, logo, accent "Ver catálogo" CTA. Glass sticky; subtle shrink (height 76→64) on scroll past hero; dock-style hover scale on links; **magnetic** CTA. New: hamburger → full animated mobile drawer (slide/fade, focus-trapped, `aria-expanded`, Esc to close, body scroll lock). Mechanic: sticky + shrink. Mobile: drawer.

2. **Hero — Cinematic Stage (`Hero.astro` rewrite)** — eyebrow `Una sola ventanilla · 12+ años`; h1 `Ideas que tu marca se lleva puesta.` (gradient on "marca", but constrained — gradient only on the single word, never a whole header); sub from current copy; CTAs `Ver catálogo` (ink) + `Cotiza tu proyecto` (ghost). Wide product **stage** image (`IMAGES.img36`) bleeding edge-to-edge, fading into paper via mask. Overlaid glass badge (`+5,000 productos`) + stat chips (11 catálogos / 4 oficinas). Mechanic: **zoom-parallax** — on scroll the stage image scales up slightly and the next section rises over it (`min-h-[100dvh]`, never `h-screen`). Reduced-motion: static image, no scale. Mobile: headline stacks above a shorter stage; stat chips wrap.

3. **Ticker (`Ticker.astro` upgrade)** — `TICKER_WORDS` on ink band. Mechanic: marquee whose speed responds to **scroll velocity** (GSAP, transform-only, seamless `-50%` loop). Reduced-motion: static or slow constant.

4. **Servicios (`ServicesShowcase` → pinned variant)** — `SERVICES` (5). Desktop: section **pins** and vertical scroll drives a **horizontal pan** across 5 color-coded service stages (blue/orange/paper/ink/mint per existing `tone`). Each stage: num, title, desc, "Conocer más →" link to `/servicios/{id}`. Mobile (`<768px`): pin disabled → clean vertical stack of 5 (no horizontal scroll). Mechanic: pin + horizontal pan + per-stage reveal. States: links always functional without JS.

5. **Catálogos (`CatalogsCarousel` upgrade)** — `CATALOGS` (11) + `cat-filter` tags. Horizontal **drag + inertia** gallery (Lenis-aware), subtle depth/scale on the focused card, prev/next buttons retained (keyboard + disabled-end states). Mechanic: drag + inertia. Empty/edge: buttons disable at track ends. Mobile: native swipe, snap.

6. **Proceso (`ProcessSection` upgrade) — DARK** — 4 steps (keep existing copy: discovery→propuesta→producción→entrega, exact text from current component). On ink background, an **SVG path draws itself** connecting the 4 steps as you scroll, steps reveal in **stagger**. Mechanic: SVG draw + stagger. Reduced-motion: path drawn instantly, steps visible.

7. **Impacto (NEW) — DARK** — assembled from existing facts only: `12+` años, `+5,000` productos (from service copy), `80%` recompra (from home copy "más del 80%"), `4` oficinas (from `OFFICES`). Big numeric display with **count-up on enter** (mono units). Mechanic: count-up (IntersectionObserver-triggered, transform/opacity only). Reduced-motion: final numbers shown immediately.

8. **Testimonios (`TestimonialsCarousel` upgrade)** — `TESTIMONIALS` (4). Editorial carousel: large Space Grotesk quote, gradient-initial avatar (no generic icons), **auto-advance with progress bar** + manual controls, pauses on hover/focus. Mechanic: auto-advance + progress. Reduced-motion: no auto-advance, manual only.

9. **Cierre / CTA (NEW)** — strong closing band. Headline e.g. `¿Listo para que tu marca se lleve puesta?` (reuses brand voice, no filler words), **magnetic** primary CTA → `/contacto`, secondary → `/catalogo`. Mechanic: mask/clip reveal of headline + magnetic button. Color: blue or ink block for punch.

10. **Footer (`Footer.astro` refine)** — keep structure: giant `Generando Ideas` wordmark (italic orange "Ideas"), nav columns, offices, contact (`BRAND`). Subtle reveal on enter. Minor spacing/type polish only.

## 6. Architecture & Files

```
src/
  styles/
    global.css            # extended: --font-body→Geist, new utilities (glass, diffusion shadow, dark sections)
    motion.css            # NEW: reveal/parallax/marquee base states + reduced-motion overrides
  lib/
    motion.ts             # NEW: Lenis init + GSAP/ScrollTrigger registration helpers + teardown
  components/
    Nav.astro             # upgrade: glass shrink + mobile drawer (drawer logic in island)
    MobileMenu.astro      # NEW: client island (drawer markup + open/close, focus trap)
    Hero.astro            # rewrite: Cinematic Stage + zoom-parallax island
    Ticker.astro          # upgrade: velocity marquee island
    ServicesShowcase.astro# upgrade: pinned horizontal pan (mosaic fallback retained for inner use)
    CatalogsCarousel.astro# upgrade: drag+inertia
    ProcessSection.astro  # upgrade: dark + SVG draw
    ImpactBand.astro      # NEW: count-up stats (dark)
    TestimonialsCarousel.astro # upgrade: auto-advance + progress
    ClosingCTA.astro      # NEW: magnetic CTA closing band
    Footer.astro          # refine
  pages/index.astro       # recompose flow 1–10
```

- **Dependencies (must install):** `gsap`, `lenis`. Verified absent from `package.json` (only `astro`). Install command: `npm install gsap lenis`. (Astro can import these in client `<script>`s.)
- **Isolation:** All motion runs in per-component client `<script>` modules (Astro ships them to the browser). Server output stays static HTML. Each script: feature-detect reduced-motion, register, and clean up on page nav.
- **No global state library needed** (multi-page static site; no deep prop-drilling). Skip zustand/etc.

## 7. Interaction States (mandatory)

- **Mobile drawer:** closed/opening/open/closing; focus trap; Esc + backdrop close; `aria` wired.
- **Catalog filter / carousel:** active tag state; nav buttons disabled at track ends; empty-tag → graceful "no hay resultados" (only if a filter can empty, which current data won't, but handle defensively).
- **Testimonials:** playing/paused (hover, focus, reduced-motion, offscreen).
- **CTAs:** hover (`translateY(-1px)`/shadow), `:active` tactile (`scale(0.98)`), focus-visible ring.
- **No-JS / reduced-motion:** every section renders complete and readable; all links/CTAs work; choreography becomes static or fade.

## 8. Performance & Quality Guardrails

- Animate only `transform`/`opacity`; never `top/left/width/height`.
- Grain/tint overlays (if any) on `fixed … pointer-events-none` layers only; never on scrolling containers.
- Lazy-load below-fold images; hero stage image eager. Keep image URLs from `IMAGES` (Unsplash) for now; real photography is a later content task (noted, not in scope).
- GSAP/Lenis loaded only where used; `ScrollTrigger.kill()` + `lenis.destroy()` on teardown.
- Z-index only for systemic layers (nav, drawer, lightbox).
- Pass the taste skill's pre-flight checklist before "done."

## 9. Out of Scope (this cycle)

- Inner pages (`/conocenos`, `/servicios`, `/servicios/[id]`, `/catalogo`, `/contacto`, `/blog`, `/blog/[slug]`, `/bolsa-de-trabajo`). They keep rendering on current CSS; they adopt the new system in a follow-up cycle (the design-system layer is built to support them).
- Replacing Unsplash placeholders with real product photography (content task).
- CMS/back-end, forms back-end (contact form stays client-validated as today).

## 10. Success Criteria

- [ ] Homepage delivers the 10-section flow with the specified mechanics on desktop.
- [ ] Fully usable + good-looking on mobile (single-column collapse, drawer, no horizontal overflow).
- [ ] `prefers-reduced-motion` path is clean (no motion, fully readable).
- [ ] Palette + all content preserved; English leaks fixed; no emojis.
- [ ] `npm run build` succeeds; no console errors; Lighthouse (mobile) performance not regressed vs current (target ≥ 90 perf, ≥ 95 a11y).
- [ ] Taste-skill pre-flight checklist passes.

## 11. Open Questions

- Geist via Google Fonts vs self-host — default to Google Fonts; self-host only if CDN family unavailable at build time. (Non-blocking.)
- Closing CTA color (blue block vs ink block) — decide visually during build.
