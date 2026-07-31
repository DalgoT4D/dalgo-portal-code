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
// GA4 bootstrap (no-op until GA4_ID is set) + the 9-event model.
(function () {
  var id = window.SITE_CONFIG.GA4_ID;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  if (id) {
    var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', id);
  }
  // 9 events: page_view (auto) · trial_cta_click · contact_cta_click · probono_apply_click · newsletter_subscribe · demo_tour_start · demo_tour_complete · video_play · outbound_click
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a,button') : null;
    if (!a) return;
    var ev = a.getAttribute('data-ga');
    if (!ev) {
      var href = a.getAttribute && (a.getAttribute('href') || '');
      var txt = (a.textContent || '').trim();
      if (/^https?:/.test(href) && href.indexOf('dalgo.org') === -1) ev = 'outbound_click';
      else if (txt === 'Start Free Trial' || txt === 'Try the Platform') ev = 'trial_cta_click';
      else if (txt === 'Contact Us' || txt === 'Book a Free Consultation') ev = 'contact_cta_click';
      else if (/Pro Bono/i.test(txt)) ev = 'probono_apply_click';
      else if (txt === 'Subscribe') ev = 'newsletter_subscribe';
    }
    if (ev) gtag('event', ev, { link_text: (a.textContent || '').trim().slice(0, 60), link_url: a.getAttribute ? a.getAttribute('href') : '' });
  }, true);
})();
