# Kemlok Technologies website

React + Vite + Tailwind CSS v4, with real page URLs via React Router.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:3000
npm run build      # production build in build/
npm run deploy     # publish build/ to GitHub Pages
```

## Editing content

- `src/site.ts` — contact details, socials, URSB number, founded year, case studies, client names,
  testimonials and team. Sections with no data (testimonials, team, client strip) stay hidden until you fill them.
- `src/services.ts` — the five services, what each includes, and the engagement process.
- `src/index.css` — colours and fonts.

## Pages

`/`, `/about`, `/services`, `/contact`, `/terms`, `/privacy`. After `vite build`,
`scripts/postbuild.mjs` gives each page its own `index.html` (correct title and share preview),
writes `404.html`, and regenerates `sitemap.xml`.

## Contact form

Set `VITE_FORM_ENDPOINT` (for example a Formspree URL) in a `.env` file to receive form messages by email.
Without it, the form opens WhatsApp with the message filled in.
