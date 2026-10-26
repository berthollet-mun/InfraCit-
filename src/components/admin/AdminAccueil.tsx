import React, { useState } from 'react';
import { HeroContent } from '../../types';
import { appStore } from '../../lib/store';

interface AdminAccueilProps {
  hero: HeroContent;
}

export const AdminAccueil: React.FC<AdminAccueilProps> = ({ hero }) => {
  const [formData, setFormData] = useState<HeroContent>(hero);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveHeroContent(formData);
    setToastMessage('Page d’accueil & Hero mis à jour avec succès !');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePillarChange = (id: string, field: 'title' | 'subtitle', val: string) => {
    setFormData((prev) => ({
      ...prev,
      briefPillars: prev.briefPillars.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    }));
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-8">
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#0B6E78] text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="marker-triangle"></span>
            <span className="font-mono text-xs uppercase text-[#0B6E78] tracking-widest font-semibold">
              CONTENUS DU SITE · HERO BANNER &amp; EN BREF
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#10272F]">
            Édition de la Page d'accueil
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Modifiez le titre d'accroche, la mise en valeur en italique sérif, le texte de présentation et la capsule latérale "InfraCité en bref".
          </p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Hero Fields (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="font-display font-bold text-lg text-[#10272F] pb-3 border-b border-slate-100">
              1. En-tête Principal (Hero)
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-[#4B6168]">Bandeau Eyebrow (mono)</label>
              <input
                type="text"
                value={formData.eyebrow}
                onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-[#10272F]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#4B6168]">Titre principal</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 font-display font-bold text-base text-[#10272F]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#0B6E78]">Mot d'accentuation en italique</label>
                <input
                  type="text"
                  required
                  value={formData.italicWord}
                  onChange={(e) => setFormData({ ...formData, italicWord: e.target.value })}
                  className="px-3.5 py-2 rounded-xl border border-slate-200 font-display italic font-medium text-base text-[#0B6E78]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase text-[#4B6168]">Paragraphe d'introduction (Lead)</label>
              <textarea
                rows={4}
                required
                value={formData.leadParagraph}
                onChange={(e) => setFormData({ ...formData, leadParagraph: e.target.value })}
                className="p-3.5 rounded-xl border border-slate-200 text-xs text-[#10272F] leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#4B6168]">Bouton CTA Principal</label>
                <input
                  type="text"
                  value={formData.primaryCtaText}
                  onChange={(e) => setFormData({ ...formData, primaryCtaText: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono uppercase text-[#4B6168]">Bouton CTA Secondaire</label>
                <input
                  type="text"
                  value={formData.secondaryCtaText}
                  onChange={(e) => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Capsule En Bref (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-lg text-[#10272F] pb-3 border-b border-slate-100">
              2. Capsule « InfraCité en bref »
            </h2>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.briefTitle}
                onChange={(e) => setFormData({ ...formData, briefTitle: e.target.value })}
                className="px-3 py-1.5 rounded-lg border border-slate-200 font-display font-bold text-sm text-[#10272F]"
              />
              <input
                type="text"
                value={formData.briefTag}
                onChange={(e) => setFormData({ ...formData, briefTag: e.target.value })}
                className="px-2.5 py-1 rounded-lg bg-slate-100 font-mono text-[10px] text-[#4B6168] uppercase w-28"
              />
            </div>

            <div className="space-y-3 pt-2">
              {formData.briefPillars.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="marker-triangle"></span>
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => handlePillarChange(p.id, 'title', e.target.value)}
                      className="font-display font-bold text-xs text-[#10272F] bg-transparent outline-none flex-1"
                    />
                  </div>
                  <input
                    type="text"
                    value={p.subtitle}
                    onChange={(e) => handlePillarChange(p.id, 'subtitle', e.target.value)}
                    className="text-[11px] text-[#4B6168] bg-transparent outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-[10px] font-mono uppercase text-[#4B6168] block mb-1">Note de pied de capsule</label>
              <input
                type="text"
                value={formData.briefFooterNote}
                onChange={(e) => setFormData({ ...formData, briefFooterNote: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-[#4B6168]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Enregistrer la page d'accueil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
