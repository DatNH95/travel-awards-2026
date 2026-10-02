# Travel Awards 2026 — Refinement 01

Direction: **Vietnam Heritage × Contemporary Travel × Editorial Award**. Existing foundation, colors, typography scale, routes and core primitives are retained. No Homepage or event phase is implemented. No black/gold direction, new illustration or invented mask is introduced.

## Surface semantics

| Surface | Background | Main text | Secondary text / links | Use |
| --- | --- | --- | --- | --- |
| `primary` | KV white `#FFFFFF` | KV ink `#263C53` | `#32787C` / teal `#00719C` | About, Journey, Participation, News |
| `brand-soft` | KV mint `#E8F5F3` | KV ink | `#32787C` / teal | Awards, quiet chapter contrast |
| `brand-deep` | KV teal `#00719C` | White | KV pale mint `#E8F5F3` | Minitalk, Final CTA |

`Section` and `Surface` scope semantic text, link, action, border and focus variables. The same `Button`, `TextLink`, `SectionHeading` and body typography adapt to each surface. Deep surfaces use white-filled CTAs with teal text; secondary controls use light text and borders. Light nested surfaces reset their semantic variables. Existing `secondary` and `inverse` tones remain supported; the original slate inverse surface is retained for compatibility.

Deep text contrast: white/teal 5.47:1, pale mint/teal 4.89:1. Aqua is retained for outlines/focus rather than small text (aqua/teal is only 3.31:1). Light link hover uses existing ink for sufficient contrast.

## Graphic hierarchy

`GraphicAccent` explicitly selects an accent level. Sections do not decorate themselves automatically.

| Level | Treatment | Examples |
| --- | --- | --- |
| Primary Brand Moment | Original campaign lockup and deliberately composed KV layers | Hero, major campaign moment |
| Major Chapter | SignatureDivider or one large original graphic | Award System, Final CTA |
| Minor Section | SectionMarker, a contour line or typography | Timeline, Minitalk, News |
| Content Area | Whitespace and typography, no default decoration | Article content, details |

`SignatureDivider` has been removed from ordinary image examples and the section-heading example. It remains available and appears in the major-chapter specimen. Graphic/motion specimens may display the original flourish for inspection, which is not guidance to repeat it throughout a page.

## Key Visual decomposition

Original source assets live in `publish/assets/key-visual/`. The generation script also supports the alternate `publish old/` folder name and keeps source files unchanged. SHA-256 provenance records the actual source paths.

`scripts/extract-kv-layers.cjs` selects balanced original XML elements, retains all used original class rules, and resolves gradient/filter/clip/mask/reference dependencies. It does not redraw geometry, recolor paths, strip opacity or vectorize raster content. Extraction validates the current root/group topology and fails if selectors need review.

| Primitive | Source selector (zero-based element children) | Type |
| --- | --- | --- |
| Trống đồng | root child 11 | Vector, original clipping retained |
| Mountain cluster | root child 24 > child 13 | Vector |
| Cloud bank | root child 15 + SVGID_402_ gradient | Vector |
| River | root child 24 > child 3 | Vector |
| Skyline | root child 24 > child 0 | Vector |
| Architecture / Huế | root child 24 > child 12, `hue2` | Original embedded raster |
| Foreground | root child 24 > children 11 and 21 | Vector, original painter order |
| Decorative mist line | root child 20 + SVGID_405_ gradient | Vector |
| Signature ornament and star | Original typo.svg path indices 26–30 and 16 | Existing vector primitives |
| Complete landscape | Unmodified KV source | Hybrid SVG |

Layer bounds crop transparent space, preserving original canvas coordinates; foreground keeps the original canvas edge crop. Individual layers were rendered and visually inspected. Mountain bounds were expanded after measurement to include the full original cluster. The drum retains its source clipping at the bottom: it is not artificially completed.

`KeyVisualLayer` renders an individual layer; `KeyVisualComposition` places a selectable subset on the original 1920×1080 coordinate system using the original painter order. The design-system specimen demonstrates independent composition; it is not a finished Hero or complete KV reconstruction. The manifest `public/assets/key-visual/layers.json` records bounds, source selectors, kind and size; `provenance.json` ties every export to the source.

## Image treatment

`ResponsiveImage` adds explicit `treatment` options without changing its existing default:

- `editorial`: 4:3, 3:4 or 16:9 crop with straight edges.
- `full-bleed`: full width of its containing composition with a matching responsive `sizes` default; place outside `Container` for viewport bleed.
- `graphic-overlay`: the original cloud layer in the upper corner, with no invented mask or text overlay.
- `landscape-frame`: original foreground mountain vectors at the image base.

Overlay layers are decorative and ignore pointer input. Future photographs should reserve quiet regions for graphics and keep people/subjects unobscured. There is still no approved photography in the repository; examples explicitly use KV illustration as a stand-in.

## Typography status

**temporary display font**: Times New Roman, with Georgia/serif fallback. Arial/Helvetica/sans-serif is also a chosen temporary UI fallback. Neither is verified as the official brand font. The supplied logo and campaign typography are outlined vector paths, not font files; the original vector lettering remains unchanged. No guideline or licensed font file is present.

## Motion

`Motion` offers typography, contour-line, subtle graphic and image reveal primitives. `KeyVisualComposition` accepts opt-in `depth`: original layers shift at most 4 px in alternating directions and settle in 1.4 seconds. It is a finite depth reveal, not scroll-linked parallax. No continuous animation, scroll listener or animation dependency is added. Future Hero depth should retain this small bound and original layer positioning.

All motion and smooth scrolling are disabled by `prefers-reduced-motion: reduce`. The preview provides a replay button; finished content remains visible. Source typography/artwork are never deformed to animate them.
