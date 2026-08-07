// "Dalgo for [category]" — pill-segmented capability selector.
// Pills swap the description, checklist, screenshot, and the per-category CTA.
const PlatformFor = () => {
  const R = (id, f) => (window.__resources && window.__resources[id]) || f;
  const cats = [
    {
      label: 'Data Integration',
      img: R('pfIntegration','assets/illus/data-pipeline.webp'),
      cap: 'Workflow — every source syncing into your own warehouse',
      desc: 'Your programs generate data in a dozen places — surveys, chatbots, spreadsheets, case-management tools. Dalgo consolidates all of it into a data warehouse that belongs to your organisation, cleaned and ready, so every review starts with numbers your team can trust.',
      checks: [
        { t: 'Custom-built connectors for the tools NGOs already use — KoboToolbox, MGrant, ODK, SurveyCTO, CommCare, Avni, Glific — plus 600+ more sources via Airbyte' },
        { t: 'Data lands in your own warehouse — it stays yours. Dalgo processes it only to run the service you signed up for.' },
        { t: 'Automated cleaning and transformation, running on a schedule with no manual crunching' },
      ],
      // CTA removed 7 Aug 2026 (Stuti) — the card explains the capability; the page CTA carries the action.
      cta: null,
    },
    {
      label: 'Dashboards & Charts',
      img: R('pfCharts','assets/illus/dashboard-charts.webp'),
      cap: 'Live dashboards and charts, built inside Dalgo',
      desc: "See what's happening across every program, region and partner in one place. Build charts and dashboards inside Dalgo — after onboarding, most teams run their day-to-day dashboards themselves, with Dalgo support behind them — and give field staff, M&E leads and leadership each the view they need.",
      checks: [
        { t: 'Native charts built into Dalgo: bar, line, pie, number, table, pivot and maps' },
        { t: 'Geospatial maps down to district and region level for field programs' },
        { t: 'Reusable KPIs and a shared metric library, so a number means the same thing everywhere' },
        { t: 'Dashboards with filters, comments and role-based views for every team' },
      ],
      cta: { label: 'View Sample Dashboard', href: 'https://insights.dalgo.org/share/dashboard/0u8iLdDWNbLo1p8Yj8oxMU7MjLkgxCRtftelFiL-Qf26SAYO4JQ6WcfuqFoeaogI', ext: true },
    },
    {
      label: 'Reports & Alerts',
      img: R('pfReports','assets/illus/reports-alert.webp'),
      cap: 'Threshold alerts on the metrics that matter',
      desc: "Reporting shouldn't mean rebuilding a deck every month. Freeze a dashboard into a dated, shareable report anyone can open from a link — and let Dalgo push the numbers that matter to the people who act on them.",
      checks: [
        { t: 'Report snapshots frozen to a reporting period, branded with your logo' },
        { t: 'Share by public link or scheduled email — no login needed' },
        { t: 'Alerts on thresholds or red/amber/green status, sent to M&E, field or external recipients' },
      ],
      cta: { label: 'View Sample Report', href: 'https://insights.dalgo.org/share/report/9f42CAPPMspNIf6p7PjEKEfmrxdgYCyxzB8gGPdgWBZSueh7PDHhAviZq5mC-3lF', ext: true },
    },
    {
      label: 'Trust & Access',
      img: null, creds: true, // BM-328: no real Trust & Access screenshot — render a credentials/badges panel instead of a placeholder
      cap: 'Notification and access controls, per teammate',
      desc: 'Data on real people needs real care. Dalgo is DPDP-compliant as a Data Processor, independently audited by Pacta. Your organisation remains the Data Fiduciary — your data stays in your own warehouse, each teammate gets exactly the access they should have, and the platform is built as an open, publicly recognised good.',
      checks: [
        { t: 'DPDP-compliant as a Data Processor; pricing that never charges per user or per row' },
        { t: 'Recognised Digital Public Good; open-source' },
        { t: 'Your data lives in your warehouse — never resold, never locked in' },
        { t: 'Role-based access with view and edit control per module' },
      ],
      cta: { label: 'Learn about DPDP compliance', href: 'https://projecttech4dev.org/dalgo-is-now-dpdp-compliant-what-does-it-mean-for-you/', ext: true },
    },
  ];

  const [i, setI] = React.useState(0);
  const c = cats[i];

  return (
    <section className="pf-section">
      <div className="container">
        <div className="pf-header">
          <p className="pf-eyebrow">Capabilities</p>
          <h2 className="pf-title">Dalgo for every part of your <span className="pf-title-hl">data workflow</span></h2>
          <p className="pf-sub">One platform for everything — from data integration to data that speaks to your impact.</p>
        </div>

        <div className="pf-card">
          <div className="pf-card-head">
            <div className="pf-pills" role="tablist" aria-label="Platform capability">
              {cats.map((x, idx) => (
                <button
                  key={x.label}
                  type="button"
                  role="tab"
                  aria-selected={idx === i}
                  className={`pf-pill ${idx === i ? 'is-active' : ''}`}
                  onClick={() => setI(idx)}
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pf-card-body">
            <div className="pf-card-left">
              <p className="pf-desc" key={`d${i}`}>{c.desc}</p>
              <ul className="pf-checks" key={`k${i}`}>
                {c.checks.map((ck, idx) => (
                  <li key={idx}>
                    <span className="pf-check-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg></span>
                    {ck.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pf-card-right">
              <figure className="pf-shot" key={`c${i}`}>
                <div className="pf-shot-frame">
                  {c.img
                    ? <img loading="lazy" src={c.img} alt={c.cap} className={c.shotMod || ''} />
                    : c.creds
                      ? <div className="pf-creds">
                          {/* Badge restored 7 Aug once assets/dpg-badge.png was replaced with the
                              correctly-encoded file (the previous copy decoded fully transparent).
                              The list line below drops back to plain text so the credential and its
                              registry link are not stated twice. */}
                          <a className="pf-cred-badge" href="https://www.digitalpublicgoods.net/r/dalgo" target="_blank" rel="noopener" aria-label="Recognised Digital Public Good — view the registry entry">
                            <img loading="lazy" src="assets/dpg-badge.png" alt="Recognised as a Digital Public Good" width="175" height="84" decoding="async" />
                          </a>
                          <ul className="pf-cred-list">
                            <li>DPDP-compliant Data Processor, independently audited by Pacta</li>
                            <li>Recognised Digital Public Good</li>
                            <li>Open-source — your data stays in your own warehouse</li>
                            <li>Role-based access, controlled per teammate</li>
                          </ul>
                        </div>
                      : <div className="pf-shot-empty" aria-hidden="true"><svg viewBox="0 0 40 40"><rect x="6" y="9" width="28" height="22" rx="3"></rect><path d="M13 17h8M13 22h14M13 27h11"></path></svg></div>}
                </div>
                <figcaption className="pf-shot-cap">
                  <span className="pf-shot-dot" aria-hidden="true"></span>
                  {c.cap}
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="pf-card-foot" key={`f${i}`}>
            {!c.cta ? null : c.cta.href ? (
              <a className="pf-cta" href={c.cta.href} target={c.cta.ext ? '_blank' : undefined} rel={c.cta.ext ? 'noopener' : undefined}>
                {c.cta.label}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            ) : (
              <span className="pf-cta-wrap">
                <button type="button" className="pf-cta pf-cta-pending" aria-disabled="true">
                  {c.cta.label}
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </button>
                <span className="pf-pending-tag">Link pending</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

window.PlatformFor = PlatformFor;
