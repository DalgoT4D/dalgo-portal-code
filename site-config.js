// Site-wide config + GA4 event layer. TRIAL_READY default false until Himanshu/Abhishek confirm the trial form.
window.SITE_CONFIG = {
  // ==== TRIAL CTA — ONE SWITCH ====
  // Set TRIAL_URL to the real trial-signup URL and flip TRIAL_READY to true. That single change
  // turns "Try Platform for Free" on in the nav (desktop + mobile drawer) and reveals the trial band
  // on /product between the tour and the capability grid. Nothing else needs editing.
  //
  // Production trial signup. Swapped off the staging placeholder 15 Aug 2026 once
  // insights.dalgo.org/free-trial went live (verified 200, a real Next.js signup page — it 404'd
  // earlier the same day, before it shipped).
  // Because this host IS in TRIAL_PROD_HOSTS, two things happen automatically: the rel="nofollow"
  // that guarded the staging link disappears, and scripts/trial-guard.mjs reports OK instead of
  // warning. Nothing else needs editing.
  TRIAL_READY: true,
  TRIAL_URL: 'https://insights.dalgo.org/free-trial',
  // Hosts considered production for the trial CTA. Anything else is treated as non-production:
  // the link gets rel="nofollow" and the build warns.
  TRIAL_PROD_HOSTS: ['app.dalgo.org', 'insights.dalgo.org'],
  GA4_ID: 'G-ZTDMFE4S5K', // live property (same ID as the current dalgo.org site), set 6 Aug 2026
  // Single destination for every "Book Free Consultation" CTA — the pro-bono data
  // consulting form (Stuti, 7 Aug 2026). Three different forms.gle URLs were in use
  // before this; route every consultation CTA through window.consultCta() so they
  // cannot diverge again.
  CONSULT_FORM: 'https://forms.gle/6vpR5LKpV29zvyxK9',
  // Public Luma events calendar ("Dalgo Events"). Stored CLEAN — utm is appended per surface by
  // window.withUtm(), so the same URL can carry a different utm_medium from the hero, the ticker
  // and the pop-up instead of one baked-in medium lying about where the click came from.
  EVENTS_CALENDAR: 'https://luma.com/dalgo',
  // Featured resource in the nav Resources panel. Time-bound again as of 26 Aug 2026 (Stuti):
  // the TDF webinar replaces the evergreen Data Decoded newsletter card.
  // Title and blurb are the event's own facts, taken from the Luma page — not written copy.
  // Thumbnail is localised from Luma's og:image into assets/events/ so the nav makes no
  // third-party image request; it is 1600x840 (1.905), which matches .nav-dd-featimg's
  // aspect-ratio: 800/420 exactly, so nothing crops.
  // utm_source=website is appended by window.featuredResource() below — do not bake it in here
  // or the link ends up with it twice.
  // ⏳ EXPIRES 11 Sep 2026 — swap or revert to an evergreen card after the event.
  FEATURED_RESOURCE: {
    kicker: 'Webinar',
    title: 'Driving Beneficiary Impact from Data',
    blurb: 'Lessons from 1000 Days Fund · 11 September · Online',
    img: 'assets/events/tdf-webinar.webp?v=d0732a01',
    href: 'https://luma.com/lk7hunh6',
    cta: 'Register'
  },
  // ===== Site-wide announcement bar + one-time home pop-up (EventPopup.jsx) =====
  // tickerLead is the fixed opening of the bar: the offer. Each entry in events[] then renders
  // as its own LINK reading "<city>, <when>", each pointing at that city's own registration
  // page, with a drawn arrow marking the turn from the offer to the two ways of taking it.
  // Earlier passes styled those links as pill chips and appended "→ Register" to each, which
  // put the word Register twice inside a 40px strip beside the lead sentence and set two
  // button-looking objects in a band that is otherwise a line of text. Both are gone: the
  // action is named once, by the lead, and carried per link by the aria-label.
  // whenShort is currently UNUSED — it existed because the bar wanted "6 Oct" while the pop-up
  // rows wanted "6 October", and as of 15 Sep (Stuti) the bar spells the month out too, so both
  // surfaces read `when`. Kept because it costs nothing, but note that changing a date now
  // means changing `when` or the bar will not move.
  // The bar is static — see the note in
  // app.css — so per-city links are safe here; they were not while the text was scrolling.
  // events[] drives both the bar links and the pop-up rows. Set EVENT_BANNER to null to hide
  // both once the events have passed.
  //
  // Event hrefs are CLEAN. window.withUtm() adds utm_source=website plus a per-surface
  // utm_medium at render, so a Bangalore click from the pop-up is distinguishable from the same
  // event clicked anywhere else. Never bake utm into these values or it lands twice.
  EVENT_BANNER: {
    tickerLead: 'Register for Data Decoded, a one day data strategy session for nonprofits',
    // The bell emoji came off the lead 15 Sep. An emoji renders in a different family at a
    // different optical weight from Inter and sat above the text baseline, so the line started
    // with a wobble; the bar now opens with a drawn calendar icon from Nav.jsx instead.
    //
    // Heading + supporting line are EXACT copy from Stuti (15 Sep) — do not reword. They set the
    // conversion hierarchy for the dialog: offer, then scope, then the two dated cards below.
    // popupHeading also names the dialog for screen readers (aria-labelledby).
    popupHeading: 'Register for Data Decoded',
    popupSub: 'A one day data strategy event for nonprofits in Bangalore and Delhi.',
    cta: 'Register',                   // per-event row, and the single-event primary button
    events: [
      {
        title: 'Data Decoded with Dalgo',
        when: '6 October', whenShort: '6 Oct', where: 'Bangalore',
        blurb: 'A one day data strategy session for nonprofits',
        href: 'https://luma.com/uiwzzd76',
        img: 'assets/events/data-decoded-oct.webp?v=f85cfb97',
        alt: 'Data Decoded with Dalgo — a strategy day for nonprofits in Bangalore, 6 October 2026.'
      },
      {
        title: 'Data Decoded with Dalgo',
        when: '29 October', whenShort: '29 Oct', where: 'Delhi',
        blurb: 'A one day data strategy session for nonprofits',
        href: 'https://luma.com/5yqjry8c',
        img: 'assets/events/data-decoded-delhi.webp?v=9a7a7808',
        alt: 'Data Decoded with Dalgo — a strategy day for nonprofits in Delhi, 29 October 2026.'
      }
    ]
  }
};
// Appends campaign params to an outbound link. ONE place, so utm_source is never missing and
// never doubled, and each surface passes its own utm_medium — the hero, the ticker, a pop-up row
// and the pop-up's "see all" button are then separable in GA4 even when they share a URL.
window.withUtm = function (href, medium) {
  if (!href || !/^https?:/.test(href)) return href;
  var sep = href.indexOf('?') > -1 ? '&' : '?';
  return href + sep + 'utm_source=website' + (medium ? '&utm_medium=' + medium : '');
};
// Returns the featured resource for the nav panel (null hides the Featured column).
window.featuredResource = function () {
  var r = window.SITE_CONFIG.FEATURED_RESOURCE;
  if (!r) return null;
  return Object.assign({}, r, { href: window.withUtm(r.href, 'nav_featured') });
};
// The trial CTA label lives here and nowhere else, so a rename is a one-line change — and the
// cta_click listener picks the new name up on its own, because it reads whatever text is on screen.
//
// ALWAYS returns an object, never null: Blueprint.jsx, DemoTour.jsx and SiteHero.jsx all
// dereference the result directly, so a null here would throw in three places. When the trial
// is not ready it falls back to Contact Us -> /contact, which keeps label and destination
// honest (BM-307).
window.trialCta = function () {
  var c = window.SITE_CONFIG;
  if (!(c.TRIAL_READY && c.TRIAL_URL)) return { label: 'Contact Us', href: '/contact', ext: false };
  return { label: 'Try Platform for Free', href: c.TRIAL_URL, ext: true, nofollow: !window.trialUrlIsProd() };
};
// True when TRIAL_URL points at a real production host. While it points anywhere else (staging,
// a preview, localhost) the trial links carry rel="nofollow", so linking from production cannot
// hand crawlers a path into an un-noindexed staging site. Self-correcting: swap in the production
// URL and the nofollow disappears on its own.
window.trialUrlIsProd = function () {
  var c = window.SITE_CONFIG;
  if (!c.TRIAL_URL) return false;
  try {
    var h = new URL(c.TRIAL_URL).hostname;
    return (c.TRIAL_PROD_HOSTS || []).indexOf(h) > -1;
  } catch (e) { return false; }
};
// True only when there is a real trial destination to send someone to. Use this to decide
// whether a trial-specific CTA should exist at all (the /product band, the nav primary).
window.trialReady = function () {
  var c = window.SITE_CONFIG;
  return !!(c.TRIAL_READY && c.TRIAL_URL);
};
// Builds the rel attribute for a CTA descriptor from trialCta()/consultCta(). Keeps the
// noopener + conditional nofollow logic in one place instead of repeating it at every call site.
window.ctaRel = function (c) {
  var parts = [];
  if (c.ext) parts.push('noopener');
  if (c.nofollow) parts.push('nofollow');
  return parts.length ? parts.join(' ') : undefined;
};
// rel for a bare href, for call sites that only have a URL rather than a CTA descriptor
// (SiteHero builds its buttons from label + href). Without this the nofollow protection has
// holes: any component that renders the trial URL without going through trialCta() would emit
// a followable link into staging. Keep every trial-capable anchor on ctaRel or relForHref.
window.relForHref = function (href) {
  var parts = [];
  if (/^https?:/.test(href)) parts.push('noopener');
  var c = window.SITE_CONFIG;
  if (c.TRIAL_URL && href === c.TRIAL_URL && !window.trialUrlIsProd()) parts.push('nofollow');
  return parts.length ? parts.join(' ') : undefined;
};
// Every "Book Free Consultation" CTA resolves through this — one destination, always external.
window.consultCta = function () {
  return { label: 'Book Free Consultation', href: window.SITE_CONFIG.CONSULT_FORM, ext: true };
};
// GA4 bootstrap (no-op until GA4_ID is set).
(function () {
  var id = window.SITE_CONFIG.GA4_ID;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (id) {
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', id);
  }
})();

