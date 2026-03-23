# E2E Networks Docs

This repository contains the Docusaurus site for E2E Networks documentation. It covers the broader documentation surface for E2E products, with the current navigation centered around MyAccount, TIR, Help content, and a custom release notes experience.

The site is built with Docusaurus 3, React 19, TypeScript, and custom CSS/Tailwind-based styling. It is currently configured for GitHub Pages deployment at:

- `https://kushagrasharma-e2e.github.io/e2e-docs/`

## What This Repo Contains

This repo is not just a markdown dump. It includes:

- Product documentation under `docs/`
- Custom landing and release-notes pages under `src/pages/`
- Sidebar and site configuration under `sidebars.ts` and `docusaurus.config.ts`
- Brand assets and release-note JSON payloads under `static/`
- Shared UI components and styling under `src/components/` and `src/css/`

At a high level, the information architecture currently looks like this:

- `docs/intro.md`
  - Main entry point for the documentation experience
- `docs/myaccount/`
  - MyAccount product documentation
- `docs/tir/`
  - TIR documentation
- `docs/help/`
  - Help and migration/troubleshooting content
- `src/pages/index.tsx`
  - Custom homepage for the broader E2E ecosystem
- `src/pages/release-notes.tsx`
  - Custom filterable release-notes page powered by JSON data

## Stack

- Docusaurus `3.9.2`
- React `19`
- TypeScript `5.6`
- Tailwind CSS `3`
- Radix UI primitives for some reusable components
- GitHub Actions + GitHub Pages for deployment

## Prerequisites

Install the following locally before working in this repo:

- Node.js `20` or newer
- `npm`

The project declares `node >= 20.0` in `package.json`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Serve the built output locally:

```bash
npm run serve
```

Type-check the TypeScript code:

```bash
npm run typecheck
```

Clear the Docusaurus cache if routes, docs, or generated metadata look stale:

```bash
npm run clear
```

Other available scripts:

- `npm run docusaurus`
- `npm run swizzle`
- `npm run deploy`
- `npm run write-translations`
- `npm run write-heading-ids`

## Important CI Note

The GitHub Actions deployment workflow uses:

```bash
npm ci
```

That means the repository should include a valid lockfile when the deployment pipeline is expected to run successfully. If dependencies are added or updated, make sure the corresponding lockfile is generated and committed.

## Repository Structure

```text
.
├── docs/                         # Product and help documentation
│   ├── intro.md                  # Main documentation introduction
│   ├── myaccount/                # MyAccount docs
│   ├── tir/                      # TIR docs
│   └── help/                     # Help-center style docs
├── src/
│   ├── components/               # Reusable React components
│   ├── css/                      # Global and product-specific styles
│   ├── lib/                      # Utilities
│   └── pages/                    # Custom site pages
├── static/
│   ├── release-notes/            # JSON data for release notes
│   └── svg/                      # Logos and brand assets
├── .github/workflows/            # CI/CD workflows
├── docusaurus.config.ts          # Site config, navbar, footer, search, base URL
├── sidebars.ts                   # Sidebar configuration for docs sections
├── tailwind.config.js            # Tailwind theme extension
├── postcss.config.js             # PostCSS config
└── package.json                  # Scripts and dependencies
```

## Current Navigation Model

The navbar is configured in `docusaurus.config.ts` and currently exposes:

- `MyAccount`
- `TIR`
- `Help`
- `Release Notes`

The docs sidebars are split into:

- `myaccountSidebar`
- `tirSidebar`
- `helpSidebar`

The MyAccount area is the most developed section at the moment and includes:

- Getting Started
- Concepts
- Guides
- Use Cases
- Operate
- Reference
- Troubleshooting
- Research
- Auto Scale

## How Content Is Organized

The docs are written around user tasks and operational workflows rather than internal team boundaries.

Examples:

- “Create your first node”
- “Connect to your node”
- “Monitoring and alerts”
- “Snapshots, images, and backups”
- “Migrate an AWS image”

This is the right pattern to preserve when adding new documentation. Write for the person trying to complete a job, not for the team that owns the feature internally.

## Editing Documentation

### Add or update a normal doc page

1. Edit or add a Markdown/MDX file under `docs/`.
2. Add front matter where useful, for example:

```md
---
title: My Page Title
description: Short description for previews and search context
---
```

