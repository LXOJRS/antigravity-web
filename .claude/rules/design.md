# Design — agent quick reference

Full design system lives in `DESIGN-RULES.md` at repo root. This file is a focused pointer for agent context with the highest-risk rules.

## Load-bearing rules

1. **Brand color is `#BFE8F8`** (icy blue). NOT `#0000C5` (the old deep blue). Confirm with grep — zero matches of `#0000C5` in style.css.
2. **theme-light system** uses CSS variables (`--theme-bg`, `--theme-fg`, `--theme-muted`, `--theme-subtle`, `--theme-border`) scoped to `.theme-light`. GSAP animates these on scroll. Padding is fixed at 50vh top/bottom; do NOT animate padding (V103-V105 did and caused bugs).
3. **Full-bleed breakouts** use `width: 100vw; position: relative; left: 50%; margin-left: -50vw;` pattern with internal padding `max(24px, calc(50vw - 576px))` to align content with container's content area.
4. **8-point grid** for vertical spacing: 48 / 64 / 96 / 128 px.

## Visual primitives in use

- `.pull-quote.left` — display-scale quote with `.highlight` accent phrase
- `.rd-row.inverted` — small title + display-weight body (one per page)
- `.typo-monument` + `.monument-text` — only `PRESS PLAY` on podcast Act 3 remains
- `.typography-portal` + `.portal-marquee` — scroll-pinned marquee
- `.full-bleed-break` — 75vh image/video with parallax scale
- `.cinematic-showcase` — creative-building right-bleed video, preserved per user preference
- `.creative-break-full` — wrapper with blurred duplicate-video background
- `.theme-light` — scoped color inversion with live scroll-driven transition

## Typography scale

- Hero title: `clamp(4.5rem, 14vw, 13rem)`
- Hero subtitle: `clamp(1.5rem, 4vw, 3.5rem)` with rotating-word
- Page hero: `clamp(3.5rem, 6vw, 6.5rem)`
- Section title (rd-row): `clamp(3rem, 5vw, 4.5rem)`
- Pull-quote left: `clamp(3rem, 6vw, 5.5rem)`
- Monument: `clamp(6rem, 15vw, 15rem)` stroked
- Body: 1.25-1.5rem

## What was removed and should not return

- Section labels like `01 / ABOUT` above titles (removed V102)
- MANIFESTO / UNCERTAINTY / LISTEN / CREATE monuments (removed V102)
- Podcast Act 1 logo video grid (removed V101, logo moved to Act 3 mark)
- Application section portrait video (removed V101)
- Podcast preloader (deferred V101)

## See also

- `DESIGN-RULES.md` — full living design system
- `.claude/rules/voice.md` — writing constraints
- `.claude/rules/architecture.md` — code architecture
