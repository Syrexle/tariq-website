# GitHub Pages Custom Domain Design

## Goal

Serve the portfolio at `https://tariqwaseem.com/`, redirect the `www` variant and legacy GitHub Pages URL to the canonical domain, and keep the deployed dependency tree reproducible.

## Domain and deployment design

- Use `tariqwaseem.com` as the GitHub Pages custom domain.
- Point the apex domain to GitHub Pages with the four official `A` records.
- Keep `www` as a `CNAME` to `syrexle.github.io`; GitHub Pages will redirect it to the configured apex domain.
- Continue deploying through the existing GitHub Actions workflow. A repository `CNAME` file is not required for a custom Actions deployment.
- Build Vite assets from `/` because the custom domain serves the project at its root rather than `/tariq-website/`.
- Update repository documentation and package metadata to name the canonical HTTPS URL.

## Supply-chain design

- Preserve existing npm and Bun configuration while applying the required minimum release ages and exact-save policy.
- Replace floating dependency declarations with the exact versions already resolved in `package-lock.json`.
- Refresh and retain the tracked npm lockfile so CI continues to use `npm ci` reproducibly.

## Verification

- Confirm public DNS returns all four GitHub Pages IPv4 addresses and the expected `www` CNAME.
- Demonstrate that the pre-change production build contains `/tariq-website/` asset URLs.
- After the change, build successfully and assert that generated asset URLs begin at `/assets/`.
- Validate dependency declarations are exact, the machine safeguards appear once, and the lockfile remains tracked.
- Push the verified commit and monitor the GitHub Pages workflow and live redirects.
