/**
 * Education Hub — lead capture endpoint
 * =====================================
 * Google Apps Script web app behind every resource form, assessment and newsletter box on
 * dalgo.org/resources. The site is static on Vercel, so there is no server to post to; this
 * is it.
 *
 * WHAT IT DOES, in order:
 *   1. appends one row to the "Education Hub Leads" sheet
 *   2. emails the file link to the visitor
 *   3. if interest_yes, notifies sales and stamps sales_notified_at
 *   4. if newsletter_yes, flags the row for the newsletter list
 *
 * ---------------------------------------------------------------------------------------
 * DEPLOY (once)
 *   1. Open the Google Sheet that will hold the leads. Extensions → Apps Script.
 *   2. Paste this file in, replace the CONFIG block below, Save.
 *   3. Run `setupSheet` once from the editor and accept the permission prompt. It creates the
 *      tab and writes the header row in the exact column order the blueprint specifies.
 *   4. Deploy → New deployment → type "Web app".
 *        Execute as:        Me
 *        Who has access:    Anyone                    ← required; the browser posts anonymously
 *   5. Copy the /exec URL into LEADS_ENDPOINT in site-config.js.
 *
 * ⚑ "Who has access: Anyone" is what makes an anonymous POST work. It does NOT make the Sheet
 *    public — only this script can write to it, and the script only ever appends.
 * ---------------------------------------------------------------------------------------
 */

// ===== CONFIG — the four things to set ====================================================
var CONFIG = {
  SHEET_ID: '',                        // ⚑ the Google Sheet's id (from its URL)
  SHEET_NAME: 'Education Hub Leads',
  // ⚑ OPEN QUESTION, owner Stuti + Priyesh: how does a "yes" lead reach sales — email alert,
  // Slack, or a filtered view in the Sheet? Email is the default because it needs no new
  // integration. To switch to Slack, fill SLACK_WEBHOOK and notifySales() takes that branch.
  SALES_EMAIL: 'priyesh@projecttech4dev.org',
  SLACK_WEBHOOK: '',
  FROM_NAME: 'Dalgo',
  SITE: 'https://dalgo.org'
};

// Column order IS the blueprint's, section 5. Changing it means changing the Sheet, so the
// order lives in one array and both the header and every row are built from it.
var COLUMNS = [
  'submitted_at', 'name', 'email', 'organisation', 'role', 'country',
  'asset_slug', 'asset_title', 'shelf',
  'utm_source', 'utm_medium', 'utm_campaign', 'referrer',
  'interest_yes', 'newsletter_yes',
  'quiz_score', 'quiz_band',
  'sales_notified_at', 'owner', 'status'
];

/** Run once from the editor. Creates the tab and the header row. */
function setupSheet() {
  var ss = SpreadsheetApp.openById(CONFIG.SHEET_ID);
  var sh = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);
  sh.clear();
  sh.appendRow(COLUMNS);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  return 'ready: ' + CONFIG.SHEET_NAME;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // The honeypot is caught in the browser, but a bot posting straight at this URL never ran
    // that code — so the same check runs again here.
    if (data.company_website) return ok();

    if (!data.email) return ok();        // nothing usable; accept and drop rather than error

    var now = new Date();
    var notifiedAt = '';
    if (data.interest_yes) {
      try { notifySales(data); notifiedAt = now.toISOString(); }
      catch (err) { console.error('sales notify failed', err); }   // never lose the row over this
    }

    var row = {
      submitted_at: data.submitted_at || now.toISOString(),
      name: data.name || '',
      email: data.email,
      organisation: data.organisation || '',
      role: data.role || '',
      country: data.country || '',
      asset_slug: data.asset_slug || '',
      asset_title: data.asset_title || '',
      shelf: data.shelf || '',
      utm_source: data.utm_source || '',
      utm_medium: data.utm_medium || '',
      utm_campaign: data.utm_campaign || '',
      referrer: data.referrer || '',
      interest_yes: data.interest_yes ? 'TRUE' : 'FALSE',
      newsletter_yes: data.newsletter_yes ? 'TRUE' : 'FALSE',
      quiz_score: data.quiz_score === 0 || data.quiz_score ? data.quiz_score : '',
      quiz_band: data.quiz_band || '',
      sales_notified_at: notifiedAt,
      // ⚑ OPEN QUESTION, owner Stuti + Atreyee: who owns the nurture drip, sales or marketing?
      // The row carries owner and status so whoever takes it can work the Sheet from day one;
      // nothing in the drip itself is built here.
      owner: data.interest_yes ? 'sales' : 'marketing',
      status: data.interest_yes ? 'new — to contact' : 'new — nurture'
    };

    var sh = SpreadsheetApp.openById(CONFIG.SHEET_ID).getSheetByName(CONFIG.SHEET_NAME);
    sh.appendRow(COLUMNS.map(function (c) { return row[c]; }));

    // A newsletter-only signup (the band or the pop-up) has no asset to email.
    if (data.shelf !== 'newsletter') {
      try { emailAsset(data); } catch (err) { console.error('asset email failed', err); }
    }

    return ok();
  } catch (err) {
    console.error(err);
    return ok();   // never show the visitor an error: they already have their file
  }
}

