import React, { useState } from 'react';
import { User } from '../../types';
import { AdminTab } from './AdminSidebar';

interface AdminTopBarProps {
  currentTab: AdminTab;
  currentUser: User | null;
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  currentTab,
  currentUser,
  onLogout,
  searchQuery,
  onSearchChange
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const tabLabels: Record<AdminTab, string> = {
    dashboard: 'Tableau de bord',
    carrousels: 'Carrousels & Bannières promotionnelles',
    domaines: "Domaines d'intervention",
    prestations: 'Prestations & Missions',
    applications: "Champs d'application",
    etapes: 'Étapes du processus',
    approche: 'Notre approche & Principes',
    accueil: 'Hero & Page d’accueil',
    contact: 'Coordonnées & Adresses',
    mentions: 'Mentions Légales & SIREN',
    messages: 'Boîte de réception des demandes',
    parametres: 'SEO & Paramètres système',
    utilisateurs: 'Gestion des utilisateurs',
    audit: 'Journal d’audit & Traçabilité'
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 border-b border-slate-200/80">
      <div className="h-16 w-full px-6 flex items-center justify-between gap-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#4B6168]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#10272F] font-bold">
            INFRA-CORE
          </span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[#10272F] font-semibold">{tabLabels[currentTab]}</span>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#4B6168] pointer-events-none">
              search
            </span>
            <input
              className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#f1f4f4] text-[#10272F] text-xs placeholder:text-[#4B6168] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0B6E78] transition-colors"
              placeholder="Rechercher bannière, domaine, message, tag..."
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Dropdown Toggle */}
          <div className="relative">
            <button
              className="relative p-2 rounded-full text-[#4B6168] hover:bg-slate-100 hover:text-[#10272F] transition-colors"
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications système"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D99A0B] ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-semibold text-[#10272F]">Notifications actives</span>
                  <span className="font-mono text-[10px] text-[#0B6E78]">Temps réel</span>
                </div>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#D99A0B] mt-1 shrink-0"></span>
                    <div>
                      <p className="font-medium text-[#10272F]">3 demandes de contact en attente</p>
                      <span className="text-[10px] text-[#4B6168]">CA Val de Seine, UrbanConseil</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#0B6E78] mt-1 shrink-0"></span>
                    <div>
                      <p className="font-medium text-[#10272F]">Bannières promotionnelles actives</p>
                      <span className="text-[10px] text-[#4B6168]">3 slides en rotation sur la vitrine</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-semibold text-[#10272F] leading-tight">
                {currentUser?.name || 'Wilfried N.'}
              </span>
              <span className="font-mono text-[10px] text-[#0B6E78] font-medium">
                {currentUser?.role === 'ADMIN' ? 'Super Admin' : currentUser?.role || 'Admin'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0B6E78] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {currentUser?.name?.charAt(0) || 'W'}
            </div>
            <button
              className="p-1.5 rounded-lg text-[#4B6168] hover:bg-red-50 hover:text-red-600 transition-colors"
              title="Déconnexion"
              type="button"
              onClick={onLogout}
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
