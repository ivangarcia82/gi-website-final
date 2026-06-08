# Generando Ideas Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Generando Ideas homepage (`/`) into an Apple-grade scroll experience — Cinematic Stage hero, GSAP+Lenis choreography, premium materials — while preserving the existing palette, content, and warm brand personality.

**Architecture:** Stays Astro static. Add a shared motion layer (`src/lib/motion.ts` + `src/styles/motion.css`) initialized once via a Lenis client island; each homepage section is an isolated Astro component whose scroll/motion behavior lives in its own client `<script>` with strict GSAP/ScrollTrigger teardown. Server output stays static HTML; only motion runs client-side. Inner pages are untouched this cycle and keep rendering on current CSS.

**Tech Stack:** Astro 5, TypeScript, GSAP + ScrollTrigger, Lenis smooth-scroll, Space Grotesk / Geist / JetBrains Mono, vanilla DOM (no UI framework).

---

## Testing Note (read first)

This is a static marketing site with **no existing test harness** and primarily visual/motion deliverables. Classic unit-TDD does not map to "make the hero feel cinematic." So each task's verification is concrete and observable instead of a unit test:

- **Build gate:** `npm run build` exits 0 with no errors.
- **Render gate:** `npm run dev` then load the page; the section renders its content with JS disabled (static HTML correctness).
- **Behavior gate:** specific, scripted manual checks (described per task) — e.g. "resize to 375px: nav collapses to drawer, no horizontal scrollbar," "toggle `prefers-reduced-motion`: no parallax, content fully visible."
- **Console gate:** no errors/warnings in devtools console.

Where a behavior is logic-testable in isolation (e.g. count-up formatting, scroll-velocity clamp), a tiny Vitest unit test is added. Vitest is installed in Task 1.

Commit after every task.

---

## File Structure

**New files**
- `src/lib/motion.ts` — Lenis init/teardown, GSAP+ScrollTrigger registration, reduced-motion guard, shared helpers (reveal, `prefersReducedMotion()`, `onLeave` cleanup registry).
- `src/lib/format.ts` — pure helpers (number formatting for count-up) — unit-tested.
- `src/styles/motion.css` — base states for `.reveal`, `.parallax`, `.marquee`, pin wrappers, plus a single authoritative `prefers-reduced-motion` override block.
- `src/components/MobileMenu.astro` — mobile drawer island (markup + open/close + focus trap).
- `src/components/ImpactBand.astro` — new dark stats band with count-up.
- `src/components/ClosingCTA.astro` — new closing CTA band with magnetic button.
- `test/format.test.ts` — Vitest unit tests for `src/lib/format.ts`.

**Modified files**
- `package.json` — add `gsap`, `lenis`, `vitest`.
- `src/styles/global.css` — `--font-body` → Geist; add glass / diffusion-shadow / dark-section utilities; retire hero blobs usage (keep tokens).
- `src/layouts/Layout.astro` — load Geist; import `motion.css`; mount global Lenis island; keep existing reveal/carousel scripts working.
- `src/components/Nav.astro` — glass + scroll-shrink + hamburger trigger; render `MobileMenu`.
- `src/components/Hero.astro` — rewrite to Cinematic Stage + zoom-parallax island.
- `src/components/Ticker.astro` — velocity-reactive marquee island.
- `src/components/ServicesShowcase.astro` — add `pinned` layout (horizontal pan) keeping `mosaic`/`list`/`stacked` fallbacks.
- `src/components/CatalogsCarousel.astro` — drag + inertia + Lenis-aware.
- `src/components/ProcessSection.astro` — dark + SVG path draw + stagger.
- `src/components/TestimonialsCarousel.astro` — auto-advance + progress + pause states.
- `src/components/Footer.astro` — spacing/type polish + subtle reveal.
- `src/pages/index.astro` — recompose flow 01–10.

**Dependency order:** Task 1–2 (foundation) → Tasks 3–12 (components, parallel-safe) → Tasks 13–15 (integration, sequential). Parallel-safe tasks are marked **[PARALLEL]**; they touch only their own component + may read (not edit) `motion.ts`/`global.css`.

---

## Task 1: Install dependencies + motion foundation

**Files:**
- Modify: `package.json`
- Create: `src/lib/motion.ts`
- Create: `src/lib/format.ts`
- Create: `src/styles/motion.css`
- Create: `test/format.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install runtime + test deps**

Run:
```bash
npm install gsap lenis
npm install -D vitest
```
Expected: `gsap`, `lenis` in `dependencies`; `vitest` in `devDependencies`; install exits 0.

- [ ] **Step 2: Add test script to package.json**

In `package.json` `"scripts"`, add:
```json
"test": "vitest run"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Write failing unit test for format helpers**

`test/format.test.ts`:
```ts
import { describe, it, expect } from 'vitest';
import { formatCount } from '../src/lib/format';

describe('formatCount', () => {
  it('keeps a leading + and suffix while animating the number', () => {
    expect(formatCount({ prefix: '+', value: 5000, suffix: '' })).toBe('+5,000');
    expect(formatCount({ prefix: '', value: 80, suffix: '%' })).toBe('80%');
    expect(formatCount({ prefix: '', value: 12, suffix: '+' })).toBe('12+');
  });
  it('formats thousands with grouping', () => {
    expect(formatCount({ prefix: '', value: 1234567, suffix: '' })).toBe('1,234,567');
  });
});
```

- [ ] **Step 5: Run test, verify it fails**

Run: `npm test`
Expected: FAIL — `formatCount` not found / module missing.

- [ ] **Step 6: Implement `src/lib/format.ts`**

