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
      <HeroCTAs primaryLabel="Start Free Trial" primaryHref="https://dashboard.dalgo.org" secondaryLabel="Contact Us" secondaryHref="contact.html" />
    </>}
    help={<>Pricing shown is for India. For global pricing, <a href="contact.html">contact us</a>.</>}
  >
    <div className="cvh-visual">
      <div className="hc-collage" aria-hidden="true">
        <div className="hc-card hc-a hc-shot"><img src="assets/product/dashboard.png" alt="" /></div>
        <div className="hc-card hc-b hc-shot"><img src="assets/product/scorecards.png" alt="" /></div>
        <div className="hc-cred">
          <img src="assets/dpg-badge.png" alt="Recognised as a Digital Public Good" />
          <span className="hc-cred-label">Recognised as a<br />Digital Public Good</span>
        </div>
        <div className="hc-avs">
          <span className="hc-avs-stack">
            <span className="hc-avs-av" style={{ background: '#2A6FDB' }}>SN</span>
            <span className="hc-avs-av" style={{ background: '#C4703A' }}>MD</span>
            <span className="hc-avs-av" style={{ background: '#0F5C52' }}>SR</span>
          </span>
          Trusted by 25+ nonprofits
        </div>
      </div>
    </div>
  </SiteHero>
);

const Check = () => (
  <svg className="plan-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
);

