const MeetDalgo = () => {
  return (
    <section className="section md-section" id="meet-dalgo">
      <div className="container">
        <div className="section-head section-head-center" data-comment-anchor="bf7ae36700-div-10-9">
          <h2 className="section-title md-title">Go from messy data to clean, reliable systems in <span className="hl-underline">~4 weeks</span></h2>
          <p className="section-sub md-sub">
            Our consulting team works alongside yours — from first audit to live dashboards.
          </p>
        </div>
        <div className="md-cta-row">
          <a href="/product" className="btn btn-teal btn-arrow md-cta">Explore Dalgo</a>
          <a href="/faq" className="hero-cta-secondary">Read our FAQs</a>
        </div>
      </div>
    </section>);

};

// Customer-success switcher — logo tabs + featured case study panel
const CaseFeature = () => {
  const cases = [
    {
      org: 'STiR Education', logo: 'assets/logos/STiREducation.png', img: 'assets/consult-1.webp',
      headline: "A week's work, back in an hour — across six regions",
      copy: 'Dalgo automated monthly reporting across six regions, letting the M&E team spend their time on the nuances of monitoring — interpreting data and building capacity.',
      m1: { before: '1 week', after: '1 hour', cap: 'Monthly review preparation' },
      m2: { after: '5× faster', cap: 'Report preparation' },
      ctx: ['M&E now spends its time on the nuances of monitoring', 'Reports reach donors, leadership, and program teams faster', '25,000 records × 100 columns across every region', "Programmes have reached 12 million+ children"],
      read: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/',
    },
    {
      org: 'SHRI', logo: 'assets/logos/SHRI.png', img: 'https://projecttech4dev.org/wp-content/uploads/2025/03/unnamed.png',
      headline: 'Twenty facilities. One live operational picture',
      copy: 'Dalgo replaced manual reporting with live dashboards used by staff, funders, and government stakeholders for day-to-day decision making.',
      m1: { after: '96% uptime', cap: '& 2.5 million uses in 2025' },
      m2: { after: '20–25 hrs/wk', cap: 'saved in manual data entry' },
      ctx: ['96% uptime and 2.5 million uses in 2025', '20–25 hours/week saved in manual data entry', 'Live dashboards used by staff, funders, and government stakeholders', 'Quality-control decisions rely on timely, accurate data'],
      read: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/',
    },
    {
      org: 'Ummeed', logo: 'assets/logos/Ummeed.png', img: 'https://projecttech4dev.org/wp-content/uploads/2025/04/ummeed2.jpg',
      headline: "One child's journey. Finally visible in one place",
      copy: "Dalgo unified multiple systems so every child's complete journey can be viewed across clinical care and professional training programmes.",
      m1: { before: 'Monthly', after: 'Weekly', cap: 'Data refresh cadence' },
      ctx: ['Care teams see the full set of services received by each family', 'Days of manual MIS cleanup eliminated', '152,000+ clinical sessions · 11,200+ professionals trained', '~560,000 indirect beneficiaries'],
      read: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/',
    },
  ];
  const [active, setActive] = React.useState(0);
  const n = cases.length;
  const go = React.useCallback((idx) => setActive(((idx % n) + n) % n), [n]);
  const c = cases[active];
  // No autoplay: rotation was opt-in behind a play button that has been removed, so the
  // interval, its paused state and the hover handlers went with it. Navigation is the logo
  // tabs and the prev/next arrows.
  return (
    <div className="csf">
      <div className="csf-tabs" role="group" aria-label="Featured case studies">
        {cases.map((x, i) => (
          <button key={x.org} type="button" aria-pressed={i === active} aria-label={x.org} className={`csf-tab ${i === active ? 'is-active' : ''}`} onClick={() => go(i)}>
            <img loading="lazy" src={x.logo} alt={x.org} />
          </button>
        ))}
      </div>
      <div className="csf-stage">
        <button className="csf-nav csf-nav-prev" aria-label="Previous story" onClick={() => go(active - 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="csf-panel" key={active}>
        <div className="csf-media"><img src={c.img} alt={`${c.org} — field work`} /></div>
        <div className="csf-body">
          <img loading="lazy" className="csf-logo" src={c.logo} alt={c.org} />
          <h3 className="csf-headline">{c.headline}</h3>
          <p className="csf-copy">{c.copy}</p>
          <a className="csf-readlink" href={c.read} target={c.read.startsWith('http') ? '_blank' : undefined} rel="noopener">Read the story <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a>
          <div className="csf-metrics">
            <div className="csf-metric">
              <div className="csf-metric-value">
                {c.m1.before && <span className="csf-metric-before">{c.m1.before}</span>}
                {c.m1.before && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>}
                <span className="csf-metric-after">{c.m1.after}</span>
              </div>
              <div className="csf-metric-cap">{c.m1.cap}</div>
            </div>
            {c.m2 && (
              <div className="csf-metric">
                <div className="csf-metric-value"><span className="csf-metric-after">{c.m2.after}</span></div>
                <div className="csf-metric-cap">{c.m2.cap}</div>
              </div>
            )}
          </div>
        </div>
        </div>
        <button className="csf-nav csf-nav-next" aria-label="Next story" onClick={() => go(active + 1)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
};

// PROOF section — clean, navigatable case-study thumbnails (Fivetran-style)
const CaseStudy = () => {
  const stories = [
  { sector: 'Sanitation', org: 'SHRI', title: 'Flushing out inefficiencies for better-quality sanitation', img: 'https://projecttech4dev.org/wp-content/uploads/2025/03/unnamed.png', href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/' },
  { sector: 'Health', org: 'Ummeed', title: 'Trans-disciplinary clinical care, on one dashboard', img: 'https://projecttech4dev.org/wp-content/uploads/2025/04/ummeed2.jpg', href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/' },
  { sector: 'Education', org: 'STiR Education', title: 'From data burden to strategic insight', img: 'https://projecttech4dev.org/wp-content/uploads/2026/01/image-1-1.png', href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/' },
  { sector: 'Menstrual Health', org: 'Baala', title: 'Making the invisible visible — a path to data insights', img: 'https://projecttech4dev.org/wp-content/uploads/2025/12/Dalgo-stuti-3.jpg', href: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/' },
  { sector: 'Livelihoods', org: 'Bhumi', title: 'Closing the data-to-decision gap with Dalgo', img: 'https://projecttech4dev.org/wp-content/uploads/2026/05/image-5.png', href: 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/' }];

  return (
    <section className="cs-section" id="proof">
      <div className="container">
        <div className="section-head section-head-center cs-head">
          <h2 className="section-title"><span className="hl-underline">Stories</span> of impact</h2>
          <p className="section-sub" style={{ maxWidth: 880, margin: '12px auto 0' }}>Real teams. Real data challenges. Here is how nonprofits across sectors use Dalgo to move from cleaning data to making decisions.</p>
        </div>
        <CaseFeature />
        <div className="si-cta-row">
          <a className="si-readall" href="/case-studies" data-comment-anchor="626caeaa39-a-62-11">Read Case Studies →</a>
        </div>
      </div>
    </section>);

};


window.MeetDalgo = MeetDalgo;
window.CaseStudy = CaseStudy;
window.CaseFeature = CaseFeature;