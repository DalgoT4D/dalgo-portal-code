// Generates llms.txt: a plain-text map of the site for AI crawlers and answer engines
// (the emerging llmstxt.org convention). Lives at the site root next to robots.txt.
//
// GENERATED, never hand-written, for the same reason as the sitemap: a hand-kept list goes
// stale the first time a page is renamed or a case study ships. Every description here is
// copy that already exists on the site — each page's own meta description, and each case
// study's standfirst — so this file adds no new claims. Case studies use the full standfirst
// rather than caseStudyMeta()'s description, which is cut to search-snippet length and can
// end mid-sentence on an ellipsis; an AI reader should get whole sentences.
//
// Runs after gen-case-studies.mjs and sitemap.mjs in `npm run build`, because it reads the
// finished root pages' <meta name="description">.
//
// Run: node scripts/llms.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ORIGIN = 'https://dalgo.org';

// Same pages, same order as scripts/sitemap.mjs. Home is the file's own summary line.
const PAGES = [
  { slug: 'product',       name: 'Product' },
  { slug: 'consulting',    name: 'Consulting' },
  { slug: 'case-studies',  name: 'Case studies' },
  { slug: 'pricing',       name: 'Pricing' },
  { slug: 'faq',           name: 'FAQ' },
  { slug: 'contact',       name: 'Contact' },
  { slug: 'community',     name: 'Community' },
  { slug: 'meet-the-team', name: 'Meet the team' },
  { slug: 'privacy',       name: 'Privacy' },
];

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function description(file) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  if (!m) throw new Error(`llms.mjs: no meta description in ${file}`);
  return decode(m[1]);
}

// The case study data file is plain JS that assigns to window; evaluate it in a sandbox
// rather than parsing it, so this reads exactly what the site renders.
function caseStudies() {
  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'components/CaseStudyData.jsx'), 'utf8'), { window });
  return window.CASE_STUDIES
    .filter((cs) => cs.native)
    // headline resolved here, inside the sandbox's scope, not at the template below
    .map((cs) => ({ cs, headline: window.caseStudyHeadline(cs), summary: cs.standfirst || window.caseStudyMeta(cs).desc }));
}

const lines = [
  '# Dalgo',
  '',
  `> ${description('index.html')}`,
  '',
  '## Pages',
  '',
  ...PAGES.map((p) => `- [${p.name}](${ORIGIN}/${p.slug}): ${description(p.slug + '.html')}`),
  '',
  '## Case studies',
  '',
  ...caseStudies().map(({ cs, headline, summary }) => `- [${headline}](${ORIGIN}/case-studies/${cs.slug}): ${summary}`),
  '',
];

fs.writeFileSync(path.join(root, 'llms.txt'), lines.join('\n'));
console.log(`llms.mjs: wrote llms.txt (${PAGES.length} pages, ${caseStudies().length} case studies)`);
