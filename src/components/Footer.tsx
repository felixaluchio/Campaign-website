import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { contactConfig } from '../data/contactConfig';
import footerDisclaimerLogo from '../assets/images/regenerated_image_1786708807875.png';
import footerBrandLogo from '../assets/images/regenerated_image_1786708809204.png';

const navigation = {
  explore: [
    { name: 'Home', href: '/' },
    { name: 'Meet Phyllis', href: '/#meet-phyllis' },
    { name: 'Why I\'m Running', href: '/#why-im-running' },
    { name: 'Vision & Manifesto', href: '/#vision' },
    { name: 'Development Pillars', href: '/#pillars' },
  ],
  community: [
    { name: 'First 100 Days', href: '/#100-days' },
    { name: 'Constituencies', href: '/#community' },
    { name: 'Wards', href: '/#community' },
    { name: 'Community Priorities', href: '/#community' },
    { name: 'Report an Issue', href: '/report-issue' },
  ],
  getInvolved: [
    { name: 'Join the Movement', href: '/join-the-movement' },
    { name: 'Volunteer', href: '/join-the-movement' },
    { name: 'Campaign Events & Town Halls', href: '/events' },
  ],
  connect: [
    { name: 'Contact the Campaign', href: '/contact' },
    { name: 'Communication Preferences', href: '/communication-preferences' },
    { name: 'AI Assistant', href: '/digital-engagement' },
    { name: 'Admin Console', href: '/admin' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Contact', href: '/contact' },
  ]
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Global Pre-Footer CTA */}
      <section className="bg-[var(--color-primary-green)] relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-noise-pattern opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--color-campaign-red)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-deep-green)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
            Pamoja Tujenge Kiambu Bora Kwa Wote.
          </h2>
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-green-50 mb-10 leading-relaxed font-medium">
            A strong voice, real representation, and delivering results for our community. The time for transformative leadership is now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join-the-movement"
              className="w-full sm:w-auto bg-[var(--color-campaign-red)] text-white hover:bg-[#a01822] px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-lg"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#vision"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center text-lg"
            >
              Read the Plan
            </Link>
          </div>
        </div>
      </section>

      {/* Main Dark Footer */}
      <footer className="bg-[var(--color-brand-black)] text-white relative overflow-hidden" aria-labelledby="footer-heading">
        <div className="absolute inset-0 bg-noise-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
        
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        
        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 sm:pt-20 lg:px-8 relative z-10">
          
          {/* Top Section */}
          <div className="xl:grid xl:grid-cols-12 xl:gap-12 border-b border-gray-800 pb-16">
            <div className="space-y-8 xl:col-span-4 lg:pr-8">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="h-12 w-auto flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img 
                    src={footerBrandLogo} 
                    alt="Phyllis Wangui Campaign Logo" 
                    className="h-12 w-auto object-contain bg-white/10 p-1 rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-2xl leading-tight text-white group-hover:text-gray-200 transition-colors">Phyllis Wangui</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-[var(--color-primary-green)]">
                    Woman Rep. Kiambu
                  </span>
                </div>
              </Link>
              
              <div className="flex gap-4">
                {Object.entries(contactConfig.social).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = platform === 'facebook' ? Facebook : platform === 'x' ? Twitter : platform === 'instagram' ? Instagram : platform === 'linkedin' ? Linkedin : platform === 'youtube' ? Youtube : null;
                  if (!Icon) return null;
                  return (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[var(--color-primary-green)] hover:text-white transition-all shadow-sm">
                      <span className="sr-only">Follow on {platform}</span>
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              {Object.values(contactConfig.social).every(url => !url) && (
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Official Social Channels Coming Soon</div>
              )}
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-8 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Explore</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.explore.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:underline transition-all underline-offset-4">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Community</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.community.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:underline transition-all underline-offset-4">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Get Involved</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.getInvolved.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:underline transition-all underline-offset-4">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Connect</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.connect.map((item) => (
                      <li key={item.name}>
                        <Link to={item.href} className="text-sm leading-6 text-gray-400 hover:text-white hover:underline transition-all underline-offset-4">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    {contactConfig.email.enabled && (
                      <li>
                        <a href={`mailto:${contactConfig.email.address}`} className="text-sm leading-6 text-gray-400 hover:text-[var(--color-primary-green)] flex items-center gap-2 transition-colors">
                          <Mail className="w-4 h-4" /> Email Us
                        </a>
                      </li>
                    )}
                    {contactConfig.whatsapp.enabled && (
                      <li>
                        <a href={`https://wa.me/${contactConfig.whatsapp.number}`} target="_blank" rel="noreferrer" className="text-sm leading-6 text-gray-400 hover:text-[#25D366] flex items-center gap-2 transition-colors">
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Disclaimer / Bottom Section */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-xs text-gray-500 max-w-xl text-center md:text-left">
              <img 
                src={footerDisclaimerLogo} 
                alt="Campaign Identity Logo" 
                className="h-10 w-auto object-contain bg-white/10 p-1.5 rounded-lg shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="mb-1 uppercase tracking-widest font-bold text-gray-300">Official Candidate for Kiambu County</p>
                <p className="leading-relaxed text-gray-400">
                  Official campaign website for Wakili Phyllis Wangui, candidate for Woman Representative, Kiambu County.
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-xs font-semibold text-gray-400">
              {navigation.legal.map((item) => (
                <Link key={item.name} to={item.href} className="hover:text-white hover:underline transition-colors underline-offset-2">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-xs text-gray-600 font-medium">
            &copy; {currentYear} Phyllis Wangui Campaign. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
