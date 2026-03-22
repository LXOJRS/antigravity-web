# Claude Code Prompt 6: AI-Generated Visuals Page Elevation

## Context

You are working on `creative-building.html` — the AI-generated visuals portfolio page of alexojers.com. The site is a dark editorial portfolio: `#050505` background, white/rgba text, `#0000C5` accent (decoration only), Inter font, 12-column grid, GSAP + Lenis, custom cursor.

This page showcases AI visual work but is currently structured more like a text page with videos tucked alongside. The page peaks at the cinematic right-bleed showcase (100vh, asymmetric) in the middle, then deflates into two repetitive tail rows. The goal is to restructure the bottom half so the page sustains its visual intensity.

## Design System (non-negotiable)

- `#050505` bg | `#ffffff` / `rgba(255,255,255,0.85)` text | `#0000C5` accent | `#888888` grey
- Font: Inter | `--easing: cubic-bezier(0.19, 1, 0.22, 1)`
- 12-column grid | `border-radius: 24px` on media
- GSAP + ScrollTrigger + Lenis smooth scroll

## Existing classes (DO NOT redefine)

Search style.css by class name to verify these exist:
- `.creative-act1` — 12-col grid, gap 48px, margin-bottom 128px
- `.creative-act1 .creative-text-col` — grid-column 1/span 6
- `.creative-act1 .creative-visual-col` — grid-column 8/span 5
- `.portrait-video` — border-radius 24px, aspect-ratio 9/16, brightness filter, hover scale
- `.creative-act2-feature` — flex column, gap 48px, margin-bottom 128px
- `.cinematic-showcase` — right-bleed, 100vh, border-radius 24px 0 0 24px, margin-left 64px
- `.section-title` — 1.5rem, uppercase, #0000C5
- `.section-label` — 0.75rem, grey, uppercase, letter-spacing 0.12em
- `.text-content p` — 1.25rem, line-height 1.8
- `.full-bleed-break` — full-viewport-width, 75vh, overflow hidden, margin 128px top/bottom
- `.full-bleed-break img, .full-bleed-break video` — width/height 100%, object-fit cover, grayscale filter, color on hover, transform scale(1.15)
- `.service-outro` — grid-column 2/span 10, text-align center
- `.outro-statement` — clamp(2.5rem, 4.5vw, 4rem), font-weight 600
- `.outro-aside` — 1.25rem, rgba(255,255,255,0.45)
- `.contact-btn` — pill button, border, backdrop-blur
- `.platform-links-centered` — flexbox centered, gap 24px
- `.typo-monument` — full-width monument text container
- `.monument-text` — clamp(6rem, 15vw, 15rem), transparent + text-stroke

## Current creative-building.html structure

```
<main class="service-page">
  Container 1 (padding-bottom: 128px):
    1. article-banner (shoe image, lighter-filter)
    2. H1 "AI-Generated Visuals"
    3. service-intro
    4. creative-act1 grid:
       - creative-text-col: Medium (.text-block) + Perspective (.text-block, margin-top: 64px inline)
       - creative-visual-col: portrait-video (9:16, ComfyUI_00002_ MP4)
    5. typo-monument "CREATE"

  Container 2 (padding-bottom: 128px):
    6. creative-act2-feature > cinematic-showcase (right-bleed, 100vh video: 202602221402 MP4)
    7. text-block "Application" (standalone, margin-bottom: 128px inline)
    8. creative-act3-tail:
       - tail-row: "Background" text + video (202602221448_ap8fa0 MP4, 4:3)
       - tail-row reversed: "Conclusion" text + video (PORTRAITEDIT_zszvxk MP4, 4:3)
    9. back-btn
```

## Changes to Make

### 1. Add `creative-page` class to `<main>` for scoped CSS

Change:
```html
<main class="service-page">
```
To:
```html
<main class="service-page creative-page">
```

### 2. Add section labels to all text sections

Add `<span class="section-label">` before each `.section-title`:

