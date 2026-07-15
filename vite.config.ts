/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  // Static single-page shell for now. To grow into a Vite MPA, register each
  // additional root-level .html entry under build.rollupOptions.input
  // (e.g. { main: 'index.html', about: 'about.html' }).
  test: {
    environment: 'happy-dom',
  },
})
