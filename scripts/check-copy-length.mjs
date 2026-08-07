// BUILD GATE — a section description must never exceed 2 rendered lines.
//
// Standing rule (Stuti, 7 Aug 2026): supporting copy under a section heading is capped at
// TWO lines at desktop. A third line is a failure, not a nitpick — it makes the section read
// as a paragraph instead of a caption, and it kept slipping through because nobody could see
// it without opening the page.
//
// This measures rather than guesses: it lays out each string with Inter's real glyph advances
// (scripts/inter-metrics.json, exported from assets/fonts/inter-latin.woff2) using the same
// greedy line-breaking a browser does, against each class's real container width. Calibrated
// against browser-measured line counts — see CALIBRATION below.
//
// Run: node scripts/check-copy-length.mjs        (exit 1 on any violation)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const M = JSON.parse(fs.readFileSync(path.join(root, 'scripts/inter-metrics.json'), 'utf8'));

// Container width and font-size per class, measured in-browser at 1440px.
// CALIBRATION: FUDGE compensates for the browser's slightly wider run advance vs raw glyph
// sums (kerning/hinting). Tuned so this script reproduces the browser's line counts exactly.
const FUDGE = 1.02;
const CLASSES = {
  'section-sub':       { width: 749, size: 18 },
  'se-sub':            { width: 860, size: 18 },
  'pg-section-sub':    { width: 749, size: 18 },
  'cvh-sub':           { width: 597, size: 18 },   // visual-tier hero
  'cvh-sub-solo':      { width: 659, size: 18 },   // solo-tier hero
  'comm-lead':         { width: 582, size: 18 },
  'pricing-help-line': { width: 720, size: 16 },
};
const MAX_LINES = 2;

const textWidth = (s, size) => {
  let w = 0;
  for (const ch of s) w += (M.adv[ch] !== undefined ? M.adv[ch] : M.default);
  return w * size * FUDGE;
};

// Greedy wrap, breaking on spaces and after hyphens — same as a browser.
function lineCount(text, width, size) {
  const tokens = text.split(/(?<=[\s—–-])/);
  let lines = 1, cur = 0;
  for (const tok of tokens) {
    const w = textWidth(tok, size);
    if (cur > 0 && cur + textWidth(tok.replace(/\s+$/, ''), size) > width) { lines++; cur = w; }
    else cur += w;
  }
  return lines;
}

const decode = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
  .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘')
  .replace(/&amp;/g, '&').replace(/&#8377;/g, '₹')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ').trim();

const PAGES = 'index product consulting case-studies about community pricing faq contact privacy'.split(' ');
const violations = [];
let checked = 0;

for (const page of PAGES) {
  const file = path.join(root, page + '.html');
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const isSolo = html.includes('cvh-grid-solo');

  for (const [cls, spec] of Object.entries(CLASSES)) {
    const base = cls === 'cvh-sub-solo' ? 'cvh-sub' : cls;
    if (cls === 'cvh-sub' && isSolo) continue;          // solo pages use the wider measure
    if (cls === 'cvh-sub-solo' && !isSolo) continue;
    const re = new RegExp(`<p[^>]*class="([^"]*\\b${base}\\b[^"]*)"[^>]*>([\\s\\S]*?)</p>`, 'g');
    let m;
    while ((m = re.exec(html))) {
      const classAttr = m[1];
      // .se-sub widens .section-sub to 860px — measure against the widest class present,
      // otherwise a perfectly fine two-line sub is reported as three.
      if (base === 'section-sub' && /\bse-sub\b/.test(classAttr)) continue;
      const text = decode(m[2]);
      if (text.length < 20) continue;
      checked++;
      const lines = lineCount(text, spec.width, spec.size);
      if (lines > MAX_LINES) violations.push({ page, cls: base, lines, chars: text.length, text });
    }
  }
}

if (violations.length) {
  console.error(`\n✗ SECTION DESCRIPTION LENGTH — ${violations.length} of ${checked} exceed ${MAX_LINES} lines\n`);
  for (const v of violations) {
    const budget = CLASSES[v.cls] || CLASSES[v.cls + '-solo'];
    console.error(`  ${v.page}  .${v.cls}  ${v.lines} lines  (${v.chars} chars)`);
    console.error(`     "${v.text.slice(0, 96)}${v.text.length > 96 ? '…' : ''}"`);
    console.error('');
  }
  console.error('  Section descriptions are capped at 2 lines. Shorten the copy — do not widen the container.\n');
  process.exit(1);
}
console.log(`Section descriptions: ${checked} checked, all within ${MAX_LINES} lines.`);
