/**
 * NAVI Media reviews
 * Paste this whole file into the "NAVI Media Reviews" sheet: Extensions > Apps Script.
 *
 * What it does
 *   - The website's "Leave a review" form sends each review here.
 *   - A review only saves if it has the 4-digit code in Settings!B1 (Eddie gives it to clients).
 *     The code is checked here, inside your Google account, so it never appears in the website's code.
 *   - New reviews land in the Reviews tab with Approved unticked.
 *   - The website only shows reviews whose Approved box is ticked.
 */

var REVIEWS_TAB = 'Reviews';
var SETTINGS_TAB = 'Settings';
var MAX_WRONG_CODES_PER_HOUR = 15;   // after this many wrong codes, the form pauses for an hour
var MAX_REVIEWS_PER_DAY = 40;        // stops a flood of reviews

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var data = {};
    try { data = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return reply_({ ok: false, error: 'invalid' }); }

    // Hidden "website" field: people never fill it in, spam bots do. Pretend it worked.
    if (data.website) return reply_({ ok: true });

    var cache = CacheService.getScriptCache();
    var wrong = Number(cache.get('wrongCodes') || 0);
    if (wrong >= MAX_WRONG_CODES_PER_HOUR) return reply_({ ok: false, error: 'locked' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var code = String(ss.getSheetByName(SETTINGS_TAB).getRange('B1').getDisplayValue()).trim();
    var given = String(data.code || '').trim();
    if (!/^\d{4}$/.test(code) || given !== code) {
      cache.put('wrongCodes', String(wrong + 1), 3600);
      return reply_({ ok: false, error: 'code' });
    }

    var today = Number(cache.get('reviewsToday') || 0);
    if (today >= MAX_REVIEWS_PER_DAY) return reply_({ ok: false, error: 'busy' });

    var name = clean_(data.name, 60);
    var business = clean_(data.business, 80);
    var headline = clean_(data.headline, 90);
    var review = clean_(data.review, 1200);
    var rating = Math.round(Number(data.rating));
    if (!name || review.length < 10 || !(rating >= 1 && rating <= 5)) return reply_({ ok: false, error: 'invalid' });

    var sh = ss.getSheetByName(REVIEWS_TAB);
    var colA = sh.getRange(1, 1, sh.getMaxRows(), 1).getValues();
    var row = 2;
    while (row <= colA.length && colA[row - 1][0] !== '') row++;
    if (row > sh.getMaxRows()) sh.insertRowsAfter(sh.getMaxRows(), 100);

    sh.getRange(row, 1, 1, 7).setValues([[new Date(), name, business, rating, headline, review, false]]);
    sh.getRange(row, 7).insertCheckboxes();
    cache.put('reviewsToday', String(today + 1), 86400);

    return reply_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// The website reads approved reviews from here, newest first. Nothing else is shared.
function doGet() {
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(REVIEWS_TAB);
  var rows = sh.getDataRange().getValues();
  var list = [];
  for (var i = 1; i < rows.length; i++) {
    var r = rows[i];
    if (r[6] !== true || !String(r[5]).trim()) continue;
    list.push({
      date: r[0] instanceof Date ? r[0].toISOString() : '',
      name: String(r[1]),
      business: String(r[2]),
      rating: Math.max(1, Math.min(5, Math.round(Number(r[3]) || 5))),
      headline: String(r[4]),
      review: String(r[5])
    });
  }
  list.sort(function (a, b) { return a.date < b.date ? 1 : -1; });
  return reply_({ reviews: list });
}

function clean_(value, max) {
  var s = String(value == null ? '' : value)
    .replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max);
  // Stop text that starts with = + - @ from turning into a spreadsheet formula.
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
