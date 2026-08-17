// Testimonial wall — three cards, no carousel.
//
// The card here IS the Consulting card (.cvc-card), reused wholesale. I had rebuilt this by hand
// and that was the mistake: the Consulting pattern already solves every problem this section has.
//   - .cvc-attr has a FIXED height (--cvc-attr-h), so every divider and attribution block sits on
//     the same baseline however long the quote runs
//   - .cvc-quote is flex:1, so a short quote cannot open a hole in the middle of the card
//   - .cvc-head pairs the org logo (top-left, min-height reserved) with the decorative mark
//     (top-right), so logos of wildly different proportions cannot shift anything below them
// Two deliberate omissions vs Consulting: no .cvc-tag (these quotes carry no engagement tag) and
// no .cvc-avatar (no headshots cleared for these three — the org logo carries attribution).
//
// QUOTES ARE VERBATIM customer voice: never edit, paraphrase, or complete them. Trims are
// pre-approved cut points. Banned-word rules apply to Dalgo copy only, never to attributed quotes.
const PCX_QUOTES = [
  { q: <>"It's thrilling to finally see an affordable service built on open-source software to support non-profits in making evidence-based decisions."</>, name: 'Jacob Hughey', role: 'Core Team Member', org: 'The Agency Fund', logo: 'assets/logos/AgencyFund.webp' },
  { q: <>"The introduction of the dashboard has been a game-changer for our team. It has significantly reduced the time spent on <mark className="prf-mark">compiling data manually</mark>, allowing us to focus more on analysis and decision-making rather than repetitive tasks."</>, name: 'Vinodhini Umashankar', role: 'Associate Director – Monitoring & Evaluation', org: 'Ummeed Child Development Center', logo: 'assets/logos/Ummeed.png' },
  { q: <>"Caseworkers now save close to <mark className="prf-mark">three hours every week</mark> on navigation and report generation, with reports that previously took half a day now generated in just a few minutes."</>, name: 'Nicholas Ong’injo', role: 'MEL Team', org: 'SHOFCO (Shining Hope for Communities)', logo: 'assets/logos/SHOFCO.png' },
];
const ProofCollage = () => (
  <section className="pcx-section" aria-labelledby="pcx-h2" data-screen-label="Testimonial wall">
    <div className="container">
      <div className="section-head section-head-center" style={{ marginBottom: 44 }}>
        <h2 className="section-title" id="pcx-h2">What Nonprofits <span className="hl-underline">Say</span> About Dalgo</h2>
      </div>
      <div className="prf-wall">
        {PCX_QUOTES.map((t, i) => (
          <article className="cvc-card" key={i}>
            <div className="cvc-body">
              <div className="cvc-head">
                {t.logo
                  ? <img className="cvc-logo" src={t.logo} alt={t.org} loading="lazy" decoding="async" />
                  : <span className="cvc-org-top">{t.org}</span>}
                <span className="cvc-mark" aria-hidden="true">&ldquo;</span>
              </div>
              <blockquote className="cvc-quote">{t.q}</blockquote>
            </div>
            <footer className="cvc-attr">
              <span className="cvc-who">
                <span className="cvc-name">{t.name}</span>
                <span className="cvc-desig">{t.role}</span>
                <span className="cvc-orgname">{t.org}</span>
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  </section>
);
window.ProofCollage = ProofCollage;
