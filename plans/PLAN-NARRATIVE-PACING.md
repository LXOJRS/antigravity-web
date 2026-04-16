# PLAN — Narrative & Pacing Pass for alexojers.com

> **Status:** Ready to execute, with copy-level details still open for per-prompt review.
> **Part of:** Website improvement strategy (plans collection).
> **Scope:** About, R&D, and Podcast pages. Does not touch Creative Building or the homepage positioning (those are separate plans).
> **Prerequisite plans:** None. This plan installs reusable primitives that future plans can build on.
> **Intended workflow:** Iterate freely on this document before running any prompts. When a section feels locked, execute just that prompt in a focused session, review in the browser, then come back here and refine the remaining prompts based on what you learned. Plans are meant to absorb information between runs.

---

## Context

The site's design system is strong — dark editorial, Inter, monument type, cinematic video, GSAP reveals all wired. The problem isn't look, it's **rhythm**. Right now the About and R&D pages read as "boxes of text under boxes of text": every `.rd-row` is the same weight, same grid, same alternation, with no pacing breaks between them. The podcast page is sharper but its Act 1 gets visually flooded — CTA buttons sit *before* the intro prose, and the prose is then crammed next to a 1:1 logo video with no hierarchical anchor.

The effect Alex describes as "missing narrative, missing buildup" is a specific structural issue: **the pages plateau**. Every section hits at the same volume. There are no cliffhangers, no pull-quotes, no sudden weight changes, no reasons to keep scrolling. The only people reading through are people already sold on Alex.

**Goal:** Turn every subpage into a scored sequence — rising and falling weight, one pull-quote moment mid-page, one rhythm break before the outro, and half the copy at double the voice.

**Voice direction for every copy rewrite in this plan:** Alex does not position himself as teaching abstract wisdom (no "judgment", no "discernment", no "the AI whisperer" framing). His work is **strategy-first, concrete, uncertainty-forward problem-solving**: overcoming blockades, fixing pain points, gaining efficiency, gaining quality, thinking critically, enhancing thinking — **always starting with the strategic question "what do you actually need?" before touching a tool.** Every proposed copy line in this plan must pass that filter. Lines that read like consulting platitudes or sound like the trainer has something the trainee lacks are wrong. Lines that read like "here's a better question to start with" are right. This note supersedes any earlier framing that leaned toward abstract-wisdom language.

**Non-goals (for this pass):**
- Not a rebrand. Colors, fonts, `#0000C5` accent all stay.
- Not a new JS stack. Existing GSAP ScrollTrigger primitives cover everything needed.
- Not touching `creative-building.html` — that's the Promptgorillas case study pass, separate plan.
- Not a positioning rewrite for `index.html` — that's the brand positioning pass, separate plan.

---

## Diagnosis (linking Alex's complaints to specific code)

| Complaint | Root cause | Files |
|---|---|---|
| "Boxes of text under boxes of text" on about | 4 `.rd-row` units (Reality/Scope/Origin/Method) all same weight, only one `.full-bleed-break` mid-page | `about.html:83–136`, `style.css:1555–1699` |
| Same on R&D, worse | **5 consecutive `.rd-row` units** with zero rhythm breaks. Worst plateau on the site. | `service-rd.html:78–125`, `style.css:1555–1699` |
| Podcast text "flooded next to box video and underneath buttons" | `.podcast-grid-act1` crams 117 words of intro prose next to a 1:1 logo video in a 6/5 split, AFTER the CTA buttons | `podcast.html:78–104`, `style.css:1728–1762` |
| "Text could be more pungent" | Body copy is consulting-voice: ~50–80 words/paragraph, heavy qualifiers, no point of view | All three pages |
| "Too little hierarchy" on podcast | Act 1 has no typographic hook between CTAs and the logo-video grid — the eye lands on buttons first, then a small label, then body copy | `podcast.html:87–96`, `style.css:2214–2219` |

---

## Primitives already in the codebase (reuse, don't reinvent)

These exist and are already scroll-animated. The plan uses each more deliberately.

