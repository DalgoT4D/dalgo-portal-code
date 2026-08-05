// Newsletter signup — posts straight into the Zoho Campaigns list (the "Dalgo - Form"
// quick form). Every value below was read off Zoho's own hosted form at
// zc1.maillist-manage.in/ua/Optin?od=1a1e3dbb3aab7… — the same identifiers Zoho puts in
// its embed snippet, so they are stable and safe to hardcode.
// mode:'no-cors' means the response is opaque: Zoho accepts the POST but we cannot read
// its body, so success is optimistic (matching CONTACT_FORM in PageContact.jsx). Zoho's
// own confirmation email is the subscriber's real receipt.
const ZOHO_SIGNUP = {
  action: 'https://thdv-zgfh.maillist-manage.in/weboptin.zc',
  fixed: {
    submitType: 'optinCustomView', formType: 'QuickForm', mode: 'OptinCreateView',
    zx: '1dfa5ea80f', zcvers: '2.0', oldListIds: '', emailReportId: '',
    zcld: '1334ba0250252b25', zctd: '1334ba025024aa49',
    zc_trackCode: 'ZCFORMVIEW',
    zc_formIx: '3z266af01fb444d35cd083e15976d443a9d638e328bcf20da052284f8e14e60b55',
    di: '114897221022895816361785914298171', lf: '1785914298169', qs: '',
  },
};

const FooterSubscribe = () => {
  const [status, setStatus] = React.useState('idle'); // idle | submitting | done | error
  const [err, setErr] = React.useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (status === 'submitting') return;
    const email = (new FormData(ev.target).get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Focus the field first: it stays mounted, so this needs no post-commit callback.
      const el = document.getElementById('fx-sub-email');
      if (el) el.focus();
      setErr('Enter a valid email address.');
      return;
    }
    setErr('');
    setStatus('submitting');
    const body = new URLSearchParams({ ...ZOHO_SIGNUP.fixed, CONTACT_EMAIL: email });
    fetch(ZOHO_SIGNUP.action, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    }).then(() => setStatus('done')).catch(() => setStatus('error'));
  };

  if (status === 'done') {
    return (
      <p className="fx-sub-done" role="status">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
        Thanks — check your inbox to confirm your subscription.
      </p>
    );
  }

  return (
    <form className="fx-sub" onSubmit={onSubmit} noValidate>
      <div className="fx-sub-row">
        <input id="fx-sub-email" name="email" type="email" autoComplete="email"
          placeholder="you@example.com" aria-label="Email address"
          aria-invalid={err ? 'true' : undefined} aria-describedby={err ? 'fx-sub-err' : undefined} />
        <button type="submit" className="cmh-btn cmh-btn-primary" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining…' : 'Subscribe'}
        </button>
      </div>
      {err && <span className="fx-sub-err" id="fx-sub-err">{err}</span>}
      {status === 'error' && <span className="fx-sub-err">Something went wrong. Email <a href="mailto:support@dalgo.org">support@dalgo.org</a> and we'll add you.</span>}
    </form>
  );
};

const FooterV2 = () =>
<footer className="fx">
    <div className="fx-links">
      <div className="fx-links-inner">
        <div className="fx-brand-col">
          <div className="fx-logo">
            <img src={window.__resources && window.__resources.dalgoLogo || "assets/dalgo-logo.png"} alt="Dalgo" style={{ height: 36, width: 'auto', display: 'block' }} />
          </div>
          <p className="fx-brand-tag">Join our community to get updates on Data + AI webinars, nonprofit stories, and offline meetups.</p>
          <FooterSubscribe />
          {/* Credential as real text, not a raster: assets/dpg-badge.png is a corrupt PNG
              (valid header, broken pixel stream) so it has always rendered blank here. This
              version can't rot, scales, and is readable by screen readers. */}
          <a className="fx-cred" href="https://www.digitalpublicgoods.net/r/dalgo" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5.5c0 4-3 7.4-7 8.5-4-1.1-7-4.5-7-8.5V6l7-3z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>
            Recognised as a Digital Public Good
          </a>
        </div>
        <nav className="fx-col" aria-label="Explore">
          <h2 className="fx-h">Explore</h2>
          <a href="product.html">Product</a>
          <a href="case-studies.html">Case Studies</a>
          <a href="consulting.html">Consulting</a>
          <a href="pricing.html">Pricing</a>
          <a href="contact.html">Book a Free Consultation</a>
        </nav>
        <nav className="fx-col" aria-label="Resources">
          <h2 className="fx-h">Resources</h2>
          <a href="about.html">About</a>
          <a href="community.html">Community</a>
          <a href="faq.html">Frequently Asked Questions</a>
        </nav>
        <div className="fx-col">
          <h2 className="fx-h">Connect</h2>
          <a href="https://zcmp.in/byTZ" target="_blank" rel="noopener">Newsletter</a>
          <a href="mailto:support@dalgo.org">support@dalgo.org</a>
          <div className="fx-social">
            <a href="https://www.linkedin.com/company/project-tech4dev/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.54C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg></a>
            <a href="https://www.youtube.com/@ProjectTech4Dev" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.8zM9.6 15.57V8.43L15.82 12 9.6 15.57z" /></svg></a>
            <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg></a>
          </div>
        </div>
      </div>
      <div className="fx-bottom">
        {/* Attribution reads as one clean line here, where the row is full-width */}
        <div>© 2026 Dalgo — an open-source initiative of <a href="https://projecttech4dev.org" target="_blank" rel="noopener" className="fx-bottom-parent">Project Tech4Dev<svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8" /></svg></a></div>
        <div className="fx-bottom-right">
          <a href="privacy.html">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>;

window.FooterV2 = FooterV2;
