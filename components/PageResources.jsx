// The resource library at /resources — the Education Hub's front door.
//
// Structure is the brief's wireframe, in order: hero with a search field, filter chips, one
// featured resource, the card grid, newsletter band. Nothing here invents a layout: the hero
// is SiteHero, the cards are the system's .si-card plate, and the band reuses .final-cta's
// shape. Where a named component existed it is used.
//
// FILTERING IS CLIENT-SIDE and intentionally dumb: the whole library is a handful of entries,
// so it filters an array in memory rather than reaching for a route or a request. Search
// matches title, summary and format, because a visitor typing "template" or "quiz" means the
// format, and one typing "storing" means the stage.

// ---- Card -----------------------------------------------------------------------------
// The cover is shown AS IT IS, never cropped: the brochure covers already follow the Dalgo
// Lead Magnet Design System and the brief says not to restyle them. They are A4 portrait, so
// the thumb holds the portrait ratio and sits the cover on the tint rather than cover-cropping
// it to a landscape box, which would slice the stage pill off the top.
const ResourceCard = ({ r }) => (
  <a className="si-card rsl-card" href={'/resources/' + r.slug} data-cta-location="resource_card">
    <span className="rsl-thumb">
      <img src={r.cover} alt="" loading="lazy" decoding="async" />
    </span>
    <span className="rsl-body">
      <span className="rsl-tags">
        <span className="rsl-tag">{r.format}</span>
        {r.draft && <span className="rsl-tag rsl-tag-draft">Draft</span>}
      </span>
      <span className="rsl-title">{r.title}</span>
      <span className="rsl-sum">{r.summary}</span>
      <span className="rsl-meta">{window.resourceMetaLine(r)}</span>
    </span>
  </a>
);

// ---- Featured -------------------------------------------------------------------------
// One, set by marketing through `featured: true` in the data file. If more than one entry
// carries the flag the first wins, so the page can never grow a second featured slot.
const FeaturedResource = ({ r }) => (
  <a className="rsl-feat" href={'/resources/' + r.slug} data-cta-location="resource_featured">
    <span className="rsl-feat-thumb">
      <img src={r.cover} alt="" loading="eager" decoding="async" />
    </span>
    <span className="rsl-feat-body">
      <span className="rsl-feat-kicker">Featured</span>
      <span className="rsl-feat-title">{r.title}</span>
      <span className="rsl-feat-sum">{r.summary}</span>
      <span className="rsl-feat-meta">{window.resourceMetaLine(r)}</span>
      <span className="si-readmore">Get the guide
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </span>
    </span>
  </a>
);

// ---- Library --------------------------------------------------------------------------
const ResourceLibrary = () => {
  const all = window.RESOURCES || [];
  const [chip, setChip] = React.useState('all');

  const stages = window.resourceStagesInUse();
  const featured = all.find(function (r) { return r.featured; });

  const matches = all.filter(function (r) {
    if (chip !== 'all') {
      const isShelf = chip === 'ebook' || chip === 'quiz';
      if (isShelf ? r.shelf !== chip : (r.stage || []).indexOf(chip) < 0) return false;
    }
    return true;
  });

  // The featured card repeats the first grid card when no filter is on, so it is pulled out of
  // the grid in that one case rather than printed twice.
  const unfiltered = chip === 'all';
  const grid = unfiltered && featured ? matches.filter(function (r) { return r.slug !== featured.slug; }) : matches;

  const chips = (window.RESOURCE_SHELVES || []).concat(stages.map(function (s) { return { id: s, label: s }; }));

  return (
    <React.Fragment>
      <SiteHero
        eyebrow="Resource library"
        headline={<>Practical data guides for <span className="cvh-hl">nonprofits</span></>}
        body="Short, plain guides and self assessments on planning, collecting and using programme data. Free to download."
        /* Authored at 1440x960 with the mint ground baked in, which is what kind:'illustration'
           expects — the frame then adds no background of its own. The subject is the six
           lifecycle stages resolving into one guide, so the hero and the brochure covers in the
           grid below speak the same language. */
        image={{ src: 'assets/hero/resources.webp',
                 alt: 'The six stages of the data lifecycle leading to a downloadable Dalgo guide',
                 kind: 'illustration' }}
      />

      <section className="pg-section rsl-section">
        <div className="container">
          <div className="rsl-chips" role="group" aria-label="Filter resources">
            {chips.map(function (c) {
              const on = chip === c.id;
              return (
                <button key={c.id} type="button"
                        className={'rsl-chip' + (on ? ' is-on' : '')}
                        aria-pressed={on}
                        onClick={function () { setChip(c.id); }}>{c.label}</button>
              );
            })}
          </div>

          {unfiltered && featured && <FeaturedResource r={featured} />}

          {grid.length > 0 ? (
            <div className="si-grid rsl-grid">
              {grid.map(function (r) { return <ResourceCard key={r.slug} r={r} />; })}
            </div>
          ) : (
            <p className="rsl-empty">Nothing matches that yet. Try another stage, or clear the search.</p>
          )}

          {/* Back to the live side of the hub. One line rather than a second band: the
              newsletter band below is the hub's primary call to action and two bands
              competing at the foot of the page would blunt it. */}
          <p className="rsl-live">
            Prefer a live session? <a href="/community">Browse upcoming webinars and recordings</a>.
          </p>
        </div>
      </section>

      <NewsletterBand />
    </React.Fragment>
  );
};

// ---- Newsletter band -------------------------------------------------------------------
// The hub's primary call to action, so it closes the library. Same submit path as the pop-up;
// both go through subscribeNewsletter() so there is one place that knows where an address goes.
const NewsletterBand = () => {
  const [done, setDone] = React.useState(false);
  const submit = function (e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return;
    window.subscribeNewsletter(email, 'library_band');
    setDone(true);
  };
  return (
    <section className="final-cta rsl-news">
      <div className="container">
        <div className="final-cta-inner">
          <h2 className="final-cta-h">One practical data read a month</h2>
          <p className="final-cta-sub">What we are learning with nonprofit teams, and the guides we publish next. No more than one email a month.</p>
          {done ? (
            <p className="rsl-news-done" role="status">Thanks — you&rsquo;re on the list.</p>
          ) : (
            <form className="rsl-news-form" onSubmit={submit}>
              <label className="x-sr-only" htmlFor="rsl-news-email">Work email</label>
              <input id="rsl-news-email" name="email" type="email" required placeholder="Work email" />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

window.ResourceCard = ResourceCard;
window.FeaturedResource = FeaturedResource;
window.ResourceLibrary = ResourceLibrary;
window.NewsletterBand = NewsletterBand;
