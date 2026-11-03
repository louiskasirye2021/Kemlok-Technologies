// Runs after `vite build`. Gives every page its own index.html (so links like
// /services work on any static host and show the right title when shared),
// adds a 404.html fallback, and regenerates sitemap.xml.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://kemloktechnologies.com';
const OUT = 'build';
const NAME = 'Kemlok Technologies';

const pages = [
  {
    path: '/',
    title: NAME,
    description:
      'Kampala software and digital studio: websites, booking systems, dashboards, branding and digital marketing for Ugandan businesses.',
  },
  {
    path: '/about',
    title: `About | ${NAME}`,
    description:
      'Kemlok Technologies is a Kampala-based software and digital studio helping small and medium-sized businesses grow with technology.',
  },
  {
    path: '/services',
    title: `Services | ${NAME}`,
    description:
      'Web & systems, branding, AI content production, digital marketing and IT consultation for businesses in Uganda.',
  },
  {
    path: '/contact',
    title: `Contact | ${NAME}`,
    description:
      'Contact Kemlok Technologies in Kampala by WhatsApp, phone or email. We reply to every enquiry within 24 hours.',
  },
  {
    path: '/terms',
    title: `Terms of Service | ${NAME}`,
    description: 'The terms that apply to services provided by Kemlok Technologies.',
  },
  {
    path: '/privacy',
    title: `Privacy Policy | ${NAME}`,
    description: 'How Kemlok Technologies collects, uses and protects your personal information.',
  },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const template = readFileSync(join(OUT, 'index.html'), 'utf8');

function render({ path, title, description }) {
  const url = SITE + path;
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
}

for (const page of pages) {
  const dir = join(OUT, page.path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(page));
}

// Unknown URLs: hosts such as GitHub Pages and Netlify serve 404.html, and the app shows its own "not found" page.
writeFileSync(
  join(OUT, '404.html'),
  render({ path: '/', title: `Page not found | ${NAME}`, description: pages[0].description }).replace(
    /<link rel="canonical"[^>]*>\n?\s*/,
    '',
  ),
);

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE}${p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(OUT, 'sitemap.xml'), sitemap);

console.log(`postbuild: wrote ${pages.length} pages, 404.html and sitemap.xml`);
