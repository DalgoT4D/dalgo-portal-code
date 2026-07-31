// Site-wide config + GA4 event layer. TRIAL_READY default false until Himanshu/Abhishek confirm the trial form.
window.SITE_CONFIG = {
  TRIAL_READY: true, // reverted per request: Start Free Trial ships as primary CTA sitewide
  TRIAL_URL: 'https://dashboard.dalgo.org',
  GA4_ID: '' // TODO: paste the GA4 clean-slate property id (G-XXXXXXX) before launch
};
// Every primary trial CTA ("Try the Platform") resolves through this: flag off => Contact Us → /contact (BM-307: label always matches destination).
window.trialCta = function () {
  return window.SITE_CONFIG.TRIAL_READY
    ? { label: 'Try the Platform', href: window.SITE_CONFIG.TRIAL_URL, ext: true }
    : { label: 'Contact Us', href: 'contact.html', ext: false };
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
