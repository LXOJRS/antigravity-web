# Claude Code Prompt 8: Visual Building Page — Corrected Fixes

## Context

Prompt 7 attempted fixes but they didn't land properly. This prompt provides precise, tested solutions for each issue. Read each fix carefully — they replace the previous approach entirely.

## Design System

- `#050505` bg | `#ffffff` text | `#0000C5` accent | Inter font
- `--easing: cubic-bezier(0.19, 1, 0.22, 1)`
- 12-col grid | `border-radius: 24px` on media

---

## Fix 1: Cinematic Showcase — Restore Full Right-Bleed, Rounded Left Corners, No Gap Below

### Diagnosis

The cinematic showcase CSS is correct in isolation: `width: calc(50vw + 50% - 64px)` + `border-radius: 24px 0 0 24px` + `height: 100vh`. The issues are:

1. **Gap below:** `.creative-act2-feature` has `margin-bottom: 128px`. This creates dead space between the showcase and the next section.
2. **Clipping:** The container may clip the showcase if `overflow` is set anywhere.
3. **Right bleed not reaching edge:** The container's `padding` reduces the available `50%` base for the width calc.

### Fix (CSS)

Add these targeted overrides — do NOT modify the existing `.cinematic-showcase` base rules. Add new scoped rules:

```css
/* Fix cinematic showcase — eliminate gap and ensure full bleed */
.creative-page .creative-act2-feature {
    margin-bottom: 64px; /* Reduced from 128px — the showcase IS the visual, not a container with a gap */
    overflow: visible; /* Ensure nothing clips the right-bleed */
}

/* Ensure the showcase container doesn't get clipped by parent */
.creative-page .container {
    overflow: visible;
}
```

**IMPORTANT:** Check if there is an existing `.creative-page .container` rule. If so, add `overflow: visible` to it rather than creating a duplicate. There was a `padding-bottom: 128px` rule from a previous prompt — that may have been removed. If `.creative-page .container` exists, merge into it. If not, create it.

Also check: Is there an `overflow: hidden` on `.service-page .container` or `.container` globally? Search style.css for `overflow.*hidden` on container-related selectors. If found, override it for `.creative-page .container` with `overflow: visible`.

### Fix (HTML) — Ensure second container has no clipping

The second container (line 108) currently has `style="padding-bottom: 128px;"`. Keep this. But verify it does NOT have any `overflow` inline style.

---

## Fix 2: Full-Bleed Banner Video — Stop the Aggressive Crop

### Diagnosis

The video source is 4:3 aspect ratio. The `.full-bleed-break` container is `width: 100vw; height: 75vh`. On a widescreen monitor (16:9 or wider), this container's aspect ratio is roughly 16:5 — FAR wider than 4:3. With `object-fit: cover`, the video is cropped dramatically top and bottom, zooming into the center and revealing compression artifacts.

`transform: scale(1.05)` makes this worse. But even at `scale(1.0)`, the fundamental mismatch between a 4:3 video and a super-wide container causes heavy cropping.

### Fix (CSS)

Reduce the container height so it more closely matches the video's natural aspect ratio. A 4:3 video at 100vw wide would ideally be 75vw tall — but that's too tall. Instead, use a moderate height that reduces the crop:

```css
/* Reduce full-bleed height for creative page — video is 4:3, container is too wide/short at 75vh */
.creative-page .full-bleed-break {
    height: 56vh; /* Down from 75vh — closer to the video's natural proportions */
}

.creative-page .full-bleed-break video {
    transform: scale(1.0); /* No zoom at all — let object-fit: cover handle alignment naturally */
}
```

56vh on a 1440×900 viewport = ~504px. At 1440px wide, that's roughly a 2.85:1 ratio. Still wider than 4:3, but the crop is much more moderate. The video's center content will be visible without exposing edge compression.

**Also remove the parallax yPercent for video** since there's no scale headroom. In script.js, the full-bleed parallax already differentiates between img and video (`yPercent: isVideo ? 5 : 15`). Change the video value to 0:

Find in script.js:
```javascript
yPercent: isVideo ? 5 : 15,
```

Replace with:
```javascript
yPercent: isVideo ? 0 : 15,
```

This means the full-bleed video won't parallax-scroll (it's already a looping video — motion comes from the content itself, not the scroll). Images still get full parallax.

---

## Fix 3: Portrait Video — Make It Feel Integrated, Not Stuck On

### Diagnosis

The CSS for `box-shadow` and `border` was added (lines 2296–2298). The sticky behavior was added (lines 2302–2306). Two possible reasons you see no change:

1. `box-shadow` on a video element with `border-radius` can be invisible in some browsers if the video element's compositing layer overrides it.
2. The sticky behavior may not produce a visible effect if the text column beside it isn't tall enough (the video needs to be shorter than the text for sticky to kick in).

### Fix (CSS)

Replace the previous approach with a wrapper-based solution. The shadow goes on a wrapper div, not the video element directly. This is more reliable cross-browser.

