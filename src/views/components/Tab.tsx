import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TabProps {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  labelEn: string;
  labelTr: string;
}

export const Tab: React.FC<TabProps> = ({ active, onClick, icon: Icon, labelEn, labelTr }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 min-w-[70px] transition-colors rounded-xl ${
        active ? 'text-[#0E7490] bg-teal-50' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-bold mt-1 line-clamp-1 uppercase tracking-tighter">{labelEn}</span>
      <span className="text-[8px] opacity-70 line-clamp-1 uppercase">{labelTr}</span>
    </button>
  );
};