- Before "Medium" h2: `<span class="section-label">01 / MEDIUM</span>`
- Before "Perspective" h2: `<span class="section-label">02 / PERSPECTIVE</span>`
- Before "Application" h2: `<span class="section-label">03 / APPLICATION</span>`
- The closing outro gets: `<span class="section-label">04 / CONCLUSION</span>`

### 3. Restructure the Application section — pair it with a video

**Current:** After the cinematic showcase, the Application text sits alone as a standalone `.text-block` with no visual pairing. This breaks the visual/text alternation of the page.

**Change:** Replace the standalone text-block with a new grid section that pairs Application text with the PORTRAITEDIT video (currently in the Conclusion tail-row).

Remove:
```html
<div class="text-block" style="margin-bottom: 128px;">
    <h2 class="section-title">Application</h2>
    <div class="text-content">
        <p>The work often begins exploratively...</p>
        <p>Because once visuals move beyond a single frame...</p>
    </div>
</div>
```

Replace with:
```html
<div class="creative-act-application">
    <div class="application-visual-col">
        <video autoplay loop muted playsinline class="portrait-video" poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect fill='%23050505' width='4' height='3'/%3E%3C/svg%3E">
            <source src="https://res.cloudinary.com/dnkcu6lne/video/upload/v1771767853/PORTRAITEDIT_zszvxk.mp4" type="video/mp4">
        </video>
    </div>
    <div class="application-text-col">
        <div class="text-block">
            <span class="section-label">03 / APPLICATION</span>
            <h2 class="section-title">Application</h2>
            <div class="text-content">
                <p>The work often begins exploratively, guided by a clear idea or question. I test how far it can stretch within this medium. From there, I design workflows where variables are exposed and controlled: one character, multiple outputs, repeatable lighting.</p>
                <p>Because once visuals move beyond a single frame into campaigns or series, consistency decides whether they can scale. <strong style="color: #ffffff; font-weight: 500;">Good-looking images are one thing. Reproducible ones demand structure.</strong></p>
            </div>
        </div>
    </div>
</div>
```

**Note:** The `.portrait-video` class is reused here — it already has `border-radius: 24px`, `object-fit: cover`, brightness filter, and hover scale. But the original has `aspect-ratio: 9/16` (portrait). This video is landscape (4:3). Override the aspect ratio in the new CSS (see below).

### 4. Replace the entire tail section with a full-bleed break + closing outro

**Remove** the entire `creative-act3-tail` div (the two tail-rows with Background and Conclusion):

```html
<!-- REMOVE THIS ENTIRE BLOCK -->
<div class="creative-act3-tail">
    <div class="tail-row">
        <div class="tail-text">...</div>
        <div class="tail-visual">...</div>
    </div>
    <div class="tail-row reversed">
        <div class="tail-text">...</div>
        <div class="tail-visual">...</div>
    </div>
</div>
```

**Replace with:**

```html
<!-- Full-bleed cinematic break — promotes the Background video to a statement moment -->
<div class="full-bleed-break">
    <video autoplay loop muted playsinline poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect fill='%23050505' width='4' height='3'/%3E%3C/svg%3E">
        <source src="https://res.cloudinary.com/dnkcu6lne/video/upload/v1771769691/202602221448_ap8fa0.mp4" type="video/mp4">
    </video>
</div>

<!-- Closing statement — merges Background + Conclusion into one elevated outro -->
<div class="service-outro">
    <span class="section-label">04 / CONCLUSION</span>
    <p class="outro-statement">My background in film shapes how I approach this — I think in terms of visual storytelling. Even when the visuals feel abstract, they're designed to communicate intent, tone, and meaning.</p>
    <p class="outro-aside">AI visuals are becoming part of everyday visual culture. This work explores how to use the medium with precision, and discipline, before it settles into habit.</p>
</div>

<!-- CTA -->
<div class="platform-links-centered" style="margin-bottom: 96px;">
    <a href="index.html#contact" class="contact-btn" data-magnetic>
        Get in Touch
    </a>
</div>
```

