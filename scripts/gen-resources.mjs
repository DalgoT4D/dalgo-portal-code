// Generates one static page per Education Hub resource at resources/<slug>.html.
//
// SAME SHAPE AND SAME REASONING AS scripts/gen-case-studies.mjs, deliberately: the pages differ
// only by content that already lives in components/ResourcesData.jsx, so hand-written files
// would be N copies of one <head> to keep in step. Adding a resource is one data entry and one
// file, which is the brief's requirement, and this is what makes that true.
//
// RUNS AFTER hash-assets.mjs in `npm run build`: script and stylesheet versions are lifted from
// the finished resources.html rather than recomputed, so a generated page can never reference a
// stale bundle.
//
// PRERENDERS rather than templating. Each page's React tree is rendered in jsdom and baked into
// #app, the way .prerender.js does for the root pages, so the content is in the HTML a crawler
// receives instead of arriving only after hydration.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';
import crypto from 'node:crypto';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(root, 'resources');
const ORIGIN = 'https://dalgo.org';
const OG_IMAGE = ORIGIN + '/assets/og-card-v2.jpg';

const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let metaOf;

function loadData() {
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
  const { window } = dom;
  window.eval(read('vendor/react.production.min.js'));
  window.eval(read('vendor/react-dom.production.min.js'));
  window.eval(read('site-config.js'));
  window.eval(read('app.bundle.js'));
  metaOf = (r) => window.resourceMeta(r);
  return { dom, resources: JSON.parse(JSON.stringify(window.RESOURCES || [])) };
}

