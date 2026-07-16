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

/**
 * Build-only HTML comment stripper. Runs at transformIndexHtml order 'post' — i.e.
 * AFTER htmlIncludes (order 'pre') has inlined every "<!-- @include: … -->" marker —
 * so it only ever sees real section markup, never the include markers, and thus
 * cannot break the include mechanism or its missing-file hard error. `apply: 'build'`
 * keeps the dev server (and the section files' live working-documentation comments)
 * untouched. Only the comment spans themselves are removed; every surrounding byte is
 * preserved, so all non-comment content stays byte-identical. Downlevel/conditional
 * comments ("<!--[if …]>") are preserved defensively — none exist today.
 */
const HTML_COMMENT_RE = /<!--[\s\S]*?-->/g
function stripHtmlComments(): Plugin {
  return {
    name: 'vcc-strip-html-comments',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(HTML_COMMENT_RE, (comment) =>
          /^<!--\s*\[/.test(comment) ? comment : '',
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [htmlIncludes(), stripHtmlComments()],
  test: {
    environment: 'happy-dom',
  },
})
