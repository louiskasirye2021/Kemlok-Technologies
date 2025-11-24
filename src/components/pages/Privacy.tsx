<<<<<<< HEAD
import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';

export function Privacy() {
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
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Last updated: November 21, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF Embed */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="border border-white/20 p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-black mb-4">Full Privacy Policy</h2>
            <p className="text-white/70 mb-6">The full privacy policy is embedded below. You can also <a href="/Privacy%20Policy.pdf" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">download the PDF</a>.</p>

            <div className="w-full h-[70vh] bg-black border border-white/10">
              <iframe src="/Privacy%20Policy.pdf" title="Privacy Policy" className="w-full h-full" />
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
              By using our services, you acknowledge that you have read and understood our Privacy Policy. If you have questions about our privacy practices, please contact us at <a href="mailto:legal@kemlok.com" className="text-white hover:underline">legal@kemlok.com</a>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
=======
import { motion } from 'framer-motion';
import { FileText, Shield } from 'lucide-react';

export function Privacy() {
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
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Last updated: November 21, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* PDF Embed */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="border border-white/20 p-4 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-black mb-4">Full Privacy Policy</h2>
            <p className="text-white/70 mb-6">The full privacy policy is embedded below. You can also <a href="/Privacy%20Policy.pdf" className="text-white hover:underline" target="_blank" rel="noopener noreferrer">download the PDF</a>.</p>

            <div className="w-full h-[70vh] bg-black border border-white/10">
              <iframe src="/Privacy%20Policy.pdf" title="Privacy Policy" className="w-full h-full" />
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
              By using our services, you acknowledge that you have read and understood our Privacy Policy. If you have questions about our privacy practices, please contact us at <a href="mailto:legal@kemlok.com" className="text-white hover:underline">legal@kemlok.com</a>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
>>>>>>> 64edcef (Kemlok-Technologies)
