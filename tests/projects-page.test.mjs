import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolveRoute } from '../src/routes.ts'
import { buildRouteHtml, routes } from '../scripts/route-meta.mjs'

const read = (path) => readFileSync(path, 'utf8')
const mainSource = read('src/main.tsx')
const pageSource = read('src/pages/ProjectsPage.tsx')
const pageStyles = read('src/projectsPage.css')
const tiltSource = read('src/useTiltParallax.ts')
const indexHtml = read('index.html')
// projectsData is .tsx since it embeds JSX, which node cannot import, so it is
// asserted as source text like the rest of this suite.
const data = read('src/projectsData.tsx')

test('the projects route resolves with or without a trailing slash', () => {
  assert.equal(resolveRoute('/projects'), 'projects')
  assert.equal(resolveRoute('/projects/'), 'projects')
  assert.equal(resolveRoute('/content-portfolio/'), 'content-portfolio')
  assert.equal(resolveRoute('/growth-portfolio/'), 'growth')
  assert.equal(resolveRoute('/'), 'home')
  assert.equal(resolveRoute('/projects-archive'), 'home')
  assert.equal(mainSource.match(/if \(route === 'projects'\) return <ProjectsPage \/>/g).length, 1)
})

test('the projects page is reachable only by direct URL', () => {
  const nav = mainSource.slice(mainSource.indexOf('<nav aria-label="Primary navigation">'))
  const navMarkup = nav.slice(0, nav.indexOf('</nav>'))
  assert.match(navMarkup, /href="\/content-portfolio\/"/)
  assert.doesNotMatch(navMarkup, /href="\/projects/)
  assert.doesNotMatch(navMarkup, /href="\/growth-portfolio/)
})

test('the build emits a static file per hidden route', () => {
  assert.deepEqual(routes.map((route) => route.dir), ['content-portfolio', 'growth-portfolio', 'projects'])

  const projects = buildRouteHtml(indexHtml, routes.find((route) => route.dir === 'projects'))
  assert.match(projects, /<title>Tariq Waseem — Projects<\/title>/)
  assert.match(projects, /<meta property="og:url" content="https:\/\/tariqwaseem\.com\/projects\/" \/>/)
  assert.match(projects, /<meta property="og:image" content=/)

  const content = buildRouteHtml(indexHtml, routes.find((route) => route.dir === 'content-portfolio'))
  assert.match(content, /<title>Tariq Waseem — Content Portfolio<\/title>/)
  assert.doesNotMatch(content, /og:image|twitter:card/)

  const growth = buildRouteHtml(indexHtml, routes.find((route) => route.dir === 'growth-portfolio'))
  assert.match(growth, /<title>Tariq Waseem — Growth Outcomes<\/title>/)
  assert.doesNotMatch(growth, /og:image|twitter:card/)
})

test('page styles cannot reach the rest of the site', () => {
  const css = pageStyles
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, '')

  const selectorGroups = []
  let buffer = ''
  for (const character of css) {
    if (character === '{') { selectorGroups.push(buffer.trim()); buffer = '' }
    else if (character === '}') { buffer = '' }
    else buffer += character
  }

  const checked = selectorGroups.filter((group) => group && !group.startsWith('@'))
  assert.ok(checked.length > 20, 'expected the stylesheet to declare selectors')
  for (const group of checked) {
    for (const selector of group.split(',').map((part) => part.trim()).filter(Boolean)) {
      const scoped = selector.startsWith('.pp-') || selector.startsWith("[data-page='projects']")
      assert.ok(scoped, `unscoped selector: ${selector}`)
    }
  }
})

test('both project groups render every entry', () => {
  const groups = [...data.matchAll(/label: '([^']+)',\n\s*tip: '([^']+)',\n\s*items: \[([\s\S]*?)\n    \],/g)]
    .map(([, label, tip, items]) => ({ label, tip, hrefs: [...items.matchAll(/href: '([^']+)'/g)].map((m) => m[1]) }))

  assert.deepEqual(groups.map((g) => g.label), ['on-chain', 'off-chain', 'skills'])
  assert.deepEqual(groups.map((g) => g.hrefs.length), [3, 3, 4])
  for (const group of groups) {
    assert.ok(group.tip.length > 20, `${group.label} needs a tooltip`)
    for (const href of group.hrefs) assert.match(href, /^https:\/\//, 'links must be absolute')
  }

  // Scoped to the array: the type union above it lists the same names.
  const socialsBlock = data.match(/export const socials: SocialLink\[\] = \[([\s\S]*?)\n\]/)?.[1] ?? ''
  const icons = [...socialsBlock.matchAll(/icon: '([a-z]+)'/g)].map((m) => m[1])
  assert.deepEqual(icons, ['x', 'linkedin', 'github', 'website'])
  assert.match(pageSource, /projectGroups\.map/)
  assert.match(pageSource, /data-tip=\{group\.tip\}/)
})

test('a missing avatar file falls back instead of breaking the card', () => {
  assert.match(pageSource, /onError=\{\(\) => setAvatarFailed\(true\)\}/)
  assert.match(pageSource, /className="pp-monogram"/)
})

test('motion is disabled when the visitor asks for less of it', () => {
  assert.match(tiltSource, /matchMedia\('\(prefers-reduced-motion: reduce\)'\)\.matches\) return/)
  assert.match(pageStyles, /@media \(prefers-reduced-motion: reduce\)/)
})
