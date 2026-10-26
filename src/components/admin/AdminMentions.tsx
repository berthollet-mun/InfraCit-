import React, { useState } from 'react';
import { LegalInfo } from '../../types';
import { appStore } from '../../lib/store';

interface AdminMentionsProps {
  legalInfo: LegalInfo;
}

export const AdminMentions: React.FC<AdminMentionsProps> = ({ legalInfo }) => {
  const [formData, setFormData] = useState<LegalInfo>(legalInfo);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveLegalInfo(formData);
    setToastMessage('Mentions légales & Registres d’immatriculation mis à jour !');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 md:px-8 py-8 space-y-6">
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
            INFOS &amp; CONTACT · CONFORMITÉ JURIDIQUE
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#10272F]">
          Mentions Légales, SIREN &amp; RGPD
        </h1>
        <p className="text-sm text-[#4B6168] mt-2">
          Gérez l’identité sociétale de la SAS InfraCité Ingénierie, les numéros d'immatriculation au registre du commerce, la direction de la publication et les réserves de compétence déontologique.
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Raison Sociale</label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#10272F]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Forme Juridique</label>
              <input
                type="text"
                required
                value={formData.legalForm}
                onChange={(e) => setFormData({ ...formData, legalForm: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Capital Social</label>
              <input
                type="text"
                value={formData.capital}
                onChange={(e) => setFormData({ ...formData, capital: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-[#10272F]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Numéro SIREN</label>
              <input
                type="text"
                value={formData.siren}
                onChange={(e) => setFormData({ ...formData, siren: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold text-[#0B6E78]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">RCS</label>
              <input
                type="text"
                value={formData.rcs}
                onChange={(e) => setFormData({ ...formData, rcs: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-[#10272F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Directeur de la Publication</label>
              <input
                type="text"
                value={formData.publicationDirector}
                onChange={(e) => setFormData({ ...formData, publicationDirector: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Contact Technique</label>
              <input
                type="email"
                value={formData.technicalContact}
                onChange={(e) => setFormData({ ...formData, technicalContact: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Notice de Conformité RGPD &amp; Hébergement</label>
            <textarea
              rows={2}
              value={formData.rgpdNotice}
              onChange={(e) => setFormData({ ...formData, rgpdNotice: e.target.value })}
              className="p-3.5 rounded-xl border border-slate-200 text-sm text-[#10272F] leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-amber-800">Avertissement Réglementaire Déontologique</label>
            <textarea
              rows={3}
              value={formData.professionalDisclaimer}
              onChange={(e) => setFormData({ ...formData, professionalDisclaimer: e.target.value })}
              className="p-3.5 rounded-xl border border-amber-300 bg-amber-50/50 text-sm text-[#10272F] leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Enregistrer les mentions légales</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
