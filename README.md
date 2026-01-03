# Maria & Ivan wedding site

Static wedding website for GitHub Pages with a separate RSVP page gated by invitation codes.

## Pages

- `index.html` (main site)
- `rsvp.html` (RSVP form)
- `menu.html` (menu placeholder)
- `drinks.html` (drinks card placeholder)

## Formspree setup

1. Create a Formspree form and copy the endpoint URL.
2. Update `FORM_ENDPOINT` in `rsvp.js` with your Formspree URL.

RSVP submissions will be delivered by Formspree (email and dashboard).

## Translations

All copy lives in `i18n/` as one JSON file per language:

- `i18n/en.json`
- `i18n/da.json`
- `i18n/ro.json`
- `i18n/bg.json`

Each file includes `index`, `menu`, `drinks`, and `rsvp` sections so native speakers can review text easily.

## Invitation codes

Invitation names live in `invites.json`. Each entry contains:

- `names`: one or two names (used to generate the code)
- `allowPlusOne`: the only configurable rule

Example:

```json
{
  "names": ["Angel", "Evelin"],
  "allowPlusOne": false
}
```

Codes are generated automatically by uppercasing names and joining with hyphens (e.g., `Angel Evelin` -> `ANGEL-EVELIN`).

## Local preview

Run a local static server so the `i18n/*.json` and `invites.json` files can be fetched:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.
