import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'

const routeDir = 'dist/content-portfolio'
const routeHtml = `${routeDir}/index.html`

mkdirSync(routeDir, { recursive: true })
copyFileSync('dist/index.html', routeHtml)

let html = readFileSync(routeHtml, 'utf8')

const replacements = new Map([
  ['<title>Tariq — Visual Development Portfolio</title>', '<title>Tariq Waseem — Content Portfolio</title>'],
  ['<meta name="description" content="Visual development portfolio for prototypes, web systems, onchain dashboards, and AI-assisted product experiments by Tariq." />', '<meta name="description" content="Tariq Waseem’s crypto content portfolio: social campaigns, protocol writing, documentation, and ecosystem marketing across major chains." />'],
  ['<meta property="og:url" content="https://tariqwaseem.com/" />', '<meta property="og:url" content="https://tariqwaseem.com/content-portfolio/" />'],
])

for (const [from, to] of replacements) {
  if (!html.includes(from)) throw new Error(`Missing metadata source: ${from}`)
  html = html.replace(from, to)
}

const socialPreviewMetaTags = [
  /\n\s*<meta property="og:title" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:description" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:type" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:url" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:image" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:image:width" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:image:height" content="[^"]+" \/>/g,
  /\n\s*<meta property="og:image:alt" content="[^"]+" \/>/g,
  /\n\s*<meta name="twitter:card" content="[^"]+" \/>/g,
  /\n\s*<meta name="twitter:title" content="[^"]+" \/>/g,
  /\n\s*<meta name="twitter:description" content="[^"]+" \/>/g,
  /\n\s*<meta name="twitter:image" content="[^"]+" \/>/g,
  /\n\s*<meta name="twitter:image:alt" content="[^"]+" \/>/g,
]

for (const pattern of socialPreviewMetaTags) {
  html = html.replace(pattern, '')
}

writeFileSync(routeHtml, html)
