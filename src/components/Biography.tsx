import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useImageStore } from '../context/ImageContext';
import { ImageWithFallback } from './common/ImageWithFallback';
import { 
  DEFAULT_BIO_PORTRAIT, 
  DEFAULT_HER_STORY_PHOTO, 
  DEFAULT_ROOTED_IN_KIAMBU_PHOTO,
  coreValuesQuoteBg,
  PLACEHOLDER_CORE_VALUES_QUOTE
} from '../utils/imageUtils';

const candidateBiography = {

  intro: {
    heading: "Leadership begins with understanding the people you serve.",
    paragraph: "I am Wakili Phyllis Wangui Kamau, an advocate by profession and a servant leader by calling. Driven by a deep commitment to ethical practice and strong advocacy, my mission is to deliver real representation for the people of Kiambu. My approach to leadership is rooted in 'Law with purpose and Leadership with impact,' ensuring that every legislative effort translates into tangible development for our community."
  },
  story: [
    { label: "Background", content: "Driven by a vision to build a greater Kiambu for everyone, Phyllis Wangui Kamau is stepping forward as the Woman Representative candidate for Kiambu County 2027. Guided by the philosophy of 'service beyond self,' she believes in inclusive leadership encapsulated in her campaign vision, 'Pamoja Tujenge Kiambu Bora Kwa Wote'." },
    { label: "Education", content: "Wakili Phyllis Wangui possesses a robust academic foundation in law and policy. She holds a Bachelor of Laws (LLB) with Honors from Kabarak University and a Postgraduate Diploma in Law from the Kenya School of Law. Further advancing her legal expertise, she earned a Master of Laws (LLM) degree from the University of Nairobi's College of Humanities and Social Sciences." },
    { label: "Professional Journey", content: "As an Advocate, Phyllis has built a distinguished professional career with specialized expertise in legal due diligence, compliance, statutory adherence, and governance audits. Her experience in legal practice, including her work with established law firms like MMA Advocates, has equipped her with a profound understanding of policy frameworks and the legislative rigor required to effectively advocate for Kiambu's citizens." },
    { label: "Community Involvement", content: "Phyllis’s grassroots initiatives are directly aligned with her four core development pillars: Empowering Women, Educating Our Girl Child, Growing Our Economy, and Uniting Our Communities. She actively leverages her legal expertise to provide policy insights, advocate for vulnerable populations, and push for economic structures that uplift local enterprises across Kiambu County." },
  ],
  professionalIdentity: [
    { title: "Legal Experience", description: "Distinguished legal practice specializing in compliance, statutory adherence, due diligence, and governance audits." },
    { title: "Leadership", description: "Servant leadership guided by ethics, inclusivity, and strategic legislative advocacy for Kiambu County." },
    { title: "Community", description: "Active champion for women empowerment, girl child education, economic growth, and community unity." },
    { title: "Public Service", description: "Dedicated to delivering accountable representation, transparent governance, and practical local solutions." },
  ],
  values: [
    { title: "Integrity", desc: "Upholding unwavering ethics and transparency in leadership." },
    { title: "Service", desc: "Putting the needs and progress of Kiambu residents first." },
    { title: "Accountability", desc: "Delivering open governance and measurable results." },
    { title: "Opportunity", desc: "Creating avenues for economic empowerment and education." },
    { title: "Inclusion", desc: "Ensuring every voice across Kiambu is heard and valued." }
  ],
  quote: "Law with purpose and Leadership with impact — together, we can build a stronger, fairer, and more prosperous Kiambu for all.",
  connection: {
    heading: "Rooted in Kiambu",
    content: "Deeply connected to the people and diverse communities of Kiambu County, Wakili Phyllis understands both the rich potential and the everyday challenges facing our families, farmers, and entrepreneurs. Her mission is to serve with dedication, turning local priorities into actionable progress."
  }
};

