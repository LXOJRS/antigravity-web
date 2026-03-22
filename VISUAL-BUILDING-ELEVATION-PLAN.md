# AI-Generated Visuals Page — Elevation Plan

## The Core Problem

This is a page about **visual work** that is structured like a **text page**. It has four written sections (Medium, Perspective, Application, Background/Conclusion) with videos slotted in as accompaniments. The writing is strong, but the page's job is to make someone think "I need this person's visual eye" — and right now it reads more like a case study essay than a portfolio showcase.

The cinematic right-bleed showcase (100vh, asymmetric) is genuinely impressive and unique. But it's sandwiched between text blocks and feels like a single moment rather than the defining experience of the page. The tail rows (Background + Conclusion with alternating videos) are structurally fine but visually repetitive — both 4:3 videos in identical grids with identical spacing.

**The page has 4 videos across its entire length.** For a visual portfolio, that's not enough, and they're not given enough room to breathe. The current structure is: text → text → monument → cinematic video → text → text+video → text+video → back button. The ratio of reading to seeing is inverted from what it should be.

## Current Page Structure

```
1. article-banner (shoe image, 60vh, grayscale, lighter-filter)
2. Container 1:
   a. H1 "AI-Generated Visuals"
   b. service-intro
   c. creative-act1 grid: text-col (Medium + Perspective) | visual-col (portrait video 9:16)
   d. monument "CREATE"
3. Container 2:
   e. cinematic-showcase (right-bleed, 100vh video)
   f. text-block (Application)
   g. creative-act3-tail:
      - tail-row: Background text | video (4:3)
      - tail-row reversed: Conclusion text | video (4:3)
   h. back-btn
```

## What's Working

- **The cinematic showcase** is the strongest design element on any page of the site. The asymmetric right-bleed (rounded left corner, bleeds off right edge) at 100vh is bold, confident, and unique. Keep it.
- **The portrait video** (9:16, right column) in Act 1 creates a strong pairing with the text. The aspect ratio is unusual and editorial.
- **The writing** is genuinely compelling — "Good-looking images are one thing. Reproducible ones demand structure" is a great line.
- **The article-banner** with lighter-filter variant works well for the shoe image.

## What's Not Working

### 1. The page talks more than it shows
Four text sections. Four videos. On a page selling visual capability, the balance should flip — the visuals should lead, the text should support. Right now, every video is tucked inside or next to a text block. No video gets to stand alone as a statement.

### 2. The tail section is the weakest part
Two 4:3 videos in identical alternating grids. Same aspect ratio, same spacing, same treatment. After the cinematic showcase's boldness (100vh, asymmetric, right-bleed), the tail feels like the page deflated. Background and Conclusion are the least interesting sections content-wise, and they're given the same visual weight as Medium and Perspective.

### 3. No visual escalation
The page peaks at the cinematic showcase (midway) and then descends into smaller, contained visuals. Agency-level sites build toward a climax or maintain intensity. This page has a mountain in the middle with foothills on either side.

### 4. The "Application" text block is an orphan
After the cinematic showcase, there's a standalone `.text-block` with no visual pairing. On a 12-column grid at full container width, this paragraph sits wide and alone — visually different from every other text section on the page (which are all paired with visuals). It breaks the rhythm.

### 5. Section titles are too small (same issue as podcast page was)
`.section-title` at `1.5rem` against `1.25rem` body text = 1.2x ratio. Already fixed on the podcast page with scoped overrides. This page needs the same treatment.

### 6. No section labels
The podcast page has `01 / ABOUT`, `02 / EPISODES`. The about page has `01`–`04` watermark numbers. This page has neither. The sections (Medium, Perspective, Application, Background, Conclusion) have no editorial framing.

---

## The Elevation Moves

### Move 1: Restructure the Tail Section — Make the Visuals the Heroes

**Current:** Two identical tail-rows (text + 4:3 video), alternating sides.

**Proposed:** Replace the two repetitive tail-rows with a single, stronger visual moment followed by a brief closing statement.

