// ============================================================
// PageCaseStudy — the one template every /case-studies/<slug> page renders through.
//
// Section order is the PRD's: summary and key results, challenge, solution, outcomes, partner
// quote, Book Free Consultation. One template, twelve organisations, so a reader who has seen
// one case study can scan the next without relearning the page.
//
// NOTHING HERE IS BESPOKE. The hero is SiteHero (the system hero — so a case study is the same
// height as every other page and switching tabs does not shift the fold), the quote is the
// .cvc-card used on Consulting and the home testimonials, and the CTA band is .final-cta. The
// only new CSS is the results band and the prose column, which had no existing equivalent.
//
// EVERY BODY FIELD IS OPTIONAL. Measured against the live projecttech4dev.org sources: SNEHA and
// Bhumi publish no metrics, and SHRI and SNEHA have a quote with no attributable role. So the
// results band is skipped when `results` is null rather than rendering an empty shelf, and the
// attribution drops the role line rather than printing a blank one.
// ============================================================

// Summary + key results. The figures sit on --surface-1 directly under a white hero, which is
// the one tint the composition rules allow, and the band is skipped entirely with no metrics.
const CaseStudyResults = ({ cs }) => {
  if (!cs.results || !cs.results.length) return null;
  return (
    <section className="csd-results">
      <div className="container">
        <ul className="csd-results-grid">
          {cs.results.map((r, i) => (
            <li className="csd-result" key={i}>
              <span className="csd-figure">{r.figure}</span>
              <span className="csd-figure-label">{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Challenge / solution / outcomes. A single prose column capped at --measure so the lines stay
// readable; the headings are the section-title tier so they read as peers of the rest of the site.
const CaseStudyBody = ({ cs }) => {
  const blocks = [
    { h: 'The challenge', body: cs.challenge },
    { h: 'What Dalgo did', body: cs.solution },
    { h: 'Outcomes', body: cs.outcomes }
  ].filter((b) => b.body);
  if (!blocks.length) return null;
  return (
    <section className="csd-body">
      <div className="container">
        <div className="csd-prose">
          {blocks.map((b, i) => (
            <div className="csd-block" key={i}>
              <h2 className="csd-h">{b.h}</h2>
              <p>{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// The partner quote, in the site's one quote-card pattern.
// VERBATIM customer voice: never edited, paraphrased or completed. Banned-word rules govern
// Dalgo's own copy, never an attributed quote.
const CaseStudyQuote = ({ cs }) => {
  if (!cs.quote || !cs.quote.text) return null;
  const q = cs.quote;
  return (
    <section className="csd-quote-section">
      <div className="container">
        <div className="csd-quote-wrap">
          <article className="cvc-card">
            <div className="cvc-body">
              <div className="cvc-head">
                {cs.logo
                  ? <img className="cvc-logo" src={cs.logo} alt={cs.org} loading="lazy" decoding="async" />
                  : <span className="cvc-org-top">{cs.org}</span>}
                <span className="cvc-mark" aria-hidden="true">&ldquo;</span>
              </div>
              <blockquote className="cvc-quote">{'“' + q.text + '”'}</blockquote>
            </div>
            <footer className="cvc-attr">
              <span className="cvc-who">
                <span className="cvc-name">{q.name}</span>
                {/* No empty line when the source names no role — two of the five have none. */}
                {q.role ? <span className="cvc-desig">{q.role}</span> : null}
                <span className="cvc-orgname">{cs.org}</span>
              </span>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
};

// Closing CTA. Book Free Consultation is the case study call to action by decision in the PRD,
// not the trial — a reader who has just finished a partner's story is closer to a conversation
// than to a signup.
const CaseStudyCTA = () => (
  <section className="final-cta csd-cta">
    <div className="container">
      <div className="final-cta-inner">
        <h2 className="final-cta-h">See what this looks like for your data</h2>
        <p className="final-cta-sub">Talk to the team about your programmes, your tools, and where your data is getting stuck.</p>
        <div className="final-cta-actions">
          <a className="btn btn-primary" href={window.withUtm(window.SITE_CONFIG.CONSULT_FORM, 'case_study_cta')}
             target="_blank" rel={window.relForHref(window.SITE_CONFIG.CONSULT_FORM)} data-cta-location="case_study_cta">Book Free Consultation</a>
          <a className="btn btn-ghost" href="/case-studies" data-cta-location="case_study_all">All case studies</a>
        </div>
      </div>
    </div>
  </section>
);

// The page. `slug` comes from window.__caseStudySlug, stamped into each generated HTML file —
// the same mechanism Nav.jsx already uses with window.__currentPage, so one compiled entry file
// serves all twelve pages instead of twelve near-identical bundles.
const PageCaseStudy = () => {
  const slug = window.__caseStudySlug;
  const cs = window.caseStudyBySlug ? window.caseStudyBySlug(slug) : null;
  if (!cs) {
    // Only reachable if a page is generated for a slug that has since left the data file.
    return (
      <section className="cvh">
        <div className="cvh-grid cvh-grid-solo">
          <div className="cvh-copy">
            <h1 className="cvh-h">Case study not found</h1>
            <p className="cvh-sub">This story may have moved. <a href="/case-studies">Browse all case studies</a>.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <React.Fragment>
      {/* TEXT-ONLY hero, deliberately. The only artwork that exists per organisation is the
          promotional card used on the listing thumbnail, and it fails here three ways: its
          baked-in text repeats this H1 word for word, .cvh-figure img is object-fit:cover in
          BOTH variants so a 3:2 frame slices the card's own wording off at the edges, and the
          composition rule asks a hero for a product illustration or a photo of the people it
          describes — a promo card is neither. .cvh-grid-solo is the system's own text-only
          tier, so every case study still shares one hero height with the others in that tier. */}
      <SiteHero
        eyebrow={cs.sector + ' · Case study'}
        headline={<>{cs.org}: <span className="cvh-hl">{cs.title}</span></>}
        body={cs.summary}
      />
      <CaseStudyResults cs={cs} />
      <CaseStudyBody cs={cs} />
      <CaseStudyQuote cs={cs} />
      <CaseStudyCTA />
    </React.Fragment>
  );
};

window.CaseStudyResults = CaseStudyResults;
window.CaseStudyBody = CaseStudyBody;
window.CaseStudyQuote = CaseStudyQuote;
window.CaseStudyCTA = CaseStudyCTA;
window.PageCaseStudy = PageCaseStudy;
