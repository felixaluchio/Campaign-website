import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Video, 
  Calendar, 
  Database, 
  Upload, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Eye, 
  EyeOff,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  LogOut,
  AlertCircle,
  ArrowRight,
  X,
  FileImage,
  RefreshCw,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { EventItem, VideoItem, PhotoGalleryItem } from '../data/eventsData';
import { db } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  doc, 
  setDoc,
  getDocs,
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

type ModuleTab = 'photo-gallery' | 'video-library' | 'upcoming-events' | 'issues';

export interface AdminCommunityIssue {
  id: string;
  issueCode: string;
  location: string;
  title: string;
  description: string;
  status: string;
  createdAt?: any;
}

export function AdminDashboard() {
  // Authentication State Management
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<ModuleTab>('photo-gallery');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handle Admin Login submission with Firebase Authentication
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    const cleanUser = loginUsername.trim();
    const cleanPass = loginPassword.trim();

    if (!cleanUser || !cleanPass) {
      setLoginError('Please enter both username and password.');
      setIsLoggingIn(false);
      return;
    }

    try {
      const auth = getAuth();
      // This explicitly checks the Firebase Authentication Users tab
      await signInWithEmailAndPassword(auth, cleanUser, cleanPass);
      
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAdminLoggedIn(true);
      setToastMessage('Authenticated successfully');
    } catch (err: any) {
      console.error('Error authenticating admin:', err);
      
      // Handle specific Firebase Auth error codes
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setLoginError('Invalid admin credentials. Please verify your email and password.');
      } else if (err.code === 'auth/too-many-requests') {
        setLoginError('Too many failed login attempts. Please try again later.');
      } else {
        setLoginError(err.message || 'Authentication error. Please check your network connectivity.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAdminLoggedIn(false);
    setLoginUsername('');
    setLoginPassword('');
    setLoginError(null);
  };

  // Module 1 State: Photo Gallery (Live Firestore Feed from 'events')
  const [photoList, setPhotoList] = useState<PhotoGalleryItem[]>([]);
  const [photoForm, setPhotoForm] = useState({
    title: '',
    date: '',
    location: '',
    category: 'Rally',
    description: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Module 2 State: Video Library (Live Firestore Feed from 'videos')
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [isVideoSubmitting, setIsVideoSubmitting] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Keynote Speech',
    date: '',
    youtubeUrl: '',
    summary: ''
  });

  // Module 3 State: Upcoming Events (Live Firestore Feed from 'upcoming_events')
  const [eventList, setEventList] = useState<EventItem[]>([]);
  const [isEventSubmitting, setIsEventSubmitting] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    location: '',
    county: 'Kiambu County',
    category: 'Town Hall',
    description: ''
  });

  // Module 4 State: Community Issues (Live Firestore Feed from 'community_issues')
  const [adminIssues, setAdminIssues] = useState<AdminCommunityIssue[]>([]);

  // Table Search Queries & Deletion Loading
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  // Real-time listener for events (Photo Gallery & Past Campaign Events)
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'events'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const items: PhotoGalleryItem[] = querySnapshot.docs.map((docSnap) => {
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
              location: data.location || data.locationName || 'Kiambu County',
              category: data.category || 'Rally',
              photosCount: rawUrls.length,
              description: data.description || '',
              imageUrl: data.imageUrl || (rawUrls.length > 0 ? rawUrls[0] : ''),
              imageUrls: rawUrls,
              photos: rawUrls,
              photoNames: data.photoNames || (rawUrls.length > 0 ? rawUrls.map((_, i) => `photo_${i + 1}.jpg`) : []),
              ...data,
            };
          });
          setPhotoList(items);
        },
        (error) => {
          console.warn('Admin events listener notice:', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Unable to subscribe to events collection:', err);
    }
  }, []);

  // Real-time listener for videos collection
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'videos'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const mappedVideos: VideoItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || 'Campaign Video',
              date: data.date || '',
              category: data.category || 'Keynote Speech',
              duration: data.duration || '15:00',
              thumbnail: data.thumbnail || (data.youtubeId ? `https://img.youtube.com/vi/${data.youtubeId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop'),
              youtubeId: data.youtubeId || '',
              youtubeUrl: data.youtubeUrl || '',
              description: data.description || '',
              venueOrPlatform: data.venueOrPlatform || 'Kiambu Sub-County',
              createdAt: data.createdAt,
              ...data,
            };
          });
          setVideoList(mappedVideos);
        },
        (error) => {
          console.warn('Admin videos listener notice:', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Unable to subscribe to videos collection:', err);
    }
  }, []);

  // Real-time listener for upcoming_events collection
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'upcoming_events'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const mappedEvents: EventItem[] = snapshot.docs.map((docSnap) => {
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
              createdAt: data.createdAt,
              ...data,
            };
          });
          setEventList(mappedEvents);
        },
        (error) => {
          console.warn('Admin upcoming_events listener notice:', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Unable to subscribe to upcoming_events collection:', err);
    }
  }, []);

  // Real-time listener for community_issues
  useEffect(() => {
    try {
      const issuesQuery = query(
        collection(db, 'community_issues'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        issuesQuery,
        (snapshot) => {
          const mapped: AdminCommunityIssue[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              issueCode: data.issueCode || `ISS-${docSnap.id.substring(0, 4).toUpperCase()}`,
              location: data.location || 'Kiambu County',
              title: data.title || '',
              description: data.description || '',
              status: data.status || 'UNDER REVIEW',
              createdAt: data.createdAt,
            };
          });
          setAdminIssues(mapped);
        },
        (error) => {
          console.warn('Admin issues listener notice:', error);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Unable to subscribe to community_issues:', err);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Generic & Direct Firestore Delete Function (No blocking window.confirm/alert)
  const handleDeleteItem = async (collectionName: string, id: string) => {
    if (!id) {
      console.error("Deletion aborted: Missing document ID");
      triggerToast("Deletion failed: Missing document ID");
      return;
    }

    setDeletingIds((prev) => [...prev, id]);

    try {
      await deleteDoc(doc(db, collectionName, id));

      // Update local state immediately
      if (collectionName === 'events') {
        setPhotoList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'videos') {
        setVideoList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'upcoming_events') {
        setEventList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'community_issues') {
        setAdminIssues((prev) => prev.filter((item) => item.id !== id));
      }

      triggerToast("Item deleted successfully.");
    } catch (error: any) {
      console.error("Error deleting document: ", error);
      // Remove from local state even if document wasn't in Firestore
      if (collectionName === 'events') {
        setPhotoList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'videos') {
        setVideoList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'upcoming_events') {
        setEventList((prev) => prev.filter((item) => item.id !== id));
      } else if (collectionName === 'community_issues') {
        setAdminIssues((prev) => prev.filter((item) => item.id !== id));
      }
      triggerToast("Item removed.");
    } finally {
      setDeletingIds((prev) => prev.filter((item) => item !== id));
    }
  };


  const updateIssueStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'community_issues', id), {
        status: newStatus,
      });
      setAdminIssues((prev) =>
        prev.map((iss) => (iss.id === id ? { ...iss, status: newStatus } : iss))
      );
      triggerToast(`Status updated to ${newStatus}`);
    } catch (error: any) {
      console.error('Error updating issue status:', error);
      triggerToast(`Update failed: ${error.message || 'Error occurred'}`);
    }
  };

  // Handlers
  const handlePhotoGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.title || !photoForm.date || !photoForm.description) return;

    setIsSubmitting(true);
    setUploadProgress('');
    try {
      const imageUrls: string[] = [];
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

      // Batch upload loop for all selected files using for...of
      for (const file of selectedFiles) {
        setUploadProgress(`Uploading ${file.name}... (${imageUrls.length + 1}/${selectedFiles.length})`);
        const formData = new FormData();
        formData.append('image', file);

        try {
          const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          if (data?.success && data?.data?.url) {
            imageUrls.push(data.data.url);
          } else if (data?.data?.url) {
            imageUrls.push(data.data.url);
          }
        } catch (uploadErr) {
          console.error(`Failed to upload ${file.name} to ImgBB:`, uploadErr);
        }
      }

      const defaultPlaceholder = 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80';
      const primaryImageUrl = imageUrls.length > 0 ? imageUrls[0] : defaultPlaceholder;

      // Save to Firestore with the full array and serverTimestamp
      const payload = {
        title: photoForm.title,
        date: photoForm.date,
        location: photoForm.location || 'Kiambu County',
        locationName: photoForm.location || 'Kiambu County',
        category: photoForm.category || 'Campaign Event',
        description: photoForm.description,
        imageUrl: primaryImageUrl,
        imageUrls: imageUrls,
        photos: imageUrls,
        photoNames: selectedFiles.map((f) => f.name),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'events'), payload);

      // Add to local state for immediate feedback
      const newItem: PhotoGalleryItem = {
        id: docRef.id || `photo-${Date.now()}`,
        title: photoForm.title,
        date: photoForm.date,
        location: photoForm.location || 'Kiambu County',
        locationName: photoForm.location || 'Kiambu County',
        category: photoForm.category || 'Campaign Event',
        photosCount: imageUrls.length > 0 ? imageUrls.length : (selectedFiles.length > 0 ? selectedFiles.length : 1),
        description: photoForm.description,
        imageUrl: primaryImageUrl,
        imageUrls: imageUrls,
        photos: imageUrls,
        photoNames: selectedFiles.map((f) => f.name),
      };

      setPhotoList([newItem, ...photoList]);

      // Reset form and file state
      setPhotoForm({
        title: '',
        date: '',
        location: '',
        category: 'Rally',
        description: ''
      });
      setSelectedFiles([]);
      setUploadProgress('');

      triggerToast(
        imageUrls.length > 0
          ? `Event & ${imageUrls.length} photo(s) successfully uploaded and saved!`
          : 'Event successfully published to Photo Gallery & Past Events!'
      );
    } catch (error: any) {
      console.error('Hybrid upload error:', error);
      triggerToast(`Upload error: ${error.message || 'Failed to complete upload'}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
    }
  };

  const handleDeletePhoto = (id: string) => {
    handleDeleteItem('events', id);
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.date || !videoForm.youtubeUrl) return;

    setIsVideoSubmitting(true);

    try {
      // Extract youtube ID if possible
      let ytid = '';
      const url = videoForm.youtubeUrl.trim();
      if (url.includes('v=')) {
        ytid = url.split('v=')[1]?.split('&')[0] || '';
      } else if (url.includes('youtu.be/')) {
        ytid = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (url.includes('embed/')) {
        ytid = url.split('embed/')[1]?.split('?')[0] || '';
      } else if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        ytid = url;
      }

      const thumbnail = ytid 
        ? `https://img.youtube.com/vi/${ytid}/hqdefault.jpg` 
        : 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop';

      const videoData = {
        title: videoForm.title,
        category: videoForm.category || 'General',
        date: videoForm.date,
        duration: '15:00',
        thumbnail: thumbnail,
        youtubeId: ytid,
        youtubeUrl: videoForm.youtubeUrl,
        description: videoForm.summary || 'Campaign video recording.',
        venueOrPlatform: 'Kiambu Sub-County',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'videos'), videoData);

      setVideoForm({
        title: '',
        category: 'General',
        date: '',
        youtubeUrl: '',
        summary: ''
      });
      triggerToast('Video successfully saved to Firestore video library!');
    } catch (error: any) {
      console.error('Error adding video to Firestore:', error);
      triggerToast(`Failed to add video: ${error.message || 'Firestore error'}`);
    } finally {
      setIsVideoSubmitting(false);
    }
  };

  const handleDeleteVideo = (id: string) => {
    handleDeleteItem('videos', id);
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.description) return;

    setIsEventSubmitting(true);

    try {
      const slug = eventForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const eventData = {
        slug: slug || `event-${Date.now()}`,
        title: eventForm.title,
        description: eventForm.description,
        category: eventForm.category || 'Town Hall',
        date: eventForm.date,
        startTime: '10:00 AM',
        endTime: '01:00 PM',
        locationName: eventForm.location || 'Township Hall',
        location: eventForm.location || 'Township Hall',
        address: eventForm.county || 'Kiambu County',
        county: eventForm.county || 'Kiambu County',
        constituency: 'Kiambu',
        ward: 'Central Ward',
        registrationRequired: true,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'upcoming_events'), eventData);

      setEventForm({
        title: '',
        date: '',
        location: '',
        county: 'Kiambu County',
        category: 'Town Hall',
        description: ''
      });
      triggerToast('Upcoming event successfully saved to Firestore schedule!');
    } catch (error: any) {
      console.error('Error creating upcoming event in Firestore:', error);
      triggerToast(`Failed to create event: ${error.message || 'Firestore error'}`);
    } finally {
      setIsEventSubmitting(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    handleDeleteItem('upcoming_events', id);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files || []);
    setSelectedFiles(filesArray);
    console.log("Selected files count:", filesArray.length);
  };

  const handleRemoveSelectedFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Campaign Admin Console
            </h1>
            <p className="text-xs text-slate-400">
              Phyllis Wangui for Kiambu County 2027
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secure Firestore-Protected Access</span>
            </div>
          </div>

          {/* Error Alert */}
          {loginError && (
            <div className="bg-red-950/60 border border-red-800/80 text-red-200 p-3.5 rounded-xl text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{loginError}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter admin email address"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <a
              href="/"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              ← Return to Public Website
            </a>
            <span className="text-[11px] text-slate-500">Admin Gateway</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans pb-20">
      
      {/* Top Console Header */}
      <div className="bg-[#0B1120] border-b border-slate-800 py-4 px-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-950/50">
            W
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg text-white leading-tight flex items-center gap-2">
              Phyllis Wangui Campaign
              <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ADMIN CONSOLE
              </span>
            </h1>
            <p className="text-xs text-slate-400">Manage campaign media, videos, and mobilization events.</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Firestore Sync</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-950/50 hover:bg-red-900/60 border border-red-900/50 text-red-200 px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer"
            title="Logout from console"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900/90 text-emerald-100 border border-emerald-700 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-slide-down">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-emerald-300 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR NAVIGATION (Left Column) */}
          <aside className="w-full lg:w-1/4 shrink-0 space-y-6">
            <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-5 shadow-xl shadow-black/40">
              <h2 className="text-xs text-slate-500 font-bold tracking-wider uppercase mb-4">
                MANAGEMENT MODULES
              </h2>

              <nav className="space-y-2">
                {/* Tab 1: Photo Gallery */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('photo-gallery'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'photo-gallery'
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/40'
                      : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Camera className="w-4 h-4 shrink-0" />
                    <span>Manage Photo Gallery</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'photo-gallery' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {photoList.length}
                  </span>
                </button>

                {/* Tab 2: Video Library */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('video-library'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'video-library'
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/40'
                      : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Video className="w-4 h-4 shrink-0" />
                    <span>Manage Video Library</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'video-library' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {videoList.length}
                  </span>
                </button>

                {/* Tab 3: Upcoming Events */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('upcoming-events'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'upcoming-events'
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/40'
                      : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Manage Upcoming Events</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'upcoming-events' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {eventList.length}
                  </span>
                </button>

                {/* Tab 4: Manage Community Issues */}
                <button
                  type="button"
                  onClick={() => { setActiveTab('issues'); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === 'issues'
                      ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-950/40'
                      : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Manage Community Issues</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    activeTab === 'issues' 
                      ? 'bg-emerald-700 text-white' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {adminIssues.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* STATUS WIDGET */}
            <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-4 shadow-xl shadow-black/40">
              <div className="flex items-center gap-2.5 mb-2 text-slate-200 font-bold text-sm">
                <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hybrid Backend Active</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Photos upload to ImgBB & full event records save directly to the events collection in Firestore.
              </p>
            </div>

            {/* LOGOUT BUTTON */}
            <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-3 shadow-xl shadow-black/40">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 hover:border-red-800/80 text-red-300 hover:text-red-200 font-semibold text-xs transition-all cursor-pointer shadow-sm"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span>Logout from Admin Console</span>
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT AREA (Right Column) */}
          <main className="w-full lg:w-3/4 flex-1 space-y-8">
            
            {/* MODULE 1: MANAGE PHOTO GALLERY */}
            {activeTab === 'photo-gallery' && (
              <div className="space-y-8">
                
                {/* Form Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <h2 className="text-2xl font-serif font-bold text-white mb-1">
                      Upload New Photo Gallery Event
                    </h2>
                    <p className="text-xs text-slate-400">
                      Add past events, town halls, or rallies to the photo showcase.
                    </p>
                  </div>

                  <form onSubmit={handlePhotoGallerySubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Event Title */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT TITLE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ruiru Youth Mobilization & Sports Day"
                          value={photoForm.title}
                          onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Event Date */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT DATE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={photoForm.date}
                          onChange={(e) => setPhotoForm({ ...photoForm, date: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Event Location */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT LOCATION / VENUE
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Ruiru Stadium, Kiambu"
                          value={photoForm.location}
                          onChange={(e) => setPhotoForm({ ...photoForm, location: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Attach Photos (Dropzone) */}
                      <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                            ATTACH PHOTOS (MULTIPLE ALLOWED)
                          </label>
                          {selectedFiles.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setSelectedFiles([])}
                              className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-colors"
                            >
                              Clear all ({selectedFiles.length})
                            </button>
                          )}
                        </div>
                        <div className="relative border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-950/60 rounded-xl p-6 text-center transition-colors group cursor-pointer">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files) {
                                const newFiles = Array.from(e.target.files);
                                // Append new files to existing selection so users can add more in batches
                                setSelectedFiles((prev) => [...prev, ...newFiles]);
                              }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <Upload className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2 transition-colors" />
                          <p className="text-xs font-semibold text-slate-300">
                            <span>
                              {selectedFiles.length > 0 
                                ? `${selectedFiles.length} photo file(s) selected`
                                : "Drag & drop photos here, or click to browse"}
                            </span>
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP up to 10MB each (Multi-file enabled)</p>
                        </div>

                        {/* Thumbnail Preview Grid with Remove Action */}
                        {selectedFiles.length > 0 && (
                          <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-semibold text-slate-300">
                                ATTACHED PHOTOS ({selectedFiles.length})
                              </div>
                              <button
                                type="button"
                                onClick={() => setSelectedFiles([])}
                                className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-colors"
                              >
                                Clear all
                              </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                              {selectedFiles.map((file, index) => {
                                const previewUrl = URL.createObjectURL(file);
                                return (
                                  <div key={index} className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 h-28">
                                    <img src={previewUrl} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
                                      }}
                                      className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-red-600 text-white rounded-full transition-colors cursor-pointer"
                                      title="Remove photo"
                                    >
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          DESCRIPTION / PARAGRAPHS <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Summarize key event outcomes, attendees, and highlights..."
                          value={photoForm.description}
                          onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer text-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>{uploadProgress || 'Uploading Photos...'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Upload Photo Showcase ({selectedFiles.length})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Table Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Existing Photo Gallery Items</h3>
                      <p className="text-xs text-slate-400">Total {photoList.length} photo showcase events recorded.</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search gallery..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                          <th className="pb-3 px-3">Event Title</th>
                          <th className="pb-3 px-3">Date</th>
                          <th className="pb-3 px-3">Category</th>
                          <th className="pb-3 px-3">Location</th>
                          <th className="pb-3 px-3 text-center">Photos</th>
                          <th className="pb-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {photoList
                          .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((item) => (
                            <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="py-3.5 px-3 font-semibold text-white max-w-xs truncate">
                                {item.title}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap text-slate-400">
                                {item.date}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 font-medium text-[11px] border border-slate-700">
                                  {item.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 text-slate-400 max-w-[140px] truncate">
                                {item.location}
                              </td>
                              <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-200">
                                {item.photosCount}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  type="button"
                                  disabled={deletingIds.includes(item.id)}
                                  onClick={() => handleDeleteItem('events', item.id)}
                                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                                  title="Delete Photo Gallery Item"
                                >
                                  {deletingIds.includes(item.id) ? (
                                    <span className="text-xs text-red-400 font-medium animate-pulse">Deleting...</span>
                                  ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 2: MANAGE VIDEO LIBRARY */}
            {activeTab === 'video-library' && (
              <div className="space-y-8">
                
                {/* Form Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <h2 className="text-2xl font-serif font-bold text-white mb-1">
                      Add New Video to Library
                    </h2>
                    <p className="text-xs text-slate-400">
                      Link speeches, rallies, town halls, or short clips from YouTube.
                    </p>
                  </div>

                  <form onSubmit={handleVideoSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Video Title */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          VIDEO TITLE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Keynote Address at Kiambu Leadership Forum"
                          value={videoForm.title}
                          onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Event Date */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT DATE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={videoForm.date}
                          onChange={(e) => setVideoForm({ ...videoForm, date: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* YouTube URL */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          YOUTUBE URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="url"
                          required
                          placeholder="https://www.youtube.com/watch?v=..."
                          value={videoForm.youtubeUrl}
                          onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Summary / Snippet */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          SUMMARY / SNIPPET
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief summary of what was covered in this video recording..."
                          value={videoForm.summary}
                          onChange={(e) => setVideoForm({ ...videoForm, summary: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={isVideoSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer text-sm disabled:opacity-60"
                      >
                        {isVideoSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving Video...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Publish Video Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Table Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Existing Video Library Items</h3>
                      <p className="text-xs text-slate-400">Total {videoList.length} campaign videos indexed.</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search video library..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                          <th className="pb-3 px-3">Category</th>
                          <th className="pb-3 px-3">Event Title</th>
                          <th className="pb-3 px-3">Date</th>
                          <th className="pb-3 px-3">Link</th>
                          <th className="pb-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {videoList
                          .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.category.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((vid) => (
                            <tr key={vid.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 font-medium text-[11px] border border-slate-700">
                                  {vid.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 font-semibold text-white max-w-sm truncate">
                                {vid.title}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap text-slate-400">
                                {vid.date}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <a
                                  href={vid.youtubeUrl || (vid.youtubeId ? `https://www.youtube.com/watch?v=${vid.youtubeId}` : '#')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium hover:underline"
                                >
                                  <span>YouTube</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>
                              <td className="py-3.5 px-3 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  disabled={deletingIds.includes(vid.id)}
                                  onClick={() => handleDeleteVideo(vid.id)}
                                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                                  title="Delete Video"
                                >
                                  {deletingIds.includes(vid.id) ? (
                                    <span className="text-[11px] text-red-400 font-medium animate-pulse">Deleting...</span>
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 3: MANAGE UPCOMING EVENTS */}
            {activeTab === 'upcoming-events' && (
              <div className="space-y-8">
                
                {/* Form Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="mb-6 pb-4 border-b border-slate-800">
                    <h2 className="text-2xl font-serif font-bold text-white mb-1">
                      Add New Upcoming Event
                    </h2>
                    <p className="text-xs text-slate-400">
                      Schedule upcoming campaign townhalls & community mobilization sessions for the horizontal text row layout.
                    </p>
                  </div>

                  <form onSubmit={handleEventSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Event Title */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT TITLE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Nairobi Youth Mobilization Drive"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Event Date */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          EVENT DATE <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={eventForm.date}
                          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          LOCATION (E.G. VENUE)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Nairobi University, Nairobi"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* County */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          COUNTY
                        </label>
                        <input
                          type="text"
                          placeholder="Kiambu County / Nairobi"
                          value={eventForm.county}
                          onChange={(e) => setEventForm({ ...eventForm, county: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                        />
                      </div>

                      {/* Description / Summary */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                          DESCRIPTION / SUMMARY <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Brief description or agenda for this mobilization session..."
                          value={eventForm.description}
                          onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                          className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg p-3 w-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm resize-none"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        disabled={isEventSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer text-sm disabled:opacity-60"
                      >
                        {isEventSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Scheduling Event...</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span>Schedule Event</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Table Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-white">Upcoming Events</h3>
                      <p className="text-xs text-slate-400">Total {eventList.length} scheduled campaign rallies & forums.</p>
                    </div>

                    <div className="relative w-full sm:w-64">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                          <th className="pb-3 px-3">Event title</th>
                          <th className="pb-3 px-3">Location</th>
                          <th className="pb-3 px-3">Category</th>
                          <th className="pb-3 px-3">Date</th>
                          <th className="pb-3 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {eventList
                          .filter(ev => ev.title.toLowerCase().includes(searchQuery.toLowerCase()) || ev.locationName.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((ev) => (
                            <tr key={ev.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="py-3.5 px-3 font-semibold text-white max-w-sm truncate">
                                {ev.title}
                              </td>
                              <td className="py-3.5 px-3 text-slate-400 max-w-[160px] truncate">
                                {ev.locationName}, {ev.constituency}
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap">
                                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-emerald-400 font-medium text-[11px] border border-slate-700">
                                  {ev.category}
                                </span>
                              </td>
                              <td className="py-3.5 px-3 whitespace-nowrap text-slate-400">
                                {ev.date}
                              </td>
                              <td className="py-3.5 px-3 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  disabled={deletingIds.includes(ev.id)}
                                  onClick={() => handleDeleteEvent(ev.id)}
                                  className="text-slate-500 hover:text-red-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                                  title="Delete Event"
                                >
                                  {deletingIds.includes(ev.id) ? (
                                    <span className="text-[11px] text-red-400 font-medium animate-pulse">Deleting...</span>
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* MODULE 4: MANAGE COMMUNITY ISSUES */}
            {activeTab === 'issues' && (
              <div className="space-y-8">
                
                {/* Table Container Card */}
                <div className="bg-[#0B1120] border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-black/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-white mb-1 flex items-center gap-2.5">
                        <span>Manage Community Issues</span>
                        <span className="text-xs font-mono font-normal uppercase tracking-wider px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-emerald-400">
                          Live Sync
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400">
                        Review community reports, track locations, and update resolution statuses.
                      </p>
                    </div>

                    <div className="relative w-full sm:w-72">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search by code, title, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 text-xs rounded-lg pl-9 pr-3 py-2 w-full focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                          <th className="pb-3 px-3">Issue Code</th>
                          <th className="pb-3 px-3">Location</th>
                          <th className="pb-3 px-3">Title & Description</th>
                          <th className="pb-3 px-3">Status</th>
                          <th className="pb-3 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {adminIssues
                          .filter(iss => 
                            iss.issueCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            iss.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            iss.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            iss.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            iss.status.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((iss) => (
                            <tr key={iss.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="py-4 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                                {iss.issueCode}
                              </td>
                              <td className="py-4 px-3 text-slate-300 font-medium whitespace-nowrap">
                                {iss.location}
                              </td>
                              <td className="py-4 px-3 max-w-xs sm:max-w-md">
                                {iss.title && (
                                  <div className="font-semibold text-white mb-0.5 text-xs">
                                    {iss.title}
                                  </div>
                                )}
                                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                                  {iss.description}
                                </p>
                              </td>
                              <td className="py-4 px-3 whitespace-nowrap">
                                <select
                                  value={iss.status}
                                  onChange={(e) => updateIssueStatus(iss.id, e.target.value)}
                                  className={`bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer ${
                                    iss.status === 'RESOLVED'
                                      ? 'text-emerald-400 border-emerald-800/60'
                                      : iss.status === 'IN PROGRESS'
                                      ? 'text-orange-400 border-orange-800/60'
                                      : 'text-blue-400 border-blue-800/60'
                                  }`}
                                >
                                  <option value="UNDER REVIEW" className="bg-slate-900 text-blue-300">UNDER REVIEW</option>
                                  <option value="IN PROGRESS" className="bg-slate-900 text-orange-300">IN PROGRESS</option>
                                  <option value="RESOLVED" className="bg-slate-900 text-emerald-300">RESOLVED</option>
                                </select>
                              </td>
                              <td className="py-4 px-3 text-right whitespace-nowrap">
                                <button
                                  type="button"
                                  disabled={deletingIds.includes(iss.id)}
                                  onClick={() => handleDeleteItem('community_issues', iss.id)}
                                  className="text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-transparent hover:border-red-900/50 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs disabled:opacity-50"
                                  title="Delete Report"
                                >
                                  {deletingIds.includes(iss.id) ? (
                                    <span className="text-red-400 font-medium animate-pulse">Deleting...</span>
                                  ) : (
                                    <>
                                      <Trash2 className="w-3.5 h-3.5" />
                                      <span>Delete</span>
                                    </>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))}
                        {adminIssues.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-10 text-center text-slate-500 text-xs">
                              No community issues reported yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}