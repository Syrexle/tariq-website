export type SocialLink = {
  label: string
  href: string
  icon: 'x' | 'linkedin' | 'github'
}

export type Quote = {
  text: string
  /** Omit both to render the bubble without a dated link back to X. */
  tweetId?: string
  date?: string
}

export type ProjectItem = {
  name: string
  href: string
  soon?: boolean
}

export type ProjectGroup = {
  label: string
  tip: string
  items: ProjectItem[]
}

export const profile = {
  name: 'Tariq Waseem',
  /** Drop the real file at public/assets/pfp.png; a monogram renders until then. */
  avatarSrc: '/assets/pfp.png',
  avatarAlt: 'Tariq’s avatar: a cartoon donkey in a chef’s hat holding a ladle',
  tagline: 'Things I’ve built — onchain tooling, trading infrastructure, and agent skills.',
}

export const socials: SocialLink[] = [
  { label: 'twitter', href: 'https://x.com/0x_Tariq', icon: 'x' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/tariqwaseem', icon: 'linkedin' },
  { label: 'github', href: 'https://github.com/Syrexle', icon: 'github' },
]

/**
 * Picked at random on each load. Add entries as `{ text, tweetId, date }` and the
 * bubble links the date through to the post.
 */
export const quotes: Quote[] = [
  { text: 'nine years of my own capital, and the best trade is still shipping the tool that finds the trade' },
]

export const projectGroups: ProjectGroup[] = [
  {
    label: 'builds',
    tip: 'Shipped and in-progress software: contracts, executors, dashboards, and pipelines.',
    items: [
      { name: 'robinhood-swap-proxy', href: 'https://youtu.be/5_sjySPeftw' },
      { name: 'Hydrex Vote Optimizer', href: '/#projects' },
      { name: 'Enso × CAPACITR Explorer', href: 'https://x.com/0x_Tariq/status/2083603771716747724?s=20' },
      { name: 'PT-USD3 Zapper', href: '/#projects' },
      { name: 'tradeLead AI', href: '/#projects' },
      { name: 'Xbox Clip Pipeline', href: '/#projects' },
    ],
  },
  {
    label: 'skills',
    tip: 'Agent skills I wrote to do research, tracing, and outbound work repeatably.',
    items: [
      { name: 'Excalidraw This', href: '/#ai-skills' },
      { name: 'Onchain Transaction Tracing', href: '/#ai-skills' },
      { name: 'Lock Voting Performance', href: '/#ai-skills' },
      { name: 'Cold DM Research', href: '/#ai-skills' },
    ],
  },
]
