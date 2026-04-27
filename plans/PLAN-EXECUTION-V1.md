# PLAN EXECUTION V1 — The Master Plan

> **Status:** Ready to ship. This plan synthesizes PLAN-NARRATIVE-PACING.md, PLAN-WEBSITE-OVERHAUL.md, DESIGN-UX-QUICK-WINS.md, plus the user's latest direction. It takes positions where those plans conflict.
> **Scope:** Whole site. All five pages.
> **North star:** Every change has to pass one test. *"Why should somebody care?"* If a section does not answer that in its first two seconds, it needs rewriting or cutting.
> **Intended workflow:** Phase 1 ships right now as soon as it is approved. After Phase 1 lands in the browser, we come back and iterate on Phase 2 with fresh eyes. We do not plan past the current phase in detail.

---

## Writing constraints (applied throughout this plan and all copy proposals)

1. **No em dashes.** Anywhere. Use periods, commas, colons, parentheses, or "and" / "but" instead.
2. **Content placeholders** wherever Alex should supply the real words. Format: `[CONTENT: prompt telling Alex what story beat to fill in]`. Example: `[CONTENT: one specific client moment where someone was using a tool without asking the real question. Two or three sentences, in your own voice.]`
3. **Media placeholders** wherever Alex should supply the final asset. Format: `[MEDIA: description of what the asset should be, what format, where it comes from]`. Example: `[MEDIA: Promptgorillas hero video or still image, the one currently running on their site. Landscape 16:9, around 6 seconds if video. Upload to Cloudinary, swap URL into the src attribute.]`
4. **No consulting platitudes.** The voice is strategy-first and specific. Lines that sound like the trainer has something the trainee lacks get cut. Lines that read like "here is a better question to start with" get kept.
5. **Concrete over abstract.** Whenever there is a choice between a general claim and a named example, the named example wins. "I've worked with teams across sectors" loses to "Last month at Promptgorillas we cut their content cycle from two weeks to three days."

---

## Extra positioning context locked in this round

From the user's latest message, two things need to shape every decision going forward:

1. **Dual positioning is real.** Alex is considering running one day a week as an independent AI visuals and pipeline service. So the site does not just position him as a trainer who also experiments visually. It positions him as a trainer *and* a commercial visual producer. That means the Creative Building page earns a CTA that says "book me for this," not just "see what I made."
2. **Podcast subtitle is locked.** "We are the fun AI podcast." No "Gen-Z" for now. Can be revisited later.

---

## Decisions taken after reviewing all three plans

Where the three source plans conflicted, here is the call:

| Question | Decision | Why |
|---|---|---|
| Keep or cut the MANIFESTO monument on About? | **Cut.** | User has flagged "AI-like cringe" tone. Replace with a pull-quote that earns the weight via content, not with a label that announces importance. |
| Keep or cut the podcast Act 1 preloader? | **Cut.** | Too much risk for the payoff. Preloaders break in edge cases. The logo video moves to the Act 3 PRESS PLAY block instead as a small visual mark next to the closing CTA. Simpler, existing pattern, zero new infrastructure. |
| Podcast subtitle voice? | **"We are the fun AI podcast."** | User locked. Gen-Z optional later. |
| Typing animation on homepage hero subtitle? | **Replace with rotating word in a fixed frame.** | Typing is 2019 vibe. Rotating words in a sentence frame feels alive without feeling template. Alex picks the exact variant from three options below. |
| "Let's Evolve" homepage CTA? | **Replace.** | Vague motivational line. Use something concrete about the work starting from a question. |
| Site-wide THINK / DECIDE / CREATE framework spine? | **No.** | Keep the existing homepage marquee, but do not force every subpage to map to one of the three words. Each subpage gets its own marquee words. Cohesion comes from visual language and voice, not from imposing a framework. |
| Service cards: Option A (architectural CSS polish) or Option B (full-width alternating rows)? | **Option A first.** | Ships in one CSS prompt, low risk. If cards still feel stickery after removing border-radius, adding dividers, staggering heights, then Option B. Do not commit to B until A is in the browser. |
| R&D 5 rows to 3 rows merge? | **Yes. Locked last round.** | Context plus Background for row 1. Focus inverted for row 2. Format for row 3. Perspective becomes pull-quote. |
| Cinematic asymmetric full-bleed on Creative Building? | **Preserve.** | User explicitly said they love this. Do not touch. |
| Creative Building client work section? | **Add. With placeholders.** | User is shipping real work for Promptgorillas and Chris le More. This is the single biggest credibility upgrade on the whole site. Ship as placeholders first, swap in real assets when Alex supplies them. |

---

## Execution order: seven phases

Each phase is one prompt. Execute one, review in browser, come back for the next. Do not chain multiple phases in one prompt.

### Phase 1 — Text and proof quick wins (ships now, ~30 min, zero structural risk)

Pure copy changes, one tiny markup fix, no CSS, no JS restructure. Highest impact per minute on the site.