### 5. Remove the inline `style="margin-top: 64px;"` on the second text-block in Act 1

In the creative-act1 section, the Perspective text-block has `style="margin-top: 64px;"`. Remove it. Add a CSS rule instead (see below).

### 6. Remove the inline `style="padding-bottom: 128px;"` on both containers

Both `<div class="container">` elements have `style="padding-bottom: 128px;"`. Since we're restructuring, move this to CSS. Remove the inline styles from both containers.

Actually — the first container ends after the monument, the second contains everything else. After the restructure, having two separate containers is no longer necessary. **Merge them into one container:**

Remove the closing `</div>` after the monument (line 104) and the opening `<div class="container" style="padding-bottom: 128px;">` (line 106). The page should have a single `<div class="container">` wrapping everything from H1 to back-btn.

Add CSS for the container padding:
```css
.creative-page .container {
    padding-bottom: 128px;
}
```

### 7. Clean up the back-btn inline style

The back-btn currently has no inline style (good). Keep it as-is.

---

## CSS to Add

### Creative page scoped section titles (same pattern as podcast page)

```css
/* Creative page section titles — proper hierarchy */
.creative-page .section-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 0 0 30px rgba(0, 0, 197, 0.25);
}
```

### Application section grid

```css
/* --- Creative Page: Application Section (Visual + Text Paired) --- */
.creative-act-application {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 48px;
    margin-bottom: 128px;
    align-items: center;
}

.creative-act-application .application-visual-col {
    grid-column: 1 / span 5;
}

.creative-act-application .application-text-col {
    grid-column: 7 / span 6;
}

/* Override portrait-video aspect ratio for landscape video in application section */
.creative-act-application .portrait-video {
    aspect-ratio: 4/3;
}

@media (max-width: 768px) {
    .creative-act-application {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
}
```

### Text-block spacing in Act 1 (replace inline style)

```css
.creative-act1 .text-block + .text-block {
    margin-top: 64px;
}
```

### Container padding (replace inline styles)

```css
.creative-page .container {
    padding-bottom: 128px;
}
```

### Creative page outro scoping

The `.service-outro` rules already exist. But on this page the outro is inside the same container as everything else (not using the about-page-specific overrides). The `.outro-statement` and `.outro-aside` classes are already defined (from the about page prompt). They'll apply here automatically since they're not scoped to `.about-page`.

However, add a border-top separator for the creative page outro too:

```css
.creative-page .service-outro {
    padding-top: 96px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 64px;
}
```

### Film grain texture (consistent with about page)

