import { renameSync, mkdirSync, copyFileSync } from 'node:fs'

// Vite names the output after its entry, but this page is the site root here.
renameSync('dist-standalone/projects.html', 'dist-standalone/index.html')

mkdirSync('dist-standalone/assets', { recursive: true })
copyFileSync('public/assets/pfp.webp', 'dist-standalone/assets/pfp.webp')
