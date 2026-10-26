import React from 'react';
import { ApproachData } from '../../data/mock';
import { Landmark, Building2, CheckCircle2 } from 'lucide-react';

interface ApprocheSectionProps {
  data: ApproachData;
}

export const ApprocheSection: React.FC<ApprocheSectionProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-[#F9F9F8] border-b border-gray-200" id="accompagnement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE9] text-[#0B6E78] font-mono text-[11px] uppercase tracking-widest font-semibold mb-4 border border-gray-200">
            <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
            <span>NOTRE APPROCHE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#10272F] tracking-tight leading-[1.15]">
            {data.sectionTitlePart1}{' '}
            <span className="font-editorial-italic font-normal text-[#D99A0B]">
              {data.sectionTitleItalic}
            </span>
          </h2>
          <p className="mt-4 text-[#4B6168] text-base sm:text-lg leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* 2 Big Stakeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {data.targets.map((target) => (
            <div
              key={target.id}
              className="group bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F3F4] text-[#0B6E78] flex items-center justify-center shadow-xs">
                    {target.type === 'public' ? (
                      <Landmark className="w-6 h-6" />
                    ) : (
                      <Building2 className="w-6 h-6" />
                    )}
                  </div>
                  <span className="marker-triangle"></span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#10272F] mb-4">
                  {target.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-8 font-normal">
                  {target.description}
                </p>
              </div>

              <ul className="space-y-3 pt-6 border-t border-gray-100">
                {target.points.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-mono text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#0B6E78] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3 Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.principles.map((pr) => (
            <div
              key={pr.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col gap-2"
            >
              <span className="text-[#D99A0B] font-mono text-xs font-bold uppercase tracking-wider">
                {pr.number}
              </span>
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#10272F]">
                {pr.title}
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                {pr.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
