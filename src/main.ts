// Global stylesheets, in cascade order: tokens (custom properties) → fonts
// (@font-face) → base (reset + shared component classes) → sections (per-section
// styles, imported in DOM order). See docs/ARCHITECTURE.md.
import './styles/tokens.css'
import './styles/fonts.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/interactions.css'
import './interactions'

/**
 * Application entry point.
 *
 * Wires the global stylesheets and the interactions module. Section markup is
 * inlined into index.html at BUILD time by the `vcc-html-includes` Vite plugin
 * (see vite.config.ts), so nothing renders from here. Interactive behavior
 * (smooth-scroll via [data-scroll-target], scroll-reveal via [data-reveal])
 * lives in ./interactions.ts against the data-attribute contract in
 * docs/ARCHITECTURE.md §9; the sponsor marquee is pure CSS in section 03.
 */
export function getAppRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('#app')
}

// Resolve the mount node on load. Intentionally does nothing else yet.
getAppRoot()
