# Claude Code Prompt 5: About Page Elevation

## Context

You are working on `about.html` — the about/manifesto page of alexojers.com. The site is a dark editorial portfolio: `#050505` background, white/rgba text, `#0000C5` accent (decoration only, never body text), Inter font, 12-column grid with asymmetry, GSAP + Lenis for smooth scrolling and animations, custom cursor with `cursor: none !important` globally.

The about page currently has: hero header (title + portrait) → "MANIFESTO" monument → 4 alternating rd-rows (Reality, Scope, Origin, Method) → closing quote → back button. It works structurally, but it's the only page on the site with zero visual breaks — no images after the header, no cinematic moments, no background texture. It needs elevation.

## Design System (from DESIGN-RULES.md)

- Background: `#050505` | Text: `#ffffff` or `rgba(255,255,255,0.85)` | Accent: `#0000C5` | Grey: `#888888`
- Font: Inter | Easing: `cubic-bezier(0.19, 1, 0.22, 1)` stored as `var(--easing)`
- 12-column grid | `border-radius: 24px` on all media elements
- Titles: massive (clamp 4rem+), body: compact (1.25rem–1.5rem)
- Use intentional asymmetry — leave columns empty on purpose

## Existing CSS classes (already defined, do NOT redefine)

- `.rd-grid` — flex column, width 100%, margin-bottom 128px, counter-reset
- `.rd-row` — 12-col grid, gap 32px, padding 64px top/bottom, relative, overflow hidden
- `.rd-row.reversed` — flips section-title and text-content to opposite sides
- `.rd-number` — position absolute, font-size 14rem, font-weight 800, rgba(255,255,255,0.12), pointer-events none
- `.rd-row .section-title` — grid-column 1/span 5, clamp(3rem, 5vw, 4.5rem), #0000C5, uppercase
- `.rd-row .text-content` — grid-column 7/span 6
- `.rd-row .text-content p` — font-size 1.5rem, font-weight 300, rgba(255,255,255,0.75)
- `.service-outro` — grid-column 2/span 10, text-align center, margin-bottom 96px
- `.service-outro p` — clamp(2rem, 4vw, 3rem), font-weight 500, white
- `.full-bleed-break` — width 100vw, position relative, left 50%, margin-left -50vw, height 75vh, overflow hidden, margin-top 128px, margin-bottom 128px
- `.full-bleed-break img` — width/height 100%, object-fit cover, grayscale(80%) brightness(0.6) contrast(1.15), on hover: grayscale(0%) brightness(0.9)
- `.about-portrait img` — border-radius: `0 0 100px 100px`, filter: drop-shadow
- `.about-page .rd-row:nth-child(N)` — custom asymmetric column placements per row on desktop (min-width 769px)

## Current about.html structure (exact)

```html
<main class="about-page">
    <div class="container">
        <!-- Hero: title + portrait side by side -->
        <div class="about-header-split">
            <div class="about-header-text">
                <h1 class="about-hero">Shape ideas forward</h1>
                <div class="intro-block">
                    <p>I help people turn ideas into decisions that actually hold up in practice.</p>
                </div>
            </div>
            <div class="about-header-visual">
                <div class="about-portrait" data-magnetic>
                    <img src="https://res.cloudinary.com/dnkcu6lne/image/upload/v1767372479/Abstract_Profile_Photo_Instagram_Post_pajs63.png" alt="Alex AI Trainer">
                </div>
            </div>
        </div>

        <!-- Monument -->
        <section class="typo-monument">
            <span class="monument-text">MANIFESTO</span>
        </section>

        <!-- Manifesto grid: 4 rows, alternating -->
        <div class="rd-grid">
            <div class="rd-row">
                <!-- NO rd-number currently -->
                <h2 class="section-title">Reality</h2>
                <div class="text-content">...</div>
            </div>
            <div class="rd-row reversed">
                <h2 class="section-title">Scope</h2>
                <div class="text-content">...</div>
            </div>
            <div class="rd-row">
                <h2 class="section-title">Origin</h2>
                <div class="text-content">...</div>
            </div>
            <div class="rd-row reversed">
                <h2 class="section-title">Method</h2>
                <div class="text-content">...</div>
            </div>
        </div>

        <!-- Closing quote -->
        <div class="service-outro">
            <p>I'm interested in the practical, often messy work of figuring out what's next, without pretending it's simple.</p>
            <p style="font-size: 1.25rem; margin-top: 32px; opacity: 0.7;">If that sounds familiar, we'll probably have a good conversation.</p>
        </div>

        <a href="index.html#about" class="back-btn" data-magnetic style="margin-top: 64px;">
            <span class="btn-arrow">&larr;</span> Back to Home
        </a>
    </div>
</main>
```

