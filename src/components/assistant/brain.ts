import { processSteps, services, type Service } from '../../services';
import { clients, mapLink, projects, site, whatsappLink, type Project } from '../../site';

/**
 * The demo assistant's logic. It answers from the site's own content (services.ts and
 * site.ts), so answers stay accurate when that content changes, and it never invents
 * prices or promises. It also walks visitors through a booking request.
 *
 * Everything here is a pure function of (state, message), with no network or React,
 * so a real AI backend can replace `respond` later without touching the chat UI.
 */

export type Reply = {
  text: string;
  /** Optional call to action shown under the message */
  link?: { label: string; href: string };
};

export type Booking = {
  kind: string;
  service: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  notes: string;
};

type Step = 'kind' | 'service' | 'name' | 'phone' | 'email' | 'date' | 'time' | 'notes' | 'confirm';

export type AssistantState = { mode: 'chat' } | { mode: 'booking'; step: Step; booking: Partial<Booking> };

export type Turn = {
  state: AssistantState;
  replies: Reply[];
  /** Quick replies offered for the next message */
  chips: string[];
  /** Set when a confirmed booking should be sent */
  submit?: Booking;
};

export const initialState: AssistantState = { mode: 'chat' };

export const MAIN_CHIPS = ['Book a consultation', 'What services do you offer?', 'How much does it cost?', 'Show me your work'];

export function greeting(): Turn {
  return {
    state: initialState,
    replies: [
      {
        text: `Hi! I'm the ${site.name} assistant. I can answer questions about our services, process and past work, or book a free consultation for you.`,
      },
    ],
    chips: MAIN_CHIPS,
  };
}

/* ------------------------------------------------------------------ */
/* Text matching                                                        */
/* ------------------------------------------------------------------ */

/** Lowercases, strips punctuation and trims plural "s" so "logos" matches "logo". */
function normalise(text: string) {
  return text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9&]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w))
    .join(' ');
}

/** Scores a message against key phrases; longer phrase matches count for more. */
function score(message: string, phrases: string[]) {
  const padded = ` ${message} `;
  return phrases.reduce((total, phrase) => {
    const p = normalise(phrase);
    return padded.includes(` ${p} `) ? total + p.split(' ').length : total;
  }, 0);
}

const matches = (message: string, phrases: string[]) => score(normalise(message), phrases) > 0;

const CANCEL = ['cancel', 'cancel booking', 'cancel it', 'stop', 'quit', 'exit', 'never mind', 'nevermind', 'forget it'];
const SKIP = ['skip', 'no', 'none', 'nothing', 'no thanks', 'n/a', 'na'];
const YES = ['yes', 'yeah', 'yep', 'confirm', 'confirm booking', 'correct', 'ok', 'okay', 'sure', 'send', 'book it'];

/* ------------------------------------------------------------------ */
/* Knowledge                                                            */
/* ------------------------------------------------------------------ */

const serviceKeywords: Record<string, string[]> = {
  'web-systems': ['website', 'web', 'site', 'web design', 'booking system', 'dashboard', 'system', 'software', 'app', 'application', 'point of sale', 'pos', 'landing page', 'web app'],
  branding: ['logo', 'brand', 'branding', 'brand identity', 'graphic', 'graphics', 'design', 'template', 'flyer', 'poster'],
  'ai-content': ['video', 'video ad', 'ai video', 'product video', 'showcase', 'ai content', 'content production', 'animation', 'reel'],
  'digital-marketing': ['marketing', 'digital marketing', 'social media', 'seo', 'google', 'facebook', 'instagram', 'tiktok', 'linkedin', 'ad', 'ads', 'advert', 'campaign', 'follower', 'lead'],
  'it-consultation': ['it consultation', 'it consulting', 'consultant', 'advice', 'strategy', 'technology strategy', 'automation', 'automate', 'ai implementation', 'roadmap', 'digital transformation'],
};

const list = (items: string[]) => items.map((i) => `• ${i}`).join('\n');

const projectKeywords: Record<string, string[]> = {
  'Bampadde Terraces': ['bampadde', 'bampadde terrace', 'bar system', 'restaurant system'],
  'Ehyeh Youth Foundation': ['ehyeh', 'youth foundation', 'foundation website', 'nonprofit', 'ngo website'],
  'The Sports Lab Africa': ['sports lab', 'sport lab', 'sports platform', 'sports content'],
  "Louis Lukoma's Portfolio": ['louis portfolio', 'portfolio website', 'portfolio site', 'voice agent demo'],
};

