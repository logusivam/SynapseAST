# Release Notes - SynapseAST

This document details the release parameters, build configurations, and change logs for SynapseAST releases.

## [v1.1.0] - Image Export Feature Launch (July 2026)

SynapseAST `v1.1.0` introduces the layout image download capabilities.

### Key Release Elements

- **High-Density PNG Layout Export:** One-click layout downloads exporting the full visual AST tree as a high-resolution PNG image (with `pixelRatio: 3` for extreme clarity) with all branches temporarily expanded for clear visualization.
- **Embedded SVG Styles Mapping:** Resolves edge label contrast rendering issues inside exported canvases by injecting inline `labelBgStyle` and `labelStyle` configurations directly to the React Flow engine.
- **Dependency Added:** Integrated the `html-to-image` npm library.

### Release Verification

- **TypeScript compilation:** Completed successfully (`npx tsc --noEmit` exits with `0` errors).
- **Linter compilation:** Completed successfully (`npm run lint` exits with `0` errors).
- **Unit test suite:** Exits with `0` errors (`npm run test` passes).
- **E2E test suite:** Exits with `0` errors (`npm run test:e2e` passes).
- **Production build time:** Completed successfully in **1m 5s**.
- **Deployment URL:** https://synapseast-dev.vercel.app/

## [v1.0.0] - Initial Production Launch (July 2026)

SynapseAST `v1.0.0` represents the first stable production-ready compilation of the visual Abstract Syntax Tree (AST) parser explorer.

### Key Release Elements

- **Real-Time Client-Side Parsing:** Integrates `@babel/parser` for zero-latency AST compilation of JavaScript, TypeScript, JSX, and TSX files directly in the browser.
- **Interactive Graph Canvas:** Built using `@xyflow/react` (React Flow), presenting a layout-managed hierarchical representation of the AST with color-coded syntax classifications (Declarations, Expressions, Statements, Literals, Identifiers).
- **Bidirectional Highlights:** Synchronizes cursor ranges in the Monaco Editor to matching AST nodes in the visual graph dynamically, and vice versa.
- **Node Branch Collapsing & Filtering:** Allows users to collapse branch nodes to manage visual density on larger trees, and filter out low-level nodes (like Identifiers and Literals) through the filter configuration panel.
- **Preloading Pipeline:** Beautiful, neon-glowing custom preloading screen simulating compiler initialization stages (bootstrapping Monaco, compiling structures) for an optimal UX.
- **Brand Placements:** Custom high-res SVG vectors (`nav-logo.svg` and `footer-logo.svg`) and multi-size favicon tags linked across page headers.
- **FSD Project Architecture:** Conforms strictly to Feature-Sliced Design (FSD) architecture principles, improving code readability and maintainability.
- **Testing & Verification Suite:** Includes Vitest unit test suites, multi-browser Playwright E2E automation checks (Chromium, Firefox, WebKit), and Git pre-push hooks via Husky.
- **SEO & Deployment Configs:** Includes structured JSON-LD data blocks, optimized robot tags, meta headers, static sitemaps, and automated Vercel CLI deployment workflows.

### Release Verification

- **TypeScript compilation:** Completed successfully.
- **Linter compilation:** Completed successfully.
- **Unit test suite:** Exits with `0` errors.
- **E2E test suite:** Exits with `0` errors.
- **Production build time:** Completed successfully in **49.98 seconds**.
- **Deployment URL:** https://synapseast-dev.vercel.app/
