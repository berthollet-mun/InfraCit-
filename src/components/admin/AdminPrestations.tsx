import React, { useState } from 'react';
import { Service } from '../../types';
import { appStore } from '../../lib/store';

interface AdminPrestationsProps {
  services: Service[];
}

export const AdminPrestations: React.FC<AdminPrestationsProps> = ({ services }) => {
  const [selectedId, setSelectedId] = useState<string>(services[0]?.id || 'service-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentService = services.find((s) => s.id === selectedId) || services[0];
  const [formData, setFormData] = useState<Service>(currentService);

  const handleSelect = (service: Service) => {
    setSelectedId(service.id);
    setFormData(service);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveService(formData);
    setToastMessage(`Prestation "${formData.code}" enregistrée et synchronisée !`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-6">
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
              CONTENUS DU SITE · MODULES DE MISSIONS
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#10272F]">
            Gestion des Prestations &amp; Missions
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Administrez les 4 fiches de missions principales (Observer, Évaluer, Représenter, Conseiller) et les livrables associés présentés en section #missions.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {services.map((srv) => {
            const isSelected = srv.id === selectedId;
            return (
              <div
                key={srv.id}
                onClick={() => handleSelect(srv)}
                className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#0B6E78] ring-2 ring-[#0B6E78]/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#0B6E78]">{srv.code}</span>
                  <span className="marker-triangle"></span>
                </div>
                <h3 className="font-display font-bold text-base text-[#10272F]">{srv.title}</h3>
                <p className="text-xs text-[#4B6168] line-clamp-2 mt-1">{srv.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#4B6168] font-mono">
                  <span>{srv.deliverables}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h2 className="font-display font-bold text-xl text-[#10272F] pb-4 border-b border-slate-100 mb-6">
            Édition de la fiche : {formData.code}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Code de la mission</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono font-bold text-[#0B6E78]"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Ordre d'affichage</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Titre de la mission *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 font-display font-bold text-base text-[#10272F]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Description détaillée *</label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="p-3.5 rounded-xl border border-slate-200 text-sm text-[#10272F] leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#0B6E78]">output</span>
                <span className="text-sm font-semibold text-[#10272F]">Livrables &amp; Restitutions possibles</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">En-tête livrables</label>
                  <input
                    type="text"
                    value={formData.deliverablesTitle}
                    onChange={(e) => setFormData({ ...formData, deliverablesTitle: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">Liste des restitutions</label>
                  <input
                    type="text"
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-[#10272F]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFormData(currentService)}
                className="text-xs text-[#4B6168] hover:text-red-600 transition-colors"
              >
                Réinitialiser
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Enregistrer les modifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
