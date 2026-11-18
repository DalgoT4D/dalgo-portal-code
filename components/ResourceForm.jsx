// ResourceForm — the one gate in front of every download and every assessment result.
//
// It is the SAME COMPONENT in both places by design (FLOW-BLUEPRINT 4.2 and 4.4): a resource
// page renders it beside the content, an assessment renders it after the last question. One
// form means one set of fields, one validation rule and one Sheet schema.
//
// THE FIELD LIST IS CLOSED. Seven visible fields and no CAPTCHA, because the teardowns in the
// brief measured both long forms and CAPTCHAs costing completions. Spam is caught by a
// honeypot the eye never sees and a screen reader is told to skip.
//
// DPDP: downloading never subscribes anyone. The newsletter box is separate, unticked, and
// its value is carried as its own column — the consent line under the button says exactly what
// the email address will be used for.
//
// On success the form does not navigate. It swaps itself for the thank-you state at the same
// URL, which is what the wireframe shows and what keeps the GA4 funnel on one page.

// UTM and referrer are captured ON LANDING, not at submit: a visitor who arrives on a campaign
// link and then clicks through to a second resource must still carry the campaign that brought
// them. sessionStorage holds it for the visit; the form reads it when it posts.
const LEAD_SOURCE_KEY = 'dalgo_lead_source';

function captureLeadSource() {
  try {
    if (sessionStorage.getItem(LEAD_SOURCE_KEY)) return;
    const p = new URLSearchParams(window.location.search);
    const src = {
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
      referrer: document.referrer || '',
      landing_page: window.location.pathname + window.location.search
    };
    sessionStorage.setItem(LEAD_SOURCE_KEY, JSON.stringify(src));
  } catch (e) { /* private mode: the lead still posts, just without a source */ }
}

function readLeadSource() {
  try { return JSON.parse(sessionStorage.getItem(LEAD_SOURCE_KEY) || '{}'); } catch (e) { return {}; }
}

const ROLES = ['Executive Director', 'Programme lead', 'M&E lead', 'Data or IT', 'Funder', 'Other'];

// India first, then the three East African markets the hub is written for, then the rest A–Z.
// The order is the brief's, and it is deliberate: it puts the two audiences the content names
// at the top of the list instead of making them scroll past Afghanistan.
const COUNTRIES = ['India', 'Kenya', 'Uganda', 'Tanzania'].concat([
  'Australia', 'Bangladesh', 'Brazil', 'Canada', 'Ethiopia', 'France', 'Germany', 'Ghana',
  'Indonesia', 'Ireland', 'Malawi', 'Mexico', 'Nepal', 'Netherlands', 'Nigeria', 'Pakistan',
  'Philippines', 'Rwanda', 'Singapore', 'South Africa', 'Sri Lanka', 'Sweden', 'Switzerland',
  'United Arab Emirates', 'United Kingdom', 'United States', 'Zambia', 'Zimbabwe', 'Other'
]);

