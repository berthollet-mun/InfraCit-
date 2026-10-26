import React from 'react';

export type AdminTab =
  | 'dashboard'
  | 'carrousels'
  | 'domaines'
  | 'prestations'
  | 'applications'
  | 'etapes'
  | 'approche'
  | 'accueil'
  | 'contact'
  | 'mentions'
  | 'messages'
  | 'parametres'
  | 'utilisateurs'
  | 'audit';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onReturnToPublic: () => void;
  unreadCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onReturnToPublic,
  unreadCount
}) => {
  const getLinkClass = (tab: AdminTab) => {
    const isActive = currentTab === tab;
    if (isActive) {
      return 'flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-sm bg-[#0B6E78] text-white shadow-sm font-medium transition-colors';
    }
    return 'flex items-center gap-3 px-3 py-2 rounded-lg font-sans text-sm text-[#4B6168] hover:bg-[#E5ECE9] hover:text-[#10272F] transition-colors';
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto border-r border-slate-200/80">
      <div className="p-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#10272F] text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#5CC6CC]">architecture</span>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D99A0B] ring-2 ring-white"></div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-base tracking-tight text-[#10272F]">
                InfraCité
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0B6E78]"></span>
            </div>
            <span className="font-mono text-[10px] text-[#4B6168] tracking-widest uppercase">
              Ingénierie · Admin
            </span>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="flex flex-col gap-5 mt-4">
          {/* Vue Globale */}
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 font-mono text-[10px] text-[#4B6168] uppercase tracking-widest font-semibold">
              Vue Globale
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('dashboard')}
              className={getLinkClass('dashboard')}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Tableau de bord</span>
            </button>
          </div>

          {/* Contenus du Site */}
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 font-mono text-[10px] text-[#4B6168] uppercase tracking-widest font-semibold">
              Contenus du Site
            </div>
            {/* Promo Carousel Tab requested by user */}
            <button
              type="button"
              onClick={() => onSelectTab('carrousels')}
              className={getLinkClass('carrousels')}
            >
              <span className="material-symbols-outlined text-[18px]">view_carousel</span>
              <span>Carrousels &amp; Promos</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('domaines')}
              className={getLinkClass('domaines')}
            >
              <span className="material-symbols-outlined text-[18px]">category</span>
              <span>Domaines</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('prestations')}
              className={getLinkClass('prestations')}
            >
              <span className="material-symbols-outlined text-[18px]">engineering</span>
              <span>Prestations</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('applications')}
              className={getLinkClass('applications')}
            >
              <span className="material-symbols-outlined text-[18px]">domain</span>
              <span>Applications</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('etapes')}
              className={getLinkClass('etapes')}
            >
              <span className="material-symbols-outlined text-[18px]">linear_scale</span>
              <span>Étapes</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('approche')}
              className={getLinkClass('approche')}
            >
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>Approche</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('accueil')}
              className={getLinkClass('accueil')}
            >
              <span className="material-symbols-outlined text-[18px]">web</span>
              <span>Page d'accueil</span>
            </button>
          </div>

          {/* Infos & Contact */}
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 font-mono text-[10px] text-[#4B6168] uppercase tracking-widest font-semibold">
              Infos &amp; Contact
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('contact')}
              className={getLinkClass('contact')}
            >
              <span className="material-symbols-outlined text-[18px]">pin_drop</span>
              <span>Coordonnées</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('mentions')}
              className={getLinkClass('mentions')}
            >
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span>Mentions Légales</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('messages')}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-sans text-sm transition-colors ${
                currentTab === 'messages'
                  ? 'bg-[#0B6E78] text-white shadow-sm font-medium'
                  : 'text-[#4B6168] hover:bg-[#E5ECE9] hover:text-[#10272F]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span>Messages reçus</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full font-mono text-[11px] bg-[#D99A0B] text-[#10272F] font-bold shadow-2xs">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Système */}
          <div className="flex flex-col gap-1">
            <div className="px-3 py-1 font-mono text-[10px] text-[#4B6168] uppercase tracking-widest font-semibold">
              Système
            </div>
            <button
              type="button"
              onClick={() => onSelectTab('parametres')}
              className={getLinkClass('parametres')}
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>SEO &amp; Paramètres</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('utilisateurs')}
              className={getLinkClass('utilisateurs')}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span>Utilisateurs</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTab('audit')}
              className={getLinkClass('audit')}
            >
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span>Journal d'audit</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Footer link to public site */}
      <div className="p-6 bg-[#f1f4f4] border-t border-slate-200">
        <button
          type="button"
          onClick={onReturnToPublic}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-white font-medium text-xs text-[#10272F] hover:bg-[#0B6E78] hover:text-white shadow-xs transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          <span>Voir le site public</span>
        </button>
        <div className="flex items-center justify-between mt-3 pt-2 text-[#4B6168] font-mono text-[10px]">
          <span>v2.4.0-PROD</span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#0B6E78] animate-pulse"></span>
        </div>
      </div>
    </aside>
  );
};
