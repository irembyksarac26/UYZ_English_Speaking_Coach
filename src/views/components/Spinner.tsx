import React from 'react';
import { Loader2 } from 'lucide-react';

export const Spinner: React.FC<{ messageEn?: string; messageTr?: string }> = ({ 
  messageEn = 'Generating...', 
  messageTr = 'Üretiliyor...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <Loader2 className="w-10 h-10 text-teal-700 animate-spin" />
      <div className="text-center">
        <p className="font-semibold text-slate-700">{messageEn}</p>
        <p className="text-sm text-slate-500">{messageTr}</p>
      </div>
    </div>
  );
};
