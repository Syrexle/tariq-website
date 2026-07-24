import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import './styles.css'
import { HoldingsWheel } from './components/HoldingsWheel'
import { ImpactRail } from './components/ImpactRail'

const contact = ['Atlanta, GA', 'tariqawaseem@gmail.com', 'tariqw.eth']

const socialLinks = [
  { label: 'X: @0x_Tariq', href: 'https://x.com/0x_Tariq' },
  { label: 'LinkedIn: @tariqwaseem', href: 'https://www.linkedin.com/in/tariqwaseem' },
  { label: 'Instagram: @yvs.tariq', href: 'https://www.instagram.com/yvs.tariq' },
  { label: 'TikTok: @tariq.waseem', href: 'https://www.tiktok.com/@tariq.waseem' },
]

const experience = [
  {
    company: 'xyexle.capital',
    category: 'Investing',
    role: 'Founder & Digital Asset Fund Operator',
    location: 'Atlanta, GA / Onchain',
    dates: '2017 – Present',
    bullets: [
      'Run a personal digital asset fund focused on Bitcoin, financial NFT technology, memecoins, and liquid crypto opportunities across multiple market cycles.',
      'Generated $100K+ in realized and unrealized gains using my own capital over nine years of active research, allocation, and risk management.',
      'Built an investing track record around early narrative discovery, onchain behavior, liquidity cycles, and community-led asset formation.',
    ],
  },
  {
    company: 'CAPACITR',
    role: 'Strategic Advisor, GTM & Liquidity Systems',
    location: 'Atlanta, GA / Remote',
    dates: 'May 2026 – Present',
    bullets: [
      'Advise on GTM, token access design, and product positioning for a Base-native signal-to-position platform spanning market discovery, x402 analysis, and trading workflows.',
      'Built operating systems for liquidity strategy, including Hydrex vote-incentive reporting, weekly pool health dashboards, Bankr/Doppler fee tracking, and sustainable incentive planning.',
      'Created holder and community intelligence workflows that reconstruct public CAPACITR balances, enrich wallets with social/contact signals, and support respectful outreach around liquidity and app adoption.',
      'Developed content and launch execution infrastructure across Airtable, Excalidraw, reports, alpha feedback loops, roadmap posts, token updates, and investor-facing traction narratives.',
    ],
  },
  {
    company: '40Acres Finance',
    role: 'GTM, Growth & Marketing Lead',
    location: 'Atlanta, GA',
    dates: 'Nov 2025 – May 2026',
    bullets: [
      'Drove $5M+ in assets through OP grant campaigns, partner education, and user activation.',
      'Led OP grants GTM strategy across borrower/lender messaging, communications, and weekly updates.',
      'Identified and mapped target accounts across protocols, asset issuers, vault curators, and onboarded new revenue-generating collateral types to 40Acres.',
      'Rebuilt the brand system, positioning, visual identity, and product story for institutional DeFi credit.',
      'Wrote outreach, launch copy, tutorials, social campaigns, and technical explainers for buyer education.',
      'Supported integration and collateral campaigns across routing venues, ve(3,3) assets, and partner ecosystems.',
    ],
  },
  {
    company: 'SCRIB3',
    role: 'Lead Community Manager',
    location: 'Atlanta, GA',
    dates: 'Nov 2025 – Present',
    bullets: [
      'Managed a team of 5 community associates operating across 3 time zones for highly technical DeFi protocols.',
      'Created and ran the agency\'s first-of-its-kind community service offering.',
      'Handled new client onboarding calls, managed client relationships, and led community audits.',
      'Supported clients including ReadyGG, Citrea, Spectral AI, Possum Finance, and Siren Protocol.',
    ],
  },
  {
    company: 'Revest Finance',
    role: 'Community Manager / Business Development',
    location: 'Atlanta, GA',
    dates: 'Jan 2023 – Sept 2023',
    bullets: [
      'Owned community and investor education across Revest and Resonate products.',
      'Expanded ecosystem visibility in collaboration with Frax Finance and GMX.',
      'Translated vaults, yield, and structured-finance concepts into clear user and partner messaging.',
    ],
  },
  {
    company: 'Atlanta Blockchain Center',
    role: 'Co-founder & Chief Community Officer',
    location: 'Atlanta, GA',
    dates: 'May 2022 – Oct 2022',
    bullets: [
      'Incubated 2 startups and helped them raise a combined $1M in pre-seed capital across AI & Infrastructure sectors.',
      'Managed socials, community, support, events, coworking operations, and business development.',
      'Cultivated relationships with local teams at BitPay, Dapper Labs, CleanSpark, Coinbase Ventures, and Ledgible.',
    ],
  },
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
    items: ['Brand positioning', 'Campaign strategy', 'Launch copy', 'Social growth', 'Product education', 'Community acquisition', 'Field marketing'],
  },
  {
    title: 'Tools',
    items: ['Linear', 'Notion', 'GSuite', 'HubSpot', 'Pipedrive', 'Monday', 'Figma', 'Canva', 'Discord', 'Typefully', 'X Analytics', 'LinkedIn', 'X', 'Telegram'],
  },
]

