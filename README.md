# NAVI Media website

Draft one-page website for NAVI Media, built by Chwispy Studio.

## Files

- `index.html`: the main page (same as `navitv.html`), so GitHub Pages can serve it later.
- `navitv.html`: the current draft, with the NAVI MEDIA logo in the header and footer, five Instagram reels, stills from Navi's reels in the monthly content section, and the booking calendar.
- `reviews.html`: the Reviews page, listing every approved client review.
- `apps-script/Code.gs`: the Google Apps Script for the "NAVI Media Reviews" sheet. It saves reviews from the site and serves the approved ones.
- `navitv-v9-before-reviews.html`: backup from before the review form and Reviews page.
- `navitv-v8-before-logo.html`: backup from before the logo and the NAVI Media name.
- `navi-media-logo.webp`: Navi's logo with the black background taken out (the page carries its own copy, so it stays one file).
- `navitv-v7-jotform.html`: the version with a Jotform booking form instead of the calendar, kept as a backup.
- `navitv-v6.html`: backup with the built-in booking calendar and five reels, before the reel stills and Jotform.
- `navitv-v5.html`: backup with the booking calendar and two reels.
- `navitv-v4.html`: backup with the booking calendar, before the reels.
- `navitv-v3.html`: backup from before the booking calendar.
- `navitv-v2.html`: an earlier draft, kept as a backup.
- `navitv-v1.html`: the first draft, kept as a backup.
- `navi-crew.jpg`: the shop group photo. It is also embedded in the page, so the page works as a single file.

## Booking calendar

Clients pick a date, package and place, and the request button opens their own email app with everything filled in, addressed to Navi (`BOOKING_EMAIL` in the script at the bottom). The Get in touch form and email links use `CONTACT_EMAIL`, also set to Navi's email.

## Reviews

Clients leave a review in the "Clients say" section with a star rating and a 4-digit code that Navi gives them after a shoot. The code lives in the Settings tab of the "NAVI Media Reviews" Google Sheet and is checked by the Apps Script inside Google, so it is never in this site's code. New reviews land in the sheet unapproved. Tick Approved and the review shows in "Clients say" (newest six) and on `reviews.html`.

To switch it on, deploy `apps-script/Code.gs` from the sheet as a web app (Execute as: Me, Who has access: Anyone) and paste the `/exec` address into `REVIEWS_URL` in both `index.html` (and `navitv.html`) and `reviews.html`. Until then the placeholder reviews show.

## Still to fill

Search the page for `PLACEHOLDER` to find every spot that still needs real content:

- `REVIEWS_URL` once the reviews web app is deployed
- The booking deposit (`DEPOSIT_AMOUNT`, now a $100 placeholder) and Navi's Stripe or Square payment link (`DEPOSIT_LINK`, now empty, so requests go by email)
- Dates already taken (`BOOKED_DATES`), which show greyed out on the calendar
- The hours in a half day and a full day
