// Tiny static file server for previewing the site locally. No external dependencies.
// Mirrors the URL behavior Vercel applies in production (vercel.json): clean URLs
// (no .html extension), no trailing slash, and the declared legacy-slug redirects —
// so a link that works locally behaves the same way once deployed.
// Run: node serve.js (or npm run dev)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;

const VERCEL_CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const REDIRECTS = new Map((VERCEL_CONFIG.redirects || []).map((r) => [r.source, r.destination]));

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function redirect(res, location) {
  res.writeHead(301, { Location: location });
  res.end();
}

const server = http.createServer((req, res) => {
  const [rawPath, query] = req.url.split('?');
  const suffix = query ? `?${query}` : '';
  let urlPath = decodeURIComponent(rawPath);

  // No trailing slash, e.g. /product/ -> /product (matches vercel.json trailingSlash: false)
  if (urlPath !== '/' && urlPath.endsWith('/')) {
    redirect(res, urlPath.slice(0, -1) + suffix);
    return;
  }

  // Legacy slugs declared in vercel.json, e.g. /platform -> /product
  if (REDIRECTS.has(urlPath)) {
    redirect(res, REDIRECTS.get(urlPath) + suffix);
    return;
  }

  // Clean URLs, e.g. /product.html -> /product (matches vercel.json cleanUrls: true)
  if (urlPath.toLowerCase().endsWith('.html')) {
    const clean = urlPath.slice(0, -'.html'.length);
    redirect(res, (clean === '/index' ? '/' : clean) + suffix);
    return;
  }

  if (urlPath === '/') urlPath = '/index.html';
  else if (!path.extname(urlPath)) urlPath += '.html';

  const filePath = path.join(ROOT, urlPath);
  // Guard against escaping the project root via ../
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + urlPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\nPort ${PORT} is already in use — something else (maybe another copy of this server) is already running there.`);
    console.error(`Either open http://localhost:${PORT} in your browser (it may already be showing the site), or stop the other process and try again.`);
    console.error(`To use a different port instead: PORT=8081 npm run dev\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`Dalgo site running at http://localhost:${PORT}`);
});
