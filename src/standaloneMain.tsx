import React from 'react'
import { createRoot } from 'react-dom/client'
import { ProjectsPage } from './pages/ProjectsPage'

// The standalone build carries only this page: no router, no site stylesheet, and
// none of the main site's scroll or animation libraries.
createRoot(document.getElementById('root')!).render(
  <React.StrictMode><ProjectsPage /></React.StrictMode>,
)
