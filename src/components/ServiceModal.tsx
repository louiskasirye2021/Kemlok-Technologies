import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    icon: LucideIcon;
    description: string;
    fullDescription: string;
    offerings: Array<{
      icon: LucideIcon;
      name: string;
      detail: string;
      fullDetail: string;
    }>;
    benefits: string[];
  };
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              className="relative bg-black border-2 border-white w-full max-w-4xl max-h-[90vh] overflow-y-auto my-8"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <motion.div
                    className="w-16 h-16 border-2 border-white flex items-center justify-center flex-shrink-0"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <service.icon size={32} />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-lg text-white/70">
                      {service.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-2xl font-black mb-4">Key benefits</h3>
                  <div className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-white mt-2 flex-shrink-0" />
                        <p className="text-white/70">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Offerings */}
                <div>
                  <h3 className="text-2xl font-black mb-6">What we offer</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.offerings.map((offering, index) => (
                      <motion.div
                        key={index}
                        className="border border-white/20 p-6 hover:bg-white/5 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <offering.icon size={32} className="mb-3" />
                        <h4 className="font-black mb-2">{offering.name}</h4>
                        <p className="text-white/60 text-sm mb-2">{offering.detail}</p>
                        <p className="text-white/50 text-sm">{offering.fullDetail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-center text-white/60 mb-4">
                    Interested in this service?
                  </p>
                  <button
                    className="w-full bg-white text-black py-4 font-black tracking-wide hover:bg-white/90 transition-colors"
                    onClick={() => {
                      onClose();
                      // Navigate to contact page
                    }}
                  >
                    GET IN TOUCH
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
