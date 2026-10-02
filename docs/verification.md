# KV V2 verification

The official 1920×1080 PNG V2 was visually inspected. The central area is clear and the atmosphere/mountain/mist effects differ from legacy layer exports.

- Public PNG matches the source SHA-256; generation tracks V2 and the retained logo/typography SVG sources.
- Legacy source, generated landscape/layer exports, extraction script and superseded notes live outside `public/` in `archive/key-visual-v1/`.
- No active app component, generation path or preview uses legacy landscape composition.
- Retained foundation: color palette, three surfaces, typography, layout/grid, buttons/links and graphic hierarchy.
- Current motion samples use retained brand SVGs and the V2 PNG. Old layer-depth/overlay specimens are removed.

- Production build and TypeScript checks passed.
- Browser review passed at desktop and 390px mobile: V2 renders in its original ratio, with no horizontal overflow or bronze-drum references. Browser console had no errors or warnings.

No Homepage work is included.
