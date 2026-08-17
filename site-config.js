// Site-wide config + GA4 event layer. TRIAL_READY default false until Himanshu/Abhishek confirm the trial form.
window.SITE_CONFIG = {
  // ==== TRIAL CTA — ONE SWITCH ====
  // Set TRIAL_URL to the real trial-signup URL and flip TRIAL_READY to true. That single change
  // turns "Try Dalgo for Free" on in the nav (desktop + mobile drawer) and reveals the trial band
  // on /product between the tour and the capability grid. Nothing else needs editing.
  //
  // Still false as of 15 Aug 2026 because there is no trial URL to point at. Verified today:
  //   insights.dalgo.org/trial   -> 404
  //   insights.dalgo.org/signup  -> 404
  //   dashboard.dalgo.org        -> 301 to insights.dalgo.org/welcome?redirect=/ (a LOGIN screen)
  // Sending a cold visitor to a login screen under a "Try Dalgo for Free" label breaks the rule
  // that a CTA's label must match its destination (BM-307), so the flag stays off until the real
  // link lands. With it off the nav keeps "Book Free Consultation" — no regression, nothing
  // misleading shipped.
  TRIAL_READY: false,
  TRIAL_URL: '', // <-- put the trial-signup URL here, then set TRIAL_READY: true
  GA4_ID: 'G-ZTDMFE4S5K', // live property (same ID as the current dalgo.org site), set 6 Aug 2026
  // Single destination for every "Book Free Consultation" CTA — the pro-bono data
  // consulting form (Stuti, 7 Aug 2026). Three different forms.gle URLs were in use
  // before this; route every consultation CTA through window.consultCta() so they
  // cannot diverge again.
  CONSULT_FORM: 'https://forms.gle/6vpR5LKpV29zvyxK9',
  // Featured resource in the nav Resources panel. Evergreen (no expiry): the Data Decoded
  // newsletter, replacing the time-bound webinar card that had to be refreshed monthly.
  FEATURED_RESOURCE: {
    kicker: 'Newsletter',
    title: 'Data Decoded with Dalgo',
    blurb: 'One nonprofit data concept per edition, in plain language.',
    img: 'assets/community-cards/data-decoded.webp?v=cffed030',
    href: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7470812385688276992',
    cta: 'Subscribe'
  }
};
// Returns the featured resource for the nav panel (null hides the Featured column).
window.featuredResource = function () {
  var r = window.SITE_CONFIG.FEATURED_RESOURCE;
  if (!r) return null;
  var href = r.href + (r.href.indexOf('?') > -1 ? '&' : '?') + 'utm_source=website&utm_medium=nav_featured';
  return Object.assign({}, r, { href: href });
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
  return (c.TRIAL_READY && c.TRIAL_URL)
    ? { label: 'Try Dalgo for Free', href: c.TRIAL_URL, ext: true }
    : { label: 'Contact Us', href: '/contact', ext: false };
};
// True only when there is a real trial destination to send someone to. Use this to decide
// whether a trial-specific CTA should exist at all (the /product band, the nav primary).
window.trialReady = function () {
  var c = window.SITE_CONFIG;
  return !!(c.TRIAL_READY && c.TRIAL_URL);
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
// renaming CTAs to "Try Dalgo for Free") needs no code change here. What DOES break on a
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
    '.dtr-card-actions .btn'
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
    // TODO(BM-356): gate on Consent Mode v2 once it lands, defaulting to denied under DPDP.
    window.gtag('event', 'cta_click', {
      cta_name: name,
      cta_destination: el.getAttribute('href') || '(button)'
    });
  }, true);
})();
