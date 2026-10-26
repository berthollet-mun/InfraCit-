import React from 'react';
import { ApplicationItem } from '../../data/mock';

interface ApplicationsSectionProps {
  applications: ApplicationItem[];
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({ applications }) => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F9F9F8] border-y border-gray-200" id="projets">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE9] text-[#0B6E78] font-mono text-[11px] uppercase tracking-widest font-semibold mb-4 border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
            <span>CHAMPS D'APPLICATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#10272F] tracking-tight leading-[1.15]">
            Des problématiques variées,{' '}
            <span className="font-editorial-italic font-normal text-[#0B6E78]">une même exigence.</span>
          </h2>
          <p className="mt-4 text-[#4B6168] text-base sm:text-lg">
            Des contextes d'intervention et cas d'usage multiples au croisement de la technique, du droit des sols et de l'environnement.
          </p>
        </div>

        {/* 4 Visual Cards Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {applications.map((app) => (
            <div
              key={app.id}
              className="group relative rounded-3xl overflow-hidden bg-[#10272F] text-white shadow-[0_12px_36px_rgba(16,39,47,0.08)] hover:shadow-[0_24px_50px_rgba(16,39,47,0.2)] flex flex-col h-[380px] sm:h-[420px] transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              {/* Background Image with Zoom on hover */}
              <img
                alt={app.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 ease-out"
                src={app.imageUrl}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#10272F] via-[#10272F]/60 to-transparent"></div>

              {/* Content overlay */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-[#F0B93A] uppercase font-bold px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xs border border-white/10">
                    {app.code}
                  </span>
                  <span className="marker-triangle"></span>
                </div>

                <div className="transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  <h3 className="font-display text-xl sm:text-2xl font-bold mb-2.5 text-white leading-tight">
                    {app.title}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed font-normal line-clamp-3">
                    {app.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/15">
                    {app.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-white border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal notice on applications */}
        <div className="mt-12 text-center">
          <p className="text-sm font-mono text-slate-600 italic max-w-3xl mx-auto">
            Ces exemples illustrent des champs d'application possibles ; ils ne constituent pas des références de réalisations.
          </p>
        </div>
      </div>
    </section>
  );
};
