import { motion } from 'framer-motion';
import { ButtonLink, PageIntro, ProcessSteps, SectionHeading, usePageMeta } from '../kit';
import { ease, fadeUp, onScroll, Reveal, stagger } from '../motion';
import { services } from '../../services';

export function Services() {
  usePageMeta(
    'Services',
    'Web & systems, branding, AI content production, digital marketing and IT consultation for businesses in Uganda.',
  );

  return (
    <>
      <PageIntro eyebrow="Services" title="Everything you need to run and grow your business online.">
        Hire us for a single project or a combination. Every engagement starts with a free consultation and a written
        proposal.
      </PageIntro>

      <section>
        <div className="container-page pb-24">
          {services.map((s, i) => (
            <motion.article
              key={s.id}
              id={s.id}
              variants={stagger(0.15)}
              {...onScroll}
              className={`grid scroll-mt-24 grid-cols-1 gap-10 border-t border-line-strong py-14 lg:grid-cols-2 lg:gap-12 ${
                i === services.length - 1 ? 'border-b' : ''
              }`}
            >
              <motion.div
                className="flex flex-col gap-4"
                variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } }}
              >
                <span className="flex items-center gap-3 font-display text-sm text-subtle">
                  <motion.span
                    className="inline-flex"
                    variants={{ hidden: { rotate: -90, scale: 0.4 }, visible: { rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 220, damping: 14 } } }}
                  >
                    <s.icon size={20} strokeWidth={1.6} aria-hidden="true" className="text-fg" />
                  </motion.span>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="m-0 text-3xl font-semibold sm:text-[34px]">{s.title}</h2>
                <p className="m-0 text-[17px] leading-relaxed text-muted">{s.description}</p>
                <p className="m-0 text-[15px] text-faint">Best for: {s.bestFor}</p>
              </motion.div>
              <motion.ul className="m-0 flex list-none flex-col p-0" variants={stagger(0.08, 0.15)}>
                {s.offerings.map((o) => (
                  <motion.li
                    key={o.name}
                    variants={fadeUp}
                    whileHover={{ x: 6 }}
                    className="flex flex-col gap-1 border-b border-line py-4.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-[17px] font-semibold">{o.name}</span>
                    <span className="text-[15px] text-muted sm:text-right">{o.detail}</span>
                  </motion.li>
                ))}
                {s.pricing && (
                  <li className="flex justify-between gap-6 py-4.5 text-[15px]">
                    <span className="text-faint">Typical engagement</span>
                    <span className="text-right">{s.pricing}</span>
                  </li>
                )}
              </motion.ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="on-paper bg-paper text-on-paper">
        <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
          <SectionHeading eyebrow="How an engagement works" title="From first call to launch" />
          <ProcessSteps onPaper showStep />
        </div>
      </section>

      <section>
        <div className="container-page flex flex-wrap items-center justify-between gap-8 py-20 sm:py-24">
          <Reveal className="flex max-w-xl flex-col gap-3" from="left">
            <h2 className="m-0 text-3xl leading-tight font-semibold sm:text-[40px]">Not sure which service fits?</h2>
            <p className="m-0 text-lg leading-relaxed text-muted">
              Describe your situation and we'll recommend the simplest option.
            </p>
          </Reveal>
          <Reveal from="right" delay={0.15}>
            <ButtonLink to="/contact" arrow>
              Book a free consultation
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
