# About Page Elevation Plan

## Current State Summary

The about page follows a clean structure: hero (title + portrait) → "MANIFESTO" monument → 4 alternating rd-rows (Reality, Scope, Origin, Method) → closing quote → back button. The asymmetric grid placement is sophisticated on paper, but the page feels flat because:

- Four identical text blocks with no visual interruption
- Zero imagery after the header portrait (the R&D page has the same layout but uses large watermark numbers for visual texture — the about page omits them)
- The closing quote section feels like the page ran out of energy
- One portrait image for the entire "about" page is insufficient — the person IS the content

## Design Principles

Same system: `#050505` bg, white/rgba text, `#0000C5` accent, Inter, 12-col grid, GSAP + Lenis. Inspiration drawn from Monks' section-breaking techniques, the site's own creative-building page patterns, and the existing rd-row asymmetric grid that already works well on R&D.

---

## Move 1: Add Large Background Numbers to the Manifesto Rows

### Problem
The R&D page (service-rd.html) uses `<span class="rd-number">01</span>` through `05` — massive watermark numbers (`14rem`, `rgba(255,255,255,0.12)`) that create visual texture behind each section. The about page uses the exact same `.rd-row` layout but omits the numbers. This makes the about page feel like a stripped version of R&D.

### Fix
Add `<span class="rd-number">01</span>` through `<span class="rd-number">04</span>` to each `.rd-row` in about.html. The CSS already exists — `.rd-number` is fully styled. This is pure HTML, zero CSS work.

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

<!-- Same for 03 Origin and 04 Method -->
```

**Impact:** High. **Effort:** 2 minutes.

---

## Move 2: Add a Visual Break Between Row 2 and Row 3

### Problem
Four text rows in sequence without any visual interruption is monotonous. Every other page on the site has visual anchors: the podcast has the full-bleed break image, creative-building has the cinematic showcase, the homepage has the visual-hook video. The about page has nothing between the monument and the closing quote.

### Fix
Insert a `.full-bleed-break` image or video between the 2nd and 3rd rd-row. This creates a natural "act break" — rows 1–2 introduce who you are, the visual break creates a pause, rows 3–4 go deeper into background and method.

**Option A — Full-bleed image:**
Use an existing visual asset. A workspace photo, a speaking engagement, or even an AI-generated visual from the creative-building work (cross-referencing your services). Place it as:

```html
<!-- After row 2 (Scope), before row 3 (Origin) -->
</div> <!-- close rd-row reversed (Scope) -->

<div class="full-bleed-break about-visual-break">
    <img src="[IMAGE_URL]" alt="Alex in conversation" loading="lazy">
</div>

<div class="rd-row"> <!-- Origin -->
```

Wait — the `.full-bleed-break` uses `width: 100vw; left: 50%; margin-left: -50vw` to break out of the container. But the rd-rows are inside `.rd-grid` which is a flex column inside `.container`. The full-bleed break needs to sit OUTSIDE the `.rd-grid` to work properly.

**Restructured HTML approach:**
Split the `.rd-grid` into two separate grids:

```html
<div class="rd-grid">
    <div class="rd-row">01 Reality...</div>
    <div class="rd-row reversed">02 Scope...</div>
</div>

<div class="full-bleed-break">
    <img src="[IMAGE_URL]" alt="..." loading="lazy">
</div>

<div class="rd-grid">
    <div class="rd-row">03 Origin...</div>
    <div class="rd-row reversed">04 Method...</div>
</div>
```

This ensures the full-bleed break is a direct child of `.container` (not nested inside `.rd-grid`), and the two rd-grids function identically. The only CSS consideration: make sure the second `.rd-grid` doesn't get double counter-reset for the rd-numbers (but since we're using explicit `<span class="rd-number">03</span>`, the CSS counter isn't relied upon for numbering).

**Image choice:** You will need to provide a suitable image URL. Ideal: a candid workspace/speaking photo, or an atmospheric AI-generated visual that bridges the "scope" and "origin" themes. The `.full-bleed-break` filter (grayscale + brightness + color-on-hover) will handle the visual treatment.

**Impact:** Very high — breaks the monotony and creates a pacing rhythm. **Effort:** Medium (needs HTML restructure + image selection).

---

## Move 3: Add Horizontal Rule Separators Between Rd-Rows

### Problem
Even with numbers, the rd-rows float without clear boundaries. The manifesto sections blend together, especially where Scope's text sits close to Origin's title due to the alternating layout.

### Fix
This was already recommended in DESIGN-RECOMMENDATIONS.md (item #1). Add a subtle border:

```css
.rd-row + .rd-row {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}
```

This gives each section a quiet visual anchor — editorial, not heavy. It works on both the about page and the R&D page.

**Impact:** Medium. **Effort:** One CSS rule.

---

## Move 4: Fix the Closing Quote Hierarchy

### Problem
The `.service-outro` contains two paragraphs:
1. Main quote: `clamp(2rem, 4vw, 3rem)`, `font-weight: 500`, white — reads like a statement
2. Follow-up: inline-styled `font-size: 1.25rem; margin-top: 32px; opacity: 0.7` — reads like a whisper

The main quote is smaller than the section titles above it (3–4.5rem), which breaks hierarchy. It should feel like a CULMINATION, not a demotion. And the follow-up paragraph, with its inline styles, feels like an afterthought.

### Fix

**A) Elevate the main quote to monument-scale:**
Replace the `.service-outro` with a structure that carries more visual weight. The closing statement should feel like a mic-drop, not a footnote.

```html
<div class="service-outro">
    <p class="outro-statement">I'm interested in the practical, often messy work of figuring out what's next — without pretending it's simple.</p>
    <p class="outro-aside">If that sounds familiar, we'll probably have a good conversation.</p>
