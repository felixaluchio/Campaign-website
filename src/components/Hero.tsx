import { motion } from 'motion/react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useImageStore } from '../context/ImageContext';
import { ImageWithFallback } from './common/ImageWithFallback';
import { DEFAULT_HERO_IMAGE } from '../utils/imageUtils';
import heroBadgeLogo from '../assets/images/regenerated_image_1786708658494.png';

export function Hero() {
  const { getImage } = useImageStore();
  const heroImage = getImage('heroPortrait', DEFAULT_HERO_IMAGE);

  return (
    <div className="relative min-h-[100dvh] bg-[var(--color-soft-bg)] overflow-hidden flex items-center pt-24 pb-12 lg:pb-0">
      {/* Background abstract shapes & depth */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-light-green)] blur-3xl opacity-50"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-white blur-3xl opacity-80"
        />
        
        {/* Topographic contour lines - faint */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content (approx 45%) */}
          <div className="lg:col-span-5 max-w-2xl mx-auto lg:mx-0 w-full pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[3px] bg-[var(--color-campaign-red)] rounded-full"></span>
                <span className="uppercase tracking-[0.2em] text-[0.7rem] sm:text-xs font-bold text-[var(--color-deep-green)]">
                  Wakili Phyllis Wangui
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-serif font-bold text-[var(--color-brand-black)] leading-[1.05] tracking-tight mb-8">
                Pamoja Tujenge<br />
                <span className="text-[var(--color-primary-green)]">Kiambu Bora</span><br />
                Kwa Wote
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-700 font-medium leading-snug mb-6 border-l-[3px] border-[var(--color-campaign-red)] pl-5">
                A strong voice. Real representation. Delivering results.
              </p>
              
              <p className="text-sm uppercase tracking-[0.15em] text-gray-500 font-bold mb-10 lg:mb-12">
                Candidate for Kiambu County Woman Representative
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-5">
                <Link
                  to="/vision-manifesto"
                  className="w-full sm:w-auto bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                >
                  Explore My Vision
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/meet-phyllis"
                  className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[var(--color-brand-black)] border border-gray-200 px-8 py-4 rounded-full font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center"
                >
                  Meet Phyllis
                </Link>
                <Link
                  to="/report-issue"
                  className="w-full sm:w-auto mt-2 sm:mt-0 text-[var(--color-campaign-red)] hover:text-[#a01822] font-bold px-2 py-2 transition-colors flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="underline underline-offset-4 decoration-[var(--color-campaign-red)]/30 group-hover:decoration-[var(--color-campaign-red)]">Report an Issue</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Image Composition (approx 55%) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0 z-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-lg lg:max-w-none lg:w-[110%] xl:w-[120%] lg:-mr-8 xl:-mr-16"
            >
              {/* Outer decorative frame / shadow element */}
              <div className="absolute inset-0 bg-[var(--color-primary-green)]/10 rounded-t-[140px] rounded-b-[40px] md:rounded-t-[200px] md:rounded-b-[80px] transform rotate-3 scale-[1.02] translate-x-2 translate-y-4 md:translate-x-4 md:translate-y-8 blur-sm pointer-events-none"></div>
              
              {/* Red Accent shape */}
              <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 w-32 md:w-48 h-32 md:h-48 bg-[var(--color-campaign-red)] rounded-full blur-2xl opacity-20 pointer-events-none"></div>

              {/* Main Image Container */}
              <div 
                className="relative rounded-t-[120px] rounded-b-[32px] md:rounded-t-[180px] md:rounded-b-[64px] overflow-hidden shadow-2xl border-[6px] border-white aspect-[4/5] md:aspect-[3/4] lg:h-[750px] bg-gray-100 z-10"
              >
                {/* Hero Portrait Image */}
                <ImageWithFallback 
                  src={heroImage} 
                  fallbackSrc={DEFAULT_HERO_IMAGE}
                  alt="Wakili Phyllis Wangui" 
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                                
                {/* Inner white border accent */}
                <div className="absolute inset-2 border border-white/40 rounded-t-[112px] rounded-b-[24px] md:rounded-t-[170px] md:rounded-b-[56px] pointer-events-none mix-blend-overlay z-10"></div>
                                
                {/* Subtle bottom gradient to ground the portrait */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10"></div>
              </div>

              {/* Integrated DCP Campaign Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-6 left-2 md:bottom-12 md:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 z-30 flex items-center gap-3"
              >
                <div className="h-10 md:h-12 w-auto flex items-center justify-center shrink-0">
                  <img 
                    src={heroBadgeLogo} 
                    alt="Phyllis Wangui Campaign Logo" 
                    className="h-9 md:h-11 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="border-l border-slate-200 pl-3 pr-1">
                  <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest mb-0.5">Official Candidate</p>
                  <p className="text-xs md:text-sm font-bold text-[var(--color-deep-green)]">Kiambu County • 2027</p>
                </div>
              </motion.div>
              
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
