// ===== Consulting packages, region-priced =====
//
// SOURCE: the consulting one-pagers in the "Consulting offerings" Drive folder —
// consulting_inr.pdf and consulting_usd.pdf (both 23 Sep 2026). Offering names, descriptions
// and every figure below are taken from those sheets verbatim. This is the doc the page header
// of PageConsulting.jsx has been waiting on since BM-285 ("REPLACE-WITH-SOURCE-DOC … offering
// detail … once the correct docs are supplied"), so the seven generic offer cards it shipped in
// the meantime are replaced by the real priced packages.
//
// A THIRD PRICE SHEET EXISTS and is deliberately not wired up: consulting_global_north.pdf, a
// flat 1.25x uplift on the USD sheet ($900 diagnosis, $3,125 audit, $4,375 journey). The brief
// asked for an India vs Global toggle, two options, so Global here means the USD sheet. Adding
// Global North is a third entry in CONSULTING_REGIONS and a third price key per row — nothing
// structural — but it is Stuti's call whether it belongs on a public page at all.
//
// STRUCTURE follows the dbt pricing page the brief pointed at: priced cards carry just enough
// to choose, and the full detail sits in one comparison table underneath rather than being
// spread across every card. The table is what makes the bundles legible — a reader can see
// exactly which modules Data Lifecycle Audit and Data Confidence Journey each contain, which is
// the one thing the PDFs state in prose ("combines the first three modules") and never show.

const CONSULTING_REGIONS = {
  india: { label: 'Based in India', note: 'Prices in INR, excluding taxes.' },
  global: { label: 'Based outside India', note: 'Prices in USD, excluding taxes.' }
};

// The three standalone services. `from` marks an opening price rather than a fixed one —
// the sheets write "From ₹1,00,000" for two of the three and a flat figure for the first.
const CONSULTING_SERVICES = [
  {
    key: 'diagnosis',
    name: 'Data Lifecycle Diagnosis',
    tagline: 'Find out where your data actually stands.',
    blurb: 'A 3–4 week review of how data moves from collection to reporting. Identify gaps, clarify priorities and leave with a practical roadmap.',
    includes: ['Discovery sessions', 'Data-flow mapping', 'Tool recommendations', 'Practical roadmap'],
    caveat: 'Advisory only; no build.',
    from: false,
    price: { india: '₹50,000', global: '$700' }
  },
  {
    key: 'ai',
    name: 'AI Adoption and Implementation',
    tagline: 'Put AI to work where it actually saves time.',
    blurb: 'Assess AI readiness and identify where AI can save time or improve insight, then build practical workflows using your existing AI licence.',
    includes: ['Predictive analytics', 'Document processing', 'Agentic workflows', 'Documentation and team handover'],
    caveat: 'Uses your existing AI licence.',
    from: true,
    price: { india: '₹1,00,000', global: '$1,400' }
  },
  {
    key: 'capacity',
    name: 'Capacity Building',
    tagline: 'Leave your team able to run it themselves.',
    blurb: "Build your team's confidence with practical training on your tools, data management and visualisation.",
    includes: ['Guided learning', 'Implementation reviews', 'Workshops or webinars'],
    caveat: 'Scoped to your tools and team.',
    from: true,
    price: { india: '₹1,00,000', global: '$1,400' }
  }
];

// The five implementation modules, in the sheets' own order — which matters, because the Audit
// bundle is defined as "the first three".
const CONSULTING_MODULES = [
  { name: 'M&E Framework Gap', what: 'Align indicators and reporting.', price: { india: '₹20,000', global: '$800' }, audit: true, journey: true },
  { name: 'Data Collection Design', what: 'Improve tools, surveys and processes.', price: { india: '₹50,000', global: '$1,000' }, audit: true, journey: true },
  { name: 'Data Automation', what: 'Clean and analyse data for a priority use case.', price: { india: '₹65,000', global: '$1,000' }, audit: true, journey: true },
  { name: 'Programme & Donor Dashboards', what: 'Track KPIs and communicate progress for a single use case.', price: { india: '₹50,000', global: '$1,000' }, audit: false, journey: true },
  { name: 'Proposal Writing', what: 'Support for tech adoption and grant budgets.', price: { india: '₹12,000', global: '$800' }, audit: false, journey: true }
];

