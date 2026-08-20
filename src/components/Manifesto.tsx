import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Download, ExternalLink } from 'lucide-react';

const manifestoSections = [
  {
    id: 'women',
    number: '01',
    title: 'Women Empowerment',
    introduction: 'Creating stronger opportunities for women to participate, lead and prosper.',
    challenge: 'Women across Kiambu face systemic barriers to economic participation, limited access to affirmative development funds, and underrepresentation in key leadership and decision-making platforms.',
    approach: 'Leveraging the Office of the Woman Representative to champion robust affirmative legislation, forge strategic grassroots partnerships, and establish transparent frameworks that guarantee equitable resource access for women entrepreneurs.',
    actions: [
      'Establish ward-level mentorship and financial literacy hubs to equip women-led micro-enterprises with scalable business skills.',
      'Streamline access to county and national affirmative action funds to ensure zero bureaucratic exploitation of women groups.',
      'Institutionalize leadership training networks that prepare women for active governance and administrative roles across Kiambu.'
    ],
    outcome: "A financially resilient, self-sustaining generation of women entrepreneurs enjoying equal representation, secure livelihoods, and full participation in Kiambu's economic growth.",
  },
  {
    id: 'education',
    number: '02',
    title: 'Education',
    introduction: 'Expanding opportunities for quality and inclusive education.',
    challenge: "Many children, particularly girls from vulnerable backgrounds across Kiambu's wards, face school dropouts due to lack of school fees, inadequate learning infrastructure, and limited sanitary support.",
    approach: "Championing policy reforms for equitable county bursary disbursement, expanding girl child retention programs, and lobbying for improved public school infrastructure.",
    actions: [
      "Establish a transparent oversight mechanism for county bursary funds to ensure they directly reach needy students and bright girls at risk of dropping out.",
      "Partner with stakeholders to provide consistent sanitary support and mentorship programs to keep the girl child in school.",
      "Lobby for enhanced infrastructural development, modern learning tools, and resource allocation across all public educational institutions in Kiambu."
    ],
    outcome: "Higher school retention and completion rates, equal educational opportunities for girls, and an empowered, well-equipped young generation ready for future leadership.",
  },
  {
    id: 'economy',
    number: '03',
    title: 'Economy',
    introduction: 'Creating pathways to skills, enterprise and meaningful employment.',
    challenge: "High rates of youth unemployment, limited access to affordable credit for small-scale traders and local entrepreneurs, and restrictive regulatory frameworks hindering grassroots businesses across Kiambu's markets.",
    approach: "Championing business-friendly legislative frameworks, creating structured pathways for youth enterprise incubation, and advocating for affordable credit access and modern market infrastructure.",
    actions: [
      "Establish micro-enterprise incubation and digital skills hubs to equip youth with modern tools for self-employment and digital commerce.",
      "Lobby for progressive county policies and fair operating spaces for small-scale traders, hawkers, and informal sector entrepreneurs.",
      "Facilitate structured financial linkages and cooperative access to low-interest capital for youth and women-led business groups."
    ],
    outcome: "A thriving grassroots economy with drastically reduced youth unemployment, protected and well-equipped local traders, and sustainable wealth creation across Kiambu.",
  },
  {
    id: 'healthcare',
    number: '04',
    title: 'Healthcare',
    introduction: 'Ensuring accessible and quality healthcare for all residents.',
    challenge: "Inadequate access to affordable maternal healthcare, limited health insurance coverage for vulnerable households across Kiambu's wards, and under-resourced community health facilities.",
    approach: "Utilizing legislative advocacy and strategic partnerships to strengthen maternal health support, expand medical insurance outreach, and advocate for well-equipped local health centers.",
    actions: [
      "Lobby for enhanced budgetary allocation and medical supply distribution to dispensary and health center levels across all Kiambu sub-counties.",
      "Facilitate community outreach programs to help vulnerable families and mothers enroll in national and county health insurance schemes.",
      "Partner with healthcare stakeholders to champion preventive health campaigns, maternal care education, and well-being support for families."
    ],
    outcome: "Significantly improved maternal and child health outcomes, accessible medical cover for families, and healthier, well-supported communities across Kiambu.",
  }
];

