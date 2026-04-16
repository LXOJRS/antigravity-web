# Design & UX — Quick Wins and High-ROI Changes

> **Focus:** Visual design, interaction, and UX only. No copy rewrites here.
> **Rule:** Every item includes exact CSS/HTML/JS needed and a feasibility rating for Claude Code.
> **Organized:** Quick Wins (CSS-only, ship in minutes) → Medium Moves (HTML+CSS, one prompt each) → The Big One (service card restructure).

---

## TIER 1 — QUICK WINS (CSS-only, zero structural risk)

These are all single-property or small-block CSS changes. Each one is independently shippable. Combined, they compound into a noticeably more polished site.

---

### 1.1 Kill the floating animation on service cards

**Problem:** The `float` keyframe animation (`translateY(-15px)` over 6s) makes the cards bob up and down continuously. This is the single biggest contributor to the "sticker" feeling — stickers float, architectural elements don't. It also fights with the hover `translateY(-5px)`, creating jittery state conflicts.

**Fix:** Remove the `.floating` class assignment in JS, or override in CSS:

```css
.service-card.floating {
    animation: none;
}
```

**Or** (if you want to keep subtle movement): replace with a one-shot entrance animation via GSAP that the cards already have from the scroll-reveal system. The float loop adds nothing after the first impression.

**Impact:** High. Immediately makes the cards feel grounded and intentional.
**Risk:** None. Pure deletion.

---

### 1.2 Soften the service card image filter

**Problem:** The desaturation filter on card images is heavy: `grayscale(80%) brightness(0.6) contrast(1.1) sepia(20%) hue-rotate(190deg)`. This creates a blue-tinted, dark, flat treatment that looks processed rather than editorial. The hover state (full color) is a nice reveal, but the resting state is too suppressed — on a dark background, the images almost disappear.

**Fix:**

```css
.service-card img {
    filter: grayscale(60%) brightness(0.7) contrast(1.05) sepia(10%) hue-rotate(190deg);
}
```

Subtle shift: less grayscale (60 vs 80), more brightness (0.7 vs 0.6), reduced sepia. The images stay muted but readable. The hover color-reveal still works because you're going from muted to full — the contrast is just less extreme.

**Impact:** Medium. Cards feel more alive at rest.
**Risk:** None. CSS value change.

---

### 1.3 Add a top vignette to article banners

**Problem:** The `.article-banner::after` gradient only fades from bottom. The transition from the fixed nav into the banner image feels like a hard cut. Agency sites use a top vignette to blend the nav into the hero.

**Fix:**

```css
.article-banner::after {
    background: linear-gradient(
        to bottom,
        rgba(5, 5, 5, 0.5) 0%,
        rgba(5, 5, 5, 0) 20%,
        rgba(5, 5, 5, 0) 50%,
        rgba(5, 5, 5, 0.8) 100%
    );
}
```

**Impact:** Medium. Adds cinematic depth to every subpage hero.
**Risk:** None. CSS gradient change on existing pseudo-element.

---

### 1.4 Widen service-intro to breathe

**Problem:** `.service-intro` sits at `grid-column: 3 / span 8`. For a single-line statement this feels narrow and timid, like it's apologizing for being there.

**Fix:**

```css
.service-intro {
    grid-column: 2 / span 10;
    font-size: 1.75rem;
}
```

**Impact:** Medium. The intro line becomes a statement instead of a caption.
**Risk:** None. Grid column shift.

---

### 1.5 Increase text-block gap on subpages

**Problem:** Stacked `.text-block` elements inside acts have `gap: 48px`. At agency level, this is tight. The content blocks don't breathe enough between each other.

**Fix:**

```css
.podcast-text-col,
.creative-text-col {
    gap: 64px;
}

@media (max-width: 768px) {
    .podcast-text-col,
    .creative-text-col {
        gap: 48px;
    }
}
```

**Impact:** Medium. More white space = more editorial authority.
**Risk:** None. Gap increase.

---

### 1.6 Mute the body text on About page rd-rows

**Problem:** The About page uses the same text size and weight as R&D (`1.5rem, weight 300, rgba 0.75`). The R&D page has massive `.rd-number` watermarks (14rem) creating contrast. The About page doesn't — so the title-to-body ratio feels too close, everything reads at the same volume.

**Fix:**

```css
.about-page .rd-row .text-content p {
    font-size: 1.3rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.75;
}
```

Slightly smaller, slightly more muted. The blue `.section-title` at `clamp(3rem, 5vw, 4.5rem)` now pops harder.

**Impact:** Medium. Strengthens the visual hierarchy on the weakest content page.
**Risk:** None. CSS override scoped to `.about-page`.

---

### 1.7 Consistent border-radius on About portrait

