# Claude Code Prompt 4: Podcast Page — Finishing Touches

## Context

The podcast page has been restructured (Prompts 1–2) and visually elevated (Prompt 3). The skeleton and interactions are solid. This prompt addresses the final visual issues — primarily a broken typographic hierarchy and remaining polish items that prevent the page from feeling truly finished.

## Design System Reference

- `#050505` background | `#ffffff` / `rgba(255,255,255,0.85)` text | `#0000C5` accent | `#888888` grey
- Font: Inter | `--easing: cubic-bezier(0.19, 1, 0.22, 1)`
- 12-column grid | `border-radius: 24px` on media
- Titles should have AT LEAST a 2x size ratio compared to body text for proper visual hierarchy

## Issue 1: Section Titles Are Too Small (Critical)

### The Problem

The current `.section-title` is `1.5rem` (24px). Body text is `1.25rem` (20px). That's a **1.2x ratio** — barely distinguishable. Good typographic hierarchy demands at least 2x contrast between heading and body. The R&D page solves this with `.rd-row .section-title` at `clamp(3rem, 5vw, 4.5rem)`, but that override doesn't reach the podcast page.

Current scale on the podcast page:
- H1 (`.about-hero`): clamp(3.5rem, 6vw, 6.5rem) = ~56–104px
- Section titles: **1.5rem = 24px** ← this is the problem
- Body text: 1.25rem = 20px
- Episode titles: clamp(1.2rem, 2vw, 1.5rem) = ~19–24px

There's a massive gap between the h1 and the section titles with nothing in between. The section titles read as slightly bolder body text rather than as headings.

### The Fix

Increase the podcast page's section titles to create proper hierarchy. Scope this to `.podcast-page` so it doesn't affect other pages (where `.rd-row .section-title` already has its own treatment).

```css
/* Podcast page section titles — proper hierarchy (2.5x body text) */
.podcast-page .section-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 0 0 30px rgba(0, 0, 197, 0.25); /* Keep the existing glow */
}
```

This gives us:
- Desktop: 3rem (48px) = **2.4x** the 20px body text
- Mobile: 2rem (32px) = **2.1x** — still maintains hierarchy on small screens
- The clamp with 3.5vw creates a smooth fluid scale between breakpoints

**IMPORTANT:** There is already a rule `.podcast-page .section-title` in style.css that sets the text-shadow glow. Merge this new rule into that existing one — do NOT create a duplicate selector. The final combined rule should be:

```css
.podcast-page .section-title {
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.02em;
    line-height: 1;
    text-shadow: 0 0 30px rgba(0, 0, 197, 0.25);
}
```

### Also: "Episodes" h2 section title needs margin adjustment

With a larger section title, the `margin-bottom: 24px` on `.section-title` (from the base rule) may feel tight above the episode list. Add podcast-specific spacing:

```css
.podcast-episodes .section-title {
    margin-bottom: 8px; /* The episode-list already has margin-top: 48px, so reduce this to prevent double-spacing */
}
```

---

## Issue 2: The "Episodes" Section Title Should Match the "The Podcast" Section Title

Both "The Podcast" and "Episodes" use `.section-title`, so they'll both get the same enlarged size from Issue 1. That's correct — they're both h2-level headings and should have the same visual weight. No additional work needed here, just confirming the behavior.

---

## Issue 3: Episode Titles Need Better Visual Weight Relative to Taglines

### The Problem

Episode titles are `clamp(1.2rem, 2vw, 1.5rem)` = 19–24px. The body text inside expanded episodes is `1.1rem` = 17.6px. That's only a 1.1–1.4x ratio. With the section titles now enlarged, the episode titles also need a slight bump to maintain the overall hierarchy chain:

**Target hierarchy chain:**
- H1: ~56–104px (monumental)
- Section titles: ~32–48px (prominent headings)
- Episode titles: ~24–30px (sub-headings within the list)
- Body text / episode body: ~17–20px (readable paragraphs)
- Taglines / labels: ~12–14px (supporting text)

### The Fix

Bump episode titles slightly:

```css
.episode-title {
    font-size: clamp(1.3rem, 2.2vw, 1.7rem);
    font-weight: 700;
    letter-spacing: -0.02em;
}
```

This changes from `clamp(1.2rem, 2vw, 1.5rem)` → `clamp(1.3rem, 2.2vw, 1.7rem)` — a subtle increase that creates a clearer step between the section title, the episode title, and the body text.

Update the mobile override too:

```css
@media (max-width: 768px) {
    .episode-title {
        font-size: 1.15rem;
        letter-spacing: -0.01em;
    }
}
```

---

