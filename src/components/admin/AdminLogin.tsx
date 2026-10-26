import React, { useState } from 'react';
import { appStore } from '../../lib/store';

interface AdminLoginProps {
  onSuccess: () => void;
  onReturnHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onReturnHome }) => {
  const [email, setEmail] = useState('wilfried.n@infracite-ing.fr');
  const [password, setPassword] = useState('InfraCite-2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('Vérification des accréditations cryptographiques...');

    setTimeout(() => {
      setStatusMessage('Accès Autorisé · Session chiffrée établie');
      setTimeout(() => {
        appStore.login(email);
        setLoading(false);
        onSuccess();
      }, 700);
    }, 900);
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('InfraCite-2026!');
  };

  return (
    <div className="bg-[#F2F5F3] font-sans text-[#10272F] min-h-screen flex flex-col justify-between antialiased relative overflow-hidden">
      {/* Background Geodetic Halo */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-40">
        <div className="w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#84d3de]/20 via-[#006972]/5 to-transparent blur-3xl transform -translate-y-8"></div>
        <div className="absolute w-[440px] h-[440px] rounded-full bg-[#D99A0B]/10 blur-2xl transform translate-x-28 translate-y-16"></div>
      </div>

      {/* Header */}
      <header className="w-full py-6 flex justify-center items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#10272F] text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#5CC6CC]">architecture</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F0B93A] ring-2 ring-white"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg tracking-tight text-[#10272F]">InfraCité</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E78]"></span>
            </div>
            <span className="font-mono text-[10px] text-[#4B6168] tracking-widest uppercase font-medium">
              Ingénierie Civile &amp; Territoire
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 py-6">
        <div className="w-full max-w-[480px]">
          {/* Top Cadastral / Survey Coordinate Anchor */}
          <div className="flex items-center justify-between px-4 mb-2 font-mono text-[11px] text-[#4B6168]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E78] animate-pulse"></span>
              <span className="tracking-widest uppercase">TERMINAL-SYS.V4</span>
            </div>
            <span className="tracking-widest">REF: FR-IDF-48.8566N</span>
          </div>

          {/* Main Authentication Bento Card */}
          <div className="bg-white rounded-[24px] shadow-[0_16px_40px_-8px_rgba(16,39,47,0.08)] overflow-hidden transition-all duration-300 border border-slate-200/80">
            {/* Top Geodetic Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#0B6E78] via-[#5CC6CC] to-[#D99A0B]"></div>

            <div className="p-6 sm:p-9 flex flex-col gap-6">
              {/* Header Section */}
              <header className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5ECE9] text-[#10272F]">
                    <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-[#10272F] font-bold">
                      Espace d'administration
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#4B6168] bg-[#f1f4f4] px-2 py-0.5 rounded font-medium">
                    RÉSEAU SÉCURISÉ
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  <h2 className="font-display font-bold text-2xl text-[#10272F] tracking-tight">
                    Connexion au back-office
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4B6168] leading-relaxed">
                    Gérez les carrousels, domaines, prestations, applications et demandes de contact du site.
                  </p>
                </div>
              </header>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#10272F]" htmlFor="adminEmail">
                      Identifiant ou e-mail professionnel
                    </label>
                    <span className="font-mono text-[10px] text-[#4B6168]">AUTH_ID</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#4B6168] pointer-events-none">
                      mail
                    </span>
                    <input
                      autoComplete="email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#10272F] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6E78] focus:bg-white transition-all shadow-2xs"
                      id="adminEmail"
                      placeholder="wilfried.n@infracite-ing.fr"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-[#10272F]" htmlFor="adminPassword">
                      Mot de passe sécurisé
                    </label>
                    <span className="font-mono text-[10px] text-[#4B6168]">PASSCODE</span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-[20px] text-[#4B6168] pointer-events-none">
                      lock
                    </span>
                    <input
                      autoComplete="current-password"
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[#10272F] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6E78] focus:bg-white transition-all shadow-2xs"
                      id="adminPassword"
                      placeholder="••••••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label="Afficher ou masquer le mot de passe"
                      className="absolute right-2.5 p-1 rounded-lg text-[#4B6168] hover:text-[#10272F] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] block">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Utilities Row: Remember & Quick selector */}
                <div className="flex items-center justify-between pt-0.5 text-xs text-[#4B6168]">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      className="w-4 h-4 rounded text-[#0B6E78] accent-[#0B6E78] focus:ring-[#0B6E78] cursor-pointer"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Se souvenir de moi (30 jours)</span>
                  </label>
                  <span className="text-[#0B6E78] font-medium font-mono text-[11px]">
                    Rôle : Super Admin
                  </span>
                </div>

                {/* Quick login demo presets */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-[#4B6168]">Comptes de test :</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('wilfried.n@infracite-ing.fr')}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[#0B6E78] hover:bg-[#E6F3F4] text-[11px] font-medium transition-colors"
                    >
                      Wilfried (Admin)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickLogin('c.bernard@infracite-ing.fr')}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[#4B6168] hover:bg-slate-100 text-[11px] font-medium transition-colors"
                    >
                      Camille (Éditeur)
                    </button>
                  </div>
                </div>

                {/* Submit CTA Button */}
                <button
                  className="mt-2 w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white font-medium text-sm shadow-md transition-all duration-200 disabled:opacity-75"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>{statusMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Se connecter au tableau de bord</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Technical Security Notice */}
              <div className="pt-3 -mx-6 sm:-mx-9 -mb-6 sm:-mb-9 p-4 sm:px-9 bg-[#f1f4f4]/80 flex items-start gap-3 text-[#4B6168] border-t border-slate-200/60">
                <div className="p-1 rounded-md bg-[#e0e3e3] shrink-0 text-[#0B6E78]">
                  <span className="material-symbols-outlined text-[16px] block">verified_user</span>
                </div>
                <p className="font-mono text-[10px] leading-relaxed text-[#4B6168]">
                  ACCÈS RESTREINT — Plateforme réservée aux ingénieurs et administrateurs habilités d'InfraCité Ingénierie.
                </p>
              </div>
            </div>
          </div>

          {/* Return Link Under Card */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={onReturnHome}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#4B6168] hover:text-[#10272F] px-4 py-2 rounded-full hover:bg-white/80 transition-all group"
            >
              <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:-translate-x-1">
                arrow_back
              </span>
              <span>Retour au site public InfraCité</span>
            </button>

            {/* Geodetic Micro Telemetry Info */}
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#4B6168] opacity-80">
              <span>LAT: 48°51'24" N</span>
              <span className="w-1 h-1 rounded-full bg-[#C5D2CE]"></span>
              <span>LON: 02°21'07" E</span>
              <span className="w-1 h-1 rounded-full bg-[#C5D2CE]"></span>
              <span>SYS_STATUS: OPTIMAL</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center font-mono text-[11px] text-[#4B6168] relative z-10">
        <div className="flex items-center justify-center gap-3">
          <span>© 2026 InfraCité Ingénierie. Système d'administration réservé.</span>
          <span>·</span>
          <span>Connexion sécurisée TLS 1.3</span>
        </div>
      </footer>
    </div>
  );
};
