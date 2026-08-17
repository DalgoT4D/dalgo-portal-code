// ===== Trial CTA band (/product only) =====
// Sits between the tour ("See Dalgo in action") and the capability grid ("Dalgo for every part
// of your data workflow"), per Stuti 15 Aug 2026.
//
// Renders NOTHING until there is a real trial destination. As of 15 Aug there isn't one —
// insights.dalgo.org/trial and /signup both 404, and dashboard.dalgo.org redirects to a login
// screen — so shipping a visible "Try Dalgo for Free" button would send cold visitors somewhere
// that doesn't match the label (BM-307). Set TRIAL_URL + TRIAL_READY in site-config.js and this
// band appears on its own; no edit needed here.
//
// Reuses .probono-band, the slim-strip pattern already in app.css (surface-0, hairline top and
// bottom, --section-pad-sm). That CSS was orphaned — styling with no markup using it — so this
// puts it back to work rather than introducing a fourth band pattern.
const TrialBand = () => {
  if (!(window.trialReady && window.trialReady())) return null;
  const t = window.trialCta();
  return (
    <section className="probono-band" data-screen-label="Try Dalgo for Free">
      <div className="container">
        <div className="trial-band-inner">
          <a className="btn btn-primary" href={t.href}
             target={t.ext ? '_blank' : undefined} rel={t.ext ? 'noopener' : undefined}>{t.label}</a>
        </div>
      </div>
    </section>
  );
};
window.TrialBand = TrialBand;
