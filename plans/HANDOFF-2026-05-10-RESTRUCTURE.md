# Handoff — 2026-05-10 (Lens AI Restructure)

> **Read this first if you are picking up this repo after the 2026-05-10 session.** This supersedes `HANDOFF-2026-05-04.md` for the brand-integration thread (which was open / undecided in that doc and is now decided in spirit). The V114 + V115 items from the prior handoff are still deferred and not addressed here.

## Critical instruction for the new agent

Same posture as the prior handoff: **nothing in this doc is a locked commitment to ship blindly.** Treat the items below as decided *direction*, but surface anything ambiguous and confirm with Alex before touching code. Several content drafts are still TBD and explicitly flagged as such.

The voice + design rules at `.claude/rules/*.md`, `CLAUDE.md`, and `DESIGN-RULES.md` remain immutable. The structural decisions in this file build on those, not around them.

## Current shipped state

Unchanged from prior handoff. Last commit: `24b4594 Hero Text fix` (V113.5). `style.css?v=112`, `script.js?v=94`. Working tree clean. Only `main` branch.

## What was decided in this session

### 1. Brand decomposition (the strategic shift behind everything below)

The prior handoff framed Lens AI as **training + consulting + visuals** (three lanes, two functional). That framing is now narrowed:

- **Lens AI = visuals only.** It is the commercial production label for branded AI visual work. Voice register: humainmade.com-adjacent. More hip than Alex's personal voice.
- **R&D (training + consulting) = Alex's personal practice.** It is reached through the About narrative, not through the Lens AI brand. Hiring Alex personally = R&D. Hiring Lens AI = visuals.
- **AI-Rated Podcast = personal / cultural.** Unchanged.

This is the decision behind the navigation choice and the homepage section choice below. It is not yet documented in `CLAUDE.md` or `.claude/rules/*` but should be considered the new mental model.

### 2. Navigation (locked direction)

Four-item top nav, **spread across the top edge** (not corner-aligned), bold weight:

```
ABOUT      LENS AI      AI-RATED PODCAST      CONTACT
```

- `ABOUT` is a **hover-fold (dropdown) menu**. Hovering the item reveals two options: `About` and `R&D`. Clicking the `ABOUT` label itself navigates directly to `about.html` (i.e., the parent label is itself a link, not just a hover affordance). The dropdown options link to `about.html` and `service-rd.html` respectively.
- `LENS AI` scrolls to the new homepage Lens AI section (anchor scroll). A dedicated `/lens-ai.html` is a likely future addition but not in this restructure phase.
- `AI-RATED PODCAST` scrolls to the new homepage Podcast section (anchor scroll). The existing `podcast.html` subpage stays.
- `CONTACT` continues to anchor-link to `#contact` on the homepage. Consider giving it a quiet hover treatment (icy-blue underline or `→` on hover) so the conversion action earns the eye without breaking nav uniformity.

Mobile fallback for the `ABOUT` fold-menu needs design intent, not just a CSS hover (touch devices have no hover). Suggested: tap `ABOUT` opens the submenu; a second tap on `ABOUT` (or tap-outside) collapses it. Or expand to show both as siblings inline. Surface this question.

The current `.nav-logo[data-glitch="ALEX.AI"]` block is **removed** in v2. The glitch effect is parked, see section 4.

### 3. Hero v2 (locked spec, see screenshot in conversation)

The reference screenshot in the 2026-05-10 conversation is the source of truth. Spec, in detail:

