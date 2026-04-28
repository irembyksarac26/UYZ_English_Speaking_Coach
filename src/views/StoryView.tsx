import React from 'react';
import { BookOpen, Sparkles, Languages, Copy, Wand2, Info } from 'lucide-react';
import { EnglishLevel, StoryCategory, StoryLength, AppState } from '../types';
import { Button } from './components/Button';
import { Card, CardHeader, CardContent } from './components/Card';
import { Spinner } from './components/Spinner';

interface StoryViewProps {
  state: AppState;
  onUpdateState: (updates: Partial<AppState>) => void;
  onGenerate: () => void;
  onAnalyze: () => void;
  onCopy: (text: string, type: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  state,
  onUpdateState,
  onGenerate,
  onAnalyze,
  onCopy
}) => {
  const levels = [
    { value: EnglishLevel.A1_A2, en: 'A1-A2', tr: 'Temel' },
    { value: EnglishLevel.B1_B2, en: 'B1-B2', tr: 'Orta' },
    { value: EnglishLevel.C1, en: 'C1', tr: 'İleri' },
  ];

  const lengths = [
    { value: StoryLength.SHORT, en: 'Short', tr: 'Kısa' },
    { value: StoryLength.MEDIUM, en: 'Medium', tr: 'Orta' },
    { value: StoryLength.LONG, en: 'Long', tr: 'Uzun' },
  ];

  const categories = [
    { value: StoryCategory.DAILY_LIFE, icon: '🗣️', en: 'Daily Life', tr: 'Günlük Hayat' },
    { value: StoryCategory.TRAVEL, icon: '✈️', en: 'Travel', tr: 'Seyahat' },
    { value: StoryCategory.NEWS, icon: '📰', en: 'News', tr: 'Haberler' },
    { value: StoryCategory.BOOK, icon: '📖', en: 'Book', tr: 'Kitap' },
    { value: StoryCategory.BUSINESS, icon: '💼', en: 'Business', tr: 'İş' },
    { value: StoryCategory.ACADEMIC, icon: '🎓', en: 'Academic', tr: 'Akademik' },
    { value: StoryCategory.MOVIE_SERIES, icon: '🎬', en: 'Movie/Series', tr: 'Film/Dizi' },
    { value: StoryCategory.PODCAST, icon: '🎧', en: 'Podcast', tr: 'Podcast' },
    { value: StoryCategory.CUSTOM, icon: '➕', en: 'Custom', tr: 'Özel' },
  ];

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <Card>
        <CardHeader 
          titleEn="Practice Setup" 
          titleTr="Pratik Ayarları" 
          icon={<Sparkles size={20} />} 
        />
        <CardContent className="space-y-6">
          {/* Level Selector */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex flex-col">
              <span>English Level / İngilizce Seviyesi</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {levels.map((l) => (
                <button
                  key={l.value}
                  onClick={() => onUpdateState({ level: l.value })}
                  className={`p-3 rounded-2xl border-2 transition-all shadow-sm ${
                    state.level === l.value
                      ? 'border-[#0E7490] bg-[#0E7490]/5 text-[#0E7490] scale-[1.02]'
                      : 'border-slate-50 bg-white text-slate-400 hover:border-slate-100'
                  }`}
                >
                  <span className="block font-black text-sm">{l.en}</span>
                  <span className="block text-[10px] opacity-70 uppercase tracking-widest">{l.tr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Length Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Length / Uzunluk</label>
            <div className="grid grid-cols-3 gap-2">
              {lengths.map((l) => (
                <button
                  key={l.value}
                  onClick={() => onUpdateState({ length: l.value })}
                  className={`p-3 rounded-2xl border-2 transition-all shadow-sm ${
                    state.length === l.value
                      ? 'border-[#D97706] bg-[#F59E0B]/5 text-[#D97706] scale-[1.02]'
                      : 'border-slate-50 bg-white text-slate-400 hover:border-slate-100'
                  }`}
                >
                  <span className="block font-black text-sm">{l.en}</span>
                  <span className="block text-[10px] opacity-70 uppercase tracking-widest">{l.tr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category / Kategori</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onUpdateState({ category: c.value })}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl border-2 transition-all shadow-sm group ${
                    state.category === c.value
                      ? 'border-[#0E7490] bg-[#0E7490]/5 text-[#0E7490] scale-105 z-10'
                      : 'border-slate-50 bg-white text-slate-400 hover:border-slate-100'
                  }`}
                >
                  <span className="text-xl mb-1 group-hover:scale-110 transition-transform">{c.icon}</span>
                  <span className="text-[9px] font-black text-center leading-tight uppercase tracking-tighter">{c.en.split('/')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Topic Input */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex flex-col">
              <span>Describe your own topic / Kendi konunu betimle (optional)</span>
            </label>
            <textarea
              value={state.customTopic}
              onChange={(e) => onUpdateState({ customTopic: e.target.value })}
              placeholder="Example: A grandmother teaching her grandchild to bake bread... / Örnek: Torununa ekmek yapmayı öğreten bir büyükanne..."
              className="w-full h-32 p-4 rounded-3xl border-2 border-slate-50 focus:border-[#0E7490] outline-none transition-all text-sm resize-none bg-slate-50/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              icon={BookOpen}
              labelEn="Generate Story"
              labelTr="Hikaye Oluştur"
              onClick={onGenerate}
              disabled={state.isLoading}
              variant="primary"
              fullWidth
            />
            <Button
              icon={Wand2}
              labelEn="Analyze My Text"
              labelTr="Metnimi Analiz Et"
              onClick={onAnalyze}
              disabled={state.isLoading}
              variant="secondary"
              fullWidth
            />
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {state.isLoading && <Spinner messageEn="Generating your journey..." messageTr="Yolculuğunuz hazırlanıyor..." />}

      {/* Error State */}
      {state.error && (
        <Card className="border-red-100 bg-red-50/50">
          <CardContent className="text-red-700 text-center py-10 px-6">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-6 h-6" />
            </div>
            <p className="font-bold text-lg mb-2">{state.error}</p>
            <p className="text-sm opacity-70">If this persists, check your Gemini API key configuration. / Eğer sorun devam ederse API anahtarı ayarlarını kontrol edin.</p>
            <Button 
              labelEn="Try Again" 
              labelTr="Tekrar Dene" 
              variant="outline" 
              className="mt-6 border-red-200 text-red-700 hover:bg-red-50"
              onClick={onGenerate}
            />
          </CardContent>
        </Card>
      )}

      {/* Story Output */}
      {state.story && !state.isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-baseline gap-2 mb-2">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold text-[#1E293B]">{state.story.title.english}</h2>
              <span className="text-lg text-slate-400 font-medium">/ {state.story.title.turkish}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* English Column */}
            <Card className="border-teal-100 flex flex-col h-full">
              <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-white">
                <span className="text-[10px] font-bold text-[#0E7490] tracking-widest uppercase">ENGLISH STORY</span>
                <span className="px-2 py-0.5 bg-[#FEFCE8] text-[#D97706] text-[10px] font-bold rounded">{state.category}</span>
              </div>
              <CardContent className="p-6 flex-1">
                <div className="space-y-4 text-lg leading-relaxed text-[#1E293B]">
                  {state.story.content.map((s, idx) => (
                    <p key={idx} className="selection:bg-teal-100">{s.english}</p>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-slate-50">
                  <Button 
                    icon={Copy} 
                    labelEn="Copy English" 
                    labelTr="İngilizce'yi Kopyala" 
                    variant="outline" 
                    fullWidth 
                    onClick={() => onCopy(state.story!.content.map(s => s.english).join(' '), 'English')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Turkish Column */}
            <Card className="border-slate-100 bg-white/60 flex flex-col h-full">
              <div className="px-6 py-4 border-b border-slate-50 bg-white/40">
                <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">TÜRKÇE ÇEVİRİ</span>
              </div>
              <CardContent className="p-6 flex-1">
                <div className="space-y-4 text-lg leading-relaxed text-slate-500 italic">
                  {state.story.content.map((s, idx) => (
                    <p key={idx}>{s.turkish}</p>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-slate-50">
                  <Button 
                    icon={Copy} 
                    labelEn="Copy Turkish" 
                    labelTr="Türkçe'yi Kopyala" 
                    variant="outline" 
                    fullWidth 
                    onClick={() => onCopy(state.story!.content.map(s => s.turkish).join(' '), 'Turkish')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Footer */}
          <div className="p-4 bg-[#0E7490]/5 rounded-2xl flex items-start gap-4 border border-[#0E7490]/10">
            <div className="p-2 bg-[#0E7490] rounded-lg text-white shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0E7490] uppercase tracking-wider">Learning Tip / Öğrenme İpucu:</p>
              <p className="text-sm text-slate-600 italic mt-1 leading-relaxed">
                "Open <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#0E7490]">gemini.google.com/app</a>, paste the story and tap the speaker icon to hear the rhythm."
                <span className="block text-xs mt-1 text-slate-400">gemini.google.com/app adresine gidin, hikayeyi yapıştırın ve ritmi duymak için hoparlör simgesine dokunun.</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
