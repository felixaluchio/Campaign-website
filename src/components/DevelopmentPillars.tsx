import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './common/ImageWithFallback';
import womenEmpowermentImg from '../assets/images/regenerated_image_1786618468353.jpg';
import girlChildEducationImg from '../assets/images/regenerated_image_1786619749690.png';
import growingEconomyImg from '../assets/images/regenerated_image_1786620494402.jpg';
import photo16Img from '../assets/images/photo16.png';

const developmentPillars = [
  {
    number: "01",
    title: "Empowering Women",
    description: "Creating stronger opportunities for women to participate, lead, and prosper across all wards of Kiambu through targeted legislative advocacy, financial inclusion, and capacity building.",
    priorities: [
      "Women in business initiatives",
      "Financial inclusion programs",
      "Leadership and skills development",
      "Support for women-led enterprises"
    ],
    statistic: "Over 75% of grassroots micro-enterprises and market stalls in Kiambu are driven by women entrepreneurs, forming the backbone of our local community development.",
    imagePlaceholder: "bg-[var(--color-primary-green)]/10",
    imageSrc: womenEmpowermentImg || "/images/regenerated_image_1786618468353.jpg"
  },
  {
    number: "02",
    title: "Educating Our Girl Child",
    description: "Expanding opportunities for quality, inclusive education, and long-term retention for the girl child through targeted mentorship, bursary oversight, and resource allocation across all wards of Kiambu.",
    priorities: [
      "Improving access and retention",
      "Digital literacy programs",
      "Mentorship and transition opportunities",
      "Safe learning environments"
    ],
    statistic: "Dedicated to championing policy frameworks and community support networks that guarantee equal access, high school retention, and transition opportunities for every girl child in Kiambu County.",
    imagePlaceholder: "bg-blue-900/10",
    imageSrc: girlChildEducationImg || "/images/regenerated_image_1786619749690.png"
  },
  {
    number: "03",
    title: "Growing Our Economy",
    description: "Creating pathways to skills, enterprise, and meaningful employment across Kiambu through structured support for small-scale traders, agricultural market linkages, and youth-led innovations.",
    priorities: [
      "Small business support",
      "Youth employment initiatives",
      "Agricultural market access",
      "Innovation and entrepreneurship hubs"
    ],
    statistic: "Championing legislative frameworks and resource mechanisms dedicated to protecting small businesses, expanding market access, and driving sustainable grassroots economic development across Kiambu.",
    imagePlaceholder: "bg-amber-900/10",
    imageSrc: growingEconomyImg || "/images/regenerated_image_1786620494402.jpg"
  },
  {
    number: "04",
    title: "Uniting Our Communities",
    description: "Ensuring inclusive leadership, social cohesion, and equitable resource distribution across every ward in Kiambu through participatory engagement, transparent communication, and accessible representation.",
    priorities: [
      "Community participation",
      "Civic engagement",
      "Inclusive leadership structures",
      "Accessible representation"
    ],
    statistic: "Building strong bridges of unity and cooperation across all sub-counties, ensuring that every citizen's voice is heard, valued, and effectively represented in county development.",
    imagePlaceholder: "bg-purple-900/10",
    imageSrc: photo16Img || "/images/photo16.png"
  }
];

export function DevelopmentPillars() {
  return (
    <section className="bg-white py-24 sm:py-32" id="pillars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[var(--color-primary-green)]">
              Core Focus Areas
            </span>
            <span className="w-8 h-[2px] bg-[var(--color-campaign-red)] rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
            Development Pillars
          </h2>
        </motion.div>

        {/* Pillars List */}
        <div className="space-y-24 sm:space-y-32">
          {developmentPillars.map((pillar, idx) => {
            const isFeatured = idx === 0;
            const isEven = idx % 2 !== 0; // for alternating layout

            return (
              <motion.div 
                key={pillar.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center group`}
              >
                {/* Visual Side */}
                <div className={`w-full ${isFeatured ? 'lg:w-7/12' : 'lg:w-1/2'} aspect-[4/3] ${isFeatured ? 'lg:aspect-video' : ''} rounded-[32px] overflow-hidden relative bg-gray-100`}>
                  {/* Placeholder for actual photography */}
                  {pillar.imageSrc ? (
                    <>
                      <ImageWithFallback 
                        src={pillar.imageSrc} 
                        alt={pillar.title} 
                        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-110 filter brightness-95 group-hover:brightness-100" 
                      />
                      {/* Subtle Campaign Tint Overlay */}
                      <div className="absolute inset-0 bg-black/5 pointer-events-none transition-colors duration-700 group-hover:bg-transparent"></div>
                    </>
                  ) : (
                    <div className={`absolute inset-0 w-full h-full ${pillar.imagePlaceholder} transition-transform duration-700 group-hover:scale-105`}>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">
                        [Campaign Image Placeholder]
                      </div>
                    </div>
                  )}
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content Side */}
                <div className={`w-full ${isFeatured ? 'lg:w-5/12' : 'lg:w-1/2'}`}>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-5xl sm:text-6xl font-serif font-bold text-[var(--color-light-green)] group-hover:text-[var(--color-primary-green)] transition-colors duration-500">
                      {pillar.number}
                    </span>
                    <div className="h-1 flex-1 bg-gray-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full w-0 bg-[var(--color-campaign-red)] transition-all duration-700 group-hover:w-full"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-brand-black)] mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {pillar.description}
                  </p>

                  <div className="mb-10">
                    <h4 className="text-sm uppercase tracking-widest font-bold text-[var(--color-brand-black)] mb-4">
                      Key Priorities
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                      {pillar.priorities.map((priority, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <ArrowRight className="w-4 h-4 text-[var(--color-primary-green)] shrink-0 mt-1" />
                          <span className="text-gray-700 text-sm leading-relaxed">{priority}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Statistic Block */}
                  <div className="bg-[var(--color-soft-bg)] border-l-4 border-[var(--color-primary-green)] p-6 rounded-r-xl">
                    <p className="text-sm font-bold text-[var(--color-brand-black)]">
                      {pillar.statistic}
                    </p>
                    {pillar.statistic.includes('[') && (
                      <p className="text-xs text-gray-500 mt-1 italic">* Pending official campaign verification</p>
                    )}
                  </div>
                  
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Part I: Community Voice */}
        <div className="mt-32 pt-24 border-t border-gray-100">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-[var(--color-primary-green)]/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-8 h-8 text-[var(--color-primary-green)]" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--color-brand-black)] mb-6">
              Built With The Community
            </h3>
            <blockquote className="max-w-2xl mx-auto">
              <p className="text-xl italic text-gray-600 leading-relaxed mb-4">
                "Wakili Phyllis Wangui has consistently stood with our local traders, women groups, and youth, listening to our grassroots concerns and championing real representation. Her dedication gives us confidence that Kiambu's future is in capable, caring hands."
              </p>
              <cite className="block text-sm font-semibold tracking-wide text-[var(--color-primary-green)] not-italic uppercase">
                — Kiambu Town Business Community & Residents Association
              </cite>
            </blockquote>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