function projectAnswer(p: Project): Reply {
  return {
    text: `${p.client} (${p.type}): ${p.summary}\n\nWhat we built:\n${list(p.highlights)}\n\nBuilt with ${p.stack
      .slice(0, -1)
      .join(', ')} and ${p.stack[p.stack.length - 1]}.`,
    link: p.url ? { label: 'Visit the site', href: p.url } : { label: 'See our work', href: '/#work' },
  };
}

function serviceAnswer(s: Service): Reply {
  return {
    text: `${s.title}: ${s.description}\n\nWhat's included:\n${list(s.offerings.map((o) => `${o.name}: ${o.detail}`))}\n\nBest for: ${s.bestFor}${
      s.pricing ? `\nTypical engagement: ${s.pricing}` : ''
    }`,
    link: { label: `More about ${s.title}`, href: `/services#${s.id}` },
  };
}

type Intent = { phrases: string[]; answer: () => Omit<Turn, 'state'> };

const intents: Intent[] = [
  {
    phrases: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'oli otya', 'gyebale'],
    answer: () => ({
      replies: [{ text: 'Hello! What can I help you with today?' }],
      chips: MAIN_CHIPS,
    }),
  },
  {
    phrases: ['service', 'what do you do', 'what do you offer', 'offer', 'help with', 'what can you do', 'do you do'],
    answer: () => ({
      replies: [
        {
          text: `We offer five services:\n${list(services.map((s) => `${s.title}: ${s.short}`))}\n\nAsk about any of them for details.`,
          link: { label: 'See all services', href: '/services' },
        },
      ],
      chips: [...services.map((s) => s.title), 'Book a consultation'],
    }),
  },
  {
    phrases: ['price', 'pricing', 'cost', 'how much', 'charge', 'fee', 'rate', 'quote', 'budget', 'expensive', 'cheap', 'afford'],
    answer: () => ({
      replies: [
        {
          text:
            "Every project is quoted individually, because cost depends on scope. Here's how it works: we start with a free consultation, then send a written proposal with the scope, milestones and a fixed quote, so you know exactly what you're paying before any work starts.\n\nWe work with small businesses and established companies, so tell us your budget and we'll recommend the simplest option that fits.",
        },
      ],
      chips: ['Book a consultation', 'How does your process work?'],
    }),
  },
  {
    phrases: ['process', 'how does it work', 'how do you work', 'step', 'what happen', 'proposal', 'get started', 'start'],
    answer: () => ({
      replies: [
        {
          text: `Our process has four steps:\n${processSteps.map((p, i) => `${i + 1}. ${p.title}: ${p.text}`).join('\n')}`,
        },
      ],
      chips: ['Book a consultation', 'How much does it cost?'],
    }),
  },
  {
    phrases: ['how long', 'timeline', 'time frame', 'timeframe', 'deadline', 'duration', 'how fast', 'how quickly', 'when can', 'turnaround'],
    answer: () => ({
      replies: [
        {
          text:
            'Timelines depend on the size of the project. Your written proposal sets out milestones and a delivery date before work starts, and you get regular progress updates along the way. If you have a deadline, mention it when you book and we\'ll tell you honestly whether it\'s realistic.',
        },
      ],
      chips: ['Book a consultation', 'How does your process work?'],
    }),
  },
  {
    phrases: ['work', 'portfolio', 'project', 'example', 'case study', 'past work', 'previous', 'built', 'show me'],
    answer: () => ({
      replies: [
        {
          text: `Some recent projects:\n${list(projects.map((p) => `${p.client}: ${p.type}`))}\n\nAsk about any of them for details.`,
          link: { label: 'See our work', href: '/#work' },
        },
      ],
      chips: ['Who are your clients?', 'Book a consultation'],
    }),
  },
  {
    phrases: ['client', 'customer', 'who have you worked with', 'worked with', 'reference', 'testimonial', 'review'],
    answer: () => ({
      replies: [
        {
          text: `We've worked with ${(clients.length ? clients.map((c) => c.name) : projects.map((p) => p.client)).join(', ')}, among others.`,
          link: { label: 'See our work', href: '/#work' },
        },
      ],
      chips: ['Show me your work', 'Book a consultation'],
    }),
  },
  {
    phrases: ['about', 'who are you', 'company', 'kemlok', 'founder', 'owner', 'ceo', 'team', 'mission', 'vision', 'who run'],
    answer: () => ({
      replies: [
        {
          text: `${site.name} is a Kampala-based software and digital studio, founded by Louis Lukoma (Founder & CEO). We help small and medium-sized businesses get the websites, systems and marketing that larger companies take for granted, at a price and pace that make sense for them.`,
          link: { label: 'About us', href: '/about' },
        },
      ],
      chips: ['What services do you offer?', 'Show me your work'],
    }),
  },
  {
    phrases: ['where', 'location', 'located', 'address', 'office', 'find you', 'direction', 'map', 'komamboga', 'kampala'],
    answer: () => ({
      replies: [
        {
          text: `Our office is at ${site.address}. Please book before visiting so someone is there to meet you.`,
          link: { label: 'Open in Google Maps', href: mapLink },
        },
      ],
      chips: ['Book an office visit', 'How can I contact you?'],
    }),
  },
  {
    phrases: ['contact', 'phone', 'call you', 'number', 'email', 'whatsapp', 'reach', 'talk to', 'human', 'person', 'someone', 'agent', 'speak'],
    answer: () => ({
      replies: [
        {
          text: `You can reach us on:\n• WhatsApp: ${site.whatsapp}\n• Phone: ${site.phone}\n• Email: ${site.email}\n\nWe reply to every enquiry within 24 hours.`,
          link: { label: 'Chat on WhatsApp', href: whatsappLink },
        },
      ],
      chips: ['Book a consultation'],
    }),
  },
  {
    phrases: ['hour', 'open', 'opening', 'when are you', 'weekend', 'saturday', 'sunday', 'available', 'availability'],
    answer: () => ({
      replies: [
        {
          text: site.officeHours
            ? `Our office hours are ${site.officeHours}. Messages sent outside those hours are answered the next working day.`
            : 'We reply to every enquiry within 24 hours. For a call or visit, pick a time when you book and we\'ll confirm it with you.',
        },
      ],
      chips: ['Book a consultation', 'How can I contact you?'],
    }),
  },
  {
    phrases: ['support', 'maintenance', 'after launch', 'training', 'update', 'host', 'hosting', 'fix', 'bug', 'help after'],
    answer: () => ({
      replies: [
        {
          text: 'Yes. Support continues after launch: we train your team, hand over documentation, and offer ongoing maintenance so what we build keeps working.',
        },
      ],
      chips: ['How does your process work?', 'Book a consultation'],
    }),
  },
  {
    phrases: ['ai', 'artificial intelligence', 'chatbot', 'voice agent', 'machine learning', 'chatgpt', 'claude'],
    answer: () => ({
      replies: [
        {
          text: `AI shows up in two of our services:\n• AI Content Production: product videos, ads and visuals made with AI tools and reviewed by our team.\n• IT Consultation: practical AI adoption, such as setting up AI tools, automating repetitive work and training your team.\n\nAssistants like me can be built for your business too.`,
        },
      ],
      chips: ['AI Content Production', 'IT Consultation', 'Book a consultation'],
    }),
  },
  {
    phrases: ['pay', 'payment', 'deposit', 'mobile money', 'momo', 'invoice', 'installment', 'instalment'],
    answer: () => ({
      replies: [
        {
          text: 'Payment terms, including any deposit and milestone payments, are set out in your written proposal, so you can agree to them before any work starts.',
        },
      ],
      chips: ['How much does it cost?', 'Book a consultation'],
    }),
  },
  {
    phrases: ['thank', 'thanks', 'thank you', 'great', 'awesome', 'cool', 'perfect', 'webale'],
    answer: () => ({
      replies: [{ text: "You're welcome! Is there anything else I can help with?" }],
      chips: MAIN_CHIPS,
    }),
  },
  {
    phrases: ['bye', 'goodbye', 'see you', 'later', 'thats all', 'that is all'],
    answer: () => ({
      replies: [{ text: `Thanks for stopping by. You can reach us any time on WhatsApp at ${site.whatsapp}.` }],
      chips: ['Book a consultation'],
    }),
  },
];

