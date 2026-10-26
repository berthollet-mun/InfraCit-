import React from 'react';
import { ServiceItem } from '../../data/mock';

interface PrestationsSectionProps {
  services: ServiceItem[];
}

export const PrestationsSection: React.FC<PrestationsSectionProps> = ({ services }) => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F2F5F3]" id="missions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#0B6E78] font-mono text-[11px] uppercase tracking-widest font-semibold mb-4 shadow-2xs border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-[#0B6E78]"></span>
            <span>NOS PRESTATIONS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#10272F] tracking-tight leading-[1.15]">
            Des analyses ciblées,{' '}
            <span className="font-editorial-italic font-normal text-[#0B6E78]">des réponses adaptées.</span>
          </h2>
          <p className="mt-4 text-slate-700 text-base sm:text-lg">
            Des modules d'interventions clairs et structurés pour alimenter chaque jalon clé de votre prise de décision.
          </p>
        </div>

        {/* 2x2 Grid of Floating Cards with subtle gradient and elevated shadow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="group relative bg-gradient-to-br from-white via-white to-[#F2F5F3] rounded-3xl p-8 sm:p-10 border border-gray-200/90 shadow-[0_12px_40px_-10px_rgba(16,39,47,0.08)] hover:shadow-[0_24px_50px_-12px_rgba(11,110,120,0.14)] transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle decorative watermark step number */}
              <div className="absolute -right-4 -bottom-6 font-display font-black text-8xl text-slate-100/80 pointer-events-none select-none group-hover:text-[#E6F3F4] transition-colors">
                0{idx + 1}
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1 rounded-full bg-[#E6F3F4] text-[#0B6E78] font-mono text-xs font-bold tracking-wider border border-[#0B6E78]/20">
                    {service.code}
                  </span>
                  <span className="marker-triangle"></span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#10272F] mb-4 group-hover:text-[#0B6E78] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 font-normal">
                  {service.description}
                </p>
              </div>

              {/* Deliverables capsule */}
              <div className="pt-5 border-t border-gray-200/70 bg-[#E5ECE9]/60 -mx-8 sm:-mx-10 -mb-8 sm:-mb-10 p-6 sm:p-8 rounded-b-3xl relative z-10 backdrop-blur-xs">
                <span className="text-xs font-mono font-bold uppercase text-[#10272F] tracking-wider block mb-1">
                  {service.deliverablesTitle}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {service.deliverables}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
