# alexojers.com — Project Context for Claude

Entry point for any Claude session working in this repository. Read this first.

## What this is

Static website for Alex Ojers: AI adoption trainer + AI visuals producer. Dual positioning: he trains teams on AI, and he builds AI visuals commercially (currently shipping work for Promptgorillas, Chris le More). Site is hosted on Firebase.

Stack: plain HTML / CSS / JS. No build step. GSAP 3.12.5 + Lenis 1.0.45 via CDN. Five pages: `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `lens-ai.html`. (`creative-building.html` was renamed to `lens-ai.html` in V114; a Firebase 301 redirect catches old URLs.)

## Current shipped state (as of 2026-05-10, V114)

- **Version: V118** (style.css?v=117, script.js?v=97 across all 5 HTML files). V118 = Overused Grotesk variable replaces Inter as the primary `--font-main` site-wide. Inter stays loaded via Google Fonts as a fallback. `.lens-ai-wordmark` (nav `LENS AI` + homepage `.lens-ai-headline`) keeps its Alte Haas Grotesk Bold override from V117 follow-up. Earlier V117 = brand color shift to `#121212` / `#fafafa`; V116 = asset swaps + "How I work" cutoff fix; V115 R1 = post-V114 punch list.
- V114 = Lens AI restructure (brand decomposition). Four-item nav with ABOUT hover-fold. Hero v2 with portrait video frame + unified pill subtitle. New homepage Lens AI + Podcast sections. `creative-building.html` renamed to `lens-ai.html` with voice rewrite drafts. About-page rewrite (landing text, first pull-quote, Recent Build rd-row, cultural-background thread, hub cards). Old homepage `.services` Capabilities block removed. `.visual-hook` removed. Glitch effect parked (CSS retained, HTML removed). Many `[CONTENT: ...]` placeholders pending Alex's approval.
- theme-light live color transition working on About Scope/Method, R&D Focus+Format, AND the Lens AI subpage closing CTA
- Value Fit Model is on About Method row, side-by-side with the text, titles inside the wedges (V112)
- Homepage hero says "CLEAN / AI / PRODUCTIONS" with the V114 portrait-frame video behind the type stack
- Full execution history in `plans/PLAN-EXECUTION-V1.md`

## ⚠ New session picking up this repo: read the handoff first

