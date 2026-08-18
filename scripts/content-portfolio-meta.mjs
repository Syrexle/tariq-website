import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'

const routeDir = 'dist/content-portfolio'
const routeHtml = `${routeDir}/index.html`

mkdirSync(routeDir, { recursive: true })
copyFileSync('dist/index.html', routeHtml)

let html = readFileSync(routeHtml, 'utf8')

const replacements = new Map([
  ['<title>Tariq — Visual Development Portfolio</title>', '<title>Tariq Waseem — Content Portfolio</title>'],
  ['<meta name="description" content="Visual development portfolio for prototypes, web systems, onchain dashboards, and AI-assisted product experiments by Tariq." />', '<meta name="description" content="Tariq Waseem’s crypto content portfolio: social campaigns, protocol writing, documentation, and ecosystem marketing across major chains." />'],
  ['<meta property="og:title" content="Tariq — Visual Development Portfolio" />', '<meta property="og:title" content="Tariq Waseem’s Content Portfolio" />'],
  ['<meta property="og:description" content="Cinematic product interfaces, data-rich dashboards, and visual systems for frontier teams." />', '<meta property="og:description" content="Crypto-native social campaigns, long-form product writing, Mintlify docs, and ecosystem marketing examples across 399K+ combined follower reach." />'],
  ['<meta property="og:url" content="https://tariqwaseem.com/" />', '<meta property="og:url" content="https://tariqwaseem.com/content-portfolio/" />'],
  ['<meta name="twitter:title" content="Tariq — Visual Development Portfolio" />', '<meta name="twitter:title" content="Tariq Waseem’s Content Portfolio" />'],
  ['<meta name="twitter:description" content="Cinematic product interfaces, data-rich dashboards, and visual systems for frontier teams." />', '<meta name="twitter:description" content="Crypto-native social campaigns, long-form product writing, Mintlify docs, and ecosystem marketing examples across 399K+ combined follower reach." />'],
])

for (const [from, to] of replacements) {
  if (!html.includes(from)) throw new Error(`Missing metadata source: ${from}`)
  html = html.replace(from, to)
}

const imageMetaTags = [
  /\n\s*<meta property="og:image" content="[^"]+" \/>/,
  /\n\s*<meta property="og:image:width" content="[^"]+" \/>/,
  /\n\s*<meta property="og:image:height" content="[^"]+" \/>/,
  /\n\s*<meta property="og:image:alt" content="[^"]+" \/>/,
  /\n\s*<meta name="twitter:image" content="[^"]+" \/>/,
  /\n\s*<meta name="twitter:image:alt" content="[^"]+" \/>/,
]

for (const pattern of imageMetaTags) {
  html = html.replace(pattern, '')
}

writeFileSync(routeHtml, html)
