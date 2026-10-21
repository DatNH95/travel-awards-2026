# Travel Awards 2026

Travel Awards: Next.js App Router + TypeScript + Tailwind CSS v4. Phase 1 includes the nomination form; Phase 2 includes voting list/detail and demo surveys. Backend and MyVNEID integration are deferred.

Requires Node.js 20.9+ and pnpm 11.19.0. Runtime dependencies are pinned in `package.json` and `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

On Windows, start a hidden background local server with `powershell -File scripts/start-local.ps1`. This checks port 3000, reuses a healthy server belonging to this project, and keeps logs under `.local-runtime/` (outside build output). Run the command again after restarting Windows or closing the server; refreshing the browser alone cannot start it.

Open http://127.0.0.1:3000 for Homepage Phase 1 and `/dang-ky-de-cu` for registration. Phase 2 lives at `/phase-2`, `/binh-chon` and `/binh-chon/[slug]`. Separate root layouts isolate phase-specific CSS/providers. Foundation preview: `/design-system`; Phase 2 icons: `/phase-2/design-system#icons`.

```sh
pnpm build
pnpm typecheck
pnpm start
pnpm assets:generate
```

`assets:generate` copies the official KV V2 PNG and rebuilds retained brand SVGs without touching supplied files in `publish/` or `publish old/`. See [the visual rationale and source mapping](docs/design-foundation.md).

Main files:

- `src/styles/tokens.css`: semantic tokens, Tailwind theme, typography and layout scale.
- `src/app/globals.css`: base styles, primitives, responsive and reduced-motion rules.
- `src/components/primitives.tsx`: layout, buttons, links, headings and responsive images.
- `src/components/brand-graphics.tsx`: reusable official graphics.
- `src/app/(phase-1)/design-system/page.tsx`: foundation review page.
- `src/app/(phase-1)/page.tsx`, `src/app/(phase-2)/phase-2/page.tsx` and `src/app/home.css`: Homepage composition.
- `src/components/award-tabs.tsx`: accessible 6/9-category tabs.
- `scripts/prepare-assets.cjs`: reproducible extraction and provenance.

Missing: licensed official font files, approved photography and optimized/separated KV assets. Arial / Helvetica sans-serif is the temporary fallback for all UI typography. PNG KV V2 is the current visual authority; legacy sources and exports are archived outside public assets in `archive/key-visual-v1/`.

Setup follows [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind's Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

Refinement: [current visual system rules and KV V2 policy](docs/visual-refinement.md).

Homepage scope, pending official content and validation: [Phase 1 notes](docs/homepage-phase-1.md).

Tech handoff: `handoff-html/` for Phase 1 and `hand-off-phase 2/` for Phase 2. Both contain plain HTML/CSS and optional vanilla browser interactions; keep the folders adjacent for cross-phase links. See each folder's README for export commands and demo limits. QA reports are retained; screenshots and local server logs are ignored.
