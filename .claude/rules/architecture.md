# Architecture — agent quick reference

## Files

- `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `lens-ai.html` — the five pages (`lens-ai.html` was renamed from `creative-building.html` in V114; firebase.json has a 301 redirect from the old path)
- `style.css` — single stylesheet (~2815 lines)
- `script.js` — single script (~615 lines)
- No build step. No bundler. No npm. What's in the repo is what goes live.

## Dependencies (via CDN in every HTML file)

- GSAP 3.12.5 (core, ScrollTrigger, TextPlugin)
- Lenis 1.0.45 (smooth scroll)
- Google Fonts: Inter (300 / 400 / 500 / 600 / 800)

## Cache busting

Every HTML file carries versioned references:

```html
<link rel="stylesheet" href="style.css?v=XXX">
<script src="script.js?v=XXX"></script>
```

**ALWAYS bump these versions on all 5 HTML files when style.css or script.js changes.** Current: `style.css?v=119`, `script.js?v=99`.

## theme-light system (V106 architecture)

The color inversion on select sections (About Scope/Method, R&D Focus+Format) works like this:

### CSS (style.css, bottom of file)
```css
.theme-light {
    --theme-bg: #050505;
    --theme-fg: #ffffff;
    --theme-muted: rgba(255, 255, 255, 0.75);
    --theme-subtle: rgba(255, 255, 255, 0.12);
    --theme-border: rgba(255, 255, 255, 0.08);
    
    background-color: var(--theme-bg);
    color: var(--theme-fg);
    
    /* fixed full-bleed + 50vh padding - do NOT animate */
    width: 100vw;
    padding-top: 50vh;
    padding-bottom: 50vh;
    /* ... */
}

/* child color overrides use the variables */
.theme-light .section-title { color: var(--theme-fg) !important; }
.theme-light .text-content p { color: var(--theme-muted) !important; }
/* etc. */
```

### JS (script.js, near typography-portal handler)
Two `gsap.fromTo` tweens per `.theme-light` section:
- ENTER: dark → cyan as `top bottom → top 30%`
- EXIT: cyan → dark as `bottom 40% → bottom top`

Only CSS variables animate. Padding does NOT animate (previously did — V103-V105 — caused layout-shift bugs).

## Scroll-linked animations

All via GSAP ScrollTrigger:
- `rd-row` reveal: opacity + y on first enter (not scrub)
- `full-bleed-break` scale on scroll
- `cinematic-showcase` filter on scroll
- `typography-portal` xPercent parallax + pulse class toggle
- `theme-light` color variable animation (V106)
- Hero subtitle rotating word (setInterval, 1400ms)

## HTML structure patterns

- `.container` — 12-col grid wrapper, max-width 1200px
- `.rd-grid` — flex-column wrapper for rd-rows
- `.rd-row` — 12-col grid with `section-title` + `text-content`
- `.pull-quote.left` — col 1/span 9 for display quotes
- `.service-outro` — closing statement block
- `.article-banner` — top hero image on service pages

### About page grid variants
- `.rd-grid-part1a` (Reality), `.rd-grid-part1b` (Scope, theme-light), `.rd-grid-part2` (Origin + Method)
- Grids are split around the pull-quote to preserve nth-child column math

### Service pages (service-rd, podcast, lens-ai)
- `<main class="service-page ...-page">` wrapper
- Banner → H1 + service-intro → content sections → outro

## Known dead CSS

These rules are still in style.css but no HTML uses them:
- `.floating`, `.type-text`, `.cursor` (V95+)
- `.creative-text-col`, `.creative-visual-col` (V101)
- `.application-visual-col`, `.application-text-col` (V101)
- `.podcast-grid-act1`, `.podcast-logo-wrapper` (V101)

Safe to leave. Remove only if doing a general cleanup pass.

## Firebase deployment

`firebase.json` at root configures hosting. Deploy with `firebase deploy`. Project id: `website-dea0d`.

## Version numbering convention

- V1-V7: phase work (text, polish, primitives, page restructures, content fills, etc.)
- V96+: tune-up passes (color system, typography, etc.)
- Never skip a version. Increment linearly. Log in `plans/PLAN-EXECUTION-V1.md`.

## Testing

No test suite. Visual regression only: deploy to Firebase, scroll all five pages, confirm nothing is broken.
