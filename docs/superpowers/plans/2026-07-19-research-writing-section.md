# Research & Writing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public-safe Research & Writing library with a CAPACITR/Venice mechanism brief and a featured Yieldverse article.

**Architecture:** Keep the public metadata in `src/main.tsx`, render a static two-card section between Projects and AI Skills, and style it with the existing editorial system. Extend the Node source-contract tests so approved links and copy are required while confidential CAPACITR model details are forbidden.

**Tech Stack:** React 19, TypeScript 7, Vite 8, CSS, Node built-in test runner

---

### Task 1: Add public-content and confidentiality requirements

**Files:**
- Modify: `tests/portfolio-interactions.test.mjs`

- [ ] **Step 1: Add failing Research section tests**

Read `src/main.tsx` separately as `mainSource`, extract the Research section, and add these assertions:

```js
const mainSource = read('src/main.tsx')

test('research library exposes only the approved public abstraction', () => {
  const researchSection = mainSource.match(/<section id="research"[\s\S]*?<\/section>/)?.[0] ?? ''

  assert.match(mainSource, /href="#research"/)
  assert.match(researchSection, /Tokenized Compute Access/)
  assert.match(researchSection, /staking CAPACITR/i)
  assert.match(researchSection, /transferable token/i)
  assert.match(researchSection, /internal credit system/i)
  assert.doesNotMatch(researchSection, /CRG|COGS|liability|FDV|buyback|burn|capacity tier|token threshold|capacitr-charge-model/i)
})

test('research links and featured Yieldverse article are safe and complete', () => {
  const researchSection = mainSource.match(/<section id="research"[\s\S]*?<\/section>/)?.[0] ?? ''
  const approvedUrls = [
    'https://spec.capacitr.xyz/',
    'https://docs.venice.ai/overview/about-venice',
    'https://yieldverse.substack.com/',
    'https://yieldverse.substack.com/p/got-eth-lets-put-it-to-work',
  ]

  for (const url of approvedUrls) assert.match(researchSection, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  assert.match(researchSection, /Got \$ETH\? Let’s put it to work!/)
  assert.match(researchSection, /alt="Yieldverse article cover for Got \$ETH\? Let’s put it to work!"/)
  assert.doesNotMatch(researchSection, /<iframe/i)
  assert.match(researchSection, /target="_blank" rel="noreferrer"/)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: the two Research tests fail because the section and links do not exist.

### Task 2: Add Research metadata and markup

**Files:**
- Modify: `src/main.tsx`
- Test: `tests/portfolio-interactions.test.mjs`

- [ ] **Step 1: Add public metadata near the existing static portfolio data**

```ts
const researchLinks = {
  capacitr: 'https://spec.capacitr.xyz/',
  venice: 'https://docs.venice.ai/overview/about-venice',
  yieldverse: 'https://yieldverse.substack.com/',
  article: 'https://yieldverse.substack.com/p/got-eth-lets-put-it-to-work',
  articleImage: 'https://substackcdn.com/image/fetch/$s_!IYHm!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6d018b36-8735-4692-8547-0a029d0d654f_1500x500.png',
}
```

- [ ] **Step 2: Add the Research navigation link**

Insert `<a href="#research">[ RESEARCH ]</a>` after Projects.

- [ ] **Step 3: Render the approved two-card library**

Insert this section after Projects and before AI Skills:

```tsx
<section id="research" className="research-section">
  <p className="eyebrow">[ RESEARCH & WRITING ]</p>
  <div className="research-intro">
    <h2>Systems I’m thinking through.</h2>
    <p>An expanding library of mechanism research and market writing focused on token utility, compute access, and productive onchain capital.</p>
  </div>
  <div className="research-grid">
    <article className="research-card research-brief-card">
      <span className="research-card-label">RESEARCH BRIEF 01 / ACTIVE EXPLORATION</span>
      <h3>Tokenized Compute Access</h3>
      <p>Researching how staking CAPACITR could unlock recurring compute capacity, informed by Venice AI’s VVV/DIEM dual-asset model.</p>
      <div className="research-context-links" aria-label="Research context">
        <a href={researchLinks.capacitr} target="_blank" rel="noreferrer">CAPACITR ↗</a>
        <a href={researchLinks.venice} target="_blank" rel="noreferrer">VENICE AI ↗</a>
      </div>
      <div className="research-question">
        <span>OPEN DESIGN QUESTION</span>
        <strong>Transferable token or internal credit system?</strong>
        <p>The research weighs composability against a simpler capacity layer that stays inside the product.</p>
      </div>
    </article>
    <article className="research-card research-article-card">
      <a className="research-article-cover" href={researchLinks.article} target="_blank" rel="noreferrer">
        <img src={researchLinks.articleImage} alt="Yieldverse article cover for Got $ETH? Let’s put it to work!" />
      </a>
      <div className="research-article-content">
        <span className="research-card-label">FEATURED ARTICLE / YIELDVERSE</span>
        <h3><a href={researchLinks.article} target="_blank" rel="noreferrer">Got $ETH? Let’s put it to work!</a></h3>
        <p>ultrasound passive income go brrrrrrr</p>
        <div className="research-article-links">
          <a href={researchLinks.article} target="_blank" rel="noreferrer">[ READ ARTICLE → ]</a>
          <a href={researchLinks.yieldverse} target="_blank" rel="noreferrer">[ VISIT YIELDVERSE → ]</a>
        </div>
      </div>
    </article>
  </div>
  <p className="research-expansion-note">More mechanism research and writing will be added as the library grows.</p>
