# Missing assets — exceed the design-transfer 256 KiB cap

Everything in this site was imported from the Claude Design project **"Revised: Dalgo Website"** and verified, **except the 12 image files below**.

**Why they're missing:** the design MCP's `get_file` returns at most 256 KiB per file (it flags `truncated` and has no range/offset parameter). These 12 originals are larger than 256 KiB, so they could not be transferred. They need to be supplied from the original source — download each from the design project and drop it into the exact path listed (the code already references these paths, so **no code changes are needed**).

| Path | Referenced by | Visible on shipped page? | Priority |
|---|---|---|---|
| `assets/consult-1.jpg` | index.html (hero carousel), MeetDalgo/StoriesCarousel | Yes — **homepage** | High |
| `assets/product/pf-integration.png` | index.html, product.html (Data Integration tab) | Yes — **homepage + product** | High |
| `assets/product/dashboard.png` | pricing.html (PagePricing) | Yes — **pricing** | High |
| `assets/product/scorecards.png` | pricing.html (PagePricing) | Yes — **pricing** | High |
| `assets/cases/antarang.png` | impact.html (case grid) | Yes — **customers/impact** | High |
| `assets/cases/shofco-partnership.png` | impact.html (case grid) | Yes — **customers/impact** | High |
| `assets/cases/sneha.webp` | impact.html (case grid) | Yes — **customers/impact** | High |
| `assets/community/bootcamp-2.jpg` | learn.html (PageCommunity) | Yes — **learn** | High |
| `assets/product/pf-charts.png` | PlatformFor "Dashboards & Charts" tab | On tab click (hydrated) | Medium |
| `assets/og-image.png` | `<meta og:image>` on all 10 pages | No (social-share preview only) | Medium |
| `assets/people-1.jpg` | MeetDalgo.jsx / About.jsx | No (not in any shipped page's static HTML) | Low |
| `assets/team/chetan.jpg` | — none — | No (unreferenced; orphan in deploy manifest) | Optional |

## How to fix
1. In the design project, download each file above (same relative path).
2. Place it at the matching path under this project root.
3. Done — references already point there. If you regenerate `deploy/dalgo-vercel`, re-run the slug-rewrite sync afterward.

## Notes
- A smaller optimized copy **`assets/opt/consult-1.webp`** exists in the design project. If you'd rather not use the full-size jpg, the homepage hero can be repointed to it instead.
- `assets/team/chetan.jpg` is not referenced anywhere in the code — safe to skip. The shipped pages use `assets/opt/chetan.webp` (already present).
- All other assets (75 images incl. all logos, sources, illustrations, demo screenshots, optimized photos, and favicons) are present and validated.
