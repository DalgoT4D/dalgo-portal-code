// Regenerates the FAQPage JSON-LD in faq.html from the compiled FAQ_DATA / FAQ_ANSWERS.
//
// Why this exists: the schema used to be hand-maintained in faq.html, so editing
// components/FaqBlocks.jsx silently left the structured data describing questions that
// were no longer on the page. Google treats FAQPage markup that doesn't match visible
// content as a quality violation, so the two must be generated from one source.
//
// Run after `npm run build` and before `.prerender.js`:  node scripts/faq-schema.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');

// Evaluate the built bundle in a DOM so we read exactly what ships, not a regex guess.
const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
  runScripts: 'outside-only', url: 'https://dalgo.org/faq',
});
const { window } = dom;
window.React = { createElement: () => null, Fragment: 'F', useState: () => [false, () => {}] };
window.ReactDOM = { createRoot: () => ({ render() {} }) };
window.eval(read('app.bundle.js'));

const DATA = window.FAQ_DATA;
const ANSWERS = window.FAQ_ANSWERS;
if (!Array.isArray(DATA) || !ANSWERS) {
  console.error('FAQ_DATA / FAQ_ANSWERS not found on window — did app.bundle.js build?');
  process.exit(1);
}

// Schema answers are plain text: strip tags, collapse whitespace, decode the few entities we emit.
const toText = (html) => html
  .replace(/<li>/g, ' • ')
  .replace(/<\/(p|li|ol|ul|div)>/g, ' ')
  .replace(/<[^>]+>/g, '')
  .replace(/&mdash;/g, '—').replace(/&amp;/g, '&').replace(/&#8377;/g, '₹')
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();

const missing = [];
const mainEntity = [];
for (const grp of DATA) {
  for (const q of grp.qs) {
    const a = ANSWERS[q];
    if (!a) { missing.push(q); continue; }
    mainEntity.push({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: toText(a) },
    });
  }
}
if (missing.length) {
  console.error(`Refusing to write: ${missing.length} question(s) have no answer and would ship as "Answer coming soon":`);
  missing.forEach((q) => console.error('   - ' + q));
  process.exit(1);
}

const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity };
const json = JSON.stringify(schema);

const file = path.join(root, 'faq.html');
let html = fs.readFileSync(file, 'utf8');
const re = /<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/s;
if (!re.test(html)) {
  console.error('No existing FAQPage <script> block found in faq.html — aborting rather than guessing where to insert.');
  process.exit(1);
}
html = html.replace(re, `<script type="application/ld+json">${json}</script>`);
fs.writeFileSync(file, html);

const totalQs = DATA.reduce((n, g) => n + g.qs.length, 0);
console.log(`FAQPage schema regenerated: ${mainEntity.length} Q&A across ${DATA.length} groups (${totalQs} questions in FAQ_DATA).`);
