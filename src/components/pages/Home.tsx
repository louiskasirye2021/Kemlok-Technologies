import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface HomeProps {
  setCurrentPage?: (page: string) => void;
}

export function Home({ setCurrentPage }: HomeProps) {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Cutting-edge AI solutions for modern businesses',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance and rapid delivery',
    },
    {
      icon: Target,
      title: 'Precision Design',
      description: 'Pixel-perfect execution every time',
    },
  ];

  const handleNavigation = (page: string) => {
    if (setCurrentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Geometric Background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 border border-white/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 border border-white/5"
            animate={{
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
            style={{ x: '-50%', y: '-50%' }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-sm tracking-widest">KEMLOK TECHNOLOGIES</span>
            </motion.div>

            <motion.h1
              className="mb-6 tracking-tight max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block text-5xl md:text-7xl">
                Turning your vision into
              </span>
              <span className="block text-5xl md:text-7xl">
                intelligent solutions
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Next-gen solutions that blend technology, design, and innovation
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 group px-8 py-6"
                onClick={() => handleNavigation('contact')}
              >
                Get Started
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 hover:bg-white/10 px-8 py-6"
                onClick={() => handleNavigation('services')}
              >
                View Services
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-4 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Why Choose Us
            </h2>
            <div className="w-20 h-1 bg-white mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="border border-white/10 p-8 h-full relative overflow-hidden">
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10 group-hover:text-black transition-colors">
                      <Icon size={40} className="mb-4" />
                      <h3 className="text-2xl font-black mb-2">{feature.title}</h3>
                      <p className="text-white/60 group-hover:text-black/60 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Ready To Build The Future?
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Let's create something extraordinary together
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 px-12 py-6"
              onClick={() => handleNavigation('contact')}
            >
              Start Your Project
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
