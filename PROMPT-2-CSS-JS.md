# Claude Code Prompt 2: Podcast Page CSS + JS (Styling, Animations, Interactions)

## Context

This is the second prompt for the podcast page redesign. Prompt 1 restructured the HTML — merging four text blocks into one "About" section, adding an episode list with expandable rows and Spotify embeds, adding early CTA buttons, swapping the break image to full-bleed, and adding a monument-scale closing CTA.

Now we need CSS for the new elements and JS for animations + interactions.

## Design System Reference

- Background: `#050505` | Text: `#ffffff` / `rgba(255,255,255,0.85)` | Accent: `#0000C5` | Grey: `#888888`
- Font: Inter | Easing: `cubic-bezier(0.19, 1, 0.22, 1)` (var `--easing`)
- 12-column grid | `border-radius: 24px` on media | GSAP + ScrollTrigger + Lenis
- The site uses `cursor: none !important` globally and a custom `.cursor-follower` div — any interactive elements need `data-magnetic` for the cursor to recognize them
- Spotify embeds use `theme=0` (dark mode) and `border-radius: 12px`

## Existing CSS patterns to be aware of

The following classes ALREADY EXIST in style.css and should NOT be redefined (search by class name, not line number — line numbers may shift):
- `.full-bleed-break` — full-viewport-width, 75vh, overflow hidden, grayscale filter with color on hover. Includes `img`/`video` child rules and mobile media query.
- `.platform-links-centered` — flexbox, centered, gap 24px
- `.contact-btn` — pill button, border, backdrop-blur
- `.section-title` — 1.5rem, uppercase, `#0000C5`
- `.text-content p` — 1.25rem, line-height 1.8
- `.monument-text` — clamp(6rem, 15vw, 15rem), transparent with text-stroke
- `.typo-monument` — full-width, centered, overflow hidden

