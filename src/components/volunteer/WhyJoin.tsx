import { motion } from 'motion/react';
import { Megaphone, HeartHandshake, Briefcase, Users, Bell } from 'lucide-react';

const reasons = [
  { number: "01", title: "BE HEARD", description: "Help bring community priorities forward.", icon: Megaphone, color: "var(--color-primary-green)" },
  { number: "02", title: "SERVE YOUR COMMUNITY", description: "Support constructive community engagement.", icon: HeartHandshake, color: "var(--color-campaign-red)" },
  { number: "03", title: "SHARE YOUR SKILLS", description: "Contribute professional, technical or community skills.", icon: Briefcase, color: "var(--color-brand-black)" },
  { number: "04", title: "CONNECT WITH OTHERS", description: "Meet people working toward shared community goals.", icon: Users, color: "var(--color-primary-green)" },
  { number: "05", title: "STAY INFORMED", description: "Receive updates about campaign activities.", icon: Bell, color: "var(--color-campaign-red)" }
];

export function WhyJoin() {
  return (
    <section className="py-24 bg-[var(--color-soft-bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6">Why People Join</h2>
          <div className="w-24 h-1 bg-[var(--color-primary-green)] mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <motion.div key={reason.number} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none z-0">
                <reason.icon className="w-32 h-32" style={{ color: reason.color }} />
              </div>
              <div className="relative z-10">
                <div className="text-4xl font-serif font-bold text-gray-200 mb-6 group-hover:text-[var(--color-campaign-red)] transition-colors">{reason.number}</div>
                <h3 className="text-xl font-bold text-[var(--color-brand-black)] mb-4 tracking-wide">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
