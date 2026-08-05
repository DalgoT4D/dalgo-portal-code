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


// ---------------------------------------------------------------------------
// Zoho Campaigns web-optin form (official "No CSS" embed).
// It MUST live in static markup, outside the React root, and its markup must come
// BEFORE optin.min.js: setupSF() binds the button and mints the per-view anti-spam
// tokens (lf/di/tpIx/custIx/cntrIx) at parse time. Initialising it after React mounts
// (post-DOMContentLoaded) leaves the button unbound and the tokens absent, which Zoho
// answers 200 to and silently flags as spam. FooterV2 moves this node into the footer
// after Zoho has bound it (a move preserves listeners). Styling is ours; see .fx-sub*.
const ZC_FORM_IX = '3z266af01fb444d35cd083e15976d443a9d638e328bcf20da052284f8e14e60b55';
const ZC_HOST = 'https://thdv-zgfh.maillist-manage.in';
const ZC_SNIPPET = `<div id="zc-optin-host" hidden>
<div id="sf${ZC_FORM_IX}" data-type="signupform">
<div id="customForm"><div class="quick_form_24_css" name="SIGNUP_BODY"><div class="fx-sub-inner">
<div id="Zc_SignupSuccess" class="fx-sub-done" style="display:none"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg><span id="signupSuccessMsg">Thank you. Please check your inbox for a confirmation link.</span></div>
<form method="POST" id="zcampaignOptinForm" action="${ZC_HOST}/weboptin.zc" target="_zcSignup">
<div id="errorMsgDiv" class="fx-sub-err">Please enter a valid email address.</div>
<div class="fx-sub-row"><input type="text" placeholder="you@example.com" aria-label="Email address" changeitem="SIGNUP_FORM_FIELD" name="CONTACT_EMAIL" id="EMBED_FORM_EMAIL_LABEL"><input type="button" class="cmh-btn cmh-btn-primary" name="SIGNUP_SUBMIT_BUTTON" id="zcWebOptin" value="Subscribe"></div>
<span class="fx-sub-err" id="fx-sub-role" hidden>Zoho can&rsquo;t subscribe shared addresses like this one &mdash; please use your own work email.</span>
<input type="hidden" id="fieldBorder" value=""><input type="hidden" id="submitType" name="submitType" value="optinCustomView"><input type="hidden" id="emailReportId" name="emailReportId" value=""><input type="hidden" id="formType" name="formType" value="QuickForm"><input type="hidden" name="zx" id="cmpZuid" value="1dfa5ea80f"><input type="hidden" name="zcvers" value="2.0"><input type="hidden" name="oldListIds" id="allCheckedListIds" value=""><input type="hidden" id="mode" name="mode" value="OptinCreateView"><input type="hidden" id="zcld" name="zcld" value="1334ba0250252b25"><input type="hidden" id="zctd" name="zctd" value="1334ba025024aa49"><input type="hidden" id="document_domain" value=""><input type="hidden" id="zc_Url" value="thdv-zgfh.maillist-manage.in"><input type="hidden" id="new_optin_response_in" value="0"><input type="hidden" id="duplicate_optin_response_in" value="0"><input type="hidden" name="zc_trackCode" id="zc_trackCode" value="ZCFORMVIEW"><input type="hidden" id="zc_formIx" name="zc_formIx" value="${ZC_FORM_IX}"><input type="hidden" id="viewFrom" value="URL_ACTION">
<span style="display:none" id="dt_CONTACT_EMAIL">1,true,6,Contact Email,2</span><span style="display:none" id="dt_FIRSTNAME">1,false,1,First Name,2</span><span style="display:none" id="dt_LASTNAME">1,false,1,Last Name,2</span>
</form></div></div></div>
<img id="refImage" alt="" width="1" height="1" style="position:absolute;opacity:0" onload="referenceSetter(this)" src="${ZC_HOST}/images/spacer.gif">
</div>
<input type="hidden" id="signupFormType" value="QuickForm_Vertical">
<div id="zcOptinOverLay" class="fx-zc-overlay" style="display:none"></div>
<div id="zcOptinSuccessPopup" class="fx-zc-popup" style="display:none"><span id="closeSuccess" class="fx-zc-close" aria-label="Close"></span><div id="zcOptinSuccessPanel"></div></div>
</div>
<script type="text/javascript" src="${ZC_HOST}/js/optin.min.js" onload="setupSF('sf${ZC_FORM_IX}','ZCFORMVIEW',false,'light',false,'0')"></script>`;

const ZC_PAGES = ['index.html','product.html','consulting.html','case-studies.html','about.html','community.html','pricing.html','faq.html','contact.html','privacy.html'];
function injectZohoOptin(html, file) {
  if (ZC_PAGES.indexOf(file) === -1) return html;            // real site pages only
  if (html.indexOf('zc-optin-host') !== -1) return html;      // already present
  return html.replace('</body>', ZC_SNIPPET + '\n</body>');
}

function updateHtmlVersions(bundleHash, entryHashes) {
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  let changed = 0;
  for (const file of htmlFiles) {
    const filePath = path.join(ROOT, file);
    const before = fs.readFileSync(filePath, 'utf8');
    let html = injectZohoOptin(before, file);
    html = html.replace(/(app\.bundle\.js\?v=)[^"']+/, `$1${bundleHash}`);
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
