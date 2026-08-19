import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import clsx from 'clsx';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't render on home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link to="/" className="text-gray-500 hover:text-[var(--color-primary-green)] transition-colors flex items-center">
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            
            // Format text (capitalize and replace hyphens)
            const text = value
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <li key={to} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-300" />
                {isLast ? (
                  <span className="text-[var(--color-brand-black)] font-semibold" aria-current="page">
                    {text}
                  </span>
                ) : (
                  <Link to={to} className="text-gray-500 hover:text-[var(--color-primary-green)] transition-colors">
                    {text}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
