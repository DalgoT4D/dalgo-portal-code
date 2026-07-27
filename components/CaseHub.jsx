// Case Hub carousel — a single horizontal row of case-study tiles on the landing page.
// The full grid lives on "impact.html".
const CaseHub = () => {
  const cases = [
    { id: 'shri',     org: 'SHRI',            sector: 'Sanitation',           type: 'Blog',   title: "Flushing out inefficiencies: data-driven sanitation across 20 facilities in 4 districts", href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/', color: '#00bfa6', img: 'sanitation' },
    { id: 'ummeed',   org: 'Ummeed',          sector: 'Healthcare',           type: 'Blog',   title: "Trans-disciplinary clinical care, on one dashboard",               href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/', color: '#7c4dff', img: 'health' },
    { id: 'stir',     org: 'STiR Education',  sector: 'Education',            type: 'Blog',   title: "From data burden to strategic insight",          href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/', color: '#f4a623', img: 'education' },
    { id: 'atecf',    org: 'ATECF',           sector: 'Water & Environment',  type: 'Report', title: "Community-driven water stewardship, on a live dashboard",          href: 'https://drive.google.com/file/d/1Elps2rXlhU3JJIsvGMwnW8l2zLRxJym-/view?usp=drive_link', color: '#0a9396', img: 'water' },
    { id: 'arghyam',  org: 'Arghyam',         sector: 'Water & Environment',  type: 'Report', title: "Groundwater and sanitation data, at scale",                        href: 'https://docs.google.com/document/d/1jy6TMTnv9s_6Pj7vTY0xBT6Ec7UE3q-73uGNv37dYuk/edit?usp=sharing', color: '#0a9396', img: 'water' },
    { id: 'baala',    org: 'Baala',           sector: 'Gender',               type: 'Blog',   title: "Measuring menstrual-health outcomes across cohorts",                href: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/', color: '#e86a5f', img: 'gender' },
  ];

  const trackRef = React.useRef(null);
  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: 'smooth' });
  };

  return (
    <section className="section ch-section" id="case-hub">
      <div className="container">
        <div className="section-head section-head-left" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32, flexWrap:'wrap', maxWidth:'100%'}}>
          <div style={{maxWidth:680}}>
            <div className="eyebrow">Case studies</div>
            <h2 className="section-title">Every story is a proof point</h2>
            <p className="section-sub">Real partnerships, real dashboards, real impact — across the sector.</p>
          </div>
          <div className="ch-controls">
            <button className="ch-nav" onClick={() => scroll(-1)} aria-label="Previous">←</button>
            <button className="ch-nav" onClick={() => scroll(1)} aria-label="Next">→</button>
            <a href="impact.html" className="btn btn-teal btn-arrow">See all case studies</a>
          </div>
        </div>

        <div className="ch-track-wrap">
          <div className="ch-track" ref={trackRef}>
            {cases.map(c => (
              <a key={c.id} href={c.href} target="_blank" rel="noopener noreferrer" className="ch-card">
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
                  <div className="ch-footer">
                    <span className="ch-read">Read the story</span>
                    <span className="ch-arrow">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// SVG illustration per sector, keeps cards distinct without needing image files.
const CaseThumbArt = ({kind, color}) => {
  const common = { width: '100%', height: '100%', viewBox: '0 0 320 180', preserveAspectRatio: 'xMidYMid slice' };
  if (kind === 'education') return (
    <svg {...common}>
      <rect width="320" height="180" fill={`${color}18`}/>
      <g stroke={color} strokeWidth="1.5" fill="none" opacity="0.9">
        <path d="M40,140 Q80,120 120,130 T200,115 T280,95"/>
        <path d="M40,155 Q90,140 140,145 T220,128 T280,112" opacity="0.5"/>
      </g>
      <g fill={color}>
        {[60,100,140,180,220,260].map((x,i)=>(
          <circle key={i} cx={x} cy={140-i*4} r="3"/>
        ))}
      </g>
      <g fill={color} opacity="0.85">
        <rect x="30" y="30" width="70" height="46" rx="4" opacity="0.18"/>
        <rect x="34" y="36" width="40" height="4" rx="2"/>
        <rect x="34" y="44" width="58" height="3" rx="1.5" opacity="0.6"/>
        <rect x="34" y="51" width="30" height="3" rx="1.5" opacity="0.6"/>
        <text x="34" y="68" fontSize="10" fontWeight="700" fill={color}>87.4</text>
      </g>
    </svg>
  );
  if (kind === 'health') return (
    <svg {...common}>
      <rect width="320" height="180" fill={`${color}14`}/>
      <g stroke={color} strokeWidth="1.4" fill="none">
        <path d="M20,110 L80,110 L100,80 L120,130 L140,90 L160,110 L300,110" />
      </g>
      <g fill={color}>
        <circle cx="100" cy="80" r="4"/>
        <circle cx="120" cy="130" r="4"/>
        <circle cx="140" cy="90" r="4"/>
      </g>
      <g>
        <rect x="220" y="32" width="70" height="50" rx="4" fill="white" stroke={color} strokeOpacity="0.3"/>
        <circle cx="255" cy="54" r="11" fill="none" stroke={color} strokeWidth="2.4"/>
        <path d="M250,54 L253,57 L260,50" stroke={color} strokeWidth="2" fill="none"/>
        <rect x="228" y="70" width="54" height="3" rx="1.5" fill={color} opacity="0.5"/>
      </g>
    </svg>
  );
  if (kind === 'water') return (
    <svg {...common}>
      <rect width="320" height="180" fill={`${color}16`}/>
      <g stroke={color} strokeWidth="1.4" fill="none" opacity="0.8">
        <path d="M0,130 Q80,115 160,130 T320,130" />
        <path d="M0,145 Q80,132 160,145 T320,145" opacity="0.6"/>
        <path d="M0,160 Q80,150 160,160 T320,160" opacity="0.4"/>
      </g>
      <g fill={color}>
        <path d="M160,40 C140,70 140,90 160,100 C180,90 180,70 160,40 Z" opacity="0.75"/>
        <path d="M100,55 C88,75 88,90 100,98 C112,90 112,75 100,55 Z" opacity="0.55"/>
        <path d="M220,60 C208,78 208,92 220,100 C232,92 232,78 220,60 Z" opacity="0.55"/>
      </g>
    </svg>
  );
  if (kind === 'sanitation') return (
    <svg {...common}>
      <rect width="320" height="180" fill={`${color}16`}/>
      <g fill="none" stroke={color} strokeWidth="1.4" opacity="0.55">
        {[0,1,2,3,4,5].map(i=>(<line key={i} x1={40+i*44} y1="20" x2={40+i*44} y2="160"/>))}
        {[0,1,2,3].map(i=>(<line key={i} x1="20" y1={40+i*32} x2="300" y2={40+i*32}/>))}
      </g>
      <g fill={color}>
        <rect x="36" y="72" width="28" height="16" rx="3" opacity="0.85"/>
        <rect x="80" y="40" width="28" height="16" rx="3" opacity="0.55"/>
        <rect x="124" y="104" width="28" height="16" rx="3"/>
        <rect x="168" y="72" width="28" height="16" rx="3" opacity="0.85"/>
        <rect x="212" y="40" width="28" height="16" rx="3" opacity="0.4"/>
        <rect x="256" y="104" width="28" height="16" rx="3" opacity="0.55"/>
      </g>
    </svg>
  );
  // gender
  return (
    <svg {...common}>
      <rect width="320" height="180" fill={`${color}16`}/>
      <g fill={color}>
        <circle cx="90" cy="90" r="34" opacity="0.22"/>
        <circle cx="160" cy="90" r="34" opacity="0.35"/>
        <circle cx="230" cy="90" r="34" opacity="0.55"/>
      </g>
      <g fill="none" stroke={color} strokeWidth="1.6">
        <path d="M50,140 Q160,100 270,140"/>
      </g>
      <g fill={color}>
        <circle cx="50" cy="140" r="3.5"/>
        <circle cx="160" cy="115" r="3.5"/>
        <circle cx="270" cy="140" r="3.5"/>
      </g>
    </svg>
  );
};

window.CaseHub = CaseHub;
window.CaseThumbArt = CaseThumbArt;
