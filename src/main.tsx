import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import './styles.css'

const contact = ['Atlanta, GA', '(770) 861-0301', 'tariqawaseem@gmail.com', 'tariqw.eth']

const impact = [
  'Helped drive $5M+ in assets and $3M in active loans to 40Acres Finance through a 200k OP grant, targeted marketing to high net worth individuals & funds, and retail-facing activations.',
  'Led design, branding, and marketing execution for 40Acres, including a full brand refresh and clearer institutional DeFi credit positioning.',
  'Organized student-led web3 events reaching 1,000+ students and 50+ blockchain clubs across the Southeast.',
  'Collaborated with teams at Monad, Midas, Pendle, HydrexFi, Autopilot, Aerostrategy, Levva, and Aerodrome.',
]

const experience = [
  {
    company: 'CAPACITR',
    role: 'Strategic Advisor, GTM & Liquidity Systems',
    location: 'Atlanta, GA / Remote',
    dates: 'May 2026 – Present',
    bullets: [
      'Advise on GTM, token access design, and product positioning for a Base-native signal-to-position platform spanning market discovery, x402 analysis, and trading workflows.',
      'Built operating systems for liquidity strategy, including Hydrex vote/bribe reporting, weekly pool health dashboards, Bankr/Doppler fee tracking, and sustainable incentive planning.',
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

const devProjects = [
  {
    title: 'base-wallet-bundler',
    folder: 'base-wallet-bundler',
    type: 'Base / Solidity / Aerodrome / Umbra',
    description: 'A Base-native wallet bundling toolkit that coordinates atomic ERC-20 buys across multiple Umbra stealth addresses, pairing Foundry contracts with a terminal workflow for generation, deployment, swaps, and sponsor-funded withdrawals.',
    highlights: ['Atomic ETH-to-token bundle buys', 'Umbra stealth address flow', 'Aerodrome routing + Foundry scripts'],
  },
  {
    title: 'tradeLead AI',
    folder: 'tradeLead-ai',
    type: 'React / Supabase / Twilio / OpenAI',
    description: 'A sellable MVP for Atlanta-area trade businesses that converts voicemails, missed calls, and after-hours inquiries into structured dispatcher summaries, callback-first routing, demo capture, and a private founder cockpit.',
    highlights: ['Voicemail-first lead extraction', 'Supabase-backed lead capture', 'Founder cockpit + outreach assets'],
  },
  {
    title: 'Hydrex Vote Optimizer',
    folder: 'capacitr/hydrex-vote-optimizer',
    type: 'Base / Ethers / Hydrex API / Automation',
    description: 'A read-only veNFT gauge voting optimizer for Hydrex on Base that ranks live strategies by projected rewards, fee/bribe mix, earning power, and gauge validity without signing or submitting votes.',
    highlights: ['Live Hydrex strategy ranking', 'Gauge verification checks', 'Scheduled GitHub Actions output'],
  },
  {
    title: 'eclipse-memory',
    folder: 'eclipse-memory',
    type: 'Base / x402 / Express / Hardhat',
    description: 'A Base-native shared memory protocol for autonomous agents, designed around paid x402 HTTP access, smart-contract commitments, and provider-neutral memory primitives that can later surface through MCP.',
    highlights: ['Paid x402 API surface', 'Onchain memory commitments', 'Agent shared-memory primitives'],
  },
  {
    title: 'hyper-agent',
    folder: 'hyper-agent',
    type: 'Python / Hyperliquid / Trading Automation',
    description: 'A Python CLI daemon for Hyperliquid perpetual futures that scans configurable pairs, generates composite strategy signals, manages positions with native and software stops, and publishes Discord trade notifications.',
    highlights: ['EMA, RSI, and funding-rate signals', 'Daily risk locks and win caps', 'Backtests, sweeps, TUI, and CSV journal'],
  },
  {
    title: 'robinhood-swap-proxy',
    folder: 'robinhood-light-executor',
    type: 'Solidity / Foundry / Robinhood Chain',
    description: 'A lightweight swap executor prototype for Robinhood Chain: native ETH enters a contract, optional fees are deducted, ETH wraps to WETH, SwapRouter02 executes the token purchase, and output returns directly to the caller.',
    highlights: ['Minimal WETH-to-token executor', 'Foundry tests and deploy script', 'Terminal GUI for previewing and executing buys'],
  },
  {
    title: 'hardwear-os',
    folder: '',
    type: '',
    description: 'A concept system for merch-backed bonding curves where creators fund physical production through pre-drop trading, then holders can redeem finished goods or keep trading their claim on secondary markets.',
    highlights: [],
  },
  {
    title: 'reclaim402',
    folder: '',
    type: '',
    description: 'A refund-safety gateway experiment for x402 payments that authorizes or escrows funds before provider execution, captures only after verified delivery, and lets buyers reclaim unresolved payments after expiry.',
    highlights: [],
  },
  {
    title: 'follow me on socials',
    folder: '',
    type: '',
    description: 'I share thoughts on crypto, culture, products, markets, and the founder/operator work behind the projects I build and advise.',
    highlights: [],
    socialLinks: [
      { label: 'X: @0x_Tariq', href: 'https://x.com/0x_Tariq' },
      { label: 'LinkedIn: @tariqwaseem', href: 'https://www.linkedin.com/in/tariqwaseem' },
      { label: 'Instagram: @yvs.tariq', href: 'https://www.instagram.com/yvs.tariq' },
      { label: 'TikTok: @tariq.waseem', href: 'https://www.tiktok.com/@tariq.waseem' },
    ],
  },
]
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
              <strong>$5M+ assets driven</strong>
            </div>
          </div>
        </section>

        <section id="profile" className="cred-section">
          <p className="eyebrow">[ PROFILE ]</p>
          <h2>Web3-native GTM operator translating technical products into clear buyer messaging, partner relationships, and growth motion.</h2>
          <p className="profile-copy">
            Proven track record in outbound prospecting, account mapping, technical buyer messaging, and Web3-native relationship building.
          </p>
          <div className="capability-strip">
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="impact" className="work-section">
          <p className="eyebrow">[ SELECTED IMPACT ]</p>
          <div className="impact-grid">
            {impact.map((item, index) => (
              <article className="impact-card" key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
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
                {(project.type || project.folder) && (
                  <div className="dev-project-topline">
                    {project.type && <span>{project.type}</span>}
                    {project.folder && <code>{project.folder}</code>}
                  </div>
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.highlights.length > 0 && (
                  <div className="mini-pill-list">
                    {project.highlights.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
                {'socialLinks' in project && project.socialLinks && (
                  <div className="social-link-list">
                    {project.socialLinks.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                    ))}
                  </div>
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
                  <h3>{job.company}</h3>
                  <p className="role">{job.role}</p>
                  <ul>
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </article>
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
                <a href="tel:+177****0301">(770) 861-0301</a>
                <span>Atlanta, GA</span>
                <span>tariqw.eth</span>
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