**Problem:** The About portrait uses `border-radius: 0 0 100px 100px` (capsule bottom). Every other visual element on the site uses `border-radius: 24px`. The capsule shape is a lone inconsistency that weakens the design system.

**Fix:**

```css
.about-portrait img {
    border-radius: 24px;
}
```

**Impact:** Low-medium. Design system consistency.
**Risk:** None.

---

### 1.8 Visual-hook video: remove blue box-shadow

**Problem:** `.visual-hook video` has `box-shadow: 0 20px 80px rgba(0, 0, 197, 0.25)` — a blue glow under the video. On the `#050505` background, this reads as a design artifact rather than an intentional shadow. It's the one place the accent color appears as a glow rather than a stroke or fill, breaking the rule that `#0000C5` is for decoration only.

**Fix:**

```css
.visual-hook video {
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
}
```

Replace the blue with a dark shadow for depth without color bleed. Or remove the shadow entirely — the `border-radius: 24px` and `filter: brightness(0.85)` are enough to frame the video.

**Impact:** Low-medium. Cleans up a subtle but off-system detail.
**Risk:** None.

---

## TIER 2 — MEDIUM MOVES (HTML + CSS, one prompt each)

These involve small HTML additions alongside CSS. Each is a single, contained prompt for Claude Code.

---

### 2.1 Section transition dividers between homepage sections

**Problem:** The homepage jumps from About → Services → Marquee → Insights → Contact with no visual transition between them. Each section starts cold. Agency sites use subtle horizontal rules, spacing shifts, or micro-elements to signal "you're entering a new chapter."

**Fix — Option A (minimal):** Add a `1px` rule between major homepage sections:

```css
.services {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.insights {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}
```

**Fix — Option B (editorial):** Add a small `.section-label` before each section header, matching the existing `01 / WHO IS ALEX?` pattern but for all sections. This already exists in the HTML for About and Services — but `Insights` has it too. The fix is making them ALL visually consistent and adding them where missing.

**Impact:** High. Creates a sense of structured chapters on the homepage.
**Risk:** None for Option A. Low for Option B (HTML additions reusing existing `.label` class).

---

### 2.2 Service cards — larger card-index numbers with accent treatment

**Problem:** The `.card-index` numbers (`01`, `02`, `03`) are positioned top-right at `rgba(255,255,255,0.4)` and `clamp(40px, 5vw, 80px)`. They're visible but passive — they don't contribute to the editorial grid feel the way `.rd-number` does on R&D.

**Fix:** Make them bigger, position them differently, and use the accent color:

```css
.card-index {
    font-size: clamp(60px, 8vw, 120px);
    color: rgba(0, 0, 197, 0.3);
    top: 1.5rem;
    left: 2rem;
    right: auto;
    text-align: left;
    font-weight: 800;
    letter-spacing: -0.04em;
}
```

Moving the number to top-left and increasing its size makes each card feel like a numbered editorial entry rather than a labeled sticker. The blue at low opacity creates a subtle brand mark without competing with the title text.

**Impact:** Medium-high. Shifts the cards toward the editorial language already established on R&D.
**Risk:** Low. CSS positioning changes only.

---

### 2.3 Homepage About section — sticky scroll reveal

**Problem:** The About section is a simple 7-col / 5-col split. The `.section-header` is already `position: sticky; top: 128px` — which is great. But the right-side content (`.about-content`) is just two short paragraphs that don't take advantage of the sticky container. There's no scroll payoff.

**Proposed enhancement:** Add a subtle scale-on-scroll to the h2 headline inside `.section-header` so it grows slightly as you scroll through the section, then settles:

```js
const aboutH2 = document.querySelector('.about .section-header h2');
if (aboutH2) {
    gsap.fromTo(aboutH2,
        { scale: 0.95, opacity: 0.7 },
        {
            scale: 1, opacity: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 60%',
                end: 'top 20%',
                scrub: true
            }
        }
    );
}
```

**Impact:** Medium. Adds dynamism to the most important homepage section.
**Risk:** Low. Additive GSAP animation using existing patterns.

---

### 2.4 Parallax on podcast break image and creative break video

**Problem:** The `.podcast-act2-break img` and `.creative-break-video video` are static cinematic breaks. Every other visual break on the site (full-bleed, visual-hook, cinematic-showcase) has parallax scroll behavior. These two don't, creating a dead spot in the scroll experience.

**Fix (JS, additive):**

```js
// Podcast break image parallax
const podcastBreakImg = document.querySelector('.podcast-act2-break img');
if (podcastBreakImg) {
    gsap.to(podcastBreakImg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
            trigger: '.podcast-act2-break',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Creative break video parallax
const creativeBreakVid = document.querySelector('.creative-break-video video');
if (creativeBreakVid) {
    gsap.to(creativeBreakVid, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
            trigger: '.creative-break-video',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}
```