## Issue 4: Service Intro Text Is Same Size as Section Titles (Now Resolved Differently)

### The Problem

`.service-intro` is `1.5rem`. Previously this was the same as section titles (both 24px). Now that section titles are enlarged, the intro text will be smaller than section titles — which is actually correct. The intro is a supporting statement, not a heading.

However, now the intro might feel too small relative to the h1 above it. Currently:
- H1: ~56–104px
- Intro: 24px (1.5rem)

That's a ~4x drop, which is fine — the intro is a subtitle, not a heading. No change needed here.

---

## Issue 5: Monument Text Margin Spacing

### The Problem

The "LISTEN" monument and the "PRESS PLAY" closing monument may have slightly different visual weight due to the `PRESS PLAY` text being 10 characters vs `LISTEN` being 6. At the same font-size, "PRESS PLAY" will appear wider and potentially wrap at certain viewport widths.

### The Fix

Add `white-space: nowrap` to ensure it never wraps:

```css
.podcast-closing-monument .monument-text {
    padding-left: 0;
    text-align: center;
    width: 100%;
    white-space: nowrap;
}
```

This is already partially covered by `.monument-text`'s `white-space: nowrap`, but confirm it's inherited in the closing variant.

---

## Issue 6: Mobile Platform Buttons Should Be Full-Width

### The Problem

On mobile, the `.platform-links-centered` buttons stack vertically but may not stretch to full width. There's a mobile rule for `.platform-links` (the old class) that sets `width: 100%` on `.contact-btn`, but `.platform-links-centered` may not have the same treatment.

### The Fix

Check if this mobile rule already exists. If not, add:

```css
@media (max-width: 768px) {
    .platform-links-centered {
        flex-direction: column;
        align-items: stretch;
    }

    .platform-links-centered .contact-btn {
        width: 100%;
        justify-content: center;
    }
}
```

If a rule for `.platform-links-centered` mobile already exists in style.css, merge these properties into it.

---

## Issue 7: Expand/Collapse Left Padding on Mobile Is Already 0 — Confirm

The mobile rule `@media (max-width: 768px) { .episode-body { padding: 0 0 32px 0; } }` removes the desktop left-padding alignment (84px). This is correct — on mobile there's no left column to align with. Just confirming no change needed.

---

## Issue 8: Back Button Spacing

### The Problem

The `.back-btn` sits directly after the `.podcast-closing` section. With the closing section having `padding: 96px 0 96px`, there should be adequate space. But check that the back-btn doesn't feel squished against the closing CTA buttons.

### The Fix (if needed)

Add top margin to the back-btn only on the podcast page:

```css
.podcast-page .back-btn {
    margin-top: 32px;
}
```

Only add this if the back button feels too close to the CTA buttons above it.

---

## Summary of Changes

### style.css — Merge/Update:
1. **`.podcast-page .section-title`** — merge font-size, letter-spacing, line-height into the existing rule that has text-shadow (Issue 1)
2. **`.podcast-episodes .section-title`** — reduce margin-bottom (Issue 1)
3. **`.episode-title`** — bump font-size from `clamp(1.2rem, 2vw, 1.5rem)` to `clamp(1.3rem, 2.2vw, 1.7rem)` (Issue 3)
4. **Mobile `.episode-title`** — update from `1.1rem` to `1.15rem` (Issue 3)
5. **`.podcast-closing-monument .monument-text`** — confirm `white-space: nowrap` (Issue 5)
6. **Mobile `.platform-links-centered`** — add full-width button rule if missing (Issue 6)

### podcast.html:
- Update `style.css?v=` version parameter (bump by 1)

### No JS changes needed for this prompt.

### Post-implementation: Verify the final hierarchy chain
After changes, the typography scale should be:
```
H1 "AI-RATED PODCAST":     clamp(3.5rem, 6vw, 6.5rem)  = ~56–104px
Section titles:             clamp(2rem, 3.5vw, 3rem)     = ~32–48px   ← 2.4x body
Episode titles:             clamp(1.3rem, 2.2vw, 1.7rem) = ~21–27px   ← 1.35x body
Body / episode body:        1.1rem–1.25rem                = ~18–20px   ← baseline
Taglines:                   0.9rem                        = ~14px
Labels:                     0.75rem                       = ~12px
Monument text:              clamp(6rem, 15vw, 15rem)      = ~96–240px  (decorative, not hierarchy)
```

Ratio chain: H1 → Section (1.5–2x) → Episode (1.3–1.5x) → Body → Tagline (0.7x) → Label (0.6x)
Each step is clearly distinguishable. No two levels are within 1.2x of each other.
