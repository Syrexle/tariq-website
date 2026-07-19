# Research & Writing Section Design

## Goal

Add a portfolio section that demonstrates mechanism-design research and public writing without publishing confidential CAPACITR economics, implementation details, or working documents.

## Placement and navigation

- Add a `[ RESEARCH ]` item to the primary navigation.
- Place the new section after Projects and before AI Skills.
- Use the eyebrow `[ RESEARCH & WRITING ]` and headline `Systems I’m thinking through.`
- Add a short introduction positioning the section as an expanding library of mechanism research and market writing.

## Layout

Use the approved Research Library direction:

- Two balanced cards in a two-column desktop grid.
- Stack the cards in one column on narrow screens.
- Preserve the site’s black and deep-green background, cream editorial type, mono labels, cyan links, amber accents, and fine border system.
- Keep the section in normal document flow and avoid new interactive state.

## Research brief card

### Public title

`Tokenized Compute Access`

### Public framing

Present the work as an abstract mechanism-design exploration:

- Staking CAPACITR unlocks recurring compute capacity.
- The conceptual lineage relates to Venice AI’s VVV/DIEM dual-asset model.
- The open design question is whether compute capacity should be represented by a separate transferable token or by a simpler internal, non-transferable credit system.
- Describe the comparison as active research rather than a finalized CAPACITR product commitment.

### Linked context labels

- `CAPACITR` links to `https://spec.capacitr.xyz/`.
- `VENICE AI` links to `https://docs.venice.ai/overview/about-venice`.
- Both links open in a new tab with `rel="noreferrer"`.

### Confidentiality boundary

Do not copy or expose material from the local `capacitr-charge-model` project beyond the approved abstraction. Specifically exclude:

- formulas, calculations, or worked examples;
- pricing, cost, liability, utilization, reserve, or margin assumptions;
- capacity tiers, thresholds, allocations, or cadence parameters;
- supply, token-price, FDV, buyback, burn, or revenue scenarios;
- internal recommendations, implementation notes, guardrails, checklists, or operations material;
- local filenames, paths, screenshots, or downloadable source documents.

## Yieldverse writing card

- Label the card `FEATURED ARTICLE`.
- Display the title `Got $ETH? Let’s put it to work!`.
- Use the article description `ultrasound passive income go brrrrrrr` as optional supporting copy.
- Link the complete card to `https://yieldverse.substack.com/p/got-eth-lets-put-it-to-work`.
- Use the public Substack cover image as a progressive visual enhancement. The title and link must remain usable if the image fails.
- Add a separate `VISIT YIELDVERSE` link to `https://yieldverse.substack.com/`.
- Add a note that more research briefs and writing will be added as the library expands.
- Do not use an iframe because Substack’s frame policy does not permit the article to be embedded on `tariqwaseem.com`.

## Accessibility and resilience

- Give the article cover meaningful alternative text.
- Preserve visible text labels instead of relying on the cover image or color.
- Ensure all external links have visible focus styling and open safely.
- Keep the card hierarchy readable when images are blocked or slow.
- Respect existing reduced-motion behavior; the section does not require animation.

## Component and data design

- Store the small amount of public research metadata near the other static portfolio content.
- Render the section directly from `src/main.tsx` unless a focused component materially improves clarity.
- Add only the CSS needed for the research grid, brief card, linked context tags, article cover, and mobile stack.
- Add no package dependency and preserve the existing lockfile.

## Verification

- Add source-contract tests for the section ID, navigation link, headline, three approved external URLs, safe new-tab attributes, and confidentiality exclusions.
- Confirm no prohibited internal figures, formulas, tier details, or local paths appear in the website source or built output.
- Run `npm test` and `npm run build`.
- Verify desktop and mobile presentation in a local browser.
- Push to `main`, monitor GitHub Pages, and verify the deployed HTTPS section and links.
