// Single centered pull-quote strip — inspired by Stripe/Shadeform layout.
const QuoteStrip = () => (
  <section className="section qs-section">
    <div className="container">
      <div className="qs-wrap">
        <div className="qs-org">
          <span className="qs-org-mark" aria-hidden="true">◆</span>
          <span className="qs-org-name">Bootcamp Partner · September 2025</span>
        </div>
        <blockquote className="qs-quote">
          “What we achieved in two days might otherwise have taken six months.”
        </blockquote>
        <div className="qs-author">
          <span className="qs-author-role">(anonymous bootcamp partner)</span>
        </div>
      </div>
    </div>
  </section>
);

window.QuoteStrip = QuoteStrip;
