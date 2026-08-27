export type Route = 'home' | 'content-portfolio' | 'growth' | 'projects'

const ROUTES: Record<string, Route> = {
  '/content-portfolio': 'content-portfolio',
  '/growth': 'growth',
  '/projects': 'projects',
}

/** Maps a pathname to a page, tolerating a trailing slash. Anything else is home. */
export function resolveRoute(pathname: string): Route {
  const normalized = pathname.replace(/\/+$/, '')
  return ROUTES[normalized] ?? 'home'
}
