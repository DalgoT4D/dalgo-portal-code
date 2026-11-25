// Case study content model — the single source of truth for /case-studies and every
// /case-studies/<slug> page. Lives in components/ rather than as a loose .js for one concrete
// reason: scripts/hash-assets.mjs rewrites 'assets/…' URLs with a ?v= hash inside
// app.bundle.js, and a standalone data file is skipped, so every card image would ship
// uncacheable.
//
// SOURCE: "Dalgo Case Studies - Master Doc - Nov 2026", last read 16 Nov 2026. One six-part
// template per partner: standfirst, at-a-glance facts, key results, the challenge, how we
// worked together, the transformation, what's next. Copy is Stuti's and is reproduced as
// written.
//
// EIGHT PARTNERS, matching the doc. Bhumi, STiR Education and Baala were added on 16 Nov
// 2026, when the doc's revision that day resolved their tracked suggestions and removed their
// "Open questions" blocks. They carry no purpose-built artwork yet and ship on the text-only
// hero tier — see the note above their entries.
//
// STILL TO SETTLE ON THE THREE NEW ONES:
//   - Bhumi's bootcamp is "two-day" in the doc's approach bullet and "three-day" in its own
//     facts paragraph, three lines apart. The bullet's wording is reproduced verbatim and the
//     facts row says "a bootcamp" with no day count rather than pick a side.
//   - Bhumi's "Tools" row says Zoho Creator only. The 16 Nov revision dropped the sentence
//     naming Zoho Creator and Google Sheets, so Zoho Creator is carried from the approach
//     bullet and the key result, which both still name it, and nothing else is assumed.
//   - Baala has no before/after measure anywhere in the doc, so it ships with two key results
//     where every other partner has three or four.
//   - STiR's quotes are attributed to "Arun, a senior manager at STiR Education"; no surname.
//
// WHAT WAS DELIBERATELY LEFT OUT, because the master doc is an internal working document and
// these parts are not for readers (Stuti, 4 Nov):
//   - every "Appendix" (source sheet links, "Built with" provenance)
//   - every "Open questions" block (what still needs vetting, surnames to confirm, photos to
//     chase)
//   - the whole "Decision impact evidence" research section, which is a working pass over
//     quotes that are not yet in any draft
//   - Bhumi's fourth key result and its Leadership line, still bracketed in the doc as
//     "[2–3 days → hours]" / "expected, not yet measured" (moot while Bhumi is unpublished).
//
// RESOLVED SINCE THE LAST READ: Ummeed's fourth key result, previously "[10 hrs → 1 hr a
// week] … Placeholder until Vinodhini confirms", is unbracketed in the 16 Nov doc and now
// ships. SHRI's time-saved figure is settled at the webinar's 5–7 hrs a week (Stuti, 10 Nov).
//   - SHRI's "(start date to confirm)" parenthetical, trimmed from the engagement line.
//
// NUMBERS TO SETTLE BEFORE THIS PUBLISHES — both flagged in the doc's own open questions:
//   - SHRI time saved. This uses the doc's figure, 5–7 hrs a week. The published case study
//     says 20+ and dalgo-brain says 20–25. Three sources, three numbers.
//   - SHRI uptime reads 99% here, per the doc. The dalgo-website-audit ground truth says 96%.
//
// QUOTES ARE VERBATIM customer voice: never edited, paraphrased or completed. The banned-word
// rules govern Dalgo's own copy, never an attributed quote.
//
// LOGO TREATMENT: logos sit in full brand colour on a white plate, which is what makes five
// very different files sit together — SHOFCO's cyan plate and 1000 Days Fund's baked white
// box both read as intentional on white, where on the mint tint they did not. `logoPale`
// marks the one exception: Antarang's file is 100% white pixels, verified by sampling it, so
// it is inverted to ink rather than left invisible. Grayscaling the set instead was tried and
// measured: it dropped SHOFCO to 2.41:1 and SHRI to 1.99:1 against the tint.
//
// IMAGERY comes from the master doc itself, which carries two purpose-built assets per
// partner (Stuti, 4 Nov). Extracted from the .docx and localised:
//   - `img`, 1200x630: the Dalgo | Partner lockup, headline, geography pill and a photo. This
//     is the listing thumbnail AND the per-page OG/link-preview image, which is what 1200x630
//     is for. It replaces both the old projecttech4dev title cards and the logo-on-a-plate
//     thumbnail, and it is why all five cards now match: they were designed as a set.
//   - `hero`: the photograph the card was built from, recropped to the system's 3:2. The hero
//     shows the partner's own people and work; the composed card does NOT go there, because its
//     artwork bakes in the same headline the page already prints as an <h1>, so the two together
//     said everything twice. Antarang has no photograph yet (its master-doc open question asks
//     the partner for one), so its hero is the masked Tier 1 dashboard composited onto a 3:2
//     --surface-1 ground and flagged kind:'illustration', which is the system's own variant for
//     product artwork. The card stays the listing's OG/link-preview image, where a baked
//     headline is exactly what a link preview wants.
//   - `approachImg`, 1600x900: the "How we worked together" four-step arc, placed in that
//     section. The case-study design kit allows one image there and this is it.
// Neither repeats a table the page already sets as text, which the kit forbids.
//
// SHAPE: every field below `standfirst` is optional, so a partner with no quote in a section,
// or no team table, renders without that block rather than leaving an empty shelf.
// `native: false` keeps a card pointing at projecttech4dev.org until that partner is written.
const CASE_STUDIES = [
  {
    slug: 'shofco',
    headline: { pre: 'Lessons from ', hl: 'SHOFCO', post: ': a live view of program data for every team' },
    org: 'SHOFCO',
    sector: 'Community Empowerment',
    cardTitle: 'A live view of program data for every team',
    title: 'A live view of program data for every team',
    img: 'assets/cases/shofco-card.webp',
    hero: { src: 'assets/cases/shofco-hero.webp', alt: "SHOFCO staff and community members walking through Kibera behind SHOFCO Urban Network banners" },
    logo: 'assets/logos/SHOFCO.png',
    approachImg: { src: 'assets/cases/shofco-approach.webp', alt: 'How Dalgo and SHOFCO worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    // DOC LAYOUT, approved from the SHOFCO sample and rolled out to all eight (18 Nov 2026,
    // Stuti). Every page now renders the master doc's own four-section shape: the partnership
    // first, carrying the arc image, the bullets, the Result/What-changed table and the
    // sentence about the organisation; then the challenge, the transformation, what's next.
    // `facts` is retained on every entry but no longer rendered — the doc states the same
    // information as the `about` sentence, which is what ships. Removing `facts` outright
    // would throw away the only structured form of it, so it stays as data.
    docLayout: true,
    about: 'Shining Hope for Communities (SHOFCO) runs gender, water, sanitation and hygiene (WASH), livelihoods and education programs in Kenya, reaching more than 2.4 million people in over 30 counties. They have worked with the Dalgo team since October 2024, on the platform plus consulting, with more than 40 hours of training. Their data comes from CommCare, Google Sheets and Mobiwater, with dashboards on Superset.',
    standfirst: 'The Dalgo team worked with SHOFCO in Kenya to connect data from three tools in one automated pipeline and move caseworkers from paper to digital case tracking. Leadership, monitoring, evaluation and learning (MEL) teams, caseworkers and donors can now make informed decisions from the view they need.',
    facts: [
      ['Partner', 'Shining Hope for Communities (SHOFCO), Kenya'],
      ['Programs', 'Gender, WASH, Livelihoods, Education; 2.4 million+ people in 30+ counties'],
      ['Tools', 'CommCare, Google Sheets, Mobiwater, Superset'],
      ['Engagement', 'Platform plus consulting since October 2024, with 40+ hours of training']
    ],
    results: [
      { figure: 'Every team, one live view', label: 'Leaders check reported numbers against the dashboards in review meetings' },
      { figure: '3 times a day', label: 'Data refresh, from CommCare to dashboards' },
      { figure: 'Months → days', label: 'Time to roll out a new dashboard' },
      { figure: '12+ hrs → ~2 hrs a week', label: 'Weekly data cleaning for caseworkers and the MEL team' }
    ],
    challenge: {
      lead: 'Each SHOFCO program team collected their own data: gender-based violence (GBV) cases and counselling in Gender, school and scholarship support in Education, water supplied in WASH, and business-skills training in Livelihoods. That data sat in CommCare, Google Sheets, the Mobiwater system and on paper.',
      bullets: [
        ['Manual cleaning every cycle.', 'Weekly internal reports and monthly-to-bi-annual donor reports meant downloading, cleaning and merging by hand: up to four hours for program staff and up to a whole day for the MEL team.'],
        ['Static reports.', 'Reports were prepared by hand and could not be filtered, so a follow-up question, such as how women fared on a result, went back to the MEL team to redo the analysis.'],
        ['A 2023 stack that did not fit.', 'CommCare did not suit every program, the setup depended on paid external retainers, and Power BI licences ruled out field-level dashboards.']
      ],
      quote: { text: 'We were not able to do things in real time, because we had to wait until the end of the week or the end of the month for us to go into the system, download, clean, and analyze.', name: 'Nicholas Ong’injo', role: 'MEL Manager' }
    },
    approach: {
      heading: 'How we worked together',
      bullets: [
        ['Designed with each team.', 'The Dalgo team asked caseworkers, the MEL team and leadership which questions they needed answered, then built KPIs for leadership, program tracking for MEL, donor views, and caseload views where each caseworker sees only their assigned cases.'],
        ['One pipeline behind it.', 'CommCare (a mobile data collection platform), Google Sheets and Mobiwater (smart meters that record the water supplied) flowed into one store, cleaned on arrival and refreshed three times a day. Programs kept the tools that suited them.'],
        ['Skills that stay.', "Training on dashboards, data models and pipeline troubleshooting, so SHOFCO's own team could take on new requests. Adoption rose once the dashboards were built into caseworkers' routines and caseworkers co-designed features."]
      ]
    },
    transformation: {
      lead: "Every team now works from the same live data, and each makes an informed decision based on their objective.",
      items: [
        ["Leadership.", "Reviews used to wait for end-of-week or end-of-month reports. Now leaders check reported numbers against the dashboards in review meetings and question gaps on the spot."],
        ["Program managers.", "They once reported a single total of participants reached. Now they check each caseworker's progress against Rights of Children (ROC) club targets."],
        ["MEL team.", "Weekly data cleaning for caseworkers and the team fell from more than 12 hours to about 2, and that time now goes to validating data. Program staff can now split a result by gender or region themselves, where they once had to ask the MEL team to redo the analysis."],
        ["Caseworkers.", "They moved from memory, sticky notes and wall charts to their own caseload, tracked digitally. Each month they track open, resolved and closed cases and see how long each case has stayed open, so they can decide which cases need a follow-up."]
      ],
      quoteAfter: 0,
      quote: { text: "When you are reporting on a certain thing, [leaders] make reference: 'let me check on the dashboard' — and if it's not matching, then they'll ask questions then and there.", name: "Nicholas", role: "MEL Manager" }
    },
    next: 'Dashboards are live for Gender, WASH, Livelihoods and Education. The SHOFCO Urban Network, libraries and financial cooperative will come onto Dalgo next.'
  },

  {
    slug: 'ummeed',
    headline: { pre: 'Lessons from ', hl: 'Ummeed', post: ': seeing the whole child across clinic and training data' },
    docLayout: true,
    about: 'Ummeed Child Development Center in Mumbai, India, works with children with and at risk of developmental disabilities, and their families. They have served about 15,500 children through more than 152,000 clinical sessions, and trained more than 11,200 professionals. Their data sits in the CMS and TMS, with dashboards on Superset.',
    org: 'Ummeed',
    sector: 'Health',
    cardTitle: 'Seeing the whole child across clinic and training data',
    title: 'Seeing the whole child across clinic and training data',
    img: 'assets/cases/ummeed-card.webp',
    // Rebuilt 18 Nov 2026 from assets/cases/ummeed.webp, the full 900x600 frame already in
    // the repo. The previous file was a 443x295 centre crop of the same photograph that cut
    // the child's head off at the bottom of the 3:2 frame and upscaled 1.26x on top of it.
    hero: { src: 'assets/cases/ummeed-hero.webp', alt: "An Ummeed therapist and a child sitting together with a toy during a clinic session" },
    logo: 'assets/logos/Ummeed.png',
    approachImg: { src: 'assets/cases/ummeed-approach.webp', alt: 'How Dalgo and Ummeed worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: "Ummeed was able to connect their clinic and training systems. Clinicians, managers and fundraisers now act on each child's full journey, refreshed every week.",
    facts: [
      ['Partner', 'Ummeed Child Development Center, Mumbai, India'],
      ['Work', 'Children with and at risk of developmental disabilities, and their families; about 15,500 children, 152,000+ clinical sessions, 11,200+ professionals trained'],
      ['Tools', 'Clinic Management System, Training Management System, Superset']
    ],
    // The doc's fourth result was a bracketed placeholder until the 16 Nov revision, which
    // publishes it unbracketed. It ships here for the first time.
    results: [
      { figure: 'Monthly → weekly', label: 'Data refresh, with no manual cleaning in between' },
      { figure: '2 systems, 1 view', label: "Clinic (15,500+ records) and training (14,000+) connected into each child's journey" },
      { figure: '4 teams', label: 'Monitoring and evaluation (M&E), program, senior management and fundraising teams work from the same dashboards' },
      { figure: '10 hrs → 1 hr a week', label: 'Weekly data cleaning time' }
    ],
    challenge: {
      lead: "A child could first come to Ummeed's clinic at the age of 2 or 3 and return at 7 or 8, while their caregivers were trained and the family used the Family Resource Center, where families support other families. The clinic and training programs each had a separate system, and other programs tracked their data in Excel.",
      bullets: [
        ['Monthly manual exports.', 'Cleaning the Excel export from their management information system (MIS) took the M&E team a couple of days, so analysis ran once a month.'],
        ['Reports nobody could explore.', 'Power BI ran on static Excel with no licence, so reports went out as non-interactive PDFs.']
      ],
      tail: 'In a 2022 Family Outcome Survey, many families scored low, 2.9 out of 7, on awareness of their rights and on advocating for their children. Acting on that needed a view of which services each family had used, and no system could show it.',
      quote: { text: "What didn't work for us is that it was all in silos — it was all for the program. Every time we deployed something, we thought, okay, this is the clinic, so what does the clinic need … But to then think about the entire system for that child — that thought process was not there initially.", name: 'Vinodhini Umashankar', role: 'Associate Director, M&E' }
    },
    approach: {
      heading: 'The fix',
      lead: "Through Dasra's Data Catalyst Program, run with Dalgo, Ummeed was asked to pick one data problem to solve. Their team first traced children's journeys by hand, matching Excel records by phone number. It worked, and it showed the job needed a system.",
      bullets: [
        ['Both systems connected.', 'Data from the Clinic Management System (CMS) and the Training Management System (TMS) was set to arrive every week through their APIs, cleaned and connected automatically.'],
        ['Three dashboards.', 'The Dalgo team built Clinic, Training and Pathways dashboards; Pathways follows each child across both systems.'],
        ['A team that runs it.', "A 4-day handover training on Superset (the dashboard tool), access roles, data quality checks and the dbt models (the code that cleans and connects the data), so Ummeed's team could run it themselves."]
      ]
    },
    transformation: {
      lead: "Clinic and training data now sit in one warehouse, connected by the child’s record, and four teams work from the same dashboards.",
      items: [
        ["Clinicians and care team.", "Before a consultation, they now see a child's sessions, caregiver trainings and other services the family has used, so they give more informed guidance and connect the family to the services that fit the child."],
        ["Program managers.", "They read clinic and training numbers together. When clinical sessions dip in a month the same clinicians ran more trainings, managers can see the dip is explained and needs no fix. Before, clinic data alone left them asking why things were not going well."],
        ["M&E.", "The monthly Excel dump cleaning that used to take a couple of days now runs on its own every week. The team uses the dashboards to track progress, spot mission drift and update management and donors, and answers other teams' new questions."],
        ["Fundraising.", "When writing a case story for a donor report, the team reads the child's journey and goes back to the program team with sharper questions, then pulls ready charts filtered to the reporting period. Dashboards for donors themselves are not built yet."]
      ],
      quote: { text: "It helps our care team provide better services for the children and the caregivers; they're able to have more meaningful conversations, because they're aware of the services the family has taken.", name: "Vinodhini Umashankar" }
    },
    next: 'Teams now ask M&E for more, which Vinodhini calls a cyclic loop. Next, Ummeed will model how families move through their services, link the journey to child development outcomes, and bring in their other programs. Her advice to other NGOs: do your homework on what you want before you start.'
  },

  {
    slug: 'antarang',
    headline: { pre: 'Lessons from ', hl: 'Antarang', post: ': from multiple Excel sheets to dashboards every team can trust' },
    docLayout: true,
    about: 'Antarang Foundation, based in Mumbai, India, runs career guidance for students in grades 9 to 12, mostly in government schools, and reaches more than 1 lakh (100,000) students a year. They have used Dalgo since 2023, after a six-month evaluation in which the Dalgo team answered their questions on the transition. Their dashboards run in Looker Studio, Google’s reporting tool.',
    // 100% white pixels: invisible on any light ground, so it is inverted to ink on the card.
    logoPale: true,
    org: 'Antarang',
    sector: 'Education',
    cardTitle: 'From multiple Excel sheets to dashboards every team can trust',
    title: 'From multiple Excel sheets to dashboards every team can trust',
    img: 'assets/cases/antarang-card.webp',
    hero: { src: 'assets/cases/antarang-hero.webp', alt: "Antarang's Tier 1 student dashboard, showing average improvement and endline performance by academic year", kind: 'illustration' },
    logo: 'assets/logos/Antarang.webp',
    approachImg: { src: 'assets/cases/antarang-approach.webp', alt: 'How Dalgo and Antarang worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'Antarang Foundation, a career-guidance nonprofit in Mumbai, India, replaced data from multiple sources with one automated pipeline, giving program and donor teams a shared view of their work from which to make informed decisions, with dashboards refreshed every 24 hours.',
    facts: [
      ['Partner', 'Antarang Foundation, Mumbai, India'],
      ['Work', 'Career guidance for grades 9 to 12, mostly in government schools; 1 lakh (100,000)+ students a year'],
      ['Tools', 'Salesforce, Kobo Toolbox, Google Sheets, Looker Studio'],
      ['With Dalgo since', '2023, after a six-month evaluation in which the Dalgo team answered their questions on the transition']
    ],
    results: [
      { figure: 'Half a day → an hour or two', label: 'Daily sheet upkeep, now needed only when a pipeline fails' },
      { figure: 'Gaps caught between quarters', label: 'Donor reporting team checks data as it refreshes and asks programs to close gaps before reporting' },
      { figure: '20–25 sheets → 1 pipeline', label: 'Salesforce, Kobo Toolbox and Google Sheets in one place' }
    ],
    challenge: {
      lead: 'After a 2020-21 shift to working closely with government schools, the volume of student data Antarang stored grew sharply. Their dashboards had run on Excel since 2018-19, and the sheets could not keep up.',
      bullets: [
        ['Sheets that took half a day to maintain.', 'One staff member spent half of every working day keeping 20 to 25 sheets refreshed so that dashboards showed current data, and the sheets still froze.'],
        ['Management questions waited on manual work.', 'Senior management wanted to track how well programs were working so they could improve student performance, but the dashboard that monitored student growth was slow to load and the data was not in one place.'],
        ['Gaps found only at reporting time.', 'Teams waited on one person to prepare the data before they could look at it, so gaps, such as paper answer sheets (OMRs) not yet entered, surfaced only when quarterly donor reports were due.']
      ],
      quote: { text: "[Before Dalgo, at each quarter's donor reporting] every donor's working file needs to be remade at least two or three times … it is quite stressful … I will be working till 8, till 9, beyond my working hours — and that's for everybody in the donor reporting team.", name: 'Shaheeda', role: 'who works on monitoring and evaluation (M&E) and donor reporting at Antarang Foundation and led their move to Dalgo' }
    },
    approach: {
      heading: 'The fix',
      bullets: [
        ['One pipeline.', 'Data from Salesforce (the database holding student and program records), Kobo Toolbox (mobile surveys) and Google Sheets was pulled in automatically, reshaped into ready-made tables for the dashboards, and refreshed every 24 hours.'],
        ["Built around the program's questions.", "Goalkeep, the implementation partner, built the pipeline and data models around the program's key questions, such as whether students are improving and whether they master the endline (end-of-program) assessment."],
        ['Views by role and place.', "Antarang's existing monitoring and evaluation (M&E), program and facilitator views and state dashboards moved onto clean tables, and new dashboards were added for reporting to donors and to partners such as government stakeholders and junior colleges."],
        ['Alerts on failure.', 'Notifications were set up so the team knew at once when a pipeline failed.']
      ]
    },
    transformation: {
      items: [
        ["Program teams.", "They have moved off the Excel sheets they kept on their own and now trust the dashboards enough to act on them: each team reads the indicators for their role and brings those insights into how they run the program."],
        ["Donor reporting.", "The donor reporting team checks the data as it refreshes, spots gaps such as answer sheets not yet entered, works out which program needs to close them, and asks that team to prioritise the work before reporting. Donor and partner dashboards also serve engagement between quarters, such as donor meetings and volunteer events."]
      ],
      tail: "Keeping the data current once took half of every working day. It now takes an hour or two, and only when a pipeline fails.",
      quote: { text: "When the data gets refreshed every 24 hours, somebody is dedicated to looking at the data; they are not dependent on [me] to make it before they can look at it … So anything they figure out, they come back and we can actually reach out to the relevant people saying, hey, this is not done, can you please prioritize this.", name: "Shaheeda", role: "Antarang Foundation" }
    },
    next: "Antarang will streamline the data tables they built at the start and will move carefully on new dashboard tools. It took years to get program teams to trust the dashboards they use, so Shaheeda will weigh any switch to Dalgo's own dashboards. Shaheeda's advice to other NGOs: digitise your data, then decide which metrics will show whether a program is working and which strategic decisions the data needs to inform."
  },

  {
    slug: 'shri',
    headline: { pre: 'Lessons from ', hl: 'SHRI', post: ': running 20 public toilets on data the whole team can trust' },
    docLayout: true,
    // The master doc gives SHRI no sentence about the organisation in this section,
    // so the partnership block ends on the result table. Nothing is invented to fill it.
    org: 'SHRI',
    sector: 'Sanitation',
    cardTitle: 'Running 20 public toilets on data the whole team can trust',
    title: 'Running 20 public toilets on data the whole team can trust',
    img: 'assets/cases/shri-card.webp',
    hero: { src: 'assets/cases/shri-hero.webp', alt: "A SHRI Foundation community toilet block in Jharkhand, painted with Clean Green Jaridih murals" },
    logo: 'assets/logos/SHRI.png',
    approachImg: { src: 'assets/cases/shri-approach.webp', alt: 'How Dalgo and SHRI worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'Sanitation and Health Rights in India (SHRI) runs free public toilets across Bihar and Jharkhand, India. The Dalgo team worked with them to turn the daily forms their facility staff fill in into automated reports and a public dashboard. This helps teams identify and resolve problems faster, while giving funders, government officials, and communities access to the same reliable data.',
    facts: [
      ['Partner', 'Sanitation and Health Rights in India (SHRI), Bihar and Jharkhand'],
      ['Work', 'Free shared public toilets with daily operations and monitoring; 20 facilities, used over 2.2 million times in 2024'],
      ['Tools', 'Kobo, Looker Studio'],
      ['Engagement', "Platform plus consulting. One of Dalgo's earliest partners; the reporting system was built with the Dalgo team"]
    ],
    results: [
      { figure: 'Problems fixed in time', label: "Operations sees each facility's use, issues and staff check-ins every day and decides what to fix" },
      { figure: 'Every day', label: 'Public dashboard refresh for funders, government and community, in Hindi and English' },
      { figure: '99% uptime', label: 'Days facilities are open and working, now tracked daily' },
      { figure: '5–7 hrs a week → automated', label: "Report preparation, which once needed one person's know-how" }
    ],
    challenge: {
      lead: 'Consistent toilet use depended on every stall staying clean and working, and on SHRI knowing which facilities had problems in time to fix them. With thousands of users a day, that became harder to manage with every facility they added.',
      // The 16 Nov doc sets this quote directly under the lead, above the bullets it frames.
      quoteFirst: true,
      bullets: [
        ['Reports that depended on one person.', 'Preparing reports took 5 to 7 hours a week and needed specialist knowledge that one person held.'],
        ['No daily view of the facilities.', 'The team could not see in real time what was happening at each facility, so they could not tell which facilities needed attention in time to fix problems.'],
        ['A dashboard built on manual entries.', 'The public dashboard showed only what staff had entered by hand, so it was only as current as the last entry.']
      ],
      quote: { text: 'When you operate dozens of these facilities with thousands of people using them every day, making sure all the facilities and stalls are high quality becomes complicated.', name: 'Anup', role: 'CEO' }
    },
    approach: {
      heading: 'How we worked together',
      lead: "The Dalgo team worked with SHRI to build their reporting system. Facility staff kept the four Kobo mobile data-collection forms they already used; the system connected them, so every submission flowed into reports and dashboards without anyone rebuilding them.",
      bullets: [
        ['Daily use.', "People-counting machines on the men's and women's sides, logged by staff each evening, with unusually high or low days easy to spot."],
        ['Staff check-in.', 'A barcode scan on each staff ID card marked attendance at every facility.'],
        ['Issue reporting.', 'Twice a day, once per shift, staff logged electrical, plumbing, infrastructure, supply, cleanliness and technology issues.'],
        ['Weekly photos.', 'Timestamped, geotagged photos of every facility, filterable by facility and date.']
      ],
      quote: { text: "We wouldn't have [this impact] without our staff, who are now so skilled at using the digital tools that the Dalgo team helped us build.", name: 'Anup', role: 'CEO of SHRI' }
    },
    transformation: {
      lead: "Every Kobo form now feeds a daily report and a public dashboard, so each team acts on the same picture of all 20 facilities.",
      items: [
        ["Operations and leadership.", "A daily report on use, attendance, issues and photos shows them which problems to fix, how each facility is being used and where quality needs attention. When use drops at a facility, they can match it to the days it was out of service and act quickly to get it open again."],
        ["Supervisors.", "They are able to check whether staff checked in and cleaned at least twice a day, as SHRI's rule requires, at every facility, which holds staff accountable for keeping facilities as clean as SHRI promises."],
        ["Facility staff.", "The daily use report is visual enough for facility staff to read, so they see the same daily numbers as management, including unusually high or low days at their own facility, and stay informed about the issues there so they can fix them in time."],
        ["Funders, government and community.", "The public dashboard once showed whatever staff had entered. It now updates every day, in Hindi and English, with maintenance logs, outages and staff attendance, so anyone can check that facilities are kept as clean and working as SHRI promises. SHRI says this gives people confidence in their transparent operations."]
      ],
      tail: "The weekly report that took 5 to 7 hours by hand is now generated automatically, and the system calculates total use, average daily use and cost per use.",
      quote: { text: "It's like real-time feedback on how our systems are functioning and what changes we need to make based on the data.", name: "Anvesh", role: "Director of Operations, Monitoring and Evaluation at SHRI" }
    },
    next: 'SHRI will start monthly random spot checks with district water and sanitation committees to validate their data, and will continue working with the Government of Jharkhand on taking the model to more community toilets, schools and health facilities. With other NGOs, they call this “Shri in a box”.'
  },

  {
    slug: '1000-days-fund',
    headline: { pre: 'Lessons from ', hl: '1000 Days Fund', post: ': getting at-risk mothers and children back to the field in time' },
    docLayout: true,
    about: '1000 Days Fund works on maternal and child nutrition in Indonesia through community health workers (kaders), and has reached more than 1 million pregnant women and children under five since 2019. They had six months of platform plus consulting with the Dalgo team, up to September 2026. Their data comes from Kobo, Google Forms and Google Sheets, modelled in dbt and shown in Superset (the dashboard tool).',
    org: '1000 Days Fund',
    sector: 'Maternal & Child Health',
    // Shortened by Stuti, 5 Nov, from "Getting at-risk mothers and children back to the
    // field in time". It is the webinar's own title, and it is the one title the master
    // doc and the site now differ on -- a doc re-check should not quietly put the long
    // one back.
    cardTitle: 'Driving Beneficiary Impact from Data',
    title: 'Driving Beneficiary Impact from Data',
    img: 'assets/cases/1000-days-fund-card.webp',
    hero: { src: 'assets/cases/1000-days-fund-hero.webp', alt: "A 1000 Days Fund community health worker sitting with mothers and their babies" },
    logo: 'assets/logos/TDF.webp',
    approachImg: { src: 'assets/cases/1000-days-fund-approach.webp', alt: 'How Dalgo and 1000 Days Fund worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: "1000 Days Fund brought five data sources into one warehouse with Dalgo’s consultants, enabling their team to identify at-risk pregnant women and children as cases are flagged in the system and make timely intervention decisions, rather than waiting weeks for reports to reach field teams.",
    facts: [
      ['Partner', '1000 Days Fund, Indonesia'],
      ['Work', 'Maternal and child nutrition through community health workers (kaders); 1 million+ pregnant women and children under five reached since 2019'],
      ['Tools', 'Kobo, Google Forms, Google Sheets, dbt, Superset'],
      ['Engagement', "Platform plus consulting, six months by September 2026. Dalgo's consultants worked alongside TDF's data specialist, who led the build and now runs it"]
    ],
    results: [
      { figure: 'At-risk cases flagged in the system', label: 'Field teams follow up pregnant women and children sooner, where cases once reached them weeks later' },
      { figure: '5 sources → 1 warehouse', label: 'Training, Kader Academy, village health post (posyandu) registers and monitoring, and the Community Health Worker Assessment and Improvement Matrix, refreshed automatically' },
      { figure: '14 training modules', label: 'Each person’s pre- and post-test now matched, where only regional averages were possible' },
      { figure: '2–3 weeks → about 1 week', label: 'Monthly data preparation time' }
    ],
    challenge: {
      // Two paragraphs in the master doc, kept as two.
      lead: [
        '1000 Days Fund works through government systems: posyandu (monthly village health posts), puskesmas (public health centres) and village governments. Their Community Care Model trains and supports community health workers, who run home visits, nutrition counselling, growth monitoring and risk screening. The team relied on data to see who was at risk, where the gaps were and whether interventions were working, and to send what they learned back to the kaders who collected it so they could adjust.',
        'That data lived in five sources on personal drives. The dashboard was a Google Sheet pulling from a chain of other sheets, until the tables grew too big to import and a hand-run Python script took over. The team spent more effort keeping this system running than using the data.'
      ],
      bullets: [
        ['Fragmentation.', 'No single place to ask a question; anything off the dashboard became a project.'],
        ['Inconsistency.', "Free-text names and places on Google Forms. One district, Sumba Barat, was written three ways. Multiply that across every district and village in Indonesia's 38 provinces."],
        ['Manual effort.', 'Two to three weeks a month preparing data, and figures occasionally restated after submission.']
      ],
      quote: { text: 'If the answer is not on our dashboard, that could be a whole project and not a simple query.', name: 'Pandu Gusti Resworo', role: 'Data Specialist' }
    },
    approach: {
      heading: 'How we worked together',
      lead: '1000 Days Fund chose Dalgo partly because, in the team’s words, it “comes with a consulting team rather than only a licence key.” Pandu Gusti Resworo, Data Specialist at 1000 Days Fund, led the build, designing the data models in dbt (code that cleans and connects the data) with Dalgo’s consultants, and the organisation has not needed to hire a data engineer. Field teams kept their forms, and everything, including older form versions back to 2019, now flows into one warehouse automatically.',
      bullets: [
        ['One identity per person.', 'A six-tier matching cascade uses name, place and the context of each submission, so one kader no longer counts as three people.'],
        ['Standard geography.', 'Reference tables resolve spelling variants, so results join across forms.'],
        ['Quality checks in the pipeline.', 'Nothing is dropped; implausible values are flagged and sent back to the person who entered them.'],
        ['Dashboards in Superset.', 'A systems change assessment view and a leadership overview of reach and outcomes.']
      ]
    },
    transformation: {
      lead: "Every source now flows into one warehouse as tables ready to analyse, so a question that once became a project can be answered from one place, and each team makes informed decisions based on their objective.",
      items: [
        ["Field teams and kaders.", "At-risk cases once reached them in reports, sometimes weeks later. Now cases are flagged as data arrives, and teams decide which pregnant women and children to visit first from case lists and flags on chronic malnutrition, hypertension, stunting and weight faltering."],
        ["Monitoring, evaluation and research (MER) team.", "Monthly data preparation fell from 2 to 3 weeks to about one week, and the team spends the time saved analysing questions they had no time to explore before. The team works in SQL and dbt in one warehouse, and data errors are flagged in the pipeline and sent back to the kader who entered them."],
        ["Program teams.", "Training results used to be an average score per region. Now they see each person's scores before and after, and who took only one test, and spend their time deciding next steps from one source of data."],
        ["Leadership.", "Leaders see system change and program outcomes in one consolidated dashboard, and argue decisions from one set of indicator definitions across programs and funders."]
      ],
      quote: { text: "I think the most important change is not a shinier dashboard, but the questions that we were able to ask.", name: "Pandu Gusti Resworo", role: "Data Specialist" }
    },
    next: '1000 Days Fund will add range and plausibility checks, duplicate flags and missed-visit flags, each routed back to the person who entered the data, and automated alerts that send at-risk cases to field teams, village task forces and puskesmas. In the words of Adlina Basuki, Monitoring, Evaluation and Research Manager at 1000 Days Fund, the goal is “to be able to catch the bad values before it becomes a bad decision.”'
  },

  // ---- Added 16 Nov 2026, when the master doc's 8th revision resolved their tracked
  // suggestions and removed their "Open questions" blocks. None has a 1200x630 listing card
  // or a 1600x900 approach arc; the listing tile is text-led and needs only the logo, so that
  // costs nothing. Bhumi and STiR got hero photographs on 18 Nov (Stuti) and sit on the visual
  // tier with the other five. BAALA IS STILL TEXT-ONLY (.cvh-grid-solo) for want of a photo —
  // drop a `hero` in and it joins them with no other change. ----
  {
    slug: 'bhumi',
    headline: { pre: '', hl: 'Bhumi', post: ': One source of truth for every child Bhumi reaches' },
    docLayout: true,
    about: 'Bhumi runs education programs in India from grade 2 through graduation. In 2025–26, their programs reached more than 250 schools and nearly 110,000 children and youth, and engaged nearly 130,000 volunteers. They have worked with the Dalgo team since July 2025, on the platform plus consulting: data mapping, a redesigned schema, the first dashboard and a three-day bootcamp.',
    org: 'Bhumi',
    sector: 'Education',
    cardTitle: 'One source of truth for every child Bhumi reaches',
    title: 'One source of truth for every child Bhumi reaches',
    img: 'assets/cases/bhumi-card.webp',
    hero: { src: 'assets/cases/bhumi-hero.webp', alt: 'Three people looking at a laptop together during a hands-on data training session' },
    logo: 'assets/logos/Bhumi.png',
    approachImg: { src: 'assets/cases/bhumi-approach.webp', alt: 'How Dalgo and Bhumi worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'Bhumi worked with the Dalgo team to bring their program data into one place, starting with their fellowship assessments. Their own three-person tech team now builds the dashboards and pipelines.',
    facts: [
      ['Partner', 'Bhumi, India'],
      ['Work', 'Education programs from grade 2 through graduation; in 2025–26, 250+ schools, nearly 110,000 children and youth and nearly 130,000 volunteers'],
      ['Tools', 'Zoho Creator'],
      ['Engagement', 'Platform plus consulting since July 2025: data mapping, a redesigned schema, the first dashboard and a bootcamp']
    ],
    results: [
      { figure: 'One count for every number', label: 'Teams now shape their reporting so their data lands in one source of truth' },
      { figure: 'Bhumi builds their own', label: 'Their three-person tech team writes the pipelines, transformations and dashboards' },
      { figure: 'An open-source connector', label: 'Built for Zoho Creator, now available to every nonprofit' }
    ],
    challenge: {
      bullets: [
        ['Two answers to one question.', 'The total number of children reached could differ depending on which source you looked at.'],
        ['Numbers nobody fully trusted.', 'Every analysis meant reworking: getting teams to agree on where the data was and whether it was correct. The data could not show in real time where a program was going wrong or what needed to change.'],
        ['Days of preparation.', 'A monthly or quarterly leadership review took two to three days to prepare, sometimes more.']
      ],
      quote: { text: "Which means that if we just asked, what is the total number of children that we reached in a year, we could come up with two different answers depending on which source of data you're looking at. And that's a very fundamental problem to have.", name: 'Anusha Vishwanath', role: 'Executive Assistant to the Co-founder, Bhumi' }
    },
    approach: {
      heading: 'How we worked together',
      bullets: [
        ['Started with one team.', "The Dalgo team mapped Bhumi's data, then ran a proof of concept on the fellowship team's baseline, midline and endline assessments in foundational literacy and numeracy."],
        ["Built around Bhumi's reporting.", "The Dalgo team and Bhumi’s tech team redesigned the schema around what Bhumi reports, built the first dashboard as a template, and wrote an open-source connector for Zoho Creator."],
        ['Skills that stay.', "A two-day bootcamp in September 2025 taught Bhumi's tech team dbt (a tool for cleaning and modelling data in code). Field teams kept their day-to-day work unchanged while the system was built."]
      ],
      quote: { text: 'But for the time being, we are not disrupting our teams in their day-to-day work, which was a very important consideration for us.', name: 'Anusha Vishwanath', role: 'Executive Assistant to the Co-founder, Bhumi' }
    },
    transformation: {
      lead: "Bhumi now has one source of truth. A team's data counts only if it is there, so teams shape their reporting to fit it, and that is changing how they treat data.",
      items: [
        ['Fellowship team.', 'Baseline, midline and endline results now sit in one dashboard that updates as fellows enter assessments. Program managers drill down to the schools or cities that are lagging and follow up or take corrective action.'],
        ['Tech team.', "Bhumi's three-person team builds their own dashboards, pipelines and transformations, and works with the Dalgo team to keep momentum."],
        ['Field teams.', 'They are more aware of what data to collect, how to collect it and why it needs to be well structured, and they reach out to the tech team for help with those decisions. Fewer entries need rechecking by hand as teams add their own sanity checks.']
      ],
      quote: { text: "It's easier to get the organisation on board to ensure that the data is flowing into this single source of truth, which is also leading to a stronger culture of being data aware — of having that lens where you're looking at your data and thinking, 'I need to make this clean, I need to make this consistent, I need to do these things so that my data will eventually work for me.' I think that culture is also getting built in the organisation.", name: 'Anusha Vishwanath', role: 'Executive Assistant to the Co-founder, Bhumi' }
    },
    next: "Bhumi will move more of their teams' reporting onto Dalgo and expects to see the change in review preparation over the next two to three months."
  },

  {
    slug: 'stir-education',
    // Stuti's own title (18 Nov), not the master doc's "Automated data work that let teams
    // focus on the mission". The partner name is not in this headline, so the single teal
    // accent falls on "Strategic Insight" — the phrase the title turns on — rather than being
    // dropped, which would leave this the one H1 on the site with no accent at all.
    headline: { pre: 'From Data Burden to ', hl: 'Strategic Insight', post: ': Transforming data across countries with Dalgo' },
    docLayout: true,
    about: 'STiR Education works to improve learning outcomes for children by building intrinsic motivation in teachers and officials, and their programs have improved engagement and learning outcomes for over 12 million children. They worked with the Dalgo team on the platform plus consulting: 100 hours of consulting to understand their needs and build the solutions, then support. Their data came from POI Mapper and SurveyCTO (mobile data collection tools), with dashboards on Superset (an open-source dashboard tool).',
    org: 'STiR Education',
    sector: 'Education',
    cardTitle: 'From Data Burden to Strategic Insight: Transforming data across countries with Dalgo',
    title: 'From Data Burden to Strategic Insight: Transforming data across countries with Dalgo',
    hero: { src: 'assets/cases/stir-hero.webp', alt: 'A participant speaking into a microphone during a session, with others listening at tables' },
    logo: 'assets/logos/STiREducation.png',
    approachImg: { src: 'assets/cases/stir-approach.webp', alt: "How Dalgo and STiR Education worked together, in four steps: the problem, how we started, what we built and what changed" },
    native: true,
    standfirst: 'STiR Education works with teachers, principals and officials to improve learning. While STiR worked with the Dalgo team, their monitoring and evaluation (M&E) team stopped building every review by hand, and leadership, design and donor teams used the data to decide and report for themselves. STiR could put more of their time into their mission.',
    facts: [
      ['Partner', 'STiR Education'],
      ['Work', 'Building intrinsic motivation in teachers and officials; engagement and learning outcomes improved for over 12 million children'],
      ['Tools', 'POI Mapper, SurveyCTO, Superset'],
      ['Engagement', 'Platform plus consulting: 100 hours of consulting to understand their needs and build the solutions, then support']
    ],
    results: [
      { figure: 'Teams stopped waiting for M&E', label: 'Leadership, design and donor teams used the dashboard for their own decisions and reports' },
      { figure: 'M&E as enablers', label: 'The team moved to improving data quality and training program teams to use data' },
      { figure: '100 hours of consulting', label: "To understand STiR's needs and build the solutions with their team" },
      { figure: 'A week → an hour', label: 'Preparing a monthly check-in with the program teams' }
    ],
    challenge: {
      lead: "STiR's programs depend on behavioural data: what teachers, principals and officials do, collected often and used to change the program design. Preparing that data for each review fell to a small M&E team.",
      bullets: [
        ['A week per check-in.', 'Monthly and quarterly check-ins took about a week to collate the data, analyse it and prepare decks the program teams could read, so teams could not get timely insights to plan their next actions.'],
        ['A dashboard that did not fit.', 'STiR had a dashboard, but it was not flexible enough for the teams, so the preparation continued by hand.'],
        ['Everyone waited on M&E.', 'Program teams depended on the M&E team to crunch the numbers before they could decide.']
      ],
      quote: { text: 'Compiling the data into a presentable form so that teams could understand and interpret it, and then iterate on design, was a challenge. It involved a lot of time and effort.', name: 'Arun', role: 'a senior manager at STiR Education' }
    },
    approach: {
      heading: 'How we worked together',
      bullets: [
        ['Consulting first.', "The Dalgo team provided 100 hours of consulting to understand STiR's needs and implement the solutions."],
        ['Pipelines and dashboards.', "Data from STiR's collection tools flowed through automated pipelines into Superset dashboards that held years of data."],
        ['Skills that stay.', 'No formal course: the Dalgo team helped STiR staff understand the processes and build basic troubleshooting skills, with support on Discord.']
      ]
    },
    transformation: {
      lead: "The dashboard held years of STiR's data, and each team used it for their own decisions.",
      items: [
        ['Senior leadership.', 'Tracked performance trends across the years, aligned their decisions with design outcomes, and reported to the board and donors with up-to-date visuals.'],
        ['Design team.', 'Used the same data to see the effect of each change to the program design and decide what to change next.'],
        ['Donor partnerships.', 'Drew on the multi-year data for proposals, donor reports and newsletters. When donors or government asked how the program was working, the team could focus on the story instead of rebuilding the data.'],
        ['M&E team.', 'Preparing a monthly check-in took an hour at most, down from about a week. The team spent their time refining data collection tools, improving data quality and training program teams to use data on their own.']
      ],
      quote: { text: "So irrespective of the questions that come our way — whether from donors or the government — we’re now able to focus much more on building the story, rather than spending time working on the data to build that story.", name: 'Arun', role: 'a senior manager at STiR Education' }
    },
    // STiR's engagement has closed, so the master doc's closing section looks back rather
    // than forward and is headed "What it showed".
    nextHeading: 'What it showed',
    next: "STiR’s experience showed what changes when data work stops competing with program work. Arun, a senior manager at STiR Education, observed that processing data is technical work, and that NGOs find it difficult to sustain and motivate staff in such roles. Once automated pipelines handled most of that work at STiR, the M&E team moved from supplying data to building data literacy across the organisation, and teams could give their time, in Arun’s words, to “what needs to be done — what the mission of the organization is — rather than spending time and resources on the data itself.”"
  },

  {
    slug: 'baala',
    headline: { pre: '', hl: 'Baala', post: ': Scattered menstrual health data, brought into one place' },
    docLayout: true,
    about: 'Baala works to make menstrual health and sexual and reproductive health accessible and stigma-free in India. They build curriculums, train local champions in communities and organisations, and build evidence for advocacy on a subject people rarely talk about. They have worked with the Dalgo team since July 2025, on the platform plus consulting: a data warehouse, pipelines for 25 Kobo forms, and twice-weekly training in SQL, Python and dbt. Their data comes from Kobo Toolbox (mobile survey forms) and Google Sheets, with dashboards in Looker Studio (Google’s dashboard tool).',
    org: 'Baala',
    sector: 'Menstrual Health',
    cardTitle: 'Scattered menstrual health data, brought into one place',
    title: 'Scattered menstrual health data, brought into one place',
    img: 'assets/cases/baala-card.webp',
    logo: 'assets/logos/Baala.png',
    approachImg: { src: 'assets/cases/baala-approach.webp', alt: 'How Dalgo and Baala worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'Baala works on menstrual health in India. With the Dalgo team, they brought the data from 25 Kobo forms and their Google Sheets into one pipeline. Their monitoring and evaluation (M&E) team can now compare trends across programs and regions, and is learning to run the pipeline themselves.',
    facts: [
      ['Partner', 'Baala, India'],
      ['Work', 'Making menstrual and sexual and reproductive health accessible and stigma-free: curriculums, training local champions, and evidence for advocacy'],
      ['Tools', 'Kobo Toolbox, Google Sheets, Looker Studio'],
      ['Engagement', 'Platform plus consulting since July 2025: a data warehouse, pipelines for 25 Kobo forms, and twice-weekly training in SQL, Python and dbt']
    ],
    results: [
      { figure: 'Trends across programs and regions', label: 'The M&E team can compare programs and regions, with 25 Kobo forms and Google Sheets in one pipeline' },
      { figure: 'An M&E team that builds', label: 'Twice-weekly training in SQL, Python and dbt, with documented models' }
    ],
    challenge: {
      lead: "Baala's evidence work aimed, in the words of Karishma Navalkar, Monitoring and Evaluation Lead, to \"make this invisible visible\". They collected their data in many different settings, through 25 Kobo forms and Google Sheets. The more specific each context, the more scattered the data became.",
      bullets: [
        ['No single picture.', "Each intervention's data sat on its own, so the team could not compare trends across programs or geographies, or see their work as a whole."]
      ],
      quote: { text: 'Right now our major challenge is that our data is very scattered. The more context-specific it is, the more scattered the data looks. So we have data coming in from rural areas, very rural remote areas, as well as from very urban workspaces, as well as from different kinds of schools … we are trying to make sense of it by getting everything together and seeing it as a holistic picture, and not just as a singular intervention.', name: 'Karishma Navalkar', role: 'Monitoring and Evaluation Lead, Baala' }
    },
    approach: {
      heading: 'How we worked together',
      bullets: [
        ['Collection left as it was.', 'The Dalgo team drew on their work with other NGOs to show what dashboards could look like and the effort they would take. Baala decided to keep their data collection as it was and change only the M&E layer of the pipeline, so field teams did not have to change how they work.'],
        ['One pipeline.', 'The Dalgo team set up a data warehouse, with ingestion from Kobo Toolbox and Google Sheets, all 25 forms modelled, and every source in one place by September 2025.'],
        ['Skills that stay.', "From late 2025, the Dalgo team ran twice-weekly training in SQL (the language used to query databases), Python (a programming language) and dbt (a tool for cleaning and modelling data), and documented the data models, so Baala's M&E team could connect new forms themselves."]
      ],
      quote: { text: "I think what worked for us is that we are not changing the way people collect data. So at the moment we're using Dalgo to change the second level of the pipeline, which is more M&E-driven.", name: 'Karishma Navalkar', role: 'Monitoring and Evaluation Lead, Baala' }
    },
    // No per-team breakdown yet: the master doc's transformation is a single paragraph and a
    // quote, which is what ships. `items` is optional for exactly this case.
    transformation: {
      lead: "Baala's data now sits in one place, and their M&E team is learning to work with it directly.",
      quote: { text: "Getting everything in one place makes our life much easier, because now we're able to see trends across programs, across different geographies.", name: 'Karishma Navalkar', role: 'Monitoring and Evaluation Lead, Baala' }
    },
    next: 'Baala will next refine their dashboards, starting with a menstrual health dashboard for policy makers, other organisations and their own team. The insights will flow back to their field teams, so they collect only the data they need. They also plan to share their data with partners across the menstrual health ecosystem and invite them to contribute.'
  },

  // Only the partners written up in the master doc appear here (Stuti, 4 Nov). The six that
  // still had a projecttech4dev.org link — STiR Education, Baala, Bhumi, SNEHA, A.T.E. Chandra
  // Foundation and Arghyam — were removed rather than kept as outbound cards, so the listing
  // shows the current set and nothing else.
  //
  // TO ADD THE NEXT PARTNER: copy the shape of any entry above. Every field below `standfirst`
  // is optional, and scripts/gen-case-studies.mjs generates and prerenders its page on the
  // next build. `native: false` plus a `source` URL still works if a partner should link out
  // instead of getting a page.
];

// Fixed metadata structure, defined once so the pattern cannot drift as the set grows.
// Title follows the sitewide "{Page} — Dalgo | Data Insights for Nonprofits" pattern.
// Description is the opening of the standfirst, capped at the 158 chars scripts/seo-meta.mjs
// enforces everywhere else.
function caseStudyMeta(cs) {
  const title = cs.org + ' case study — Dalgo | Data Insights for Nonprofits';
  let desc = '';
  const src = cs.standfirst || '';
  if (src) {
    const sentences = src.split(/(?<=\.)\s+/);
    for (let i = 0; i < sentences.length; i++) {
      const next = desc ? desc + ' ' + sentences[i] : sentences[i];
      if (next.length > 158) break;
      desc = next;
    }
    // A short opening sentence must not leave a stub of a description: SHRI's first sentence
    // is 53 characters, and stopping there wastes two thirds of the search snippet. Below 90,
    // carry on into the next sentence and truncate it on a word boundary instead.
    if (desc.length < 90 && src.length > desc.length) {
      desc = src.slice(0, 155).replace(/\s+\S*$/, '') + '…';
    }
    if (!desc) desc = src.slice(0, 155).replace(/\s+\S*$/, '') + '…';
  } else {
    desc = cs.org + ' — a Dalgo case study on ' + cs.sector.toLowerCase() + ' data.';
  }
  return { title: title, desc: desc };
}

// The <h1> text as a plain string, for the places that must match it exactly but cannot
// render JSX: the Article JSON-LD headline in scripts/gen-case-studies.mjs. Composed from
// `headline` where a partner sets one, otherwise from the standard "<org>: <title>".
function caseStudyHeadline(cs) {
  if (cs.headline) return (cs.headline.pre || '') + cs.headline.hl + (cs.headline.post || '');
  return cs.org + ': ' + cs.title;
}

// EVERY HEADLINE IS THE MASTER DOC'S, VERBATIM (Stuti, 18 Nov). The "Lessons from " prefix was
// dropped on 5 Nov because it cost a headline line on four heroes, and 1000 Days Fund carried a
// different title entirely. Both are restored: the doc is the source and the page matches it.
// `headline` is set on all eight, so the fallback above is now only a guard for a new partner
// added without one.

window.CASE_STUDIES = CASE_STUDIES;
window.caseStudyMeta = caseStudyMeta;
window.caseStudyHeadline = caseStudyHeadline;
window.caseStudyBySlug = function (slug) {
  for (let i = 0; i < CASE_STUDIES.length; i++) if (CASE_STUDIES[i].slug === slug) return CASE_STUDIES[i];
  return null;
};
window.caseStudySectors = function () {
  const seen = [];
  CASE_STUDIES.forEach(function (c) { if (seen.indexOf(c.sector) === -1) seen.push(c.sector); });
  return seen;
};
