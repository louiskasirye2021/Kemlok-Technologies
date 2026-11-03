import { useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { site } from '../site';
import { processSteps } from '../services';
import { ease, fadeUp, onMount, onScroll, Reveal, stagger } from './motion';

/** Sets the browser tab title and description for the current page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title === site.name ? title : `${title} | ${site.name}`;
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', document.title);
    setMeta('property', 'og:description', description);
  }, [title, description]);
}

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: 'light' | 'dark' | 'outline';
  arrow?: boolean;
  className?: string;
};

const variants = {
  light: 'bg-fg text-ink hover:bg-white',
  dark: 'bg-ink text-fg hover:bg-black',
  outline: 'border border-field text-fg hover:border-fg',
};

const MotionLink = motion(Link);
const press = { whileHover: { scale: 1.04 }, whileTap: { scale: 0.96 }, transition: { type: 'spring', stiffness: 400, damping: 22 } };

export function ButtonLink({ to, children, variant = 'light', arrow, className = '' }: ButtonProps) {
  const cls = `group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-md px-7 text-base font-semibold no-underline transition-colors ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return (
      <motion.a href={to} className={cls} {...press}>
        {content}
      </motion.a>
    );
  }
  return (
    <MotionLink to={to} className={cls} {...press}>
      {content}
    </MotionLink>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  className = '',
}: {
  eyebrow: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={`flex max-w-2xl flex-col gap-3.5 ${className}`} variants={stagger(0.1)} {...onScroll}>
      <motion.p className="eyebrow" variants={fadeUp}>
        {eyebrow}
      </motion.p>
      <motion.h2
        className="m-0 text-3xl leading-tight font-semibold tracking-tight sm:text-[42px]"
        variants={fadeUp}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <Glow />
      <div className="container-page relative pt-20 pb-16 sm:pt-28 sm:pb-20">
        <motion.div className="flex max-w-4xl flex-col gap-6" variants={stagger(0.12, 0.1)} {...onMount}>
          <motion.p className="eyebrow" variants={fadeUp}>
            {eyebrow}
          </motion.p>
          <motion.h1
            className="m-0 text-4xl leading-[1.08] font-semibold tracking-tight sm:text-[56px]"
            variants={fadeUp}
          >
            {title}
          </motion.h1>
          <motion.p className="m-0 max-w-3xl text-lg leading-relaxed text-muted sm:text-[19px]" variants={fadeUp}>
            {children}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/** Soft, slowly drifting light behind the top of a page. Purely decorative. */
export function Glow() {
  return (
    // The mask fades the glow out towards the bottom so the section edge doesn't cut it off sharply.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    >
      <motion.div
        className="absolute -top-40 -right-32 size-[34rem] rounded-full bg-white/[0.06] blur-3xl"
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-48 -left-40 size-[28rem] rounded-full bg-white/[0.04] blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/** Light closing band with a single call to action. */
export function CtaBand({ title, text, cta, to = '/contact' }: { title: string; text: string; cta: string; to?: string }) {
  return (
    <section className="on-paper overflow-hidden bg-paper text-on-paper">
      <div className="container-page flex flex-wrap items-center justify-between gap-8 py-20 sm:py-24">
        <Reveal className="flex max-w-xl flex-col gap-3" from="left">
          <h2 className="m-0 text-3xl leading-tight font-semibold sm:text-[40px]">{title}</h2>
          <p className="m-0 text-lg leading-relaxed text-on-paper-muted">{text}</p>
        </Reveal>
        <Reveal from="right" delay={0.15}>
          <ButtonLink to={to} variant="dark" arrow>
            {cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** The four-step engagement process, on a dark or light background. */
export function ProcessSteps({ onPaper = false, showStep = false }: { onPaper?: boolean; showStep?: boolean }) {
  return (
    <motion.ol
      className="m-0 grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4"
      variants={stagger(0.15)}
      {...onScroll}
    >
      {processSteps.map((p, i) => (
        <motion.li key={p.title} className="relative flex flex-col gap-2.5 pt-6" variants={fadeUp}>
          {/* Top rule that draws itself in from the left */}
          <motion.span
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 origin-left ${onPaper ? 'h-0.5 bg-on-paper' : 'h-px bg-field'}`}
            variants={{
              hidden: { scaleX: 0 },
              visible: { scaleX: 1, transition: { duration: 0.9, ease } },
            }}
          />
          <span className={`font-display text-sm ${onPaper ? 'text-on-paper-subtle' : 'text-subtle'}`}>
            {String(i + 1).padStart(2, '0')}
            {showStep && ` · ${p.step}`}
          </span>
          <h3 className="m-0 text-xl font-semibold">{p.title}</h3>
          <p className={`m-0 text-[15px] leading-relaxed ${onPaper ? 'text-on-paper-muted' : 'text-muted'}`}>{p.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
