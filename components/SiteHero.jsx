// ============================================================
// SiteHero — the one hero template used across every page.
// Left column is identical everywhere; the right-hand visual is
// passed in as children and differs per page.
// Reference: the Community page hero (.cvh-*).
// ============================================================
const SiteHero = ({ eyebrow, headline, body, ctas, help, children, id }) => (
  <section className="cvh" id={id || undefined}>
    <div className="cvh-grid">
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

// Standard pill CTA pair. Primary = green fill + arrow, secondary = white outline.
const HeroCTAs = ({
  primaryLabel = 'Start Free Trial',
  primaryHref = 'https://insights.dalgo.org/trial',
  secondaryLabel = 'Contact Us',
  secondaryHref = 'contact.html',
}) => {
  const ext = (h) => /^https?:/.test(h);
  // TRIAL_READY=false ⇒ primary renders Contact Us → /contact (BM-307); duplicate secondary collapses
  if (primaryLabel === 'Start Free Trial' && window.trialCta) { const t = window.trialCta(); primaryLabel = t.label; primaryHref = t.href; }
  if (secondaryLabel === primaryLabel) secondaryLabel = null;
  return (
    <React.Fragment>
      <a
        className="cmh-btn cmh-btn-primary"
        href={primaryHref}
        target={ext(primaryHref) ? '_blank' : undefined}
        rel={ext(primaryHref) ? 'noopener' : undefined}
      >
        {primaryLabel}
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </a>
      {secondaryLabel && (
        <a
          className="cmh-btn cmh-btn-ghost"
          href={secondaryHref}
          target={ext(secondaryHref) ? '_blank' : undefined}
          rel={ext(secondaryHref) ? 'noopener' : undefined}
        >
          {secondaryLabel}
        </a>
      )}
    </React.Fragment>
  );
};

window.SiteHero = SiteHero;
window.HeroCTAs = HeroCTAs;