**First, remove the previous rules.** Find and delete:
```css
.creative-act1 .portrait-video {
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.06);
}

.creative-act1 .creative-visual-col {
    position: sticky;
    top: 120px;
    align-self: start;
}
```

**Then add this new approach:**

```css
/* Portrait video wrapper — depth via the column, not the video element */
.creative-act1 .creative-visual-col {
    position: sticky;
    top: 100px;
    align-self: start;
    /* Wrapper provides shadow — more reliable than shadow on <video> */
    border-radius: 24px;
    box-shadow:
        0 32px 80px rgba(0, 0, 0, 0.5),
        0 12px 32px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.06);
    overflow: hidden; /* Clips the video to the wrapper's border-radius */
}

/* Remove border-radius from the video itself — the wrapper handles it */
.creative-act1 .portrait-video {
    border-radius: 0;
}
```

This approach puts the shadow and rounding on the COLUMN div (which is a regular `<div>`, not a `<video>`) — far more reliable. The `overflow: hidden` on the wrapper clips the video to the rounded corners. The multi-layer `box-shadow` creates real depth: a distant soft shadow (ambient occlusion), a mid-range shadow, and a hairline border.

**Note:** The `position: sticky; top: 100px` on `.creative-visual-col` makes the video pin while scrolling through the text. This only works if `.creative-act1` does NOT have `overflow: hidden`. Since `.creative-act1` is a grid with no overflow set, this should work. The `align-self: start` prevents the sticky element from stretching to the grid height.

**HTML change:** NONE needed. The existing `.creative-visual-col` div is the wrapper.

---

## Fix 4: Closing Quote — Clear Size Hierarchy Between Statement and Aside

### Diagnosis

`.outro-statement` is `clamp(2.5rem–4rem)` and `.outro-aside` is `1.25rem` — the sizes ARE different. But visually, the statement is now a single short line ("Visual storytelling, shaped by film — designed to communicate intent, even when abstract.") at 4rem, which has similar visual weight to the two-line aside at 1.25rem. One big line ≈ two small lines in perceived weight.

### Fix (CSS)

Make the hierarchy unmistakable through multiple visual cues, not just size:

```css
/* Stronger outro hierarchy — creative page */
.creative-page .outro-statement {
    font-size: clamp(2.5rem, 5vw, 4.5rem) !important; /* Slightly larger than before */
    letter-spacing: -0.03em;
    font-weight: 700 !important; /* Up from 600 */
    margin: 0 auto 48px !important; /* More gap between statement and aside */
}

.creative-page .outro-aside {
    font-size: 1rem; /* Down from 1.25rem — increase the contrast */
    color: rgba(255, 255, 255, 0.35); /* More muted — down from 0.45 */
    font-weight: 300;
    letter-spacing: 0.01em;
    max-width: 500px; /* Narrower than statement to visually subordinate */
}
```

Now the distinction is driven by FOUR differences:
- Size: 4.5rem vs 1rem (4.5x ratio)
- Weight: 700 vs 300
- Color: white vs rgba 0.35
- Width: 900px vs 500px

This makes it impossible to confuse the two.

---

## Summary of Changes

### style.css:
1. Add `.creative-page .creative-act2-feature { margin-bottom: 64px; overflow: visible; }` (Fix 1)
2. Add `.creative-page .container { overflow: visible; }` — merge with existing rule if present (Fix 1)
3. Add `.creative-page .full-bleed-break { height: 56vh; }` (Fix 2)
4. Change `.creative-page .full-bleed-break video { transform: scale(1.0); }` (Fix 2)
5. REMOVE old `.creative-act1 .portrait-video` shadow/border rule (Fix 3)
6. REMOVE old `.creative-act1 .creative-visual-col` sticky rule (Fix 3)
7. ADD new `.creative-act1 .creative-visual-col` with sticky + shadow + overflow hidden (Fix 3)
8. ADD new `.creative-act1 .portrait-video { border-radius: 0; }` (Fix 3)
9. ADD `.creative-page .outro-statement` and `.creative-page .outro-aside` overrides (Fix 4)

### script.js:
1. Change `yPercent: isVideo ? 5 : 15` to `yPercent: isVideo ? 0 : 15` (Fix 2)

### creative-building.html:
1. Bump version params: `style.css?v=91`, `script.js?v=87`

## Post-Fix Checklist

- [ ] Cinematic showcase bleeds off right edge — no visible right margin
- [ ] Cinematic showcase top-left corner is rounded (24px)
- [ ] No large gap below cinematic showcase (reduced to 64px spacing)
- [ ] Full-bleed video is NOT zoomed — video content is clearly visible without artifacts
- [ ] Full-bleed video has NO parallax scroll (it's a video, not a photo)
- [ ] Portrait video has visible shadow/depth — appears to float above the page
- [ ] Portrait video corner rounding comes from the wrapper, not the video element
- [ ] Portrait video sticks in place while scrolling through Medium + Perspective text
- [ ] Closing statement text is dramatically larger than the aside text
- [ ] Aside text is visually subordinate (smaller, lighter, narrower)
- [ ] Mobile: sticky behavior doesn't cause issues (video just scrolls normally on narrow screens)
