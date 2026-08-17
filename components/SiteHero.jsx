// ============================================================
// SiteHero — the one hero template used across every page.
//
// The FIGURE IS OWNED BY THE SYSTEM, not by the page. Pass `image={{src, alt, kind}}`
// and this component emits the frame; no page writes its own <figure>. That is the whole
// point: four different hero treatments grew up on this site precisely because each page
// hand-rolled its own visual markup and CSS could not hold them together.
//
//   kind: 'photo'        — object-fit cover, deeper elevation (default)
//         'illustration' — softer elevation; the mint gradient is baked into the asset,
//                          so the frame adds no background and no padding
//
// Assets are authored at 1440x960 (3:2) to match the frame exactly — see BM-395.
// `children` is still accepted for anything that is genuinely not a single image, but
// nothing uses it today and a new page should not reach for it.
// ============================================================
const HeroFigure = ({ src, alt, kind }) => (
  <div className="cvh-visual">
    <figure className={'cvh-figure' + (kind === 'illustration' ? ' cvh-figure-illus' : '')}>
      {/* eager + intrinsic size: this is the LCP element on most pages, and the
          width/height pair reserves the box so the hero never shifts while it loads */}
      <img src={src} alt={alt} width="1440" height="960" loading="eager" decoding="async" />
    </figure>
  </div>
);

const SiteHero = ({ eyebrow, headline, body, ctas, help, image, children, id }) => (
  <section className="cvh" id={id || undefined}>
    <div className={'cvh-grid' + (image || children ? '' : ' cvh-grid-solo')}>
      <div className="cvh-copy">
        {eyebrow && <div className="cvh-eyebrow">{eyebrow}</div>}
        <h1 className="cvh-h1">{headline}</h1>
        {body && <p className="cvh-sub">{body}</p>}
        {/* The CTA row is reserved even when a page has none, so the copy stack keeps the
            same internal rhythm everywhere instead of ending early on some pages. */}
        {ctas
          ? <div className="cvh-ctas">{ctas}</div>
          : <div className="cvh-ctas cvh-ctas-reserved" aria-hidden="true"></div>}
        {help && <p className="cvh-help">{help}</p>}
      </div>
      {image ? <HeroFigure src={image.src} alt={image.alt} kind={image.kind} /> : children}
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
  // These strings are SENTINELS meaning "this is the trial slot", not the rendered label — the
  // rendered label always comes from trialCta(). "Try Dalgo for Free" is in the list so that
  // passing the current label explicitly still resolves the href; without it the label would
  // render but primaryHref would silently stay /contact.
  if (['Try the Platform', 'Start Free Trial', 'Try Dalgo for Free'].indexOf(primaryLabel) > -1 && window.trialCta) { const t = window.trialCta(); primaryLabel = t.label; primaryHref = t.href; }
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
        rel={window.relForHref(lead.href)}
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
          rel={window.relForHref(b.href)}
        >
          {b.label}
        </a>
      ))}
    </React.Fragment>
  );
};

window.SiteHero = SiteHero;
window.HeroCTAs = HeroCTAs;
