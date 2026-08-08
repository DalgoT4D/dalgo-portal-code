// ===== Pricing page v2 =====
// Design system: honours the live Dalgo system (Inter, teal #00A890, navy #0A2540,
// tokens.css + app.css, zero !important). The alternate font foundations named in the
// v2 brief belong to a different template and conflict with CLAUDE.md — do not import them.

const PricingHero = () => (
  <SiteHero
    eyebrow="Pricing"
    headline={<>Affordable by <span className="cvh-hl">design</span></>}
    body="Flat pricing. No per-user, per-source, or per-row fees — add your whole team and every data source for one predictable cost. Tell us about your organisation and we'll tailor the right plan for you."
    ctas={<>
      <p className="pricing-anchor"></p>
      <HeroCTAs secondaryLabel="Book Free Consultation" secondaryHref={window.SITE_CONFIG.CONSULT_FORM} />
    </>}
  >
    {/* One product illustration, not the old collage. The earlier copy-only hero left this page
        in the short solo tier while Home/Product/Consulting/Community sat in the tall visual
        tier — switching tabs jumped the fold. A single .cvh-figure-illus fixes both. */}
    <div className="cvh-visual">
      <figure className="cvh-figure cvh-figure-illus">
        <img loading="lazy" src="assets/illus/dashboard-charts.webp" alt="A Dalgo dashboard — everything included in the flat platform price" width="1100" height="654" />
      </figure>
    </div>
  </SiteHero>
);

const Check = () => (
  <span className="plan-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg></span>
);

// Region-priced SaaS + Consulting, shown as two headline cards (Anthropic-style tier disclosure —
// icon, tagline, price, CTA, "Includes" checklist). Figures confirmed 1 Aug 2026 pricing sheet:
// India ₹2.04L/yr SaaS, ₹2,500/hr consulting. Intl $3,000/yr SaaS, $35/hr consulting (supersedes the
// $3,600/$25 figures from the 31 Jul doc — reversed per the 1 Aug pricing sheet). Superset/viz tooling
// is BYO only (ground-truth.md) — the earlier "Hosted Superset ₹48,000/yr" line item was wrong and is removed.
const PRICING_REGIONS = {
  india: {
    label: 'Based in India',
    saas: { price: '₹2.04L', period: '/year', alt: 'or ₹17,000/month' },
    consulting: { price: '₹2,500', period: '/hour' },
  },
  intl: {
    label: 'Based outside India',
    saas: { price: '$3,000', period: '/year', alt: 'or $250/month' },
    consulting: { price: '$35', period: '/hour' },
  },
};

const CONSULTING_AREAS = [
  'Data discovery', 'Advisory', 'Capacity building', 'AI readiness',
  'Monitoring & evaluation', 'Data strategy', 'Implementation support',
];

const PricingPlans = () => {
  const [region, setRegion] = React.useState('india');
  const r = PRICING_REGIONS[region];
  return (
    <section className="pricing-section" id="plans">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">Choose your <span className="hl-underline">pricing</span></h2>
        </div>
        <div className="pricing-region-toggle" role="group" aria-label="Pricing region">
          {Object.entries(PRICING_REGIONS).map(([key, v]) => (
            <button key={key} type="button" className={'pr-toggle-btn' + (region === key ? ' is-active' : '')} aria-pressed={region === key} onClick={() => setRegion(key)}>{v.label}</button>
          ))}
        </div>
        <div className="pricing-grid pricing-grid-two">
          <article className="plan-card">
            <div className="plan-head">
              <span className="plan-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8M12 18v2" /></svg></span>
              <h2 className="plan-name">Dalgo SaaS</h2>
              <p className="plan-tagline">The platform, hosted and maintained for you.</p>
            </div>
            <div className="plan-priceblock">
              <div className="plan-price"><span className="plan-amt">{r.saas.price}</span><span className="plan-period">{r.saas.period}</span></div>
              <div className="plan-note">{r.saas.alt}</div>
            </div>
            <div className="plan-includes">
              <div className="plan-includes-h">Includes</div>
              <ul className="plan-features">
                <li><Check />Data integrations — 600+ sources</li>
                <li><Check />Dashboards &amp; charts</li>
                <li><Check />Reports &amp; alerts</li>
                <li><Check />KPIs &amp; metrics</li>
                <li><Check />Data quality, transformations &amp; RBAC</li>
                <li><Check />Fully hosted &amp; maintained by Dalgo</li>
                <li><Check />Flat price, whatever your team size</li>
              </ul>
            </div>
          </article>
          <article className="plan-card">
            <div className="plan-head">
              <span className="plan-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" /></svg></span>
              <h2 className="plan-name">Consulting</h2>
              <p className="plan-tagline">Hands-on help to design and run your data systems.</p>
            </div>
            <div className="plan-priceblock">
              <div className="plan-price"><span className="plan-from">from</span><span className="plan-amt">{r.consulting.price}</span><span className="plan-period">{r.consulting.period}</span></div>
              <div className="plan-note">Scoped with you before any work begins</div>
            </div>
            <div className="plan-includes">
              <div className="plan-includes-h">Engagement areas</div>
              <ul className="plan-features plan-features-tags">
                {CONSULTING_AREAS.map((a) => <li key={a}><Check />{a}</li>)}
              </ul>
            </div>
          </article>
        </div>
        {/* One line, not a card. The previous treatment was a --surface-1 box sitting directly
            above the --surface-1 "Costs to plan for" band, so two tints collided at the seam. */}
        <p className="pricing-help-line">
          Not sure what's right for you?{' '}
          <a href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel="noopener">Schedule a call<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg></a>{' '}
          and we'll help you figure out the right mix.
        </p>
      </div>
    </section>
  );
};

