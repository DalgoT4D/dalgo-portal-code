// ============================================================
// SiteHero — the one hero template used across every page.
// Left column is identical everywhere; the right-hand visual is
// passed in as children and differs per page.
// Reference: the Community page hero (.cvh-*).
// ============================================================
const SiteHero = ({ eyebrow, headline, body, ctas, help, children, id }) => (
  <section className="cvh" id={id || undefined}>
    <div className={'cvh-grid' + (children ? '' : ' cvh-grid-solo')}>
      <div className="cvh-copy">
        {eyebrow && <div className="cvh-eyebrow">{eyebrow}</div>}
        <h1 className="cvh-h1">{headline}</h1>
        {body && <p className="cvh-sub">{body}</p>}
        {ctas && <div className="cvh-ctas">{ctas}</div>}
        {help && <p className="cvh-help">{help}</p>}
      </div>
      {children}
    </div>
  </section>
);

// Standard pill CTA pair. The consultation CTA is the green primary and leads; the
// platform/contact CTA is the white ghost beside it (Stuti, 7 Aug).
const HeroCTAs = ({
  primaryLabel = 'Try the Platform',
  primaryHref = '/contact',   // overridden by trialCta(); never point a default at the trial URL
  secondaryLabel = 'Book Free Consultation',
  secondaryHref = window.SITE_CONFIG.CONSULT_FORM,   // pro-bono consulting form (site-config)
}) => {
  const ext = (h) => /^https?:/.test(h);
  // TRIAL_READY=false ⇒ primary renders Contact Us → /contact (BM-307); duplicate secondary collapses
  if ((primaryLabel === 'Try the Platform' || primaryLabel === 'Start Free Trial') && window.trialCta) { const t = window.trialCta(); primaryLabel = t.label; primaryHref = t.href; }
  if (secondaryLabel === primaryLabel) secondaryLabel = null;
  // Which button is green is decided by ROLE, not by prop order: the consultation CTA always
  // leads. Deciding it positionally put "Explore Our Work" in green on Consulting, because
  // that page passes the consultation CTA as the primary and the other as the secondary.
  const items = [{ label: primaryLabel, href: primaryHref }];
  if (secondaryLabel) items.push({ label: secondaryLabel, href: secondaryHref });
  const CF = window.SITE_CONFIG && window.SITE_CONFIG.CONSULT_FORM;
  let leadIdx = items.findIndex((i) => i.href === CF);
  if (leadIdx < 0) leadIdx = 0;
  const lead = items[leadIdx];
  const rest = items.filter((_, i) => i !== leadIdx);
  return (
    <React.Fragment>
      <a
        className="cmh-btn cmh-btn-primary"
        href={lead.href}
        target={ext(lead.href) ? '_blank' : undefined}
        rel={ext(lead.href) ? 'noopener' : undefined}
      >
        {lead.label}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </a>
      {rest.map((b) => (
        <a
          key={b.label}
          className="cmh-btn cmh-btn-ghost"
          href={b.href}
          target={ext(b.href) ? '_blank' : undefined}
          rel={ext(b.href) ? 'noopener' : undefined}
        >
          {b.label}
        </a>
      ))}
    </React.Fragment>
  );
};

window.SiteHero = SiteHero;
window.HeroCTAs = HeroCTAs;
