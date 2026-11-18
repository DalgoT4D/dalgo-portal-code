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
        {/* THE ATTRIBUTION IS THE DOC'S, VERBATIM. Nothing is appended: the master doc
            writes each one in full and names the organisation itself where it wants it
            named ("Anup, CEO of SHRI"), and where it does not, it does not. Appending
            the org produced "Anup, CEO, SHRI" and "Arun, a senior manager, STiR
            Education" against the doc's "a senior manager at STiR Education". */}
        {quote.role ? <span className="csd-quote-role">{quote.role}</span> : null}
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
      {/* `lead` is one paragraph or several: the master doc opens 1000 Days Fund's challenge
          with two, and joining them into one ran a scene-setting paragraph straight into the
          one about where the data actually lived. */}
      {block.lead && (Array.isArray(block.lead) ? block.lead : [block.lead]).map(function (para, i) {
        return <p className="csd-p" key={i}>{para}</p>;
      })}
      {/* SHRI's challenge sets its quote directly under the lead, above the bullets, because
          the quote states the problem the bullets then break down. Every other block closes
          on its quote, so the flag is absent there and it renders last as before. */}
      {block.quoteFirst && <CaseStudyQuote quote={block.quote} org={org} />}
      <CaseStudyBullets items={block.bullets} />
      {block.image && (
        <figure className="csd-figure-inline">
          <img src={block.image.src} alt={block.image.alt} width="1600" height="900" loading="lazy" decoding="async" />
        </figure>
      )}
      {block.tail && <p className="csd-p">{block.tail}</p>}
      {!block.quoteFirst && <CaseStudyQuote quote={block.quote} org={org} />}
    </div>
  );
};

// The transformation is PROSE, not tables. The master doc rewrote this section on 5 Nov:
// a lead sentence, then one bold-led paragraph per team, an optional closing paragraph, and
// a quote. These are paragraphs rather than a <ul> because that is the shape the doc sets —
// the challenge and the approach are genuine bulleted lists and keep their own markup.
//
// SHOFCO alone puts its quote mid-section, directly under the Leadership paragraph it
// belongs to, which is what `quoteAfter` carries. Everyone else closes on the quote, so the
// field is absent and it renders last. Built as an array rather than a Fragment because
// nothing else in this bundle reaches for React.Fragment.
const CaseStudyTransformation = ({ cs }) => {
  const t = cs.transformation;
  if (!t) return null;
  const at = typeof t.quoteAfter === 'number' ? t.quoteAfter : -1;
  const body = [];
  (t.items || []).forEach(function (it, i) {
    body.push(<p className="csd-p" key={'p' + i}><strong>{it[0]}</strong> {it[1]}</p>);
    if (i === at) body.push(<CaseStudyQuote key={'q' + i} quote={t.quote} org={cs.org} />);
  });
  return (
    <div className="csd-block">
      <h2 className="csd-h">The transformation</h2>
      {t.lead && <p className="csd-p">{t.lead}</p>}
      {body}
      {t.tail && <p className="csd-p">{t.tail}</p>}
      {at < 0 ? <CaseStudyQuote quote={t.quote} org={cs.org} /> : null}
    </div>
  );
};

// ---------------------------------------------------------------------------------------
// DOC LAYOUT (`docLayout: true`). The master doc gives every partner FOUR sections, and the
// first one is the partnership: the arc image, the bullets, the Result/What-changed table and
// a sentence about the organisation, all together, above the challenge.
//
// The six-block template this sits beside does something different — it lifts the table out
// into a "Key results" band and the organisation sentence into a four-cell facts grid, both
// ABOVE the challenge, and leaves the bullets below it under "How we worked together". That
// reorders the doc rather than rendering it. This component renders the doc as written.
//
// ONE ORDER FOR ALL EIGHT (Stuti, 18 Nov): heading, who the organisation is, how we started,
// the arc, the bullets, the quote, the table.
//
// The master doc puts the organisation sentence LAST, under the result table, and the site
// followed it there — which left the section opening on a different element for each partner
// and the reader meeting "who is this" only after the numbers. It now sits directly under the
// partnership headline on every page, which is the one deliberate departure from the doc's
// own order; Stuti is folding it back into the doc.
//
// Everything below the heading is optional and partners genuinely differ: SHRI has no
// organisation sentence at all, four have no lead, and three carry a quote in this section.
// A missing piece is skipped, and the order of whatever remains never changes.
const CaseStudyPartnership = ({ cs }) => {
  const a = cs.approach || {};
  // ONE HEADING ON EVERY PAGE (Stuti, 18 Nov): this section is the summary of the case study,
  // so it is named for what it is rather than for the partnership. Title case at Stuti's
  // request — it is the one heading on the page that labels a summary rather than naming a
  // chapter, and the capitals mark it apart from "The challenge" and the rest.
  const heading = cs.partnershipHeading || 'Key Highlights';
  return (
    <div className="csd-block">
      <h2 className="csd-h">{heading}</h2>
      {cs.about && <p className="csd-p csd-about">{cs.about}</p>}
      {a.lead && (Array.isArray(a.lead) ? a.lead : [a.lead]).map(function (para, i) {
        return <p className="csd-p" key={i}>{para}</p>;
      })}
      {cs.approachImg && (
        <figure className="csd-figure-inline">
          <img src={cs.approachImg.src} alt={cs.approachImg.alt} width="1600" height="900" loading="eager" decoding="async" />
        </figure>
      )}
      <CaseStudyBullets items={a.bullets} />
      {a.quote && <CaseStudyQuote quote={a.quote} org={cs.org} />}
      <CaseStudyResultTable cs={cs} />
    </div>
  );
};

