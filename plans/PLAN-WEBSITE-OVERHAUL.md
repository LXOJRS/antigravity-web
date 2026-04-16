# PLAN — Website Overhaul: Narrative, Rhythm & Agency-Level Design

> **Status:** Ready for review. Builds on PLAN-NARRATIVE-PACING.md and DESIGN-RECOMMENDATIONS.md.
> **Author:** Cowork audit agent — visited alexojers.com live + read all source files + reviewed existing plans.
> **Scope:** All pages. Includes homepage (index.html), which existing plans explicitly excluded.
> **Intended workflow:** Same as PLAN-NARRATIVE-PACING: iterate on this document before running prompts. Execute one prompt per session, review in browser, come back and refine.

---

## Part 1: Honest Assessment — What the Site Gets Right

Before tearing anything down, worth naming what works:

1. **The design system is genuinely strong.** Dark editorial, Inter, monument type, GSAP reveals, Lenis smooth scroll, cinematic video — the bones are agency-level. The problem is never "this looks cheap." It's "this reads flat."
2. **Creative Building is the best page on the site.** Act structure works, video is compelling, the shoe + portrait video create genuine editorial atmosphere. This page is closest to the vision.
3. **The GSAP infrastructure is excellent.** Scroll-linked reveals, parallax, stagger animations — all wired and working. The toolkit is there; it's just underused on subpages.
4. **The 12-column grid with intentional asymmetry** is a strong editorial choice. The reversed rd-rows create visual rhythm when they work.

---

## Part 2: The Core Problem — Why the Site Doesn't Engage Strangers

You said: *"Let's assume people are not highly interested in me or my site."* That's the right lens. Here's what I observed visiting every page cold:

### The Narrative Problem

The site talks **about Alex** but never answers the visitor's question: **"Why should I care?"** Every page assumes the reader is already invested. The About page is a manifesto for someone who doesn't need a manifesto. The R&D page describes services without showing outcomes. The Podcast page tells you what the podcast is but not why you'd listen.

**The fix isn't better copy (though that helps). It's structural.** The pages need to earn attention at every scroll position, not just at the top.

### The Rhythm Problem

The existing plans nail this diagnosis — "boxes of text under boxes of text" — and the solutions are good. I'm endorsing the PLAN-NARRATIVE-PACING approach (pull-quotes, inverted rows, page marquees) with some adjustments.

### The Cohesion Problem (NEW — not addressed in existing plans)

Each page feels like it was built in isolation. There's no **throughline** connecting the homepage to subpages. The homepage says "SHAPE IDEAS FORWARD" and "THINK • DECIDE • CREATE" — but those frameworks disappear the moment you click into any subpage. The About page says "MANIFESTO." The R&D page says "UNCERTAINTY." The Creative page says "CREATE." These aren't connected. They're isolated monuments.

**The website needs a spine.** Something that threads through every page so the visitor feels like they're going deeper into one world, not bouncing between four unrelated microsites.

### The Proof Problem (NEW — critical for agency-level)

You are shipping AI visuals to PromptGorillas (hero images, LinkedIn content, advertisements). You're delivering AI shots to Chris le More. You have actual client work. **None of this is on the site.** The Creative Building page has beautiful personal work but zero evidence anyone is paying for it. The R&D page describes workshops but shows no outcomes. The About page mentions a cum laude thesis model but never explains it.

Agency-level sites have one thing personal portfolio sites don't: **proof of real-world impact.**

---

## Part 3: Agreement with Existing Plans

I'm endorsing the following from PLAN-NARRATIVE-PACING.md and DESIGN-RECOMMENDATIONS.md. These are good, feasible, and should ship:

### From PLAN-NARRATIVE-PACING:

- ✅ **Prompt A (Primitives)** — `.pull-quote`, `.rd-row.inverted`, marquee JS refactor. Low risk, high payoff. Ship first.
- ✅ **About page pull-quote** — Breaking the rd-grid monotony with a display-weight statement. The structural fix (closing `.rd-grid` before pull-quote, reopening after) is correct and well-documented.
- ✅ **R&D 5→3 row collapse** — Absolutely necessary. 5 consecutive same-weight rows is the worst plateau on the site.
- ✅ **Podcast Act 1 cleanup** — Removing top CTAs and the logo video from content flow. The CTAs before narrative is an engagement killer.
- ✅ **Copy cut targets** — 40-60% reductions are right. The current copy reads like extended abstracts.

