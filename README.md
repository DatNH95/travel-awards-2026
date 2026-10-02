# Travel Awards 2026

Travel Awards foundation and Homepage Phase 1: Next.js App Router + TypeScript + Tailwind CSS v4. Nomination form, backend and later event phases are deferred.

Requires Node.js 20.9+ and pnpm 11.19.0. Runtime dependencies are pinned in `package.json` and `pnpm-lock.yaml`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000 for the Homepage. The foundation preview remains at `/design-system`; `/nomination` is a coming-soon destination without a form.

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
- `src/app/design-system/page.tsx`: foundation review page.
- `src/app/page.tsx` and `src/app/home.css`: Homepage composition.
- `src/components/award-tabs.tsx`: accessible 6/9-category tabs.
- `scripts/prepare-assets.cjs`: reproducible extraction and provenance.

Missing: licensed official font files, approved photography and optimized/separated KV assets. Arial / Helvetica sans-serif is the temporary fallback for all UI typography. PNG KV V2 is the current visual authority; legacy sources and exports are archived outside public assets in `archive/key-visual-v1/`.

Setup follows [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind's Next.js integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

Refinement: [current visual system rules and KV V2 policy](docs/visual-refinement.md).

Homepage scope, pending official content and validation: [Phase 1 notes](docs/homepage-phase-1.md).
