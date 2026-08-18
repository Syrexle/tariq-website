import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const HOME_TITLE = 'Tariq — Visual Development Portfolio'
const HOME_DESCRIPTION =
  'Visual development portfolio for prototypes, web systems, onchain dashboards, and AI-assisted product experiments by Tariq.'
const HOME_OG_DESCRIPTION =
  'Cinematic product interfaces, data-rich dashboards, and visual systems for frontier teams.'

/**
 * One static file per hidden route, so GitHub Pages serves real HTML with its own
 * metadata instead of relying on the 404.html SPA fallback.
 */
export const routes = [
  {
    dir: 'content-portfolio',
    title: 'Tariq Waseem — Content Portfolio',
    description:
      'Tariq Waseem’s crypto content portfolio: social campaigns, protocol writing, documentation, and ecosystem marketing across major chains.',
    // This page is shared by hand rather than by link preview.
    stripSocialPreview: true,
  },
  {
    dir: 'projects',
    title: 'Tariq Waseem — Projects',
    description:
      'Things Tariq Waseem has built: onchain tooling, trading infrastructure, contract prototypes, and agent skills.',
    ogDescription: 'Onchain tooling, trading infrastructure, contract prototypes, and agent skills.',
    stripSocialPreview: false,
  },
]

const SOCIAL_PREVIEW_TAGS = [
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

const replace = (html, from, to) => {
  if (!html.includes(from)) throw new Error(`Missing metadata source: ${from}`)
  return html.replace(from, to)
}

export function buildRouteHtml(source, route) {
  let html = replace(source, `<title>${HOME_TITLE}</title>`, `<title>${route.title}</title>`)
  html = replace(
    html,
    `<meta name="description" content="${HOME_DESCRIPTION}" />`,
    `<meta name="description" content="${route.description}" />`,
  )

  if (route.stripSocialPreview) {
    for (const pattern of SOCIAL_PREVIEW_TAGS) html = html.replace(pattern, '')
    return html
  }

  const ogDescription = route.ogDescription ?? route.description
  html = replace(
    html,
    `<meta property="og:title" content="${HOME_TITLE}" />`,
    `<meta property="og:title" content="${route.title}" />`,
  )
  html = replace(
    html,
    `<meta property="og:description" content="${HOME_OG_DESCRIPTION}" />`,
    `<meta property="og:description" content="${ogDescription}" />`,
  )
  html = replace(
    html,
    '<meta property="og:url" content="https://tariqwaseem.com/" />',
    `<meta property="og:url" content="https://tariqwaseem.com/${route.dir}/" />`,
  )
  html = replace(
    html,
    `<meta name="twitter:title" content="${HOME_TITLE}" />`,
    `<meta name="twitter:title" content="${route.title}" />`,
  )
  html = replace(
    html,
    `<meta name="twitter:description" content="${HOME_OG_DESCRIPTION}" />`,
    `<meta name="twitter:description" content="${ogDescription}" />`,
  )
  return html
}

// Guarded so tests can import the route table without writing to dist/.
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const source = readFileSync('dist/index.html', 'utf8')
  for (const route of routes) {
    mkdirSync(`dist/${route.dir}`, { recursive: true })
    const target = `dist/${route.dir}/index.html`
    copyFileSync('dist/index.html', target)
    writeFileSync(target, buildRouteHtml(source, route))
  }
}