**Option A — Gallery strip:**
Replace the two tail-rows with a horizontal-scrolling or stacked gallery of 3–4 visuals. No text overlay — just the work, filling the screen. Then a brief closing statement below.

```
[current: tail-row Background + video]    → REMOVE
[current: tail-row Conclusion + video]    → REMOVE

[new: full-bleed-break with Background video — 75vh, parallax]
[new: condensed closing section with merged Background + Conclusion text]
```

**Option B (recommended) — One statement visual + condensed outro:**
- Promote one of the tail videos to a `.full-bleed-break` (full viewport width, 75vh, parallax, grayscale → color on hover) — this creates a second cinematic moment after the showcase
- Merge Background and Conclusion into a single `.service-outro` statement (same pattern as the about page's elevated outro)
- The page then has TWO big visual moments (cinematic showcase + full-bleed break) instead of one big + two small

**New structure for the tail:**

```html
<!-- Replace the entire creative-act3-tail with: -->

<div class="full-bleed-break">
    <video autoplay loop muted playsinline>
        <source src="[BACKGROUND_VIDEO_URL]" type="video/mp4">
    </video>
</div>

<div class="service-outro">
    <p class="outro-statement">My background in film shapes how I approach this. I think in terms of visual storytelling — even when the visuals feel abstract, they're designed to communicate intent, tone, and meaning.</p>
    <p class="outro-aside">AI visuals are becoming part of everyday visual culture. This work explores how to use the medium with precision, and discipline, before it settles into habit.</p>
</div>
```

This condenses two weak sections into one strong visual + one strong statement. The second tail video can be saved for a future gallery page or used as the full-bleed source.

### Move 2: Fix the Orphaned "Application" Text Block

**Current:** After the cinematic showcase, the Application section sits as a standalone text-block with `margin-bottom: 128px`. It has no visual pairing and spans the full container width.

**Proposed:** Give it an asymmetric layout that mirrors the Act 1 grid but inverted. Pair it with the second tail video (the one freed up from the tail restructure in Move 1):

```html
<div class="creative-act-application">
    <div class="application-visual-col">
        <video autoplay loop muted playsinline class="portrait-video">
            <source src="[SECOND_TAIL_VIDEO_URL]" type="video/mp4">
        </video>
    </div>
    <div class="application-text-col">
        <span class="section-label">03 / APPLICATION</span>
        <h2 class="section-title">Application</h2>
        <div class="text-content">
            <p>The work often begins exploratively... [existing text]</p>
            <p>Because once visuals move beyond a single frame... [existing text]</p>
        </div>
    </div>
</div>
```

CSS: Mirror the Act 1 grid but flip the columns — visual on the left (cols 1–5), text on the right (cols 8–12). This creates visual/text/visual/text rhythm instead of the current visual/text/text/visual pattern.

```css
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

@media (max-width: 768px) {
    .creative-act-application {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
}
```

### Move 3: Add Section Labels

Add `.section-label` to each text section, matching the editorial system from the podcast page:

- `01 / MEDIUM` (Act 1, first text block)
- `02 / PERSPECTIVE` (Act 1, second text block)
- `03 / APPLICATION` (after cinematic showcase)
- `04 / CONCLUSION` (the outro statement)

The `.section-label` class already exists. Just add the HTML spans.

### Move 4: Increase Section Title Size (Scoped Override)

Same fix as the podcast page. Add a scoped class to `<main>`:

```html
<main class="service-page creative-page">
```

```css
.creative-page .section-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 0 0 30px rgba(0, 0, 197, 0.25);
}
```

### Move 5: Add Scroll Animations

The page currently has no GSAP scroll-triggered animations (the homepage and podcast page both have them). Add:

1. **Text block stagger reveal** — each `.text-block` fades in with `y: 40 → 0` (pattern already exists in script.js from the podcast prompt: `const textBlocks = document.querySelectorAll('.text-block')`)

2. **Cinematic showcase parallax** — the video inside `.cinematic-showcase` should have a subtle `yPercent: 10` scrub parallax:

```javascript
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

3. **Outro scale-in** — the closing statement uses the same scale-in animation as the about page outro (already in script.js for `.service-outro`).

4. **Full-bleed break parallax** — already handled by the `querySelectorAll('.full-bleed-break img')` loop in script.js. Make sure it also handles `video` elements:

Check if the existing JS loop selects `.full-bleed-break img` or `.full-bleed-break img, .full-bleed-break video`. If it only handles `img`, extend it to include `video`.

### Move 6: Film Grain Texture (Consistency with About Page)

The about page now has a film grain `::before` overlay. Consider extending it to this page for consistency — it would give the visual work page the same tactile quality. Scope it:

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

Or, better yet, make the grain texture site-wide by applying it to `body::before` instead of page-specific selectors. This is a design decision — if you like it on the about page, it likely works everywhere.

### Move 7: Remove the Inline `style="margin-top: 64px;"` on the Second Text Block

The Perspective text-block in Act 1 has `style="margin-top: 64px;"`. This should be a CSS rule, not an inline style:

```css
.creative-act1 .text-block + .text-block {
    margin-top: 64px;
}
```

Then remove the inline style from the HTML.

### Move 8: Add a Closing CTA

Same observation as the about page — after the outro statement, the only action is "Back to Services." For a visual portfolio page, a CTA to get in touch would convert interest into action:

```html
<div class="service-outro">
    <p class="outro-statement">...</p>
    <p class="outro-aside">...</p>
</div>

<div class="platform-links-centered" style="margin-bottom: 96px;">
    <a href="index.html#contact" class="contact-btn" data-magnetic>
        Get in Touch
    </a>
</div>
```

---

## Proposed New Page Structure

```
1. article-banner (shoe image — KEEP)
2. H1 + service-intro — KEEP
3. Act 1: creative-act1 grid
   - text-col: 01/MEDIUM + 02/PERSPECTIVE (with section labels)
   - visual-col: portrait video (9:16) — KEEP
4. Monument "CREATE" — KEEP
5. Cinematic showcase (right-bleed, 100vh) — KEEP, add parallax
6. NEW: Act 2 — Application section with visual pairing
   - visual-col (left, cols 1–5): relocated tail video
   - text-col (right, cols 7–12): 03/APPLICATION text
7. NEW: Full-bleed break (second cinematic moment)
   - Full-viewport-width video, 75vh, parallax, grayscale → color on hover
8. NEW: Closing outro (replaces tail section)
   - 04/CONCLUSION label
   - outro-statement (merged Background + Conclusion — elevated typography)
   - outro-aside
9. CTA button → "Get in Touch"
10. back-btn → footer
```

**Visual rhythm comparison:**

| Current | Proposed |
|---------|----------|
| banner | banner |
| text + video (Act 1) | text + video (Act 1) |
| monument | monument |
| CINEMATIC (100vh) | CINEMATIC (100vh) |
| text (orphaned) | video + text (paired) |
| text + small video | FULL-BLEED VIDEO (75vh) |
| text + small video | outro statement |
| back | CTA + back |

The proposed version alternates between visual moments and text moments consistently. No two text sections appear without a visual between them. The page peaks twice (cinematic showcase + full-bleed break) rather than once.

---

## Priority & Effort

| # | Move | Impact | Effort |
|---|------|--------|--------|
| 1 | Restructure tail → full-bleed + outro | Very high | Medium |
| 2 | Pair Application with visual | High | Medium |
| 4 | Section title size increase | High | Low |
| 5 | Scroll animations | Medium | Low |
| 3 | Section labels | Medium | Low |
| 6 | Film grain texture | Low-med | Low |
| 7 | Remove inline style | Low | Very low |
| 8 | Closing CTA | Medium | Low |

## Open Questions

1. **Which video for the full-bleed break?** You have two tail videos. One should pair with Application (Move 2), the other becomes the full-bleed. Which video is more cinematic/atmospheric? That one goes full-bleed. The more narrative/detailed one pairs with Application text.
2. **Film grain site-wide?** Should the grain texture be extended to all pages via `body::before`, or kept per-page?
3. **Do you have additional visual assets** (images or videos) beyond the four currently on the page? More material would make the page stronger.
