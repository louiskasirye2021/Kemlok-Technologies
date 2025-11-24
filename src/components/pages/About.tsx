import { motion } from 'framer-motion';
import { Sparkles, Target, Eye, Briefcase, Heart } from 'lucide-react';
import founderImage from 'figma:asset/d0162c32edc73cb1120e888914e12eeb1707090d.png';

export function About({ setCurrentPage }: { setCurrentPage?: (page: string) => void }) {
  const services = [
    {
      title: 'web & systems',
      description: 'Custom web applications and system solutions',
    },
    {
      title: 'branding & creative',
      description: 'Visual identity and creative design services',
    },
    {
      title: 'AI content production',
      description: 'Intelligent content creation powered by AI',
    },
    {
      title: 'digital marketing',
      description: 'Strategic online presence and growth',
    },
    {
      title: 'IT consultation',
      description: 'Expert technology guidance and support',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section with Introduction */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-64 h-64 border border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-80 h-80 border border-white/5 rounded-full"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/5"
            style={{ x: '-50%', y: '-50%' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-white/80" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-8 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              About Kemlok
            </h1>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-0.5 bg-white/40 mx-auto mb-12"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto"
            >
              <span className="block mb-4">
                Kemlok Technologies is a <span className="text-white">new AI-driven digital solutions startup</span> founded 
                to empower businesses with cutting-edge technology.
              </span>
              <span className="block text-white/70 text-lg sm:text-xl md:text-2xl">
                We specialize in transforming creative visions into intelligent, 
                scalable digital solutions that drive real business growth in an increasingly connected world.
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Message from the Founder */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-10">
              <Heart className="w-10 h-10 mr-4 text-black/60" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                Message From Our Founder
              </h2>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-24 h-0.5 bg-black/30 mx-auto mb-12"
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              {/* Founder Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="border-4 border-black/10 overflow-hidden"
                  >
                    <img 
                      src={founderImage} 
                      alt="Louis Lukoma, Founder & CEO of Kemlok Technologies"
                      className="w-full h-auto object-cover"
                    />
                  </motion.div>
                  <div className="mt-6 text-center lg:text-left">
                    <p className="text-2xl mb-2" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500 }}>
                      Louis Lukoma
                    </p>
                    <p className="text-black/60">Founder & CEO</p>
                    <p className="text-black/50 text-sm mt-1">Kemlok Technologies</p>
                  </div>
                </div>
              </motion.div>

              {/* Founder Message */}
              <div className="lg:col-span-2 space-y-6 text-lg sm:text-xl text-black/80 leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="border-l-4 border-black/20 pl-6 py-4"
                >
                  <p className="mb-4">
                    <strong className="text-black">Hello, I'm Louis Lukoma,</strong> the founder of Kemlok Technologies. 
                    I started this company with a simple yet powerful vision: <span className="text-black">to democratize access 
                    to world-class digital solutions</span>, especially for small and medium-sized businesses that are often 
                    overlooked by the tech industry.
                  </p>
                  <p className="mb-4">
                    Throughout my journey in technology and business, I've witnessed firsthand how the right digital tools 
                    can transform a struggling business into a thriving enterprise. Yet, I've also seen countless small 
                    businesses held back—not by lack of ambition or talent, but by <span className="text-black">limited 
                    access to affordable, intelligent digital solutions</span>.
                  </p>
                  <p className="mb-4">
                    That's what drives Kemlok Technologies. We believe that <span className="text-black">every business, 
                    regardless of size, deserves the power of AI-driven innovation</span>. Whether you're a local startup 
                    in Kampala or an established company looking to scale, we're committed to turning your vision into 
                    intelligent solutions that create real impact.
                  </p>
                  <p>
                    Our mission goes beyond just delivering services—we're here to <span className="text-black">build 
                    lasting partnerships, empower entrepreneurs, and contribute to Uganda's digital transformation</span>. 
                    Thank you for trusting us with your vision. Together, we'll build something extraordinary.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-60 h-60 border border-white/5"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-10">
              <Target className="w-10 h-10 mr-4 text-white/60" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                Our Mission
              </h2>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-24 h-0.5 bg-white/40 mx-auto mb-12"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl mb-8 leading-relaxed" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 300 }}>
                delivering modern, AI-powered digital services that help businesses grow
              </p>
              <p className="text-lg sm:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                At Kemlok Technologies, we're dedicated to providing accessible, cutting-edge digital solutions 
                that leverage the power of artificial intelligence. Our mission is to help small and medium-sized 
                businesses unlock their full potential through innovative technology, creative design, and strategic 
                digital marketing. We believe that <span className="text-white">every business deserves intelligent 
                solutions</span> that are both powerful and affordable.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-10">
              <Eye className="w-10 h-10 mr-4 text-black/60" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                Our Vision
              </h2>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-24 h-0.5 bg-black/30 mx-auto mb-12"
            />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl mb-8 leading-relaxed" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 300 }}>
                becoming a major leader in AI-powered digital transformation
              </p>
              <p className="text-lg sm:text-xl text-black/70 max-w-4xl mx-auto leading-relaxed">
                We envision Kemlok Technologies as <span className="text-black">Uganda's premier AI-driven digital 
                solutions provider</span>, and eventually, a recognized name across Africa and beyond. Our long-term 
                goal is to lead the digital transformation revolution by continuously innovating, adopting emerging 
                technologies, and creating solutions that set new industry standards. We aspire to be the go-to partner 
                for businesses seeking <span className="text-black">intelligent, future-ready digital experiences</span> 
                that drive sustainable growth and competitive advantage.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center p-6 border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl sm:text-5xl mb-3"
                >
                  🚀
                </motion.div>
                <p className="text-lg group-hover:text-white/90">Innovation-Driven</p>
              </div>
              <div className="text-center p-6 border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl sm:text-5xl mb-3"
                >
                  🌍
                </motion.div>
                <p className="text-lg group-hover:text-white/90">Global Impact</p>
              </div>
              <div className="text-center p-6 border border-black/10 hover:bg-black hover:text-white transition-all duration-300 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl sm:text-5xl mb-3"
                >
                  ⚡
                </motion.div>
                <p className="text-lg group-hover:text-white/90">Future-Ready</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute bottom-20 right-20 w-72 h-72 border border-white/5 rounded-full"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center mb-10">
              <Briefcase className="w-10 h-10 mr-4 text-white/60" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
                What We Do
              </h2>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="w-24 h-0.5 bg-white/40 mx-auto mb-12"
            />

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center text-lg sm:text-xl text-white/70 max-w-3xl mx-auto mb-16"
            >
              We offer a comprehensive suite of digital services designed to help your business thrive 
              in the modern digital landscape. From AI-powered solutions to creative design, we've got you covered.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="border border-white/20 p-8 group hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    className="w-12 h-12 border-2 border-white/40 group-hover:border-black/40 mb-6 flex items-center justify-center transition-colors"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-3 h-3 bg-white group-hover:bg-black transition-colors"></div>
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl mb-3" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 300 }}>
                    {service.title}
                  </h3>
                  <p className="text-white/60 group-hover:text-black/60 transition-colors">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-center mt-16"
            >
              <motion.button
                onClick={() => setCurrentPage?.('services')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg"
              >
                explore our services
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-8" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 300 }}>
              Ready to transform your vision?
            </h2>
            <p className="text-lg sm:text-xl text-black/70 mb-12 max-w-2xl mx-auto">
              Let's work together to create intelligent solutions that drive your business forward. 
              Get in touch with us today.
            </p>
            <motion.button
              onClick={() => setCurrentPage?.('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-black text-white hover:bg-black/80 transition-all duration-300 text-lg"
            >
              Get in touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}