export function Biography() {
  const { getImage } = useImageStore();

  // 1. Candidate Bio Portrait
  const bioPortraitSrc = getImage('meetPhyllisBio', DEFAULT_BIO_PORTRAIT);

  // 2. Her Story Card (Biography / Community)
  const herStoryPhotoSrc = getImage('herStoryCardPhoto', DEFAULT_HER_STORY_PHOTO);

  // 3. What Guides Her Quote Card Background (Leadership / Values) - Dedicated & Isolated via coreValuesQuoteBg
  const currentCoreValuesQuoteBg = getImage('coreValuesQuoteBg', coreValuesQuoteBg);

  // 4. Rooted in Kiambu Card (Grassroots Outreach)
  const rootedInKiambuSrc = getImage('rootedInKiambuPhoto', DEFAULT_ROOTED_IN_KIAMBU_PHOTO);

  return (
    <section className="bg-white relative overflow-hidden" id="meet-phyllis">

      {/* Background texture & soft elements */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none z-0"></div>
      
      {/* Subtle Topographic Accent */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* A1. Section Introduction & A2. Large Portrait */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column (Candidate Anchor + Cards 03 & 04 - lg:col-span-5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Organic Frame / Red Accent / Soft Shadow */}
              <div className="absolute -inset-3 bg-[var(--color-primary-green)]/5 rounded-2xl blur-md pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-[var(--color-campaign-red)] rounded-full blur-2xl opacity-15 pointer-events-none"></div>
              
              {/* Portrait Styled Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-gray-50 aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]">
                <ImageWithFallback 
                  src={bioPortraitSrc} 
                  fallbackSrc={DEFAULT_BIO_PORTRAIT}
                  alt="Portrait of Wakili Phyllis Wangui, candidate for Kiambu County Woman Representative" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none"></div>
              </div>


              {/* Quick-Facts Badge beneath the Image */}
              <div className="mt-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
                <h4 className="font-serif font-bold text-lg text-[var(--color-brand-black)]">
                  Wakili Phyllis Wangui Kamau
                </h4>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-green)] mt-1">
                  Advocate of the High Court of Kenya
                </p>
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600 font-medium">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-soft-bg)] border border-slate-200/60">LLB (Hons)</span>
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-soft-bg)] border border-slate-200/60">LLM (UoN)</span>
                  <span className="px-2.5 py-1 rounded-full bg-[var(--color-soft-bg)] border border-slate-200/60">KSL Dip</span>
                </div>
                <div className="mt-3 pt-2.5 text-[11px] font-semibold text-[var(--color-campaign-red)] flex items-center justify-center gap-1.5 border-t border-slate-100/60">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-campaign-red)] animate-pulse"></span>
                  <span>Woman Rep Candidate • Kiambu County 2027</span>
                </div>
              </div>
            </motion.div>

            {/* Cards 03 & 04 (Professional Journey & Community Involvement) in Left Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-5"
            >
              {candidateBiography.story.slice(2, 4).map((item, idx) => (
                <div 
                  key={idx + 2} 
                  className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-primary-green)] group-hover:bg-[var(--color-campaign-red)] transition-colors"></div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[var(--color-light-green)] flex items-center justify-center text-[var(--color-primary-green)] font-bold text-xs shrink-0">
                      0{idx + 3}
                    </span>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-green)]">
                      {item.label}
                    </h4>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {item.content}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column ("Her Story" Cards 01 & 02 - lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
                <span className="uppercase tracking-[0.2em] text-[0.7rem] sm:text-xs font-bold text-[var(--color-campaign-red)]">
                  Meet Phyllis
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[var(--color-brand-black)] leading-[1.15] mb-6 tracking-tight">
                {candidateBiography.intro.heading}
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed border-l-[3px] border-[var(--color-campaign-red)] pl-5">
                {candidateBiography.intro.paragraph}
              </p>
            </motion.div>

            {/* Her Story Cards 01 & 02 (Background & Education) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-4"
            >
              <h3 className="text-2xl font-serif font-bold text-[var(--color-brand-black)] mb-6 flex items-center gap-3">
                <span className="w-6 h-[2px] bg-[var(--color-primary-green)] rounded-full"></span>
                Her Story
              </h3>
              
              <div className="space-y-5">
                {candidateBiography.story.slice(0, 2).map((item, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--color-primary-green)] group-hover:bg-[var(--color-campaign-red)] transition-colors"></div>
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="w-7 h-7 rounded-lg bg-[var(--color-light-green)] flex items-center justify-center text-[var(--color-primary-green)] font-bold text-xs shrink-0">
                        0{idx + 1}
                      </span>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-green)]">
                        {item.label}
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Dedicated Image Card for Her Story */}
              <div className="w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-200 relative bg-slate-50 mt-6">
                <ImageWithFallback 
                  src={herStoryPhotoSrc} 
                  fallbackSrc={DEFAULT_HER_STORY_PHOTO}
                  alt="Her Story - Community and legal advocates" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* A4. Professional Identity */}
      <div className="bg-[var(--color-soft-bg)] py-24 sm:py-32 relative z-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {candidateBiography.professionalIdentity.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="text-5xl font-serif font-bold text-[var(--color-primary-green)] mb-4 select-none opacity-100">
                  0{idx + 1}
                </div>
                <h4 className="text-xl font-bold text-[var(--color-brand-black)] mb-3 pb-3 border-b-2 border-[var(--color-primary-green)] inline-block">
                  {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* A5. Values & A6. Quote */}
      <div className="py-24 sm:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
                  <span className="uppercase tracking-[0.2em] text-[0.7rem] sm:text-xs font-bold text-[var(--color-brand-black)]">
                    What Guides Her
                  </span>
                </div>
                <div className="space-y-6">
                  {candidateBiography.values.map((val, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-green)] mt-2.5 shrink-0"></div>
                      <div>
                        <h4 className="text-lg font-bold text-[var(--color-brand-black)]">{val.title}</h4>
                        <p className="text-sm text-gray-500 italic mt-0.5">{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="bg-[var(--color-brand-black)] rounded-3xl p-10 sm:p-16 relative overflow-hidden shadow-xl"
              >
                {/* Quote Card Dedicated Background Image (Isolated via coreValuesQuoteBg) */}
                <ImageWithFallback 
                  src={currentCoreValuesQuoteBg} 
                  fallbackSrc={coreValuesQuoteBg}
                  alt="What Guides Her - Leadership and values presentation" 
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-100 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30 z-0"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-deep-green)] opacity-20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 z-0"></div>

                <div className="text-[var(--color-campaign-red)] font-serif text-8xl absolute top-6 left-6 opacity-30 leading-none z-10">"</div>
                <blockquote className="relative z-10 pt-8">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white leading-snug drop-shadow-md">
                    {candidateBiography.quote}
                  </p>
                </blockquote>
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* A7. Personal Connection & A8. CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-[var(--color-brand-black)] border border-gray-800 p-8 sm:p-16 rounded-[40px] shadow-xl relative overflow-hidden"
        >
          {/* Background Photo */}
          <ImageWithFallback 
            src={rootedInKiambuSrc} 
            fallbackSrc={DEFAULT_ROOTED_IN_KIAMBU_PHOTO}
            alt="Rooted in Kiambu - Local grassroots outreach" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent z-0"></div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div className="bg-transparent">
              <h3 className="text-3xl font-serif font-bold text-white mb-6 drop-shadow">
                {candidateBiography.connection.heading}
              </h3>
              <p className="text-lg text-gray-200 leading-relaxed mb-10 drop-shadow-sm">
                {candidateBiography.connection.content}
              </p>
            </div>
            
            <div className="flex flex-col justify-center sm:items-start md:items-end gap-5">
              <Link
                to="/meet-phyllis"
                className="w-full sm:w-auto bg-[var(--color-primary-green)] hover:bg-[var(--color-deep-green)] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md flex items-center justify-center sm:justify-start gap-2 group/btn"
              >
                Read Her Full Story
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/vision-manifesto"
                className="w-full sm:w-auto bg-black/50 hover:bg-black/70 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center sm:justify-start gap-2"
              >
                Explore Her Vision
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}

