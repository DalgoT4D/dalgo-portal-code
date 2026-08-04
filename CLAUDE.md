# Dalgo site — project instructions

## Design standing rules
- **Never underline or decorate H1/heading accent words.** The accent (`.hl-underline`, `.cvh-hl`, `.pf-title-hl`, and any headline highlight span) is teal **colour only** — no underline, squiggle, border, or `::after` decoration, anywhere.
- CSS architecture: exactly two stylesheets ship — `tokens.css` (variables only, single `:root`) and `app.css` (all components, **zero `!important`**). Solve specificity with selector scope, not `!important`.
- Type: Inter only (no serif/Spectral/DM Sans). Teal is never used for body text (links excepted).

## Composition rules (full doc: `~/Downloads/Dalgo/Dalgo website/Website Design Sytem /02-composition-principles.md`)
- **Section backgrounds: 3 only** — `--surface-0` (default), `--surface-1` (the ONE tint), `--navy`/`--navy-2` (max 1–2 dark bands/page). `--surface-2` is component-only (inputs/chips/thumbs), never a section bg. Never two tinted sections adjacent.
- **Section padding: 3 values only** — `--section-pad` (56, white), `--section-pad-lg` (80, tinted/dark bands), `--section-pad-sm` (32, slim strips); mobile 40/56/24. No custom section paddings.
- **One quote-card pattern for every testimonial**: white card, `--r-xl`, `--shadow-card`, quote ≤28px **weight 500**, ONE mint `<mark>` highlight (replaces bold), name/role attribution, optional real-photo panel. No naked pull-quotes.
- **Hero visual = one `.cvh-figure` per page, one image, no collages.** Three variants: default (photo, 4:3, `max-width:512px`), `.cvh-figure-illus` (product-illustration, 16:10, softer `--shadow-card`, mint bg), `.cvh-figure-cover` (end-to-end photo panel — stretches to full copy-column height via `.cvh-grid:has(.cvh-visual-cover)`). A hero shows a product illustration OR a photo of the people it describes — never another page's customer photo.
- **Step sequences**: uniform white cards on a tinted band; number inside the step label; no watermark numerals, no arrows, no per-card colour alternation.
- **Accordions closed by default.** Display text ≥20px is weight ≤500 (headings exempt).
- **QA gate**: verify every change at section boundaries in full-page context (screenshot the seams), across ≥2 viewports, against these rules — not just token conformance.
- **Logo/asset visibility gate**: for any monochrome logo wall or image-on-background, verify EACH asset is visible against its background — measure per-asset luminance, don't eyeball one and assume the rest. A luminance-preserving filter (grayscale/contrast) CANNOT rescue a pale asset on white; pale wordmarks need `brightness(0)` silhouette, solid filled emblems need grayscale (silhouette turns them into black blobs). The marquee splits on `.logo-img` (silhouette) vs `.logo-img.is-solid` (grayscale) — see `Marquee.jsx` header.