1. **Homepage hero subtitle.** Replace typing animation with a rotating-word pattern. Three variants proposed for Alex to pick:
   - Variant A: `For teams that want to [think / decide / create] with AI.` (echoes the homepage marquee's THINK DECIDE CREATE)
   - Variant B: `I [train / build / ship] with AI.` (most direct on dual positioning)
   - Variant C: `AI [training / consulting / visuals] for teams that actually ship.` (most commercial, closest to real service list)
2. **Homepage about section.** Rewrite the two paragraphs under `01 / WHO IS ALEX?` to answer "why should someone care" before "who is Alex." Proposed copy with placeholder:
   > `AI is everywhere and most teams are guessing. I help professionals stop guessing. Through training, strategic consulting, and hands-on visual production.`
   >
   > `[CONTENT: one concrete sentence about a current client engagement. For example: "Currently embedded as AI trainer and visual producer at Promptgorillas." Or your own preferred framing of where you are actively shipping work right now.]`
3. **Homepage contact CTA.** Replace `Let's Evolve.` with something concrete. Proposed: `Let's talk about what you actually need.` Ties back to the voice direction from PLAN-NARRATIVE-PACING.
4. **R&D proof point.** Add one line inside `.service-intro` or the first `.rd-row`:
   > `[CONTENT: one sentence naming the current client and what is being delivered. Proposed starting draft: "Currently embedded as AI trainer and visual producer at Promptgorillas, running workshops, building brand assets, and shaping their AI adoption strategy." Rewrite to match your voice and actual scope of engagement.]`
5. **R&D outro markup fix.** Current bare `<p>` at `service-rd.html:128` changes to `<p class="outro-statement">` plus `<p class="outro-aside">` pair. This unlocks the existing 4rem display styling for free. One proposed pair with content placeholder:
   > `<p class="outro-statement">[CONTENT: the outro statement you want here. Proposed: "I step in when things are still forming. When teams are asking what is possible and where to go next."]</p>`
   > `<p class="outro-aside">[CONTENT: a short aside. Proposed: "If that sounds familiar, we will probably have a good conversation."]</p>`
6. **Podcast subtitle.** Replace current `service-intro` text with `We are the fun AI podcast.` Render at display weight, not body weight.
7. **MANIFESTO monument on About page.** Delete. Do not replace. Keep the scroll spacing tight but let the content carry the weight. The pull-quote added in Phase 4 will take the emotional slot MANIFESTO was filling.

**Risk:** Near zero. Text changes and one markup fix.

---

### Phase 2 — Design polish (CSS only, Tier 1 from DESIGN-UX-QUICK-WINS, ~20 min)

All additive CSS changes. No structural changes. Combined they shift the site from "well designed" to "considered." Shipping them together is fine because they do not interact.

1. **Kill the floating animation on service cards.** Override `.service-card.floating { animation: none; }`. The constant bob makes cards feel like stickers. Grounded cards feel architectural.
2. **Soften the service card image filter.** From `grayscale(80%) brightness(0.6) contrast(1.1) sepia(20%)` to `grayscale(60%) brightness(0.7) contrast(1.05) sepia(10%)`. Resting state becomes readable without losing the reveal on hover.
3. **Banner top vignette.** Extend the `.article-banner::after` gradient to fade from the top as well as the bottom. Blends the fixed nav into the hero image on all subpages.
4. **Widen service-intro to breathe.** Change `grid-column: 3 / span 8` to `grid-column: 2 / span 10` and bump to `1.75rem`. The intro line becomes a statement, not a caption.
5. **Mute About page body text.** Scoped override: `.about-page .rd-row .text-content p { font-size: 1.3rem; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.75; }`. Gives the blue section-title more room to punch.
6. **Consistent portrait border-radius.** `.about-portrait img { border-radius: 24px; }`. Replaces the lone capsule shape with the site's standard 24px.
7. **Visual-hook shadow cleanup.** Replace blue glow with dark shadow: `box-shadow: 0 20px 80px rgba(0,0,0,0.6);`. Fixes an off-system detail where `#0000C5` was being used as a glow instead of decoration.
8. **Homepage section dividers.** `1px` borders between major sections. Adds structural chapters.
9. **Larger card-index numbers on service cards.** Move to top-left at `clamp(60px, 8vw, 120px)` in `rgba(0,0,197,0.3)`. Editorial numbered entries instead of corner stickers.
10. **Service card Option A polish.** Remove border-radius, remove gap, add thin separators between cards, stagger heights (560 / 480 with margin-top 80 / 520 with margin-top 40). Cards become editorial grid panels.

**Risk:** Zero. Pure CSS value changes and one small HTML element (`border-top` on sections already exists via section classes; just add the visual).

---

### Phase 3 — Narrative primitives (CSS block plus one targeted JS refactor)

Exactly what the original PLAN-NARRATIVE-PACING Prompt A called for. Unlocks Phases 4, 5, 6.

1. **Add `.pull-quote` CSS block.** Standalone class, duplicating `.outro-statement`'s scale values. No aliasing. Handles `.pull-quote .section-label`, `.pull-quote p`, `.pull-quote .pull-quote-aside`. Details locked in PLAN-NARRATIVE-PACING section on Primitives.
2. **Add `.rd-row.inverted` modifier.** Small title, big body, for one surprise beat per page.
3. **Add horizontal rule separators between rd-rows.** `rd-row + rd-row { border-top: 1px solid rgba(255,255,255,0.08); }`. This already exists at `style.css:1675`. Confirm it is present and not broken by any override. No change needed if present.
4. **Marquee JS refactor.** `script.js:302-327`. Change `querySelector` singular to `querySelectorAll` plus `forEach`. Loop the `.pulse` ScrollTrigger over each `.typography-portal`. Regression test: homepage marquee still pins and pulses.

**Risk:** Low. Additive CSS plus one localized JS refactor.

---

### Phase 4 — About page restructure

Full restructure. Follows PLAN-NARRATIVE-PACING structure with MANIFESTO deletion from Phase 1 already applied.

1. **Keep the split header** (H1 plus portrait). No change.
2. **Row 01: Reality.** Standard rd-row. Copy placeholder:
   > `[CONTENT: one concrete example of teams using AI tools without the strategic question. The Notion/Miro moment, the Promptgorillas lesson, or any client scene where the tool worked but the thinking didn't. Two or three sentences in your voice. Do not start with "I help."]`
3. **Pull-quote moment.** Label `02 / POSITION`. Three candidate lines, Alex picks:
   - Candidate A: `Most AI training teaches tools. I start with what you actually need.` (recommended, cleanest pivot)
   - Candidate B: `Most AI training teaches tools. I teach what to ask first.`
   - Candidate C: `Tools are easy. The question behind them is the work.`
   
   Structural requirement: pull-quote lives between two separate `.rd-grid` containers. Close the first grid after Reality, emit the pull-quote, reopen a new grid for Scope onward. This preserves the nth-child column math at `style.css:1687-1698`.
4. **Row 03: Scope.** Reversed rd-row. Copy placeholder:
   > `[CONTENT: name one outcome, not a sector list. For example: "At Promptgorillas we cut the content production cycle from two weeks to three days. Not by adding more AI. By rethinking what they actually needed to produce." Use your real numbers and your real client if you are comfortable. If not, describe one specific shift you saw in a session.]`
5. **Full-bleed break.** Keep. Hosts photo.
6. **Page marquee.** `SHAPE • DECIDE • LEARN` cycling across. Uses the primitive from Phase 3.
7. **Row 04: Origin** (inverted). This is the film plus rhetoric plus business-strategy beat. Copy placeholder:
   > `[CONTENT: a narrative, not a CV. Starting draft for you to rewrite: "I did not come to AI through computer science. I came through film, where I learned that what you leave out matters more than what you show. Through rhetoric, where I learned that how you frame a question determines the answer. Through business strategy, where I learned that most AI strategies are technology strategies that forgot to start with the business problem." Edit for your voice, your specific frame.]`
8. **Row 05: Method.** Reversed rd-row. Copy placeholder:
   > `[CONTENT: explain Value Fit concretely in one sentence. Proposed starting draft: "The Value Fit model is a framework I built during my cum laude thesis to answer one question: where does AI actually fit your goals, and where are you forcing it?" Rewrite in your voice. Half-explaining the model is worse than not mentioning it, so commit to a one-sentence explanation or cut it.]`
9. **Elevated outro.** Keep existing `.outro-statement` structure. Reword aside to call back to "Shape ideas forward." Placeholder:
   > `<p class="outro-statement">[CONTENT: your real closing line. Starting draft: "I am interested in the practical, often messy work of figuring out what's next, without pretending it's simple."]</p>`
   > `<p class="outro-aside">[CONTENT: a callback. Starting draft: "Shape ideas forward. That is the whole job."]</p>`

**Copy cut target:** ~40% reduction overall.

**Risk:** Medium. The nth-child grid split is the single landmine. Verify column placement visually right after this prompt ships.

---

### Phase 5 — R&D page restructure

The 5-to-3 collapse. Content is locked at the structural level. Placeholders for all copy.

1. **Header.** H1 plus `service-intro` with the Promptgorillas proof line already added in Phase 1.
2. **Row 01: Context plus Background (merged).** Standard rd-row. Copy placeholder:
   > `[CONTENT: one paragraph merging what the work is about with who Alex is. Proposed starting draft: "Most teams see the potential of AI but cannot turn it into action. I help define the groundwork. My background is not technical by default. I studied film, rhetoric, and business strategy, where I learned how meaning is shaped and how markets change. That perspective turned out to be essential for AI work." Rewrite tight.]`
3. **Monument `UNCERTAINTY`.** Single-word `.typo-monument`. Stroked letters, scroll parallax.
4. **Row 02: Focus** (inverted). Small title, big body. Copy placeholder:
   > `[CONTENT: one short paragraph at display weight. Proposed starting draft: "I work across sectors. From corporates and government to education and creative industry. The work moves from first experiments to long-term thinking, weighing quick wins against reliable implementation." Keep it short. Big font needs short copy.]`
5. **Row 03: Format** (standard, reversed). Copy placeholder:
   > `[CONTENT: one paragraph on the shape of the work. Starting draft: "The work ranges from hands-on prototyping to setting strategic direction. Workshops give teams the shared language and tools they need to take charge of AI in their day-to-day work."]`
6. **Pull-quote moment: Perspective.** Label `04 / POV`. Three candidate lines, Alex picks:
   - Candidate A: `Workshops, consulting, and research aren't separate lanes. They're different ways to work through uncertainty.` (recommended, callback to UNCERTAINTY monument)
   - Candidate B: `Workshops, consulting, and research aren't separate lanes. They're different ways to ask the same questions.`
   - Candidate C: `Before the method, the question. That is where the work starts.`
7. **Page marquee.** `CONTEXT • FOCUS • FORMAT` cycling across. Uses the primitive from Phase 3.
8. **Elevated outro.** Already fixed in Phase 1 with proper markup. Content stays from Phase 1 unless Alex wants to rewrite here.

**Risk:** Medium. Biggest content restructure. Five existing rd-rows get consolidated into three plus a pull-quote.

---

### Phase 6 — Podcast Act 1 cleanup

No preloader. Logo video moves to Act 3 as a small visual mark.

1. **H1.** Keep `AI-Rated Podcast`.
2. **New service-intro.** `We are the fun AI podcast.` Display weight (2rem clamp), styled like `.intro-block p` from the about-header-split. Single line.
3. **Delete the top CTA buttons.** The `.platform-links-centered` block between service-intro and the Act 1 grid gets removed entirely. The CTAs already live in the Act 3 closing where they belong.
4. **Delete the podcast-grid-act1 wrapper and the logo-video-col.** Act 1 becomes full-width prose.
5. **Full-width Act 1 copy.** Cut from 117 words to around 50. Copy placeholder:
   > `[CONTENT: rewrite the intro in the podcast's actual voice. Starting draft: "Morgan and I talk about AI the way it actually lands. Messy, funny, sometimes embarrassing. No explainers. No hype. Some episodes circle around online weirdness. Most just try to be honest about what's changing." Adjust for your voice. Mention Morgan by name because that creates warmth instantly.]`
6. **Monument `LISTEN`.** Keep.
7. **Full-bleed break with hosts photo.** Keep.
8. **Pull-quote before episode list.** One sentence. Label `02 / EPISODES`. Proposed:
   > `Five episodes. No pretense.`
   
   Or alternatives:
   > `Five episodes. Morgan and Alex. No pretense.`
   > `[CONTENT: your own one-liner that tees up the episode list. Has to be short enough to render at 3rem and still fit a line.]`
9. **Episode list.** Keep. Already strong.
10. **Podcast closing (Act 3).** Keep PRESS PLAY monument plus CTAs. Add the logo video here as a small inline visual mark somewhere in the closing block. Proposed position: a 120px square above the "New episodes monthly" text, centered. It becomes a signature sign-off rather than a crowded Act 1 element.

**Risk:** Low. Mostly clean deletions and one small addition at the bottom.

---

### Phase 7 — Creative Building "In Production" section

This is the single biggest credibility upgrade on the whole site. Adds a named client work section to the page that currently shows only personal experiments. Preserves the full-bleed cinematic showcase with asymmetric cut-off (user locked this).

**Where it sits:** After the existing Act 2 (cinematic showcase plus Application section), before the closing outro. Existing pacing stays. New section slots in.

**Structure:**

```
Section label: 04 / IN PRODUCTION
Section title: In production
Brief one-line intro: [CONTENT: one line about the commercial side of this work. Proposed: "Currently building AI visual systems and pipelines for brands that want a distinct visual world." Rewrite for voice.]

Grid of 2 to 3 client cards. Each card:
- Client name (e.g. Promptgorillas)
- Role delivered in one line (e.g. "AI hero videos, brand visuals, and marketing content")
- Hero image or short video loop from the actual work
- Optional: link to live usage
```

**Proposed client cards (placeholders for media):**

Card 1: Promptgorillas
- Name: `Promptgorillas`
- Role: `[CONTENT: one line describing what you deliver for them. Starting draft: "AI hero videos and brand visuals currently running on their website and marketing." Rewrite for accuracy.]`
- Media: `[MEDIA: one of the hero videos or still images you made for Promptgorillas that is currently live. Landscape or square format both work in this grid. Upload to Cloudinary, paste URL.]`
- Link: `[CONTENT: optional URL. Could be the Promptgorillas homepage, or a specific LinkedIn post, or their case page.]`

Card 2: Chris le More
- Name: `Chris le More`
- Role: `[CONTENT: one line on the AI shots you have shipped for the clothing brand. Starting draft: "AI-generated campaign visuals for the clothing line." Rewrite for accuracy.]`
- Media: `[MEDIA: one of the AI shots you delivered to Chris le More. Portrait or square. Upload to Cloudinary, paste URL.]`
- Link: `[CONTENT: optional URL or Instagram handle.]`

Card 3 (optional, only if there is a third worth showing)
- `[CONTENT: a third client or self-initiated brand project. Same pattern. Only include if it meets the quality bar of the first two. Do not pad.]`

**Booking CTA at the bottom of the section:**

`[CONTENT: one line inviting visitors to book Alex for AI visual work. Starting draft: "Available one day a week for independent visual work. If you want a brand world instead of another stock image, let's talk." Adjust the cadence. The "one day a week" detail is a strong signal of scarcity and seriousness if you want to include it. Alternatively, leave the day-per-week commitment off until you have fully decided.]`

CTA button links to the mailto or contact anchor.

**HTML pattern:** Reuse `.services-grid` and `.service-card` from index.html. Same scroll reveal. No new CSS needed beyond very minor scoping.

**Risk:** Low structurally. Blocked on Alex uploading 2 to 3 client work images/videos to Cloudinary. Can ship with placeholder images first (use existing Cloudinary URLs temporarily) and swap in real assets when ready.

---

## Primitives index (cross-phase reference)

What gets added once, used everywhere.

### CSS additions (Phase 3)

- `.pull-quote` block (~40 lines, duplicates `.outro-statement` scale, no aliasing)
- `.pull-quote-aside`, `.pull-quote .section-label`, mobile overrides
- `.rd-row.inverted` modifier (~25 lines with mobile)

### JS change (Phase 3)

- `script.js:302-327` marquee refactor. `querySelector` to `querySelectorAll`, loop everything per portal instance.

### Design polish (Phase 2)

- Kill floating animation on service cards
- Softer service card image filter
- Banner top vignette extension
- Wider service-intro
- Muted about body text
- Consistent portrait border-radius
- Dark shadow on visual-hook
- Homepage section dividers
- Larger accent card-index numbers
- Service card Option A (no border-radius, separators, staggered heights)

---

## Placeholders index (all content + media that Alex owns)

Quick reference so Alex can work through these in one batch between sessions.

**Phase 1:**
- Homepage hero subtitle: pick rotating word variant A, B, or C
- Homepage about paragraph 2: one concrete sentence about a current engagement
- R&D proof line: confirm or edit the starting draft about Promptgorillas
- R&D outro: confirm or edit the outro-statement plus outro-aside pair
- Podcast subtitle: confirmed, "We are the fun AI podcast"

**Phase 4 (About):**
- Reality row body: the concrete client example
- Pull-quote: pick candidate A, B, or C
- Scope row body: the one named outcome (e.g., Promptgorillas cycle time)
- Origin row body: the narrative of film + rhetoric + business
- Method row body: the one-sentence Value Fit explanation or cut the mention
- Outro statement: closing line
- Outro aside: callback to "Shape ideas forward"

**Phase 5 (R&D):**
- Context + Background merged paragraph
- Focus inverted paragraph (must be short, display weight)
- Format paragraph
- Pull-quote: pick candidate A, B, or C

**Phase 6 (Podcast):**
- Act 1 copy rewrite (around 50 words)
- Pull-quote before episodes: confirm "Five episodes. No pretense." or write own

**Phase 7 (Creative Building):**
- In Production intro line
- Card 1 (Promptgorillas): role line + media asset + optional link
- Card 2 (Chris le More): role line + media asset + optional link
- Card 3 (optional): name + role line + media asset + optional link
- Booking CTA: confirm or edit the "one day a week" draft

---

## What this plan explicitly does NOT do (deferred to future iterations)

- **Full homepage positioning rewrite.** Current hero ("SHAPE IDEAS FORWARD") stays. Only the subtitle underneath changes in Phase 1. A full brand positioning pass is a separate future plan.
- **Full-width service rows (Option B).** Defer until after Option A is in the browser. Decide then.
- **Site-wide framework spine labels** (THINK / DECIDE / CREATE attached to each subpage). Cohesion comes from voice and visual language. No forced mapping.
- **Dedicated case studies page (`/case-studies/`).** The Creative Building "In Production" section in Phase 7 is the minimum viable version. A separate page happens later if the volume grows.
- **Podcast preloader.** Cut. Logo video lives in Act 3 closing instead.
- **Parallax on podcast break image and creative break video** (DESIGN-UX-QUICK-WINS 2.4). Nice-to-have, not blocking. Add after Phase 6 if time.
- **About h2 scale-on-scroll and About portrait entrance animation** (DESIGN-UX-QUICK-WINS 2.3 and 2.5). Additive polish. Add after Phase 4 if time.

---

## Success criteria

When this plan is shipped end to end, these should be true:

1. **A stranger scans the homepage in ten seconds** and leaves with: this person trains teams on AI, builds AI visuals commercially, runs a podcast. No brochure copy. No mystery.
2. **Every subpage has at least one proof point.** A client name, a named outcome, a specific example.
3. **Scrolling any subpage feels like reading a scored sequence.** At least one pull-quote, one monument, one marquee, one full-bleed. No plateau of equal-weight rows.
4. **The Creative Building page makes a visitor want to hire Alex.** They see actual client work, not just experiments. There is a clear "book me" CTA.
5. **No page reads like a CV.** Every page opens with a hook that earns the visitor's attention before describing Alex.
6. **No em dashes in the shipped copy.** Verified by a grep pass before going live.

---

## The single-sentence check to apply to every change

*If I cut the paragraph I just wrote, would the page still communicate something a stranger would care about?*

If yes, the paragraph was padding and should probably be cut.
If no, the paragraph is doing real work and should stay.

---

## Foundation tune-ups (V96, between Phase 3 and Phase 4)

Before Phase 4 begins, user requested four foundational changes that affect every subsequent page. These shipped as a single tune-up pass:

1. **Brand accent color changed from `#0000C5` to `#BFE8F8`.** Global find-and-replace in style.css: 15 hex hits plus the rgba(0, 0, 197, ...) variants used in shadows and glows swapped to rgba(191, 232, 248, ...). `--accent-color` variable updated from the unused `#3b82f6` to `#BFE8F8` for future consistency. DESIGN-RULES.md updated. The old deep blue had roughly 1.8:1 contrast on `#050505` and was unreadable; the new light cyan is AAA-level visible while still reading as an accent.
2. **`--gray-color` lightened from `#888888` to `#B3B3B3`.** Lifts every `var(--gray-color)` reference across the site: hero subtitle, section labels, nav, contact btns, etc.
3. **Two muted text aside colors bumped:** `rgba(255, 255, 255, 0.45)` raised to `0.65` globally (hit the `.outro-aside` on about and the `.pull-quote .pull-quote-aside` Phase 3 primitive). `.episode-tagline` raised from `0.4` to `0.6` targeted. `.creative-page .outro-aside` raised from `0.55` to `0.7` targeted.
4. **Hero title size bumped.** `.hero-title` desktop clamp from `clamp(3rem, 8vw, 6rem)` (max 96px) to `clamp(4.5rem, 14vw, 13rem)` (max 208px). Tablet override at max-1024px bumped from `10vw` to `13vw` to prevent a jarring drop at the breakpoint. Mobile overrides at max-768 and below unchanged for now.
5. **Hero rotating word cadence halved.** `setInterval` 2800ms to 1400ms, initial `setTimeout` 3200ms to 1600ms. Rotation feels twice as fast per user request.

**Cache bumped to `style.css?v=96` and `script.js?v=90` across all five HTML files.**

Open follow-ups if user reports visibility or layout issues after review: (a) at viewport between 1025 and 1440 the hero title sits around 143 to 200px, confirm this feels dominant not oversized, (b) mobile hero overrides at 12vw and 14vw might feel small relative to the new desktop scale but were left alone to avoid scope creep, (c) if the `#BFE8F8` feels too saturated or too pastel in practice, it is a single variable / find-replace to adjust.

---

## Execution log (update after each phase ships)

- **Phase 1 — Text and proof quick wins:** SHIPPED. Variant C ("AI [training / consulting / visuals] for teams that actually ship.") active on the homepage hero with rotating word animation replacing the typing effect. Homepage about section rewritten with "why should I care" framing plus a content placeholder for the current client line. Homepage contact CTA changed to "Let's talk about what you actually need." MANIFESTO monument deleted from about.html. R&D service-intro gained a Promptgorillas content placeholder inline. R&D outro markup upgraded from bare `<p>` to `.outro-statement` + `.outro-aside` pair with content placeholders. Podcast subtitle changed to "We are the fun AI podcast." style.css bumped to v=94 on index.html; script.js bumped to v=88 across all five pages. Legacy `.type-text` and `.cursor` CSS rules kept in place as dead code (no HTML references them). Outstanding: Alex to fill in the placeholders across index.html (about paragraph 2), service-rd.html (service-intro proof line + outro statement + outro aside), and optionally revisit homepage H2 in a later copy pass.
- **Phase 2 — Design polish:** SHIPPED. `.visual-hook video` blue glow replaced with dark shadow. `.services` now has a top border divider; `.insights` gained the same. `.article-banner::after` gradient extended to fade from the top as well as the bottom. `.service-intro` widened from col 3/span 8 to col 2/span 10 and bumped from 1.5rem to 1.75rem. About page rd-row body text muted to 1.3rem at 0.6 opacity so the blue section-titles punch harder. Floating animation class no longer added by JS (CSS rule kept as dead code for safety). Service card image filter softened from grayscale 80/brightness 0.6 to grayscale 60/brightness 0.7. Service card Option A applied: no border, no border-radius, padding 4rem 3rem, gap 0 between cards with thin vertical separators on desktop and horizontal separators on mobile, staggered heights 560/480/520px with 80/40px top offsets on nth-child 2 and 3 (desktop only), hover img scale softened from 1.05 to 1.03. Card-index relocated to top-left at clamp(60px, 8vw, 120px) in accent-color rgba(0,0,197,0.3) for editorial numbered-entry feel.
- **Phase 3 — Narrative primitives:** SHIPPED. `.pull-quote` primitive added with three variants: default centered at col 2/span 10, `.pull-quote.left` left-aligned larger display weight at col 1/span 9, and `.pull-quote .highlight` span for coloring a phrase in accent color. Scale values duplicated from `.outro-statement` (not aliased, to prevent the `.creative-page` !important override from leaking). `.pull-quote .section-label` and `.pull-quote .pull-quote-aside` supported on both variants. Mobile overrides for all. `.rd-row.inverted` modifier added: swaps weight so title is small uppercase gray 1.25rem and body is clamp(1.75rem, 2.75vw, 2.5rem) display weight. Marquee JS refactored from `document.querySelector` singular to `document.querySelectorAll('.typography-portal')` with per-portal forEach containing its own `.marquee-content` selector, horizontal parallax gsap.to, and pulse ScrollTrigger. Subpages can now include `<section class="typography-portal"><div class="portal-marquee"><div class="marquee-content">...</div></div></section>` and the marquee will animate and pulse independently. Homepage marquee behavior preserved (single portal on index.html continues to work as before, just now scoped inside a forEach of length 1).
- **Phase 4 — About page restructure:** SHIPPED. First `.rd-grid` split into `.rd-grid-part1a` (Reality only) and `.rd-grid-part1b` (Scope only) around a left-aligned pull-quote. Pull-quote uses `.pull-quote.left` variant with a `.highlight` span on "I start with what you actually need" (locked candidate A from the Phase 4 plan, rendered in the `#BFE8F8` accent from the V96 tune-up). Small `02 / POSITION` section-label above the quote. Row numbering shifted to 01 Reality, 03 Scope, 04 Origin, 05 Method. Origin row gained the `.inverted` class so title renders small uppercase gray and body renders at display-weight clamp(1.75rem, 2.75vw, 2.5rem). Page marquee `SHAPE • DECIDE • LEARN` inserted between the full-bleed hosts break and the second grid, reusing the existing `.typography-portal` markup picked up by the Phase 3 multi-instance JS. All body copy replaced with `[CONTENT: ...]` placeholders containing starting drafts derived from the old copy but with the Phase 4 voice direction (concrete outcomes, narrative origin, one-sentence Value Fit). Outro markup was already correct from before and was left untouched.

  CSS changes: `.about-page` asymmetric grid rules rewritten from nth-child selectors to class-based (`.rd-grid-part1a`, `.rd-grid-part1b`, `.rd-grid-part2`) to avoid the landmine where inserting a non-rd-row child between rows shifts nth-child indexes. New `.about-page .rd-grid-part2 .rd-row.inverted .section-title / .text-content` rules give the inverted Origin row a narrower title column (span 3) and wider body column (span 8) so display-weight body text gets breathing room. Bonus fix: `.hero-subtitle` base font-size lifted from fixed `1.2rem` to `clamp(1.5rem, 4vw, 3.5rem)` for a 3:1 to 3.7:1 title-to-subtitle ratio that scales cleanly from 320px phone up to 1920px desktop. Mobile override at max-480 bumped from 1rem to 1.25rem. Cache bumped to `style.css?v=97` across all five HTML files; `script.js?v=90` unchanged since no JS work. Outstanding: Alex to fill the four `[CONTENT: ...]` placeholders on about.html (Reality body, Scope body, Origin body at display weight, Method body with the one-sentence Value Fit commitment).
- **Phase 5 — R&D page restructure:** SHIPPED. Old 5-row rd-grid collapsed to 3 rows plus a pull-quote plus a monument plus a marquee. New flow: H1 + service-intro (with the Phase 1 Promptgorillas placeholder intact) -> `rd-grid` #1 with a single row 01 Context merged with the old Background into one ground-plus-credibility paragraph -> single-word `.typo-monument` with `UNCERTAINTY` stroked at 15rem that picks up the existing `.monument-text` scroll-parallax JS automatically -> `rd-grid` #2 with row 02 Focus (`.rd-row.inverted`) and row 03 Format (`.rd-row.reversed`) -> `.pull-quote.left` with label `04 / POV` rendering the Perspective line "Workshops, consulting, and research aren't separate lanes. They're different ways to work through uncertainty." with `.highlight` on the second sentence (accent color `#BFE8F8`, creates a verbal callback to the UNCERTAINTY monument earlier on the page) -> `.typography-portal` marquee cycling `CONTEXT • FOCUS • FORMAT` -> existing elevated outro (outro-statement + outro-aside pair unchanged from Phase 1).

  Old Context, Background, and Perspective rows were absorbed into new beats (row 01, row 01, pull-quote respectively). The `.rd-row` body copy for the three surviving rows was replaced with `[CONTENT: ...]` placeholders containing starting drafts derived from the old copy but adjusted per the plan's merge scheme and voice direction.

  No mid-page `.full-bleed-break` was added, per the plan's explicit non-goal: the `.article-banner` at the top already uses `IMG_0005_3_iy1hjr.jpg` and adding a second full-bleed mid-page would create visual déjà-vu. The monument + marquee + pull-quote trio carries the rhythm load without it.

  CSS change: generic `.rd-row.inverted .section-title { grid-column: 1 / span 3 }` and `.rd-row.inverted .text-content { grid-column: 5 / span 8 }` added inside the Phase 3 primitives block. This makes the inverted treatment (narrow title, wide body for display-weight text) work consistently across R&D, about, and any future page. The about-page scoped override at `.about-page .rd-grid-part2 .rd-row.inverted ...` still wins via higher specificity on about-page but is now effectively redundant and could be cleaned up in a future pass.

  Cache bumped to `style.css?v=98` across all five HTML files; `script.js?v=90` unchanged since no JS work. Outstanding: Alex to fill the three `[CONTENT: ...]` placeholders on service-rd.html (Context merged body, Focus display-weight body, Format body).
- **Phase 6 — Podcast Act 1 cleanup:** SHIPPED. Three structural changes on podcast.html plus the logo-video relocation promised in the V1 plan.

  1. **Top CTA buttons deleted.** The `.platform-links-centered` Spotify + YouTube block that sat immediately below the service-intro has been removed entirely. The CTAs already reappear in the Act 3 closing where they belong.
  2. **`.podcast-grid-act1` deleted.** The old 2-column text-plus-logo-video grid is gone. Act 1 is now a full-width `.text-block.podcast-intro-block` containing the `01 / ABOUT` section-label, the "The Podcast" title, and a content placeholder with a 50-word starting draft in the podcast's actual voice. No more logo video crowding the prose sideways.
  3. **Episodes heading replaced with a pull-quote.** The old `02 / EPISODES` section-label plus `<h2>Episodes</h2>` pair inside `.podcast-episodes` is now a standalone `.pull-quote.left` ("Five episodes. No pretense.") with a `.highlight` span on "No pretense." Same structural job (label the section), much more voice. Sits outside the episode list wrapper so the rhythm reads: full-bleed hosts photo -> pull-quote moment -> accordion list.
  4. **Logo video relocated to Act 3.** New `.podcast-closing-mark` 120x120 square video sits between the `PRESS PLAY` monument and the "New episodes monthly" text. Uses `mix-blend-mode: screen` matching the original `.podcast-logo-wrapper` treatment so the dark-background logo merges into the page. Becomes an ambient signature on the closing block rather than a crowded Act 1 element.

  Styling: `.podcast-page .service-intro` override upgraded from muted-body treatment (color 0.75, margin-bottom 32px) to display-statement treatment: font-size `clamp(2rem, 3.5vw, 3rem)`, color `var(--text-color)` (full white), font-weight 500, letter-spacing -0.02em, line-height 1.2, margin-bottom 96px. The "We are the fun AI podcast." line now renders at display scale across all viewports, giving the podcast its proper tagline-as-statement treatment per the Phase 6 plan requirement. The base `.service-intro` on other subpages (R&D, Creative Building) is unaffected.

  Two new primitives in style.css: `.podcast-intro-block` (`grid-column: 2 / span 10`, mobile falls to full-width) and `.podcast-closing-mark` (120x120 centered with screen blend).

  Cache bumped to `style.css?v=99` across all five HTML files; `script.js?v=90` unchanged since no JS work. Outstanding: Alex to fill the one `[CONTENT: ...]` placeholder on podcast.html (Act 1 intro copy, ~50 words).

  **Known deferred cleanup:** multiple em dashes remain in existing episode taglines and episode bodies on podcast.html (e.g. `ChatGPT Toxic Masculinity?` tagline uses `—`, the ep. 04 body `"the most romantic — and awkward — scenarios"`, etc.). These were left untouched since they are out of Phase 6 scope (not new content). Flag for a future text cleanup pass alongside the `creative-building.html:144` em dash that was similarly deferred from Phase 1.
- **Phase 7 — Creative Building In Production:** SHIPPED WITH PLACEHOLDERS. New `<section class="in-production">` inserted on creative-building.html after the `.creative-break-video` and before the existing outro. Structure: header (`04 / IN PRODUCTION` label + `In production` title + single-line content-placeholder intro) -> reused `.services-grid` with 2 client cards (Promptgorillas + Chris le More, each with a placeholder content-description, a placeholder href, and a self-contained data-URI SVG as placeholder image) -> booking CTA block with a placeholder booking-line and a "Book a project" button linking to `mailto:alexander@promptgorillas.com`.

  The cards use the existing `.service-card` pattern from homepage so no new card CSS was needed. The homepage's staggered-height rules on `.service-card:nth-child(1/2/3)` apply to this grid as well and give it the same jagged-top editorial effect.

  Outro `section-label` renumbered from `04 / CONCLUSION` to `05 / CONCLUSION` to preserve the numbering sequence now that In Production sits ahead of it.

  CSS additions: `.in-production` section wrapper (grid-column 1/-1 within the container), `.in-production-header` (max-width 700px, 64px bottom margin), `.in-production-intro` (1.25rem muted body, 600px max-width), `.in-production-cta` (centered block, 540px max-width, 80px top margin). All appended to the end of style.css after the Phase 6 podcast primitives. Mobile overrides included.

  Cache bumped to `style.css?v=100` across all five HTML files; `script.js?v=90` unchanged since no JS work.

  **Known placeholder state:** cards currently render as dark tiles with card-index numbers, client names, and role-description placeholders. Alex needs to (a) swap each `<img src>` with a Cloudinary URL of real client work, or replace the `<img>` with a `<video autoplay loop muted playsinline>` element for a hero loop, (b) swap each card's `href="#"` with the real destination link, (c) fill the four `[CONTENT: ...]` placeholders (section intro, two card role descriptions, booking-line). The cards will look like real case studies the moment real media lands. Zero structural work required to swap.

---

## Status summary (all seven phases complete)

| Phase | What shipped |
|---|---|
| Phase 1 | Text and proof quick wins |
| Phase 2 | Design polish (ten CSS refinements including service-card Option A) |
| Phase 3 | Narrative primitives (`.pull-quote` + variants, `.rd-row.inverted`, marquee JS refactor) |
| Foundation tune-up V96 | Brand color `#BFE8F8`, lighter gray `#B3B3B3`, hero title bumped to `clamp(4.5rem, 14vw, 13rem)`, rotation speed halved |
| Foundation tune-up V97 | Hero-subtitle scaled to `clamp(1.5rem, 4vw, 3.5rem)` |
| Phase 4 | About page restructure (rd-grid split around pull-quote, inverted Origin row, page marquee, class-based grid rules) |
| Phase 5 | R&D page restructure (5 rows → 3 rows + pull-quote, UNCERTAINTY monument, page marquee, generic inverted column override) |
| Phase 6 | Podcast Act 1 cleanup (top CTAs removed, logo-video relocated to Act 3 mark, display-scale subtitle, Episodes heading → pull-quote) |
| Phase 7 | Creative Building In Production client-work section with placeholders |

All structural work is done. The site is in its new narrative-and-rhythm shape end-to-end. What remains is content fill-in (placeholders across all pages) and a text cleanup pass for remaining em dashes in podcast episode taglines/bodies and the creative-building outro statement.

---

## Refinement pass V101 (post-framework cleanup)

After V100 shipped, user scrolled the site end-to-end and flagged six targeted refinements. All shipped in one combined pass.

1. **All 13 chapter labels removed.** 10 subpage `.section-label` instances plus 3 homepage `.label` instances deleted across index, about, podcast, service-rd, creative-building. CSS rules for `.section-label` and `.label` kept in style.css as dead code (no HTML references remain). The site now reads less chapter-bookish, more typographically confident.
2. **Creative Building Act 1 collapsed to one clean beat.** Old structure had a 12-col grid with two stacked text-blocks (Medium + Perspective) plus a sticky portrait video on the right. Restructured to a single `.text-block` inside `.creative-act1` occupying col 2/span 10, with one `[CONTENT: ...]` placeholder merging the old Medium and Perspective copy. Portrait video deleted entirely. `.creative-act1` CSS collapsed from 2-col grid to block-level grid item. Dead `.creative-text-col` and `.creative-visual-col` CSS rules left in place (harmless).
3. **Creative Building Application section is text-only.** Old 2-col grid with a portrait-video on the left at `aspect-ratio: 4/3` (the "small 1:1 box") and text on the right. Visual-col and video deleted. `.creative-act-application` collapsed to a single grid item at col 2/span 10. Application CSS cleaned: removed `.application-visual-col`, `.application-text-col`, `.portrait-video aspect-ratio` overrides, and the mobile flex override. Text beat is now clean and matches the site's rhythm where text carries meaning and full-bleed moments carry visuals.
4. **In Production section moved up and Promptgorillas now shows real shipping video.** Section repositioned from near the bottom of creative-building (after cinematic-showcase, Application, break video) to immediately after the merged Act 1 text block, before the `CREATE` monument. New page flow: philosophy intro → commercial shipping work → CREATE monument → medium exploration → outro. Commercial-first narrative. Promptgorillas card's placeholder `<img>` swapped for a `<video autoplay loop muted playsinline>` element pointing at the real Cloudinary URL (`https://res.cloudinary.com/dnkcu6lne/video/upload/v1776539032/Schermopname_2026-04-18_om_20.52.47_ykurwi.mp4`). Chris le More card still uses placeholder SVG. `.service-card` CSS extended with a combined `.service-card img, .service-card video` selector so the video inherits the same absolute-positioned background treatment with hover filter/scale transitions.
5. **Selected centered content left-aligned.** `.service-outro` flipped from `text-align: center; grid-column: 2 / span 10; padding: 0 1rem` to `text-align: left; grid-column: 1 / span 9; padding: 0`. `.service-outro p`, `.outro-statement`, and `.outro-aside` margins changed from `0 auto` / `0 auto 40px` to `0` / `0 0 40px` so the text anchors to the left edge. `.in-production-cta` flipped from `text-align: center; margin: 80px auto 0; padding: 0 24px` to `text-align: left; margin: 80px 0 0; padding: 0`. Affects outros on about, R&D, creative-building and the booking CTA block on creative-building. Longer quotes now read as editorial statements instead of centered poems. Hero, contact, and podcast closing stay centered (intentional arrival/exit/climax moments).
6. **Service cards noticeably bigger.** Desktop staggered heights 560 / 480+80 / 520+40 bumped to 720 / 620+80 / 680+40. Base `.service-card` padding 4rem 3rem → 5rem 4rem and min-height 500 → 600. `.service-card h3` 1.5rem → `clamp(1.75rem, 2.2vw, 2.25rem)` with margin-bottom 1rem → 1.5rem. `.service-card p` gained explicit `font-size: 1.15rem; line-height: 1.6`. `.card-index` size `clamp(60px, 8vw, 120px)` → `clamp(80px, 10vw, 160px)`. Homepage service cards now dominate the visual hierarchy.

Creative-building outro content was also converted to `[CONTENT: ...]` placeholders with the existing em-dash line flagged for rewrite during content fill-in.

Cache bumped to `style.css?v=101` across all five HTML files. `script.js?v=90` unchanged since no JS work.

**Outstanding after V101:**
- Chris le More card still shows placeholder SVG; swap `<img src>` with a Cloudinary URL of real AI shots when available.
- All `[CONTENT: ...]` placeholders across all pages still need fill-in from user.
- Em dash cleanup pass still deferred (podcast episode taglines/bodies, creative-building outro copy during rewrite).
- Creative-building.html still has dead CSS for removed classes (`.creative-text-col`, `.creative-visual-col`, `.application-visual-col`, `.application-text-col`, `.portrait-video`). Safe to leave; clean up in a future refactor.

---

## Refinement pass V102 (content fill + theme-light + break-video backdrop)

User delivered rewritten copy for every page and added four visual directives. All shipped in one combined pass.

**1. All content placeholders filled.** Twenty-one `[CONTENT: ...]` placeholders across index, about, service-rd, podcast, and creative-building replaced with the user's final copy. Highlights:
- Homepage H2 simplified from "think, decide, and create" to "think and create." Homepage about paragraph 2 now reads "Currently at PromptGorillas, I both train and build." as the dual-positioning proof.
- About page rows: Reality, Scope, Origin, Method bodies all swapped with user's final copy. Scope now names the Promptgorillas cycle-time outcome. Origin is the Bachelor-plus-Master's narrative through film, literature, rhetoric, and media-business. Method explains Value Fit as a cyclical reassessment framework.
- R&D page: service-intro gained "And each path can be different. My work is to figure yours out, with you." Row 01 is the Context+Background merge with Alex's voice. Focus is now a tight two-sentence display-weight beat. Format is the quick-wins-to-long-term-thinking statement. Outro locked to "I step in when things are still forming. When teams are asking where to go next." plus "If that sounds familiar, let's talk."
- Podcast Act 1 copy: "My girlfriend Morgan and I talk about AI the way it actually lands. Messy, funny, sometimes embarrassing. No explainers. No hype. Some episodes circle around online weirdness. Most just try to be honest about what is changing. The podcast is in Dutch."
- Creative Building merged Act 1: "I hate 'AI-Slop'. My mission is to create AI visuals that always feel intentional and impressive." In Production intro, Promptgorillas and Chris le More card roles, booking CTA line, Application paragraph 1 (added film-studies framing and changed "workflows" to "pipelines"), outro statement and aside all filled.
- Zero em dashes in any of the swapped content (grep verified).

**2. Three monuments deleted per user notes.** `LISTEN` removed from podcast.html (was between Act 1 and full-bleed hosts photo). `UNCERTAINTY` removed from service-rd.html (was between Context row and Focus+Format grid). `CREATE` removed from creative-building.html (was between In Production section and cinematic-showcase). Indentation artifacts from the deletions were cleaned up in the same pass. About page's `MANIFESTO` was already deleted in Phase 1. The `PRESS PLAY` monument in Act 3 of podcast stays intact (not in user's removal list, still anchors the closing block with the logo video mark).

