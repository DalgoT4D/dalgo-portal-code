// Education Hub content model — the single source of truth for /resources and every
// /resources/<slug> page.
//
// IN components/ AND .jsx FOR ONE CONCRETE REASON, the same one CaseStudyData.jsx gives:
// scripts/hash-assets.mjs rewrites 'assets/…' URLs with a ?v= hash inside app.bundle.js, and a
// standalone .js data file is skipped, so every cover would ship uncacheable. The brief named
// this file `components/resources.data.js`; the extension is the only departure, and it is
// forced by the build.
//
// ADDING A RESOURCE IS ONE ENTRY AND ONE FILE. scripts/gen-resources.mjs generates and
// prerenders its page on the next build, the library picks it up, and the filter chips derive
// their options from the data rather than a second hand-kept list.
//
// COPY PROVENANCE. Every `summary`, `learn` bullet and `forWho` line below is drawn from the
// brochure's own text in READY-FOR-DESIGN/<stage>/content-brochure.md — the Reader, Job, One
// idea and section headings. Nothing here invents a number, a partner or a claim, which the
// brief forbids outright. Lines that are my drafting rather than the brochure's own words are
// listed in the handover report for review.
//
// ⚑ OPEN: the four December resources (Data Quality Checklist, Data Collection Planning
// Template, Data Visualisation Playbook, Data Readiness for AI Guide) and the January set are
// not here yet. They are entries in this array when their files land; nothing else changes.
const RESOURCES = [
  {
    slug: 'data-lifecycle',
    title: 'The nonprofit data lifecycle',
    shelf: 'ebook',
    format: 'Brochure',
    stage: ['Planning', 'Collecting', 'Storing', 'Transforming', 'Visualising', 'Acting'],
    track: 'Data Lifecycle and Data to Decision',
    cover: 'assets/resources/data-lifecycle-cover.webp',
    file: '/files/resources/data-lifecycle.pdf',
    pages: 8,
    readTime: '10 min read',
    featured: true,
    summary: 'The six stages your data moves through, and how to find the one where yours breaks.',
    learn: [
      'Why your data system is only as strong as its weakest stage',
      'What each of the six stages is actually for, in one page each',
      'How to find the stage to fix first, before you buy a tool for a later one'
    ],
    forWho: 'Anyone at a nonprofit who touches programme data.',
    related: ['planning', 'collecting', 'storing']
  },

  {
    slug: 'planning',
    title: 'Planning: decide what to measure',
    shelf: 'ebook',
    format: 'Brochure',
    stage: ['Planning'],
    track: 'Data Lifecycle and Data to Decision',
    cover: 'assets/resources/planning-cover.webp',
    file: '/files/resources/planning.pdf',
    pages: 4,
    readTime: '6 min read',
    summary: 'Planning decides what the other five stages have to work with.',
    learn: [
      'Why the form only ever grows, and what that costs the people filling it in',
      'The five audiences a single indicator list has to serve, and where they disagree',
      'A thirty-second test for whether a field belongs on the form at all'
    ],
    forWho: 'M&E leads, programme managers and executive directors.',
    related: ['collecting', 'storing', 'data-maturity']
  },

  {
    slug: 'collecting',
    title: 'Collecting: set the control at the point of entry',
    shelf: 'ebook',
    format: 'Brochure',
    stage: ['Collecting'],
    track: 'Data Lifecycle and Data to Decision',
    cover: 'assets/resources/collecting-cover.webp',
    file: '/files/resources/collecting.pdf',
    pages: 4,
    readTime: '6 min read',
    summary: 'Collection quality decides what every later stage inherits.',
    learn: [
      'Four questions worth asking before the form is built',
      'Why more answer options can make your data worse',
      'How one question about your field conditions decides which tool you need'
    ],
    forWho: 'M&E leads, programme managers and field team leads.',
    related: ['planning', 'storing', 'data-maturity']
  },

  {
    slug: 'storing',
    title: 'Storing: one place, one current version',
    shelf: 'ebook',
    format: 'Brochure',
    stage: ['Storing'],
    track: 'Data Lifecycle and Data to Decision',
    cover: 'assets/resources/storing-cover.webp',
    file: '/files/resources/storing.pdf',
    pages: 4,
    readTime: '6 min read',
    summary: 'Storage is an access problem before it is a capacity problem.',
    learn: [
      'Why "what is the latest data?" sounds like one question and is three',
      'What a warehouse is, in plain words, and when ten sheets on a drive is still fine',
      'Why you keep one version of the raw data and delete the rest'
    ],
    forWho: 'M&E leads, data managers and operations heads.',
    related: ['planning', 'collecting', 'data-maturity']
  },

  // ⚑ DRAFT CONTENT, flagged in the UI. The brief is explicit: build the assessment template
  // with the Data Maturity Self Assessment as placeholder content; the real questions arrive in
  // December. `draft: true` prints the notice on the page and keeps the card marked, so nobody
  // mistakes these ten questions for the vetted set. Replacing them is an edit to `questions`
  // and `bands` below and a deletion of this flag.
  {
    slug: 'data-maturity',
    title: 'Data Maturity Self Assessment',
    shelf: 'quiz',
    format: 'Self assessment',
    stage: ['Planning', 'Collecting', 'Storing'],
    track: 'Data Lifecycle and Data to Decision',
    cover: 'assets/resources/data-lifecycle-cover.webp',
    questionCount: 10,
    readTime: '5 min',
    draft: true,
    summary: 'Ten questions on how your organisation plans, collects and stores its data.',
    learn: [
      'Where your data practice sits today across planning, collecting and storing',
      'The gaps worth closing first, with one recommendation for each',
      'Which guide to read next for the stage where your data breaks'
    ],
    forWho: 'M&E leads, data managers and executive directors.',
    related: ['data-lifecycle', 'planning', 'storing'],

    // Each option carries a score 0–3. The band is decided by the percentage of the maximum,
    // so adding or removing a question needs no change to the bands below.
    questions: [
      { q: 'How do you decide what to put on a data collection form?',
        a: ['Fields get added when someone asks for them', 'We review the form once a year',
            'Each field maps to a report we produce', 'Each field maps to a decision someone makes'] },
      { q: 'Can you name the decision each indicator informs?',
        a: ['Not for most of them', 'For the headline indicators only',
            'For most of them', 'For all of them, and we remove the ones we cannot'] },
      { q: 'How do you check data quality before a report goes out?',
        a: ["We don't, yet", 'Someone eyeballs it', 'A checklist each time', 'Automated checks in the pipeline'] },
      { q: 'Where do validation rules live?',
        a: ['Nowhere; we fix errors later', 'In a cleaning step we repeat each month',
            'In some of the forms', 'In the form itself, at the point of entry'] },
      { q: 'How many places does programme data live?',
        a: ['More than we can count', 'One per programme, roughly', 'A handful, and we know which', 'One place'] },
      { q: 'If someone asks for the latest data, how long does it take?',
        a: ['Days, and we have to ask around', 'Hours', 'Minutes, from a file we trust', 'It is already on a dashboard'] },
      { q: 'Who owns each dataset?',
        a: ['Nobody in particular', 'Whoever built it', 'Named per programme', 'Named, documented and known to the team'] },
      { q: 'How often does your reporting data refresh?',
        a: ['When someone rebuilds it by hand', 'Monthly', 'Weekly', 'Daily or faster, on its own'] },
      { q: 'Who can look at the numbers without asking someone first?',
        a: ['Only the person who prepares them', 'Leadership', 'Leadership and programme managers', 'Every team, through a view that suits them'] },
      { q: 'What happens to a number that looks wrong on a dashboard?',
        a: ['It usually goes unnoticed', 'Someone mentions it eventually',
            'We trace it back when we have time', 'It is flagged and sent back to whoever entered it'] }
    ],

    // Bands are inclusive lower bounds on the percentage score.
    bands: [
      { min: 0,  label: 'Starting out',
        text: 'Your data is doing less work than it could. Start with Planning: deciding what to measure costs nothing and sets the shape of everything after it.' },
      { min: 35, label: 'Building',
        text: 'The basics are in place and the strain is in the middle of the lifecycle. Collecting and Storing are where the repeated effort usually hides.' },
      { min: 60, label: 'Established',
        text: 'Your data holds up. The gains now come from shortening the distance between a number changing and someone acting on it.' },
      { min: 85, label: 'Advanced',
        text: 'You run a strong practice. The next step is usually breadth — bringing the programmes still outside the system into it.' }
    ],

    // One recommendation per gap, chosen by which question was answered weakly.
    gaps: [
      { q: 0, text: 'Tie every field on your form to a decision someone makes.', read: 'planning' },
      { q: 1, text: 'List your indicators and strike the ones with no decision behind them.', read: 'planning' },
      { q: 2, text: 'Write down the checks you do by eye, then move them into the form.', read: 'collecting' },
      { q: 3, text: 'Set validation at the point of entry instead of cleaning it monthly.', read: 'collecting' },
      { q: 4, text: 'Bring your sources into one place with one current version.', read: 'storing' },
      { q: 5, text: 'Agree where the current version lives, and say so in writing.', read: 'storing' },
      { q: 6, text: 'Name an owner for each dataset and write it down.', read: 'storing' },
      { q: 7, text: 'Automate the refresh so nobody rebuilds a report by hand.', read: 'storing' },
      { q: 8, text: 'Give each team a view of the data it actually needs.', read: 'data-lifecycle' },
      { q: 9, text: 'Route questionable values back to whoever entered them.', read: 'collecting' }
    ]
  }
];