const education = [
  'Georgia State University — B.I.S. in Media Entrepreneurship | Atlanta, GA | May 2021',
  'Web3 Teacher Training Track — Blockchain Acceleration Foundation | 2021',
  'Atlanta Inno 25 Under 25 — Atlanta Business Chronicle | 2022',
]

const capabilities = ['GTM strategy', 'Protocol growth', 'Account research', 'Community acquisition', 'DeFi credit', 'Visual storytelling']

const interestTiles = [
  {
    label: 'Interest',
    title: 'Financial stealth technology',
    copy: 'Private, under-the-radar financial infrastructure, access layers, and market systems that create strategic edge before they become obvious.',
  },
  {
    label: 'Interest',
    title: 'Financial NFT applications',
    copy: 'NFTs as programmable financial wrappers for vesting, credit, ownership, vault access, and composable onchain agreements.',
  },
  {
    label: 'Yield / niche expertise',
    title: 'Yield-bearing assets',
    copy: 'Revenue-based finance, ve(3,3) incentive markets, and self-repaying loan mechanisms that turn cashflow and token incentives into growth loops.',
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
    name: 'Asset OpSec & EVM Executor Safety',
    file: 'evm-trading-executor-safety',
    summary: 'A local Hermes skill for building and reviewing small EVM trading/executor contracts with explicit wallet-flow, spend-cap, rescue, GUI, and operator-safety guardrails.',
    examples: ['Private-key / owner-role separation', 'Per-call spend caps and rescue paths', 'README notes labeled OpSec, Management, and Rules'],
  },
  {
    name: 'Onchain Transaction Tracing',
    file: 'onchain-transaction-tracing',
    summary: 'A forensic workflow skill for following EVM transactions, token transfers, protocol deposits, relays, bridges, and contract-side accounting without confusing direct wallet balances with credited protocol positions.',
    examples: ['Tx-hash-first investigation', 'Wallet vs contract balance separation', 'Plain-English path diagrams for users'],
  },
  {
    name: 'Token Liquidity Strategy',
    file: 'token-liquidity-strategy',
    summary: 'A market-quality strategy skill for comparing centralized market makers, DEX liquidity programs, ve-token incentives, LP incentives, and sustainable liquidity depth across Base and other DeFi venues.',
    examples: ['Market quality over hype', 'Aerodrome / Hydrex incentive framing', 'WETH / USDC incentives funded by real fees'],
  },
  {
    name: 'Lock Voting Performance Assessment',
    file: 'lock-voting-performance-assessment',
    summary: 'A read-only assessment skill that accepts a supplied wallet, resolves the veHYDX lock NFTs it controls, and reports current-epoch voting power, allocations, incentives, and estimated voting performance.',
    examples: ['CURRENT ASSET: veHYDX', 'Wallet → lock NFT performance', 'PLANNED: veAERO / veNEST'],
  },
  {
    name: 'Base MCP Wallet Workflows',
    file: 'base-mcp',
    summary: 'A Base Account workflow skill for safely inspecting portfolios, transactions, token metadata, x402 payments, signatures, sends, swaps, and arbitrary onchain calls through the Base MCP tool surface.',
    examples: ['Read before write', 'Approval-url transaction flow', 'Base and Base-Sepolia x402 handling'],
  },
  {
    name: 'High-Context Cold DM Research',
    file: 'cold-dm-research',
    summary: 'A research-to-message skill for drafting short, specific, human outbound DMs from social profiles, posts, bios, company context, and user-provided relationship background.',
    examples: ['Voice and thesis extraction', 'Specific reference before the ask', 'Permission-first paid API usage'],
  },
]

