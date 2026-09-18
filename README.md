# Adaptive Benefits prototype

A mobile-first concept showing how the Benefits experience can prioritize content and actions based on a member's current context. All member and plan information in this prototype is fictional.

The heading stays fixed. Everything below it is composed from an ordered layout plan, so the section order, the section variants, and the copy all change with the member's situation.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173/benefits-adaptive-UI/
npm test         # layout rules + render coverage
npm run build    # type-check, then build to dist/
```

## How it works

- `src/adaptive/context.ts` defines the member signals the layout reads (tenure, recent claims, prior authorization status, deductible applied vs limit, saved programs).
- `src/adaptive/scenarios.ts` holds the five presets exposed by the controls.
- `src/adaptive/rules.ts` turns a context into an ordered list of blocks, each with a variant and the reason it landed where it did. It is a pure function, and it is what the tests assert against.
- `src/blocks/` holds the nine sections that the layout can place. `src/screens/` holds the Benefits page plus the four sub-pages.

Scenario controls sit outside the device frame, alongside a panel explaining what moved and why. The "Label what moved" toggle overlays review badges on the screen itself; turn it off to read the page as a member would.

## Deploying to GitHub Pages

`.github/workflows/deploy-pages.yml` builds and publishes `dist` on every push to `main`. Two things it depends on:

- `vite.config.ts` sets `base: '/benefits-adaptive-UI/'` to match the Pages URL. Change it if the repository is renamed.
- In the repository settings, Pages must have **Source** set to **GitHub Actions**.
