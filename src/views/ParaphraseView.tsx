import React from 'react';
import { Repeat, Shuffle } from 'lucide-react';
import { ParaphraseGroup } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { EmptyState } from './components/EmptyState';
import { Button } from './components/Button';

interface ParaphraseViewProps {
  paraphrases: ParaphraseGroup[];
  onGenerate: () => void;
}

export const ParaphraseView: React.FC<ParaphraseViewProps> = ({ paraphrases, onGenerate }) => {
  if (paraphrases.length === 0) {
    return (
      <EmptyState
        icon={Repeat}
        titleEn="No Variants Available"
        titleTr="Varyasyon Yok"
        descriptionEn="Generate a story to see alternative ways to express the same ideas."
        descriptionTr="Aynı fikirleri ifade etmenin alternatif yollarını görmek için bir hikaye oluşturun."
        action={<Button labelEn="Go to Story" labelTr="Hikayeye Git" variant="primary" onClick={onGenerate} />}
      />
    );
  }

  const highlightText = (text: string, highlights: string[]) => {
    let parts = text.split(new RegExp(`(${highlights.join('|')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          highlights.some(h => h.toLowerCase() === part.toLowerCase()) 
            ? <span key={i} className="bg-amber-100 text-amber-900 px-1 rounded font-bold underline decoration-amber-300">{part}</span> 
            : <span key={i}>{part}</span>
        )}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {paraphrases.map((group, idx) => (
        <Card key={idx} className="border-slate-100">
          <CardHeader titleEn={`Sentence ${idx + 1}`} titleTr="Orijinal ve Alternatif İfadeler" icon={<Shuffle size={18} />} />
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-[10px] uppercase font-black text-slate-400 mb-1">ORIGINAL / ORİJİNAL</p>
              <p className="text-lg text-slate-800 leading-tight font-medium">{group.original}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {group.variants.map((variant, vIdx) => (
                <div key={vIdx} className="p-4 bg-teal-50 border border-teal-100 rounded-xl">
                  <p className="text-[10px] uppercase font-black text-teal-600 mb-2">VARIANT {vIdx + 1} / SEÇENEK {vIdx + 1}</p>
                  <p className="text-base text-teal-900 leading-tight">
                    {highlightText(variant, group.highlights)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
