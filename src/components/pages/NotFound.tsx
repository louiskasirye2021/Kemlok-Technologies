import { motion } from 'framer-motion';
import { ButtonLink, Glow, usePageMeta } from '../kit';
import { fadeUp, onMount, stagger } from '../motion';

export function NotFound() {
  usePageMeta('Page not found', 'The page you were looking for does not exist.');

  return (
    <section className="relative overflow-hidden">
      <Glow />
      <div className="container-page relative py-28 sm:py-36">
        <motion.div className="flex max-w-3xl flex-col gap-6" variants={stagger(0.12)} {...onMount}>
          <motion.p
            className="eyebrow"
            variants={{ hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 12 } } }}
          >
            404
          </motion.p>
          <motion.h1 className="m-0 text-4xl leading-tight font-semibold tracking-tight sm:text-[56px]" variants={fadeUp}>
            We couldn't find that page.
          </motion.h1>
          <motion.p className="m-0 text-lg leading-relaxed text-muted" variants={fadeUp}>
            It may have moved. Try the home page or get in touch.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" variants={fadeUp}>
            <ButtonLink to="/">Go to home page</ButtonLink>
            <ButtonLink to="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