**3. Theme-light inverted background system added.** New `.theme-light` CSS primitive applies a full-bleed `#BFE8F8` cyan background with `#050505` text. Uses the standard full-bleed breakout pattern (width 100vw with negative margins and content-aligned internal padding formula `max(24px, calc(50vw - 576px))`) so the cyan slab fills viewport-width regardless of container constraints while keeping inner content aligned to the 1152px content area. Scoped overrides handle color inversions for: `.section-title`, `.rd-number`, `.rd-row .text-content p`, `.about-page .rd-row .text-content p` override, `.rd-row.inverted .section-title`, `.rd-row.inverted .text-content p`, `.rd-row + .rd-row` separator, and `.highlight`. Applied in HTML to three spots:
- `about.html`: `.rd-grid.rd-grid-part1b` (Scope row, 03) gets `theme-light` class
- `about.html`: `.rd-row.reversed` for Method (05) gets `theme-light` class individually since it sits inside `rd-grid-part2` which also contains Origin (stays dark)
- `service-rd.html`: the rd-grid wrapping Focus + Format together gets `theme-light`, inverting both rows as a unified block

Not applied: homepage, podcast, creative-building (per user scope). The result is two cyan slabs on about and one cyan slab on R&D that break page rhythm via color contrast. Scrolling feels like hitting distinct editorial beats.