- **`.monument-text` / `.typo-monument`** (`style.css:1764–1787`) — stroked 15rem display letters, full-width, scroll-parallax via `.monument-text` selector in `script.js:568–577`. New monuments reuse automatically.
- **`.full-bleed-break`** (`style.css:1789–1816`) — 75vh cinematic break, scroll-linked scale (`script.js:517–526`).
- **`.outro-statement` + `.outro-aside`** (`style.css:2252–2268`) — 4rem display statement + 1.25rem aside. Stays scoped to `.service-outro` as a closer; the new `.pull-quote` class will duplicate its scale values (see below) rather than alias.
- **`.typography-portal` / `.portal-marquee` / `.marquee-content`** — scroll-pinned horizontal ticker (index.html + `script.js:302–327`). **No `.about` scope exists** (verified via grep) — the CSS is already page-agnostic, and the background is `#050505` which matches subpages cleanly. Reusable **as-is on the CSS side**. The blocker is entirely on the JS side (see Primitive §2 below).
- **`.section-label`** (`style.css:1992–2000`) — small editorial numbering, already used on creative/podcast, will extend to about + R&D.
- **`.text-block` stagger reveal** (`script.js:497–514`) — any new `.text-block` gets the scroll-fade for free. Confirmed applies to new `.pull-quote` wrapped in `.text-block`.
- **`.rd-row` scroll-reveal** (`script.js:375–395`) — selector is bare `.rd-row`, so `.rd-row.inverted` inherits the slide-up-fade for free.

---

## New pacing primitives to add

Three small additions. Total ~80 lines of CSS + one targeted JS edit.

### 1. `.pull-quote` — mid-page display statement

One sentence, 2.5–4rem, weight 600, centered at `col 2 / span 10`, with an optional `.section-label` above and `.pull-quote-aside` below. Used **once per page** as the emotional peak before the outro.

**Implementation — duplicate, don't alias.** `.outro-statement` uses `!important` on font-size/line-height/weight/color/margin, and `.creative-page .outro-statement` at `style.css:2414–2419` overrides with weight 700 and a larger clamp via more `!important`. If `.pull-quote` is aliased (`.outro-statement, .pull-quote { ... }`) the creative-page override leaks. Safer: define `.pull-quote` as its own ~15-line block, copy the scale values, zero coupling.

Do **not** wrap mid-page pull-quotes in `.service-outro` — that triggers the `.about-page .service-outro { border-top, padding-top }` rule at `style.css:2246–2250`, which is wrong mid-page.

Scroll reveal: wrap each `.pull-quote` in `.text-block` so the existing `script.js:500` stagger picks it up. No new JS.

### 2. `.page-marquee` — lift the existing marquee to multi-page

**This primitive is primarily a JS change, not a CSS change.** The CSS (`.typography-portal`, `.portal-marquee`, `.marquee-content`) is already page-agnostic. The blocker is at `script.js:302–327`:

- Line 302: `document.querySelector('.marquee-content')` — **singular**. Only the first marquee on the page animates. A second instance on a subpage is silently dead.
- Line 319: `ScrollTrigger.create` for the `.pulse` effect is hardcoded to `.typography-portal`, also singular.

**Required change in Prompt A:** rewrite that block to `document.querySelectorAll('.marquee-content')` + `forEach`, and loop the `.pulse` ScrollTrigger over each `.typography-portal` ancestor. Preserve the existing homepage behavior — regression test is just "homepage marquee still pulses and pans on scroll after the change."

After the JS change, subpages reuse the markup verbatim:
```html
<section class="typography-portal">
  <div class="portal-marquee">
    <div class="marquee-content">SHAPE <span class="dot">•</span> DECIDE <span class="dot">•</span> LEARN …</div>
  </div>
</section>
```

Per-page words: About → `SHAPE • DECIDE • LEARN`. R&D → `CONTEXT • FOCUS • FORMAT`. Podcast → N/A this pass (Act 3 monument already handles the bottom rhythm).

### 3. `.rd-row.inverted` — one per page, subverts rd-row rhythm

