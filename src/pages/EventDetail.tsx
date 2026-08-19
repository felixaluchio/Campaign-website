import { useEffect, useState, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, Clock, MapPin, Share2, Facebook, Twitter, Link as LinkIcon, CheckCircle2 } from 'lucide-react';
import { upcomingEvents, pastEvents } from '../data/eventsData';

export function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registrationRef, setRegistrationRef] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', ward: '' });

  const allEvents = [...upcomingEvents, ...pastEvents];
  const event = allEvents.find(e => e.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!event) {
    return (
      <div className="pt-32 pb-20 text-center min-h-screen">
        <h2 className="text-3xl font-serif font-bold mb-4">Event Not Found</h2>
        <p className="text-gray-600 mb-8">The event you are looking for does not exist or has been updated.</p>
        <button onClick={() => navigate('/events')} className="bg-[var(--color-primary-green)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-deep-green)] transition-all">
          Back to Campaign Events
        </button>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setRegistrationRef(`EVT-2026-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);
    }, 1000);
  };

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen pt-28 pb-20">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <Link to="/" className="hover:text-[var(--color-primary-green)]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/events" className="hover:text-[var(--color-primary-green)]">Campaign Events</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 truncate max-w-xs">{event.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Event Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
              <span className="px-3.5 py-1.5 rounded-full bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider border border-gray-100 inline-block mb-4">
                {event.category}
              </span>
              
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-brand-black)] mb-6 leading-tight">
                {event.title}
              </h1>

              <div className="grid sm:grid-cols-2 gap-4 p-6 bg-[var(--color-bg-light)] rounded-2xl border border-gray-100 mb-8 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary-green)] shrink-0 shadow-sm">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase block">Date</span>
                    <span className="font-bold text-gray-800">{event.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-primary-green)] shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase block">Time</span>
                    <span className="font-bold text-gray-800">{event.startTime} {event.endTime ? `– ${event.endTime}` : ''} EAT</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:col-span-2">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[var(--color-campaign-red)] shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-bold uppercase block">Venue & Location</span>
                    <span className="font-bold text-gray-800">{event.locationName}, {event.address} ({event.ward}, {event.constituency})</span>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="prose max-w-none text-gray-700 space-y-4 leading-relaxed mb-8">
                <h3 className="text-lg font-serif font-bold text-[var(--color-brand-black)]">About This Engagement</h3>
                <p>{event.description}</p>
                {event.whatToExpect && (
                  <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-2xl">
                    <h4 className="font-bold text-emerald-900 text-sm mb-1">What to Expect:</h4>
                    <p className="text-xs text-emerald-800">{event.whatToExpect}</p>
                  </div>
                )}
                {event.whoCanAttend && (
                  <p className="text-xs text-gray-500 italic">Target Audience: {event.whoCanAttend}</p>
                )}
              </div>

              {/* Share Event */}
              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gray-400 flex items-center gap-1.5">
                  <Share2 className="w-4 h-4" /> Share Event
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(event.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1DA1F2] hover:text-white transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[var(--color-primary-green)] hover:text-white transition-all relative"
                    title="Copy Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {copied && (
                      <span className="absolute -top-8 bg-black text-white text-[10px] px-2 py-0.5 rounded shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
              <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">
                Attend This Event
              </h3>
              <p className="text-xs text-gray-500 mb-6">
                Reserve your seat at this upcoming town hall or community engagement.
              </p>

              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-bold text-emerald-900 text-lg">Registration Confirmed!</h4>
                  <p className="text-xs text-emerald-800">
                    Registration Ref: <span className="font-mono font-bold">{registrationRef}</span>
                  </p>
                  <p className="text-xs text-emerald-700">
                    Thank you <strong>{formData.name}</strong>. We look forward to seeing you in {event.constituency}!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Wanjiku"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-[var(--color-primary-green)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="07XX XXX XXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-[var(--color-primary-green)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Your Ward</label>
                    <input
                      type="text"
                      placeholder="e.g. Township Ward"
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:border-[var(--color-primary-green)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-deep-green)] transition-all shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
