// ===== Resources page =====
const ResourcesHero = () => (
  <SiteHero
    eyebrow="Resources"
    headline={<>Learn data,<br /><span className="cvh-hl">the nonprofit way</span></>}
    body="Blogs, webinars, and data education — practical resources to help your team build a stronger data culture."
    ctas={<HeroCTAs primaryLabel="Try the Platform" primaryHref="https://dashboard.dalgo.org" secondaryLabel="Browse the Blog" secondaryHref="https://projecttech4dev.org/blogs/?category=dalgo" />}
  >
    <div className="cvh-visual">
      <figure className="cvh-figure">
        <img src="assets/opt/sprint.webp" alt="Nonprofit teams collaborating at a Dalgo data workshop" loading="eager" />
      </figure>
    </div>
  </SiteHero>
);

const ResourcesGrid = () => {
  const groups = [
    {
      heading: 'Dalgo Blogs',
      cards: [
        { kind: 'Blog', title: 'From data burden to strategic insight', desc: 'How STiR transformed data with Dalgo.', href: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/', link: 'Read on the blog →' },
        { kind: 'Blog', title: 'Lessons from Bhumi: closing the data-to-decision gap', desc: 'How Bhumi turned scattered programme data into action with Dalgo.', href: 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/', link: 'Read on the blog →' },
        { kind: 'Blog', title: 'Flushing out inefficiencies with SHRI', desc: "Dalgo's data-driven approach to better quality sanitation.", href: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/', link: 'Read on the blog →' },
        { kind: 'Blog', title: 'Maximising impact with Ummeed', desc: "Dalgo's approach to data-driven, trans-disciplinary clinical care.", href: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/', link: 'Read on the blog →' },
        { kind: 'Blog', title: 'All Dalgo stories on the Tech4Dev blog', desc: 'Browse every Dalgo article, case study, and announcement in one place.', href: 'https://projecttech4dev.org/blogs/?category=dalgo', link: 'Browse all articles →' },
      ],
    },
    {
      heading: 'NGO Spotlights',
      cards: [
        { kind: 'Webinar', title: 'Using Dalgo and building dashboards with Dhwani RIS', desc: 'Dhwani RIS', href: 'https://www.youtube.com/watch?v=rjaRU3_TH_k', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: 'Dalgo NGO Spotlight: The Apprentice Project', desc: 'The Apprentice Project', href: 'https://www.youtube.com/watch?v=cSYsu0mXYw8', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: "Arghyam's automated analytics for rural water systems", desc: 'Arghyam', href: 'https://www.youtube.com/watch?v=Zwrvbkisc_o', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: "Enabling Data Ownership: SHOFCO's Journey with Dalgo", desc: 'SHOFCO', href: 'https://www.youtube.com/watch?v=xc1WwUU94wg', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: 'Lessons from Bhumi NGO: Data that drives impact', desc: 'Bhumi', href: 'https://www.youtube.com/watch?v=9JVxE-pHsWY', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: "Harnessing Real-Time Data for Social Impact: SNEHA's Journey", desc: 'SNEHA', href: 'https://www.youtube.com/watch?v=kn501ysHQHs', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: 'How Antarang Foundation streamlined data with Dalgo', desc: 'Antarang Foundation', href: 'https://www.youtube.com/watch?v=TOfMwULBuIU', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: 'NGO Data Spotlight: STiR Education', desc: 'STiR Education', href: 'https://www.youtube.com/watch?v=AB-t4GTOI74', link: 'Watch on YouTube →' },
        { kind: 'Webinar', title: 'NGO Data Spotlight: Baala', desc: 'Baala', href: 'https://www.youtube.com/watch?v=SKAsfNm8I9A', link: 'Watch on YouTube →' },
      ],
    },
    {
      heading: 'Product Announcements',
      cards: [
        { kind: 'Video', title: 'Data Quality Dashboards', desc: 'Product walkthrough', href: 'https://www.youtube.com/watch?v=WiLyVgz8RyI', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Dalgo Feature Updates: Master Data Quality & Control', desc: 'Feature updates', href: 'https://www.youtube.com/watch?v=HnCeOvCgc5c', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'From Data to Insights: helping nonprofits make faster decisions', desc: 'Faster decisions', href: 'https://www.youtube.com/watch?v=vDpoVWkjdp4', link: 'Watch on YouTube →' },
        { kind: 'Video', title: "From Data to Direction – Inside Dalgo's NGO-Led Product Evolution", desc: 'Product evolution', href: 'https://www.youtube.com/watch?v=jcKUkfeFVa0', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Introducing Dalgo 2.0 — From Data Automation to Data Confidence', desc: 'Dalgo 2.0 launch', href: 'https://www.youtube.com/watch?v=CBG2J_f4xgM', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Dalgo: Automated Insights for Nonprofits', desc: 'Automated insights', href: 'https://www.youtube.com/watch?v=EZe9p3E7nAw', link: 'Watch on YouTube →' },
      ],
    },
    {
      heading: 'Data Education',
      cards: [
        { kind: 'Video', title: 'Intro to Dalgo — Webinar', desc: 'Getting started', href: 'https://www.youtube.com/watch?v=sG8A1ngGWmE', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Intro to Dalgo Webinar', desc: 'Getting started', href: 'https://www.youtube.com/watch?v=yeyh2j0k6Xo', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Intro to Dalgo', desc: 'Getting started', href: 'https://www.youtube.com/watch?v=OtOyF_PP7Qk', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'From Chaos to Clarity: unlocking data insights from Google Sheets', desc: 'Google Sheets insights', href: 'https://www.youtube.com/watch?v=utLdg37OMQU', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Understanding Data Lifecycle — A Practical Guide for NGOs', desc: 'Data lifecycle guide', href: 'https://www.youtube.com/watch?v=gY1Gif7Jh5w', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'The Data Lifecycle for NGOs — Plan → Collect → Store → Transform → Visualize → Act', desc: 'Data lifecycle for NGOs', href: 'https://www.youtube.com/watch?v=_-fmliyQO8w', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Optimizing NGO Data Pipeline: Insights into the Dalgo Platform (IndiaFOSS 2024)', desc: 'IndiaFOSS 2024', href: 'https://www.youtube.com/watch?v=drnWxYQvAlY', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Data Dialogues: A One-Day Workshop with 17 NGOs', desc: 'Data Dialogues', href: 'https://www.youtube.com/watch?v=T7V6Dba514Q', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Dalgo Bootcamp 2025: Recap', desc: 'Bootcamp recap', href: 'https://www.youtube.com/watch?v=eBWHR0ZGQKA', link: 'Watch on YouTube →' },
      ],
    },
    {
      heading: 'AI',
      cards: [
        { kind: 'Video', title: 'Explore your data with AI enabled analytics (v0.1)', desc: 'AI Analytics v0.1', href: 'https://www.youtube.com/watch?v=c8qHtE29sGU', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'AI enabled analysis with Dalgo', desc: 'AI analysis', href: 'https://www.youtube.com/watch?v=FZSDx5L5YKo', link: 'Watch on YouTube →' },
        { kind: 'Video', title: 'Practical AI for Nonprofits', desc: 'Practical AI', href: 'https://www.youtube.com/watch?v=7dEh15fk8Ek', link: 'Watch on YouTube →' },
      ],
    },
  ];
  return (
    <React.Fragment>
      {groups.map((g, gi) => (
        <section key={g.heading} className={`pg-section ${gi % 2 ? 'alt' : ''}`}>
          <div className="container">
            <div className="pg-section-head left"><h2 className="pg-h2">{g.heading}</h2></div>
            <div className="res-grid">
              {g.cards.map((c) => {
                const m = c.href.match(/[?&]v=([\w-]{11})/);
                const vid = m ? m[1] : null;
                return (
                  <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener" className={`res-card ${vid ? 'res-card-video' : ''}`}>
                    {vid && (
                      <div className="res-thumb">
                        <img src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`} alt="" loading="lazy" />
                        <span className="res-play" aria-hidden="true">
                          <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </span>
                      </div>
                    )}
                    <div className="res-kind">{c.kind}</div>
                    <h3>{c.title}</h3>
                    {!vid && <p>{c.desc}</p>}
                    <span className="res-link">{c.link}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </React.Fragment>
  );
};

window.ResourcesHero = ResourcesHero;
window.ResourcesGrid = ResourcesGrid;
