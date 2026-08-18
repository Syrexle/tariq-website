# /projects subpage — design

**Date:** 2026-08-18
**Status:** Approved

## Goal

A hidden projects page at `tariqwaseem.com/projects/`, reachable only by direct URL
(no link from the main navigation), styled after https://starl3xx.fun/ — a single
centered column with a hex-clipped avatar card, cursor-tracked tilt, a metallic
nameplate, a randomized quote bubble, social links, and grouped project rows.

## Approach

Reuse the pattern already established by `/content-portfolio`:

- The route is detected in `App()` from `window.location.pathname` and returns a
  different root component.
- A post-build script copies `dist/index.html` to `dist/<route>/index.html` and
  rewrites its meta tags, so GitHub Pages serves a real file per route.
- `dist/404.html` (already produced by the build) is the SPA fallback.

Rejected: a standalone static file in `public/` (bypasses the build, duplicates the
deploy path) and a second Vite entry point (config surface for one page).

## Files

| File | Purpose |
|---|---|
| `src/pages/ProjectsPage.tsx` | page component |
| `src/projectsData.ts` | avatar, nameplate, socials, quotes, project groups — the edit surface |
| `src/projectsPage.css` | styles, scoped under `[data-page='projects']` |
| `src/useTiltParallax.ts` | pointer/gyro/drift tilt hook |
| `scripts/route-meta.mjs` | replaces `content-portfolio-meta.mjs`, driven by a route table |

`main.tsx` replaces the `isContentPortfolioPage` boolean with `resolveRoute()`
returning `'home' | 'content-portfolio' | 'projects'`, so adding a page does not add
another boolean. The page itself lives outside `main.tsx`, which is already 1110 lines.

## Layout

Centered single column, max ~54rem:

1. Hex avatar card — SVG `clipPath`, framed, idle float, cursor-tracked 3D tilt with
   a radial glare that follows the pointer.
2. Metallic nameplate overlapping the card's bottom edge. This is the page's only
   `<h1>`, so the page has exactly one heading.
3. Quote bubble floating right of the card, randomized per load, with a dated link
   back to X. Hidden below 940px — no room beside a centered card.
4. Social row: X, LinkedIn, GitHub with inline SVG icons.
5. Two project rows with a right-aligned label and a hover/focus tooltip:
   - `builds` — the 6 entries from `devProjects`
   - `skills` — the 4 entries from `aiSkills`
   Items are separated by `·`. A `soon` pill is supported per item.

Project items link to their real external URL where one exists (`demoUrl`,
`postUrl`); otherwise they link to the matching section on the main site
(`/#projects`, `/#ai-skills`), so every item is clickable and lands on the
detail already written there.

## Deviations from the reference

- **Fonts** — Soehne is commercially licensed and cannot be shipped. Body text uses
  Inter (already loaded); the nameplate uses IBM Plex Mono for a stamped-plate feel.
- **Palette** — dark only, on the existing site tokens (`--black`, `--cream`,
  `--muted`, `--cyan`). The reference's light-mode blocks are dropped rather than
  half-ported.

## Motion

Lenis and the GSAP hero animations stay off on this route, matching the existing
early return. Float, tilt, glare, and touch-drift are all disabled under
`prefers-reduced-motion`. On iOS the gyroscope is requested from the first tap that
is neither a link nor a tooltip label.

## Supplied later by the user

- Avatar image, supplied as `TariqChef.png` and committed as
  `public/assets/pfp.webp` — cropped square and resized to 700px, 2.4MB to 47KB.
  If the file is ever missing the card renders an inline monogram fallback, so
  the page is never broken.
- Additional tweets for the bubble, as `[text, tweetId, 'MM-DD-YY']` in
  `projectsData.ts`. Seeded with the one real post already in the repo.

## Visibility

No navigation link. Not `noindex` — consistent with `/content-portfolio`.

## Tests

Extending the source-assertion style of `tests/portfolio-interactions.test.mjs`:
route resolution for `/projects` and `/projects/`, CSS scoping, the build script's
route table covering both routes, and both category groups rendering.