**Impact:** Medium. Brings visual breaks to life, matches existing site language.
**Risk:** None. Exact same GSAP pattern as `fullBleedMedia` parallax at script.js line 517-530.

---

### 2.5 About portrait — scale-on-scroll entrance

**Problem:** The portrait has `yPercent: -15` parallax (good) but appears fully visible on load. No entrance animation. Compared to the GSAP-orchestrated homepage hero, it feels like an afterthought.

**Fix:**

```js
const aboutPortrait = document.querySelector('.about-portrait');
if (aboutPortrait) {
    gsap.fromTo(aboutPortrait,
        { opacity: 0, scale: 0.92 },
        {
            opacity: 1, scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: aboutPortrait,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );
}
```

**Impact:** Medium. One moment of visual surprise on the About page.
**Risk:** None. Standard GSAP `fromTo` pattern.

---

## TIER 3 — THE BIG ONE: SERVICE CARDS

You asked for both options, so here they are.

---

### Option A: Keep the 3-card grid, make it architectural (CSS + minor HTML)

The goal: keep the existing card structure but make the cards feel like they **belong to the page** rather than sitting on top of it.

**Changes:**

**A1. Remove border + border-radius. Go edge-to-edge within the container.**

```css
.service-card {
    border: none;
    border-radius: 0;
    padding: 4rem 3rem;
}
```

This is the single biggest "sticker → architecture" change. Rounded corners + border = sticker. Squared edges within a container = structural panel. The images still have absolute positioning and gradient overlay, so they work fine without border-radius.

**A2. Add a subtle separator between cards instead.**

```css
.services-grid {
    gap: 0;
}

.service-card + .service-card {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
    .service-card + .service-card {
        border-left: none;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
}
```

Thin white separator between cards = editorial grid dividers. Like a newspaper layout or Extract Studio's capability grid.

**A3. Stagger the card heights for asymmetry.**

The cards already have different `min-height` values (500, 550, 480). Push this further:

```css
.service-card:nth-child(1) { min-height: 560px; }
.service-card:nth-child(2) { min-height: 480px; margin-top: 80px; }
.service-card:nth-child(3) { min-height: 520px; margin-top: 40px; }
```

This creates a jagged top edge that looks intentional rather than a uniform row. Combined with no border-radius and thin separators, it reads as an editorial grid.

**A4. Kill the gradient overlay on hover, use a simple brightness shift.**

```css
.service-card:hover::after {
    opacity: 0.6;  /* was 0.4 — darken more on hover */
}

.service-card:hover img {
    filter: grayscale(0%) brightness(0.85) contrast(1.1) sepia(0%);
    transform: scale(1.03);  /* less aggressive than 1.05 */
}
```

More subtle reveal. The current 1.05 scale + full color is a lot of visual noise for a hover state.

**Combined effect:** Cards that feel like structural panels in an editorial grid — no floating, no rounded corners, staggered heights, thin dividers, muted hover. Still clickable, still image-backed, but grounded.

**Risk: Low.** All CSS changes. The border-radius removal on mobile needs a smoke test (the mobile `min-height: 400px` override should still work fine). No HTML changes needed.

**Feasibility: High.** Claude Code can do all of this in a single CSS-focused prompt.

---

### Option B: Full-section service blocks (structural HTML + CSS change)

This is the agency pattern: instead of 3 equal cards in a row, each service gets a full-width horizontal section with image on one side and text on the other, alternating left/right.

**What it looks like:**

```
┌─────────────────────────────────────────────┐
│  02 / SERVICES                              │
│  Capabilities                               │
├─────────────────────────────────────────────┤
│                                             │
│  [IMAGE: Workshop photo]    01              │
│                             R&D,            │
│                             Consultancy     │
│                             & Workshops     │
│                             ───             │
│                             From messy      │
│                             thinking to     │
│                             clear visions.  │
│                             [→]             │
│                                             │
├──────────── thin separator ─────────────────┤
│                                             │
│  02                    [IMAGE: Podcast art]  │
│  AI-Rated                                   │
│  Podcast                                    │
│  ───                                        │
│  AI, culture, and                           │
│  common sense.                              │
│  [→]                                        │
│                                             │
├──────────── thin separator ─────────────────┤
│                                             │
│  [IMAGE: Shoe/visuals]      03              │
│                             Creative        │
│                             Building        │
│                             ───             │
│                             Turning ideas   │
│                             into branded    │
│                             visuals with AI │
│                             [→]             │
│                                             │
└─────────────────────────────────────────────┘
```

**HTML structure (replaces `.services-grid`):**