// ---- The fixed <head> -------------------------------------------------------------------
// CreativeWork rather than Article: these are downloadable guides and assessments, not posts.
// The BreadcrumbList is what puts "Resources" in a search result instead of a bare URL.
function head(r, meta, versions) {
  const url = ORIGIN + '/resources/' + r.slug;
  const img = r.cover ? ORIGIN + '/' + String(r.cover).replace(/^\//, '') : OG_IMAGE;
  const work = {
    '@context': 'https://schema.org',
    '@type': r.shelf === 'quiz' ? 'Quiz' : 'CreativeWork',
    name: r.title,
    description: meta.desc,
    image: img,
    url,
    learningResourceType: r.format,
    isAccessibleForFree: true,
    inLanguage: 'en',
    isPartOf: { '@type': 'CollectionPage', name: 'Dalgo Resource Library', url: ORIGIN + '/resources' },
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
      { '@type': 'ListItem', position: 2, name: 'Resources', item: ORIGIN + '/resources' },
      { '@type': 'ListItem', position: 3, name: r.title, item: url }
    ]
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<!-- Served one level down (/resources/<slug>) but sharing components written for root pages,
     which emit relative "assets/..." URLs. The baked markup is absolutised by the generator,
     but React re-emits the component's own relative path on hydration, so without this every
     cover 404s the moment the page becomes interactive. Same reasoning as the case studies. -->
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
<script defer src="/pages/resource.entry.js?v=${versions.entry}"></script>
<!-- data-seo-block -->
<meta name="description" content="${esc(meta.desc)}"/>
<link rel="canonical" href="${url}"/>
<meta property="og:title" content="${esc(meta.title)}"/>
<meta property="og:description" content="${esc(meta.desc)}"/>
<meta property="og:type" content="article"/>
<meta property="og:url" content="${url}"/>
<meta property="og:site_name" content="Dalgo"/>
<meta property="og:image" content="${img}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(meta.title)}"/>
<meta name="twitter:description" content="${esc(meta.desc)}"/>
<meta name="twitter:image" content="${img}"/>
<script type="application/ld+json">${JSON.stringify(work)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
<div id="app"></div>
<script>window.__currentPage='resources';window.__resourceSlug='${r.slug}';</script>
<script src="/site-config.js?v=${versions.config}"></script>
</body>
</html>
`;
}

async function bake(r) {
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
    runScripts: 'outside-only', pretendToBeVisual: true, url: ORIGIN + '/resources/' + r.slug
  });
  const { window } = dom;
  window.matchMedia = window.matchMedia || (() => ({ matches: false, media: '', addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent() { return false; } }));
  window.scrollTo = () => {};
  window.IntersectionObserver = window.IntersectionObserver || function () { return { observe() {}, unobserve() {}, disconnect() {}, takeRecords() { return []; } }; };
  window.ResizeObserver = window.ResizeObserver || function () { return { observe() {}, unobserve() {}, disconnect() {} }; };
  window.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(() => cb(0), 0));
  window.cancelAnimationFrame = window.cancelAnimationFrame || ((id) => clearTimeout(id));
  window.__currentPage = 'resources';
  window.__resourceSlug = r.slug;

  const load = (f) => window.eval(read(f));
  load('vendor/react.production.min.js');
  load('vendor/react-dom.production.min.js');
  load('site-config.js');
  load('app.bundle.js');
  load('pages/resource.entry.js');

  await new Promise((res) => setTimeout(res, 80));
  const rendered = window.document.getElementById('app').outerHTML;
  dom.window.close();
  return rendered
    .replace(/(\s(?:src|href))="assets\//g, '$1="/assets/')
    .replace(/(\ssrcset)="assets\//g, '$1="/assets/');
}

function versions() {
  const html = read('resources.html');
  const pick = (re, fallback) => { const m = html.match(re); return m ? m[1] : fallback; };
  return {
    tokens: pick(/tokens\.css\?v=([^"']+)/, '5'),
    app: pick(/app\.css\?v=([^"']+)/, '1'),
    bundle: pick(/app\.bundle\.js\?v=([^"']+)/, '1'),
    config: pick(/site-config\.js\?v=([^"']+)/, '1'),
    entry: (() => {
      const f = path.join(root, 'pages/resource.entry.js');
      if (!fs.existsSync(f)) return '1';
      return crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 10);
    })()
  };
}

// ---- run ---------------------------------------------------------------------------------
const { dom, resources } = loadData();
if (!resources.length) {
  console.log('\nResource pages: none in ResourcesData.jsx — nothing to generate.');
  process.exit(0);
}
fs.mkdirSync(OUT_DIR, { recursive: true });

const v = versions();
const problems = [];
let written = 0;

for (const r of resources) {
  const meta = metaOf(r);
  if (meta.desc.length > 158) problems.push(`${r.slug}: description is ${meta.desc.length} chars (max 158)`);
  if (!r.summary) problems.push(`${r.slug}: no summary`);
  if ((r.learn || []).length !== 3) problems.push(`${r.slug}: "What you'll learn" must be exactly 3 bullets, found ${(r.learn || []).length}`);
  if (r.shelf === 'ebook' && !r.file) problems.push(`${r.slug}: ebook with no file`);
  if (r.shelf === 'ebook' && r.file && !fs.existsSync(path.join(root, r.file.replace(/^\//, '')))) {
    problems.push(`${r.slug}: file ${r.file} does not exist`);
  }
  const baked = await bake(r);
  if (baked.length < 2000) { problems.push(`${r.slug}: rendered #app is only ${baked.length} chars — did the component throw?`); continue; }
  fs.writeFileSync(path.join(OUT_DIR, r.slug + '.html'), head(r, meta, v).replace('<div id="app"></div>', baked));
  written++;
}
dom.window.close();

// A resource removed from the data must not keep serving a page nothing links to.
const expected = new Set(resources.map((r) => r.slug + '.html'));
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.html') && !expected.has(f)) { fs.unlinkSync(path.join(OUT_DIR, f)); console.log('  removed stale', f); }
}

if (problems.length) {
  console.error(`\n✗ RESOURCE PAGES — ${problems.length} problem(s):`);
  problems.forEach((p) => console.error('   - ' + p));
  process.exit(1);
}
console.log(`Resource pages: ${written} generated in resources/ (prerendered, CreativeWork + Breadcrumb JSON-LD).`);
