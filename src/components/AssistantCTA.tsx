import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

export function AssistantCTA() {
  const openAssistant = () => {
    const event = new CustomEvent('open-ai-assistant');
    window.dispatchEvent(event);
  };

  return (
    <section className="py-24 bg-[var(--color-soft-bg)] border-y border-[var(--color-light-green)] relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-noise-pattern opacity-10 pointer-events-none rounded-tl-full mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[var(--color-light-green)]">
            <Bot className="w-8 h-8 text-[var(--color-primary-green)]" />
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[var(--color-primary-green)]">Meet Your Digital Guide</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6 max-w-2xl mx-auto">
            Have a Question About the Campaign?
          </h2>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Explore the vision, manifesto, community priorities, and ways to get involved with the help of our digital assistant.
          </p>
          
          <button 
            onClick={openAssistant}
            className="px-8 py-4 rounded-full font-bold bg-[var(--color-brand-black)] text-white hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300"
          >
            Ask the Assistant
          </button>
        </motion.div>
      </div>
    </section>
  );
}
