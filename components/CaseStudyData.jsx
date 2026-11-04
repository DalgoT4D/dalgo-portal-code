// Case study content model — the single source of truth for /case-studies and every
// /case-studies/<slug> page. Lives in components/ rather than as a loose .js for one concrete
// reason: scripts/hash-assets.mjs rewrites 'assets/…' URLs with a ?v= hash inside
// app.bundle.js, and a standalone data file is skipped, so every card image would ship
// uncacheable.
//
// SOURCE: "Dalgo Case Studies - Master Doc - Nov 2026". Five partners, one six-part template:
// standfirst, at-a-glance facts, key results, the challenge, how we worked together, the
// transformation, what's next. Copy is Stuti's and is reproduced as written.
//
// WHAT WAS DELIBERATELY LEFT OUT, because the master doc is an internal working document and
// these parts are not for readers (Stuti, 4 Nov):
//   - every "Appendix" (source sheet links, "Built with" provenance)
//   - every "Open questions" block (what still needs vetting, surnames to confirm, photos to
//     chase)
//   - the whole "Decision impact evidence" research section, which is a working pass over
//     quotes that are not yet in any draft
//   - Ummeed's fourth key result, written in the doc as "[10 hrs → 1 hr a week] … Placeholder
//     until Vinodhini confirms". An unconfirmed number is exactly the kind of claim that must
//     not reach a public page, so Ummeed ships three results rather than a guess.
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
    org: 'SHOFCO',
    sector: 'Community Empowerment',
    cardTitle: 'A live view of program data for every team',
    title: 'A live view of program data for every team',
    img: 'assets/cases/shofco-card.webp',
    logo: 'assets/logos/SHOFCO.png',
    approachImg: { src: 'assets/cases/shofco-approach.webp', alt: 'How Dalgo and SHOFCO worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'SHOFCO worked with the Dalgo team to bring four tools and paper into one pipeline that refreshes three times a day. Leadership, MEL teams, caseworkers and donors now each decide from the view they need.',
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
      { figure: '12 hrs → 2 hrs a week', label: 'Data cleaning time in the Gender team' }
    ],
    challenge: {
      lead: 'SHOFCO started in Kibera in 2004 and now works in over 30 counties. Each program collects its own data: GBV cases and counselling in Gender, attendance in Education, water dispensed in WASH, income in Livelihoods. That data sat in CommCare, Google Sheets, the Mobiwater system and on paper.',
      bullets: [
        ['Manual cleaning every cycle.', 'Weekly internal reports and monthly-to-bi-annual donor reports each meant downloading, cleaning and merging by hand: 4+ hours a week for caseworkers, 8+ for the MEL team.'],
        ['Static reports.', 'PDFs and slides. Every follow-up question went back to the MEL team.'],
        ['A 2023 stack that did not fit.', 'CommCare did not suit every program, the setup needed outside experts, and Power BI licences ruled out field-level dashboards.']
      ],
      quote: { text: 'We were not able to do things in real time, because we had to wait until the end of the week or the end of the month for us to go into the system, download, clean, and analyze.', name: 'Nicholas', role: 'MEL Manager' }
    },
    approach: {
      heading: 'How we worked together',
      bullets: [
        ['Designed with each team.', 'The Dalgo team asked caseworkers, the MEL team and leadership which questions they needed answered, then built KPIs for leadership, program tracking for MEL, donor views, and caseload views where each caseworker sees only their own cases.'],
        ['One pipeline behind it.', 'CommCare, Google Sheets and the Mobiwater API flow into one store, cleaned on arrival, refreshed three times a day. Programs kept the tools that suit them.'],
        ['Skills that stay.', "Over 40 hours of training on dashboards, data models and pipeline troubleshooting, so SHOFCO's own team handles new requests."]
      ],
      quote: { text: "When you are reporting on a certain thing, [leaders] make reference: 'let me check on the dashboard' — and if it's not matching, then they'll ask questions then and there.", name: 'Nicholas', role: 'MEL Manager' }
    },
    transformation: {
      beforeAfter: [
        ['Updates', 'End of the week or month', 'Three times a day'],
        ['Data cleaning', '12 hours a week (Gender team)', '2 hours a week, spent validating'],
        ['Reports', 'Static PDFs and slides', 'Live dashboards, filtered by period, region or gender'],
        ['Follow-up questions', 'Back to the MEL team', 'Answered from the dashboard'],
        ['Caseworkers', 'Memory, sticky notes, wall charts', 'Their own caseload, tracked digitally']
      ],
      teams: [
        ['Leadership', 'Checks reported numbers against the dashboards in review meetings and questions gaps on the spot'],
        ['Program managers', 'Check each caseworker’s progress against ROC club targets, where they once reported a single total of participants reached'],
        ['MEL and program teams', 'Spot problems before they grow, such as gaps by gender on a mental-health indicator'],
        ['Caseworkers', 'Track open, resolved and closed cases each month and follow up on cases that stay open, so no survivor falls through the cracks'],
        ['Donors', 'Receive standardised reports at a much shorter turnaround']
      ],
      quote: { text: 'For leadership, they are able to have a view of the day-to-day operations of our programs. They are also able to see only the statistics they’re interested in — mostly aggregations across all their programs.', name: 'Alexander', role: 'Director of Technology' }
    },
    next: 'Dashboards are live for Gender, WASH, Livelihoods and Education. The SHOFCO Urban Network, libraries and savings cooperative come onto Dalgo next. Adoption worked because dashboards fit caseworker routines, caseworkers co-designed features, and leaders used the dashboards in meetings.'
  },

  {
    slug: 'ummeed',
    org: 'Ummeed',
    sector: 'Health',
    cardTitle: 'Seeing the whole child across clinic and training data',
    title: 'Seeing the whole child across clinic and training data',
    img: 'assets/cases/ummeed-card.webp',
    logo: 'assets/logos/Ummeed.png',
    approachImg: { src: 'assets/cases/ummeed-approach.webp', alt: 'How Dalgo and Ummeed worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: "Ummeed joined its clinic and training systems so clinicians, managers and fundraisers can see each child's full journey, refreshed every week.",
    facts: [
      ['Partner', 'Ummeed Child Development Center, Mumbai'],
      ['Work', 'Children with developmental disabilities and their families; 15,500 children, 152,000 sessions, 11,200 professionals trained'],
      ['Tools', 'Clinic Management System, Training Management System, Superset']
    ],
    // Three results, not four. The doc's fourth is an unconfirmed placeholder — see the note
    // at the top of this file.
    results: [
      { figure: 'Monthly → weekly', label: 'Data refresh, with no manual cleaning in between' },
      { figure: '2 systems, 1 view', label: "Clinic (15,500+ records) and training (14,000+) joined into each child's journey" },
      { figure: '4 teams', label: 'M&E, program, senior management and fundraising use the same dashboards' }
    ],
    challenge: {
      lead: "A child might first come to Ummeed's clinic at 2 or 3 and return at 7 or 8, while their caregivers attend trainings and the family uses the Family Resource Center. Each program kept its own system, and the rest lived in Excel.",
      bullets: [
        ['Monthly manual exports.', 'Cleaning an MIS Excel dump took the M&E team a couple of days, so analysis ran once a month.'],
        ['Reports nobody could explore.', 'Power BI ran on static Excel with no licence, so reports went out as PDFs.'],
        ['Data stayed with managers.', 'Program teams rarely saw the numbers.']
      ],
      tail: 'A 2022 Family Outcome Survey scored families 2.9 out of 7 on awareness of their rights. Acting on that needed a view of which services each family had used, and no system could show it.',
      quote: { text: "What didn't work for us is that it was all in silos — it was all for the program. Every time we deployed something, we thought, okay, this is the clinic, so what does the clinic need … But to then think about the entire system for that child — that thought process was not there initially.", name: 'Vinodhini Umashankar', role: 'Associate Director, M&E' }
    },
    approach: {
      heading: 'The fix',
      lead: "Through Dasra's Data Catalyst Program, the team first traced children's journeys by hand, matching Excel records by phone number. It worked, and it showed the job needed a system.",
      bullets: [
        ['Both systems connected.', 'CMS and TMS data arrive weekly through their APIs, cleaned and joined automatically.'],
        ['Three dashboards.', 'Clinic, Training, and Pathways, which follows each child across both.'],
        ['A team that runs it.', 'A 4-day handover training on Superset, access roles, data quality checks and the dbt models.']
      ]
    },
    transformation: {
      beforeAfter: [
        ['Where data lives', 'CMS, TMS and Excel, separately', 'One warehouse, joined by child'],
        ['Updates', 'Once a month, by hand', 'Every week, automatically'],
        ['Reports', 'Static PDFs', 'Live dashboards with reporting-period filters'],
        ['Who uses the data', 'Mid-level and senior managers', 'M&E, program, senior management, fundraising']
      ],
      teams: [
        ['Clinicians and care team', "See a child's sessions, caregiver trainings and other services before the consultation"],
        ['Program managers', 'Read clinic and training numbers together, so a month with fewer sessions and more trainings reads correctly'],
        ['M&E', "Spends its time on teams' new questions instead of cleaning"],
        ['Fundraising', 'Pulls ready charts into donor reports; dashboards for donors themselves are not built yet']
      ],
      quote: { text: "It helps our care team provide better services for the children and the caregivers; they're able to have more meaningful conversations, because they're aware of the services the family has taken.", name: 'Vinodhini Umashankar', role: 'Associate Director, M&E' }
    },
    next: 'Teams now ask M&E for more, which Vinodhini calls a cyclic loop. Next, Ummeed plans to model how families move through its services, link the journey to child development outcomes, and bring in its other programs. Her advice to other NGOs: do your homework on what you want before you start.'
  },

  {
    slug: 'antarang',
    // 100% white pixels: invisible on any light ground, so it is inverted to ink on the card.
    logoPale: true,
    org: 'Antarang',
    sector: 'Education',
    cardTitle: 'From 25 Excel sheets to dashboards every team can trust',
    title: 'From 25 Excel sheets to dashboards every team can trust',
    img: 'assets/cases/antarang-card.webp',
    logo: 'assets/logos/Antarang.webp',
    approachImg: { src: 'assets/cases/antarang-approach.webp', alt: 'How Dalgo and Antarang worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'Antarang replaced 20 to 25 Excel sheets with one pipeline. Program and donor teams now work from dashboards refreshed every 24 hours.',
    facts: [
      ['Partner', 'Antarang Foundation, Mumbai'],
      ['Work', 'Career guidance in government schools, grades 9 to 12; 1 lakh+ students a year'],
      ['Tools', 'Salesforce, Kobo Toolbox, Google Sheets, Looker Studio'],
      ['With Dalgo since', '2023, after a six-month evaluation; pipeline built with Goalkeep']
    ],
    results: [
      { figure: 'Half a day → an hour or two', label: 'Daily sheet upkeep, now needed only when a pipeline fails' },
      { figure: '15 days a quarter', label: 'Donor reporting, replaced by dashboards refreshed every 24 hours' },
      { figure: '20–25 sheets → 1 pipeline', label: 'Salesforce, Kobo Toolbox and Google Sheets in one place' }
    ],
    challenge: {
      lead: 'After a 2020-21 strategy shift to government schools, Antarang grew to more than a lakh students a year. Its dashboards had run on Excel since 2018-19, and the sheets could not keep up.',
      bullets: [
        ['Sheets that needed a full-time minder.', 'Someone spent half of every working day keeping 20+ sheets refreshed, and they still hung.'],
        ['Donor reporting took over the quarter.', '15 days each quarter rebuilding working files two or three times, often past 8 pm.'],
        ['Teams waited on one person', 'to prepare the data before they could look at it.']
      ],
      quote: { text: "[Before Dalgo, at each quarter's donor reporting] every donor's working file needs to be remade at least two or three times … it is quite stressful … I will be working till 8, till 9, beyond my working hours — and that's for everybody in the donor reporting team.", name: 'Shaheeda', role: 'Antarang Foundation' }
    },
    approach: {
      heading: 'The fix',
      bullets: [
        ['One pipeline.', 'Salesforce, Kobo Toolbox and Google Sheets are pulled in automatically, transformed into ready tables, and refreshed every 24 hours.'],
        ['Tables shaped for dashboards.', 'The pipeline reshapes Salesforce data to suit each dashboard.'],
        ['Views by role and place.', 'M&E, program and facilitator views, state dashboards, and donor and partner reporting dashboards.'],
        ['Alerts on failure.', 'A notification when a pipeline fails; a fix usually takes an hour or two.']
      ]
    },
    transformation: {
      beforeAfter: [
        ['Upkeep', 'Half of every working day', 'An hour or two, only when a pipeline fails'],
        ['Refresh', 'Every 24 hours, by hand', 'Every 24 hours, automatically'],
        ['Donor reporting', '15 days a quarter', 'Donor and partner dashboards, always current'],
        ['Who can look', 'Whoever the data was prepared for', 'Everyone, through role-based views']
      ],
      teams: [
        ['Program teams', 'Have moved off their own Excel sheets and act on the dashboards'],
        ['Donor reporting', 'Spots gaps as data refreshes and asks programs to close them before reporting'],
        ['State partners', 'YouthNet in Nagaland works from a dedicated, access-restricted state dashboard']
      ],
      quote: { text: 'When the data gets refreshed every 24 hours, somebody is dedicated to looking at the data; they are not dependent on [me] to make it before they can look at it. So anything they figure out, they come back and we can actually reach out to the relevant people saying, hey, this is not done, can you please prioritize this.', name: 'Shaheeda', role: 'Antarang Foundation' }
    },
    next: "Antarang is trimming the number of tables it built at the start and moving more program teams onto Dalgo's own dashboards. Shaheeda's advice to other NGOs: decide which metrics tell you whether a program is working before you digitise."
  },

  {
    slug: 'shri',
    org: 'SHRI',
    sector: 'Sanitation',
    cardTitle: 'Running 20 public toilets on data the whole team can see',
    title: 'Running 20 public toilets on data the whole team can see',
    img: 'assets/cases/shri-card.webp',
    logo: 'assets/logos/SHRI.png',
    approachImg: { src: 'assets/cases/shri-approach.webp', alt: 'How Dalgo and SHRI worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: 'SHRI runs free public toilets in Bihar and Jharkhand. Working with the Dalgo team, it turned the forms its facility staff fill in every day into reports and a public dashboard that update on their own. Problems get fixed in time, and funders, government and communities see the same numbers.',
    facts: [
      ['Partner', 'Sanitation and Health Rights in India (SHRI), Bihar and Jharkhand'],
      ['Work', 'Free shared public toilets with daily operations and monitoring; 20 facilities, used over 2.2 million times in 2024'],
      ['Tools', 'Kobo, Looker Studio'],
      ['Engagement', "Platform plus consulting. One of Dalgo's earliest partners; the reporting system was built with the Dalgo team"]
    ],
    results: [
      { figure: 'Problems fixed in time', label: "Operations sees each facility's use, issues and staff check-ins every day and decides what to fix first" },
      { figure: 'Every day', label: 'Public dashboard refresh for funders, government and community, in Hindi and English' },
      { figure: '99% uptime', label: 'Days facilities are open and working, now tracked daily' },
      { figure: '5–7 hrs a week → automated', label: "Report preparation, which once needed one person's know-how" }
    ],
    challenge: {
      lead: 'SHRI builds and runs public toilets for families who cannot build their own, then operates and monitors them so they stay clean and usable. Its goal is consistent toilet use over time. With 20 facilities and thousands of users a day, keeping every stall working becomes a data problem.',
      bullets: [
        ['Reports that depended on one person.', 'Building the weekly report took 5 to 7 hours and needed specialist knowledge.'],
        ['No view of the ground.', 'The team could not see in real time what was happening at each facility.'],
        ['A dashboard built on manual entries.', 'It showed whatever staff had entered, when they entered it.']
      ],
      quote: { text: 'When you operate dozens of these facilities with thousands of people using them every day, making sure all the facilities and stalls are high quality becomes complicated.', name: 'Anup', role: 'CEO' }
    },
    approach: {
      heading: 'How we worked together',
      lead: "SHRI built its reporting system with the Dalgo team as one of Dalgo's earliest partners. Facility staff kept the four Kobo forms they already used; the system connects them, so every submission flows into reports and dashboards without anyone rebuilding them.",
      bullets: [
        ['Daily use.', "People-counting machines on the men's and women's sides, logged by staff each evening, with unusually high or low days easy to spot."],
        ['Staff check-in.', 'A barcode scan on each staff ID card marks attendance at every facility.'],
        ['Issue reporting.', 'Twice a day, once per shift, staff log electrical, plumbing, infrastructure, supply, cleanliness and technology issues.'],
        ['Weekly photos.', 'Timestamped, geotagged photos of every facility, filterable by facility and date.']
      ],
      quote: { text: "We wouldn't have this without our staff, who are now so skilled at using the digital tools that the Dalgo team helped us build.", name: 'Anup', role: 'CEO' }
    },
    transformation: {
      beforeAfter: [
        ['Weekly report', '5 to 7 hours by hand', 'Generated automatically'],
        ['View of facilities', 'No real-time picture', 'A daily report on use, attendance, issues and photos'],
        ['Public dashboard', 'Updated from staff entries', 'Updated every day, in Hindi and English'],
        ['Costs and use', 'Calculated by hand', 'Total use, average daily use and cost per use calculated by the system']
      ],
      teams: [
        ['Operations and leadership', 'Which problem to fix first, how each facility is being used, and where quality is slipping'],
        ['Supervisors', 'Whether staff checked in and cleaned on schedule at every facility'],
        ['Facility staff', 'Read the daily use report themselves'],
        ['Funders, government and community', 'See maintenance logs, outages and staff attendance on the public dashboard']
      ],
      quote: { text: "It's like real-time feedback on how our systems are functioning and what changes we need to make based on the data.", name: 'Anvesh', role: 'Director of Operations, Monitoring and Evaluation' }
    },
    next: 'SHRI is starting monthly random spot checks with district water and sanitation committees to validate its data, and is working with the Government of Jharkhand on taking the model to more community toilets, schools and health facilities. With other NGOs, it calls this “Shri in a box”.'
  },

  {
    slug: '1000-days-fund',
    org: '1000 Days Fund',
    sector: 'Maternal & Child Health',
    cardTitle: 'Getting at-risk mothers and children back to the field in time',
    title: 'Getting at-risk mothers and children back to the field in time',
    img: 'assets/cases/1000-days-fund-card.webp',
    logo: 'assets/logos/TDF.webp',
    approachImg: { src: 'assets/cases/1000-days-fund-approach.webp', alt: 'How Dalgo and 1000 Days Fund worked together, in four steps: the problem, how we started, what we built and what changed' },
    native: true,
    standfirst: "1000 Days Fund worked with Dalgo's consultants to bring five data sources into one warehouse that its own team now runs. At-risk pregnant women and children are flagged as the data arrives, where the same cases once reached field teams in reports weeks later.",
    facts: [
      ['Partner', '1000 Days Fund, Indonesia'],
      ['Work', 'Maternal and child nutrition through community health workers (kaders); 1 million+ pregnant women and children under five reached since 2019'],
      ['Tools', 'Kobo, Google Forms, Google Sheets, dbt, Superset'],
      ['Engagement', "Platform plus consulting, six months by September 2026. Dalgo's consultants worked alongside TDF's data specialist, who led the build and now runs it"]
    ],
    results: [
      { figure: 'At-risk cases flagged as data arrives', label: 'Field teams follow up pregnant women and children sooner, where cases once reached them weeks later' },
      { figure: '5 sources → 1 warehouse', label: 'Training, Kader Academy, posyandu registers, posyandu monitoring and CHW AIM, refreshed automatically' },
      { figure: '14 training modules', label: 'Each person’s pre- and post-test now matched, where only regional averages were possible' },
      { figure: '2–3 weeks → about 1 week', label: 'Monthly data preparation time' }
    ],
    challenge: {
      // Two paragraphs in the master doc, kept as two.
      lead: [
        '1000 Days Fund works through government systems: posyandu, puskesmas and village governments. Its Community Care Model trains and supports community health workers, who run home visits, nutrition counselling, growth monitoring and risk screening. Data is how the team knows whether that work changes practice.',
        'That data lived in five sources on personal drives. The dashboard was a Google Sheet pulling from a chain of other sheets, until the tables grew too big to import and a hand-run Python script took over.'
      ],
      bullets: [
        ['Fragmentation.', 'No single place to ask a question; anything off the dashboard became a project.'],
        ['Inconsistency.', 'Free-text names and places on Google Forms. One district, Sumba Barat, was written three ways, across 38 provinces.'],
        ['Manual effort.', 'Two to three weeks a month preparing data, and figures occasionally restated after submission.']
      ],
      quote: { text: 'If the answer is not on our dashboard, that could be a whole project and not a simple query.', name: 'Pandu Gusti Resworo', role: 'Data Specialist' }
    },
    approach: {
      heading: 'How we worked together',
      lead: '1000 Days Fund chose Dalgo partly because, in the team’s words, it “comes with a consulting team rather than only a licence key.” Pandu led the build, designing the data models in dbt with Dalgo’s consultants, and the organisation has not needed to hire a data engineer. Field teams kept their forms, and everything, including older form versions back to 2019, now flows into one warehouse automatically.',
      bullets: [
        ['One identity per person.', 'A six-tier matching cascade uses name, place and the context of each submission, so one kader no longer counts as three people.'],
        ['Standard geography.', 'Reference tables resolve spelling variants, so results join across forms.'],
        ['Quality checks in the pipeline.', 'Nothing is dropped; implausible values are flagged and sent back to the person who entered them.'],
        ['Dashboards in Superset.', 'A systems change assessment view and a leadership overview of reach and outcomes.']
      ]
    },
    transformation: {
      beforeAfter: [
        ['Where data lives', 'Personal drives, chained sheets, a hand-run script', 'One warehouse, refreshed automatically'],
        ['Data preparation', '2 to 3 weeks a month', 'About one week'],
        ['Training results', 'An average score per region', 'Each person’s scores before and after, and who took only one test'],
        ['Data errors', 'Surfaced after submission', 'Flagged in the pipeline and sent back to the kader who entered them'],
        ['At-risk cases', 'Reached field teams in reports, sometimes weeks later', 'Flagged in the system as data arrives']
      ],
      teams: [
        ['Field teams and kaders', 'Which pregnant women and children to visit first, from case lists and flags on chronic malnutrition, hypertension, stunting and weight faltering'],
        ['MER team', 'Works in SQL and dbt in one warehouse, with less time cleaning and more time on analysis'],
        ['Program teams', 'Spend their time making sense of one source of data and deciding next steps'],
        ['Leadership', 'Sees system change and program outcomes in one consolidated dashboard, and argues decisions from one set of indicator definitions across programs and funders']
      ],
      quote: { text: 'I think the most important change is not a shinier dashboard, but the questions that we were able to ask.', name: 'Pandu Gusti Resworo', role: 'Data Specialist' }
    },
    next: '1000 Days Fund is adding range and plausibility checks, duplicate flags and missed-visit flags, each routed back to the person who entered the data, and automated alerts that send at-risk cases to field teams, village task forces and puskesmas. In Adlina Basuki’s words, the goal is “to be able to catch the bad values before it becomes a bad decision.”'
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

window.CASE_STUDIES = CASE_STUDIES;
window.caseStudyMeta = caseStudyMeta;
window.caseStudyBySlug = function (slug) {
  for (let i = 0; i < CASE_STUDIES.length; i++) if (CASE_STUDIES[i].slug === slug) return CASE_STUDIES[i];
  return null;
};
window.caseStudySectors = function () {
  const seen = [];
  CASE_STUDIES.forEach(function (c) { if (seen.indexOf(c.sector) === -1) seen.push(c.sector); });
  return seen;
};
