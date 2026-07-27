// ValuePillars — Fivetran-platform-style: copy + master CTA on the left,
// an interconnected "Data + AI Foundations for Impact" diagram on the right.
const ValuePillars = () => {
  const sources = [
    { name: 'Avni', src: 'assets/sources/avni.png' },
    { name: 'CommCare', src: 'assets/sources/commcare.png' },
    { name: 'Glific', src: 'assets/sources/glific.png' },
    { name: 'Google Sheets', src: 'assets/sources/google_sheets.png' },
    { name: 'KoBoToolbox', src: 'assets/sources/kobotoolbox.png' },
    { name: 'Paper Survey', src: 'assets/sources/papersurvey.png' },
    { name: 'Salesforce', src: 'assets/sources/salesforce.svg' },
    { name: 'SurveyCTO', src: 'assets/sources/surveycto.png' },
    { name: 'Zoho Creator', src: 'assets/sources/zoho_creator.svg' }];
  return (
  <section className="vp-section vp-platform" id="value">
    <div className="container vp-pf-grid">
      <div className="vp-pf-copy">
        <h2 className="vp-h vp-h-wide">Turn scattered programme data into <span className="hl-underline">decisions you can defend</span></h2>
        <div className="vp-pf-blocks">
          <div className="vp-pf-block">
            <span className="vp-pf-ic"><svg viewBox="0 0 24 24"><circle cx="6" cy="7" r="2.4"/><circle cx="6" cy="17" r="2.4"/><circle cx="18" cy="12" r="2.4"/><path d="M8.2 8.1 15.8 11M8.2 15.9 15.8 13"/></svg></span>
            <div>
              <h3>Every source, combined</h3>
              <p>Bring data together from every tool your teams use — cleaned, combined, and ready to use.</p>
            </div>
          </div>
          <div className="vp-pf-block">
            <span className="vp-pf-ic"><svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.4-3 8-7 10-4-2-7-5.6-7-10V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg></span>
            <div>
              <h3>Your data, safe and private</h3>
              <p>Open-source, and DPDP-compliant as your data processor — your data stays in your own warehouse.</p>
            </div>
          </div>
          <div className="vp-pf-block">
            <span className="vp-pf-ic"><svg viewBox="0 0 24 24"><path d="M4 19V5M4 19h16M9 16V9M14 16V6M19 16v-4"/></svg></span>
            <div>
              <h3>Built for impact use cases</h3>
              <p>From dashboards that drive field updates to funder-ready reports — built for every team in a nonprofit.</p>
            </div>
          </div>
        </div>
        <a href="product.html" className="vp-section-cta" data-comment-anchor="e89785ec95-a-21-11">Explore Platform →</a>
      </div>

      <div className="vp-pf-diagram">
        <LifecycleTeaser />
      </div>
    </div>
  </section>);
};


