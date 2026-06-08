# Generando Ideas — Inner-Pages Rollout Playbook

**Date:** 2026-06-03
**Cycle:** Apply the approved homepage design system to all inner pages.
**Depends on:** `2026-06-03-gi-homepage-redesign-design.md` (the design language) — already shipped.
**Branch:** `redesign/homepage-apple`

## Intent
Bring every inner page up to the homepage's quality bar — premium materials, restrained accents, tasteful motion, full mobile + a11y — **without changing content or palette**. Inner pages are *refined and consistent*, not as motion-heavy as the homepage (the homepage stays the showpiece).

## Pages in scope (one owner each)
`conocenos`, `servicios/index`, `servicios/[id]`, `catalogo`, `contacto`, `blog/index`, `blog/[slug]`, `bolsa-de-trabajo/index`, `bolsa-de-trabajo/[id]`.

## Global rules (apply to every page)

1. **Content & palette preserved.** Spanish. Reuse data from `src/data/site.ts`. No invented facts/names.

2. **Anti-glyph (CRITICAL).** Replace every decorative glyph with clean numbers or inline SVG:
   - `conocenos`: the `①②③④⑤⑥` value marks → the digits `1`–`6` (or `01`–`06`) set in the display font inside the existing `.mark` chip. No Unicode circled glyphs.
   - `contacto`: the `✓` success mark → an inline SVG check (stroke 2.5, brand color).
   - `catalogo`: the lightbox `×` close → an inline SVG X (the same icon used in `MobileMenu`).

3. **Anti-slop content.** `contacto` form placeholders: replace `"Acme Corp"` with a realistic Mexican company (e.g. `Grupo Lumen`), and vary the name placeholder. No `Acme`/`John Doe`/generic.

4. **Restrained accent system.** Each page's H1 may carry exactly **one** gradient accent word via `.text-grad-word` (the homepage's signature). Every other accent word uses the solid utility `.text-accent` (renders blue on light sections, orange on `.section-dark`). Remove ad-hoc inline `em` color/italic in favor of these utilities. Never gradient a whole heading; never more than one gradient per page.

5. **Materials.** Use the shipped utilities: `.glass`, `.shadow-diffuse`, `.text-accent`, `.section-pad-lg`, tokens (`--radius*`, tinted `--shadow*`, brand vars). Tint shadows to the brand blue. Replace any **3-equal-card row** with hairline separation (à la the homepage Impact band) or an asymmetric layout — the generic 3-up card row is banned (`bolsa` stats are the offender).

6. **Motion (MOTION_INTENSITY ~5).** Reuse `src/lib/motion.ts` (`import { initMotion, gsap, ScrollTrigger, prefersReducedMotion }`). Call `initMotion()` once per page that animates. Allowed, tasteful:
   - Staggered `.reveal` (or GSAP stagger) on grids/lists.
   - **Zoom-parallax on the large hero image** of `servicios/[id]` and `blog/[slug]` (reuse the homepage `Hero` scrub pattern: scale 1.04→1.14, `transform` only).
   - Optional count-up on clean integer stats (skip non-integers like `4.7/5`).
   - Everything guarded behind `!prefersReducedMotion()`, `transform`/`opacity` only, with `astro:before-swap` teardown.

7. **Mobile (CRITICAL).** Every multi-column **inline** grid must collapse to one column < 861px with no horizontal overflow. Move offending inline grids into a scoped `<style>` class with a `@media (max-width: 860px){ grid-template-columns: 1fr }` rule (the global utility grids `.values-grid`, `.form-grid`, `.offices-wrap` already collapse at 900px — leave those). Tap targets ≥ 44px.

8. **Accessibility.** Per-page heading order must be h1 → h2 → h3 with **no skips** (promote the lone-h3-under-h1 detail sections to h2; demote nothing below the section it belongs to; `catalogo` product `<h5>` → `<h3>`). Associate every form label with its input (`for`/`id`) in `contacto`. The `catalogo` lightbox needs: focus trap, `role="dialog"` + `aria-modal`, Esc/scrim/X close, focus restore, body-scroll lock (model it on `MobileMenu`). Keep `alt` text. Focus rings come from the global `:focus-visible` — don't remove outlines.

## Architecture & safety
- **Each agent edits ONLY its own page file** (`src/pages/...`). Put new CSS in a scoped `<style>` block in that page. Do **NOT** edit `src/styles/global.css` or any shared component (`Nav`, `Footer`, `MobileMenu`, `MexicoMap`, `ServicesShowcase`, `CatalogsCarousel`) — the homepage depends on them. (`servicios/index` uses `ServicesShowcase layout="mosaic"` as-is; `catalogo` has its own inline carousel markup it may enhance in-file.)
- Do **NOT** run `npm install`, `npm run build/dev`, `npm test`, or git — another phase builds and commits.
- Read the homepage components for reference patterns (`Hero.astro` parallax, `ImpactBand.astro` count-up + hairlines, `MobileMenu.astro` focus trap, `ClosingCTA.astro` magnetic CTA).

## Per-page specifics
- **conocenos** — H1 gradient on "100% mexicana"; value marks de-glyphed (digits in `.mark`); values grid → staggered reveal + heading order (value title h4→h3); the "¿Quiénes somos?" 2-col grid collapses on mobile; refine Misión (light) / Visión (ink) cards; dark CTA can use a magnetic button.
- **servicios/index** — H1 gradient on "una sola"; keep `ServicesShowcase layout="mosaic"` but ensure mobile + a staggered reveal; intro copy preserved.
- **servicios/[id]** — H1 plain (title) or gradient on a key word; **hero image zoom-parallax**; features grid (h4→h3, mobile collapse, hover tint); "más servicios" 4-col → mobile collapse + h4→h3; examples chips kept.
- **catalogo** — H1 gradient on "ideas"; reuse the homepage drag+inertia behavior on the catalog carousel (suppress click after drag, like `CatalogsCarousel`); product `<h5>`→`<h3>`; lightbox: SVG close + full a11y (focus trap/aria/esc); keep the category filter + counts.
- **contacto** — H1 gradient on "idea"; labels associated to inputs; `✓`→SVG; `Acme Corp`→realistic MX placeholder; 2-col form/offices collapses on mobile; keep validation/error/success states; MexicoMap + offices kept.
- **blog/index** — H1 gradient on "lo compartimos"; featured + grid with staggered reveal; the JS filter re-render must keep working (and re-trigger reveal); heading order (featured h2, cards h3).
- **blog/[slug]** — H1 plain; **hero image zoom-parallax**; refined long-form prose (measure ≤ 70ch, comfortable rhythm); the section heading "Lo esencial…" h3→h2 (no h2-skip under h1); blockquote kept.
- **bolsa-de-trabajo/index** — H1 gradient on "genera ideas"; **stats 3-card row → hairline stat band** (no boxes) like Impact; jobs list (job title h4→h3, refined hover); dark open-CV CTA kept.
- **bolsa-de-trabajo/[id]** — H1 plain; section headings h3→h2 (fix h1→h3 skip); refined prose + lists; apply box kept; chips kept.

## Success criteria
- [ ] All 9 pages elevated, consistent with the homepage; no content lost.
- [ ] Zero decorative glyphs; no `Acme`/generic placeholders.
- [ ] No horizontal overflow at 375px on any page; all multi-col layouts collapse.
- [ ] Heading order clean per page; contacto form labels associated; lightbox accessible.
- [ ] `npm run build` green (24 pages); reduced-motion clean; Lighthouse a11y ≥ 95 on a sampled inner page.
