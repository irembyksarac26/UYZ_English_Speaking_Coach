import React from 'react';
import { Instagram } from 'lucide-react';

export const FooterView: React.FC = () => {
  return (
    <footer className="px-6 py-4 bg-white border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
      <div className="flex gap-4 items-center">
        <span>Üyz English Speaking Coach v1.2</span>
        <span className="text-slate-200">|</span>
        <span>Created by: Cemil Aksel</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="italic normal-case font-medium text-slate-500">Methodology: Rüstem Temriyev Hocam</span>
        <a 
          href="https://www.instagram.com/rustemtemriyev.yeni/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 text-[#E1306C] hover:opacity-80 transition-opacity"
        >
          <Instagram size={12} strokeWidth={3} />
          <span>@rustemtemriyev.yeni</span>
        </a>
      </div>
    </footer>
  );
};
