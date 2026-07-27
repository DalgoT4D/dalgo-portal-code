// FourShifts — what better decisions feel like (2x2 grid)
const FourShifts = () => {
  const shifts = [
    {
      n: '01',
      tag: '01 · Save time',
      title: 'From a week of prep to an hour',
      body: 'Automated pipelines do the cleaning, transforming, and dashboard updates in the background. M&E teams get the time back.',
      proofClass: 'fs-proof',
      quote: '"What used to take a week now takes just an hour to prepare for monthly or ad-hoc reviews. We simply check to ensure the systems are running smoothly — that\'s it."',
      attr: { name: 'Naveli', role: 'Lead Data Manager, STiR Education' },
    },
    {
      n: '02',
      tag: '02 · Tell stories better',
      title: 'Spend the time on the story',
      body: 'When numbers are ready on demand, leadership and partnerships teams stop wrangling data and start crafting the narrative funders trust.',
      proofClass: 'fs-proof fs-proof-amber',
      quote: '"We\'re now able to focus much more on building the story, rather than spending time working on the data to build that story."',
      attr: { name: 'Arun', role: 'Senior Manager, STiR Education' },
    },
    {
      n: '03',
      tag: '03 · Stay secure & compliant',
      title: 'Your data lives where it should — with you',
      body: 'Dalgo runs on your warehouse, with role-based access for sensitive fields. Open-source, DPDP-ready, and a Digital Public Good.',
      proofClass: 'fs-proof fs-proof-violet',
      badges: ['DPGA-recognised', 'Open-source on GitHub', 'DPDP-readiness in progress'],
    },
    {
      n: '04',
      tag: '04 · Achieve data confidence',
      title: 'Decisions you can stand behind',
      body: 'Field, M&E, and leadership see the same truth at the same time. Dashboards stop being reports and start being meeting rooms.',
      proofClass: 'fs-proof fs-proof-coral',
      quote: '"We\'ve become quite dependent on the data we\'re now able to generate so easily. If Dalgo were to disappear tomorrow, it could actually cause a huge cascading effect."',
      attr: { name: 'Arun', role: 'STiR Education' },
    },
  ];
  return (
    <section className="section fs-section" id="four-shifts">
      <div className="container">
        <div className="section-head section-head-center">
          <div className="eyebrow">What better decisions feel like</div>
          <h2 className="section-title">Time back. Sharper stories. Safer data. Real confidence</h2>
          <p className="section-sub">
            Better decision-making isn't a single moment. It's four shifts that show up across your team, week after week.
          </p>
        </div>
        <div className="fs-grid">
          {shifts.map(s => (
            <div key={s.n} className="fs-card">
              <div className="fs-num">{s.tag}</div>
              <h3 className="fs-title">{s.title}</h3>
              <p className="fs-body">{s.body}</p>
              <div className={s.proofClass}>
                {s.quote && <p className="fs-proof-quote">{s.quote}</p>}
                {s.attr && (
                  <div className="fs-proof-attr">
                    — <strong>{s.attr.name}</strong>, {s.attr.role}
                  </div>
                )}
                {s.badges && (
                  <div className="fs-proof-badges">
                    {s.badges.map(b => <span key={b} className="fs-proof-badge">{b}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.FourShifts = FourShifts;
