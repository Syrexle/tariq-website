import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import './styles.css'
import { ImpactRail } from './components/ImpactRail'
import { ProjectsPage } from './pages/ProjectsPage'
import { resolveRoute } from './routes'

const contact = ['Atlanta, GA', 'tariqawaseem@gmail.com', 'tariqw.eth']

const socialLinks = [
  { label: 'X: @0x_Tariq', href: 'https://x.com/0x_Tariq' },
  { label: 'LinkedIn: @tariqwaseem', href: 'https://www.linkedin.com/in/tariqwaseem' },
]


const skillGroups = [
  {
    title: 'BDR / Sales',
    items: ['Outbound prospecting', 'Public speaking', 'Account mapping', 'Lead qualification', 'Discovery prep', 'Personalized messaging', 'CRM hygiene'],
  },
  {
    title: 'Knowledge',
    items: ['Revenue-based financing', 'On-chain credit markets', 'RWAs', 've(3,3)', 'Vaults', 'Protocol incentives', 'Liquidity depth strategy', 'Ecosystem grant applications', 'DAO proposals'],
  },
  {
    title: 'Marketing',
    items: ['Brand positioning', 'Campaign strategy', 'Launch copy', 'Social growth', 'Product education', 'Ecosystem acquisition', 'Field marketing'],
  },
  {
    title: 'Tools',
    items: ['Azure Portal', 'Microsoft Graph', 'Linear', 'Notion', 'GSuite', 'HubSpot', 'Pipedrive', 'Monday', 'Figma', 'Canva', 'Discord', 'Typefully', 'X Analytics', 'LinkedIn', 'X', 'Telegram'],
  },
]

const education = [
  {
    item: 'Georgia State University — B.I.S. in Media Entrepreneurship | Atlanta, GA | May 2021',
    label: 'GSU',
    mark: 'gsu',
  },
  {
    item: 'Web3 Teacher Training Track — Blockchain Acceleration Foundation | 2021',
    label: 'BAF',
    mark: 'baf-logo',
    logo: `${import.meta.env.BASE_URL}assets/BAFLogo.jpeg`,
  },
  {
    item: 'Atlanta Inno 25 Under 25 — Atlanta Business Chronicle | 2022',
    label: '25 Under 25',
    mark: 'inno',
  },
]

const capabilities = ['GTM strategy', 'Protocol growth', 'Account research', 'Ecosystem acquisition', 'DeFi credit', 'Visual storytelling']

const interestTiles = [
  {
    label: 'Interest',
    title: 'Financial stealth technology',
    copy: 'Private, under-the-radar financial infrastructure, access layers, and market systems that create strategic edge before they become obvious.',
  },
  {
    label: 'Interest',
    title: 'Financial NFT applications',
    copy: 'Revenue-based finance, ve(3,3) incentive markets, and self-repaying loan mechanisms that turn cashflow and token incentives into growth loops.',
  },
  {
    label: 'Yield / niche expertise',
    title: "Yield-bearing RWA's + loan underwriting",
    copy: 'Assets like mHYPER, tokenized yield funds, T-bill products, bond wrappers, CD-backed instruments, and loan underwriting models backed by mixes of tokenized off-chain CDs, tokenized bonds, treasuries, private credit, and real-world cashflow collateral.',
  },
]

const marketTimeline = [
  { year: '2017', event: 'Bitcoin $20K', y: 62 },
  { year: '2018', event: 'ICO boom', y: 48 },
  { year: '2019', event: 'Builder winter', y: 68 },
  { year: '2020', event: 'DeFi Summer', y: 40 },
  { year: '2021', event: 'NFT mania', y: 22 },
  { year: '2022–2025', event: 'Trenches', y: 58 },
  { year: '2026', event: 'Loading…', y: 28 },
]

const workedWith = [
  { name: 'Citrea', domain: 'citrea.xyz' },
  { name: 'PlayGG', domain: 'playgg.com' },
  { name: 'Spectral AI', domain: 'spectral.finance' },
  { name: 'Fjord Foundry', domain: 'fjordfoundry.com' },
  { name: 'Possum Finance', domain: 'possumlabs.io' },
  { name: 'Synonym', domain: 'synonym.finance' },
  { name: 'Notcoin', domain: 'notcoin.org' },
  { name: 'Moonbeam', domain: 'moonbeam.network' },
  { name: 'Siren', domain: 'siren.xyz' },
  { name: 'Warner Media', domain: 'warnermedia.com' },
  { name: 'Simba Chain', domain: 'simbachain.com' },
  { name: 'DARPA', domain: 'darpa.mil' },
  { name: 'Pendle', domain: 'pendle.finance' },
  { name: 'Merkle', domain: 'merkle.trade' },
  { name: 'Hydrex', domain: 'hydrex.fi' },
  { name: 'Frax Finance', domain: 'frax.finance' },
  { name: 'Gainz Network', domain: 'gainz.trade' },
  { name: 'Myx Finance', domain: 'myx.finance' },
  { name: 'Buffer Finance', domain: 'buffer.finance' },
  { name: 'Meteora', domain: 'meteora.ag' },
]

const interviewedWith = [
  { name: 'Hedera', domain: 'hedera.com' },
  { name: 'Avalanche', domain: 'avax.network' },
  { name: 'Dune', domain: 'dune.com' },
  { name: 'Silicon Valley Bank', domain: 'svb.com' },
  { name: 'Arrakis Finance', domain: 'arrakis.finance' },
  { name: 'IEEE', domain: 'ieee.org' },
  { name: 'Hypernative', domain: 'hypernative.io' },
]

