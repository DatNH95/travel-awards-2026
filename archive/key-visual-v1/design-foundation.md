# Travel Awards 2026 — Design foundation

## Repository audit

The initial repository contained only `publish/assets/key-visual/{key visual.svg,logo.svg,typo.svg}`. There was no framework, package manifest, TypeScript setup, CSS, component library, font, photography or sitemap to preserve. Foundation uses Next.js App Router, TypeScript strict mode, React and Tailwind CSS v4 through PostCSS. No UI or animation library is added. Exact dependency versions and pnpm lockfile are committed to the workspace.

## Visual DNA and provenance

All three supplied SVGs were rendered and inspected before authoring the system. The landscape combines a white/mint atmosphere, a bronze-drum silhouette, Vietnamese landmarks, layered teal mountains and a curving river. Shapes have fine contours and translucent depth. The landscape file is **a hybrid SVG with an embedded raster image**, approximately 21 MB; it is not entirely editable vector artwork.

The blue logo has serif lettering and a geometric monogram. The green campaign lockup has expressive serif letters, curling flourishes and four-point star markers. Accordingly, display typography may use a serif fallback; body and navigation use a plain sans serif. Neither fallback reproduces the bespoke campaign lettering, which remains an original SVG.

| Semantic role | Value | Exact source |
| --- | --- | --- |
| Brand primary / CTA | `#0076BE` | logo.svg `.st0` |
| Brand secondary / campaign | `#019047` | typo.svg `.st0` |
| Brand teal / interactive text | `#00719C` | KV gradient stop |
| Brand accent / border | `#91D5D8` | KV contour strokes |
| Secondary surface | `#E8F5F3` | KV `SVGID_1_` stop |
| Mint surface | `#AFDDD6` | KV `SVGID_1_` stop |
| Landscape leaf | `#BADCAD` | KV gradient stop |
| Primary ink / inverse surface | `#263C53` | KV fill |
| Secondary text | `#32787C` | KV gradient stop |
| White / inverse text | `#FFFFFF` | KV fill and stops |
| Atmospheric light only | `#F9E087` | KV `SVGID_4_` stop |

The KV does contain a pale yellow light gradient. It is recorded as `brand-light` for source accuracy, not expanded into a gold UI palette. The atmosphere gradient uses the original `SVGID_1_` colors and stop order (percentages rounded). UI surface and ink assignments are implementation inferences, not official brand guidelines. Filled controls pair logo blue with white; green is primarily reserved for the unmodified campaign artwork. Text links use deeper teal; mint and contour colors are decorative rather than body text colors.

## Tokens and typography

`src/styles/tokens.css` is the single source of tokens using Tailwind v4 `@theme`, following [Tailwind theme variables](https://tailwindcss.com/docs/theme). It includes semantic color/action/surface/text/border tokens, typography, spacing, reading/page widths, breakpoints and radius. CSS custom properties hold borders, focus, aspect ratios, gradient and motion.

Display XL/L and Heading 1–3 use **Times New Roman / Georgia**; Body Large/Body/Body Small, Label, Caption and Navigation use **Arial / Helvetica**. These are temporary system fonts. No font download, license assumption or remote font dependency is introduced. Replace only the two font tokens when licensed official font files arrive. Campaign lockup stays SVG regardless of UI font changes.

Layout uses a 4-column mobile, 8-column tablet and 12-column desktop editorial grid. Breakpoints are 640, 768, 1024, 1280 and 1536 px. Maximum page width is 1280 px; reading width is 672 px. Gutter, section spacing and content spacing scale with the viewport. Images and sections have straight edges. Buttons have a subtle 2 px control radius; large rounded cards are not established as a brand rule.

## Components and graphic usage

- `Container`, `Section`, `Eyebrow`, `SectionHeading`: shared layout/hierarchy. Sections support primary, secondary and inverse surfaces.
- `Button`: native button semantics, primary/secondary, hover/focus/active/disabled; default type is `button`.
- `TextLink`: native anchor with arrow and an inert disabled rendering.
- `ResponsiveImage`: Next Image, required alt, responsive sizes, 4:3/3:4/16:9 editorial crops with preserved proportions.
- `BrandGraphic`: external references to logo, campaign lockup, original landscape, extracted ornament and marker. External SVG references avoid Illustrator ID/class collisions.
- `SignatureDivider`: the original flourish centered between restrained contour-colored rules.
- `SectionMarker`: the original campaign four-point star.

Run `pnpm assets:generate` to regenerate web assets. Originals in `publish/` remain untouched; generation also supports the alternate `publish old/` folder name. The script validates typography path count and extraction anchors, crops whitespace around logo/lockup, extracts original paths 26–30 and 16 without recoloring/redrawing, and writes SHA-256 provenance. Generated files live in `public/assets/key-visual/`.

Use the full landscape only when context needs the full KV composition; the preview includes it as a reference. UI identity also appears independently through colors, typography, original flourishes, star markers, gradient and proportions. Do not simply put the KV behind a hero and invent a separate style below it. Do not distort SVGs or replace their brand colors via filters.

Photography is not supplied. Proposed treatment is editorial crop, straight edges, no indiscriminate tinted overlay, with ornaments outside imagery. The preview explicitly labels its KV crop as an illustration and includes an honest photography placeholder. Refinement adds controlled cloud overlays and original foreground framing; no new masks are invented.

Motion uses a restrained opacity/vertical mask reveal for the preview introduction and short control transitions. No animation dependency or perpetual movement is introduced; refinement adds opt-in finite landscape depth. `prefers-reduced-motion: reduce` disables transitions, animation and smooth scrolling. Decorative SVGs are hidden from assistive technology; meaningful brand imagery has alt text. A skip link and visible keyboard focus are provided.

## Scope and next phases

`/design-system` is a minimal development review page, marked noindex. `/` redirects there as a temporary entry point. No Homepage, sitemap, nomination form, voting, pre-gala, live-event or winners behavior has been built. Future phases should reuse this foundation; phase labels/status colors must not silently override brand identity.

Before production use, obtain official licensed font files and approved photography; request separated/optimized KV exports, particularly landscape motifs and drum artwork, to avoid shipping the 21 MB hybrid file broadly. Confirm brand usage rules and the temporary typography with the Product Designer.


## Refinement 01

See [surface semantics, graphic hierarchy, KV decomposition, image treatment, typography status and motion](visual-refinement.md). The existing foundation is extended; Homepage remains deferred.
