# alexojers.com — Project Context for Claude

Entry point for any Claude session working in this repository. Read this first.

## What this is

Static website for Alex Ojers: AI adoption trainer + AI visuals producer. Dual positioning: he trains teams on AI, and he builds AI visuals commercially (currently shipping work for Promptgorillas, Chris le More). Site is hosted on Firebase.

Stack: plain HTML / CSS / JS. No build step. GSAP 3.12.5 + Lenis 1.0.45 via CDN. Five pages: `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `creative-building.html`.

## Current shipped state

- **Version: V106** (style.css?v=104, script.js?v=94 across all 5 HTML files)
- All seven structural phases complete (Phase 1-7 plus tune-ups V96-V106)
- theme-light live color transition working on About Scope/Method and R&D Focus+Format
- Full execution history in `plans/PLAN-EXECUTION-V1.md`

## Critical rules (read before any change)

1. **No em dashes** (—) in shipped content. Use periods, commas, parentheses, or colons. This applies to all rendered text. HTML comments can contain em dashes.
2. **Voice is strategy-first, not abstract wisdom.** Alex's positioning is concrete problem-solving, not "judgment" or "discernment" or other consulting platitudes. See `.claude/rules/voice.md`.
3. **Brand color is `#BFE8F8`** (icy blue). The old `#0000C5` deep blue has been globally replaced and should not reappear anywhere in the codebase.
4. **Cache bumping**: always bump `style.css?v=` and `script.js?v=` on every HTML file when those assets change. Current: `style.css?v=104`, `script.js?v=94`.
5. **theme-light padding is fixed at 50vh** top/bottom. Do NOT animate padding. Earlier versions (V103-V105) did and caused layout shift bugs that were architecturally fixed in V106 by moving to fixed padding with only color animating.

## Where things live

### Source
- HTML pages at root: `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `creative-building.html`
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

## Outstanding work (as of V106)

- **Chris le More card href="#"** awaits real destination link
- **Promptgorillas card href="#"** awaits real destination link
- **Podcast episode taglines and episode bodies still contain em dashes** (existing content predating the V102 copy rewrite, intentionally not modified to avoid scope creep)
- **Hero subtitle rotating word** interval is 1400ms; tunable
- **OG image metadata** on `index.html` and `about.html` still references the old abstract profile image URL. The on-page about portrait was updated to `pg_alexander-2_lpp3aj.jpg` but OG tags were left untouched.
- **Dead CSS** from earlier phases is still present (`.floating`, `.creative-text-col`, `.application-visual-col` etc.). Harmless; can be cleaned in a future refactor.

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
