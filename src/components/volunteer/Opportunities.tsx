import { useState } from 'react';

const mockOpportunities = [
  {
    id: 1,
    title: "Community Listening Session",
    type: "COMMUNITY LISTENER",
    location: "Githunguri Town Hall",
    date: "Aug 20, 2026",
    time: "10:00 AM",
    duration: "2 hours",
    description: "Help document community priorities from local residents."
  }
];

export function Opportunities() {
  return (
    <section id="opportunities" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-serif font-bold mb-6">Current Opportunities</h2>
          <p className="text-gray-600">Join us at one of our upcoming events or participate in active community tasks.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {mockOpportunities.length > 0 ? (
            mockOpportunities.map(opp => (
              <div key={opp.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-xs font-bold text-[var(--color-primary-green)] mb-2 uppercase">{opp.type}</div>
                <h3 className="text-xl font-bold mb-3">{opp.title}</h3>
                <p className="text-gray-600 mb-6 text-sm">{opp.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <div><strong>Where:</strong> {opp.location}</div>
                  <div><strong>When:</strong> {opp.date} @ {opp.time}</div>
                </div>
                <button className="bg-gray-100 text-[var(--color-brand-black)] px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                  Express Interest
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No volunteer opportunities have been published yet. Check back soon.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
