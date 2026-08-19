import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ManifestoCTA() {
  return (
    <section className="py-24 bg-[var(--color-brand-black)] text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-full h-full bg-[var(--color-deep-green)] opacity-20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[var(--color-campaign-red)] opacity-10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Let's Build Kiambu Together.
          </h2>
          <p className="text-xl sm:text-2xl font-serif text-[var(--color-primary-green)] mb-12">
            Pamoja Tujenge Kiambu Bora Kwa Wote.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link 
              to="/join-the-movement"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[var(--color-campaign-red)] text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg group"
            >
              Join the Movement
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/#community"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[var(--color-primary-green)]" />
              Share Your Priority
            </Link>
            <Link
              to="/report-issue"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Report an Issue
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
