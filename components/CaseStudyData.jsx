// Case study content model — the single source of truth for /case-studies and every
// /case-studies/<slug> page. Lives in components/ (not a loose .js) for one concrete reason:
// scripts/hash-assets.mjs rewrites 'assets/…' URLs with a ?v= hash inside app.bundle.js, and a
// standalone data file would be skipped, so every card image would ship uncacheable.
//
// WHERE THE CONTENT CAME FROM (PRD "Native Case Studies and Blog on dalgo.org", phase 1):
// each entry is migrated from the organisation's existing case study on projecttech4dev.org —
// `source` records the page it came from. This is Dalgo's own already-published copy, moved
// across and fitted to the one template. It is NOT a rewrite: the PRD puts the rewrite and the
// approved-claims check with Stuti and Akansha (due 31 Oct), so treat every string here as
// source material awaiting that pass, not as signed-off copy.
//
// CLAIMS — read before adding a number. Two figures on the source pages are NOT publishable as
// they stand, and both are omitted here rather than carried over:
//   - STiR "1 week -> 1 hour" (and the "5x reduction" that restates it) is on the never-publish
//     list. scripts/seo-meta.mjs already refuses it in the /case-studies description for the
//     same reason. STiR therefore carries its volume figures instead of its time figures.
//   - SHRI uptime reads 99% on projecttech4dev.org; the approved figure is 96%. The approved
//     number is used here and the discrepancy is flagged for Stuti.
//
// SHAPE — every field below `summary` is optional, because the real content varies and the
// template has to degrade without looking broken. Measured against the live sources: SNEHA and
// Bhumi publish no metrics at all, and SHRI and SNEHA have a quote with no attributable role.
// A case study with no `results` renders without the results band; a quote with no `role`
// renders the name alone; `native: false` keeps the card pointing at projecttech4dev.org until
// that organisation's page is migrated (PRD release 2, 28 Nov).
const CASE_STUDIES = [
  {
    slug: 'stir-education',
    org: 'STiR Education',
    sector: 'Education',
    title: 'From data burden to strategic insight',
    img: 'assets/cases/stir.webp',
    logo: 'assets/logos/STiREducation.png',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/from-data-burden-to-strategic-insight-how-stir-transformed-data-across-multiple-countries-with-dalgo/',
    summary: 'STiR Education works to improve learning outcomes for over 12 million children across multiple countries. Its data came from several collection platforms and was visualised in several more, so turning daily field data into something a programme team could act on was slow and manual. Dalgo unified that pipeline — collection, processing and dashboards — across six regions.',
    // Volume, not time: the time figures on the source page are the banned claim. See the
    // CLAIMS note at the top of this file.
    results: [
      { figure: '12M+', label: 'children reached by STiR programmes' },
      { figure: '6', label: 'regions on one standardised pipeline' },
      { figure: '25,000', label: 'records and 100 columns processed per cycle' }
    ],
    challenge: 'Preparing a review cycle was manual work across six geographies, each with customised needs, handled by an M&E team of one or two people. Data arrived from POI Mapper and SurveyCTO and was visualised across Mammoth, Zoho Analytics and Data Studio, so integration was a constant cost. The dashboards were not flexible enough for the range of people who needed them, and field teams could not get insights in time to act on them.',
    solution: 'Dalgo consolidated collection from the existing sources, standardised processing across all six regions, and replaced the separate visualisation tools with self-service dashboards. Access was opened to M&E, programme staff, leadership, donors and board members, so the M&E team stopped being the bottleneck between the data and the people who needed it.',
    outcomes: 'The M&E team moved off repetitive reporting and onto data quality and capacity building. Programme teams began running their own monthly reflections against consolidated dashboards and iterating in the field. Leadership and donors tracked performance directly rather than waiting for a prepared pack.',
    // role is the job title ONLY — .cvc-orgname renders the organisation underneath, and
    // carrying it in both printed "STiR Education" twice in the attribution block.
    quote: {
      text: 'Before Dalgo, the process was extremely tedious. It took us at least a week to complete the entire process.',
      name: 'Naveli',
      role: 'Lead Data Manager, M&E'
    }
  },
  {
    slug: 'shofco',
    org: 'SHOFCO',
    sector: 'Community Empowerment',
    title: 'Shining hope from within',
    img: 'assets/cases/shofco-partnership.png',
    logo: 'assets/logos/SHOFCO.png',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/shining-hope-from-within-shofcos-empowerment-story-with-dalgo/',
    summary: 'Shining Hope for Communities reaches 2.4 million people across Kenyan urban slums through health, education and livelihoods programmes. An earlier push to standardise every programme onto one collection tool had produced workarounds rather than adoption. Dalgo centralised the intelligence instead of the interface: programmes kept the tools that suited them, and the data came together underneath.',
    results: [
      { figure: '2.4M', label: 'people reached across urban slums' },
      { figure: '12+ hrs → ~2 hrs', label: 'weekly data cleaning and analysis' },
      { figure: '3 hrs', label: 'saved weekly per caseworker' }
    ],
    challenge: 'The 2022–23 centralisation strategy moved every programme onto CommCare. It created frustration and adoption gaps, and staff worked around it with paper records and ad hoc spreadsheets. Leadership dashboards existed but gave frontline workers little they could use. Infrastructure maintenance was expensive, and extending the existing BI tool across the organisation was not affordable.',
    solution: 'Programmes kept the tools that matched their work — CommCare for some, domain-specific LMIS and HMIS for others — while Dalgo pipelines ingested from all of them and transformed the data into one analytics layer. Role-specific dashboards were built on top with row-level security, so a caseworker and a director see the same data at the resolution each needs.',
    outcomes: 'Caseworkers got real-time caseload tracking. MEL teams started catching programme problems earlier. Leadership gained consistent cross-programme insight. Internal capacity grew to the point where SHOFCO staff design their own data models, and dashboard rollout went from months to days.',
    quote: {
      text: "The introduction of the dashboard's field-first design has been a game changer for our caseworkers — reports that previously took half a day now generated in just a few minutes.",
      name: "Nicholas Ong'injo",
      role: 'MEL Team'
    }
  },
  {
    slug: 'shri',
    org: 'SHRI',
    sector: 'Sanitation',
    title: 'Flushing out inefficiencies for better-quality sanitation',
    img: 'assets/cases/shri.webp',
    logo: 'assets/logos/SHRI.png',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/flushing-out-inefficiencies-shri-dalgos-data-driven-approach-to-better-quality-sanitation/',
    summary: 'Sanitation and Health Rights in India runs 20 shared sanitation facilities across Bihar and Jharkhand, serving more than 7,000 people a day. Keeping the data behind those facilities usable took 20 to 25 hours of manual work every week. Dalgo automated the pipeline from Kobo forms through to dashboards in three months.',
    // Uptime is the APPROVED 96%, not the 99% printed on the source page. See CLAIMS at the top.
    results: [
      { figure: '20–25 hrs', label: 'of manual weekly processing removed' },
      { figure: '96%', label: 'facility uptime' },
      { figure: '7,000+', label: 'daily users across 20 facilities' }
    ],
    challenge: 'Cleaning and transforming the data needed a dedicated person for 20 to 25 hours a week, with the error risk that comes with manual handling. There was no structured documentation or version control, which made collaboration and handover hard. Dashboards pulled directly from spreadsheets and were slow to load. The manual pipeline put a ceiling on how far SHRI could expand.',
    solution: 'Dalgo built an automated flow from the Kobo collection forms through to the analysis dashboards, so field data arrives without manual intervention. Version control and structured storage were put in place, and dashboard queries were optimised to return in about a second rather than waiting on a spreadsheet.',
    outcomes: 'Field workers report without the error-prone manual step. The data team moved from aggregation to interpretation. Leadership can point to transparent, data-backed evidence in conversations with government — which matters for a model that depends on public engagement — and SHRI has expansion plans for further facilities.',
    quote: {
      text: "Dalgo transformed our ability to track and improve sanitation services. With real-time insights, we've enhanced facility maintenance, user experience, and data-driven advocacy for better sanitation policies.",
      name: 'SHRI leadership',
      role: null
    }
  },
  {
    slug: 'sneha',
    org: 'SNEHA',
    sector: 'Maternal & Child Health',
    title: 'Harnessing real-time data for social impact',
    img: 'assets/cases/sneha.webp',
    logo: 'assets/logos/SNEHA.png',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/harnessing-real-time-data-for-social-impact-snehas-journey-with-dalgo/',
    summary: 'SNEHA has worked in Mumbai for 25 years on maternal and child health, violence against women, and adolescent well-being. Its analysis ran monthly, on offline tools, against work that moves daily and involves some of the most sensitive data a nonprofit handles. Dalgo moved that reporting to next-day dashboards without loosening the privacy controls around it.',
    // No metrics: SNEHA's case study publishes none, and inventing one to fill the band is
    // exactly the kind of claim the ground-truth list exists to prevent.
    results: null,
    challenge: 'Monthly statistical analysis on offline tools did not match the volume, urgency or complexity of the work. Maternal health cases and domestic violence interventions need a response far sooner than the next reporting cycle, and the data involved carries privacy obligations that rule out casual sharing.',
    solution: 'Dalgo set up Apache Superset dashboards over SNEHA’s programme data, replacing the monthly offline cycle with next-day visibility for M&E teams and programme staff, with access controls kept tight enough for the sensitivity of the caseload.',
    outcomes: 'Programme staff see their work reflected the following day rather than the following month, which changed both how quickly the organisation can guide a programme and how motivated teams are by seeing their own impact.',
    quote: {
      text: 'Once we enter the work today, by tomorrow we can already see it reflected. That visibility has brought a lot of meaningful impact to the team.',
      name: 'Anindita',
      role: null
    }
  },
  {
    slug: 'bhumi',
    org: 'Bhumi',
    sector: 'Livelihoods',
    title: 'Closing the data-to-decision gap',
    img: 'assets/cases/bhumi.webp',
    logo: 'assets/logos/Bhumi.png',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/lessons-from-bhumi-closing-the-data-to-decision-gap-with-dalgo/',
    summary: 'Bhumi, founded in Chennai in 2006, runs education and volunteering programmes with data spread across Excel, Google Sheets and several apps. Different teams could give different answers to the same question — including how many children the organisation reached in a year. Dalgo consolidated the sources into one warehouse without asking field teams to change how they collect.',
    results: null,
    challenge: 'Data sat in disconnected sources in inconsistent formats, which produced versioning conflicts and inconsistent reporting. Fundamental questions had more than one answer depending on who you asked. During FCRA renewal, leadership could not confidently answer funder questions on programme spending and student impact, because verifying and consolidating the numbers took too long.',
    solution: 'Dalgo pulled from Google Sheets, Zoho Creator and historical files into a single warehouse, leaving existing collection methods untouched. The data is cleaned, structured and given context, then surfaced through dashboards cut for the different people who need them.',
    outcomes: 'One source of truth, with analysis flexible by programme, grade, city or school. Funder and compliance reporting became something the team could stand behind. Capacity building left the team self-sufficient, and programme managers can now spot a problem mid-cycle instead of reading about it afterwards.',
    quote: {
      text: "We have a single source of truth. It's easier to get the organization on board to ensure that the data is flowing into this single source of truth, which is also leading to a stronger culture of being data aware.",
      name: 'Anusha Vishwanath',
      role: 'Executive Assistant to Co-founder'
    }
  },
  {
    slug: '1000-days-fund',
    org: '1000 Days Fund',
    sector: 'Maternal & Child Health',
    title: 'Driving beneficiary impact from data',
    // The case study's own card art, pulled from the projecttech4dev.org post and localised to
    // match the rest of assets/cases/ (900px wide WebP) so this thumbnail sits in the same
    // family as the other ten rather than borrowing the webinar promo.
    img: 'assets/cases/tdf.webp',
    logo: 'assets/logos/TDF.webp',
    native: true,
    release: 1,
    source: 'https://projecttech4dev.org/driving-beneficiary-impact-from-data-lessons-from-1000-days-fund/',
    summary: '1000 Days Fund is a women-led Indonesian nonprofit working to end stunting by strengthening village health systems — tiered training and mentoring for health workers and Posyandu community health workers, and advocacy for local governments to co-finance the work. Over seven months it rebuilt the data foundations underneath that work.',
    // DELIBERATELY NOT IN THIS BAND: Manggarai Barat's fall in child malnutrition from 57% to
    // 31% over five years. That is TDF's programme outcome, achieved long before this work, and
    // putting it in a Dalgo results band would claim a causal link Dalgo cannot make. It stays
    // in the prose below as the organisation's own evidence, which is whose it is.
    results: [
      { figure: '1,107,180', label: 'pregnant women and children under five reached' },
      { figure: '100,534', label: 'health workers and CHWs trained' },
      { figure: '2–3 weeks → ~1 week', label: 'monthly data preparation' }
    ],
    challenge: 'Evidence of the kind that persuades a district government to fund the work from its own budget rested on five systems that could not be read together. The same community health worker appeared across trainings under different spellings, phone numbers and role titles, so counting unique people was itself an analysis job. Form versions drifted and free-text fields meant the same variable was asked for in different language. Nothing checked quality systematically, so implausible measurements and duplicates reached reports and surfaced only after the figures had gone out. Consolidation ran through spreadsheets and Colab, rested almost entirely on one specialist in the MER team, and consumed two to three weeks of every month.',
    solution: 'All five sources now land on an automated schedule in a warehouse 1000 Days Fund owns and operates. Identity matching pairs a person\u2019s pre- and post-test submissions, a role dictionary resolves hundreds of free-text variants into three categories, geography resolves through reference tables, and quality checks run inside the pipeline rather than after it. The MER team works in SQL and dbt in a single warehouse. TDF assessed Dalgo on three criteria: fluency in community health and M&E data specifically, an open stack the team could eventually maintain itself, and nonprofit pricing.',
    outcomes: 'Monthly data preparation fell from two to three weeks to about one week, and the organisation reached warehouse-grade infrastructure without recruiting a data engineer — it runs on the team it already has. Programme teams work from one source instead of separate spreadsheets, leadership has one set of indicator definitions across programmes and donors, and measurement feedback now returns to the community health workers who took the measurement. Pregnant women identified with chronic malnutrition or hypertension, and children identified with stunting or weight faltering, are reached sooner for follow-up. The warehouse is TDF\u2019s own on an open stack, so the evidence base outlasts the engagement. The organisation is clear that the ambition is not yet met: quality-control alerts are still to be built, and deciding what a flagged measurement means stays with the team.',
    quote: {
      // VERBATIM. Two fully-quoted lines were available from the source; this is the one that
      // names what actually changed rather than what is hoped for.
      text: 'We can now see how many individuals are actually going through training, matching their scores.',
      name: 'Pandu Gusti Resworo',
      role: 'Data Specialist'
    }
  },
  {
    slug: 'protsahan',
    org: 'Protsahan',
    // The source post is filed under "Skilling" on projecttech4dev.org, so that is what it
    // carries here. It is the only entry in that sector — recategorise if Education fits better.
    sector: 'Skilling',
    // The source post is titled "Notes from Protsahan's Girl Empowerment Centre". The org name
    // is dropped here because the template renders "{org}: {title}" — keeping it printed
    // "Protsahan: Notes from Protsahan's Girl Empowerment Centre".
    title: 'Notes from the Girl Empowerment Centre',
    // The post's own featured photo, not a co-branded case-study card: no card art exists,
    // because this was published as a field note rather than a case study. It will read
    // differently from the other eleven thumbnails until one is made.
    img: 'assets/cases/protsahan.webp',
    logo: null,
    native: true,
    release: 2,
    source: 'https://projecttech4dev.org/notes-from-protsahans-girl-empowerment-centre/',
    // THIS ONE IS WORK IN PROGRESS, NOT A RESULTS STORY. The source is a first-person field
    // note by Anusha Ganapathi (16 Sep) about a data audit that is still running. It publishes
    // no metrics, no outcomes and no partner quote, so results/outcomes/quote are all null and
    // the template drops those sections rather than printing empty shelves. Added on Stuti's
    // explicit instruction after that was flagged. Fill the gaps once the audit concludes.
    summary: 'Protsahan runs girl empowerment centres in Delhi, working with young girls through art, technology and patiently built trust. Fifteen years of data practices had accumulated organically: the spreadsheets technically work, but getting from them to a decision costs far more time than it should. A two-day audit kickoff in August 2026 started the work of changing that.',
    results: null,
    challenge: 'Data has a way of creeping up on you. When someone needs a number for a report, a column gets added — and those processes harden. New centres built their own trackers because that beat waiting for a central one, and funder questions kept extending the forms. Protsahan now manages hundreds of sheets, tracked and updated almost daily, while reporting happens once a month and more likely once a quarter. Surveys, pre- and post-assessments, registers and alumni follow-ups go back several years and capture far more than anyone can use. The people who built the system can get answers out of it; showing what the organisation has achieved is what costs disproportionate time.',
    solution: 'Dalgo is doing the plumbing. The two days produced a wishlist rather than a deliverable, and the audit is now working through three steps: an overall programme-level indicator list, where every indicator has to drive a decision or build a story, with a rationale for retiring the ones that do neither; a reworked capture process for each programme, so recording effort follows the indicators that matter; and a demo dashboard for at least one programme, built on a cleaned dataset, because nothing shifts a data culture like seeing something real. The data is live and in daily use, so the work is going one week at a time.',
    outcomes: null,
    quote: null
  },

  // ---- Not yet migrated (PRD release 2, 28 Nov) ----------------------------------------
  // These keep their projecttech4dev.org link so the listing stays complete while the pages are
  // written. Flip `native` to true and fill the body fields to move one across; nothing else
  // needs to change, and scripts/gen-case-studies.mjs will generate its page on the next build.
  // The Apprentice Project is the twelfth organisation in the PRD and has no entry here at
  // all yet — it needs a source page identified before it can be listed.
  //
  // BEFORE FLIPPING ANTARANG TO NATIVE: its title starts with the org name, so the template's
  // "{org}: {title}" would render "Antarang: Antarang's data breakthrough…". Drop the leading
  // org from the title at that point, the way protsahan above does.
  { slug: 'ummeed', org: 'Ummeed', sector: 'Health', title: 'Trans-disciplinary clinical care, on one dashboard', img: 'assets/cases/ummeed.webp', logo: 'assets/logos/Ummeed.png', native: false, release: 2, source: 'https://projecttech4dev.org/maximising-impact-ummeed-dalgos-approach-to-data-driven-trans-disciplinary-clinical-care/' },
  { slug: 'baala', org: 'Baala', sector: 'Menstrual Health', title: 'Making the invisible visible — a path to data insights', img: 'assets/cases/baala.webp', logo: 'assets/logos/Baala.png', native: false, release: 2, source: 'https://projecttech4dev.org/making-the-invisible-visible-learn-how-baala-is-finding-a-path-to-data-insights/' },
  { slug: 'antarang', org: 'Antarang', sector: 'Education', title: "Antarang's data breakthrough with GoalKeep and Dalgo", img: 'assets/cases/antarang.png', logo: 'assets/logos/Antarang.webp', native: false, release: 2, source: 'https://projecttech4dev.org/fueling-success-antarangs-data-breakthrough-with-goalkeep-and-dalgo/' },
  { slug: 'ate-chandra-foundation', org: 'A.T.E. Chandra Foundation', sector: 'Water & Environment', title: 'Rejuvenating 5,000+ waterbodies, tracked on one dashboard', img: 'assets/cases/atecf.webp', logo: null, native: false, release: 2, source: 'https://projecttech4dev.org/waterbody-rejuvenation-project-a-t-e-chandra-foundation/' },
  { slug: 'arghyam', org: 'Arghyam', sector: 'Water & Rural Development', title: 'Unifying piped-water-supply data across Bihar', img: 'assets/cases/arghyam.webp', logo: null, native: false, release: 2, source: 'https://projecttech4dev.org/jal-jeevan-mission-arghyam/' }
];