const BOOKING_PHRASES = ['book', 'book a', 'appointment', 'schedule', 'consultation', 'free consultation', 'meeting', 'meet', 'visit', 'call me', 'arrange', 'reserve', 'set up a call', 'book an office visit'];

function answer(message: string): Omit<Turn, 'state'> {
  const text = normalise(message);

  let best: { score: number; result: () => Omit<Turn, 'state'> } | null = null;
  const consider = (s: number, result: () => Omit<Turn, 'state'>) => {
    if (s > 0 && (!best || s > best.score)) best = { score: s, result };
  };

  for (const s of services) {
    const exactTitle = text === normalise(s.title) ? 10 : 0;
    consider(score(text, serviceKeywords[s.id] ?? []) + exactTitle, () => ({
      replies: [serviceAnswer(s)],
      chips: ['Book a consultation', 'How much does it cost?', 'What services do you offer?'],
    }));
  }
  for (const intent of intents) consider(score(text, intent.phrases), intent.answer);

  // A question naming one of our projects gets that project's details. Names count
  // extra so "tell me about the Bampadde system" beats the general "work" answer.
  for (const p of projects) {
    consider(score(text, projectKeywords[p.client] ?? []) * 3, () => ({
      replies: [projectAnswer(p)],
      chips: ['Show me your work', 'Book a consultation'],
    }));
  }

  const found = best as { score: number; result: () => Omit<Turn, 'state'> } | null;
  if (found) return found.result();

  return {
    replies: [
      {
        text: "I'm a demo assistant and I didn't quite catch that. I can tell you about our services, pricing, process and past work, or book a consultation. For anything else, our team is on WhatsApp.",
        link: { label: 'Chat on WhatsApp', href: whatsappLink },
      },
    ],
    chips: MAIN_CHIPS,
  };
}

