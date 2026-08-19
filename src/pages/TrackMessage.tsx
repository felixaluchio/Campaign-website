import { useState } from 'react';
import { Home, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TrackMessage() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Track Message</h2>
        <p className="text-gray-600 mb-8">
          Enter your reference number to check the status of a previous message or inquiry.
        </p>

        {isSuccess ? (
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 text-amber-600 mb-4">
              <Clock className="w-6 h-6" />
              <span className="font-bold">Under Review</span>
            </div>
            <p className="text-gray-700 text-sm mb-4">
              Your message is currently being reviewed by the campaign team. We will reach out to you shortly using the contact details provided.
            </p>
            <button onClick={() => setIsSuccess(false)} className="text-sm font-bold text-[var(--color-primary-green)] hover:underline">Track another message</button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Reference Number</label>
              <input type="text" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-mono focus:outline-none focus:border-[var(--color-primary-green)]" placeholder="e.g. MSG-1234" />
            </div>

            <button type="submit" className="w-full bg-[var(--color-brand-black)] text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg flex justify-center items-center gap-2">
              <Search className="w-4 h-4" /> Track Status
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[var(--color-brand-black)] inline-flex items-center gap-2 transition-colors">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
