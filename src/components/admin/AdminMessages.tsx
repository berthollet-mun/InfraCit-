import React, { useState } from 'react';
import { Message } from '../../types';
import { appStore } from '../../lib/store';

interface AdminMessagesProps {
  messages: Message[];
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ messages }) => {
  const [selectedMessageId, setSelectedMessageId] = useState<string>(messages[0]?.id || 'msg-1');
  const [filterTab, setFilterTab] = useState<'all' | 'unread' | 'devis' | 'archived'>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [replyText, setReplyText] = useState(
    "Monsieur,\n\nNous accusons bonne réception de votre demande concernant votre projet territorial.\n\nNos experts ont examiné vos spécifications préliminaires. Nous serions ravis d'organiser une réunion de cadrage technique en visio-conférence ou sur site.\n\nDans cette attente, nous tenons à votre disposition nos références détaillées.\n\nBien cordialement,\nWilfried N. · Direction des Études InfraCité"
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedMessage = messages.find((m) => m.id === selectedMessageId) || messages[0];

  const filteredMessages = messages.filter((m) => {
    if (filterTab === 'unread' && m.status !== 'new') return false;
    if (filterTab === 'archived' && m.status !== 'archived') return false;
    if (filterTab === 'devis' && !m.subject.toLowerCase().includes('étude') && !m.budgetEstimate) return false;

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchComp = m.company.toLowerCase().includes(q);
      const matchSubj = m.subject.toLowerCase().includes(q);
      if (!matchName && !matchComp && !matchSubj) return false;
    }
    return true;
  });

  const handleSelect = (msg: Message) => {
    setSelectedMessageId(msg.id);
    if (msg.status === 'new') {
      appStore.markMessageAsRead(msg.id);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;
    appStore.replyToMessage(selectedMessage.id, replyText);
    setToastMessage(`Réponse officielle transmise à ${selectedMessage.email} !`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Référence,Nom,Organisme,Email,Téléphone,Objet,Statut,Date']
        .concat(
          messages.map(
            (m) =>
              `"${m.ref}","${m.name}","${m.company}","${m.email}","${m.phone || ''}","${m.subject.replace(/"/g, '""')}","${m.status}","${m.createdAt}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `infracite_demandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const unreadCount = messages.filter((m) => m.status === 'new').length;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-6 flex flex-col gap-6">
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

      {/* Traçabilité & Fil d'ariane */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#4B6168]">
            <span className="inline-flex items-center gap-1.5 text-[#0B6E78] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#D99A0B] animate-pulse"></span>
              SYS:CONTACT_GATEWAY
            </span>
            <span>/</span>
            <span>INFOS &amp; CONTACT</span>
            <span>/</span>
            <span className="text-[#10272F] font-semibold">MESSAGES_REÇUS</span>
            <span className="px-2 py-0.5 rounded-full bg-[#feba35]/20 text-[#7e5700] font-bold text-[10px]">
              FLUX PUBLIC ACTIF
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#10272F] hover:bg-slate-100 text-xs font-semibold shadow-2xs border border-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#4B6168]">download</span>
              <span>Exporter CSV</span>
            </button>
            <button
              type="button"
              onClick={() => {
                appStore.markAllMessagesAsRead();
                setToastMessage('Tous les messages ont été marqués comme lus.');
                setTimeout(() => setToastMessage(null), 3000);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#10272F] hover:bg-slate-100 text-xs font-semibold shadow-2xs border border-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-[#0B6E78]">done_all</span>
              <span>Tout marquer comme lu</span>
            </button>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5ECE9] text-[#4B6168] font-mono text-[10px]">
              <span className="material-symbols-outlined text-[14px] text-[#5CC6CC]">sync</span>
              <span>MAJ AUTOMATIQUE · TEMPS RÉEL</span>
            </div>
          </div>
        </div>

        {/* Titre principal & Contexte */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl font-bold text-[#10272F] tracking-tight mb-2">
              Boîte de réception des demandes
            </h1>
            <p className="text-sm text-[#4B6168] leading-relaxed max-w-2xl">
              Gérez les sollicitations de maîtres d’ouvrage publics et privés transmises via le formulaire de contact du site vitrine d’InfraCité Ingénierie.
            </p>
          </div>

          {/* Indicateur métrique volumétrique */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-2xs border border-slate-200 self-start lg:self-auto">
            <div className="flex flex-col px-3 py-1">
              <span className="font-mono text-[10px] uppercase text-[#4B6168]">Total dossiers</span>
              <span className="font-display text-xl text-[#10272F] font-bold">{messages.length}</span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col px-3 py-1">
              <span className="font-mono text-[10px] uppercase text-[#7e5700]">À qualifier</span>
              <span className="font-display text-xl text-[#D99A0B] font-bold">
                {String(unreadCount).padStart(2, '0')}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex flex-col px-3 py-1">
              <span className="font-mono text-[10px] uppercase text-[#0B6E78]">Taux réponse</span>
              <span className="font-display text-xl text-[#0B6E78] font-bold">96%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Split-View: 5 cols / 7 cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: LISTE & FILTRAGE (5 cols) */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200 flex flex-col gap-3">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#4B6168] pointer-events-none">
                filter_list
              </span>
              <input
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#10272F] placeholder:text-[#4B6168] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#0B6E78]"
                placeholder="Filtrer par émetteur, organisme ou mot-clé..."
                type="search"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            {/* Pilules de segmentation filtrée */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                  filterTab === 'all'
                    ? 'bg-[#0B6E78] text-white'
                    : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
                }`}
              >
                Tous ({messages.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('unread')}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                  filterTab === 'unread'
                    ? 'bg-[#0B6E78] text-white'
                    : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99A0B]"></span>
                Non lus ({unreadCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('devis')}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                  filterTab === 'devis'
                    ? 'bg-[#0B6E78] text-white'
                    : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
                }`}
              >
                Études &amp; Devis
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('archived')}
                className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold ${
                  filterTab === 'archived'
                    ? 'bg-[#0B6E78] text-white'
                    : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
                }`}
              >
                Archivés
              </button>
            </div>
          </div>

          {/* Liste des éléments */}
          <div className="flex flex-col gap-3">
            {filteredMessages.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-[#4B6168]">
                Aucun message correspondant aux filtres.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = msg.id === selectedMessageId;
                return (
                  <article
                    key={msg.id}
                    onClick={() => handleSelect(msg)}
                    className={`relative p-4 rounded-2xl bg-white shadow-xs border transition-all cursor-pointer hover:border-slate-300 ${
                      isSelected
                        ? 'border-[#0B6E78] ring-2 ring-[#0B6E78]/20'
                        : 'border-slate-200'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-3 bottom-3 w-1.5 bg-[#0B6E78] rounded-r-full"></div>
                    )}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        {msg.status === 'new' && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D99A0B] animate-pulse" title="Message non lu"></span>
                        )}
                        <span className="font-semibold text-sm text-[#10272F] truncate">
                          {msg.name}
                        </span>
                        {msg.priority === 'high' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 font-mono text-xs font-bold">
                            PRIORITAIRE
                          </span>
                        )}
                      </div>
                      <span className="font-mono text-xs text-slate-500 whitespace-nowrap">
                        {msg.createdAt}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[#0B6E78] font-bold tracking-wide uppercase mb-1">
                      {msg.company}
                    </div>
                    <p className="font-semibold text-sm text-[#10272F] line-clamp-1 mb-1">
                      {msg.subject}
                    </p>
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        {msg.domains.map((dom, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-md bg-[#f1f4f4] text-[#4B6168] font-mono text-[10px]">
                            {dom}
                          </span>
                        ))}
                      </div>
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-[#0B6E78] flex items-center gap-1">
                          <span>Dossier actif</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </span>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: DÉTAIL DU MESSAGE (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          {selectedMessage ? (
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 flex flex-col gap-6">
              {/* En-tête de la demande */}
              <div className="flex flex-col gap-3 pb-6 -mx-6 -mt-6 p-6 lg:-mx-8 lg:-mt-8 lg:p-8 bg-[#f1f4f4]/60 rounded-t-3xl border-b border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedMessage.priority === 'high' && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D99A0B]/20 text-[#7e5700] font-mono text-[10px] font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#D99A0B]"></span>
                        HAUTE PRIORITÉ
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full bg-white text-[#10272F] font-mono text-[10px] font-bold border border-slate-200">
                      RÉF : {selectedMessage.ref}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#0B6E78]/10 text-[#0B6E78] font-mono text-[10px] font-bold">
                      {selectedMessage.domains.join(' · ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => appStore.archiveMessage(selectedMessage.id)}
                      className="p-2 rounded-xl text-[#4B6168] hover:text-[#10272F] hover:bg-slate-200 transition-colors"
                      title="Archiver la demande"
                    >
                      <span className="material-symbols-outlined text-[18px]">archive</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Supprimer cette demande ?")) {
                          appStore.deleteMessage(selectedMessage.id);
                        }
                      }}
                      className="p-2 rounded-xl text-[#4B6168] hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Supprimer"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-bold text-xl lg:text-2xl text-[#10272F] tracking-tight leading-snug">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 text-[#4B6168] font-mono text-[11px]">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    <span>Transmis via le formulaire Web · {selectedMessage.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Cartouche de l'interlocuteur */}
              <div className="p-5 rounded-2xl bg-[#E5ECE9]/60 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#10272F] text-[#5CC6CC] flex items-center justify-center font-display font-bold text-lg shadow-2xs">
                    {selectedMessage.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[#10272F]">{selectedMessage.name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-white font-mono text-[9px] text-[#0B6E78] font-bold border border-slate-200">
                        {selectedMessage.clientType.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#10272F] font-semibold">{selectedMessage.company}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  <a
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white hover:bg-[#0B6E78] hover:text-white text-[#10272F] transition-colors border border-slate-200 shadow-2xs"
                    href={`mailto:${selectedMessage.email}`}
                  >
                    <span className="material-symbols-outlined text-[15px] text-[#0B6E78]">mail</span>
                    <span>{selectedMessage.email}</span>
                  </a>
                  {selectedMessage.phone && (
                    <a
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white hover:bg-slate-100 text-[#10272F] transition-colors border border-slate-200 shadow-2xs"
                      href={`tel:${selectedMessage.phone}`}
                    >
                      <span className="material-symbols-outlined text-[15px] text-[#4B6168]">call</span>
                      <span>{selectedMessage.phone}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Métadonnées techniques du formulaire */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase text-[#4B6168]">Type Maîtrise d'Ouvrage</span>
                  <span className="font-semibold text-xs text-[#10272F]">
                    {selectedMessage.clientType === 'public'
                      ? 'Collectivité (Public)'
                      : selectedMessage.clientType === 'private'
                      ? 'Aménageur (Privé)'
                      : selectedMessage.clientType === 'sem'
                      ? 'SEM / SPL Mixte'
                      : 'Organisme'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase text-[#4B6168]">Horizon de rendu</span>
                  <span className="font-semibold text-xs text-[#D99A0B]">
                    {selectedMessage.deadline || 'Sous 30 jours'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase text-[#4B6168]">Estimation d'enveloppe</span>
                  <span className="font-semibold text-xs text-[#10272F]">
                    {selectedMessage.budgetEstimate || 'Consultation directe'}
                  </span>
                </div>
              </div>

              {/* Corps du message */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#4B6168] font-bold">
                  Descriptif de la mission transmis par le requérant
                </span>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Document joint si existant */}
              {selectedMessage.attachmentName && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-[#10272F]">{selectedMessage.attachmentName}</p>
                      <p className="font-mono text-[10px] text-[#4B6168]">{selectedMessage.attachmentSize} · Certifié virus-free</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Téléchargement de ${selectedMessage.attachmentName} simulé.`)}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#10272F] hover:bg-slate-100"
                  >
                    Télécharger
                  </button>
                </div>
              )}

              {/* Historique des réponses */}
              {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#0B6E78] font-bold">
                    Historique des réponses officielles transmises ({selectedMessage.replies.length})
                  </span>
                  {selectedMessage.replies.map((rep) => (
                    <div key={rep.id} className="p-4 rounded-xl bg-[#E6F3F4] border border-[#0B6E78]/30 text-xs">
                      <div className="flex items-center justify-between mb-1 font-mono text-[10px] text-[#0B6E78]">
                        <span className="font-bold">{rep.author}</span>
                        <span>{rep.sentAt}</span>
                      </div>
                      <p className="text-[#10272F] leading-relaxed whitespace-pre-wrap">{rep.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bloc d'action & Réponse intégrée */}
              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#4B6168] font-bold">
                    Rédiger une réponse officielle
                  </span>
                  <span className="font-mono text-[10px] text-[#4B6168]">
                    Destinataire : <strong className="text-[#10272F]">{selectedMessage.email}</strong>
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#10272F] focus:outline-none focus:ring-2 focus:ring-[#0B6E78]"
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[10px] text-[#4B6168]">
                    Signature : Wilfried N. (Direction des Études)
                  </span>
                  <button
                    type="button"
                    onClick={handleSendReply}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B6E78] hover:bg-[#08555D] text-white text-xs font-semibold shadow-sm transition-all"
                  >
                    <span>Envoyer la réponse officielle</span>
                    <span className="material-symbols-outlined text-[16px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs text-[#4B6168]">
              Sélectionnez une demande dans la liste pour afficher son détail.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
