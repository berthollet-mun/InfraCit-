import React, { useState } from 'react';
import { SiteSettings } from '../../types';
import { appStore } from '../../lib/store';

interface AdminParametresProps {
  settings: SiteSettings;
}

export const AdminParametres: React.FC<AdminParametresProps> = ({ settings }) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveSettings(formData);
    setToastMessage('Paramètres système et SEO mis à jour avec succès !');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetFactory = () => {
    if (confirm("ATTENTION : Voulez-vous réinitialiser toutes les données à leur état d'origine ? Cette action restaurera les maquettes initiales du brief.")) {
      appStore.resetFactoryData();
      setToastMessage('Données réinitialisées aux valeurs initiales d’usine.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-8 space-y-8">
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

      <header className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="marker-triangle"></span>
          <span className="font-mono text-xs uppercase text-[#0B6E78] tracking-widest font-semibold">
            SYSTÈME · CONFIGURATION GLOBALE
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#10272F]">
          SEO, Mode Maintenance &amp; Paramètres
        </h1>
        <p className="text-sm text-[#4B6168] mt-2">
          Contrôlez les métadonnées pour les moteurs de recherche, activez le mode maintenance du site public, et gérez la persistance de l'infrastructure.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SEO Section */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-lg text-[#10272F] pb-3 border-b border-slate-100">
            1. Référencement &amp; Métadonnées (SEO)
          </h2>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Nom de la plateforme (Meta Title)</label>
            <input
              type="text"
              required
              value={formData.siteName}
              onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#10272F]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Description du site (Meta Description)</label>
            <textarea
              rows={3}
              required
              value={formData.siteDescription}
              onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
              className="p-3.5 rounded-xl border border-slate-200 text-sm text-[#10272F] leading-relaxed"
            />
          </div>
        </section>

        {/* Maintenance Mode & Features */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-lg text-[#10272F] pb-3 border-b border-slate-100">
            2. États d'exploitation du site
          </h2>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="font-medium text-sm text-[#10272F]">Mode maintenance</p>
              <p className="text-sm text-slate-500">
                Affiche une page d'attente pour les visiteurs non authentifiés
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, maintenanceMode: !formData.maintenanceMode })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                formData.maintenanceMode ? 'bg-[#D99A0B]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  formData.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="font-medium text-sm text-[#10272F]">Carrousel promotionnel en haut de page</p>
              <p className="text-sm text-slate-500">
                Activer ou désactiver la bannière de promotion supérieure
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, enablePromoCarousel: !formData.enablePromoCarousel })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                formData.enablePromoCarousel ? 'bg-[#0B6E78]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  formData.enablePromoCarousel ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Database & Data Persistence */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-display font-bold text-lg text-[#10272F] pb-3 border-b border-slate-100">
            3. Abstraction BDD &amp; Persistance
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Les données sont gérées via une couche de stockage isolée (Repository Pattern) avec persistance locale en mémoire active et LocalStorage. En production finale, cette couche peut être basculée vers MySQL / Prisma sans retoucher le code applicatif.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleResetFactory}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              <span>Réinitialiser les données d'usine (Mock de base)</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Enregistrer les paramètres</span>
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