// ---- Derived helpers. The library's chips and the generator both read these, so the set of
// stages and shelves can never drift from the data. ----------------------------------------
const RESOURCE_SHELVES = [
  { id: 'all',   label: 'All' },
  { id: 'ebook', label: 'Ebooks' },
  { id: 'quiz',  label: 'Quizzes' }
];

// Lifecycle order is the lifecycle's own, never alphabetical: the stages are a sequence and
// sorting them A–Z would scramble the one thing the reader is meant to learn.
const LIFECYCLE_STAGES = ['Planning', 'Collecting', 'Storing', 'Transforming', 'Visualising', 'Acting'];

function resourceBySlug(slug) {
  for (let i = 0; i < RESOURCES.length; i++) if (RESOURCES[i].slug === slug) return RESOURCES[i];
  return null;
}

function resourceStagesInUse() {
  return LIFECYCLE_STAGES.filter(function (s) {
    return RESOURCES.some(function (r) { return (r.stage || []).indexOf(s) > -1; });
  });
}

// Fixed metadata, defined once so the pattern cannot drift as the shelf grows. Title follows
// the sitewide "{Page} — Dalgo | Data Insights for Nonprofits" pattern; the description is
// capped at the 158 chars scripts/seo-meta.mjs enforces everywhere else.
function resourceMeta(r) {
  const title = r.title + ' — Dalgo | Data Insights for Nonprofits';
  let desc = r.summary || '';
  if (desc.length > 158) desc = desc.slice(0, 155).replace(/\s+\S*$/, '') + '…';
  return { title: title, desc: desc };
}

// The count line under a card: pages for a reading asset, questions for an assessment.
function resourceMetaLine(r) {
  const bits = [];
  if (r.shelf === 'quiz') bits.push(r.questionCount + ' questions');
  else if (r.pages) bits.push(r.pages + ' pages');
  if (r.readTime) bits.push(r.readTime);
  return bits.join(' · ');
}

window.RESOURCES = RESOURCES;
window.RESOURCE_SHELVES = RESOURCE_SHELVES;
window.LIFECYCLE_STAGES = LIFECYCLE_STAGES;
window.resourceBySlug = resourceBySlug;
window.resourceStagesInUse = resourceStagesInUse;
window.resourceMeta = resourceMeta;
window.resourceMetaLine = resourceMetaLine;