</div>
```

**CSS updates:**

```css
.about-page .service-outro {
    margin-bottom: 64px;
    padding: 96px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.outro-statement {
    font-size: clamp(2.5rem, 4.5vw, 4rem);
    line-height: 1.15;
    font-weight: 600;
    color: var(--text-color);
    max-width: 900px;
    margin: 0 auto 40px;
    text-align: center;
}

.outro-aside {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.5);
    text-align: center;
    font-weight: 400;
    max-width: 600px;
    margin: 0 auto;
}
```

The main statement now matches or exceeds the section titles in scale (clamp to 4rem vs. 4.5rem) — it feels like a conclusion rather than a comedown. The aside is deliberately smaller and muted, creating a clear separation: statement → invitation.

The `border-top` creates a visual boundary between the manifesto grid and the outro, signaling "this is a separate thought."

**B) Remove inline styles from the second paragraph in about.html** — replace `<p style="font-size: 1.25rem; margin-top: 32px; opacity: 0.7;">` with `<p class="outro-aside">`.

**Impact:** High — this is the lasting impression of the page. **Effort:** Low-medium (CSS + minor HTML).

---

## Move 5: Add a Subtle Background Visual Element

### Problem
You noted: "achtergrond visueel aantrekkelijkere elementen toevoegen." The page is pure `#050505` everywhere — no texture, no gradient, no atmospheric depth. Monks uses color zone shifts to create section boundaries. Your own homepage has the visual-hook video and typography portal with background pulses.

### Fix
Add a subtle radial gradient glow behind the manifesto section. This creates atmospheric depth without adding imagery:

```css
.about-page .rd-grid {
    position: relative;
}

.about-page .rd-grid::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
    height: 60%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 197, 0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}
```

This adds a very faint blue glow (4% opacity — almost subliminal) centered behind the manifesto rows. It creates atmospheric depth and subtly reinforces the brand color without being overt. On the dark background, even this small amount of color creates a sense of space.

**Alternative or addition: Add a noise/grain texture overlay** on the page for subtle visual richness:

```css
.about-page::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
}
```

This creates a very subtle film grain effect that makes the flat black background feel more tactile and alive. At 0.03 opacity on the SVG × 0.4 CSS opacity, it's nearly invisible but adds an analog quality.

**Recommendation:** Start with the radial gradient glow only. The grain texture is a nice addition but should be tested carefully — it affects the entire page and could conflict with the mix-blend-mode cursor.

**Impact:** Medium — atmospheric, not structural. **Effort:** Low (CSS only).

---

## Move 6: Portrait Border-Radius Consistency

### Problem
The about portrait uses `border-radius: 0 0 100px 100px` (capsule bottom shape). Every other visual element on the site uses `border-radius: 24px`. This was noted in DESIGN-RECOMMENDATIONS.md (item #13).

### Fix

```css
.about-portrait img {
    border-radius: 24px;
}
```

Simple but important for system consistency. The capsule shape is interesting but it's a one-off that weakens the design language.

**Impact:** Low-medium. **Effort:** One CSS override.

---

## Move 7: Section Labels for the Manifesto Rows

### Problem
The podcast page now uses `01 / ABOUT`, `02 / EPISODES` section labels. The R&D page uses number watermarks. The about page has neither labeling system on its manifesto rows.

### Fix
Since the about page already has the large `.rd-number` watermarks (after Move 1), adding `.section-label` as well would be redundant. However, the `.rd-grid` section itself has no label. Consider adding a single label above the entire manifesto grid:

```html
<section class="typo-monument">
    <span class="monument-text">MANIFESTO</span>
</section>

<span class="section-label" style="margin-bottom: 32px;">01 / WHO I AM</span>

<div class="rd-grid">
    ...
</div>
```

Actually — the monument "MANIFESTO" already serves as the section label. Adding another label would be redundant. **Skip this move.** The numbers (Move 1) are sufficient additional editorial structure.

---

## Move 8: Stagger-Reveal Animation for Rd-Rows (Already Exists, Verify)

The script.js already has GSAP animations for `.rd-row` elements (lines ~373–392: `gsap.fromTo(row, { opacity: 0, y: 60 }, ...)`). Verify this is working on the about page. If so, no changes needed.

The `.service-outro` also has a scale-in animation (lines ~394–416) — confirm this applies to the about page's outro as well.

---

## Summary: Prioritized Move List

| # | Move | Impact | Effort | Notes |
|---|------|--------|--------|-------|
| 1 | Add rd-numbers to manifesto rows | High | Very low | HTML only, CSS exists |
| 4 | Fix closing quote hierarchy | High | Low-med | CSS + minor HTML |
| 2 | Visual break between rows 2/3 | Very high | Medium | Needs image + HTML restructure |
| 3 | Horizontal rule separators | Medium | Very low | 1 CSS rule |
| 5 | Subtle background glow | Medium | Low | CSS only |
| 6 | Portrait border-radius fix | Low-med | Very low | 1 CSS override |

**Recommended execution order:** 1 → 4 → 3 → 5 → 6 → 2 (save the visual break for last since it needs an image asset).

## Open Questions

1. **Visual break image (Move 2):** What image do you want to use? Options: a workspace/speaking photo, an AI-generated visual from your creative work, or a different portrait photo. I need a Cloudinary URL.
2. **Grain texture (Move 5 alternative):** Want to test the film grain effect, or keep it to just the radial glow?
3. **Are there any other visual assets** (videos, secondary photos) you'd like to incorporate? The about page could support 1–2 more visual moments.
