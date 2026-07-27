const Sectors = () => {
  const sectors = [
    {
      name: 'Education',
      title: 'Attendance, learning outcomes, teacher quality — in one place',
      quote: "Dalgo helped us see attendance, learning outcomes, and teacher performance across 1,200 schools — in one place.",
      cite: '— STiR Education',
      how: 'Track student progression, teacher support quality, and multi-site attendance. Integrate with KoboToolbox and ODK for a real-time picture of programme quality — and the evidence your funders expect.',
    },
    {
      name: 'Livelihoods',
      title: 'From enrolment to placement, tracked at every step',
      quote: "We finally have a single view of our placements pipeline — across 14 states — and can tell funders exactly where livelihoods are being created.",
      cite: '— Antarang',
      how: 'Connect enrolment, training, and post-placement tracking. Measure what actually stuck — not just who walked through the door.',
    },
    {
      name: 'Health',
      title: 'Beneficiary-level outcomes, warehouse-grade privacy',
      quote: "Dalgo lets us run outcome dashboards without ever exporting beneficiary data outside our warehouse.",
      cite: '— Noora Health',
      how: 'Integrate ODK, SurveyCTO, and clinical systems. Track cohorts over time, monitor indicator drift, and generate regulator-ready reports.',
    },
    {
      name: 'WASH',
      title: 'Real-time monitoring across thousands of touchpoints',
      quote: "We used to produce monthly reports. Now our field teams get daily alerts when a water point fails.",
      cite: '— INREM',
      how: 'Monitor household-level access, geo-tagged service delivery, and community reporting. Trigger alerts the moment coverage dips.',
    },
    {
      name: 'Gender',
      title: 'Sensitive data, sovereign storage, measurable change',
      quote: "We measure attitudinal shifts across cohorts — and the data never leaves our own warehouse.",
      cite: '— Durga India',
      how: 'Longitudinal cohort analysis, survivor-centred consent workflows, and role-based access for sensitive fields.',
    },
    {
      name: 'Skilling',
      title: 'Training-to-employment, end-to-end visibility',
      quote: "Our funders now see the through-line from training hour to pay cheque. That changed every conversation.",
      cite: '— TAP',
      how: 'Trainee progression, assessment scores, placement funnels, and employer follow-up — stitched into one funnel.',
    },
    {
      name: 'Community',
      title: 'Participation, voice, and governance data that scales',
      quote: "Dalgo moved us from spreadsheets across 40 districts to one dashboard the whole team trusts.",
      cite: '— Janaagraha',
      how: 'Ward-level participation, governance-metric tracking, and multi-district aggregation without losing local context.',
    },
  ];
  const [idx, setIdx] = React.useState(0);
  const s = sectors[idx];
  return (
    <section className="section" id="sectors">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Case studies</div>
          <h2 className="section-title">Trusted across 7 sectors</h2>
          <p className="section-sub">Every sector has distinct data challenges. Dalgo's consulting team knows them all.</p>
        </div>
        <div className="sectors-tabs">
          {sectors.map((sc, i) => (
            <button key={sc.name} className={`sector-pill ${i === idx ? 'active' : ''}`} onClick={() => setIdx(i)}>
              {sc.name}
            </button>
          ))}
        </div>
        <div className="sector-panel" key={idx}>
          <div>
            <div style={{fontSize:12, color:'#00a890', fontWeight:600, textTransform:'uppercase', letterSpacing:'.06em', marginBottom:12}}>{s.name}</div>
            <h3>{s.title}</h3>
            <blockquote>"{s.quote}"<cite>{s.cite}</cite></blockquote>
            <div style={{display:'flex', gap:10}}>
              <a href="#" className="btn btn-teal btn-arrow">Explore {s.name}</a>
              <a href="#book" className="btn btn-ghost">Talk to us →</a>
            </div>
          </div>
          <div className="sector-how">
            <h5>How Dalgo helps</h5>
            <p>{s.how}</p>
            <div style={{marginTop:24, paddingTop:20, borderTop:'1px solid #e6ebf1', display:'flex', gap:24}}>
              <div>
                <div style={{fontSize:24, fontWeight:700, color:'#0a2540', letterSpacing:'-0.02em'}}>{idx*3+6}+</div>
                <div style={{fontSize:12, color:'#697386'}}>nonprofits in {s.name.toLowerCase()}</div>
              </div>
              <div>
                <div style={{fontSize:24, fontWeight:700, color:'#0a2540', letterSpacing:'-0.02em'}}>{(idx+2)*4} wks</div>
                <div style={{fontSize:12, color:'#697386'}}>avg time to dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => (
  <section className="section section-soft" id="community">
    <div className="container">
      <div className="section-head section-head-left" style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24, maxWidth:'100%'}}>
        <div>
          <div className="eyebrow">Community</div>
          <h2 className="section-title">Where the sector comes together</h2>
        </div>
        <a href="#" className="btn btn-primary btn-arrow">Register for events</a>
      </div>
      <div className="events">
        <div className="event">
          <div className="event-kind"><span className="mark">◉</span> Bootcamp</div>
          <h4>Data for Impact: 4-day intensive for M&amp;E teams</h4>
          <div className="event-date">May 2025 · Online · Free for eligible NGOs</div>
          <a href="#" className="event-cta">Register →</a>
        </div>
        <div className="event">
          <div className="event-kind"><span className="mark">◈</span> Webinar</div>
          <h4>How WASH nonprofits use dashboards for real-time monitoring</h4>
          <div className="event-date">June 4, 2025 · Free · 45 min</div>
          <a href="#" className="event-cta">Register →</a>
        </div>
        <div className="event">
          <div className="event-kind"><span className="mark">◎</span> Data Dialogue</div>
          <h4>What does a good data culture look like inside an NGO?</h4>
          <div className="event-date">Ongoing series · By invite</div>
          <a href="#" className="event-cta">Join the series →</a>
        </div>
      </div>
    </div>
  </section>
);

