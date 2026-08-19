import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';
import communityMovementImg from '../../assets/images/regenerated_image_1786622727731.jpg';

export function MovementHero() {
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[var(--color-soft-bg)]">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[var(--color-light-green)] rounded-full blur-[150px] opacity-40"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[var(--color-deep-green)] rounded-full blur-[150px] opacity-10"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-4 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
              <span className="uppercase tracking-[0.2em] text-xs font-bold text-[var(--color-primary-green)]">Join The Movement</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[var(--color-brand-black)] mb-6 leading-tight">Together, We Can Build a Better Kiambu.</h1>
            <p className="text-xl md:text-2xl font-serif text-[var(--color-primary-green)] italic mb-8 border-l-4 border-[var(--color-campaign-red)] pl-6">"Pamoja Tujenge Kiambu Bora Kwa Wote."</p>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">This movement is built on the belief that real change comes from the ground up—driven by the voices, resilience, and active participation of every citizen across Kiambu. Together, we are creating a transparent, inclusive platform to champion grassroots priorities, protect our local traders, empower our women and youth, and build a greater Kiambu for all.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#register" className="inline-flex justify-center items-center gap-2 bg-[var(--color-primary-green)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-deep-green)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">Join the Movement</a>
              <a href="#participate" className="inline-flex justify-center items-center gap-2 bg-white text-[var(--color-brand-black)] border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-[var(--color-primary-green)] hover:text-[var(--color-primary-green)] transition-all shadow-sm">See How You Can Help<ArrowRight className="w-4 h-4" /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] sm:aspect-square bg-gray-100 shadow-2xl">
              <ImageWithFallback 
                src={communityMovementImg || '/images/regenerated_image_1786622727731.jpg'} 
                fallbackSrc="/images/regenerated_image_1786622727731.jpg"
                alt="Community members gathering in Kiambu" 
                className="absolute inset-0 w-full h-full object-cover object-center" 
              />
              <div className="absolute inset-0 bg-[var(--color-primary-green)] mix-blend-multiply opacity-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

