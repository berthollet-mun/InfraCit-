import React, { useState } from 'react';
import { ApproachCard, Principle } from '../../types';
import { appStore } from '../../lib/store';

interface AdminApprocheProps {
  cards: ApproachCard[];
  principles: Principle[];
}

export const AdminApproche: React.FC<AdminApprocheProps> = ({ cards, principles }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editingCards, setEditingCards] = useState<ApproachCard[]>(cards);
  const [editingPrinciples, setEditingPrinciples] = useState<Principle[]>(principles);

  const handleCardChange = (id: string, field: keyof ApproachCard, val: any) => {
    setEditingCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  const handlePrincipleChange = (id: string, field: keyof Principle, val: any) => {
    setEditingPrinciples((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    editingCards.forEach((c) => appStore.saveApproachCard(c));
    editingPrinciples.forEach((p) => appStore.savePrinciple(p));
    setToastMessage('Section Approche & Principes mise à jour et publiée !');
    setTimeout(() => setToastMessage(null), 3000);
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
              CONTENUS DU SITE · POSTURE D'INTERVENTION
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[#10272F]">
            Gestion de l'Approche &amp; Principes Directeurs
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Modifiez les fiches des acteurs (publics et privés) ainsi que les 3 principes fondamentaux affichés sur le bandeau sombre en section #accompagnement.
          </p>
        </div>
      </header>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Stakeholder Cards */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-lg text-[#10272F]">
            1. Cartes Acteurs &amp; Maîtrises d'Ouvrage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editingCards.map((card) => (
              <div key={card.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase text-[#0B6E78]">
                    {card.type === 'public' ? 'Secteur Public' : 'Secteur Privé'}
                  </span>
                  <span className="material-symbols-outlined text-[20px] text-[#D99A0B]">
                    {card.icon}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-[#4B6168]">Titre de la cible</label>
                  <input
                    type="text"
                    required
                    value={card.title}
                    onChange={(e) => handleCardChange(card.id, 'title', e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 font-display font-bold text-base text-[#10272F]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono uppercase text-[#4B6168]">Description de l'accompagnement</label>
                  <textarea
                    rows={3}
                    required
                    value={card.description}
                    onChange={(e) => handleCardChange(card.id, 'description', e.target.value)}
                    className="p-3 rounded-xl border border-slate-200 text-xs text-[#10272F] leading-relaxed"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono uppercase text-[#4B6168]">Points d'engagement (1 par ligne)</label>
                  <textarea
                    rows={3}
                    value={card.points.join('\n')}
                    onChange={(e) =>
                      handleCardChange(
                        card.id,
                        'points',
                        e.target.value.split('\n').filter((l) => l.trim())
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 text-xs font-mono text-[#10272F] leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Principles */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-lg text-[#10272F]">
            2. Les 3 Principes Fondamentaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editingPrinciples.map((pr) => (
              <div key={pr.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-3">
                <input
                  type="text"
                  value={pr.number}
                  onChange={(e) => handlePrincipleChange(pr.id, 'number', e.target.value)}
                  className="font-mono text-xs text-[#D99A0B] font-bold px-2 py-1 bg-slate-50 border border-slate-200 rounded w-32"
                />
                <input
                  type="text"
                  required
                  value={pr.title}
                  onChange={(e) => handlePrincipleChange(pr.id, 'title', e.target.value)}
                  className="font-display font-bold text-base text-[#10272F] px-3 py-1.5 border border-slate-200 rounded-lg"
                />
                <textarea
                  rows={3}
                  required
                  value={pr.description}
                  onChange={(e) => handlePrincipleChange(pr.id, 'description', e.target.value)}
                  className="text-xs text-[#4B6168] p-2.5 border border-slate-200 rounded-lg leading-relaxed"
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Enregistrer l'approche et les principes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
