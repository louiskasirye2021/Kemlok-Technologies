import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ExternalLink } from 'lucide-react';
import { ButtonLink, CtaBand, Glow, ProcessSteps, SectionHeading, usePageMeta } from '../kit';
import { ease, fadeUp, onMount, onScroll, Reveal, stagger, WordReveal } from '../motion';
import { services } from '../../services';
import { clients, projects, site, testimonials, type Client } from '../../site';

export function Home() {
  usePageMeta(
    site.name,
    'Kampala software and digital studio: websites, booking systems, dashboards, branding and digital marketing for Ugandan businesses.',
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Glow />
        <div className="container-page relative grid grid-cols-1 items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <motion.div className="flex flex-col gap-7" variants={stagger(0.12)} {...onMount}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Software &amp; digital studio · Kampala, Uganda
            </motion.p>
            <h1 className="m-0 text-[40px] leading-[1.05] font-semibold tracking-tight sm:text-6xl">
              <WordReveal text="Websites, systems and digital marketing for Ugandan businesses." delay={0.15} />
            </h1>
            <motion.p
              className="m-0 max-w-xl text-lg leading-relaxed text-muted sm:text-[19px]"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.7 } } }}
            >
              We design and build the tools that run your business online, such as booking systems, dashboards,
              websites and brand identity, and we support them after launch.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.85 } } }}
            >
              <ButtonLink to="/contact" arrow>
                Book a free consultation
              </ButtonLink>
              <ButtonLink to="/#work" variant="outline">
                See our work
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* At-a-glance panel listing the services */}
          <motion.div
            className="rounded-xl border border-line-strong bg-ink-raised p-2 shadow-[0_30px_80px_-40px_rgba(255,255,255,0.15)]"
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <p className="eyebrow px-5 pt-4 pb-3 text-xs">What we build</p>
            <motion.ul className="m-0 list-none p-0" variants={stagger(0.08, 0.7)} {...onMount}>
              {services.map(({ id, title, icon: Icon, offerings }) => (
                <motion.li key={id} variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } } }}>
                  <Link
                    to={`/services#${id}`}
                    className="group flex items-center gap-4 rounded-lg px-5 py-4 no-underline transition-colors hover:bg-panel"
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                    />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-display font-semibold">{title}</span>
                      <span className="truncate text-sm text-subtle">{offerings.map((o) => o.name).join(' · ')}</span>
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg"
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* Client logos: shown once there are enough to look credible */}
      {clients.length >= 3 && (
        <section className="border-y border-line">
          <div className="flex flex-col gap-6 py-10">
            <Reveal className="container-page">
              <p className="eyebrow text-[13px] text-faint">Clients we've worked with</p>
            </Reveal>
            <Reveal className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
                <LogoList />
                <LogoList hidden />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Services */}
      <section className={clients.length >= 3 ? '' : 'border-t border-line'}>
        <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="What we do" title="Five services, one team accountable for the result." />
            <Reveal from="right">
              <Link to="/services" className="group inline-flex min-h-11 items-center gap-2 font-medium">
                All services{' '}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
            variants={stagger(0.08)}
            {...onScroll}
          >
            {services.map(({ id, title, icon: Icon, short }) => (
              <motion.div key={id} variants={fadeUp}>
                <Link
                  to={`/services#${id}`}
                  className="group relative flex h-full flex-col gap-3.5 overflow-hidden bg-ink p-8 no-underline transition-colors duration-300 hover:bg-ink-raised sm:p-9"
                >
                  <Icon
                    size={28}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  />
                  <h3 className="m-0 text-[22px] font-semibold">{title}</h3>
                  <p className="m-0 leading-relaxed text-muted">{short}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-faint transition-colors group-hover:text-fg">
                    Learn more
                    <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="flex flex-col justify-center gap-3.5 bg-panel p-8 sm:p-9">
              <h3 className="m-0 text-[22px] font-semibold">Not sure where to start?</h3>
              <p className="m-0 leading-relaxed text-muted">
                A first call is free. We'll tell you honestly what you need and what you don't.
              </p>
              <Link to="/contact" className="group inline-flex min-h-11 items-center gap-2 font-semibold">
                Book a call{' '}
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="on-paper scroll-mt-20 overflow-hidden bg-paper text-on-paper">
        <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
          <SectionHeading eyebrow="Selected work" title="Recent projects" />
          <div className={`grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 ${projects.length % 3 === 0 ? 'lg:grid-cols-3' : ''}`}>
            {projects.map((p, i) => (
              <motion.article
                key={p.client}
                className="group flex flex-col gap-4"
                variants={{
                  hidden: { opacity: 0, y: 48 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: (i % 2) * 0.12 } },
                }}
                {...onScroll}
              >
                <motion.div
                  className="overflow-hidden rounded-lg border border-on-paper/10 shadow-sm transition-shadow duration-500 group-hover:shadow-xl"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.client} project`}
                      className="block aspect-[2/1] w-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : p.logo ? (
                    <div className="aspect-[2/1] min-h-0 px-10 py-8" style={{ backgroundColor: p.logo.background }}>
                      <img
                        src={p.logo.logo}
                        alt={`${p.client} logo`}
                        loading="lazy"
                        className="block h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex aspect-[16/10] items-end bg-paper-deep p-6 font-display text-2xl leading-tight font-semibold text-on-paper-subtle"
                    >
                      {p.client}
                    </div>
                  )}
                </motion.div>
                <p className="eyebrow text-[13px]">{p.type}</p>
                <h3 className="m-0 text-[22px] font-semibold">{p.client}</h3>
                <p className="m-0 leading-relaxed text-on-paper-muted">{p.summary}</p>
                <div className="flex flex-col gap-2.5">
                  <p className="m-0 text-sm font-semibold">What we built</p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-[15px] leading-relaxed text-on-paper-muted">
                        <Check size={16} strokeWidth={2.4} aria-hidden="true" className="mt-1 shrink-0 text-on-paper" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul aria-label="Technologies used" className="m-0 flex list-none flex-wrap gap-2 p-0">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-full border border-on-paper/15 px-3 py-1 text-[13px] text-on-paper-subtle">
                      {t}
                    </li>
                  ))}
                </ul>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex min-h-11 items-center gap-2 self-start font-semibold text-on-paper"
                  >
                    Visit site{' '}
                    <ExternalLink
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                )}
              </motion.article>
            ))}
            {projects.length < 3 && (
              <Reveal className="flex flex-col justify-center gap-4 rounded-lg border border-on-paper/15 p-8">
                <h3 className="m-0 text-[22px] font-semibold">Your project could be next.</h3>
                <p className="m-0 leading-relaxed text-on-paper-muted">
                  Tell us what you're working on and we'll show you how we'd approach it.
                </p>
                <Link to="/contact" className="inline-flex min-h-11 items-center gap-2 font-semibold text-on-paper">
                  Start a conversation <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section>
        <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
          <SectionHeading eyebrow="How we work" title="A clear process from first call to launch." />
          <ProcessSteps />
        </div>
      </section>

      {/* Testimonials: hidden until real quotes are added in src/site.ts */}
      {testimonials.length > 0 && (
        <section className="border-t border-line">
          <motion.div className="container-page grid grid-cols-1 gap-8 py-24 md:grid-cols-2" variants={stagger(0.12)} {...onScroll}>
            {testimonials.map((t) => (
              <motion.figure
                key={t.name}
                variants={fadeUp}
                className="m-0 flex flex-col gap-6 rounded-xl border border-line-strong p-9"
              >
                <blockquote className="m-0 font-display text-[22px] leading-normal">“{t.quote}”</blockquote>
                <figcaption className="text-[15px] text-muted">
                  {t.name}, {t.role} at {t.organisation}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </section>
      )}

      <CtaBand
        title="Have a project in mind?"
        text="Tell us what you need. We reply to every enquiry within 24 hours."
        cta="Start a conversation"
      />
    </>
  );
}

/** One copy of the client logos. The marquee shows two copies back to back so it loops seamlessly. */
function LogoList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`m-0 flex list-none gap-3 p-0 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center ${hidden ? 'motion-reduce:hidden' : ''}`}
    >
      {clients.map((c: Client) => (
        <li
          key={c.name}
          className="flex h-28 w-44 shrink-0 items-center justify-center rounded-lg px-5 py-2.5 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 sm:w-52"
          style={{ backgroundColor: c.background }}
        >
          <img
            src={c.logo}
            alt={hidden ? '' : c.name}
            title={c.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