const devProjects = [
  {
    title: 'robinhood-swap-proxy',
    folder: 'robinhood-light-executor',
    type: 'Solidity / Foundry / Robinhood Chain',
    status: 'In progress',
    progress: 68,
    description: 'A lightweight swap executor prototype for Robinhood Chain: native ETH enters a contract, optional fees are deducted, ETH wraps to WETH, SwapRouter02 executes the token purchase, and output returns directly to the caller.',
    highlights: ['Minimal WETH-to-token executor', 'Foundry tests and deploy script', 'Terminal GUI for previewing and executing buys'],
    demoUrl: 'https://youtu.be/5_sjySPeftw',
  },
  {
    title: 'Hydrex Vote Optimizer',
    folder: 'capacitr/hydrex-vote-optimizer',
    type: 'Base / Ethers / Hydrex API / Automation',
    status: 'In progress',
    progress: 68,
    description: 'A read-only veNFT gauge voting optimizer for Hydrex on Base that ranks live strategies by projected rewards, fee/incentive mix, earning power, and gauge validity without signing or submitting votes.',
    highlights: ['Live Hydrex strategy ranking', 'Gauge verification checks', 'Scheduled GitHub Actions output'],
  },
  {
    title: 'tradeLead AI',
    folder: 'tradeLead-ai',
    type: 'React / Supabase / Twilio / OpenAI',
    status: 'In progress',
    progress: 68,
    description: 'A sellable MVP for Atlanta-area trade businesses that converts voicemails, missed calls, and after-hours inquiries into structured dispatcher summaries, callback-first routing, demo capture, and a private founder cockpit.',
    highlights: ['Voicemail-first lead extraction', 'Supabase-backed lead capture', 'Founder cockpit + outreach assets'],
  },
]

const researchLinks = {
  capacitr: 'https://spec.capacitr.xyz/',
  venice: 'https://docs.venice.ai/overview/about-venice',
  overview: 'https://excalidraw.com/#json=ew8Q4JivYHPGJpuppUN1z,ZcTl0TrySuUiGycPDnI4PA',
  yieldverse: 'https://yieldverse.substack.com/',
  article: 'https://yieldverse.substack.com/p/got-eth-lets-put-it-to-work',
  articleImage: 'https://substackcdn.com/image/fetch/$s_!IYHm!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6d018b36-8735-4692-8547-0a029d0d654f_1500x500.png',
}

