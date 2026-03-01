# Design Recommendations — alexojers.com

Based on a full audit of your current codebase and inspiration drawn from Lama Lama, Extract Studio, and MetaLab's Midjourney case study. All recommendations respect DESIGN-RULES.md (#050505 bg, white/rgba text, #0000C5 accent for decoration only, Inter, 12-col grid with asymmetry, large titles + compact body).

---

## 1. Horizontal Rule Separators for the R&D / About Grid Rows

**Problem:** The `rd-row` sections on both the R&D and About page float without clear visual separation. The large background numbers (01–05) help on R&D, but on the About page there's no numbering — the rows blend together.

**Inspiration:** Extract Studio uses very thin horizontal borders between content sections, creating editorial pacing without heavy dividers. MetaLab uses generous whitespace + subtle lines to separate case study blocks.

**Recommendation:** Add a `1px solid rgba(255,255,255,0.08)` top border to each `.rd-row` (except the first). This gives each section a quiet visual anchor, especially on About where the numbering is absent. It's subtle enough to feel editorial, not grid-like.

**CSS:**
```css
.rd-row + .rd-row {
    border-top: 1px solid rgba(255,255,255,0.08);
}
```

---

## 2. Introduce a "Label" Above Section Titles on Subpages

**Problem:** On the homepage, the section headers use a structured label system (`01 / WHO IS ALEX?`, `02 / SERVICES`). On the subpages (Podcast, Visual Building, About), the sections jump straight into `section-title` (`Concept`, `Tone`, etc.) without the same kind of contextual framing.

**Inspiration:** Extract Studio uses small uppercase tracking labels above each content section. Lama Lama has meta-labels on work items. MetaLab uses them in case study metadata.

**Recommendation:** Add a `.section-label` element above `.section-title` on subpages. Use the same style as `.label` on the homepage: `0.8rem`, uppercase, `letter-spacing: 0.1em`, `color: var(--gray-color)`. Example: `01 / CONCEPT`, `02 / TONE`. This brings the editorial numbering system from R&D into consistency across all pages.

**CSS:**
```css
.section-label {
    display: block;
    font-size: 0.75rem;
    color: var(--gray-color);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: 12px;
}
```

---

## 3. More Generous Vertical Spacing Between Text Blocks

**Problem:** On the Podcast and Visual Building pages, stacked `.text-block` elements inside the same column have tight spacing. The `gap: 48px` in the parent works, but consecutive blocks of heading + paragraph feel slightly compressed at agency level.

**Inspiration:** Extract Studio doubles their vertical spacing on desktop vs. mobile (py-12 → py-24). MetaLab uses extremely generous section padding. Lama Lama's modular spacing scale uses a ~1.5x ratio between steps.

**Recommendation:** Increase the gap between `.text-block` elements from the current implicit spacing to an explicit `64px` on desktop. Inside `.podcast-text-col` and `.creative-text-col`, the gap should be `64px` instead of `48px`. This gives each content section more breathing room without needing to restructure.

**CSS:**
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

---

## 4. Subtle Fade Gradient at Top of Article Banners

**Problem:** The `article-banner` on service pages has a strong bottom gradient (`rgba(5,5,5,0.4)` → `rgba(5,5,5,0.8)`) but no top treatment. The transition from the fixed nav into the banner feels abrupt — there's no depth between the navigation and the imagery.

**Inspiration:** MetaLab's case study pages use a top vignette that bleeds the dark background into the hero image. Extract Studio uses layered transitions at section boundaries.

**Recommendation:** Add a top-to-bottom gradient to `.article-banner::after` that includes a soft fade at the top as well. This creates a "floating" effect for the navigation and a cinematic vignette.

**CSS:**
```css
.article-banner::after {
    background: linear-gradient(
        to bottom,
        rgba(5, 5, 5, 0.6) 0%,
        rgba(5, 5, 5, 0) 25%,
        rgba(5, 5, 5, 0) 50%,
        rgba(5, 5, 5, 0.8) 100%
    );
}
```

---

## 5. Stronger Typographic Scale Contrast Between Title and Body on About Page

**Problem:** The About page uses `.section-title` at `clamp(3rem, 5vw, 4.5rem)` and body text at `1.5rem`. While readable, the contrast ratio between title and body is moderate. At agency level, you want titles to feel monumental against the body text.

**Inspiration:** Lama Lama uses a dramatic jump from headline (36–42px) to body (13–20px). MetaLab has extreme contrast with massive display type against small, light body copy. Extract Studio uses fluid scaling that maintains a 2.5–3x ratio.