**4. Creative Building break video gained a full-bleed blurred backdrop.** The floating-tile feeling is gone. New structure: `.creative-break-full` section wraps the existing `.creative-break-video` with a `.creative-break-bg` video element positioned absolutely behind it. Background video uses the same source URL, filtered with `blur(40px) brightness(0.45) saturate(1.15)` and scaled 1.1x to cover blur edge leak. The foreground break video sits centered at its original 75% width / max 800px. Net effect: the 4:3 tile is now embedded in an ambient widescreen moment of its own muted self. Mobile override reduces padding and lets foreground video go full width.

**5. Promptgorillas video filter reduced.** New scoped rule `.in-production .service-card video { filter: brightness(0.92) }` and hover `filter: brightness(1)` replaces the stronger `grayscale(60%) brightness(0.7) contrast(1.05) sepia(10%) hue-rotate(190deg)` treatment that `.service-card video` inherits by default. Now the real Promptgorillas AI hero video shows in near-native color at rest, with only a subtle brightness dim so the overlaid card-index and title remain readable. Homepage service cards still use the stronger muted filter (they are decorative placeholders, not shipping work).

Cache bumped to `style.css?v=102` across all five HTML files. `script.js?v=90` unchanged.

**Outstanding after V102:**
- Chris le More card still shows SVG placeholder; swap when asset is available.
- Promptgorillas card `href="#"` still points at anchor instead of a real destination link.
- Podcast episode taglines and episode bodies still contain em dashes in existing content (deferred cleanup).
- Dead CSS from V101 still present (`.creative-text-col`, `.creative-visual-col`, etc.). Safe to leave.
- Value Fit diagram deferred by user for later iteration.

