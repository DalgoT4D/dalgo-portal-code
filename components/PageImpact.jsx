// ===== Impact page (Customers.html) =====

// 1. Hero — one shared template (white, left-aligned, product collage on the right)
// Hero — copy only for now (right-hand side intentionally left empty).
const ImpactHero = () => (
  <SiteHero
    eyebrow="Impact"
    headline={<>Real outcomes,<br /><span className="cvh-hl">across 25+ nonprofits</span></>}
    body="From a week of reporting down to an hour — see what nonprofits do once their data is clean, connected, and finally theirs."
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
const BrowseCaseStudies = () => {
  const stories = [
    { sector: 'Education', org: 'STiR Education', title: 'From data burden to strategic insight', img: 'assets/cases/stir.webp', href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/' },
    { sector: 'Sanitation', org: 'SHRI', title: 'Flushing out inefficiencies for better-quality sanitation', img: 'assets/cases/shri.webp', href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/' },
    { sector: 'Health', org: 'Ummeed', title: 'Trans-disciplinary clinical care, on one dashboard', img: 'assets/cases/ummeed.webp', href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/' },
    { sector: 'Menstrual Health', org: 'Baala', title: 'Making the invisible visible — a path to data insights', img: 'assets/cases/baala.webp', href: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/' },
    { sector: 'Livelihoods', org: 'Bhumi', title: 'Closing the data-to-decision gap with Dalgo', img: 'assets/cases/bhumi.webp', href: 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/' },
    { sector: 'Maternal & Child Health', org: 'SNEHA', title: 'Harnessing real-time data for social impact', img: 'assets/cases/sneha.webp', href: 'https://projecttech4dev.org/harnessing-real-time-data-for-social-impact-snehas-journey-with-dalgo/' },
    { sector: 'Education', org: 'Antarang', title: "Antarang's data breakthrough with GoalKeep and Dalgo", img: 'assets/cases/antarang.png', href: 'https://projecttech4dev.org/fueling-success-antarangs-data-breakthrough-with-goalkeep-and-dalgo/' },
    { sector: 'Community Empowerment', org: 'SHOFCO', title: 'Shining hope from within — SHOFCO’s empowerment story', img: 'assets/cases/shofco-partnership.png', href: 'https://projecttech4dev.org/shining-hope-from-within-shofcos-empowerment-story-with-dalgo/' },
    { sector: 'Water & Environment', org: 'A.T.E. Chandra Foundation', title: 'Rejuvenating 5,000+ waterbodies, tracked on one dashboard', img: 'assets/cases/atecf.webp', href: 'https://projecttech4dev.org/waterbody-rejuvenation-project-a-t-e-chandra-foundation/' },
    { sector: 'Water & Rural Development', org: 'Arghyam', title: 'Unifying piped-water-supply data across Bihar', img: 'assets/cases/arghyam.webp', href: 'https://projecttech4dev.org/jal-jeevan-mission-arghyam/' },
  ];
  return (
    <section className="imx-section imx-browse" id="case-studies">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title" id="case-studies">Explore <span className="hl-underline">case studies</span></h2>
        </div>
        <div className="si-grid imx-si-grid">
          {stories.map((s, i) => (
            <a key={i} className="si-card" href={s.href} target="_blank" rel="noopener">
              <div className="si-thumb"><img src={s.img} alt={`${s.org} — ${s.title}`} loading="lazy" /></div>
              <div className="si-body">
                <div className="si-kicker">{s.sector} · {s.org}</div>
                <h3 className="si-title">{s.title}</h3>
                <span className="si-readmore">Read story <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></span>
              </div>
            </a>
          ))}
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