**Current handoff: `plans/HANDOFF-2026-05-10-RESTRUCTURE.md`** — this is the active document. It captures the Lens AI brand decomposition decision (Lens AI = visuals only; R&D = Alex's personal practice; Podcast = personal/cultural), the new four-item nav with `ABOUT` as a hover-fold menu, the hero v2 spec (no `ALEX.AI`, portrait photo frame, unified subtitle pill, rotating-word widening to `[training / consulting / visuals]`), the planned homepage section structure (Lens AI section + Podcast section get homepage real estate; R&D does not), and the planned About page rewrite items. **Read this before any structural work.**

`plans/HANDOFF-2026-05-04.md` is still relevant for the V114 + V115 deferred items (mobile pass + cross-page nav) which were not addressed in the 2026-05-10 session. The Lens AI brand-integration brainstorm in that earlier handoff is now superseded by the 2026-05-10 decisions.

**Discuss anything in either handoff with Alex before implementing.** Plans there are open for verification, not commitments.

## Critical rules (read before any change)

1. **No em dashes** (—) in shipped content. Use periods, commas, parentheses, or colons. This applies to all rendered text. HTML comments can contain em dashes; plan and execution-log markdown files can also contain them.
2. **Voice is strategy-first, not abstract wisdom.** Alex's positioning is concrete problem-solving, not "judgment" or "discernment" or other consulting platitudes. See `.claude/rules/voice.md`.
3. **Brand color is `#BFE8F8`** (icy blue). The old `#0000C5` deep blue has been globally replaced and should not reappear anywhere in the codebase.
4. **Background is `#121212` and primary text is `#fafafa` as of V117.** Pure black (`#050505` / `#000`) and pure white (`#fff` / `#ffffff`) should not appear as hardcoded color values in new code; use `var(--bg-color)` and `var(--text-color)` or the shifted hex values directly. Exceptions: depth-compositing shadows (text-shadow / box-shadow) intentionally retain pure-black `rgba(0,0,0,…)` for cleaner falloff.
5. **Cache bumping**: always bump `style.css?v=` and `script.js?v=` on every HTML file when those assets change. Current: `style.css?v=117`, `script.js?v=97`.
6. **theme-light padding is fixed at 50vh** top/bottom. Do NOT animate padding. Earlier versions (V103-V105) did and caused layout shift bugs that were architecturally fixed in V106 by moving to fixed padding with only color animating.

## Where things live

### Source
- HTML pages at root: `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `lens-ai.html`
- `style.css` at root (single file, ~2815 lines)
- `script.js` at root (single file, ~615 lines)

### Documentation
- `DESIGN-RULES.md` — current living design system (updated V106)
- `DESIGN-RECOMMENDATIONS.md` — historical pre-V101 input audit (most recommendations shipped, kept for reference)

### Plans
- `plans/PLAN-EXECUTION-V1.md` — master execution log with all versions (V96-V106+). Update this when shipping work.
- `plans/PLAN-NARRATIVE-PACING.md`, `plans/PLAN-WEBSITE-OVERHAUL.md`, `plans/DESIGN-UX-QUICK-WINS.md` — historical phase plans, all shipped

### Prompts
- `PROMPT-1-HTML-RESTRUCTURE.md` through `PROMPT-10-FINAL-TOUCHES.md` at root — historical prompt files from the initial phases. All executed. Kept for reference only.

### Agent rules
- `.claude/rules/design.md` — design system pointers for agent context
- `.claude/rules/voice.md` — writing and voice constraints
- `.claude/rules/architecture.md` — CSS and JS architecture notes

### Assets
- Images and videos are hosted on Cloudinary (account `dnkcu6lne`). No local asset pipeline.
- Firebase config in `firebase.json`, project id `website-dea0d`.

## Outstanding work (as of V114)

For detailed open threads, see `plans/HANDOFF-2026-05-04.md` and `plans/HANDOFF-2026-05-10-RESTRUCTURE.md`. Quick summary:

- **V114 content placeholders** await Alex's approval. Many `[CONTENT: ...]` placeholders shipped as part of the V114 restructure: about.html landing text + first pull-quote + Recent Build (MCP) anecdote + cultural-background paragraph + three hub-card descriptions; index.html Lens AI section headline + tagline; index.html Podcast featured-episode title + blurb; lens-ai.html page-hero + service-intro + two case-card framings + production-CTA + application paragraphs.
- **V114 reel asset URL** for the homepage Lens AI section. Currently using the same nature loop as the hero as a placeholder. Alex will provide a portrait Lens AI reel.
- **Mobile pass + cross-page nav** (formerly slated for V114/V115 in the 2026-05-04 handoff) — shifted to a future version since V114 is now consumed by the restructure.
- **Glitch effect** parked. CSS keyframes retained at style.css 113–303. No HTML uses `data-glitch="ALEX.AI"` anymore. Available for future use (e.g. a Lens AI accent or hover treatment).
- **Chris le More card href="#"** still awaits real destination link
- **Promptgorillas card href="#"** still awaits real destination link
- **Podcast episode taglines and episode bodies still contain em dashes** (existing content predating the V102 copy rewrite, intentionally not modified)
- **OG image metadata** on `index.html` and `about.html` still references the old abstract profile image URL
- **KVK number** for Lens AI is not yet in hand; once received, footer credit can be added
- **Dead CSS** from earlier phases is still present (`.floating`, `.creative-text-col`, etc.). Harmless; safe to leave

## How to ship new work

1. Read `plans/PLAN-EXECUTION-V1.md` to understand where things stand.
2. Make the changes in source files.
3. Bump cache versions on all 5 HTML files if you changed `style.css` or `script.js`.
4. Add a new entry to the execution log in `plans/PLAN-EXECUTION-V1.md` with:
   - Version number (continue from latest, e.g. V107)
   - What changed and why
   - Files modified
   - New cache versions
   - Any known follow-ups or rollback paths
5. Verify no em dashes were introduced in new content.
6. Test visually in browser before declaring done.

## Philosophy / voice direction (brief)

Alex is positioned as strategy-first, concrete, uncertainty-forward. His work starts with "what do you actually need?" before touching a tool. Commercial framing around AI visuals is "for brands that want a distinct visual world, not another stock image." Podcast is "the fun AI podcast" (in Dutch, with his girlfriend Morgan). Visual building is "I hate AI-slop. My mission is to create AI visuals that always feel intentional and impressive."

See `.claude/rules/voice.md` for the full voice direction and placeholder conventions.

## Deployment

Firebase hosting. From repo root: `firebase deploy`. No build step, no bundler. What's in the repo is what goes live.