const ResourceForm = ({ resource, heading, submitLabel, onDone, quiz }) => {
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');
  const [started, setStarted] = React.useState(false);
  const [lead, setLead] = React.useState(null);

  React.useEffect(captureLeadSource, []);

  // resource_form_start fires once, on the first keystroke or change — not on render, which
  // would count everyone who merely scrolled past the form.
  const markStart = () => {
    if (started) return;
    setStarted(true);
    if (window.dalgoTrack) window.dalgoTrack('resource_form_start', { asset_slug: resource.slug, shelf: resource.shelf });
  };

  const submit = (e) => {
    e.preventDefault();
    const f = e.target;
    if (f.company_website.value) return;            // honeypot filled ⇒ silently drop
    setBusy(true); setError('');

    const src = readLeadSource();
    const payload = {
      name: f.name.value.trim(),
      email: f.email.value.trim(),
      organisation: f.organisation.value.trim(),
      role: f.role.value,
      country: f.country.value,
      interest_yes: f.interest.checked,
      newsletter_yes: f.newsletter.checked,
      asset_slug: resource.slug,
      asset_title: resource.title,
      shelf: resource.shelf,
      utm_source: src.utm_source || '',
      utm_medium: src.utm_medium || '',
      utm_campaign: src.utm_campaign || '',
      referrer: src.referrer || '',
      landing_page: src.landing_page || '',
      submitted_at: new Date().toISOString(),
      quiz_score: quiz ? quiz.score : '',
      quiz_band: quiz ? quiz.band : ''
    };

    const finish = () => {
      setBusy(false);
      setSent(true);
      setLead(payload);
      if (window.dalgoTrack) {
        window.dalgoTrack('resource_download', { asset_slug: resource.slug, asset_title: resource.title, shelf: resource.shelf });
        if (payload.interest_yes) window.dalgoTrack('interest_yes', { asset_slug: resource.slug });
        if (payload.newsletter_yes) window.dalgoTrack('newsletter_subscribe', { source: 'resource_form' });
      }
      // The pop-up must never appear over a thank-you state (FLOW-BLUEPRINT 4.5).
      try { localStorage.setItem('dalgo_np_suppress', '1'); } catch (err) {}
      if (onDone) onDone(payload);
    };

    const endpoint = window.SITE_CONFIG && window.SITE_CONFIG.LEADS_ENDPOINT;
    if (!endpoint) {
      // ⚑ No endpoint yet. The visitor still gets the file — withholding it because our Sheet
      // is not wired would be the worst of both outcomes. The row is logged for whoever opens
      // the console; see integrations/education-hub-leads.gs for the receiving end.
      console.info('[dalgo] LEADS_ENDPOINT is empty — lead not recorded:', payload);
      finish();
      return;
    }
    // no-cors: an Apps Script web app cannot send CORS headers, so the response is opaque and
    // success is "the request left the browser". The visitor's file does not depend on it.
    fetch(endpoint, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },  // avoids the CORS preflight
      body: JSON.stringify(payload)
    }).then(finish).catch(function () { finish(); });
  };

  if (sent) return <ResourceThanks resource={resource} lead={lead} quiz={quiz} />;

  return (
    <form className="rsf" onSubmit={submit} onChange={markStart} onInput={markStart} noValidate={false}>
      <h2 className="rsf-h">{heading || 'Download the guide'}</h2>

      <div className="cf-field">
        <label htmlFor="rsf-name">Name</label>
        <input id="rsf-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="cf-field">
        <label htmlFor="rsf-email">Work email</label>
        <input id="rsf-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="cf-field">
        <label htmlFor="rsf-org">Organisation</label>
        <input id="rsf-org" name="organisation" type="text" required autoComplete="organization" />
      </div>
      <div className="cf-field">
        <label htmlFor="rsf-role">Role</label>
        <select id="rsf-role" name="role" required defaultValue="">
          <option value="" disabled>Select your role</option>
          {ROLES.map(function (r) { return <option key={r} value={r}>{r}</option>; })}
        </select>
      </div>
      <div className="cf-field">
        <label htmlFor="rsf-country">Country</label>
        <select id="rsf-country" name="country" required defaultValue="">
          <option value="" disabled>Select your country</option>
          {COUNTRIES.map(function (c) { return <option key={c} value={c}>{c}</option>; })}
        </select>
      </div>

      {/* Honeypot. Off-screen rather than display:none, which some bots now detect, and
          aria-hidden + tabIndex so it is unreachable by keyboard and silent to a reader. */}
      <div className="rsf-hp" aria-hidden="true">
        <label htmlFor="rsf-cw">Company website</label>
        <input id="rsf-cw" name="company_website" type="text" tabIndex="-1" autoComplete="off" />
      </div>

      <label className="rsf-check">
        <input name="interest" type="checkbox" />
        <span>Are you interested in learning about Dalgo&rsquo;s consulting / platform offerings?</span>
      </label>
      <label className="rsf-check">
        <input name="newsletter" type="checkbox" />
        <span>Send me the monthly newsletter</span>
      </label>

      {error && <p className="rsf-error" role="alert">{error}</p>}

      <button className="btn btn-primary rsf-submit" type="submit" disabled={busy}>
        {busy ? 'Sending…' : (submitLabel || 'Download')}
      </button>
      <p className="rsf-consent">
        We&rsquo;ll email you this resource and a few related ones. Unsubscribe any time.{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
};

// The thank-you state. Same URL, the form swapped out — not a separate page, so the funnel
// stays on one URL and a refresh does not re-fire the download.
const ResourceThanks = ({ resource, lead, quiz }) => {
  const first = ((lead && lead.name) || '').trim().split(/\s+/)[0] || 'there';
  const fileHref = resource.file;

  // The file starts on its own, once. A second render must not trigger another download, so
  // the effect has an empty dependency list and the button below is the only way to repeat it.
  React.useEffect(function () {
    if (!fileHref) return;
    const a = document.createElement('a');
    a.href = fileHref; a.download = ''; a.rel = 'noopener';
    document.body.appendChild(a); a.click(); a.remove();
  }, []);

  const related = (resource.related || [])
    .map(function (s) { return window.resourceBySlug(s); })
    .filter(Boolean).slice(0, 3);

  return (
    <div className="rsf rsf-thanks">
      <h2 className="rsf-h rsf-thanks-h">Thanks, {first}.</h2>
      {quiz
        ? <p className="rsf-thanks-p">Your result is below. A copy is on its way to your inbox.</p>
        : <p className="rsf-thanks-p">Your guide is downloading. A copy is on its way to your inbox.</p>}

      {fileHref && (
        <a className="btn btn-primary rsf-again" href={fileHref} download
           data-cta-location="resource_download_again">Download again</a>
      )}

      {lead && lead.interest_yes && (
        <p className="rsf-interest">Thanks. Someone from our team will write to you within two working days.</p>
      )}

      {related.length > 0 && (
        <div className="rsf-next">
          <h3 className="rsf-next-h">Read next</h3>
          <ul className="rsf-next-list">
            {related.map(function (r) {
              return (
                <li key={r.slug}>
                  <a href={'/resources/' + r.slug}>
                    <span className="rsf-next-kind">{r.format}</span>
                    <span className="rsf-next-t">{r.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

window.ResourceForm = ResourceForm;
window.ResourceThanks = ResourceThanks;
window.captureLeadSource = captureLeadSource;
