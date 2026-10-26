import React from 'react';

interface MaintenanceNoticeProps {
  onAccessAdmin: () => void;
}

export const MaintenanceNotice: React.FC<MaintenanceNoticeProps> = ({ onAccessAdmin }) => {
  return (
    <div className="bg-[#D99A0B] text-[#10272F] px-4 py-2.5 text-xs font-mono font-medium flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[18px]">build</span>
        <span>
          <strong>MODE MAINTENANCE ACTIF :</strong> Le site est actuellement configuré en phase d'actualisation éditoriale par l'équipe technique.
        </span>
      </div>
      <button
        type="button"
        onClick={onAccessAdmin}
        className="px-3 py-1 rounded-full bg-[#10272F] text-white text-[11px] font-bold hover:bg-slate-800 transition-colors"
      >
        Gérer dans le back-office
      </button>
    </div>
  );
};
