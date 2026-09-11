import { motion } from 'motion/react';
import { useImageStore } from '../context/ImageContext';
import { ImageWithFallback } from './common/ImageWithFallback';
import { DEFAULT_VISION_PHOTO5 } from '../utils/imageUtils';

const visionThemes = [
  {
    number: "01",
    title: "EMPOWERING WOMEN",
    description: "Creating stronger opportunities for women to participate, lead and prosper."
  },
  {
    number: "02",
    title: "EDUCATING OUR GIRL CHILD",
    description: "Expanding opportunities for quality and inclusive education."
  },
  {
    number: "03",
    title: "GROWING OUR ECONOMY",
    description: "Creating pathways to skills, enterprise and meaningful employment."
  },
  {
    number: "04",
    title: "UNITING OUR COMMUNITIES",
    description: "Ensuring inclusive leadership and equitable development across every ward."
  }
];

export function Vision() {
  const { getImage } = useImageStore();
  const visionPhoto5 = getImage('visionPhoto5', DEFAULT_VISION_PHOTO5);

  return (
    <section className="bg-white" id="vision">
      {/* A1 & A2: Section Introduction & Vision Statement */}
      <div className="py-24 sm:py-32 relative overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
              <span className="uppercase tracking-[0.2em] text-[0.7rem] sm:text-xs font-bold text-[var(--color-primary-green)]">
                Our Vision
              </span>
              <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[var(--color-brand-black)] leading-[1.1] mb-12">
              Pamoja Tujenge Kiambu Bora Kwa Wote.
            </h2>
            
            <p className="text-xl sm:text-2xl text-gray-500 font-medium leading-relaxed italic mb-16">
              "To foster a progressive, inclusive, and economically empowered Kiambu County anchored on transparent representation, equitable resource distribution, and sustainable opportunities for every citizen, woman, and youth."
            </p>

            <div className="bg-[var(--color-soft-bg)] border border-gray-100 p-8 sm:p-16 rounded-[40px] shadow-sm relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-green)] opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--color-brand-black)] leading-snug">
                "Kiambu where opportunity is accessible, leadership is accountable, and every community has a voice."
              </p>
              <div className="mt-8">
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">
                  — Wakili Phyllis Wangui, Candidate for Kiambu County Woman Representative
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* A3: Vision In One Glance */}
      <div className="py-24 sm:py-32 bg-gray-50 relative z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-16"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-brand-black)]">
              Vision In One Glance
            </h3>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {visionThemes.map((theme, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="text-5xl font-serif font-bold text-[var(--color-primary-green)] opacity-100 mb-6 select-none">
                  {theme.number}
                </div>
                <div className="w-8 h-1 bg-[var(--color-campaign-red)] mb-6 transition-all group-hover:w-16"></div>
                <h4 className="text-lg font-bold text-[var(--color-brand-black)] mb-4 leading-tight">
                  {theme.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {theme.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* A4: The Vision Statement Visual with Photo 5 */}
      <div className="relative min-h-[550px] sm:min-h-[650px] lg:min-h-[720px] py-24 sm:py-36 bg-[var(--color-brand-black)] overflow-hidden flex items-center justify-center">
        {/* Background Photo 5 with fallback */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src={visionPhoto5}
            fallbackSrc={DEFAULT_VISION_PHOTO5}
            alt="Wakili Phyllis Wangui walking with community leaders and campaign team"
            className="w-full h-full object-cover object-center"
          />
          {/* Rich multi-layer gradient overlays for high legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 pointer-events-none"></div>
          <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none"></div>
        </div>

        {/* Faint subtle topographic pattern accent */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none z-[1]" 
          style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        ></div>

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full mb-6 text-white/90 text-xs uppercase tracking-[0.2em] font-semibold">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary-green)] animate-pulse"></span>
            United For Kiambu Leadership
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight tracking-tight drop-shadow-lg mb-4">
            Pamoja Tujenge
          </h2>
          <h3 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-[var(--color-primary-green)] leading-tight drop-shadow-md">
            Kiambu Bora Kwa Wote.
          </h3>

          <div className="w-20 sm:w-28 h-1.5 bg-[var(--color-campaign-red)] mx-auto mt-8 sm:mt-10 rounded-full shadow-sm"></div>

          <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto mt-6 font-medium leading-relaxed drop-shadow">
            Standing side-by-side with our grassroots leaders and citizens across all 12 constituencies to realize a thriving, accountable Kiambu.
          </p>
        </motion.div>
      </div>

    </section>
  );
}

