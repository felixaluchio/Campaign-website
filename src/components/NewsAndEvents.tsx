import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, MapPin, Clock, ChevronRight, Building2, X, CheckCircle2, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { EventItem } from '../data/eventsData';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

export function NewsAndEvents() {
  const [upcomingList, setUpcomingList] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Registration Modal State
  const [selectedRegistrationEvent, setSelectedRegistrationEvent] = useState<EventItem | null>(null);
  const [registrationForm, setRegistrationForm] = useState({ fullName: '', phone: '', ward: '' });
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'upcoming_events'),
        orderBy('createdAt', 'desc'),
        limit(3)
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const events: EventItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              slug: data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || docSnap.id,
              title: data.title || 'Scheduled Rally',
              date: data.date || '',
              category: data.category || 'Town Hall',
              locationName: data.locationName || data.location || 'Kiambu County',
              address: data.address || data.county || 'Kiambu County',
              county: data.county || 'Kiambu County',
              constituency: data.constituency || 'Kiambu',
              ward: data.ward || 'Central Ward',
              description: data.description || '',
              startTime: data.startTime || '10:00 AM',
              endTime: data.endTime || '01:00 PM',
              registrationRequired: data.registrationRequired !== false,
              ...data,
            };
          });
          setUpcomingList(events);
          setIsLoading(false);
        },
        (error) => {
          console.warn('NewsAndEvents upcoming_events listener notice:', error);
          setIsLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Error setting up upcoming_events listener in NewsAndEvents:', err);
      setIsLoading(false);
    }
  }, []);

  const featured = upcomingList;
  
  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationForm.fullName || !registrationForm.phone) return;
    setRegistrationSubmitted(true);
  };
  
  const closeRegistrationModal = () => {
    setSelectedRegistrationEvent(null);
    setRegistrationSubmitted(false);
    setRegistrationForm({ fullName: '', phone: '', ward: '' });
  };
  
  const generateGoogleCalendarUrl = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.locationName}, ${event.address}`);
    const location = encodeURIComponent(`${event.locationName}, ${event.address}, Kiambu County`);
    const cleanDate = event.date.replace(/-/g, '');
    const startTimeClean = "090000";
    const endTimeClean = "120000";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${cleanDate}T${startTimeClean}Z/${cleanDate}T${endTimeClean}Z&details=${details}&location=${location}`;
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-sm font-semibold tracking-wider uppercase text-[var(--color-primary-green)] mb-4">
              JOIN OUR NEXT RALLIES & MOBILIZATION SESSIONS
            </div>
            <h2 className="text-3xl font-bold text-[var(--color-brand-black)]">
              Upcoming Events
            </h2>
          </div>
          <Link 
            to="/events" 
            className="inline-flex items-center gap-2 text-[var(--color-primary-green)] font-bold hover:text-[var(--color-deep-green)] transition-colors mt-4 md:mt-0 group"
          >
            <span>View All Campaign Events</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[var(--color-bg-light)] p-8 rounded-3xl border border-gray-100 animate-pulse space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-20 bg-gray-200 rounded-2xl"></div>
                  <div className="w-24 h-6 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full pt-4"></div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-14 bg-[var(--color-bg-light)] rounded-3xl border border-gray-100 p-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">No Upcoming Events Right Now</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              New community town halls and campaign mobilization sessions will be announced here soon.
            </p>
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm hover:bg-[var(--color-deep-green)] transition-all shadow-sm"
            >
              <span>Join Volunteer Movement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((event) => {
              const dateObj = new Date(event.date);
              const month = isNaN(dateObj.getTime()) ? 'EVT' : dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
              const day = isNaN(dateObj.getDate()) ? '•' : dateObj.getDate().toString();
              const year = isNaN(dateObj.getFullYear()) ? '2026' : dateObj.getFullYear().toString();

              return (
                <div 
                  key={event.id}
                  className="bg-[var(--color-bg-light)] p-8 rounded-3xl border border-gray-100 flex flex-col justify-between hover:border-[var(--color-primary-green)]/30 hover:shadow-xl transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-20 rounded-2xl bg-white border border-gray-200 flex flex-col items-center justify-center p-1 text-center shadow-sm group-hover:bg-[var(--color-primary-green)] group-hover:text-white group-hover:border-transparent transition-all">
                        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">{month}</span>
                        <span className="text-xl font-serif font-bold leading-none my-0.5">{day}</span>
                        <span className="text-[10px] font-bold opacity-80">{year}</span>
                      </div>
                      <span className="px-3 py-1.5 rounded-full bg-white text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        {event.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-3 group-hover:text-[var(--color-primary-green)] transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 mb-6 pt-4 border-t border-gray-200/60 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[var(--color-campaign-red)] shrink-0" />
                        <span className="truncate">{event.locationName || event.location || 'Kiambu County'}, {event.constituency || 'Kiambu'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col items-center">
                    <p className="italic text-xs text-gray-500 mb-3 text-center">Required for non-members</p>
                    <button
                      onClick={() => setSelectedRegistrationEvent(event)}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm hover:bg-[var(--color-deep-green)] transition-all group/btn shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>Register as a Member</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive Registration Modal */}
      <AnimatePresence>
        {selectedRegistrationEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeRegistrationModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>

              {registrationSubmitted ? (
                /* Success State */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-black)]">
                    Registration Confirmed!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{registrationForm.fullName}</strong>. Your attendance for <strong>{selectedRegistrationEvent.title}</strong> on <strong>{selectedRegistrationEvent.date}</strong> has been registered.
                  </p>
                  
                  <div className="bg-[var(--color-bg-light)] p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 text-left space-y-1 my-4">
                    <p className="font-bold text-gray-800">Event Details:</p>
                    <p>📍 {selectedRegistrationEvent.locationName}, {selectedRegistrationEvent.address}</p>
                    <p>🕒 {selectedRegistrationEvent.startTime} EAT</p>
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href={generateGoogleCalendarUrl(selectedRegistrationEvent)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm block hover:bg-[var(--color-deep-green)] transition-all shadow-sm text-center"
                    >
                      Add Event to Google Calendar
                    </a>
                    <button
                      onClick={closeRegistrationModal}
                      className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                /* Registration Form State */
                <div>
                  <span className="px-3 py-1 rounded-full bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-[10px] font-bold uppercase tracking-wider inline-block mb-3 border border-gray-100">
                    EVENT REGISTRATION
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-black)] mb-2 pr-6 leading-tight">
                    Register for {selectedRegistrationEvent.title}
                  </h3>
                  <div className="text-xs text-gray-500 space-y-1 mb-6 pb-4 border-b border-gray-100">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-primary-green)]" />
                      <span>{selectedRegistrationEvent.date} at {selectedRegistrationEvent.startTime}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[var(--color-campaign-red)]" />
                      <span>{selectedRegistrationEvent.locationName}, {selectedRegistrationEvent.constituency}</span>
                    </p>
                  </div>

                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jane Wanjiku"
                          value={registrationForm.fullName}
                          onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-primary-green)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Phone Number / WhatsApp *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          required
                          placeholder="07XX XXX XXX"
                          value={registrationForm.phone}
                          onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-primary-green)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Constituency / Ward
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="e.g. Ruiru, Gatongora"
                          value={registrationForm.ward}
                          onChange={(e) => setRegistrationForm({ ...registrationForm, ward: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-primary-green)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 mt-2 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm hover:bg-[var(--color-deep-green)] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/submit"
                    >
                      Complete Registration
                      <ArrowRight className="w-4 h-4 group-hover/submit:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
