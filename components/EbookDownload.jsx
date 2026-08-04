// ===== E-book lead magnet — "Understanding the data lifecycle" (consulting + home) =====
// Inline three-state flow inside one band: intro CTA → form (name / email / org website /
// consent) → success + download. Field grammar reuses the contact form's .cf-field system.
// ⚑ CAPTURE-PENDING (Stuti, 4 Aug 2026): submissions are NOT stored anywhere yet — the form
// gates the download only. To wire lead capture later, create a Google Form and fill in
// `action` + the entry ids below (same pattern as CONTACT_FORM in PageContact.jsx); the
// submit handler already POSTs via fetch/no-cors whenever `action` is set.
const EBOOK = {
  pdf: 'assets/ebooks/dalgo-understanding-the-data-lifecycle.pdf',
  cover: 'assets/ebooks/ebook-cover.webp',
  action: null,
  // Distinct fail-loud placeholders — replace EVERY one when wiring the Google Form.
  fields: { name: 'entry.REPLACE_NAME', email: 'entry.REPLACE_EMAIL', org: 'entry.REPLACE_ORG', consent: 'entry.REPLACE_CONSENT' },
};
const EBOOK_STAGES = ['Planning', 'Collecting', 'Storing', 'Transforming', 'Visualising', 'Acting'];

const EbookDownload = () => {
  const [stage, setStage] = React.useState('intro'); // intro | form | done
  const [errs, setErrs] = React.useState({});
  const [busy, setBusy] = React.useState(false);

  const openForm = () => setStage('form');

  // Focus follows the stage AFTER React commits (a rAF fires too early with createRoot).
  React.useEffect(() => {
    const el = stage === 'form' ? document.getElementById('ebk-name')
      : stage === 'done' ? document.getElementById('ebk-done-h') : null;
    if (el) el.focus();
  }, [stage]);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid work email address.';
    if (!f.org.trim()) e.org = "Please add your organisation's website.";
    if (!f.consent) e.consent = 'Tick the consent box to get your copy.';
    return e;
  };

  const startDownload = () => {
    const a = document.createElement('a');
    a.href = EBOOK.pdf;
    a.setAttribute('download', '');
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const finish = () => {
    setStage('done');
    startDownload();
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (busy) return;
    const fd = new FormData(ev.target);
    const f = { name: fd.get('name') || '', email: fd.get('email') || '', org: fd.get('org') || '', consent: !!fd.get('consent') };
    const e = validate(f);
    setErrs(e);
    if (Object.keys(e).length) {
      const first = ['name', 'email', 'org', 'consent'].find((k) => e[k]);
      if (first) requestAnimationFrame(() => { const el = document.getElementById('ebk-' + first); if (el) el.focus(); });
      return;
    }
    if (!EBOOK.action) { finish(); return; }
    setBusy(true);
    const params = new URLSearchParams();
    params.append(EBOOK.fields.name, f.name);
    params.append(EBOOK.fields.email, f.email);
    params.append(EBOOK.fields.org, f.org);
    params.append(EBOOK.fields.consent, 'Yes');
    fetch(EBOOK.action, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() })
      .then(() => { setBusy(false); finish(); })
      .catch(() => { setBusy(false); finish(); }); // the reader still gets their copy
  };

  return (
    <section className="ebk-section" id="ebook">
      <div className="container">
        <div className="ebk-band">
          <div className="ebk-copy">
            <p className="pg-eyebrow">Free e-book</p>
            <h2 className="section-title ebk-title">Understanding the <span className="hl-underline">data lifecycle</span></h2>
            <p className="ebk-sub">The journey your data takes from the moment it's collected to the moment it changes a decision — a practical guide for NGOs, written for the M&amp;E lead who dreads report season and the director who wants numbers they can trust.</p>
            <ul className="ebk-stages" aria-label="The six stages the guide covers">
              {EBOOK_STAGES.map((s, i) => (
                <li className="ebk-stage" key={s}><span className="ebk-stage-n" aria-hidden="true">{i + 1}</span>{s}</li>
              ))}
            </ul>
            <p className="ebk-meta">37 pages · A checklist for every stage · A Dalgo publication</p>

            {stage === 'intro' && (
              <button type="button" className="cmh-btn cmh-btn-primary" onClick={openForm}>
                Get the free e-book
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </button>
            )}

            {stage === 'form' && (
              <form className="ebk-form" id="ebk-form-panel" onSubmit={onSubmit} noValidate>
                <h3 className="ebk-form-h">Get your copy</h3>
                <div className="cf-field">
                  <label htmlFor="ebk-name">Name</label>
                  <input id="ebk-name" name="name" type="text" autoComplete="name" aria-invalid={errs.name ? 'true' : undefined} aria-describedby={errs.name ? 'ebk-name-err' : undefined} />
                  {errs.name && <span className="cf-err" id="ebk-name-err">{errs.name}</span>}
                </div>
                <div className="cf-field">
                  <label htmlFor="ebk-email">Work email</label>
                  <input id="ebk-email" name="email" type="email" autoComplete="email" aria-invalid={errs.email ? 'true' : undefined} aria-describedby={errs.email ? 'ebk-email-err' : undefined} />
                  {errs.email && <span className="cf-err" id="ebk-email-err">{errs.email}</span>}
                </div>
                <div className="cf-field">
                  <label htmlFor="ebk-org">Organisation website</label>
                  <input id="ebk-org" name="org" type="text" inputMode="url" autoComplete="url" placeholder="yourngo.org" aria-invalid={errs.org ? 'true' : undefined} aria-describedby={errs.org ? 'ebk-org-err' : undefined} />
                  {errs.org && <span className="cf-err" id="ebk-org-err">{errs.org}</span>}
                </div>
                <div className="cf-field">
                  <label className="ebk-consent">
                    <input id="ebk-consent" name="consent" type="checkbox" aria-invalid={errs.consent ? 'true' : undefined} aria-describedby={errs.consent ? 'ebk-consent-err' : undefined} />
                    <span>I consent to receiving emails from Dalgo.</span>
                  </label>
                  {errs.consent && <span className="cf-err" id="ebk-consent-err">{errs.consent}</span>}
                </div>
                <button type="submit" className="cmh-btn cmh-btn-primary ebk-submit" disabled={busy}>
                  {busy ? 'Preparing your copy…' : 'Download now'}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" /></svg>
                </button>
                <p className="ebk-privacy">These details unlock your download — see our <a href="privacy.html">privacy policy</a>.</p>
              </form>
            )}

            {stage === 'done' && (
              <div className="ebk-done" role="status">
                <h3 className="ebk-done-h" id="ebk-done-h" tabIndex={-1}>Your copy is ready.</h3>
                <p className="ebk-done-p">The download has started — if it didn't, the button below has you covered.</p>
                <a className="cmh-btn cmh-btn-primary" href={EBOOK.pdf} download>
                  Download the e-book
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" /></svg>
                </a>
                <p className="ebk-size">PDF · 17&nbsp;MB</p>
              </div>
            )}
          </div>
          <div className="ebk-cover-panel">
            <img className="ebk-cover" src={EBOOK.cover} alt="Cover of the e-book: Understanding the data lifecycle — a practical guide for NGOs" width="1131" height="1600" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
};
window.EbookDownload = EbookDownload;
