# Dalgo site — project instructions

## Design standing rules
- **Never underline or decorate H1/heading accent words.** The accent (`.hl-underline`, `.cvh-hl`, `.pf-title-hl`, and any headline highlight span) is teal **colour only** — no underline, squiggle, border, or `::after` decoration, anywhere.
- CSS architecture: exactly two stylesheets ship — `tokens.css` (variables only, single `:root`) and `app.css` (all components, **zero `!important`**). Solve specificity with selector scope, not `!important`.
- Type: Inter only (no serif/Spectral/DM Sans). Teal is never used for body text (links excepted).