```ts
export interface CountParts {
  prefix?: string;
  value: number;
  suffix?: string;
}

/** Format a count-up value with thousands grouping plus optional prefix/suffix. */
export function formatCount({ prefix = '', value, suffix = '' }: CountParts): string {
  return `${prefix}${Math.round(value).toLocaleString('en-US')}${suffix}`;
}
```

- [ ] **Step 7: Run test, verify it passes**

Run: `npm test`
Expected: PASS (2 tests).

- [ ] **Step 8: Create `src/styles/motion.css`**

```css
/* Base states for scroll-driven reveals & motion primitives. */
.reveal { opacity: 0; transform: translateY(28px); }
.reveal.in { opacity: 1; transform: none; transition: opacity .8s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1); }

/* Pin wrapper used by the services horizontal pan. */
.pin-track { display: flex; will-change: transform; }

/* Marquee base (GSAP drives x). */
.marquee { display: inline-flex; white-space: nowrap; will-change: transform; }

/* Magnetic button wrapper — GSAP writes --mx/--my (px). */
.magnetic { display: inline-block; will-change: transform; }

/* Single authoritative reduced-motion override. */
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  .pin-track, .marquee, .magnetic { transform: none !important; }
  * { scroll-behavior: auto !important; }
}
```

- [ ] **Step 9: Implement `src/lib/motion.ts`**

```ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;
let registered = false;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Initialize Lenis smooth scroll + wire it to GSAP ScrollTrigger. Idempotent. */
export function initMotion(): void {
  if (typeof window === 'undefined' || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;

  if (prefersReducedMotion()) {
    // No smooth scroll; ScrollTrigger still works on native scroll for reveals.
    ScrollTrigger.refresh();
    return;
  }

  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => { lenis?.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  ScrollTrigger.refresh();
}

/** Tear down all triggers + Lenis. Call on astro:before-swap / unload. */
export function destroyMotion(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lenis?.destroy();
  lenis = null;
  registered = false;
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 10: Verify build**

Run: `npm run build`
Expected: exits 0, no TS errors.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/ src/styles/motion.css test/
git commit -m "feat(motion): add gsap+lenis foundation, motion.css, format helpers"
```

---

## Task 2: Typography (Geist) + global utilities

**Files:**
- Modify: `src/layouts/Layout.astro` (font `<link>`, import motion.css)
- Modify: `src/styles/global.css` (`--font-body`, utilities)

- [ ] **Step 1: Load Geist + import motion.css in Layout `<head>`**

In `src/layouts/Layout.astro`, replace the existing Google Fonts `<link href=...>` with one that adds Geist:
```html
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Geist:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```
Add at top of the frontmatter import block (with the existing `import '../styles/global.css';`):
```astro
import '../styles/motion.css';
```

- [ ] **Step 2: Point `--font-body` at Geist**

In `src/styles/global.css` `:root`, change:
```css
--font-body: 'Geist', ui-sans-serif, system-ui, sans-serif;
```
(Leave `--font-display` and `--font-mono` unchanged.)

- [ ] **Step 3: Add premium utilities to `global.css`**

Append:
```css
/* ===== Redesign utilities ===== */
.glass {
  background: rgba(250,250,247,0.72);
  backdrop-filter: saturate(150%) blur(18px);
  -webkit-backdrop-filter: saturate(150%) blur(18px);
  border: 1px solid rgba(255,255,255,0.5);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), var(--shadow-sm);
}
.shadow-diffuse { box-shadow: 0 28px 60px -28px rgba(6,46,95,0.22); }
.section-pad-lg { padding: clamp(96px, 14vh, 180px) 0; }
.text-grad-word {
  background: linear-gradient(100deg, var(--orange-500), var(--magenta) 60%, var(--blue-700));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  font-style: italic;
}
```

- [ ] **Step 4: Verify build + font swap**

