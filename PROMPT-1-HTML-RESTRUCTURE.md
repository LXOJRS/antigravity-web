# Claude Code Prompt 1: Podcast Page HTML Restructure + Content

## Context

You are working on `podcast.html` — a subpage of alexojers.com, a personal portfolio website for an AI adoption trainer. The site uses a dark editorial design system: `#050505` background, white/rgba text, `#0000C5` accent color for decoration (section titles, never body text), Inter font, 12-column grid with intentional asymmetry, GSAP + Lenis for animations, and a custom cursor.

The podcast page currently has a three-act structure (Concept/Tone → monument → break image → Goal/Focus → CTAs). It reads like a brochure — four text blocks all saying similar things, no real podcast content surfaced, and the primary CTA (listen on Spotify/YouTube) is buried at the bottom.

## Design System Rules (from DESIGN-RULES.md)

- Background: `#050505`, Text: `#ffffff` or `rgba(255,255,255,0.85)`, Accent: `#0000C5` (decoration only, never body text)
- Font: Inter. Titles are massive (clamp 4rem+), body is compact (1.25rem–1.5rem)
- Pacing: 12-column grid, intentional empty columns for asymmetry
- All images/videos use `border-radius: 24px`
- `.contact-btn` is the standard button style (pill-shaped, border, backdrop-blur)

## What the current podcast.html looks like

```
1. article-banner (static image, 60vh, grayscale + dark gradient)
2. h1 "AI-Rated Podcast" (about-hero class)
3. service-intro paragraph
4. podcast-grid-act1: text-col (Concept + Tone blocks) | logo-video-col (animated logo MP4)
5. typo-monument "LISTEN"
6. podcast-act2-break (static 21:9 image, grayscale)
7. podcast-grid-act3: centered text-col (Goal + Focus blocks + Spotify/YouTube buttons)
8. back-btn → footer
```

## What needs to change (HTML restructure)

Transform the page into this new structure:

```
1. article-banner — KEEP AS-IS (consistency with other service pages)
2. h1 "AI-Rated Podcast" — KEEP
3. service-intro — KEEP but update text slightly (see below)
4. Spotify/YouTube buttons — MOVE HERE, right below intro (above the fold intent)
5. podcast-grid-act1 — RESTRUCTURE:
   - text-col (cols 1–5): merge Concept + Tone into ONE tighter section
   - Add section-label "01 / ABOUT" above the section-title
   - logo-video-col (cols 8–12): keep animated logo video
6. typo-monument "LISTEN" — KEEP
7. podcast-act2-break — CONVERT to full-bleed-break (class swap, see CSS prompt)
8. NEW: Episode list section with expandable rows + per-episode Spotify embeds
   - Add section-label "02 / EPISODES"
9. NEW: Closing CTA section — monument-scale text + final Spotify/YouTube buttons
   - Add section-label "03 / LISTEN"
10. back-btn → footer
```

## Detailed HTML to produce

### Section labels
Add a `<span class="section-label">` above each `.section-title` on this page:
```html
<span class="section-label">01 / ABOUT</span>
```

### Service intro text update
Change the intro from "AI-Rated is where curiosity gets some room." to:
"AI-Rated is where curiosity gets some room. A podcast about AI, culture, and common sense."

### Early CTA buttons (after service-intro)
Right after the `.service-intro` paragraph, add the Spotify and YouTube buttons using the existing `.platform-links-centered` pattern:
```html
<div class="platform-links-centered" style="margin-bottom: 96px;">
    <a href="https://open.spotify.com/show/3gVWnNaseqJutRUTqOHSSk?si=5a445331a27f4d9b" target="_blank" rel="noopener noreferrer" class="contact-btn" data-magnetic>
        Listen on Spotify
    </a>
    <a href="https://www.youtube.com/@AIRatedPodcast" target="_blank" rel="noopener noreferrer" class="contact-btn" data-magnetic>
        Watch on YouTube
    </a>
</div>
```

### Act 1 — Merged "About" section
Merge Concept and Tone into a single text block. The content should be:

**Section title:** "About the Podcast" (or just "About")

