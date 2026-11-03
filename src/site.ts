// Client logos and project screenshots are picked up from these folders if present.
// A missing file doesn't break the build: logos without a file are left out of the
// client strip, and projects without a screenshot fall back to the logo or a text card.
const images = import.meta.glob<string>('./assets/{clients,work}/*.{webp,png,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
});
const asset = (path: string): string | undefined => images[`./assets/${path}`];

/**
 * Company details and content used across the site.
 * Update this file instead of editing the pages. Sections whose list is empty
 * (testimonials, client logos, extra team members) are hidden automatically.
 */

export const site = {
  name: 'Kemlok Technologies',
  legalName: 'Kemlok Technologies Ltd',
  url: 'https://kemloktechnologies.com',
  tagline: 'Software and digital studio for businesses in Uganda.',

  // TODO: switch to a domain address (e.g. hello@kemloktechnologies.com) once the mailbox exists.
  email: 'kemloktechnologies@gmail.com',
  phone: '+256 754 682 325',
  phoneHref: 'tel:+256754682325',
  whatsapp: '+256 772 661 072',
  whatsappNumber: '256772661072',
  address: '4C Kimirante Road, Komamboga, Kampala',
  officeHours: '', // e.g. 'Mon to Fri, 8:00 to 17:00'; hidden while empty

  // Shown in the footer and on the About page once filled in.
  registrationNumber: '', // URSB registration number
  foundedYear: '',

  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kemlok-technologies-undefined-56a632397' },
    { label: 'Instagram', href: 'https://www.instagram.com/kemloktechnologies/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@kemloktechnologies' },
    { label: 'X', href: 'https://x.com/Kemlok_Tech' },
  ],
};

export const mapQuery = encodeURIComponent('4C Kimirante Road, Komamboga, Kampala, Uganda');
export const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
export const mapEmbed = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const whatsappLink = `https://wa.me/${site.whatsappNumber}`;


export type Client = {
  name: string;
  logo: string;
  /** Background behind the logo, matching the logo file's own background */
  background: string;
};

/** Logos for the "Clients we've worked with" strip. Shown once there are 3 or more. */
export const clients: Client[] = [
  { name: 'Limelight Chemicals', logo: asset('clients/limelight-chemicals.jpg'), background: '#ffffff' },
  { name: 'Bampadde Terraces', logo: asset('clients/bampadde-terraces.jpg'), background: '#f6f6f6' },
  { name: 'Antigen Pharmacy Uganda', logo: asset('clients/antigen-pharmacy.png'), background: '#ffffff' },
  { name: 'Ron & Mon Beverages', logo: asset('clients/ron-and-mon.jpg'), background: '#f05509' },
  { name: 'Ehyeh Youth Foundation', logo: asset('clients/ehyeh-youth-foundation.jpg'), background: '#fefefe' },
].filter((c): c is Client => Boolean(c.logo));

const clientByName = (name: string) => clients.find((c) => c.name === name);

export type Project = {
  client: string;
  type: string;
  summary: string;
  /** What we built, as short points */
  highlights: string[];
  /** Main technologies used */
  stack: string[];
  url?: string;
  /** Screenshot of the work. Without one, the client's logo is shown instead. */
  image?: string;
  logo?: Client;
};

export const projects: Project[] = [
  {
    client: 'Bampadde Terraces',
    type: 'Point of sale · Business system',
    summary:
      'A custom point-of-sale system that runs a busy bar and restaurant in Komamboga, from taking orders at the table to closing the day with a full report.',
    highlights: [
      'PIN login for staff, with admin-only controls enforced on the server',
      'Orders by table, with table transfers, merged tables and split bills by item or quantity',
      'Stock that updates the moment an item is sold, with a complete history of every movement',
      'Day sessions that end with an automatic report of sales, payment methods and stock used',
      'Credit sales, suppliers, purchase orders, expenses and damaged stock in one place',
    ],
    stack: ['Node.js', 'Express', 'SQLite', 'TypeScript'],
    image: asset('work/bampadde-pos.jpg'),
    logo: clientByName('Bampadde Terraces'),
  },
  {
    client: 'Ehyeh Youth Foundation',
    type: 'Nonprofit website · Content admin',
    summary:
      'A live website for a youth foundation, with its own admin section so the team can keep it up to date without a developer.',
    highlights: [
      'Pages for programmes, a photo gallery, a blog, the team and testimonials',
      'Online registration for the foundation’s programmes',
      'An admin dashboard to manage every section, from blog posts to gallery photos',
      'Contact messages delivered straight to the foundation by email',
    ],
    stack: ['React', 'Supabase', 'EmailJS', 'Tailwind CSS'],
    url: 'https://ehyehyouthfoundation.org',
    image: asset('work/ehyeh-website.jpg'),
    logo: clientByName('Ehyeh Youth Foundation'),
  },
  {
    client: 'The Sports Lab Africa',
    type: 'Sports content platform',
    summary:
      'A sports storytelling platform that brings fans, creators and sponsors together. Built with the Refactory Academy team.',
    highlights: [
      'Live streams with real-time comments, plus match videos, stories and playlists',
      'Creator dashboards with analytics, earnings and a leaderboard',
      'Content licensing, sponsorship campaigns and events',
      'Payments at checkout, notifications and messaging between users',
    ],
    stack: ['React', 'Django REST Framework', 'Mux video', 'Ably realtime'],
    image: asset('work/sports-lab.jpg'),
  },
  {
    client: "Louis Lukoma's Portfolio",
    type: 'Portfolio website',
    summary:
      'A personal portfolio site for a full-stack developer, built around a live demo of an AI voice agent that answers questions and books calls.',
    highlights: [
      'An interactive AI voice agent demo on the home page',
      'Project cards with detailed write-ups and a full-screen screenshot viewer',
      'A live Kampala clock, a light and dark theme, and smooth scrolling',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Netlify'],
    url: 'https://louis-lukoma-portfolio.netlify.app',
    image: asset('work/portfolio.jpg'),
  },
  // Add more case studies here: { client, type, summary, highlights, stack, url?, image?, logo? }
];

export type Testimonial = { quote: string; name: string; role: string; organisation: string };

/** Real quotes only, used with the client's permission. Section is hidden while empty. */
export const testimonials: Testimonial[] = [];

export type TeamMember = { name: string; role: string; photo?: string };

/** Founder is shown separately on the About page; add other team members here. */
export const team: TeamMember[] = [];
