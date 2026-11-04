// ===== Impact page (Customers.html) =====

// 1. Hero — one shared template (white, left-aligned, product collage on the right)
// Hero — copy only for now (right-hand side intentionally left empty).
const ImpactHero = () => (
  <SiteHero
    eyebrow="Impact"
    headline={<>Real outcomes,<br /><span className="cvh-hl">across 25+ nonprofits</span></>}
    body="From a week of reporting down to an hour — see what nonprofits do once their data is clean, connected, and finally theirs."
    image={{ src: 'assets/hero/case-studies.webp', alt: 'Two nonprofit colleagues reviewing their programme data together on a laptop', kind: 'photo' }}
  />
);

// Testimonial below the hero — the ONE canonical quote-card pattern (composition principles §4).
const ImpactTestimonial = () => (
  <section className="imx-section imx-quote-strip">
    <div className="container">
      <div className="imx-band">
        <div className="imx-band-main">
          <span className="imx-band-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="imx-band-quote">
            It&rsquo;s thrilling to finally see an <mark className="imx-mark">affordable service built on open-source software</mark> to support non-profits in making evidence-based decisions.
          </blockquote>
          <div className="imx-band-attr">
            <span className="imx-band-name">Jacob Hughey</span>
            <span className="imx-band-role">Core Team Member, The Agency Fund</span>
          </div>
        </div>
        {/* Photo placeholder replaced by the endorsing org's mark — Jacob is Agency Fund,
            so the logo carries the attribution without waiting on a headshot. */}
        <div className="imx-band-logo">
          <img src="assets/logos/AgencyFund.webp" alt="The Agency Fund" width="355" height="162" loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  </section>
);

// 2. Impact at a glance — compact use-case tiles
const ImpactGlance = () => {
  const uses = [
    { label: 'Field Monitoring', icon: <path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z M12 11a2.4 2.4 0 1 0 0-.01" /> },
    { label: 'Program Progress', icon: <path d="M4 19V5M4 19h16M8 16V10M13 16V7M18 16v-4" /> },
    { label: 'Impact Evaluation', icon: <path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z M9 12l2 2 4-4" /> },
    { label: 'Funder Reporting', icon: <path d="M6 4h9l3 3v13H6z M9 10h6M9 14h6" /> },
  ];
  return (
    <section className="imx-section imx-glance">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Impact at a <span className="hl-underline">glance</span></h2>
          <p className="section-sub">The kinds of problems nonprofits solve with Dalgo.</p>
        </div>
        <div className="imx-tiles">
          {uses.map((u, i) => (
            <div className="imx-tile" key={i}>
              <span className="imx-tile-ic"><svg viewBox="0 0 24 24">{u.icon}</svg></span>
              <span className="imx-tile-label">{u.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrowseSector = () => {
  const sectors = [
    { label: 'Education', icon: <path d="M12 4L2 9l10 5 8-4v6M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" /> },
    { label: 'Health', icon: <path d="M12 21s-7-4.5-7-10a4.5 4.5 0 0 1 7-3 4.5 4.5 0 0 1 7 3c0 5.5-7 10-7 10z" /> },
    { label: 'Sanitation', icon: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" /> },
    { label: 'Livelihoods', icon: <path d="M12 21c0-5 0-8-4-11M12 21c0-4 1-7 5-9M12 13c-3 0-5-2-5-5 3 0 5 2 5 5zM12 11c0-3 2-5 5-5 0 3-2 5-5 5z" /> },
    { label: 'Menstrual Health', icon: <path d="M12 3a6 6 0 0 0 0 12 6 6 0 0 0 0-12zM12 15v6M9 19h6" /> },
  ];
  return (
    <section className="imx-section imx-browse">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Explore by <span className="hl-underline">sector</span></h2>
        </div>
        <div className="imx-tiles imx-tiles-5">
          {sectors.map((s, i) => (
            <a className="imx-tile imx-tile-link" key={i} href="#case-studies">
              <span className="imx-tile-ic"><svg viewBox="0 0 24 24">{s.icon}</svg></span>
              <span className="imx-tile-label">{s.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Browse by NGO — dropdown
const BrowseNGO = () => {
  const orgs = {
    'STiR Education': 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/',
    'SHRI': 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/',
    'SHOFCO': '#case-studies',
    'SNEHA': '#case-studies',
    'Baala': 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/',
    'Bhumi': 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/',
  };
  const onChange = (e) => {
    const url = orgs[e.target.value];
    if (url) window.open(url, url.startsWith('http') ? '_blank' : '_self');
    e.target.selectedIndex = 0;
  };
  return (
    <section className="imx-section imx-byorg">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Browse by <span className="hl-underline">organization</span></h2>
          <p className="section-sub">Jump straight to a partner's case study.</p>
        </div>
        <div className="imx-select-wrap">
          <select className="imx-select" defaultValue="" onChange={onChange} aria-label="Select an organization">
            <option value="" disabled>Select an organization…</option>
            {Object.keys(orgs).map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <svg className="imx-select-caret" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>
    </section>
  );
};

// 4. Explore case studies — dropdown + all article thumbnails
// Listing for /case-studies. Reads components/CaseStudyData.jsx, so the set of stories, their
// sectors and where each card points are defined once and this component only arranges them.
//
// A card goes to /case-studies/<slug> once that partner has a written case study, and keeps
// its projecttech4dev.org link until then — which is what lets partners move across one at a
// time without the listing ever being half-empty, and why the external ones still carry
// target/rel while the native ones do not.
// Listing for /case-studies. Reads components/CaseStudyData.jsx, so the set of stories and
// what each card shows are defined once and this component only arranges them.
//
// NO SECTOR FILTER AND NO RESULT COUNT (Stuti, 4 Nov). With five case studies every chip
// filtered to a single card and the count line read "Showing 1 of 5" — interface that costs a
// click and narrows nothing. The sector still shows, as a pill on each thumbnail, which is
// where it is useful: scanning the grid rather than operating a control.
//
// THUMBNAIL IS THE DESIGNED CARD from the master doc — 1200x630, Dalgo | Partner lockup,
// headline, geography pill and a photo. All five were made as a set, which is what makes the
// grid read as one family; the sector pill is layered on top because the baked pill carries
// geography, not sector.
const BrowseCaseStudies = () => {
  const all = window.CASE_STUDIES || [];
  return (
    <section className="imx-section imx-browse" id="case-studies">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Explore <span className="hl-underline">case studies</span></h2>
        </div>
        <div className="si-grid imx-si-grid cst-grid">
          {all.map(function (s, i) {
            const href = s.native ? '/case-studies/' + s.slug : s.source;
            const ext = !s.native;
            return (
              <a key={s.slug || i} className="si-card cst-card" href={href}
                 target={ext ? '_blank' : undefined} rel={ext ? 'noopener' : undefined}
                 data-cta-location="case_study_card">
                <div className="cst-thumb">
                  <span className="cst-pill">{s.sector}</span>
                  <img className="cst-card-img" src={s.img} alt={'Lessons from ' + s.org + ': ' + s.cardTitle} loading="lazy" decoding="async" />
                </div>
                <div className="si-body">
                  <h3 className="si-title">{s.cardTitle}</h3>
                  <span className="si-readmore">Read story <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.ImpactHero = ImpactHero;
window.ImpactTestimonial = ImpactTestimonial;
window.ImpactGlance = ImpactGlance;
window.BrowseSector = BrowseSector;
window.BrowseNGO = BrowseNGO;
window.BrowseCaseStudies = BrowseCaseStudies;
