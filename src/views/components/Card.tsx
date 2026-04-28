import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ titleEn: string; titleTr: string; icon?: React.ReactNode }> = ({ titleEn, titleTr, icon }) => (
  <div className="p-5 border-b border-slate-50 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {icon && <div className="text-[#0E7490]">{icon}</div>}
      <div>
        <h3 className="font-bold text-[#1E293B] leading-tight uppercase tracking-tight">{titleEn}</h3>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{titleTr}</p>
      </div>
    </div>
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
