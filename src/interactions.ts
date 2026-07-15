/**
 * Site-wide interactions — plain TypeScript, zero dependencies.
 *
 * Implements the interaction contract in docs/ARCHITECTURE.md §9 and the behavior
 * spec docs/spec/40-interactions.md:
 *
 *   1. Smooth in-page scrolling. A single delegated click listener resolves the
 *      nearest [data-scroll-target] ancestor of the click and scrolls the element
 *      with that id into view (`block: 'start'`). Uses `behavior: 'auto'` under
 *      `prefers-reduced-motion: reduce`. (Scroll-padding-top for the fixed nav is
 *      handled globally via the --nav-height token in base.css.)
 *
 *   2. Scroll reveal. `<html>` is stamped with the `js` class at init — the no-JS
 *      gate for the reveal CSS (src/styles/interactions.css). An IntersectionObserver
 *      then adds `is-revealed` to each [data-reveal] block on its first viewport
 *      entry and stops observing it. Under reduced-motion (or with no
 *      IntersectionObserver support) every block is revealed immediately.
 *
 * This module only toggles the `js` / `is-revealed` classes and performs the
 * scroll; ALL reveal presentation lives in src/styles/interactions.css. It
 * self-initializes on import (main.ts does `import './interactions'`). main.ts is
 * a deferred ES module, so the DOM is fully parsed by the time this runs.
 */

const SCROLL_TARGET_ATTR = 'data-scroll-target'
const REVEAL_SELECTOR = '[data-reveal]'
const JS_CLASS = 'js'
const REVEALED_CLASS = 'is-revealed'
/** ~10–15% visible on entry (spec §40.1); 0.1 stays reachable for tall blocks. */
const REVEAL_THRESHOLD = 0.1

/**
 * The browser global scope. `IntersectionObserver` (and other constructors) live
 * on `typeof globalThis`, not the bare `Window` interface, so we intersect the two
 * to read them off an injected window (which keeps the module fully unit-testable).
 */
type BrowserWindow = Window & typeof globalThis

/** True when the user has asked the OS to minimize motion. */
function prefersReducedMotion(win: BrowserWindow): boolean {
  return win.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/**
 * Delegated click handler for smooth in-page scrolling. Resolves the nearest
 * [data-scroll-target] ancestor of the event target (so clicks on markup nested
 * inside a trigger still work) and scrolls its target id into view. No-ops when
 * there is no trigger, no target id, or no element with that id.
 */
export function handleScrollClick(
  event: Event,
  doc: Document = document,
  win: BrowserWindow = window,
): void {
  const origin = event.target
  if (!(origin instanceof Element)) return
  const trigger = origin.closest(`[${SCROLL_TARGET_ATTR}]`)
  if (!trigger) return
  const id = trigger.getAttribute(SCROLL_TARGET_ATTR)
  if (!id) return
  const destination = doc.getElementById(id)
  if (!destination) return
  const behavior: ScrollBehavior = prefersReducedMotion(win) ? 'auto' : 'smooth'
  destination.scrollIntoView({ behavior, block: 'start' })
}

/** Stamp <html> with the `js` class — the no-JS gate for the reveal CSS. */
export function stampJsClass(root: HTMLElement): void {
  root.classList.add(JS_CLASS)
}

/** Mark a single block as revealed. */
export function revealElement(element: Element): void {
  element.classList.add(REVEALED_CLASS)
}

/**
 * Build the reveal IntersectionObserver: reveals each block on first entry, then
 * unobserves it. Returns null when the environment has no IntersectionObserver
 * (the caller then reveals everything immediately).
 */
export function createRevealObserver(win: BrowserWindow): IntersectionObserver | null {
  if (typeof win.IntersectionObserver === 'undefined') return null
  return new win.IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        revealElement(entry.target)
        observer.unobserve(entry.target)
      }
    },
    { threshold: REVEAL_THRESHOLD },
  )
}

/**
 * Wire scroll-reveal for every [data-reveal] block. Under reduced-motion — or with
 * no IntersectionObserver support — every block is revealed immediately; otherwise
 * each is observed and revealed once on entry.
 */
export function setupReveal(doc: Document = document, win: BrowserWindow = window): void {
  const blocks = doc.querySelectorAll(REVEAL_SELECTOR)
  if (prefersReducedMotion(win)) {
    blocks.forEach(revealElement)
    return
  }
  const observer = createRevealObserver(win)
  if (!observer) {
    blocks.forEach(revealElement)
    return
  }
  blocks.forEach((block) => observer.observe(block))
}

/** Wire every interaction. Safe to call once the DOM is parsed. */
export function initInteractions(doc: Document = document, win: BrowserWindow = window): void {
  stampJsClass(doc.documentElement)
  doc.addEventListener('click', (event) => handleScrollClick(event, doc, win))
  setupReveal(doc, win)
}

// Self-initialize on import. main.ts loads this as a deferred module, so the DOM
// (including the footer) is already parsed here.
initInteractions()
