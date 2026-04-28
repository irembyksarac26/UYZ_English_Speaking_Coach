import React, { useState } from 'react';
import { Search, Eye, EyeOff, BookOpen, User, HelpCircle, Layers } from 'lucide-react';
import { WordAnalysis } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';
import { EmptyState } from './components/EmptyState';

interface WordViewProps {
  analysis: WordAnalysis | null;
  isLoading: boolean;
  onSearch: (word: string) => void;
}

export const WordView: React.FC<WordViewProps> = ({ analysis, isLoading, onSearch }) => {
  const [showTurkish, setShowTurkish] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sections = analysis ? [
    { 
      id: 'upper', 
      icon: Layers, 
      labelEn: 'Upper Meaning', 
      labelTr: 'Üst Anlam', 
      contentEn: analysis.upperMeaning, 
      contentTr: analysis.turkishTranslations.upperMeaning 
    },
    { 
      id: 'breakdown', 
      icon: BookOpen, 
      labelEn: 'Breakdown', 
      labelTr: 'Kırılım', 
      contentEn: analysis.breakdown, 
      contentTr: analysis.turkishTranslations.breakdown 
    },
    { 
      id: 'definition', 
      icon: Search, 
      labelEn: 'Definition', 
      labelTr: 'Tanım', 
      contentEn: analysis.definition, 
      contentTr: analysis.turkishTranslations.definition 
    },
    { 
      id: 'generic', 
      icon: User, 
      labelEn: 'Generic Example', 
      labelTr: 'Genel Örnek', 
      contentEn: analysis.genericExample, 
      contentTr: analysis.turkishTranslations.genericExample 
    },
    { 
      id: 'personal', 
      icon: HelpCircle, 
      labelEn: 'Personal Prompt', 
      labelTr: 'Kişisel Örnek Sorusu', 
      contentEn: analysis.personalPrompt, 
      contentTr: analysis.turkishTranslations.personalPrompt 
    },
  ] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search a word... / Bir kelime arayın..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 outline-none transition-all font-bold"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(searchTerm)}
              />
            </div>
            <Button
              className="!flex-row !min-h-0 py-4 px-6"
              labelEn="Analyze"
              labelTr="Analiz Et"
              onClick={() => onSearch(searchTerm)}
              disabled={isLoading || !searchTerm.trim()}
            />
          </div>
        </CardContent>
      </Card>

      {isLoading && <Spinner messageEn="Analyzing word depth..." messageTr="Anlam katmanları çözülüyor..." />}

      {analysis && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center bg-teal-50 p-4 rounded-2xl border border-teal-100">
            <div>
              <h2 className="text-3xl font-black text-teal-900 tracking-tight">{analysis.word}</h2>
              <p className="text-teal-600 font-bold text-xs uppercase tracking-widest">5-Layer Analysis / 5 Katmanlı Analiz</p>
            </div>
            <button
              onClick={() => setShowTurkish(!showTurkish)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm text-teal-700 font-bold border border-teal-100 active:scale-95 transition-all"
            >
              {showTurkish ? <EyeOff size={18} /> : <Eye size={18} />}
              <span className="text-sm">{showTurkish ? 'Hide' : 'Show'} Turkish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sections.map((s) => (
              <Card key={s.id} className="relative overflow-visible">
                <div className="absolute -left-3 top-4 bg-teal-700 text-white p-2 rounded-lg shadow-lg">
                  <s.icon size={20} />
                </div>
                <CardContent className="pl-10 space-y-2">
                  <div>
                    <h4 className="font-black text-teal-900 text-xs uppercase tracking-widest">{s.labelEn}</h4>
                    <p className="text-[10px] font-bold text-slate-400">{s.labelTr}</p>
                  </div>
                  <p className="text-lg leading-snug font-medium text-slate-800">{s.contentEn}</p>
                  {showTurkish && (
                    <p className="text-sm font-medium text-slate-500 italic border-t border-slate-50 pt-2 mt-2">
                      {s.contentTr}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!analysis && !isLoading && (
        <EmptyState
          icon={BookOpen}
          titleEn="Explore a Word"
          titleTr="Kelimeleri Keşfedin"
          descriptionEn="Type any word above to see its detailed 5-layer analysis."
          descriptionTr="Detaylı 5 katmanlı analizini görmek için yukarıya bir kelime yazın."
        />
      )}
    </div>
  );
};
