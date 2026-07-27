// ── Data forms section (3 cards: M&E, Funder reporting, Qual data) ──
const DataForms = () =>
<section className="section ps-section">
    <div className="container">
      <div className="ps-head">
        <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>Why data matters</div>
        <h2 className="ps-title" style={{ color: 'rgb(66, 85, 103)' }}>In nonprofits, data shapes <span className="ps-accent">important decisions</span></h2>
        <p className="section-sub" style={{ maxWidth: 720, margin: '16px auto 0' }}></p>
      </div>
      <div className="ps-grid">
        {/* Card 1 — M&E */}
        <div className="ps-card">
          <div className="ps-kicker ps-kicker-teal">Question 01</div>
          <h3 className="ps-card-h">How are my programs faring?</h3>
          <div className="ps-visual ps-visual-me">
            <div className="ps-me-row">
              <div className="ps-me-label">Schools onboarded</div>
              <div className="ps-me-bar"><div className="ps-me-fill" style={{ width: '82%' }} /></div>
              <div className="ps-me-val">1,284</div>
            </div>
            <div className="ps-me-row">
              <div className="ps-me-label">Sessions delivered</div>
              <div className="ps-me-bar"><div className="ps-me-fill" style={{ width: '67%', background: '#f4a623' }} /></div>
              <div className="ps-me-val">9,412</div>
            </div>
            <div className="ps-me-row">
              <div className="ps-me-label">Avg attendance</div>
              <div className="ps-me-bar"><div className="ps-me-fill" style={{ width: '91%' }} /></div>
              <div className="ps-me-val">87%</div>
            </div>
            <div className="ps-me-chip">M&amp;E dashboard</div>
          </div>
        </div>

        {/* Card 2 — Funders */}
        <div className="ps-card">
          <div className="ps-kicker ps-kicker-amber">Question 02</div>
          <h3 className="ps-card-h">What are my funders asking?</h3>
          <div className="ps-visual ps-visual-funder">
            <div className="ps-doc">
              <div className="ps-doc-bar"><span /><span /><span /></div>
              <div className="ps-doc-title">Q2 Outcome Report · 2025</div>
              <div className="ps-doc-line" style={{ width: '92%' }} />
              <div className="ps-doc-line" style={{ width: '86%' }} />
              <div className="ps-doc-line" style={{ width: '74%' }} />
              <div className="ps-doc-kpis">
                <div><b>24.1K</b><span>reached</span></div>
                <div><b>₹1.2Cr</b><span>deployed</span></div>
              </div>
            </div>
            <div className="ps-doc ps-doc-back" />
          </div>
        </div>

        {/* Card 3 — Beneficiaries */}
        <div className="ps-card">
          <div className="ps-kicker ps-kicker-violet">Question 03</div>
          <h3 className="ps-card-h">What are my beneficiaries saying?</h3>
          <div className="ps-visual ps-visual-qual">
            <div className="ps-quote">
              <div className="ps-quote-avatar" />
              <div className="ps-quote-body">
                <div className="ps-quote-name">Anita, teacher · Ranchi</div>
                <div className="ps-quote-text">"My students actually read now. The classroom feels different."</div>
                <div className="ps-quote-tags">
                  <span className="ps-tag ps-tag-pos">positive</span>
                  <span className="ps-tag">engagement</span>
                </div>
              </div>
            </div>
            <div className="ps-quote ps-quote-sm">
              <div className="ps-quote-avatar ps-q2" />
              <div className="ps-quote-body">
                <div className="ps-quote-text">"The learning material arrived late this term."</div>
                <div className="ps-quote-tags"><span className="ps-tag ps-tag-neg">logistics</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;


// ── Problem section — VoC quote cards ──
const Problems = () => {
  const cards = [
  {
    n: '01',
    heading: 'Fragmented systems, scattered data',
    quote: '"Data collection is highly fragmented — relying on Google Forms, spreadsheets, and manual processes. These systems are siloed, error-prone, and difficult to scale."'
  },
  {
    n: '02',
    heading: 'Insights arrive late, if at all',
    quote: '"It takes manual effort to perform analysis on the program — this leads to time delay in getting insights about what is happening, which means there is a delay in course corrective effort."'
  },
  {
    n: '03',
    heading: 'Multiple dashboards. One unanswered question.',
    quote: '"While data exists, it\'s scattered and doesn\'t offer a clear picture. This fragmentation makes it difficult for Community Organizers and the full-time team to take timely, data-informed decisions."'
  }];

  return (
    <section className="section ps-section ps-section-soft">
    <div className="container">
      <div className="ps-head">
        <div className="eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}>But today —</div>
        <h2 className="ps-title">Getting to those decisions? <span className="ps-accent-red">Harder than it should be</span></h2>
      </div>
      <div className="ps-grid voc-grid">
        {cards.map((c) =>
          <div key={c.n} className="ps-card ps-card-dark voc-card">
            <div className="voc-num">{c.n}</div>
            <h3 className="voc-h">{c.heading}</h3>
            <blockquote className="voc-quote">{c.quote}</blockquote>
            <div className="voc-attr">— Voice of nonprofit partner</div>
          </div>
          )}
      </div>
    </div>
  </section>);

};

window.DataForms = DataForms;
window.Problems = Problems;