import React, { useState, useEffect } from 'react';
import { CarouselSlide } from '../../types';

interface PromoCarouselProps {
  slides: CarouselSlide[];
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ slides }) => {
  const activeSlides = slides.filter((s) => s.active);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length, isPaused]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  return (
    <div
      className="relative w-full bg-[#10272F] text-white overflow-hidden border-b border-[#2E4952]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background image with refined dark teal overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentSlide.imageUrl}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10272F] via-[#10272F]/90 to-[#10272F]/75"></div>
        {/* Subtle survey line styling */}
        <div className="absolute inset-0 bg-[radial-gradient(#0B6E78_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left badge & titles */}
          <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D99A0B]/20 border border-[#D99A0B]/40 text-[#F0B93A] font-mono text-[10px] uppercase font-bold tracking-wider shrink-0">
              <span className="inline-block w-1.5 h-1.5 bg-[#D99A0B] rounded-full animate-ping"></span>
              {currentSlide.badge}
            </span>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="sm:hidden inline-block px-2 py-0.5 rounded bg-[#D99A0B]/20 text-[#F0B93A] font-mono text-[9px] font-bold">
                  {currentSlide.badge}
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-white truncate">
                  {currentSlide.title}
                </h4>
              </div>
              <p className="text-sm text-slate-300 line-clamp-1 mt-0.5 font-normal">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Right action button & navigation pills */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <a
              href={currentSlide.ctaLink}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow hover:scale-105"
            >
              <span>{currentSlide.ctaText}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            {/* Slide Indicators and controls */}
            {activeSlides.length > 1 && (
              <div className="flex items-center gap-2 bg-[#1A3944]/70 px-2.5 py-1 rounded-full border border-[#2E4952]">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
                  }
                  className="text-[#A9BDBE] hover:text-white transition-colors"
                  aria-label="Bannière précédente"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className="flex items-center gap-1">
                  {activeSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'w-4 bg-[#5CC6CC]' : 'w-1.5 bg-[#A9BDBE]/40 hover:bg-[#A9BDBE]'
                      }`}
                      aria-label={`Aller au slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % activeSlides.length)}
                  className="text-[#A9BDBE] hover:text-white transition-colors"
                  aria-label="Bannière suivante"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
