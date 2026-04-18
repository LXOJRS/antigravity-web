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

## Execution log (update after each phase ships)

- **Phase 1 — Text and proof quick wins:** SHIPPED. Variant C ("AI [training / consulting / visuals] for teams that actually ship.") active on the homepage hero with rotating word animation replacing the typing effect. Homepage about section rewritten with "why should I care" framing plus a content placeholder for the current client line. Homepage contact CTA changed to "Let's talk about what you actually need." MANIFESTO monument deleted from about.html. R&D service-intro gained a Promptgorillas content placeholder inline. R&D outro markup upgraded from bare `<p>` to `.outro-statement` + `.outro-aside` pair with content placeholders. Podcast subtitle changed to "We are the fun AI podcast." style.css bumped to v=94 on index.html; script.js bumped to v=88 across all five pages. Legacy `.type-text` and `.cursor` CSS rules kept in place as dead code (no HTML references them). Outstanding: Alex to fill in the placeholders across index.html (about paragraph 2), service-rd.html (service-intro proof line + outro statement + outro aside), and optionally revisit homepage H2 in a later copy pass.
- **Phase 2 — Design polish:** SHIPPED. `.visual-hook video` blue glow replaced with dark shadow. `.services` now has a top border divider; `.insights` gained the same. `.article-banner::after` gradient extended to fade from the top as well as the bottom. `.service-intro` widened from col 3/span 8 to col 2/span 10 and bumped from 1.5rem to 1.75rem. About page rd-row body text muted to 1.3rem at 0.6 opacity so the blue section-titles punch harder. Floating animation class no longer added by JS (CSS rule kept as dead code for safety). Service card image filter softened from grayscale 80/brightness 0.6 to grayscale 60/brightness 0.7. Service card Option A applied: no border, no border-radius, padding 4rem 3rem, gap 0 between cards with thin vertical separators on desktop and horizontal separators on mobile, staggered heights 560/480/520px with 80/40px top offsets on nth-child 2 and 3 (desktop only), hover img scale softened from 1.05 to 1.03. Card-index relocated to top-left at clamp(60px, 8vw, 120px) in accent-color rgba(0,0,197,0.3) for editorial numbered-entry feel.
- **Phase 3 — Narrative primitives:** SHIPPED. `.pull-quote` primitive added with three variants: default centered at col 2/span 10, `.pull-quote.left` left-aligned larger display weight at col 1/span 9, and `.pull-quote .highlight` span for coloring a phrase in accent color. Scale values duplicated from `.outro-statement` (not aliased, to prevent the `.creative-page` !important override from leaking). `.pull-quote .section-label` and `.pull-quote .pull-quote-aside` supported on both variants. Mobile overrides for all. `.rd-row.inverted` modifier added: swaps weight so title is small uppercase gray 1.25rem and body is clamp(1.75rem, 2.75vw, 2.5rem) display weight. Marquee JS refactored from `document.querySelector` singular to `document.querySelectorAll('.typography-portal')` with per-portal forEach containing its own `.marquee-content` selector, horizontal parallax gsap.to, and pulse ScrollTrigger. Subpages can now include `<section class="typography-portal"><div class="portal-marquee"><div class="marquee-content">...</div></div></section>` and the marquee will animate and pulse independently. Homepage marquee behavior preserved (single portal on index.html continues to work as before, just now scoped inside a forEach of length 1).
- **Phase 4 — About page restructure:** Not started. Blocked on Phase 3.
- **Phase 5 — R&D page restructure:** Not started. Blocked on Phase 3.
- **Phase 6 — Podcast Act 1 cleanup:** Not started. Blocked on Phase 3.
- **Phase 7 — Creative Building In Production:** Not started. Blocked on Alex supplying client media assets. While this phase runs, also clean the em dash currently at `creative-building.html:144` per the voice constraint.

---

## Iteration notes for future agent runs on this plan

- Between Phase 1 and Phase 2: pause, look at the site in the browser, confirm the new hero subtitle, about copy, R&D proof line, and podcast tagline all land. If any of them feel off, iterate here before Phase 2.
- Between Phase 2 and Phase 3: Phase 2 should make the site feel immediately more polished. If it does not, there is a deeper design issue to investigate before adding more primitives.
- Before Phase 4: the voice direction at the top of this plan (strategy-first, concrete, no platitudes) must be re-read. Copy placeholders that come back in AI-sincerity tone are the failure mode to watch for.
- Before Phase 7: Alex must have at least Promptgorillas hero assets uploaded to Cloudinary. Without real client work the section reduces to more personal experiments, which fails the whole point.