**Known decisions logged for next pass:**
- User is considering imagery to replace remaining text-only rhythm breaks (e.g., an animated Value Fit diagram on R&D or About).
- Chris le More card will get real AI shot media when available, potentially promoted to `<video>` like Promptgorillas.

---

## Refinement pass V103 (live theme transition + Method text fix)

Two issues from V102 review: Method row body text was still rendering white on cyan (CSS selector bug), and the theme-light sections felt like static banners instead of the live page transition the user wanted. Both fixed in one pass.

**1. Method text color bug fixed via CSS refactor.** Root cause: the V102 selector `.theme-light .rd-row .text-content p` required `.rd-row` as a descendant of `.theme-light`, but on the Method row the class is applied to the `.rd-row` itself (not an ancestor). Simplified selectors to `.theme-light .text-content p` (and `.about-page .theme-light .text-content p`) which match both the grid-wrapper case and the same-element case.

**2. Live section-level theme transition.** Replaced the static `.theme-light` styling with a variable-driven system. Five CSS custom properties scoped to `.theme-light`: `--theme-bg`, `--theme-fg`, `--theme-muted`, `--theme-subtle`, `--theme-border`. Variables default to DARK theme values so the section blends into the surrounding dark page when off-screen (invisible slab). All child color overrides inside `.theme-light` now reference the variables instead of hardcoded colors, so animating the variables propagates through every element inside.

