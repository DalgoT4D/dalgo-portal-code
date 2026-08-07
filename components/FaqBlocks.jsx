// FaqBlocks — single source for the sitewide FAQ set.
// SOURCE: the "Improved FAQs" set in the Dalgo FAQ doc (1syvEcKGcced…, read 6 Aug 2026).
// QUESTIONS ARE FINAL — exact wording, never paraphrase or fork. Contextual blocks
// reference the same strings by [group, question] index, so they can never drift.
//
// SCOPE RULES APPLIED WHEN THIS SET WAS TRANSCRIBED (Stuti, 6 Aug 2026):
//   - Every question carrying a reviewer comment anchor in the doc is OUT OF SCOPE and
//     is not published here: "Can we try Dalgo or run a pilot before committing?"
//     (also removed by explicit instruction), "Who owns the data?", "Where is our data
//     hosted?", and "How is Dalgo different from Power BI, Tableau, or Looker Studio?".
//   - "How is Dalgo priced?" IS published, but its answer is written from the pricing
//     page (the 1 Aug 2026 sheet), not the doc — the doc's figures were superseded and
//     its body still held an unfinished editorial note. Guarded by faq-schema.mjs.
//   - Two answers deviate from the doc to satisfy non-negotiable ground truth:
//     (a) "unlimited users" is a banned claim → "no per-user fees";
//     (b) the DPDP answer must name the Pacta audit.
//   All three are marked inline below.
//
// The FAQPage JSON-LD in faq.html is GENERATED from this file by scripts/faq-schema.mjs —
// run it after any edit here, or the structured data silently drifts from the page.
const FAQ_DATA = [
  { g: 'Dalgo', qs: [
    'What is Dalgo?',
    'Is Dalgo right for my organisation?',
  ]},
  { g: 'The platform', qs: [
    'How does Dalgo work with our existing data and tools?',
    'What can teams do with Dalgo?',
    'Can different teams use it, even without technical skills?',
    'How does Dalgo keep data current, reliable, and useful over time?',
    'Will Dalgo scale with my organisation?',
    "Can we self-host Dalgo's data platform?",
  ]},
  { g: 'Getting started and services', qs: [
    'What does implementation with the Dalgo team look like, and how much will you need from our team?',
    'Can Dalgo help with strategy, implementation, data collection, and training?',
  ]},
  { g: 'Security, data, and trust', qs: [
    "Is Dalgo compliant with India's DPDP Act?",
    'How does Dalgo protect sensitive data?',
  ]},
  { g: 'Pricing and support', qs: [
    'How is Dalgo priced?',
    'What is included in the SaaS price?',
    'What is not included in the SaaS price?',
    'What support is included?',
    'What support is not included?',
  ]},
  { g: 'Comparing Dalgo with other tools', qs: [
    'Can we use Dalgo alongside another BI tool?',
    'When does Dalgo make more sense than spreadsheets?',
    'When should we choose Dalgo instead of building a custom data platform?',
  ]},
];
// Answers keyed by the exact question string, transcribed from the "Improved FAQs" doc.
window.FAQ_ANSWERS = {
  'What is Dalgo?': `<p>Dalgo helps nonprofits build better data systems so they can make better decisions. We combine open-source technology with hands-on consulting to help organisations collect, manage, analyse, and use data more effectively across their programmes.</p><p>The platform connects data from existing tools, creates a dependable data foundation, and turns it into dashboards, reports, alerts, and actionable insights. Our team helps you define indicators, improve data-collection processes, design data architecture, implement required solutions on Dalgo, and build a strong internal data culture.</p>`,

  'Is Dalgo right for my organisation?': `<p>Dalgo is for organisations that want to use programme, beneficiary, operational, fundraising, or outcome data more effectively &mdash; especially M&amp;E/MEL, programme, operations, leadership, and data teams.</p><p>The platform is for you if data is fragmented, reporting is manual, definitions differ between teams, dashboards are slow or untrusted, or leaders lack a clear view across programmes, partners, or geographies. Organisations have used Dalgo to automate consolidation, improve timely access to information, and build role-specific reporting.</p><p>You do not need a large data-engineering team: a small organisation can start with one high-value workflow. Dalgo may be less suitable for organisations with mature, fully custom data systems and large in-house engineering teams. It does not replace field-data-collection, case-management, finance, or CRM systems; it connects and makes sense of data from them.</p><p>If you're just beginning your data journey, our consulting team can assess your current data lifecycle, identify gaps and opportunities, and develop a practical roadmap tailored to your organisation's goals.</p>`,

  'How does Dalgo work with our existing data and tools?': `<p>Dalgo fits around the tools you already use &mdash; you don't need to replace anything. It connects to 600+ sources like KoboToolbox, CommCare, Avni, Google Sheets, Salesforce, and Zoho (and we can build a custom connector if you need one), and pulls that data into one place you control.</p><p>From there, Dalgo makes the data ready to act on: cleaned, joined, and calculated with consistent rules, so your team works from one trusted set of numbers. You can view it in Dalgo's own dashboards and reports, or keep using the BI tools you already have &mdash; Power BI, Tableau, Looker Studio.</p><p>Dalgo doesn't collect data in the field. It works with data from the systems you already trust, and turns it into reporting and insight you can rely on.</p>`,

  'What can teams do with Dalgo?': `<p>Teams use Dalgo for programme and M&amp;E dashboards, operational monitoring, beneficiary and service-delivery analysis, donor and CSR reporting, board packs, data-quality checks, portfolio views, partner reporting, and recurring reviews.</p><p>Dalgo can connect programme, beneficiary, service-delivery, and outcome data where suitable identifiers and privacy boundaries exist. It can provide portfolio-level and programme-, geography-, partner-, or team-specific views.</p><p>It supports input, outcome, and impact KPIs; live dashboards; fixed reports for quarterly or annual reviews; PDF exports; sharing by link or email; and email or Slack alerts when metrics, thresholds, or data-quality checks need attention. Explore our <a href="https://docs.dalgo.org/intro/" target="_blank" rel="noopener">documentation</a> to learn more about its capabilities in detail.</p>`,

  'Can different teams use it, even without technical skills?': `<p>Yes. Dalgo supports click-to-create dashboards for field teams, programme managers, M&amp;E teams, leadership, and donors. Administrators manage the platform, analysts create and edit analytical assets, and members have read-only access to shared information.</p><p>Non-technical users can create charts, arrange dashboards, apply filters, and create reports. UI4T supports common data-preparation tasks without SQL; SQL-based transformations are available for advanced work.</p>`,

  'How does Dalgo keep data current, reliable, and useful over time?': `<p>Dalgo can schedule data syncs and transformations, from multiple refreshes per day to monthly updates. It standardises and validates data during transformation, uses dbt tests, surfaces test results, model history, and freshness, row-count, or column-value anomalies.</p><p>Historical data can be cleaned, mapped to shared definitions, and loaded alongside current data. The scope depends on the volume, consistency, documentation, and reporting questions involved.</p><p>Dalgo also provides the governed, reliable data foundation needed for AI workflows. Availability and data-governance requirements are confirmed per organisation.</p>`,

  'Will Dalgo scale with my organisation?': `<p>Dalgo runs on Kubernetes and can grow with your data sources, programmes, users, and reporting needs. There are no artificial limits on users, pipelines, dashboards, charts, or other core assets; SaaS pricing stays flat whether you have 5 users or 500, or process 1 GB or 500 GB of data a day.</p>`,

  "Can we self-host Dalgo's data platform?": `<p>Dalgo is an open-source <a href="https://www.digitalpublicgoods.net/r/dalgo" target="_blank" rel="noopener">Digital Public Good</a> and can be self-hosted using the <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener">public GitHub code</a> and instructions. Self-hosting has no SaaS licence fee, though you remain responsible for infrastructure, security, monitoring, and upgrades; Dalgo support can be scoped separately.</p>`,

  'What does implementation with the Dalgo team look like, and how much will you need from our team?': `<p>Implementation usually follows five steps:</p><ol><li><strong>Discovery:</strong> Agree decisions, reports, users, indicators, sources, and privacy requirements.</li><li><strong>Data foundation:</strong> Connect selected sources and understand data structure, history, and quality.</li><li><strong>Transformation and quality:</strong> Clean, join, standardise, test, and document the required data.</li><li><strong>Insights and reporting:</strong> Build metrics, dashboards, reports, alerts, and sharing workflows.</li><li><strong>Validation and handover:</strong> Validate numbers, train users, document ownership, and establish support and improvement rhythms.</li></ol><p>We start small enough to create early value, then expand in a controlled way.</p><p>Duration depends on source complexity, data readiness, reporting needs, historical data, and team availability. During discovery, we provide a realistic phased plan with milestones, dependencies, and the time required from both teams.</p><p>Your team's input and engagement is essential, particularly at the beginning. We need people who understand the programme, data collection, metric definitions, reporting expectations, and access approvals. Outcomes are strongest when programme, M&amp;E, operations, and leadership teams participate actively.</p>`,

  'Can Dalgo help with strategy, implementation, data collection, and training?': `<p>Yes. Dalgo can help define data questions and metrics, identify priority decisions and stakeholders, assess data gaps, design data architecture, build and validate pipelines, create dashboards and reports, and help train internal data culture.</p><p>We can assess existing data-collection tools and workflows, identify gaps, recommend an approach suited to your programme and field conditions, and support audits, process design, and training. The right answer may be improving an existing tool, introducing a new one, or connecting several systems through Dalgo.</p><p>Training is available as a separate consulting offering or can be included in implementation. It can be tailored for dashboard users, M&amp;E and programme teams, analysts, administrators, and technical partners, and is most effective when it supports real workflows such as review meetings, donor reporting, or data-quality follow-up.</p>`,

  // GROUND-TRUTH: the mandated DPDP wording names the independent Pacta audit and the
  // Data Fiduciary split. The doc answer omitted "Pacta"; it is restored here.
  "Is Dalgo compliant with India's DPDP Act?": `<p>Yes. Dalgo is DPDP-compliant as a Data Processor, independently audited by Pacta, under India's Digital Personal Data Protection Act, 2023.</p><p>As Data Fiduciary, your organisation remains responsible for collection practices, data classification, access decisions, retention, and sharing. We support appropriate data minimisation, access, consent, retention, and governance practices.</p>`,

  'How does Dalgo protect sensitive data?': `<p>Access can be managed by role, sensitive datasets can be restricted, reports can be shared deliberately, and dashboards can use appropriate levels of aggregation. Security, data-residency, audit, and contractual requirements should be raised early so they can be assessed before data is connected.</p>`,

  // FIGURES COME FROM THE PRICING PAGE, NOT THE FAQ DOC. components/PagePricing.jsx holds the
  // 1 Aug 2026 pricing sheet, which supersedes the doc's US$3,600/US$300 and US$25/hr. The doc's
  // unfinished "Add Dalgo Consulting price as well. <Link Pricing Page Here>" note is resolved here.
  // scripts/faq-schema.mjs asserts every figure below still matches window.PRICING_REGIONS.
  'How is Dalgo priced?': `<p>Dalgo SaaS costs <strong>&#8377;2.04 lakh per organisation per year</strong>, or <strong>&#8377;17,000 per month</strong>, in India. For nonprofits based outside India it is <strong>US$3,000 per year</strong> or <strong>US$250 per month</strong>. This is a flat organisation-level price, not a per-user or per-pipeline charge.</p><p>Consulting and implementation are priced separately, from <strong>&#8377;2,500 per hour</strong> in India or <strong>US$35 per hour</strong> internationally. Your warehouse is your own cloud infrastructure and is billed by your cloud provider. See the <a href="pricing.html">pricing page</a> for what to plan for.</p>`,

  // GROUND-TRUTH: "unlimited users" is a banned claim — say flat pricing with no per-user fees.
  'What is included in the SaaS price?': `<p>Dalgo has a flat pricing structure: your subscription covers all features and unlimited usage, with no per-user fees. See the <a href="pricing.html">pricing page</a> for current rates.</p>`,

  'What is not included in the SaaS price?': `<p>Hosted Superset (an alternative to Dalgo dashboards), consulting services for implementation, bespoke data work, training, and strategy. Your warehouse is your own cloud infrastructure and is billed by your cloud provider.</p>`,

  'What support is included?': `<p>Platform support is included. We help resolve failing pipelines and other platform-level issues, and provide guidance when your team needs help using the product or deciding the next step.</p>`,

  'What support is not included?': `<p>Unless included in your agreement, support does not cover bespoke data modelling, new connectors, historical-data remediation, source-system data-entry corrections, major dashboard redesigns, or organisation-wide strategy work. These are scoped separately.</p>`,

  'Can we use Dalgo alongside another BI tool?': `<p>Yes. Dalgo can supply cleaned, modelled, refreshed warehouse data to Power BI, Tableau, Looker Studio, or another visualisation tool, while reducing manual exports, duplicated calculations, and inconsistent source files.</p>`,

  'When does Dalgo make more sense than spreadsheets?': `<p>Spreadsheets are useful for lightweight analysis, planning, and small ad hoc work. Dalgo becomes valuable when recurring reporting uses multiple sources, data needs regular cleaning or joining, several teams need the same numbers, data volumes are growing, or manual work becomes slow and error-prone.</p><p>You do not need to eliminate spreadsheets; the aim is to stop using them as the fragile, manual backbone of organisation-wide reporting.</p>`,

  'When should we choose Dalgo instead of building a custom data platform?': `<p>Dalgo is a strong option when you need a reliable, nonprofit-oriented data foundation without taking on the full cost and maintenance burden of a custom platform.</p><p>A custom platform may make sense for unusually specialised requirements, a large in-house engineering team, or non-standard operational constraints. We can help assess the trade-offs.</p>`,
};
// Contextual subsets as [groupIndex, questionIndex] — same strings, never forked.
const FAQ_MINI = {
  home:       [[0, 0], [0, 1], [1, 0], [4, 0]],
  product:    [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5]],
  consulting: [[2, 0], [2, 1]],
  impact:     [[0, 1], [5, 2]],
  pricing:    [[4, 0], [4, 1], [4, 2], [4, 3], [4, 4]],
};
const PENDING_HTML = '<!-- ANSWER-PENDING-REVIEW: paste approved answer here --><p class="faq-a-pending">Answer coming soon.</p>';
const FaqItem = ({ q, id }) => {
  const [open, setOpen] = React.useState(false);
  const ans = window.FAQ_ANSWERS[q];
  return (
    <div className={'faq-item' + (open ? ' open' : '')}>
      <button type="button" className="faq-q" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></span>
      </button>
      <div className="faq-a-wrap" id={id}>
        {ans
          ? <div className="faq-a" dangerouslySetInnerHTML={{ __html: ans }}></div>
          : <div className="faq-a" dangerouslySetInnerHTML={{ __html: PENDING_HTML }}></div>}
      </div>
    </div>
  );
};
const FaqMaster = () => {
  const [openG, setOpenG] = React.useState(-1); // all groups closed by default (composition principles)
  return (
    <section className="faq-section" data-screen-label="FAQ — all groups">
      <div className="faq-wrap">
        <div className="faq-list">
          {FAQ_DATA.map((grp, gi) => {
            const open = openG === gi;
            return (
              <div key={grp.g} className={'faqg' + (open ? ' open' : '')}>
                <h2 className="faqg-h">
                  <button type="button" className="faqg-btn" aria-expanded={open} aria-controls={'faqg-' + gi} onClick={() => setOpenG(open ? -1 : gi)}>
                    <span>{grp.g}</span>
                    <span className="faqg-n">{grp.qs.length}</span>
                    <span className="faq-q-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg></span>
                  </button>
                </h2>
                <div className="faqg-body" id={'faqg-' + gi} hidden={!open}>
                  <div className="faq-list">
                    {grp.qs.map((q, qi) => <FaqItem key={q} q={q} id={'faq-' + gi + '-' + qi} />)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
const FaqMini = ({ page }) => {
  const refs = FAQ_MINI[page] || [];
  return (
    <section className="faq-section faq-mini" data-screen-label="Frequently asked questions">
      <div className="faq-wrap">
        <div className="section-head section-head-center">
          <h2 className="faq-h">Frequently asked <span className="hl-underline">questions</span></h2>
        </div>
        <div className="faq-list">
          {refs.map(([gi, qi]) => <FaqItem key={gi + '-' + qi} q={FAQ_DATA[gi].qs[qi]} id={'faqm-' + page + '-' + gi + '-' + qi} />)}
        </div>
        <p className="faq-viewall-row"><a className="btn btn-ghost" href="faq.html">View All FAQs <span aria-hidden="true">→</span></a></p>
      </div>
    </section>
  );
};
const FaqStillBand = () => (
  <section className="faq-section faq-still">
    <div className="faq-wrap faq-still-inner">
      <h2 className="faq-h">Still have a <span className="hl-underline">question</span>?</h2>
      <p>Every organisation's data landscape is different — tell us about yours and we'll answer directly.</p>
      <a className="btn btn-ghost" href={window.SITE_CONFIG.CONSULT_FORM} target="_blank" rel="noopener">Book a Free Consultation</a>
    </div>
  </section>
);
const FaqHero = () => (
  <SiteHero
    eyebrow="FAQ"
    headline={<>Frequently asked <span className="cvh-hl">questions</span></>}
    body={<>Everything you need to know about Dalgo — what it is, what it can do, implementation, trust, and pricing. Still stuck? <a href="contact.html">Contact us</a>.</>}
  />
);
Object.assign(window, { FAQ_DATA, FaqItem, FaqMaster, FaqMini, FaqStillBand, FaqHero });
