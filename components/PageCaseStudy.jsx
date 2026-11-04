// ============================================================
// PageCaseStudy — the one template every /case-studies/<slug> page renders through.
//
// Section order is the master doc's, so a reader who has read one case study can scan the next
// without relearning the page: standfirst, at-a-glance facts, key results, the challenge, how
// we worked together, the transformation, what's next, Book a Free Consultation.
//
// NOTHING HERE IS BESPOKE WHERE SOMETHING EXISTED. The hero is SiteHero (the system hero, so a
// case study is the same height as every other page and switching tabs does not shift the
// fold), the quote card is the .cvc-card used on Consulting and the home testimonials, the
// closing band is .final-cta, and the tables follow .legal-table's idiom. New CSS covers the
// facts strip, the results band and the prose column, which had no equivalent.
//
// EVERY BLOCK IS OPTIONAL, because the five partners genuinely differ: Ummeed and Antarang have
// no quote in their approach section, Ummeed alone has a trailing paragraph after its challenge
// bullets, and the approach heading is "How we worked together" for three partners and "The
// fix" for two. A missing block is skipped rather than rendered empty.
// ============================================================

// At-a-glance facts. A definition list, not a table: these are label/value pairs about one
// subject, which is what <dl> is for, and it collapses to one column on narrow screens without
// the horizontal scroll a table would need.
const CaseStudyFacts = ({ cs }) => {
  if (!cs.facts || !cs.facts.length) return null;
  return (
    <section className="csd-facts">
      <div className="container">
        <dl className="csd-facts-grid">
          {cs.facts.map(function (f, i) {
            return (
              <div className="csd-fact" key={i}>
                <dt>{f[0]}</dt>
                <dd>{f[1]}</dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};

// Key results. The figures in this doc are not all numbers — "Problems fixed in time" and
// "Every team, one live view" are results too — so the figure is typeset to wrap rather than
// assuming a short numeral, and the grid sizes to the longest.
const CaseStudyResults = ({ cs }) => {
  if (!cs.results || !cs.results.length) return null;
  return (
    <section className="csd-results">
      <div className="container">
        <h2 className="csd-h csd-h-center">Key results</h2>
        <ul className="csd-results-grid">
          {cs.results.map(function (r, i) {
            return (
              <li className="csd-result" key={i}>
                <span className="csd-figure">{r.figure}</span>
                <span className="csd-figure-label">{r.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

// Verbatim customer voice: never edited, paraphrased or completed. Banned-word rules govern
// Dalgo's own copy, never an attributed quote.
const CaseStudyQuote = ({ quote, org, logo }) => {
  if (!quote || !quote.text) return null;
  return (
    <figure className="csd-quote">
      <span className="csd-quote-mark" aria-hidden="true">&ldquo;</span>
      <blockquote>{'“' + quote.text + '”'}</blockquote>
      <figcaption>
        <span className="csd-quote-name">{quote.name}</span>
        {quote.role ? <span className="csd-quote-role">{quote.role}{org ? ', ' + org : ''}</span> : (org ? <span className="csd-quote-role">{org}</span> : null)}
      </figcaption>
    </figure>
  );
};

const CaseStudyBullets = ({ items }) => {
  if (!items || !items.length) return null;
  return (
    <ul className="csd-bullets">
      {items.map(function (b, i) {
        return <li key={i}><strong>{b[0]}</strong> {b[1]}</li>;
      })}
    </ul>
  );
};

// The challenge and the approach share a shape: an optional lead paragraph, bullets, an
// optional trailing paragraph, an optional quote. One component, used twice.
const CaseStudyProseBlock = ({ heading, block, org }) => {
  if (!block) return null;
  return (
    <div className="csd-block">
      <h2 className="csd-h">{heading}</h2>
      {block.lead && <p className="csd-p">{block.lead}</p>}
      <CaseStudyBullets items={block.bullets} />
      {block.tail && <p className="csd-p">{block.tail}</p>}
      <CaseStudyQuote quote={block.quote} org={org} />
    </div>
  );
};

// Before / after, then who decides what with the data now. Two tables, because they answer two
// different questions and merging them would force a reader to hold both at once.
const CaseStudyTransformation = ({ cs }) => {
  const t = cs.transformation;
  if (!t) return null;
  return (
    <div className="csd-block">
      <h2 className="csd-h">The transformation</h2>
      {t.beforeAfter && t.beforeAfter.length > 0 && (
        <div className="csd-tablewrap">
          <table className="csd-table">
            <thead>
              <tr>
                <th scope="col"><span className="x-sr">Area</span></th>
                <th scope="col">Before Dalgo</th>
                <th scope="col">After Dalgo</th>
              </tr>
            </thead>
            <tbody>
              {t.beforeAfter.map(function (r, i) {
                return (
                  <tr key={i}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                    <td className="csd-after">{r[2]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {t.teams && t.teams.length > 0 && (
        <div className="csd-tablewrap csd-tablewrap-teams">
          <table className="csd-table">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">What it decides with the data now</th>
              </tr>
            </thead>
            <tbody>
              {t.teams.map(function (r, i) {
                return (
                  <tr key={i}>
                    <th scope="row">{r[0]}</th>
                    <td>{r[1]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <CaseStudyQuote quote={t.quote} org={cs.org} />
    </div>
  );
};

// Closing CTA. Book a Free Consultation is the case study call to action in the master doc —
// a reader who has just finished a partner's story is closer to a conversation than a signup.
const CaseStudyCTA = () => (
  <section className="final-cta csd-cta">
    <div className="container">
      <div className="final-cta-inner">
        <h2 className="final-cta-h">See what this looks like for your data</h2>
        <p className="final-cta-sub">Talk to the team about your programmes, your tools, and where your data is getting stuck.</p>
        <div className="final-cta-actions">
          <a className="btn btn-primary" href={window.withUtm(window.SITE_CONFIG.CONSULT_FORM, 'case_study_cta')}
             target="_blank" rel={window.relForHref(window.SITE_CONFIG.CONSULT_FORM)} data-cta-location="case_study_cta">Book a Free Consultation</a>
          <a className="btn btn-ghost" href="/case-studies" data-cta-location="case_study_all">All case studies</a>
        </div>
      </div>
    </div>
  </section>
);

// `slug` comes from window.__caseStudySlug, stamped into each generated HTML file — the same
// mechanism Nav.jsx uses with window.__currentPage, so one compiled entry serves every case
// study page instead of one near-identical bundle each.
const PageCaseStudy = () => {
  const slug = window.__caseStudySlug;
  const cs = window.caseStudyBySlug ? window.caseStudyBySlug(slug) : null;
  if (!cs) {
    return (
      <section className="cvh">
        <div className="cvh-grid cvh-grid-solo">
          <div className="cvh-copy">
            <h1 className="cvh-h1">Case study not found</h1>
            <p className="cvh-sub">This story may have moved. <a href="/case-studies">Browse all case studies</a>.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <React.Fragment>
      {/* TEXT-ONLY hero. The only artwork per partner is the promotional card used as the
          listing thumbnail, and it fails as a hero three ways: its baked-in text repeats this
          H1, .cvh-figure img is object-fit:cover in both variants so a 3:2 frame slices the
          card's own wording off at the edges, and the composition rule asks a hero for a
          product illustration or a photo of the people it describes — a promo card is neither.
          .cvh-grid-solo is the system's own text-only tier, so every case study still shares
          one hero height with the others in that tier. */}
      <SiteHero
        eyebrow={cs.sector + ' · Case study'}
        headline={<>Lessons from {cs.org}: <span className="cvh-hl">{cs.title}</span></>}
        body={cs.standfirst}
      />
      <CaseStudyFacts cs={cs} />
      <CaseStudyResults cs={cs} />
      <section className="csd-body">
        <div className="container">
          <div className="csd-prose">
            <CaseStudyProseBlock heading="The challenge" block={cs.challenge} org={cs.org} />
            <CaseStudyProseBlock heading={(cs.approach && cs.approach.heading) || 'How we worked together'} block={cs.approach} org={cs.org} />
            <CaseStudyTransformation cs={cs} />
            {cs.next && (
              <div className="csd-block">
                <h2 className="csd-h">What&rsquo;s next</h2>
                <p className="csd-p">{cs.next}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CaseStudyCTA />
    </React.Fragment>
  );
};

window.CaseStudyFacts = CaseStudyFacts;
window.CaseStudyResults = CaseStudyResults;
window.CaseStudyQuote = CaseStudyQuote;
window.CaseStudyTransformation = CaseStudyTransformation;
window.CaseStudyCTA = CaseStudyCTA;
window.PageCaseStudy = PageCaseStudy;
