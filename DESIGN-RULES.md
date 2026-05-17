# Alex.ai — Living Design Rules

Last updated: V117. Reflects the current shipped state across all five pages.

---

## Color system

- Background: `#121212` (premium dark, V117)
- Text primary: `#fafafa` (off-white, V117)
- V117 shifted background and primary text away from absolute black/white (`#050505` / `#ffffff`) for reduced harshness. Accent and gray-muted unchanged. Pure-black `rgba(0,0,0,…)` is intentionally retained on depth-compositing shadows (text-shadow / box-shadow) where the cleaner falloff reads better.
- Text muted (body copy): `var(--gray-color)` = `#B3B3B3`, or `rgba(255, 255, 255, 0.75)` for standard body paragraphs
- Accent: `#BFE8F8` (icy blue). Used for card-index numbers, section titles, pull-quote highlights, subtle text shadows/glows. Used for decoration and display-scale typography, NOT for long-form body text.

The previous `#0000C5` (deep blue) was replaced in V96 because it failed contrast against `#050505`. Confirm with a grep of `#0000C5` on style.css — zero matches remain.

Also defined: `--accent-color: #BFE8F8` (reserved variable for future consistency, not widely used yet).

## Typography

- Font family: Inter, weights 300 / 400 / 500 / 600 / 800
- Hero title: `clamp(4.5rem, 14vw, 13rem)` uppercase, weight 800, letter-spacing -0.04em
- Hero subtitle: `clamp(1.5rem, 4vw, 3.5rem)` with rotating-word animation (verbs cycle every 1400ms)
- Page hero (subpages): `clamp(3.5rem, 6vw, 6.5rem)`
- Service-intro: `1.75rem` on most pages. Podcast page uses `clamp(2rem, 3.5vw, 3rem)` for the display subtitle treatment.
- Section title (`.rd-row .section-title`): `clamp(3rem, 5vw, 4.5rem)` in accent color
- Body text: `1.25rem` to `1.5rem` range depending on context
- Pull-quote (left variant): `clamp(3rem, 6vw, 5.5rem)` display weight 600
- Monument text: `clamp(6rem, 15vw, 15rem)` stroked via `-webkit-text-stroke: 3px rgba(255, 255, 255, 0.4)`

## Pacing and spacing

- 12-col grid inside `.container` (max-width 1200px)
- Vertical rhythm: 48px / 64px / 96px / 128px breakpoints
- Full-bleed breakouts: `width: 100vw` with negative-margin hack and internal padding `max(24px, calc(50vw - 576px))` to keep content aligned to the container's content area
- 8-point grid system for spacing values

## Theme-light system (color inversion on select sections)

Scoped color inversion for rhythm breaks. Applied to:
- About page: Scope row (03), Method row (05)
- R&D page: Focus + Format grid

Implementation: `.theme-light` class on the element. Fixed 50vh top/bottom padding (section is always full-bleed sized). CSS variables default to dark values; GSAP ScrollTrigger animates them to cyan values on scroll-entry, back to dark on scroll-exit. Variables scoped to `.theme-light`:
- `--theme-bg`
- `--theme-fg`
- `--theme-muted`
- `--theme-subtle`
- `--theme-border`

No layout animation. Padding is permanent at 50vh each side. Only color animates. This was stabilized in V106 after earlier versions (V103-V105) tried animating padding and caused layout-shift bugs.

## Rhythm primitives

- `.pull-quote.left`: 3-5.5rem display quote, grid-column 1/span 9, with `.highlight` span for accent-color emphasis
- `.rd-row.inverted`: small uppercase title (1.25rem gray) + display-weight body (clamp 1.75rem, 2.75vw, 2.5rem). One per page max.
- `.typo-monument` + `.monument-text`: full-bleed stroked letters. Currently only `PRESS PLAY` on podcast Act 3. MANIFESTO (about), UNCERTAINTY (R&D), LISTEN (podcast), CREATE (creative-building) all removed in V102.
- `.typography-portal` + `.portal-marquee`: horizontal scroll-pinned marquee with `.pulse` class toggle on scroll
- `.full-bleed-break`: 75vh cinematic image or video break with scroll-linked scale + filter
- `.cinematic-showcase` (creative-building only): asymmetric right-bleed video. Preserved per user preference, never touched by refactors.
- `.creative-break-full`: wrapper with a blurred background video behind the floating break video (creative-building)
- `.podcast-closing-mark`: small 120px square logo video on podcast Act 3, `mix-blend-mode: screen`

## Visual constraints

- No em dashes anywhere in shipped content. Use periods, commas, parentheses, or colons.
- No section labels above titles. Removed in V102 across all pages (both `.label` on homepage and `.section-label` on subpages).
- Rhythm breaks that are "just a big word" have been removed except `PRESS PLAY`. Other rhythm breaks should carry meaning (pull-quote, full-bleed image, marquee).

## Cache discipline

Every HTML file references `style.css?v=XXX` and `script.js?v=XXX`. Always bump these on every HTML file whenever style.css or script.js changes. Current versions: `style.css?v=104`, `script.js?v=94`.

## See also

- `DESIGN-RECOMMENDATIONS.md` — historical input document (pre-V101). Most recommendations shipped; kept for reference.
- `plans/PLAN-EXECUTION-V1.md` — master plan with execution log.
- `.claude/rules/` — modular instruction files for agent context.
- `CLAUDE.md` — project overview and entry point.
