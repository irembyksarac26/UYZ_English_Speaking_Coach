import React from 'react';
import { Ghost, Wand2, ShieldCheck, AlertCircle, TrendingUp, Info } from 'lucide-react';
import { CoachFeedback, EnglishLevel } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { Button } from './components/Button';
import { Spinner } from './components/Spinner';

interface CoachViewProps {
  input: string;
  feedback: CoachFeedback | null;
  isLoading: boolean;
  level: EnglishLevel;
  onInputChange: (val: string) => void;
  onGetFeedback: () => void;
}

export const CoachView: React.FC<CoachViewProps> = ({
  input,
  feedback,
  isLoading,
  level,
  onInputChange,
  onGetFeedback
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader titleEn="Speaking Lab" titleTr="Konuşma Laboratuvarı" icon={<Ghost size={20} />} />
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Paste or Speak your English / İngilizce metninizi girin</label>
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Start describing your thoughts here... / Düşüncelerinizi buraya dökmeye başlayın..."
              className="w-full h-48 p-4 rounded-3xl border-2 border-slate-100 focus:border-[#0E7490] outline-none transition-all text-lg resize-none"
            />
          </div>
          <Button
            icon={Wand2}
            labelEn="Get Coaching Feedback"
            labelTr="Koçluk Geri Bildirimi Al"
            variant="primary"
            fullWidth
            onClick={onGetFeedback}
            disabled={isLoading || !input.trim()}
          />
        </CardContent>
      </Card>

      {isLoading && <Spinner messageEn="Analyzing your English flow..." messageTr="Hoca analizi yapıyor..." />}

      {feedback && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12">
          {/* Strengths */}
          <Card className="border-teal-100 bg-[#0E7490]/5">
            <CardHeader titleEn="Strengths" titleTr="Güçlü Yanlar" icon={<TrendingUp className="text-[#0E7490]" size={18} />} />
            <CardContent>
              <p className="text-[#1E293B] leading-relaxed font-medium">{feedback.strengths}</p>
            </CardContent>
          </Card>

          {/* Areas to Improve */}
          <Card className="border-amber-100 bg-[#F59E0B]/5">
            <CardHeader titleEn="Areas to Improve" titleTr="Geliştirilebilecek Alanlar" icon={<Info className="text-[#D97706]" size={18} />} />
            <CardContent>
              <p className="text-[#1E293B] leading-relaxed font-medium">{feedback.areasToImprove}</p>
            </CardContent>
          </Card>

          {/* Errors & Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="border-red-100">
                <CardHeader titleEn="Error List" titleTr="Hatalar" icon={<AlertCircle className="text-red-600" size={18} />} />
                <CardContent className="space-y-4">
                  {feedback.errors.length > 0 ? (
                    feedback.errors.map((err, i) => (
                      <div key={i} className="p-3 bg-red-50 rounded-xl">
                        <p className="font-bold text-red-900 text-sm mb-1">{err.rule}</p>
                        <p className="text-xs text-red-700 italic border-l-2 border-red-200 pl-2">Example: {err.example}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 italic">No systematic errors found! İyi gidiyorsun.</p>
                  )}
                </CardContent>
             </Card>

             <Card className="border-slate-100">
                <CardHeader titleEn="Mistake Notes" titleTr="Dikkatsizlikler" icon={<ShieldCheck className="text-slate-500" size={18} />} />
                <CardContent>
                  <ul className="list-disc list-inside space-y-1">
                    {feedback.mistakes.map((m, i) => (
                      <li key={i} className="text-sm text-slate-600">{m}</li>
                    ))}
                    {feedback.mistakes.length === 0 && <span className="text-sm text-slate-400 italic">No slips detected.</span>}
                  </ul>
                </CardContent>
             </Card>
          </div>

          {/* Next Step */}
          <Card className="bg-[#0E7490] text-white border-none shadow-xl">
            <CardHeader titleEn="Next Step" titleTr="Sonraki Adım" icon={<TrendingUp className="text-[#F59E0B]" size={18} />} />
            <div className="p-8 text-center space-y-6">
              <p className="text-2xl font-black tracking-tight">{feedback.nextStep}</p>
              <div className="pt-6 border-t border-white/10 mt-6 max-w-lg mx-auto">
                <p className="text-xs text-white/60 leading-relaxed italic">
                  "The goal is not perfect grammar. The goal is to let your thoughts flow in English. Language carries thought; grammar is a tool."
                  <br />
                  <span className="text-white/40">Hedef mükemmel gramer değil. Hedef, düşüncenin İngilizce akıtılmasıdır. Dil düşüncenin taşıyıcısıdır; gramer sadece bir araçtır.</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