```css
.creative-page::before {
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

---

## JavaScript Changes

### 1. Fix full-bleed parallax to handle video elements

The existing parallax code in script.js (around line 517) only selects `.full-bleed-break img`. The new full-bleed break on this page uses `<video>`, not `<img>`. Update the selector:

**Find this block:**
```javascript
const fullBleedImgs = document.querySelectorAll('.full-bleed-break img');
fullBleedImgs.forEach(img => {
```

**Replace with:**
```javascript
const fullBleedMedia = document.querySelectorAll('.full-bleed-break img, .full-bleed-break video');
fullBleedMedia.forEach(media => {
    gsap.to(media, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: media.closest('.full-bleed-break'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});
```

### 2. Add cinematic showcase parallax

The cinematic right-bleed video currently has no scroll-driven motion. Add subtle parallax:

```javascript
// --- Cinematic Showcase Parallax ---
const cinematicVideo = document.querySelector('.cinematic-showcase video');
if (cinematicVideo) {
    gsap.to(cinematicVideo, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
            trigger: '.cinematic-showcase',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}
```

Add this inside the existing `DOMContentLoaded` callback, near the other parallax blocks.

### 3. Text-block stagger reveal already exists

The existing `textBlocks` animation (line ~496 in script.js) already handles `.text-block` elements site-wide. The new Application section uses `.text-block` inside the grid, so it will be picked up automatically. No change needed.

### 4. Outro scale-in already exists

The existing `.service-outro` animation (lines ~394–416) should pick up the new outro. Verify it fires — it looks for `.service-outro p` which matches `.outro-statement`. No change needed.

---

## Final Page Structure After Changes

```
1. article-banner (shoe image) — UNCHANGED
2. Container (single, merged):
   a. H1 "AI-Generated Visuals" — UNCHANGED
   b. service-intro — UNCHANGED
   c. creative-act1 grid — UNCHANGED except:
      - Section labels added (01/MEDIUM, 02/PERSPECTIVE)
      - Inline margin-top removed from Perspective block
   d. monument "CREATE" — UNCHANGED
   e. cinematic-showcase (right-bleed, 100vh) — UNCHANGED, parallax ADDED
   f. NEW: creative-act-application grid (video left + text right)
      - Uses PORTRAITEDIT video (from old Conclusion tail)
      - 03/APPLICATION label
   g. NEW: full-bleed-break (75vh video, parallax, grayscale → color)
      - Uses 202602221448 video (from old Background tail)
   h. NEW: service-outro with outro-statement + outro-aside
      - 04/CONCLUSION label
      - Merged Background + Conclusion text
   i. NEW: CTA "Get in Touch" button
   j. back-btn — UNCHANGED
3. Footer — UNCHANGED
```

**Visual rhythm: text+video → monument → CINEMATIC → video+text → FULL-BLEED → statement → CTA**

No two text sections appear without a visual between them.

## Files to Edit

1. **creative-building.html:**
   - Add `creative-page` class to `<main>`
   - Add section labels (01–04)
   - Merge two containers into one
   - Remove inline styles (margin-top, padding-bottom)
   - Replace standalone Application text-block with paired grid
   - Remove entire `creative-act3-tail`
   - Add full-bleed-break with Background video
   - Add service-outro with merged text
   - Add CTA button
   - Bump version params: `style.css?v=89`, `script.js?v=85`

2. **style.css:**
   - Add `.creative-page .section-title` override
   - Add `.creative-act-application` grid rules + mobile
   - Add `.creative-act1 .text-block + .text-block` spacing
   - Add `.creative-page .container` padding
   - Add `.creative-page .service-outro` border-top
   - Add `.creative-page::before` grain texture
   - **CLEANUP: Remove dead CSS** — delete `.creative-act3-tail`, `.tail-row`, `.tail-row .tail-text`, `.tail-row .tail-visual`, `.tail-row.reversed .tail-text`, `.tail-row.reversed .tail-visual`, `.tail-visual img, .tail-visual video`, and the mobile media query for `.tail-row` / `.tail-row.reversed`. These are approximately lines 1528–1580 in style.css. Search for `creative-act3-tail` and remove everything from that block through the related mobile media query.

3. **script.js:**
   - Update full-bleed parallax selector from `img` to `img, video`
   - Add cinematic-showcase parallax

## Post-Implementation Checklist

- [ ] Section labels 01–04 appear above each section title
- [ ] Section titles are visually larger than before (clamp 2–3rem)
- [ ] The cinematic showcase still bleeds off the right edge correctly
- [ ] The Application section now has a video on the left and text on the right
- [ ] The video in Application uses 4:3 aspect ratio (not 9:16)
- [ ] The full-bleed break video appears at full viewport width with grayscale filter
- [ ] Hovering the full-bleed break reveals color
- [ ] The full-bleed break video has parallax on scroll
- [ ] The cinematic showcase video has subtle parallax on scroll
- [ ] The closing statement reads as a proper conclusion with elevated typography
- [ ] The "Get in Touch" CTA button appears before the back-btn
- [ ] Film grain texture is subtly visible on the background
- [ ] Mobile: all grids stack to single column, cinematic showcase adjusts
- [ ] No horizontal overflow issues
- [ ] No inline styles remain (except the `<strong>` color in Application text — that's fine)
- [ ] Version parameters bumped in creative-building.html
