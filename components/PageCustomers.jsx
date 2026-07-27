// ===== Customers page =====
const CustomersHero = () => (
  <section className="pg-hero">
    <div className="container">
      <h1 className="pg-h1">What NGOs do with clean <em>data</em></h1>
      <p className="pg-sub">25+ nonprofits across education, health, WASH and livelihoods — in India and East Africa — use Dalgo to move from cleaning data to making decisions.</p>
    </div>
  </section>
);

const FeaturedStories = () => {
  const stories = [
    {
      org: 'STiR Education',
      sector: 'Education · 6 regions',
      before: 'One week per monthly review — 1–2 people, cleaning from scratch.',
      after: 'One hour. One person. All six regions.',
      metric: '1 week → 1 hour',
      quote: '"Irrespective of the questions that come our way — whether from donors or the government — we\'re now able to focus much more on building the story, rather than spending time working on the data to build that story."',
      href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/',
    },
    {
      org: 'SHRI',
      sector: 'Sanitation · India',
      before: '20+ hours a week of manual data work.',
      after: 'Under one hour. Published in India Development Review.',
      metric: '20+ hrs → <1 hr',
      quote: '"Read our case study in India Development Review."',
      href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/',
    },
    {
      org: 'SHOFCO',
      sector: 'Health / WASH · Kenya',
      before: '12+ hours a week, per caseworker.',
      after: 'Around two hours a week.',
      metric: '12+ hrs → ~2 hrs',
      quote: '"The consulting team has also been extremely supportive, both in helping us make sense of our data, and also in training us to independently use the platform."',
      href: 'impact.html',
    },
  ];
  return (
    <section className="pg-section">
      <div className="container">
        <div className="cust-stories">
          {stories.map((s) => (
            <article key={s.org} className="cust-story">
              <div className="cust-story-left">
                <div className="cust-story-org">{s.org}</div>
                <div className="cust-story-sector">{s.sector}</div>
                <div className="cust-metric">{s.metric}</div>
              </div>
              <div className="cust-story-right">
                <div className="cust-ba">
                  <div><span className="cust-ba-label">Before</span><p>{s.before}</p></div>
                  <div><span className="cust-ba-label">After</span><p>{s.after}</p></div>
                </div>
                <blockquote className="cust-quote">{s.quote}</blockquote>
                <a href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className="cust-link">Read full story →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial carousel — Senja embed widget
const TestimonialCarousel = () => {
  React.useEffect(() => {
    if (document.getElementById('senja-widget-script')) {
      if (window.SenjaEmbed && window.SenjaEmbed.reload) window.SenjaEmbed.reload();
      return;
    }
    const s = document.createElement('script');
    s.id = 'senja-widget-script';
    s.src = 'https://widget.senja.io/widget/d7e88e53-6d30-4c77-993b-61b385747c15/platform.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return (
    <section className="tc-section">
      <div className="container">
        <div className="senja-embed" data-id="d7e88e53-6d30-4c77-993b-61b385747c15" data-mode="shadow" data-lazyload="false" style={{ display: 'block', width: '100%' }}></div>
      </div>
    </section>
  );
};

// Case-study thumbnails — clean navigatable cards
const CaseStudyThumbs = () => {
  const stories = [
    { sector: 'Sanitation', org: 'SHRI', title: 'Flushing out inefficiencies for better-quality sanitation', img: 'https://projecttech4dev.org/wp-content/uploads/2025/03/unnamed.png', href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/' },
    { sector: 'Health', org: 'Ummeed', title: 'Trans-disciplinary clinical care, on one dashboard', img: 'https://projecttech4dev.org/wp-content/uploads/2025/04/ummeed2.jpg', href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/' },
    { sector: 'Education', org: 'STiR Education', title: 'From data burden to strategic insight', img: 'https://projecttech4dev.org/wp-content/uploads/2026/01/image-1-1.png', href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/' },
    { sector: 'Menstrual Health', org: 'Baala', title: 'Making the invisible visible — a path to data insights', img: 'https://projecttech4dev.org/wp-content/uploads/2025/12/Dalgo-stuti-3.jpg', href: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/' },
    { sector: 'Livelihoods', org: 'Bhumi', title: 'Closing the data-to-decision gap with Dalgo', img: 'https://projecttech4dev.org/wp-content/uploads/2026/05/image-5.png', href: 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/' },
  ];
  return (
    <section className="cs-section" id="proof">
      <div className="container">
        <div className="section-head section-head-center cs-head">
          <h2 className="section-title"><span className="hl-underline">Case studies</span> across the sector</h2>
          <p className="section-sub" style={{ maxWidth: 820, margin: '12px auto 0' }}>Explore how nonprofits across sanitation, health, education and livelihoods put clean data to work with Dalgo.</p>
        </div>
        <div className="si-grid">
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

const CustomersCTA = () => (
  <section className="pg-section">
    <div className="container" style={{textAlign:'center'}}>
      <h2 className="pg-h2">Are you next?</h2>
      <div className="pg-hero-ctas" style={{marginTop:32}}>
        <a href="contact.html" className="pg-btn">Book a demo</a>
        <a href="contact.html" className="pg-btn pg-btn-ghost">Start with a Data Diagnosis</a>
      </div>
    </div>
  </section>
);

window.CustomersHero = CustomersHero;
window.TestimonialCarousel = TestimonialCarousel;
window.CaseStudyThumbs = CaseStudyThumbs;
window.CustomersCTA = CustomersCTA;
