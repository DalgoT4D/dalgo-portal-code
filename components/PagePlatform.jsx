// ===== Platform page (per Copy Frame v2) =====
// Resource resolver: uses bundled blob URLs in standalone export, else the file path.
const R = (id, f) => (window.__resources && window.__resources[id]) || f;

// About hero — one shared template (white, left-aligned, collage on the right)
const AboutHero = () => (
  <SiteHero
    eyebrow="Product"
    headline={<>We are a combination of <span className="cvh-hl">people</span>, <span className="cvh-hl">purpose</span>, and <span className="cvh-hl">platform</span></>}
    body="We believe the social sector deserves better data systems — built with the same care as the missions they serve."
    ctas={<HeroCTAs primaryLabel="Try the Platform" primaryHref="https://dashboard.dalgo.org" secondaryLabel="Book a Free Consultation" secondaryHref="contact.html" />}
  >
    <div className="cvh-visual">
      <figure className="cvh-figure">
        <img loading="lazy" width="1400" height="933" src="assets/opt/story-dashboard.webp" alt="Two Dalgo team members reviewing a live data dashboard together on a laptop" />
      </figure>
    </div>
  </SiteHero>
);

// Purpose / People / Platform — the three paragraphs, moved below the hero as a left-aligned band
const AboutTriad = () => (
  <section className="about-triad">
    <div className="about-triad-inner">
      <div className="about-triad-col">
        <h3>Purpose</h3>
        <p>Our purpose drives us — a conviction that the social sector deserves better data systems to advance their mission.</p>
      </div>
      <div className="about-triad-col">
        <h3>People</h3>
        <p>Our people carry that purpose forward — through the community they build, the knowledge they share, and the transparency that follows.</p>
      </div>
      <div className="about-triad-col">
        <h3>Platform</h3>
        <p>And the platform is how we keep our promise — making the messy parts of data easier so the meaningful parts can breathe.</p>
      </div>
    </div>
  </section>
);


// Section 1 + 2 — Trust layer heading + 3-point horizontal band
const TrustLayer = () =>
<section className="pg-section">
    <div className="container">
      <div className="pg-section-head">
        <h2 className="pg-h2">The Platform — your impact's <span className="hl-underline">data trust layer</span></h2>
      </div>
      <div className="trust-band">
        <div className="trust-point">
          <div className="trust-ico"><svg viewBox="0 0 24 24"><path d="M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z" /><path d="M4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg></div>
          <h3>Multiple data integration</h3>
          <p>Custom-built connectors for KoboToolbox, MGrant, ODK and SurveyCTO — plus 600+ more data sources via Airbyte.</p>
        </div>
        <div className="trust-point">
          <div className="trust-ico"><svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg></div>
          <h3>Safe Storage</h3>
          <p>Your warehouse acts like your data's security vault.</p>
        </div>
        <div className="trust-point">
          <div className="trust-ico"><svg viewBox="0 0 24 24"><path d="M3 3v18h18" /><path d="M7 14l4-4 4 4 5-6" /></svg></div>
          <h3>Learn, Act & Share</h3>
          <p>Decision-ready data with Charts, Dashboards, Alerts, and more.</p>
        </div>
      </div>
    </div>
  </section>;


