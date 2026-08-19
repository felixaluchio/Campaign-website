import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('campaign_cookie_consent');
    if (!hasConsented) {
      // Small delay before showing
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('campaign_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('campaign_cookie_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
            
            <button 
              onClick={handleReject}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Your Privacy Matters</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use cookies and similar technologies to improve your experience on our website, understand how you interact with our content, and provide relevant campaign updates. 
                <Link to="/cookies" className="text-[var(--color-primary-green)] font-semibold hover:underline ml-1">
                  Read our Cookie Policy
                </Link>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-full transition-colors flex-1 md:flex-none text-center"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white text-sm font-bold rounded-full transition-colors flex items-center justify-center gap-2 flex-1 md:flex-none shadow-md hover:shadow-lg"
              >
                <Check className="w-4 h-4" />
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
