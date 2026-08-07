// Single source of truth for each page's <title> and description, and the writer that
// stamps them into description / og:description / twitter:description.
//
// Why this exists: those three tags were hand-maintained in every .html file — 30 copies of
// 10 strings — so page copy and metadata drifted apart silently. Found on 7 Aug 2026:
//   - index          still carried the pre-7-Aug hero line, at 211 chars
//   - case-studies   shipped "from a week of reporting down to an hour" — the STiR
//                    1-week-to-1-hour claim is on the NEVER-PUBLISH list
//   - pricing        promised "bundled platform and consulting plans"; there are no bundles
//   - contact        offered "book a call"; the page has only the form and an email
//   - faq            listed "onboarding"; no onboarding question survived the FAQ rewrite
//   - product        224 chars, well past where Google truncates
//
// Run after any page-copy change:  node scripts/seo-meta.mjs
// Add --check to fail without writing (for CI).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Descriptions are kept at or under 158 chars — Google truncates around there.
// Every claim below must be true of the live page and allowed by ground-truth.md.
const PAGES = {
  index: {
    title: 'Dalgo — Data Insights Platform for Nonprofits', // home reverses the pattern
    desc: 'From technology to strategy, Dalgo helps nonprofits build the data capabilities to report with confidence and make better decisions. Open source.',
  },
  product: {
    title: 'Product — Dalgo | Data Platform for Nonprofits',
    desc: 'Ingest, transform, and visualise programme data in a warehouse your organisation owns. 600+ data sources including Kobo, MGrant, ODK, and SurveyCTO.',
  },
  consulting: {
    title: 'Consulting — Dalgo | Data Platform for Nonprofits',
    desc: 'Data strategy, M&E systems, implementation support, and pro bono consulting — expert help from a team fluent in the social sector.',
  },
  'case-studies': {
    title: 'Case Studies — Dalgo | Data Platform for Nonprofits',
    // No time-saved figure here on purpose: the STiR "1 week -> 1 hour" line is banned, and a
    // generic time claim in metadata cannot be attributed to the partner it belongs to.
    desc: 'Real outcomes across 25+ nonprofits — automated pipelines, dashboards teams trust, and decisions backed by data. Case studies and customer stories.',
  },
  'meet-the-team': {
    title: 'Meet the Team — Dalgo | Data Platform for Nonprofits',
    desc: 'The people building and running Dalgo — product, consulting, data engineering, and community, alongside the nonprofits we serve.',
  },
  community: {
    title: 'Community — Dalgo | Data Platform for Nonprofits',
    desc: 'Blogs, past session videos, newsletters, and a WhatsApp community for nonprofit data practitioners — practical data education.',
  },
  pricing: {
    title: 'Pricing — Dalgo | Data Platform for Nonprofits',
    desc: 'Flat annual pricing with no per-user fees. Platform and consulting priced separately — India pricing shown, global on request.',
  },
  faq: {
    title: 'FAQ — Dalgo | Data Platform for Nonprofits',
    desc: 'What Dalgo is, what the platform does, pricing, support, security, and DPDP — clear answers for nonprofit teams.',
  },
  contact: {
    title: 'Contact — Dalgo | Data Platform for Nonprofits',
    desc: "Tell us about your data challenges — email support@dalgo.org or send the form and we'll come back to you.",
  },
  privacy: {
    title: 'Privacy — Dalgo | Data Platform for Nonprofits',
    desc: 'How Dalgo handles data as a DPDP-compliant Data Processor — your data stays in your own warehouse.',
  },
};

// Claims that must never ship, in metadata or anywhere else (references/ground-truth.md).
const BANNED = [
  [/\b700\s*\+/, '"700+" data sources'],
  [/week.{0,30}hour/i, 'the STiR "1 week -> 1 hour" claim'],
  [/unlimited users/i, '"unlimited users" (say "no per-user fees")'],
  [/\b400\+?\s*schools|\b300\+?\s*units/i, '"400+ schools" / "300+ units"'],
  [/audit logs/i, '"audit logs"'],
  [/\bleverage\b|best-in-class|world-class|seamless|robust|cutting-edge|game-chang|revolutionary/i, 'a banned marketing word'],
  [/^In today'?s landscape/i, 'the "In today\'s landscape" opener'],
  [/\bnot just\b|, not /i, 'a banned "X, not Y" construction'],
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const check = process.argv.includes('--check');

let problems = [];
let written = 0;

for (const [page, { title, desc }] of Object.entries(PAGES)) {
  if (desc.length > 158) problems.push(`${page}: description is ${desc.length} chars (max 158)`);
  for (const [re, label] of BANNED) {
    if (re.test(desc) || re.test(title)) problems.push(`${page}: metadata contains ${label}`);
  }
}
if (problems.length) {
  console.error('Refusing to write — metadata failed validation:');
  problems.forEach((p) => console.error('   - ' + p));
  process.exit(1);
}

for (const [page, { title, desc }] of Object.entries(PAGES)) {
  const file = path.join(root, page + '.html');
  if (!fs.existsSync(file)) { console.error(`missing ${page}.html`); process.exit(1); }
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  const d = esc(desc);

  const subs = [
    [/(<title>)(.*?)(<\/title>)/s, `$1${esc(title)}$3`],
    [/(<meta name="description" content=")(.*?)(")/s, `$1${d}$3`],
    [/(<meta property="og:description" content=")(.*?)(")/s, `$1${d}$3`],
    [/(<meta name="twitter:description" content=")(.*?)(")/s, `$1${d}$3`],
    [/(<meta property="og:title" content=")(.*?)(")/s, `$1${esc(title)}$3`],
    [/(<meta name="twitter:title" content=")(.*?)(")/s, `$1${esc(title)}$3`],
  ];
  for (const [re, rep] of subs) {
    if (!re.test(html)) { problems.push(`${page}: no tag matching ${re.source.slice(0, 44)}`); continue; }
    html = html.replace(re, rep);
  }
  if (html !== before) {
    if (!check) fs.writeFileSync(file, html);
    written++;
  }
}

if (problems.length) {
  console.error('Tag problems:'); problems.forEach((p) => console.error('   - ' + p));
  process.exit(1);
}
console.log(check
  ? `SEO metadata check: ${written} page(s) would change.`
  : `SEO metadata written: ${written} page(s) updated, ${Object.keys(PAGES).length} validated (length + banned claims).`);