// Join the Dalgo Community — learning ecosystem (image cards + pill CTAs)
const Nurture = () => {
  const cards = [
  { img: 'assets/community-cards/decoding-data.jpg',
    label: 'LinkedIn newsletter',
    title: 'Decoding Data',
    body: 'Practical, plain-language takes on nonprofit data — delivered to your LinkedIn feed every two weeks.',
    cta: 'Subscribe',
    href: 'https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7470812385688276992' },
  { img: 'assets/community-cards/webinars.jpg',
    label: 'Live sessions',
    title: 'Monthly Webinars',
    body: 'Live product sessions and nonprofit data education — learn alongside peers across the sector.',
    cta: 'Register',
    href: 'https://luma.com/calendar/manage/cal-VTXoLOLr5aY3hfM' },
  { panel: true,
    icon: <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.9 13.3L3 21l4.8-1.1A9 9 0 1 0 12 3z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></svg>,
    label: 'Peer network',
    title: 'WhatsApp Community',
    body: 'Connect with nonprofit data practitioners — ask questions, share wins, and swap what works.',
    cta: 'Join Community',
    href: 'https://chat.whatsapp.com/GWXbfC0fXKf2RVfKiCaOEy?s=cl&p=i&ilr=4' },
  { img: 'assets/community-cards/newsletter.jpg',
    label: 'Email newsletter',
    title: 'Dalgo Newsletter',
    body: 'Product updates, practical guides, and stories from the NGO partners building with Dalgo.',
    cta: 'Subscribe',
    href: 'https://zc1.maillist-manage.in/ua/Optin?od=1a1e3dbb3aab7&zx=1dfa5ea80f&tD=1334ba025024aa49&sD=1334ba0250252f1d' }];

  return (
    <section className="nurture-section" id="community">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Join the Dalgo <span className="hl-underline">community</span></h2>
        </div>
        <p className="section-sub nurture-intro">Whether you're already using Dalgo or simply looking to improve your organisation's data practices, our community offers practical resources, live learning, and peer support.</p>
        <div className="nurture-grid nurture-grid-4">
          {cards.map((c, i) =>
          <div key={i} className="nurture-card">
            {c.img ?
            <div className="nurture-thumb"><img src={c.img} alt={c.title} loading="lazy" /></div> :
            <div className="nurture-thumb nurture-thumb-panel"><span className="nurture-thumb-ic">{c.icon}</span></div>}
            <div className="nurture-body">
              <div className="nurture-label">{c.label}</div>
              <h3 className="nurture-h">{c.title}</h3>
              <p className="nurture-p">{c.body}</p>
              <a href={c.href} className="nurture-btn" target="_blank" rel="noopener">{c.cta}</a>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>);

};


// Final CTA — navy band over a blurred community photo, two actions
const FinalCTA = () =>
<section className="final-cta final-cta-photo" id="final-cta">
    <div className="final-cta-bg" aria-hidden="true">
      <img width="1400" height="933" src="assets/opt/story-mission.webp" alt="" loading="lazy" />
    </div>
    <div className="container">
      <div className="final-cta-eyebrow">Join a community of 25+ nonprofits</div>
      <h2 className="final-cta-h" data-comment-anchor="ecea4efc01-h2-64-7">Know your data. Share your <span className="hl-underline">story.</span></h2>
      <div className="final-cta-actions">
        {(() => { const tc = window.trialCta ? window.trialCta() : { label: 'Contact Us', href: 'contact.html' }; return (
        <a href={tc.href} target={tc.ext ? '_blank' : undefined} rel={tc.ext ? 'noopener' : undefined} className="final-cta-btn">
          {tc.label}
          <svg className="i" viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>); })()}
        <a href="faq.html" className="final-cta-btn-ghost">Browse FAQs</a>
      </div>
    </div>
  </section>;


// Audit form — complimentary data audit
const AuditForm = () => {
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <section className="audit-section" id="consulting">
      <div className="audit-wrap">
        <div className="audit-head">
          <div className="audit-eyebrow">Expert Service · For Eligible Nonprofits</div>
          <h2 className="audit-h">Apply for Pro Bono Data Consulting</h2>
          <p className="section-sub" style={{ maxWidth: 640, margin: '12px auto 0' }}>Not sure where to start? Our data team works one-on-one with eligible nonprofits to map your data lifecycle and design a strategy — before you implement a thing.</p>
        </div>
        {submitted ?
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✓</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--ink)', marginBottom: 8 }}>
              Request received.
            </div>
            <div style={{ color: 'var(--ink-3)' }}>We'll be in touch within one business day.</div>
          </div> :

        <form className="audit-form-grid" onSubmit={(e) => {e.preventDefault();setSubmitted(true);}}>
            <div className="audit-field">
              <label>Name <span className="req">*</span></label>
              <input required placeholder="Priya Sharma" />
            </div>
            <div className="audit-field">
              <label>Role <span className="req">*</span></label>
              <input required placeholder="Head of M&E" />
            </div>
            <div className="audit-field">
              <label>Email <span className="req">*</span></label>
              <input required type="email" placeholder="priya@yournonprofit.org" />
            </div>
            <div className="audit-field">
              <label>Mobile Number</label>
              <input placeholder="+91 9XXXXX XXXXX" />
            </div>
            <div className="audit-field full">
              <label>Organisation website</label>
              <input placeholder="yournonprofit.org" />
            </div>
            <div className="audit-field full">
              <label>Key data challenges</label>
              <textarea placeholder="A short paragraph on what you're trying to solve…" />
            </div>
            <button type="submit" className="audit-submit">
              Apply for Pro Bono Consulting →
            </button>
          </form>
        }
      </div>
    </section>);

};

