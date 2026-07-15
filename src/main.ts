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
 * For the contracts phase this only wires the global stylesheets and resolves
 * the mount node. Section markup is inlined into index.html at BUILD time by the
 * `vcc-html-includes` Vite plugin (see vite.config.ts), so there is nothing to
 * render here yet. Interactive behavior (sticky/smooth-scroll nav, scroll-reveal,
 * sponsor marquee) arrives in a later phase against the data-attribute contract
 * documented in docs/ARCHITECTURE.md.
 */
export function getAppRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('#app')
}

// Resolve the mount node on load. Intentionally does nothing else yet.
getAppRoot()