- **No top-left logo / no `ALEX.AI`.** Removed entirely.
- **Top nav** as described in section 2 above, occupying the top edge of the viewport, bold and spread.
- **Photo / video frame**: portrait orientation, approximately **3:4 aspect ratio**, centered horizontally. Top and bottom of the frame have negative space (i.e., the frame is contained inside the hero, it does not bleed to viewport edges vertically). The frame is the visual anchor of the hero composition.
- **The video is the exact still that's in the screenshot, with subtle subject motion** — the people gently moving inside the frame, no camera move, no zoom. Treat the source clip as a low-motion ambient loop, not a kinetic scene. Implication: legibility for the type overlay is high, but Lens AI's craft still reads through subtle life in the image.
- **Hero typography is unchanged.** `.hero-title` with `.line > span` structure stays. `CLEAN / AI / PRODUCTIONS` sizing, font weight (800), letter-spacing (-0.04em), the stroked treatment on `PRODUCTIONS` via `.highlight`, and the GSAP entry animation all preserved. Type sits **over the image frame** — `CLEAN` and `AI` overlap the photo, `PRODUCTIONS` extends beyond the frame edges horizontally (this is intentional; do not constrain it to the photo width).
- **Subtitle pill (new):** `AI [training | consulting | visuals] for teams that actually ship.` Wraps the entire subtitle in **a single unified rounded pill** (not segmented per-word boxes). Suggested baseline:
  - `background: rgba(0, 0, 0, 0.55)` with `backdrop-filter: blur(8px)`
  - `border-radius: 12-16px`
  - Horizontal padding ~16-20px, vertical ~8-10px
  - The pill width fits the text content (does not span full viewport)
- **Subtitle rotating word widens** from `[training]` to `[training / consulting / visuals]`, animated in `#BFE8F8` (icy blue accent, the existing `--accent-color`). This is the only icy-blue moment in the hero; preserves the system thread.

What stays unchanged: GSAP `.hero-rotate` rotation cadence, magnetic hover on `[data-magnetic]`, Lenis smooth scroll setup.

### 4. Glitch effect (parked, not lost)

The current `[data-glitch="ALEX.AI"]` treatment is being removed from the hero with v2. Do **not** delete the underlying CSS / JS that drives the effect — leave it in place as a tool available for future use. Candidate future homes for the glitch (decision deferred):

- A Lens AI section accent on the homepage
- A hover-only effect on a subhead somewhere
- An on-load moment that decays after a couple of seconds

If removing the literal `<div class="nav-logo" data-glitch="ALEX.AI">` element from `index.html`, leave a one-line HTML comment in its place: `<!-- glitch effect (.nav-logo / data-glitch) parked V11x — see HANDOFF-2026-05-10-RESTRUCTURE.md -->`

### 5. Homepage section structure (planned order)

Top to bottom on `index.html`:

1. Hero (v2, as specified above)
2. **Lens AI section** (NEW — full landing-page section, content TBD; see open questions)
3. **AI-Rated Podcast section** (NEW — full landing-page section, content TBD; see open questions)
4. About preview / capabilities (existing pattern, may or may not change)
5. Latest Thinking / Insights (existing, unchanged)
6. Contact (existing, unchanged)

**R&D does not get a homepage section.** It lives only on `service-rd.html` and is reached via:
- The `ABOUT` hover-fold menu in the top nav
- Internal links from the About page (see About page work, section 6)

This is the practical expression of the brand decomposition: Lens AI and the Podcast are externally-facing surfaces that earn homepage real estate. R&D is positioned as Alex's personal practice and is reached through the About narrative.

The existing `.visual-hook` parallax video below the hero may need to be removed or restructured as part of this — the new hero v2 owns the imagery moment that `.visual-hook` previously delivered downstream. Confirm with Alex before deleting; it may want to live elsewhere on the page or be replaced by the Lens AI section's own visual.

### 6. About page work (drafts pending, planned in this restructure)

Items pulled from Alex's to-do list. These are not yet drafted but should be incorporated into the structural plan so the right scaffolding exists:

- **Replace the current first pull-quote** (`Shape ideas forward` / whatever sits as the about-hero or first `.pull-quote.left`) with a "continuous AI exploration" framing. Strongest specific candidate: lead with the MCP-for-YouTube-analytics anecdote as proof. Pull-quote copy is TBD and Alex will draft / approve.
- **Add a hub-cards section** near the bottom of `about.html` linking to `service-rd.html`, the new Lens AI section/page, and `podcast.html`. Three cards, same `.insights-card` register or a custom variant — let the design choice fall out of the rest of the homepage rhythm.
- **Add a "Recent build" or similar moment** that documents the YouTube Analytics MCP Alex built for the podcast. This is "show, don't tell" for the build-by-exploration claim. Could be a single `.rd-row` with a small uppercase label, or a new pattern. Surface the structural choice for Alex.
- **Add a cultural-background thread** weaving in film studies + literary studies. This must be **connected to the work**, not biographical. Frame: composition + argument structure are the same skills AI prompting requires. Natural home: the existing Method or Scope `.rd-row`. Copy is TBD.

All four are content + minor structural changes. They do not break any existing animations or design tokens.

## What is explicitly NOT changing

Do not touch any of the following without an explicit instruction from Alex:

- Hero typography sizes, weights, animation, stroke treatments. The CSS for `.hero-title`, `.hero-title .line span`, and `.highlight` stays as-is.
- The GSAP entry animation on the hero, the `.hero-rotate` rotating-word logic, the magnetic-hover system on `[data-magnetic]`, Lenis smooth scroll.
- Brand color `#BFE8F8` and `--accent-color`.
- Voice rules per `.claude/rules/voice.md`.
- The no-em-dashes rule for shipped content (commits to the rule remain unchanged: docs/plans CAN have em-dashes; HTML content CANNOT).
- `DESIGN-RULES.md` authority. If this restructure surfaces a needed change to the design system, document it deliberately, do not let it happen incidentally.
- `.theme-light` 50vh padding pattern (V106-stable).
- Existing GSAP scroll animations on About / R&D / Creative Building / Podcast pages.

## Files likely to be touched

- `index.html` — top nav (fold menu), hero region, new Lens AI section, new Podcast section, possible removal of `.visual-hook`
- `about.html` — pull-quote rewrite, hub cards section, MCP anecdote moment, cultural-background thread
- `style.css` — nav fold-menu styling, subtitle pill styling, new section styling, possible hero frame container, possible hero typography overflow handling for `PRODUCTIONS` extending beyond the photo frame
- `script.js` — nav fold-menu interaction (hover + touch), possible video-loop tuning, possible removal of `.visual-hook` animation hook
- All five HTML files — cache version bumps as usual

## Workflow

Alex is using Claude Code with **plan mode** for this restructure. The plan that comes out of plan mode will be sent back to the design-critique session (this conversation's parent) for alignment review before execution. Branches + Firebase preview channels remain available but optional — discuss with Alex whether to use them for this work.

## Open questions Claude Code should surface (do not assume)

1. **Lens AI homepage section — structural shape.** Single hero block? Card grid? Case-study preview row? Voice direction is humainmade.com-adjacent (straightforward, hip, less consulting-platitude). Content shape undecided.
2. **AI-Rated Podcast homepage section — structural shape.** Existing `podcast.html` is rich — does the homepage section preview a single latest episode, list latest 3, surface the dictionary entry, or do something else?
3. **About hub cards.** Do they replace the existing homepage `Capabilities` section (which currently links to R&D / Podcast / Creative Building), or sit alongside? The prior `Creative Building` page is now folded into Lens AI, so its standalone card may not survive.
4. **`.visual-hook` parallax video below the hero.** Keep, replace, remove? See section 5.
5. **`ABOUT` fold-menu mobile behavior.** Tap-to-expand? Sibling-inline expansion? See section 2.
6. **The LENS AI nav item's link target.** Anchor-scroll to homepage section only, or eventual `/lens-ai.html` page?
7. **Rotating word widening.** Confirm `[training / consulting / visuals]` order. Three-word rotation may need cadence tuning vs. the current single-word implementation (`1400ms` per the design rules) — surface if visible.

## Sign-off

Last commit at handoff write time: `24b4594 Hero Text fix`. If the next agent wants to verify state matches: `git log --oneline -6 && git status` from the repo root.
