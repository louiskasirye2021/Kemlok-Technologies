import * as React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import logo from 'figma:asset/cc572572013fed7ea1d15352963344bd1131bddf.png';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

function TikTokIcon({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 3v9.5A4.5 4.5 0 1 1 11 14V6h4V3h-3z" />
    </svg>
  );
}

export function Footer({ setCurrentPage }: FooterProps) {
  const socialLinks = [
    {
      icon: TikTokIcon,
      label: 'TikTok',
      href: 'https://www.tiktok.com/@kemloktechnologies',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/kemloktechnologies/',
    },
    { icon: Twitter, label: 'X', href: 'https://x.com/Kemlok_Tech' },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/kemlok-technologies-undefined-56a632397',
    },
  ];

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-white/10 mt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-40 h-40 border border-white/5 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 border border-white/5 rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <img src={logo} alt="Kemlok Technologies" className="h-12 w-auto" />
            <p className="text-white/60 text-sm">Ultra-modern digital solutions for the next generation.</p>
          </div>

          <div>
            <h3 className="font-black tracking-tight mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['home', 'about', 'services', 'contact'].map((page) => (
                <motion.button
                  key={page}
                  onClick={() => handleLinkClick(page)}
                  className="block text-white/60 hover:text-white transition-colors capitalize"
                  whileHover={{ x: 5 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-black tracking-tight mb-4">Services</h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>Web & Systems</p>
              <p>Branding & Creative</p>
              <p>AI Content Production</p>
              <p>Digital Marketing</p>
              <p>IT Consultation</p>
            </div>
          </div>

          <div>
            <h3 className="font-black tracking-tight mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon as React.ElementType;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>

            <a href="mailto:kemloktechnologies@gmail.com" className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors text-sm mb-2">
              <Mail size={16} />
              <span>kemloktechnologies@gmail.com</span>
            </a>
            <p className="text-white/60 text-sm">4C Kimirante Road<br />Komamboga, Uganda</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-white/40 text-sm"> 2026 Kemlok Technologies. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <motion.button onClick={() => handleLinkClick('terms')} className="text-white/60 hover:text-white transition-colors text-sm" whileHover={{ scale: 1.05 }}>
              Terms & Conditions
            </motion.button>
            <motion.button onClick={() => handleLinkClick('privacy')} className="text-white/60 hover:text-white transition-colors text-sm" whileHover={{ scale: 1.05 }}>
              Privacy Policy
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
