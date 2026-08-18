import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Builds the projects page on its own, for hosting separately from the main site.
 * publicDir is off so the resumes, OG image, and source artwork in public/ stay
 * out of it; scripts/build-standalone.mjs copies across the one asset it needs.
 */
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: false,
  build: {
    outDir: 'dist-standalone',
    emptyOutDir: true,
    rollupOptions: { input: 'projects.html' },
  },
})
