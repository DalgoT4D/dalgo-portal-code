// Assessment — the quizzes shelf. One question per screen, a progress bar, then the same
// ResourceForm before the result (FLOW-BLUEPRINT 4.4). The email is asked AFTER the last
// question and BEFORE the score, which is the whole reason a quiz converts better than a
// download: the visitor has already spent the effort.
//
// THE TEMPLATE IS CONTENT-FREE. Questions, bands and gap recommendations all come from the
// resource's own entry in ResourcesData.jsx, so the December rewrite is a data edit and this
// file does not change. Scoring is a percentage of the maximum, so adding or removing a
// question needs no change to the bands.
//
// Keyboard: options are real radio inputs in a fieldset, so arrow keys move between them and
// the legend is announced. An earlier draft used buttons and lost both.

const Assessment = ({ resource }) => {
  const qs = resource.questions || [];
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [phase, setPhase] = React.useState('quiz');   // quiz → form → result
  const [lead, setLead] = React.useState(null);
  const liveRef = React.useRef(null);

  const started = React.useRef(false);
  const begin = function () {
    if (started.current) return;
    started.current = true;
    if (window.dalgoTrack) window.dalgoTrack('assessment_start', { asset_slug: resource.slug });
  };

  const choose = function (score) {
    begin();
    const next = answers.slice();
    next[i] = score;
    setAnswers(next);
    if (i + 1 < qs.length) setI(i + 1);
    else setPhase('form');
  };

  const max = qs.length * 3;
  const raw = answers.reduce(function (a, b) { return a + (b || 0); }, 0);
  const pct = max ? Math.round((raw / max) * 100) : 0;

  const band = (resource.bands || []).slice().reverse().find(function (b) { return pct >= b.min; })
    || (resource.bands || [])[0];

  // A gap is any question answered in the bottom half of the scale, in question order so the
  // list reads in the order the visitor met them. CAPPED AT FOUR: someone who answers
  // everything weakly has ten gaps, and ten instructions is a wall nobody acts on. The page
  // promises "the gaps worth closing first", so it shows the first four and means it.
  const GAP_LIMIT = 4;
  const gaps = (resource.gaps || [])
    .filter(function (g) { return (answers[g.q] || 0) <= 1; })
    .slice(0, GAP_LIMIT);

  if (phase === 'form') {
    return (
      <ResourceForm
        resource={resource}
        heading="See your result"
        submitLabel="Show my result"
        quiz={{ score: pct, band: band ? band.label : '' }}
        onDone={function (payload) {
          setLead(payload);
          setPhase('result');
          if (window.dalgoTrack) window.dalgoTrack('assessment_complete', { asset_slug: resource.slug, quiz_score: pct, quiz_band: band ? band.label : '' });
        }}
      />
    );
  }

  if (phase === 'result') {
    // DE-DUPLICATED, and never the assessment itself. Several gaps legitimately point at the
    // same guide — the first two questions are both Planning — so mapping gaps straight to
    // reads printed "Planning" twice. Gap order first, then related entries to top up to two.
    const seen = {};
    seen[resource.slug] = true;
    const show = [];
    gaps.map(function (g) { return g.read; })
      .concat(resource.related || [])
      .forEach(function (slug) {
        if (show.length >= 2 || seen[slug]) return;
        const found = window.resourceBySlug(slug);
        if (!found) return;
        seen[slug] = true;
        show.push(found);
      });
    return (
      <div className="asm asm-result">
        <div className="asm-score">
          <span className="asm-score-band">{band ? band.label : ''}</span>
          <span className="asm-score-pct">{pct}%</span>
        </div>
        <p className="asm-score-text">{band ? band.text : ''}</p>

        {gaps.length > 0 && (
          <div className="asm-gaps">
            <h3 className="asm-h3">Where to start</h3>
            <ul className="asm-gap-list">
              {gaps.map(function (g, n) { return <li key={n}>{g.text}</li>; })}
            </ul>
          </div>
        )}

        {show.length > 0 && (
          <div className="asm-reads">
            <h3 className="asm-h3">Read next</h3>
            <ul className="rsf-next-list">
              {show.map(function (x) {
                return (
                  <li key={x.slug}>
                    <a href={'/resources/' + x.slug}>
                      <span className="rsf-next-kind">{x.format}</span>
                      <span className="rsf-next-t">{x.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const q = qs[i];
  if (!q) return null;
  const pctDone = Math.round((i / qs.length) * 100);

  return (
    <div className="asm">
      <div className="asm-prog">
        <div className="asm-prog-bar">
          <div className="asm-prog-fill" style={{ width: pctDone + '%' }} />
        </div>
        {/* The count is the live region, not the bar: a bar announcing a percentage on every
            question is noise, while "Question 4 of 10" is the thing a screen reader needs. */}
        <p className="asm-prog-text" aria-live="polite" ref={liveRef}>Question {i + 1} of {qs.length}</p>
      </div>

      <fieldset className="asm-q">
        <legend className="asm-q-text">{q.q}</legend>
        {q.a.map(function (opt, n) {
          return (
            <label className="asm-opt" key={n}>
              <input type="radio" name={'q' + i} checked={answers[i] === n}
                     onChange={function () { choose(n); }} />
              <span>{opt}</span>
            </label>
          );
        })}
      </fieldset>

      {i > 0 && (
        <button type="button" className="asm-back" onClick={function () { setI(i - 1); }}>
          &larr; Previous question
        </button>
      )}
    </div>
  );
};

window.Assessment = Assessment;
