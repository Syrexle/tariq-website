# GitHub Pages Custom Domain Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing Vite portfolio correctly at `https://tariqwaseem.com/` with reproducible dependency installation.

**Architecture:** Keep the existing GitHub Actions Pages deployment and change Vite's production base from the repository subpath to the custom-domain root. Preserve the configured GitHub custom domain, use Namecheap DNS for apex and `www` routing, and lock package resolution through exact declarations and the tracked npm lockfile.

**Tech Stack:** Vite, React, TypeScript, npm, GitHub Actions, GitHub Pages, Namecheap DNS

---

### Task 1: Verify DNS and reproduce the asset-path problem

**Files:**
- Inspect: `vite.config.ts`
- Inspect: `dist/index.html`

- [ ] Run `dig +short tariqwaseem.com A` and verify the four GitHub Pages IPv4 addresses.
- [ ] Run `dig +short www.tariqwaseem.com CNAME` and verify `syrexle.github.io.`.
- [ ] Run `npm run build` with the current configuration.
- [ ] Run `rg -n '/tariq-website/' dist/index.html` and verify it matches, demonstrating the old base path.

### Task 2: Configure the custom-domain build

**Files:**
- Modify: `vite.config.ts`
- Modify: `package.json`
- Modify: `README.md`

- [ ] Set Vite's `base` to `/`.
- [ ] Change `homepage` to `https://tariqwaseem.com/`.
- [ ] Update the GitHub Pages documentation to describe the custom domain and DNS behavior.
- [ ] Run `npm run build`.
- [ ] Run `rg -n '/tariq-website/' dist/index.html` and verify it returns no matches.
- [ ] Run `rg -n '(src|href)="/assets/' dist/index.html` and verify root-relative assets are present.

### Task 3: Apply dependency supply-chain protections

**Files:**
- Modify: `/Users/tariq/.npmrc`
- Modify or verify: `/Users/tariq/.bunfig.toml`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Preserve existing npm configuration and ensure `min-release-age=7`, `minimum-release-age=10080`, and `save-exact=true` each appear once.
- [ ] Preserve existing Bun configuration and ensure `[install]` contains `minimumReleaseAge = 604800`.
- [ ] Read exact top-level versions from `package-lock.json` and replace every floating declaration in dependencies, devDependencies, and peerDependencies.
- [ ] Run `npm install --package-lock-only` to refresh the lockfile.
- [ ] Run `npm ci` and `npm run build` to verify a clean locked installation.

### Task 4: Commit, deploy, and verify

**Files:**
- Commit: `vite.config.ts`, `package.json`, `package-lock.json`, `README.md`, and design/plan documents

- [ ] Confirm `git diff --check` produces no output.
- [ ] Confirm the lockfile is tracked with `git ls-files --error-unmatch package-lock.json`.
- [ ] Commit the verified repository changes.
- [ ] Push `main` to `origin` to trigger the Pages workflow.
- [ ] Monitor the workflow until it completes successfully.
- [ ] Verify the legacy URL redirects to the same path on `tariqwaseem.com` and HTTPS readiness is accurately reported.
