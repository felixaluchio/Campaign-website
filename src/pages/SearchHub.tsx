import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { upcomingEvents, pastEvents } from '../data/eventsData';

export function SearchHub() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: any[] = [];
    const allEvents = [...upcomingEvents, ...pastEvents];

    // Search Events
    allEvents.forEach(e => {
      if (e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.locationName.toLowerCase().includes(q) || e.constituency.toLowerCase().includes(q)) {
        matches.push({ type: 'EVENT', data: e });
      }
    });

    setResults(matches);
  }, [query]);

  return (
    <div className="pt-28 min-h-screen bg-[var(--color-bg-light)] flex flex-col pb-20">
      <div className="bg-white border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
            Search Campaign Events
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search town halls, forums, or ward locations..." 
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 pl-14 text-base focus:outline-none focus:border-[var(--color-primary-green)] transition-all"
              autoFocus
            />
            <SearchIcon className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {query.trim() && (
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
            Found {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
          </p>
        )}

        <div className="space-y-4">
          {results.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-1 bg-[var(--color-bg-light)] text-[var(--color-primary-green)] text-[10px] font-bold uppercase tracking-wider rounded-full">
                  {item.data.category}
                </span>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-primary-green)]" /> {item.data.date}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-[var(--color-brand-black)] mb-2">
                {item.data.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {item.data.description}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--color-campaign-red)]" /> {item.data.locationName}, {item.data.constituency}
                </span>
                <Link to={`/events/${item.data.slug}`} className="font-bold text-[var(--color-primary-green)] hover:underline inline-flex items-center gap-1">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}

          {query.trim() && results.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500 text-sm">No matching events found for "{query}".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