A modifier that swaps the weight: title becomes small uppercase gray (1.25rem), body becomes display (2.5rem, weight 400). ~15 lines of CSS. Used once per page as the surprise beat after 2 standard rows. Inherits `.rd-row` scroll-reveal for free.

---

## Page-by-page restructure

### ABOUT page (`about.html`)

**Current structure (7 beats, flat):** header split → MANIFESTO monument → rd-row 01 Reality → rd-row 02 Scope (reversed) → full-bleed hosts → rd-row 03 Origin → rd-row 04 Method (reversed) → service-outro

**New structure (8 beats, weight variation):**

1. **Split header** — keep. H1 + portrait. No change.
2. **MANIFESTO monument** — keep. First rhythm beat.
3. **rd-row 01 Reality** — keep. Opening content.
4. **Pull-quote moment** — NEW. One sentence in `.pull-quote` capturing Alex's actual positioning: **not abstract wisdom, but strategy-first problem-solving that starts with "what do you actually need?" before touching a tool.** Small label `02 / POSITION` above. Three candidate lines for the user to pick from during Prompt B review:
    1. *"Most AI training teaches tools. I start with what you actually need."* (recommended — cleanest pivot, uses the user's own framing)
    2. *"Most AI training teaches tools. I teach what to ask first."*
    3. *"Tools are easy. The question behind them is the work."*

    **Critical structural requirement:** this MUST sit between two separate `.rd-grid` containers, not inside a single grid. The about-page asymmetric column rules at `style.css:1687–1698` use `:nth-child` selectors on `.rd-row` inside `.rd-grid`. Inserting a non-rd-row child into the same `.rd-grid` shifts the nth-child indexes and silently breaks the column math. **Fix:** close `.rd-grid` after row 1, emit the pull-quote, then reopen as `.rd-grid` for row 2. The plan already uses `.rd-grid-part2` later on the same page, so this is an established pattern.
5. **rd-row 03 Scope** (reversed) — keep. Content resumes.
6. **Full-bleed break** — keep. Hosts photo. Second rhythm beat.
7. **Page marquee** — NEW. `SHAPE • DECIDE • LEARN`. Third rhythm beat. Note: desktop stack is 75vh (full-bleed) + ~60vh (marquee) = ~135vh of back-to-back rhythm break. On mobile that drops to ~90vh. Needs a visual smoke-test but is intentional — two consecutive breaks create a hard reset before the personal-story beat.
8. **Inverted row 04 Origin** — `.rd-row.inverted`. This is where the film/rhetoric/business-strategy background lands. Inverted weight signals "pay attention, this is the real thing."
9. **rd-row 05 Method** (reversed, standard) — keep. Value Fit model beat.
10. **Elevated outro** — keep existing `.outro-statement`. Reword the aside so it calls back to the opening hero ("Shape ideas forward").

**Copy cut target:** ~40% reduction. Every surviving rd-row down to 1 tight paragraph. Pull-quote is one sentence.

### R&D page (`service-rd.html`)

Worst plateau on the site — 5 consecutive rd-rows, zero breaks, flat bare-`<p>` outro.

**Current structure (7 beats, all flat):** H1 + service-intro → rd-row 01 Context → rd-row 02 Focus → rd-row 03 Format → rd-row 04 Background → rd-row 05 Perspective → bare `<p>` outro

**New structure (8 beats, corrected merge scheme):**

1. **H1 + service-intro** — keep. Tagline "This work begins when the path isn't obvious yet." stays.
2. **rd-row 01 Context + Background (merged)** — the ground AND the credibility in one row. Why this merge (not Context+Focus as originally drafted): Context = what the work is about, Background = who Alex is. Together they form the single "ground + standing" beat. Focus and Format are totally different registers and are kept separate. One tight paragraph.
3. **Monument `UNCERTAINTY`** — NEW. Single-word `.typo-monument`. This is the R&D identity. Huge stroked letters, scroll-parallax.
4. **rd-row 02 Focus** (inverted, `.rd-row.inverted`) — the "diverse fields, first experiments to long-term thinking" content at display weight. Small title, big body.
5. **rd-row 03 Format** (standard, reversed) — "hands-on prototyping to strategic direction, workshops" beat. Returns to normal rhythm.
6. **Pull-quote moment — Perspective** — NEW. `.pull-quote` with label `04 / POV`. Condensed from the current row 5, but reworded to match Alex's strategy-first, uncertainty-working voice. Three candidate lines for Prompt C review:
    1. *"Workshops, consulting, and research aren't separate lanes. They're different ways to work through uncertainty."* (recommended — creates an explicit callback to the `UNCERTAINTY` monument earlier in the page)
    2. *"Workshops, consulting, and research aren't separate lanes. They're different ways to ask the same questions."*
    3. *"Before the method, the question. That's where the work starts."*
7. **Page marquee** — NEW. `CONTEXT • FOCUS • FORMAT`. Final rhythm break before outro.
8. **Elevated outro** — NEW. **Must** change the markup from the current bare `<p>` at `service-rd.html:128` to `<p class="outro-statement">` + `<p class="outro-aside">` pattern matching about. The current flatness is specifically because the markup is missing the class. This is a 2-line HTML change that unlocks the existing 4rem display styling for free.

**Explicitly NOT doing:** No mid-page `.full-bleed-break` on R&D. The `.article-banner` at the top already uses `IMG_0005_3_iy1hjr.jpg` — reusing it mid-page creates visual déjà-vu, and introducing a second workshop asset is out of scope. The monument + page-marquee + pull-quote trio carries the rhythm load without it.

**Copy cut target:** 5 rows → 3 rows + pull-quote. ~50% reduction in total words.

### PODCAST page (`podcast.html`)

Act 1 is the offender. CTAs fire before the narrative begins; the 1:1 logo video crowds the prose sideways.

**Current Act 1 structure:** H1 → service-intro → CTA buttons (Spotify + YouTube) → `.podcast-grid-act1` (text column + logo video column in 6/5 split)

**New Act 1 structure:**

1. **H1** — keep. `AI-Rated Podcast`
2. **New service-intro copy** — replace current "curiosity gets some room" line with Alex's own notes line: *"The fun AI podcast for Gen-Z."* Render at display weight (2rem clamp), styled like `.intro-block p` from about-header-split rather than the current 1.5rem `.service-intro`. Single line, no paragraph block.
3. **Move CTA buttons OUT of Act 1** — delete the `.platform-links-centered` block between service-intro and `.podcast-grid-act1`. The CTAs already reappear in Act 3 (`.podcast-closing`) which is the correct place for them. Buttons at the top were the emotional full-stop before the narrative started.
4. **Remove the logo video from Act 1's content flow — repurpose as a page-load preloader.** Delete `.podcast-grid-act1 .logo-video-col` and the surrounding `.podcast-grid-act1` wrapper from the Act 1 layout. The logo video gets repurposed as a one-time, session-scoped page-load preloader (see Prompt E). This is a cleaner fix than shrinking it inline, and it uses the logo as a *tone-setter* — the first thing you see is the AI-Rated identity playing once, then the page fades in underneath. It's the one-shot move that sets the emotional register before a single word of prose lands. Act 1 itself becomes pure text with no video competition.
5. **Full-width Act 1 copy** — cut from 117 words to ~50. Voice pulled from the podcast's actual tone. Proposed first pass for user review:
   > *"Morgan and I talk about AI the way it actually lands — messy, funny, sometimes embarrassing. No explainers. No hype. Some episodes circle around online weirdness. Most just try to be honest about what's changing."*
6. **Monument `LISTEN`** — keep. First rhythm beat.
7. **Full-bleed break (hosts photo)** — keep. Second rhythm beat.
8. **Pull-quote moment** — NEW. `.pull-quote` placed between full-bleed and episode list. One sentence: *"Five episodes. No pretense."* Small label `02 / EPISODES`. Replaces the current flat `.section-label + .section-title "Episodes"` heading with a pull-quote doing the same structural job but with weight.
9. **Episode list** — keep. Already the strongest block on the site.
10. **Podcast closing (PRESS PLAY + CTAs)** — keep. This is the button home.

**Copy cut target:** ~60% reduction in Act 1 copy. Plus the CTA and logo video deletions.

---

## Order of operations

Five prompts. Order matters — Prompt A installs the primitives the others depend on. Prompts A–D are the core pass; Prompt E is an additive enhancement (podcast preloader) that can ship on its own review cycle.

### Prompt A — Primitives (CSS + one JS change)
- Add `.pull-quote`, `.pull-quote-aside`, `.pull-quote .section-label` as a fresh CSS block (~15 lines, no aliasing).
- Add `.rd-row.inverted` modifier CSS (~15 lines).
- **JS edit in `script.js:302–327`**: swap `document.querySelector('.marquee-content')` to `document.querySelectorAll('.marquee-content')` + `forEach`; loop `.pulse` ScrollTrigger over each `.typography-portal` ancestor. Regression test: homepage marquee still pins and pulses.
- Bump `style.css?v=` and `script.js?v=` on index.html for the JS regression check.
- **Risk: low.** Additive CSS + one localized JS refactor.

### Prompt B — About page restructure
- Apply new structure: pull-quote between two split `.rd-grid` containers, inverted row for Origin, page-marquee between full-bleed and second grid.
- Rewrite body copy per cut targets.
- Add `.section-label` to each row.
- Bump versions.
- **Risk: medium.** The nth-child grid split is the one thing to get right on the first try; the rest is additive.

### Prompt C — R&D page restructure
- Merge Context+Background → row 1. Keep Focus as inverted row 2. Keep Format as row 3. Perspective becomes pull-quote.
- Insert monument `UNCERTAINTY` after row 1. Insert pull-quote after row 3. Insert page-marquee after pull-quote.
- **Fix the outro markup** from bare `<p>` to `<p class="outro-statement">` + `<p class="outro-aside">`.
- Rewrite body copy per cut targets.
- Bump versions.
- **Risk: medium.** Biggest content restructure. 5→3 collapse needs user signoff.

### Prompt D — Podcast Act 1 fix
- Delete `.platform-links-centered` top CTAs, delete `.podcast-grid-act1` entirely (including logo video markup), restructure to full-width prose.
- Replace service-intro line with "The fun AI podcast for Gen-Z."
- Insert pull-quote before episode list.
- Rewrite Act 1 copy.
- Bump versions.
- **Risk: low.** Clean deletions rather than rearrangement. Ships as a complete fix even if Prompt E is deferred or rolled back.

### Prompt E — Podcast page-load preloader (additive enhancement)
Reframes the logo video as a one-shot tone-setter before the page content appears.

**What it does:**
- On first load of `podcast.html` in a session, show a full-viewport overlay `#podcast-preloader` with a centered square playing the existing `LOGO_w33ofq.mp4` video (muted, autoplay, playsinline, `preload="auto"`).
- Underneath, the page renders hidden (`body.preloader-active` sets opacity 0 on `main`).
- After ~1.5–2.0 seconds (or `loadedmetadata` + video `ended` / a hard max timeout, whichever comes first), the overlay fades out and the page fades in via GSAP.
- Session storage key `airated_preloader_seen` is set to `true` — subsequent navigations within the same tab skip the preloader entirely (no one wants to watch a logo twice).
- `prefers-reduced-motion: reduce` → skip the preloader entirely, render the page immediately.
- Click/tap/scroll/Escape inside the preloader also skips it early.

**Files:**
- `podcast.html` — add `<div id="podcast-preloader" class="preloader-overlay">...</div>` as the first child of `<body>`, inside a `<noscript>`-guarded wrapper so JS-disabled visitors still see the page. Conditionally add `class="preloader-active"` to `<body>` via a tiny inline script that checks `sessionStorage` and `prefers-reduced-motion` before first paint.
- `style.css` — new `.preloader-overlay` block: fixed full-viewport, `#050505` background, centered 50vmin square video, z-index above everything, opacity transition via class toggle. `body.preloader-active main { opacity: 0; }`. Respects reduced motion via `@media (prefers-reduced-motion: reduce) { .preloader-overlay { display: none; } body.preloader-active main { opacity: 1; } }`.
- `script.js` — new self-contained `initPodcastPreloader()` function that runs only on podcast.html (check for `#podcast-preloader`). Handles the fade timing, session storage, skip interactions. No new GSAP patterns — reuses `gsap.to` / `gsap.set`. No new dependencies.

**Timing discipline:**
- Hard max visible duration: 2.0s. No exceptions. A preloader that lasts longer reads as a bug.
- Crossfade: 0.4s out on overlay, 0.6s in on `main`, slightly overlapping.
- If the video hasn't loaded metadata within 500ms, skip the preloader entirely (poor connection = don't punish the user).