```html
<div class="service-rows">
    <a href="service-rd.html" class="service-row">
        <div class="service-row-visual">
            <img src="..." alt="R&D">
        </div>
        <div class="service-row-content">
            <span class="card-index">01</span>
            <h3>R&D, Consultancy & Workshops</h3>
            <p>From messy thinking to clear visions.</p>
            <span class="read-more">Explore <span class="btn-arrow">→</span></span>
        </div>
    </a>

    <a href="podcast.html" class="service-row reversed">
        <!-- same structure, reversed means image goes right -->
    </a>

    <a href="creative-building.html" class="service-row">
        <!-- same structure -->
    </a>
</div>
```

**CSS:**

```css
.service-rows {
    display: flex;
    flex-direction: column;
}

.service-row {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 48px;
    padding: 80px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    align-items: center;
    text-decoration: none;
    color: inherit;
}

.service-row:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.service-row-visual {
    grid-column: 1 / span 6;
    overflow: hidden;
    border-radius: 16px;
}

.service-row-visual img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    filter: grayscale(60%) brightness(0.7) contrast(1.05);
    transition: filter 0.8s var(--easing), transform 0.8s var(--easing);
}

.service-row:hover .service-row-visual img {
    filter: grayscale(0%) brightness(1) contrast(1.1);
    transform: scale(1.03);
}

.service-row-content {
    grid-column: 8 / span 5;
}

.service-row-content .card-index {
    position: static;
    display: block;
    font-size: clamp(3rem, 5vw, 5rem);
    color: rgba(0, 0, 197, 0.4);
    font-weight: 800;
    letter-spacing: -0.04em;
    margin-bottom: 16px;
}

.service-row-content h3 {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 600;
    margin-bottom: 16px;
    line-height: 1.15;
}

.service-row-content p {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.6;
    margin-bottom: 24px;
}

/* Reversed: image right, content left */
.service-row.reversed .service-row-visual {
    grid-column: 7 / span 6;
    grid-row: 1;
}

.service-row.reversed .service-row-content {
    grid-column: 1 / span 5;
    grid-row: 1;
}

/* Mobile */
@media (max-width: 768px) {
    .service-row {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 48px 0;
    }
    
    .service-row-visual {
        border-radius: 12px;
    }
    
    .service-row-content .card-index {
        font-size: 2.5rem;
    }
}
```

**What you gain:**
- Each service feels like a **destination** on the page, not a tile in a grid
- The alternating left/right pattern creates the same rhythm as the rd-rows on subpages — visual consistency across the site
- The 12-column grid alignment matches every other section on the site
- Image-to-text ratio is more balanced — the images can breathe
- Hover behavior is per-row (subtle image color reveal), not per-card (bouncy float)
- The page feels taller and more intentional — you're scrolling through capabilities, not glancing at a menu

**What you lose:**
- The compact "three at a glance" overview. Visitors now see one service at a time as they scroll.
- The existing card craftsmanship (gradient overlay, floating, min-height staggering). That CSS gets replaced, not evolved.

**Risk: Medium.** This is a full HTML restructure of the services section. The JS scroll-reveal for `.service-card` in script.js (line 96: `hoverElements` selector) needs to be updated to `.service-row`. The GSAP stagger animation on cards (if it exists — I see `insightCards` stagger but not explicit service-card stagger) would need to be rewritten as per-row scroll reveals matching the `.rd-row` pattern.

**Feasibility: Medium-high.** Claude Code can do this in one focused prompt, but you need to test mobile carefully. The `reversed` grid-row trick on mobile requires the `flex-direction: column` override to work correctly (it does, because we remove grid entirely at 768px).

---

### My recommendation

**Start with Option A.** It's all CSS, zero structural risk, and you can ship it in 15 minutes. Live with it for a day or two. If the cards still feel too "sticker" after removing the float, the border-radius, and adding dividers + staggered heights, then Option B is the next step. But Option A might be enough — sometimes the problem isn't the layout, it's the decoration.

---

## COMBINED SHIPPING ORDER

If you want to do all of this efficiently:

**Prompt 1 (CSS-only, 10 changes in one go):**
- 1.1 Kill floating animation
- 1.2 Soften card image filter
- 1.3 Top vignette on article banners
- 1.4 Widen service-intro
- 1.5 Increase text-block gap
- 1.6 Mute About page body text
- 1.7 Consistent portrait border-radius
- 1.8 Remove blue box-shadow from visual-hook
- 2.1 Section border separators on homepage
- 2.2 Larger accent-colored card-index numbers

**Prompt 2 (JS additions, additive):**
- 2.3 About h2 scale-on-scroll
- 2.4 Podcast break + creative break parallax
- 2.5 About portrait scale entrance

**Prompt 3 (Service card structural choice):**
- Either Option A (CSS-only: remove border-radius, add separators, stagger heights)
- Or Option B (HTML + CSS: full-section rows with alternating layout)

All together: 2-3 Claude Code sessions. No dependencies between Prompt 1 and Prompt 2 — they can ship in either order. Prompt 3 should come last so you can evaluate with the other polish already in place.
