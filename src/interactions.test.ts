import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createRevealObserver,
  handleScrollClick,
  initInteractions,
  revealElement,
  setupReveal,
  stampJsClass,
} from './interactions'

/**
 * Minimal IntersectionObserver stand-in: records observe/unobserve calls and lets
 * a test fire the observer callback synchronously via `enter()`.
 */
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []
  callback: IntersectionObserverCallback
  observed: Element[] = []
  unobserved: Element[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(el: Element): void {
    this.observed.push(el)
  }

  unobserve(el: Element): void {
    this.unobserved.push(el)
  }

  disconnect(): void {}

  /** Simulate `el` crossing the intersection threshold. */
  enter(el: Element): void {
    this.callback(
      [{ target: el, isIntersecting: true } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}

/** Build a stub Window with controllable reduced-motion + IntersectionObserver.
 *  Pass `io: undefined` to simulate an environment without IntersectionObserver
 *  (an `in` check is used so an explicit undefined is honored, not defaulted). */
function makeWindow(overrides: { reduce?: boolean; io?: unknown } = {}): Window & typeof globalThis {
  const reduce = overrides.reduce ?? false
  const io = 'io' in overrides ? overrides.io : MockIntersectionObserver
  return {
    matchMedia: (query: string) =>
      ({ matches: reduce, media: query }) as unknown as MediaQueryList,
    IntersectionObserver: io,
  } as unknown as Window & typeof globalThis
}

beforeEach(() => {
  MockIntersectionObserver.instances = []
  document.body.innerHTML = ''
  document.documentElement.className = ''
})

describe('handleScrollClick — smooth-scroll delegation', () => {
  it('scrolls the target id into view when a nested child of a trigger is clicked', () => {
    document.body.innerHTML = `
      <button data-scroll-target="dest"><span class="inner">go</span></button>
      <section id="dest"></section>
    `
    const dest = document.getElementById('dest')!
    const scrollSpy = vi.fn()
    dest.scrollIntoView = scrollSpy
    const nested = document.querySelector('.inner')!

    handleScrollClick({ target: nested } as unknown as Event, document, makeWindow())

    expect(scrollSpy).toHaveBeenCalledTimes(1)
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })

  it('uses behavior:auto under prefers-reduced-motion: reduce', () => {
    document.body.innerHTML = `
      <button data-scroll-target="dest">go</button>
      <section id="dest"></section>
    `
    const dest = document.getElementById('dest')!
    const scrollSpy = vi.fn()
    dest.scrollIntoView = scrollSpy
    const trigger = document.querySelector('button')!

    handleScrollClick(
      { target: trigger } as unknown as Event,
      document,
      makeWindow({ reduce: true }),
    )

    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
  })

  it('does nothing when the click lands outside any trigger', () => {
    document.body.innerHTML = `<section id="dest"></section><p class="plain">hi</p>`
    const dest = document.getElementById('dest')!
    const scrollSpy = vi.fn()
    dest.scrollIntoView = scrollSpy
    const plain = document.querySelector('.plain')!

    handleScrollClick({ target: plain } as unknown as Event, document, makeWindow())

    expect(scrollSpy).not.toHaveBeenCalled()
  })

  it('no-ops (does not throw) when the target id has no matching element', () => {
    document.body.innerHTML = `<button data-scroll-target="missing">go</button>`
    const trigger = document.querySelector('button')!

    expect(() =>
      handleScrollClick({ target: trigger } as unknown as Event, document, makeWindow()),
    ).not.toThrow()
  })
})

describe('stampJsClass — no-JS gate', () => {
  it('adds the js class to the given root', () => {
    const root = document.documentElement
    expect(root.classList.contains('js')).toBe(false)

    stampJsClass(root)

    expect(root.classList.contains('js')).toBe(true)
  })
})

describe('revealElement', () => {
  it('adds the is-revealed class', () => {
    const el = document.createElement('div')

    revealElement(el)

    expect(el.classList.contains('is-revealed')).toBe(true)
  })
})

describe('setupReveal — scroll reveal', () => {
  it('observes only [data-reveal] blocks and reveals each once on entry, then unobserves', () => {
    document.body.innerHTML = `
      <div data-reveal id="a"></div>
      <div data-reveal id="b"></div>
      <div id="c"></div>
    `
    const a = document.getElementById('a')!
    const b = document.getElementById('b')!

    setupReveal(document, makeWindow())

    const observer = MockIntersectionObserver.instances[0]
    expect(observer).toBeDefined()
    expect(observer.observed.map((el) => el.id)).toEqual(['a', 'b']) // #c excluded
    expect(a.classList.contains('is-revealed')).toBe(false) // hidden until entry

    observer.enter(a)

    expect(a.classList.contains('is-revealed')).toBe(true)
    expect(observer.unobserved).toContain(a) // stops observing after reveal
    expect(b.classList.contains('is-revealed')).toBe(false) // b not yet entered
  })

  it('reveals everything immediately (no observer) under reduced motion', () => {
    document.body.innerHTML = `<div data-reveal id="a"></div><div data-reveal id="b"></div>`
    const a = document.getElementById('a')!
    const b = document.getElementById('b')!

    setupReveal(document, makeWindow({ reduce: true }))

    expect(a.classList.contains('is-revealed')).toBe(true)
    expect(b.classList.contains('is-revealed')).toBe(true)
    expect(MockIntersectionObserver.instances).toHaveLength(0) // no observer created
  })

  it('reveals everything immediately when IntersectionObserver is unavailable', () => {
    document.body.innerHTML = `<div data-reveal id="a"></div>`
    const a = document.getElementById('a')!

    setupReveal(document, makeWindow({ io: undefined }))

    expect(a.classList.contains('is-revealed')).toBe(true)
  })
})

describe('createRevealObserver', () => {
  it('returns null when IntersectionObserver is unavailable', () => {
    expect(createRevealObserver(makeWindow({ io: undefined }))).toBeNull()
  })

  it('returns an observer when IntersectionObserver is available', () => {
    expect(createRevealObserver(makeWindow())).not.toBeNull()
  })
})

describe('initInteractions — wiring', () => {
  it('stamps js, observes reveal blocks, and delegates clicks to a smooth scroll', () => {
    document.body.innerHTML = `
      <button data-scroll-target="dest">go</button>
      <section id="dest"></section>
      <div data-reveal id="r"></div>
    `
    const dest = document.getElementById('dest')!
    const scrollSpy = vi.fn()
    dest.scrollIntoView = scrollSpy

    // Capture (without registering) the click listener init wires, so the global
    // document is not left with a persistent listener between tests.
    let clickListener: EventListener | undefined
    const addSpy = vi
      .spyOn(document, 'addEventListener')
      .mockImplementation((type: string, listener: unknown) => {
        if (type === 'click') clickListener = listener as EventListener
      })

    initInteractions(document, makeWindow())
    addSpy.mockRestore()

    // js gate stamped
    expect(document.documentElement.classList.contains('js')).toBe(true)
    // reveal block observed (and not yet revealed)
    const observer = MockIntersectionObserver.instances[0]
    expect(observer.observed.map((el) => el.id)).toEqual(['r'])
    // the wired listener performs the delegated smooth scroll
    expect(clickListener).toBeTypeOf('function')
    clickListener!({ target: document.querySelector('button') } as unknown as Event)
    expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })
})
