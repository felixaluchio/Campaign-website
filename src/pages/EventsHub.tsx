import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, MapPin, 
  ArrowRight, CheckCircle2, X, Sparkles, User, Phone, Home, ChevronRight, CalendarPlus,
  Play, Loader2, ExternalLink
} from 'lucide-react';
import { EventItem, VideoItem } from '../data/eventsData';
import { db } from '../config/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

type SubTab = "Upcoming Events" | "Past Events" | "Video Library";

export function EventsHub() {
  const [activeTab, setActiveTab] = useState<SubTab>("Upcoming Events");

  // Live Firestore State
  const [fetchedPastEvents, setFetchedPastEvents] = useState<any[]>([]);
  const [fetchedUpcomingEvents, setFetchedUpcomingEvents] = useState<EventItem[]>([]);
  const [fetchedVideos, setFetchedVideos] = useState<VideoItem[]>([]);

  const [isLoadingPast, setIsLoadingPast] = useState<boolean>(true);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState<boolean>(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(true);

  // Registration Modal State
  const [selectedRegistrationEvent, setSelectedRegistrationEvent] = useState<EventItem | null>(null);
  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    phone: '',
    ward: '',
  });
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);

  // Past Event Recap Modal State
  const [selectedPastEvent, setSelectedPastEvent] = useState<any | null>(null);

  // Video Player Modal State
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // 1. Fetch Past Events (events collection) - FIXED: Removed orderBy
  useEffect(() => {
    try {
      const q = query(collection(db, 'events'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const mappedDocs = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            const rawUrls = Array.isArray(data.imageUrls) && data.imageUrls.length > 0
              ? data.imageUrls
              : (Array.isArray(data.photos) && data.photos.length > 0
                ? data.photos
                : (Array.isArray(data.images) && data.images.length > 0
                  ? data.images
                  : (data.imageUrl ? [data.imageUrl] : [])));

            return {
              id: docSnap.id,
              title: data.title || 'Campaign Event',
              date: data.date || '',
              category: data.category || 'Community Event',
              location: data.location || data.locationName || 'Kiambu County',
              locationName: data.locationName || data.location || 'Kiambu County',
              address: data.address || data.location || 'Kiambu County',
              description: data.description || '',
              imageUrl: data.imageUrl || (rawUrls.length > 0 ? rawUrls[0] : ''),
              imageUrls: rawUrls,
              photos: rawUrls,
              recapHighlights: data.recapHighlights || [],
              ...data,
            };
          });

          // Sort by date descending on client side
          mappedDocs.sort((a, b) => {
            const dateA = new Date(a.date || '').getTime();
            const dateB = new Date(b.date || '').getTime();
            return dateB - dateA;
          });

          setFetchedPastEvents(mappedDocs);
          setIsLoadingPast(false);
          console.log('✅ Past events loaded:', mappedDocs.length, mappedDocs);
        },
        (error) => {
          console.warn('Firestore events real-time subscription notice:', error);
          setIsLoadingPast(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Error setting up events collection listener:', err);
      setIsLoadingPast(false);
    }
  }, []);

  // 2. Fetch Upcoming Events (upcoming_events collection) - FIXED: Removed orderBy
  useEffect(() => {
    try {
      const q = query(collection(db, 'upcoming_events'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          console.log('📡 upcoming_events snapshot received, docs:', snapshot.docs.length);

          const mappedDocs: EventItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            console.log('📦 Processing upcoming event:', data.title, data);
            
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

          // Sort by date descending on client side
          mappedDocs.sort((a, b) => {
            const dateA = new Date(a.date || '').getTime();
            const dateB = new Date(b.date || '').getTime();
            return dateB - dateA;
          });

          console.log('✅ Upcoming events loaded:', mappedDocs.length, mappedDocs);
          setFetchedUpcomingEvents(mappedDocs);
          setIsLoadingUpcoming(false);
        },
        (error) => {
          console.error('❌ Firestore upcoming_events error:', error);
          setIsLoadingUpcoming(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('❌ Error setting up upcoming_events listener:', err);
      setIsLoadingUpcoming(false);
    }
  }, []);

  // 3. Fetch Videos (videos collection) - FIXED: Removed orderBy
  useEffect(() => {
    try {
      const q = query(collection(db, 'videos'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const mappedDocs: VideoItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            const yId = data.youtubeId || (data.youtubeUrl ? (data.youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)?.[1] || '') : '');
            return {
              id: docSnap.id,
              title: data.title || 'Campaign Video',
              description: data.description || '',
              category: data.category || 'Speech',
              date: data.date || new Date().toISOString().split('T')[0],
              duration: data.duration || 'Video',
              venueOrPlatform: data.venueOrPlatform || 'YouTube',
              thumbnail: data.thumbnail || (yId ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80'),
              youtubeId: yId,
              youtubeUrl: data.youtubeUrl || '',
              ...data,
            };
          });

          // Sort by date descending on client side
          mappedDocs.sort((a, b) => {
            const dateA = new Date(a.date || '').getTime();
            const dateB = new Date(b.date || '').getTime();
            return dateB - dateA;
          });

          setFetchedVideos(mappedDocs);
          setIsLoadingVideos(false);
          console.log('✅ Videos loaded:', mappedDocs.length);
        },
        (error) => {
          console.warn('Firestore videos subscription notice:', error);
          setIsLoadingVideos(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Error setting up videos listener:', err);
      setIsLoadingVideos(false);
    }
  }, []);

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

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Upcoming Events":
        return renderUpcomingEvents();
      case "Past Events":
        return renderPastEvents();
      case "Video Library":
        return renderVideos();
      default:
        return renderUpcomingEvents();
    }
  };

  const renderUpcomingEvents = () => {
    if (isLoadingUpcoming) {
      return (
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
      );
    }

    if (fetchedUpcomingEvents.length === 0) {
      return (
        <div className="text-center py-14 bg-[var(--color-bg-light)] rounded-3xl border border-gray-100 p-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">
            No Upcoming Events Right Now
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            New community town halls and campaign mobilization sessions will be announced here soon.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="upcoming-events">
        {fetchedUpcomingEvents.map((event, idx) => {
          const dateObj = new Date(event.date);
          const month = isNaN(dateObj.getTime()) ? 'EVT' : dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
          const day = isNaN(dateObj.getDate()) ? '•' : dateObj.getDate().toString();
          const year = isNaN(dateObj.getFullYear()) ? '2026' : dateObj.getFullYear().toString();

          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
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
                    <span className="truncate">
                      {event.locationName || event.location || 'Kiambu County'}, {event.constituency || 'Kiambu'}
                    </span>
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
            </motion.div>
          );
        })}
      </div>
    );
  };

  const renderPastEvents = () => {
    if (isLoadingPast) {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-100 rounded-3xl animate-pulse h-80"></div>
          ))}
        </div>
      );
    }

    if (fetchedPastEvents.length === 0) {
      return (
        <div className="text-center py-14 bg-[var(--color-bg-light)] rounded-3xl border border-gray-100 p-8">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">
            No Past Events Yet
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Event recaps and photo galleries will appear here after campaigns are completed.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 gap-8">
        {fetchedPastEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedPastEvent(event)}
            className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-[var(--color-primary-green)]/30 hover:shadow-xl transition-all"
          >
            <div className="relative overflow-hidden h-64 bg-gray-200">
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-500" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-serif font-bold text-[var(--color-brand-black)] mb-2 group-hover:text-[var(--color-primary-green)] transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
              <button className="inline-flex items-center gap-2 text-[var(--color-primary-green)] font-bold text-sm hover:gap-3 transition-all">
                <span>View Recap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderVideos = () => {
    if (isLoadingVideos) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-100 rounded-3xl animate-pulse h-64"></div>
          ))}
        </div>
      );
    }

    if (fetchedVideos.length === 0) {
      return (
        <div className="text-center py-14 bg-[var(--color-bg-light)] rounded-3xl border border-gray-100 p-8">
          <Play className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">
            No Videos Yet
          </h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Campaign speeches, town hall recordings, and community highlights will be uploaded here.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fetchedVideos.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => setSelectedVideo(video)}
            className="group cursor-pointer relative overflow-hidden rounded-3xl bg-black h-64 border border-gray-800 hover:border-[var(--color-primary-green)]/50 transition-all"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white group-hover:scale-125 transition-transform" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              <h3 className="text-sm font-bold text-white line-clamp-2 group-hover:text-[var(--color-primary-green)] transition-colors">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-[var(--color-brand-black)] py-20 border-b border-gray-100 relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-noise-pattern opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-gray-300">CAMPAIGN SCHEDULE</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Campaign Events & Town Halls
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Meet Wakili Phyllis Wangui across Kiambu. Join our upcoming town halls, community forums, women & youth rallies, and ward-level engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex-1">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-16 bg-white p-2 rounded-full border border-gray-200 w-fit">
          {(["Upcoming Events", "Past Events", "Video Library"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[var(--color-primary-green)] text-white shadow-lg"
                  : "bg-transparent text-gray-700 hover:text-[var(--color-primary-green)]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {selectedRegistrationEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={closeRegistrationModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>

              {registrationSubmitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-black)]">
                    Registration Confirmed!
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>{registrationForm.fullName}</strong>. Your attendance for{' '}
                    <strong>{selectedRegistrationEvent.title}</strong> on{' '}
                    <strong>{selectedRegistrationEvent.date}</strong> has been registered.
                  </p>
                  <div className="bg-[var(--color-bg-light)] p-4 rounded-2xl border border-gray-200 text-xs text-gray-600 text-left space-y-1 my-4">
                    <p className="font-bold text-gray-800">Event Details:</p>
                    <p>📍 {selectedRegistrationEvent.locationName}, {selectedRegistrationEvent.address}</p>
                    <p>🕒 {selectedRegistrationEvent.startTime} EAT</p>
                  </div>
                  <button
                    onClick={closeRegistrationModal}
                    className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 transition-all"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
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
                      <span>
                        {selectedRegistrationEvent.locationName}, {selectedRegistrationEvent.constituency}
                      </span>
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
                          onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, fullName: e.target.value })
                          }
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
                          onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, phone: e.target.value })
                          }
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
                          onChange={(e) =>
                            setRegistrationForm({ ...registrationForm, ward: e.target.value })
                          }
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

      {/* Past Event Recap Modal */}
      <AnimatePresence>
        {selectedPastEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100"
            >
              <div className="p-4 md:px-8 md:py-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between sticky top-0">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[var(--color-soft-bg)] text-[var(--color-primary-green)] text-[10px] font-bold uppercase tracking-wider inline-block border border-gray-100 mb-2">
                    EVENT RECAP
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--color-brand-black)]">
                    {selectedPastEvent.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedPastEvent(null)}
                  className="text-gray-400 hover:text-gray-700 p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 md:px-8 md:py-6 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Event Details</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-1">DATE</p>
                      <p className="font-bold text-gray-900">{selectedPastEvent.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-1">LOCATION</p>
                      <p className="font-bold text-gray-900">{selectedPastEvent.locationName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-1">CATEGORY</p>
                      <p className="font-bold text-gray-900">{selectedPastEvent.category}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">About This Event</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedPastEvent.description}</p>
                </div>

                {selectedPastEvent.recapHighlights && selectedPastEvent.recapHighlights.length > 0 && (
                  <div className="bg-[var(--color-bg-light)] p-5 md:p-6 rounded-2xl border border-gray-200/80 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--color-primary-green)]" />
                      <span>Key Highlights & Community Resolutions</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {selectedPastEvent.recapHighlights.map((highlight: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-primary-green)] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(() => {
                  const eventImages: string[] =
                    selectedPastEvent.imageUrls && selectedPastEvent.imageUrls.length > 0
                      ? selectedPastEvent.imageUrls
                      : selectedPastEvent.photos && selectedPastEvent.photos.length > 0
                        ? selectedPastEvent.photos
                        : selectedPastEvent.images && selectedPastEvent.images.length > 0
                          ? selectedPastEvent.images
                          : selectedPastEvent.imageUrl
                            ? [selectedPastEvent.imageUrl]
                            : [];

                  if (eventImages.length === 0) return null;

                  return (
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Event Photo Gallery ({eventImages.length})
                        </h3>
                        <span className="text-xs text-slate-400 font-medium">
                          {eventImages.length} {eventImages.length === 1 ? 'Highlight Captured' : 'Highlights Captured'}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {eventImages.map((imgUrl: string, idx: number) => (
                          <div
                            key={idx}
                            className="relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm aspect-4/3"
                          >
                            <img
                              src={imgUrl}
                              alt={`${selectedPastEvent.title} highlight ${idx + 1}`}
                              className="w-full h-full object-cover rounded-xl shadow-sm hover:opacity-95 hover:scale-105 transition-all duration-300 cursor-pointer"
                              loading="lazy"
                              onClick={() => window.open(imgUrl, '_blank')}
                            />
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Photo {idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="p-4 md:px-8 md:py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedPastEvent(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Recap
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-black rounded-3xl w-full max-w-5xl relative overflow-hidden shadow-2xl border border-gray-800"
            >
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/70 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video bg-black flex items-center justify-center relative">
                {selectedVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : selectedVideo.youtubeUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-950">
                    <Play className="w-16 h-16 text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-4">{selectedVideo.title}</h3>
                    <a
                      href={selectedVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
                    >
                      <span>Watch on YouTube</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                      <Play className="w-16 h-16 mb-4 text-emerald-400" />
                      <h3 className="text-2xl font-serif max-w-2xl font-bold">{selectedVideo.title}</h3>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 md:p-8 bg-gray-900 border-t border-gray-800 flex flex-col md:flex-row gap-6 justify-between items-start">
                <div className="max-w-2xl">
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">{selectedVideo.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedVideo.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 items-start sm:items-center md:items-end">
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-full border border-gray-700 text-center">
                    {selectedVideo.category}
                  </span>
                  <span className="text-gray-500 text-xs font-medium text-center">
                    {selectedVideo.date && !isNaN(new Date(selectedVideo.date).getTime())
                      ? new Date(selectedVideo.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : selectedVideo.date}
                  </span>
                  {(selectedVideo.youtubeUrl || selectedVideo.youtubeId) && (
                    <a
                      href={selectedVideo.youtubeUrl || `https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold hover:underline mt-1"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}