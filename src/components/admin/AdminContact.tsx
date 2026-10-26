import React, { useState } from 'react';
import { ContactInfo } from '../../types';
import { appStore } from '../../lib/store';

interface AdminContactProps {
  contactInfo: ContactInfo;
}

export const AdminContact: React.FC<AdminContactProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveContactInfo(formData);
    setToastMessage('Coordonnées mises à jour avec succès !');
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
            INFOS &amp; CONTACT · COORDONNÉES OFFICIELLES
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#10272F]">
          Gestion des Coordonnées &amp; Standard
        </h1>
        <p className="text-sm text-[#4B6168] mt-2">
          Mettez à jour les coordonnées physiques, le standard téléphonique et l'e-mail officiel d'InfraCité Ingénierie affichés sur la vitrine publique.
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Adresse du Siège Social</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">E-mail technique &amp; contact</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Numéro de téléphone brut (href:tel)</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Affichage formaté du téléphone</label>
              <input
                type="text"
                required
                value={formData.displayPhone}
                onChange={(e) => setFormData({ ...formData, displayPhone: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Horaires d'ouverture</label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Enregistrer les coordonnées</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
