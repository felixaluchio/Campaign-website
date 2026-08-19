import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Search, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { SearchOverlay } from './SearchOverlay';
import navbarLogo from '../assets/images/regenerated_image_1786708557941.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { 
    name: 'Meet Phyllis', 
    path: '/#meet-phyllis',
    subLinks: [
      { name: 'Meet Phyllis', path: '/#meet-phyllis' },
      { name: 'Why I\'m Running', path: '/#why-im-running' },
    ]
  },
  { 
    name: 'Vision & Manifesto', 
    path: '/#vision',
    subLinks: [
      { name: 'Vision', path: '/#vision' },
      { name: 'Manifesto', path: '/#manifesto' },
      { name: 'Development Pillars', path: '/#pillars' },
      { name: 'First 100 Days', path: '/#100-days' },
    ]
  },
  { 
    name: 'Community', 
    path: '/#community',
    subLinks: [
      { name: 'Constituencies & Wards', path: '/#community' },
      { name: 'Community Priorities', path: '/#community' },
      { name: 'Report an Issue', path: '/report-issue' },
    ]
  },
  { 
    name: 'Get Involved', 
    path: '/join-the-movement',
    subLinks: [
      { name: 'Join the Movement', path: '/join-the-movement' },
      { name: 'Volunteer', path: '/join-the-movement' },
      { name: 'Upcoming Events', path: '/events' },
    ]
  },
  { 
    name: 'Events', 
    path: '/events',
    subLinks: [
      { name: 'Campaign Events & Town Halls', path: '/events' },
    ]
  },
  { 
    name: 'Contact', 
    path: '/contact',
    subLinks: [
      { name: 'Contact Campaign', path: '/contact' },
      { name: 'Digital Hub', path: '/digital-engagement' },
    ]
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const isActiveMain = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    return location.pathname === path || (path.includes('#') && location.hash === path.replace('/', ''));
  };

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-transparent py-4'
        )}
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo area */}
            <div className="flex items-center shrink-0">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="h-10 md:h-11 w-auto flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img 
                    src={navbarLogo} 
                    alt="Phyllis Wangui Campaign Logo" 
                    className="h-10 md:h-11 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className={clsx("font-serif font-bold text-lg leading-tight tracking-wide transition-colors", isScrolled ? "text-[var(--color-brand-black)]" : "text-[var(--color-brand-black)] xl:text-[var(--color-brand-black)]")}>
                    Phyllis Wangui
                  </span>
                  <span className={clsx("text-[0.65rem] uppercase tracking-widest font-bold transition-colors", isScrolled ? "text-[var(--color-primary-green)]" : "text-[var(--color-primary-green)] xl:text-[var(--color-deep-green)]")}>
                    Woman Rep. Kiambu
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1 justify-center flex-1 mx-4 xl:mx-8">
              {navLinks.map((link) => {
                const isActive = isActiveMain(link.path);
                  
                return (
                  <div key={link.name} className="relative group">
                    <Link
                      to={link.path}
                      className={clsx(
                        'px-3 xl:px-4 py-2 rounded-full text-[13px] font-bold tracking-wide transition-colors relative flex items-center gap-1',
                        isActive
                          ? 'text-[var(--color-primary-green)]'
                          : 'text-gray-700 hover:text-[var(--color-primary-green)] hover:bg-[var(--color-light-green)]/30'
                      )}
                    >
                      {link.name}
                      {link.subLinks && <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-[var(--color-campaign-red)] rounded-t-full"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {link.subLinks && (
                      <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[200px] flex flex-col gap-1">
                          {link.subLinks.map(sub => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-[var(--color-primary-green)] hover:bg-[var(--color-light-green)]/20 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-5 shrink-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-[var(--color-primary-green)] hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <Link
                to="/join-the-movement"
                className="bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white px-5 xl:px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                Join the Movement
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Actions & Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-[var(--color-primary-green)] rounded-full transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className={clsx(
                  "p-2 rounded-md transition-colors",
                  isScrolled ? "text-gray-900" : "text-gray-900"
                )}
                aria-label="Open main menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col h-[100dvh]"
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="h-9 w-auto flex items-center justify-center shrink-0">
                    <img 
                      src={navbarLogo} 
                      alt="Phyllis Wangui Campaign Logo" 
                      className="h-9 w-auto object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-[var(--color-brand-black)] leading-tight">Phyllis Wangui</span>
                    <span className="text-[0.65rem] uppercase tracking-widest font-bold text-[var(--color-primary-green)]">Woman Rep. Kiambu</span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    const isActive = isActiveMain(link.path);
                    return (
                      <div key={link.name} className="flex flex-col gap-2">
                        <Link
                          to={link.path}
                          className={clsx(
                            'text-lg font-bold transition-colors',
                            isActive 
                              ? 'text-[var(--color-primary-green)]' 
                              : 'text-[var(--color-brand-black)]'
                          )}
                        >
                          {link.name}
                        </Link>
                        {link.subLinks && (
                          <div className="flex flex-col gap-3 pl-4 border-l-2 border-gray-100 mt-2">
                            {link.subLinks.map(sub => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                className="text-sm font-semibold text-gray-500 hover:text-[var(--color-primary-green)] transition-colors"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
              <div className="border-t border-gray-100 p-6 flex flex-col gap-3 bg-gray-50/50 shrink-0">
                <Link
                  to="/report-issue"
                  className="w-full border border-gray-300 text-center rounded-full px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Report an Issue
                </Link>
                <Link
                  to="/join-the-movement"
                  className="w-full bg-[var(--color-primary-green)] text-white text-center rounded-full px-4 py-3 text-sm font-semibold hover:bg-[var(--color-deep-green)] transition-colors flex items-center justify-center gap-2"
                >
                  Get Involved
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
