export type Holding = {
  asset: string
  allocation: number
  color: string
}

export type ImpactSector = {
  company: string
  focus: string
}

export type ImpactMilestone = {
  id: string
  title: string
  description?: string
  proofUrl?: string
  sectors?: ImpactSector[]
}

export const portfolioAsOf = 'July 19, 2026'

export const holdings: Holding[] = [
  { asset: 'BTC', allocation: 80, color: '#f5a43b' },
  { asset: 'veAERO', allocation: 10, color: '#58e5e8' },
  { asset: 'FLR', allocation: 5, color: '#cf6f35' },
  { asset: 'Others', allocation: 5, color: '#9caf8d' },
]

export const impactMilestones: ImpactMilestone[] = [
  {
    id: 'market-growth',
    title: 'Market Growth',
    description: 'Contributed to $25M+ in 40Acres assets under management across locks on Aerodrome, Velodrome, Blackhole, and Pharaoh.',
  },
  {
    id: 'grants-incentives',
    title: 'Grants & Incentives',
    description: 'Led the rollout of a 200K OP grant program that generated $5M in new 40Acres AUM and $3–5M in loan originations across Velodrome on Optimism and Aerodrome on Base, while maintaining efficient token allocation. Applying that experience at CAPACITR through protocol-owned liquidity management, vote-directed incentives, and market-responsive reward routing on Hydrex.',
  },
  {
    id: 'brand-gtm',
    title: 'Brand & GTM',
    description: "Led 40Acres' institutional brand redesign, documentation, and product storytelling from alpha through mainnet across agentic yield allocators, revenue-generating instruments, fixed-yield tokenization, and revenue-based financing.",
  },
  {
    id: 'web3-education',
    title: 'Web3 Education',
    description: "Collaborated with Georgia State University's Entrepreneurship & Innovation Institute to help create its first for-credit Maymester course covering blockchain's role in commerce. During five years leading BlockchainGSU, organized educational programming, developed curricula, and taught college-level courses and lectures on blockchain, DeFi, NFTs, and cryptocurrency to undergraduate and graduate students, reaching more than 1,000 students.",
    proofUrl: 'https://www.linkedin.com/posts/tariqwaseem_atlanta-blockchaingsu-bgsu-ugcPost-6929572303324266496-EY7O/',
  },
  {
    id: 'ecosystem-collaboration',
    title: 'Ecosystem Collaboration',
    sectors: [
      { company: 'WarnerMedia', focus: 'NFTs' },
      { company: 'Ledgible', focus: 'Accounting' },
      { company: 'Pendle', focus: 'Fixed Yield' },
      { company: 'Frax Finance', focus: 'frxUSD' },
      { company: 'Citrea', focus: 'Bitcoin L2' },
      { company: 'Aerodrome', focus: 've(3,3)' },
      { company: 'Hydrex', focus: 'metaDEX' },
    ],
  },
]
