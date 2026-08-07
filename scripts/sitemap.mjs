// Generates sitemap.xml from the pages that actually ship.
//
// Hand-maintained, it went stale twice: it still listed /about after that page became
// /meet-the-team, and its lastmod dates read 27 Jul while nearly every page had changed.
// A wrong lastmod is worse than none — it tells crawlers not to bother re-reading a page
// you just rewrote.
//
// lastmod comes from git (the last commit that touched the page's HTML or its source
// component), not file mtime, which changes on every local build.
//
// Run: node scripts/sitemap.mjs   (part of npm run build)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ORIGIN = 'https://dalgo.org';

// slug -> crawl hints. Home is '' (the bare origin). Order is the crawl priority order.
const PAGES = [
  { slug: '',               changefreq: 'weekly',  priority: '1.0' },
  { slug: 'product',        changefreq: 'monthly', priority: '0.9' },
  { slug: 'consulting',     changefreq: 'monthly', priority: '0.9' },
  { slug: 'case-studies',   changefreq: 'monthly', priority: '0.8' },
  { slug: 'pricing',        changefreq: 'monthly', priority: '0.8' },
  { slug: 'faq',            changefreq: 'monthly', priority: '0.7' },
  { slug: 'contact',        changefreq: 'yearly',  priority: '0.7' },
  { slug: 'community',      changefreq: 'monthly', priority: '0.6' },
  { slug: 'meet-the-team',  changefreq: 'yearly',  priority: '0.6' },
  { slug: 'privacy',        changefreq: 'yearly',  priority: '0.3' },
];

const fileFor = (slug) => (slug === '' ? 'index.html' : `${slug}.html`);
const entryFor = (slug) => `pages/src/${slug === '' ? 'index' : slug}.jsx`;

const gitDate = (files) => {
  let newest = null;
  for (const f of files) {
    if (!fs.existsSync(path.join(root, f))) continue;
    try {
      const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', f], { cwd: root })
        .toString().trim();
      if (d && (!newest || d > newest)) newest = d;
    } catch { /* not in git yet */ }
  }
  return newest || new Date().toISOString().slice(0, 10);
};

// A sitemap must not advertise URLs that redirect — those are crawl waste and a soft error
// in Search Console. Cross-check against the host config.
const redirectSources = new Set(
  (JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).redirects || [])
    .map((r) => r.source.replace(/^\//, ''))
);

const problems = [];
const urls = PAGES.map(({ slug, changefreq, priority }) => {
  const file = fileFor(slug);
  if (!fs.existsSync(path.join(root, file))) problems.push(`${file} does not exist`);
  if (redirectSources.has(slug)) problems.push(`/${slug} is a redirect source — must not be listed`);
  return {
    loc: slug === '' ? `${ORIGIN}/` : `${ORIGIN}/${slug}`,
    lastmod: gitDate([file, entryFor(slug)]),
    changefreq,
    priority,
  };
});

// Anything shipped but missing from the list is an omission worth failing on.
const shipped = fs.readdirSync(root)
  .filter((f) => f.endsWith('.html') && !f.startsWith('_') && f !== 'Design Guidelines.html')
  .map((f) => (f === 'index.html' ? '' : f.replace(/\.html$/, '')));
for (const s of shipped) {
  if (!PAGES.some((p) => p.slug === s)) problems.push(`${s || 'index'}.html ships but is not in the sitemap list`);
}

if (problems.length) {
  console.error('\n✗ SITEMAP:');
  problems.forEach((p) => console.error('   - ' + p));
  console.error('');
  process.exit(1);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`Sitemap: ${urls.length} URLs written, lastmod from git.`);