---

## Changes to Make

### 1. Add rd-numbers to all four manifesto rows (HTML)

The R&D page (service-rd.html) uses `<span class="rd-number">01</span>` etc. — large watermark numbers behind each section that create visual depth. The CSS for `.rd-number` already exists. The about page currently omits these.

Add a `<span class="rd-number">` as the first child of each `.rd-row`:

```html
<div class="rd-row">
    <span class="rd-number">01</span>
    <h2 class="section-title">Reality</h2>
    <div class="text-content">...</div>
</div>

<div class="rd-row reversed">
    <span class="rd-number">02</span>
    <h2 class="section-title">Scope</h2>
    <div class="text-content">...</div>
</div>

<div class="rd-row">
    <span class="rd-number">03</span>
    <h2 class="section-title">Origin</h2>
    <div class="text-content">...</div>
</div>

<div class="rd-row reversed">
    <span class="rd-number">04</span>
    <h2 class="section-title">Method</h2>
    <div class="text-content">...</div>
</div>
```

Keep all existing text content inside each row exactly as-is. Only add the `<span class="rd-number">` elements.

---

### 2. Add horizontal rule separators between rd-rows (CSS)

Add a subtle border between consecutive rd-rows. This gives each section a visual anchor:

```css
.rd-row + .rd-row {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}
```

This applies site-wide (R&D page too), which is intentional — it improves both pages.

---

### 3. Split the rd-grid in two and insert a full-bleed visual break (HTML)

The about page has four consecutive text rows with no visual interruption. Every other page on the site has a cinematic break. Split the grid after row 2 (Scope) and insert a `.full-bleed-break`.

**Use a placeholder image for now** — a neutral, dark-toned stock image or any existing Cloudinary asset from the site. The `.full-bleed-break` filter (grayscale + low brightness) will handle the visual treatment regardless of the source image.

Restructure the HTML from:

```html
<div class="rd-grid">
    row 1 (Reality)
    row 2 (Scope)
    row 3 (Origin)
    row 4 (Method)
</div>
```

To:

```html
<div class="rd-grid">
    row 1 (Reality)
    row 2 (Scope)
</div>

<div class="full-bleed-break">
    <img src="https://res.cloudinary.com/dnkcu6lne/image/upload/v1767459178/Podcast_YouTube_Thumbnail_ol7kid.png" alt="Alex at work" loading="lazy">
</div>

<div class="rd-grid">
    row 3 (Origin)
    row 4 (Method)
</div>
```

**IMPORTANT notes:**
- The `.full-bleed-break` class already exists in style.css (full-viewport-width, 75vh, grayscale filter, color on hover). Do NOT redefine it.
- The image URL above is a placeholder (the podcast thumbnail). The site owner will replace it with a proper image later. The grayscale filter treatment will make any photo look consistent.
- The second `.rd-grid` starts with row 3 (Origin). This is fine — the `.rd-number` spans show explicit numbers (03, 04) so there's no counter dependency.
- The `.full-bleed-break` already has `margin-top: 128px` and `margin-bottom: 128px`. Since the `.rd-grid` has `margin-bottom: 128px`, there will be 256px between the last row of grid 1 and the break image. To tighten this, add a scoped override:

```css
.about-page .rd-grid:first-of-type {
    margin-bottom: 0; /* The full-bleed-break provides its own spacing */
}
```

- The about page uses custom asymmetric placements per row via `.about-page .rd-row:nth-child(N)`. After splitting the grid, the numbering resets per grid. So `row 3 (Origin)` becomes `:nth-child(1)` in the second grid, and `row 4 (Method)` becomes `:nth-child(2)`. **The CSS nth-child selectors need to be updated.** Currently:

