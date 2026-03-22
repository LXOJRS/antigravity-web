# Claude Code Prompt 7: Visual Building Page — Targeted Fixes

## Context

Four specific issues need fixing on `creative-building.html` after the Prompt 6 restructure. These are surgical fixes, not a restructure.

## Issue 1: Cinematic showcase lost its full-bleed and top-left rounded corner

### Root Cause

The original page had TWO separate `<div class="container">` elements. Container 1 ended after the monument. Container 2 started fresh and contained the cinematic showcase. Prompt 6 merged them into one container. This changed how `.cinematic-showcase`'s `width: calc(50vw + 50% - 64px)` resolves — the `50%` now references the single container's full content width differently.

Also, `.creative-act2-feature` has `margin-bottom: 128px` which creates dead space below the showcase.

### Fix

**Split the containers back.** The cinematic showcase was designed to live in its own container context. In creative-building.html, close the first container after the monument and open a new one for the showcase section:

Find:
```html
            <section class="typo-monument">
                <span class="monument-text">CREATE</span>
            </section>

            <div class="creative-act2-feature">
```

Replace with:
```html
            <section class="typo-monument">
                <span class="monument-text">CREATE</span>
            </section>
        </div>

        <div class="container">
            <div class="creative-act2-feature">
```

This restores the original container split at the exact same point. The first container now holds: H1 → intro → Act 1 → monument. The second container holds: cinematic showcase → application → full-bleed → outro → CTA → back.

**Also update the CSS:** Remove the `.creative-page .container` rule that was added in Prompt 6, since the padding-bottom is no longer needed site-wide for this page:

Find and remove:
```css
.creative-page .container {
    padding-bottom: 128px;
}
```

Instead, add bottom padding to the second container only via inline style on the second container opening tag:

```html
<div class="container" style="padding-bottom: 128px;">
```

**Verify after fix:** The cinematic showcase should bleed off the right edge of the viewport, have `border-radius: 24px 0 0 24px` (rounded top-left and bottom-left, hard edge right), and fill 100vh in height with no gap below.

---

## Issue 2: Full-bleed break video is too zoomed in, revealing compression artifacts

### Root Cause

`.full-bleed-break video` has `transform: scale(1.15)` — this is 15% zoom for parallax headroom. On photos this is fine. On video, the upscaling exposes compression artifacts because video is encoded at native resolution.

### Fix

Reduce the scale for video specifically on this page. Add a scoped override:

```css
.creative-page .full-bleed-break video {
    transform: scale(1.05); /* Reduced from 1.15 — video needs less zoom to avoid artifacts */
}
```

This still provides enough headroom for the `yPercent: 15` parallax without making the video noticeably soft. The parallax will have slightly less travel, which is fine — it's still perceptible.

**Also reduce the parallax travel in script.js** to match the reduced scale. Find the full-bleed parallax block:

```javascript
const fullBleedMedia = document.querySelectorAll('.full-bleed-break img, .full-bleed-break video');
fullBleedMedia.forEach(media => {
    gsap.to(media, {
        yPercent: 15,
```

Change to differentiate between img and video:

```javascript
const fullBleedMedia = document.querySelectorAll('.full-bleed-break img, .full-bleed-break video');
fullBleedMedia.forEach(media => {
    const isVideo = media.tagName === 'VIDEO';
    gsap.to(media, {
        yPercent: isVideo ? 5 : 15, // Reduced travel for video to avoid showing edges
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

---

## Issue 3: Act 1 portrait video feels like a sticker

### Root Cause

The `.portrait-video` in Act 1 is a plain `<video>` element with `border-radius: 24px` and `filter: brightness(0.9)`. No depth, no shadow, no visual connection to the surrounding content. It sits in `grid-column: 8 / span 5` as a flat rectangle.

### Fix

Add depth and atmosphere to the portrait video:

```css
.creative-act1 .portrait-video {
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.06);
}
```

The `box-shadow` creates depth — the video appears to lift off the page instead of lying flat. The subtle `border` adds a barely-perceptible edge that separates it from the dark background. This is the same technique MetaLab uses on media elements to create "floating" cards.

**Also consider: make the portrait video slightly sticky on scroll** so it stays visible as the user reads the long Perspective text beside it. This is a premium touch:

```css
.creative-act1 .creative-visual-col {
    grid-column: 8 / span 5;
    position: sticky;
    top: 120px; /* Below the nav */
    align-self: start;
}
```

This makes the video "pin" in place as you scroll through Medium → Perspective, then release when you scroll past. It transforms the video from a static companion into an anchored focal point.

**IMPORTANT:** `position: sticky` requires the parent `.creative-act1` to NOT have `overflow: hidden`. Verify this — the current `.creative-act1` doesn't set overflow, so this should work. If the video flickers or behaves strangely, remove the sticky behavior.

---

## Issue 4: Closing quote is too long

### Root Cause

The `outro-statement` merged two separate section texts (Background + Conclusion) into one sentence. The result is 160+ characters — too long for a mic-drop closing. Compare to the about page's outro: "I'm interested in the practical, often messy work of figuring out what's next, without pretending it's simple." — that's ~100 characters and hits harder.

### Fix

Shorten the `outro-statement` and move the detail to `outro-aside`. In creative-building.html, find:

```html
<p class="outro-statement">My background in film shapes how I approach this — I think in terms of visual storytelling. Even when the visuals feel abstract, they're designed to communicate intent, tone, and meaning.</p>
<p class="outro-aside">AI visuals are becoming part of everyday visual culture. This work explores how to use the medium with precision, and discipline, before it settles into habit.</p>
```

Replace with:

```html
<p class="outro-statement">Visual storytelling, shaped by film — designed to communicate intent, even when abstract.</p>
<p class="outro-aside">AI visuals are becoming part of everyday culture. This work explores how to use the medium with precision before it settles into habit.</p>
```

The statement is now ~85 characters — punchy, confident, and it works at the large `clamp(2.5rem–4rem)` scale. The background-in-film detail is preserved but condensed. The aside carries the reflective, softer conclusion.

---

## Summary of Changes

### creative-building.html:
1. Split the container back into two at the monument/showcase boundary (Issue 1)
2. Add `style="padding-bottom: 128px;"` to the second container (Issue 1)
3. Shorten the outro-statement text (Issue 4)
4. Bump version params: `style.css?v=90`, `script.js?v=86`

### style.css:
1. Remove `.creative-page .container { padding-bottom: 128px; }` (Issue 1)
2. Add `.creative-page .full-bleed-break video { transform: scale(1.05); }` (Issue 2)
3. Add `.creative-act1 .portrait-video { box-shadow + border }` (Issue 3)
4. Add `.creative-act1 .creative-visual-col { position: sticky }` (Issue 3)

### script.js:
1. Update full-bleed parallax to use `yPercent: 5` for video elements (Issue 2)

## Post-Fix Checklist

- [ ] Cinematic showcase bleeds off right edge of viewport — no gap on right
- [ ] Cinematic showcase has rounded top-left and bottom-left corners (`24px 0 0 24px`)
- [ ] No dead space / gap below the cinematic showcase
- [ ] Full-bleed break video looks sharp — no visible compression artifacts at the edges
- [ ] Full-bleed break video still has subtle parallax on scroll
- [ ] Act 1 portrait video has depth/shadow — doesn't feel flat
- [ ] Act 1 portrait video sticks in place while scrolling through the text (sticky)
- [ ] Closing statement is short and punchy (~85 chars)
- [ ] The aside text carries the longer reflection
- [ ] Mobile: sticky behavior disabled or graceful (verify on small screens)
