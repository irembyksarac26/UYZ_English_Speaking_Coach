import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  titleEn: string;
  titleTr: string;
  descriptionEn: string;
  descriptionTr: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  titleEn,
  titleTr,
  descriptionEn,
  descriptionTr,
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-[32px] border border-slate-100 shadow-sm">
      <div className="bg-[#FEFCE8] p-6 rounded-full mb-6">
        <Icon className="w-12 h-12 text-[#F59E0B]" />
      </div>
      <h3 className="text-2xl font-black text-[#1E293B] mb-1 tracking-tight">{titleEn}</h3>
      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">{titleTr}</p>
      <p className="text-[#1E293B]/70 max-w-xs mx-auto mb-2 text-base leading-relaxed">{descriptionEn}</p>
      <p className="text-slate-400 max-w-xs mx-auto mb-8 text-xs italic">{descriptionTr}</p>
      {action}
    </div>
  );
};
