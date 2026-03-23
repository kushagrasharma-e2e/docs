# Design Documentation

This file is the living design reference for the E2E Networks documentation site.

Update this document whenever the site-wide visual system, major layout behavior, or homepage information architecture changes.

## Current Direction

The site uses a light-first documentation theme with dark-mode support.

The current visual direction is:

- clean, platform-documentation focused
- soft neutral surfaces instead of heavy gradients or glows
- restrained scale so the UI does not feel zoomed in
- product-oriented homepage messaging for E2E Networks, not just Node docs
- token-driven styling with shared theme variables in `src/css/custom.css`

## Theme Configuration

### Color Mode

- Default mode: `light`
- Dark mode: supported
- `respectPrefersColorScheme`: `true`

Configured in:

- `docusaurus.config.ts`

### Brand / Core Palette

The current primary brand color is green-led:

- primary: `#1f8f62`
- light background base: `#f6f6f1`
- raised light surface: `#ffffff`
- dark background base: `#101010`
- raised dark surface: `#171717`

These values are defined as tokens in:

- `src/css/custom.css`

## Typography

### Fonts

- Base font: `Manrope`
- Heading font: `Space Grotesk`

### Scale

The site intentionally uses a reduced visual scale to avoid a zoomed-in feel.

Current notable choices:

- `--ifm-font-size-base: 15px`
- compact navbar height
- moderate heading sizes
- compact cards, pills, and sidebar rows

If future changes make the UI feel oversized again, review:

- `--ifm-font-size-base`
- navbar item heights
- homepage hero sizing
- sidebar row sizing
- card paddings

## Shared Layout System

### Global Theme File

Most design decisions flow from:

- `src/css/custom.css`

This file controls:

- theme tokens
- navbar
- sidebar
- docs content surfaces
- TOC
- code blocks
- footer
- light/dark mode behavior

### Surface Model

Use shared surface tokens instead of hardcoded colors:

- `--doc-surface-raised`
- `--doc-surface-subtle`
- `--doc-surface-muted`
- `--doc-border-soft`
- `--doc-border-strong`

Avoid introducing light-only values like `#ffffff` directly in component styles unless there is a strong reason and dark-mode handling is added too.

## Navbar

The navbar is intentionally compact and horizontally padded so content does not sit on screen edges.

Current behavior:

- compact fixed-height row
- centered brand, nav items, and search
- rounded active states
- subtle border-bottom
- search button styled to match the same surface system

Primary implementation:

- `src/css/custom.css`
- `docusaurus.config.ts`

## Sidebar

The sidebar is styled as a cleaner navigation panel rather than a plain nested list.

Current behavior:

- stronger top-level product/category blocks
- lighter nested rails and indentation
- clearer active and hover states
- compact row heights
- MyAccount-specific Node icon styling

Primary implementation:

- `src/css/custom.css`
- `src/css/myaccount/sidebars.css`
- `sidebars.ts`

## Homepage

The homepage should represent E2E Networks broadly, not only the currently most-developed documentation section.

### Current Content Goals

The homepage should help users discover:

- E2E Networks as a broader platform company
- MyAccount docs
- TIR docs
- Help content
- Release Notes

### Homepage Files

- `src/pages/index.tsx`
- `src/pages/index.module.css`
- `src/components/HomepageFeatures/index.tsx`
- `src/components/HomepageFeatures/styles.module.css`

### Homepage Rules

1. Do not let homepage messaging drift back into a Node-only landing page.
2. Keep the hero compact and not over-scaled.
3. Keep the top area close to the navbar; avoid reintroducing large empty spacer gaps.
4. Preserve dark-mode readability for all homepage cards, pills, and buttons.

## Release Notes

Release notes use the same site-wide surface system as the rest of the docs.

Primary files:

- `src/pages/release-notes.tsx`
- `src/pages/release-notes.module.css`

Design expectations:

- same card language as homepage/docs
- no hardcoded light-only surfaces
- filters and pagination should stay compact and readable

## Footer

The footer should match the site theme rather than feeling like a separate dark block.

Current behavior:

- light by default
- dark variant in dark mode
- uses site text and border tokens
- follows the same soft neutral look as the rest of the page

Primary implementation:

- `docusaurus.config.ts`
- `src/css/custom.css`

## Dark Mode Requirements

Every visual change should be checked for dark mode.

Common regression areas:

- homepage overlay gradients
- card hover backgrounds
- pills/badges
- release notes buttons and tags
- footer and sidebar surfaces

Before finishing design changes, review for:

- hardcoded `#ffffff`
- hardcoded light neutral rgba values
- text colors that only work on light backgrounds

## Validation Workflow

After any meaningful design change, run:

```bash
npm run typecheck
npm run build
```

Known caveat:

- `npm run build` currently passes with pre-existing broken-link warnings from release-notes content data.
- Those warnings are not automatically design regressions.

## Files To Update When Design Changes

If the design system changes materially, update this file and verify the relevant source files:

- `design.md`
- `docusaurus.config.ts`
- `src/css/custom.css`
- `src/pages/index.tsx`
- `src/pages/index.module.css`
- `src/components/HomepageFeatures/index.tsx`
- `src/components/HomepageFeatures/styles.module.css`
- `src/pages/release-notes.tsx`
- `src/pages/release-notes.module.css`
- `src/css/myaccount/sidebars.css`

## Maintenance Rule

Treat `design.md` as documentation for the current state of the site, not as a one-time design note.

Whenever the site’s design direction changes, this file should be updated in the same change set.