// "Costs to plan for" accordion (BM-351) — the two things outside the flat SaaS fee that a
// prospective org should budget for, neither borne by Dalgo. One item open by default, matches
// the FAQ accordion pattern. (Custom API connectors and onboarding/consulting were dropped from
// this list 1 Aug — consulting is now its own priced card above, not a footnote here.)
const CostsToPlanFor = () => {
  const [open, setOpen] = React.useState(-1); // all closed by default (composition principles: accordions)
  const items = [
    { title: 'Warehouse', body: 'Not borne by Dalgo. Provision AWS RDS PostgreSQL or BigQuery — billed directly by your cloud provider, typically $250–500/year.',
      icon: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" /><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></> },
    { title: 'Additional Visualization Tool', body: "Not borne by Dalgo. Dalgo's native dashboards are included — bringing another BI tool (Power BI, Superset) is billed separately by that vendor.",
      icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></> },
  ];
  return (
    <section className="ctpf-section" id="costs-to-plan-for">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">Costs to <span className="hl-underline">plan for</span></h2>
        </div>
        <div className="ctpf-list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div className={'ctpf-item' + (isOpen ? ' is-open' : '')} key={it.title}>
                <button type="button" className="ctpf-q" aria-expanded={isOpen} aria-controls={'ctpf-a-' + i} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="ctpf-ic" aria-hidden="true"><svg viewBox="0 0 24 24">{it.icon}</svg></span>
                  <span className="ctpf-q-text">{i + 1}. {it.title}</span>
                  <span className="ctpf-chev" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></span>
                </button>
                <div className="ctpf-a-wrap" id={'ctpf-a-' + i}>
                  <div className="ctpf-a"><p>{it.body}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Social proof at the decision point (verified STiR quote, verbatim)
const PricingProof = () => (
  <section className="pproof-section">
    <div className="container">
      {/* Canonical quote card (composition §4 / psychology #1 Jakob's law) — same pattern as case-studies. */}
      <div className="imx-band">
        <div className="imx-band-main">
          <span className="imx-band-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="imx-band-quote">
            Irrespective of the questions that come our way — whether from donors or the government — we're now able to focus much more on <mark className="imx-mark">building the story</mark>, rather than spending time working on the data to build that story.
          </blockquote>
          <div className="imx-band-attr">
            <span className="imx-band-name">Arun Maruthi Selvan</span>
            <span className="imx-band-role">Senior Manager, STiR Education</span>
          </div>
        </div>
        <div className="imx-band-photo">
          <img src="assets/opt/arun.webp" alt="Arun Maruthi Selvan of STiR Education at a Dalgo working session" width="1400" height="787" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

// Exposed so scripts/faq-schema.mjs can assert the FAQ pricing answer never drifts from these figures.
window.PRICING_REGIONS = PRICING_REGIONS;
window.PricingHero = PricingHero;
window.PricingPlans = PricingPlans;
window.CostsToPlanFor = CostsToPlanFor;
window.PricingProof = PricingProof;
