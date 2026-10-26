import React, { useState, useRef } from 'react';
import { CarouselSlide } from '../../types';
import { appStore } from '../../lib/store';

interface AdminCarrouselsProps {
  slides: CarouselSlide[];
}

export const AdminCarrousels: React.FC<AdminCarrouselsProps> = ({ slides }) => {
  const [selectedSlideId, setSelectedSlideId] = useState<string | null>(slides[0]?.id || null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedSlide = slides.find((s) => s.id === selectedSlideId) || slides[0];

  const [formData, setFormData] = useState<CarouselSlide>(
    selectedSlide || {
      id: `slide-${Date.now()}`,
      title: '',
      subtitle: '',
      description: '',
      badge: 'OFFRE PROMOTIONNELLE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALvRl-r5OmzoMzr95hKkYijoCLzWDF7wKz-6AGL_MkgIcoewWdq1Nh9CRdKKWBMfr5xbdQGqCj_-pkvlDl5LpP3f94uP1GNATkydUOvrrbnXoLjMKhxX6FUUgm88MTbd-eR61i1K4xtQfTGBAeaGTndzl6d6OtQdSxsXVCE78s6_JbeeJWyJbnV9BGPZO6AAjfBvYG1DnVb-qwU7ibAKYKI6bZkcN-cGOsgjeNJQE',
      ctaText: 'En savoir plus',
      ctaLink: '#contact',
      active: true,
      order: slides.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    }
  );

  // Sync form when slide selection changes
  const handleSelectSlide = (slide: CarouselSlide) => {
    setSelectedSlideId(slide.id);
    setIsCreatingNew(false);
    setFormData(slide);
  };

  const handleStartNew = () => {
    setIsCreatingNew(true);
    setSelectedSlideId(null);
    setFormData({
      id: `slide-${Date.now()}`,
      title: 'Nouvelle campagne promotionnelle 2026',
      subtitle: 'Offre exclusive maîtrise d’ouvrage',
      description: 'Présentation de notre offre spéciale d’études d’opportunité et de modélisation SIG pour les collectivités et aménageurs.',
      badge: 'PROMOTION PRINCIPALE',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhLhIDzARLytIlGHPf2oFp1LV5xwmSVE8D-aKrI6VOWIICahipm84j6eKCkAfALsq9aUcAmKRgus2m21CRbhccjfwh8ocVudcK5xf4JVchTebblBl2uqVbn3kpWhryi-RwiS4NX-i9aBySoSLLoPGHg1uCuNiaxoU61a6cQ-yGLgJWhUAHdtw9fw7Shq3uEFjAKxSwY4YMH8foGog6OLANsJZDNUNzc713VeW1nOo',
      ctaText: 'Profiter de l’offre',
      ctaLink: '#contact',
      active: true,
      order: slides.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    });
  };

  // Device file upload handler
  const handleDeviceFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image valide (JPEG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        imageUrl: dataUrl
      }));
      setToastMessage(`Image chargée depuis votre appareil (${file.name}) !`);
      setTimeout(() => setToastMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appStore.saveCarouselSlide(formData);
    setIsCreatingNew(false);
    setSelectedSlideId(formData.id);
    setToastMessage('Bannière enregistrée et publiée avec succès sur la vitrine !');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Voulez-vous vraiment supprimer la bannière obsolète "${title}" ?`)) {
      appStore.deleteCarouselSlide(id);
      setToastMessage('Bannière obsolète supprimée avec succès.');
      setTimeout(() => setToastMessage(null), 3000);
      const remaining = slides.filter((s) => s.id !== id);
      if (remaining.length > 0) {
        handleSelectSlide(remaining[0]);
      }
    }
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

      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-slate-200">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="marker-triangle"></span>
            <span className="font-mono text-xs text-[#0B6E78] uppercase tracking-widest font-semibold">
              CONTENUS DU SITE · BANNIÈRES EN HAUT DE PAGE
            </span>
            <span className="text-slate-400">/</span>
            <span className="font-mono text-xs text-[#4B6168]">CARROUSELS_PROMO</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10272F]">
            Gestion des Carrousels &amp; Bannières Promotionnelles
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Importez des images directement depuis votre appareil (ordinateur, tablette ou mobile), personnalisez les titres, les liens vers vos offres ou le formulaire, et supprimez facilement les bannières obsolètes.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleStartNew}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Ajouter une bannière</span>
          </button>
        </div>
      </header>

      {/* Grid: Master List (5 cols) & Editor (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Catalog of slides */}
        <aside className="lg:col-span-5 flex flex-col gap-4">
          <div className="p-4 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-base text-[#10272F]">
                Bannières configurées
              </span>
              <span className="px-2 py-0.5 rounded-full font-mono text-[11px] bg-slate-100 font-bold">
                {slides.length}
              </span>
            </div>
            <span className="text-xs font-mono text-[#0B6E78] font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0B6E78]"></span>
              {slides.filter((s) => s.active).length} actives en vitrine
            </span>
          </div>

          <div className="space-y-3">
            {slides.map((slide) => {
              const isSelected = !isCreatingNew && slide.id === selectedSlideId;
              return (
                <div
                  key={slide.id}
                  onClick={() => handleSelectSlide(slide)}
                  className={`p-4 rounded-2xl bg-white shadow-xs border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#0B6E78] ring-2 ring-[#0B6E78]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#0B6E78] rounded-r-full"></div>
                  )}

                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail */}
                    <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0 relative">
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="w-full h-full object-cover opacity-85"
                      />
                      <span className="absolute bottom-1 right-1 font-mono text-[9px] px-1 py-0.5 bg-black/70 text-white rounded">
                        #{slide.order}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-[#D99A0B]/20 text-[#D99A0B] font-mono text-[9px] font-bold uppercase truncate max-w-[150px]">
                          {slide.badge}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              appStore.toggleCarouselSlide(slide.id);
                            }}
                            className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-medium ${
                              slide.active
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {slide.active ? 'Active' : 'Désactivée'}
                          </button>
                          <button
                            type="button"
                            title="Supprimer la bannière"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(slide.id, slide.title);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="font-display font-bold text-sm text-[#10272F] truncate">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-[#4B6168] line-clamp-1 mt-0.5">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Device Upload Tip */}
          <div className="p-4 rounded-2xl bg-[#E5ECE9]/60 border border-slate-200 text-xs text-[#4B6168] flex items-start gap-3">
            <span className="material-symbols-outlined text-[20px] text-[#0B6E78] shrink-0 mt-0.5">devices</span>
            <p className="leading-relaxed">
              <strong className="text-[#10272F]">Upload multi-dispositifs :</strong> Vous pouvez glisser-déposer ou sélectionner directement des visuels photographiques ou cartographiques depuis vos appareils (PC, Mac, iPhone, Android) sans passer par un serveur tiers.
            </p>
          </div>
        </aside>

        {/* Right: Detailed Form & Live Preview */}
        <main className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-[#0B6E78]/10 text-[#0B6E78] font-bold">
                  {isCreatingNew ? 'NOUVELLE BANNIÈRE' : 'ÉDITION DE BANNIÈRE'}
                </span>
                <h3 className="font-display font-bold text-xl text-[#10272F] mt-1">
                  {isCreatingNew ? 'Créer une bannière en haut de page' : `Modifier : ${formData.title}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Supprimer cette bannière obsolète ?")) {
                    handleDelete(formData.id, formData.title);
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
                <span>Supprimer</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Image Uploader from Device */}
              <div className="p-5 rounded-2xl bg-[#F2F5F3] border border-slate-200/90 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#0B6E78]">photo_library</span>
                    <h4 className="font-semibold text-sm text-[#10272F]">
                      Image d’arrière-plan &amp; Ambiance
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-[#4B6168]">Format 16:9 recommandé</span>
                </div>

                {/* Preview Box */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#10272F] shadow-inner">
                  <img
                    src={formData.imageUrl}
                    alt={formData.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10272F] via-[#10272F]/80 to-transparent flex flex-col justify-end p-4">
                    <span className="font-mono text-[10px] text-[#D99A0B] font-bold uppercase mb-1">
                      {formData.badge || 'BADGE APERÇU'}
                    </span>
                    <h5 className="font-display font-bold text-white text-base truncate">
                      {formData.title || 'Titre de la bannière'}
                    </h5>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {formData.description}
                    </p>
                  </div>
                </div>

                {/* Upload action buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDeviceFileUpload}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-[#10272F] shadow-2xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#0B6E78]">upload_file</span>
                    <span>Importer depuis mon appareil (Device)</span>
                  </button>

                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="url"
                      placeholder="Ou collez une URL d’image directe..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#10272F] outline-none focus:ring-1 focus:ring-[#0B6E78]"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Titre principal de la promotion *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Badge / Tag promo
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-[#D99A0B] font-bold focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                  />
                </div>
              </div>

              {/* Subtitle & Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Sous-titre accrocheur
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Description détaillée
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                />
              </div>

              {/* Call to Action Button & Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Libellé du bouton CTA
                  </label>
                  <input
                    type="text"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Lien de redirection (Ancre ou URL)
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="#contact, #domaines ou https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono text-[#0B6E78] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                  />
                </div>
              </div>

              {/* Status and Order */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold text-[#10272F]">Statut de diffusion :</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-colors ${
                      formData.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {formData.active ? 'Bannière active en ligne' : 'Brouillon / Masquée'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#4B6168]">
                  <span>Ordre d'apparition :</span>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-16 px-2 py-1 rounded-lg border border-slate-300 font-mono text-center font-bold"
                  />
                </div>
              </div>

              {/* Submit footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSelectSlide(slides[0])}
                  className="text-xs text-[#4B6168] hover:text-red-600 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  <span>Enregistrer et publier en haut de page</span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
