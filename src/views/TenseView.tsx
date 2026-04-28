import React from 'react';
import { Clock, Copy } from 'lucide-react';
import { TenseVariant } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { EmptyState } from './components/EmptyState';
import { Button } from './components/Button';

interface TenseViewProps {
  tenses: TenseVariant | null;
  onGenerate: () => void;
  onCopy: (text: string) => void;
}

export const TenseView: React.FC<TenseViewProps> = ({ tenses, onGenerate, onCopy }) => {
  if (!tenses) {
    return (
      <EmptyState
        icon={Clock}
        titleEn="Time Travel Pending"
        titleTr="Zaman Yolculuğu Bekleniyor"
        descriptionEn="Let's rewrite your story in different tenses to practice temporal awareness."
        descriptionTr="Zaman farkındalığı pratiği yapmak için hikayenizi farklı zamanlarda yeniden yazalım."
        action={<Button labelEn="Go to Story" labelTr="Hikayeye Git" variant="primary" onClick={onGenerate} />}
      />
    );
  }

  const sections = [
    { key: 'now', titleEn: 'NOW (Present)', titleTr: 'ŞİMDİ', theme: 'teal', data: tenses.now },
    { key: 'past', titleEn: 'PAST (Retrospective)', titleTr: 'GEÇMİŞ', theme: 'amber', data: tenses.past },
    { key: 'future', titleEn: 'FUTURE (Prediction)', titleTr: 'GELECEK', theme: 'slate', data: tenses.future },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {sections.map((s) => (
        <Card key={s.key} className={`border-${s.theme}-100 flex flex-col h-full`}>
          <CardHeader 
            titleEn={s.titleEn} 
            titleTr={s.titleTr} 
            icon={<Clock className={`text-${s.theme}-700`} size={20} />} 
          />
          <CardContent className="flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-lg font-medium text-slate-800 leading-relaxed">{s.data.english}</p>
              <p className="text-sm italic text-slate-500 border-l-2 border-slate-200 pl-3">{s.data.turkish}</p>
            </div>
            <Button
              icon={Copy}
              labelEn="Copy Text"
              labelTr="Metni Kopyala"
              variant="outline"
              fullWidth
              onClick={() => onCopy(s.data.english)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
