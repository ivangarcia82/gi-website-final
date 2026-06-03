import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin at module top level so any component importing this
// module has ScrollTrigger available regardless of script execution order.
gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let initialized = false;

// Shared ticker callback so Lenis runs on GSAP's single rAF loop (not a second
// independent requestAnimationFrame). GSAP passes seconds; Lenis wants ms.
const tickerCb = (time: number) => { lenis?.raf(time * 1000); };

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Initialize Lenis smooth scroll + wire it to GSAP ScrollTrigger. Idempotent. */
export function initMotion(): void {
  if (typeof window === 'undefined' || initialized) return;
  initialized = true;

  if (prefersReducedMotion()) {
    // No smooth scroll; ScrollTrigger still works on native scroll for reveals.
    ScrollTrigger.refresh();
    return;
  }

  lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tickerCb);
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.refresh();
}

/** Tear down all triggers + Lenis. Call on astro:before-swap / unload. */
export function destroyMotion(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.ticker.remove(tickerCb);
  lenis?.destroy();
  lenis = null;
  initialized = false;
}

export { gsap, ScrollTrigger };
