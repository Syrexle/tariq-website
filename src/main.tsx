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
                <a href="tel:+17708610301">(770) 861-0301</a>
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
