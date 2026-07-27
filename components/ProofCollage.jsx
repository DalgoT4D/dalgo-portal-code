// Testimonial wall — three text-only cards in one equal-height row.
// QUOTES ARE VERBATIM customer voice: never edit, paraphrase, or complete them. Trims are
// pre-approved cut points. Banned-word rules apply to Dalgo copy only, never to attributed quotes.
const PCX_QUOTES = [
  { q: <>"It's thrilling to finally see an affordable service built on open-source software to support non-profits in making evidence-based decisions."</>, name: 'Jacob Hughey', role: 'Core Team Member', org: 'The Agency Fund' },
  { q: <>"The introduction of the dashboard has been a game-changer for our team. It has significantly reduced the time spent on <mark className="prf-mark">compiling data manually</mark>, allowing us to focus more on analysis and decision-making rather than repetitive tasks."</>, name: 'Vinodhini Umashankar', role: 'Associate Director – Monitoring & Evaluation', org: 'Ummeed Child Development Center' },
  { q: <>"Caseworkers now save close to <mark className="prf-mark">three hours every week</mark> on navigation and report generation, with reports that previously took half a day now generated in just a few minutes."</>, name: 'Nicholas Ong’injo', role: 'MEL Team', org: 'SHOFCO (Shining Hope for Communities)' },
];
const ProofCollage = () => (
  <section className="pcx-section" aria-labelledby="pcx-h2" data-screen-label="Testimonial wall">
    <div className="container">
      <div className="section-head section-head-center" style={{ marginBottom: 44 }}>
        <p className="pcx-eyebrow">Trusted by the sector</p>
        <h2 className="section-title" id="pcx-h2">What nonprofits <span className="hl-underline">say</span> about Dalgo</h2>
        <p className="pg-section-sub" style={{ margin: '12px auto 0' }}>Verbatim, from the teams who run their data on Dalgo every day.</p>
      </div>
      <div className="prf-wall">
        {PCX_QUOTES.map((t, i) => (
          <figure className="prf-tcard" key={i}>
            <blockquote>{t.q}</blockquote>
            <figcaption>
              <span className="prf-tname">{t.name}</span>
              <span className="prf-trole">{t.role ? t.role + ', ' + t.org : t.org}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="vp-cta-row"><a href="impact.html" className="vp-section-cta">Browse Case Studies →</a></div>
    </div>
  </section>
);
window.ProofCollage = ProofCollage;
