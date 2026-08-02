// How Dalgo Helps — three standalone solution cards (Consulting / Platform / Reporting).
// Static, responsive 3→2→1 columns. Reuses Dalgo card tokens + the nurture-btn CTA.
// Image occupies the top of each card; all cards share one aspect ratio and equal heights.
const HowDalgoHelps = () => {
  const cards = [
    {
      cat: 'Consulting',
      title: 'Data Consulting',
      img: 'assets/illus/dashboard-charts.webp',
      body: "Design reporting systems, measurement frameworks, and data strategies with guidance from Dalgo's data experts.",
      cta: { label: 'Book a Free Consultation', href: 'contact.html' },
    },
    {
      cat: 'Platform',
      title: 'Data Integration Platform',
      img: 'assets/illus/data-pipeline.webp',
      body: 'Bring spreadsheets, CRMs, surveys, and programme data into one trusted source of truth without replacing your existing tools.',
      cta: { label: 'Explore the Platform', href: 'product.html' },
    },
    {
      cat: 'Reporting',
      title: 'Reporting & Decision Support',
      img: 'assets/illus/reports-alert.webp',
      body: 'Create dashboards, automate donor reporting, and monitor programme performance using reliable, up-to-date data.',
      cta: { label: 'See Reporting', href: 'product.html' },
    },
  ];
  return (
    <section className="hdh-section">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="hdh-eyebrow">How Dalgo Helps</p>
          <h2 className="section-title">Helping Nonprofits make <span className="hl-underline">better decisions</span></h2>
          <p className="section-sub hdh-sub">Whether you're building your first reporting system or scaling an organization-wide data practice, Dalgo combines expert consulting with purpose-built technology to help your team consolidate, organize, and use data with confidence.</p>
        </div>
        <div className="hdh-grid">
          {cards.map((c) => (
            <article className="hdh-card" key={c.title}>
              <div className="hdh-thumb"><img src={c.img} alt={c.title} loading="lazy" /></div>
              <div className="hdh-body">
                <p className="hdh-cat">{c.cat}</p>
                <h3 className="hdh-title">{c.title}</h3>
                <p className="hdh-text">{c.body}</p>
                <a className="nurture-btn hdh-cta" href={c.cta.href}>{c.cta.label}</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
window.HowDalgoHelps = HowDalgoHelps;
