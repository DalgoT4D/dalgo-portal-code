// About — People, Purpose, Platform (matches blueprint copy)
const Philosophy = () => {
  const cards = [
    {
      tag: 'People',
      tone: '',
      h: 'People carry purpose forward',
      p: 'Through the community they build, the knowledge they share, and the problems they refuse to stop solving — our team has been in your meetings.',
    },
    {
      tag: 'Purpose',
      tone: 'amber',
      h: 'Purpose draws us in',
      p: 'A shared conviction that the social sector deserves better tools, better decisions, and better outcomes — for everyone they serve.',
    },
    {
      tag: 'Platform',
      tone: 'violet',
      h: 'The platform holds it all together',
      p: 'Quietly making the hard parts easier, so the meaningful parts can breathe. Co-built with SNEHA, STiR, SHRI, Dost Education, and Antarang.',
    },
  ];
  return (
    <section className="section ph-section" id="about">
      <div className="container">
        <div className="section-head section-head-center">
          <div className="vp-eyebrow" style={{textAlign:'center'}}>About Dalgo</div>
          <h2 className="section-title">We are a combination of people, purpose, and platform</h2>
        </div>
        <div className="ph-grid">
          {cards.map((c) => (
            <div key={c.tag} className={`ph-card ${c.tone}`}>
              <div className="ph-card-tag">{c.tag}</div>
              <h3 className="ph-card-h">{c.h}</h3>
              <p className="ph-card-p">{c.p}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop:32}}>
          <a href="#" style={{color:'var(--t-pink)', fontWeight:600, textDecoration:'none', fontFamily:'var(--font-display)', fontStyle:'italic', fontSize:18}}>
            Read our story →
          </a>
        </div>
      </div>
    </section>
  );
};
window.Philosophy = Philosophy;