**Accessibility & safety:**
- `prefers-reduced-motion: reduce` → full skip.
- Escape key, click, tap, scroll → early dismiss.
- No audio. (Video is already muted.)
- Focus management: after dismiss, focus lands on `<main>` for keyboard users.
- `aria-hidden="true"` on the preloader; the fade-in on `main` is purely visual.

**Risk: medium.** Preloaders are an easy own-goal — too long, too late, or broken on slow connections and they kill the site instead of setting the tone. Mitigated by hard-capping duration, respecting reduced motion, session-scoping to first visit only, and making it a separate prompt so Prompt D ships first as a complete fix without it. If the preloader fails review, remove the three additions (HTML block, CSS block, JS function) and Prompt D's state is unchanged.

**Open question:** should the preloader show on **every** podcast page visit (fresh tab only — current recommendation) or **first visit ever** to the podcast page across sessions (`localStorage` instead of `sessionStorage`)? Recommendation: `sessionStorage` — a returning visitor in a new tab is a new "session" with fresh energy to re-establish tone, but within one browsing session you don't watch the same loop twice.

---

## Critical files to modify

- **`style.css`** — new `.pull-quote` block (append at end, duplicate scale values, no aliasing), new `.rd-row.inverted` modifier, new `.preloader-overlay` block for Prompt E. No changes to existing `.outro-statement`, `.typography-portal`, or asymmetric nth-child rules.
- **`script.js`** — Prompt A: lines 302–327 marquee `querySelector` → `querySelectorAll` + `forEach` + per-instance ScrollTrigger loop. Prompt E: new self-contained `initPodcastPreloader()` function, called only when `#podcast-preloader` exists in the DOM.
- **`about.html`** — restructure lines 83–136 (split `.rd-grid` around pull-quote, add marquee, inverted modifier on Origin row, add section-labels, copy rewrite).
- **`service-rd.html`** — restructure lines 78–130 (merge to 3 rows, insert monument, insert pull-quote, insert marquee, fix outro markup at line 128, copy rewrite). Biggest surgery of the pass.
- **`podcast.html`** — Prompt D: delete Act 1 CTAs and logo-video grid at lines 78–104, new full-width prose, insert pull-quote before `.podcast-episodes` at line 114, replace service-intro line. Prompt E: add `<div id="podcast-preloader">` as first body child with inline pre-paint script for session-storage + reduced-motion checks.

