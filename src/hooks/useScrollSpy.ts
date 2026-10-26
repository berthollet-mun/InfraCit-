import { useState, useEffect, useCallback } from 'react';

export interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

/**
 * Hook to track the active section during scroll and provide
 * an offset-aware smooth scroll utility to prevent titles being hidden under fixed headers.
 */
export function useScrollSpy({ sectionIds, offset = 100 }: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  // Smooth scroll with offset subtraction (so titles are never hidden under the fixed navbar)
  const scrollToSection = useCallback((id: string) => {
    const cleanId = id.replace(/^#/, '');
    const element = document.getElementById(cleanId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update active section state immediately
    setActiveSection(cleanId);
  }, [offset]);

  // Monitor scroll position with IntersectionObserver + fallback scroll listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset + 50;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }

      // If at top of the page, clear or set to empty
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return { activeSection, scrollToSection };
}
