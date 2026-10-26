import React, { useState, useEffect } from 'react';
import { HeroData } from '../../data/mock';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedText } from '../ui/AnimatedText';

interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.carouselImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [data.carouselImages.length]);

  const activeImage = data.carouselImages[currentSlide];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Infinite Cinematic Image Carousel */}
      <div className="absolute inset-0 z-0">
        {data.carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transition-transform duration-7000`}
          >
            <img
              src={img.url}
              alt={img.caption}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Multi-layered dark & atmospheric gradients (Auralis aesthetic) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10272F] via-[#10272F]/65 to-black/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(16,39,47,0.7)_100%)]"></div>
        <div className="absolute inset-0 bg-topo-contour opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Pill with Amber Surveyor Marker */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] sm:text-[11px] font-mono tracking-widest text-white uppercase shadow-sm mb-3 sm:mb-5 lg:mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#D99A0B] animate-pulse"></span>
          <span>{data.eyebrow}</span>
        </motion.div>

        {/* Editorial Headline with Masked Staggered Word Reveal */}
        <div className="mb-3 sm:mb-5 lg:mb-6 max-w-4xl flex justify-center">
          <AnimatedText
            as="h1"
            text={data.titlePart1}
            italicText={data.titleItalic}
            className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.12] drop-shadow-sm justify-center text-center"
            staggerDelay={0.05}
          />
        </div>

        {/* Lead Paragraph with Subtle Blur Transition to Focus */}
        <motion.p
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
            filter: shouldReduceMotion ? 'none' : 'blur(4px)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-base md:text-lg lg:text-xl text-slate-200/90 leading-relaxed max-w-3xl font-light mb-5 sm:mb-8 lg:mb-10 text-center drop-shadow-xs px-2 sm:px-0"
        >
          {data.lead}
        </motion.p>

        {/* Action Buttons: Auralis Pill Style with Spring Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto mb-6 sm:mb-10 lg:mb-12"
        >
          <motion.a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-[#10272F] bg-white hover:bg-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.2)] group cursor-pointer shrink-0"
            whileHover={{ scale: 1.05, boxShadow: '0 15px 35px -5px rgba(0,0,0,0.3)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span>{data.ctaText}</span>
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#10272F] text-white flex items-center justify-center group-hover:bg-[#0B6E78] transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>

          <motion.a
            href="#domaines"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 cursor-pointer shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {data.ctaSecondaryText}
          </motion.a>
        </motion.div>

        {/* Carousel indicator controls */}
        <div className="flex items-center gap-3 mb-6 sm:mb-10 lg:mb-12">
          <motion.button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + data.carouselImages.length) % data.carouselImages.length)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-colors border border-white/15"
            aria-label="Image précédente"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>

          <div className="flex items-center gap-2">
            {data.carouselImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-6 bg-[#5CC6CC]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={img.caption}
              />
            ))}
          </div>

          <motion.button
            type="button"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % data.carouselImages.length)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-xs transition-colors border border-white/15"
            aria-label="Image suivante"
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Floating Glass Capsule "InfraCité en bref" (Auralis Reference Style) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl rounded-3xl bg-white/10 backdrop-blur-xl border border-white/25 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] text-left"
        >
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5CC6CC] animate-pulse"></span>
              <h3 className="font-display font-bold text-white text-base sm:text-lg">
                {data.briefCard.title}
              </h3>
            </div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
              {data.briefCard.tag}
            </span>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.briefCard.pillars.map((pillar) => (
              <div key={pillar.id} className="flex flex-col gap-1.5 group">
                <div className="flex items-center gap-2">
                  <span className="marker-triangle"></span>
                  <h4 className="text-sm font-bold text-white font-display group-hover:text-[#5CC6CC] transition-colors">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-normal">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-sm text-slate-200">
            <span className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm">
              <span className="text-[#5CC6CC]">✓</span>
              {data.briefCard.footerNote}
            </span>
            <span className="hidden sm:inline font-mono text-xs text-slate-300">
              {activeImage.tag}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