/* ------------------------------------------------------------------ */
/* Booking flow                                                         */
/* ------------------------------------------------------------------ */

const KINDS = ['Phone call', 'Video call', 'Office visit'];
const TIMES = ['9:00 am', '11:00 am', '2:00 pm', '4:00 pm'];

/** The next five weekdays, starting tomorrow, e.g. "Tue 4 Nov". */
export function upcomingDays(from = new Date(), count = 5) {
  const days: string[] = [];
  const d = new Date(from);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      days.push(d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
    }
  }
  return days;
}

const prompts: Record<Step, (b: Partial<Booking>) => Omit<Turn, 'state'>> = {
  kind: () => ({
    replies: [{ text: "Great, let's book your free consultation. It takes about a minute. How would you like to meet?" }],
    chips: KINDS,
  }),
  service: () => ({
    replies: [{ text: 'Which service is it about?' }],
    chips: [...services.map((s) => s.title), 'Not sure yet'],
  }),
  name: () => ({ replies: [{ text: "What's your name?" }], chips: [] }),
  phone: (b) => ({
    replies: [{ text: `Thanks, ${b.name?.split(' ')[0]}. What phone or WhatsApp number can we reach you on?` }],
    chips: [],
  }),
  email: () => ({ replies: [{ text: "And your email address? (Optional, so type 'skip' if you'd rather not.)" }], chips: ['Skip'] }),
  date: () => ({ replies: [{ text: 'Which day suits you? Pick one below or type another date.' }], chips: upcomingDays() }),
  time: () => ({ replies: [{ text: 'What time works best? (Kampala time)' }], chips: TIMES }),
  notes: () => ({
    replies: [{ text: 'Anything we should know beforehand, such as your goals, a deadline or a budget? (Optional.)' }],
    chips: ['Skip'],
  }),
  confirm: (b) => ({
    replies: [
      {
        text: `Here's your booking request:\n• ${b.kind} about ${b.service}\n• ${b.date} at ${b.time}\n• ${b.name}, ${b.phone}${b.email ? `, ${b.email}` : ''}${
          b.notes ? `\n• Notes: ${b.notes}` : ''
        }\n\nShall I send it?`,
      },
    ],
    chips: ['Confirm booking', 'Start again', 'Cancel'],
  }),
};

const order: Step[] = ['kind', 'service', 'name', 'phone', 'email', 'date', 'time', 'notes', 'confirm'];

function ask(step: Step, booking: Partial<Booking>, before: Reply[] = []): Turn {
  const prompt = prompts[step](booking);
  return { state: { mode: 'booking', step, booking }, replies: [...before, ...prompt.replies], chips: prompt.chips };
}

function startBooking(message = ''): Turn {
  // "Book an office visit" skips straight past the meeting-type question.
  const booking: Partial<Booking> = {};
  if (matches(message, ['visit', 'office visit', 'come to your office'])) booking.kind = 'Office visit';
  if (matches(message, ['video', 'zoom', 'google meet'])) booking.kind = 'Video call';
  return ask(booking.kind ? 'service' : 'kind', booking);
}