GSAP ScrollTrigger drives the transition via two `fromTo` tweens per themed section:
- ENTER tween: as the section rises from viewport bottom to center (`start: 'top bottom'`, `end: 'top center'`, `scrub: 0.5`), the variables interpolate from dark to cyan values AND padding-top/bottom expand from 64px to 160px.
- EXIT tween: as the section continues rising from center to top (`start: 'bottom center'`, `end: 'bottom top'`, `scrub: 0.5`), the reverse plays — variables back to dark, padding back to 64px.

Between the two triggers (when the section is fully in viewport), the values hold at peak: cyan bg, dark text, expanded padding. The `scrub: 0.5` easing adds a 0.5s lag that smooths the scroll-linked animation organically.

Net effect: each themed section (Scope on about, Method on about, Focus+Format grid on R&D) now fades from dark to cyan AND expands vertically as the user scrolls into it, then fades back and contracts as they scroll past. The section roughly doubles its vertical footprint at peak (64+64 baseline padding → 160+160 peak = 320px added to content height). The cyan no longer reads as a banner; it reads as a live full-bleed color shift tied to scroll position.

GSAP v3.x supports animating CSS custom properties directly. No new plugins added.

CSS and JS changes in this pass:
- `style.css`: lines 2747-2815 theme-light block fully rewritten
- `script.js`: 68-line GSAP block appended at line ~360 after the typography-portal handler

Cache bumped to `style.css?v=103` and `script.js?v=91` across all five HTML files.

**Rollback paths if issues arise:**
- If padding expansion feels too busy: remove the `paddingTop` and `paddingBottom` properties from both `fromTo` calls in script.js, keep only the color variable animation.
- If the fade flickers on fast scroll: increase `scrub` from 0.5 to 1.0.
- If variable animation misbehaves cross-browser: fall back to a class-toggle pattern with CSS transitions.

All of the above are JS-side only; CSS stays stable.

---

## Refinement pass V104 (full-bleed padding + scrub tuning)

After V103, Scope and Method sections still felt banner-sized. User asked for them to fill the viewport fully. Quick tune-up:
- Peak padding changed from `160px` to `50vh`. Scales with viewport so short single-row sections like Scope/Method fill the screen at peak.
- ENTER scroll range extended from `top bottom → top center` to `top bottom → top 30%` (70% of viewport scroll instead of 50%).
- EXIT scroll range extended from `bottom center → bottom top` to `bottom 70% → bottom top`.
- Scrub doubled from `0.5` to `1.0` for smoother rapid-scroll.

Cache bumped to `script.js?v=92` (CSS unchanged).

## Refinement pass V105 (attempted fix for layout-shift bugs, PARTIALLY REVERTED in V106)

After V104, three bugs surfaced:
1. Transitions not gradual enough (color turning cyan almost immediately on entry).
2. Origin section on about was faded/invisible until user scrolled past it.
3. Method's transition was delayed — appeared mid-cyan only after user had already scrolled past the content.

Root cause diagnosed: padding animation from `64px` to `50vh` caused a ~950px layout shift at 1080vp viewport. All elements below the themed section (Origin, Method, outro) shifted downward. GSAP ScrollTrigger positions are cached at page load and don't auto-recalculate when layout changes. So:
- Origin's fade-in trigger fired at its *original* page position, not where Origin actually was.
- Method's own theme-light trigger fired at the pre-shift position, so the color transition played before Method was visible on screen.

V105 attempted fix:
- Added `invalidateOnRefresh: true` to all relevant ScrollTriggers so they recalculate on refresh.
- Added `ScrollTrigger.refresh()` callbacks on theme-light triggers' `onLeave` and `onEnterBack` to recalculate cached positions after each layout change.
- Moved EXIT start from `bottom 70%` to `bottom 85%` (earlier) to reduce dead cyan space below content.
- Tightened ENTER end from `top 30%` to `top 15%` for more gradual feel.

Cache bumped to `script.js?v=93`.

## Refinement pass V106 (architectural simplification — current state)

V105 introduced two new bugs:
1. **Scroll scatter**: `ScrollTrigger.refresh()` calls during scrub animations caused visible jumps as all trigger positions re-measured mid-scroll.
2. **Content fading while visible**: moving EXIT to `bottom 85%` meant color fade started while the user was still looking at content in the upper viewport.

V106 took the architectural step: **stop animating padding entirely**. The padding animation was the ultimate cause of the layout shift; patching the consequences (V105) was treating the symptom.

Changes:
- `.theme-light` padding moved to fixed `50vh` top/bottom permanently in style.css. Section is always full-bleed sized regardless of scroll state.
- JS tweens now only animate the five CSS color variables. No padding animation.
- Removed all `ScrollTrigger.refresh()` callbacks and `invalidateOnRefresh` flags. No more mid-scroll re-measurement, no more scatter.
- EXIT color start changed from `bottom 85%` to `bottom 40%`. At `bottom 40%` the section's content has just exited the top of viewport, so color fade begins only after the user is past the content.
- ENTER scroll range kept at `top bottom → top 30%`.

Net behavior:
- Sections are ALWAYS tall (50vh + content + 50vh). When not themed, blend with dark page. When themed, full-bleed cyan.
- No layout shift ever. Origin's reveal trigger stays accurate. Method's trigger fires at correct scroll position. No scatter.
- Content stays cyan for its entire visibility range. Fade begins only after user scrolls past.

Trade-off: page is longer on about and R&D because themed sections are always viewport-size. This is a feature (editorial spaciousness) rather than a bug.

Cache bumped to `style.css?v=104`, `script.js?v=94`. This is the current live state.

**Rollback paths:**
- If the ever-tall themed sections feel too empty when dark: reduce `padding-top` and `padding-bottom` in `.theme-light` from `50vh` to `35vh` or `40vh` (may lose full-bleed at wide viewports).
- If users want the "expanding" effect back: re-add the padding animation to the GSAP tweens, but keep `ScrollTrigger.refresh()` calls minimal. The V106 approach is the recommended architecture.

---

## Content + media fixes post-V106

- About page profile picture swapped from the old abstract portrait to `pg_alexander-2_lpp3aj.jpg` on Cloudinary (real photo).
- Chris le More card on creative-building.html swapped from placeholder SVG to a real Cloudinary image (`Untitled_design_1_zpetbg.png`). The card now shows actual AI-generated model visuals.

---

## V107: Value Fit Model diagram added to About Method row

Alex designed the Value Fit Model (five-part cyclical framework from his cum laude thesis) via Claude Design, specifically for this site. Second attempt at the handoff. The first attempt was reverted because the design bundle had been truncated at download, so the actual geometry file (`scene.jsx`) was missing and item positions were reconstructed from chat descriptions, which drifted. This pass uses the full bundle, ported from `scene.jsx` directly.

**Approach:**
- Inline SVG in the Method row, viewBox `0 0 1080 1080`. All coordinates copied from scene.jsx constants: `CANVAS=1080`, `CENTER=540`, `CIRCLE_R=310`, wedge centers at angles `-126 / -54 / 18 / 90 / 162`°, wedge boundaries at `-90 / -18 / 54 / 126 / 198`°, item cluster radii `180 / 190 / 190 / 180 / 180`, feedback arc at `r=350` sweeping `300°` CW from `-105°` to `195°`.
- Sits on `grid-row: 2` of the `.rd-row.reversed.theme-light` via `grid-column: 1 / -1; grid-row: 2;`. The Method title (col 8/span 5) and text (col 2/span 4) stay exactly where they were, per user constraint.
- The design's "export mode" palette (wedge fills match page bg, everything else black) maps 1:1 onto `.theme-light`'s variable system: wedge fills use `var(--theme-bg)`, all strokes/dots/text use `currentColor` (which inherits from `--theme-fg` through the existing `.theme-light { color: var(--theme-fg) }` rule). So the whole diagram rides the scroll transition: white-on-dark off-screen, black-on-cyan at peak.
- No JS additions, no new ScrollTriggers, no cached-position risk.

**Files modified:**
- `about.html`: added `<figure class="value-fit-model">` with full inline SVG inside the Method row, after `.text-content`.
- `style.css`: added `.value-fit-model` block. Placed immediately after the last `.theme-light` rule (around line 2815).
- All five HTML files: `style.css?v=104 → v=105`.

Cache state after V107: `style.css?v=105`, `script.js?v=94` (script unchanged).

