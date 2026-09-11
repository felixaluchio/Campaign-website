import { motion } from 'motion/react';
import { Users, Globe, CalendarHeart, Ear, Briefcase, Paintbrush, FileSearch, MessageSquare } from 'lucide-react';

const ways = [
  { id: "community-volunteer", title: "COMMUNITY VOLUNTEER", description: "Help with local community engagement activities.", icon: Users },
  { id: "digital-volunteer", title: "DIGITAL VOLUNTEER", description: "Support digital communication and online engagement.", icon: Globe },
  { id: "event-support", title: "EVENT SUPPORT", description: "Assist with approved campaign events.", icon: CalendarHeart },
  { id: "community-listener", title: "COMMUNITY LISTENER", description: "Help identify and document community priorities.", icon: Ear },
  { id: "professional-skills", title: "PROFESSIONAL / SKILLS", description: "Contribute approved professional skills.", icon: Briefcase },
  { id: "content-creative", title: "CONTENT & CREATIVE", description: "Support creative activities.", icon: Paintbrush },
  { id: "research-policy", title: "RESEARCH & POLICY", description: "Support policy-related work.", icon: FileSearch },
  { id: "other", title: "OTHER WAYS", description: "Specify another way you would like to contribute.", icon: MessageSquare }
];

export function WaysToParticipate() {
  return (
    <section id="participate" className="py-24 bg-[var(--color-primary-green)] text-white relative">
      <div className="absolute inset-0 bg-noise-pattern opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">How Would You Like To Get Involved?</h2>
          <p className="text-[var(--color-light-green)] text-lg">Choose the areas where you feel you can make the biggest impact.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ways.map((way, idx) => (
            <motion.div key={way.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }} className="bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-2xl backdrop-blur-sm transition-all group">
              <way.icon className="w-8 h-8 text-[var(--color-light-green)] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-sm tracking-wider mb-2">{way.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{way.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