// FAQ accordion
const FAQ = () => {
  const items = [
    { cat: 'About', q: 'What is Dalgo?', a: [
      "Dalgo is an open-source data insights platform built for nonprofits.",
      "It automates data consolidation, cleaning, storage, and dashboards — so M&E and program teams move from manually preparing decks to real-time, data-based decisions.",
      "It's a registered Digital Public Good and a DPDP-compliant data processor. Your data stays in your own warehouse." ] },
    { cat: 'Pricing', q: 'How does pricing work?', pending: true, a: [] },
    { cat: 'Pricing', q: 'How much does Dalgo cost?', pending: true, a: [] },
    { cat: 'Pricing', q: 'Dalgo vs Power BI for nonprofits', pending: true, a: [] },
    { cat: 'Pricing', q: 'Who pays for the warehouse, and how much?', pending: true, a: [] },
    { cat: 'Security', q: 'Does Dalgo ever see our data?', a: [
      "No. Your data lives in your own warehouse.",
      "We never see, sell, or store it on our servers." ] },
    { cat: 'Security', q: 'Can we export or leave with our data?', a: [
      "Yes. Your data already sits in your own warehouse and stays there if you leave." ] },
    { cat: 'Security', q: 'Is Dalgo DPDP-compliant?', a: [
      "Dalgo is DPDP-compliant as a Data Processor. Your organisation remains the Data Fiduciary.",
      "As of July 2026, Dalgo completed an independent DPDP audit with the law firm Pacta.",
      "Adopting Dalgo does not by itself make your organisation compliant — as the Data Fiduciary, you remain responsible for consent, retention, and beneficiary rights." ] },
    { cat: 'Security', q: 'How is our data kept secure and private?', a: [
      "Dalgo is DPDP-compliant as a Data Processor, and your data stays in your own warehouse." ] },
    { cat: 'Setup', q: 'What data sources can Dalgo connect to?', a: [
      "Dalgo ships custom-built connectors for the tools NGOs already use, plus 600+ more sources via Airbyte:",
      { ul: ["KoboToolbox, MGrant, ODK, SurveyCTO — custom-built for the NGO stack", "Google Sheets and Excel", "Salesforce", "PostgreSQL and REST APIs"] },
      "Our team can add custom sources." ] },
    { cat: 'Setup', q: 'Do we need a technical team to use Dalgo?', pending: true, a: [] },
    { cat: 'Setup', q: 'Which languages and regions do you support?', a: [
      "Nonprofits across India and East Africa use Dalgo today, with data in many languages.",
      "[NEEDS FIGURE: supported interface languages] — tell us your context and we'll confirm fit." ] },
    { cat: 'Setup', q: 'How long does onboarding take?', a: [
      "Around 4 weeks from first audit to live dashboards.",
      "The exact timeline depends on your data sources and reporting needs." ] }];

  const [open, setOpen] = React.useState(0);
  const uid = React.useId();
  let lastCat = null;
  return (
    <section className="faq-section" id="faq">
      <div className="faq-wrap">
        <div className="faq-list">
          {items.map((it, i) => {
            const isOpen = open === i;
            const qId = `${uid}-q${i}`;
            const aId = `${uid}-a${i}`;
            const showCat = it.cat !== lastCat;
            lastCat = it.cat;
            return (
              <React.Fragment key={i}>
                {showCat && <h3 className="faq-cat">{it.cat}</h3>}
                <div className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-q"
                    id={qId}
                    aria-controls={aId}
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span className="faq-q-text">{it.q}{it.pending && <span className="faq-tag-pending">Answer to be updated</span>}</span>
                    <span className="faq-q-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>
                  <div className="faq-a-wrap" id={aId} role="region" aria-labelledby={qId}>
                    <div className="faq-a">
                      {it.a.map((blk, k) => typeof blk === 'string'
                        ? <p key={k}>{blk}</p>
                        : <ul key={k} className="faq-a-ul">{blk.ul.map((li, j) => <li key={j}>{li}</li>)}</ul>)}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>);

};

window.ValuePillars = ValuePillars;
window.Nurture = Nurture;
window.FinalCTA = FinalCTA;
window.AuditForm = AuditForm;
window.FAQ = FAQ;