```css
/* Current (rows 1-4 in one grid): */
.about-page .rd-row:nth-child(1) .section-title { grid-column: 1 / span 4; }
.about-page .rd-row:nth-child(1) .text-content { grid-column: 8 / span 4; }
.about-page .rd-row.reversed:nth-child(2) .section-title { grid-column: 9 / span 4; text-align: right; }
.about-page .rd-row.reversed:nth-child(2) .text-content { grid-column: 2 / span 4; }
.about-page .rd-row:nth-child(3) .section-title { grid-column: 1 / span 4; }
.about-page .rd-row:nth-child(3) .text-content { grid-column: 6 / span 5; }
.about-page .rd-row.reversed:nth-child(4) .section-title { grid-column: 8 / span 5; text-align: left; }
.about-page .rd-row.reversed:nth-child(4) .text-content { grid-column: 2 / span 4; }
```

After the split, rows 3 and 4 become child 1 and 2 in the second grid. Replace the nth-child selectors with specific class-based targeting. Add a class to the second grid:

**In HTML:** Add `class="rd-grid rd-grid-part2"` to the second grid:
```html
<div class="rd-grid rd-grid-part2">
    row 3 (Origin)
    row 4 (Method)
</div>
```

**In CSS:** Replace the nth-child(3) and nth-child(4) rules:

```css
@media (min-width: 769px) {
    /* Grid 1 — rows 1 and 2 (unchanged) */
    .about-page .rd-row:nth-child(1) .section-title { grid-column: 1 / span 4; }
    .about-page .rd-row:nth-child(1) .text-content { grid-column: 8 / span 4; }
    .about-page .rd-row.reversed:nth-child(2) .section-title { grid-column: 9 / span 4; text-align: right; }
    .about-page .rd-row.reversed:nth-child(2) .text-content { grid-column: 2 / span 4; }

    /* Grid 2 — rows 3 and 4 (now nth-child 1 and 2 in the second grid) */
    .about-page .rd-grid-part2 .rd-row:nth-child(1) .section-title { grid-column: 1 / span 4; }
    .about-page .rd-grid-part2 .rd-row:nth-child(1) .text-content { grid-column: 6 / span 5; }
    .about-page .rd-grid-part2 .rd-row.reversed:nth-child(2) .section-title { grid-column: 8 / span 5; text-align: left; }
    .about-page .rd-grid-part2 .rd-row.reversed:nth-child(2) .text-content { grid-column: 2 / span 4; }
}
```

**CRITICAL: Remove the old nth-child(3) and nth-child(4) rules** from the existing `@media (min-width: 769px)` block for `.about-page`. They will no longer match anything and should be cleaned up.

---

### 4. Fix the closing quote hierarchy (HTML + CSS)

**Problem:** The closing `.service-outro` has:
- Main quote: `clamp(2rem, 4vw, 3rem)`, font-weight 500 — this is SMALLER than the section titles above it (clamp 3rem–4.5rem), creating a hierarchy inversion where the conclusion feels weaker than the body content.
- Second paragraph: inline-styled `font-size: 1.25rem; margin-top: 32px; opacity: 0.7` — unprofessional inline styling.

**Fix HTML:** Replace the inline-styled second paragraph with a proper class:

```html
<div class="service-outro">
    <p class="outro-statement">I'm interested in the practical, often messy work of figuring out what's next, without pretending it's simple.</p>
    <p class="outro-aside">If that sounds familiar, we'll probably have a good conversation.</p>
</div>
```

**Fix CSS:** Add these new rules and override the existing `.service-outro` behavior for the about page:

```css
/* Closing statement — elevated hierarchy */
.about-page .service-outro {
    margin-bottom: 64px;
    padding-top: 96px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.outro-statement {
    font-size: clamp(2.5rem, 4.5vw, 4rem) !important;
    line-height: 1.15 !important;
    font-weight: 600 !important;
    color: var(--text-color) !important;
    max-width: 900px;
    margin: 0 auto 40px !important;
}

.outro-aside {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.45);
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .outro-statement {
        font-size: 2rem !important;
        text-align: left !important;
    }
    .outro-aside {
        text-align: left;
        font-size: 1.1rem;
    }
}
```

The `!important` flags are necessary to override the existing `.service-outro p` rule which applies to ALL `<p>` children and uses specificity that would otherwise win.

This makes the main statement `clamp(2.5rem, 4.5vw, 4rem)` — nearly matching the section titles (clamp 3rem–4.5rem). It now reads as a conclusion that carries the same weight as the manifesto. The aside is clearly subordinate at 1.25rem with muted color.

The `border-top` creates a visual boundary: "the manifesto has ended, this is the takeaway."

---

### 5. Add a subtle film grain texture overlay (CSS)

**Problem:** The page background is pure flat `#050505`. No texture, no depth. Adding a very subtle noise overlay creates tactile richness — the difference between a cheap phone screen and premium matte paper.

