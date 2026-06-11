# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## YOU MUST follow these rules on every change

1. **NEVER use em dashes (—) in shipped content.** Use periods, commas, parentheses, or colons instead. HTML comments and files in `plans/` may contain em dashes; rendered page text never may. Exception: podcast episode bodies contain legacy em dashes from before V102 — do not rewrite them unless explicitly asked.
2. **NEVER use `#0000C5`** (old deep blue). Brand color is `#BFE8F8` (icy blue).
3. **NEVER hardcode pure black or white** (`#000`, `#fff`, `#ffffff`, `#050505`) as color values in new CSS. Use `var(--bg-color)` / `var(--text-color)` or `#121212` / `#fafafa` directly. Exception: shadow values (`rgba(0,0,0,…)`) are fine.
4. **ALWAYS bump `style.css?v=` and `script.js?v=`** on ALL 9 HTML files (5 root pages + 4 files in `insights/`, including `article-template.html`) whenever either asset changes. Current versions: `style.css?v=131`, `script.js?v=102`. (The old "5 files" wording caused the insights pages to drift to a stale `v=81`; fixed in V131.)
5. **NEVER animate `.theme-light` padding.** It is fixed at `50vh` top/bottom; only CSS color variables animate on scroll. Animating padding causes layout-shift bugs (broke in V103-V105, architecturally fixed in V106).
6. **Before any structural work**, check `plans/` for the latest `HANDOFF-*.md` file and read it. Discuss anything in it with Alex before implementing — plans there are open for verification, not commitments.

## Stack

Plain HTML/CSS/JS. No build step, no bundler, no npm. Five pages at root: `index.html`, `about.html`, `podcast.html`, `service-rd.html`, `lens-ai.html`, plus article pages in `insights/`. Single stylesheet (`style.css`, ~4700 lines) and single script (`script.js`, ~810 lines). GSAP 3.12.5 + Lenis 1.0.45 self-hosted in `vendor/` since V131 (previously CDN). Firebase hosting; `firebase.json` restricts what deploys (markdown, `plans/`, zips, and the article template are excluded from hosting).

## Architecture

- All scroll animations via GSAP ScrollTrigger. Smooth scroll via Lenis.
- `.theme-light` sections invert colors via scoped CSS variables (`--theme-bg`, `--theme-fg`, etc.) animated by GSAP on scroll enter/exit.
- Full-bleed breakouts: `width: 100vw; position: relative; left: 50%; margin-left: -50vw` with internal padding to re-align content.
- Assets (images, video) on Cloudinary account `dnkcu6lne`. No local asset pipeline.
- Version numbering increments linearly (V96, V97 …). Never skip. Full history in `plans/PLAN-EXECUTION-V1.md`.

For detailed CSS/JS patterns → `.claude/rules/architecture.md`
For design system and visual primitives → `DESIGN-RULES.md` and `.claude/rules/design.md`
For copy and voice constraints → `.claude/rules/voice.md`

## Shipping

1. Edit source files.
2. Bump `style.css?v=` and `script.js?v=` on all 9 HTML files (root + `insights/`) if either asset changed.
3. Log the change in `plans/PLAN-EXECUTION-V1.md`: version number, what changed, files modified, new cache versions, any follow-ups.
4. Verify no em dashes in new rendered content.
5. `firebase deploy` from repo root.
