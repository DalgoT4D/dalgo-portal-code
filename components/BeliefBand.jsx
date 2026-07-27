// BeliefBand — sombre, powerful purpose statement over a blurred image, with DPG + open-source badges.
const BeliefBand = () =>
<section className="belief-band">
    <div className="belief-bg" aria-hidden="true" data-comment-anchor="b0b58f535f-div-4-5" />
    <div className="belief-inner">
      <p className="belief-text">
        At Dalgo, we believe that nonprofits should not be held back by the weight of their data.
      </p>
      <div className="belief-badges">
        <span className="belief-badge-label">Recognised as a Digital Public Good &amp; Open Source</span>
        <div className="belief-badge-row">
          <img src="assets/dpg-badge.png" alt="Recognised as a Digital Public Good" className="belief-dpg" />
          <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener" className="belief-os-badge">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg>
            Open source
          </a>
        </div>
      </div>
    </div>
  </section>;

window.BeliefBand = BeliefBand;