---

## Verification

No test suite, no running server. Verification is visual and manual.

1. **After Prompt A:** load homepage, confirm the marquee still pins and pulses (JS regression). Scroll past `.typography-portal` and confirm `.pulse` class still animates. If any other page is loaded that has a new marquee, confirm it animates independently of the first.
2. **After each page restructure prompt:** scroll the affected page top to bottom and check:
   - Each rhythm break fires its scroll-reveal (monument parallax, full-bleed scale, marquee pin + pulse, pull-quote fade).
   - The page no longer reads as "grid of equal rows" — rising/falling weight is visible as you scroll.
   - No horizontal scroll at any viewport introduced by `.page-marquee`.
   - Mobile (<768px) stacks correctly; `.rd-row.inverted` and `.pull-quote` don't break the flex fallbacks.
3. **Read the copy aloud.** If any paragraph takes more than one breath, it's still too long.
4. **Time-to-scan test.** A stranger should scan the whole page in ≤15 seconds and come away with (a) what Alex does and (b) his tone. If they can't, the pull-quote isn't pulling its weight.
5. **Firebase deploy** after each prompt, smoke-test the live URL.

For future visual work a `.claude/launch.json` could be added so `preview_start` works — out of scope this pass but worth noting as a one-time setup.

---

## Decisions locked (resolved with user before plan finalized)

