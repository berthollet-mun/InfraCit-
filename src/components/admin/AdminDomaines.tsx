import React, { useState } from 'react';
import { Domain } from '../../types';
import { appStore } from '../../lib/store';

interface AdminDomainesProps {
  domains: Domain[];
}

export const AdminDomaines: React.FC<AdminDomainesProps> = ({ domains }) => {
  const [selectedDomainId, setSelectedDomainId] = useState<string>(domains[0]?.id || 'domain-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newSkillInput, setNewSkillInput] = useState('');

  const currentDomain = domains.find((d) => d.id === selectedDomainId) || domains[0];
  const [formData, setFormData] = useState<Domain>(currentDomain);

  const handleSelectDomain = (domain: Domain) => {
    setSelectedDomainId(domain.id);
    setFormData(domain);
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkillInput.trim()]
    }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveDomain(formData);
    setToastMessage(`Domaine "${formData.tag}" enregistré et synchronisé avec le site public !`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-[#0B6E78] text-white flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* 1. Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div className="flex flex-col max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="marker-triangle"></span>
            <span className="font-mono text-xs uppercase text-[#4B6168] tracking-widest font-semibold">
              Contenus du site · Référentiel d'expertise
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#10272F] tracking-tight">
            Gestion des Domaines d'intervention
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Configurez les piliers d'expertise affichés sur le site public vitrine, leurs tags d'analyse, leurs mots-clés (chips) et les avertissements réglementaires associés.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              const newDomain: Domain = {
                id: `domain-${Date.now()}`,
                code: `0${domains.length + 1}`,
                tag: `0${domains.length + 1} — NOUVEAU DOMAINE`,
                title: 'Titre du domaine technique',
                description: 'Description détaillée de l’intervention et de la méthodologie.',
                skills: ['Diagnostic', 'Conseil', 'Expertise'],
                regulatoryNote: null,
                showRegulatoryNote: false,
                visible: true,
                highlightHero: true,
                order: domains.length + 1
              };
              appStore.saveDomain(newDomain);
              setSelectedDomainId(newDomain.id);
              setFormData(newDomain);
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Nouveau domaine</span>
          </button>
        </div>
      </div>

      {/* 2. Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Master List of Domains (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-bold text-base text-[#10272F]">Domaines publiés</span>
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-slate-100 text-[#10272F] font-bold">
                {domains.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#0B6E78] text-xs shadow-xs border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#0B6E78] animate-pulse"></span>
              <span className="font-mono text-[10px] font-semibold">100% synchronisé</span>
            </div>
          </div>

          <div className="flex flex-col gap-3.5">
            {domains.map((domain) => {
              const isSelected = domain.id === selectedDomainId;
              return (
                <div
                  key={domain.id}
                  onClick={() => handleSelectDomain(domain)}
                  className={`relative bg-white rounded-2xl p-5 shadow-xs border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0B6E78] ring-2 ring-[#0B6E78]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-6 right-6 h-[3px] bg-[#0B6E78] rounded-full"></div>
                  )}
                  <div className="flex items-start justify-between gap-3 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">drag_indicator</span>
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] text-[#0B6E78] font-bold">
                        <span className="marker-triangle"></span>
                        <span>{domain.code}</span>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#4B6168]">
                        {domain.tag}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full font-mono text-[10px] bg-[#0B6E78]/10 text-[#0B6E78] font-semibold">
                        En édition
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pl-8">
                    <h3 className="font-display font-bold text-base text-[#10272F] leading-snug">
                      {domain.title}
                    </h3>

                    {domain.showRegulatoryNote && (
                      <div className="flex items-center gap-1.5 mt-2 text-[#D99A0B]">
                        <span className="material-symbols-outlined text-[15px]">verified_user</span>
                        <span className="font-mono text-[10px] font-medium">Avertissement réglementaire activé</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">tune</span>
                        <span className="font-mono text-[10px] text-[#4B6168]">
                          {domain.skills.length} compétences
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[#4B6168]">Visible</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            appStore.toggleDomainVisibility(domain.id);
                          }}
                          className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                            domain.visible ? 'bg-[#0B6E78]' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                              domain.visible ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detail Editor Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
          {/* Form Header */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="marker-triangle"></span>
                <h2 className="font-display font-bold text-xl text-[#10272F]">
                  Édition du domaine : {formData.tag}
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#4B6168] mt-1">
                Synchronisé avec la section #domaines de la vitrine
              </span>
            </div>
          </div>

          {/* Form Body */}
          <form className="p-6 md:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Code & Tag Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Code d'identification
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm text-[#10272F]"
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Tag d'en-tête (mono)
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm text-[#10272F]"
                  type="text"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                />
              </div>
            </div>

            {/* Display Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Titre du domaine
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-display font-bold text-base text-[#10272F]"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Intro Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Description d'introduction
              </label>
              <textarea
                className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#10272F] leading-relaxed"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Skills Chips Input */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Compétences clés &amp; Mots-clés (Chips)
                </label>
                <span className="font-mono text-xs text-[#0B6E78] font-bold">
                  {formData.skills.length} définies
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#10272F] shadow-2xs"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </span>
                ))}
                <div className="flex items-center flex-1 min-w-[200px]">
                  <input
                    className="w-full bg-transparent px-2 py-1 font-mono text-xs text-[#10272F] placeholder:text-slate-400 focus:outline-none"
                    placeholder="+ Ajouter une compétence (Entrée)"
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="text-xs font-bold text-[#0B6E78]"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Regulatory Disclaimer Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#D99A0B] text-[20px]">gavel</span>
                  <span className="text-sm font-semibold text-[#10272F]">
                    Note d'avertissement ou réserve réglementaire
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, showRegulatoryNote: !formData.showRegulatoryNote })}
                  className={`relative inline-flex h-4 w-8 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                    formData.showRegulatoryNote ? 'bg-[#0B6E78]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                      formData.showRegulatoryNote ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <textarea
                className="w-full p-3 rounded-lg bg-white border border-slate-200 text-sm text-[#10272F] focus:outline-none"
                placeholder="Indiquez ici d'éventuelles réserves professionnelles (ex. géomètres-experts)..."
                rows={2}
                value={formData.regulatoryNote || ''}
                onChange={(e) => setFormData({ ...formData, regulatoryNote: e.target.value })}
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setFormData(currentDomain)}
                className="text-xs text-[#4B6168] hover:text-red-600 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-teal-300"></span>
                <span>Enregistrer et publier</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 3. Bottom Tech Bar (API & CDN Sync) */}
      <div className="p-5 rounded-2xl bg-[#10272F] text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#5CC6CC] shrink-0">
            <span className="material-symbols-outlined text-[20px]">bolt</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-white">Synchronisation Edge CDN &amp; API GraphQL</span>
              <span className="px-2 py-0.5 rounded font-mono text-[9px] bg-[#5CC6CC]/20 text-[#5CC6CC] font-bold">
                TEMPS RÉEL
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Impact de publication : Toute mise à jour de domaine régénère instantanément la section #domaines de la vitrine publique.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
