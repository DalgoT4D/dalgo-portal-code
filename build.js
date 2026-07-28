// Compiles components/*.jsx -> app.bundle.js and pages/src/*.jsx -> pages/*.entry.js,
// then rewrites the ?v= cache-busting query strings in *.html to match each output's content hash.
// Run: node build.js (or npm run build). Watch mode: node build.js --watch
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const babel = require('@babel/core');

const ROOT = __dirname;
const COMPONENTS_DIR = path.join(ROOT, 'components');
const PAGES_SRC_DIR = path.join(ROOT, 'pages', 'src');
const PAGES_OUT_DIR = path.join(ROOT, 'pages');
const BUNDLE_OUT = path.join(ROOT, 'app.bundle.js');

const BABEL_OPTS = {
  presets: [['@babel/preset-react', { runtime: 'classic', pure: true }]],
  compact: true,
  babelrc: false,
  configFile: false,
};

function compile(source, filename) {
  return babel.transformSync(source, { ...BABEL_OPTS, filename }).code;
}

function hashContent(content) {
  return crypto.createHash('sha1').update(content).digest('hex').slice(0, 10);
}

function buildComponentsBundle() {
  const files = fs.readdirSync(COMPONENTS_DIR).filter((f) => f.endsWith('.jsx')).sort();
  const sections = files.map((file) => {
    const name = file.replace(/\.jsx$/, '');
    const src = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8');
    const code = compile(src, file);
    return `/* == ${name} == */\n;(function(){\n${code}\n})();\n`;
  });
  const banner = '/* Dalgo app bundle - auto-generated from components/*.jsx by build.js. Do not hand-edit; edit the source .jsx files and run `npm run build`. */\n\n';
  const content = banner + sections.join('\n');
  fs.writeFileSync(BUNDLE_OUT, content);
  console.log(`Built app.bundle.js from ${files.length} components`);
  return hashContent(content);
}

function buildPageEntries() {
  const files = fs.readdirSync(PAGES_SRC_DIR).filter((f) => f.endsWith('.jsx')).sort();
  const hashes = {};
  for (const file of files) {
    const name = file.replace(/\.jsx$/, '');
    const src = fs.readFileSync(path.join(PAGES_SRC_DIR, file), 'utf8');
    const code = compile(src, file);
    const out = `;(function(){\n${code}\n})();`;
    fs.writeFileSync(path.join(PAGES_OUT_DIR, `${name}.entry.js`), out);
    hashes[name] = hashContent(out);
  }
  console.log(`Built ${files.length} page entry files from pages/src/*.jsx`);
  return hashes;
}

function updateHtmlVersions(bundleHash, entryHashes) {
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  let changed = 0;
  for (const file of htmlFiles) {
    const filePath = path.join(ROOT, file);
    const before = fs.readFileSync(filePath, 'utf8');
    let html = before.replace(/(app\.bundle\.js\?v=)[^"']+/, `$1${bundleHash}`);
    html = html.replace(/(pages\/([a-zA-Z0-9_-]+)\.entry\.js\?v=)[^"']+/, (match, prefix, pageName) => {
      const hash = entryHashes[pageName];
      return hash ? `${prefix}${hash}` : match;
    });
    if (html !== before) {
      fs.writeFileSync(filePath, html);
      changed++;
    }
  }
  console.log(`Updated cache-busting versions in ${changed} html file(s)`);
}

function build() {
  const bundleHash = buildComponentsBundle();
  const entryHashes = buildPageEntries();
  updateHtmlVersions(bundleHash, entryHashes);
}

if (require.main === module) {
  build();

  if (process.argv.includes('--watch')) {
    console.log('Watching components/ and pages/src/ for changes...');
    const rebuild = (label) => {
      try {
        build();
      } catch (e) {
        console.error(`Build failed after change to ${label}:`, e.message);
      }
    };
    fs.watch(COMPONENTS_DIR, { persistent: true }, (_, f) => rebuild(f));
    fs.watch(PAGES_SRC_DIR, { persistent: true }, (_, f) => rebuild(f));
  }
}

module.exports = { build };
