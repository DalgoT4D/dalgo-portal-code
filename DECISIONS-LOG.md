# DECISIONS-LOG.md
Conversation-only knowledge for the Dalgo Website project (migration handoff). Compiled 25 Jul 2026. Early messages of this chat were trimmed from history; items marked [UNCERTAIN] could not be re-verified verbatim.

---

## 1. DECISIONS MADE (chronological)

### Pre-v2 content fixes (early chat, partially trimmed)
- **"Key Engagement Areas" on the old About page broke with enlarged visuals** — user asked for a revert to the previous state; a revert was performed. Exact regression cause not in surviving history. [UNCERTAIN details]
- **"Join our community" newsletter block was moved below the "Stay in touch" section** — it originally interrupted flow against the search bar. [UNCERTAIN which page/file]
- **FAQ pricing answers blanked deliberately**: user said most pricing answers were "extremely inaccurate" — questions stay, answers ship blank until final copy. Do NOT re-write pricing FAQ answers from imagination.
- **Newsletter card copy**: CTA "Subscribe on LinkedIn" → "Subscribe"; label "Biweekly LinkedIn newsletter" → "LinkedIn newsletter" (was in components/Blueprint.jsx card data).
- **Pricing hero copy shortened** (via user's direct preview edits, mapped to components/PagePricing.jsx): body now ends "…we'll tailor the right plan for you." (dropped "— whether you self-host, want managed hosting, or need consulting"); the line "Prices unchanged for 3 years. Lock your rate for FY26–27." was **removed entirely** (the empty `<p className="pricing-anchor">` remains).
- **Plan renamed "Managed hosting" → "SAAS"** (user's exact spelling — all caps, not "SaaS").
- **Newsletter → Zoho**: footer subscribe form (components/FooterV2.jsx) opens `https://zcmp.in/byTZ` in a new tab on submit. This was the user-requested Zoho Campaigns link; the email typed into the input is NOT passed through — the Zoho page must be filled by the visitor. [POSSIBLY DUPLICATED — visible in code but rationale isn't]
- **Interactive demo chrome URLs**: originally authored as `dashboard.dalgo.org/...` per the demo spec; user later asked to change "the URL on the flow" to `https://insights.dalgo.org/impact`. Implementation happened in a trimmed turn — current DemoTour.jsx state should be treated as authoritative. [UNCERTAIN — verify DTR_STEPS `url:` values before editing]

### Packaging decisions
- **Netlify package (retired)**: `deploy/dalgo-website/` was built twice for Netlify drop; superseded and **deleted** when v2 moved to Vercel. netlify.toml retired per the v2 spec.
- **"Home Page.html" was an exact duplicate of index.html** — deliberately excluded from packages; later deleted with the old-IA pages.
- **"Design Guidelines.html" is an internal doc** — deliberately excluded from every deploy package (still at project root).
- **Single-file build**: user wanted "a single HTML file" for the whole site. Options offered (whole site / homepage only / keep folder); user chose whole site. Built via `_onefile_src.html`: all 11 old-IA pages compiled into one hash-routed document (`#/About.html` style routes), components lifted into `onefile/` with a `window.__RES` asset-resolver, images compressed (photos → JPEG q0.72 max 1400px; logos/sources/illus → PNG max 600px) because the first attempt exceeded the bundler's 30 MiB cap. Output: `Dalgo Website - Single File.html` (5.8 MB). **This predates the v2 IA and is now stale.**
- **Claude Chat upload**: told the user multi-file zips don't render in Claude Chat; single-file version is the right upload there.

### Combined 27-step demo (DemoTour v2)
- Replaced the 5-step Ingest tour with 27 steps (Ingest 5 / Transform 8 / Visualise 14), mode switcher (Full Journey / per-phase), phase-grouped **read-only** progress segments (click-to-jump from the reference was deliberately removed), phase end-cards chaining "Continue to Transform →" etc., stacked mobile mode <768px.
- **Brand-port deviation (important)**: the pasted spec demanded Anek Latin + teal `#00897b` + navy `#0f2440`. I deliberately used the project's own tokens instead (Inter, `--teal #00BFA6`, `--navy #0A2540`) because CLAUDE.md mandates Inter-only and tokens.css as single source of truth. Flagged to user; user never objected. A later v2 spec confirmed Inter/#00BFA6 as correct.
- Step copy, image paths, hotspot coordinates ported **verbatim** from the reference `uploads/demo-3b497289.html` STEPS array — do not rewrite copy or re-guess coordinates.
- **Tooltip placement reversal**: initially per-step manual `tip:{cls,t,l}` coordinates (from the reference); user reported detached tooltips (Visualise step 1). Replaced with **auto-anchoring**: only a `side` hint per step survives; placement tries below→above→right→left, first side where the 300px card fits with ≥16px frame margins; card edge sits 44px from hotspot centre (= 12px gap between pulse ring and arrow tip); arrow slides along the card edge (≥26px from corners) to keep pointing at the hotspot; recomputes on resize/fullscreen via `useLayoutEffect` + resize tick. Verified programmatically: 27 steps × 2 frame widths (full/900px), all passing. **Never reintroduce manual tooltip coordinates.**
- `window.__dtrSet(scope, pos)` global exists on DemoTour purely as a test hook (used by my verification scripts).

### v2 rebuild (launch 31 Jul 2026 spec, pasted 23 Jul)
- **New IA / slugs**: old-IA pages (About/Customers/Case Studies/Why We Exist/Resources/etc.) deleted; 10 lowercase pages created: index, product, impact, consulting, about, learn, pricing, faq, contact, privacy. Old `About.html` content became **product.html**; `Customers.html` content became **impact.html** (user's answer: "/customers page"); `Why We Exist.html` content became **about.html** (labelled "About"); Resources page content folded into learn (redirect /resources → /learn added by me, beyond the user's list).
- **Vercel over Netlify**: vercel.json with `cleanUrls: true` + user-supplied redirect map (/platform→/product, /case-studies→/impact, /faqs→/faq, /join-us→/learn, /why-we-exist→/about, /customers→/impact) + my /resources→/learn addition + asset cache headers.
- **TRIAL_READY flag mechanism** (site-config.js): `window.trialCta()` resolves every Start Free Trial CTA. Built with default **false** per spec (CTA renders "Contact Us" → contact page so label matches destination, BM-307). **REVERSED next turn by user**: now `TRIAL_READY: true` and `TRIAL_URL: 'https://dashboard.dalgo.org'` (reverted from spec's insights.dalgo.org/trial). The flag machinery remains — flip it rather than editing CTAs.
- **Nav order — two reversals**:
  1. v2 spec: Home · Product · Impact · Consulting · Resources▾(About, Learn) + header Pricing text button + Contact ghost + trial primary.
  2. User reorder: Home · Product · Consulting · Impact · Pricing · Learn · Resources▾(About); Pricing became a normal nav item (header text-button treatment dropped — the ⚑ "Pricing placement pending sign-off" flag is moot); Contact Us ghost + Start Free Trial primary restored unconditionally.
  3. User again: **Resources dropdown removed entirely**; About lives in the footer Resources column and in the mobile menu only. Final nav: Home · Product · Consulting · Impact · Pricing · Learn.
- **Homepage reversal**: v2 spec's "slimmed Home with twin Product/Consulting cards" was built (components/TwinCards.jsx), then user demanded the homepage revert "to exactly how it was before": TwinCards removed from index.html; restored flow = Nav, Hero (with pro bono help line restored), Marquee, ProofCollage, PlatformFor, CaseStudy, TrustBand, Nurture, FinalCTA, FooterV2. **TwinCards.jsx still exists but is unused** — don't re-add it to Home.
- **Product page flow replaced** per user's attached old About.html: Nav → AboutHero → DemoTour → PlatformFor → DashboardShowcase → AffordableBand → WhyWeExist → FooterV2. This **dropped** AboutTriad, TrustLayer, WatchDemo (explainer video), FeatureZigzag from the page. AboutHero eyebrow was changed from "About" to "Product".
- **Explainer video**: user supplied YouTube embed `I04SqPYQHIs` (with si=n_iFrrJAj3LHCAXy); wired into PagePlatform's WatchDemo — **but WatchDemo is no longer in the product.html flow after the exact-flow replacement** (see Known Issues).
- **Tour extension to Dashboards/Reports demos** (spec acceptance #4): user explicitly said "Don't make any changes here." Do not extend the tour.
- **About headline**: spec decision — keep current headline, never draft alternatives.
- **Pro bono**: no hour-cap copy anywhere (internally resolved); "Apply for Pro Bono Consulting" once per page, mid-page, never final band. Pro bono application target is the Google Form `https://forms.gle/envgKD2VeRq3Un5y6`.
- **Connector figure**: only "600+ data sources, powered by Airbyte connectors" (swept 700+ instances; also in FAQ JSON-LD).
- **Copy voice rules enforced by sweep** (beyond CLAUDE.md): banned words (leverage, best-in-class, seamless, robust, game-changing, revolutionary, genuinely, honestly, actually…), no "X, not Y" contrast constructions (e.g. PageStory's "for the mission, not the spreadsheet" was rewritten), never "unlimited users" (say "flat annual pricing with no per-user fees"), no "audit logs", RBAC is live, pill CTAs in Title Case.
- **BM-301 (sparse page)** = the Get in Touch/Contact page per user's answer; populated with a 3-step "what happens next" strip (ct-steps), still ⚑ flagged for Himanshu in a code comment.
- **GA4**: clean-slate property, 9-event model implemented as a click-delegation layer in site-config.js (page_view auto, trial_cta_click, contact_cta_click, probono_apply_click, newsletter_subscribe, demo_tour_start, demo_tour_complete, video_play, outbound_click). No-op until GA4_ID is pasted. Note: demo_tour_start/complete and video_play are declared in the comment but rely on `data-ga` attributes / heuristics — wiring for those three is thin. [UNCERTAIN whether all 9 actually fire]
- **Icon rule (BM-308)**: outbound links get the `↗` `.x-ext` SVG icon; internal links use `→`. Applied to footer (LinkedIn, YouTube, GitHub, Project Tech4Dev) and TwinCards.
- **BM-299**: demo screenshots and assets/opt photos converted to WebP (max width 1600px, q0.78–0.8); components repointed. Original PNGs still exist in assets/demo/ alongside the .webp.
- **Deploy package strategy**: `deploy/dalgo-vercel/` is generated from source by a re-sync script that rewrites `*.html` links to clean slugs (`"product.html"` → `"/product"`, index → `/`). **Source files keep .html links so previews work in this workspace; the deploy copy uses slugs.** Any future edit must re-run this sync (the regex lives in several run_script calls in history; pattern: `/(["'`])(index|product|impact|consulting|about|learn|pricing|faq|contact|privacy)\.html(#[A-Za-z0-9_-]*)?(["'`])/g`).

## 2. REJECTED DIRECTIONS
- **Twin Product/Consulting cards on Home** — built per spec, rejected by user; homepage must stay in its pre-v2 design.
- **Pricing as a header text button** (separate from nav links) — replaced by Pricing as a plain nav item.
- **Resources dropdown in nav** — removed entirely after one day.
- **TRIAL_READY=false / Contact-Us-everywhere** — reverted; trial CTA points at dashboard.dalgo.org.
- **insights.dalgo.org/trial as trial URL** — reverted to dashboard.dalgo.org.
- **Manual tooltip coordinates in DemoTour** — replaced by auto-anchoring; do not reintroduce.
- **Click-to-jump progress segments** (in the demo reference) — spec explicitly made segments read-only.
- **Anek Latin / #00897b brand port** for the demo — rejected in favour of CLAUDE.md tokens.
- **Spec's suggested alternate About headlines** — spec itself resolved: keep current.
- **Hour-cap on pro bono copy** — must never appear.
- **"Prices unchanged for 3 years / FY26–27 lock"** pricing anchor line — removed as inaccurate.
- **Netlify deployment** — retired for Vercel.
- **SVG-drawn imagery for consulting cards**: line-icon SVGs were used (CO_ICON set) — acceptable as icons, but real photography was never sourced for consulting. [UNCERTAIN whether user considers this final]

## 3. UNWRITTEN CONVENTIONS
- **Reverts mean "exactly as before"** — this user twice rejected well-intentioned spec-driven changes to surfaces they liked (homepage, CTAs). When they say revert, restore verbatim, not an improved variant.
- **User's specs are pasted as long markdown briefs** with BM-ticket numbers and ⚑ flags; ⚑ means "flag in a code comment, don't block the build". Decisions listed under "resolved since v1" must not be re-questioned.
- **Copy edits arrive as direct preview edits** (dom-diff blocks) — map them to the JSX source; they signal the user edits copy in place, so keep markup canonical/editable.
- **"SAAS"** is the user's chosen plan name spelling.
- **Sentence-case headings with a single teal accent word** (`.hl-underline`/`.cvh-hl` = colour only, never underline) — encoded in CLAUDE.md but reinforced repeatedly. [POSSIBLY DUPLICATED]
- **Deploy artefacts live under `deploy/`** and are always offered as a downloadable folder card; user asks for "the package" often — refresh from source before presenting.
- **Legacy/unused components stay in `components/`** (CasesPage, CaseHub, DemoTour-era files, TwinCards, PageResources, About.jsx, Hero variants…) but are excluded from deploy packages by an explicit include-list. The banned-word sweep found violations in legacy components and left them — they're not shipped.
- **India-first audience**: pricing in ₹ (e.g. ₹2.04L), "India pricing shown, global on request", Superset BYO only (per spec acceptance #7).
- **Page `<title>` pattern**: "{Page} — Dalgo | Data Platform for Nonprofits"; Home reversed ("Dalgo — Data Insights Platform for Nonprofits").
- **Nav active-state logic** must keep supporting BOTH `.html` filenames (workspace preview) and clean slugs (Vercel) — `page.toLowerCase().replace(/\.html$/,'')`.
- **When the user says "render and give me the package"**, they want: re-sync deploy folder → visual check → download card.

## 4. KNOWN ISSUES & UNFINISHED WORK
- **product.html: explainer video (WatchDemo) is NOT on the page** — the v2 spec requires a video slot on /product, and the user's supplied YouTube embed is wired into PagePlatform.jsx's WatchDemo component, but the user's "replace with this HTML's flow exactly" instruction dropped WatchDemo from the render. Unresolved conflict; user was not re-flagged after the flow replacement. Also DashboardShowcase demo dashboards are confirmed-public (spec) and present.
- **product.html: duplicate pro bono CTA risk** — the WhyWeExist/engagement-areas section ends in "Apply for Pro Bono Consulting", and /consulting also has the application form; I flagged this to the user ("say the word if you want it swapped"); no answer. Spec says exactly once per page — per page it's compliant. [UNCERTAIN which component renders that button]
- **faq.html: pricing answers intentionally blank**; whole FAQ marked REPLACE-WITH-FINAL-DOC pending Stuti's document. FAQ JSON-LD contains 4 real Q/As (kept 600+ figure).
- **consulting.html: copy not grounded in the required source docs** — both uploaded "OnePager"/"Offerings" files were the SAME Urja Trust client proposal (~1.5k chars each), not the positioning docs. Pillars + offering descriptions were written from existing site language and flagged REPLACE-WITH-SOURCE-DOC in PageConsulting.jsx. **Engagement-process section deliberately omitted** (no Consulting Process doc) — do not invent stages.
- **Favicons are placeholder teal "D" marks** (favicon.svg + PNGs generated on canvas) pending brand glyph (BM-288/300).
- **GA4_ID empty** in site-config.js — analytics is a no-op.
- **`Dalgo Website - Single File.html` + `_onefile_src.html` + `onefile/` are stale** (old IA, old nav, pre-v2 copy). Rebuild from scratch if a single file is requested again.
- **`dalgo-site/` folder** is an old prototype tree (contains its own components/PagePrivacy.jsx etc.) — not part of the live build. [UNCERTAIN provenance; predates surviving history]
- **assets/demo/*.png originals** still present next to .webp — dead weight in the workspace (deploy package copies only .webp).
- **deploy/_asset-manifest.json** lists 83 referenced assets; the copy into deploy/dalgo-vercel was done in manual batches — if any asset 404s on Vercel, diff the manifest against the folder.
- **BM-303 link-crawl CI step**: swept manually; no CI config was created (out of scope for this workspace).
- **sitemap.xml lastmod** hardcoded 2026-07-23.
- **Old About page regression** ("Key Engagement Areas enlarged visuals") — root cause never diagnosed, only reverted; watch for recurrence when touching that section's CSS.
- **BM-305 mailto** support@dalgo.org — implemented [UNCERTAIN where all instances live; verify with grep].
- **Verifier feedback from the final ready_for_verification runs**: no needs_work callbacks received before migration, but the last verifier fork may not have completed.

## 5. PENDING INPUTS (who/what/where)
- **Real Consulting OnePager + Offerings — Proposals docs** → replace flagged copy in components/PageConsulting.jsx (REPLACE-WITH-SOURCE-DOC comment).
- **Stuti's final FAQ document** → components/Blueprint.jsx FAQ data (REPLACE-WITH-FINAL-DOC marker in faq.html inline script + blank pricing answers).
- **GA4 property id** → site-config.js `GA4_ID: ''`.
- **Brand favicon glyph** → favicon.svg, favicon-32/192/512.png, apple-touch-icon.png.
- **Trial form confirmation (Himanshu/Abhishek)** → originally gated TRIAL_READY; user has pre-emptively set it true pointing at dashboard.dalgo.org — confirm this is the launch intent.
- **Himanshu sign-off on Contact-page section plan (BM-301)** → ⚑ comment in components/PageContact.jsx above ct-steps.
- **Whether product.html should regain the explainer-video section** (spec vs. exact-flow instruction conflict, §4).
- **Consulting Process doc** → enables the omitted engagement-process section.
- **Zoho form integration depth** — current subscribe = open zcmp.in/byTZ in new tab; a native embedded submission (BM-304 "confirm the list platform") was never confirmed.

## 6. FILE-BY-FILE NOTES (what the file can't tell you)
- **site-config.js** — the single switchboard for trial CTAs + GA4. Both values it holds (TRIAL_READY:true, dashboard.dalgo.org) are USER REVERSALS of the written v2 spec; the spec text is not authoritative here anymore.
- **components/Nav.jsx** — fully rewritten twice this chat; `resourceLinks`/`resOpen` remnants may survive though the desktop dropdown is gone [UNCERTAIN — harmless if unused]. Reads `window.__currentPage` (set by the single-file router) before falling back to pathname.
- **components/DemoTour.jsx** — step data is contractually verbatim from uploads/demo-3b497289.html; only `side` hints are tunable. Images are the .webp set with 1600-wide dims baked into `w:`/`h:`. End-card primary routes through `trialCta()`. Contains `window.__dtrSet` test hook.
- **components/TwinCards.jsx** — orphaned (built for slimmed Home, rejected). Delete or keep for reference; not in any page.
- **components/PageConsulting.jsx** — header comment block documents the wrong-source-doc situation and the deliberate omission of the engagement process.
- **components/PagePlatform.jsx** — WatchDemo holds the user's YouTube embed but isn't rendered by product.html (see §4). AboutHero eyebrow says "Product" now.
- **components/PagePricing.jsx** — "SAAS" plan name is user-mandated; pricing-anchor `<p>` intentionally empty; plan CTA goes through trialCta().
- **components/FooterV2.jsx** — subscribe form opens the Zoho link, doesn't POST anywhere; footer Resources column is now the only desktop path to /about (user-mandated).
- **components/Blueprint.jsx** — grab-bag file: FinalCTA, FAQ data (with blank pricing answers), newsletter cards, ProBonoBand, AuditForm. FAQ copy edits belong here.
- **components/PageImpact.jsx** — old cross-page Case Studies links were rewired to in-page `#case-studies` anchors when Case Studies.html was retired.
- **index.html / all pages** — inline `<style>` in faq.html tightens hero-to-list spacing; pages carry `?v=` cache-busting query strings on tokens.css/app.css (bump when editing CSS).
- **app.css** — sections appended chronologically: §31 old demo tour, §31b demo v2, §32 v2 IA/BM-302 hover fixes. `.dtr-*` classes from §31 are still load-bearing for DemoTour v2 (frame, chrome, hotspot, overlay); §31b overrides parts of them. Zero `!important` rule holds.
- **deploy/dalgo-vercel/** — generated artefact; NEVER hand-edit; regenerate via the slug-rewrite sync (see §1 last bullet). Includes only the 21-component include-list + 83-asset manifest, plus favicons/meta files.
- **uploads/** — demo-3b497289.html (27-step reference, canonical STEPS data), demo-68cc2492.html (older 5-step reference), the two mislabeled Urja Trust .docx files + my extracted .txt versions, and all 27 raw demo screenshots (renamed copies live in assets/demo/).
- **assets/demo/** — .png originals + .webp derivatives + `_dims-*.json` scratch files from the compression scripts (safe to delete the JSONs and PNGs).
- **onefile/, _onefile_src.html, "Dalgo Website - Single File.html"** — stale single-file pipeline (old IA). `_meta-list.json` in onefile/ maps resource ids → original asset paths.
- **screenshots/** — QA captures from the tooltip-anchoring verification sweeps; disposable.
- **dalgo-site/** — pre-existing older site tree, untouched this conversation except being grep-matched; do not ship.
- **Design Guidelines.html** — internal reference; excluded from all packages by request-era convention.
- **CLAUDE.md** — the standing rules (Inter only, teal accent colour-only, two stylesheets, zero !important) were enforced against TWO pasted specs that contradicted them (Anek Latin demo spec; v2's restated type rules aligned). CLAUDE.md wins.
