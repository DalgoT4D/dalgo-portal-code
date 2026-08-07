// Site-wide config + GA4 event layer. TRIAL_READY default false until Himanshu/Abhishek confirm the trial form.
window.SITE_CONFIG = {
  // false since 7 Aug 2026: dashboard.dalgo.org 301s to insights.dalgo.org/welcome?redirect=/,
  // which is not a place to send a cold visitor. With the flag off every trial CTA resolves to
  // Contact Us -> contact.html, so the label matches the destination (BM-307).
  TRIAL_READY: false,
  TRIAL_URL: 'https://dashboard.dalgo.org',
  GA4_ID: 'G-ZTDMFE4S5K', // live property (same ID as the current dalgo.org site), set 6 Aug 2026
  // Single destination for every "Book a Free Consultation" CTA — the pro-bono data
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
    img: 'assets/community-cards/data-decoded.webp',
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
// Every primary trial CTA ("Try the Platform") resolves through this: flag off => Contact Us → /contact (BM-307: label always matches destination).
window.trialCta = function () {
  return window.SITE_CONFIG.TRIAL_READY
    ? { label: 'Try the Platform', href: window.SITE_CONFIG.TRIAL_URL, ext: true }
    : { label: 'Contact Us', href: 'contact.html', ext: false };
};
// Every "Book a Free Consultation" CTA resolves through this — one destination, always external.
window.consultCta = function () {
  return { label: 'Book a Free Consultation', href: window.SITE_CONFIG.CONSULT_FORM, ext: true };
};
// GA4 bootstrap (no-op until GA4_ID is set). Event layer (BM-356 model) TBD.
(function () {
  var id = window.SITE_CONFIG.GA4_ID;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (id) {
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', id);
  }
})();
