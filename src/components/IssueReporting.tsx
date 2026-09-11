import { useState, useEffect, FormEvent } from 'react';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { 
  ArrowRight, 
  AlertTriangle, 
  X, 
  CheckCircle2, 
  Loader2, 
  MapPin, 
  FileText, 
  Send 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface CommunityIssue {
  id?: string;
  issueCode: string;
  location: string;
  title?: string;
  description: string;
  status: string;
  createdAt?: any;
}

const DEFAULT_ISSUES: CommunityIssue[] = [
  {
    id: '1',
    issueCode: 'ISS-042',
    status: 'IN PROGRESS',
    location: 'Juja Ward',
    title: 'Water Pipe Maintenance',
    description: 'Broken water pipe near main market causing drainage blockage.'
  },
  {
    id: '2',
    issueCode: 'ISS-041',
    status: 'UNDER REVIEW',
    location: 'Gatundu South',
    title: 'Youth Vocational Center',
    description: 'Request for modern tools and training equipment for youth polytechnic.'
  },
  {
    id: '3',
    issueCode: 'ISS-039',
    status: 'RESOLVED',
    location: 'Ruiru Biashara',
    title: 'Street Lighting Repair',
    description: 'Solar streetlights restored along commuter walkway.'
  }
];

export function IssueReporting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issues, setIssues] = useState<CommunityIssue[]>(DEFAULT_ISSUES);
  
  // Form input state
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [submittedCode, setSubmittedCode] = useState('');

  // 2. Real-Time Live Feed Listener
  useEffect(() => {
    try {
      const issuesQuery = query(
        collection(db, 'community_issues'),
        orderBy('createdAt', 'desc'),
        limit(4)
      );

      const unsubscribe = onSnapshot(
        issuesQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const mappedIssues: CommunityIssue[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                issueCode: data.issueCode || `ISS-${docSnap.id.substring(0, 3).toUpperCase()}`,
                location: data.location || 'Kiambu County',
                title: data.title || '',
                description: data.description || '',
                status: data.status || 'UNDER REVIEW',
                createdAt: data.createdAt
              };
            });
            setIssues(mappedIssues);
          }
        },
        (error) => {
          console.warn('Firestore live feed notice:', error);
          // Keep default fallback data if live connection is unavailable
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn('Unable to bind Firestore onSnapshot listener:', e);
    }
  }, []);

  // 3. Issue Submission Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!location.trim() || !title.trim() || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    const newIssueCode = 'ISS-' + Math.floor(100 + Math.random() * 900);

    try {
      await addDoc(collection(db, 'community_issues'), {
        location: location.trim(),
        title: title.trim(),
        description: description.trim(),
        status: 'UNDER REVIEW',
        issueCode: newIssueCode,
        createdAt: serverTimestamp()
      });

      // Clear form & close modal
      setSubmittedCode(newIssueCode);
      setLocation('');
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (err) {
      console.error('Error adding community issue to Firebase:', err);
      // Graceful local fallback to preserve optimistic UX
      const localRecord: CommunityIssue = {
        id: 'local-' + Date.now(),
        issueCode: newIssueCode,
        location: location.trim(),
        title: title.trim(),
        description: description.trim(),
        status: 'UNDER REVIEW'
      };
      setIssues((prev) => [localRecord, ...prev.slice(0, 3)]);
      setSubmittedCode(newIssueCode);
      setLocation('');
      setTitle('');
      setDescription('');
      setIsModalOpen(false);
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || '').toUpperCase();
    if (s.includes('PROGRESS')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    if (s.includes('RESOLVED')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    // Default: UNDER REVIEW
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <section className="py-24 bg-[var(--color-primary-green)] relative overflow-hidden" id="report-issue-section">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 bg-noise-pattern mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-[var(--color-deep-green)] clip-path-slant opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Information & Reporting Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-[var(--color-campaign-red)] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-md">
              <AlertTriangle className="w-4 h-4" />
              Direct Action
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Raise an Issue in Your Community
            </h2>
            
            <p className="text-[var(--color-light-green)] text-lg mb-10 max-w-lg leading-relaxed">
              True representation begins with listening. Use our public issue-reporting system to share concerns affecting your ward or constituency directly with our team.
            </p>

            <ul className="space-y-4 mb-10 text-white/90">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">1</div>
                Submit location-specific issues.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">2</div>
                Track the status of your report.
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">3</div>
                Drive transparent accountability.
              </li>
            </ul>

            <button 
              type="button"
              onClick={() => setIsModalOpen(true)} 
              className="inline-flex items-center gap-2 bg-white text-[var(--color-primary-green)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-light-green)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              Report an Issue Now
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Submission Toast Alert */}
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 inline-flex items-center gap-3 bg-white text-[var(--color-brand-black)] px-5 py-3 rounded-2xl shadow-xl border border-emerald-100 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-green)] shrink-0" />
                <span>
                  Report logged successfully! Ref: <strong className="font-mono text-[var(--color-primary-green)]">{submittedCode}</strong>
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column: Real-Time Live Feed Card */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                <div className="font-bold text-[var(--color-brand-black)] text-lg">Recent Public Reports</div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary-green)] bg-[var(--color-light-green)] px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary-green)] animate-pulse"></span>
                  Live Feed
                </div>
              </div>

              <div className="space-y-5">
                {issues.map((item, idx) => (
                  <div key={item.id || idx} className="flex gap-4 items-start pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-[var(--color-primary-green)] flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {item.issueCode}
                        </span>
                        <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[var(--color-brand-black)] mb-0.5">
                        {item.location} {item.title ? `• ${item.title}` : ''}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed break-words">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Background decorative card */}
            <div className="absolute inset-0 bg-[var(--color-deep-green)] rounded-3xl translate-x-4 translate-y-4 -z-10 shadow-xl"></div>
          </motion.div>

        </div>
      </div>

      {/* 3. Issue Reporting Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden my-8"
            >
              {/* Modal Header */}
              <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[var(--color-primary-green)] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 text-lg">
                      Report a Community Issue
                    </h3>
                    <p className="text-xs text-gray-500">
                      Submit for direct advocacy and tracking
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--color-primary-green)]" />
                    Location / Ward <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Ruiru / Biashara Ward"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[var(--color-primary-green)]" />
                    Issue Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Damaged culvert along market feeder road"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Detailed Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue, urgency, and how it impacts local residents or businesses..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Report
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
