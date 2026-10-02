# Travel Awards 2026 — Current foundation / KV V2

**Official visual reference:** `publish/assets/key-visual/travel-awards-kv-v2.png`. The public copy is byte-for-byte identical; PNG V2 governs color, effect and appearance. Legacy KV, extracted layers and prior visual notes are preserved only in `archive/key-visual-v1/` and are not served by the app.

Direction remains **Vietnam Heritage × Contemporary Travel × Editorial Award**: pale mint/cyan atmosphere, a clear central light region, layered mountains, soft mist, Vietnamese landmarks, skyline and winding river. No new palette or black/gold styling is introduced.

Semantic UI colors remain blue `#0076BE`, green `#019047`, teal `#00719C`, aqua `#91D5D8`, mint `#E8F5F3` / `#AFDDD6`, leaf `#BADCAD` and ink `#263C53`. V2 supports this existing color direction; no speculative replacement of exact UI hex values is made. The old CSS atmosphere approximation is removed: use the official PNG when exact effects matter.

Preserved: Next.js, TypeScript, Tailwind theme, typography scale, spacing/grid, three surface levels with automatic text/action contrast, layout/button/link/image primitives, graphic hierarchy and reduced-motion behavior.

Preserved SVGs: logo, campaign lockup, signature divider and star. Original paths/colors remain intact. Legacy landscape SVG layers are not used: their mist, fading and contours are not reliable substitutes for V2 appearance. Multi-layer depth and legacy cloud/foreground image treatments are withheld until matching V2 assets are supplied. Editorial crop and full bleed use the official PNG with no filters or recoloring.

**temporary UI font:** Arial / Helvetica sans-serif, shared by display, headings and body per the user's typography direction. It is not an official brand font; supplied campaign lettering remains outlined SVG. Licensed fonts and approved photography are still missing.

`/design-system` presents V2, preserved primitives, surfaces, hierarchy, image treatments and subtle replayable reveals. No Homepage or event phase is implemented. Regenerate current assets with `pnpm assets:generate`; provenance lists V2 and retained brand SVG sources.