/** The option the message names: an exact match, or the option appearing as whole words. */
const pick = (message: string, options: string[]) => {
  const text = normalise(message);
  return options.find((o) => normalise(o) === text) ?? options.find((o) => ` ${text} `.includes(` ${normalise(o)} `));
};

/** True only when the whole message is one of the options, so "no deadline yet" isn't read as "no". */
const isOneOf = (message: string, options: string[]) => options.some((o) => normalise(o) === normalise(message));

function continueBooking(step: Step, booking: Partial<Booking>, message: string): Turn {
  const text = message.trim();
  const next = (b: Partial<Booking>) => ask(order[order.indexOf(step) + 1], b);
  const retry = (hint: string) => ask(step, booking, [{ text: hint }]);

  switch (step) {
    case 'kind': {
      const kind =
        pick(text, KINDS) ??
        (matches(text, ['phone', 'call']) ? 'Phone call' : matches(text, ['video', 'zoom', 'meet', 'online']) ? 'Video call' : matches(text, ['visit', 'office', 'in person']) ? 'Office visit' : undefined);
      return kind ? next({ ...booking, kind }) : retry('Please choose a phone call, video call or office visit.');
    }
    case 'service': {
      const titles = services.map((s) => s.title);
      let service = pick(text, [...titles, 'Not sure yet']);
      if (!service) {
        const byKeyword = services
          .map((s) => ({ s, n: score(normalise(text), serviceKeywords[s.id] ?? []) }))
          .sort((a, b) => b.n - a.n)[0];
        service = byKeyword && byKeyword.n > 0 ? byKeyword.s.title : text.slice(0, 80) || 'Not sure yet';
      }
      return next({ ...booking, service });
    }
    case 'name':
      return /[a-z]{2,}/i.test(text) ? next({ ...booking, name: text.slice(0, 80) }) : retry('Could you tell me your name?');
    case 'phone': {
      const digits = text.replace(/\D/g, '');
      return digits.length >= 9 && digits.length <= 15
        ? next({ ...booking, phone: text.slice(0, 30) })
        : retry("That doesn't look like a phone number. Please include the full number, e.g. +256 7XX XXX XXX.");
    }
    case 'email':
      if (isOneOf(text, SKIP)) return next({ ...booking, email: '' });
      return /^\S+@\S+\.\S+$/.test(text)
        ? next({ ...booking, email: text.slice(0, 120) })
        : retry("That email address doesn't look right. Try again, or type 'skip'.");
    case 'date':
      return text.length >= 2 ? next({ ...booking, date: text.slice(0, 40) }) : retry('Which day suits you?');
    case 'time':
      return text.length >= 1 ? next({ ...booking, time: text.slice(0, 40) }) : retry('What time works best?');
    case 'notes':
      return next({ ...booking, notes: isOneOf(text, SKIP) ? '' : text.slice(0, 500) });
    case 'confirm':
      if (matches(text, ['start again', 'restart', 'change', 'edit', 'redo'])) return startBooking();
      if (isOneOf(text, YES) || matches(text, ['confirm'])) {
        return { state: initialState, replies: [], chips: [], submit: booking as Booking };
      }
      return retry("Tap 'Confirm booking' to send it, 'Start again' to change something, or 'Cancel'.");
  }
}

/* ------------------------------------------------------------------ */

/** Works out the assistant's reply to one message. */
export function respond(state: AssistantState, message: string): Turn {
  if (state.mode === 'booking') {
    if (isOneOf(message, CANCEL) || (state.step === 'confirm' && matches(message, ['cancel']))) {
      return { state: initialState, replies: [{ text: 'No problem, I\'ve cancelled that booking. Anything else I can help with?' }], chips: MAIN_CHIPS };
    }
    return continueBooking(state.step, state.booking, message);
  }

  const text = normalise(message);
  const bookingScore = score(text, BOOKING_PHRASES);
  // "booking system" and "IT consultation" are service questions, not requests to book.
  const aboutService = text.includes('booking system') || text.includes('it consultation') || text.includes('it consulting');
  if (bookingScore > 0 && !aboutService) return startBooking(message);

  return { state, ...answer(message) };
}

/** Plain-text summary of a booking, for WhatsApp or the form endpoint. */
export function bookingSummary(b: Booking) {
  return [
    'New consultation request (via website assistant)',
    `Type: ${b.kind}`,
    `Service: ${b.service}`,
    `Preferred time: ${b.date} at ${b.time} (Kampala time)`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    b.email ? `Email: ${b.email}` : null,
    b.notes ? `Notes: ${b.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
