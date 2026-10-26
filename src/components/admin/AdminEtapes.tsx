import React, { useState } from 'react';
import { Step } from '../../types';
import { appStore } from '../../lib/store';

interface AdminEtapesProps {
  steps: Step[];
}

export const AdminEtapes: React.FC<AdminEtapesProps> = ({ steps }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingSteps, setEditingSteps] = useState<Step[]>(steps);

  const handleChange = (id: string, field: keyof Step, val: any) => {
    setEditingSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    editingSteps.forEach((s) => appStore.saveStep(s));
    setToastMessage('Les 4 étapes du processus ont été enregistrées avec succès !');
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
              CONTENUS DU SITE · PROCESSUS MÉTHODOLOGIQUE
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#10272F]">
            Gestion des Étapes (Terrain à la Décision)
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Configurez la chaîne méthodologique séquentielle en 4 étapes affichée en section #donnees.
          </p>
        </div>
      </header>

      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editingSteps.map((step) => (
            <div key={step.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={step.stepNumber}
                  onChange={(e) => handleChange(step.id, 'stepNumber', e.target.value)}
                  className="px-2.5 py-1 rounded bg-slate-100 font-mono text-xs font-bold text-[#10272F] w-28 border border-slate-200"
                />
                <span className="marker-triangle"></span>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#4B6168]">Verbe d'action / Titre</label>
                <input
                  type="text"
                  required
                  value={step.title}
                  onChange={(e) => handleChange(step.id, 'title', e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 font-display font-bold text-base text-[#10272F]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-mono uppercase text-[#4B6168]">Description détaillée</label>
                <textarea
                  rows={4}
                  required
                  value={step.description}
                  onChange={(e) => handleChange(step.id, 'description', e.target.value)}
                  className="p-3 rounded-lg border border-slate-200 text-xs text-[#10272F] leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Enregistrer les 4 étapes méthodologiques</span>
          </button>
        </div>
      </form>
    </div>
  );
};
