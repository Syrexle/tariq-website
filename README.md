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
5. The site will publish at `https://syrexle.github.io/tariq-website/`.

If you rename the GitHub repo, update `base` in `vite.config.ts` and `homepage` in `package.json` to match the new repo slug.

## Contact form

The form is static right now. To make it send messages, wire it to Formspree, Basin, Airtable, Supabase, or a custom endpoint.
