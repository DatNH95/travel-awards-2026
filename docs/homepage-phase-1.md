# Homepage Phase 1

The root route now renders the Homepage in the requested order: Header, Hero, About, Award Journey, Award System, How to Participate, Minitalk, News, Final CTA, Organizer, Footer. `/design-system` remains available.

## Composition

- Official V2 PNG and the original campaign lockup anchor the Hero. No legacy landscape layers, recoloring, new masks or graphic assets.
- Existing primary, soft mint and deep teal surfaces establish the page rhythm. Arial / Helvetica sans-serif is shared by display, headings and body; it remains a temporary UI fallback.
- Asymmetric type-led sections, generous whitespace, ruled timeline and an editorial award list replace card layouts. SignatureDivider appears only in the Awards chapter.
- Awards tabs support pointer and arrow/Home/End keyboard interaction and display 6 or 9 entries.
- Every nomination CTA leads to `/dang-ky-de-cu`, a lightweight coming-soon destination without a form or backend.

## Pending official content

- Names and criteria for all 15 categories; current entries are explicitly awaiting announcement.
- Organizer and partner names/logos.
- Minitalk schedule, guests and photography.
- Published news content and photography. The 1 featured + 3 secondary layout uses labeled preview copy and V2 artwork until provided.

## Validation

Production build and TypeScript passed. Desktop visual review covered Hero, About/Journey, Awards, Minitalk, News and Final CTA. Tab switching showed 9 pioneering entries and keyboard navigation returned to 6 pillar entries. All nomination links target the placeholder route and clicking the final CTA successfully opened it. `/design-system` still renders KV V2. Browser console had no errors or warnings. No horizontal overflow at 1440px desktop or 390px mobile. Basic mobile layout is provided; detailed mobile refinement is deferred as requested.
