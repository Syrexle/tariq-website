# Interactive Impact and Allocation Design

## Goal

Reduce the amount of portfolio text visible at once while making the allocation wheel and Selected Impact section more informative through hover, keyboard-focus, and tap interactions.

## Allocation wheel

### Content

- Keep the current ratios: BTC 80%, veAERO 10%, FLR 5%, and Others 5%.
- Show ratios only; do not publish account balances or dollar values.
- Add the manual status line `As of: July 19, 2026`.
- Treat the status date as the date the allocation ratios were last reviewed. It must not advance automatically.

### Interaction

- Replace the CSS-only background wheel with four interactive segments that retain the current colors and proportions.
- The default center state prompts the visitor to hover, focus, or tap a segment.
- An active segment displays its asset name and percentage in the center of the wheel.
- Remove the persistent desktop holdings list.
- Provide a compact ratio list below the wheel on touch-sized layouts so the information never depends on hover.
- Keyboard focus and tap must produce the same result as pointer hover. A tap remains selected until another segment is selected or focus moves away.

## Selected Impact milestone rail

### Structure

- Replace the four full-text cards with a five-point horizontal milestone rail.
- The five titles remain visible: `Market Growth`, `Grants & Incentives`, `Brand & GTM`, `Web3 Education`, and `Ecosystem Collaboration`.
- Hovering, focusing, or tapping a point reveals one description at a time in a dedicated detail panel beneath the rail.
- Use a vertical five-item rail or stacked selector on narrow screens, with the active description directly below its title.

### Milestone content

#### Market Growth

Contributed to $25M+ in 40Acres assets under management across locks on Aerodrome, Velodrome, Blackhole, and Pharaoh.

#### Grants & Incentives

Led the rollout of a 200K OP grant program that generated $5M in new 40Acres AUM and $3–5M in loan originations across Velodrome on Optimism and Aerodrome on Base, while maintaining efficient token allocation. Applying that experience at CAPACITR through protocol-owned liquidity management, vote-directed incentives, and market-responsive reward routing on Hydrex.

Use professional market language such as `vote-directed incentives`, `incentive-market participation`, and `emissions allocation`; do not use `bribing` in public copy.

#### Brand & GTM

Led 40Acres' institutional brand redesign, documentation, and product storytelling from alpha through mainnet across agentic yield allocators, revenue-generating instruments, fixed-yield tokenization, and revenue-based financing.

#### Web3 Education

Collaborated with Georgia State University's Entrepreneurship & Innovation Institute to help create its first for-credit Maymester course covering blockchain's role in commerce. During five years leading BlockchainGSU, organized educational programming, developed curricula, and taught college-level courses and lectures on blockchain, DeFi, NFTs, and cryptocurrency to undergraduate and graduate students, reaching more than 1,000 students.

Include a proof link labeled `View supporting post` that opens this LinkedIn post in a new tab:

`https://www.linkedin.com/posts/tariqwaseem_atlanta-blockchaingsu-bgsu-ugcPost-6929572303324266496-EY7O/`

#### Ecosystem Collaboration

Show a compact sector map instead of one long paragraph:

- WarnerMedia — NFTs
- Ledgible — Accounting
- Pendle — Fixed Yield
- Frax Finance — frxUSD
- Citrea — Bitcoin L2
- Aerodrome — ve(3,3)
- Hydrex — metaDEX

CAPACITR belongs in Grants & Incentives rather than this general collaboration list because it is current, substantive advisory work.

## Component and state design

- Store allocation segments and milestones as typed data near the existing portfolio content in `src/main.tsx`.
- Add one active-allocation state and one active-milestone state. Pointer hover may temporarily reveal an item; keyboard focus and tap must set the durable active item.
- Keep the detail panels in the document flow so revealing content does not overlap neighboring sections or clip at viewport edges.
- Use buttons for milestone points and chart segments so keyboard behavior and accessible names are native.
- Announce the allocation percentage and milestone description through visible text rather than relying on color or tooltip-only content.
- If JavaScript interaction is unavailable, the narrow-layout ratio list and milestone titles still provide a meaningful summary.

## Visual direction

- Preserve the current dark editorial palette, mono labels, cyan focus treatment, and amber/sage allocation colors.
- Use one thin line with five evenly spaced nodes on desktop.
- Highlight the active node and chart segment without animating layout dimensions.
- Keep motion subtle and respect `prefers-reduced-motion`.

## Verification

- Build with `npm run build` and confirm there are no TypeScript or Vite errors.
- Verify all four allocation ratios total 100 and the manual status date renders exactly.
- Verify pointer hover, keyboard focus, and tap/click reveal the correct allocation and milestone content.
- Verify only ratios appear in the allocation breakdown; no portfolio dollar balances are introduced.
- Verify the LinkedIn proof link opens safely in a new tab.
- Verify the mobile layout exposes every ratio and every milestone without requiring hover.
- Verify focus indicators, button labels, reduced motion, and color-independent text remain accessible.
- Verify the previous long impact-card grid and persistent desktop holdings list are removed.
