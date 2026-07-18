# Tariq Visual Development Portfolio

A GitHub Pages-ready Vite + React portfolio inspired by dark editorial research-studio sites like Ecofrontiers, rebuilt as an original visual development portfolio.

## Stack

- Vite
- React + TypeScript
- GSAP entrance animation
- Lenis smooth scrolling
- Google Fonts
- GitHub Actions deploy to GitHub Pages

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages hosting

This repo includes `.github/workflows/deploy.yml`. After pushing to GitHub:

1. Open the GitHub repo.
2. Go to Settings → Pages.
3. Set Source to “GitHub Actions”.
4. Push to `main`.
5. The site will publish at `https://tariqwaseem.com/`.

The custom domain is configured in GitHub under Settings → Pages. At the DNS provider, the apex domain points to GitHub Pages with the four official `A` records and `www` is a `CNAME` to `syrexle.github.io`. GitHub redirects the legacy Pages URL and the `www` variant to the canonical custom domain.

Because the site is served from the root of the custom domain, Vite's `base` is `/`.

## Contact form

The form is static right now. To make it send messages, wire it to Formspree, Basin, Airtable, Supabase, or a custom endpoint.
