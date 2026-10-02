# Foundation verification

Verified on 2026-10-02 using the production Next.js build and the Codex browser.

- Production build passed; `/`, `/_not-found` and `/design-system` generated successfully.
- Standalone `tsc --noEmit` passed after final changes.
- Fresh `/design-system` browser tab: no captured console warnings/errors after loading and clicking the primary CTA.
- Preview contains all six specimen sections, including buttons/links, all 11 typography roles, graphics, image treatment and section heading.
- CTA click updates its live status message. Keyboard Tab reaches the text link with a visible solid focus outline. Two disabled buttons retain native disabled behavior.
- Desktop 1440 px, tablet 768 px and mobile 390 px: document width stays within viewport; no horizontal overflow detected. Final mobile page gutter is 20 px.
- Full KV, logo, campaign lockup, extracted flourish and star rendered without failed image loads. Crop/graphic samples were visually inspected.
- All palette swatches match their declared tokens after switching to `@theme static`.
- Contrast ratios: logo-blue CTA / white 4.84:1; teal / white 5.47:1; secondary text / white 5.11:1; secondary text / mint surface 4.57:1.
- Reduced motion is implemented in CSS to disable animation, transitions and smooth scrolling. A dedicated OS preference emulation was not performed.

The original asset-inspection tab contained two browser errors before the app was created. A fresh app tab was used for the final clean console check.

Review capture: `artifacts/design-system-desktop.jpg` (local, ignored by Git). Production preview is served locally at `http://127.0.0.1:3000/design-system`.

Known limit: the original KV includes embedded raster data and is approximately 21 MB. Official fonts and photography are not supplied; preview clearly identifies temporary fonts and photography placeholders.

## Refinement 01

- Existing foundation retained; preview extended to ten review sections. Homepage and phase behavior remain deferred.
- Eight KV exports rendered successfully and visually inspected. SVG extraction retains original dependencies; Huế architecture is explicitly recorded as embedded raster. Mountain bounds cover the complete original cluster; foreground includes both original corners.
- Surface specimens checked via computed styles: light/soft use ink and teal; deep uses white/mint text, white CTA with teal text, and light secondary control/link colors. Pale mint/teal text contrast is 4.89:1; aqua is limited to decorative borders/focus.
- Fresh refinement browser console had no warnings/errors after motion replay. Replay updates its live status. Reveal durations are 0.6 seconds; landscape depth is 1.4 seconds; all animation iteration counts are one.
- Mobile 390 px: no horizontal overflow or failed loaded images. The new specimens use a single-column layout with the existing page gutter.
- Reduced-motion CSS continues to suppress every animation/transition and smooth scrolling. The active browser OS preference was `false`; OS preference emulation was not performed.
- Generation supports both source folder names, `publish/` and `publish old/`; all three source SHA-256 hashes were verified unchanged.

Final refinement production build and standalone TypeScript check both passed.
