// Content-hash cache busting for images referenced in the built HTML.
//
// Why: vercel.json sets `Cache-Control: public, max-age=604800` on /assets/*, and our image
// filenames never change. So when an asset is replaced in place — as the community-card
// thumbnails were on 7 Aug — every browser and CDN edge that already has it keeps serving the
// old bytes for up to seven days. The file on disk is right, production is right, and the
// visitor still sees the previous image. Telling people to hard-refresh is not a fix.
//
// This rewrites every local image URL in the baked HTML to `path?v=<8-char content hash>`, so
// changing a file changes its URL and the cache is bypassed automatically. Idempotent: an
// existing ?v= is stripped and recomputed, so re-running never stacks query strings.
//
// Runs after .prerender.js (it edits the same HTML). JS/CSS already carry their own ?v=.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PAGES = 'index product consulting case-studies meet-the-team community pricing faq contact privacy'.split(' ');
const EXT = /\.(webp|png|jpe?g|svg|gif|avif)$/i;

const hashes = new Map();
const hashOf = (rel) => {
  if (hashes.has(rel)) return hashes.get(rel);
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) { hashes.set(rel, null); return null; }
  const h = crypto.createHash('sha1').update(fs.readFileSync(file)).digest('hex').slice(0, 8);
  hashes.set(rel, h);
  return h;
};

let rewritten = 0, missing = [];

// 1. The baked HTML.
for (const page of PAGES) {
  const file = path.join(root, page + '.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // src="assets/…" and href="assets/…" — local paths only, never absolute URLs
  html = html.replace(/(\s(?:src|href)=")(assets\/[^"?]+?)(?:\?v=[0-9a-f]+)?(")/g, (m, pre, rel, post) => {
    if (!EXT.test(rel)) return m;
    const h = hashOf(rel);
    if (!h) { missing.push(`${page}: ${rel}`); return m; }
    rewritten++;
    return `${pre}${rel}?v=${h}${post}`;
  });

  if (html !== before) fs.writeFileSync(file, html);
}

// 2. The compiled JS — the part that actually matters at runtime.
//    Hashing only the HTML is not enough: React re-renders on hydration and writes the
//    component's own (unhashed) path back onto the img, so the browser reuses its cached
//    copy and the page shows the old asset even though the HTML was correct. Every
//    'assets/…' string literal in the bundle and page entries gets the same hash.
const jsFiles = ['app.bundle.js', ...fs.readdirSync(path.join(root, 'pages')).filter((f) => f.endsWith('.entry.js')).map((f) => 'pages/' + f)];
for (const rel of jsFiles) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) continue;
  let js = fs.readFileSync(file, 'utf8');
  const before = js;
  js = js.replace(/(["'`])(assets\/[^"'`?]+?)(?:\?v=[0-9a-f]+)?\1/g, (m, q, p2) => {
    if (!EXT.test(p2)) return m;
    const h = hashOf(p2);
    if (!h) { missing.push(`${rel}: ${p2}`); return m; }
    rewritten++;
    return `${q}${p2}?v=${h}${q}`;
  });
  if (js !== before) fs.writeFileSync(file, js);
}

if (missing.length) {
  console.error(`\n✗ ASSET CACHE-BUST — ${missing.length} referenced image(s) do not exist on disk:`);
  [...new Set(missing)].forEach((m) => console.error('   - ' + m));
  console.error('');
  process.exit(1);
}
console.log(`Asset cache-busting: ${rewritten} image URL(s) hashed across ${PAGES.length} pages + the compiled JS.`);
