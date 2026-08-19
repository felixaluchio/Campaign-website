import { motion } from 'motion/react';
import { Quote, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import photo16Img from '../assets/images/regenerated_image_1786612149460.jpg';

const whyRunningContent = {
  intro: {
    eyebrow: "WHY I'M RUNNING",
    heading: "A decision rooted in service.",
    paragraph: (
      <>
        My decision to run for Kiambu County Woman Representative is born from a simple but powerful belief: our county’s immense potential can only be realized through ethical, inclusive, and actionable leadership. Throughout my career as an Advocate, I have witnessed firsthand the systemic challenges facing our communities—from economic barriers holding back local enterprises to gaps in education and representation for women and girls. I am running to bridge these gaps. By empowering women, educating our girl child, growing our local economy, and uniting our diverse communities, we can move beyond empty promises and deliver tangible progress. I am stepping forward to ensure that every resident of Kiambu has a strong, uncompromising voice advocating for their future. Because together—<span className="italic">Pamoja Tujenge Kiambu Bora Kwa Wote</span>—we will build a greater Kiambu for everyone.
      </>
    )
  },
  problem: {
    heading: "Kiambu deserves representation that listens.",
    priorities: [
      { 
        topic: "Economic Opportunity", 
        desc: "Driving legislative frameworks that protect small-scale traders and uplift local enterprises. Growing our economy means creating sustainable wealth, supporting grassroots businesses, and ensuring equitable resource distribution across Kiambu." 
      },
      { 
        topic: "Youth Opportunities", 
        desc: "Prioritizing the education of our girl child while expanding mentorship and skill-building avenues for all youth. Kiambu’s future relies on equipping our next generation with the resources and platforms they need to succeed." 
      },
      { 
        topic: "Women's Empowerment", 
        desc: "Fiercely advocating for the inclusion of women in leadership and economic spaces. We are committed to dismantling barriers and providing the support necessary for women to thrive independently and securely." 
      },
      { 
        topic: "Accountability", 
        desc: "Guided by ethical practice and 'Law with purpose' to ensure transparent and measurable results. Uniting our communities requires leaders who listen, answer directly to the people, and relentlessly protect public interests." 
      },
    ]
  },
  motivation: {
    heading: "Why Now?",
    content: "Kiambu stands at a critical juncture where the call for transformative, accountable leadership has never been louder. This is the exact right moment to step forward because our communities require leaders who possess not just passion, but the legal expertise and structural understanding to demand effective oversight and protect public interests. We are moving past empty rhetoric into an era where legislative advocacy must directly address the economic realities of our traders, the future of our youth, and the empowerment of our women."
  },
  personalStatement: {
    heading: "I believe...",
    statement: "The time for passive representation is over. Kiambu needs leaders with the legal acumen, integrity, and dedication to translate community potential into tangible, lasting results."
  },
  journey: [
    { label: "EXPERIENCE", desc: "Grounded in rigorous legal training and professional advocacy, providing the structural foundation needed to navigate county legislative duties." },
    { label: "UNDERSTANDING", desc: "Deeply tuned to the daily realities, economic pressures, and grassroots needs of Kiambu's families, traders, and youth." },
    { label: "SERVICE", desc: "Guided by the philosophy of 'service beyond self,' putting the welfare and progress of Kiambu residents first at all times." },
    { label: "ACTION", desc: "Translating policy frameworks and community priorities into proactive, ground-level empowerment programs and advocacy." },
    { label: "RESULTS", desc: "Delivering measurable, transparent outcomes that uplift every ward and build a greater Kiambu for all." },
  ],
  promise: {
    heading: "A Different Standard of Representation",
    content: "Dedicated to transparent, people-centered leadership that elevates Kiambu County through purposeful lawmaking, grassroots empowerment, and accountable representation.",
    slogan: "Pamoja Tujenge Kiambu Bora Kwa Wote."
  }
};

export function WhyRunning() {
  return (
    <section className="bg-[var(--color-brand-black)] text-white relative overflow-hidden pt-24 lg:pt-32 pb-16" id="why-im-running">
      
      {/* Subtle Topographic Lines (Kiambu reference) */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '48px 48px' }}></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-deep-green)] opacity-20 blur-[120px] pointer-events-none"></div>

      {/* B1. Section Intro */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
            <span className="uppercase tracking-[0.2em] text-[0.7rem] sm:text-xs font-bold text-[var(--color-primary-green)]">
              {whyRunningContent.intro.eyebrow}
            </span>
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-8">
            {whyRunningContent.intro.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed">
            {whyRunningContent.intro.paragraph}
          </p>
        </motion.div>
      </div>

      {/* B2. The Problem */}
      <div className="border-t border-white/10 bg-black/20 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16 max-w-2xl"
          >
            <h3 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-white/90">
              {whyRunningContent.problem.heading}
            </h3>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {whyRunningContent.problem.priorities.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary-green)]/20 group-hover:border-[var(--color-primary-green)]/50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-campaign-red)]"></div>
                </div>
                <h4 className="text-lg font-bold text-white/90 mb-3">{item.topic}</h4>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* B3. The Motivation & B4. Personal Motivation */}
      <div className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Why Now */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="text-[150px] sm:text-[200px] font-serif font-bold text-white/5 absolute -top-16 -left-8 sm:-left-12 select-none leading-none tracking-tighter">
                NOW
              </div>
              <div className="relative z-10 pt-12 sm:pt-20">
                <h3 className="text-3xl font-serif font-bold text-[var(--color-primary-green)] mb-6">
                  {whyRunningContent.motivation.heading}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed border-l-[3px] border-[var(--color-campaign-red)] pl-6">
                  {whyRunningContent.motivation.content}
                </p>
              </div>
            </motion.div>

            {/* I believe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-[var(--color-primary-green)] text-white p-10 sm:p-16 rounded-[40px] shadow-2xl relative overflow-hidden group"
            >
              {/* Background Photo (photo16) */}
              <ImageWithFallback 
                src={photo16Img || '/images/regenerated_image_1786612149460.jpg'}
                fallbackSrc="/images/regenerated_image_1786612149460.jpg"
                alt="Wakili Phyllis Wangui with Kiambu community members"
                className="absolute inset-0 w-full h-full object-cover object-center opacity-100 filter contrast-105 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-0 pointer-events-none"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold uppercase tracking-widest text-white/90 mb-8 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-campaign-red)]"></span>
                  {whyRunningContent.personalStatement.heading}
                </h3>
                <p className="text-2xl sm:text-3xl font-serif font-medium leading-snug drop-shadow-md">
                  "{whyRunningContent.personalStatement.statement}"
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* B5. From Experience to Action (Horizontal Journey) */}
      <div className="py-24 bg-white/5 border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-4 relative">
            
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-white/10 z-0"></div>

            {whyRunningContent.journey.map((stage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-row lg:flex-col items-center lg:items-start text-left lg:text-center w-full lg:w-[18%] gap-6 lg:gap-4 group"
              >
                {/* Number / Dot Node */}
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-black)] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white/50 group-hover:border-[var(--color-primary-green)] group-hover:text-[var(--color-primary-green)] transition-colors shrink-0">
                  0{idx + 1}
                </div>
                
                {/* Mobile connecting line */}
                {idx !== whyRunningContent.journey.length - 1 && (
                  <div className="block lg:hidden absolute top-14 left-6 w-[2px] h-full -ml-[1px] bg-white/10 -z-10"></div>
                )}

                <div className="flex-1 lg:flex-none">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-white/90 mb-2 lg:mx-auto">
                    {stage.label}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] lg:mx-auto">
                    {stage.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* B6. The Promise */}
      <div className="pt-24 pb-16 relative z-10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-serif font-bold text-white mb-6">
              {whyRunningContent.promise.heading}
            </h3>
            <p className="text-lg text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
              {whyRunningContent.promise.content}
            </p>
            
            <div className="inline-block border border-[var(--color-primary-green)]/30 bg-[var(--color-primary-green)]/10 px-8 py-4 rounded-full">
              <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[var(--color-light-green)]">
                {whyRunningContent.promise.slogan}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

