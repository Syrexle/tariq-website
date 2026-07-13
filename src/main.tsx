import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import './styles.css'

const projects = [
  {
    title: 'Onchain Market Intelligence',
    tag: 'DASHBOARD',
    copy: 'Liquidity strategy screens, token holder mapping, and incentive narratives for Base-native teams.',
    accent: 'cyan',
  },
  {
    title: 'AI Service Business Systems',
    tag: 'PRODUCT',
    copy: 'Revenue-focused intake flows, founder admin views, and sellable MVP demos for local operators.',
    accent: 'amber',
  },
  {
    title: 'Visual Research Interfaces',
    tag: 'STUDIO',
    copy: 'Editorial front ends that turn technical ideas into investor, customer, and partner-ready stories.',
    accent: 'green',
  },
]

const capabilities = ['Visual systems', 'React prototypes', 'AI workflows', 'Onchain dashboards', 'Landing pages', 'Product storytelling']

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
        <a className="brand" href="#top" aria-label="Tariq portfolio home">
          <span className="brand-mark" />
          <span>Tariq</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#about">[ ABOUT ]</a>
          <a href="#work">[ WORK ]</a>
          <a href="#services">[ SERVICES ]</a>
          <a href="#contact">[ CONTACT ]</a>
        </nav>
        <a className="mono-link hide-mobile" href="mailto:hello@example.com">[ START A BUILD → ]</a>
      </header>

      <main id="top">
        <section className="hero section-grid">
          <div className="hero-copy">
            <p className="eyebrow">VISUAL DEVELOPMENT / PRODUCT SYSTEMS / AI-AUGMENTED EXECUTION</p>
            <h1>
              Interfaces<span className="dot green">.</span><br />
              Dashboards<span className="dot amber">.</span><br />
              Agents<span className="dot rust">.</span><br />
              Markets<span className="dot cyan">.</span>
            </h1>
            <p className="hero-subcopy">
              A portfolio environment for cinematic web experiences, onchain dashboards, and fast MVPs that make complex ideas feel obvious.
            </p>
            <div className="cta-row">
              <a href="#work">[ SEE SELECTED WORK → ]</a>
              <a href="#contact">[ BUILD WITH ME → ]</a>
            </div>
          </div>

          <div className="terrain-card" aria-label="Abstract visual development landscape">
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
              <span>LIVE SYSTEM</span>
              <strong>Portfolio OS</strong>
            </div>
          </div>
        </section>

        <section id="about" className="cred-section">
          <h2>Applied front-end craft for founders, protocols, and operators that need the prototype to sell the vision.</h2>
          <div className="capability-strip">
            {capabilities.map((item) => <span key={item}>{item}</span>)}
          </div>
        </section>

        <section id="work" className="work-section">
          <p className="eyebrow">[ SELECTED DIRECTIONS ]</p>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.title}>
                <span>{project.tag}</span>
                <h3>{project.title}</h3>
                <p>{project.copy}</p>
                <a href="#contact">[ DISCUSS THIS → ]</a>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services-section section-grid">
          <div>
            <p className="eyebrow">[ HOW I HELP ]</p>
            <h2>From vague product idea to polished web surface.</h2>
          </div>
          <div className="service-list">
            <div><span>01</span><p>Design and rebuild portfolio-grade landing pages with deployable static architecture.</p></div>
            <div><span>02</span><p>Shape dashboards and product demos around the metrics, story, and CTA that matter.</p></div>
            <div><span>03</span><p>Package live prototypes for GitHub Pages, Vercel, or investor/customer walkthroughs.</p></div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">[ LET'S COLLABORATE ]</p>
              <h2>Have a visual system, dashboard, or MVP to ship?</h2>
              <p>Send the idea, constraints, and desired launch path. This static form is ready to wire to Formspree, Basin, or a custom endpoint.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input aria-label="Name or organization" placeholder="Name or organization" />
              <input aria-label="Email" placeholder="Email" type="email" />
              <select aria-label="Project type" defaultValue="">
                <option value="" disabled>I am building...</option>
                <option>Portfolio / personal site</option>
                <option>Product demo / MVP</option>
                <option>Dashboard / data interface</option>
              </select>
              <textarea aria-label="Project details" placeholder="Tell me what you're working on..." />
              <button type="submit">[ SEND MESSAGE → ]</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Tariq Visual Development</span>
        <a href="#top">Back to top</a>
      </footer>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