### From DESIGN-RECOMMENDATIONS:

- ✅ **#1 Horizontal rules between rd-rows** — 1 CSS rule, high impact. Ship with Prompt A.
- ✅ **#4 Top gradient on article banners** — CSS-only, cinematic depth. Ship with Prompt A.
- ✅ **#7 Add rd-numbers to About page** — HTML-only, already in the codebase pattern. Ship with Prompt B.
- ✅ **#11 Stagger-reveal on text blocks** — JS snippet, reuses existing GSAP patterns. Ship with Prompt A.
- ✅ **#3 Increased vertical spacing** — CSS tweak, more breathing room. Ship with Prompt A.

---

## Part 4: Challenges to Existing Plans

### Challenge 1: "MANIFESTO" monument should go

The existing plan keeps the MANIFESTO monument on the About page ("keep. First rhythm beat."). I disagree.

**Why:** You said it yourself — "kind of AI-like cringe." And you're right. "MANIFESTO" is the kind of word an AI copywriter reaches for when it wants to sound important. It signals self-importance without earning it. A visitor who doesn't know Alex reads "MANIFESTO" and thinks "oh, one of these."

**Fix:** Replace with a monument word that's earned by the content below it. The About page is structured as Reality → Scope → Origin → Method. The throughline is **how thinking translates into practice.** Better monument words: `TRANSLATE` or `PRACTICE` or `APPLIED`. Or — bolder — no monument on About at all. Use the space for a pull-quote instead, which carries both weight AND meaning.

**Feasibility:** Same markup, different word. Zero risk.

### Challenge 2: The Podcast preloader (Prompt E) is unnecessary complexity

The existing plan proposes repurposing the logo video as a session-scoped page-load preloader with GSAP fade, sessionStorage checks, reduced-motion handling, and escape-key dismissal.

**Why I'd cut it:** This is ~80 lines of JS + CSS + HTML for a feature that (a) only fires once per session, (b) delays content, and (c) is the kind of thing that breaks in edge cases (slow connections, browser back-button, prerender). The plan itself flags it as "medium risk" and "an easy own-goal." For a vibe coder relying on Claude Code, this is exactly the kind of feature that creates debugging headaches disproportionate to its value.

