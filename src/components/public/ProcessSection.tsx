import React from 'react';
import { StepItem } from '../../data/mock';

interface ProcessSectionProps {
  steps: StepItem[];
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#10272F] text-white relative overflow-hidden" id="donnees">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0B6E78]/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#5CC6CC] font-mono text-[11px] uppercase tracking-widest font-semibold mb-4 border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
            <span>NOTRE PROCESSUS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            De la connaissance du terrain à une{' '}
            <span className="font-editorial-italic font-normal text-[#5CC6CC]">décision éclairée.</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Une chaîne méthodologique rigoureuse et itérative garantissant l'intégrité, la lisibilité et la pertinence opérationnelle de chaque rendu.
          </p>
        </div>

        {/* 4 Horizontal Sequential Steps with Watermark Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md p-8 rounded-3xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.25)] hover:border-[#5CC6CC]/40 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden min-h-[260px]"
            >
              {/* Grand numéro en filigrane en arrière-plan */}
              <div className="absolute -right-2 -bottom-4 font-display font-black text-8xl text-white/[0.05] group-hover:text-white/[0.1] transition-colors pointer-events-none select-none">
                {step.stepWatermark}
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-[#5CC6CC] tracking-wider">
                    {step.stepNumber}
                  </span>
                  <span className="marker-triangle"></span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#5CC6CC] transition-colors">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
