import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : ''
const source = [
  read('src/main.tsx'),
  read('src/portfolioData.ts'),
  read('src/components/ImpactRail.tsx'),
].join('\n')
const styles = read('src/styles.css')
const impactComponent = read('src/components/ImpactRail.tsx')
const mainSource = read('src/main.tsx')

test('selected impact is a five-point interactive milestone rail', () => {
  for (const title of ['Market Growth', 'Grants & Incentives', 'Brand & GTM', 'Web3 Education', 'Ecosystem Collaboration']) {
    assert.match(source, new RegExp(title.replace('&', '\\&')))
  }
  assert.match(source, /impact-rail/)
  assert.match(source, /View supporting post/)
  assert.match(impactComponent, /onFocus=\{\(\) => setSelectedIndex\(index\)\}/)
  assert.match(source, /onClick=/)
  assert.doesNotMatch(source, /Worked across media/)
})

test('mobile and reduced-motion fallbacks are present', () => {
  assert.match(styles, /milestone-mobile-detail/)
  assert.match(styles, /prefers-reduced-motion/)
})

test('public liquidity language avoids bribe terminology', () => {
  assert.doesNotMatch(source, /\bbrib(?:e|ing)\b/i)
  assert.match(source, /vote-directed incentives/)
})

test('lock voting skill tile states its current veHYDX scope and expansion plan', () => {
  const aiSkillsSource = mainSource.match(/const aiSkills = \[[\s\S]*?\n\]/)?.[0] ?? ''

  assert.match(aiSkillsSource, /name: 'Lock Voting Performance Assessment'/)
  assert.match(aiSkillsSource, /file: 'lock-voting-performance-assessment'/)
  assert.match(aiSkillsSource, /supplied wallet/i)
  assert.match(aiSkillsSource, /veHYDX lock NFTs/i)
  assert.match(aiSkillsSource, /CURRENT ASSET: veHYDX/)
  assert.match(aiSkillsSource, /PLANNED: veAERO \/ veNEST/)
  assert.doesNotMatch(aiSkillsSource, /name: 'Hydrex Vote Optimizer'/)
})

test('research library exposes only the approved public abstraction', () => {
  const researchSection = mainSource.match(/<section id="research"[\s\S]*?<\/section>/)?.[0] ?? ''

  assert.match(mainSource, /href="#research"/)
  assert.match(researchSection, /RESEARCH BRIEF 01 \/ TOKENOMICS DESIGN/)
  assert.doesNotMatch(researchSection, /ACTIVE EXPLORATION/)
  assert.match(researchSection, /Tokenized Compute Access/)
  assert.match(researchSection, /staking CAPACITR/i)
  assert.match(researchSection, /transferable token/i)
  assert.match(researchSection, /non-transferable internal credit system/i)
  assert.doesNotMatch(researchSection, /CRG|COGS|liability|FDV|buyback|burn|capacity tier|token threshold|capacitr-charge-model/i)
})

test('research links are safe and the piece index is complete', () => {
  const researchSection = mainSource.match(/<section id="research"[\s\S]*?<\/section>/)?.[0] ?? ''
  const approvedUrls = [
    'https://spec.capacitr.xyz/',
    'https://docs.venice.ai/overview/about-venice',
    'https://excalidraw.com/#json=ew8Q4JivYHPGJpuppUN1z,ZcTl0TrySuUiGycPDnI4PA',
  ]

  for (const url of approvedUrls) assert.match(mainSource, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.doesNotMatch(researchSection, /<iframe/i)

  const externalResearchLinks = [...researchSection.matchAll(/<a[\s\S]*?href=\{researchLinks\.[a-z]+\}[\s\S]*?>/g)]
  assert.equal(externalResearchLinks.length, 5)
  for (const [link] of externalResearchLinks) assert.match(link, /target="_blank" rel="noreferrer"/)
  assert.match(researchSection, /className="research-overview-link"/)
  assert.match(researchSection, /VIEW RESEARCH OVERVIEW/)
  assert.match(researchSection, /className="research-file-list"/)
  const piecesBlock = mainSource.match(/const researchPieces = \[[\s\S]*?\n\]/)?.[0] ?? ''
  assert.equal(piecesBlock.match(/title:/g)?.length, 2)
})

test('research anchor clears the taller mobile header', () => {
  assert.match(
    styles,
    /@media\s*\(max-width:\s*980px\)\s*\{[\s\S]*?\.research-section\s*\{[^}]*scroll-margin-top:\s*9rem;?[^}]*\}/,
  )
})
