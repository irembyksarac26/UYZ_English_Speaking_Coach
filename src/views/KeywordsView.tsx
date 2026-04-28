import React, { useState } from 'react';
import { Key, Info } from 'lucide-react';
import { Keyword } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { EmptyState } from './components/EmptyState';
import { Button } from './components/Button';

interface KeywordsViewProps {
  keywords: Keyword[];
  onGenerate: () => void;
}

export const KeywordsView: React.FC<KeywordsViewProps> = ({ keywords, onGenerate }) => {
  const [selectedWord, setSelectedWord] = useState<Keyword | null>(null);

  if (keywords.length === 0) {
    return (
      <EmptyState
        icon={Key}
        titleEn="No Keywords Yet"
        titleTr="Henüz Anahtar Kelime Yok"
        descriptionEn="Generate a story first to extract meaningful keywords."
        descriptionTr="Anlamlı anahtar kelimeler çıkarmak için önce bir hikaye oluşturun."
        action={
          <Button 
            labelEn="Go to Story" 
            labelTr="Hikayeye Git" 
            variant="primary" 
            onClick={onGenerate} 
          />
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader titleEn="Key Vocabulary" titleTr="Anahtar Kelimeler" icon={<Key size={20} />} />
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {keywords.map((kw, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedWord(kw)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  selectedWord?.word === kw.word
                    ? 'bg-[#0E7490] text-white shadow-lg scale-105'
                    : 'bg-teal-50 text-[#0E7490] hover:bg-teal-100'
                }`}
              >
                {kw.word}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedWord && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 border-amber-100 bg-[#F59E0B]/5">
          <CardHeader 
            titleEn={selectedWord.word} 
            titleTr={selectedWord.turkish} 
            icon={<Info className="text-[#D97706]" size={18} />} 
          />
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-black text-[#D97706] uppercase tracking-widest">Definition / Tanım</p>
              <p className="text-xl text-[#1E293B] leading-snug font-medium">{selectedWord.definition}</p>
            </div>
            
            {selectedWord.category && (
              <div className="inline-block px-4 py-2 bg-white rounded-xl border border-amber-100 shadow-sm">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mind Map Category</p>
                <p className="text-sm font-bold text-[#0E7490]">{selectedWord.category}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