**Recommendation:** The R&D titles are great — keep those. But make the body text slightly smaller and lighter on the About page to increase the contrast. Change `.rd-row .text-content p` from `1.5rem` to `1.3rem` with `font-weight: 300` and `color: rgba(255,255,255,0.65)` (slightly more muted). This makes the blue titles pop harder.

**CSS (About-page-specific override):**
```css
.about-page .rd-row .text-content p {
    font-size: 1.3rem;
    font-weight: 300;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
}
```

---

## 6. Hover Line Animation on Section Titles

**Problem:** The `.section-title` elements (blue, uppercase) on subpages are static. There's no micro-interaction inviting engagement. The homepage has text scramble effects and magnetic hover, but subpages feel comparatively flat.

**Inspiration:** Extract Studio and Lama Lama use subtle underline animations on links and headings. MetaLab uses opacity shifts. A common agency pattern is a line that expands from left to right on hover.

**Recommendation:** Add an animated underline to `.section-title` using a `::after` pseudo-element. The line starts at `width: 0` and expands to `width: 100%` on hover with a smooth ease. Use `#0000C5` for the line color (accent, not body text).

**CSS:**
```css
.section-title {
    position: relative;
    display: inline-block;
    cursor: default;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #0000C5;
    transition: width 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.section-title:hover::after {
    width: 100%;
}
```

---

## 7. About Page: Add Large Background Number Like R&D

**Problem:** You mentioned the R&D page has pretty decent styling — one of the things that gives it editorial gravity is the large `.rd-number` watermark behind each section (`01`, `02`, etc.). The About page uses the same `.rd-grid` layout but omits the numbers. This makes it feel less finished.

**Inspiration:** This is already your own design language from R&D. Extract Studio uses numbered capability sections. MetaLab uses sequential visual markers in case studies.

**Recommendation:** Add the `<span class="rd-number">01</span>` (through 04) to each `.rd-row` on the About page. The styling already exists — you just need the HTML. This instantly brings the About page to the same editorial level as R&D.

**HTML (add to each rd-row in about.html):**
```html
<div class="rd-row">
    <span class="rd-number">01</span>
    <h2 class="section-title">Reality</h2>
    ...
</div>
```

---

## 8. Service Intro Text — Wider Column Span

**Problem:** `.service-intro` sits on `grid-column: 3 / span 8` which centers it nicely, but reads somewhat narrow for a single-line intro statement. Lama Lama and MetaLab both use near-full-width intro text to create an impactful opening statement.

**Inspiration:** MetaLab's case study intros span almost the full width. Extract Studio uses `w-10/12` or `w-11/12` for intro statements. The goal is to make the intro feel like a standalone cinematic line, not a paragraph in a column.

**Recommendation:** Widen `.service-intro` to `grid-column: 2 / span 10` and slightly increase the font size to `1.75rem`. This makes it feel more like a statement and less like a subtitle.

**CSS:**
```css
.service-intro {
    grid-column: 2 / span 10;
    font-size: 1.75rem;
}
```

---

## 9. Footer Enhancement — Add a Minimal Divider Row

**Problem:** The footer is functional but extremely minimal: just a copyright line and (on the homepage) a "TOP" button. There's no secondary navigation or social links, which is fine for a personal site — but the footer itself lacks the spatial treatment of the rest of the page.

**Inspiration:** Lama Lama and Extract Studio both use footers with subtle columnar layouts (left: copyright, center/right: links). MetaLab uses a footer that echoes the main content grid.

**Recommendation:** Add a second line to the footer with your email and LinkedIn link, separated by a dot or pipe character. Keep it in `var(--gray-color)`, `0.85rem`, uppercase tracking. This fills the footer without overcomplicating it.

**HTML:**
```html
<footer>
    <div class="container">
        <div class="footer-content">
            <p>&copy; 2026 Alex AI Trainer</p>
            <div class="footer-links">
                <a href="mailto:alexander@promptgorillas.com">Mail</a>
                <span class="footer-dot">·</span>
                <a href="https://www.linkedin.com/in/alexanderojers/" target="_blank">LinkedIn</a>
            </div>
        </div>
    </div>
</footer>
```

**CSS:**
```css
.footer-links {
    display: flex;
    gap: 12px;
    align-items: center;
}

.footer-links a {
    font-size: 0.85rem;
    color: var(--gray-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--text-color);
}

.footer-dot {
    color: var(--gray-color);
    font-size: 0.85rem;
}
```

