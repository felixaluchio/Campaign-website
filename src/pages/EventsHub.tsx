import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, Clock, MapPin, 
  ArrowRight, CheckCircle2, X, Sparkles, User, Phone, Home, ChevronRight, CalendarPlus,
  Play, Loader2, ExternalLink
} from 'lucide-react';
import { EventItem, VideoItem } from '../data/eventsData';
import { db } from '../config/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

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

  // 1. Fetch Past Events (events collection)
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'events'),
        orderBy('createdAt', 'desc')
      );

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

          setFetchedPastEvents(mappedDocs);
          setIsLoadingPast(false);
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

  // 2. Fetch Upcoming Events (upcoming_events collection)
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'upcoming_events'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const mappedDocs: EventItem[] = snapshot.docs.map((docSnap) => {
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

          setFetchedUpcomingEvents(mappedDocs);
          setIsLoadingUpcoming(false);
        },
        (error) => {
          console.warn('Firestore upcoming_events subscription notice:', error);
          setIsLoadingUpcoming(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Error setting up upcoming_events listener:', err);
      setIsLoadingUpcoming(false);
    }
  }, []);

  // 3. Fetch Videos (videos collection)
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'videos'),
        orderBy('createdAt', 'desc')
      );

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

          setFetchedVideos(mappedDocs);
          setIsLoadingVideos(false);
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

  // Helper to format Date for Badge
  const getParsedDate = (dateStr?: string) => {
    if (!dateStr) return { month: 'TBD', day: '--' };
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        return { month: 'EVT', day: '•' };
      }
      const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = dateObj.getDate();
      return { month: isNaN(day) ? 'EVT' : month, day: isNaN(day) ? '•' : day };
    } catch (e) {
      return { month: 'EVT', day: '•' };
    }
  };

  // Helper for Google Calendar Link Generation
  const generateGoogleCalendarUrl = (event: EventItem) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.locationName}, ${event.address}`);
    const location = encodeURIComponent(`${event.locationName}, ${event.address}, Kiambu County`);
    
    // Construct ISO dates
    const cleanDate = (event.date || '').replace(/-/g, '');
    const startTimeClean = "090000"; // Default start
    const endTimeClean = "120000";   // Default end
    const dates = `${cleanDate}T${startTimeClean}/${cleanDate}T${endTimeClean}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

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

  return (
    <div className="bg-[var(--color-bg-light)] min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider mb-4 border border-gray-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            CAMPAIGN SCHEDULE
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
            Campaign Events & Town Halls
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Meet Wakili Phyllis Wangui across Kiambu. Join our upcoming town halls, community forums, women & youth rallies, and ward-level engagements.
          </p>
        </div>

        {/* Sub-Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white p-1.5 rounded-full shadow-sm border border-gray-200 overflow-x-auto max-w-full scrollbar-none">
            {(["Upcoming Events", "Past Events", "Video Library"] as SubTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-[var(--color-primary-green)] text-white shadow'
                    : 'text-gray-600 hover:text-[var(--color-primary-green)] hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "Upcoming Events" && (
            <motion.div
              key="upcoming-events-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLoadingUpcoming ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-3xl border border-gray-100 p-6 animate-pulse space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                        <div className="w-24 h-6 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="h-6 bg-gray-100 rounded-lg w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      </div>
                      <div className="h-12 bg-gray-100 rounded-xl w-full pt-4"></div>
                    </div>
                  ))}
                </div>
              ) : fetchedUpcomingEvents.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">No Upcoming Events Scheduled</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    New campaign rallies, town halls, and mobilization drives will appear here once scheduled by the campaign secretariat.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fetchedUpcomingEvents.map((event) => {
                    const { month, day } = getParsedDate(event.date);

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[var(--color-primary-green)]/30 transition-all group"
                      >
                        <div>
                          {/* Top Row: Date Badge & Event Type Tag */}
                          <div className="flex items-start justify-between gap-4 mb-6">
                            {/* Vertical Date Badge */}
                            <div className="w-16 h-18 rounded-2xl bg-[var(--color-bg-light)] border border-gray-200/80 flex flex-col items-center justify-center p-2 shrink-0 group-hover:bg-[var(--color-primary-green)] group-hover:text-white group-hover:border-transparent transition-all">
                              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                                {month}
                              </span>
                              <span className="text-2xl font-serif font-bold leading-none mt-0.5">
                                {day}
                              </span>
                            </div>

                            {/* Event Type Tag */}
                            <span className="px-3.5 py-1.5 rounded-full bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider border border-gray-100">
                              {event.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-3 group-hover:text-[var(--color-primary-green)] transition-colors leading-snug">
                            {event.title}
                          </h3>

                          {/* Brief Agenda / Description */}
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                            {event.description}
                          </p>

                          {/* Meta Info list */}
                          <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs font-medium text-gray-600 mb-6">
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-[var(--color-campaign-red)] shrink-0 mt-0.5" />
                              <span className="leading-tight">
                                <strong className="text-gray-800 font-semibold">{event.locationName || event.location || 'Kiambu County'}</strong>
                                {(event.address || event.county) && (
                                  <span className="block text-gray-500 font-normal">{event.address || event.county}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="space-y-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => setSelectedRegistrationEvent(event)}
                            className="w-full py-3 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm hover:bg-[var(--color-deep-green)] transition-all shadow-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
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
            </motion.div>
          )}

          {activeTab === "Past Events" && (
            <motion.div
              key="past-events-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLoadingPast ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-3xl border border-gray-100 p-6 animate-pulse space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl"></div>
                        <div className="w-24 h-6 bg-gray-100 rounded-full"></div>
                      </div>
                      <div className="h-6 bg-gray-100 rounded-lg w-3/4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-full"></div>
                        <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      </div>
                      <div className="h-12 bg-gray-100 rounded-xl w-full pt-4"></div>
                    </div>
                  ))}
                </div>
              ) : fetchedPastEvents.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">No Past Events Found</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    No past events recorded in the database yet. Added event recaps will appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fetchedPastEvents.map((event) => {
                    const { month, day } = getParsedDate(event.date);

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-between hover:shadow-xl hover:border-[var(--color-primary-green)]/30 transition-all group"
                      >
                        <div>
                          {/* Top Row: Date Badge & Event Type Tag */}
                          <div className="flex items-start justify-between gap-4 mb-6">
                            {/* Vertical Date Badge */}
                            <div className="w-16 h-18 rounded-2xl bg-[var(--color-bg-light)] border border-gray-200/80 flex flex-col items-center justify-center p-2 shrink-0 group-hover:bg-[var(--color-primary-green)] group-hover:text-white group-hover:border-transparent transition-all">
                              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                                {month}
                              </span>
                              <span className="text-2xl font-serif font-bold leading-none mt-0.5">
                                {day}
                              </span>
                            </div>

                            {/* Event Type Tag */}
                            <span className="px-3.5 py-1.5 rounded-full bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider border border-gray-100">
                              {event.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-3 group-hover:text-[var(--color-primary-green)] transition-colors leading-snug">
                            {event.title}
                          </h3>

                          {/* Brief Agenda / Description */}
                          <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                            {event.description}
                          </p>
                          
                          {/* Highlights */}
                          {event.recapHighlights && event.recapHighlights.length > 0 && (
                            <ul className="text-xs text-gray-500 space-y-1 mb-6 pl-4 list-disc marker:text-[var(--color-primary-green)]">
                              {event.recapHighlights.slice(0, 2).map((highlight: string, idx: number) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          )}

                          {/* Meta Info list */}
                          <div className="space-y-2.5 pt-4 border-t border-gray-100 text-xs font-medium text-gray-600 mb-6">
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-[var(--color-campaign-red)] shrink-0 mt-0.5" />
                              <span className="leading-tight">
                                <strong className="text-gray-800 font-semibold">{event.locationName || event.location || 'Kiambu County'}</strong>
                                {event.address && event.address !== (event.locationName || event.location) && (
                                  <span className="block text-gray-500 font-normal">{event.address}</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="space-y-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => setSelectedPastEvent(event)}
                            className="w-full py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-center rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
                          >
                            <span>View Recap & Highlights</span>
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "Video Library" && (
            <motion.div
              key="video-library-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {isLoadingVideos ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse space-y-4">
                      <div className="aspect-video bg-gray-200 w-full"></div>
                      <div className="p-5 space-y-3">
                        <div className="flex justify-between">
                          <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
                          <div className="w-16 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : fetchedVideos.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8">
                  <Play className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-2">No Videos Available</h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    New campaign videos, speeches, and interviews will appear here once added in the Admin Dashboard.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {fetchedVideos.map(video => (
                    <div 
                      key={video.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer flex flex-col"
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform shadow-lg">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                          {video.duration || 'Watch'}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 justify-between mb-3">
                          <span className="px-2.5 py-1 bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-[10px] font-bold uppercase tracking-wider rounded-full border border-gray-100">
                            {video.category}
                          </span>
                          <span className="text-xs text-gray-400 font-medium">
                            {video.date && !isNaN(new Date(video.date).getTime())
                              ? new Date(video.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : video.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-serif font-bold text-[var(--color-brand-black)] leading-snug mb-2 group-hover:text-[var(--color-primary-green)] transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-auto flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-primary-green)]" />
                          {video.venueOrPlatform || 'YouTube Campaign Archive'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
                    {/* Full Name */}
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

                    {/* Phone Number / WhatsApp */}
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

                    {/* Ward / Sub-County */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Your Ward / Sub-County
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="e.g. Township Ward, Kiambu Town"
                          value={registrationForm.ward}
                          onChange={(e) => setRegistrationForm({ ...registrationForm, ward: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-primary-green)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-[var(--color-primary-green)] text-white font-bold text-sm hover:bg-[var(--color-deep-green)] transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Complete Registration</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Past Event Recap & Photo Gallery Modal */}
      <AnimatePresence>
        {selectedPastEvent && (
          <div 
            onClick={() => setSelectedPastEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-5 md:px-8 border-b border-gray-100 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-[var(--color-primary-green)] block mb-1">
                    Event Recap & Highlights
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 truncate">
                    {selectedPastEvent.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPastEvent(null)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="overflow-y-auto p-6 md:p-8 space-y-8">
                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-[var(--color-primary-green)] border border-emerald-100">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPastEvent.date && !isNaN(new Date(selectedPastEvent.date).getTime())
                      ? new Date(selectedPastEvent.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : (selectedPastEvent.date || 'Campaign Event Date')}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-[var(--color-campaign-red)] border border-red-100">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedPastEvent.location || selectedPastEvent.locationName || 'Kiambu County'}{selectedPastEvent.constituency ? `, ${selectedPastEvent.constituency}` : ''}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                    {selectedPastEvent.category || 'Community Forum'}
                  </span>
                </div>

                {/* Summary Section */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Executive Summary & Outcomes
                  </h3>
                  <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-sm md:text-base">
                    {selectedPastEvent.description}
                  </p>
                </div>

                {/* Key Recap Highlights (if available) */}
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

                {/* Photo Gallery Grid */}
                {(() => {
                  const eventImages: string[] = (selectedPastEvent.imageUrls && selectedPastEvent.imageUrls.length > 0)
                    ? selectedPastEvent.imageUrls
                    : ((selectedPastEvent.photos && selectedPastEvent.photos.length > 0)
                      ? selectedPastEvent.photos
                      : ((selectedPastEvent.images && selectedPastEvent.images.length > 0)
                        ? selectedPastEvent.images
                        : (selectedPastEvent.imageUrl ? [selectedPastEvent.imageUrl] : [])));

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
                          <div key={idx} className="relative group overflow-hidden rounded-xl bg-gray-100 shadow-sm aspect-4/3">
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

              {/* Modal Footer */}
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
                      ? new Date(selectedVideo.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
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