export function Manifesto() {
  const [activeTab, setActiveTab] = useState(manifestoSections[0].id);
  const activeSection = manifestoSections.find(s => s.id === activeTab);

  return (
    <section className="bg-[var(--color-soft-bg)] py-16 sm:py-24 lg:py-32" id="manifesto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* B1: Manifesto Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6 sm:gap-8">
          <div className="max-w-2xl min-w-0">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <span className="w-6 sm:w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
              <span className="uppercase tracking-[0.2em] text-[11px] sm:text-xs font-bold text-[var(--color-primary-green)]">
                The Manifesto
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-4 sm:mb-6 leading-tight">
              A practical agenda for a better Kiambu.
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed italic border-l-2 border-[var(--color-primary-green)] pl-3 sm:pl-4">
              Our manifesto is built on a clear commitment: to transform legislative oversight into real, measurable empowerment for every citizen of Kiambu. Through structured policy and relentless advocacy, we are shaping a practical agenda that prioritizes people, progress, and prosperity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <a 
              href="/documents/manifesto.pdf"
              download="Kiambu-Manifesto.pdf"
              className="w-full sm:w-auto min-h-[44px] inline-flex justify-center items-center gap-2 bg-[var(--color-brand-black)] text-white px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold hover:bg-black transition-colors shadow-lg cursor-pointer text-center"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Download Full Manifesto</span>
            </a>
            <button 
              type="button"
              onClick={() => window.open('/documents/manifesto.pdf', '_blank')}
              className="w-full sm:w-auto min-h-[44px] inline-flex justify-center items-center gap-2 bg-white border border-gray-200 text-[var(--color-brand-black)] px-5 sm:px-6 py-3 rounded-full text-sm sm:text-base font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all shadow-sm cursor-pointer text-center"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Read Online</span>
            </button>
          </div>
        </div>

        {/* Manifesto Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
          
          {/* B2: Manifesto Navigation */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 w-full min-w-0">
            <div className="flex overflow-x-auto lg:flex-col gap-2 pb-3 lg:pb-0 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
              {manifestoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`flex-shrink-0 lg:w-full text-left px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center justify-between group min-h-[44px] ${
                    activeTab === section.id
                      ? 'bg-[var(--color-primary-green)] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-100'
                  }`}
                >
                  <span className="whitespace-nowrap">{section.title}</span>
                  <ChevronRight className={`hidden lg:block w-5 h-5 transition-transform shrink-0 ml-2 ${activeTab === section.id ? 'text-white' : 'text-gray-400 group-hover:text-[var(--color-primary-green)]'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* B3 & B4: Manifesto Content */}
          <div className="lg:col-span-8 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeSection && (
                <motion.div
                  key={activeSection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl border border-gray-100 min-w-0"
                >
                  <div className="mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-gray-100">
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-light-green)] block mb-2 sm:mb-4">
                      {activeSection.number}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[var(--color-brand-black)] mb-3 sm:mb-4">
                      {activeSection.title}
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                      {activeSection.introduction}
                    </p>
                  </div>
                  
                  <div className="space-y-8 sm:space-y-12">
                    {/* Problem -> Approach */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
                        <h4 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--color-campaign-red)] mb-3 sm:mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-campaign-red)] shrink-0"></span>
                          The Challenge
                        </h4>
                        <p className="text-xs sm:text-sm sm:leading-relaxed text-gray-700 leading-relaxed">
                          {activeSection.challenge}
                        </p>
                      </div>
                      
                      <div className="bg-[var(--color-primary-green)]/5 p-4 sm:p-6 rounded-2xl border border-[var(--color-primary-green)]/10">
                        <h4 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--color-primary-green)] mb-3 sm:mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-primary-green)] shrink-0"></span>
                          Our Approach
                        </h4>
                        <p className="text-xs sm:text-sm sm:leading-relaxed text-gray-700 leading-relaxed">
                          {activeSection.approach}
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div>
                      <h4 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--color-brand-black)] mb-4 sm:mb-6 border-b border-gray-100 pb-2">
                        What We Will Do
                      </h4>
                      <ul className="space-y-3 sm:space-y-4">
                        {activeSection.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-3 sm:gap-4">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-500 shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcome */}
                    <div className="bg-[var(--color-brand-black)] text-white p-5 sm:p-7 md:p-8 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-green)] opacity-20 blur-2xl rounded-full"></div>
                      <h4 className="text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--color-light-green)] mb-3 sm:mb-4 relative z-10">
                        Expected Impact
                      </h4>
                      <p className="text-sm sm:text-base md:text-lg leading-relaxed relative z-10">
                        {activeSection.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
