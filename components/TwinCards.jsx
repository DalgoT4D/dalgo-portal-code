// Twin Product / Consulting cards — the slimmed Home's router to the two main journeys.
const TwinCards = () => (
  <section className="pg-section" style={{ background: '#fff' }}>
    <div className="container">
      <div className="tc-grid">
        <article className="tc-card">
          <span className="tc-eyebrow">The Product</span>
          <h2 className="tc-h">One platform for your programme data</h2>
          <p className="tc-p">Ingest, transform, and visualise on a warehouse you own — 600+ data sources, powered by Airbyte connectors.</p>
          <a className="tc-link" href="product.html">Explore the Product <span aria-hidden="true">→</span></a>
        </article>
        <article className="tc-card">
          <span className="tc-eyebrow">Consulting</span>
          <h2 className="tc-h">Expert help, priced for nonprofits</h2>
          <p className="tc-p">Data strategy, M&E systems, and implementation support from a team fluent in the social sector.</p>
          <a className="tc-link" href="consulting.html">Explore Consulting <span aria-hidden="true">→</span></a>
          <a className="tc-sub" href="https://forms.gle/envgKD2VeRq3Un5y6" target="_blank" rel="noopener">Apply for Pro Bono Consulting <svg className="x-ext" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"></path></svg></a>
        </article>
      </div>
    </div>
  </section>
);
window.TwinCards = TwinCards;
