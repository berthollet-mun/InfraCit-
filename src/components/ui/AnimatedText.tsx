import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface AnimatedTextProps {
  text: string;
  italicText?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  staggerDelay?: number;
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  italicText,
  className = '',
  as = 'h2',
  staggerDelay = 0.04,
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Split standard words
  const words = text.trim().split(/\s+/);
  const italicWords = italicText ? italicText.trim().split(/\s+/) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: shouldReduceMotion ? 0 : '110%',
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const, // easeOutQuint
      },
    },
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={`flex flex-wrap items-baseline gap-x-[0.28em] gap-y-[0.1em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
    >
      {/* Primary words with mask container */}
      {words.map((word, index) => (
        <span key={`word-${index}`} className="inline-block overflow-hidden py-[0.08em] -my-[0.08em]">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}

      {/* Optional Italic Display segment */}
      {italicWords.length > 0 && (
        <span className="inline-flex flex-wrap gap-x-[0.28em] font-editorial-italic font-normal text-[#5CC6CC]">
          {italicWords.map((iWord, iIndex) => (
            <span key={`italic-${iIndex}`} className="inline-block overflow-hidden py-[0.08em] -my-[0.08em]">
              <motion.span
                variants={wordVariants}
                className="inline-block"
              >
                {iWord}
              </motion.span>
            </span>
          ))}
        </span>
      )}
    </Component>
  );
};

export default AnimatedText;
