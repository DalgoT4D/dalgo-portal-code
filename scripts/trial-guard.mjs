// Trial CTA guard. Runs inside `npm run build`, alongside the pricing-drift and copy-length
// gates, for one reason: the trial CTA is the most prominent button on the site (nav, desktop
// AND mobile, on every page) and it currently points at a STAGING host. If that reaches
// production, every visitor who clicks "Try Dalgo for Free" lands on staging.
//
// This does not fail the build — pointing at staging is a deliberate, useful state while the
// real trial URL is pending. It prints a warning loud enough that nobody merges past it by
// accident, and it exits non-zero only under --strict, so a release step can enforce it:
//   node scripts/trial-guard.mjs --strict
import fs from 'node:fs';

const src = fs.readFileSync(new URL('../site-config.js', import.meta.url), 'utf8');

const pick = (re) => { const m = src.match(re); return m ? m[1] : null; };
const ready = pick(/TRIAL_READY:\s*(true|false)/) === 'true';
const url = pick(/TRIAL_URL:\s*'([^']*)'/) || '';
const prodHosts = (pick(/TRIAL_PROD_HOSTS:\s*\[([^\]]*)\]/) || '')
  .split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean);

let host = '';
try { host = url ? new URL(url).hostname : ''; } catch { host = '(unparseable)'; }

const strict = process.argv.includes('--strict');

if (!ready) {
  console.log('\nTrial CTA guard: OK — trial is OFF, nav shows "Book Free Consultation".');
  process.exit(0);
}
if (!url) {
  console.error('\nTrial CTA guard: TRIAL_READY is true but TRIAL_URL is empty. The nav would fall back to Contact Us.');
  process.exit(strict ? 1 : 0);
}

const isProd = prodHosts.includes(host);
if (isProd) {
  console.log(`\nTrial CTA guard: OK — trial is ON and points at a production host (${host}).`);
  process.exit(0);
}

const bar = '='.repeat(74);
console.error(`\n${bar}
TRIAL CTA GUARD — NON-PRODUCTION DESTINATION
${bar}
  "Try Dalgo for Free" is LIVE in the nav (desktop + mobile) and on /product,
  and it points at:

      ${url}

  Host "${host}" is not in TRIAL_PROD_HOSTS (${prodHosts.join(', ') || 'none set'}).

  Fine for a preview build. NOT fine on dalgo.org:
    - a staging host that serves no noindex lets crawlers into staging via this link
      (links currently carry rel="nofollow" as a stopgap)
    - staging gets reset and redeployed, so this CTA will break silently

  Before merging to main: set TRIAL_URL to the production trial URL in
  site-config.js, or set TRIAL_READY: false.
${bar}`);
process.exit(strict ? 1 : 0);
