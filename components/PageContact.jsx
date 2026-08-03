// ===== Contact page =====
const ContactHero = () => (
  <SiteHero
    eyebrow="Contact"
    headline={<>Get in <span className="cvh-hl">touch</span></>}
    body="Tell us about your data challenges and we'll show you exactly how Dalgo can help."
  >
    <div className="cvh-visual">
      <div className="contact-trust">
        <img src="assets/dpg-badge.png" alt="Recognised as a Digital Public Good" className="contact-trust-badge" />
        <ul className="contact-trust-list">
          <li>We reply within one business day.</li>
          <li>DPDP-compliant Data Processor, independently audited by Pacta.</li>
          <li>Open-source — your data stays in your own warehouse.</li>
        </ul>
      </div>
    </div>
  </SiteHero>
);

// Native contact form (BM-344, §9): 4 fields POSTing straight to the same Google Form the old
// iframe embedded — fetch + no-cors + URLSearchParams, no iframe, no redirect.
// ⚑ ENTRY-ID-PENDING: the four entry.* ids below must be read off the form's "Get pre-filled
// link" and pasted in before launch; until then submissions will not land in the sheet.
const CONTACT_FORM = {
  action: 'https://docs.google.com/forms/d/e/1FAIpQLSf3RXBf0Bgr0QbwR9xoJLPJEzvikvv6_fXXvvcZgeiMnFSrpg/formResponse',
  fields: { name: 'entry.1000001', email: 'entry.1000002', org: 'entry.1000003', message: 'entry.1000004' },
};
const CFField = ({ id, label, type, textarea, errs }) => (
  <div className="cf-field">
    <label htmlFor={id}>{label}</label>
    {textarea
      ? <textarea id={id} name={id} rows="5" aria-invalid={errs[id] ? 'true' : undefined} aria-describedby={errs[id] ? id + '-err' : undefined}></textarea>
      : <input id={id} name={id} type={type || 'text'} aria-invalid={errs[id] ? 'true' : undefined} aria-describedby={errs[id] ? id + '-err' : undefined} />}
    {errs[id] && <span className="cf-err" id={id + '-err'}>{errs[id]}</span>}
  </div>
);
const ContactForm = () => {
  const [status, setStatus] = React.useState('idle'); // idle | submitting | success | error
  const [errs, setErrs] = React.useState({});
  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid work email address.';
    if (!f.org.trim()) e.org = 'Please add your organisation.';
    if (!f.message.trim()) e.message = 'Tell us a little about your data challenge.';
    return e;
  };
  const onSubmit = (ev) => {
    ev.preventDefault();
    const fd = new FormData(ev.target);
    const f = { name: fd.get('name') || '', email: fd.get('email') || '', org: fd.get('org') || '', message: fd.get('message') || '' };
    const e = validate(f);
    setErrs(e);
    if (Object.keys(e).length) {
      // A11y: move focus to the first invalid field so keyboard/SR users land on the error
      const first = ['name', 'email', 'org', 'message'].find((k) => e[k]);
      if (first) requestAnimationFrame(() => { const el = document.getElementById(first); if (el) el.focus(); });
      return;
    }
    setStatus('submitting');
    const params = new URLSearchParams();
    params.append(CONTACT_FORM.fields.name, f.name);
    params.append(CONTACT_FORM.fields.email, f.email);
    params.append(CONTACT_FORM.fields.org, f.org);
    params.append(CONTACT_FORM.fields.message, f.message);
    fetch(CONTACT_FORM.action, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() })
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  };
  if (status === 'success') {
    return (
      <div className="cf-done" role="status">
        <h2 className="cf-done-h">Thank you — we've got it.</h2>
        <p>We read every message and reply within two working days. If it's urgent, email <a href="mailto:support@dalgo.org">support@dalgo.org</a>.</p>
      </div>
    );
  }
  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <CFField id="name" label="Name" errs={errs} />
      <CFField id="email" label="Work email" type="email" errs={errs} />
      <CFField id="org" label="Organisation" errs={errs} />
      <CFField id="message" label="Message" textarea errs={errs} />
      {status === 'error' && <p className="cf-fail" role="alert">Something went wrong sending your message. Please retry, or email <a href="mailto:support@dalgo.org">support@dalgo.org</a>.</p>}
      <button type="submit" className={"btn btn-primary cf-submit" + (status === 'submitting' ? ' is-loading' : '')} disabled={status === 'submitting'} aria-busy={status === 'submitting' ? 'true' : undefined}>{status === 'submitting' ? 'Sending…' : 'Send Message'}</button>
    </form>
  );
};
const ContactBody = () => {
  return (
    <section className="pg-section" style={{paddingTop:40}}>
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="contact-method">
              <span className="label">Email us</span>
              <a href="mailto:support@dalgo.org">support@dalgo.org</a>
            </div>
            <div className="contact-method">
              <span className="label">Book a call</span>
              <a href="https://calendly.com/priyesh-projecttech4dev/30min" target="_blank" rel="noopener">Speak to an expert<svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"></path></svg></a>
            </div>
            <p className="pg-section-sub" style={{marginLeft:0, marginTop:8}}>
              We're a nonprofit too — expect a real conversation about your data, where it lives, what it needs to say, and what a first dashboard could look like.
            </p>
            {/* ⚑ BM-301: section plan pending confirmation with Himanshu — populated with next-steps strip so the page never reads empty */}
            <div className="ct-steps">
              <div className="ct-step"><span className="ct-n">1</span><p>Tell us about your organisation and where your data lives today.</p></div>
              <div className="ct-step"><span className="ct-n">2</span><p>We walk through what a first dashboard could look like for your programmes.</p></div>
              <div className="ct-step"><span className="ct-n">3</span><p>You decide the pace — platform, consulting, or both.</p></div>
            </div>
          </div>
          <div className="audit-wrap" style={{margin:0}}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

window.ContactHero = ContactHero;
window.ContactForm = ContactForm;
window.ContactBody = ContactBody;