const logoUrl = (domain: string) => `https://icons.duckduckgo.com/ip3/${domain}.ico`

const aiSkills = [
  {
    name: 'Excalidraw This',
    file: 'creative/excalidraw-this',
    summary: 'A local Hermes skill for turning markdown, docs, notes, and architecture descriptions into durable .excalidraw visual guides with connected flow diagrams, boundaries, and glossary panels.',
    examples: ['Markdown-to-diagram workflows', 'Architecture flow arrows and trust boundaries', 'Standalone .excalidraw files with glossary panels'],
  },
  {
    name: 'Onchain Transaction Tracing',
    file: 'onchain-transaction-tracing',
    summary: 'A forensic workflow skill for following EVM transactions, token transfers, protocol deposits, relays, bridges, and contract-side accounting without confusing direct wallet balances with credited protocol positions.',
    examples: ['Tx-hash-first investigation', 'Wallet vs contract balance separation', 'Plain-English path diagrams for users'],
  },
  {
    name: 'Lock Voting Performance Assessment',
    file: 'lock-voting-performance-assessment',
    summary: 'A read-only assessment skill that accepts a supplied wallet, resolves the veHYDX lock NFTs it controls, and reports current-epoch voting power, allocations, incentives, and estimated voting performance.',
    examples: ['CURRENT ASSET: veHYDX', 'Wallet → lock NFT performance', 'PLANNED: veAERO / veNEST'],
  },
  {
    name: 'High-Context Cold DM Research',
    file: 'cold-dm-research',
    summary: 'A research-to-message skill for drafting short, specific, human outbound DMs from social profiles, posts, bios, company context, and user-provided relationship background.',
    examples: ['Voice and thesis extraction', 'Specific reference before the ask', 'Permission-first paid API usage'],
  },
]

const researchLinks = {
  capacitr: 'https://spec.capacitr.xyz/',
  venice: 'https://docs.venice.ai/overview/about-venice',
  overview: 'https://excalidraw.com/#json=ew8Q4JivYHPGJpuppUN1z,ZcTl0TrySuUiGycPDnI4PA',
  bankDepositOverview: 'https://excalidraw.com/#json=kzvC7LB2sL6faQmlmXMnj,SYvSqRTRtkwjdDkyWfw3Ew',
  jpmd: 'https://www.jpmorgan.com/payments/newsroom/jpm-coin-usd-deposit-token-institutional-clients',
  usdc: 'https://www.circle.com/usdc',
}

const researchPieces = [
  {
    title: 'Tokenized Compute Access',
    url: researchLinks.overview,
    label: 'Tokenomics design / staking for recurring compute capacity',
    source: 'RESEARCH BRIEF 01',
  },
  {
    title: 'Tokenized Deposits vs Stablecoins',
    url: researchLinks.bankDepositOverview,
    label: 'Bank money design / deposit tokens vs reserved stablecoins',
    source: 'RESEARCH BRIEF 02',
  },
]

const resumeFileName = 'TariqWaseem_PM_GTM_Resume_V3.pdf'
const resumeHref = `${import.meta.env.BASE_URL}${resumeFileName}`


type ShowcaseClient = {
  name: string
  handle: string
  followers: string
  followerCount: number
  accountUrl: string
  designTools: string[]
  role: string
  summary: string
  posts: string[]
}