**Merged text (one paragraph):**
"In this podcast, my girlfriend Morgan and I talk about AI the way it actually shows up in everyday life — as something that quietly reshapes culture, habits, expectations, and how people talk about their work. The tone is loose, but the questions are real. Some episodes circle around online phenomena, synthetic media, or the latest AI oddity that suddenly feels normal. We try to keep things fun."

Keep the logo video column as-is.

### Break image — class change
Change `<div class="podcast-act2-break">` to `<div class="full-bleed-break">` and wrap it differently:
```html
<div class="full-bleed-break">
    <img src="https://res.cloudinary.com/dnkcu6lne/image/upload/v1767459178/Podcast_YouTube_Thumbnail_ol7kid.png" alt="AI-Rated Podcast Hosts">
</div>
```

### NEW: Episode List Section
Create a new section after the break image. This is the main new content. Each episode is an expandable row.

```html
<div class="podcast-episodes">
    <span class="section-label">02 / EPISODES</span>
    <h2 class="section-title">Episodes</h2>

    <div class="episode-list">

        <!-- Episode 5 (Special) - Most recent first -->
        <div class="episode-row">
            <div class="episode-header">
                <span class="episode-number">Special</span>
                <div class="episode-info">
                    <h3 class="episode-title">ChatGPT Toxic Masculinity?</h3>
                    <p class="episode-tagline">Valentine's Day Special — What happens when two ChatGPTs give each other love advice?</p>
                </div>
                <button class="episode-toggle" aria-expanded="false" data-magnetic>
                    <span class="toggle-icon">+</span>
                </button>
            </div>
            <div class="episode-expand">
                <div class="episode-body">
                    <p>In this Valentine's special, we ask ChatGPT for relationship advice through Voice Mode and pit two ChatGPTs against each other in the most romantic — and awkward — scenarios. Do we get solid advice, or do they just tell each other what they want to hear? And does digital love actually bloom here?</p>
                    <div class="episode-embed">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/3aqlv6fYjAmp2Uwflq0YJI?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Episode 4 -->
        <div class="episode-row">
            <div class="episode-header">
                <span class="episode-number">Ep. 04</span>
                <div class="episode-info">
                    <h3 class="episode-title">AI in Image and Sound</h3>
                    <p class="episode-tagline">Sienna Rose, Michael Jackson, and alien cornflakes — can AI-generated art be original?</p>
                </div>
                <button class="episode-toggle" aria-expanded="false" data-magnetic>
                    <span class="toggle-icon">+</span>
                </button>
            </div>
            <div class="episode-expand">
                <div class="episode-body">
                    <p>We explore the use of AI in creating visual art and music. Can we call AI-generated images original? Will they ever be accepted by society? We investigate the mysterious 'singer' Sienna Rose — who has 4 million Spotify listeners but whose identity no one can verify. Plus: an AI image generation challenge with a bizarre theme.</p>
                    <div class="episode-embed">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/2OhCLr7dvuJHAnPaKnpSW5?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Episode 3 -->
        <div class="episode-row">
            <div class="episode-header">
                <span class="episode-number">Ep. 03</span>
                <div class="episode-info">
                    <h3 class="episode-title">AI Hype: Tourist Traps and Scammers</h3>
                    <p class="episode-tagline">Fake Christmas markets, LinkedIn charlatans, and phone call scams powered by AI.</p>
                </div>
                <button class="episode-toggle" aria-expanded="false" data-magnetic>
                    <span class="toggle-icon">+</span>
                </button>
            </div>
            <div class="episode-expand">
                <div class="episode-body">
                    <p>We discuss the many ways AI is being used for scams — and how eagerly people walk around with 'AI' in their LinkedIn bio. From tourist traps luring people to Amsterdam for AI-generated Christmas markets, to fabricated photos of Diddy in prison, to investigative journalist Kees van der Spek falling victim himself. Plus: our resolutions and AI predictions for 2026.</p>
                    <div class="episode-embed">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/62Cfq8EdK5Af2CRhen5xz0?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Episode 2 -->
        <div class="episode-row">
            <div class="episode-header">
                <span class="episode-number">Ep. 02</span>
                <div class="episode-info">
                    <h3 class="episode-title">AI in Daily Life: From Therapist to Lover</h3>
                    <p class="episode-tagline">When the line between real and fake dissolves — and AI starts feeling uncomfortably human.</p>
                </div>
                <button class="episode-toggle" aria-expanded="false" data-magnetic>
                    <span class="toggle-icon">+</span>
                </button>
            </div>
            <div class="episode-expand">
                <div class="episode-body">
                    <p>We investigate how the boundary between real and fake is dissolving. From hyperrealistic Sora-2 videos to intimate — and sometimes erotic — relationships with chatbots: why does AI feel increasingly real, and what does that do to our emotions and judgment? We dive into derailed TikTok trends, painful AI blunders, and test how far you can push ChatGPT with Custom Instructions.</p>
                    <div class="episode-embed">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/5uBW8sfaOEqTf6v86HDKlg?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Episode 1 -->
        <div class="episode-row">
            <div class="episode-header">
                <span class="episode-number">Ep. 01</span>
                <div class="episode-info">
                    <h3 class="episode-title">AI in Education: Cheat Sheet or Tutor?</h3>
                    <p class="episode-tagline">The pilot episode — AI basics, language models, and what it's like studying with AI.</p>
                </div>
                <button class="episode-toggle" aria-expanded="false" data-magnetic>
                    <span class="toggle-icon">+</span>
                </button>
            </div>
            <div class="episode-expand">
                <div class="episode-body">
                    <p>In the first episode, Morgan and Alex walk you through the basics of AI and language models, then zoom out to the bigger picture of AI in education. As recent graduates from the Master's in Media & Business at Erasmus University Rotterdam, they share firsthand experiences of what AI brought to studying — the good, the bad, and the ethical gray zones.</p>
                    <div class="episode-embed">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/4nGQrUX3BqFFTsCcQY1Of4?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
```

