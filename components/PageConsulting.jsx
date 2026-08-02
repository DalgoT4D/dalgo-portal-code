// ===== Consulting page (BM-285) =====
// Grounded in: spec offering list (v2 build instruction) + existing site engagement copy.
// REPLACE-WITH-SOURCE-DOC: pillars to be reconciled against "Dalgo Consulting OnePager" and offering
// detail against "Consulting Offerings — Proposals" once the correct docs are supplied (the uploaded
// files were an Urja Trust client proposal). Engagement-process section intentionally omitted until
// the internal Consulting Process doc arrives — do not invent stages.
const ConsultingHero = () => (
  <SiteHero
    eyebrow="Consulting"
    headline={<>Expert help, priced for <span className="cvh-hl">nonprofits</span></>}
    body="Work with a team fluent in M&E, log frames, and funder reporting. We design the data systems your programmes rely on — and build your team's confidence to run them."
    ctas={<HeroCTAs primaryLabel="Contact Us" primaryHref="contact.html" secondaryLabel="Explore Pricing" secondaryHref="pricing.html" />}
  >
    <div className="cvh-visual">
      <figure className="cvh-figure">
        <img src="assets/illus/dashboards.svg" alt="Dalgo consultants designing dashboards, charts and KPIs with a nonprofit team" width="680" height="425" />
      </figure>
    </div>
  </SiteHero>
);
const ConsultingPillars = () => {
  const pillars = [
    { h: 'Sector fluency', p: 'M&E frameworks, log frames, funder reporting — our consultants work in the language your programmes already speak.' },
    { h: 'Hands-on, end to end', p: 'The team that scopes your engagement stays through implementation, until the system runs in production.' },
    { h: 'Nonprofit pricing', p: 'Flat, transparent engagements scoped with you — no per-user or per-source fees on the platform underneath.' },
  ];
  return (
    <section className="pg-section">
      <div className="container">
        <div className="pg-section-head"><h2 className="pg-h2">Why teams <span className="hl-underline">work with us</span></h2></div>
        <div className="co-pillars">
          {pillars.map((x) => <div key={x.h} className="co-pillar"><h3>{x.h}</h3><p>{x.p}</p></div>)}
        </div>
      </div>
    </section>
  );
};
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
window.ConsultingHero = ConsultingHero;
window.ConsultingPillars = ConsultingPillars;
window.ConsultingOfferings = ConsultingOfferings;