const BookCTA = () => {
  const [choice, setChoice] = React.useState('both');
  return (
    <section className="section" id="book" style={{paddingBottom:0}}>
      <div className="container">
        <div className="book">
          <div>
            <div className="eyebrow">Ready to get started?</div>
            <h2>Ready to know your data?</h2>
            <p className="lede">
              Tell us about your programme and we'll show you exactly how Dalgo can help — in 30 minutes. No sales pressure. Just a real conversation.
            </p>
            <div className="book-stats">
              <div>
                <div className="book-stat-num"><span className="teal">a week → 1 hr</span></div>
                <div className="book-stat-label">M&amp;E review prep, STiR</div>
              </div>
              <div>
                <div className="book-stat-num">20+ → &lt;1 hr</div>
                <div className="book-stat-label">Caseworker data effort, SHOFCO</div>
              </div>
              <div>
                <div className="book-stat-num">₹0</div>
                <div className="book-stat-label">Platform licence</div>
              </div>
            </div>
          </div>
          <div>
            <div className="form-head">Book a free 30-min call</div>
            <div className="form">
              <div className="form-field">
                <label>Your name</label>
                <input placeholder="Priya Sharma" />
              </div>
              <div className="form-field">
                <label>Organisation</label>
                <input placeholder="Your nonprofit" />
              </div>
              <div className="form-field full">
                <label>Work email</label>
                <input placeholder="priya@yournonprofit.org" type="email"/>
              </div>
              <div className="form-field full">
                <label>What are you looking for?</label>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginTop:4}}>
                  {[
                    ['consulting','Consulting','Design our data op'],
                    ['platform','Platform','Manage our data'],
                    ['both','Both','Not sure where to start'],
                  ].map(([v,label,sub]) => (
                    <label key={v} style={{
                      padding:'12px 14px',
                      border:`1px solid ${choice===v?'#00bfa6':'#e6ebf1'}`,
                      background: choice===v?'#e6f9f6':'white',
                      borderRadius:10, cursor:'pointer',
                      display:'block',
                    }}>
                      <input type="radio" name="choice" value={v} checked={choice===v} onChange={()=>setChoice(v)} style={{display:'none'}}/>
                      <div style={{fontSize:13, fontWeight:600, color:choice===v?'#00a890':'#0a2540'}}>{label}</div>
                      <div style={{fontSize:11, color:'#697386', marginTop:2}}>{sub}</div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-confirm">
                <span className="note">We'll confirm within one business day.</span>
                <button className="btn btn-teal btn-arrow">Book a demo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <div className="logo-big"><span className="nav-logo-mark"/> dalgo</div>
        <p>The unified data solution for nonprofits doing high-impact work. Open-source, self-hostable, and built alongside the sector.</p>
      </div>
      <div className="footer-col">
        <h5>Platform</h5>
        <a href="#">Connect</a>
        <a href="#">Transform</a>
        <a href="#">Visualise</a>
        <a href="#">Control</a>
        <a href="#">Pricing</a>
      </div>
      <div className="footer-col">
        <h5>Company</h5>
        <a href="#">About</a>
        <a href="#">Case studies</a>
        <a href="#">Blog</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </div>
      <div className="footer-col">
        <h5>Community</h5>
        <a href="#">Bootcamps</a>
        <a href="#">Webinars</a>
        <a href="#">Data Dialogues</a>
        <a href="#">Newsletter</a>
      </div>
      <div className="footer-col">
        <h5>Tech4Dev</h5>
        <a href="#">About Tech4Dev</a>
        <a href="#">Other products</a>
        <a href="#">Partners</a>
        <a href="#">Donate</a>
      </div>
    </div>
    <div className="footer-bottom">
      <div>© 2025 Project Tech4Dev · Dalgo is open-source and free to host.</div>
      <div className="footer-bottom-right">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Security</a>
      </div>
    </div>
  </footer>
);

window.Sectors = Sectors;
window.Community = Community;
window.BookCTA = BookCTA;
window.Footer = Footer;