---

## 10. Cinematic Break Image: Add Parallax Like the Homepage Video

**Problem:** The `.podcast-act2-break` image is static with only a hover effect (grayscale → color). It's a visual break, but compared to the homepage's `visual-hook` video with GSAP parallax scrolling, it feels flat.

**Inspiration:** MetaLab uses parallax imagery in case studies. Your own homepage already does this with `yPercent: 20` on the visual hook. Lama Lama uses scroll-linked animations on feature images.

**Recommendation:** Add a subtle parallax scroll effect to `.podcast-act2-break img` using the same GSAP pattern you already have. Scale the image slightly (1.1x) and translate it on scroll.

**CSS addition:**
```css
.podcast-act2-break img {
    transform: scale(1.1);
}
```

**JS addition (in script.js):**
```js
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
```

---

## 11. Stagger-Reveal Animations on Subpage Content Blocks

**Problem:** The homepage has GSAP stagger animations on insight cards and section reveals. But on subpages, only `.rd-row` elements animate in (via the existing script). The text blocks within acts (podcast-grid-act1, creative-act1, etc.) appear without animation.

**Inspiration:** Extract Studio reveals content progressively as you scroll. MetaLab fades in sections with staggered timing. Your own R&D page already does this beautifully with `fromTo` on rd-rows.

**Recommendation:** Add the same stagger-reveal to `.text-block` elements inside subpage acts. Each block fades in with a slight upward motion, 200ms apart.

**JS addition (in script.js):**
```js
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

---

## 12. About Page Portrait: Scale-on-Scroll Reveal

**Problem:** The About page portrait has a `yPercent: -15` parallax (good), but no entrance animation. It just appears. Compared to the carefully orchestrated homepage hero, this feels like a missed moment.

**Inspiration:** Extract Studio's about page reveals the team portrait with a scale + fade effect. MetaLab uses reveal-on-scroll for imagery.

**Recommendation:** Add a scale-up + fade-in to the portrait on scroll-enter. Start at `scale(0.9)` and `opacity: 0`, animate to `scale(1)` and `opacity: 1`.

**JS addition (in script.js):**
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

---

## 13. Visual Building Page: Tail Section Visuals — Add Rounded Corners Consistently

**Problem:** `.tail-visual img, .tail-visual video` already has `border-radius: 24px`, which is good. But the `.cinematic-showcase` wrapping container has `border-radius: 24px` while the `.portrait-video` also has `24px`. The `.podcast-act2-break` also has `24px`. This consistency is actually solid, but the About portrait uses `border-radius: 0 0 100px 100px` — a capsule-bottom shape that doesn't match the rest of the design language.

**Inspiration:** Extract Studio uses consistent `rounded-lg` (approximately 12–16px) across all images. MetaLab uses a consistent radius. Lama Lama also maintains uniform corner treatment.

**Recommendation:** Change the About portrait to use the same `border-radius: 24px` as every other visual element. The capsule shape is a nice idea, but it introduces an inconsistency that weakens the system. Alternatively, if you strongly prefer the capsule, apply it to all portrait-oriented media (but this would be harder to maintain).

**CSS:**
```css
.about-portrait img {
    border-radius: 24px;
}
```

---

## Summary — Priority Order

| # | Recommendation | Impact | Effort |
|---|----------------|--------|--------|
| 7 | Add rd-numbers to About page | High | Low (HTML only) |
| 1 | Horizontal rule separators on rd-rows | High | Low (1 CSS rule) |
| 4 | Top gradient fade on article banners | High | Low (CSS tweak) |
| 2 | Section labels on subpages | High | Medium (HTML + CSS) |
| 11 | Stagger-reveal on text blocks | High | Low (JS snippet) |
| 5 | Stronger title/body contrast on About | Medium | Low (CSS override) |
| 3 | Increase text-block vertical spacing | Medium | Low (CSS tweak) |
| 8 | Widen service-intro column span | Medium | Low (CSS tweak) |
| 10 | Parallax on podcast break image | Medium | Low (JS snippet) |
| 12 | Portrait scale-on-scroll reveal | Medium | Low (JS snippet) |
| 6 | Hover underline on section titles | Low | Low (CSS) |
| 9 | Footer enhancement with links | Low | Low (HTML + CSS) |
| 13 | Consistent border-radius on portrait | Low | Low (CSS tweak) |
