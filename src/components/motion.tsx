import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

/**
 * Shared animation building blocks. Everything here respects the visitor's
 * "reduce motion" setting through the <MotionConfig reducedMotion="user"> in Layout.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

/** A single element fading and rising into place. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/** A parent that reveals its children one after another. */
export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/**
 * Props that play a variant animation as an element scrolls into view, and
 * reverse it as the element leaves, so sections animate both in and out.
 */
export const onScroll = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: false, amount: 0.15 },
} as const;

/** Plays on mount instead of on scroll, for content at the top of a page. */
export const onMount = { initial: 'hidden', animate: 'visible' } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the content slides in from */
  from?: 'below' | 'left' | 'right';
};

const offsets = { below: { y: 36 }, left: { x: -48 }, right: { x: 48 } };

/** Fades and slides its content in on scroll, and back out when scrolled away. */
export function Reveal({ children, className, delay = 0, from = 'below' }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offsets[from] },
        visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease, delay } },
      }}
      {...onScroll}
    >
      {children}
    </motion.div>
  );
}

/** Animates a heading word by word, each word rising out of a clipped line. */
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span className={className} variants={stagger(0.06, delay)} {...onMount} aria-label={text}>
      {text.split(' ').map((word, i, words) => (
        <span key={i} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: '110%' },
                visible: { y: 0, transition: { duration: 0.8, ease } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.span>
  );
}
