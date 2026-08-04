// One-off static-snapshot rebake. Renders each page's React tree in jsdom and
// splices the resulting #app HTML back into the pre-hydration snapshot so the
// static HTML matches the components. Usage: node .prerender.js [page ...]
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ALL = ['index','product','consulting','case-studies','about','community','pricing','faq','contact','privacy'];
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

function stripV(p){ return p.replace(/\?v=[0-9a-f]+/,''); }

function rebake(page){
  const htmlPath = path.join(__dirname, page + '.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="app"></div></body></html>', {
    runScripts: 'outside-only', pretendToBeVisual: true, url: 'https://dalgo.org/' + page,
  });
  const { window } = dom;
  // shims
  window.matchMedia = window.matchMedia || function(){ return { matches:false, media:'', addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){return false;} }; };
  window.scrollTo = function(){};
  window.IntersectionObserver = window.IntersectionObserver || function(){ return { observe(){}, unobserve(){}, disconnect(){}, takeRecords(){return[];} }; };
  window.ResizeObserver = window.ResizeObserver || function(){ return { observe(){}, unobserve(){}, disconnect(){} }; };
  window.requestAnimationFrame = window.requestAnimationFrame || function(cb){ return setTimeout(()=>cb(0),0); };
  window.cancelAnimationFrame = window.cancelAnimationFrame || function(id){ clearTimeout(id); };
  window.__currentPage = page;

  const load = f => window.eval(fs.readFileSync(path.join(__dirname, f), 'utf8'));
  load('vendor/react.production.min.js');
  load('vendor/react-dom.production.min.js');
  load('site-config.js');
  load('app.bundle.js');
  load('pages/' + page + '.entry.js');

  return new Promise(resolve => {
    setTimeout(() => {
      const rendered = window.document.getElementById('app').outerHTML;
      // Replace the existing snapshot: from `<div id="app">` up to the newline
      // before `<script src="site-config.js">`.
      // Prefix match so a ?v= cache-buster on site-config.js doesn't break the anchor.
      const anchor = '\n<script src="site-config.js';
      const start = html.indexOf('<div id="app">');
      const anchorIdx = html.indexOf(anchor, start);
      if (start === -1 || anchorIdx === -1) { console.log('  SKIP (anchor not found):', page); return resolve(false); }
      html = html.slice(0, start) + rendered + html.slice(anchorIdx);
      fs.writeFileSync(htmlPath, html);
      console.log('  rebaked', page, '(' + rendered.length + ' chars)');
      dom.window.close();
      resolve(true);
    }, 80);
  });
}

(async () => { for (const p of pages) { await rebake(p); } })();
