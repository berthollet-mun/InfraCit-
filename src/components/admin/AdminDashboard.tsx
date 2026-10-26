import React, { useState } from 'react';
import { AppState } from '../../lib/store';
import { appStore } from '../../lib/store';
import { AdminTab } from './AdminSidebar';

interface AdminDashboardProps {
  state: AppState;
  onNavigateTab: (tab: AdminTab) => void;
  onPreviewPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  state,
  onNavigateTab,
  onPreviewPublic
}) => {
  const [publishMessage, setPublishMessage] = useState<string | null>(null);

  const handlePublish = () => {
    const timestamp = appStore.deployChanges();
    setPublishMessage(`Publication réussie ! Cache Edge purgé (${timestamp}).`);
    setTimeout(() => setPublishMessage(null), 4000);
  };

  const unreadMessages = state.messages.filter((m) => m.status === 'new');

  return (
    <div className="w-full max-w-[1160px] mx-auto px-4 md:px-8 py-8 md:py-10 space-y-8">
      {/* Toast de publication */}
      {publishMessage && (
        <div className="p-4 rounded-xl bg-[#0B6E78] text-white flex items-center justify-between shadow-lg animate-in fade-in">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-sm font-medium">{publishMessage}</span>
          </div>
          <button
            onClick={() => setPublishMessage(null)}
            className="text-white/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* En-tête de Pilotage Stratégique */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col max-w-[65ch]">
          <div className="flex items-center gap-2 mb-2">
            <span className="marker-triangle"></span>
            <span className="font-mono text-xs text-[#4B6168] uppercase tracking-widest font-semibold">
              Vue d'ensemble · Pilotage du site
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#10272F]">
            Tableau de bord
          </h1>
          <p className="text-sm text-[#4B6168] mt-2">
            Aperçu global des contenus en ligne, des bannières promotionnelles et des demandes de contact reçues.
          </p>
        </div>

        {/* Actions Rapides */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex flex-col text-left sm:text-right pr-1">
            <span className="font-mono text-[10px] text-[#4B6168]">Dernière mise en ligne</span>
            <span className="font-mono text-xs font-semibold text-[#10272F] flex items-center gap-1.5 sm:justify-end">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0B6E78] animate-pulse"></span>
              {state.settings.lastDeployedAt}
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onPreviewPublic}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#10272F] font-semibold text-xs hover:bg-[#E5ECE9] shadow-xs border border-slate-200 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#4B6168]">visibility</span>
              <span>Prévisualiser</span>
            </button>
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white font-semibold text-xs shadow-md transition-all active:scale-[0.99]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">publish</span>
              <span>+ Publier les modifications</span>
            </button>
          </div>
        </div>
      </header>

      {/* Section 1 : 4 Cartes Métriques Géodésiques */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 : Domaines */}
        <div
          onClick={() => onNavigateTab('domaines')}
          className="relative bg-white rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border border-slate-200/70 group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#0B6E78]"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-semibold tracking-wider">
                Domaines
              </span>
              <span className="font-display text-3xl text-[#10272F] mt-1 font-bold">
                {state.domains.length}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#E5ECE9] font-mono text-[10px] text-[#0B6E78] font-bold">
              À jour
            </span>
          </div>
          <div className="mt-4 pt-4 bg-[#f1f4f4]/60 -mx-6 -mb-6 px-6 py-3">
            <p className="text-xs text-[#4B6168] flex items-center gap-1.5 font-medium">
              <span className="material-symbols-outlined text-[16px] text-[#0B6E78]">verified</span>
              {state.domains.filter((d) => d.visible).length} publiés · {state.domains.flatMap((d) => d.skills).length} compétences
            </p>
          </div>
        </div>

        {/* KPI 2 : Prestations */}
        <div
          onClick={() => onNavigateTab('prestations')}
          className="relative bg-white rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border border-slate-200/70 group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#00545c]"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-semibold tracking-wider">
                Prestations &amp; Missions
              </span>
              <span className="font-display text-3xl text-[#10272F] mt-1 font-bold">
                {state.services.length}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#E5ECE9] font-mono text-[10px] text-[#10272F] font-bold">
              4 fiches
            </span>
          </div>
          <div className="mt-4 pt-4 bg-[#f1f4f4]/60 -mx-6 -mb-6 px-6 py-3">
            <p className="text-xs text-[#4B6168] truncate font-medium">
              Diagnostics, Faisabilité, SIG, Conseil
            </p>
          </div>
        </div>

        {/* KPI 3 : Applications */}
        <div
          onClick={() => onNavigateTab('applications')}
          className="relative bg-white rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border border-slate-200/70 group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#5CC6CC]"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-semibold tracking-wider">
                Champs d'application
              </span>
              <span className="font-display text-3xl text-[#10272F] mt-1 font-bold">
                {state.applications.length}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#ebeeef] font-mono text-[10px] text-[#4B6168] font-bold">
              Cas d'usage
            </span>
          </div>
          <div className="mt-4 pt-4 bg-[#f1f4f4]/60 -mx-6 -mb-6 px-6 py-3">
            <p className="text-xs text-[#4B6168] truncate font-medium">
              Territoires, Urbain, Espace, Vert
            </p>
          </div>
        </div>

        {/* KPI 4 : Messages Reçus */}
        <div
          onClick={() => onNavigateTab('messages')}
          className="relative bg-white rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all cursor-pointer border border-slate-200/70 group"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#D99A0B]"></div>
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-semibold tracking-wider">
                Messages Reçus
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-3xl text-[#10272F] font-bold">
                  {unreadMessages.length}
                </span>
                <span className="font-mono text-xs text-[#4B6168]">
                  non lus / {state.messages.length}
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#feba35]/30 font-mono text-[10px] text-[#7e5700] font-bold">
              À traiter
            </span>
          </div>
          <div className="mt-4 pt-4 bg-[#f1f4f4]/60 -mx-6 -mb-6 px-6 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0B6E78] flex items-center gap-1 group-hover:underline">
              <span>Messagerie directe</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </section>

      {/* Section 2 : Grille Asymétrique Centrale (2/3 - 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Colonne Principale Gauche (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Carte : Demandes de contact récentes */}
          <section className="bg-white rounded-[20px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ebeeef] flex items-center justify-center text-[#0B6E78]">
                  <span className="material-symbols-outlined text-[20px]">inbox</span>
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-[#10272F]">
                    Dernières demandes de contact
                  </h2>
                  <p className="text-xs text-[#4B6168]">
                    Opportunités et sollicitations de maîtres d'ouvrage
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#feba35]/25 font-mono text-[10px] text-[#7e5700] font-bold">
                  {unreadMessages.length} requêtes en attente
                </span>
              </div>
            </div>

            {/* Tableau sans bordures arbitraires */}
            <div className="overflow-x-auto -mx-6 sm:-mx-7 px-6 sm:px-7 mt-2">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-mono text-xs uppercase">
                    <th className="py-3 px-3.5 rounded-l-lg font-semibold">Statut</th>
                    <th className="py-3 px-3.5 font-semibold">Interlocuteur &amp; Organisme</th>
                    <th className="py-3 px-3.5 font-semibold">Objet de l'intervention</th>
                    <th className="py-3 px-3.5 font-semibold">Délai</th>
                    <th className="py-3 px-3.5 rounded-r-lg text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-[#10272F]">
                  {state.messages.slice(0, 4).map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3.5 align-top whitespace-nowrap">
                        {msg.status === 'new' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-mono text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                            Nouveau
                          </span>
                        ) : msg.status === 'replied' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-xs font-semibold">
                            Répondu
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-mono text-xs font-medium">
                            Lu
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3.5 align-top">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-[#10272F]">{msg.name}</span>
                          <span className="text-xs sm:text-sm text-slate-600">{msg.company}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3.5 align-top max-w-[240px]">
                        <span className="line-clamp-2 text-sm text-slate-800 leading-snug">{msg.subject}</span>
                      </td>
                      <td className="py-3.5 px-3.5 align-top whitespace-nowrap font-mono text-xs text-slate-600">
                        {msg.createdAt}
                      </td>
                      <td className="py-3 px-3 align-top text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onNavigateTab('messages')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ebeeef] hover:bg-[#0B6E78] hover:text-white text-[#10272F] font-semibold text-[11px] transition-colors"
                        >
                          <span>Consulter</span>
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pied de carte */}
            <div className="mt-4 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f1f4f4]/40 -mx-6 sm:-mx-7 -mb-6 sm:-mb-7 px-6 sm:px-7 py-3 rounded-b-[20px] border-t border-slate-100">
              <span className="text-xs text-[#4B6168]">
                Traitement moyen : <strong>&lt; 24h</strong> · Archive automatique après 90 jours
              </span>
              <button
                type="button"
                onClick={() => onNavigateTab('messages')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-[#0B6E78] hover:bg-[#0B6E78] hover:text-white font-semibold text-xs shadow-xs border border-slate-200 transition-all"
              >
                <span>Consulter l'ensemble des {state.messages.length} messages</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* Carte : Activité & Journal des révisions */}
          <section className="bg-white rounded-[20px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ebeeef] flex items-center justify-center text-[#0B6E78]">
                  <span className="material-symbols-outlined text-[20px]">history_edu</span>
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-[#10272F]">
                    Activité &amp; Journal des révisions
                  </h2>
                  <p className="text-xs text-[#4B6168]">
                    Traçabilité des modifications éditoriales et structurelles
                  </p>
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-bold">
                AUDIT TRAIL
              </span>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 space-y-4 mt-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#ebeeef]">
              {state.auditLogs.slice(0, 4).map((log, index) => (
                <div key={log.id} className="relative flex items-start gap-4">
                  <span
                    className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full ring-4 ring-white ${
                      index === 0
                        ? 'bg-[#0B6E78]'
                        : index === 1
                        ? 'bg-[#D99A0B]'
                        : index === 2
                        ? 'bg-[#5CC6CC]'
                        : 'bg-slate-400'
                    }`}
                  ></span>
                  <div className="flex-1 bg-[#f1f4f4]/60 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-slate-100">
                    <div className="flex flex-col">
                      <span className="font-semibold text-xs text-[#10272F]">{log.action}</span>
                      <span className="text-[11px] text-[#4B6168]">{log.details}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full bg-[#E5ECE9] font-mono text-[10px] text-[#4B6168]">
                        {log.category}
                      </span>
                      <span className="font-mono text-[10px] text-[#4B6168]">{log.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Colonne Droite Complémentaire (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Bloc : Accès rapides d'édition */}
          <section className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/80">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-bold tracking-wider">
                RACCOURCIS ÉDITORIAUX
              </span>
              <span className="material-symbols-outlined text-[18px] text-[#D99A0B]">bolt</span>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <button
                type="button"
                onClick={() => onNavigateTab('carrousels')}
                className="group p-3 rounded-xl bg-[#f1f4f4] hover:bg-[#0B6E78] transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#00545c] text-[#10272F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">view_carousel</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#10272F] group-hover:text-white">
                      Carrousels Promos
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168] group-hover:text-white/80">
                      Upload local &amp; Liens
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4B6168] group-hover:text-white group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('accueil')}
                className="group p-3 rounded-xl bg-[#f1f4f4] hover:bg-[#0B6E78] transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#00545c] text-[#10272F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">web</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#10272F] group-hover:text-white">
                      Hero &amp; En Bref
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168] group-hover:text-white/80">
                      Page d'accueil
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4B6168] group-hover:text-white group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('domaines')}
                className="group p-3 rounded-xl bg-[#f1f4f4] hover:bg-[#0B6E78] transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#00545c] text-[#10272F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">category</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#10272F] group-hover:text-white">
                      4 Domaines Techniques
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168] group-hover:text-white/80">
                      Fiches &amp; Compétences
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4B6168] group-hover:text-white group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('contact')}
                className="group p-3 rounded-xl bg-[#f1f4f4] hover:bg-[#0B6E78] transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#00545c] text-[#10272F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#10272F] group-hover:text-white">
                      Coordonnées &amp; Contact
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168] group-hover:text-white/80">
                      Standard, Adresse
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4B6168] group-hover:text-white group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('mentions')}
                className="group p-3 rounded-xl bg-[#f1f4f4] hover:bg-[#0B6E78] transition-all flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white group-hover:bg-[#00545c] text-[#10272F] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-[#10272F] group-hover:text-white">
                      Mentions Légales
                    </span>
                    <span className="font-mono text-[10px] text-[#4B6168] group-hover:text-white/80">
                      SIREN, RCS, RGPD
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-[#4B6168] group-hover:text-white group-hover:translate-x-1 transition-all">
                  chevron_right
                </span>
              </button>
            </div>
          </section>

          {/* Carte : État du site & Infrastructure */}
          <section className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-200/80 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-mono text-[10px] uppercase text-[#4B6168] font-bold tracking-wider">
                INFRASTRUCTURE SITE
              </span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00545c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0B6E78]"></span>
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex items-center justify-between py-1.5 bg-[#f1f4f4] px-3 rounded-lg">
                <span className="text-[#4B6168] text-[10px] uppercase">Statut Réseau</span>
                <span className="text-[#0B6E78] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B6E78]"></span>
                  Opérationnel
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 bg-[#f1f4f4] px-3 rounded-lg">
                <span className="text-[#4B6168] text-[10px] uppercase">Version</span>
                <span className="text-[#10272F] font-bold">{state.settings.systemVersion}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 bg-[#f1f4f4] px-3 rounded-lg">
                <span className="text-[#4B6168] text-[10px] uppercase">Hébergement</span>
                <span className="text-[#10272F] font-medium">Paris (FR) · RGPD</span>
              </div>
              <div className="flex items-center justify-between py-1.5 bg-[#f1f4f4] px-3 rounded-lg">
                <span className="text-[#4B6168] text-[10px] uppercase">Certificat SSL</span>
                <span className="text-[#10272F] font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#00545c]">lock</span>
                  TLS 1.3 Actif
                </span>
              </div>
            </div>

            {/* Bascule Mode Maintenance */}
            <div className="mt-1 p-3.5 rounded-xl bg-[#f1f4f4] flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-[#10272F]">Mode maintenance</span>
                <span className="text-[10px] text-[#4B6168]">Bloque l'accès aux visiteurs</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newState = !state.settings.maintenanceMode;
                  if (newState && !confirm("Activer le mode maintenance ? Les visiteurs verront un écran de veille.")) return;
                  appStore.setMaintenanceMode(newState);
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors focus:outline-none ${
                  state.settings.maintenanceMode ? 'bg-[#D99A0B]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    state.settings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Widget : Représentation d'impact topographique */}
          <div className="relative rounded-[20px] bg-[#10272F] text-white p-6 shadow-sm overflow-hidden flex flex-col justify-between min-h-[170px]">
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#5CC6CC]/10 blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] text-[#5CC6CC] uppercase font-bold tracking-wider">
                  Index de Disponibilité
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99A0B]"></span>
              </div>
              <div className="font-display text-3xl font-bold">99.98%</div>
              <p className="text-xs text-slate-300 mt-1">
                Temps de réponse moyen CDN : 84ms sur l'ensemble du territoire national.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-[#5CC6CC] font-mono">
              <span>Surveillance HTTP/2 · Paris</span>
              <span className="material-symbols-outlined text-[18px]">query_stats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
