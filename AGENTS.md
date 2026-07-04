# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **Cypress E2E test suite** (no local app to build/serve). Tests run against the
external live site `https://www.saucedemo.com` (`baseUrl` in `cypress.config.js`), so running them
requires outbound network access.

- "Running the application" = running the Cypress specs in `cypress/e2e/*.spec.js`.
- Run tests (headless): `npm run cypress:run` (alias for `npx cypress run`).
- There is **no lint script and no build step** (`package.json` only defines `cypress:open` and `cypress:run`).
- The Cypress binary is cached at `~/.cache/Cypress`; the update script runs `npx cypress install` so it is present. If `cypress verify` ever fails, re-run `npx cypress install`.
- Reports are written to `cypress/reports/` (git-ignored) via the mochawesome reporter; videos/screenshots go to `cypress/videos/` and `cypress/screenshots/` (also git-ignored, only produced when enabled/on failure).
- To capture a video for a run, pass `--config video=true` (video is disabled by default).
- `cypress:open` (interactive GUI runner) needs a display; prefer `cypress:run` in headless environments.