Run: `npm run build && npm run dev`
Check: body text renders in Geist (inspect computed `font-family` on a paragraph). If the Google Fonts response does not include Geist (404), fall back to self-host: `npm install @fontsource-variable/geist`, `import '@fontsource-variable/geist';` in Layout frontmatter, and drop Geist from the `<link>`. Re-verify computed font.
Expected: paragraphs use Geist; build exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro src/styles/global.css package.json package-lock.json
git commit -m "feat(type): swap body font Inter->Geist, add glass/diffusion utilities"
```

---

## Task 3: Nav glass + scroll-shrink + Mobile drawer  [PARALLEL]

**Files:**
- Modify: `src/components/Nav.astro`
- Create: `src/components/MobileMenu.astro`
- Modify: `src/styles/global.css` (nav shrink + drawer styles)

- [ ] **Step 1: Add nav-shrink + drawer CSS to `global.css`**

Append:
```css
.nav { transition: height .3s cubic-bezier(.2,.8,.2,1), background .3s; }
.nav.shrink .nav-inner { height: 60px; }
.nav-burger { display: none; width: 44px; height: 44px; border-radius: 10px; align-items: center; justify-content: center; }
.nav-burger:hover { background: var(--gray-100); }
.nav-burger span, .nav-burger span::before, .nav-burger span::after {
  content: ""; display: block; width: 20px; height: 2px; background: var(--ink); border-radius: 2px; transition: transform .25s; position: relative;
}
.nav-burger span::before { position: absolute; top: -6px; }
.nav-burger span::after { position: absolute; top: 6px; }
.drawer { position: fixed; inset: 0; z-index: 60; display: none; }
.drawer.open { display: block; }
.drawer-scrim { position: absolute; inset: 0; background: rgba(16,17,20,.4); opacity: 0; transition: opacity .3s; }
.drawer.open .drawer-scrim { opacity: 1; }
.drawer-panel { position: absolute; top: 0; right: 0; bottom: 0; width: min(86vw, 360px); background: var(--paper); padding: 24px; transform: translateX(100%); transition: transform .35s cubic-bezier(.2,.8,.2,1); display: flex; flex-direction: column; gap: 6px; }
.drawer.open .drawer-panel { transform: none; }
.drawer-panel a { font-family: var(--font-display); font-size: 22px; font-weight: 600; padding: 12px 8px; letter-spacing: -.02em; }
.drawer-close { align-self: flex-end; width: 44px; height: 44px; border-radius: 10px; display: grid; place-items: center; font-size: 24px; }
@media (max-width: 860px) {
  .nav-links .nav-link, .nav-links .btn-accent { display: none; }
  .nav-burger { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  .drawer-scrim, .drawer-panel { transition: none; }
}
```

- [ ] **Step 2: Create `MobileMenu.astro` (markup only; logic in script)**

```astro
---
import { NAV_ITEMS, ROUTES } from '../data/site.ts';
---
<div class="drawer" id="drawer" aria-hidden="true">
  <div class="drawer-scrim" data-drawer-close></div>
  <nav class="drawer-panel" aria-label="Menú móvil">
    <button class="drawer-close" data-drawer-close aria-label="Cerrar menú">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    {NAV_ITEMS.map((p) => <a href={p.href}>{p.label}</a>)}
    <a href={ROUTES.contact} class="btn btn-accent" style="margin-top:12px;justify-content:center;">Cotiza tu proyecto</a>
  </nav>
</div>
<script>
  const drawer = document.getElementById('drawer');
  const openBtn = document.querySelector('[data-drawer-open]');
  let lastFocus: HTMLElement | null = null;
  function open() {
    if (!drawer) return;
    lastFocus = document.activeElement as HTMLElement;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    openBtn?.setAttribute('aria-expanded', 'true');
    (drawer.querySelector('.drawer-close') as HTMLElement)?.focus();
  }
  function close() {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    openBtn?.setAttribute('aria-expanded', 'false');
    lastFocus?.focus();
  }
  openBtn?.addEventListener('click', open);
  drawer?.querySelectorAll('[data-drawer-close]').forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer?.classList.contains('open')) close(); });
