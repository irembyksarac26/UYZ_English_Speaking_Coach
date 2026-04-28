import React from 'react';
import { BookOpen, Key, Brain, Clock, Repeat, Shuffle, Search, Eye, Ghost, Sparkles } from 'lucide-react';
import { Tab } from './components/Tab';
import { GeminiClient } from '../models/GeminiClient';

interface LayoutViewProps {
  children: React.ReactNode;
  activeTab: number;
  onTabChange: (id: number) => void;
}

export const LayoutView: React.FC<LayoutViewProps> = ({ children, activeTab, onTabChange }) => {
  const isDemo = !GeminiClient.hasApiKey();
  const tabs = [
    { id: 1, icon: BookOpen, en: 'Story', tr: 'Hikaye', emoji: '📖' },
    { id: 2, icon: Key, en: 'Keywords', tr: 'Anahtar Kelimeler', emoji: '🔑' },
    { id: 3, icon: Brain, en: 'Mind Map', tr: 'Zihin Haritası', emoji: '🧠' },
    { id: 4, icon: Clock, en: '3 Tenses', tr: '3 Zaman', emoji: '⏰' },
    { id: 5, icon: Repeat, en: 'Paraphrase', tr: 'Yeniden İfade', emoji: '🔄' },
    { id: 6, icon: Shuffle, en: 'Order Change', tr: 'Sıra Değişimi', emoji: '🔀' },
    { id: 7, icon: Search, en: 'Word Analysis', tr: 'Kelime Analizi', emoji: '🔍' },
    { id: 8, icon: Eye, en: 'Visualize', tr: 'Hayal Et', emoji: '👁️' },
    { id: 9, icon: Ghost, en: 'Coach', tr: 'Koç', emoji: '🧪' },
  ];

  return (
    <div className="flex flex-col h-screen w-full font-sans bg-[#FEFCE8] text-[#1E293B] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#0E7490] text-white shadow-md z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <BookOpen className="w-6 h-6 text-[#0E7490]" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight uppercase tracking-tight hidden sm:block">Üyz English Speaking Coach</h1>
            <h1 className="text-lg font-bold leading-tight sm:hidden">Üyz Coach</h1>
            <p className="text-[10px] opacity-80 uppercase tracking-widest font-semibold">Senior Learner Program / Kıdemli Öğrenci Programı</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isDemo && (
            <div className="hidden sm:flex items-center gap-2 bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-black uppercase tracking-widest">Demo Mode</span>
            </div>
          )}
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold uppercase opacity-70 tracking-wider">Methodology / Metodoloji</span>
            <span className="text-sm font-bold text-amber-400">Rüstem Temriyev Hocam</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden lg:flex w-64 bg-[#0E7490] border-t border-white/10 flex-col shrink-0">
          <div className="flex-1 py-2 overflow-y-auto space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-3 transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 border-r-4 border-[#F59E0B] text-white'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{tab.emoji}</span>
                <div className="text-left leading-tight">
                  <div className="font-bold text-sm">{tab.en}</div>
                  <div className="text-[10px] opacity-70">{tab.tr}</div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Sidebar Footer Profile */}
          <div className="p-4 bg-black/10 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-xs text-slate-800">ÜYZ</div>
              <div className="text-xs text-white">
                <div className="font-bold">Third Age Learner</div>
                <div className="opacity-60 italic">Thinking in English</div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide pb-32 lg:pb-8">
            <div className="max-w-5xl mx-auto w-full">
              {children}
            </div>
          </main>

          {/* Sticky Mobile/Tablet Bottom Navigation */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-t border-slate-100 z-50">
            <div className="flex items-center justify-around overflow-x-auto p-2 scrollbar-hide">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => onTabChange(tab.id)}
                  icon={tab.icon}
                  labelEn={tab.en.split(' ')[0]}
                  labelTr={tab.tr.split(' ')[0]}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