// ===== cta_click — one event, names as parameters (BM-396) =====
// Before this, the ONLY gtag calls on the site were js + config: page_view fired and nothing
// else, so all 37 consultation buttons shared one forms.gle URL and were indistinguishable,
// and the 23 internal "Contact Us" links were not captured at all. Key events = 0.
//
// Scope is ACTION CTAs — the green (primary) and white (ghost) buttons, plus the Product
// dashboard/report links. Deliberately NOT tracked, because they are clicks rather than calls
// to action: nav links, nav dropdown items, the mobile drawer, footer columns and socials, the
// logo, support@dalgo.org, FAQ accordion toggles, story-carousel tabs and arrows, marquee dots,
// the tour scope tabs, and the capability pills. The last two are in-page toggles and are
// earmarked for a separate page_clicks event — not this one.
//
// The listener reads whatever text is on the button, so a copy change (e.g. the trial flow
// renaming CTAs to "Try Platform for Free") needs no code change here. What DOES break on a
// rename is any GA4 conversion keyed on a cta_name string — define those in the GA4 UI, where
// they can be edited without a deploy, not in here.
(function () {
  var CTA = [
    '.btn.btn-primary', '.btn.btn-ghost',
    '.cmh-btn-primary', '.cmh-btn-ghost', '.cmh-btn-wa',
    '.nurture-btn',
    '.si-readall', '.vp-section-cta',
    '.final-cta-btn', '.final-cta-btn-ghost',
    '.pf-cta', '.co-probono-btn',
    '.dsh-link', '.dsh-card a',
    '.pricing-help-line a',
    '.dtr-card-actions .btn',
    '.evt-banner-cta', '.evt-popup-cta'
  ].join(',');

  // Normalise to the label a human sees. Trailing glyphs are decorative and must go: several
  // labels carry a literal arrow ("View All FAQs →") and .btn-primary::after appends another in
  // CSS, so leaving them would split one CTA into two metrics that never reconcile.
  function ctaName(el) {
    var t = (el.textContent || '').replace(/\s+/g, ' ').trim().replace(/[\s→✓➜➡»>]+$/, '').trim();
    if (!t) t = (el.getAttribute('aria-label') || '').trim();
    if (!t) { var img = el.querySelector('img'); t = img ? (img.getAttribute('alt') || '').trim() : ''; }
    return t.slice(0, 100); // GA4 caps parameter values at 100 chars
  }

  // Capture phase, so the event is recorded even if a handler downstream stops propagation or
  // the browser starts unloading for an outbound link.
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || typeof t.closest !== 'function') return;
    var el = t.closest(CTA);
    if (!el) return;
    var name = ctaName(el);
    if (!name) return; // never send an empty cta_name — an unnamed row is unusable in reports
    var params = {
      cta_name: name,
      cta_destination: el.getAttribute('href') || '(button)'
    };
    // Optional: distinguishes CTAs that share a label/destination across placements, e.g. the
    // event ticker vs. the home-page pop-up both say "Register now" and link to the same event.
    var location = el.getAttribute('data-cta-location');
    if (location) params.cta_location = location;
    // TODO(BM-356): gate on Consent Mode v2 once it lands, defaulting to denied under DPDP.
    window.gtag('event', 'cta_click', params);
  }, true);
})();