**Add this CSS rule:**

```css
/* Subtle film grain texture — about page */
.about-page::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
}
```

**Key details:**
- `position: fixed` ensures it covers the viewport as you scroll without creating layout issues
- `pointer-events: none` means it doesn't interfere with clicks or the custom cursor
- `z-index: 0` places it below all content (the `.container` has `position: relative`)
- `opacity: 0.035` on the SVG × `opacity: 0.35` on the CSS = effectively ~1.2% visible — barely perceptible but it removes the "digital flat" feel
- `::before` (not `::after`) to avoid conflicts with any existing pseudo-elements on `.about-page`

**IMPORTANT:** Test that the grain doesn't interfere with the `mix-blend-mode: difference` on the custom cursor. Since it's a `::before` pseudo-element on `<main>` with `z-index: 0`, and the cursor follower is `z-index: 2000001`, there should be no conflict. If the cursor looks different, reduce the grain opacity to 0.2.

---

### 6. Fix portrait border-radius for consistency (CSS)

**Problem:** `.about-portrait img` has `border-radius: 0 0 100px 100px` (capsule bottom). Every other visual on the site uses `border-radius: 24px`. This is the only element breaking the visual system.

**Fix CSS:**

```css
.about-portrait img {
    border-radius: 24px;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 197, 0.15)); /* Keep existing shadow */
}
```

This overrides the existing rule. If the property already exists in style.css, update it in-place rather than creating a duplicate.

---

### 7. Add parallax to the full-bleed break image (JS)

The existing script.js already has a parallax block for `.full-bleed-break img`:

```javascript
const fullBleedImg = document.querySelector('.full-bleed-break img');
if (fullBleedImg) {
    gsap.to(fullBleedImg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.full-bleed-break',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}
```

This targets the FIRST `.full-bleed-break` on the page. Since the about page now has one `.full-bleed-break` (and the podcast page also has one), verify this selects correctly. If it only grabs the first match globally, change the selector to `querySelectorAll` and loop:

```javascript
// Replace the existing fullBleedImg block with:
const fullBleedImgs = document.querySelectorAll('.full-bleed-break img');
fullBleedImgs.forEach(img => {
    gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: img.closest('.full-bleed-break'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});
```

The full-bleed image already has `transform: scale(1.15)` in the existing `.full-bleed-break img` CSS rule — no additional CSS needed for parallax headroom.

---

## Files to Edit

1. **about.html:**
   - Add `<span class="rd-number">01</span>` through `04` to each rd-row
   - Split `.rd-grid` into two grids with `.full-bleed-break` between them
   - Add class `rd-grid-part2` to the second grid
   - Replace inline-styled outro paragraph with classed version
   - Bump version parameter: `style.css?v=88` and `script.js?v=84` (or current + 1)

2. **style.css:**
   - Add `.rd-row + .rd-row` border rule
   - Add `.about-page .rd-grid:first-of-type` margin override
   - Update about-page nth-child selectors (replace old nth-child 3/4 with `.rd-grid-part2` selectors)
   - Add `.outro-statement` and `.outro-aside` rules
   - Add `.about-page::before` grain texture
   - Update `.about-portrait img` border-radius to 24px
   - (`.full-bleed-break img` already has `transform: scale(1.15)` — no change needed)

3. **script.js:**
   - Update fullBleedImg parallax to `querySelectorAll` with loop (if currently using `querySelector`)

## Post-Implementation Checklist

- [ ] Numbers 01–04 appear as large watermarks behind each manifesto section
- [ ] Thin horizontal lines separate the four manifesto rows
- [ ] A full-bleed image appears between Scope (row 2) and Origin (row 3)
- [ ] The image has grayscale filter and reveals color on hover
- [ ] The image has parallax on scroll
- [ ] The asymmetric column placements still work correctly on desktop (row titles and text in their custom positions)
- [ ] The closing statement feels like a conclusion, not a comedown — larger text, border separator above
- [ ] The aside paragraph ("If that sounds familiar...") is properly muted
- [ ] A very subtle film grain is visible on the background (zoom to 200% to confirm)
- [ ] The grain does NOT interfere with the custom cursor
- [ ] The portrait image has rounded corners (24px) instead of the capsule shape
- [ ] Mobile: everything stacks correctly, grain is visible, break image is ~50vh
- [ ] No horizontal overflow from the full-bleed break element
