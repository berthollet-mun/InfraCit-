import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';

interface PublicHeaderProps {
  onOpenAdmin: () => void;
  unreadCount?: number;
}

const NAV_ITEMS = [
  { label: 'Domaines', id: 'domaines' },
  { label: 'Missions', id: 'missions' },
  { label: 'Applications', id: 'projets' },
  { label: 'Méthode', id: 'donnees' },
  { label: 'Approche', id: 'accompagnement' },
];

export const PublicHeader: React.FC<PublicHeaderProps> = ({ onOpenAdmin, unreadCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Spy & Smooth Scroll with 100px offset to keep section titles perfectly visible
  const { activeSection, scrollToSection } = useScrollSpy({
    sectionIds: ['domaines', 'missions', 'projets', 'donnees', 'accompagnement', 'contact'],
    offset: 100,
  });

  // Top reading scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* 1. Global Reading Progress Bar (Top of Screen) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0B6E78] via-[#5CC6CC] to-[#D99A0B] origin-left z-[70]"
        style={{ scaleX }}
      />

      {/* 2. Floating Pill Nav Bar (Auralis Reference) */}
      <header className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-2.5 sm:px-6 pointer-events-none">
        <nav className="pointer-events-auto relative flex items-center justify-between gap-2 sm:gap-4 lg:gap-6 px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_30px_-4px_rgba(16,39,47,0.12)] max-w-5xl w-full border border-white/70 transition-all duration-300">
          
          {/* Brand Logo with Motion Feedback */}
          <motion.a
            aria-label="InfraCité Ingénierie - Accueil"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-[#0B6E78]/25 bg-[#0B6E78]/10 transition-transform duration-300 group-hover:scale-105">
              <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border border-[#D99A0B]/60 flex items-center justify-center">
                <svg className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-[#D99A0B] fill-current" viewBox="0 0 100 100">
                  <polygon points="50,15 90,85 10,85" />
                </svg>
              </span>
            </span>
            <span className="font-display font-bold text-sm sm:text-base md:text-lg tracking-tight text-[#10272F]">
              Infra<span className="text-[#0B6E78] font-extrabold">Cité</span>
            </span>
          </motion.a>

          {/* Desktop & Tablet Nav Items with Scroll Spy Active Pills (displayed on md+ so tablets have the full navigation and never look empty) */}
          <ul className="hidden md:flex items-center gap-0.5 md:gap-1 lg:gap-1.5 text-xs lg:text-sm font-medium text-[#10272F]/80 shrink-0">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <motion.a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`relative px-2 md:px-2.5 lg:px-3.5 py-1 md:py-1.5 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-[#0B6E78] font-semibold bg-[#0B6E78]/10'
                        : 'hover:text-[#0B6E78] hover:bg-slate-100/60'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 rounded-full border border-[#0B6E78]/25 -z-10"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Actions: Admin & Contact Pill with Motion Feedback */}
          <div className="flex items-center gap-1.5 md:gap-2 lg:gap-2.5 shrink-0">
            {/* Quick Admin Portal access */}
            <motion.button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#E5ECE9] hover:bg-[#C5D2CE] text-[#10272F] text-xs font-mono font-medium transition-all shrink-0 cursor-pointer whitespace-nowrap"
              title="Accéder au panneau d'administration"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E78]" />
              <span className="hidden sm:inline">Admin</span>
              {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#D99A0B] text-[#10272F] text-[10px] font-bold">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {/* Contact Pill CTA - visible across all devices, shrink-0 and whitespace-nowrap to prevent any cutoff */}
            <motion.a
              className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#0B6E78] hover:bg-[#08555D] rounded-full shadow-sm cursor-pointer group shrink-0 whitespace-nowrap"
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px -4px rgba(11, 110, 120, 0.35)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            {/* Mobile Hamburger Button (Only on mobile < md, hidden on tablet and desktop) */}
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 sm:p-2 rounded-full text-[#10272F] hover:bg-slate-100 transition-colors shrink-0 cursor-pointer"
              aria-label="Ouvrir le menu"
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Overlay with backdrop-blur */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 z-50 bg-[#10272F]/95 backdrop-blur-2xl flex flex-col p-4 sm:p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-[#0B6E78]/30 bg-[#0B6E78]/20">
                <span className="h-3.5 w-3.5 rounded-full border border-[#D99A0B]/70 flex items-center justify-center">
                  <svg className="w-2 h-2 text-[#D99A0B] fill-current" viewBox="0 0 100 100">
                    <polygon points="50,15 90,85 10,85" />
                  </svg>
                </span>
              </span>
              <span className="font-display font-bold text-lg text-white">
                Infra<span className="text-[#5CC6CC]">Cité</span>
              </span>
            </div>
            <motion.button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Fermer le menu"
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Grouped Content: Nav links and action buttons always together and directly visible */}
          <div className="flex flex-col justify-center flex-1 py-3 sm:py-6 gap-4 sm:gap-6">
            <nav className="flex flex-col gap-1.5 sm:gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item.id)}
                  href={`#${item.id}`}
                  className={`font-display text-lg sm:text-xl font-bold transition-colors py-1.5 px-3 rounded-xl flex items-center justify-between ${
                    activeSection === item.id 
                      ? 'text-[#5CC6CC] bg-white/10 font-bold' 
                      : 'text-white/90 hover:text-[#5CC6CC] hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5CC6CC]"></span>
                  )}
                </a>
              ))}
            </nav>

            {/* Action Buttons: firmly in view on all mobile screen heights */}
            <div className="flex flex-col gap-2 pt-3 border-t border-white/10 shrink-0">
              <motion.a
                onClick={(e) => handleNavClick(e, 'contact')}
                href="#contact"
                className="w-full text-center py-2.5 sm:py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-sm font-semibold shadow-md cursor-pointer transition-colors"
                whileTap={{ scale: 0.96 }}
              >
                Parler de votre projet
              </motion.a>
              <motion.button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-mono cursor-pointer transition-colors"
                whileTap={{ scale: 0.96 }}
              >
                <ShieldCheck className="w-4 h-4 text-[#5CC6CC]" />
                <span>Accéder à l'Espace Administrateur</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PublicHeader;

