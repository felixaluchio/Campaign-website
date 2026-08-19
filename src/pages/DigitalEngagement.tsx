import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Bot, MessageSquare, HandHeart, Calendar, Newspaper, Phone } from 'lucide-react';

export function DigitalEngagement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openAssistant = () => {
    const event = new CustomEvent('open-ai-assistant');
    window.dispatchEvent(event);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <section className="bg-[var(--color-brand-black)] py-20 border-b border-gray-100 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-gray-300">Digital Engagement Hub</span>
            <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-4xl mx-auto">
            Connect. Participate.<br />Stay Informed.
          </h1>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Explore the vision, manifesto, community priorities, and ways to get involved with the help of our digital tools.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* AI Assistant - Featured */}
            <div className="md:col-span-2 bg-[var(--color-soft-bg)] border border-[var(--color-light-green)] rounded-3xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                  <Bot className="w-8 h-8 text-[var(--color-primary-green)]" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Ask About the Campaign</h2>
                <p className="text-gray-700 text-lg mb-8 max-w-md">
                  Meet Phyllis Wangui's Digital Assistant. Explore the vision, manifesto, community priorities, and ways to get involved.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">"What is the vision?"</span>
                  <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">"What are the priorities?"</span>
                  <span className="text-xs font-bold bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">"How can I help?"</span>
                </div>
                <div className="mt-auto">
                  <button 
                    onClick={openAssistant}
                    className="inline-flex px-8 py-4 rounded-full font-bold bg-[var(--color-brand-black)] text-white hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    Ask the Assistant
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none rounded-tl-full mix-blend-overlay"></div>
            </div>

            {/* Report Issue */}
            <Link to="/report-issue" className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col group hover:border-[var(--color-primary-green)] transition-colors shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Report an Issue</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Help us track and address community challenges in your ward.</p>
              <span className="text-[var(--color-primary-green)] font-bold text-sm flex items-center gap-2">
                Submit Report &rarr;
              </span>
            </Link>

            {/* Join Movement */}
            <Link to="/join-the-movement" className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col group hover:border-[var(--color-primary-green)] transition-colors shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HandHeart className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Join the Movement</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Sign up as a volunteer and contribute your skills to the campaign.</p>
              <span className="text-[var(--color-primary-green)] font-bold text-sm flex items-center gap-2">
                Volunteer Now &rarr;
              </span>
            </Link>

            {/* Events */}
            <Link to="/events" className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col group hover:border-[var(--color-primary-green)] transition-colors shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Upcoming Events</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Find and register for community dialogues and town halls near you.</p>
              <span className="text-[var(--color-primary-green)] font-bold text-sm flex items-center gap-2">
                View Calendar &rarr;
              </span>
            </Link>

            {/* Community Engagement */}
            <Link to="/report-issue" className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col group hover:border-[var(--color-primary-green)] transition-colors shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-[var(--color-light-green)] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-[var(--color-deep-green)]" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Concerns</h3>
              <p className="text-gray-600 text-sm mb-6 flex-1">Report ward-level priority issues or track submitted messages directly.</p>
              <span className="text-[var(--color-primary-green)] font-bold text-sm flex items-center gap-2">
                Report Issue &rarr;
              </span>
            </Link>

            {/* Contact */}
            <Link to="/contact" className="md:col-span-3 bg-[var(--color-brand-black)] text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between group overflow-hidden relative shadow-sm hover:shadow-md">
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-2">Contact the Campaign</h3>
                    <p className="text-gray-300 text-sm max-w-xl">
                      Have a specific question or inquiry? Reach out to our team directly via WhatsApp, email, or phone.
                    </p>
                  </div>
                  <span className="px-8 py-4 rounded-full font-bold bg-white text-[var(--color-brand-black)] hover:bg-gray-100 transition-colors shrink-0">
                    Contact Us
                  </span>
               </div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}
