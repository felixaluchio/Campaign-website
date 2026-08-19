import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, FileText, Calendar, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Mock search data - in a real app this would query a backend or a search index
const searchData = [
  { id: '1', type: 'MANIFESTO', title: 'Healthcare Excellence', desc: 'Upgrading county hospitals and ensuring medicine availability.', url: '/#pillars', icon: FileText },
  { id: '2', type: 'MANIFESTO', title: 'Economic Empowerment', desc: 'Creating a Biashara Fund for SMEs and supporting farmers.', url: '/#pillars', icon: FileText },
  { id: '3', type: 'EVENT', title: 'Thika Town Hall Meeting', desc: 'Join us for a community dialogue regarding youth employment.', url: '/events/thika-town-hall', icon: Calendar },
  { id: '4', type: 'COMMUNITY', title: 'Kiambu Town Ward', desc: 'Priorities for Kiambu Town including market upgrades.', url: '/#community', icon: MapPin },
  { id: '5', type: 'EVENT', title: 'Githunguri Economic Summit', desc: 'Focusing on agricultural technology and market access.', url: '/events/githunguri-economic-summit', icon: Calendar },
];

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = query.trim() 
    ? searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input */}
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center gap-4 relative">
              <Search className="w-6 h-6 text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search the campaign website..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg sm:text-xl font-medium bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-300"
              />
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 sm:p-6">
              {!query.trim() ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">What are you looking for?</h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">Search across the manifesto, development pillars, news, events, and community priorities.</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => setQuery('Manifesto')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm">Manifesto</button>
                    <button onClick={() => setQuery('Events')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm">Events</button>
                    <button onClick={() => setQuery('Ward')} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm">My Ward</button>
                  </div>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Search Results ({results.length})</h3>
                  {results.map((result) => (
                    <Link
                      key={result.id}
                      to={result.url}
                      onClick={onClose}
                      className="group flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:border-[var(--color-primary-green)] transition-colors shadow-sm hover:shadow-md"
                    >
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--color-light-green)] transition-colors">
                        <result.icon className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-primary-green)] transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.65rem] font-bold text-[var(--color-primary-green)] uppercase tracking-widest mb-1">{result.type}</div>
                        <h4 className="font-bold text-gray-900 truncate">{result.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{result.desc}</p>
                      </div>
                      <div className="flex items-center shrink-0">
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-primary-green)] transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">No results found</h3>
                  <p className="text-sm text-gray-500 mb-8 max-w-sm mx-auto">We couldn't find anything matching "{query}". Try another search term or explore the sections below.</p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    <Link onClick={onClose} to="/#vision" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm">Vision & Manifesto</Link>
                    <Link onClick={onClose} to="/events" className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-600 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm">Campaign Events</Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-4 bg-white border-t border-gray-100 text-center">
              <span className="text-xs text-gray-400 font-medium flex justify-center items-center gap-2">
                Press <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-500 font-sans">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
