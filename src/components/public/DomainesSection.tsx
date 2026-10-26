import React from 'react';
import { DomainItem } from '../../data/mock';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedText } from '../ui/AnimatedText';

interface DomainesSectionProps {
  domains: DomainItem[];
}

export const DomainesSection: React.FC<DomainesSectionProps> = ({ domains }) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F9F9F8] border-b border-gray-200" id="domaines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE9] text-[#0B6E78] font-mono text-[11px] uppercase tracking-widest font-semibold mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
            <span>DOMAINES D'INTERVENTION</span>
          </motion.div>

          <AnimatedText
            as="h2"
            text="Une lecture transversale"
            italicText="des enjeux."
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#10272F] tracking-tight leading-[1.15]"
          />

          <motion.p
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 18,
              filter: shouldReduceMotion ? 'none' : 'blur(4px)',
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="mt-5 text-slate-700 text-base sm:text-lg leading-relaxed font-normal"
          >
            De la mesure physique précise à la vision prospective globale, nous combinons les compétences pour structurer des réponses robustes et adaptées à chaque échelle d'intervention.
          </motion.p>
        </div>

        {/* 4 Themed Cards Grid with Staggered Entrance & Smooth Lift on Hover */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {domains.map((domain) => (
            <motion.article
              key={domain.id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col justify-between"
            >
              {/* Card Thumbnail with themed image overlay & zoom on hover */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={domain.imageUrl}
                  alt={domain.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/30"></div>
                
                {/* Header Tag Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md font-mono text-[11px] font-bold text-[#0B6E78] tracking-wider shadow-sm">
                    {domain.tag}
                  </span>
                  <span className="marker-triangle"></span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#10272F] mb-3 leading-snug group-hover:text-[#0B6E78] transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                    {domain.description}
                  </p>
                </div>

                <div>
                  {/* Regulatory Disclaimer if present */}
                  {domain.regulatoryNote && (
                    <p className="text-sm text-[#925F05] font-mono mb-4 p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 leading-relaxed">
                      {domain.regulatoryNote}
                    </p>
                  )}

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
                    {domain.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#F2F5F3] text-slate-800 rounded-full text-xs sm:text-sm font-mono font-medium border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

