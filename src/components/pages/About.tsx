import { ClipboardList, MessagesSquare, ShieldCheck } from 'lucide-react';
import founderImage from '../../assets/founder.jpg';
import { motion } from 'framer-motion';
import { CtaBand, PageIntro, SectionHeading, usePageMeta } from '../kit';
import { fadeUp, onScroll, Reveal, stagger } from '../motion';
import { site, team } from '../../site';

const commitments = [
  {
    icon: ClipboardList,
    title: 'Clear proposals',
    text: 'A written scope, timeline and quote before any work starts, so you know what you are paying for.',
  },
  {
    icon: MessagesSquare,
    title: 'Regular updates',
    text: "You see progress as we go and can comment early, so you're never wondering where things stand.",
  },
  {
    icon: ShieldCheck,
    title: 'Support after launch',
    text: 'Training for your team and ongoing maintenance, so what we build keeps working.',
  },
];

export function About() {
  usePageMeta(
    'About',
    'Kemlok Technologies is a Kampala-based software and digital studio helping small and medium-sized businesses grow with technology.',
  );

  const facts = [
    { label: 'Based in', value: 'Kampala, Uganda' },
    site.registrationNumber && { label: 'Registered', value: `URSB · ${site.registrationNumber}` },
    site.foundedYear && { label: 'Founded', value: site.foundedYear },
    { label: 'Services', value: 'Web, brand, content, marketing, IT' },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <PageIntro eyebrow="About Kemlok" title="We build practical software for businesses that are ready to grow.">
        Kemlok Technologies is a Kampala-based software and digital studio. We help small and medium-sized businesses
        get the websites, systems and marketing that larger companies take for granted, at a price and pace that make
        sense for them.
      </PageIntro>

      <section className="border-y border-line">
        <div className="container-page">
        <motion.dl className="m-0 grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4" variants={stagger(0.1)} {...onScroll}>
          {facts.map((f) => (
            <motion.div key={f.label} className="flex flex-col gap-1.5" variants={fadeUp}>
              <dt className="eyebrow text-[13px] text-faint">{f.label}</dt>
              <dd className="m-0 font-display text-xl font-semibold">{f.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
        </div>
      </section>

      {/* Founder */}
      <section>
        <div className="container-page grid grid-cols-1 items-start gap-14 py-24 sm:py-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal from="left">
          <figure className="group m-0 flex flex-col gap-5">
            <div className="overflow-hidden rounded-xl border border-line-strong">
            <img
              src={founderImage}
              alt="Louis Lukoma, founder and CEO of Kemlok Technologies"
              width={531}
              height={559}
              className="block aspect-[4/5] w-full bg-panel object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            </div>
            <figcaption className="flex flex-col gap-1">
              <span className="font-display text-[22px] font-semibold">Louis Lukoma</span>
              <span className="text-[15px] text-muted">Founder &amp; CEO</span>
            </figcaption>
          </figure>
          </Reveal>
          <Reveal className="flex flex-col gap-6" from="right" delay={0.1}>
            <p className="eyebrow">A note from our founder</p>
            <p className="m-0 font-display text-[28px] leading-snug font-semibold sm:text-[34px]">
              “Small businesses aren't short of ambition. They're short of access to good technology.”
            </p>
            <p className="m-0 text-[17px] leading-[1.7] text-muted">
              I started Kemlok Technologies to close that gap. I've seen how the right digital tools can turn a
              struggling business into a thriving one, and how many businesses are held back not by talent but by
              tools that are too expensive, too complicated, or built by someone who disappears after launch.
            </p>
            <p className="m-0 text-[17px] leading-[1.7] text-muted">
              Whether you're a startup in Kampala or an established company ready to scale, we treat your project as a
              long-term partnership: clear proposals, regular updates, and support after we hand over. We want to play
              our part in Uganda's digital transformation, one business at a time.
            </p>
            <p className="m-0 font-display text-[17px] font-semibold">Louis Lukoma, Founder &amp; CEO</p>
          </Reveal>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="on-paper bg-paper text-on-paper">
        <div className="container-page grid grid-cols-1 gap-12 py-24 sm:py-28 md:grid-cols-2">
          <Reveal className="flex flex-col gap-4 border-t-2 border-on-paper pt-7">
            <p className="eyebrow">Our mission</p>
            <h2 className="m-0 text-[26px] leading-snug font-semibold sm:text-[30px]">
              To give growing businesses affordable, well-built digital tools and the support to use them well.
            </h2>
          </Reveal>
          <Reveal className="flex flex-col gap-4 border-t-2 border-on-paper pt-7" delay={0.15}>
            <p className="eyebrow">Our vision</p>
            <h2 className="m-0 text-[26px] leading-snug font-semibold sm:text-[30px]">
              To be Uganda's leading partner for digital transformation, and a recognised name across Africa.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Commitments */}
      <section>
        <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
          <SectionHeading eyebrow="How we work" title="What you can expect from us" />
          <motion.div className="grid grid-cols-1 gap-10 md:grid-cols-3" variants={stagger(0.12)} {...onScroll}>
            {commitments.map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                className="group flex flex-col gap-3.5"
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <Icon
                  size={28}
                  strokeWidth={1.6}
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                />
                <h3 className="m-0 text-[21px] font-semibold">{title}</h3>
                <p className="m-0 leading-relaxed text-muted">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team: shown once team members are added in src/site.ts */}
      {team.length > 0 && (
        <section className="border-t border-line">
          <div className="container-page flex flex-col gap-12 py-24 sm:py-28">
            <SectionHeading eyebrow="Our team" title="The people behind your project" />
            <motion.ul className="m-0 grid list-none grid-cols-2 gap-7 p-0 lg:grid-cols-4" variants={stagger(0.1)} {...onScroll}>
              {[{ name: 'Louis Lukoma', role: 'Founder & CEO', photo: founderImage }, ...team].map((m) => (
                <motion.li key={m.name} className="flex flex-col gap-3" variants={fadeUp}>
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="aspect-square w-full rounded-lg border border-line-strong object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div aria-hidden="true" className="aspect-square rounded-lg border border-line-strong bg-panel" />
                  )}
                  <span className="font-display text-lg font-semibold">{m.name}</span>
                  <span className="text-[15px] text-muted">{m.role}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      <CtaBand
        title="Let's talk about your business."
        text="A first call is free and comes with no obligation."
        cta="Get in touch"
      />
    </>
  );
}