const showcaseClients: ShowcaseClient[] = [
  {
    name: 'Atlanta Blockchain Center',
    handle: '@AtlantaChain',
    followers: '2,229 followers',
    followerCount: 2229,
    accountUrl: 'https://x.com/AtlantaChain',
    designTools: ['Canva'],
    role: 'Ecosystem launch, local community, event/content operations',
    summary: 'Built early social proof for Atlanta’s Web3 hub through founder-facing education, event momentum, and community-led blockchain storytelling.',
    posts: [
      'https://x.com/AtlantaChain/status/1568368491853484034',
      'https://x.com/AtlantaChain/status/1564772933503012865',
      'https://x.com/AtlantaChain/status/1560723403283525632',
    ],
  },
  {
    name: 'Revest Finance',
    handle: '@RevestFinance',
    followers: '25.8K followers',
    followerCount: 25800,
    accountUrl: 'https://x.com/RevestFinance',
    designTools: ['Canva'],
    role: 'Ecosystem education, partner-facing content, DeFi product messaging',
    summary: 'Translated structured DeFi, yield, FNFTs, and partner narratives into social content that could educate both users and protocol collaborators.',
    posts: [
      'https://x.com/RevestFinance/status/1693654354354487784',
      'https://x.com/RevestFinance/status/1676295179412832256',
      'https://x.com/RevestFinance/status/1671911301340360706',
    ],
  },
  {
    name: 'PLAY Network',
    handle: '@0xplay_network',
    followers: '135.4K followers',
    followerCount: 135400,
    accountUrl: 'https://x.com/0xplay_network',
    designTools: ['Figma'],
    role: 'Gaming infrastructure, ecosystem content, technical community campaigns',
    summary: 'Created ecosystem-facing content around modular gaming infrastructure, helping translate technical network ideas into accessible social narratives for builders, users, and partners.',
    posts: [
      'https://x.com/0xplay_network/status/1755306823391813700',
      'https://x.com/0xplay_network/status/1758068826648789466',
      'https://x.com/0xplay_network/status/1759971560104817032',
    ],
  },
  {
    name: 'Citrea',
    handle: '@citrea_xyz',
    followers: '70.4K followers',
    followerCount: 70400,
    accountUrl: 'https://x.com/citrea_xyz',
    designTools: ['Figma'],
    role: 'Bitcoin L2 ecosystem content, technical launch support, builder education',
    summary: 'Supported content and ecosystem storytelling for Bitcoin-native infrastructure, making ZK/L2 concepts clearer for technical communities and broader crypto audiences.',
    posts: [
      'https://x.com/citrea_xyz/status/1765415296935006475',
      'https://x.com/citrea_xyz/status/1760363771946836240',
      'https://x.com/citrea_xyz/status/1771205265255448632',
    ],
  },
  {
    name: 'Possum Finance',
    handle: '@Possum_Finance',
    followers: '1,731 followers',
    followerCount: 1731,
    accountUrl: 'https://x.com/Possum_Finance',
    designTools: ['Canva'],
    role: 'DeFi protocol education, social content, community-facing product narratives',
    summary: 'Helped package DeFi mechanics and protocol updates into social-first educational content that could serve community members, partners, and ecosystem followers.',
    posts: [
      'https://x.com/Possum_Finance/status/1770269048481448245',
      'https://x.com/Possum_Finance/status/1772352804730102031',
      'https://x.com/Possum_Finance/status/1774904611008327791',
    ],
  },
  {
    name: 'Liquid Agent AI',
    handle: '@LiquidAgentAI',
    followers: '1,512 followers',
    followerCount: 1512,
    accountUrl: 'https://x.com/LiquidAgentAI',
    designTools: ['Figma', 'After Effects'],
    role: 'AI + DeFi product storytelling, content calendar, launch education',
    summary: 'Packaged an automated USDC yield product into simple “money working on autopilot” hooks across social, product education, and user-facing rollout content.',
    posts: [
      'https://x.com/LiquidAgentAI/status/1973480954158010541',
      'https://x.com/LiquidAgentAI/status/1972050842833526882',
      'https://x.com/LiquidAgentAI/status/1969401890254311843',
    ],
  },
  {
    name: 'Spectral AI',
    handle: '@Spectral_Labs',
    followers: '158.9K followers',
    followerCount: 158900,
    accountUrl: 'https://x.com/Spectral_Labs',
    designTools: ['Figma', 'After Effects'],
    role: 'AI infrastructure, agent economy narratives, technical ecosystem content',
    summary: 'Translated AI infrastructure, agent-market primitives, and protocol positioning into social content that made complex intelligence-market concepts legible for builders and crypto audiences.',
    posts: [
      'https://x.com/Spectral_Labs/status/1765026904913191310',
      'https://x.com/Spectral_Labs/status/1782416124379844816',
      'https://x.com/Spectral_Labs/status/1772660677049532563',
    ],
  },
  {
    name: '40acres Finance',
    handle: '@40acres_Finance',
    followers: '1,889 followers',
    followerCount: 1889,
    accountUrl: 'https://x.com/40acres_Finance',
    designTools: ['Figma'],
    role: 'GTM, grant activation, institutional DeFi credit education',
    summary: 'Turned a technical revenue-based lending product into launch posts, borrower/lender education, grant updates, and institutional-facing positioning.',
    posts: [
      'https://x.com/40acres_Finance/status/2053882886944960825',
      'https://x.com/40acres_Finance/status/2045200717804134538',
      'https://x.com/40acres_Finance/status/2042721597388464434',
    ],
  },
  {
    name: 'CAPACITR',
    handle: '@capacitr_xyz',
    followers: '1,427 followers',
    followerCount: 1427,
    accountUrl: 'https://x.com/capacitr_xyz',
    designTools: ['Figma'],
    role: 'AI finance positioning, ecosystem updates, product education',
    summary: 'Built social and builder-facing content systems that package AI financial intelligence, launch updates, demos, and ecosystem narratives into public-facing momentum.',
    posts: [
      'https://x.com/capacitr_xyz/status/2076037845664289200',
      'https://x.com/capacitr_xyz/status/2074201717751578649',
      'https://x.com/capacitr_xyz/status/2069201265192485365',
    ],
  },
]

const longformPieces = [
  {
    title: 'Borrow More, Do More, Worry Less',
    url: 'https://40acresfinance.substack.com/p/borrow-more-do-more-worry-less?r=7lye5i&utm_campaign=post-expanded-share&utm_medium=post%20viewer',
    label: 'Technical product education / borrower positioning',
    summary: 'Explains how a credit product can increase borrower flexibility while keeping the underlying lending model understandable for users and partners.',
  },
  {
    title: 'A Utilization-Based Lending Model',
    url: 'https://40acresfinance.substack.com/p/a-utilization-based-lending-model?r=7lye5i&utm_campaign=post-expanded-share&utm_medium=post%20viewer',
    label: 'Technical writing / mechanism design',
    summary: 'Breaks down utilization-driven lending mechanics in plain language for an audience that needs both product clarity and DeFi-native detail.',
  },
  {
    title: 'The Great Migration',
    url: 'https://40acresfinance.substack.com/p/the-great-migration',
    label: 'Ecosystem narrative / migration thesis',
    publication: '40ACRES FINANCE SUBSTACK',
    summary: 'Frames a protocol and user migration story in plain-language market context, connecting product direction to a broader DeFi movement.',
  },
  {
    title: 'Got ETH? Let’s Put It To Work',
    url: 'https://yieldverse.substack.com/p/got-eth-lets-put-it-to-work',
    label: 'Yield education / user activation',
    publication: 'YIELDVERSE SUBSTACK',
    summary: 'Turns ETH yield strategy into approachable user-facing education: clear premise, practical hook, and a path from passive asset to productive capital.',
  },
  {
    title: '40acres Mintlify documentation',
    url: 'https://docs.40acres.finance/home-page',
    label: 'Documentation / product docs system',
    publication: 'MINTLIFY DOCS',
    summary: 'Structured product documentation for onboarding, protocol concepts, and self-serve user education.',
  },
]