3. Place the file in the product area that matches the user workflow:
   - `docs/myaccount/`
   - `docs/tir/`
   - `docs/help/`
4. If the page must appear in navigation, update `sidebars.ts` or place it in an autogenerated folder already referenced there.
5. Run the site locally and verify the page route, sidebar placement, and internal links.

### Add a new homepage or custom React page

Use `src/pages/` for routes that are not standard docs pages.

Current examples:

- `src/pages/index.tsx`
- `src/pages/release-notes.tsx`

Use this for:

- Landing pages
- Marketing-style documentation entry points
- Highly interactive pages
- Pages backed by JSON or component logic

### Update release notes

The release notes page is powered by JSON files in:

- `static/release-notes/myaccount.json`
- `static/release-notes/tir.json`

Each item is merged, sorted by date, filtered in the UI, and rendered by `src/pages/release-notes.tsx`.

Current item shape:

```json
{
  "date": 1735689600,
  "product": "Example Product",
  "myaccount": true,
  "tir": false,
  "title": "Release title",
  "details": ["Bullet or paragraph text"],
  "to": "/docs/somewhere",
  "tag": ["beta"]
}
```

Notes:

- `date` is stored as a Unix timestamp in seconds
- `details` is an array of paragraph strings
- `to` is optional
- `tag` is optional
- Platform filtering depends on the `myaccount` and `tir` booleans

## Site Configuration

The main site configuration lives in `docusaurus.config.ts`.

Key things defined there:

- Site title and tagline
- GitHub Pages `url` and `baseUrl`
- Navbar and footer links
- Search configuration via Algolia
- Plausible analytics script injection
- Theme CSS entry points
- Prism syntax-highlighting themes

If the repository is moved, renamed, or deployed from a different domain/path, `url` and `baseUrl` must be updated.

## Styling and UI

This repo uses a mixed styling approach:

- Docusaurus theme defaults
- Product-specific CSS under `src/css/`
- CSS modules for page/component-local styling
- Tailwind tokens and utilities via `tailwind.config.js`

Important styling files:

- `src/css/custom.css`
- `src/css/globals.css`
- `src/css/myaccount/sidebars.css`
- `src/css/tir/sidebars.css`
- `src/pages/index.module.css`
- `src/pages/release-notes.module.css`

Shared UI components live under:

- `src/components/ui/`

Brand assets live under:

- `static/svg/light/`
- `static/svg/dark/`

## Deployment

Deployment is configured in `.github/workflows/deploy.yml`.

Current behavior:

- Pushes to `main` trigger a build
- Manual runs are also allowed via `workflow_dispatch`
- The workflow:
  - checks out the repo
  - sets up Node 20
  - runs `npm ci`
  - runs `npm run build`
  - uploads the `build/` directory
  - deploys to GitHub Pages

If the Pages site is not updating, check:

- that GitHub Pages is enabled for the repository
- that the workflow has permission to write Pages artifacts
- that the `url` and `baseUrl` values in `docusaurus.config.ts` match the deployed path
- that the dependency lockfile matches `package.json`

## Authoring Guidelines

When updating docs in this repo, keep these rules:

- Prefer task-based titles over internal jargon
- Write for operators and builders, not just for product insiders
- Keep paragraphs direct and procedural
- Add reference pages when precision matters
- Add guides when users are trying to achieve an outcome
- Keep internal links relative and maintainable where possible
- Verify sidebar placement after moving or renaming a file

Good documentation in this repo should answer:

- What is this thing?
- When should I use it?
- How do I get started?
- What breaks in production?
- Where do I go when it fails?

## Recommended Maintainer Workflow

For a normal docs change:

1. Edit the relevant file under `docs/`, `src/pages/`, `src/css/`, or `static/release-notes/`.
2. Run `npm start`.
3. Verify:
   - route renders
   - sidebar placement is correct
   - internal links resolve
   - visual styling still works in light and dark mode where applicable
4. Run `npm run build` before shipping larger structural changes.
5. Push to `main` when ready to publish through GitHub Pages.

## Files Worth Knowing First

If you are new to this repo, start with these files:

- `README.md`
- `package.json`
- `docusaurus.config.ts`
- `sidebars.ts`
- `docs/intro.md`
- `src/pages/index.tsx`
- `src/pages/release-notes.tsx`

## License

This repository is licensed under the MIT License. See `LICENSE`.