const resumeHref = `${import.meta.env.BASE_URL}Tariq_Waseem_Resume.pdf`

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.fromTo('.hero-copy > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out' })
    gsap.fromTo('.terrain-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 })
    return () => lenis.destroy()
  }, [])

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
          <a href="#projects">[ PROJECTS ]</a>
          <a href="#research">[ RESEARCH ]</a>
          <a href="#ai-skills">[ AI SKILLS ]</a>
          <a href="#experience">[ EXPERIENCE ]</a>
          <a href="#contact">[ CONTACT ]</a>
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
              Community<span className="dot cyan">.</span>
            </h1>
            <p className="hero-subcopy">
              Business Development and GTM operator with 8+ years across DeFi, protocol growth, partnerships, education, and community-led acquisition.
            </p>
            <div className="contact-ribbon" aria-label="Contact details">
              {contact.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="cta-row">
              <a href="#experience">[ VIEW EXPERIENCE → ]</a>
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


        <section id="projects" className="portfolio-section">
          <p className="eyebrow">[ DEV PORTFOLIO / LOCAL PROJECT FOLDERS ]</p>
          <div className="portfolio-intro">
            <h2>Applied builds from my local development workspace.</h2>
            <p>Public-facing project cards can show folder and stack details; private or unpublished repos stay limited to title and a short product description.</p>
          </div>
          <div className="dev-project-grid">
            {devProjects.map((project) => (
              <article className={`dev-project-card${project.folder ? '' : ' private-project-card'}`} key={project.title}>
                <div className="dev-project-content">
                  {(project.type || project.folder) && (
                    <div className="dev-project-topline">
                      {project.type && <span>{project.type}</span>}
                      {project.folder && <code>{project.folder}</code>}
                    </div>
                  )}
                  {'status' in project && typeof project.status === 'string' && project.status && (
                    <div className="project-status" aria-label={`${project.title} status: ${project.status}`}>
                      <div className="project-status-row">
                        <span>{project.status}</span>
                        {'progress' in project && typeof project.progress === 'number' && <span>{project.progress}%</span>}
                      </div>
                      {'progress' in project && typeof project.progress === 'number' && (
                        <div className="project-status-track">
                          <span style={{ width: `${project.progress}%` }} />
                        </div>
                      )}
                    </div>
                  )}
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <div className="dev-project-actions">
                  {project.highlights.length > 0 && (
                    <div className="mini-pill-list">
                      {project.highlights.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  )}
                  {'demoUrl' in project && typeof project.demoUrl === 'string' && project.demoUrl && (
                    <a className="demo-link" href={project.demoUrl} target="_blank" rel="noreferrer">[ WATCH DEMO → ]</a>
                  )}
                </div>
              </article>
            ))}
          </div>
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

              <a className="research-overview-link" href={researchLinks.overview} target="_blank" rel="noreferrer">
                <span>VIEW RESEARCH OVERVIEW</span>
                <span aria-hidden="true">→</span>
              </a>

              <div className="research-question">
                <span>OPEN DESIGN QUESTION</span>
                <strong>Transferable token or non-transferable internal credit system?</strong>
                <p>The research weighs composability against a simpler, non-transferable capacity layer that stays inside the product.</p>
              </div>
            </article>

            <article className="research-card research-article-card">
              <div className="research-article-cover">
                <img src={researchLinks.articleImage} alt="Yieldverse article cover for Got $ETH? Let’s put it to work!" loading="lazy" />
              </div>
              <div className="research-article-content">
                <span className="research-card-label">FEATURED ARTICLE / YIELDVERSE</span>
                <h3><a className="research-article-link" href={researchLinks.article} target="_blank" rel="noreferrer">Got $ETH? Let’s put it to work!</a></h3>
                <p>ultrasound passive income go brrrrrrr</p>
                <div className="research-article-links">
                  <span>[ READ ARTICLE → ]</span>
                  <a className="research-newsletter-link" href={researchLinks.yieldverse} target="_blank" rel="noreferrer">[ VISIT YIELDVERSE → ]</a>
                </div>
              </div>
            </article>
          </div>

          <p className="research-expansion-note">More mechanism research and writing will be added as the library grows.</p>
        </section>

        <section id="ai-skills" className="ai-skills-section">
          <p className="eyebrow">[ AI TASK-SPECIFIC SKILLS ]</p>
          <div className="ai-skills-intro">
            <h2>I build local AI skills that turn repeated expert workflows into reusable agent playbooks.</h2>
            <p>
              These are task-centered Hermes skills I created or heavily customized for high-context work: asset OpSec, onchain transaction inspection, liquidity strategy, vote optimization, wallet workflows, and outbound research.
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

        <section id="experience" className="timeline-section">
          <p className="eyebrow">[ EXPERIENCE ]</p>
          <div className="timeline">
            {experience.map((job) => (
              <article className="timeline-item" key={`${job.company}-${job.dates}`}>
                <div className="timeline-meta">
                  <span>{job.dates}</span>
                  <small>{job.location}</small>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title-row">
                    <h3>{job.company}</h3>
                    {'category' in job && typeof job.category === 'string' && job.category && <span>[ {job.category} ]</span>}
                  </div>
                  <p className="role">{job.role}</p>
                  <ul>
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="fund" className="fund-section section-grid">
          <div>
            <p className="eyebrow">[ XYEXLE.CAPITAL / FUND TRANSPARENCY ]</p>
            <h2>Personal capital deployed across Bitcoin, financial NFT technology, memecoins, and liquid crypto markets since 2017.</h2>
            <p className="fund-copy">
              xyexle.capital is my long-running personal digital asset fund and market research vehicle. It reflects nine years of managing my own capital through cycle timing, narrative discovery, onchain liquidity, and high-conviction crypto allocations.
            </p>
            <div className="fund-stat-grid">
              <div><span>$100K+</span><small>own-capital gains</small></div>
              <div><span>9 yrs</span><small>active market history</small></div>
              <a className="fund-email-card" href="mailto:xyexle.capital@gmail.com"><span>Email me</span><small>xyexle.capital@gmail.com</small></a>
            </div>
          </div>
          <div className="holdings-panel">
            <HoldingsWheel />
          </div>
        </section>

        <section className="logo-section">
          <p className="eyebrow">[ TEAMS COLLABORATED WITH ]</p>
          <div className="logo-section-intro">
            <h2>Protocol, media, infrastructure, and market teams I’ve collaborated with in cross-functional growth, community, BD, marketing, and ecosystem roles.</h2>
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
            <h2>Media entrepreneurship foundation with Web3 education and ecosystem recognition.</h2>
          </div>
          <div className="service-list">
            {education.map((item, index) => (
              <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>
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
              <strong>Tariq_Waseem_Resume.pdf</strong>
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
