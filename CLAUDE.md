# Dalgo site — project instructions

## Design standing rules
- **Never underline or decorate H1/heading accent words.** The accent (`.hl-underline`, `.cvh-hl`, `.pf-title-hl`, and any headline highlight span) is teal **colour only** — no underline, squiggle, border, or `::after` decoration, anywhere.
- CSS architecture: exactly two stylesheets ship — `tokens.css` (variables only, single `:root`) and `app.css` (all components, **zero `!important`**). Solve specificity with selector scope, not `!important`.
- Type: Inter only (no serif/Spectral/DM Sans). Teal is never used for body text (links excepted).
- **Type scale — 9 steps (Phase 1 visual system, Oct 2026).** Every size is a token in `tokens.css`: `--fs-display` (fluid hero H1) · `--fs-section` 36 · `--fs-sub` 28 · `--fs-card` 22 · `--fs-lede` 20 · `--fs-body` 18 · `--fs-ui` 15 · `--fs-label` 13 · `--fs-micro` 12. No ad-hoc or half-pixel sizes render — the 9 tokens replace the old 10.5/11.5/12.5/13.5/14.5/15.5 values. The scale is applied in the `PHASE 1 — VISUAL SYSTEM` block at the end of `app.css` — a design-system layer that loads last on purpose and is where each tier's size is set; keep new type work there, not scattered. **Two deliberate off-scale exceptions — do not "fix" them:** form controls (`input, select, textarea`) stay at 16px to stop iOS Safari zooming on focus; the event bar / pop-up text (`.evt-banner-*`, `.evt-popup-*`) stays at 14px by design.

## Copy length — hard gate
- **A section description must never exceed 2 rendered lines.** Applies to `.section-sub`,
  `.se-sub`, `.pg-section-sub`, `.cvh-sub` (hero body), `.comm-lead`, `.pricing-help-line` —
  any supporting line under a heading. A third line is a **failure**, not a nitpick.
- **Fix it by widening the container, not by editing the copy.** Copy is Stuti's — no copy
  change ships without her explicit go-ahead, even to satisfy this rule. If a description
  cannot fit two lines at a reasonable width, raise it with her rather than trimming.
- Enforced by `scripts/check-copy-length.mjs`, which runs inside `npm run build` and exits 1
  on any violation. It measures with Inter's real glyph advances against each class's real
  container width. **Do not merge with this failing.**
- The gate reads the baked HTML, so it must run *after* `.prerender.js` — `npm run build`
  chains compile → faq-schema → seo-meta → prerender → check for exactly this reason.
- When you widen a container, update the matching width in `scripts/check-copy-length.mjs`
  or the gate measures against the old value.

## Copy ownership
- **Never rewrite, shorten, or reword site copy without Stuti's explicit go-ahead** — including
  to satisfy a design rule. Propose the change and wait. (7 Aug 2026, after I trimmed eight
  section descriptions, two of them lines she had supplied verbatim that same day.)

## Composition rules (full doc: `~/Downloads/Dalgo/Dalgo website/Website Design Sytem /02-composition-principles.md`)
- **Section backgrounds: 3 only** — `--surface-0` (default), `--surface-1` (the ONE tint), `--navy`/`--navy-2` (max 1–2 dark bands/page). `--surface-2` is component-only (inputs/chips/thumbs), never a section bg. Never two tinted sections adjacent.
- **Section padding — the band rhythm (updated Oct 2026, Phase 1 visual system).** Body sections share one value so every seam between them is identical: `--section-pad` (80, white) and `--section-pad-lg` (80, tinted/dark bands). Two bands sit tighter on purpose: `--section-pad-sm` (40, slim strips — logo marquee, quote strips) and `--hero-pad` (64, the hero band only — enough room that it isn't cramped, tight enough that the logo strip stays in the first fold). Mobile: body 48, strips 32, hero 48. No custom section paddings outside these four tokens.
- **One quote-card pattern for every testimonial**: white card, `--r-xl`, `--shadow-card`, quote ≤28px **weight 500**, ONE mint `<mark>` highlight (replaces bold), name/role attribution, optional real-photo panel. No naked pull-quotes.
- **Hero visual = one `.cvh-figure` per page, one image, no collages.** Three variants: default (photo, 4:3, `max-width:512px`), `.cvh-figure-illus` (product-illustration, 16:10, softer `--shadow-card`, mint bg), `.cvh-figure-cover` (end-to-end photo panel — stretches to full copy-column height via `.cvh-grid:has(.cvh-visual-cover)`). A hero shows a product illustration OR a photo of the people it describes — never another page's customer photo.
- **Hero height is content-driven (updated Oct 2026, Phase 1 visual system).** `--hero-h: 0` — the hero band is as tall as its own copy plus the fixed `--hero-pad` (64 top and bottom), so each page's hero is the height its content needs. This replaces the earlier fixed-floor approach (every page the same height via `min-height` on `.cvh-grid`); heroes now vary slightly between pages, and the reason is that internal spacing — which a reader actually sees — is identical on every page, instead of short-copy pages carrying dead space to match tall ones. Still don't set *per-page* `--hero-h` values; one token, content-driven, everywhere.
- **Step sequences**: uniform white cards on a tinted band; number inside the step label; no watermark numerals, no arrows, no per-card colour alternation.
- **Accordions closed by default.** Display text ≥20px is weight ≤500 (headings exempt).
- **QA gate**: verify every change at section boundaries in full-page context (screenshot the seams), across ≥2 viewports, against these rules — not just token conformance.
- **Logo/asset visibility gate**: for any monochrome logo wall or image-on-background, verify EACH asset is visible against its background — measure per-asset luminance, don't eyeball one and assume the rest. A luminance-preserving filter (grayscale/contrast) CANNOT rescue a pale asset on white; pale wordmarks need `brightness(0)` silhouette, solid filled emblems need grayscale (silhouette turns them into black blobs). The marquee splits on `.logo-img` (silhouette) vs `.logo-img.is-solid` (grayscale) — see `Marquee.jsx` header.
