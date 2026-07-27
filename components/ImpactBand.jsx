// Fast Forward–style impact band: oversized stats on deep ink.
const ImpactBand = () => (
  <section className="impact-band">
    <div className="container">
      <div className="impact-head">The proof is in the impact</div>
      <div className="impact-grid">
        <div className="impact-stat">
          <div className="impact-num">25<span className="u">+</span></div>
          <div className="impact-label">Nonprofits building on Dalgo across India and East Africa</div>
        </div>
        <div className="impact-stat">
          <div className="impact-num">600<span className="u">+</span></div>
          <div className="impact-label">Data sources connected, cleaned, and combined</div>
        </div>
        <div className="impact-stat">
          <div className="impact-num">1<span className="u">wk→1hr</span></div>
          <div className="impact-label">From a week of report prep to a single hour, for teams like STiR</div>
        </div>
      </div>
    </div>
  </section>
);

// Fast Forward–style announcement bar
const Announce = () => (
  <div className="ff-announce">
    <span>New: Dalgo is recognised as a Digital Public Good.</span>
    <a href="https://www.digitalpublicgoods.net/r/dalgo" target="_blank" rel="noopener">Learn more →</a>
  </div>
);

window.ImpactBand = ImpactBand;
window.Announce = Announce;