// Fixed metadata structure. Every case study page gets its title, description and structured
// data from here and nowhere else, so the pattern cannot drift page to page as the set grows.
// Title follows the sitewide pattern ("{Page} — Dalgo | Data Insights for Nonprofits").
// Description is capped at 158 chars, the same limit scripts/seo-meta.mjs enforces sitewide.
function caseStudyMeta(cs) {
  const title = cs.org + ' case study — Dalgo | Data Insights for Nonprofits';
  // Description is the opening of the summary, not a template sentence assembled from fields.
  // The assembled version read "How STiR Education (Education) from data burden to strategic
  // insight with Dalgo." — grammatical nonsense, and it is the line Google shows.
  let desc = '';
  if (cs.summary) {
    const sentences = cs.summary.split(/(?<=\.)\s+/);
    for (let i = 0; i < sentences.length; i++) {
      const next = desc ? desc + ' ' + sentences[i] : sentences[i];
      if (next.length > 158) break;
      desc = next;
    }
    if (!desc) desc = cs.summary.slice(0, 155).replace(/\s+\S*$/, '') + '…';
  } else {
    desc = cs.org + ' — a Dalgo case study on ' + cs.sector.toLowerCase() + ' data.';
  }
  return { title: title, desc: desc };
}

window.CASE_STUDIES = CASE_STUDIES;
window.caseStudyMeta = caseStudyMeta;
window.caseStudyBySlug = function (slug) {
  for (let i = 0; i < CASE_STUDIES.length; i++) if (CASE_STUDIES[i].slug === slug) return CASE_STUDIES[i];
  return null;
};
// Sectors for the listing filter, in first-appearance order so the chip row is stable.
window.caseStudySectors = function () {
  const seen = [];
  CASE_STUDIES.forEach(function (c) { if (seen.indexOf(c.sector) === -1) seen.push(c.sector); });
  return seen;
};
