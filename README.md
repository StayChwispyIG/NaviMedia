# Navi Media / NaviTv website

Draft one-page website for NaviTv (Navi Media), built by Chwispy Studio.

## Files

- `index.html`: the main page (same as `navitv.html`), so GitHub Pages can serve it later.
- `navitv.html`: the current draft, with five Instagram reels, stills from Navi's reels in the monthly content section, and the booking calendar.
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

## Still to fill

Search the page for `PLACEHOLDER` to find every spot that still needs real content:

- Navi's logo file
- Real client reviews (only with the client's permission)
- The booking deposit (`DEPOSIT_AMOUNT`, now a $100 placeholder) and Navi's Stripe or Square payment link (`DEPOSIT_LINK`, now empty, so requests go by email)
- Dates already taken (`BOOKED_DATES`), which show greyed out on the calendar
- The hours in a half day and a full day
