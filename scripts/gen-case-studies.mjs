// Generates one static page per native case study at case-studies/<slug>.html.
//
// WHY A GENERATOR rather than twelve checked-in HTML files: the twelve pages differ only by
// content that already lives in components/CaseStudyData.jsx. Hand-written files would be twelve
// copies of one <head> to keep in step, and the PRD's "fixed meta tag structure" would last
// exactly until someone edited one of them. Here the structure exists once, below.
//
// RUNS AFTER hash-assets.mjs in `npm run build`, and that order matters: the script and
// stylesheet versions are lifted from the finished case-studies.html rather than recomputed, so
// a generated page can never reference a stale bundle.
//
// PRERENDERS, it does not just template. The PRD makes it P0 that "page content is in the HTML
// sent to the browser, so search engines and AI crawlers can read it" — so each page's React
// tree is rendered in jsdom and baked into #app, exactly as .prerender.js does for the ten root
// pages. A generated page with an empty #app would satisfy the design and fail the requirement.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import crypto from 'node:crypto';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(root, 'case-studies');
const ORIGIN = 'https://dalgo.org';
const OG_IMAGE = ORIGIN + '/assets/og-card-v2.jpg';

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- 1. Pull the data out of the compiled bundle -------------------------------------------
// Evaluated, not parsed: CaseStudyData.jsx is the single source of truth and a regex over it
// would be a second, silently diverging reader of the same file.
function loadData() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
  const { window } = dom;
  // React first: app.bundle.js defines components at module scope and throws without it.
  window.eval(read('vendor/react.production.min.js'));
  window.eval(read('vendor/react-dom.production.min.js'));
  window.eval(read('site-config.js'));
  window.eval(read('app.bundle.js'));
  const data = {
    studies: JSON.parse(JSON.stringify(window.CASE_STUDIES || [])),
    meta: window.caseStudyMeta
  };
  // caseStudyMeta is a function and cannot cross the structuredClone boundary; call it inside.
  data.metaFor = (cs) => window.caseStudyMeta(cs);
  return { dom, ...data };
}

// ---- 2. The fixed <head> ---------------------------------------------------------------------
// Every case study page gets exactly these tags, in this order. Title and description come from
// caseStudyMeta() so the pattern is defined once, in the data file, next to the content it
// describes. The JSON-LD is Article + BreadcrumbList: Article is what Google's Rich Results Test
// reads for this page type, and the breadcrumb is what puts "Case Studies" in the result rather
// than a bare URL.
function head(cs, meta, versions) {
  const url = ORIGIN + '/case-studies/' + cs.slug;
  const img = ORIGIN + '/' + String(cs.img).replace(/^\//, '');
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cs.org + ': ' + cs.title,
    description: meta.desc,
    image: img,
    url,
    isPartOf: { '@type': 'CollectionPage', name: 'Dalgo Case Studies', url: ORIGIN + '/case-studies' },
    about: { '@type': 'Organization', name: cs.org },
    publisher: {
      '@type': 'Organization', name: 'Dalgo', url: ORIGIN + '/',
      logo: { '@type': 'ImageObject', url: ORIGIN + '/assets/dalgo-logo.png' }
    }
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN + '/' },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: ORIGIN + '/case-studies' },
      { '@type': 'ListItem', position: 3, name: cs.org, item: url }
    ]
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<!-- These pages are served one level down (/case-studies/<slug>) but share components written
     for root pages, which emit relative "assets/..." URLs. The baked markup below is absolutised
     by the generator, but React re-emits the component's own relative path on hydration — the
     exact behaviour scripts/hash-assets.mjs warns about — so without this every image 404s the
     moment the page becomes interactive. Verified safe: no component on this page uses a
     fragment or relative href that <base> would retarget. -->
