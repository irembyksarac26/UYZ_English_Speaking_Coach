import React, { useState, useEffect } from 'react';
import { AppState, EnglishLevel, StoryCategory, StoryLength } from '../types';
import { PreferencesModel } from '../models/PreferencesModel';
import { StoryModel } from '../models/StoryModel';
import { WordModel } from '../models/WordModel';
import { CoachModel } from '../models/CoachModel';
import { GeminiClient } from '../models/GeminiClient';
import { copyToClipboard } from '../utils/copyToClipboard';
import { LayoutView } from '../views/LayoutView';
import { StoryView } from '../views/StoryView';
import { KeywordsView } from '../views/KeywordsView';
import { MindMapView } from '../views/MindMapView';
import { TenseView } from '../views/TenseView';
import { ParaphraseView } from '../views/ParaphraseView';
import { OrderView } from '../views/OrderView';
import { WordView } from '../views/WordView';
import { VisualizeView } from '../views/VisualizeView';
import { CoachView } from '../views/CoachView';
import { FooterView } from '../views/FooterView';
import { BookOpen } from 'lucide-react';

export const AppController: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [state, setState] = useState<AppState>({
    level: PreferencesModel.getLevel(),
    length: PreferencesModel.getLength(),
    category: PreferencesModel.getCategory(),
    customTopic: '',
    story: null,
    analysis: null,
    isLoading: false,
    error: null,
  });

  const [wordAnalysis, setWordAnalysis] = useState<any>(null);
  const [wordLoading, setWordLoading] = useState(false);
  const [coachInput, setCoachInput] = useState('');
  const [coachFeedback, setCoachFeedback] = useState<any>(null);
  const [coachLoading, setCoachLoading] = useState(false);

  // Persistence
  useEffect(() => {
    PreferencesModel.saveLevel(state.level);
    PreferencesModel.saveCategory(state.category);
    PreferencesModel.saveLength(state.length);
  }, [state.level, state.category, state.length]);

  // Auto-generation for Demo Mode
  useEffect(() => {
    if (!GeminiClient.hasApiKey() && !state.story && !state.isLoading) {
      handleGenerateStory();
    }
  }, []);

  const handleUpdateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerateStory = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const story = await StoryModel.getStory(state.level, state.length, state.category, state.customTopic);
      setState((prev) => ({ ...prev, story, isLoading: false }));
      
      // Pre-analyze story (wrapped in try-catch to not block story display)
      try {
        const analysis = await StoryModel.analyzeStory(story.content.map((s: any) => s.english).join(' '));
        setState((prev) => ({ ...prev, analysis }));
      } catch (analysisError) {
        console.warn('Analysis failed, but story is loaded:', analysisError);
      }
    } catch (e: any) {
      console.error('Generation Error:', e);
      let errorMsg = 'Something went wrong. / Bir şeyler yanlış gitti.';
      if (e.message === 'API_KEY_MISSING') {
        errorMsg = 'API Key not configured. Please add your Gemini API Key in settings. / API Anahtarı ayarlanmamış.';
      } else if (e.message === 'FAILED_TO_GENERATE') {
        errorMsg = 'Failed to generate content. Please try again. / İçerik üretilemedi. Lütfen tekrar deneyin.';
      }
      setState((prev) => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMsg
      }));
    }
  };

  const handleAnalyzeText = async () => {
    if (!state.customTopic) return;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const analysis = await StoryModel.analyzeStory(state.customTopic);
      setState((prev) => ({ 
        ...prev, 
        analysis, 
        isLoading: false,
        story: {
          title: { english: 'Analyzed Text', turkish: 'Analiz Edilen Metin' },
          content: [{ english: state.customTopic, turkish: 'Translation available in artifacts' }],
          highFrequencyWords: [],
          patterns: [],
          keySentences: []
        }
      }));
    } catch (e) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Analysis failed.' }));
    }
  };

  const handleCopy = async (text: string, type?: string) => {
    const success = await copyToClipboard(text);
    if (success && type) {
      console.log(`${type} copied to clipboard!`);
    }
  };

  const handleWordSearch = async (word: string) => {
    setWordLoading(true);
    try {
      const result = await WordModel.getWordDescription(word);
      setWordAnalysis(result);
    } catch (e) {
      console.error(e);
    } finally {
      setWordLoading(false);
    }
  };

  const handleGetFeedback = async () => {
    setCoachLoading(true);
    try {
      const feedback = await CoachModel.getFeedback(coachInput, state.level);
      setCoachFeedback(feedback);
    } catch (e) {
      console.error(e);
    } finally {
      setCoachLoading(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 1: return <StoryView state={state} onUpdateState={handleUpdateState} onGenerate={handleGenerateStory} onAnalyze={handleAnalyzeText} onCopy={handleCopy} />;
      case 2: return <KeywordsView keywords={state.analysis?.keywords || []} onGenerate={() => setActiveTab(1)} />;
      case 3: return <MindMapView categories={state.analysis?.mindMap || []} onGenerate={() => setActiveTab(1)} />;
      case 4: return <TenseView tenses={state.analysis?.tenses || null} onGenerate={() => setActiveTab(1)} onCopy={handleCopy} />;
      case 5: return <ParaphraseView paraphrases={state.analysis?.paraphrases || []} onGenerate={() => setActiveTab(1)} />;
      case 6: return <OrderView orders={state.analysis?.orderChanges || []} onGenerate={() => setActiveTab(1)} />;
      case 7: return <WordView analysis={wordAnalysis} isLoading={wordLoading} onSearch={handleWordSearch} />;
      case 8: return <VisualizeView onTranscript={(text) => setCoachInput(prev => prev + ' ' + text)} />;
      case 9: return <CoachView input={coachInput} feedback={coachFeedback} isLoading={coachLoading} level={state.level} onInputChange={setCoachInput} onGetFeedback={handleGetFeedback} />;
      default: return null;
    }
  };

  return (
    <LayoutView activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full">
        {renderActiveTab()}
      </div>
      <FooterView />
    </LayoutView>
  );
};