const chainContexts = ['Arbitrum', 'Polygon', 'Optimism', 'Base', 'Avalanche', 'Ethereum']
const platformContexts = ['X', 'LinkedIn', 'Telegram']

const combinedFollowerReach = showcaseClients.reduce((sum, client) => sum + client.followerCount, 0)
const combinedFollowerReachLabel = `${Math.floor(combinedFollowerReach / 1000)}K+`
const combinedFollowerReachExact = new Intl.NumberFormat('en-US').format(combinedFollowerReach)

const tweetIdFromUrl = (url: string) => url.match(/status\/(\d+)/)?.[1] ?? url

function TweetEmbed({ url }: { url: string }) {
  const tweetId = tweetIdFromUrl(url)

  return (
    <div className="tweet-shell" data-tweet-id={tweetId}>
      <div className="tweet-placeholder" aria-hidden="true">
        <span>X POST EMBED</span>
        <strong>{tweetId}</strong>
        <small>Loads through X widgets when allowed; direct post link remains available.</small>
      </div>
      <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true">
        <a href={url}>View post on X</a>
      </blockquote>
      <a className="tweet-fallback" href={url} target="_blank" rel="noreferrer">[ OPEN POST → ]</a>
    </div>
  )
}

/**
 * Growth layer for the content portfolio. Every figure here already appears
 * elsewhere in this repo; anything marked `needsInput` is a placeholder for Tariq
 * to fill or delete before this ships.
 */
const growthOutcomes = [
  { value: '$5M', label: 'new AUM from a 200K OP incentive budget', sub: 'Velodrome on Optimism, Aerodrome on Base' },
  { value: '$3–5M', label: 'loan originations from the same program', sub: 'Borrower and lender activation' },
  { value: '$25M+', label: 'AUM contributed to across ve(3,3) locks', sub: 'Aerodrome, Velodrome, Blackhole, Pharaoh' },
  { value: '399K', label: 'combined reach across 9 protocol accounts', sub: 'Top of the same funnel' },
]

const funnelStages = [
  {
    stage: 'Acquisition',
    owned: 'Grant programs, partner co-marketing, ecosystem audits, outbound',
    evidence: '200K OP grant GTM across borrower and lender segments; account mapping across protocols, asset issuers, and vault curators',
  },
  {
    stage: 'Activation',
    owned: 'Docs, tutorials, technical explainers, product education',
    evidence: 'Mintlify documentation system; long-form mechanism explainers; 1,000+ students taught across five years of blockchain curriculum',
  },
  {
    stage: 'Retention',
    owned: 'Incentive design, vote-directed rewards, liquidity depth strategy',
    evidence: 'Hydrex vote-incentive reporting, weekly pool health dashboards, sustainable incentive planning at CAPACITR',
  },
  {
    stage: 'Monetization',
    owned: 'Fee tracking, collateral onboarding, revenue-generating integrations',
    evidence: 'Doppler fee tracking; onboarded new revenue-generating collateral types to 40Acres',
  },
]

type CaseStudy = {
  id: string
  title: string
  org: string
  context: string
  constraint: string
  hypothesis: string
  intervention: string[]
  result: string
  generalizes: string
  needsInput?: string
}

const growthCaseStudies: CaseStudy[] = [
  {
    id: 'op-grants',
    title: 'Turning a fixed incentive budget into durable AUM',
    org: '40Acres Finance / Optimism',
    context: 'An onchain credit protocol with a 200K OP grant to deploy across two ve(3,3) ecosystems.',
    constraint: 'Incentives attract mercenary liquidity that leaves the moment emissions stop, so the budget had to buy retained deposits rather than a TVL spike.',
    hypothesis: 'Segmenting borrower and lender messaging, and pairing emissions with education, would convert a one-time budget into positions that persist after the program ends.',
    intervention: [
      'Split GTM by borrower and lender segment with distinct messaging and comms',
      'Ran partner education alongside emissions instead of after them',
      'Published weekly program updates to keep allocation decisions legible',
      'Mapped and onboarded revenue-generating collateral types',
    ],
    result: '$5M in new AUM and $3–5M in loan originations, while maintaining efficient token allocation.',
    generalizes: 'Incentive spend behaves like paid acquisition: it buys a first action, and only education and product fit buy the second one.',
    needsInput: 'Program duration, retained AUM at 30/90 days post-program, and the OP-to-AUM ratio you are comfortable publishing.',
  },
  {
    id: 'holder-intelligence',
    title: 'Rebuilding a holder graph to make outreach targeted',
    org: 'CAPACITR',
    context: 'A Base-native protocol with onchain holders but no view of who they were or how to reach them.',
    constraint: 'Token balances are public but pseudonymous, so there was no list to segment and no way to prioritise conversations.',
    hypothesis: 'Reconstructing balances from public data and enriching wallets with social and contact signals would turn an anonymous holder base into a segmentable audience.',
    intervention: [
      'Reconstructed public CAPACITR balances into a holder set',
      'Enriched wallets with social and contact signals',
      'Built liquidity dashboards to tie holder behaviour to pool health',
      'Ran respectful outreach around liquidity and app adoption',
    ],
    result: 'A working holder and ecosystem intelligence pipeline feeding outreach and liquidity strategy.',
    generalizes: 'In crypto the CRM has to be built before it can be used; the wallet graph is the customer list.',
    needsInput: 'Holders enriched, outreach reply rate, and any downstream conversion you can attribute.',
  },
]

