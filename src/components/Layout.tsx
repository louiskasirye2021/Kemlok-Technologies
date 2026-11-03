import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { ease } from './motion';
import { ChatWidget } from './assistant/ChatWidget';
import { socialBrands, WhatsAppIcon } from './BrandIcons';
import logo from '../assets/kemlok-logo.png';
import { mapLink, site, whatsappLink } from '../site';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/#work', label: 'Work' },
  { to: '/contact', label: 'Contact' },
];

/** Scrolls to the #section in the URL, or to the top when there isn't one. */
function scrollToHashOrTop(behavior: ScrollBehavior) {
  const id = window.location.hash.slice(1);
  const el = id ? document.getElementById(id) : null;
  if (el) el.scrollIntoView({ behavior });
  else window.scrollTo({ top: 0, behavior });
}

/**
 * Handles #section links within the same page. Scrolling on page changes is done
 * by PageTransition once the new page has mounted, after the old one has faded out.
 */
function HashScroller() {
  const { pathname, hash } = useLocation();
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) scrollToHashOrTop('smooth');
    lastPath.current = pathname;
  }, [pathname, hash]);
  return null;
}

function PageTransition({ children }: { children: ReactNode }) {
  useLayoutEffect(() => scrollToHashOrTop('instant'), []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease } }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  );
}

/** Thin bar along the top of the header showing how far down the page you are. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  // The spring can overshoot past 100%, so the bar sits in a clipped track to stay within the page width.
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
      <motion.div className="h-full origin-left bg-fg" style={{ scaleX }} />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => setOpen(false), [pathname, hash]);

  const linkClass = (active: boolean) =>
    `relative inline-flex min-h-11 items-center rounded-md px-4 text-[15px] no-underline transition-colors ${
      active ? 'font-semibold text-white' : 'text-muted hover:text-white'
    }`;

  // "Work" is a section of the home page, so it should not mark Home as active.
  const isActive = (to: string) => {
    if (to === '/#work') return pathname === '/' && hash === '#work';
    if (to === '/') return pathname === '/' && hash !== '#work';
    return pathname === to || pathname.startsWith(`${to}/`);
  };

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      <ScrollProgress />
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link to="/" aria-label={`${site.name} home`} className="shrink-0">
          <img src={logo} alt="" width={338} height={144} className="h-11 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              aria-current={isActive(item.to) ? 'page' : undefined}
              className={linkClass(isActive(item.to))}
            >
              {isActive(item.to) && (
                <motion.span
                  layoutId="nav-highlight"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-md bg-panel"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden min-h-11 items-center rounded-md bg-fg px-5 text-[15px] font-semibold text-ink no-underline transition-colors hover:bg-white sm:inline-flex"
          >
            Book a consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-11 items-center justify-center rounded-md text-fg hover:bg-panel lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="inline-flex"
              >
                {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="overflow-hidden border-t border-line lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <motion.div
              className="container-page flex flex-col py-3"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {navItems.map((item) => (
                <motion.div key={item.label} variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}>
                  <Link
                    to={item.to}
                    aria-current={isActive(item.to) ? 'page' : undefined}
                    className={`${linkClass(isActive(item.to))} px-0`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                to="/contact"
                className="mt-3 inline-flex min-h-12 items-center justify-center rounded-md bg-fg font-semibold text-ink no-underline sm:hidden"
              >
                Book a consultation
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const footLink = 'text-muted no-underline hover:text-white';

  return (
    <footer className="border-t border-line">
      {/* Extra bottom padding keeps the last row clear of the floating chat button */}
      <div className="container-page flex flex-col gap-12 pt-16 pb-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <img src={logo} alt={site.name} width={338} height={144} className="h-12 w-auto self-start" />
            <p className="m-0 max-w-xs text-[15px] leading-relaxed text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 text-[15px]">
            <h2 className="mb-1 font-sans text-[15px] font-semibold">Company</h2>
            <Link to="/about" className={footLink}>About</Link>
            <Link to="/services" className={footLink}>Services</Link>
            <Link to="/#work" className={footLink}>Work</Link>
            <Link to="/contact" className={footLink}>Contact</Link>
          </nav>

          <div className="flex flex-col gap-3 text-[15px]">
            <h2 className="mb-1 font-sans text-[15px] font-semibold text-fg">Contact</h2>
            {/* The zero-width space lets a long address wrap after the @ instead of mid-word */}
            <IconLink href={`mailto:${site.email}`} icon={<Mail size={17} />} label={site.email.replace('@', '@\u200b')} />
            <IconLink href={site.phoneHref} icon={<Phone size={17} />} label={site.phone} />
            <IconLink
              href={whatsappLink}
              external
              icon={<WhatsAppIcon size={17} />}
              label={`WhatsApp ${site.whatsapp}`}
              background="#25D366"
              foreground="#ffffff"
            />
            <IconLink href={mapLink} external icon={<MapPin size={17} />} label={site.address} />
          </div>

          <div className="flex flex-col gap-3 text-[15px]">
            <h2 className="mb-1 font-sans text-[15px] font-semibold">Follow</h2>
            {site.socials.map((s) => {
              const brand = socialBrands[s.label];
              return (
                <IconLink
                  key={s.label}
                  href={s.href}
                  external
                  icon={brand ? <brand.Icon size={16} /> : null}
                  label={s.label}
                  background={brand?.background}
                  foreground={brand?.foreground}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-subtle">
          <span>
            © {year} {site.legalName}
            {site.registrationNumber && <> · Reg. No. {site.registrationNumber}</>}
          </span>
          <span className="flex gap-5">
            <Link to="/terms" className="text-subtle hover:text-white">Terms</Link>
            <Link to="/privacy" className="text-subtle hover:text-white">Privacy</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

/**
 * A footer link with its icon in a small tile. On hover the tile lifts and fills with
 * the given colours (a platform's brand colours), defaulting to light-on-dark.
 */
function IconLink({
  href,
  icon,
  label,
  external,
  background = 'var(--color-fg)',
  foreground = 'var(--color-ink)',
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
  background?: string;
  foreground?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-3 text-muted no-underline transition-colors hover:text-white"
      style={{ '--tile-bg': background, '--tile-fg': foreground } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-strong text-fg transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-transparent group-hover:text-(--tile-fg) group-hover:[background:var(--tile-bg)]"
      >
        {icon}
      </span>
      <span className="min-w-0 wrap-break-word">{label}</span>
    </a>
  );
}

export function Layout() {
  const outlet = useOutlet();
  const { pathname } = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-ink text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <HashScroller />
        <Header />
        <main id="main" className="flex-1 overflow-x-clip">
          {/* The old page fades out before the new one fades in */}
          <AnimatePresence mode="wait">
            <PageTransition key={pathname}>{outlet}</PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </MotionConfig>
  );
}