**Alternative:** If the podcast page needs a tone-setter, a full-bleed static image or short autoplay video at the top (like the homepage's visual-hook) is simpler, more reliable, and already an established pattern in the codebase.

**Feasibility concern:** High. Preloaders interact with browser loading states in unpredictable ways. Not worth the risk when Prompt D already delivers a clean Act 1.

### Challenge 3: The podcast subtitle "The fun AI podcast for Gen-Z" is limiting

The existing plan locks in this subtitle. But:

1. It limits your audience. People over 30 who are interested won't click if they read "for Gen-Z."
2. It positions the podcast by demographic rather than by value.
3. "Fun" is a claim, not a hook. Show the fun; don't announce it.

**Alternative directions:**
- *"AI the way it actually shows up — messy, funny, no explainers."*
- *"The AI podcast that doesn't take itself seriously."*
- *"AI without the LinkedIn voice."*

These communicate the same energy without excluding anyone.

---

## Part 5: NEW Plans — What the Existing Plans Miss

### NEW Plan 1: Homepage Narrative Overhaul (index.html)

Both existing plans explicitly exclude the homepage. But the homepage is where 80%+ of visitors form their first impression, and right now it's the weakest narrative on the site.

**Current problems:**
1. **"SHAPE IDEAS FORWARD"** is vague. It could be a design agency, a consultancy, a self-help brand. It doesn't communicate what Alex does or why it matters.
2. **The typing subtitle** is generic placeholder energy. The animated cursor typing out a tagline is a 2019 pattern that signals "template."
3. **Section 01 "WHO IS ALEX?"** answers with two sentences that could describe any consultant: "I help teams apply AI..." This is the most important section on the entire site and it's two lines of nothing.
4. **The service cards** are the best part of the homepage — clear, visual, navigable. These work.
5. **"THINK • DECIDE • CREATE" marquee** is the strongest brand element on the site. But it appears once, between services and insights, as decoration rather than as a structural spine.
6. **"Let's Evolve"** as a CTA is vague. Evolve into what? It's the kind of line that sounds motivational but says nothing.

**Proposed restructure:**

1. **Hero** — Keep "SHAPE IDEAS FORWARD" for now (it's the brand line, changing it requires a positioning pass) BUT replace the typing subtitle with a static, concrete line that answers "what does this person actually do?": *"AI adoption training. Visual production. Strategic consulting."* — Three concrete things. No animation. No mystery.

2. **Section 01** — Rewrite to answer "why should I care?" before "who is Alex." Lead with the problem the visitor has, not with Alex's identity:
   > *"AI is everywhere and most teams are guessing. I help professionals stop guessing — through training, consulting, and hands-on visual production."*

3. **Service cards** — Keep. They work. Consider adding a one-line proof point to each card (e.g., "Currently embedded at PromptGorillas" on Creative Building).

4. **Insights section** — Works. No changes.

5. **Contact** — Replace "Let's Evolve" with something concrete: *"Let's talk about what you actually need."* This callbacks to the voice direction (strategy-first, starts with the question).

**Risk: Low.** Text changes + removing a typing animation. No structural HTML changes needed. The typing effect is in script.js and can be replaced with a static `<p>`.

**Feasibility: High.** Claude Code can do text replacements and remove a JS animation without risk.

### NEW Plan 2: Creative Building — Show the Client Work

This is the page with the most untapped potential because you have REAL client work that isn't shown.

**Current state:** The page has personal/exploratory AI visuals (shoe, portrait video, cinematic showcase). Beautiful, but it reads as personal experimentation, not a service offering.

**What's missing:**
- PromptGorillas hero images and brand visuals you created
- Chris le More clothing brand AI shots
- Any before/after or brief→output examples
- Any indication that people are paying for this

**Proposed addition — "In Production" section:**

After the current Act 2 (cinematic showcase + Application section), before the outro, add a new section:

```
Section: IN PRODUCTION
---
A grid of 2-3 client case thumbnails, each with:
- Client name (PromptGorillas, Chris le More)
- One line: what was delivered
- One hero image from the actual work
- Optional: link to the live usage (PromptGorillas website, LinkedIn post)
```

This transforms the page from "personal experiments" to "working professional with clients." It's the single highest-impact change for converting visitors into inquiries.

**HTML pattern:** Reuse the existing `.services-grid` / `.service-card` pattern from index.html. Same layout, same scroll reveals, same styling. No new CSS needed.

**Risk: Low.** Reuses existing patterns. Only needs new Cloudinary image uploads for the client work.

**Feasibility: High.** Claude Code can copy the card pattern and populate it with the right content and image URLs. You'd need to upload the client work images to Cloudinary first.

### NEW Plan 3: Site-Wide Narrative Spine — Connect the Pages

**The concept:** The homepage's "THINK • DECIDE • CREATE" marquee is your strongest brand framework. But it only appears once and doesn't connect to subpages. Each subpage should feel like going deeper into one of these three pillars.

**Proposed mapping:**
- **R&D page** = THINK (research, strategy, uncertainty work)
- **About page** = DECIDE (judgment, method, the Value Fit model)
- **Creative Building** = CREATE (visual production, the medium)
- **Podcast** = Sits across all three (entertainment + critical thinking)

**Implementation:**
1. Each subpage gets a small breadcrumb-style label in the header area: `THINK → R&D, Consultancy & Workshops`. Not a nav element — a positioning marker that tells the visitor where they are in Alex's world.
2. The page marquees (proposed in PLAN-NARRATIVE-PACING) can reinforce this: R&D marquee = `THINK • QUESTION • EXPLORE`, About marquee = `SHAPE • DECIDE • LEARN`, Creative marquee = `CREATE • PRODUCE • ITERATE`.
3. The homepage service cards get a subtle label linking to the framework: Card 01 shows "THINK" above the title, Card 02 shows "LISTEN" or "EXPLORE", Card 03 shows "CREATE".

**Risk: Low.** Text additions and small label elements. No structural changes.

**Feasibility: High.** HTML text additions + reusing `.section-label` CSS.

### NEW Plan 4: About Page — Kill the Resume, Build the Story

The current About page reads like a structured CV (Reality → Scope → Origin → Method). The WebFetch audit was brutal but honest: *"this reads as polished but distant... Real engagement would require examples — a failed project, a specific aha-moment."*

The existing PLAN-NARRATIVE-PACING improves the rhythm (pull-quotes, inverted rows, marquees) but doesn't fix the underlying content problem: **the sections describe Alex's qualities without earning the reader's trust.**

**Proposed content direction (for the copy rewrite pass):**

1. **Reality** — Don't describe what teams struggle with abstractly. Give ONE concrete example: *"Last month a marketing team showed me their AI workflow. They'd spent three weeks generating content that nobody used. The tools worked fine. The thinking behind them didn't."*

2. **Scope** — Instead of listing sectors, name ONE outcome: *"I've run sessions for [X] where we cut their content production cycle from two weeks to three days — not by adding more AI, but by rethinking what they actually needed to produce."*

3. **Origin** — The film/rhetoric/business background is your unique differentiator. But right now it reads as resume padding. Make it narrative: *"I didn't come to AI through computer science. I came through film, where I learned that what you leave out matters more than what you show. Through rhetoric, where I learned that how you frame a question determines the answer. Through business strategy, where I learned that most 'AI strategies' are technology strategies that forgot to start with the business problem."*

4. **Method** — The Value Fit model is mentioned but never explained. Either explain it in one concrete sentence (*"The Value Fit model is a framework I built to answer one question: where does AI actually fit your goals, and where are you forcing it?"*) or cut the mention entirely. Half-explaining something important is worse than not mentioning it.

**Risk: Medium.** Copy changes only, but they need to be good. Claude Code can implement the HTML changes; you need to finalize the actual copy.

**Feasibility: High for implementation, Medium for copywriting.** Recommend writing the copy yourself or in a dedicated copy session, then having Claude Code implement it.

### NEW Plan 5: R&D Page — Add One Concrete Proof Point

The WebFetch audit said: *"No evidence. No testimonials, case studies, or tangible outcomes."* The R&D page is the most important commercial page and it has zero proof.

**Minimum viable proof:** Add ONE concrete line to the service-intro or first rd-row:

*"Currently embedded as AI trainer and visual producer at PromptGorillas — running workshops, building brand assets, and shaping their AI adoption strategy."*

This is one sentence. It transforms the page from "here's what I theoretically do" to "here's what I'm currently doing for a real company." It's not a full case study (that's a separate plan), but it's the difference between browsing and believing.

**HTML:** One `<p>` tag addition inside `.service-intro` or the first `.rd-row .text-content`.

**Risk: Extremely low.** One line of text.

**Feasibility: Extremely high.**

---

## Part 6: Revised Order of Operations

Combining existing plans with new proposals, ordered by impact and safety:

### Phase 1 — Quick Wins (ship in one session, ~30 min)

**Prompt 0: Text & Proof Fixes**
- Replace "MANIFESTO" monument with `TRANSLATE` or `PRACTICE` (or remove)
- Add PromptGorillas proof line to R&D service-intro
- Replace homepage typing subtitle with static concrete line
- Rewrite "Let's Evolve" → "Let's talk about what you actually need"
- Fix R&D outro markup: bare `<p>` → `<p class="outro-statement">` + `<p class="outro-aside">`

Risk: extremely low. Text changes only. No CSS, no JS.

### Phase 2 — CSS Primitives (existing Prompt A + design recommendations)

**Prompt A (enhanced):**
- Add `.pull-quote` CSS block (~15 lines)
- Add `.rd-row.inverted` modifier (~15 lines)
- Add `rd-row + rd-row` horizontal rule separator
- Add top gradient on article banners
- Increase text-block vertical spacing
- JS: marquee `querySelector` → `querySelectorAll` refactor
- JS: text-block stagger-reveal

Risk: low. Additive CSS + one localized JS refactor.

### Phase 3 — Page Restructures (existing Prompts B, C, D)

Execute these one at a time, review in browser between each:

**Prompt B:** About page restructure (pull-quote, inverted row, marquee, copy rewrite)
**Prompt C:** R&D page restructure (5→3 collapse, UNCERTAINTY monument, pull-quote, marquee)
**Prompt D:** Podcast Act 1 cleanup (remove top CTAs, remove logo video from flow, full-width prose)

Risk: medium per prompt. The nth-child grid split on About is the riskiest single change.

### Phase 4 — Narrative Spine (new)

**Prompt F:** Site-wide framework labels
- Add THINK/DECIDE/CREATE labels to homepage service cards
- Add breadcrumb-style positioning labels to subpage headers
- Adjust page marquee words to reinforce framework

Risk: low. Text/label additions only.

### Phase 5 — Creative Building Upgrade (new, requires asset upload)

**Prompt G:** "In Production" client work section
- Upload PromptGorillas and Chris le More work to Cloudinary
- Add client case grid using existing service-card pattern
- Position between Act 2 and outro

Risk: low structurally, but blocked on having the client images uploaded to Cloudinary.

### Deferred / Cut

- ❌ **Podcast preloader (Prompt E)** — Cut. Too much complexity for too little payoff. If needed later, revisit after all other changes are stable.
- ⏳ **Homepage hero positioning rewrite** — Deferred to a separate brand positioning pass, as the existing plan already notes. The quick fixes in Prompt 0 are enough for now.
- ⏳ **Full case study page** — Deferred. The "In Production" section on Creative Building is the minimum viable version. A full `/case-studies/` page is a future project.
- ⏳ **About page deep copy rewrite** — The narrative direction is in Part 5 Plan 4, but the actual copywriting needs a dedicated session. Claude Code implements; Alex writes.

---

## Part 7: Feasibility Notes for Vibe Coding with Claude Code

Every recommendation in this plan has been checked against these constraints:

1. **No new dependencies.** Everything uses existing GSAP + Lenis + vanilla JS.
2. **No new CSS architecture.** New classes follow existing patterns (`.pull-quote` mirrors `.outro-statement` scale; `.rd-row.inverted` is a modifier on existing `.rd-row`).
3. **No structural HTML changes that touch nth-child logic** — except the About page grid split, which is documented precisely in PLAN-NARRATIVE-PACING with the exact fix.
4. **All JS changes are localized.** The marquee refactor touches lines 302-327 only. Text-block stagger is additive. No changes to existing animation logic.
5. **Cloudinary CDN for all assets.** No local image management complexity. Upload to Cloudinary, get URL, paste into HTML.
6. **Firebase deploy after each prompt.** The existing CI/CD workflow handles this.

**Landmine warnings:**

- **The About page nth-child grid split** (Prompt B) is the single highest-risk change. The existing plan documents this perfectly — close `.rd-grid` before pull-quote, reopen after. If Claude Code misses this, the column math breaks silently. **Verify in browser immediately after this prompt.**
- **The marquee JS refactor** (Prompt A) can break the homepage if the `forEach` loop isn't correctly scoped. **Test the homepage marquee after this prompt before touching anything else.**
- **Don't let Claude Code touch `style.css` lines that have `!important`** overrides (the `.outro-statement` and `.creative-page` chains). The existing plan warns about this. New classes should duplicate values, never alias.
- **Cache busting**: bump `?v=` numbers on style.css and script.js references in EVERY HTML file after each prompt. Claude Code sometimes forgets this.

---

## Part 8: Success Criteria

When this entire plan is complete:

1. **A stranger can scan the homepage in 10 seconds** and know: (a) Alex helps teams with AI adoption, (b) he does training + visuals + consulting, (c) there's a podcast.
2. **Scrolling any subpage feels like a scored sequence** — rising and falling weight, at least one moment that makes you stop scrolling.
3. **Every page has at least one proof point** — a client name, a concrete outcome, a real example.
4. **The THINK • DECIDE • CREATE framework** is visible across the site as a connecting spine.
5. **No page reads as "boxes of text under boxes of text."** Every page has at least one rhythm break (monument, full-bleed, marquee, or pull-quote) between every two content blocks.
6. **The Creative Building page makes someone want to hire Alex for AI visuals** — because they can see client work, not just personal experiments.

---

## Appendix: Reference Sites for the Vision

The existing DESIGN-RECOMMENDATIONS.md mentions Lama Lama, Extract Studio, and MetaLab. Those are good references for polish. For the **narrative** ambition, also look at:

- **Rauno Freiberg's site (rauno.me)** — personal site that feels like a product. Minimal, purposeful, every word earned.
- **Fiftytwo.studio** — agency portfolio where the work speaks and the text just frames it.
- **Basement Studio (basement.studio)** — dark editorial + technical craft, similar vibe to what Alex is building.

The gap between alexojers.com and these sites isn't design skill — it's editorial discipline. Fewer words, more proof, stronger rhythm.
