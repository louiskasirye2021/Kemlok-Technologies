# Kemlok Technologies website

Source for [kemloktechnologies.com](https://kemloktechnologies.com): a React + Vite site with Tailwind CSS v4,
Framer Motion animations and a demo booking assistant. It is hosted on GitHub Pages.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript check
npm run build      # production build in build/
npm run preview    # serve the production build
```

## Editing content

Most content lives in two files, so pages rarely need editing:

- `src/site.ts`: contact details, social links, client logos, projects, testimonials and team.
  Empty lists hide their section automatically.
- `src/services.ts`: the five services and the engagement process.

Client logos go in `src/assets/clients/` and project screenshots in `src/assets/work/`, named as in `site.ts`.
A missing image doesn't break the build: the page falls back to the logo or a text card.

## Contact form and booking assistant

By default, the contact form and the assistant's booking requests open WhatsApp with the message filled in.
To receive them by email instead, set `VITE_FORM_ENDPOINT` (for example a [Formspree](https://formspree.io) URL)
in a `.env` file before building:

```
VITE_FORM_ENDPOINT=https://formspree.io/f/your-id
```

The assistant (`src/components/assistant/`) answers from `site.ts` and `services.ts`; it is rule-based and
runs entirely in the browser.

## Deploying

```bash
npm run deploy
```

This builds the site and publishes `build/` to the `gh-pages` branch. `public/CNAME` keeps the custom domain,
and `scripts/postbuild.mjs` writes a page per route (so links like `/services` work), a `404.html` and the sitemap.
