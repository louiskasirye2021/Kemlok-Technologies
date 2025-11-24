import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Globe,
  Layout,
  Calendar,
  Gauge,
  Palette,
  Sparkles,
  Image,
  Share2,
  Video,
  Package,
  BookOpen,
  TrendingUp,
  MessageSquare,
  BarChart,
  Search,
  Lightbulb,
  Cog,
  Bot,
} from 'lucide-react';
import { ServiceModal } from '../ServiceModal';

export function Services() {
  const [selectedService, setSelectedService] = useState<any>(null);

  const services = [
    {
      id: 'web-systems',
      title: 'Web & Systems',
      icon: Globe,
      description: 'Build powerful, scalable web solutions that grow with your business needs',
      fullDescription: 'We create modern, responsive websites and robust systems that not only look amazing but perform exceptionally. From simple landing pages to complex web applications, we build digital experiences that convert visitors into customers and streamline your operations.',
      offerings: [
        { 
          icon: Layout, 
          name: 'Website Builds', 
          detail: 'Custom, responsive websites',
          fullDetail: 'Professional websites tailored to your brand, fully responsive across all devices, optimized for speed and SEO.'
        },
        { 
          icon: Calendar, 
          name: 'Booking Systems', 
          detail: 'Seamless scheduling solutions',
          fullDetail: 'Automated booking and appointment systems that save time, reduce no-shows, and improve customer experience.'
        },
        { 
          icon: Gauge, 
          name: 'Internal Dashboards', 
          detail: 'Data-driven control panels',
          fullDetail: 'Custom dashboards that visualize your business data in real-time, helping you make informed decisions quickly.'
        },
      ],
      benefits: [
        'Fully responsive design that works perfectly on mobile, tablet, and desktop',
        'SEO-optimized to help you rank higher in search results and attract more visitors',
        'Fast loading speeds that improve user experience and conversion rates',
        'Secure, reliable infrastructure with regular updates and maintenance',
        'Scalable architecture that grows with your business needs'
      ],
      color: 'from-white/10 to-white/5',
    },
    {
      id: 'branding',
      title: 'Branding & Creative',
      icon: Palette,
      description: 'Create memorable visual identities that make your brand stand out',
      fullDescription: 'Your brand is more than just a logo—it\'s the complete visual story of your business. We craft cohesive brand identities that capture your essence, resonate with your audience, and leave lasting impressions across every touchpoint.',
      offerings: [
        { 
          icon: Sparkles, 
          name: 'Logo Design', 
          detail: 'Iconic brand marks',
          fullDetail: 'Unique, memorable logos that perfectly represent your brand values and make a strong first impression.'
        },
        { 
          icon: Package, 
          name: 'Brand Identity', 
          detail: 'Complete visual systems',
          fullDetail: 'Comprehensive brand guidelines including color palettes, typography, imagery style, and application across all materials.'
        },
        { 
          icon: Image, 
          name: 'AI Graphics', 
          detail: 'Next-gen visuals',
          fullDetail: 'Cutting-edge AI-generated graphics and illustrations that are unique, scalable, and perfectly aligned with your brand.'
        },
        { 
          icon: Share2, 
          name: 'Social Templates', 
          detail: 'Scroll-stopping content',
          fullDetail: 'Custom social media templates that maintain brand consistency and make content creation effortless.'
        },
      ],
      benefits: [
        'Stand out from competitors with a unique, professional brand identity',
        'Build trust and credibility through consistent, polished visuals',
        'Increase brand recognition across all platforms and materials',
        'Save time with ready-to-use templates and brand guidelines',
        'Attract your ideal customers with design that speaks to them'
      ],
      color: 'from-white/10 to-white/5',
    },
    {
      id: 'ai-content',
      title: 'AI Content Production',
      icon: Video,
      description: 'Produce high-quality video content at scale using cutting-edge AI',
      fullDescription: 'Transform your content strategy with AI-powered video production. We create engaging videos that tell your story, showcase your products, and drive conversions—all faster and more cost-effectively than traditional methods.',
      offerings: [
        { 
          icon: Video, 
          name: 'AI Video Ads', 
          detail: 'Automated video creation',
          fullDetail: 'Professional-quality video advertisements created with AI, customized for your brand and optimized for maximum engagement.'
        },
        { 
          icon: Package, 
          name: 'Product Showcases', 
          detail: 'Dynamic presentations',
          fullDetail: 'Eye-catching product videos that highlight features, benefits, and value propositions in compelling ways.'
        },
        { 
          icon: BookOpen, 
          name: 'Story Content', 
          detail: 'Narrative-driven videos',
          fullDetail: 'Emotionally resonant storytelling videos that connect with your audience and build brand loyalty.'
        },
      ],
      benefits: [
        'Produce high-quality videos 10x faster than traditional methods',
        'Reduce content production costs by up to 70%',
        'Create personalized videos at scale for different audience segments',
        'Stay ahead of trends with consistently fresh, engaging content',
        'Boost engagement rates with video content that performs'
      ],
      color: 'from-white/10 to-white/5',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      icon: TrendingUp,
      description: 'Drive growth with data-driven marketing strategies that deliver results',
      fullDescription: 'Cut through the noise and reach your ideal customers with strategic digital marketing. We combine creativity with analytics to build campaigns that don\'t just look good—they drive real, measurable business growth.',
      offerings: [
        { 
          icon: MessageSquare, 
          name: 'Social Media Management', 
          detail: 'Full-service social strategy',
          fullDetail: 'Complete social media management including content creation, community engagement, and performance tracking across all platforms.'
        },
        { 
          icon: BarChart, 
          name: 'Ad Campaigns', 
          detail: 'High-converting ads',
          fullDetail: 'Strategic paid advertising campaigns on Google, Facebook, Instagram, and LinkedIn that maximize ROI.'
        },
        { 
          icon: Search, 
          name: 'SEO & Content', 
          detail: 'Organic growth strategies',
          fullDetail: 'Search engine optimization and content marketing that improve rankings, drive traffic, and establish authority.'
        },
      ],
      benefits: [
        'Reach your target audience where they spend their time online',
        'Generate qualified leads that are ready to buy',
        'Track and measure every dollar spent with detailed analytics',
        'Build lasting customer relationships through strategic engagement',
        'Outrank competitors and dominate your market online'
      ],
      color: 'from-white/10 to-white/5',
    },
    {
      id: 'it-consultation',
      title: 'IT Consultation',
      icon: Lightbulb,
      description: 'Navigate digital transformation with expert technology guidance',
      fullDescription: 'Technology should empower your business, not complicate it. Our IT consultants help you make smart technology decisions, implement efficient systems, and stay ahead of the curve with strategic planning and expert guidance.',
      offerings: [
        { 
          icon: Cog, 
          name: 'Tech Strategy', 
          detail: 'Roadmap to digital success',
          fullDetail: 'Comprehensive technology assessments and strategic planning to align your IT infrastructure with business goals.'
        },
        { 
          icon: Bot, 
          name: 'Automation Planning', 
          detail: 'Efficiency optimization',
          fullDetail: 'Identify and implement automation opportunities that save time, reduce errors, and free your team for higher-value work.'
        },
        { 
          icon: Sparkles, 
          name: 'AI Implementation', 
          detail: 'Smart system integration',
          fullDetail: 'Strategic AI integration that enhances productivity, improves decision-making, and creates competitive advantages.'
        },
      ],
      benefits: [
        'Make informed technology decisions backed by expert analysis',
        'Reduce operational costs through process optimization',
        'Eliminate bottlenecks and streamline workflows',
        'Future-proof your business with scalable technology solutions',
        'Stay competitive with cutting-edge AI and automation'
      ],
      color: 'from-white/10 to-white/5',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 border border-white/10 rounded-full"
            animate={{ scale: [1, 1.3, 1], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-60 h-60 border border-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Our Services
            </h1>
            <div className="w-20 h-1 bg-white mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
              Comprehensive digital solutions engineered for the modern era
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Service Header */}
              <div className="mb-12">
                <div className="flex items-start gap-6 mb-6">
                  <motion.div
                    className="w-16 h-16 border-2 border-white flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon size={32} />
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Offerings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.offerings.map((offering, offerIndex) => (
                  <motion.button
                    key={offerIndex}
                    className="relative group text-left"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: offerIndex * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="border border-white/20 p-8 h-full relative overflow-hidden">
                      {/* Hover Background */}
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ y: '100%' }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10">
                        <motion.div
                          className="mb-4 group-hover:text-black transition-colors"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <offering.icon size={40} />
                        </motion.div>
                        <h3 className="text-xl font-black mb-2 group-hover:text-black transition-colors">
                          {offering.name}
                        </h3>
                        <p className="text-white/60 group-hover:text-black/60 transition-colors mb-3">
                          {offering.detail}
                        </p>
                        <p className="text-white/40 group-hover:text-black/40 transition-colors text-sm">
                          Click to learn more →
                        </p>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/10 group-hover:border-black/20 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Separator */}
              {index < services.length - 1 && (
                <motion.div
                  className="mt-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-4 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Our Process
            </h2>
            <div className="w-20 h-1 bg-black mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your vision and goals' },
              { step: '02', title: 'Strategy', description: 'Crafting the perfect roadmap' },
              { step: '03', title: 'Execution', description: 'Building with precision' },
              { step: '04', title: 'Launch', description: 'Delivering excellence' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-6xl font-black text-black/10 mb-4">{item.step}</div>
                <h3 className="text-2xl font-black mb-3">{item.title}</h3>
                <p className="text-black/60">{item.description}</p>
                {index < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-black/20"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-6 tracking-tight" style={{ fontFamily: 'Futura, Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.02em' }}>
              Let's Create Together
            </h2>
            <p className="text-xl text-white/60 mb-8">
              Ready to elevate your digital presence?
            </p>
            <motion.button
              className="bg-white text-black px-12 py-4 font-black tracking-wide hover:bg-white/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GET STARTED
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        service={selectedService || services[0]}
      />
    </div>
  );
}