// Sections 3-4 — zig-zag feature rows
// "Bring all your data into one place" — real tool logos flowing into the Dalgo warehouse
const SourcesViz = () => {
  const chips = [
    { logo: R('srcKobo','assets/sources/kobotoolbox.png'), name: 'KoboToolbox', y: 38 },
    { logo: R('srcSurveycto','assets/sources/surveycto.png'), name: 'SurveyCTO', y: 99 },
    { logo: R('srcCommcare','assets/sources/commcare.png'), name: 'CommCare', y: 160 },
    { logo: R('srcAvni','assets/sources/avni.png'), name: 'Avni', y: 221 },
    { logo: R('srcSheets','assets/sources/google_sheets.png'), name: 'Google Sheets', y: 282 },
    { logo: R('srcGlific','assets/sources/glific.png'), name: 'Glific', y: 343 },
  ];
  const procs = [
    { label: 'Cleaned & deduped', y: 128 },
    { label: 'Schema mapped', y: 196 },
    { label: 'Auto-synced', y: 264 },
  ];
  return (
    <div className="srcviz">
      <svg className="srcviz-bg" viewBox="0 0 680 425" aria-hidden="true">
        {/* wires: sources → warehouse */}
        {chips.map((c, i) => (
          <path key={i} d={`M186 ${c.y + 21} C 250 ${c.y + 21}, 255 ${112 + i * 40}, 316 ${140 + i * 28}`} fill="none" stroke="#2F6BFF" strokeWidth="1.6" opacity="0.75" />
        ))}
        {chips.map((c, i) => <circle key={`d${i}`} cx="186" cy={c.y + 21} r="3.2" fill="#2F6BFF" />)}
        {/* wires: warehouse → process chips */}
        {procs.map((p, i) => (
          <path key={`p${i}`} d={`M452 ${180 + i * 34} C 462 ${180 + i * 34}, 458 ${p.y + 19}, 470 ${p.y + 19}`} fill="none" stroke="#2F6BFF" strokeWidth="1.6" opacity="0.75" />
        ))}
        {/* iso slab */}
        <path d="M305 305 L390 284 L466 316 L380 339 Z" fill="#EAF0FF" stroke="#16324F" strokeWidth="2" strokeLinejoin="round" />
        <path d="M305 305 L305 325 L380 359 L380 339 Z" fill="#D3E0FF" stroke="#16324F" strokeWidth="2" strokeLinejoin="round" />
        <path d="M466 316 L466 336 L380 359 L380 339 Z" fill="#BCD1FF" stroke="#16324F" strokeWidth="2" strokeLinejoin="round" />
        {/* cylinder */}
        <path d="M318 148 L318 262 C318 274 350 282 385 282 C420 282 452 274 452 262 L452 148 Z" fill="#fff" stroke="#16324F" strokeWidth="2" strokeLinejoin="round" />
        <path d="M318 178 L318 212 C340 224 430 224 452 212 L452 178 C430 190 340 190 318 178 Z" fill="#2F6BFF" />
        <path d="M318 236 L318 262 C318 274 350 282 385 282 C420 282 452 274 452 262 L452 236 C430 248 340 248 318 236 Z" fill="#BCD1FF" />
        <path d="M318 178 C340 190 430 190 452 178" fill="none" stroke="#16324F" strokeWidth="2" />
        <path d="M318 212 C340 224 430 224 452 212" fill="none" stroke="#16324F" strokeWidth="2" />
        <path d="M318 236 C340 248 430 248 452 236" fill="none" stroke="#16324F" strokeWidth="2" />
        <ellipse cx="385" cy="148" rx="67" ry="20" fill="#fff" stroke="#16324F" strokeWidth="2" />
        <ellipse cx="385" cy="148" rx="52" ry="14" fill="none" stroke="#C7D5EA" strokeWidth="1.5" />
      </svg>
      {chips.map((c, i) => (
        <span key={i} className="srcviz-chip" style={{ left: '3.5%', top: `${(c.y / 425) * 100}%` }}>
          <img loading="lazy" src={c.logo} alt="" />
          {c.name}
        </span>
      ))}
      {procs.map((p, i) => (
        <span key={i} className="srcviz-proc" style={{ left: '69.5%', top: `${(p.y / 425) * 100}%` }}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
          {p.label}
        </span>
      ))}
    </div>
  );
};