/** Sends the visitor their file. The link is the public URL on dalgo.org, not an attachment. */
function emailAsset(data) {
  if (!data.asset_slug) return;
  var url = CONFIG.SITE + '/files/resources/' + data.asset_slug + '.pdf';
  var page = CONFIG.SITE + '/resources/' + data.asset_slug;
  var first = (data.name || '').split(' ')[0] || 'there';
  MailApp.sendEmail({
    to: data.email,
    name: CONFIG.FROM_NAME,
    subject: data.asset_title ? (data.asset_title + ' — your copy') : 'Your guide from Dalgo',
    htmlBody:
      '<p>Hi ' + escapeHtml(first) + ',</p>' +
      '<p>Here is your copy of <strong>' + escapeHtml(data.asset_title || 'the guide') + '</strong>:</p>' +
      '<p><a href="' + url + '">Download the PDF</a></p>' +
      '<p>You can also read it on the site: <a href="' + page + '">' + page + '</a></p>' +
      '<p>If anything in it raises a question about your own data, just reply to this email.</p>' +
      '<p>— The Dalgo team</p>' +
      '<hr><p style="font-size:12px;color:#48607A">You received this because you asked for this ' +
      'resource on dalgo.org. You are not subscribed to anything by downloading it.</p>'
  });
}

/**
 * ⚑ OPEN QUESTION: the channel. Email by default; fill SLACK_WEBHOOK to switch. Whichever it
 * is, the shape of the message stays the same so the decision is a config change.
 */
function notifySales(data) {
  var lines = [
    'Name: ' + (data.name || ''),
    'Email: ' + data.email,
    'Organisation: ' + (data.organisation || ''),
    'Role: ' + (data.role || ''),
    'Country: ' + (data.country || ''),
    'Resource: ' + (data.asset_title || '') + ' (' + (data.shelf || '') + ')',
    'Source: ' + [data.utm_source, data.utm_medium, data.utm_campaign].filter(String).join(' / '),
    'Referrer: ' + (data.referrer || '—')
  ];
  if (data.quiz_band) lines.push('Assessment: ' + data.quiz_band + ' (' + data.quiz_score + '%)');

  if (CONFIG.SLACK_WEBHOOK) {
    UrlFetchApp.fetch(CONFIG.SLACK_WEBHOOK, {
      method: 'post', contentType: 'application/json',
      payload: JSON.stringify({ text: '*Education Hub — interested lead*\n' + lines.join('\n') })
    });
    return;
  }
  MailApp.sendEmail({
    to: CONFIG.SALES_EMAIL,
    name: CONFIG.FROM_NAME,
    subject: 'Education Hub lead: ' + (data.organisation || data.email),
    body: 'This person ticked the consulting / platform box.\n\n' + lines.join('\n') +
          '\n\nThey have been told someone will write within two working days.'
  });
}

function ok() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