**Known trade-offs:**
- Diagram renders at 1080 viewBox inside a `max-width: 900px` container. At 900px display that means items render at ~13.3px (designed for 16px at 1080px viewbox). Readable but on the small side. If this is too small, either raise `max-width` to `980px` (uses full column 2/span 10 width) or bump the `font-size` on `.vfm-items text`, `.vfm-title`, and `.vfm-num` by ~1.25x.
- "Perceived Threats & Stressors" renders as a single long line in SVG rather than wrapping like the React source. The React source wraps it inside a 220px container; SVG text doesn't auto-wrap. If it collides visually with wedge W3 (Strategic), either manually split into two tspans or drop its font-size.
- Long items in W4 ("Competitive Positioning Shift", "New Ethical Challenges") may visually overlap wedge dividers at the current font size. Matches the design tool's accepted state.

**Rollback path:**
- Remove the `<figure class="value-fit-model">...</figure>` block from about.html. The `.value-fit-model` CSS block in style.css becomes dead but harmless.

---

## V108: Value Fit Model internal items removed

After V107 landed on the page, the diagram felt information-dense when the surrounding Method copy already frames the framework abstractly. Alex asked to strip the wedge-internal items (Scale of Operation, Multifaceted Capabilities, Vision-led Building, etc.) and keep only the five outer section labels (01 Practitioner's Embedded Context, 02 AI as a GPT Catalyst & Disruption, 03 Interpretive Lens, 04 Strategic Enactment, 05 Evolving Outcomes & Perceptions).

Net effect: the diagram now reads as pure structure — five wedges, dividers, border, feedback arc, five outer labels. Like an architectural diagram rather than a content dump. The detailed item breakdown lives in the thesis, not on the page.

**Files modified:**
- `about.html`: `<g class="vfm-items">` block deleted (17 item `<text>` elements, roughly 25 lines).
- `style.css`: `.value-fit-model .vfm-items text` rule deleted.
- All five HTML files: `style.css?v=105 → v=106`.

Cache state: `style.css?v=106`, `script.js?v=94`.

**If the diagram now feels sparse or empty:**
- Option 1: tighten the diagram size. Because the readability-on-items constraint is gone, `max-width` can drop from 900px to ~600-700px without losing anything.
- Option 2: move to side-by-side with the text (diagram in cols 7-12 or 6-12, text narrower in cols 2-4). Method section becomes substantially shorter.

Both deferred until Alex sees V108 in the browser.

**Rollback path:** restore the `<g class="vfm-items">` block from git history and revert the CSS rule.

---

## V109: Value Fit Model shrunk and moved side-by-side with Method text

After V108 the diagram was clean but still full-width below the text, making the Method section vertically long. Alex asked to shrink it and position it next to the text on the right so the section feels more condensed.

**Changes:**
- Diagram moved from `grid-column: 1 / -1` (full row) to `grid-column: 6 / -1` (right half only).
- Diagram `max-width` reduced from 900px to 600px.
- Text-content on the Method row specifically now spans `grid-row: 1 / span 2` with `align-self: start`, so the paragraph on the left flows alongside the diagram on the right.
- Internal font sizes and stroke widths in the SVG bumped ~1.6x to preserve readability at the smaller rendered width: num label 11 → 20, title label 22 → 34, dividers 2 → 3, border 1.5 → 2.5, feedback arc 3.5 → 5.5, leader 1 → 1.5, center dot r 4 → 6.
- Label y-coordinates re-anchored to fit the taller label blocks without overlapping the circle border (top labels moved up, bottom label down, side labels recentered on y≈540).
- Figcaption removed (the Method copy already names the framework).
- Mobile breakpoint at 900px: diagram falls back to full-width below the text, as before V109.

**Files modified:**
- `about.html`: label y-coordinates and tspan dy values updated; center dot r bumped to 6; figcaption removed.
- `style.css`: `.value-fit-model` grid placement and stroke/font CSS updated; added `.about-page .rd-grid-part2 .rd-row.reversed.theme-light .text-content` override to span rows.
- All five HTML files: `style.css?v=106 → v=107`.

Cache state: `style.css?v=107`, `script.js?v=94`.

**Net effect:**
- Method section is roughly 40% shorter vertically. Text paragraph and diagram now read together as one editorial composition.
- At the 900px breakpoint the layout falls back to stacked (diagram below text), so mobile users still get a readable full-width version.

**Follow-up options if needed:**
- If the side-by-side feels cramped, raise `max-width` to 640-680px.
- If the title "Method" at top-right feels visually separated from its diagram, reduce `margin-top` on `.value-fit-model` from 32px to 16px or 8px.
- If the paragraph on the left sits too far from the diagram vertically, revisit `align-self` on the text or add explicit `margin-top` to match.

**Rollback path:** revert `about.html` label coords, remove the grid overrides and restore `.value-fit-model` to `grid-column: 1 / -1; max-width: 900px` with original stroke widths and font sizes.

---

## V110: Mechanical batch (8 items, no design risk)

First phase from the V110-V115 refinement plan (`plans/squishy-popping-pillow.md`). Pure copy edits and CSS-property tweaks, batched into one commit. No structural changes.

**Items shipped:**

| # | What | File / line |
|---|---|---|
| 5 | Deleted creative-building closing "Visual storytelling, even when abstract." outro block. Page now concludes on `.creative-break-full` and goes directly to the Get-in-Touch CTA. | creative-building.html (was lines 149-153) |
| 6 | Replaced `.service-intro` ("I treat AI-generated visuals as a medium in their own right.") with the stronger "I hate 'AI-Slop'. My mission is to create AI visuals that always feel intentional and impressive." Deleted the now-redundant `.creative-act1` wrapper that previously held that line. | creative-building.html lines 74-84 |
| 14 / 17 | Reduced `.outro-aside` font-size from `1.25rem` to `1rem` (mobile from `1.1rem` to `0.95rem`). One CSS rule covers both about and R&D outros. | style.css `.outro-aside` and the 768px breakpoint |
| 16 | Deleted "And each path can be different." from R&D `.service-intro`. | service-rd.html line 75 |
| 18 | Removed `box-shadow: 0 30px 60px rgba(191, 232, 248, 0.1)` from `.insight-card:hover`. Lift, image saturation, and title color transition still carry the hover state. | style.css line 1152 |
| 2 | Chris le More card image now crops from the bottom (`object-position: top`) so the head/face stay in frame. | new rule on `.in-production .service-card img` in style.css |
| 3 | Chris le More image filter reduced from the strong homepage `grayscale(60%) brightness(0.7) sepia(10%) hue-rotate(190deg)` treatment to just `brightness(0.92)`, matching the Promptgorillas video. Hover state goes to `brightness(1)` with a 1.02 scale, also matching. | new rules on `.in-production .service-card img` in style.css |

**Files modified:**
- `creative-building.html`: deleted `.creative-act1` block, merged "I hate AI-slop" into `.service-intro`, deleted closing `.service-outro`.
- `service-rd.html`: deleted "And each path can be different." sentence.
- `style.css`: reduced `.outro-aside` font-size + mobile breakpoint, removed insights cards hover shadow, added `.in-production .service-card img` filter and object-position rules.
- All five HTML files: `style.css?v=107 → v=108`.

Cache state: `style.css?v=108`, `script.js?v=94`.

**Voice rule check:** no em dashes introduced (grep `—` against the four edited files post-edit).

**Rollback path:** every change is local. Restore the deleted blocks from git history; revert the three style.css rules (`.outro-aside` font-size, `.insight-card:hover` shadow, `.in-production .service-card img` filter+object-position).

---

## V111: Podcast typography + dictionary-entry accessory

Second phase of the V110-V115 plan. Two items: enlarge "The Podcast" H2 so it has visual hierarchy over the service-intro, and add a Cambridge-Dictionary-style definition under "No pretense." in the pull-quote.

**Item 8: H2 enlargement.** The H2 in `.podcast-intro-block` was sized at `clamp(2rem, 3.5vw, 3rem)`, identical to the `.podcast-page .service-intro` ("We are the fun AI podcast.") above it. Two same-size headers stacked produced the cluttered feel. Bumped the H2 specifically (`.podcast-page .podcast-intro-block .section-title`) to `clamp(3rem, 5vw, 4.5rem)`, matching rd-row section title scale, with `margin-bottom: 32px` and added `margin-top: 32px` on `.podcast-intro-block` for a touch more breathing room. The other `.podcast-page .section-title` rules (e.g. on `.podcast-episodes`) are unchanged.

**Item 9: Dictionary entry under "pretense".** Added a new `aside.dict-entry` inside the `.text-block.pull-quote.left` block. Five stacked spans matching the exact format Alex specified in the planning round:

```
pretense
noun [ U ]
us
/prɪˈtens, ˈpri·tens/
a way of behaving that is intended to deceive people:
```

Treatment per line:
- `.dict-word`: 1.375rem, weight 600, white, slight tight letter-spacing
- `.dict-pos`: 0.85rem italic, 55% white
- `.dict-region`: 0.7rem uppercase tracked at 0.22em, 40% white
- `.dict-phonetic`: 0.95rem italic in brand cyan `#BFE8F8`
- `.dict-def`: 0.9rem at 78% white, line-height 1.55

The block sits right-aligned (`margin-left: auto`, `max-width: 340px`) below the pull-quote so it visually drops under the "pretense" word at the end of the line. Thin top border (`1px solid rgba(255,255,255,0.14)`) acts as a quiet separator. Mobile (≤768px) collapses to full-width left-aligned.

**Files modified:**
- `podcast.html`: added `<aside class="dict-entry">` block with five stacked spans inside the existing pull-quote `.text-block`.
- `style.css`: bumped `.podcast-page .podcast-intro-block .section-title` font-size; added `margin-top` to `.podcast-intro-block`; added new `.dict-entry` component (~50 lines including responsive override).
- All five HTML files: `style.css?v=108 → v=109`.

Cache state: `style.css?v=109`, `script.js?v=94`.

**Voice rule check:** no em dashes introduced.

**Rollback path:** delete the `<aside class="dict-entry">` block from podcast.html, delete the `.dict-entry` and `.podcast-intro-block .section-title` rules in style.css. Reverts cleanly.

---

## V112: Value Fit Model titles moved inside the wedges

Third phase of the V110-V115 plan. The model previously read as: outer titles + leader stubs + outer numbers + an empty circle (since V108 removed internal items). With every label sitting outside, the diagram occupied a wide footprint and the wedges themselves carried no information. Alex's call: move the titles inside, drop the numbers, let the feedback arrow imply sequence.

**Changes:**

- Removed the `<g class="vfm-leaders">` group (5 leader lines + 5 anchor dots).
- Removed the `<g class="vfm-labels">` group (5 outer numbers + 5 outer titles).
- Added a new `<g class="vfm-titles" text-anchor="middle">` group with one to three `<text>` elements per wedge, centered on each wedge's radial bisector at `r=200` (uniform across all wedges).
- Title layouts:
  - W0 Practitioner's: 2 lines, "Practitioner's" / "Embedded Context"
  - W1 AI: 3 lines, "AI as a GPT" / "Catalyst &" / "Disruption" (broken into 3 because "Catalyst & Disruption" is wider than the wedge interior)
  - W2 Interpretive: 2 lines, "Interpretive" / "Lens"
  - W3 Strategic: 2 lines, "Strategic" / "Enactment"
  - W4 Evolving: 2 lines, "Evolving Outcomes" / "& Perceptions"
- Cluster anchor points (computed from `polar(540, 540, 200, angle)`):
  - W0 (-126°): (422.4, 378.2)
  - W1 (-54°): (657.6, 378.2)
  - W2 (18°): (730.2, 601.8)
  - W3 (90°): (540, 740)
  - W4 (162°): (349.8, 601.8)
- Line spacing: 28 SVG units (≈1.17× the 24 font-size, just under standard 1.2 line-height).

**CSS:**
- Removed `.vfm-leaders line`, `.vfm-leaders circle`, `.vfm-num`, and `.vfm-title` rules.
- Added new `.value-fit-model .vfm-titles text` rule: `font-size: 24px; font-weight: 600; letter-spacing: -0.005em; dominant-baseline: middle;`.
- The 24-unit font at the V109 max-width of 600px renders at 24 × 600/1080 = ~13.3 actual pixels. Readable for chart annotation; slightly small but consistent with the editorial scale.

**Why it works:**

The wedges still fill with `var(--theme-bg)` so they dissolve into the cyan page at peak; titles ride `currentColor` and inherit the same theme transition (white off-screen, black at peak cyan), so the diagram fades in cohesively. The center dot, border, dividers, and feedback arc all keep their treatment from V107-V109. Net result: a self-contained labeled wheel with no outer real estate.

**Files modified:**
- `about.html`: replaced `<g class="vfm-leaders">` and `<g class="vfm-labels">` with the new `<g class="vfm-titles">` block.
- `style.css`: deleted four CSS rules, added one.
- All five HTML files: `style.css?v=109 → v=110`.

Cache state: `style.css?v=110`, `script.js?v=94`.

**Voice rule check:** no em dashes introduced.

**Known follow-ups:**
- The diagram's `max-width: 600px` was kept from V109 (Alex's call: model is "acceptable" right now). Now that outer label real estate is gone, max-width could shrink to 500-540px to make the Method section even more condensed. Single CSS line if Alex wants it tighter.
- W1's 3-line layout looks slightly busier than the 2-line wedges. Alternative: keep at 2 lines and shrink font for that wedge specifically, or rephrase the title (e.g. "AI Catalyst" / "& Disruption" if Alex is open to dropping "as a GPT").
- If a long title visually crowds its wedge boundary at the new font-size, individual y-coordinates can be nudged to recenter.

