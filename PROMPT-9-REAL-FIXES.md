# Claude Code Prompt 9: Visual Building Page — Definitive Fixes

## Context

Multiple previous prompts attempted fixes that did not work. This prompt addresses the exact root causes found by reading the actual CSS. Each fix is specific to the actual problem. Do not add anything beyond what is described here.

---

## Fix 1: Cinematic Showcase — Remove Gap Below

### Root cause
`.creative-act2-feature` has `margin-bottom: 64px` (overridden from 128px in `.creative-page .creative-act2-feature`). This creates a gap between the bottom of the cinematic showcase and the next section.

### Exact fix
In style.css, find:
```css
.creative-page .creative-act2-feature {
    margin-bottom: 64px;
    overflow: visible;
}
```
Change to:
```css
.creative-page .creative-act2-feature {
    margin-bottom: 0;
    overflow: visible;
}
```

That's it. The Application section below has its own margin/padding. The gap was purely from this margin.

### About the border-radius
The `border-radius: 24px 0 0 24px` is already set on `.cinematic-showcase` (line 1845). If the top-left corner appears NOT rounded in the browser, the most likely cause is that the video element inside (which has `width: 100%; height: 100%; object-fit: cover`) is overflowing. The `.cinematic-showcase` already has `overflow: hidden` which should clip to the border-radius.

To be safe, explicitly round the video too:
```css
.cinematic-showcase video {
    border-radius: 24px 0 0 24px;
}
```
Add this as a NEW rule. Do not modify the existing `.cinematic-showcase video` rule — add a separate declaration block right after it. The browser will merge them.

---

## Fix 2: Full-Bleed Video — Stop Forcing 4:3 Into a Wide Banner

### Root cause
The video is 4:3 (portrait/square-ish). The `.full-bleed-break` is `width: 100vw; height: 56vh` (was 75vh, reduced previously). `object-fit: cover` stretches the video to fill this extremely wide container, cropping the top and bottom dramatically and magnifying compression artifacts.

### The real fix: Use the video's natural aspect ratio
Stop forcing a fixed height. Let the video determine its own height:

In style.css, find:
```css
.creative-page .full-bleed-break {
    height: 56vh;
}

.creative-page .full-bleed-break video {
    transform: scale(1.0);
}
```

Replace BOTH rules with:
```css
.creative-page .full-bleed-break {
    height: auto; /* Let the video determine height */
}

.creative-page .full-bleed-break video {
    transform: none;
    width: 100%;
    height: auto; /* Natural aspect ratio */
    object-fit: contain; /* Show full video, no cropping */
    filter: grayscale(80%) brightness(0.6) contrast(1.15); /* Keep the existing treatment */
}
```

Wait — `object-fit: contain` with `height: auto` on a full-bleed container will show the full video but leave black bars on the sides if the video is narrower than the viewport. That's also not great.

Better approach — **don't use `.full-bleed-break` at all for this video.** The `.full-bleed-break` class was designed for wide/cinematic images. A 4:3 video is not that. Instead, present it as a contained element within the grid, similar to how the Application video is displayed but larger.

### The actual fix (HTML + CSS):

**In creative-building.html**, find:
```html
<div class="full-bleed-break">
    <video autoplay loop muted playsinline poster="data:image/svg+xml,...">
        <source src="https://res.cloudinary.com/dnkcu6lne/video/upload/v1771769691/202602221448_ap8fa0.mp4" type="video/mp4">
    </video>
</div>
```

Replace with:
```html
<div class="creative-break-video">
    <video autoplay loop muted playsinline poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3Crect fill='%23050505' width='4' height='3'/%3E%3C/svg%3E">
        <source src="https://res.cloudinary.com/dnkcu6lne/video/upload/v1771769691/202602221448_ap8fa0.mp4" type="video/mp4">
    </video>
</div>
```

