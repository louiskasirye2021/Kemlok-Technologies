import { motion } from 'framer-motion';
import { Shield, FileText, Lock, AlertCircle } from 'lucide-react';

export function Terms() {
  const sections = [
    {
      icon: FileText,
      title: 'Terms of Service',
      content: [
        {
          heading: '1. Acceptance of Terms',
          text: 'By accessing and using Kemlok Technologies services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.',
        },
        {
          heading: '2. Use of Services',
          text: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You are prohibited from using our services in any way that could damage, disable, or impair our systems or interfere with any other party\'s use of our services.',
        },
        {
          heading: '3. Intellectual Property',
          text: 'All content, features, and functionality of our services are owned by Kemlok Technologies and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
        },
        {
          heading: '4. User Responsibilities',
          text: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to your account.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Privacy & Data Protection',
      content: [
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
      icon: Lock,
      title: 'Service Terms',
      content: [
        {
          heading: '8. Service Modifications',
          text: 'We reserve the right to modify or discontinue our services at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance of our services.',
        },
        {
          heading: '9. Payment Terms',
          text: 'All fees are quoted in USD and are non-refundable unless otherwise stated. Payment is due according to the terms specified in your service agreement. Late payments may result in service suspension.',
        },
        {
          heading: '10. Project Deliverables',
          text: 'We will make reasonable efforts to meet agreed-upon deadlines. However, timelines are estimates and may be subject to change based on project complexity and client responsiveness.',
        },
      ],
    },
    {
      icon: AlertCircle,
      title: 'Limitations & Liability',
      content: [
        {
          heading: '11. Disclaimer of Warranties',
          text: 'Our services are provided "as is" without warranties of any kind, either express or implied. We do not warrant that our services will be uninterrupted, secure, or error-free.',
        },
        {
          heading: '12. Limitation of Liability',
          text: 'To the maximum extent permitted by law, Kemlok Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.',
        },
        {
          heading: '13. Indemnification',
          text: 'You agree to indemnify and hold harmless Kemlok Technologies from any claims, damages, or expenses arising from your use of our services or violation of these terms.',
        },
        {
          heading: '14. Governing Law',
          text: 'These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.',
        },
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-60 h-60 border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-40 h-40 border border-white/5 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Terms & Conditions
            </h1>
            <div className="w-20 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Last updated: November 20, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="border border-white/20 p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl mb-6" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>Introduction</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Welcome to Kemlok Technologies. These Terms and Conditions govern your use of
              our website and services. By accessing or using our services, you agree to
              comply with and be bound by these terms.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Please read these terms carefully before using our services. If you have any
              questions about these terms, please contact us at{' '}
              <a href="mailto:legal@kemlok.com" className="text-white hover:underline">
                legal@kemlok.com
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  className="w-16 h-16 border-2 border-white flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <section.icon size={28} />
                </motion.div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                    {section.title}
                  </h2>
                </div>
              </div>

              <div className="space-y-8 pl-0 md:pl-22">
                {section.content.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="border-l-2 border-white/20 pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: itemIndex * 0.05 }}
                  >
                    <h3 className="text-xl font-black mb-3">{item.heading}</h3>
                    <p className="text-white/70 leading-relaxed">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl mb-8" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>Additional Information</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black mb-3">15. Changes to Terms</h3>
                <p className="text-black/70 leading-relaxed">
                  We reserve the right to update or modify these terms at any time without
                  prior notice. Your continued use of our services after any changes
                  constitutes acceptance of the new terms. We encourage you to review these
                  terms periodically.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-3">16. Contact Information</h3>
                <p className="text-black/70 leading-relaxed mb-4">
                  If you have any questions about these Terms and Conditions, please contact
                  us:
                </p>
                <div className="space-y-2 text-black/70">
                  <p>
                    <span className="font-black">Email:</span> legal@kemlok.com
                  </p>
                  <p>
                    <span className="font-black">Phone:</span> +1 (555) 123-4567
                  </p>
                  <p>
                    <span className="font-black">Address:</span> 123 Innovation Street, San
                    Francisco, CA 94103
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black mb-3">17. Severability</h3>
                <p className="text-black/70 leading-relaxed">
                  If any provision of these terms is found to be unenforceable or invalid,
                  that provision will be limited or eliminated to the minimum extent
                  necessary so that these terms will otherwise remain in full force and
                  effect.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-black mb-3">18. Entire Agreement</h3>
                <p className="text-black/70 leading-relaxed">
                  These terms constitute the entire agreement between you and Kemlok
                  Technologies regarding the use of our services, superseding any prior
                  agreements between you and Kemlok Technologies relating to your use of the
                  services.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Acknowledgment */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="border-2 border-white/20 p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Shield size={48} className="mx-auto mb-6" />
            <h2 className="text-2xl font-black mb-4">ACKNOWLEDGMENT</h2>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
              By using our services, you acknowledge that you have read, understood, and
              agree to be bound by these Terms and Conditions. Thank you for choosing Kemlok
              Technologies.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}