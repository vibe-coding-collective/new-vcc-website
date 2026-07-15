import { describe, expect, it } from 'vitest'
import { getAppRoot } from './main'

describe('app shell toolchain smoke test', () => {
  it('runs inside a DOM environment (happy-dom)', () => {
    expect(typeof document).toBe('object')
  })

  it('resolves the #app mount node when it is present', () => {
    document.body.innerHTML = '<main id="app"></main>'
    const root = getAppRoot()
    expect(root).not.toBeNull()
    expect(root?.id).toBe('app')
  })

  it('returns null when the mount node is absent', () => {
    document.body.innerHTML = ''
    expect(getAppRoot()).toBeNull()
  })
})
