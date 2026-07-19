# Interactive Impact and Allocation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the static allocation disclosure and dense Selected Impact cards with accessible, responsive, ratio-only interactions that reveal one focused detail at a time.

**Architecture:** Move holdings and milestone copy into a typed data module, render each interaction in a focused React component, and keep `main.tsx` responsible only for page composition. Use SVG donut segments for accurate pointer hit areas, real buttons for the milestone rail, document-flow detail panels, and a mobile-only ratio list and milestone detail fallback.

**Tech Stack:** React 19, TypeScript 7, Vite 8, CSS, Node's built-in test runner

---

### Task 1: Add failing portfolio interaction requirements

**Files:**
- Create: `tests/portfolio-interactions.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing source-contract tests**

Create a Node test that reads the current source plus optional future component/data files and asserts:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (path) => existsSync(path) ? readFileSync(path, 'utf8') : ''
const source = [
  read('src/main.tsx'),
  read('src/portfolioData.ts'),
  read('src/components/HoldingsWheel.tsx'),
  read('src/components/ImpactRail.tsx'),
].join('\n')
const styles = read('src/styles.css')

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
  assert.match(source, /onFocus=/)
  assert.match(source, /onClick=/)
})

test('mobile and reduced-motion fallbacks are present', () => {
  assert.match(styles, /holdings-mobile-list/)
  assert.match(styles, /milestone-mobile-detail/)
  assert.match(styles, /prefers-reduced-motion/)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/portfolio-interactions.test.mjs`

Expected: assertion failures for the missing manual date, milestone rail, and mobile interaction styles.

- [ ] **Step 3: Add the test command**

Add to `package.json` scripts:

```json
"test": "node --test tests/*.test.mjs"
```

### Task 2: Create typed portfolio data

**Files:**
- Create: `src/portfolioData.ts`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create exact holdings and milestone data**

Define and export `Holding`, `ImpactSector`, and `ImpactMilestone` types, `portfolioAsOf`, the four holdings, and five milestones. Use these exact public descriptions:

```ts
export const portfolioAsOf = 'July 19, 2026'

export const holdings = [
  { asset: 'BTC', allocation: 80, color: '#f5a43b' },
  { asset: 'veAERO', allocation: 10, color: '#58e5e8' },
  { asset: 'FLR', allocation: 5, color: '#cf6f35' },
  { asset: 'Others', allocation: 5, color: '#9caf8d' },
]
```

Milestone descriptions must include:

- Market Growth: `$25M+` in 40Acres AUM across Aerodrome, Velodrome, Blackhole, and Pharaoh.
- Grants & Incentives: `200K OP`, `$5M` in new AUM, `$3–5M` in loan originations, token-allocation efficiency, and CAPACITR protocol-owned liquidity, vote-directed incentives, and market-responsive reward routing on Hydrex.
- Brand & GTM: institutional redesign, documentation, and alpha-to-mainnet storytelling for agentic yield allocators, revenue-generating instruments, fixed-yield tokenization, and revenue-based financing.
- Web3 Education: the ENI for-credit Maymester collaboration, five years leading BlockchainGSU, curriculum development, college-level teaching to undergraduate and graduate students, and 1,000+ students reached. Include the approved LinkedIn URL.
- Ecosystem Collaboration sectors: WarnerMedia/NFTs, Ledgible/Accounting, Pendle/Fixed Yield, Frax Finance/frxUSD, Citrea/Bitcoin L2, Aerodrome/ve(3,3), and Hydrex/metaDEX.

- [ ] **Step 2: Remove the old string-based `impact`, local `holdings`, and `holdingsGradient` declarations from `src/main.tsx`**

Import the new components only after Tasks 3 and 4 create them.

### Task 3: Build the interactive allocation wheel

