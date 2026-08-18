import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs'

const routeDir = 'dist/content-portfolio'
const routeHtml = `${routeDir}/index.html`

mkdirSync(routeDir, { recursive: true })
copyFileSync('dist/index.html', routeHtml)

let html = readFileSync(routeHtml, 'utf8')

const replacements = new Map([
  ['<title>Tariq — Visual Development Portfolio</title>', '<title>Tariq Waseem — Content Portfolio</title>'],
  ['<meta name="description" content="Visual development portfolio for prototypes, web systems, onchain dashboards, and AI-assisted product experiments by Tariq." />', '<meta name="description" content="Tariq Waseem’s crypto content portfolio: social campaigns, protocol writing, documentation, and ecosystem marketing across major chains." />'],
  ['<meta property="og:title" content="Tariq — Visual Development Portfolio" />', '<meta property="og:title" content="Tariq Waseem’s Content Portfolio" />'],
  ['<meta property="og:description" content="Cinematic product interfaces, data-rich dashboards, and visual systems for frontier teams." />', '<meta property="og:description" content="Crypto-native social campaigns, long-form product writing, Mintlify docs, and ecosystem marketing examples across 240K+ combined follower reach." />'],
  ['<meta property="og:url" content="https://tariqwaseem.com/" />', '<meta property="og:url" content="https://tariqwaseem.com/content-portfolio/" />'],
  ['<meta property="og:image" content="https://tariqwaseem.com/og-image.png" />', '<meta property="og:image" content="https://tariqwaseem.com/content-portfolio-og.png" />'],
  ['<meta property="og:image:alt" content="Tariq visual development portfolio hero banner" />', '<meta property="og:image:alt" content="Tariq Waseem content portfolio preview card" />'],
  ['<meta name="twitter:title" content="Tariq — Visual Development Portfolio" />', '<meta name="twitter:title" content="Tariq Waseem’s Content Portfolio" />'],
  ['<meta name="twitter:description" content="Cinematic product interfaces, data-rich dashboards, and visual systems for frontier teams." />', '<meta name="twitter:description" content="Crypto-native social campaigns, long-form product writing, Mintlify docs, and ecosystem marketing examples across 240K+ combined follower reach." />'],
  ['<meta name="twitter:image" content="https://tariqwaseem.com/og-image.png" />', '<meta name="twitter:image" content="https://tariqwaseem.com/content-portfolio-og.png" />'],
  ['<meta name="twitter:image:alt" content="Tariq visual development portfolio hero banner" />', '<meta name="twitter:image:alt" content="Tariq Waseem content portfolio preview card" />'],
])

for (const [from, to] of replacements) {
  if (!html.includes(from)) throw new Error(`Missing metadata source: ${from}`)
  html = html.replace(from, to)
}

writeFileSync(routeHtml, html)

if (!existsSync('dist/content-portfolio-og.png')) {
  copyFileSync('public/content-portfolio-og.png', 'dist/content-portfolio-og.png')
}
