import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center pt-20 px-4 sm:px-6">
      <div className="max-w-2xl text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-100 shadow-sm">
          <span className="font-serif text-5xl font-bold text-gray-300">404</span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6 tracking-tight">
          Looks Like We've Taken a Wrong Turn.
        </h1>
        
        <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          The page you're looking for may have moved, been renamed, or no longer exists. 
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[var(--color-primary-green)] text-white hover:bg-[var(--color-deep-green)] px-8 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
          <Link
            to="/#vision"
            className="w-full sm:w-auto bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[var(--color-primary-green)] border border-gray-200 px-8 py-3.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 group"
          >
            Explore the Campaign
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