</script>
```

- [ ] **Step 3: Update `Nav.astro` — glass, burger trigger, render drawer**

Add `glass` class to the `<nav>`, add a burger button before `.nav-links`’ accent button, render `<MobileMenu />` after the nav, and add a scroll-shrink script. Key edits:
- Import: `import MobileMenu from './MobileMenu.astro';`
- `<nav class="nav glass">`
- Inside `.nav-links`, before the catalog button add:
```html
<button class="nav-burger" data-drawer-open aria-label="Abrir menú" aria-expanded="false" aria-controls="drawer"><span></span></button>
```
- After `</nav>` add `<MobileMenu />`
- Append script:
```html
<script>
  const nav = document.querySelector('.nav');
  const onScroll = () => nav?.classList.toggle('shrink', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
</script>
```
(Note: a passive scroll listener for a class toggle is acceptable here — it is not animation; the no-`scroll`-listener rule applies to motion driving, which uses ScrollTrigger.)

- [ ] **Step 4: Verify behavior**

Run: `npm run dev`.
Checks: (a) desktop ≥861px shows full links, nav shrinks after scrolling 40px; (b) resize to 375px → links hide, burger appears, click opens drawer with slide, Esc/scrim/X close it, body scroll locks while open; (c) keyboard: Tab reaches burger, Enter opens, focus lands on close; (d) no console errors; (e) no horizontal scrollbar at 375px.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/MobileMenu.astro src/styles/global.css
git commit -m "feat(nav): glass nav with scroll-shrink and accessible mobile drawer"
```

---

## Task 4: Hero — Cinematic Stage + zoom-parallax  [PARALLEL]

**Files:**
- Modify: `src/components/Hero.astro` (full rewrite)
- Modify: `src/styles/global.css` (hero stage styles; keep blob tokens but stop using them here)

- [ ] **Step 1: Add Cinematic Stage CSS to `global.css`**

```css
.hero-cine { position: relative; padding: clamp(64px,9vh,120px) 0 0; min-height: 100dvh; display: flex; flex-direction: column; }
.hero-cine .wrap { flex: 0 0 auto; }
.hero-top { display: grid; grid-template-columns: 1.2fr .8fr; gap: 40px; align-items: end; }
.hero-top h1 { font-family: var(--font-display); font-size: clamp(48px,6.5vw,104px); line-height:.92; letter-spacing:-.035em; font-weight:700; margin:14px 0 0; }
.hero-aside { padding-bottom: 8px; }
.hero-aside .hero-sub { font-size: 17px; color: var(--gray-700); max-width: 320px; margin: 0 0 18px; line-height: 1.5; }
.hero-stage { position: relative; flex: 1 1 auto; min-height: 46vh; margin-top: clamp(28px,5vh,56px); border-radius: var(--radius-xl) var(--radius-xl) 0 0; overflow: hidden; }
.hero-stage img { width: 100%; height: 100%; object-fit: cover; will-change: transform; }
.hero-stage::after { content:""; position:absolute; inset:0; background: linear-gradient(180deg, rgba(250,250,247,.12) 0%, transparent 22%, transparent 62%, var(--paper) 100%); }
.hero-badge { position: absolute; left: clamp(16px,4vw,40px); bottom: clamp(20px,5vh,44px); z-index:1; border-radius:16px; padding:14px 18px; color:#fff; background: rgba(16,17,20,.55); backdrop-filter: blur(12px); border:1px solid rgba(255,255,255,.14); box-shadow: inset 0 1px 0 rgba(255,255,255,.14); }
.hero-badge .t { font-family: var(--font-mono); font-size:10px; letter-spacing:.14em; text-transform:uppercase; color: var(--orange-300); }
.hero-badge .v { font-family: var(--font-display); font-weight:600; font-size:20px; letter-spacing:-.01em; margin-top:2px; }
.hero-chips { position:absolute; right: clamp(16px,4vw,40px); bottom: clamp(20px,5vh,44px); z-index:1; display:flex; gap:24px; }
.hero-chips .stat b { color:#fff; }
@media (max-width: 860px) {
  .hero-top { grid-template-columns: 1fr; }
  .hero-chips { display: none; }
  .hero-stage { min-height: 320px; }
}
```

- [ ] **Step 2: Rewrite `Hero.astro` markup**

```astro
---
import { IMAGES, ROUTES } from '../data/site.ts';
---
<section class="hero-cine">
  <div class="wrap">
    <div class="hero-top">
      <div>
        <span class="eyebrow">Una sola ventanilla · 12+ años</span>
        <h1>Ideas que tu <span class="text-grad-word">marca</span> se lleva puesta.</h1>
      </div>
      <div class="hero-aside">
        <p class="hero-sub">Convertimos cada pluma, taza, textil o gadget en un embajador de tu marca. Todo lo que necesitas, en un solo lugar.</p>
        <div class="hero-cta" style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href={ROUTES.catalog} class="btn btn-primary btn-lg">Ver catálogo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a href={ROUTES.contact} class="btn btn-ghost btn-lg">Cotiza tu proyecto</a>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-stage" data-hero-stage>
    <img src={IMAGES.img36} alt="Productos promocionales personalizados de Generando Ideas" loading="eager" data-hero-img />
    <div class="hero-badge"><div class="t">Edición 2026</div><div class="v">+5,000 productos personalizables</div></div>
    <div class="hero-chips">
      <div class="stat"><strong>11</strong><span>Catálogos</span></div>
      <div class="stat"><strong>4</strong><span>Oficinas MX</span></div>
    </div>
  </div>
</section>
<script>
  import { initMotion, gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
  initMotion();
  if (!prefersReducedMotion()) {
    const img = document.querySelector('[data-hero-img]') as HTMLElement | null;
    const stage = document.querySelector('[data-hero-stage]') as HTMLElement | null;
    if (img && stage) {
      gsap.fromTo(img, { scale: 1.04 }, {
        scale: 1.16, ease: 'none',
        scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
  }
  document.addEventListener('astro:before-swap', () => ScrollTrigger.getAll().forEach((t) => t.kill()), { once: true });
</script>
```

- [ ] **Step 3: Verify**

Run: `npm run dev`. Checks: (a) hero fills the first viewport (`100dvh`), headline + stage image visible; (b) scrolling scales the image smoothly (no layout shift — transform only); (c) mobile 375px: single column, stage ≥320px, chips hidden, no overflow; (d) reduced-motion on: image static at scale 1.04, content fully visible; (e) console clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/styles/global.css
git commit -m "feat(hero): cinematic stage hero with zoom-parallax"
```

---

## Task 5: Ticker — velocity-reactive marquee  [PARALLEL]

**Files:**
- Modify: `src/components/Ticker.astro`

- [ ] **Step 1: Rewrite `Ticker.astro`**

```astro
---
import { TICKER_WORDS } from '../data/site.ts';
const words = [...TICKER_WORDS, ...TICKER_WORDS]; // duplicate for seamless -50% loop
---
<div class="ticker">
  <div class="marquee" data-marquee>
    {words.map((w, i) => (<span class="ticker-item">{w}<b class="dot" aria-hidden="true"> · </b></span>))}
  </div>
</div>
<style>
  .ticker-item { font-family: var(--font-display); font-size: 28px; font-weight: 600; letter-spacing: -.02em; margin: 0 8px; }
  .ticker-item .dot { color: var(--orange-500); }
</style>
<script>
  import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
  const track = document.querySelector('[data-marquee]') as HTMLElement | null;
  if (track && !prefersReducedMotion()) {
    const base = gsap.to(track, { xPercent: -50, repeat: -1, duration: 24, ease: 'none' });
    // Speed reacts to scroll velocity, then eases back to 1.
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = 1 + Math.min(Math.abs(self.getVelocity() / 300), 6);
        gsap.to(base, { timeScale: v, overwrite: true, duration: .2 });
        gsap.to(base, { timeScale: 1, duration: 1, delay: .2, overwrite: false });
      },
    });
    document.addEventListener('astro:before-swap', () => { base.kill(); st.kill(); }, { once: true });
  }
