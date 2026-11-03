import { Download, ExternalLink } from 'lucide-react';
import { PageIntro, usePageMeta } from '../kit';
import { Reveal } from '../motion';
import { site } from '../../site';

const LAST_UPDATED = 'November 21, 2025';
const PDF = '/Privacy%20Policy.pdf';

export function Privacy() {
  usePageMeta('Privacy Policy', 'How Kemlok Technologies collects, uses and protects your personal information.');

  return (
    <>
      <PageIntro eyebrow={`Legal · Last updated ${LAST_UPDATED}`} title="Privacy Policy">
        How we collect, use and protect your personal information. The full policy is below as a PDF.
      </PageIntro>

      <section>
        <div className="container-page flex flex-col gap-10 pb-24">
          <Reveal className="flex flex-wrap gap-3">
            <a
              href={PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md bg-fg px-6 font-semibold text-ink no-underline transition-colors hover:bg-white"
            >
              Read the full policy <ExternalLink size={17} aria-hidden="true" />
            </a>
            <a
              href={PDF}
              download="Kemlok Technologies Privacy Policy.pdf"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-field px-6 font-semibold text-fg no-underline transition-colors hover:border-fg"
            >
              Download PDF <Download size={17} aria-hidden="true" />
            </a>
          </Reveal>

          {/* Phone browsers often can't show a PDF inside a page, so the viewer is for larger screens only. */}
          <Reveal className="hidden overflow-hidden rounded-xl border border-line-strong bg-panel md:block">
            <iframe src={PDF} title="Privacy Policy" className="block h-[80vh] w-full border-0" />
          </Reveal>

          <Reveal className="rounded-xl border border-line-strong bg-ink-raised p-8">
            <h2 className="m-0 mb-3 text-xl font-semibold">Questions about your data?</h2>
            <p className="m-0 leading-relaxed text-muted">
              By using our services, you acknowledge that you have read and understood our Privacy Policy. To ask about,
              correct or delete the information we hold about you, contact us at{' '}
              <a href={`mailto:${site.email}`} className="text-fg">
                {site.email}
              </a>{' '}
              or on WhatsApp at {site.whatsapp}.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