// Three plans. Figures verified July 2026 (Managed ₹2.04L/yr, Consulting from ₹4.04L/yr).
const PricingPlans = () => {
  const plans = [
    {
      name: 'SAAS',
      cta: window.trialCta ? window.trialCta() : { label: 'Contact Us', href: 'contact.html' },
      from: true,
      price: '₹2.04L',
      note: 'per year · flat, whatever your team size',
      accent: true,
      tag: 'Most NGOs choose this',
      desc: 'Dalgo hosts and maintains your instance, so your team can focus on the data.',
      features: [
        'Dalgo hosts & maintains your instance',
        'Flat price, whether 10 or 100 users',
        'Updates, monitoring & backups handled for you',
        'Priority support',
      ],
    },
    {
      name: 'Consulting',
      cta: { label: 'Contact Us', href: 'contact.html', ghost: true },
      from: true,
      price: '₹4.04L',
      note: 'per year · Basic tier; Standard & Advanced available',
      desc: 'Hands-on help to design and stand up your data systems.',
      // NOTE: engagement-area labels — verify verbatim against consulting offerings blog (BM-254, Rita & Anusha).
      features: [
        'Data strategy & maturity mapping',
        'MEL systems design',
        'Integration & setup',
        'Expert time, priced for nonprofits',
      ],
    },
  ];
  return (
    <section className="pricing-section" id="plans">
      <div className="container">
        <div className="pricing-grid">
          {plans.map((p) => (
            <article className={'plan-card' + (p.accent ? ' plan-card-accent' : '')} key={p.name}>
              {p.tag && <span className="plan-tag">{p.tag}</span>}
              <h2 className="plan-name">{p.name}</h2>
              <div className="plan-price">
                {p.from && <span className="plan-from">from</span>}
                <span>{p.price}</span>
              </div>
              <div className="plan-note">{p.note}</div>
              <p className="plan-desc">{p.desc}</p>
              <ul className="plan-features">
                {p.features.map((f, i) => <li key={i}><Check />{f}</li>)}
              </ul>
              <a className={'cmh-btn plan-cta ' + (p.cta.ghost ? 'cmh-btn-ghost' : 'cmh-btn-primary')} href={p.cta.href} target={p.cta.ext ? '_blank' : undefined} rel={p.cta.ext ? 'noopener' : undefined}>
                {p.cta.label}
                {!p.cta.ghost && <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Section 3 — Everything, in every plan (feature grid). Line icons in soft tinted chips.
const FeatureGrid = () => {
  const tiles = [
    { tint: '#E6F7F2', ink: '#00897B', label: 'Data pipelines', desc: 'Automated syncs through custom NGO connectors — Kobo, MGrant, ODK, SurveyCTO — plus 600+ more sources via Airbyte.',
      icon: <><path d="M4 8h11a4 4 0 0 1 0 8h-1" /><path d="M8 4L4 8l4 4" /><path d="M20 16H9a4 4 0 0 1 0-8h1" /><path d="M16 20l4-4-4-4" /></> },
    { tint: '#EAF1FE', ink: '#2A6FDB', label: 'Dashboards', desc: 'Live views your whole team can open.',
      icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></> },
    { tint: '#FDF0E7', ink: '#C4703A', label: 'Charts', desc: 'Bar, line, pie, maps, pivots and more.',
      icon: <><path d="M5 20V10M12 20V4M19 20v-7" /></> },
    { tint: '#FBEBEF', ink: '#C33F63', label: 'Alerts', desc: 'Know when a number needs attention.',
      icon: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></> },
    { tint: '#EFEBFB', ink: '#6D4FC4', label: 'KPIs', desc: 'Track the metrics your programs run on.',
      icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></> },
    { tint: '#E7F6EE', ink: '#1F8A54', label: 'Data management', desc: 'Quality checks, transformations, RBAC.',
      icon: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" /><path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" /></> },
  ];
  return (
    <section className="feat-section" id="included">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="pf-eyebrow">Everything, in every plan</p>
          <h2 className="section-title">One flat fee, the <span className="hl-underline">whole platform</span></h2>
          <p className="section-sub" style={{ maxWidth: 760, margin: '12px auto 0' }}>Every capability is included in every plan — no feature gating, no upsell asterisks.</p>
        </div>
        <div className="feat-grid">
          {tiles.map((t, i) => (
            <div className="feat-tile" key={i}>
              <span className="feat-ic" style={{ background: t.tint }}>
                <svg viewBox="0 0 24 24" aria-hidden="true" style={{ stroke: t.ink }}>{t.icon}</svg>
              </span>
              <div className="feat-body">
                <div className="feat-label">{t.label}</div>
                <div className="feat-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="feat-notes">
          {/* NOTE: warehouse storage range ($250–500/yr) — verify against Jan 2026 pricing doc. */}
          <p className="feat-note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 10a4 4 0 0 0-7.7-1.3A3.5 3.5 0 1 0 7 16h10a3.5 3.5 0 0 0 1-6.9" /></svg>
            Warehouse storage is billed separately by your cloud provider — typically $250–500/year. Your data stays in your own account.
          </p>
          {/* NOTE: Superset add-on has its own annual price (~₹48,000/yr) — omitted until verified. */}
          <p className="feat-note">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 20h8M12 18v2" /></svg>
            Use Dalgo's built-in visualisation and reporting, or bring the BI tool your team already knows — Power BI or Superset.
          </p>
        </div>
      </div>
    </section>
  );
};

// Section 4 — What you get, and how we work together (replaces the old cost-driver section).
const HowWeWork = () => {
  // NOTE: engagement-area tags — verify verbatim against consulting blog terminology (BM-254).
  const steps = [
    { n: '1', title: 'Understand', value: 'We map where your data lives and what your team needs.',
      tags: ['Data Lifecycle Audit', 'Data strategy & maturity mapping', 'MEL systems design'] },
    { n: '2', title: 'Automate', value: 'Pipelines run, dashboards go live, reports build themselves.',
      tags: ['Integration & setup', 'Pipeline automation', 'Dashboard build'] },
    { n: '3', title: 'Learn, act, share', value: "Reviews grounded in data. Funder reports ready before they're asked for.",
      tags: ['Training & enablement', 'Ongoing support', 'Community'] },
  ];
  return (
    <section className="hww-section" id="how-we-work">
      <div className="container">
        <div className="section-head section-head-center">
          <h2 className="section-title">What you get, and how we <span className="hl-underline">work together</span></h2>
          <p className="section-sub" style={{ maxWidth: 640, margin: '12px auto 0' }}>Value and the work we do alongside your team — from first audit to funder-ready reporting.</p>
        </div>
        <div className="hww-grid">
          {steps.map((s) => (
            <article className="hww-card" key={s.n}>
              <span className="hww-badge">{s.n}</span>
              <h3 className="hww-title">{s.title}</h3>
              <p className="hww-value">{s.value}</p>
              <div className="hww-tags">
                {s.tags.map((t, i) => <span className="hww-tag" key={i}>{t}</span>)}
              </div>
            </article>
          ))}
        </div>
        <p className="hww-never">Never per-user, per-source, or per-row.</p>
      </div>
    </section>
  );
};

// Section 5 — Not sure which plan fits? (pro bono escape hatch — appears exactly once)
const ProBonoBand = () => (
  <section className="probono-band" id="pro-bono">
    <div className="container probono-inner">
      <div className="probono-copy">
        <h2 className="probono-h">Not sure which plan fits?</h2>
        <p className="probono-sub">Apply for Pro Bono Data Consulting — we'll look at your data setup together and recommend the right path, no strings attached.</p>
      </div>
      {/* NOTE: Pro Bono form URL confirmed current (July 2026). */}
      <a className="cmh-btn cmh-btn-primary probono-cta" href="https://forms.gle/envgKD2VeRq3Un5y6" target="_blank" rel="noopener">
        Apply for Pro Bono Consulting
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
      </a>
    </div>
  </section>
);

// Section 6 — Social proof at the decision point (verified STiR quote, verbatim)
const PricingProof = () => (
  <section className="pproof-section">
    <div className="container">
      <article className="pproof-card">
        <div className="pproof-main">
          <span className="pproof-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="pproof-quote">
            Irrespective of the questions that come our way — whether from donors or the government — we're now able to focus much more on <mark className="pproof-hl">building the story</mark>, rather than spending time working on the data to build that story.
          </blockquote>
          <div className="pproof-attr">
            <span className="pproof-name">Arun Maruthi Selvan</span>
            <span className="pproof-role">Senior Manager, STiR Education</span>
          </div>
        </div>
        <div className="pproof-aside">
          <span className="hc-avs-stack">
            <span className="hc-avs-av" style={{ background: '#2A6FDB' }}>SN</span>
            <span className="hc-avs-av" style={{ background: '#C4703A' }}>MD</span>
            <span className="hc-avs-av" style={{ background: '#0F5C52' }}>SR</span>
            <span className="hc-avs-av" style={{ background: '#6D4FC4' }}>ST</span>
          </span>
          <span className="pproof-trust">Trusted by 25+ nonprofits</span>
        </div>
      </article>
    </div>
  </section>
);

// Section 7 — How does pricing work? (kept, tightened, positively framed)
const PricingFAQ = () => (
  <section className="pricing-explainer" id="how-pricing-works">
    <div className="container">
      <div className="pricing-faq">
        <h2 className="pfaq-q">How does pricing work?</h2>
        <p className="pfaq-a">Dalgo is free to host — it's open source. Choose managed hosting for one flat annual fee that covers your whole team and every data source, and add consulting time whenever you want hands-on help. You always keep your data in your own warehouse.</p>
        <p className="pricing-region-note">Pricing shown is for India. For global pricing, <a href="contact.html">contact us</a>.</p>
      </div>
    </div>
  </section>
);

window.PricingHero = PricingHero;
window.PricingPlans = PricingPlans;
window.FeatureGrid = FeatureGrid;
window.HowWeWork = HowWeWork;
window.ProBonoBand = ProBonoBand;
window.PricingProof = PricingProof;
window.PricingFAQ = PricingFAQ;
