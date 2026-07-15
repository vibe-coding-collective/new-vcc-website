import './styles/base.css'

/**
 * Application entry point.
 *
 * Real bootstrapping (rendering, routing, content) arrives with the design and
 * contracts work. For now this only wires the global stylesheet and resolves
 * the mount node, giving the toolchain a small, honest surface to exercise.
 */
export function getAppRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('#app')
}

// Resolve the mount node on load. Intentionally does nothing else yet.
getAppRoot()