**IMPORTANT:** Before starting, verify `.full-bleed-break` exists in style.css by searching for it. If it doesn't exist, you'll need to add it (it's a full-viewport-width image/video container with grayscale filter and color-on-hover transition).

## CSS to ADD to style.css

### 1. Section Labels (new class — used on all subpages eventually)

```css
/* --- Section Labels (Editorial Numbering) --- */
.section-label {
    display: block;
    font-size: 0.75rem;
    color: var(--gray-color);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 12px;
    font-weight: 400;
}
```

### 2. Episode List System (all new)

```css
/* --- Podcast Episode List --- */
.podcast-episodes {
    margin-bottom: 96px;
}

.episode-list {
    display: flex;
    flex-direction: column;
    margin-top: 48px;
}

.episode-row {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.episode-row:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.episode-header {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 24px;
    align-items: center;
    padding: 32px 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.episode-header:hover {
    opacity: 0.7;
}

.episode-number {
    font-size: 0.8rem;
    color: var(--gray-color);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 500;
    min-width: 60px;
}

.episode-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.episode-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    line-height: 1.3;
    margin: 0;
}

.episode-tagline {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    line-height: 1.5;
}

.episode-toggle {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: var(--text-color);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s var(--easing);
    flex-shrink: 0;
}

.episode-toggle:hover {
    border-color: var(--text-color);
    background: rgba(255, 255, 255, 0.05);
}

.toggle-icon {
    font-size: 1.2rem;
    font-weight: 300;
    line-height: 1;
    transition: transform 0.4s var(--easing);
}

.episode-row.expanded .toggle-icon {
    transform: rotate(45deg);
}

/* Expandable body — collapsed by default */
.episode-expand {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.6s var(--easing);
}

.episode-row.expanded .episode-expand {
    max-height: 600px; /* Large enough for content + embed */
}

.episode-body {
    padding: 0 0 40px 84px; /* Left padding aligns with episode-info (60px number + 24px gap) */
}

.episode-body p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 24px;
}

.episode-embed {
    margin-top: 16px;
    max-width: 600px;
}

.episode-embed iframe {
    border-radius: 12px !important;
}

/* Mobile episode list */
@media (max-width: 768px) {
    .episode-header {
        grid-template-columns: 1fr auto;
        gap: 16px;
    }

    .episode-number {
        grid-column: 1 / -1;
        min-width: auto;
    }

    .episode-body {
        padding: 0 0 32px 0;
    }

    .episode-title {
        font-size: 1.1rem;
    }

    .episode-tagline {
        font-size: 0.85rem;
    }

    .episode-embed {
        max-width: 100%;
    }
}
```

### 3. Podcast Closing CTA Section

```css
/* --- Podcast Closing CTA --- */
.podcast-closing {
    text-align: center;
    padding: 64px 0 96px;
}

.podcast-closing .section-label {
    text-align: center;
}

.podcast-closing-monument {
    margin: 32px 0;
}

.podcast-closing-monument .monument-text {
    /* Inherits from existing .monument-text — just override padding for centered layout */
    padding-left: 0;
    text-align: center;
    display: block;
}

.podcast-closing-text {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 48px;
    line-height: 1.6;
}
```

### 4. Full-bleed break adjustments for podcast

The `.full-bleed-break` class already exists. However, confirm that swapping from `.podcast-act2-break` to `.full-bleed-break` removes the old margins. If the existing `.podcast-act2-break` has `margin-bottom: 96px`, the `.full-bleed-break` already has `margin-bottom: 128px` which is fine.

No new CSS needed for this — just the class swap in HTML.

### 5. Podcast-specific color overrides (optional but recommended)

Add a `.podcast-page` class to the `<main>` element in podcast.html, then scope overrides:

```css
/* --- Podcast Page Color Personality --- */
/* Note: the blue section-title color is kept as brand standard.
   Body text is slightly muted for a more editorial feel. */
.podcast-page .text-content p {
    color: rgba(255, 255, 255, 0.7);
}

.podcast-page .service-intro {
    color: rgba(255, 255, 255, 0.75);
}
```

**Important note about the blue accent (#0000C5):** The site owner is aware that the blue is dark against the black background (accessibility concern) but wants to keep it as the brand color. Do NOT change the section-title color. A future accessibility improvement might add a subtle `text-shadow: 0 0 20px rgba(0,0,205,0.3)` or shift to a slightly lighter shade, but that's out of scope here.

---

## JavaScript to ADD to script.js

Add all of the following **inside** the existing `document.addEventListener("DOMContentLoaded", () => { ... });` callback, before its closing `});`. Verify this structure exists in script.js by searching for `DOMContentLoaded`. All existing site JS lives inside this single callback.

### 1. Episode Expand/Collapse Toggle

```javascript
// --- Podcast Episode Expand/Collapse ---
const episodeRows = document.querySelectorAll('.episode-row');
episodeRows.forEach(row => {
    const header = row.querySelector('.episode-header');
    const toggle = row.querySelector('.episode-toggle');

    if (header) {
        header.addEventListener('click', () => {
            const isExpanded = row.classList.contains('expanded');

            // Close all other rows first (accordion behavior)
            episodeRows.forEach(otherRow => {
                if (otherRow !== row) {
                    otherRow.classList.remove('expanded');
                    const otherToggle = otherRow.querySelector('.episode-toggle');
                    if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle this row
            row.classList.toggle('expanded');
            if (toggle) {
                toggle.setAttribute('aria-expanded', !isExpanded);
            }
        });
    }
});
```

**Note about the custom cursor:** The `data-magnetic` attribute on `.episode-toggle` buttons means the existing cursor hover logic (which queries `'a, button, .service-card, [data-magnetic]'`) will automatically pick them up. The `.episode-header` uses `cursor: pointer` in CSS, but the global `cursor: none !important` rule hides native cursors — the custom cursor follower handles the visual. No cursor-related changes needed.

### 2. Episode List Stagger-In Animation

```javascript
// --- Episode Row Stagger Reveal ---
const episodeRowsForAnim = document.querySelectorAll('.episode-row');
if (episodeRowsForAnim.length > 0) {
    gsap.fromTo(episodeRowsForAnim,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.episode-list',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}
```

### 3. Text Block Stagger Reveal (all subpages)

```javascript
// --- Text Block Stagger Reveal (Subpages) ---
const textBlocks = document.querySelectorAll('.text-block');
if (textBlocks.length > 0) {
    textBlocks.forEach(block => {
        gsap.fromTo(block,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}
```

### 4. Break Image Parallax

```javascript
// --- Full-Bleed Break Parallax ---
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

### 5. Closing CTA Scale-In

```javascript
// --- Podcast Closing CTA Reveal ---
const podcastClosing = document.querySelector('.podcast-closing');
if (podcastClosing) {
    gsap.fromTo(podcastClosing,
        { opacity: 0, scale: 0.95, y: 40 },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: podcastClosing,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}
```

### 6. Monument Text Horizontal Scroll (Enhancement)

This adds a subtle horizontal parallax to the "LISTEN" and "PRESS PLAY" monument texts:

```javascript
// --- Monument Text Horizontal Parallax ---
const monumentTexts = document.querySelectorAll('.monument-text');
monumentTexts.forEach(text => {
    gsap.to(text, {
        xPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: text.closest('.typo-monument') || text.closest('.podcast-closing-monument'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});
```

---

## Files to edit

1. **style.css** — Add all CSS sections above. Bump the version query parameter in podcast.html's stylesheet link (e.g., `style.css?v=85`).
2. **script.js** — Add all JS blocks above inside the existing `DOMContentLoaded` callback. Bump the version query parameter in podcast.html's script tag (e.g., `script.js?v=82`).

## Testing Checklist

After implementation, verify:
- [ ] Episode rows expand/collapse on click (accordion behavior — only one open at a time)
- [ ] Spotify embeds load with dark theme inside expanded rows
- [ ] The `+` icon rotates to `×` when expanded
- [ ] Break image is full-bleed (edge to edge) with grayscale → color on hover
- [ ] All text blocks and episode rows have scroll-triggered fade-in animations
- [ ] Monument text scrolls horizontally on page scroll
- [ ] Closing CTA has scale-in animation
- [ ] Custom cursor works on episode toggle buttons (magnetic effect)
- [ ] Mobile: episode list stacks properly, embeds are full-width, expand works on tap
- [ ] No horizontal overflow issues from full-bleed elements
- [ ] Version parameters updated on CSS and JS links in podcast.html
