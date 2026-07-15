/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

/**
 * Build-time HTML includes — inline, dependency-free.
 *
 * Marker syntax in index.html:  <!-- @include: src/sections/01-nav-sticky.html -->
 * Each marker is replaced with the referenced file's contents at DEV and BUILD
 * time (transformIndexHtml, order 'pre'). A missing file is a hard error that
 * fails the build, naming the marker. In dev, editing any src/sections/*.html
 * triggers a full reload.
 */
const INCLUDE_RE = /<!--\s*@include:\s*(\S+?)\s*-->/g

function htmlIncludes(): Plugin {
  let root = process.cwd()
  return {
    name: 'vcc-html-includes',
    configResolved(config) {
      root = config.root
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(INCLUDE_RE, (_marker, file: string) => {
          const abs = resolve(root, file)
          try {
            return readFileSync(abs, 'utf8')
          } catch {
            throw new Error(
              `[vcc-html-includes] missing include "${file}" (resolved: ${abs}). ` +
                'Every "<!-- @include: … -->" marker must point at an existing file.',
            )
          }
        })
      },
    },
    configureServer(server) {
      const dir = resolve(root, 'src/sections')
      server.watcher.add(dir)
      server.watcher.on('change', (file) => {
        if (file.startsWith(dir) && file.endsWith('.html')) {
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [htmlIncludes()],
  test: {
    environment: 'happy-dom',
  },
})
