// PageResource — the one template every /resources/<slug> page renders through, for both
// shelves. An ebook shows cover, what you'll learn and the form; a quiz shows the same header
// and then the assessment in place of the form. The shelf decides, not the page.
//
// `slug` comes from window.__resourceSlug, stamped into each generated HTML file — the same
// mechanism Nav.jsx uses with window.__currentPage and gen-case-studies.mjs uses for case
// studies, so one compiled entry serves every resource page.

const ResourceBreadcrumb = ({ r }) => (
  <nav className="rsd-crumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/resources">Resources</a></li>
      <li><a href={'/resources?shelf=' + r.shelf}>{r.shelf === 'quiz' ? 'Quizzes' : 'Ebooks'}</a></li>
      <li aria-current="page">{r.title}</li>
    </ol>
  </nav>
);

const PageResource = () => {
  const slug = window.__resourceSlug;
  const r = window.resourceBySlug ? window.resourceBySlug(slug) : null;

  React.useEffect(function () {
    if (!r) return;
    if (window.captureLeadSource) window.captureLeadSource();
    if (window.dalgoTrack) window.dalgoTrack('resource_view', { asset_slug: r.slug, asset_title: r.title, shelf: r.shelf });
  }, []);

  if (!r) {
    return (
      <section className="cvh">
        <div className="cvh-grid cvh-grid-solo">
          <div className="cvh-copy">
            <h1 className="cvh-h1">Resource not found</h1>
            <p className="cvh-sub">This guide may have moved. <a href="/resources">Browse the library</a>.</p>
          </div>
        </div>
      </section>
    );
  }

  const isQuiz = r.shelf === 'quiz';

  return (
    <div className="rsd-page">
      <section className="pg-section rsd-top">
        <div className="container">
          <ResourceBreadcrumb r={r} />

          {/* Two columns on desktop, one on mobile, with the form BELOW the content on small
              screens — the brief's rule, and the reason the form is a sibling of the copy
              rather than nested inside it. */}
          <div className="rsd-grid">
            <div className="rsd-main">
              <div className="rsd-head">
                <figure className="rsd-cover">
                  <img src={r.cover} alt={'Cover of ' + r.title} loading="eager" decoding="async" />
                </figure>
                <div className="rsd-head-copy">
                  <div className="rsd-tags">
                    <span className="rsl-tag">{r.format}</span>
                    {r.draft && <span className="rsl-tag rsl-tag-draft">Draft</span>}
                  </div>
                  <h1 className="rsd-h1">{r.title}</h1>
                  <p className="rsd-meta">{window.resourceMetaLine(r)} · {r.track}</p>
                  <p className="rsd-sum">{r.summary}</p>
                </div>
              </div>

              {r.draft && (
                <p className="rsd-draft" role="note">
                  Draft content. These questions are placeholders while the assessment is written;
                  the scored version arrives in December.
                </p>
              )}

              <h2 className="rsd-h2">What you&rsquo;ll learn</h2>
              <ul className="rsd-learn">
                {(r.learn || []).map(function (l, i) { return <li key={i}>{l}</li>; })}
              </ul>

              <h2 className="rsd-h2">Who it&rsquo;s for</h2>
              <p className="rsd-for">{r.forWho}</p>
            </div>

            <aside className="rsd-side">
              {isQuiz
                ? <Assessment resource={r} />
                : <ResourceForm resource={r} heading="Download the guide" submitLabel="Download" />}
            </aside>
          </div>
        </div>
      </section>

      <RelatedResources r={r} />
    </div>
  );
};

const RelatedResources = ({ r }) => {
  const related = (r.related || [])
    .map(function (s) { return window.resourceBySlug(s); })
    .filter(Boolean).slice(0, 3);
  if (!related.length) return null;
  return (
    <section className="pg-section alt rsd-related">
      <div className="container">
        <h2 className="section-title rsd-related-h">Related <span className="hl-underline">reads</span></h2>
        <div className="si-grid rsl-grid">
          {related.map(function (x) { return <ResourceCard key={x.slug} r={x} />; })}
        </div>
      </div>
    </section>
  );
};

window.ResourceBreadcrumb = ResourceBreadcrumb;
window.RelatedResources = RelatedResources;
window.PageResource = PageResource;