**Rollback path:** restore the `<g class="vfm-leaders">` and `<g class="vfm-labels">` blocks from git history; restore the four deleted CSS rules; remove `<g class="vfm-titles">` and its CSS rule.

---

## V113: Creative Building uplift, plus date metadata across pages

Fourth phase of the V110-V115 plan, scoped after a vision pass with Alex. The original V113 was "make Production bigger and add a Weavy screenshot" — that would have been a font bump and an asset insertion. After designer-eye audit, V113 became a real layout pass: the page's hierarchy was wrong, the proof section wasn't doing its job, and the process section had no visual support.

The decorative videos (cinematic showcase + creative-break-full) stay in place per Alex's call ("first apply the other changes before we remove beautiful assets").

**Item 1 — In Production becomes the page's hero:**
- `.in-production-header .section-title` ("In production") bumped from `clamp(2rem, 3.5vw, 3rem)` to `clamp(3rem, 5.5vw, 5rem)` — display scale, the page's chapter title.
- `.in-production-intro` bumped from `1.25rem` body to `clamp(1.5rem, 2.2vw, 1.875rem)` subhead with tighter letter-spacing, so the commercial framing line carries the section's weight.
- Section margins increased (`160px` top, `96px` between header and cards) for breathing room that signals importance.
- Cards keep their existing min-height + padding (already tuned in V101). Visual-date caption added inside each card as a typographic press-credit ("Promptgorillas · 2026", "Chris le More · 2026").

**Item 1 — CTA promoted to full-bleed cyan slab:**
- The closing CTA (was `<div class="in-production-cta">` inside `.in-production`, paragraph + small button) was lifted out of the section entirely. Now it's a sibling of the inner `.container`, structured as `<div class="production-cta theme-light">`.
- The `.theme-light` class triggers the existing GSAP scroll-driven cyan transition (V106), so the slab fades dark → cyan as the user scrolls into it. No JS additions needed.
- Inside the slab: `.production-cta-statement` ("Available one day a week for independent visual work.") at pull-quote scale (`clamp(2.5rem, 5vw, 4.5rem)`); `.production-cta-aside` ("If you want a brand world…") at body scale; `.cta-btn-large` button variant, larger padding, theme-aware colors that invert on hover. The CTA now reads as the page's primary close, not a footnote.

**Item 4 — Application becomes a 2-column magazine spread:**
- Restructured the HTML: `<figure class="application-visual">` on the LEFT (Weavy placeholder), `<div class="application-text">` on the RIGHT.
- Grid `7fr 5fr` (~58% / 38%) — asymmetric on purpose, leaning into editorial spread proportions per Alex's reference to jamyvodegel.com.
- "Application" H2 bumped to display scale (`clamp(3rem, 5.5vw, 5rem)`) to match the In Production header — two equal-weight chapter titles on the page.
- Weavy placeholder is a striped/dashed box at 4:3 aspect, labeled "Weavy workflow / screenshot placeholder". Pattern follows the `[MEDIA: ...]` placeholder convention: swap `<div class="weavy-placeholder">` for an `<img src="cloudinary-url">` when the asset is ready.
- Mobile (≤900px): grid collapses to single column, gap tightens to 48px.

**Item 7 — Visual-date metadata across pages:**
- New `.visual-date` component: small uppercase tracked caption (0.7rem, letter-spacing 0.22em, muted white). One CSS rule, used on:
  - `creative-building.html`: inside both In Production cards, below cinematic-showcase, below creative-break-full, below Weavy placeholder
  - `about.html`: below the full-bleed-break "Alex at work" image
  - `podcast.html`: below the full-bleed-break hosts image
- `.visual-date-centered` modifier for stand-alone visuals (cinematic showcase, full-bleed breaks).
- Theme-aware override: `.theme-light .visual-date` flips to muted dark — future-proofs the component for any theme-light section that adopts a dated visual.

**Files modified:**
- `creative-building.html`: lifted `.in-production-cta` out of `.in-production` and replaced with `.production-cta.theme-light` slab; added visual-date spans to both production cards; restructured `.creative-act-application` into `.application-visual` + `.application-text` with Weavy placeholder; added visual-date below cinematic showcase and creative-break-full.
- `about.html`: added visual-date below full-bleed-break image.
- `podcast.html`: added visual-date below full-bleed-break image.
- `style.css`: bumped `.in-production-header .section-title` and `.in-production-intro`, added `.creative-act-application` 2-col grid + `.application-visual` / `.application-text` rules + `.creative-page .creative-act-application .section-title` display override, added `.weavy-placeholder` component, added `.production-cta` + `.production-cta-content` + `.production-cta-statement` + `.production-cta-aside` + `.cta-btn-large` block, added `.visual-date` + `.visual-date-centered` + `.service-card .visual-date` + `.theme-light .visual-date` rules.
- All five HTML files: `style.css?v=110 → v=111`.

Cache state: `style.css?v=111`, `script.js?v=94`.

**Voice rule check:** no em dashes introduced in shipped content.

**Known follow-ups / things to look at in browser:**
- The Weavy placeholder at 4:3 might feel taller than ideal next to the right-column text. If so, switch to 16:10 or 16:9 — single CSS line.
- The `.production-cta` slab inherits `.theme-light`'s `padding-top/bottom: 50vh`, which makes it ~100vh tall. That's the intended "full stop" effect, but if it feels excessive, reduce to `40vh` by overriding on `.production-cta` only.
- Visual-date inside `.service-card` shows "Promptgorillas · 2026" / "Chris le More · 2026". If those feel redundant with the H3, switch to just the year ("2026").
- The cinematic showcase video has the visual-date below it at center. Whether that lands depends on spacing. If it crowds, add more margin-top on `.visual-date-centered`.

**Rollback path:** restore the original `.in-production-cta` block inside `.in-production` from git history; revert the Application section HTML to the single-column `<div class="creative-act-application"><div class="text-block">...</div></div>` form; remove the visual-date spans from each visual; revert the new style.css blocks (production-cta, weavy-placeholder, application 2-col grid, visual-date) and restore the original `.in-production` typography rules.

---

## Iteration notes for future agent runs on this plan

- Between Phase 1 and Phase 2: pause, look at the site in the browser, confirm the new hero subtitle, about copy, R&D proof line, and podcast tagline all land. If any of them feel off, iterate here before Phase 2.
- Between Phase 2 and Phase 3: Phase 2 should make the site feel immediately more polished. If it does not, there is a deeper design issue to investigate before adding more primitives.
- Before Phase 4: the voice direction at the top of this plan (strategy-first, concrete, no platitudes) must be re-read. Copy placeholders that come back in AI-sincerity tone are the failure mode to watch for.
- Before Phase 7: Alex must have at least Promptgorillas hero assets uploaded to Cloudinary. Without real client work the section reduces to more personal experiments, which fails the whole point.
