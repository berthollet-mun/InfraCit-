import React, { useState } from 'react';
import { AuditLog } from '../../types';

interface AdminAuditProps {
  logs: AuditLog[];
}

export const AdminAudit: React.FC<AdminAuditProps> = ({ logs }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = logs.filter((log) => {
    if (filterCategory !== 'all' && log.category !== filterCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.author.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const categories = Array.from(new Set(logs.map((l) => l.category)));

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 space-y-6">
      <header className="pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="marker-triangle"></span>
          <span className="font-mono text-xs uppercase text-[#0B6E78] tracking-widest font-semibold">
            SYSTÈME · AUDIT TRAIL &amp; TRAÇABILITÉ
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-[#10272F]">
          Journal d'audit des modifications
        </h1>
        <p className="text-sm text-[#4B6168] mt-2">
          Historique exhaustif de toutes les actions d'édition, de publication, de réponse aux messages et de modifications des bannières effectuées sur le back-office.
        </p>
      </header>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#4B6168]">
            search
          </span>
          <input
            type="search"
            placeholder="Rechercher dans le journal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#10272F] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold shrink-0 ${
              filterCategory === 'all'
                ? 'bg-[#0B6E78] text-white'
                : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
            }`}
          >
            Toutes ({logs.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold shrink-0 ${
                filterCategory === cat
                  ? 'bg-[#0B6E78] text-white'
                  : 'bg-slate-100 text-[#4B6168] hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Log list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-[#f1f4f4] text-[#4B6168] font-mono text-[10px] uppercase">
              <th className="py-3 px-4">Horodatage</th>
              <th className="py-3 px-4">Action effectuée</th>
              <th className="py-3 px-4">Détails techniques</th>
              <th className="py-3 px-4">Auteur</th>
              <th className="py-3 px-4 text-right">Catégorie</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[#10272F]">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 font-mono text-[11px] text-[#4B6168] whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3 px-4 font-semibold text-[#10272F]">{log.action}</td>
                <td className="py-3 px-4 text-[#4B6168]">{log.details}</td>
                <td className="py-3 px-4 font-mono text-[11px] text-[#10272F]">{log.author}</td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-full bg-[#E5ECE9] font-mono text-[10px] text-[#0B6E78] font-bold">
                    {log.category}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
