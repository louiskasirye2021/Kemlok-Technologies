import { motion } from 'framer-motion';
import { PageIntro, usePageMeta } from '../kit';
import { fadeUp, onScroll, Reveal, stagger } from '../motion';
import { site } from '../../site';

const LAST_UPDATED = 'November 20, 2025';

type Clause = { heading: string; text: string };

const groups: { id: string; title: string; clauses: Clause[] }[] = [
  {
    id: 'terms-of-service',
    title: 'Terms of Service',
    clauses: [
      {
        heading: '1. Acceptance of Terms',
        text: `By accessing and using ${site.name} services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.`,
      },
      {
        heading: '2. Use of Services',
        text: "You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from using our services in any way that could damage, disable, or impair our systems or interfere with any other party's use of our services.",
      },
      {
        heading: '3. Intellectual Property',
        text: `All content, features, and functionality of our services are owned by ${site.name} and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
      },
      {
        heading: '4. User Responsibilities',
        text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to your account.',
      },
    ],
  },
  {
    id: 'privacy-data',
    title: 'Privacy & Data Protection',
    clauses: [
      {
        heading: '5. Data Collection',
        text: 'We collect information that you provide directly to us, including name, email address, phone number, and any other information you choose to provide. We use this information to provide, maintain, and improve our services.',
      },
      {
        heading: '6. Data Security',
        text: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.',
      },
      {
        heading: '7. Third-Party Services',
        text: 'Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services.',
      },
    ],
  },
  {
    id: 'service-terms',
    title: 'Service Terms',
    clauses: [
      {
        heading: '8. Service Modifications',
        text: 'We reserve the right to modify or discontinue our services at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of our services.',
      },
      {
        heading: '9. Payment Terms',
        text: 'All fees are quoted in the currency stated in your proposal and are non-refundable unless otherwise stated. Payment is due according to the terms specified in your service agreement. Late payments may result in service suspension.',
      },
      {
        heading: '10. Project Deliverables',
        text: 'We will make reasonable efforts to meet agreed-upon deadlines. However, timelines are estimates and may be subject to change based on project complexity and client responsiveness.',
      },
    ],
  },
  {
    id: 'liability',
    title: 'Limitations & Liability',
    clauses: [
      {
        heading: '11. Disclaimer of Warranties',
        text: 'Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.',
      },
      {
        heading: '12. Limitation of Liability',
        text: `To the maximum extent permitted by law, ${site.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.`,
      },
      {
        heading: '13. Indemnification',
        text: `You agree to indemnify and hold harmless ${site.name} from any claims, damages, or expenses arising from your use of our services or violation of these terms.`,
      },
      {
        heading: '14. Governing Law',
        text: 'These terms shall be governed by and construed in accordance with the laws of the Republic of Uganda, without regard to its conflict of law provisions.',
      },
    ],
  },
  {
    id: 'general',
    title: 'General',
    clauses: [
      {
        heading: '15. Changes to Terms',
        text: 'We reserve the right to update or modify these terms at any time without prior notice. Your continued use of our services after any changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.',
      },
      {
        heading: '16. Contact Information',
        text: `If you have any questions about these Terms and Conditions, please contact us by email at ${site.email}, by phone on ${site.phone}, or at our office at ${site.address}, Uganda.`,
      },
      {
        heading: '17. Severability',
        text: 'If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these terms will otherwise remain in full force and effect.',
      },
      {
        heading: '18. Entire Agreement',
        text: `These terms constitute the entire agreement between you and ${site.name} regarding the use of our services, superseding any prior agreements between you and ${site.name} relating to your use of the services.`,
      },
    ],
  },
];

export function Terms() {
  usePageMeta('Terms of Service', 'The terms that apply to services provided by Kemlok Technologies.');

  return (
    <>
      <PageIntro eyebrow={`Legal · Last updated ${LAST_UPDATED}`} title="Terms & Conditions">
        These terms govern your use of our website and services. By accessing or using our services, you agree to them.
        Questions? Email us at {site.email}.
      </PageIntro>

      <section>
        <div className="container-page grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          {/* Contents: a sticky sidebar on large screens */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Sections" className="flex flex-col gap-1 border-l border-line-strong">
              <p className="eyebrow mb-2 pl-4 text-xs">On this page</p>
              {groups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(g.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="-ml-px border-l border-transparent py-1.5 pl-4 text-[15px] text-muted no-underline transition-colors hover:border-fg hover:text-fg"
                >
                  {g.title}
                </a>
              ))}
            </nav>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-16">
            {groups.map((g) => (
              <motion.section key={g.id} id={g.id} className="scroll-mt-28" variants={stagger(0.06)} {...onScroll}>
                <motion.h2 className="m-0 mb-6 text-2xl font-semibold sm:text-3xl" variants={fadeUp}>
                  {g.title}
                </motion.h2>
                <div className="flex flex-col">
                  {g.clauses.map((c) => (
                    <motion.div key={c.heading} className="border-t border-line py-6" variants={fadeUp}>
                      <h3 className="m-0 mb-2 text-lg font-semibold">{c.heading}</h3>
                      <p className="m-0 leading-relaxed text-muted">{c.text}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}

            <Reveal className="rounded-xl border border-line-strong bg-ink-raised p-8">
              <h2 className="m-0 mb-3 text-xl font-semibold">Acknowledgement</h2>
              <p className="m-0 leading-relaxed text-muted">
                By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms
                and Conditions. Thank you for choosing {site.name}.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
