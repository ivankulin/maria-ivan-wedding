# Maria & Ivan wedding site

This is a static wedding website designed for GitHub Pages, with a separate RSVP page gated by invitation codes.

## Formspree setup

1. Create a Formspree form and copy the endpoint URL.
2. Update `FORM_ENDPOINT` in `rsvp.js` with your Formspree URL.

RSVP submissions will be delivered by Formspree (email and dashboard).

## RSVP codes

Codes and rules live in `rsvp.js`. The default list is:

- `ANGEL-EVELIN` (2 adults, up to 1 child, no +1)
- `YOSIF` (single, +1 allowed)
- `SLAVI` (single, +1 allowed)
- `STOYAN` (single, +1 allowed)

Edit `codeRules` to add or change guests.

## Local preview

Use any static server or open `index.html` directly in a browser.
