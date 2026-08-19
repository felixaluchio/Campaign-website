import { Link } from 'react-router-dom';
import { Home, ShieldAlert } from 'lucide-react';

export function AccessDenied() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center pt-20 px-4 sm:px-6">
      <div className="max-w-2xl text-center">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-100 shadow-sm text-red-500">
          <ShieldAlert className="w-12 h-12" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6 tracking-tight">
          Access Restricted
        </h1>
        
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          You don't have permission to view this page. Please return to the homepage or login if you have an account.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[var(--color-primary-green)] text-white hover:bg-[var(--color-deep-green)] px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
