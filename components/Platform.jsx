const PlatformTabs = () => {
  const [tab, setTab] = React.useState(0);
  const tabs = [
    {
      n: '01',
      label: 'Integration',
      sub: 'Data Integration & Transformation',
      title: 'Connect, clean, and stay current — without manual work',
      lede: "Your programme data lives across SurveyCTO, KoboToolbox, Google Sheets, and a dozen other tools. Dalgo's automation layer pulls it all into one warehouse, transforms it cleanly, and keeps it in sync on the schedule you set.",
      bullets: [
        'Pre-built connectors to common nonprofit data tools',
        'Visual ETL pipelines — no SQL or code required',
        'dbt-powered transformations that run on schedule',
        'Audit logs on every sync, every change',
      ],
    },
    {
      n: '02',
      label: 'Dashboards & Charts',
      title: 'Dashboards built for every role, from field teams to funders',
      lede: 'Role-based dashboards surface what each stakeholder needs — field teams see operational detail, leadership sees trend lines, funders see impact. No more one-size-fits-none reporting.',
      bullets: [
        'Drag-and-drop chart builder on top of your warehouse',
        'Role-based views with sharable, versioned links',
        'Drill from high-level KPI into beneficiary-level detail',
        'Export to PDF, CSV, or a funder-ready report in one click',
      ],
    },
    {
      n: '03',
      label: 'Alerts, Reports & KPIs',
      title: "Know when something shifts — before anyone has to ask",
      lede: 'Configure KPIs against your theory of change and Dalgo watches them for you. Thresholds trigger alerts. Weekly digests auto-assemble. Donor-ready reports regenerate themselves as the data updates.',
      bullets: [
        'Threshold-based alerts to Slack, email, or WhatsApp',
        'Scheduled, versioned reports — always up to date',
        'Per-programme KPI trees linked to M&E indicators',
        'Chat with your data in plain language (coming soon)',
      ],
    },
    {
      n: '04',
      label: 'AI Chat with Data',
      comingSoon: true,
      title: 'Ask your data a question — in plain language',
      lede: 'Chat with your programme data like you chat with a colleague. Get charts, summaries, and answers in seconds — no SQL, no dashboard hunting. Currently in preview with select partners.',
      bullets: [
        'Natural-language queries across every source you connect',
        'Auto-generated charts, tables, and narrative summaries',
        "Guardrails tuned to your programme's indicators",
        'Shareable threads so insights travel with your team',
      ],
    },
  ];

  return (
    <section className="section" id="platform-tabs">
      <div className="container-wide">
        <div className="section-head">
          <div className="eyebrow">Explore Our Offerings</div>
          <h2 className="section-title">What powers insights on Dalgo</h2>
          <p className="section-sub">
            Consolidate, clean, transform, visualise, alert, share — built for the people doing the program work.
          </p>
        </div>

        <div className="tabs-head" style={{justifyContent:'center'}}>
          {tabs.map((t, i) => (
            <button
              key={i}
              className={`tab-btn ${tab === i ? 'active' : ''} ${t.comingSoon ? 'tab-soon' : ''}`}
              onClick={() => setTab(i)}
            >
              <span className="n">{t.n}</span> {t.label}
              {t.sub && <span className="tab-sub">· {t.sub}</span>}
              {t.comingSoon && <span className="tab-soon-badge">Coming Soon</span>}
            </button>
          ))}
        </div>

        <div className="tab-body" key={tab}>
          <div className="tab-copy">
            <h3>{tabs[tab].title}</h3>
            <p className="lede">{tabs[tab].lede}</p>
            <ul className="tab-list">
              {tabs[tab].bullets.map((b, i) => (
                <li key={i}>
                  <span className="check">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-11"/></svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="tab-actions">
              <a href="#book" className="btn btn-teal btn-arrow">Sign Up for a Demo</a>
              <a href="#book" className="btn btn-ghost">Book a call</a>
            </div>
          </div>
          <div className="tab-visual">
            {tab === 0 && <PipelineViz />}
            {tab === 1 && <DashboardViz />}
            {tab === 2 && <AlertsViz />}
            {tab === 3 && <AIChatViz />}
          </div>
        </div>
      </div>
    </section>
  );
};

const PipelineViz = () => {
  const [stage, setStage] = React.useState(0);
  const [rows, setRows] = React.useState(3412);
  const [syncMin, setSyncMin] = React.useState(6);
  React.useEffect(() => {
    const iv = setInterval(() => setStage(s => (s + 1) % 3), 1800);
    return () => clearInterval(iv);
  }, []);
  React.useEffect(() => {
    const iv = setInterval(() => {
      setRows(r => r + Math.floor(Math.random() * 14));
      setSyncMin(m => (m + 1) % 12);
    }, 3600);
    return () => clearInterval(iv);
  }, []);

  const Stage = ({idx, n, label, badge, badgeKind, children}) => {
    const active = stage === idx;
    return (
      <div className={`etl-stage ${active ? 'etl-active' : ''}`}>
        <div className="etl-stage-head">
          <span className="etl-stage-label"><span className="etl-n">{n}</span> · {label}</span>
          <span className={`etl-badge etl-badge-${badgeKind}`}>
            {active && badgeKind === 'run' ? 'dbt run…' : badge}
          </span>
        </div>
        <div className="etl-pills">{children}</div>
      </div>
    );
  };

  return (
    <div className="etl-card">
      <Stage idx={0} n="01" label="EXTRACT" badge="ready" badgeKind={stage===0?'run':'ready'}>
        <span className="etl-pill"><span className="etl-dot etl-dot-teal"/>SurveyCTO</span>
        <span className="etl-pill"><span className="etl-dot etl-dot-teal"/>KoboToolbox</span>
        <span className="etl-pill"><span className="etl-dot etl-dot-teal"/>Google Sheets</span>
        <span className="etl-pill"><span className="etl-dot etl-dot-teal"/>PostgreSQL</span>
        <span className="etl-pill"><span className="etl-dot etl-dot-teal"/>REST API</span>
      </Stage>

      <div className="etl-arrow">↓</div>

      <Stage idx={1} n="02" label="TRANSFORM" badge="ready" badgeKind={stage===1?'run':'ready'}>
        <span className="etl-pill etl-pill-mono">clean_beneficiaries.sql</span>
        <span className="etl-pill etl-pill-mono">dedupe_surveys.sql</span>
        <span className="etl-pill etl-pill-mono">join_programmes.sql</span>
      </Stage>

      <div className="etl-arrow">↓</div>

      <Stage idx={2} n="03" label="LOAD" badge="ready" badgeKind={stage===2?'run':'ready'}>
        <span className="etl-pill"><span className="etl-dot etl-dot-amber"/>Your warehouse</span>
        <span className="etl-pill etl-pill-muted">{rows.toLocaleString()} rows updated</span>
      </Stage>

      <div className="etl-footer">
        <span className="etl-foot-left">
          <span className="etl-foot-label">Schedule</span>
          <span className="etl-foot-val">every 6h</span>
          <span className="etl-foot-sep" />
          <span className="etl-foot-label">Last sync:</span>
          <span className="etl-foot-val etl-foot-time">{syncMin} min ago</span>
        </span>
        <span className="etl-foot-status">
          <span className="etl-status-dot" /> Active
        </span>
      </div>
    </div>
  );
};

const DashboardViz = () => (
  <div className="tab-viz-dashboard">
    <div className="viz-card viz-big">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
        <div>
          <div style={{fontSize:11, color:'#697386', fontWeight:600, textTransform:'uppercase', letterSpacing:'.05em'}}>Programme quality index</div>
          <div style={{fontSize:32, fontWeight:700, color:'#0a2540', letterSpacing:'-0.02em', marginTop:4}}>87.4</div>
        </div>
        <div style={{color:'#00a890', fontSize:13, fontWeight:600}}>▲ 4.2 pts MoM</div>
      </div>
      <svg viewBox="0 0 320 80" width="100%" height="80" style={{display:'block'}}>
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00bfa6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00bfa6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M0,60 C40,50 60,40 100,35 C140,30 160,45 200,30 C240,15 260,25 320,10 L320,80 L0,80 Z" fill="url(#g1)"/>
        <path d="M0,60 C40,50 60,40 100,35 C140,30 160,45 200,30 C240,15 260,25 320,10" fill="none" stroke="#00bfa6" strokeWidth="2.5"/>
      </svg>
    </div>
    <div className="viz-row">
      <div className="viz-card">
        <div style={{fontSize:12, color:'#697386', fontWeight:600, marginBottom:10}}>By region</div>
        <div className="viz-legend-item"><span><i style={{background:'#00bfa6'}}/>Maharashtra</span><strong style={{color:'#0a2540'}}>4,210</strong></div>
        <div className="viz-legend-item"><span><i style={{background:'#0a2540'}}/>Karnataka</span><strong style={{color:'#0a2540'}}>5,380</strong></div>
        <div className="viz-legend-item"><span><i style={{background:'#f4a623'}}/>Bihar</span><strong style={{color:'#0a2540'}}>2,890</strong></div>
        <div className="viz-legend-item"><span><i style={{background:'#7c7cff'}}/>Tamil Nadu</span><strong style={{color:'#0a2540'}}>1,600</strong></div>
      </div>
      <div className="viz-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <svg className="viz-donut" viewBox="0 0 42 42">
          <circle cx="21" cy="21" r="16" fill="none" stroke="#eef1f6" strokeWidth="6"/>
          <circle cx="21" cy="21" r="16" fill="none" stroke="#00bfa6" strokeWidth="6"
            strokeDasharray="75 100" strokeDashoffset="25" transform="rotate(-90 21 21)" strokeLinecap="round"/>
          <text x="21" y="22" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0a2540">75%</text>
          <text x="21" y="28" textAnchor="middle" fontSize="3" fill="#697386">coverage</text>
        </svg>
      </div>
    </div>
  </div>
);

const AlertsViz = () => (
  <div className="tab-viz-alerts">
    <div style={{fontSize:12, color:'#697386', fontWeight:600, textTransform:'uppercase', letterSpacing:'.04em', marginBottom:4}}>Alerts · today</div>
    <div className="alert-row warn">
      <div className="alert-ico">!</div>
      <div>
        <div className="alert-title">WASH-North attendance dropped 18%</div>
        <div className="alert-sub">Below 70% threshold for 3 consecutive days. Field supervisor notified.</div>
        <div className="alert-time">09:42 · auto-assigned to Rina K.</div>
      </div>
    </div>
    <div className="alert-row good">
      <div className="alert-ico">✓</div>
      <div>
        <div className="alert-title">Edu-West quarterly report generated</div>
        <div className="alert-sub">Sent to 4 funders. Open rate: 100%.</div>
        <div className="alert-time">08:15 · schedule · monthly</div>
      </div>
    </div>
    <div className="alert-row info">
      <div className="alert-ico">⟳</div>
      <div>
        <div className="alert-title">3,412 rows synced from SurveyCTO</div>
        <div className="alert-sub">Transform completed in 42s · 0 errors · 2 schema changes detected.</div>
        <div className="alert-time">06:00 · schedule · every 6h</div>
      </div>
    </div>
    <div className="alert-row info">
      <div className="alert-ico">?</div>
      <div>
        <div className="alert-title">Chat: "Which districts missed follow-up in Q2?"</div>
        <div className="alert-sub" style={{fontStyle:'italic'}}>Satara, Osmanabad, and Sangli — 240 beneficiaries pending.</div>
        <div className="alert-time">coming soon</div>
      </div>
    </div>
  </div>
);

const AIChatViz = () => (
  <div className="tab-viz-chat">
    <div className="chat-head">
      <div className="chat-badge">AI Chat · Preview</div>
      <div className="chat-model">claude · grounded on your data</div>
    </div>
    <div className="chat-msg chat-user">
      <div className="chat-avatar u">N</div>
      <div className="chat-bubble">Which districts saw the biggest drop in attendance last month?</div>
    </div>
    <div className="chat-msg chat-ai">
      <div className="chat-avatar a">✨</div>
      <div className="chat-bubble chat-bubble-ai">
        <div className="chat-thinking">Queried <code>attendance_by_district</code> · 42 rows</div>
        <div className="chat-answer">Three districts stand out:</div>
        <div className="chat-list">
          <div><span className="chat-dot d1" /> <b>Bhandara</b> — down 18% vs Mar</div>
          <div><span className="chat-dot d2" /> <b>Latur</b> — down 14% vs Mar</div>
          <div><span className="chat-dot d3" /> <b>Nagaur</b> — down 11% vs Mar</div>
        </div>
        <div className="chat-minichart">
          <div style={{height:'30%'}} />
          <div style={{height:'48%'}} />
          <div style={{height:'62%'}} />
          <div style={{height:'56%'}} />
          <div style={{height:'40%'}} />
          <div style={{height:'28%'}} />
        </div>
        <div className="chat-follow">Would you like to alert the M&amp;E lead for these districts?</div>
      </div>
    </div>
    <div className="chat-input">
      <input disabled placeholder="Ask your data anything…" />
      <button disabled>→</button>
    </div>
  </div>
);

const Privacy = () => (
  <section className="section" style={{paddingTop:0}}>
    <div className="container">
      <div className="privacy-wrap">
        <div className="privacy-grid-bg" />
        <div className="privacy-inner">
          <div>
            <div className="eyebrow" style={{color:'#00bfa6'}}>Privacy &amp; control</div>
            <h2>Your data remains <span className="teal">yours</span>. Always</h2>
            <p className="lede">
              Dalgo is built on open-source infrastructure. Your data lives in your own warehouse — we never see it, sell it, or store it on our servers. Role-based access, audit logs, and full data lineage come standard.
            </p>
          </div>
          <div className="privacy-features">
            <div className="priv-feature">
              <div className="ico"><svg className="i" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg></div>
              <h5>Your warehouse, your rules</h5>
              <p>Postgres, BigQuery, Snowflake — pick your stack.</p>
            </div>
            <div className="priv-feature">
              <div className="ico"><svg className="i" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h5>Full audit trails</h5>
              <p>Every sync, every edit, every access logged.</p>
            </div>
            <div className="priv-feature">
              <div className="ico"><svg className="i" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4"/></svg></div>
              <h5>Role-based access</h5>
              <p>Field, M&amp;E, leadership — each sees only what they need.</p>
            </div>
            <div className="priv-feature">
              <div className="ico"><svg className="i" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <h5>Open-source</h5>
              <p>Inspect it, fork it, self-host it. No lock-in.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Steps = () => {
  const steps = [
    { n: '01', hint: 'Understand where you are', title: 'Diagnose', body: "We start with a data lifecycle audit — mapping sources, gaps, and opportunities. No assumptions. Just clarity." },
    { n: '02', hint: 'Set up your pipeline', title: 'Automate', body: "We connect your sources to a clean, automated warehouse. Your data syncs on a schedule. You stop doing it manually." },
    { n: '03', hint: 'Build dashboards together', title: 'Learn', body: "Your M&E team works alongside ours to build the dashboards and reports that matter — for field, leadership, and funders." },
    { n: '04', hint: 'Make data part of every decision', title: 'Act & share', body: "Alerts, reports, and KPI tracking become part of your programme rhythm. Data isn't a quarterly event — it's how you work." },
  ];
  return (
    <section className="section section-soft">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">How to get started</div>
          <h2 className="section-title">From scattered to insight-ready<br/>in four steps</h2>
        </div>
        <div className="steps">
          {steps.map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <div className="step-hint">{s.hint}</div>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Why = () => (
  <section className="section">
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">Why choose us</div>
        <h1 className="section-title" style={{fontSize:'clamp(44px, 6vw, 76px)', lineHeight:1.05, letterSpacing:'-0.03em'}}>Why choose us</h1>
      </div>
      <div className="reasons">
        <div className="reason">
          <div className="reason-num">01 / BUILT FOR NONPROFITS</div>
          <h3>Every feature shaped by your programmes</h3>
          <p>Not enterprise bloat dressed up in a nonprofit skin. We've worked inside the sector — we know what M&amp;E teams actually need, and we've cut the rest.</p>
        </div>
        <div className="reason">
          <div className="reason-num">02 / SECTOR-SPECIFIC EXPERTISE</div>
          <h3>We listen first. Solutions second</h3>
          <p>Our consultants speak M&amp;E, MEAL, and theory of change fluently. We don't just deploy software — we build data culture that outlasts any tool.</p>
        </div>
        <div className="reason">
          <div className="reason-num">03 / FLAT, HONEST COST</div>
          <h3>Your costs don't balloon as you scale</h3>
          <p>The platform is open-source — you only pay for hosting and the consulting time you actually need. No per-seat surprises. No enterprise upsells. Ever.</p>
        </div>
      </div>
    </div>
  </section>
);

window.PlatformTabs = PlatformTabs;
window.Privacy = Privacy;
window.Steps = Steps;
window.Why = Why;
