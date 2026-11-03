import type { LucideIcon } from 'lucide-react';
import { Monitor, Palette, Clapperboard, BarChart3, Lightbulb } from 'lucide-react';

export type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  /** One line, used on the home page */
  short: string;
  /** Two or three sentences, used on the services page */
  description: string;
  bestFor: string;
  offerings: { name: string; detail: string }[];
  /** Optional, e.g. '2 to 4 weeks · from UGX 1,500,000'. Hidden while empty. */
  pricing?: string;
};

export const services: Service[] = [
  {
    id: 'web-systems',
    title: 'Web & Systems',
    icon: Monitor,
    short: 'Business websites, booking systems and internal dashboards, built to be maintained.',
    description:
      'Websites and custom software that do real work for your business: taking bookings, tracking operations and putting your numbers in one place.',
    bestFor: 'Clinics, salons, schools, NGOs and retailers.',
    offerings: [
      { name: 'Business websites', detail: 'Responsive, fast and editable by your team' },
      { name: 'Booking systems', detail: 'Online appointments that reduce no-shows' },
      { name: 'Internal dashboards', detail: 'Your business data in real time' },
    ],
  },
  {
    id: 'branding',
    title: 'Branding & Creative',
    icon: Palette,
    short: 'Logos, brand identity systems and social templates that look consistent everywhere.',
    description:
      'A visual identity that makes your business look as established as it is, applied consistently across print, web and social media.',
    bestFor: 'New businesses and companies refreshing their brand.',
    offerings: [
      { name: 'Logo design', detail: 'A primary mark, variations and all files' },
      { name: 'Brand identity', detail: 'Colours, typography and a usage guide' },
      { name: 'AI graphics', detail: 'Original illustrations and visuals' },
      { name: 'Social media templates', detail: 'Editable designs your team can reuse' },
    ],
  },
  {
    id: 'ai-content',
    title: 'AI Content Production',
    icon: Clapperboard,
    short: 'Product videos and ads produced with AI tools, faster and at lower cost than a shoot.',
    description:
      'Short videos and visuals produced with AI tools, which makes them quicker and more affordable than a traditional shoot. Our team reviews every piece before delivery.',
    bestFor: 'Product launches and regular social content.',
    offerings: [
      { name: 'Video ads', detail: 'Short ads made for social platforms' },
      { name: 'Product showcases', detail: 'Your products presented in motion' },
      { name: 'Brand story videos', detail: 'Who you are, told in under two minutes' },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    icon: BarChart3,
    short: 'Social media management, paid campaigns and SEO, with clear monthly reporting.',
    description:
      'We manage your channels and campaigns and report back every month in plain numbers: reach, enquiries and what each customer cost.',
    bestFor: 'Businesses that want a steady flow of enquiries.',
    offerings: [
      { name: 'Social media management', detail: 'Planning, posting and community replies' },
      { name: 'Ad campaigns', detail: 'Google, Facebook, Instagram and LinkedIn ads' },
      { name: 'SEO & content', detail: 'Get found on Google for what you sell' },
    ],
  },
  {
    id: 'it-consultation',
    title: 'IT Consultation',
    icon: Lightbulb,
    short: 'Technology roadmaps, process automation and practical AI adoption for your team.',
    description:
      'Independent advice on which technology to adopt, what to automate, and where AI can genuinely save your team time.',
    bestFor: 'Owners and managers planning their next step.',
    offerings: [
      { name: 'Technology strategy', detail: 'A prioritised plan aligned with your goals' },
      { name: 'Automation planning', detail: 'Remove repetitive manual work' },
      { name: 'AI implementation', detail: 'Set up AI tools and train your team' },
    ],
  },
];

export const processSteps = [
  { step: 'Discovery', title: 'Free consultation', text: 'We learn your goals, budget and timeline.' },
  { step: 'Strategy', title: 'Written proposal', text: 'Scope, milestones and a quote in writing.' },
  { step: 'Execution', title: 'Build & review', text: 'Regular progress updates you can comment on.' },
  { step: 'Launch', title: 'Handover & support', text: 'Training, documentation and maintenance.' },
];