### NEW: Closing CTA Section
Replace the entire `podcast-grid-act3` with:

```html
<section class="podcast-closing">
    <span class="section-label">03 / LISTEN</span>
    <div class="podcast-closing-monument">
        <span class="monument-text">PRESS PLAY</span>
    </div>
    <p class="podcast-closing-text">New episodes monthly. Available on Spotify and YouTube.</p>
    <div class="platform-links-centered">
        <a href="https://open.spotify.com/show/3gVWnNaseqJutRUTqOHSSk?si=5a445331a27f4d9b" target="_blank" rel="noopener noreferrer" class="contact-btn" data-magnetic>
            Listen on Spotify
        </a>
        <a href="https://www.youtube.com/@AIRatedPodcast" target="_blank" rel="noopener noreferrer" class="contact-btn" data-magnetic>
            Watch on YouTube
        </a>
    </div>
</section>
```

## Important Implementation Notes

1. **Keep the nav exactly as-is** — don't move it to center, don't add icons to it. The Spotify/YouTube access is solved by the early CTA buttons + closing CTA.
2. **Keep the article-banner exactly as-is** — same image, same class, same treatment. Consistency with creative-building.html and service-rd.html.
3. **Add `class="service-page podcast-page"` to the `<main>` element** — the `podcast-page` class is needed for podcast-specific CSS scoping in Prompt 2.
4. **The `.full-bleed-break` class already exists in style.css.** Just swap the class name from `podcast-act2-break` to `full-bleed-break`.
5. **All buttons use the existing `.contact-btn` class** — no new button styles needed.
6. **The episode expand/collapse is CSS-driven** (`.episode-expand` starts `max-height: 0; overflow: hidden`). The JS for toggling `.expanded` class will be added in Prompt 2.
7. **Spotify embeds use `theme=0`** (dark theme) to match the site background.
8. **The `data-magnetic` attribute** on episode toggle buttons ensures the custom cursor interaction works on them.
9. **Remove the old podcast-grid-act3 section entirely** — it's replaced by the closing CTA.
10. **Keep the back-btn and footer exactly as they are.**
11. **Update version parameters** in the `<head>` — bump the stylesheet link to `style.css?v=85` and the script tag to `script.js?v=82` (or whatever is current + 1).

## File to edit
`podcast.html` — full restructure of the `<main>` content area. Keep `<head>`, `<nav>`, mobile overlay, and `<footer>` unchanged.
