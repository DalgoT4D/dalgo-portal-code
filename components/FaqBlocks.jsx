// FaqBlocks — single source for the sitewide FAQ set (Pratiksha's doc, 25 Jul).
// QUESTIONS ARE FINAL — exact wording, never paraphrase or fork. Contextual blocks
// reference the same strings by [group, question] index, so they can never drift.
// ANSWERS ARE UNDER REVIEW: every panel renders the pending state. To publish an
// approved answer, paste it into window.FAQ_ANSWERS keyed by the exact question
// string — no structural rework needed. Then un-comment the JSON-LD scaffold in faq.html.
const FAQ_DATA = [
  { g: 'Understanding Dalgo', qs: [
    'What is Dalgo?',
    'Who is Dalgo built for?',
    'Who is Dalgo not built for?',
    'What problems does Dalgo solve?',
    'Why Dalgo?',
    'What can we use Dalgo for?',
    'What results have similar organisations achieved with Dalgo?',
  ]},
  { g: 'What Dalgo can do', qs: [
    'Can Dalgo integrate with our existing tools?',
    'Does Dalgo collect data, or only work with existing data?',
    'How does Dalgo create a single source of truth?',
    'Can Dalgo connect programme data, beneficiary data, and outcomes in one place?',
    'Can Dalgo support multiple programmes, partners, or geographies from one platform?',
    'Can different teams have different dashboards, reports, and access permissions?',
    'Do we need to know SQL to use Dalgo?',
    'Can Dalgo create real-time dashboards?',
    'Can non-technical teams build or customize dashboards?',
    'Can Dalgo automate reporting workflows?',
    'Can Dalgo improve data quality?',
    'Can Dalgo clean and standardise historical data?',
    'Can Dalgo support Monitoring, Evaluation, and Learning (MEL/M&E)?',
    'Can Dalgo monitor KPIs and send alerts?',
    'Does Dalgo support AI-powered insights?',
    'Will Dalgo scale as our organisation grows?',
  ]},
  { g: 'Getting started and implementation', qs: [
    'Can we try Dalgo before committing?',
    'Can we get a POC or pilot?',
    'What happens during a POC or pilot?',
    'When is a Proof of Concept free or paid?',
    'What does implementation actually look like?',
    'Which warehouses does Dalgo support?',
    'Should we choose BigQuery or RDS PostgreSQL?',
    'What are the minimum warehouse specifications for Dalgo?',
    'Should we host PostgreSQL on AWS or Azure?',
    'How long does onboarding typically take?',
    'How much time and effort is needed from our team?',
    'Can Dalgo work with our existing dashboards and reporting stack?',
  ]},
  { g: 'Security, data, and trust', qs: [
    'Who owns the data?',
    'Where is our data hosted?',
    'Can Dalgo be self-hosted?',
    "Is Dalgo compliant with India's Digital Personal Data Protection Act (DPDP)?",
    'How does Dalgo protect privacy and sensitive data?',
  ]},
  { g: 'Pricing, support, and consulting', qs: [
    'How is Dalgo priced?',
    'What is included in pricing, and what is not?',
    'What does self-hosting cost?',
    'What support is included?',
    'What support is not included?',
    'Is training included?',
    'Do you provide consulting and implementation support, not just software?',
    'Can you help us define our data strategy?',
    'Can you help us choose the right data-collection tools?',
  ]},
  { g: 'Comparing Dalgo with other tools', qs: [
    'How is Dalgo different from Power BI, Tableau, or Looker Studio?',
    'Can we use Dalgo alongside Power BI, Tableau, Looker Studio, or another BI tool?',
    'When does it make sense to use Dalgo instead of spreadsheets?',
    'Can Dalgo work with our existing technology stack?',
    'When should we choose Dalgo rather than build a custom data platform?',
    'Is Dalgo only for large, mature nonprofits?',
  ]},
];
// Approved answers land here, keyed by the exact question string. Empty until review completes.
window.FAQ_ANSWERS = {};
// Contextual subsets as [groupIndex, questionIndex] — same strings, never forked.
const FAQ_MINI = {
  home: [[0, 0], [0, 1], [0, 3], [0, 4]],
  product: [[1, 0], [1, 6], [1, 8], [1, 12], [1, 14], [1, 15]],
  consulting: [[4, 6], [2, 4], [2, 10], [4, 7], [4, 5]],
  impact: [[0, 6], [5, 5]],
  pricing: [[4, 0], [4, 1], [2, 0], [4, 2], [4, 3]],
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
          ? <div className="faq-a"><p>{ans}</p></div>
          : <div className="faq-a" dangerouslySetInnerHTML={{ __html: PENDING_HTML }}></div>}
      </div>
    </div>
  );
};
const FaqMaster = () => {
  const [openG, setOpenG] = React.useState(0);
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
        <div className="section-head section-head-center" style={{ marginBottom: 36 }}>
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
      <a className="btn btn-ghost" href="contact.html">Contact Us</a>
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
