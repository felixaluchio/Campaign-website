import { useState } from 'react';
import { Home, Mail, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CommunicationPreferences() {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Mail className="w-8 h-8 text-gray-400" />
        </div>
        
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Communication Preferences</h2>
        <p className="text-gray-600 mb-8">
          Manage how the Wakili Phyllis Wangui campaign contacts you.
        </p>

        {isSuccess ? (
          <div className="bg-[var(--color-light-green)] text-[var(--color-primary-green)] p-6 rounded-2xl flex flex-col items-center text-center">
            <CheckCircle2 className="w-8 h-8 mb-2" />
            <p className="font-bold">Preferences Updated Successfully</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsSuccess(true); }}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary-green)]" placeholder="your@email.com" />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-[var(--color-primary-green)]" defaultChecked />
                <span className="text-gray-700">Campaign Updates & News</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-[var(--color-primary-green)]" defaultChecked />
                <span className="text-gray-700">Event Invitations</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5 text-[var(--color-primary-green)]" defaultChecked />
                <span className="text-gray-700">Volunteer Opportunities</span>
              </label>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <button type="submit" className="w-full bg-[var(--color-primary-green)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--color-deep-green)] transition-colors shadow-md hover:shadow-lg">
                Save Preferences
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[var(--color-primary-green)] inline-flex items-center gap-2 transition-colors">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
