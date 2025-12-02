<!-- .github/copilot-instructions.md for GoldMiner (Create React App + TypeScript) -->

# Copilot / AI Agent Instructions — GoldMiner

This repository is a small React single-page app bootstrapped with Create React App (TypeScript template). The guidance below is focused on actionable, project-specific patterns to help an AI coding agent be immediately productive.

- **Big picture:** This is a client-only React app (no backend code here). App entry: `src/index.tsx` -> `src/App.tsx`. Static assets and PWA metadata live in `public/` (e.g. `manifest.json`, `robots.txt`). Build tooling is `react-scripts` as configured in `package.json`.

- **Key files to inspect before changing behavior:**
  - `package.json` — start/build/test scripts (use `npm start`, `npm run build`, `npm test`).
  - `tsconfig.json` — `strict: true`, `noEmit: true` (TypeScript strictness affects typing changes).
  - `src/index.tsx` — React root creation (`ReactDOM.createRoot`) and `reportWebVitals` hook.
  - `src/App.tsx` and `src/App.test.tsx` — canonical examples of component + test style.
  - `public/` — static assets; favicon/manifest live here and are referenced by index.html.

- **Build / dev / test commands (use these exactly):**
  - Development server: `npm start` (CRA dev server, http://localhost:3000).
  - Run tests: `npm test` (uses react-scripts + testing-library). For CI runs use: `npm test -- --watchAll=false`.
  - Production build: `npm run build`.

- **Project-specific conventions & patterns:**
  - TypeScript strictness is enabled (`tsconfig.json`). Provide explicit types for exported props and avoid relying on implicit any.
  - Functional React components with default exports are used (see `src/App.tsx`). Follow the same pattern for new components.
  - CSS is plain `.css` imports per-component (no CSS modules). Import styles next to component files (e.g. `import './MyComponent.css'`).
  - Assets (images, svgs) are imported from `src/` (see `src/logo.svg` in `App.tsx`). Prefer bundler imports (`import logo from './logo.svg'`) instead of referencing relative `public/` paths when the asset is part of the module.
  - Performance/analytics hook: `reportWebVitals()` is wired in `src/index.tsx`. If adding analytics, send metrics from there.

- **Testing & patterns:**
  - Tests use `@testing-library/react` conventions. See `src/App.test.tsx` for examples.
  - Keep tests co-located with components (same folder, `*.test.tsx`). Use `data-testid` only when necessary; prefer user-visible queries.

- **When changing configuration:**
  - This project uses `react-scripts` (no custom webpack config). Avoid `eject` unless explicitly requested by a maintainer.
  - If you need to change TypeScript compiler options, update `tsconfig.json` and ensure `noEmit` remains considered for local dev flow.

- **Integration & external deps:**
  - Dependencies are in `package.json`; there is no server or external API code in this repo.
  - If adding a new library, update `package.json` and mirror the existing versioning style. Prefer lightweight, actively maintained packages.

- **Common edit examples (copy-paste friendly):**
  - Add a new component: create `src/components/MyWidget.tsx` (functional component), `src/components/MyWidget.css`, then import and use in `src/App.tsx`.
  - Add an image: place PNG/SVG in `src/assets/`, then `import icon from '../assets/icon.svg'; <img src={icon} />`.

- **Prompts for the AI agent when creating code:**
  - "Add a strictly-typed React functional component `X` in `src/components` with props interface `XProps`, a basic test in `X.test.tsx`, and import it into `src/App.tsx`. Use CSS file `X.css` for styling." 
  - "Refactor `src/App.tsx` to move header into `Header` component and update tests accordingly; keep behavior identical and ensure TypeScript types remain strict."

- **What not to change without approval:**
  - Do not `eject` the app.
  - Do not alter `public/manifest.json` or service-worker behavior unless implementing a PWA requirement—ask first.

If any section above is unclear or you want more examples (component skeletons, test templates, or preferred commit message style), tell me which area to expand and I will iterate.