// The doc's results are a two-column table with a "Result | What changed" header row, not a
// band of stat cards. Rendered as a real <table> on .legal-table's idiom, which is the house
// table style, with the wrapper carrying the scroll so a long "What changed" cell cannot push
// the page sideways on a phone.
const CaseStudyResultTable = ({ cs }) => {
  if (!cs.results || !cs.results.length) return null;
  return (
    <div className="csd-rtablewrap">
      <table className="csd-rtable">
        <thead>
          <tr><th scope="col">Result</th><th scope="col">What changed</th></tr>
        </thead>
        <tbody>
          {cs.results.map(function (r, i) {
            return (
              <tr key={i}>
                <th scope="row">{r.figure}</th>
                <td>{r.label}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Closing CTA, in the master doc's own words (Stuti, 18 Nov). Every one of the eight tabs ends
// on the same line — "Are you facing a similar challenge in your organisation's data journey?
// Book a Free Consultation." — so the question is the heading and the sentence is the button,
// which is what it already said. The previous heading and sub-line were this template's
// invention, not the doc's, and the doc has no second sentence here, so there is no sub-line.
//
// ONE BUTTON ONLY. "All case studies" was removed on 18 Nov (Stuti): the doc's call to action
// is a single question and a single button, and nothing that is not in the doc belongs here.
const CaseStudyCTA = () => (
  <section className="final-cta csd-cta">
    <div className="container">
      <div className="final-cta-inner">
        <h2 className="final-cta-h">Are you facing a similar challenge in your organisation&rsquo;s data journey?</h2>
        <div className="final-cta-actions">
          <a className="btn btn-primary" href={window.withUtm(window.SITE_CONFIG.CONSULT_FORM, 'case_study_cta')}
             target="_blank" rel={window.relForHref(window.SITE_CONFIG.CONSULT_FORM)} data-cta-location="case_study_cta">Book a Free Consultation</a>
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
    <div className="csd-page">
      {/* THE HEADLINE IS THE PARTNER NAME PLUS THE STORY'S OWN TITLE, nothing more. It used to
          carry a "Lessons from " prefix, which was this template's invention rather than the
          master doc's words, and it cost a full 50px headline line on four of the five pages —
          pushing every hero past --hero-h. The doc's title is the title; the prefix was padding.

          The accent is the partner name, not the whole title. .cvh-hl is white-space:nowrap
          above 1024px, so a title-length span could not break and ran under the hero figure,
          clipping at the viewport edge; and the system allows one teal accent per heading,
          which a whole sentence in teal is not.

          The image is the partner's own 1200x630 case study card. The frame stays the system's
          3:2 — see the .csd-page .cvh-figure rule in app.css for why it is held rather than
          reshaped — and the card sits inside it on a --surface-1 ground via object-fit:contain,
          because cropping to 3:2 slices the Dalgo | Partner lockup off one side. */}
      <SiteHero
        eyebrow={cs.sector + ' · Case study'}
        headline={cs.headline
          ? <>{cs.headline.pre}<span className="cvh-hl">{cs.headline.hl}</span>{cs.headline.post}</>
          : <><span className="cvh-hl">{cs.org}</span>: {cs.title}</>}
        body={cs.standfirst}
        image={cs.hero ? { src: cs.hero.src, alt: cs.hero.alt, kind: cs.hero.kind || 'photo' } : undefined}
      />
      {!cs.docLayout && <CaseStudyFacts cs={cs} />}
      {!cs.docLayout && <CaseStudyResults cs={cs} />}
      <section className={'csd-body' + (cs.docLayout ? ' csd-body-doc' : '')}>
        <div className="container">
          <div className="csd-prose">
            {cs.docLayout && <CaseStudyPartnership cs={cs} />}
            {/* The rule closes the summary. Everything above it is the case study at a glance;
                everything below is the story in full. Without it the two read as one list of
                sections and the summary stops being legible as a summary. */}
            {cs.docLayout && <hr className="csd-divider" />}
            <CaseStudyProseBlock heading="The challenge" block={cs.challenge} org={cs.org} />
            {!cs.docLayout && (
              <CaseStudyProseBlock
                heading={(cs.approach && cs.approach.heading) || 'How we worked together'}
                block={cs.approach ? Object.assign({}, cs.approach, { image: cs.approachImg }) : null}
                org={cs.org} />
            )}
            <CaseStudyTransformation cs={cs} />
            {/* "What's next" for a live engagement. STiR's closed, so its master-doc section
                is "What it showed" and looks back rather than forward; `nextHeading` carries
                that. */}
            {cs.next && (
              <div className="csd-block">
                <h2 className="csd-h">{cs.nextHeading || 'What’s next'}</h2>
                <p className="csd-p">{cs.next}</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <CaseStudyCTA />
    </div>
  );
};

window.CaseStudyPartnership = CaseStudyPartnership;
window.CaseStudyResultTable = CaseStudyResultTable;
window.CaseStudyFacts = CaseStudyFacts;
window.CaseStudyResults = CaseStudyResults;
window.CaseStudyQuote = CaseStudyQuote;
window.CaseStudyTransformation = CaseStudyTransformation;
window.CaseStudyCTA = CaseStudyCTA;
window.PageCaseStudy = PageCaseStudy;
