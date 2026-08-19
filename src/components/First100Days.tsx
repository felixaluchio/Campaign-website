import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, ExternalLink, Calendar, CheckCircle2, Clock, X, FileText } from 'lucide-react';

const first100DaysData = {
  introduction: "Our first 100 days will set the standard for the next five years. We are committing to immediate listening, proactive advocacy, and transparent reporting across all constituencies.",
  currentDay: 0,
  completedActions: 0,
  totalActions: 3,
  lastUpdated: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
  phases: [
    {
      id: "phase1",
      period: "DAYS 1–30",
      title: "LISTEN & ORGANIZE",
      description: "Meet residents, identify priority concerns, establish structured community feedback channels, and review existing programs and opportunities.",
      actions: [
        {
          title: "Community Listening Forums",
          description: "Convene structured listening sessions across Kiambu constituencies to document urgent priorities.",
          output: "Publish a consolidated Ward Priority Report",
          status: "PLANNED"
        }
      ]
    },
    {
      id: "phase2",
      period: "DAYS 31–60",
      title: "ACT & ADVOCATE",
      description: "Prioritize the most urgent community concerns, raise relevant issues through the appropriate national institutions, and strengthen stakeholder partnerships.",
      actions: [
        {
          title: "Legislative Advocacy Framework",
          description: "Draft and submit motions to the National Assembly advocating for resources allocated to Kiambu's most urgent needs.",
          output: "Two legislative petitions submitted",
          status: "PLANNED"
        }
      ]
    },
    {
      id: "phase3",
      period: "DAYS 61–100",
      title: "REPORT & DELIVER",
      description: "Publish progress updates, report on issues raised, communicate actions taken, and collect additional citizen feedback.",
      actions: [
        {
          title: "First Quarter Progress Report",
          description: "Release a comprehensive, publicly accessible report detailing all engagements, advocacy efforts, and next steps.",
          output: "Public town hall and published accountability report",
          status: "PLANNED"
        }
      ]
    }
  ]
};

export function First100Days() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  useEffect(() => {
    // Calculate progress for the visual tracker
    const targetProgress = first100DaysData.currentDay > 0 
      ? Math.min(100, Math.round((first100DaysData.currentDay / 100) * 100))
      : 0;
      
    // Simple animation for the progress bar
    setTimeout(() => setProgressPercent(targetProgress), 500);
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return { icon: <CheckCircle2 className="w-4 h-4" />, color: 'text-green-600', bg: 'bg-green-100' };
      case 'IN PROGRESS':
        return { icon: <Clock className="w-4 h-4" />, color: 'text-blue-600', bg: 'bg-blue-100' };
      default: // PLANNED
        return { icon: <Calendar className="w-4 h-4" />, color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  return (
    <section className="bg-gray-50 relative overflow-hidden pt-32 pb-24" id="100-days">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none overflow-hidden flex items-start justify-end pr-10 pt-10">
        <span className="text-[40vw] font-serif font-bold leading-none tracking-tighter mix-blend-multiply select-none text-[var(--color-primary-green)]">
          100
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* A1: Section Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[var(--color-primary-green)]">
              The First 100 Days
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[var(--color-brand-black)] mb-8 leading-tight">
            100 Days of Listening. Acting. Delivering.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-[var(--color-primary-green)] pl-6">
            {first100DaysData.introduction}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Main Content Area: Timeline */}
          <div className="lg:col-span-8">
            <div className="space-y-20">
              {first100DaysData.phases.map((phase, phaseIdx) => (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative"
                >
                  {/* Timeline connector */}
                  {phaseIdx !== first100DaysData.phases.length - 1 && (
                    <div className="absolute top-16 bottom-[-5rem] left-[1.15rem] w-px bg-gray-200 -z-10 hidden sm:block"></div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-10">
                    <div className="bg-[var(--color-brand-black)] text-white text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-full shrink-0">
                      {phase.period}
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-[var(--color-primary-green)] mb-4">
                        {phase.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  {/* A7: 100-Day Action Cards */}
                  <div className="space-y-6 sm:pl-16">
                    {phase.actions.map((action, actionIdx) => {
                      const status = getStatusConfig(action.status);
                      
                      return (
                        <div key={actionIdx} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                            <h4 className="text-xl font-bold text-[var(--color-brand-black)]">
                              {action.title}
                            </h4>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status.bg} ${status.color}`}>
                              {status.icon}
                              {action.status}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {action.description}
                          </p>
                          
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <h5 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                              Expected Output
                            </h5>
                            <p className="text-[var(--color-brand-black)] font-medium">
                              {action.output}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Area: Tracker & Accountability */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* A8: Progress Tracker */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-32">
              <h3 className="text-xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
                Progress Tracker
              </h3>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-4xl font-serif font-bold text-[var(--color-primary-green)] leading-none">
                    {progressPercent}%
                  </span>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {first100DaysData.currentDay === 0 ? 'Planning' : `${first100DaysData.currentDay} / 100 Days`}
                  </span>
                </div>
                
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-[var(--color-primary-green)] rounded-full"
                  />
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Days Elapsed</span>
                  <span className="font-bold text-[var(--color-brand-black)]">{first100DaysData.currentDay}</span>
                </li>
                <li className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Actions Completed</span>
                  <span className="font-bold text-[var(--color-brand-black)]">{first100DaysData.completedActions} / {first100DaysData.totalActions}</span>
                </li>
              </ul>

              {/* K: Trust & Transparency */}
              <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
                Last updated: {first100DaysData.lastUpdated}
              </div>
            </div>

            {/* A9: Accountability Principle */}
            <div className="bg-[var(--color-primary-green)] text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-deep-green)] rounded-full mix-blend-multiply opacity-50 blur-xl"></div>
              <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">
                We Will Report Back.
              </h3>
              <p className="text-[var(--color-light-green)] leading-relaxed relative z-10">
                "A core promise to return to the people with results, maintaining transparency at every stage of the 100-day journey."
              </p>
            </div>

            {/* A10: Downloadable Plan */}
            <div className="flex flex-col gap-3">
              <a 
                href="/documents/100-day-plan.pdf"
                download="100-day-plan.pdf"
                className="w-full inline-flex justify-center items-center gap-2 bg-[var(--color-brand-black)] text-white px-6 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download the 100-Day Plan
              </a>
              <button 
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full inline-flex justify-center items-center gap-2 bg-white text-[var(--color-brand-black)] border border-gray-200 px-6 py-4 rounded-xl font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-colors shadow-sm cursor-pointer"
              >
                <ExternalLink className="w-5 h-5" />
                Read Online
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {isPdfModalOpen && (
          <div className="bg-black/50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[var(--color-primary-green)]">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 text-base sm:text-lg">
                      100-Day Action Plan
                    </h3>
                    <p className="text-xs text-gray-500">
                      Wakili Phyllis Wangui • Kiambu County Roadmap
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/documents/100-day-plan.pdf"
                    download="100-day-plan.pdf"
                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-[var(--color-primary-green)] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsPdfModalOpen(false)}
                    className="text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body with <object> tag */}
              <div className="w-full h-full flex-1 bg-gray-100 overflow-hidden relative">
                <object
                  data="/documents/100-day-plan.pdf#view=FitH"
                  type="application/pdf"
                  className="w-full h-full bg-gray-100"
                >
                  {/* Fallback UI */}
                  <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                    <p className="text-slate-500 mb-4">Your browser does not support inline PDFs.</p>
                    <a
                      href="/documents/100-day-plan.pdf"
                      download
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-500 transition-colors inline-flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Document Instead
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
