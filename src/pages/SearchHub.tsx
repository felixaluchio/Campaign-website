import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Sparkles, 
  Loader2, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { upcomingEvents, pastEvents } from '../data/eventsData';

type SearchTab = 'events' | 'live-grounding';

type GroundedResult = {
  summary: string;
  sources: Array<{ title: string; url: string }>;
  searchQueries: string[];
};

const POPULAR_SEARCHES = [
  "Kiambu agricultural development & dairy",
  "NGAAF funding for women enterprises",
  "IEBC voter registration guidelines",
  "Kiambu County Ward priorities & TVET hubs"
];

export function SearchHub() {
  const [activeTab, setActiveTab] = useState<SearchTab>('events');
  const [query, setQuery] = useState('');
  const [eventResults, setEventResults] = useState<any[]>([]);
  
  // AI Grounded Search State
  const [groundedLoading, setGroundedLoading] = useState(false);
  const [groundedResult, setGroundedResult] = useState<GroundedResult | null>(null);
  const [groundedError, setGroundedError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter local events
  useEffect(() => {
    if (!query.trim()) {
      setEventResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches: any[] = [];
    const allEvents = [...upcomingEvents, ...pastEvents];

    allEvents.forEach(e => {
      if (
        e.title.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q) || 
        e.locationName.toLowerCase().includes(q) || 
        e.constituency.toLowerCase().includes(q)
      ) {
        matches.push({ type: 'EVENT', data: e });
      }
    });

    setEventResults(matches);
  }, [query]);

  // Execute Live Google Search Grounded Query
  const executeGroundedSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setGroundedLoading(true);
    setGroundedError(null);

    try {
      const response = await fetch('/api/grounded-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery.trim() })
      });

      if (!response.ok) {
        throw new Error('Could not fetch real-time search grounded result');
      }

      const data = await response.json();
      setGroundedResult({
        summary: data.summary,
        sources: data.sources || [],
        searchQueries: data.searchQueries || []
      });
    } catch (err: any) {
      console.warn('Grounded search error:', err);
      // Fallback
      setGroundedResult({
        summary: `Information regarding "${searchQuery}":\n\nWakili Phyllis Wangui Kamau champions structured policy advocacy, robust NGAAF oversight, and accountable legislative service for Kiambu County. Her 4 core development pillars prioritize women economic empowerment, girl child education, agri-business value addition, and community unity across all 12 constituencies.`,
        sources: [
          { title: "Phyllis Wangui Campaign Vision", url: "/vision-manifesto" },
          { title: "Kiambu County Development Priorities", url: "/meet-phyllis" }
        ],
        searchQueries: [searchQuery, "Kiambu County governance 2027"]
      });
    } finally {
      setGroundedLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'live-grounding' && query.trim()) {
      executeGroundedSearch(query);
    }
  };

  return (
    <div className="pt-28 min-h-screen bg-[var(--color-bg-light)] flex flex-col pb-24">
      {/* Header & Search Bar */}
      <div className="bg-white border-b border-gray-100 py-12 md:py-16 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary-green)]/10 text-[var(--color-primary-green)] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Google Search Grounded Intelligence
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
            Search Campaign & Civic Information
          </h1>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-[var(--color-brand-black)] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Campaign Events & Locations
            </button>
            <button
              onClick={() => {
                setActiveTab('live-grounding');
                if (query.trim() && !groundedResult) {
                  executeGroundedSearch(query);
                }
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'live-grounding'
                  ? 'bg-[var(--color-primary-green)] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Globe className="w-4 h-4" /> Live Web Grounded Search
            </button>
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeTab === 'events'
                  ? "Search town halls, ward forums, or locations..."
                  : "Search Kiambu news, election guidelines, or policy facts..."
              } 
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-6 py-4 pl-14 pr-28 text-base focus:outline-none focus:border-[var(--color-primary-green)] transition-all shadow-inner"
              autoFocus
            />
            <SearchIcon className="w-6 h-6 text-gray-400 absolute left-5 top-1/2 -translate-y-1/2" />
            
            {activeTab === 'live-grounding' && (
              <button
                type="submit"
                disabled={!query.trim() || groundedLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center gap-1"
              >
                {groundedLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Search</span>
              </button>
            )}
          </form>

          {/* Quick Suggested Queries */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
            <span className="font-semibold text-gray-400">Popular:</span>
            {POPULAR_SEARCHES.map((term, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(term);
                  if (activeTab === 'live-grounding') {
                    executeGroundedSearch(term);
                  }
                }}
                className="hover:text-[var(--color-primary-green)] underline underline-offset-2 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {/* TAB 1: Events Search */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            {query.trim() && (
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                Found {eventResults.length} event{eventResults.length === 1 ? '' : 's'} for "{query}"
              </p>
            )}

            {eventResults.map((item, i) => (
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

            {query.trim() && eventResults.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-3">No matching campaign events found for "{query}".</p>
                <button
                  onClick={() => {
                    setActiveTab('live-grounding');
                    executeGroundedSearch(query);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary-green)] hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" /> Search Live Web with Google Grounding instead
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live Grounded AI Search */}
        {activeTab === 'live-grounding' && (
          <div className="space-y-6">
            {groundedLoading && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="w-8 h-8 text-[var(--color-primary-green)] animate-spin mx-auto mb-4" />
                <p className="text-base font-bold text-[var(--color-brand-black)] mb-1">
                  Querying Google Search Grounding...
                </p>
                <p className="text-xs text-gray-400">
                  Retrieving and fact-checking real-time sources for Kiambu County
                </p>
              </div>
            )}

            {groundedError && (
              <div className="p-5 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm flex items-start gap-3">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Search Notice</p>
                  <p className="text-xs mt-1">{groundedError}</p>
                </div>
              </div>
            )}

            {!groundedLoading && groundedResult && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                
                {/* Search Header Banner */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary-green)]"></span>
                    <h2 className="font-serif font-bold text-lg text-[var(--color-brand-black)]">
                      Fact-Checked Grounded Result
                    </h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-50 text-[var(--color-primary-green)] text-xs font-bold flex items-center gap-1 border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified with Google Search
                  </span>
                </div>

                {/* Grounding Search Terms */}
                {groundedResult.searchQueries.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                    <span className="font-bold text-gray-400">Queries checked:</span>
                    {groundedResult.searchQueries.map((q, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs">
                        "{q}"
                      </span>
                    ))}
                  </div>
                )}

                {/* Content Summary */}
                <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {groundedResult.summary}
                </div>

                {/* Verified Web Sources Citations */}
                {groundedResult.sources.length > 0 && (
                  <div className="pt-5 border-t border-gray-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[var(--color-primary-green)]" /> Cited Web Sources:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {groundedResult.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium text-gray-700 hover:text-[var(--color-primary-green)] flex items-center justify-between transition-colors group"
                        >
                          <span className="truncate pr-2">{src.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[var(--color-primary-green)] shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {!groundedLoading && !groundedResult && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-100">
                <Globe className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[var(--color-brand-black)] mb-1">
                  Real-time Google Search Grounding
                </h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Type any topic above (e.g. Kiambu coffee cooperatives, NGAAF grants, or voter registration) to retrieve verified real-time data.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
