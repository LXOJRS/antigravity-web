# Claude Code Prompt 10: Creative Building Page — Final Touches

Three targeted fixes. Each one is a specific CSS change. No guessing, no restructuring.

---

## Fix 1: Application section overlaps with cinematic showcase

### Cause
`.creative-page .creative-act2-feature` has `margin-bottom: 0`. The Application section (`.creative-act-application`) directly follows with no margin-top. Result: no gap between the bottom of the cinematic showcase and the Application grid.

### Fix
In style.css, find:
```css
.creative-act-application {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 48px;
    margin-bottom: 128px;
    align-items: center;
}
```

Add `margin-top: 96px;` to it:
```css
.creative-act-application {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 48px;
    margin-top: 96px;
    margin-bottom: 128px;
    align-items: center;
}
```

---

## Fix 2: Text next to portrait video needs on-brand adjustment

The portrait video's glow treatment is subtle. Leave it as-is — adjusting further risks making it worse. Instead, improve the text column next to it so the section feels more intentional as a whole.

The text column (`.creative-text-col`, grid-column 1–6) has two text blocks stacked. They use the base `.section-title` and `.text-content p` styles. The issue: on this visual-first page, the text blocks look like generic content rather than editorial captions paired with the video.

### Fix
Add section-specific text styling scoped to creative-act1:

```css
/* Act 1 text — editorial treatment next to portrait video */
.creative-act1 .text-content p {
    font-size: 1.15rem;
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 300;
}
```

This makes the body text lighter and slightly smaller — more like captions or exhibition notes paired with a visual, rather than standalone paragraphs. It creates a clear visual hierarchy where the video is the primary element and the text is the supporting element. This matches the design system's approach on the about page (`.rd-row .text-content p` uses `font-weight: 300; color: rgba(255,255,255,0.75)`) and the podcast page (`.podcast-page .text-content p` uses `color: rgba(255,255,255,0.7)`).

---

## Fix 3: Break video too large, feels like a sticker

### Cause
`.creative-break-video` is `width: 100%` inside the container (~1200px max-width). The 4:3 video at full container width is approximately 900px tall — enormous, and just sitting in the grid without visual context.

### Fix
Reduce its width and center it. Give it an asymmetric offset to match the site's design language:

In style.css, find:
```css
.creative-break-video {
    width: 100%;
    margin: 96px 0;
    border-radius: 24px;
    overflow: hidden;
}
```

Replace with:
```css
.creative-break-video {
    width: 75%;
    max-width: 800px;
    margin: 96px auto;
    border-radius: 24px;
    overflow: hidden;
}
```

This centers it at 75% of the container width (max 800px), which makes it roughly 600px tall at 4:3 — still large and impactful, but not overwhelming. The `margin: 96px auto` centers it horizontally with equal vertical spacing.

Also add a mobile override:
```css
@media (max-width: 768px) {
    .creative-break-video {
        width: 100%;
    }
}
```

---

## Summary

### style.css:
1. Add `margin-top: 96px` to `.creative-act-application` (Fix 1)
2. Add `.creative-act1 .text-content p` with lighter editorial treatment (Fix 2)
3. Change `.creative-break-video` from `width: 100%` to `width: 75%; max-width: 800px; margin: 96px auto` (Fix 3)
4. Add mobile override for `.creative-break-video` at full width (Fix 3)

### creative-building.html:
1. Bump `style.css?v=93`

No JS changes. No HTML structure changes.
