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
  /** Square crop; a monogram renders if the file is ever missing. */
  avatarSrc: '/assets/pfp.webp',
  avatarAlt: 'A round, contented alligator figurine sitting on a carpet',
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
  { text: 'i’m in the kitchen cooking as you can see 🐊' },
]

export const projectGroups: ProjectGroup[] = [
  {
    label: 'on-chain',
    tip: 'Built around blockchain mechanics: contracts, routing, and onchain positions.',
    items: [
      { name: 'robinhood-remote-swap', href: 'https://youtu.be/5_sjySPeftw' },
      { name: 'CAPACITR Swap Route Visualizer', href: 'https://x.com/0x_Tariq/status/2083603771716747724?s=20' },
      { name: 'PT-USD3 Zapper', href: 'https://lnkd.in/p/e66NyCNd' },
    ],
  },
  {
    label: 'off-chain',
    tip: 'Needs no blockchain at all: ordinary apps, pipelines, and tools.',
    items: [
      { name: 'tradeLead AI', href: 'https://tradelead-ai.vercel.app/' },
      { name: 'Tweetframe', href: 'https://tweet-frame-print.vercel.app/' },
    ],
  },
  {
    label: 'skills',
    tip: 'Agent skills I wrote to do research, tracing, and outbound work repeatably.',
    items: [
      { name: 'Excalidraw This', href: 'https://docs.google.com/document/d/1J3cGuCIVG7rxaq-smeYUNlTI1MGIBajgUIefQ3t4eqU/edit?tab=t.0' },
      { name: 'Onchain Transaction Tracing', href: '/#ai-skills' },
      { name: 'Lock Voting Performance', href: '/#ai-skills' },
      { name: 'Cold DM Research', href: '/#ai-skills' },
    ],
  },
]