<base href="/"/>
<title>${esc(meta.title)}</title>
<link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin/>
<link rel="stylesheet" href="/tokens.css?v=${versions.tokens}"/>
<link rel="stylesheet" href="/app.css?v=${versions.app}"/>
<link rel="icon" href="/favicon.ico" sizes="32x32"/>
<link rel="icon" href="/favicon-16.png" sizes="16x16" type="image/png"/>
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png"/>
<link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<link rel="manifest" href="/site.webmanifest"/>
<script defer src="/vendor/react.production.min.js"></script>
<script defer src="/vendor/react-dom.production.min.js"></script>
<script defer src="/app.bundle.js?v=${versions.bundle}"></script>
<script defer src="/pages/case-study.entry.js?v=${versions.entry}"></script>
<!-- data-seo-block -->
<meta name="description" content="${esc(meta.desc)}"/>
<link rel="canonical" href="${url}"/>
<meta property="og:title" content="${esc(meta.title)}"/>
<meta property="og:description" content="${esc(meta.desc)}"/>
<meta property="og:type" content="article"/>
<meta property="og:url" content="${url}"/>
<meta property="og:site_name" content="Dalgo"/>
<meta property="og:image" content="${OG_IMAGE}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(meta.title)}"/>
<meta name="twitter:description" content="${esc(meta.desc)}"/>
<meta name="twitter:image" content="${OG_IMAGE}"/>
<script type="application/ld+json">${JSON.stringify(article)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
<div id="app"></div>
<script>window.__currentPage='case-studies';window.__caseStudySlug='${cs.slug}';</script>
<script src="/site-config.js?v=${versions.config}"></script>
</body>
</html>
`;
}

// ---- 3. Render the page's React tree, the way .prerender.js does ----------------------------
async function bake(cs, versions) {
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
    runScripts: 'outside-only', pretendToBeVisual: true, url: ORIGIN + '/case-studies/' + cs.slug
  });
  const { window } = dom;
  window.matchMedia = window.matchMedia || (() => ({ matches: false, media: '', addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } }));
  window.scrollTo = () => {};
  window.IntersectionObserver = window.IntersectionObserver || function () { return { observe() {}, unobserve() {}, disconnect() {}, takeRecords() { return []; } }; };
  window.ResizeObserver = window.ResizeObserver || function () { return { observe() {}, unobserve() {}, disconnect() {} }; };
  window.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(() => cb(0), 0));
  window.cancelAnimationFrame = window.cancelAnimationFrame || ((id) => clearTimeout(id));
  // Nav highlights the Case Studies tab; PageCaseStudy picks its content from the slug.
  window.__currentPage = 'case-studies';
  window.__caseStudySlug = cs.slug;

  const load = (f) => window.eval(read(f));
  load('vendor/react.production.min.js');
  load('vendor/react-dom.production.min.js');
  load('site-config.js');
  load('app.bundle.js');
  load('pages/case-study.entry.js');

  await new Promise((r) => setTimeout(r, 80));
  const rendered = window.document.getElementById('app').outerHTML;
  dom.window.close();

  // The components emit root-relative asset paths ("assets/x.webp"), which are correct at
  // /case-studies but resolve to /case-studies/assets/... one level down. Absolutise rather than
  // adding <base href="/">, which would also silently retarget in-page fragment links.
  return rendered
    .replace(/(\s(?:src|href))="assets\//g, '$1="/assets/')
    .replace(/(\ssrcset)="assets\//g, '$1="/assets/');
}

// ---- 4. Versions, lifted from the finished root page ----------------------------------------
function versions() {
  const html = read('case-studies.html');
  const pick = (re, fallback) => { const m = html.match(re); return m ? m[1] : fallback; };
  return {
    tokens: pick(/tokens\.css\?v=([^"']+)/, '5'),
    app: pick(/app\.css\?v=([^"']+)/, '1'),
    bundle: pick(/app\.bundle\.js\?v=([^"']+)/, '1'),
    config: pick(/site-config\.js\?v=([^"']+)/, '1'),
    // case-study.entry.js is not referenced by any root page, so read its own hash the way
    // build.js computes one.
    entry: (() => {
      const f = path.join(root, 'pages/case-study.entry.js');
      if (!fs.existsSync(f)) return '1';
      return crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 10);
    })()
  };
}
// ---- run -------------------------------------------------------------------------------------
const { dom, studies, metaFor } = loadData();
const native = studies.filter((c) => c.native);
if (!native.length) {
  console.log('\nCase study pages: none marked native — nothing to generate.');
  process.exit(0);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

const v = versions();
const problems = [];
let written = 0;

for (const cs of native) {
  const meta = metaFor(cs);
  if (meta.desc.length > 158) problems.push(`${cs.slug}: description is ${meta.desc.length} chars (max 158)`);
  if (!cs.summary) problems.push(`${cs.slug}: native page with no summary`);
  const baked = await bake(cs, v);
  if (baked.length < 2000) { problems.push(`${cs.slug}: rendered #app is only ${baked.length} chars — did the component throw?`); continue; }
  const page = head(cs, meta, v).replace('<div id="app"></div>', baked);
  fs.writeFileSync(path.join(OUT_DIR, cs.slug + '.html'), page);
  written++;
}
dom.window.close();

// Stale pages: an organisation removed from the data, or flipped back to native:false, must not
// keep serving a page that nothing links to any more.
const expected = new Set(native.map((c) => c.slug + '.html'));
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.html') && !expected.has(f)) { fs.unlinkSync(path.join(OUT_DIR, f)); console.log('  removed stale', f); }
}

if (problems.length) {
  console.error(`\n✗ CASE STUDY PAGES — ${problems.length} problem(s):`);
  problems.forEach((p) => console.error('   - ' + p));
  process.exit(1);
}
console.log(`Case study pages: ${written} generated in case-studies/ (prerendered, fixed meta + Article/Breadcrumb JSON-LD).`);
