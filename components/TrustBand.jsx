// TrustBand — security / open-source / reliability signals, Fivetran-style band.
// Dalgo-true pillars only (no fabricated certifications).
const TrustBand = () => {
  const pillars = [
  { label: 'Digital Public Good', img: 'assets/dpg-badge.png', href: 'https://www.digitalpublicgoods.net/r/dalgo' },
  { label: 'Open Source', href: 'https://github.com/DalgoT4D',
    svg: <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg> },
  { label: 'DPDP Compliant', href: 'https://www.meity.gov.in/data-protection-framework',
    svg: <svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg> },
  { label: 'Your Own Warehouse', href: 'https://dalgo.org',
    svg: <svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" /><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></svg> },
  { label: 'Role-Based Access',
    svg: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" /></svg> }];

  return (
    <section className="trust-section" id="trust">
      <div className="container">
        <div className="section-head section-head-center trust-head">
          <h2 className="section-title">Built for <span className="hl-underline">trust</span>, security &amp; openness</h2>
          <p className="section-sub" style={{ maxWidth: 880, margin: '12px auto 0' }}>Your data lives in your own warehouse — Dalgo never sells it or stores it on our servers. Open-source, DPDP-compliant as a Data Processor, and a recognised Digital Public Good.</p>
          <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener" className="trust-link" style={{ marginTop: 20 }}>
            Explore our open-source code
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
          </a>
        </div>
        <div className="trust-grid">
          {pillars.map((p, i) =>
          p.href ?
          <a className="trust-cell trust-cell-link" key={i} href={p.href} target="_blank" rel="noopener">
            <div className="trust-ic">
              {p.img ? <img loading="lazy" src={p.img} alt={p.label} /> : p.svg}
            </div>
            <div className="trust-label">{p.label}</div>
          </a> :
          <div className="trust-cell" key={i}>
            {p.soon ? <span className="trust-soon">Coming soon</span> : null}
            <div className="trust-ic">
              {p.img ? <img loading="lazy" src={p.img} alt={p.label} /> : p.svg}
            </div>
            <div className="trust-label">{p.label}</div>
          </div>
          )}
        </div>
        <p className="trust-dpdp">Dalgo is <a href="https://projecttech4dev.org/dalgo-is-now-dpdp-compliant-what-does-it-mean-for-you/" target="_blank" rel="noopener">DPDP-compliant</a> as a Data Processor. Your organisation remains the Data Fiduciary.</p>
      </div>
    </section>);

};

window.TrustBand = TrustBand;