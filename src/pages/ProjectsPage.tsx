import { useEffect, useState } from 'react'
import '../projectsPage.css'
import { Butterfly } from '../components/Butterfly'
import { Garden } from '../components/Garden'
import { useTiltParallax } from '../useTiltParallax'
import { profile, projectGroups, quotes, socials, type SocialLink } from '../projectsData'

/** A regular hexagon in objectBoundingBox units, corners rounded 32% along each edge. */
const HEX_PATH =
  'M0.92,0.6386 Q1,0.5 0.92,0.3614 L0.83,0.2056 Q0.75,0.067 0.59,0.067 L0.41,0.067' +
  ' Q0.25,0.067 0.17,0.2056 L0.08,0.3614 Q0,0.5 0.08,0.6386 L0.17,0.7944' +
  ' Q0.25,0.933 0.41,0.933 L0.59,0.933 Q0.75,0.933 0.83,0.7944 Z'

const ICONS: Record<SocialLink['icon'], React.ReactNode> = {
  x: <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />,
  linkedin: <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />,
  github: <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />,
  website: (
    <g className="pp-ico-stroke">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.3 2.45 3.5 5.45 3.5 9S14.3 18.55 12 21M12 3C9.7 5.45 8.5 8.45 8.5 12S9.7 18.55 12 21" />
    </g>
  ),
}

const monogram = profile.name
  .split(' ')
  .map((part) => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

const websiteLinks = [
  { label: 'main portfolio', href: 'https://tariqwaseem.com/content-portfolio/' },
  { label: 'growth portfolio', href: 'https://tariqwaseem.com/growth-portfolio/' },
]

export function ProjectsPage() {
  const { parallaxRef, floatRef } = useTiltParallax()
  const [avatarFailed, setAvatarFailed] = useState(false)
  // Picked once per mount, so a re-render does not swap the line mid-read.
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.page = 'projects'
    return () => { delete root.dataset.page }
  }, [])

  return (
    <>
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="pp-hexclip" clipPathUnits="objectBoundingBox">
            <path d={HEX_PATH} />
          </clipPath>
        </defs>
      </svg>

      <Garden />
      <Butterfly />

      <main className="pp-main">
        <div className="pp-pfp-wrap">
          <div className="pp-parallax" ref={parallaxRef}>
            <div className="pp-float" ref={floatRef}>
              <div className="pp-hex">
                <div className="pp-win">
                  {avatarFailed ? (
                    <span className="pp-monogram" aria-hidden="true">{monogram}</span>
                  ) : (
                    <img
                      className="pp-pfp"
                      src={profile.avatarSrc}
                      alt={profile.avatarAlt}
                      fetchPriority="high"
                      onError={() => setAvatarFailed(true)}
                    />
                  )}
                </div>
                <div className="pp-glare" aria-hidden="true" />
              </div>
              <h1 className="pp-plate">{profile.name}</h1>
            </div>
          </div>

          {quote && (
            <div className="pp-bubble">
              <span className="pp-q">
                <span className="pp-qt">{quote.text}</span>
                {quote.tweetId && quote.date && (
                  <a
                    className="pp-ts"
                    href={`https://x.com/0x_Tariq/status/${quote.tweetId}`}
                    target="_blank"
                    rel="noreferrer"
                    title="open this post on X"
                  >
                    {quote.date}
                  </a>
                )}
              </span>
            </div>
          )}
        </div>

        <p className="pp-drift">{profile.tagline}</p>

        <nav className="pp-social" aria-label="social links">
          {socials.map((social, index) => (
            <span className="pp-social-item" key={social.href}>
              {index > 0 && <span className="pp-sep" aria-hidden="true">✦</span>}
              <a
                className="pp-social-link"
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-haspopup={social.icon === 'website' ? 'true' : undefined}
              >
                <svg className="pp-ico" viewBox="0 0 24 24" aria-hidden="true">
                  {ICONS[social.icon]}
                </svg>
                {social.label}
              </a>
              {social.icon === 'website' && (
                <span className="pp-website-menu" role="menu" aria-label="website pages">
                  {websiteLinks.map((link) => (
                    <a key={link.href} role="menuitem" href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </span>
              )}
            </span>
          ))}
        </nav>

        <section className="pp-projects" aria-label="projects">
          {projectGroups.map((group) => (
            <p className="pp-row" key={group.label}>
              <span className="pp-label" tabIndex={0} data-tip={group.tip}>{group.label}</span>
              <span className="pp-items">
                {group.items.map((item, index) => (
                  // The separator travels with the item before it, so a wrap never
                  // leaves a dot orphaned at the start of a line.
                  <span className="pp-nw" key={item.name}>
                    <a href={item.href}>{item.name}</a>
                    {item.soon && <span className="pp-soon">soon</span>}
                    {index < group.items.length - 1 && (
                      <span className="pp-dot" aria-hidden="true">·</span>
                    )}
                  </span>
                ))}
              </span>
            </p>
          ))}
        </section>
      </main>
    </>
  )
}
