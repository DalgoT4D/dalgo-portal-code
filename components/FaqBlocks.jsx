// FaqBlocks — single source for the sitewide FAQ set (Pratiksha's doc, 25 Jul).
// QUESTIONS ARE FINAL — exact wording, never paraphrase or fork. Contextual blocks
// reference the same strings by [group, question] index, so they can never drift.
// ANSWERS: populated 30 Jul from the approved FAQ doc, keyed by exact question string.
// 1 question is intentionally held back (RBAC/row-level-access roadmap status is unresolved
// per Stuti 31 Jul) — it still renders the pending state until resolved. See BM-127.
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
window.FAQ_ANSWERS = {
  'Can Dalgo integrate with our existing tools?': `<p>Yes. Dalgo connects out of the box with more than 600 data sources, including KoboToolbox, Google Sheets, CommCare, Avni, Salesforce, Zoho, databases, and many other systems. There is no fixed limitation on what can connect to Dalgo. If a source is not already supported, we can build a connector for its custom API or other integration method, rather than forcing you to change the tools your teams rely on.</p>`,
  'How is Dalgo priced?': `<p>Dalgo SaaS costs <strong>&#8377;2.04 lakh per organisation per year</strong>, or <strong>&#8377;17,000 per month</strong> in India. For international nonprofits, it costs <strong>US$3,000 per year</strong> or <strong>US$250 per month</strong>. This is a flat organisation-level price, not a per-user or per-pipeline charge.</p><p>All core Dalgo capabilities are included: data ingestion, transformations, pipelines, native dashboards, charts, KPIs, alerts, data quality, reporting, user access controls, and support. Consulting and implementation services are priced separately — from &#8377;2,500/hour in India or US$35/hour internationally. See the <a href="pricing.html">Dalgo pricing page</a> for details.</p>`,
  'What is Dalgo?': `<p>Dalgo is an open-source data platform built for nonprofits and social-impact organisations. It brings data from the tools you already use into one place, cleans and structures it, keeps it up to date automatically, and turns it into dashboards, reports, alerts, and actionable insights.</p>`,
  'Who is Dalgo built for?': `<p>Dalgo is for organisations that collect meaningful amounts of programme, beneficiary, operational, fundraising, or outcome data and want to use it more consistently. It is particularly useful for M&amp;E, programme, operations, leadership, and data teams that need a reliable view across multiple tools, programmes, partners, or geographies.</p><p>You do not need a large in-house data engineering team. Dalgo is designed to work for organisations that want to build internal data capability, with support available for the technical work that needs it.</p>`,
  'Who is Dalgo not built for?': `<p>Dalgo may not be the right fit if your organisation already has a large in-house engineering team and mature, custom-built data pipelines and tools that fully meet its needs. In that situation, the value of adopting another platform may be limited.</p><p>Dalgo is designed to help organisations build data maturity, whatever their starting point. Alongside the platform, our consulting work can include data-collection audits, clarifying key questions and indicators, and strengthening the processes that make better data use possible. Dalgo is not itself a replacement for a case-management system, a field data-collection app, or a finance/CRM system; it can help assess, connect, and make sense of data from those tools.</p>`,
  'What problems does Dalgo solve?': `<p>Dalgo helps solve common data challenges in the social sector:</p><ul><li>Data spread across survey tools, spreadsheets, CRMs, chatbots, and programme systems.</li><li>Repeated manual consolidation, cleaning, and calculation before every review or donor report.</li><li>Inconsistent definitions and calculations across teams.</li><li>Dashboards that are slow to update, difficult to trust, or only available to a few people.</li><li>Limited visibility across programmes, locations, partners, or beneficiary journeys.</li><li>Data teams becoming a bottleneck whenever a report or metric changes.</li></ul><p>The outcome is a more reliable single source of truth and more time for teams to review, learn, and act on data.</p>`,
  'Why Dalgo?': `<p>Dalgo combines a modern data stack with an understanding of how nonprofits work. It is open source, designed around social-impact use cases, and supported by a team that can help with data architecture, implementation, reporting, and adoption—not just software access.</p><p>Rather than asking teams to replace everything they use, Dalgo helps them connect existing systems, create a dependable data foundation, and make insights accessible to the people who need them.</p>`,
  'What can we use Dalgo for?': `<p>Common use cases include programme and M&amp;E dashboards, operational monitoring, beneficiary and service-delivery analysis, donor and CSR reporting, board packs, data-quality checks, multi-programme portfolio views, partner reporting, and recurring review processes. Dalgo can also support a broader data strategy: defining key metrics, standardising data, and building the workflows that keep those metrics current.</p>`,
  'What results have similar organisations achieved with Dalgo?': `<p>Organisations have used Dalgo to replace manual consolidation with automated data flows, give field, programme, M&amp;E, and leadership teams more timely access to information, and create role-specific dashboards and reporting processes. Results vary by starting point and implementation scope, but the aim is consistent: less time preparing data and more time using it to improve programmes and communicate impact.</p>`,
  'Does Dalgo collect data, or only work with existing data?': `<p>Dalgo primarily brings together, transforms, stores, and analyses data from existing systems. It is not itself a field data-collection tool. If you need a collection solution, our consulting team can conduct a data-collection audit, help design the right processes and training, assess the right tool—for example, a mobile or offline collection platform—and connect its data to Dalgo once it is in use.</p>`,
  'How does Dalgo create a single source of truth?': `<p>Dalgo brings data from approved source systems into a central warehouse, then applies shared cleaning, joining, and calculation rules to create trusted datasets for dashboards and reports. This means teams work from the same definitions and refresh schedule instead of maintaining separate spreadsheet versions or manually reconciling numbers before each review.</p><p>The warehouse remains the foundation from which your reporting tools, dashboards, and downstream applications draw data.</p>`,
  'Can Dalgo connect programme data, beneficiary data, and outcomes in one place?': `<p>Yes, where the underlying systems contain suitable identifiers and the data can be responsibly linked. Dalgo can combine data from different programme systems, beneficiary records, service-delivery tools, and outcome sources into a coherent analytical model. The implementation starts by agreeing the questions, definitions, privacy boundaries, and level of aggregation that are appropriate for your organisation.</p>`,
  'Can Dalgo support multiple programmes, partners, or geographies from one platform?': `<p>Yes. Dalgo can consolidate data across multiple programmes, locations, implementing partners, or source-system instances. You can then create a portfolio-level view as well as programme-, geography-, partner-, or team-specific views, depending on the data model and access requirements.</p>`,
  'Do we need to know SQL to use Dalgo?': `<p>No. Dalgo's UI4T visual transformation interface lets teams clean, combine, and prepare data without writing SQL. SQL and dbt are available for more complex work, but they are not required for everyday dashboard use, reporting, or many common transformations.</p>`,
  'Can Dalgo create real-time dashboards?': `<p>Dalgo dashboards update whenever their underlying pipelines run. You can choose the refresh frequency that fits your work: some organisations run pipelines multiple times a day, while others update monthly. That means teams can balance how current they need the data to be with the cost and complexity of refreshing it.</p>`,
  'Can non-technical teams build or customize dashboards?': `<p>Yes. Non-technical users can create and arrange charts into dashboards once the relevant datasets and definitions are available. Analysts and technical teams can handle more complex data modelling, while programme and M&amp;E colleagues can use the platform to explore dashboards, create reports, apply filters, and work with agreed metrics.</p><p>Dalgo also provides a visual transformation interface for many common data-preparation tasks, alongside dbt-based workflows for more advanced needs.</p>`,
  'Can Dalgo automate reporting workflows?': `<p>Yes. Dalgo can run data syncs and transformations on a schedule, so dashboards refresh with the latest approved data. Teams can also create point-in-time reports from dashboards for quarterly reviews, board discussions, or donor updates, share them by link or email, and export them as PDFs.</p><p>The exact reporting formats and workflow are designed around your audience and reporting cycle. A single dashboard can support several reporting views without recreating the underlying data each time.</p>`,
  'Can Dalgo improve data quality?': `<p>Yes. Data quality is built into the workflow rather than treated as a final clean-up step. Dalgo standardises and validates data during transformation, uses dbt tests to check assumptions, and integrates with <a href="https://www.elementary-data.com/" target="_blank" rel="noopener">Elementary</a> for data observability. Elementary surfaces test results, model-run history, and anomalies in row counts, freshness, and column values, so teams can spot issues early and investigate them in context.</p><p>Good data quality also depends on the source systems and team processes. We work with you to identify where issues start and define ownership for fixing them.</p>`,
  'Can Dalgo clean and standardise historical data?': `<p>Yes. Historical data can be reviewed, cleaned, mapped to shared definitions, and loaded into the warehouse alongside current data. This is usually a scoped implementation activity: the effort depends on the volume of history, its consistency, available documentation, and the questions you need to answer with it.</p><p>The goal is not merely to import old files, but to make historical and current data comparable enough to support meaningful trends and reporting.</p>`,
  'Can Dalgo support Monitoring, Evaluation, and Learning (MEL/M&E)?': `<p>Yes. Dalgo is built for the rhythm of MEL/M&amp;E work—not just static dashboards. Teams can define and track KPIs tagged as <strong>input, outcome, and impact</strong>, organise them by programme, and slice them by time, geography, partner, cohort, or other relevant dimensions. This makes it easier to move from a high-level portfolio view to the programme-level detail behind a result.</p><p>Dashboards provide live views for ongoing monitoring. Reports create a fixed view for any chosen period—quarterly, annual, or otherwise—with executive summaries and comments that enable team-wide conversations on the same data. Alerts add a push mechanism: rather than expecting someone to remember to check a dashboard, Dalgo can notify the right people when a KPI moves into an agreed red or amber RAG status, or when a metric crosses a threshold.</p>`,
  'Can Dalgo monitor KPIs and send alerts?': `<p>Yes. Dalgo can evaluate KPI, metric, or custom warehouse rules on a schedule and send notifications by email or Slack when a threshold or status condition is met. For example, an organisation can monitor a red/amber KPI, a metric below target, or a data-quality-related check.</p><p>Alert rules, recipients, frequency, and escalation expectations should be agreed carefully so teams receive useful prompts rather than noise.</p>`,
  'Does Dalgo support AI-powered insights?': `<p>Good AI starts with good data. Whether you are using NLP, LLMs, predictive analytics, or another AI approach, the underlying data needs to be centralised, reliable, tested, complete, and appropriately governed. That is the foundation Dalgo creates: a warehouse with shared definitions, automated transformations, quality checks, and controlled access.</p><p>Building on that foundation, Dalgo's roadmap includes <strong>Chat with Data/Dashboards</strong> for natural-language exploration of programme insights, <strong>automated qualitative analysis</strong> to help teams work with text-based information at scale, and <strong>Chat to Transform</strong> to make data transformation more accessible. These features are designed to support—not replace—human interpretation, programme expertise, and responsible data practice.</p><p>AI feature availability, data-sharing approach, model choices, and governance requirements are confirmed transparently for each organisation, particularly where data is sensitive.</p>`,
  'Will Dalgo scale as our organisation grows?': `<p>Yes. Dalgo is designed to grow with more data sources, programmes, locations, users, and reporting needs. It runs on Kubernetes, which lets the platform scale infrastructure dynamically as workloads grow. There are no artificial limits on the number of users, pipelines, dashboards, charts, or other core platform assets you can create.</p><p>The SaaS price remains flat whether your organisation processes 1 GB or 500 GB of data a day, or has 5 users or 500. That makes it easier to expand data use across teams without being penalised for adoption. As you scale, we can also help strengthen the shared definitions, governance, and operating practices that keep the system maintainable.</p>`,
  'Can we try Dalgo before committing?': `<p>Yes. Dalgo offers a <strong>14-day free self-trial</strong>, so your team can explore the platform and understand how it fits your work before committing.</p>`,
  'Can we get a POC or pilot?': `<p>Yes. We start with a discovery conversation to understand your current data landscape, priorities, and the questions you need answered. We can then provision a test account and set up a focused pilot for you around a defined use case, source, or reporting workflow—so you can see Dalgo with a realistic setup rather than a generic demo.</p>`,
  'What happens during a POC or pilot?': `<p>After discovery, we agree on the priority use case, delivery plan, responsibilities, implementation scope, and commercial terms. A typical first phase connects the most important sources, creates the required data model and quality checks, and delivers a small set of dashboards or reports. We then review adoption, feedback, and next priorities before expanding.</p>`,
  'When is a Proof of Concept free or paid?': `<p>The first conversation and product demo are free. A proof of concept is scoped case by case. A lightweight discovery or demonstration may be offered without charge; work that requires connecting your systems, preparing data, building bespoke transformations, or delivering production-ready dashboards is normally a paid implementation engagement.</p><p>Before any POC begins, we will agree on the purpose, scope, duration, inputs, success criteria, deliverables, and what happens after the POC.</p>`,
  'What does implementation actually look like?': `<p>Implementation is collaborative and usually follows these steps:</p><ol><li><strong>Discovery:</strong> agree the decisions, reports, users, indicators, sources, and privacy requirements that matter most.</li><li><strong>Data foundation:</strong> connect the selected sources to a warehouse and understand the structure, history, and quality of the data.</li><li><strong>Transformation and quality:</strong> clean, join, standardise, test, and document the data needed for the first use case.</li><li><strong>Insights and reporting:</strong> build the required metrics, dashboards, reports, alerts, and sharing workflow.</li><li><strong>Validation and handover:</strong> check numbers with the teams that know the programme, train users, document ownership, and establish a support and improvement rhythm.</li></ol><p>We start small enough to create early value, then expand in a controlled way.</p>`,
  'Which warehouses does Dalgo support?': `<p>Dalgo supports <strong>BigQuery</strong> and <strong>PostgreSQL</strong> as the central store for your organisation's data. Your organisation owns and hosts that warehouse or database; Dalgo connects to it to run pipelines, transformations, quality checks, dashboards, reports, KPIs, and alerts.</p><p>For most new Dalgo implementations, we recommend <strong>PostgreSQL</strong>, usually managed through AWS RDS. It gives teams predictable infrastructure costs and a flexible relational foundation for reporting and complex transformations. BigQuery remains a strong option when your organisation is already on Google Cloud or has very large, irregular analytical workloads that benefit from a serverless model.</p>`,
  'Should we choose BigQuery or RDS PostgreSQL?': `<p>For most nonprofits and social-impact organisations, we recommend <strong>PostgreSQL on AWS RDS</strong>. It is a better default when you want a predictable monthly cost, a practical place to run scheduled transformations, and a database that is straightforward for analysts and technical partners to work with over time.</p><p>BigQuery is fully supported, and its serverless model can be excellent for very large-scale analytics or organisations already operating on Google Cloud. Its on-demand model, however, charges for the data processed by queries (currently listed at <a href="https://cloud.google.com/bigquery/pricing" target="_blank" rel="noopener">US$6.25 per TiB</a> after the free allowance). Frequent transformations or broad scans can therefore become expensive unless tables are carefully partitioned, clustered, and governed. By contrast, AWS RDS PostgreSQL with <strong>gp3</strong> storage does not charge for each individual I/O operation: its <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html" target="_blank" rel="noopener">baseline IOPS and throughput are included</a>, with charges only if you choose to provision performance above the included level.</p><p>Both options work with dbt. For complex transformation projects, we generally find PostgreSQL easier to operate: it uses familiar relational SQL, works well with the wider dbt package and macro ecosystem, and keeps the cost of repeated transformation runs easier to anticipate. This is a Dalgo implementation recommendation, not a limitation of BigQuery.</p>`,
  'What are the minimum warehouse specifications for Dalgo?': `<p>For a self-serve trial or a very small initial workload, we recommend <strong>AWS RDS PostgreSQL</strong> with a <strong>db.t3.micro</strong> instance and <strong>20 GB of gp3 SSD</strong> storage. This is a practical minimum to get started.</p><p>The right size depends on your data volume, how often pipelines run, the complexity of transformations, and how many people use dashboards at the same time. As those needs grow, the database can be scaled up with more compute, memory, or storage. For larger or production workloads, we will recommend an appropriate configuration during onboarding.</p><p>If you use BigQuery, there is no server size to choose; instead, you configure billing, data location, access controls, and query-cost guardrails.</p>`,
  'Should we host PostgreSQL on AWS or Azure?': `<p>For a new Dalgo PostgreSQL deployment, we generally recommend <strong>AWS RDS</strong>. It is usually the lower-cost option for comparable India-region managed PostgreSQL, has a strong operational fit for the standard Dalgo setup, and makes costs easy to predict. Azure PostgreSQL Flexible Server is a sound choice when your organisation already has Azure identity, networking, procurement commitments, or other systems there; existing cloud context can outweigh a small price difference.</p><p>Indicative on-demand prices below were checked using a single-zone 2-vCPU/8-GB PostgreSQL instance in AWS Mumbai or Azure Central India, 730 hours per month, and 100 GB of standard SSD storage. They exclude GST, high availability, extra backup, network transfer, NGO credits, free tier usage, and any committed-use discounts.</p><div class="faq-a-tablewrap"><table class="faq-a-table"><thead><tr><th>Comparable setup</th><th>AWS RDS PostgreSQL</th><th>Azure PostgreSQL Flexible Server</th><th>Practical takeaway</th></tr></thead><tbody><tr><td>Light, burstable 2-vCPU/8-GB instance</td><td>db.t4g.large: ~US$122/month compute</td><td>B2ms: ~US$143/month compute</td><td>AWS is cheaper for light workloads, but monitor sustained CPU use on burstable instances.</td></tr><tr><td>General-purpose 2-vCPU/8-GB instance</td><td>db.m7g.large: ~US$175/month compute</td><td>D2ds_v5: ~US$183/month compute</td><td>AWS is still slightly cheaper for a steadier production workload.</td></tr><tr><td>100 GB standard SSD storage</td><td>gp3: ~US$13/month</td><td>Premium SSD v2: ~US$13/month</td><td>Storage is effectively the same at these published India-region rates.</td></tr></tbody></table></div><p>Prices change, so we confirm a current estimate before implementation using the <a href="https://aws.amazon.com/rds/postgresql/pricing/" target="_blank" rel="noopener">AWS RDS pricing page</a>, <a href="https://azure.microsoft.com/pricing/details/postgresql/flexible-server/" target="_blank" rel="noopener">Azure PostgreSQL Flexible Server pricing</a>, the <a href="https://calculator.aws/#/createCalculator/RDSPostgreSQL" target="_blank" rel="noopener">AWS Pricing Calculator</a>, or the <a href="https://azure.microsoft.com/pricing/calculator/" target="_blank" rel="noopener">Azure Pricing Calculator</a>.</p>`,
  'How long does onboarding typically take?': `<p>There is no single answer because implementation length depends on the number and complexity of sources, data readiness, reporting needs, historical data, and the availability of your team. A focused first use case can move faster than an organisation-wide data transformation.</p><p>During discovery, we will provide a realistic plan with phases, milestones, dependencies, and the time required from both teams rather than promising a generic timeline.</p>`,
  'How much time and effort is needed from our team?': `<p>Your team's involvement is essential, especially at the beginning. We need people who understand the programme, data collection, metric definitions, reporting expectations, and access approvals. Expect regular working sessions to validate data, make decisions, review dashboards, and prepare users for adoption.</p><p>Dalgo can take on substantial technical work, but the strongest outcomes come when programme, M&amp;E, operations, and leadership teams actively participate in defining what the data should mean and how it will be used.</p>`,
  'Can Dalgo work with our existing dashboards and reporting stack?': `<p>Yes. Dalgo can feed your existing visualisation tools, or you can use Dalgo's native dashboards and optional hosted Superset capabilities. We assess what should be retained, what needs to be improved, and where a shared data foundation can remove duplicated manual work.</p><p>The goal is interoperability and a smoother reporting workflow—not change for its own sake.</p>`,
  'Who owns the data?': `<p>Your organisation owns its data and brings its own warehouse. Your data is stored and managed in that warehouse; Dalgo processes it on your organisation's behalf as a data processor. Dalgo does not take ownership of your data, store it in a separate Dalgo-owned warehouse, or export your client files.</p><p>The implementation and access arrangements are documented clearly in the relevant agreement.</p>`,
  'Where is our data hosted?': `<p>Your data remains in your organisation's own warehouse. Dalgo supports BigQuery and PostgreSQL, and the right option depends on your existing infrastructure, location requirements, integrations, and security needs.</p><p>We will be clear about the components involved, the access required, and the responsibilities of each party before implementation begins.</p>`,
  'Can Dalgo be self-hosted?': `<p>Yes. Dalgo is an open-source Digital Public Good, and its code and self-hosting instructions are publicly available on <a href="https://github.com/DalgoT4D" target="_blank" rel="noopener">GitHub</a>. You can host it on your own infrastructure without a discovery engagement or commercial agreement with Dalgo.</p><p>If you would like Dalgo to help operate, support, or extend a self-hosted deployment, we can scope that separately.</p>`,
  'Is Dalgo compliant with India\'s Digital Personal Data Protection Act (DPDP)?': `<p>Yes. Dalgo has been audited and found compliant with India's Digital Personal Data Protection Act, 2023 (DPDP), in its role as a data processor. Dalgo processes data on behalf of your organisation while the organisation remains responsible for its own collection practices, data classification, access decisions, retention, and sharing.</p><p>For sensitive or personal data, we work with you to define appropriate data minimisation, access, consent, retention, and governance practices.</p>`,
  'How does Dalgo protect privacy and sensitive data?': `<p>Privacy and security are designed into the implementation. Your organisation's data remains in its own warehouse; Dalgo does not store or export client files. Access can be managed by role, sensitive datasets can be restricted, reports can be shared deliberately, and dashboards can use the level of aggregation appropriate for each audience.</p><p>If your organisation has specific security, data-residency, audit, or contractual requirements, raise them early so they can be assessed and documented before data is connected.</p>`,
  'What is included in pricing, and what is not?': `<p>The flat Dalgo SaaS subscription includes every core platform feature: connections and data ingestion, transformations, scheduled pipelines, native dashboards and charts, KPIs, alerts, data quality monitoring, reports, role-based access, and platform support. There is no feature gating, per-user pricing, or charge for creating more dashboards, charts, or pipelines.</p><p>Hosted Superset, implementation, bespoke data work, and strategic consulting are separate services. Your warehouse is your own cloud infrastructure and is billed by your cloud provider. Where those services are needed, the scope, deliverables, and responsibilities are agreed upfront.</p>`,
  'What does self-hosting cost?': `<p>Dalgo itself is open source and can be self-hosted without a SaaS licence fee. Your cost is the infrastructure you choose and the capacity to operate, secure, monitor, and upgrade it. If you would like Dalgo to support or extend a self-hosted deployment, that service is scoped separately.</p>`,
  'What support is included?': `<p>Platform support is included in the SaaS subscription. We help keep the platform functioning and work with you to resolve issues such as failing pipelines, or other platform-level problems. We are also available for guidance and advice when your team needs help navigating the product or understanding the right next step.</p><p>Deeper data modelling, new custom integrations, major dashboard redesigns, or strategic work are scoped separately so they receive the focused attention they need.</p>`,
  'What support is not included?': `<p>Unless specifically included in your agreement, support does not automatically cover unlimited bespoke data modelling, new connectors, historical-data remediation, data-entry corrections in source systems, major dashboard redesigns, or organisation-wide strategy work. We will distinguish routine platform support from project or consulting work upfront.</p>`,
  'Is training included?': `<p>Training is available as a separate consulting offering and can be included in an implementation engagement. We tailor it to the people who will use and maintain the system: dashboard users, M&amp;E and programme teams, analysts, administrators, or technical partners.</p><p>Training is most effective when paired with real workflows—such as regular review meetings, donor reporting, or data-quality follow-up—rather than a one-off demonstration. Learn more about Dalgo's <a href="https://dalgo.org/consulting-offerings/" target="_blank" rel="noopener">consulting offerings</a>.</p>`,
  'Do you provide consulting and implementation support, not just software?': `<p>Yes. Dalgo is more than a product. Separate consulting and implementation engagements can help define data questions and metrics, design a data architecture, build and validate data pipelines, create dashboards and reports, and support adoption. Learn more about Dalgo's <a href="https://dalgo.org/consulting-offerings/" target="_blank" rel="noopener">consulting offerings</a>.</p>`,
  'Can you help us define our data strategy?': `<p>Yes. Through a separate consulting engagement, we can help identify priority decisions, stakeholders, data gaps, key metrics, governance needs, and a practical roadmap. Learn more about Dalgo's <a href="https://dalgo.org/consulting-offerings/" target="_blank" rel="noopener">consulting offerings</a>.</p>`,
  'Can you help us choose the right data-collection tools?': `<p>Yes. Through a separate consulting engagement, we can assess your existing collection tools and workflows, identify gaps, and recommend an approach that fits your programme, field conditions, privacy needs, and reporting goals. We can also support data-collection audits, process design, and training. The best choice may be to improve an existing tool, introduce a new one, or connect several systems through Dalgo. Learn more about Dalgo's <a href="https://dalgo.org/consulting-offerings/" target="_blank" rel="noopener">consulting offerings</a>.</p>`,
  'How is Dalgo different from Power BI, Tableau, or Looker Studio?': `<p>Power BI, Tableau, and Looker Studio are primarily business-intelligence and visualisation tools. Dalgo provides the data foundation that makes reporting reliable: connecting sources, storing data centrally, transforming it with shared rules, scheduling refreshes, monitoring quality, and then powering dashboards or reports.</p><p>Dalgo also has a different commercial model. Its flat organisation-level price includes unlimited users and core assets, whereas Power BI and Tableau are priced per user and become more expensive as access expands. In India, Power BI Pro is currently listed from ₹1,165 per user per month and Premium Per User from ₹1,995 per user per month; Tableau lists Viewer, Explorer, and Creator plans from US$15, US$42, and US$75 per user per month respectively, depending on billing and market. Looker Studio's standard edition is no-cost for individual analysis, but teams can find its navigation and management of data sources and permissions more complex; its Pro tier adds enterprise controls, collaboration, and support through per-user licensing.</p><p>For nonprofits, the biggest difference is that Dalgo is shaped with NGO workflows in mind and evolves in collaboration with its users. For example, Dalgo added drill-down tables following a request from ATE Chandra Foundation and pivot tables following a request from Ummeed. This allows Dalgo to respond to social-sector needs and ship improvements faster than a general-purpose BI platform. Dalgo can also feed your existing visualisation tools, including Power BI, Tableau, or Looker Studio, if you prefer to keep them.</p>`,
  'Can we use Dalgo alongside Power BI, Tableau, Looker Studio, or another BI tool?': `<p>Yes. Dalgo can sit upstream of your preferred visualisation tool, supplying cleaned, modelled, and refreshed warehouse data. This allows you to preserve familiar dashboards while reducing manual exports, duplicated calculations, and inconsistent source files.</p>`,
  'When does it make sense to use Dalgo instead of spreadsheets?': `<p>Spreadsheets remain excellent for lightweight analysis, planning, and small ad hoc tasks. Dalgo becomes valuable when recurring reporting relies on multiple sources, data needs regular cleaning or joining, several teams need the same numbers, data volumes are growing, or manual preparation is becoming slow and error-prone.</p><p>You do not have to eliminate spreadsheets. The aim is to stop using them as the fragile, manual backbone of organisation-wide reporting.</p>`,
  'Can Dalgo work with our existing technology stack?': `<p>Yes. Dalgo is designed to connect with and add structure to existing tools rather than replace them wholesale. It connects out of the box with 600+ sources, and we can build a connector for any custom API or other tool where one does not yet exist. We assess your source systems, warehouse, dashboards, reporting workflows, and organisational capacity, then identify the most practical integration path.</p>`,
  'When should we choose Dalgo rather than build a custom data platform?': `<p>Dalgo is a strong option when you need a reliable, nonprofit-oriented data foundation without taking on the full cost and maintenance burden of a custom platform. It uses open-source components, supports a modern warehouse-and-transformation approach, and comes with implementation and social-sector experience.</p><p>A fully custom platform may make sense when you have unusually specialised product requirements, a large in-house engineering team, or non-standard operational constraints. We can help you assess the trade-offs honestly.</p>`,
  'Is Dalgo only for large, mature nonprofits?': `<p>No. Dalgo is designed to help organisations build data maturity, including programme and M&amp;E teams with limited technical capacity that are aspiring to use data more effectively. The right starting scope matters: a smaller organisation may begin with one high-value reporting workflow or programme rather than an organisation-wide rollout.</p>`,
};
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
          ? <div className="faq-a" dangerouslySetInnerHTML={{ __html: ans }}></div>
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
      <a className="btn btn-ghost" href="contact.html">Book a Free Consultation</a>
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
