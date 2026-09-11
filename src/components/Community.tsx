import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, MessageSquare, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

import { countyData } from '../data/locationData';

// Mock data structures as requested in Part H
const wardDetailsPlaceholder = {
  priorities: [
    { id: 1, title: "[Community Priority Placeholder]", description: "This is a placeholder for a community-reported priority.", status: "UNDER REVIEW", date: "August 2026" },
  ],
  events: [
    { id: 1, title: "Community Dialogue", date: "[Date]", time: "[Time]", location: "[Location]", status: "Upcoming" }
  ],
  updates: []
};

export function Community() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState<string>('');
  const [selectedWard, setSelectedWard] = useState<string>('');

  // Derived state based on selections
  const currentConstituencyData = useMemo(() => {
    return countyData.constituencies.find(c => c.name === selectedConstituency);
  }, [selectedConstituency]);

  // Handle Search Filtering
  const filteredConstituencies = useMemo(() => {
    if (!searchQuery) return countyData.constituencies;
    return countyData.constituencies.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.wards.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  return (
    <section className="bg-white relative overflow-hidden pt-32 pb-24" id="community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* B1: Section Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[var(--color-primary-green)]">
              Kiambu County
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-black)] mb-8 leading-tight">
            Every Community Has A Voice.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-[var(--color-primary-green)] pl-6">
            "Empowering every ward and constituency to shape our shared agenda for a better Kiambu."
          </p>
        </motion.div>

        {/* Desktop Split / Mobile Stack */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* B2: Kiambu County Visualization (Map Placeholder) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 order-2 lg:order-1 hidden md:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-[var(--color-soft-bg)] aspect-square rounded-[40px] border border-gray-100 flex flex-col items-center justify-center p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
              <MapPin className="w-16 h-16 text-[var(--color-primary-green)] mb-6 opacity-50 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-black)] mb-2 relative z-10 text-center">
                Interactive Map Placeholder
              </h3>
              <p className="text-sm text-gray-500 text-center relative z-10 max-w-xs">
                [Awaiting official GeoJSON boundary data for Kiambu County constituencies and wards. Do not fabricate geographic boundaries.]
              </p>
            </motion.div>
          </div>

          {/* C: Interactive County Directory */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            
            {/* D: Search */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search your constituency or ward..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all"
                  aria-label="Search Kiambu constituencies and wards"
                />
              </div>
            </div>

            {/* B4: Drill Down UI */}
            <div className="bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-100 mb-12">
              
              {!selectedWard ? (
                <>
                  <h3 className="text-xl font-bold text-[var(--color-brand-black)] mb-6">
                    Find Your Community
                  </h3>
                  
                  {/* Constituency Selection */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {filteredConstituencies.map(constituency => (
                      <button
                        key={constituency.name}
                        onClick={() => setSelectedConstituency(constituency.name)}
                        className={`text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between border ${
                          selectedConstituency === constituency.name 
                            ? 'bg-[var(--color-primary-green)] text-white border-[var(--color-primary-green)] shadow-md' 
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[var(--color-primary-green)]'
                        }`}
                      >
                        {constituency.name}
                        {selectedConstituency === constituency.name && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </button>
                    ))}
                    {filteredConstituencies.length === 0 && (
                      <div className="col-span-2 text-center py-8 text-gray-500">
                        No constituencies or wards match your search.
                      </div>
                    )}
                  </div>

                  {/* Ward Selection */}
                  <AnimatePresence>
                    {selectedConstituency && currentConstituencyData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-gray-200">
                          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
                            Select Ward in {selectedConstituency}
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {currentConstituencyData.wards
                              .filter(w => !searchQuery || w.toLowerCase().includes(searchQuery.toLowerCase()))
                              .map(ward => (
                              <button
                                key={ward}
                                onClick={() => setSelectedWard(ward)}
                                className="text-left px-5 py-4 rounded-xl font-medium transition-all bg-white border border-gray-200 hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] flex items-center justify-between group"
                              >
                                {ward}
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[var(--color-primary-green)] transition-colors" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                /* Selected Ward View */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <button 
                    onClick={() => setSelectedWard('')}
                    className="text-sm font-bold text-[var(--color-primary-green)] hover:text-[var(--color-deep-green)] flex items-center gap-1 mb-6 transition-colors"
                  >
                    ← Back to {selectedConstituency} Wards
                  </button>
                  
                  <div className="mb-10">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
                      Your Community
                    </h3>
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-brand-black)]">
                      {selectedWard} Ward
                    </h2>
                  </div>

                  <div className="space-y-12">
                    
                    {/* B5: Community Priorities */}
                    <div>
                      <h4 className="text-xl font-bold text-[var(--color-brand-black)] mb-6 flex items-center gap-2">
                        Top Priorities
                        <span className="text-xs font-normal text-gray-400 block sm:inline mt-1 sm:mt-0">Last updated: August 2026</span>
                      </h4>
                      <div className="space-y-4">
                        {wardDetailsPlaceholder.priorities.map(priority => (
                          <div key={priority.id} className="bg-white p-6 rounded-2xl border border-gray-200">
                            <div className="flex justify-between items-start gap-4 mb-3">
                              <h5 className="font-bold text-gray-900">{priority.title}</h5>
                              <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                                {priority.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{priority.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* B7: Community Events */}
                    <div>
                      <h4 className="text-xl font-bold text-[var(--color-brand-black)] mb-6">
                        Upcoming Engagements
                      </h4>
                      <div className="space-y-4">
                        {wardDetailsPlaceholder.events.map(event => (
                          <div key={event.id} className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between gap-6">
                            <div>
                              <h5 className="font-bold text-[var(--color-primary-green)] mb-2">{event.title}</h5>
                              <div className="flex flex-col gap-1 text-sm text-gray-600">
                                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date} • {event.time}</span>
                                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</span>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <button className="w-full sm:w-auto text-sm font-bold bg-[var(--color-brand-black)] text-white px-5 py-2.5 rounded-full hover:bg-black transition-colors">
                                Register to Attend →
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* B6: Community Listening CTA */}
                    <div className="bg-[var(--color-primary-green)]/10 p-8 rounded-3xl border border-[var(--color-primary-green)]/20 text-center">
                      <MessageSquare className="w-8 h-8 text-[var(--color-primary-green)] mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-[var(--color-brand-black)] mb-3">
                        Tell Us What Matters.
                      </h4>
                      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                        Your experience should help shape the priorities we take forward.
                      </p>
                      <button className="inline-flex justify-center items-center gap-2 bg-[var(--color-primary-green)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-deep-green)] transition-colors shadow-sm">
                        Share Your Priority
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </div>
            
          </motion.div>
        </div>
      </div>

      {/* B9: County-wide Representation */}
      <div className="mt-24 bg-[var(--color-brand-black)] text-white py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-deep-green)] opacity-30 blur-[100px] pointer-events-none"></div>
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-8">
            One Kiambu. Every Voice Matters.
          </h2>
          <p className="text-xl sm:text-2xl font-serif text-[var(--color-primary-green)] italic leading-relaxed">
            "I will represent residents' concerns and advocate for equitable development across every constituency and ward."
          </p>
        </motion.div>
      </div>

    </section>
  );
}
