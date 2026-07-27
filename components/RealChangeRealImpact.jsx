// RealChangeRealImpact — replaces Sectors visual.
// Left: large hero image (per-tab swap). Right: eyebrow → H2 → tab pills → content → Read More.
const RealChangeRealImpact = () => {
  const tabs = [
    {
      id: 'education',
      tab: 'Education',
      ngo: 'STiR Education',
      lead: 'From a week to an hour.',
      body: 'M&E review prep collapsed from a full week to an hour, across its programmes. The team now spends time on the story, not the data.',
      stat: '5x reduction in report prep time',
      readMore: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/',
      photoCaption: 'STiR · Education · Cohort review',
    },
    {
      id: 'sanitation',
      tab: 'Sanitation',
      ngo: 'SHRI',
      lead: 'Twenty hours of weekly cleaning, gone.',
      body: 'End-to-end automation in three months. Real-time insights flow to field, monitoring, and leadership.',
      stat: '99% facility uptime · ₹3.06 per use',
      readMore: '#case-study',
      photoCaption: 'SHRI · Sanitation · Field operations',
    },
    {
      id: 'multiprogram',
      tab: 'Multi-program',
      ngo: 'SHOFCO',
      lead: 'Caseworkers got their week back.',
      body: 'Reports that once took half a day now take minutes. Caseworker data effort dropped from twelve hours a week to roughly two.',
      stat: 'Dashboard rollout: months → days',
      readMore: '#case-study',
      photoCaption: 'SHOFCO · Multi-program · Casework session',
    },
    {
      id: 'healthcare',
      tab: 'Healthcare',
      ngo: 'Ummeed',
      lead: 'One child, one record.',
      body: 'Clinical and training systems integrated in three months. Holistic child profiles. Customised dashboards per program with row-level access.',
      stat: 'CMS + TMS in one warehouse',
      readMore: '#case-study',
      photoCaption: 'Ummeed · Healthcare · Therapy room',
    },
    {
      id: 'water',
      tab: 'Water',
      ngo: 'Arghyam',
      lead: 'Every Anurakshak sees their own data.',
      body: 'Custom mGramSeva connector. Unified dashboard across Avni and mGramSeva. Personalised views with daily sync alerts.',
      stat: 'Live across 3 blocks of Muzaffarpur',
      readMore: '#case-study',
      photoCaption: 'Arghyam · Water · Anurakshak field visit',
    },
  ];
  const [idx, setIdx] = React.useState(0);
  const t = tabs[idx];
  return (
    <section className="rc-section" id="sectors">
      <div className="container">
        <div className="rc-grid">
          {/* LEFT: image */}
          <div className="rc-image-wrap" key={`img-${idx}`}>
            <div className="rc-image-fallback">
              <div className="rc-fallback-label">{t.tab}</div>
              <div className="rc-fallback-title">{t.photoCaption}</div>
            </div>
          </div>
          {/* RIGHT: copy */}
          <div className="rc-copy">
            <div className="rc-eyebrow">Real change. Real impact.</div>
            <h2 className="rc-h2">Better decisions, in the field</h2>
            <div className="rc-tabs" role="tablist">
              {tabs.map((tb, i) => (
                <button
                  key={tb.id}
                  className={`rc-tab ${i === idx ? 'active' : ''}`}
                  onClick={() => setIdx(i)}
                  role="tab"
                  aria-selected={i === idx}
                >
                  {tb.tab}
                </button>
              ))}
            </div>
            <div className="rc-content" key={`content-${idx}`}>
              <div className="rc-ngo">{t.ngo}</div>
              <h3 className="rc-lead">{t.lead}</h3>
              <p className="rc-body">{t.body}</p>
              <div className="rc-stat">{t.stat}</div>
              <div>
                <a href={t.readMore} target={t.readMore.startsWith('http') ? '_blank' : undefined} rel="noopener" className="rc-readmore">
                  Read More <span className="rc-readmore-arrow">›</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.RealChangeRealImpact = RealChangeRealImpact;
