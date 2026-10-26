import React, { useState, useRef } from 'react';
import { Application } from '../../types';
import { appStore } from '../../lib/store';

interface AdminApplicationsProps {
  applications: Application[];
}

export const AdminApplications: React.FC<AdminApplicationsProps> = ({ applications }) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || 'app-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentApp = applications.find((a) => a.id === selectedAppId) || applications[0];

  const [formData, setFormData] = useState<Application>(currentApp);

  const handleSelectApp = (app: Application) => {
    setSelectedAppId(app.id);
    setFormData(app);
  };

  const handleDeviceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({
        ...prev,
        imageUrl: event.target?.result as string
      }));
      setToastMessage(`Image chargée depuis votre appareil (${file.name}) !`);
      setTimeout(() => setToastMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, newTagInput.trim()]
    }));
    setNewTagInput('');
  };

  const handleRemoveTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveApplication(formData);
    setToastMessage('Fiche champ d’application mise à jour et publiée !');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast */}
      {toastMessage && (
        <div className="mx-6 lg:mx-8 mt-4 p-4 rounded-xl bg-[#0B6E78] text-white flex items-center justify-between shadow-lg animate-in fade-in z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Notification Banner / Micro Context */}
      <div className="px-6 lg:px-8 pt-6 pb-0">
        <div className="flex items-center justify-between py-2 px-4 rounded-xl bg-white shadow-xs border border-slate-200/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0B6E78]/10 text-[#0B6E78]">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
            <span className="text-xs sm:text-sm text-[#10272F]">
              <strong className="font-semibold">Référentiel Territorial en production :</strong> Les {applications.length} fiches alimentent directement la grille d'exploration publique du site vitrine InfraCité.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#4B6168]">
              <span className="w-2 h-2 rounded-full bg-[#D99A0B] animate-pulse"></span>
              Edge Node Paris-01 (Hit Rate 99.4%)
            </span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <header className="px-6 lg:px-8 pt-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="flex flex-col max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="marker-triangle"></span>
              <span className="font-mono text-xs text-[#0B6E78] uppercase tracking-widest font-semibold">
                CONTENUS DU SITE · RÉFÉRENTIEL TERRITORIAL
              </span>
              <span className="text-slate-400">/</span>
              <span className="font-mono text-xs text-[#4B6168]">SEC_04_CHAMPS</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#10272F] tracking-tight">
              Gestion des Champs d'application
            </h1>
            <p className="text-sm text-[#4B6168] mt-2 max-w-2xl">
              Gérez les contextes d'intervention et cas d'usage présentés sur la vitrine publique, associez les visuels paysagers, les plans d'analyse et les tags thématiques.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                const newId = `app-${Date.now()}`;
                const newApp: Application = {
                  id: newId,
                  orderCode: `0${applications.length + 1}`,
                  tag: `0${applications.length + 1} / NOUVEAU`,
                  title: 'Nouveau champ d’application',
                  description: 'Description détaillée du contexte territorial et des livrables.',
                  tags: ['Urbanisme', 'Foncier'],
                  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALvRl-r5OmzoMzr95hKkYijoCLzWDF7wKz-6AGL_MkgIcoewWdq1Nh9CRdKKWBMfr5xbdQGqCj_-pkvlDl5LpP3f94uP1GNATkydUOvrrbnXoLjMKhxX6FUUgm88MTbd-eR61i1K4xtQfTGBAeaGTndzl6d6OtQdSxsXVCE78s6_JbeeJWyJbnV9BGPZO6AAjfBvYG1DnVb-qwU7ibAKYKI6bZkcN-cGOsgjeNJQE',
                  imageAlt: 'Vue cartographique',
                  overlayType: 'dark',
                  overlayIntensity: 75,
                  showLegalReserve: true,
                  highlightCarousel: true,
                  position: applications.length + 1,
                  visible: true,
                  lastModifiedBy: 'Wilfried N.',
                  lastModifiedAt: 'À l’instant'
                };
                appStore.saveApplication(newApp);
                setSelectedAppId(newId);
                setFormData(newApp);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-sm transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Nouveau champ d'application</span>
            </button>
          </div>
        </div>
      </header>

      {/* Master-Detail Content Grid */}
      <div className="px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Catalog List (5 cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base text-[#10272F]">Catalogue public</span>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-slate-100 text-[#10272F] font-bold">
                  {applications.length} fiches
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5ECE9] text-[#0B6E78] font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E78]"></span>
                <span>100% Edge CDN</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {applications.map((app) => {
                const isSelected = app.id === selectedAppId;
                return (
                  <article
                    key={app.id}
                    onClick={() => handleSelectApp(app)}
                    className={`relative p-4 rounded-2xl bg-white shadow-xs border transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-[#0B6E78] ring-2 ring-[#0B6E78]/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-4 bottom-4 w-1.5 rounded-r bg-[#0B6E78]"></div>
                    )}
                    <div className="flex items-start gap-4 pl-1">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#10272F] shadow-xs">
                        <img
                          alt={app.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                          src={app.imageUrl}
                        />
                        <div className="absolute inset-0 bg-[#00545c]/30 mix-blend-multiply"></div>
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/70 text-white font-mono text-[9px]">
                          800×600
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px] text-[#0B6E78] uppercase font-bold tracking-wider">
                            {app.tag}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono text-[10px] ${
                              app.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${app.visible ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                            {app.visible ? 'En ligne' : 'Masqué'}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-sm text-[#10272F] truncate">
                          {app.title}
                        </h3>
                        <p className="text-xs text-[#4B6168] line-clamp-2 mt-1">
                          {app.description}
                        </p>

                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-slate-400">drag_indicator</span>
                            <span className="font-mono text-[10px] text-[#4B6168]">
                              Pos. {app.position}/04
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#4B6168]">Visible</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                appStore.toggleApplicationVisibility(app.id);
                              }}
                              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                                app.visible ? 'bg-[#0B6E78]' : 'bg-slate-300'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                                  app.visible ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Legal Disclaimer Box */}
            <div className="p-4 rounded-2xl bg-[#E5ECE9]/60 border border-slate-200 text-[#4B6168] flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#0B6E78] shrink-0 mt-0.5">info</span>
              <p className="text-xs leading-relaxed">
                <strong className="text-[#10272F]">Cadre d'application légal :</strong> Ces fiches présentent les typologies d'interventions potentielles d'InfraCité Ingénierie. Conformément à la charte déontologique, elles ne constituent pas des références contractuelles d'opérations clôturées.
              </p>
            </div>
          </aside>

          {/* RIGHT COLUMN: Detailed Edit Form (7 cols) */}
          <main className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col gap-6">
              {/* Top Card Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-[#0B6E78]/10 text-[#0B6E78] font-bold">
                      FICHE #{formData.orderCode} EN ÉDITION
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168]">UUID: {formData.id}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-[#10272F] mt-1">
                    Édition : {formData.tag}
                  </h2>
                  <span className="font-mono text-[11px] text-[#4B6168]">
                    Dernière modification par <span className="text-[#10272F] font-semibold">{formData.lastModifiedBy}</span> ({formData.lastModifiedAt})
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Section 1 : Métadonnées & Textes */}
                <section className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#0B6E78]">edit_note</span>
                      <h3 className="font-display font-bold text-base text-[#10272F]">
                        1. Métadonnées &amp; Textes institutionnels
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#4B6168] uppercase">FR-FR (Défaut)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Code d'ordre
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 font-mono text-sm text-[#10272F] border border-slate-200"
                        type="text"
                        value={formData.orderCode}
                        onChange={(e) => setFormData({ ...formData, orderCode: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Tag thématique (Affichage public)
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                        type="text"
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Titre du champ d'application
                    </label>
                    <input
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-display font-bold text-base text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Description détaillée
                      </label>
                      <span className="font-mono text-xs text-gray-500">
                        {formData.description.length} / 240 caractères
                      </span>
                    </div>
                    <textarea
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78] leading-relaxed"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  {/* Chips thématiques */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] text-[#4B6168] uppercase tracking-wider">
                      Mots-clés &amp; Thématiques d'intervention associées
                    </label>
                    <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      {formData.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#10272F] font-mono text-[11px] shadow-2xs border border-slate-200"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(idx)}
                            className="text-slate-400 hover:text-red-600"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </span>
                      ))}
                      <div className="flex items-center gap-1 pl-1">
                        <input
                          className="bg-transparent font-mono text-[11px] text-[#10272F] placeholder:text-slate-400 focus:outline-none w-36"
                          placeholder="+ Ajouter un tag..."
                          type="text"
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={handleAddTag}
                          className="text-[#0B6E78] text-xs font-bold font-mono"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 2 : Médias & Visuels */}
                <section className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#0B6E78]">image</span>
                      <h3 className="font-display font-bold text-base text-[#10272F]">
                        2. Médias, Cartographie &amp; Filtre visuel
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#4B6168] uppercase">ASSET_MEDIA</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="md:col-span-5 flex flex-col gap-2">
                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#10272F] shadow-xs">
                        <img
                          alt={formData.imageAlt}
                          className="w-full h-full object-cover"
                          src={formData.imageUrl}
                        />
                        <div
                          className={`absolute inset-0 ${
                            formData.overlayType === 'natural'
                              ? 'bg-[#10272F]/50 mix-blend-multiply'
                              : 'bg-[#10272F]/75 mix-blend-multiply'
                          } flex flex-col justify-between p-3 pointer-events-none`}
                        >
                          <span className="font-mono text-[9px] text-[#5CC6CC]">
                            OVERLAY ACTIF ({formData.overlayType === 'natural' ? '50%' : '75%'})
                          </span>
                          <div className="text-white">
                            <p className="font-display font-bold text-xs text-white">Aperçu vitrine</p>
                            <p className="font-mono text-[10px] text-[#D99A0B]">{formData.tag}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-semibold text-xs text-[#10272F]">
                          Image de fond &amp; cartographie de contexte
                        </span>
                        <p className="text-xs text-[#4B6168] mt-1 leading-relaxed">
                          Image haute définition utilisée comme fond d'ambiance avec le filtre géodésique InfraCité.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 pt-3">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleDeviceUpload}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#10272F] hover:bg-slate-100 text-xs font-semibold shadow-2xs"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#0B6E78]">upload</span>
                            <span>Depuis device</span>
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-mono text-[10px] text-[#4B6168] uppercase tracking-wider">
                          Texte alternatif d'accessibilité (Alt text)
                        </label>
                        <input
                          className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-[#10272F] focus:outline-none focus:ring-1 focus:ring-[#0B6E78]"
                          type="text"
                          value={formData.imageAlt}
                          onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Overlay Filter Option */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <p className="font-semibold text-[#10272F]">Filtre d'ambiance cartographique</p>
                      <p className="text-[11px] text-[#4B6168]">Garantit le contraste et la lisibilité des textes blancs</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, overlayType: 'dark' })}
                        className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold ${
                          formData.overlayType === 'dark'
                            ? 'bg-[#10272F] text-white shadow-xs'
                            : 'bg-white text-[#4B6168] border border-slate-200'
                        }`}
                      >
                        Teinte sombre (75%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, overlayType: 'natural' })}
                        className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold ${
                          formData.overlayType === 'natural'
                            ? 'bg-[#10272F] text-white shadow-xs'
                            : 'bg-white text-[#4B6168] border border-slate-200'
                        }`}
                      >
                        Naturel (50%)
                      </button>
                    </div>
                  </div>
                </section>

                {/* Section 3 : Paramètres de publication */}
                <section className="flex flex-col gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#0B6E78]">tune</span>
                      <h3 className="font-display font-bold text-base text-[#10272F]">
                        3. Paramètres de publication &amp; Cadre déontologique
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#4B6168] uppercase">CONFIG_PUBLISH</span>
                  </div>

                  <div className="space-y-3">
                    {/* Legal Reserve toggle */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#D99A0B] mt-0.5">verified_user</span>
                        <div>
                          <p className="font-semibold text-xs text-[#10272F]">Afficher la note de réserve d'usage sur la fiche</p>
                          <p className="text-[10px] text-[#4B6168]">
                            « Ces exemples illustrent des champs d'application possibles ; ils ne constituent pas des références de réalisations. »
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, showLegalReserve: !formData.showLegalReserve })}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors ${
                          formData.showLegalReserve ? 'bg-[#0B6E78]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            formData.showLegalReserve ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Position selector */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-[#10272F]">Position de tri dans la grille</p>
                        <p className="text-[10px] text-[#4B6168]">Ordre d'apparition séquentiel</p>
                      </div>
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) })}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-xs font-bold text-[#10272F] outline-none"
                      >
                        <option value={1}>Rang 1 sur 4 (En tête)</option>
                        <option value={2}>Rang 2 sur 4</option>
                        <option value={3}>Rang 3 sur 4</option>
                        <option value={4}>Rang 4 sur 4</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Footer action bar */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setFormData(currentApp)}
                    className="text-xs text-[#4B6168] hover:text-red-600 transition-colors"
                  >
                    Réinitialiser les modifications
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                    <span>Enregistrer et publier</span>
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
