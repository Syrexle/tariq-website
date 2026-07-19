import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import {
  clearAllocationSelection,
  resolveAllocation,
  selectAllocation,
} from '../src/portfolioInteractions.ts'

const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : ''
const source = [
  read('src/main.tsx'),
  read('src/portfolioData.ts'),
  read('src/components/HoldingsWheel.tsx'),
  read('src/components/ImpactRail.tsx'),
].join('\n')
const styles = read('src/styles.css')
const impactComponent = read('src/components/ImpactRail.tsx')

test('allocation disclosure is manual, ratio-only, and totals 100 percent', () => {
  assert.match(source, /portfolioAsOf\s*=\s*'July 19, 2026'/)
  const allocations = [...source.matchAll(/allocation:\s*(\d+)/g)].map((match) => Number(match[1]))
  assert.equal(allocations.reduce((sum, value) => sum + value, 0), 100)
  assert.doesNotMatch(source, /balance:\s*['"`$]/i)
  assert.match(source, /aria-live="polite"/)
})

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
  assert.match(styles, /holdings-mobile-list/)
  assert.match(styles, /milestone-mobile-detail/)
  assert.match(styles, /prefers-reduced-motion/)
})

test('allocation focus does not draw a rectangular SVG outline', () => {
  const focusRule = styles.match(/\.holdings-hitarea:focus-visible\s*\{([^}]*)\}/s)

  assert.ok(focusRule, 'expected a focus-visible rule for allocation segments')
  assert.match(focusRule[1], /\boutline\s*:\s*none/)
  assert.match(source, /<button[\s\S]*?className="holdings-hitarea"/)
})

test('allocation focus and tap use durable state that clears on blur', () => {
  const focused = selectAllocation(2)

  assert.equal(resolveAllocation(focused, null), 2)
  assert.equal(resolveAllocation(focused, 1), 1)
  assert.equal(resolveAllocation(focused, null), 2)
  assert.equal(clearAllocationSelection(), null)
  assert.match(source, /onFocus=\{\(\) => setSelectedIndex\(index\)\}/)
  assert.match(source, /onBlur=\{\(\) => setSelectedIndex\(clearAllocationSelection\(\)\)\}/)
})

test('public liquidity language avoids bribe terminology', () => {
  assert.doesNotMatch(source, /\bbrib(?:e|ing)\b/i)
  assert.match(source, /vote-directed incentives/)
})