**In style.css**, add a new class (and remove the two `.creative-page .full-bleed-break` overrides since they're no longer needed):

```css
/* Creative page break video — respects natural 4:3 aspect ratio */
.creative-break-video {
    width: 100%;
    margin: 96px 0;
    border-radius: 24px;
    overflow: hidden;
}

.creative-break-video video {
    width: 100%;
    height: auto;
    display: block;
    filter: brightness(0.85);
    transition: filter 0.5s ease;
}

.creative-break-video:hover video {
    filter: brightness(1);
}
```

This shows the video at its natural 4:3 aspect ratio, contained within the grid, with rounded corners and a subtle brightness treatment. No cropping, no zooming, no quality loss. It's a large contained video, not a forced-wide banner.

**Delete** these rules from style.css (they're now unused):
```css
.creative-page .full-bleed-break {
    height: 56vh;
}

.creative-page .full-bleed-break video {
    transform: scale(1.0);
}
```

---

## Fix 3: Portrait Video — Visible Depth Against Dark Background

### Root cause
The shadow (`box-shadow: 0 32px 80px rgba(0,0,0,0.5)`) is black shadow on `#050505` background = invisible. A border of `rgba(255,255,255,0.06)` at 6% opacity is also invisible.

Black shadow on black background will never create depth. The only way to create lift on a dark background is with a **light glow** — the opposite of a shadow.

### Exact fix
In style.css, find:
```css
.creative-act1 .creative-visual-col {
    position: sticky;
    top: 100px;
    align-self: start;
    border-radius: 24px;
    box-shadow:
        0 32px 80px rgba(0, 0, 0, 0.5),
        0 12px 32px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(255, 255, 255, 0.06);
    overflow: hidden;
}
```

Replace with:
```css
.creative-act1 .creative-visual-col {
    position: sticky;
    top: 100px;
    align-self: start;
    border-radius: 24px;
    overflow: hidden;
    /* Light glow — creates depth on dark backgrounds (opposite of shadow) */
    box-shadow:
        0 0 60px rgba(255, 255, 255, 0.06),
        0 0 120px rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
```

This creates a subtle ambient glow around the video — a diffused white light that separates it from the background. The `border` at 10% opacity adds a faint visible edge. On a dark background, this reads as "this element exists in a slightly different plane."

---

## Fix 4: Outro Text — Aside Is Unreadable

### Root cause
`.creative-page .outro-aside` has `font-size: 1rem; color: rgba(255,255,255,0.35); font-weight: 300`. On a dark background, 0.35 opacity white at 1rem at weight 300 is extremely hard to read.

### Exact fix
In style.css, find:
```css
.creative-page .outro-aside {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.35);
    font-weight: 300;
    letter-spacing: 0.01em;
    max-width: 500px;
}
```

Replace with:
```css
.creative-page .outro-aside {
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 400;
    letter-spacing: 0;
    max-width: 600px;
}
```

This is still clearly subordinate to the statement (which is clamp 2.5–4.5rem at weight 700 in white), but now actually readable. The hierarchy is maintained through size (4.5rem vs 1.15rem = ~4x ratio), weight (700 vs 400), and color (1.0 vs 0.55).

---

## Summary — All changes

### style.css changes:
1. Change `.creative-page .creative-act2-feature` margin-bottom from `64px` to `0` (Fix 1)
2. Add `.cinematic-showcase video { border-radius: 24px 0 0 24px; }` as a new rule (Fix 1)
3. Replace `.creative-page .full-bleed-break` and `.creative-page .full-bleed-break video` with `.creative-break-video` rules (Fix 2) — delete the old overrides, add the new class
4. Replace `.creative-act1 .creative-visual-col` box-shadow with light glow version (Fix 3)
5. Replace `.creative-page .outro-aside` with readable values (Fix 4)

### creative-building.html changes:
1. Change `<div class="full-bleed-break">` to `<div class="creative-break-video">` on the 4:3 video (Fix 2)
2. Bump `style.css?v=92`

### script.js changes:
None. The parallax for `.full-bleed-break` will simply not match anything on this page anymore (the class was changed), which is correct — we don't want parallax on this video.

## Post-fix checklist
- [ ] Cinematic showcase has NO gap below it (0 margin)
- [ ] Cinematic showcase top-left corner is rounded (check by comparing with straight right edge)
- [ ] The 4:3 video below Application shows at its NATURAL proportions — no cropping, no zooming
- [ ] The 4:3 video has rounded corners (24px) and a brightness filter
- [ ] Portrait video in Act 1 has a visible soft glow separating it from the background
- [ ] Portrait video has a faint visible border edge
- [ ] Closing aside text is readable (not tiny/invisible)
- [ ] Closing statement is still clearly larger/bolder than the aside
