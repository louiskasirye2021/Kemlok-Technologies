import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Mail, MapPin, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { openAssistant } from '../assistant/ChatWidget';
import { PageIntro, usePageMeta } from '../kit';
import { ease, fadeUp, onScroll, Reveal, stagger } from '../motion';
import { services } from '../../services';
import { mapEmbed, mapLink, site, whatsappLink } from '../../site';

const budgets = ['Under UGX 2M', 'UGX 2M – 5M', 'UGX 5M – 15M', 'Over UGX 15M', 'Not sure yet'];

const emptyForm = { name: '', company: '', email: '', phone: '', service: '', budget: '', message: '' };

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  usePageMeta(
    'Contact',
    'Contact Kemlok Technologies in Kampala by WhatsApp, phone or email. We reply to every enquiry within 24 hours.',
  );

  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>('idle');
  const [sentBy, setSentBy] = useState<'server' | 'whatsapp' | null>(null);
  const [missing, setMissing] = useState(false);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email.trim()) || !form.message.trim()) {
      setMissing(true);
      return;
    }
    setMissing(false);

    const body = [
      `Name: ${form.name}`,
      form.company ? `Business: ${form.company}` : null,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      `Service: ${form.service || 'Not specified'}`,
      form.budget ? `Budget: ${form.budget}` : null,
      '',
      `Message:\n${form.message}`,
    ]
      .filter((l) => l !== null)
      .join('\n');

    // Set VITE_FORM_ENDPOINT (e.g. a Formspree URL) to receive messages by email.
    // Without it, the form opens WhatsApp with the message filled in.
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;

    if (endpoint) {
      setSentBy('server');
      setStatus('sending');
      try {
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        setStatus('sent');
        setForm(emptyForm);
      } catch {
        setStatus('error');
      }
      return;
    }

    setSentBy('whatsapp');
    setStatus('sent');
    window.location.href = `${whatsappLink}?text=${encodeURIComponent(body)}`;
  };

  const channels = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      detail: `${site.whatsapp} · Chat now`,
      href: whatsappLink,
      external: true,
    },
    { icon: Phone, title: 'Phone', detail: site.phone, href: site.phoneHref },
    { icon: Mail, title: 'Email', detail: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, title: 'Office', detail: site.address, href: mapLink, external: true },
  ];

  return (
    <>
      <PageIntro eyebrow="Contact" title="Tell us about your project.">
        Send a message or reach us directly. We reply to every enquiry within 24 hours.
      </PageIntro>

      <section>
        <div className="container-page flex flex-wrap items-start gap-12 pb-24 sm:pb-28">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, ease }}
            className="flex min-w-0 flex-[999_1_560px] flex-col gap-5.5 rounded-xl border border-line-strong bg-ink-raised p-6 sm:p-10"
          >
            <h2 className="m-0 mb-1 text-[26px] font-semibold">Send a message</h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full name" htmlFor="name" required>
                <input id="name" name="name" type="text" autoComplete="name" required value={form.name} onChange={update} className="field" />
              </Field>
              <Field label="Business name" htmlFor="company" optional>
                <input id="company" name="company" type="text" autoComplete="organization" value={form.company} onChange={update} className="field" />
              </Field>
              <Field label="Email" htmlFor="email" required>
                <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={update} className="field" />
              </Field>
              <Field label="Phone / WhatsApp" htmlFor="phone" optional>
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+256" value={form.phone} onChange={update} className="field" />
              </Field>
              <Field label="Service" htmlFor="service" optional>
                <select id="service" name="service" value={form.service} onChange={update} className="field">
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </Field>
              <Field label="Budget range" htmlFor="budget" optional>
                <select id="budget" name="budget" value={form.budget} onChange={update} className="field">
                  <option value="">Select a range</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="What do you need?" htmlFor="message" required>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="A few sentences about your business and what you'd like to achieve."
                value={form.message}
                onChange={update}
                className="field resize-y"
              />
            </Field>

            <div aria-live="polite" className="empty:hidden">
              <AnimatePresence mode="wait">
              {missing && (
                <Notice key="missing" className="m-0 rounded-md border border-[#c4554d] bg-[#2a1312] px-4 py-3 text-[15px] text-[#f2c4c0]">
                  Please add your name, a valid email address and a short message before sending.
                </Notice>
              )}
              {status === 'sent' && sentBy === 'server' && (
                <Notice key="sent-server" className="m-0 rounded-md border border-[#4f8a5b] bg-[#122416] px-4 py-3 text-[15px] text-[#c4e8cb]">
                  Thank you — your message has been sent. We'll reply within 24 hours.
                </Notice>
              )}
              {status === 'sent' && sentBy === 'whatsapp' && (
                <Notice key="sent-whatsapp" className="m-0 rounded-md border border-line-strong bg-panel px-4 py-3 text-[15px] text-muted">
                  Opening WhatsApp with your message filled in. If it didn't open, message us on {site.whatsapp}.
                </Notice>
              )}
              {status === 'error' && (
                <Notice key="error" className="m-0 rounded-md border border-[#c4554d] bg-[#2a1312] px-4 py-3 text-[15px] text-[#f2c4c0]">
                  Your message couldn't be sent. Please try again, or reach us on WhatsApp at {site.whatsapp}.
                </Notice>
              )}
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="m-0 text-sm text-subtle">
                We only use your details to reply.{' '}
                <Link to="/privacy" className="text-muted">
                  Privacy policy
                </Link>
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-13 cursor-pointer items-center rounded-md border-0 bg-fg px-7 font-sans text-base font-semibold text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </motion.button>
            </div>
          </motion.form>

          <motion.aside className="flex flex-[1_1_320px] flex-col" variants={stagger(0.1, 0.2)} {...onScroll}>
            {channels.map(({ icon: Icon, title, detail, href, external }) => (
              <motion.a
                key={title}
                variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-start gap-4 border-b border-line py-6 no-underline"
              >
                <Icon
                  size={24}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                />
                <span className="flex min-w-0 flex-col gap-1 transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-[17px] font-semibold">{title}</span>
                  <span className="text-[15px] break-words text-muted group-hover:text-fg">{detail}</span>
                </span>
              </motion.a>
            ))}
            <motion.button
              type="button"
              onClick={() => openAssistant('Book a consultation')}
              variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
              className="group flex cursor-pointer items-start gap-4 border-0 border-b border-solid border-line bg-transparent py-6 text-left font-sans text-fg"
            >
              <Sparkles
                size={24}
                strokeWidth={1.6}
                aria-hidden="true"
                className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
              />
              <span className="flex min-w-0 flex-col gap-1 transition-transform duration-300 group-hover:translate-x-1">
                <span className="text-[17px] font-semibold">Booking assistant</span>
                <span className="text-[15px] text-muted group-hover:text-fg">Book a free consultation in about a minute</span>
              </span>
            </motion.button>
            {site.officeHours && (
              <motion.div className="flex items-start gap-4 border-b border-line py-6" variants={fadeUp}>
                <Clock size={24} strokeWidth={1.6} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-semibold">Office hours</span>
                  <span className="text-[15px] text-muted">{site.officeHours}</span>
                </span>
              </motion.div>
            )}
            <motion.iframe
              variants={fadeUp}
              title="Map showing the Kemlok Technologies office in Komamboga, Kampala"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 aspect-[4/3] w-full rounded-xl border border-line-strong bg-panel grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </motion.aside>
        </div>
      </section>

      <section className="on-paper bg-paper text-on-paper">
        <div className="container-page flex flex-col gap-10 py-24">
          <Reveal>
            <h2 className="m-0 text-3xl leading-tight font-semibold sm:text-4xl">What happens after you get in touch</h2>
          </Reveal>
          <motion.ol className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-3" variants={stagger(0.15)} {...onScroll}>
            {[
              ['Within 24 hours', 'We reply', 'A real person reads your message and suggests a time to talk.'],
              ['Free, no obligation', 'Consultation call', 'We discuss your goals, timeline and budget.'],
              ['After the call', 'Written proposal', 'Scope, milestones and a quote you can decide on.'],
            ].map(([when, title, text]) => (
              <motion.li key={title} className="flex flex-col gap-2.5 border-t-2 border-on-paper pt-6" variants={fadeUp}>
                <span className="font-display text-sm text-on-paper-subtle">{when}</span>
                <h3 className="m-0 text-xl font-semibold">{title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-on-paper-muted">{text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-subtle"> *</span>}
        {optional && <span className="font-normal text-faint"> (optional)</span>}
      </label>
      {children}
    </div>
  );
}

/** A form status message that slides in and out. */
function Notice({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease }}
    >
      {children}
    </motion.p>
  );
}
