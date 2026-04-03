# E2E Networks Documentation

This repository contains the official E2E Networks documentation site, built with [Docusaurus 3](https://docusaurus.io/), React 19, and TypeScript.

The current experience is organized around five top-level content lanes: `MyAccount`, `TIR`, `API`, `Release Notes`, and `Support`. The product docs are centered on `MyAccount` and `TIR`.

## Current Structure

```text
.
├── docs/                         # Documentation content
│   ├── help/                     # Support and troubleshooting content
│   ├── myaccount/                # MyAccount platform docs
│   ├── tir/                      # TIR platform docs
│   └── ...
├── src/
│   ├── components/
│   │   ├── HomepageFeatures/     # Homepage supporting sections
│   │   ├── api/                  # Shared API UI extension area
│   │   └── ui/                   # Shared UI area
│   ├── css/
│   │   ├── custom.css            # Global tokens and shared docs styling
│   │   └── globals.css           # Additional global styles
│   ├── lib/                      # Shared utilities
│   ├── pages/
│   │   ├── index.tsx             # Homepage
│   │   ├── release-notes.tsx     # Release notes listing page
│   │   ├── myaccount/            # Product page area
│   │   └── tir/                  # Product page area
│   └── theme/
│       └── DocSidebarItem/       # Custom theme area
├── static/
│   ├── release-notes/            # Release notes JSON data
│   └── svg/                      # Logos and icons
├── .github/workflows/deploy.yml  # GitHub Pages deployment workflow
├── design.md                     # Living design reference
├── docusaurus.config.ts          # Site configuration
├── sidebars.ts                   # Sidebar configuration
└── package.json                  # Scripts and dependencies
```

## Documentation Areas

- `docs/myaccount/` contains the largest product surface, including compute, storage, database, network, billing, settings, compliances, support, disaster recovery, and the detailed Nodes section.
- `docs/tir/` contains TIR overviews, getting started content, workflows, guides, troubleshooting, and reference material.
- `docs/help/` contains support-oriented documentation paths.

## Navigation Model

- The homepage routes users first into `MyAccount`, `TIR`, `API`, `Release Notes`, or `Support`.
- The top-level routes now point directly to `MyAccount` and `TIR`.
- Product depth is handled primarily through `sidebars.ts`.
- Release notes are rendered from `static/release-notes/myaccount.json` and `static/release-notes/tir.json`.

## Local Development

```bash
npm install
npm start
```

## Validation

Run these checks after meaningful changes:

```bash
npm run typecheck
npm run build
```

`npm run build` currently has pre-existing broken-link warnings from release-notes content. Treat those separately from unrelated documentation or UI edits unless you are fixing the release-notes links themselves.

## Deployment

Deployment is handled by GitHub Actions through [`.github/workflows/deploy.yml`](/Users/kushagrasharma_13/Documents/new-docs/e2e-docs/.github/workflows/deploy.yml).

The workflow:

1. Checks out the repository
2. Uses Node.js 20
3. Runs `npm ci`
4. Builds the site with `npm run build`
5. Publishes the `build/` output to GitHub Pages

## Contributing

1. Update prose docs under `docs/` and keep the structure aligned with `sidebars.ts` and `docusaurus.config.ts`.
2. Prefer shared tokens and patterns from `src/css/custom.css` over one-off styling.
3. Preserve the lane-first information architecture: `MyAccount`, `TIR`, `API`, `Release Notes`, and `Support` are the global routes.
4. Run `npm run typecheck` and `npm run build` before shipping meaningful changes.