const FeatureZigzag = () => {
  const rows = [
  {
    viz: true,
    alt: 'NGO data sources — KoboToolbox, SurveyCTO, CommCare, Avni, Google Sheets, Glific — flowing into one Dalgo warehouse, cleaned and synced',
    h: 'Bring all your data into one place',
    p: 'Custom-built connectors bring in data from the tools NGOs already use — KoboToolbox, MGrant, ODK, SurveyCTO — with 600+ more sources via Airbyte. Everything flows into a single warehouse: cleaned, combined, and automatically updated.'
  },
  {
    img: R('illusDashboards','assets/illus/dashboards.svg'),
    illus: true,
    alt: 'The Dalgo warehouse powering collaborative dashboards — charts, maps and KPIs shared across a team',
    h: 'Dashboards built for collaboration',
    p: 'Dashboards and charts capture program context, making insights easier to share, discuss, and act on across teams.'
  },
  {
    img: R('illusReports','assets/illus/reports.svg'),
    illus: true,
    alt: 'Dashboards automatically generating donor reports, scheduled emails and board decks',
    h: 'Track, measure, and report your progress',
    p: 'Monitor key metrics, get alerts when action is needed, and generate impact reports that keep stakeholders informed.'
  }];

  return (
    <section className="pg-section alt">
      <div className="container">
        <div className="zz-stack">
          {rows.map((r, i) =>
          <div key={i} className={`zz-row ${i % 2 ? 'zz-reverse' : ''}`}>
              <div className={`zz-media ${r.illus || r.viz ? 'zz-media-illus' : ''}`}>
                {r.viz ? <SourcesViz /> : <img loading="lazy" src={r.img} alt={r.alt} />}
              </div>
              <div className="zz-copy">
                <h3 className="zz-h">{r.h}</h3>
                <p className="zz-p">{r.p}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

// Section 5 — Affordable by design band
const AffordableBand = () =>
<section className="pl-afford">
    <div className="container">
      <div className="pl-afford-head">
        <h2 className="pg-h2" style={{ color: '#fff' }}>Affordable <span className="hl-underline">by design</span></h2>
        <p className="pl-afford-sub">Scale your program without growing your data costs.</p>
      </div>
      <div className="pl-afford-grid">
        <div className="pl-afford-card">
          <h3>Flat pricing</h3>
          <p>Be it 10 or 100 users — your price stays the same.</p>
        </div>
        <div className="pl-afford-card">
          <h3>Low setup &amp; maintenance</h3>
          <p>Annual support on Discord, with a community that has your back.</p>
        </div>
        <div className="pl-afford-card">
          <h3>Affordable consulting</h3>
          <p>Expert help for your custom needs, priced for nonprofits.</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <a href="pricing.html" className="pg-btn pg-btn-ondark">Explore Pricing</a>
      </div>
    </div>
  </section>;


// Section 7 — Dalgo Consulting / Common engagement areas (icon list, Zoho-style)
const ICON = {
  strategy: <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14" /><circle cx="20" cy="20" r="7" /><circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" /></svg>,
  solve: <svg viewBox="0 0 40 40"><path d="M14 26l-5 5M20 8a8 8 0 0 0-3 15l1 9h4l1-9a8 8 0 0 0-3-15z" /></svg>,
  mel: <svg viewBox="0 0 40 40"><path d="M8 30V10M8 30h24M14 26l5-7 4 4 7-11" /></svg>,
  arch: <svg viewBox="0 0 40 40"><rect x="15" y="7" width="10" height="8" rx="1.5" /><rect x="7" y="25" width="10" height="8" rx="1.5" /><rect x="23" y="25" width="10" height="8" rx="1.5" /><path d="M20 15v6M20 21H12v4M20 21h8v4" /></svg>,
  integ: <svg viewBox="0 0 40 40"><circle cx="13" cy="20" r="6" /><circle cx="27" cy="20" r="6" /><path d="M19 20h2" /></svg>,
  onboard: <svg viewBox="0 0 40 40"><path d="M12 30c0-5 3.6-8 8-8s8 3 8 8" /><circle cx="20" cy="14" r="5" /><path d="M30 12l2 2 4-4" /></svg>,
  ai: <svg viewBox="0 0 40 40"><rect x="11" y="13" width="18" height="16" rx="3" /><path d="M20 13V8M16 8h8M16 20h2M22 20h2M16 24h8" /></svg>
};
const WhyWeExist = () => {
  const areas = [
  { ic: 'strategy', t: 'Data strategy & maturity', d: 'We assess where your data stands today and map a realistic path to where it needs to be.' },
  { ic: 'mel', t: 'MEL systems design', d: 'Monitoring, evaluation, and learning systems designed around how your programmes run.' },
  { ic: 'arch', t: 'Data architecture & engineering', d: 'Hands-on support to build the pipelines and warehouse your programmes rely on.' },
  { ic: 'integ', t: 'Integration & implementation', d: 'We connect your sources and get the system live and working in production.' },
  { ic: 'ai', t: 'AI & LLM-powered analysis', d: 'Explore your data in plain language and surface insights with AI built for your context.' }];

  return (
    <section className="pg-section we-section">
      <div className="container" data-comment-anchor="4490face15-div-131-7">
        <div className="pg-section-head">
          <h2 className="pg-h2 we-bigh">Key <span className="hl-underline">engagement areas</span></h2>
        </div>
        <div className="we-tiles">
          {areas.map((a, i) =>
          <div key={i} className="we-tile">
            <span className="we-tile-ico" aria-hidden="true">{ICON[a.ic]}</span>
            <span className="we-tile-t">{a.t}</span>
          </div>
          )}
        </div>
        <div className="we-cta">
          <a href="https://forms.gle/envgKD2VeRq3Un5y6" target="_blank" rel="noopener" className="pg-btn">Apply for Pro Bono Consulting</a>
        </div>
      </div>
    </section>);

};

const WatchDemo = () => (
  <section className="pg-section" style={{ background: '#fff' }}>
    <div className="container">
      <div className="section-head section-head-center">
        <h2 className="pg-h2">Watch a <span className="hl-underline">10-minute demo</span></h2>
        <p className="pg-section-sub" style={{ margin: '12px auto 0', maxWidth: 'none', whiteSpace: 'nowrap' }}>See how nonprofits go from scattered data to live dashboards with Dalgo.</p>
      </div>
      <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto', aspectRatio: '16 / 9', borderRadius: 16, overflow: 'hidden', boxShadow: '0 30px 64px -34px rgba(10,37,64,0.4)', border: '1px solid #E7EEEC' }}>
        <iframe style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} src="https://www.youtube.com/embed/I04SqPYQHIs?si=n_iFrrJAj3LHCAXy" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </div>
  </section>
);

const DashboardShowcase = () => {
  const orgs = [
    { name: 'Noora Health', logo: 'assets/logos/NooraHealth.png', use: 'Equipping families with the skills to care for patients at the bedside.', links: [{ l: 'Program dashboard', h: 'https://noora.dalgo.org/superset/dashboard/25/' }] },
    { name: 'SHOFCO', logo: 'assets/dash/shofco.webp', use: "Urban transformation across Kenya's informal settlements.", links: [{ l: 'Dashboard 1', h: 'https://shofco.dalgo.org/superset/dashboard/97/' }, { l: 'Dashboard 2', h: 'https://shofco.dalgo.org/superset/dashboard/98/' }] },
    { name: 'INREM Foundation', logo: 'assets/dash/inrem.webp', use: 'Safe drinking water and fluorosis mitigation.', links: [{ l: 'Water quality', h: 'https://inrem.dalgo.org/superset/dashboard/waterquality/' }, { l: 'Program metrics', h: 'https://inrem.dalgo.org/superset/dashboard/12/' }] },
    { name: 'SHRI', logo: 'assets/dash/shri.webp', use: 'Sanitation and health rights in India.', links: [{ l: 'View dashboards', h: 'https://www.data.sanrights.org/' }] },
  ];
  return (
    <section className="dsh-section">
      <div className="container">
        <div className="pf-header">
          <p className="pf-eyebrow">Live dashboards</p>
          <h2 className="pf-title">Explore dashboards <span className="pf-title-hl">powered by Dalgo</span></h2>
          <p className="pf-sub">Real dashboards nonprofits run on Dalgo today — open them to see program data in action.</p>
        </div>
        <div className="dsh-grid">
          {orgs.map((o) => (
            <article className="dsh-card" key={o.name}>
              <div className="dsh-logo"><img src={o.logo} alt={o.name} loading="lazy" /></div>
              <h3 className="dsh-name">{o.name}</h3>
              <p className="dsh-use">{o.use}</p>
              <div className="dsh-links">
                {o.links.map((lk, k) => (
                  <a key={k} className="dsh-link" href={lk.h} target="_blank" rel="noopener">
                    {lk.l}
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

window.DashboardShowcase = DashboardShowcase;
window.WatchDemo = WatchDemo;
window.AboutHero = AboutHero;
window.AboutTriad = AboutTriad;
window.TrustLayer = TrustLayer;
window.FeatureZigzag = FeatureZigzag;
window.AffordableBand = AffordableBand;
window.WhyWeExist = WhyWeExist;