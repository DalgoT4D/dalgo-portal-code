// Full case-studies page — the grid + filters version.
const CasesPage = () => {
  const cases = [
    { id: 'shri-blog',  org: 'SHRI',           sector: 'Sanitation',          type: 'Blog',   title: "Flushing out inefficiencies: SHRI + Dalgo's data-driven approach to better sanitation", blurb: "A sanitation enterprise turns fragmented field data into a daily operations dashboard across 300+ units.", href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/', color: '#00bfa6', img: 'sanitation' },
    { id: 'shri-deck',  org: 'SHRI',           sector: 'Sanitation',          type: 'Deck',   title: "SHRI × Dalgo — partnership deck", blurb: "The full case breakdown: problem, approach, dashboards built, impact on maintenance cycles.", href: 'https://docs.google.com/presentation/d/1o8jcmpFx2fTOwi-J0Nal9GIKSAicnnA0/edit?slide=id.p1', color: '#00bfa6', img: 'sanitation' },
    { id: 'ummeed-blog',org: 'Ummeed',         sector: 'Healthcare',          type: 'Blog',   title: "Maximising impact: Ummeed + Dalgo's approach to trans-disciplinary clinical care", blurb: "Unifying paediatric clinical records across therapists, clinicians, and caregivers — without losing the human context.", href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/', color: '#7c4dff', img: 'health' },
    { id: 'ummeed-deck',org: 'Ummeed',         sector: 'Healthcare',          type: 'Deck',   title: "Ummeed × Dalgo — partnership deck", blurb: "Trans-disciplinary care data: how Ummeed standardised intake, therapy, and outcome tracking.", href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/', color: '#7c4dff', img: 'health' },
    { id: 'stir-blog',  org: 'STiR Education', sector: 'Education',           type: 'Blog',   title: "From data burden to strategic insight: how STiR transformed data with Dalgo", blurb: "Teacher-development data across 5 countries — stitched into one dashboard the leadership actually trusts.", href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/', color: '#f4a623', img: 'education' },
    { id: 'stir-deck',  org: 'STiR Education', sector: 'Education',           type: 'Deck',   title: "STiR × Dalgo — partnership deck", blurb: "The journey: from spreadsheets in five languages to one live programme-quality index.", href: 'https://docs.google.com/presentation/d/1GqX7of6ewvmDaoKEJuP_j-2H33cbmvx30NgETT05caA/edit?slide=id.g3a99c9fffb0_1_180', color: '#f4a623', img: 'education' },
    { id: 'atecf',      org: 'ATECF',          sector: 'Water & Environment', type: 'Report', title: "ATECF: community-driven water stewardship, now on a live dashboard", blurb: "A multi-district water programme swapped quarterly PDFs for a live operations dashboard field teams actually use.", href: 'https://drive.google.com/file/d/1Elps2rXlhU3JJIsvGMwnW8l2zLRxJym-/view?usp=drive_link', color: '#0a9396', img: 'water' },
    { id: 'arghyam',    org: 'Arghyam',        sector: 'Water & Environment', type: 'Report', title: "Arghyam — groundwater and sanitation data, at scale", blurb: "Connecting field observations to policy-grade dashboards across partner organisations.", href: 'https://docs.google.com/document/d/1jy6TMTnv9s_6Pj7vTY0xBT6Ec7UE3q-73uGNv37dYuk/edit?usp=sharing', color: '#0a9396', img: 'water' },
    { id: 'baala',      org: 'Baala',          sector: 'Gender',              type: 'Blog',   title: "Baala — measuring menstrual-health outcomes across cohorts", blurb: "Longitudinal, survivor-centred data flows for a menstrual-health and gender programme running nationwide.", href: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/', color: '#e86a5f', img: 'gender' },
  ];

  const sectors = ['All', ...Array.from(new Set(cases.map(c => c.sector)))];
  const types = ['All types', ...Array.from(new Set(cases.map(c => c.type)))];
  const [sector, setSector] = React.useState('All');
  const [type, setType] = React.useState('All types');

  const filtered = cases.filter(c =>
    (sector === 'All' || c.sector === sector) &&
    (type === 'All types' || c.type === type)
  );

  return (
    <React.Fragment>
      <section className="cs-hero">
        <div className="container">
          <a href="index.html" className="cs-back">← Back to Dalgo</a>
          <div className="eyebrow" style={{color: 'rgba(255,255,255,0.7)'}}>Case hub</div>
          <h1 className="cs-title">Every story is a <em>proof point</em></h1>
          <p className="cs-sub">
            Real partnerships, real dashboards, real impact. Filter by sector or resource type to find the case that maps closest to yours.
          </p>
        </div>
      </section>

      <section className="section" style={{paddingTop: 56}}>
        <div className="container">
          <div className="ch-filters">
            <div className="ch-filter-group">
              <span className="ch-filter-label">By sector</span>
              <div className="ch-chips">
                {sectors.map(s => (
                  <button
                    key={s}
                    className={`ch-chip ${sector === s ? 'ch-chip-on' : ''}`}
                    onClick={() => setSector(s)}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div className="ch-filter-group">
              <span className="ch-filter-label">By type</span>
              <div className="ch-chips">
                {types.map(t => (
                  <button
                    key={t}
                    className={`ch-chip ch-chip-alt ${type === t ? 'ch-chip-on-alt' : ''}`}
                    onClick={() => setType(t)}
                  >{t}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="cs-count">{filtered.length} {filtered.length === 1 ? 'story' : 'stories'}</div>

          <div className="ch-grid">
            {filtered.map(c => (
              <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer" className="ch-card ch-card-full">
                <div className={`ch-thumb ch-thumb-${c.img}`} style={{'--ch-color': c.color}}>
                  <CaseThumbArt kind={c.img} color={c.color} />
                  <span className="ch-type-pill">{c.type}</span>
                </div>
                <div className="ch-card-body">
                  <div className="ch-meta">
                    <span className="ch-org">{c.org}</span>
                    <span className="ch-sep">·</span>
                    <span className="ch-sector">{c.sector}</span>
                  </div>
                  <h3 className="ch-title">{c.title}</h3>
                  <p className="ch-blurb">{c.blurb}</p>
                  <div className="ch-footer">
                    <span className="ch-read">Read the story</span>
                    <span className="ch-arrow">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="ch-empty">No stories match that filter — try another combination.</div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

window.CasesPage = CasesPage;
