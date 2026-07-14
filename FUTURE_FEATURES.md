# Future Features

## Hover descriptions for hero value timeline

Add an interactive hover state to each dot in the synthetic value timeline in the hero graphic. When a visitor hovers or focuses a timeline dot, show a compact tooltip/card explaining what Tariq was doing during that market period.

### Desired behavior

- Each dot should support mouse hover and keyboard focus.
- Tooltip should appear near the active dot without covering the live track record box.
- Tooltip should use the existing dark glass / cyan / amber visual language.
- On mobile, tapping a dot should open the same description.
- Tooltips should be accessible via `aria-describedby` or an equivalent semantic pattern.

### Timeline copy draft

| Period | Market label | Tooltip description draft |
| --- | --- | --- |
| 2017 | Bitcoin $20K | Began actively studying Bitcoin, digital assets, market cycles, and the early crypto investment landscape as BTC entered mainstream attention. |
| 2018 | ICO boom | Followed token launches, community-led fundraising, whitepaper-driven narratives, and the early shift from speculation toward usable networks. |
| 2019 | Builder winter | Continued learning through the bear market, tracking infrastructure, wallets, exchanges, and the teams still building after hype cooled off. |
| 2020 | DeFi Summer | Studied DeFi primitives, liquidity mining, vaults, AMMs, yield markets, and the first wave of protocol-native growth loops. |
| 2021 | NFT mania | Built community and market intuition around NFTs, creator economies, social coordination, and retail onboarding into web3. |
| 2022–2025 | Trenches | Worked across community, GTM, protocol growth, BD, DeFi credit, partner education, and ecosystem relationships during difficult market conditions. |
| 2026 | Loading… | Current chapter: CAPACITR, liquidity strategy, Hydrex/Aerodrome-style incentive design, AI-assisted workflows, and xyexle.capital fund transparency. |

### Implementation notes

- Extend `marketTimeline` in `src/main.tsx` with a `description` field.
- Render each `.journey-point` as a focusable `button` or accessible wrapper rather than a purely decorative `div`.
- Add tooltip state with React hover/focus handlers, or use CSS-only hover/focus if the layout remains simple.
- Keep the timeline visible even when JavaScript tooltip state is inactive.
- Verify with browser visual QA on desktop and mobile widths.
