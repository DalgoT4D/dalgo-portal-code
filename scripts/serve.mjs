// Local dev server that behaves like the Vercel deployment.
//
// `python3 -m http.server` serves files literally, so /product 404s while production
// serves it fine — every clean URL looks broken locally for no real reason. This reads
// vercel.json and applies the same rules:
//   cleanUrls: true       /product        -> product.html
//   trailingSlash: false  /product/       -> 301 /product
//   redirects[]           /resources      -> 301 /community
//
// Usage: node scripts/serve.mjs [port]      (default 8080)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const port = Number(process.argv[2]) || 8080;
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const redirects = new Map((cfg.redirects || []).map((r) => [r.source, r]));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml', '.pdf': 'application/pdf', '.mp4': 'video/mp4',
};

const safe = (p) => {
  const full = path.normalize(path.join(root, decodeURIComponent(p)));
  return full.startsWith(root) ? full : null; // no path traversal
};

const send = (res, code, body, type) => {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  let pathname = url.pathname;

  // 1. vercel.json redirects (exact source match, as Vercel does)
  const hit = redirects.get(pathname) || redirects.get(pathname.replace(/\/$/, ''));
  if (hit) {
    res.writeHead(hit.permanent ? 301 : 302, { Location: hit.destination + url.search });
    return res.end();
  }

  // 2. trailingSlash: false
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(301, { Location: pathname.slice(0, -1) + url.search });
    return res.end();
  }

  if (pathname === '/') pathname = '/index.html';

  let file = safe(pathname);
  if (!file) return send(res, 403, 'Forbidden');

  // 3. cleanUrls: /product -> product.html
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    if (!path.extname(pathname)) {
      const asHtml = safe(pathname + '.html');
      if (asHtml && fs.existsSync(asHtml)) {
        file = asHtml;
      } else {
        // cleanUrls also means /product.html should canonicalise to /product
        file = null;
      }
    } else {
      file = null;
    }
  } else if (path.extname(pathname) === '.html' && pathname !== '/index.html') {
    // Vercel 308s /product.html -> /product. Mirror it so local links behave identically.
    res.writeHead(308, { Location: pathname.replace(/\.html$/, '') + url.search });
    return res.end();
  }

  if (!file) {
    const custom = path.join(root, '404.html');
    if (fs.existsSync(custom)) {
      return send(res, 404, fs.readFileSync(custom), TYPES['.html']);
    }
    return send(res, 404, `404 — no file for ${pathname}\n\nTried: ${pathname}.html`);
  }

  const ext = path.extname(file).toLowerCase();
  res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`Dalgo dev server on http://localhost:${port}`);
  console.log(`cleanUrls + ${redirects.size} redirects from vercel.json — matches production routing.`);
});
