// ===== Consulting page (BM-285) =====
// Grounded in: spec offering list (v2 build instruction) + existing site engagement copy.
// REPLACE-WITH-SOURCE-DOC: pillars to be reconciled against "Dalgo Consulting OnePager" and offering
// detail against "Consulting Offerings — Proposals" once the correct docs are supplied (the uploaded
// files were an Urja Trust client proposal). Engagement-process section intentionally omitted until
// the internal Consulting Process doc arrives — do not invent stages.
const ConsultingHero = () => (
  <SiteHero
    eyebrow="Consulting"
    headline={<>Data consulting built around your organization's <span className="cvh-hl">mission</span></>}
    body="Every nonprofit has different data challenges. Our consultants combine deep nonprofit expertise with Dalgo's technology to design solutions that fit your workflows, your teams, and your goals."
    ctas={<HeroCTAs primaryLabel="Talk to an Expert" primaryHref="contact.html" secondaryLabel="Explore Our Work" secondaryHref="case-studies.html" />}
  >
    <div className="cvh-visual">
      <figure className="cvh-figure">
        <img loading="lazy" src="assets/opt/people-1.webp" alt="A Dalgo consultant working through data systems with a nonprofit team" width="1400" height="787" />
      </figure>
    </div>
  </SiteHero>
);
const WhatIsConsulting = () => (
  <section className="pg-section">
    <div className="container">
      <div className="section-head section-head-center">
        <p className="pg-eyebrow">What is Dalgo Consulting?</p>
        <h2 className="section-title">Strategic data expertise for <span className="hl-underline">every stage</span> of your data journey</h2>
        <p className="section-sub">Whether you're building a monitoring framework, cleaning fragmented data, designing executive dashboards, evaluating programme performance, or preparing for AI adoption, our consultants work alongside your team to solve real operational challenges. We combine deep nonprofit expertise with Dalgo's technology to help organizations build data systems they can trust and sustain.</p>
      </div>
    </div>
  </section>
);
const CO_ICON = {
  discover: <svg viewBox="0 0 40 40"><circle cx="18" cy="18" r="9"></circle><path d="M25 25l8 8"></path></svg>,
  strategy: <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="14"></circle><circle cx="20" cy="20" r="7"></circle><circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none"></circle></svg>,
  advisory: <svg viewBox="0 0 40 40"><path d="M8 28V12a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H15z"></path><path d="M14 16h12M14 21h8"></path></svg>,
  capacity: <svg viewBox="0 0 40 40"><path d="M12 30c0-5 3.6-8 8-8s8 3 8 8"></path><circle cx="20" cy="14" r="5"></circle><path d="M30 12l2 2 4-4"></path></svg>,
  ai: <svg viewBox="0 0 40 40"><rect x="11" y="13" width="18" height="16" rx="3"></rect><path d="M20 13V8M16 8h8M16 20h2M22 20h2M16 24h8"></path></svg>,
  mel: <svg viewBox="0 0 40 40"><path d="M8 30V10M8 30h24M14 26l5-7 4 4 7-11"></path></svg>,
  impl: <svg viewBox="0 0 40 40"><circle cx="13" cy="20" r="6"></circle><circle cx="27" cy="20" r="6"></circle><path d="M19 20h2"></path></svg>,
  probono: <svg viewBox="0 0 40 40"><path d="M20 33s-11-6.6-11-14a6.5 6.5 0 0 1 11-4.6A6.5 6.5 0 0 1 31 19c0 7.4-11 14-11 14z"></path></svg>,
};
const ConsultingOfferings = () => {
  // Sentence-case headings (design-system copy rule); Pro bono last.
  const offers = [
    { ic: 'discover', h: 'Data discovery', p: 'A structured look at where your data stands today — sources, gaps, and the quickest wins. Often the first engagement.' },
    { ic: 'advisory', h: 'Advisory', p: 'Ongoing counsel for data decisions — tooling, governance, architecture, and hiring.' },
    { ic: 'capacity', h: 'Capacity building', p: 'Training for M&E and program teams, so the systems we build together keep working after the engagement ends.' },
    { ic: 'ai', h: 'AI readiness', p: 'Assess where AI can help your programmes, and get your data ready for it.' },
    { ic: 'mel', h: 'Monitoring & evaluation', p: 'Log frames, indicators, and collection formats that flow straight into your dashboards and reports.' },
    { ic: 'strategy', h: 'Data strategy', p: 'A realistic roadmap from where your data is now to where your mission needs it to be.' },
    { ic: 'impl', h: 'Implementation support', p: 'Hands-on help connecting sources, cleaning data, and getting pipelines live in production.' },
    { ic: 'probono', h: 'Pro bono consulting', p: 'For eligible nonprofits — a complimentary one-hour discovery session to map your data challenges and recommend the right next steps.', link: { l: 'Book a Free Consultation', h: 'https://forms.gle/vfMNUNHTwDWB4qm66', ext: true } },
  ];
  return (
    <section className="pg-section alt">
      <div className="container">
        <div className="pg-section-head">
          <h2 className="pg-h2">Common <span className="hl-underline">engagement areas</span></h2>
          <p className="pg-section-sub" style={{ margin: '12px auto 0' }}>Every engagement is scoped with you. See our flat <a href="pricing.html">platform pricing</a>.</p>
        </div>
        <div className="co-grid">
          {offers.map((o) => (
            <article key={o.h} className="co-card">
              <span className="co-ico" aria-hidden="true">{CO_ICON[o.ic]}</span>
              <h3>{o.h}</h3>
              <p>{o.p}</p>
              {o.link && <a className="co-link" href={o.link.h} target={o.link.ext ? "_blank" : undefined} rel={o.link.ext ? "noopener" : undefined}>{o.link.l} {o.link.ext ? <svg viewBox="0 0 24 24" className="x-ext" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"></path></svg> : <span aria-hidden="true">→</span>}</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
// From the Consultant's Desk — paired consultant + partner quotes.
// ⚑ PLACEHOLDER CONTENT: exact quotes/attribution to be supplied by Stuti.
const CONSULT_DESK = [
  {
    org: 'SHOFCO',
    consultantQuote: "SHOFCO had ambitious programmes, but reporting was spread across multiple systems. Our focus wasn't simply building dashboards. It was creating a reporting workflow their teams could actually rely on every day.",
    consultant: 'Pratiksha', consultantRole: 'Lead Consultant, Dalgo',
    orgQuote: "Pratiksha quickly understood our operating model and translated complex reporting needs into practical solutions. The engagement helped us move from reactive reporting to proactive decision making.",
    orgPerson: 'Alexander', orgRole: 'SHOFCO',
  },
  {
    org: 'Bhumi',
    consultantQuote: "Rather than introducing another tool, we worked with Bhumi to strengthen the processes behind their data so every report reflected the same source of truth.",
    consultant: 'Dalgo Consultant', consultantRole: 'Dalgo',
    orgQuote: "The Dalgo team felt like an extension of our own. They helped us simplify reporting, improve confidence in our data, and build systems our team continues to use today.",
    orgPerson: 'Bhumi Team', orgRole: 'Bhumi',
  },
];
const ConsultantsDesk = () => (
  <section className="pg-section">
    <div className="container">
      <div className="section-head section-head-center">
        <h2 className="section-title">From the <span className="hl-underline">Consultant's Desk</span></h2>
        <p className="section-sub">Behind every dashboard is a team solving complex operational challenges. Hear directly from the consultants who partnered with nonprofits to build stronger data systems — and from the organizations they worked alongside.</p>
      </div>
      <div className="cd-grid">
        {CONSULT_DESK.map((c) => (
          <article className="cd-card" key={c.org}>
            <div className="cd-org">{c.org}</div>
            <blockquote className="cd-quote cd-quote-consultant">
              <p>“{c.consultantQuote}”</p>
              <footer className="cd-attr"><span className="cd-name">{c.consultant}</span><span className="cd-role">{c.consultantRole}</span></footer>
            </blockquote>
            <blockquote className="cd-quote cd-quote-org">
              <p>“{c.orgQuote}”</p>
              <footer className="cd-attr"><span className="cd-name">{c.orgPerson}</span><span className="cd-role">{c.orgRole}</span></footer>
            </blockquote>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const ConsultingFinalCTA = () => (
  <section className="final-cta final-cta-photo" id="final-cta">
    <div className="final-cta-bg" aria-hidden="true">
      <img width="1400" height="933" src="assets/opt/story-mission.webp" alt="" loading="lazy" />
    </div>
    <div className="container">
      <div className="final-cta-eyebrow">Dalgo Consulting</div>
      <h2 className="final-cta-h">Ready to strengthen your organization's <span className="hl-underline">data capabilities?</span></h2>
      <p className="final-cta-sub">Whether you're improving reporting, designing a new MEL framework, integrating systems, or preparing for AI, we'll help you build a data foundation that supports better decisions and greater impact.</p>
      <div className="final-cta-actions">
        <a href="contact.html" className="final-cta-btn">Book a Free Consultation
          <svg className="i" viewBox="0 0 24 24" style={{ width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}><path d="M5 12h14M13 5l7 7-7 7" /></svg>
        </a>
      </div>
    </div>
  </section>
);

window.ConsultingHero = ConsultingHero;
window.WhatIsConsulting = WhatIsConsulting;
window.ConsultingOfferings = ConsultingOfferings;
window.ConsultantsDesk = ConsultantsDesk;
window.ConsultingFinalCTA = ConsultingFinalCTA;