const CONSULTING_BUNDLES = [
  { key: 'audit', name: 'Data Lifecycle Audit', blurb: 'The first three modules — framework, collection and automation — as one engagement.', price: { india: '₹1,00,000', global: '$2,500' } },
  { key: 'journey', name: 'Data Confidence Journey', blurb: 'All five modules, from indicator design through to dashboards and proposal support.', price: { india: '₹1,50,000', global: '$3,500' } }
];

// Sum of the individual module prices, so the saving a bundle represents is shown rather than
// asserted. Parsed from the same strings the table prints, so the two can never disagree.
function sumModules(keys, region) {
  let total = 0;
  CONSULTING_MODULES.forEach(function (m, i) {
    if (keys.indexOf(i) === -1) return;
    total += Number(String(m.price[region]).replace(/[^0-9]/g, ''));
  });
  return total;
}
function fmtMoney(n, region) {
  if (region === 'india') return '₹' + n.toLocaleString('en-IN');
  return '$' + n.toLocaleString('en-US');
}

const PkgCheck = () => (
  <span className="plan-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg></span>
);

const ConsultingPackages = () => {
  const [region, setRegion] = React.useState('india');
  const r = CONSULTING_REGIONS[region];
  const auditIdx = [0, 1, 2];
  const journeyIdx = [0, 1, 2, 3, 4];
  const bundleSaving = {
    audit: sumModules(auditIdx, region) - Number(String(CONSULTING_BUNDLES[0].price[region]).replace(/[^0-9]/g, '')),
    journey: sumModules(journeyIdx, region) - Number(String(CONSULTING_BUNDLES[1].price[region]).replace(/[^0-9]/g, ''))
  };

  return (
    <React.Fragment>
      {/* ---- Services + bundles, priced ---- */}
      <section className="pg-section" id="packages">
        <div className="container">
          <div className="section-head section-head-center">
            <p className="pg-eyebrow">Consulting packages</p>
            <h2 className="section-title">Start with the package you <span className="hl-underline">need</span></h2>
            <p className="section-sub se-sub">Prove its value, then expand when it makes sense. Every engagement is scoped with you before any work begins.</p>
          </div>

          {/* Same control as /pricing — one region toggle pattern on the site, not two. */}
          <div className="pricing-region-toggle" role="group" aria-label="Pricing region">
            {Object.keys(CONSULTING_REGIONS).map(function (key) {
              return (
                <button key={key} type="button"
                        className={'pr-toggle-btn' + (region === key ? ' is-active' : '')}
                        aria-pressed={region === key}
                        onClick={function () { setRegion(key); }}>
                  {CONSULTING_REGIONS[key].label}
                </button>
              );
            })}
          </div>

          <h3 className="cpk-grouph">Consulting services</h3>
          <div className="pricing-grid cpk-grid-three">
            {CONSULTING_SERVICES.map(function (s) {
              return (
                <article className="plan-card" key={s.key}>
                  <div className="plan-head">
                    <h4 className="plan-name">{s.name}</h4>
                    <p className="plan-tagline">{s.tagline}</p>
                  </div>
                  <div className="plan-priceblock">
                    <div className="plan-price">
                      {s.from && <span className="plan-from">from</span>}
                      <span className="plan-amt">{s.price[region]}</span>
                    </div>
                    <div className="plan-note">{s.caveat}</div>
                  </div>
                  <p className="cpk-blurb">{s.blurb}</p>
                  <div className="plan-includes">
                    <div className="plan-includes-h">Includes</div>
                    <ul className="plan-features">
                      {s.includes.map(function (i) { return <li key={i}><PkgCheck />{i}</li>; })}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <h3 className="cpk-grouph">Data lifecycle implementation</h3>
          <p className="cpk-groupsub">Build the data systems your team needs. Take a single module, or a bundle that combines them.</p>
          <div className="pricing-grid pricing-grid-two">
            {CONSULTING_BUNDLES.map(function (b) {
              const saving = bundleSaving[b.key];
              return (
                <article className={'plan-card' + (b.key === 'journey' ? ' plan-card-accent' : '')} key={b.key}>
                  {b.key === 'journey' && <span className="plan-tag">Most complete</span>}
                  <div className="plan-head">
                    <h4 className="plan-name">{b.name}</h4>
                    <p className="plan-tagline">{b.blurb}</p>
                  </div>
                  <div className="plan-priceblock">
                    <div className="plan-price"><span className="plan-amt">{b.price[region]}</span></div>
                    {/* Computed from the module prices in the table below, never typed twice. */}
                    {saving > 0 && <div className="plan-note">{fmtMoney(saving, region)} less than the modules bought separately</div>}
                  </div>
                  <div className="plan-includes">
                    <div className="plan-includes-h">Modules included</div>
                    <ul className="plan-features">
                      {CONSULTING_MODULES.filter(function (m) { return b.key === 'audit' ? m.audit : m.journey; })
                        .map(function (m) { return <li key={m.name}><PkgCheck />{m.name}</li>; })}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Carried over from the section this replaces — the only offering there that was
              real rather than placeholder copy. A strip, not an eighth card, because it is a
              different kind of thing: free, and a conversation rather than a package. */}
          <div className="cpk-probono">
            <div>
              <p className="cpk-probono-t">Pro bono consulting</p>
              <p className="cpk-probono-p">For eligible nonprofits — a complimentary one-hour discovery session to map your data challenges and the right next steps.</p>
            </div>
            <a className="btn btn-primary" href={window.SITE_CONFIG.CONSULT_FORM} target="_blank"
               rel={window.relForHref(window.SITE_CONFIG.CONSULT_FORM)} data-cta-location="consulting_probono">Book Free Consultation</a>
          </div>
        </div>
      </section>

      {/* ---- The comparison table: the detail, in one place ---- */}
      <section className="pg-section alt" id="compare">
        <div className="container">
          <div className="section-head section-head-center">
            <h2 className="section-title">Compare the <span className="hl-underline">modules</span></h2>
            <p className="section-sub se-sub">Every module can be bought on its own. The two bundles combine them at a lower total.</p>
          </div>
          <div className="cpk-tablewrap">
            <table className="cpk-table">
              <caption className="cpk-caption">Implementation modules and the bundles that include them. {r.note}</caption>
              <thead>
                <tr>
                  <th scope="col">Module</th>
                  <th scope="col">What you get</th>
                  <th scope="col" className="cpk-num">On its own</th>
                  <th scope="col" className="cpk-num">Data Lifecycle Audit</th>
                  <th scope="col" className="cpk-num">Data Confidence Journey</th>
                </tr>
              </thead>
              <tbody>
                {CONSULTING_MODULES.map(function (m) {
                  return (
                    <tr key={m.name}>
                      <th scope="row">{m.name}</th>
                      <td>{m.what}</td>
                      <td className="cpk-num">{m.price[region]}</td>
                      {/* A tick is decorative; the word is what a screen reader should hear. */}
                      <td className="cpk-num">{m.audit
                        ? <React.Fragment><span className="cpk-tick" aria-hidden="true">✓</span><span className="x-sr">Included</span></React.Fragment>
                        : <React.Fragment><span className="cpk-dash" aria-hidden="true">—</span><span className="x-sr">Not included</span></React.Fragment>}</td>
                      <td className="cpk-num">{m.journey
                        ? <React.Fragment><span className="cpk-tick" aria-hidden="true">✓</span><span className="x-sr">Included</span></React.Fragment>
                        : <React.Fragment><span className="cpk-dash" aria-hidden="true">—</span><span className="x-sr">Not included</span></React.Fragment>}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total</th>
                  <td>Bundle price against the same modules bought separately</td>
                  <td className="cpk-num">—</td>
                  <td className="cpk-num"><strong>{CONSULTING_BUNDLES[0].price[region]}</strong><span className="cpk-was">{fmtMoney(sumModules(auditIdx, region), region)} separately</span></td>
                  <td className="cpk-num"><strong>{CONSULTING_BUNDLES[1].price[region]}</strong><span className="cpk-was">{fmtMoney(sumModules(journeyIdx, region), region)} separately</span></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="cpk-foot">
            {r.note} Not sure which fits?{' '}
            <a href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel={window.relForHref(window.SITE_CONFIG.CONSULT_FORM)} data-cta-location="consulting_packages_help">Book a free consultation</a>{' '}
            and we will scope it with you.
          </p>
        </div>
      </section>
    </React.Fragment>
  );
};

window.CONSULTING_REGIONS = CONSULTING_REGIONS;
window.CONSULTING_SERVICES = CONSULTING_SERVICES;
window.CONSULTING_MODULES = CONSULTING_MODULES;
window.CONSULTING_BUNDLES = CONSULTING_BUNDLES;
window.ConsultingPackages = ConsultingPackages;
