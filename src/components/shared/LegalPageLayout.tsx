import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/" className="text-sm font-semibold text-[var(--color-primary-green)] hover:underline mb-6 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-500 font-medium">Last Updated: {lastUpdated}</p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-lg prose-green max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}