**Files:**
- Create: `src/components/HoldingsWheel.tsx`
- Modify: `src/main.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Implement SVG segment interaction**

Create `HoldingsWheel` with `selectedIndex` and `previewIndex` state. Render a background ring and one SVG circle per holding using `pathLength="100"`, `strokeDasharray`, and cumulative `strokeDashoffset`. Each segment must have `role="button"`, `tabIndex={0}`, an asset/percentage `aria-label`, and matching mouse, focus, click, Enter, and Space handlers.

- [ ] **Step 2: Render center status and fallbacks**

The center must use `aria-live="polite"`. With no active item it says `Explore allocation` and `Hover, focus, or tap`; otherwise it shows the asset and ratio. Render `As of: July 19, 2026` below the wheel and a `.holdings-mobile-list` containing all four asset/ratio pairs.

- [ ] **Step 3: Replace the old holdings panel markup**

Import `HoldingsWheel` in `src/main.tsx` and replace the old `.holdings-wheel`, `.holdings-list`, and explanatory paragraph with `<HoldingsWheel />`.

- [ ] **Step 4: Style without publishing dollar values**

Add styles for `.holdings-interactive`, `.holdings-svg`, `.holdings-segment`, `.holdings-center`, `.holdings-status`, and `.holdings-mobile-list`. Segment focus must be visible without relying only on color. Hide the compact list above the mobile breakpoint and show it at or below 680px.

### Task 4: Build the interactive impact rail

**Files:**
- Create: `src/components/ImpactRail.tsx`
- Modify: `src/main.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Implement the rail and detail renderer**

Create an `ImpactDetail` helper that renders a milestone description, the ecosystem sector map when present, and the LinkedIn anchor with `target="_blank"` and `rel="noreferrer"` when present.

Create `ImpactRail` with `selectedIndex` defaulting to `0` and temporary `previewIndex` state. Render five real buttons inside `.impact-rail`; mouse enter/focus previews, mouse leave/blur restores the selected point, and click changes the selected point. Use `aria-pressed` and a visible active node.

- [ ] **Step 2: Add desktop and mobile detail placements**

Render one `.impact-detail` after the desktop rail with `aria-live="polite"`. Also render a `.milestone-mobile-detail` beneath each active mobile button. CSS must show only the desktop detail above 680px and only the in-item detail at or below 680px.

- [ ] **Step 3: Replace the old impact-card grid**

Import `ImpactRail` in `src/main.tsx` and replace `.impact-grid` and its mapped cards with `<ImpactRail />`.

- [ ] **Step 4: Style the five-point rail**

Add a thin horizontal line, five evenly spaced nodes, cyan focus/active styling, a stable document-flow detail panel, compact sector tags, and a vertical mobile rail. Remove obsolete `.impact-grid` and `.impact-card` rules and their media overrides.

### Task 5: Verify GREEN and production behavior

**Files:**
- Test: `tests/portfolio-interactions.test.mjs`
- Verify: `src/main.tsx`, `src/portfolioData.ts`, `src/components/HoldingsWheel.tsx`, `src/components/ImpactRail.tsx`, `src/styles.css`

- [ ] **Step 1: Run source-contract tests**

Run: `npm test`

Expected: 3 tests pass, 0 fail.

- [ ] **Step 2: Run the production build**

Run: `npm run build`

Expected: TypeScript and Vite complete successfully.

- [ ] **Step 3: Verify prohibited and required copy**

Run searches confirming:

- No public `bribing` copy.
- No allocation `balance` or dollar-value fields.
- Exactly one manual `July 19, 2026` source value.
- All five milestone titles and the LinkedIn proof URL are present.
- The legacy `.impact-card` and `.holdings-list` markup are absent.

- [ ] **Step 4: Verify interactions in a local browser**

Run `npm run dev`, then verify desktop and mobile layouts. Exercise pointer hover, keyboard Tab/Enter/Space, and touch-equivalent click selection for all allocation segments and milestones. Confirm content remains in flow, no panel clips, focus is visible, and reduced-motion mode does not animate transitions.

- [ ] **Step 5: Commit and deploy**

Run:

```bash
git add package.json tests/portfolio-interactions.test.mjs src/main.tsx src/portfolioData.ts src/components/HoldingsWheel.tsx src/components/ImpactRail.tsx src/styles.css docs/superpowers/plans/2026-07-19-interactive-impact-allocation.md
git commit -m "Add interactive allocation and impact milestones"
git push origin main
```

Monitor the GitHub Pages workflow and verify the live HTTPS site contains the new content and interactions.