</section>
```

### Task 3: Style the Research Library

**Files:**
- Modify: `src/styles.css`
- Test: `tests/portfolio-interactions.test.mjs`

- [ ] **Step 1: Add desktop styles**

Add `.research-section` to the shared section-padding selector, then add styles for a two-column `.research-grid`, bordered `.research-card` surfaces, cyan context tags, an amber-accented question block, a 16:9 article cover with a gradient fallback, and mono article actions. All link focus states must use a visible cyan outline.

```css
.research-section { background: radial-gradient(circle at 82% 8%, rgba(88,229,232,.1), transparent 25rem), rgba(3,5,4,.94); border-bottom: 1px solid var(--line); }
.research-intro { display:grid; grid-template-columns:minmax(0,1fr) minmax(280px,34rem); gap:clamp(1.5rem,5vw,5rem); align-items:end; margin-bottom:3rem; }
.research-intro p { margin:0; color:var(--muted); line-height:1.75; }
.research-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1px; border:1px solid var(--line); background:var(--line); }
.research-card { min-width:0; min-height:32rem; background:rgba(3,5,4,.82); }
.research-brief-card { display:flex; flex-direction:column; gap:1.25rem; padding:clamp(1.25rem,3vw,2rem); }
.research-card-label { color:var(--sage); font-family:'IBM Plex Mono',monospace; font-size:.66rem; letter-spacing:.08em; text-transform:uppercase; }
.research-card h3 { font-size:clamp(2.5rem,4.4vw,5rem); line-height:.92; }
.research-card p { margin:0; color:rgba(242,238,230,.76); line-height:1.7; }
.research-context-links,.research-article-links { display:flex; flex-wrap:wrap; gap:.55rem; }
.research-context-links a,.research-article-links a { padding:.6rem .72rem; border:1px solid rgba(88,229,232,.42); color:var(--cyan); font-family:'IBM Plex Mono',monospace; font-size:.68rem; letter-spacing:.06em; }
.research-context-links a:focus-visible,.research-article-links a:focus-visible,.research-article-card h3 a:focus-visible,.research-article-cover:focus-visible { outline:2px solid var(--cyan); outline-offset:.25rem; }
.research-question { margin-top:auto; padding:1rem; border-left:3px solid var(--amber); background:linear-gradient(90deg,rgba(245,164,59,.1),rgba(88,229,232,.04)); }
.research-question span { color:var(--amber); font-family:'IBM Plex Mono',monospace; font-size:.62rem; letter-spacing:.08em; }
.research-question strong { display:block; margin:.7rem 0; color:var(--cream); font-size:1.05rem; }
.research-article-card { display:grid; grid-template-rows:auto 1fr; overflow:hidden; }
.research-article-cover { display:block; aspect-ratio:16/9; background:linear-gradient(135deg,rgba(245,164,59,.18),rgba(88,229,232,.12)); overflow:hidden; }
.research-article-cover img { width:100%; height:100%; object-fit:cover; }
.research-article-content { display:flex; flex-direction:column; gap:1.15rem; padding:clamp(1.25rem,3vw,2rem); }
.research-article-content h3 { font-size:clamp(2rem,3.5vw,3.8rem); }
.research-article-links { margin-top:auto; }
.research-expansion-note { margin:1.2rem 0 0; color:var(--sage); font-family:'IBM Plex Mono',monospace; font-size:.68rem; letter-spacing:.06em; }
```

- [ ] **Step 2: Add the responsive stack**

Add `.research-intro` to the 980px one-column selector and add `.research-grid { grid-template-columns:1fr; }` at 640px.

- [ ] **Step 3: Run tests and build**

Run: `npm test && npm run build`

Expected: all tests pass and Vite completes successfully.

- [ ] **Step 4: Commit the implementation**

```bash
git add tests/portfolio-interactions.test.mjs src/main.tsx src/styles.css docs/superpowers/plans/2026-07-19-research-writing-section.md
git commit -m "Add research and writing library"
```

### Task 4: Verify privacy, presentation, and deployment

**Files:**
- Verify: `src/main.tsx`
- Verify: `dist/`

- [ ] **Step 1: Run confidentiality and link checks**

Run focused searches against the Research section and production output. Confirm the four approved URLs are present and the prohibited internal terms, local paths, formulas, and tier details are absent.

- [ ] **Step 2: Verify desktop and mobile locally**

Run `npm run dev`. Confirm the Research navigation link scrolls to the new section; the two cards render side-by-side on desktop and stacked on mobile; all links are keyboard accessible; and the article remains readable with its image disabled.

- [ ] **Step 3: Push and monitor Pages**

```bash
git push origin main
```

Monitor the GitHub Pages workflow until it succeeds.

- [ ] **Step 4: Verify the live HTTPS site**

Open `https://tariqwaseem.com/#research`, confirm the section, approved abstract, article cover/title, newsletter link, and four external destinations are present, and confirm there are no browser console errors.