1. ✅ **R&D cut: 5 rows → 3 rows + pull-quote.** Row 1 = Context + Background (ground + credibility). Row 2 = Focus (inverted). Row 3 = Format. Pull-quote = Perspective.
2. ✅ **Podcast logo: repurposed as page-load preloader (Prompt E).** Removed from Act 1 content flow entirely. Preloader is additive — Prompt D ships complete without it.
3. ✅ **Podcast subtitle voice: "The fun AI podcast for Gen-Z."** Commits to the new voice, throws away "curiosity gets some room."
4. ✅ **Copy rewrite latitude: full rewrite.** Each page goes back to the user for line-edits before ship. Proposed copy marked as "PROPOSED — line-edit before ship" in each prompt.
5. ✅ **No new assets required.** R&D mid-page full-bleed is dropped. Preloader reuses the existing `LOGO_w33ofq.mp4`.

## Open question (flagged inside Prompt E)

- **Preloader scoping: sessionStorage vs. localStorage.** Recommendation: `sessionStorage` — preloader runs once per browsing session, not once per lifetime. A returning visitor in a new tab should get the tone-setter again; a visitor clicking back-and-forth within one session should not. Confirm during Prompt E review.

---

## What this plan explicitly does NOT do

- Touch creative-building.html (Promptgorillas case study pass, separate plan)
- Rewrite index.html hero/about (positioning pass, separate plan)
- Add JS dependencies or new animation systems
- Change colors, fonts, or `#0000C5` accent discipline
- Modify nav, footer, or homepage service cards
- Add a case studies page