const experimentLog = [
  { hypothesis: 'Borrower and lender need separate messaging, not one protocol narrative', channel: 'OP grant comms', result: '$5M new AUM, $3–5M originations', learning: '' },
  { hypothesis: 'Public balances can be reconstructed into a segmentable holder list', channel: 'Onchain data + enrichment', result: 'Holder intelligence pipeline shipped', learning: '' },
  { hypothesis: 'Vote-directed incentives beat flat emissions for pool health', channel: 'Hydrex vote incentives', result: 'Weekly pool health reporting', learning: '' },
  { hypothesis: 'Technical docs convert better than campaign copy for builder audiences', channel: 'Mintlify docs system', result: '', learning: '' },
]

const instrumentation = [
  'Vote-incentive reporting (Hydrex)',
  'Weekly pool health dashboards',
  'Doppler fee tracking',
  'Holder balance reconstruction',
  'Wallet enrichment (social + contact)',
  'Airtable content and launch ops',
  'Excalidraw mechanism diagrams',
  'X Analytics / LinkedIn',
]


function ContentPortfolioShowcase() {
  useEffect(() => {
    const renderTweets = () => {
      const widgets = (window as unknown as { twttr?: { widgets?: { load: () => void } } }).twttr?.widgets
      widgets?.load()
    }

    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://platform.twitter.com/widgets.js'
      script.async = true
      script.charset = 'utf-8'
      script.onload = renderTweets
      document.body.appendChild(script)
    } else {
      renderTweets()
    }
  }, [])

  return (
    <>
      <header className="site-header showcase-header">
        <a className="brand" href="/" aria-label="Tariq Waseem portfolio home">
          <span className="brand-mark" />
          <span>Tariq Waseem</span>
        </a>
        <nav aria-label="Content portfolio navigation">
          <a href="#growth">[ GROWTH ]</a>
          <a href="#social-proof">[ SOCIAL PROOF ]</a>
          <a href="#longform">[ LONGFORM ]</a>
          <a href="/">[ MAIN SITE ]</a>
        </nav>
        <a className="mono-link hide-mobile" href="mailto:tariqawaseem@gmail.com">[ EMAIL → ]</a>
      </header>

      <main id="top" className="showcase-page">
        <section className="showcase-hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">[ CONTENT MARKETING PORTFOLIO ]</p>
            <p className="hero-subcopy">
              A curated sample of social campaigns, ecosystem posts, product education, and technical writing I created across nine crypto-native communities and protocols.
            </p>
            <div className="chain-context-strip" aria-label="Chains and ecosystems worked across">
              <span>Chains worked across</span>
              <div>
                {chainContexts.map((chain) => <strong key={chain}>{chain}</strong>)}
              </div>
            </div>
            <div className="chain-context-strip platform-context-strip" aria-label="Platforms worked across">
              <span>Platforms worked across</span>
              <div>
                {platformContexts.map((platform) => <strong key={platform}>{platform}</strong>)}
              </div>
            </div>
            <div className="content-reach-counter" aria-label="Combined follower reach">
              <span>Combined follower reach</span>
              <strong>
                <span className="reach-counter-digits">{combinedFollowerReachLabel.replace(/K\+$/, '')}</span>
                <span className="reach-counter-suffix">K+</span>
              </strong>
              <p>{combinedFollowerReachExact} current followers across accounts I’ve helped market.</p>
            </div>
            <div className="contact-ribbon" aria-label="Content proof summary">
              <span>9 client/operator contexts</span>
              <span>27 selected X posts</span>
              <span>4 long-form technical pieces</span>
              <span>1 Mintlify docs system</span>
            </div>
            <div className="cta-row">
              <a href="#social-proof">[ VIEW SOCIAL WORK → ]</a>
              <a href="#longform">[ VIEW TECHNICAL WRITING → ]</a>
            </div>
          </div>
          <aside className="showcase-proof-card" aria-label="Content role fit summary">
            <span>CONTENT FIT</span>
            <h2>Built for crypto content teams.</h2>
            <ul>
              <li>Coordinated social channels and multi-client calendars.</li>
              <li>Turned technical crypto products into shareable content.</li>
              <li>Created ecosystem, builder, partner, and user-facing narratives.</li>
              <li>Comfortable with memetic social energy and serious DeFi education.</li>
            </ul>
          </aside>
        </section>

        <section id="growth" className="growth-section">
          <p className="eyebrow">[ GROWTH / OUTCOMES ]</p>
          <div className="research-intro">
            <h2>What the content was in service of.</h2>
            <p>Reach is the top of a funnel, not the result. These are the outcomes the campaigns, docs, and incentive programs were measured against.</p>
          </div>

          <div className="growth-outcome-grid">
            {growthOutcomes.map((item) => (
              <div className="growth-outcome" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.sub}</small>
              </div>
            ))}
          </div>

          <div className="growth-funnel" aria-label="Funnel stages owned">
            {funnelStages.map((stage) => (
              <article className="growth-funnel-stage" key={stage.stage}>
                <span className="growth-stage-label">{stage.stage}</span>
                <p className="growth-stage-owned">{stage.owned}</p>
                <p className="growth-stage-evidence">{stage.evidence}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="case-studies" className="growth-section growth-cases">
          <p className="eyebrow">[ CASE STUDIES ]</p>
          <div className="growth-case-grid">
            {growthCaseStudies.map((study) => (
              <article className="growth-case" key={study.id}>
                <span className="growth-case-org">{study.org}</span>
                <h3>{study.title}</h3>
                <dl>
                  <div><dt>Context</dt><dd>{study.context}</dd></div>
                  <div><dt>Constraint</dt><dd>{study.constraint}</dd></div>
                  <div><dt>Hypothesis</dt><dd>{study.hypothesis}</dd></div>
                  <div>
                    <dt>What I did</dt>
                    <dd>
                      <ul>{study.intervention.map((step) => <li key={step}>{step}</li>)}</ul>
                    </dd>
                  </div>
                  <div><dt>Result</dt><dd className="growth-case-result">{study.result}</dd></div>
                  <div><dt>What generalizes</dt><dd>{study.generalizes}</dd></div>
                </dl>
                {study.needsInput && (
                  <p className="growth-needs-input">[ NEEDS YOUR INPUT ] {study.needsInput}</p>
                )}
              </article>
            ))}
          </div>

          <div className="growth-experiments">
            <h3>Experiment log</h3>
            <div className="growth-table-scroll">
              <table>
                <thead>
                  <tr><th>Hypothesis</th><th>Channel</th><th>Result</th><th>Learning</th></tr>
                </thead>
                <tbody>
                  {experimentLog.map((row) => (
                    <tr key={row.hypothesis}>
                      <td>{row.hypothesis}</td>
                      <td>{row.channel}</td>
                      <td>{row.result || <span className="growth-blank">[ NEEDS YOUR INPUT ]</span>}</td>
                      <td>{row.learning || <span className="growth-blank">[ NEEDS YOUR INPUT ]</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="growth-stack">
            <h3>Instrumentation I built or ran</h3>
            <div className="mini-pill-list">
              {instrumentation.map((tool) => <span key={tool}>{tool}</span>)}
            </div>
            <p className="growth-attribution">
              Attribution note: the AUM and origination figures above are program-level outcomes I contributed to as GTM lead, not
              single-channel attribution. Where a number reflects a team effort I have said so. Detailed campaign economics are
              available on request.
            </p>
          </div>
        </section>

        <section id="social-proof" className="content-showcase-section">
          <p className="eyebrow">[ SELECTED SOCIAL CONTENT ]</p>
          <div className="client-showcase-list">
            {showcaseClients.map((client, index) => (
              <article className="client-showcase-card" key={client.name}>
                <div className="client-showcase-header">
                  <div className="client-showcase-meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div className="client-meta-row">
                      <div className="client-follow-block">
                        <strong>{client.followers}</strong>
                        <a href={client.accountUrl} target="_blank" rel="noreferrer">{client.handle}</a>
                      </div>
                      <div className="design-tool-tags" aria-label={`${client.name} design tools`}>
                        {client.designTools.map((tool) => (
                          <strong className={`design-tool-tag design-tool-tag-${tool.toLowerCase().replace(/\s+/g, '-')}`} key={tool}>{tool}</strong>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="client-showcase-copy">
                    <h3>{client.name}</h3>
                    <p className="role">{client.role}</p>
                    <p>{client.summary}</p>
                  </div>
                </div>
                <div className="tweet-grid" aria-label={`${client.name} selected X posts`}>
                  {client.posts.map((post) => <TweetEmbed key={post} url={post} />)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="longform" className="longform-section">
          <p className="eyebrow">[ TECHNICAL WRITING / 40ACRES FINANCE ]</p>
          <div className="showcase-intro">
            <h2>Long-form writing & docs.</h2>
            <p>A concise file-list of technical product education, mechanism explainers, documentation, and user-facing DeFi writing.</p>
          </div>
          <ul className="longform-file-list" aria-label="Long-form writing links">
            {longformPieces.map((piece, index) => (
              <li key={piece.url}>
                <a href={piece.url} target="_blank" rel="noreferrer">
                  <span className="file-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="file-main">
                    <strong>{piece.title}</strong>
                    <small>{piece.label}</small>
                  </span>
                  <span className="file-source">{piece.publication ?? '40ACRES'}</span>
                  <span className="file-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="showcase-close contact-section">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">[ WHY THIS CONTENT WORKS ]</p>
              <h2>I can market technical crypto products in their native language.</h2>
              <p>This portfolio shows the ability to coordinate social calendars, support ecosystem teams, and move between memes, launch copy, technical docs, and product education.</p>
            </div>
            <div className="resume-panel">
              <span>Contact</span>
              <strong>tariqawaseem@gmail.com</strong>
              <p>Available for content marketing, product marketing, ecosystem content, and builder-facing growth.</p>
              <a href="mailto:tariqawaseem@gmail.com">[ EMAIL TARIQ → ]</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Tariq Waseem</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}

function App() {
  const route = resolveRoute(window.location.pathname)
  const isHome = route === 'home'

  useEffect(() => {
    if (!isHome) return

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.fromTo('.hero-copy > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' })
    gsap.fromTo('.terrain-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 })
    return () => lenis.destroy()
  }, [isHome])

  if (route === 'content-portfolio') return <ContentPortfolioShowcase />
  if (route === 'projects') return <ProjectsPage />

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tariq Waseem portfolio home">
          <span className="brand-mark" />
          <span>Tariq Waseem</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#profile">[ PROFILE ]</a>
          <a href="#impact">[ IMPACT ]</a>
          <a href="#research">[ RESEARCH ]</a>
          <a href="#ai-skills">[ AI SKILLS ]</a>
          <a href="#contact">[ CONTACT ]</a>
          <a href="/content-portfolio/">[ CONTENT-PORTFOLIO ]</a>
        </nav>
        <a className="mono-link hide-mobile" href={resumeHref} target="_blank" rel="noreferrer">[ RESUME PDF → ]</a>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">WEB3 BUSINESS DEVELOPMENT / GTM STRATEGY / PROTOCOL GROWTH / ACCOUNT RESEARCH</p>
            <h1>
              Protocol<span className="dot green">.</span><br />
              Growth<span className="dot amber">.</span><br />
              Markets<span className="dot rust">.</span><br />
              Ecosystem<span className="dot cyan">.</span>
            </h1>
            <p className="hero-subcopy">
              Business Development and GTM operator with 8+ years across DeFi, protocol growth, partnerships, education, and ecosystem-led acquisition.
            </p>
            <div className="contact-ribbon" aria-label="Contact details">
              {contact.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="cta-row">
              <a href={resumeHref} target="_blank" rel="noreferrer">[ VIEW RESUME → ]</a>
              <a href="mailto:tariqawaseem@gmail.com">[ EMAIL TARIQ → ]</a>
            </div>
          </div>

          <div className="terrain-card" aria-label="Abstract protocol growth landscape">
            <div className="grid-glow" />
            <div className="value-wave" aria-hidden="true">
              <svg viewBox="0 0 700 420" preserveAspectRatio="none">
                <path className="wave-fill" d="M0 332 C80 256 125 290 182 238 S286 166 364 206 S474 282 548 168 S642 64 700 110 L700 420 L0 420 Z" />
                <path className="wave-line wave-line-one" d="M0 332 C80 256 125 290 182 238 S286 166 364 206 S474 282 548 168 S642 64 700 110" />
                <path className="wave-line wave-line-two" d="M0 280 C88 236 124 250 190 214 S305 128 380 176 S474 236 552 132 S638 86 700 74" />
              </svg>
            </div>
            <div className="journey-timeline" aria-label="Crypto market value timeline">
              {marketTimeline.map((item) => (
                <div className="journey-point" style={{ '--point-y': `${item.y}%` } as React.CSSProperties} key={`${item.year}-${item.event}`}>
                  <span>{item.year}</span>
                  <strong>{item.event}</strong>
                </div>
              ))}
            </div>
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="ridge ridge-back" />
            <div className="ridge ridge-mid" />
            <div className="ridge ridge-front" />
            <div className="river river-one" />
            <div className="river river-two" />
            <div className="tower tower-a"><span /></div>
            <div className="tower tower-b"><span /></div>
            <div className="tower tower-c"><span /></div>
            <div className="signal-panel">
              <span>LIVE TRACK RECORD</span>
              <strong>$83M+ value influenced</strong>
            </div>
          </div>
        </section>

        <section id="profile" className="cred-section">
          <p className="eyebrow">[ PROFILE ]</p>
          <h2>Web3-native GTM operator translating technical products into clear buyer messaging, partner relationships, and growth motion.</h2>
          <p className="profile-copy">
            Proven track record in outbound prospecting, account mapping, technical buyer messaging, and Web3-native relationship building.
          </p>
          <div className="interest-grid" aria-label="Interests and niche expertise">
            {interestTiles.map((tile) => (
              <article className="interest-card" key={tile.title}>
                <span>{tile.label}</span>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
              </article>
            ))}
          </div>
          <div className="capability-strip">
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="impact" className="work-section">
          <p className="eyebrow">[ SELECTED IMPACT ]</p>
          <ImpactRail />
        </section>


        <section id="research" className="research-section">
          <p className="eyebrow">[ RESEARCH & WRITING ]</p>
          <div className="research-intro">
            <h2>Systems I’m thinking through.</h2>
            <p>An expanding library of mechanism research and market writing focused on token utility, compute access, and productive onchain capital.</p>
          </div>

          <div className="research-grid">
            <article className="research-card research-brief-card">
              <span className="research-card-label">RESEARCH BRIEF 01 / TOKENOMICS DESIGN</span>
              <h3>Tokenized Compute Access</h3>
              <p>Researching how staking CAPACITR could unlock recurring compute capacity, informed by Venice AI’s VVV/DIEM dual-asset model.</p>

              <div className="research-context-links" aria-label="Research context">
                <a href={researchLinks.capacitr} target="_blank" rel="noreferrer">CAPACITR ↗</a>
                <a href={researchLinks.venice} target="_blank" rel="noreferrer">VENICE AI ↗</a>
              </div>

            </article>

            <article className="research-card research-brief-card">
              <span className="research-card-label">RESEARCH BRIEF 02 / BANK MONEY DESIGN</span>
              <h3>Tokenized Deposits vs Stablecoins</h3>
              <p>Researching the bank strategy split between fully reserved stablecoins and JPMD-style tokenized deposits that keep customer money inside the bank balance-sheet relationship.</p>

              <div className="research-context-links" aria-label="Research context">
                <a href={researchLinks.jpmd} target="_blank" rel="noreferrer">JPMD ↗</a>
                <a href={researchLinks.usdc} target="_blank" rel="noreferrer">USDC ↗</a>
              </div>

            </article>
          </div>

          <ul className="research-file-list" aria-label="Research pieces">
            {researchPieces.map((piece, index) => (
              <li key={piece.url}>
                <a href={piece.url} target="_blank" rel="noreferrer">
                  <span className="file-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="file-main">
                    <strong>{piece.title}</strong>
                    <small>{piece.label}</small>
                  </span>
                  <span className="file-source">{piece.source}</span>
                  <span className="file-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="research-expansion-note">More mechanism research and writing will be added as the library grows.</p>
        </section>

        <section id="ai-skills" className="ai-skills-section">
          <p className="eyebrow">[ AI TASK-SPECIFIC SKILLS ]</p>
          <div className="ai-skills-intro">
            <h2>I build local AI skills that turn repeated expert workflows into reusable agent playbooks.</h2>
            <p>
              These are task-centered Hermes skills I created or heavily customized for high-context work: diagramming architecture docs, onchain transaction inspection, liquidity strategy, vote optimization, wallet workflows, and outbound research.
            </p>
          </div>
          <div className="ai-skill-grid">
            {aiSkills.map((skill, index) => (
              <article className="ai-skill-card" key={skill.file}>
                <div className="ai-skill-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <code>{skill.file}</code>
                  <h3>{skill.name}</h3>
                  <p>{skill.summary}</p>
                </div>
                <div className="mini-pill-list">
                  {skill.examples.map((item) => <span key={item}>{item}</span>)}
                </div>
                {'demoUrl' in skill && typeof skill.demoUrl === 'string' && skill.demoUrl && (
                  <a className="demo-link" href={skill.demoUrl} target="_blank" rel="noreferrer">[ WATCH DEMO → ]</a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="logo-section">
          <p className="eyebrow">[ TEAMS COLLABORATED WITH ]</p>
          <div className="logo-section-intro">
            <h2>Protocol, media, infrastructure, and market teams I’ve collaborated with in cross-functional growth, ecosystem development, BD, marketing, and partner-facing roles.</h2>
          </div>
          <div className="logo-marquee" aria-label="Teams collaborated with carousel">
            <div className="logo-track">
              {[...workedWith, ...workedWith].map((team, index) => (
                <div className="logo-tile" key={`${team.name}-${index}`}>
                  <img src={logoUrl(team.domain)} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                  <span>{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="logo-section interview-section">
          <p className="eyebrow">[ INTERVIEWED BY ]</p>
          <div className="logo-section-intro">
            <h2>Interviewed by leading teams across L1s, data, banking, DeFi infrastructure, standards, and trading.</h2>
          </div>
          <div className="interview-grid">
            {interviewedWith.map((team) => (
              <div className="logo-tile interview-tile" key={team.name}>
                <img src={logoUrl(team.domain)} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none' }} />
                <span>{team.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="skills-section">
          <p className="eyebrow">[ SKILLS ]</p>
          <div className="skill-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="pill-list">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="services-section section-grid">
          <div>
            <p className="eyebrow">[ EDUCATION, CERTIFICATION & RECOGNITION ]</p>
            <div className="education-logo-board" aria-label="Education, certification, and recognition logos">
              {education.map((entry) => (
                <div className="education-logo-card" key={entry.label}>
                  {entry.mark === 'gsu' && (
                    <div className="education-mark gsu-mark" aria-label="GSU logo mark">
                      <strong>GSU</strong>
                      <small>GEORGIA STATE</small>
                    </div>
                  )}
                  {entry.mark === 'baf-logo' && 'logo' in entry && (
                    <img className="education-logo-image baf-logo-image" src={entry.logo} alt="BAF logo" loading="lazy" />
                  )}
                  {entry.mark === 'inno' && (
                    <div className="education-mark atlanta-inno-mark" aria-label="Atlanta Inno 25 Under 25 badge">
                      <span>ATL</span>
                      <strong>25</strong>
                      <small>UNDER 25</small>
                    </div>
                  )}
                  <span>{entry.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="service-list">
            {education.map((item, index) => (
              <div key={item.item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item.item}</p></div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">[ CONTACT ]</p>
              <h2>Open to protocol growth, GTM, BD, and ecosystem roles.</h2>
              <p>Reach out for Web3 business development, GTM strategy, account research, protocol partnerships, DeFi credit, and growth opportunities.</p>
              <div className="contact-list">
                <a href="mailto:tariqawaseem@gmail.com">tariqawaseem@gmail.com</a>
                <span>Atlanta, GA</span>
                <span>tariqw.eth</span>
              </div>
              <div className="social-link-list contact-social-links" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                ))}
              </div>
            </div>
            <div className="resume-panel">
              <span>Resume PDF</span>
              <strong>{resumeFileName}</strong>
              <p>Download the original one-page PDF resume used to populate this site.</p>
              <a href={resumeHref} target="_blank" rel="noreferrer">[ OPEN RESUME → ]</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Tariq Waseem</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
