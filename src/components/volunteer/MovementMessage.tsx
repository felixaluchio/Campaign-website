import { motion } from 'motion/react';

export function MovementMessage() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-8 leading-tight">Leadership Is Stronger When Communities Participate.</h2>
          <p className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed italic border-l-4 border-[var(--color-primary-green)] pl-6 text-left">"We cannot achieve our true potential by acting alone. When we bring our ideas, our skills, and our collective energy together, we transform not just our wards, but the entire county of Kiambu. This campaign is about empowering you to be part of that change."</p>
        </motion.div>
      </div>
    </section>
  );
}