---

## Success criteria

When the pass is complete, scrolling top-to-bottom on about.html, service-rd.html, or podcast.html should feel like **reading a scored piece of music**: intro → content beat → rhythm break → content beat → pull-quote climax → outro. Not like scrolling through a Notion page of modular rows.

Single-sentence test: *"If I deleted everything on this page except the pull-quote, does the page still communicate Alex's point of view?"* If yes, the pacing is working.

---

## Execution log (update after each prompt ships)

- **Prompt A —** Not started. (Was mid-execution but paused to formalize the plan into this document first.)
- **Prompt B —** Not started. Blocked on Prompt A.
- **Prompt C —** Not started. Blocked on Prompt A. User sign-off needed on merge scheme.
- **Prompt D —** Not started. Blocked on Prompt A.
- **Prompt E —** Not started. Blocked on Prompt D; additive, can ship separately.

---

## Iteration notes (for future agent runs)

This plan is meant to be refined between runs, not executed blindly. Good ways to iterate on it:

- **Between Prompt A and Prompt B:** after the primitives ship, load about.html in the browser and ask an agent to re-read this plan + the live page and propose adjustments to the About restructure based on how the existing page actually renders at your current viewport. The structural moves may need tweaking based on what you see.
- **Between Prompt B and Prompt C:** after About ships, the page-marquee and pull-quote primitives are now *visible*. Ask an agent to re-read the R&D section here and pressure-test whether the proposed `UNCERTAINTY` monument still feels right, or whether a different word (e.g. `QUESTIONS`, `WORK`, `OPEN`) fits better given the voice direction. Also a good point to lock in the R&D copy rewrite with a copy-focused pass before Prompt C ships.
- **Before Prompt E:** once Prompt D has shipped and the Act 1 layout is clean, the preloader decision becomes more concrete. Load the page, feel whether it "needs" a tone-setter or whether the new clean Act 1 already carries the identity. The preloader is worth doing *only* if the page still feels under-identified without it.
- **Voice drift check:** the "strategy-first, not abstract wisdom" voice direction at the top of this plan is load-bearing. Every copy rewrite should be checked against it. If a later agent proposes a line that reads like consulting sincerity, correct it and update this plan's voice direction note with whatever new framing the correction reveals.