</script>
```

- [ ] **Step 2: Verify**

Checks: marquee loops seamlessly (no jump at wrap); scrolling fast visibly speeds it, then it eases back; reduced-motion → static row, no animation; console clean; numbers/words use Space Grotesk.

- [ ] **Step 3: Commit**

```bash
git add src/components/Ticker.astro
git commit -m "feat(ticker): scroll-velocity reactive marquee"
```

---

## Task 6: Servicios — pinned horizontal pan  [PARALLEL]

**Files:**
- Modify: `src/components/ServicesShowcase.astro`
- Modify: `src/styles/global.css` (pinned layout styles)

- [ ] **Step 1: Add pinned-layout CSS to `global.css`**

```css
.svc-pin { position: relative; }
.svc-pin .pin-viewport { height: 100dvh; display: flex; align-items: center; overflow: hidden; }
.svc-pin .pin-track { gap: 28px; padding: 0 max(32px, calc((100vw - var(--max))/2 + 32px)); }
.svc-stage { flex: 0 0 clamp(320px, 42vw, 560px); min-height: 60vh; border-radius: var(--radius-lg); padding: 40px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-lg); }
.svc-stage h3 { font-family: var(--font-display); font-size: clamp(30px,3.4vw,48px); line-height: 1; letter-spacing: -.025em; font-weight: 700; }
.svc-stage p { font-size: 16px; line-height: 1.5; max-width: 42ch; }
.svc-stage .svc-num { font-family: var(--font-mono); font-size: 13px; letter-spacing: .1em; opacity: .65; }
.svc-stage .svc-cta { display:inline-flex; align-items:center; gap:8px; font-weight:600; font-size:14px; margin-top:20px; }
.svc-tone-hero { background: var(--blue-700); color:#fff; } .svc-tone-hero p { color: rgba(255,255,255,.82); }
.svc-tone-a { background: var(--orange-500); color: var(--ink); }
.svc-tone-b { background: var(--paper-2); color: var(--ink); }
.svc-tone-c { background: var(--ink); color:#fff; } .svc-tone-c p { color: rgba(255,255,255,.72); }
.svc-tone-d { background: var(--mint); color: var(--ink); }
@media (max-width: 860px) {
  .svc-pin .pin-viewport { height: auto; display: block; }
  .svc-pin .pin-track { flex-direction: column; padding: 0 16px; gap: 16px; }
  .svc-stage { flex: 1 1 auto; min-height: 0; }
}
```

- [ ] **Step 2: Add `pinned` branch to `ServicesShowcase.astro`**

Keep the existing `mosaic`/`list`/`stacked` markup. Add a `pinned` layout branch (used by the home page). Frontmatter already imports `SERVICES`. Add:
```astro
{layout === 'pinned' && (
  <div class="svc-pin" data-svc-pin>
    <div class="pin-viewport">
      <div class="pin-track" data-svc-track>
        {SERVICES.map((s) => (
          <a class={`svc-stage svc-tone-${s.tone}`} href={`/servicios/${s.id}`}>
            <span class="svc-num">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span class="svc-cta">Conocer más
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
)}
```
Ensure the `Props` type for `layout` includes `'pinned'`.

- [ ] **Step 3: Add the pin script to `ServicesShowcase.astro`**

```astro
<script>
  import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
  const pin = document.querySelector('[data-svc-pin]') as HTMLElement | null;
  const track = document.querySelector('[data-svc-track]') as HTMLElement | null;
  const mq = window.matchMedia('(min-width: 861px)');
  if (pin && track && mq.matches && !prefersReducedMotion()) {
    const distance = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: { trigger: pin, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 1, invalidateOnRefresh: true },
    });
    document.addEventListener('astro:before-swap', () => ScrollTrigger.getAll().forEach((t) => t.kill()), { once: true });
  }
</script>
```

- [ ] **Step 4: Verify**

Checks: desktop ≥861px → section pins; vertical scroll pans the 5 service stages horizontally end-to-end, then releases; each stage uses its tone color; "Conocer más" links navigate to `/servicios/{id}`. Mobile 375px → no pin, stages stack vertically, all links work, no horizontal scrollbar. Reduced-motion → vertical stack, no pin. Console clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/ServicesShowcase.astro src/styles/global.css
git commit -m "feat(servicios): pinned horizontal-pan service stages with mobile stack fallback"
```

---

## Task 7: Catálogos — drag + inertia gallery  [PARALLEL]

**Files:**
- Modify: `src/components/CatalogsCarousel.astro`

- [ ] **Step 1: Confirm current structure**

`CatalogsCarousel.astro` renders `CATALOGS` into `.carousel`/`.carousel-track` with `[data-carousel]`. Keep the existing prev/next buttons (Layout's `initCarousels` wires them). Add pointer drag + inertia + end-state disabling on top.

- [ ] **Step 2: Add drag/inertia script to the component**

```astro
<script>
  const root = document.querySelector('[data-carousel]') as HTMLElement | null;
  const track = root?.querySelector('[data-carousel-track]') as HTMLElement | null;
  if (root && track) {
    let down = false, startX = 0, startScroll = 0, lastX = 0, v = 0, raf = 0;
    const onMove = (x: number) => { v = x - lastX; lastX = x; track.scrollLeft = startScroll - (x - startX); };
    const glide = () => { if (Math.abs(v) < 0.4) return; track.scrollLeft -= v; v *= 0.95; raf = requestAnimationFrame(glide); };
    track.addEventListener('pointerdown', (e) => { down = true; startX = lastX = e.clientX; startScroll = track.scrollLeft; cancelAnimationFrame(raf); track.setPointerCapture(e.pointerId); track.style.cursor = 'grabbing'; });
    track.addEventListener('pointermove', (e) => { if (down) onMove(e.clientX); });
    const release = () => { if (!down) return; down = false; track.style.cursor = ''; raf = requestAnimationFrame(glide); };
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    const syncBtns = () => {
      const prev = root.querySelector('[data-carousel-prev]') as HTMLButtonElement | null;
      const next = root.querySelector('[data-carousel-next]') as HTMLButtonElement | null;
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    };
    track.addEventListener('scroll', syncBtns, { passive: true });
    syncBtns();
  }
</script>
<style>[data-carousel-track] { cursor: grab; }</style>
```

- [ ] **Step 3: Verify**

Checks: drag the strip with mouse/touch → it follows and glides with inertia on release; prev/next buttons still work and disable at each end; native swipe works on mobile; no text-selection while dragging issues; console clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/CatalogsCarousel.astro
git commit -m "feat(catalogos): drag + inertia gallery with end-state button sync"
```

---

## Task 8: Proceso — dark section + SVG path draw  [PARALLEL]

**Files:**
- Modify: `src/components/ProcessSection.astro`

- [ ] **Step 1: Read current copy**

Open `src/components/ProcessSection.astro` and preserve its existing 4 steps (numbers, titles, descriptions) verbatim. The redesign changes presentation only.

- [ ] **Step 2: Rewrite presentation — dark + connecting SVG**

Wrap the 4 steps in a dark section with an absolutely-positioned SVG line behind them, plus `.reveal` on each step for stagger. Markup shape:
```astro
<section class="section section-dark" data-proc>
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow">Cómo trabajamos</span><h2>De la idea a la entrega, <span class="text-grad-word">sin fricción.</span></h2></div>
    </div>
    <div class="proc-rail">
      <svg class="proc-path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 60 H980" data-proc-line fill="none" stroke="var(--orange-500)" stroke-width="2" />
      </svg>
      <div class="process-list">
        {/* existing 4 steps, each wrapped: <div class="process-step reveal"> ... </div> */}
      </div>
    </div>
  </div>
</section>
```
Add CSS:
```css
.proc-rail { position: relative; }
.proc-path { position: absolute; top: 30px; left: 0; width: 100%; height: 60px; opacity: .5; }
[data-proc-line] { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
```

- [ ] **Step 3: Add draw + stagger script**

```astro
<script>
  import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
  const sec = document.querySelector('[data-proc]');
  const line = document.querySelector('[data-proc-line]');
  const steps = sec ? sec.querySelectorAll('.process-step') : [];
  if (sec && !prefersReducedMotion()) {
    if (line) gsap.to(line, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 70%', end: 'bottom 60%', scrub: true } });
    gsap.fromTo(steps, { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: .12, duration: .6, ease: 'power3.out', scrollTrigger: { trigger: sec, start: 'top 70%' } });
    document.addEventListener('astro:before-swap', () => ScrollTrigger.getAll().forEach((t) => t.kill()), { once: true });
  } else {
    if (line) (line as SVGElement).setAttribute('stroke-dashoffset', '0');
    steps.forEach((s) => ((s as HTMLElement).style.opacity = '1'));
  }
</script>
```

- [ ] **Step 4: Verify**

Checks: section is dark; scrolling into it draws the orange line left→right tied to scroll; steps fade/rise in sequence; reduced-motion → line fully drawn, steps visible immediately; mobile stacks steps (existing `.process-list` responsive rule handles 2-col→ confirm acceptable, else single-col); console clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProcessSection.astro
git commit -m "feat(proceso): dark section with scroll-drawn SVG path and staggered steps"
```

---

## Task 9: Impacto — new dark count-up band  [PARALLEL]

**Files:**
- Create: `src/components/ImpactBand.astro`

- [ ] **Step 1: Create `ImpactBand.astro`**

```astro
---
const STATS = [
  { prefix: '', value: 12, suffix: '+', label: 'Años amplificando marcas' },
  { prefix: '+', value: 5000, suffix: '', label: 'Productos personalizables' },
  { prefix: '', value: 80, suffix: '%', label: 'Clientes que recompran (12m)' },
  { prefix: '', value: 4, suffix: '', label: 'Oficinas en México' },
];
---
<section class="section section-dark impact" data-impact>
  <div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Por qué nos eligen</span><h2>Números que <span class="text-grad-word">sostienen</span> la promesa.</h2></div></div>
    <div class="impact-grid">
      {STATS.map((s) => (
        <div class="impact-cell">
          <strong data-count data-prefix={s.prefix} data-value={s.value} data-suffix={s.suffix}>{s.prefix}0{s.suffix}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  </div>
</section>
<style>
  .impact-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border-top: 1px solid rgba(255,255,255,.12); }
  .impact-cell { padding: 40px 28px 8px; border-left: 1px solid rgba(255,255,255,.12); }
  .impact-cell:first-child { border-left: none; }
  .impact-cell strong { font-family: var(--font-display); font-size: clamp(44px,5vw,72px); font-weight: 700; letter-spacing: -.03em; color: #fff; display: block; line-height: 1; font-variant-numeric: tabular-nums; }
  .impact-cell span { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--gray-300); display: block; margin-top: 12px; }
  @media (max-width: 860px) { .impact-grid { grid-template-columns: 1fr 1fr; } .impact-cell:nth-child(odd) { border-left: none; } }
</style>
<script>
  import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
  import { formatCount } from '../lib/format';
  const cells = document.querySelectorAll('[data-count]');
  const set = (el: Element, v: number) => {
    const e = el as HTMLElement;
    e.textContent = formatCount({ prefix: e.dataset.prefix || '', value: v, suffix: e.dataset.suffix || '' });
  };
  if (prefersReducedMotion()) {
    cells.forEach((el) => set(el, Number((el as HTMLElement).dataset.value)));
  } else {
    cells.forEach((el) => {
      const target = Number((el as HTMLElement).dataset.value);
      const obj = { v: 0 };
      gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => set(el, obj.v),
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    document.addEventListener('astro:before-swap', () => ScrollTrigger.getAll().forEach((t) => t.kill()), { once: true });
  }
</script>
```

- [ ] **Step 2: Verify**

Checks: dark band with 4 stats; numbers count up once when scrolled into view, ending at `12+`, `+5,000`, `80%`, `4`; grouping comma renders; reduced-motion → final numbers shown immediately; mobile → 2×2 grid, no overflow; console clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/ImpactBand.astro
git commit -m "feat(impacto): dark stats band with scroll-triggered count-up"
```

---

## Task 10: Testimonios — auto-advance + progress  [PARALLEL]

**Files:**
- Modify: `src/components/TestimonialsCarousel.astro`
- Modify: `src/styles/global.css` (progress bar)

- [ ] **Step 1: Add progress-bar CSS**

```css
.testi-progress { height: 2px; background: var(--gray-200); border-radius: 2px; margin-top: 20px; overflow: hidden; }
.testi-progress i { display: block; height: 100%; width: 0; background: var(--ink); }
```

- [ ] **Step 2: Add auto-advance to existing track**

Keep the existing testimonial markup/track. Append a progress element after the track and a script that advances `scrollLeft` by one card every 5s, animates the progress bar, and pauses on hover/focus/offscreen/reduced-motion:
```astro
<div class="testi-progress" aria-hidden="true"><i data-testi-bar></i></div>
<script>
  import { prefersReducedMotion } from '../lib/motion';
  const track = document.querySelector('.testimonial-track') as HTMLElement | null;
  const bar = document.querySelector('[data-testi-bar]') as HTMLElement | null;
  if (track && bar && !prefersReducedMotion()) {
    const card = track.querySelector('.testimonial') as HTMLElement | null;
    const step = (card?.offsetWidth || 440) + 24;
    let paused = false, t = 0, rafId = 0, last = performance.now();
    const PERIOD = 5000;
    const loop = (now: number) => {
      const dt = now - last; last = now;
      if (!paused) { t += dt; bar.style.width = `${Math.min(t / PERIOD, 1) * 100}%`;
        if (t >= PERIOD) { t = 0; bar.style.width = '0%';
          const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
          track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: 'smooth' }); } }
      rafId = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: .2 });
    io.observe(track);
    ['mouseenter', 'focusin'].forEach((e) => track.addEventListener(e, () => (paused = true)));
    ['mouseleave', 'focusout'].forEach((e) => track.addEventListener(e, () => (paused = false)));
    rafId = requestAnimationFrame(loop);
    document.addEventListener('astro:before-swap', () => { cancelAnimationFrame(rafId); io.disconnect(); }, { once: true });
  }
</script>
```

- [ ] **Step 3: Verify**

Checks: testimonials auto-advance every ~5s with a filling progress bar; hover/focus pauses; scrolling away pauses (IntersectionObserver); wraps to start after last; reduced-motion → no auto-advance, manual scroll only; console clean.

- [ ] **Step 4: Commit**

```bash
git add src/components/TestimonialsCarousel.astro src/styles/global.css
git commit -m "feat(testimonios): auto-advance carousel with progress and pause states"
```

---

## Task 11: Cierre / Closing CTA — magnetic button  [PARALLEL]

**Files:**
- Create: `src/components/ClosingCTA.astro`

- [ ] **Step 1: Create `ClosingCTA.astro`**

```astro
---
import { ROUTES } from '../data/site.ts';
---
<section class="section closing" data-closing>
  <div class="wrap closing-inner">
    <h2 class="closing-h reveal">¿Listo para que tu marca <span class="text-grad-word">se lleve puesta?</span></h2>
    <p class="closing-sub reveal">Cuéntanos qué traes en mente. Te respondemos con propuesta y cotización en menos de 48 horas.</p>
    <div class="closing-cta reveal">
      <span class="magnetic" data-magnetic><a href={ROUTES.contact} class="btn btn-accent btn-lg">Cotiza tu proyecto
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a></span>
      <a href={ROUTES.catalog} class="btn btn-ghost btn-lg">Ver catálogo</a>
    </div>
  </div>
</section>
<style>
  .closing { background: var(--blue-700); color: #fff; text-align: center; }
  .closing-inner { display: flex; flex-direction: column; align-items: center; gap: 20px; }
  .closing-h { font-family: var(--font-display); font-size: clamp(38px,5.5vw,84px); line-height: .95; letter-spacing: -.03em; font-weight: 700; max-width: 16ch; margin: 0; }
  .closing-sub { color: rgba(255,255,255,.82); font-size: 18px; max-width: 52ch; margin: 0; }
  .closing .text-grad-word { background: linear-gradient(100deg, var(--orange-300), #fff 70%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .closing-cta { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 8px; }
  .closing .btn-ghost { color: #fff; border-color: rgba(255,255,255,.4); }
  .closing .btn-ghost:hover { background: rgba(255,255,255,.08); border-color: #fff; }
</style>
<script>
  import { gsap, prefersReducedMotion } from '../lib/motion';
  const wrap = document.querySelector('[data-magnetic]') as HTMLElement | null;
  if (wrap && !prefersReducedMotion() && window.matchMedia('(pointer:fine)').matches) {
    const xTo = gsap.quickTo(wrap, 'x', { duration: .4, ease: 'power3' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: .4, ease: 'power3' });
    wrap.addEventListener('pointermove', (e) => {
      const r = wrap.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    wrap.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  }
</script>
```

- [ ] **Step 2: Verify**

Checks: blue closing band, centered; on fine-pointer devices the CTA pulls toward the cursor and springs back on leave; touch devices unaffected; reduced-motion → no magnet; links go to contacto/catalogo; mobile centered, no overflow; console clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/ClosingCTA.astro
git commit -m "feat(cierre): closing CTA band with magnetic button"
```

---

## Task 12: Footer polish  [PARALLEL]

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Add reveal + spacing polish**

Add `class="reveal"` to the footer's top grid wrapper; ensure the big wordmark uses `.footer-brand` (already defined). No content changes. If the footer wordmark currently hardcodes English, leave Spanish brand as-is (`Generando Ideas`).

- [ ] **Step 2: Verify**

Checks: footer reveals subtly on scroll-in; layout unchanged otherwise; mobile 2-col→ confirm existing responsive rule holds; console clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(footer): subtle reveal + spacing polish"
```

---

## Task 13: Recompose homepage flow

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Rebuild `index.astro` to the 10-section order**

```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/Hero.astro';
import Ticker from '../components/Ticker.astro';
import ServicesShowcase from '../components/ServicesShowcase.astro';
import CatalogsCarousel from '../components/CatalogsCarousel.astro';
import ProcessSection from '../components/ProcessSection.astro';
import ImpactBand from '../components/ImpactBand.astro';
import TestimonialsCarousel from '../components/TestimonialsCarousel.astro';
import ClosingCTA from '../components/ClosingCTA.astro';
---
<Layout>
  <Hero />
  <Ticker />

  <section class="section">
    <div class="wrap reveal">
      <div class="section-head">
        <div><span class="eyebrow">Servicios</span><h2>Todo lo que tu marca necesita, <span class="text-grad-word">bajo un mismo techo.</span></h2></div>
        <p>Cinco líneas integradas que cubren desde la idea hasta el envío final. Tú eliges dónde empezamos.</p>
      </div>
    </div>
    <ServicesShowcase layout="pinned" />
  </section>

  <section class="section section-alt">
    <div class="wrap reveal">
      <div class="section-head">
        <div><span class="eyebrow">Catálogos 2026</span><h2>11 catálogos, <span class="text-grad-word">miles</span> de productos.</h2></div>
        <p>Desde clásicos eternos hasta ediciones especiales por temporada. Explora y encuentra lo que necesitas.</p>
      </div>
      <CatalogsCarousel />
    </div>
  </section>

  <ProcessSection />
  <ImpactBand />

  <section class="section">
    <div class="wrap reveal">
      <div class="section-head">
        <div><span class="eyebrow">Lo que dicen nuestros clientes</span><h2>Relaciones que <span class="text-grad-word">duran años.</span></h2></div>
        <p>Más del 80% de nuestros clientes nos recompra en los primeros 12 meses.</p>
      </div>
      <TestimonialsCarousel />
    </div>
  </section>

  <ClosingCTA />
</Layout>
```
(Drop the old `.page` wrapper if it interferes with pinning; pinning needs a normal-flow ancestor. Verify in Step 2.)

- [ ] **Step 2: Verify whole-page flow**

Run `npm run dev`. Scroll top→bottom: hero parallax → marquee → **pinned** services pan → catalogs → dark proceso draw → dark impacto count-up → testimonios → blue closing CTA → footer. Confirm light/dark rhythm reads well and the pinned section doesn't fight Lenis (no stutter). Console clean.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(home): recompose homepage into the 10-section Apple-grade flow"
```

---

## Task 14: Responsive, reduced-motion & a11y pass

**Files:** any of the above as needed (fixes only)

- [ ] **Step 1: Mobile sweep at 375 / 414 / 768**

Run dev, use devtools device toolbar. For each width verify: no horizontal scrollbar; hero single-column; services stacked (no pin); impact 2×2; nav drawer works; tap targets ≥44px. Fix any overflow with `overflow-x: clip` on offenders or width caps. Commit fixes.

- [ ] **Step 2: Reduced-motion sweep**

Enable OS "Reduce Motion" (or emulate in devtools Rendering tab). Reload: no parallax, no marquee motion, no auto-advance, no magnet, no pin-scrub; every section fully visible and readable; Lenis disabled (native scroll). Fix any section still animating. Commit fixes.

- [ ] **Step 3: Keyboard + a11y**

Tab through the whole page: focus-visible rings present; drawer focus-trap and Esc; carousels reachable; images have meaningful `alt` or empty `alt` for decorative; headings in order (single h1 in hero). Fix gaps. Commit fixes.

- [ ] **Step 4: Commit (if not already)**

```bash
git add -A && git commit -m "fix(home): responsive, reduced-motion and a11y refinements"
```

---

## Task 15: Build, performance & taste pre-flight

- [ ] **Step 1: Production build + preview**

Run: `npm run build && npm run preview`
Expected: build exits 0; preview serves; no console errors on the homepage.

- [ ] **Step 2: Lighthouse (mobile) on the preview URL**

Run a Lighthouse mobile audit on `/`. Targets: Performance ≥ 90, Accessibility ≥ 95. If perf < 90, check: hero image size, font display swap, unused JS. Apply fixes (e.g., `fetchpriority="high"` on hero img, ensure below-fold imgs `loading="lazy"`). Re-audit.

- [ ] **Step 3: Taste-skill pre-flight checklist**

Verify against the design-taste-frontend pre-flight: mobile collapse guaranteed; `min-h-[100dvh]` not `h-screen`; useEffect/script cleanup present (astro:before-swap kills); empty/loading/error states where relevant; cards omitted in favor of spacing where possible; perpetual animations isolated in their own scripts. Fix any miss.

- [ ] **Step 4: Run unit tests**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Final commit**

```bash
git add -A && git commit -m "chore(home): production build, performance and taste pre-flight pass"
```

---

## Self-Review (completed by author)

- **Spec coverage:** Nav drawer (T3), Cinematic hero + parallax (T4), velocity ticker (T5), pinned services (T6), drag catalogs (T7), dark proceso SVG draw (T8), impact band (T9), testimonials auto-advance (T10), closing CTA (T11), footer (T12), recompose (T13), responsive/reduced-motion/a11y (T14), build/perf/preflight (T15). Geist swap (T2), motion engine + teardown (T1, every component script). All spec sections mapped.
- **Placeholder scan:** No TBDs; every code step includes real code. Two spots intentionally say "preserve existing copy" (T8 proceso steps, T12 footer) — these reference real current content the executor must read, not invent.
- **Type consistency:** `formatCount({prefix,value,suffix})` defined T1, used identically T9. `initMotion`/`destroyMotion`/`prefersReducedMotion`/`gsap`/`ScrollTrigger` exported from `motion.ts` (T1) and imported consistently. `layout="pinned"` added to `ServicesShowcase` Props (T6) and used in `index.astro` (T13). Data shapes (`SERVICES.tone`, `TICKER_WORDS`, `IMAGES.img36`) match `site.ts`.
