// ===== Product-page trial CTA sections (Stuti, 15 Aug 2026) =====
// Two conversion sections, both built from patterns app.css already owns rather than new ones:
//
//   TrialCTA        -> .probono-band  (slim strip: copy left, CTA right, hairline top and bottom)
//   ProductFinalCTA -> .final-cta     (the site's existing photo-backed conversion band)
//
// .probono-band and .probono-inner/.probono-h/.probono-sub were ORPHANED CSS — fully styled with
// no markup anywhere using them. This puts them back to work, which is why "visually simple and
// high impact" needed no new design pattern.
//
// Both render nothing until there is a trial destination. Their labels say "Start Your Free
// Trial", so with no trial URL they would send people somewhere that does not match the label
// (BM-307) — and a CTA section whose button is a dead end is worse than no section.
const TrialCTA = () => {
  if (!(window.trialReady && window.trialReady())) return null;
  const t = window.trialCta();
  return (
    <section className="probono-band" data-screen-label="Free trial CTA">
      <div className="container">
        <div className="probono-inner">
          <div className="probono-copy">
            <h2 className="probono-h">Ready to explore what&rsquo;s possible with your data?</h2>
            <p className="probono-sub">Start with Dalgo and see how your data can work harder for your organisation.</p>
          </div>
          <a className="btn btn-primary probono-cta" href={t.href}
             target={t.ext ? '_blank' : undefined} rel={window.ctaRel(t)}>Start Your Free Trial</a>
        </div>
      </div>
    </section>
  );
};

// Final conversion band. Reuses .final-cta / .final-cta-photo exactly as the homepage does, so
// the page ends on the pattern visitors already recognise from the rest of the site. The
// supporting line sits in .final-cta-eyebrow — the existing slot for a short line paired with the
// band's headline — rather than inventing a .final-cta-sub.
const ProductFinalCTA = () => {
  if (!(window.trialReady && window.trialReady())) return null;
  const t = window.trialCta();
  return (
    <section className="final-cta final-cta-photo" id="final-cta" data-screen-label="Final CTA">
      <div className="final-cta-bg" aria-hidden="true">
        <img src="assets/opt/story-mission.webp" alt="" width="1400" height="933" loading="lazy" decoding="async" />
      </div>
      <div className="container">
        <div className="final-cta-eyebrow">Start exploring what&rsquo;s possible with Dalgo.</div>
        <h2 className="final-cta-h">Your data has <span className="hl-underline">more to tell you.</span></h2>
        <div className="final-cta-actions">
          <a className="final-cta-btn" href={t.href} target={t.ext ? '_blank' : undefined} rel={window.ctaRel(t)}>
            Start Your Free Trial
            <svg className="i" viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

window.TrialCTA = TrialCTA;
window.ProductFinalCTA = ProductFinalCTA;
