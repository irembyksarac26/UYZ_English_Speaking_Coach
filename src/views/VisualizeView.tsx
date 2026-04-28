import React, { useState, useEffect } from 'react';
import { Eye, Mic, Play, Square, Timer, MapPin, Search as SearchIcon, Users, Music, Heart } from 'lucide-react';
import { Card, CardHeader, CardContent } from './components/Card';
import { Button } from './components/Button';
import { motion, AnimatePresence } from 'motion/react';

interface VisualizeViewProps {
  onTranscript: (text: string) => void;
}

export const VisualizeView: React.FC<VisualizeViewProps> = ({ onTranscript }) => {
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  const prompts = [
    { icon: MapPin, en: 'Where are you?', tr: 'Neredesin?' },
    { icon: SearchIcon, en: 'What can you see?', tr: 'Ne görüyorsun?' },
    { icon: Users, en: 'Who is with you?', tr: 'Yanında kim var?' },
    { icon: Music, en: 'What can you hear?', tr: 'Ne duyuyorsun?' },
    { icon: Heart, en: 'How do you feel?', tr: 'Nasıl hissediyorsun?' },
  ];

  useEffect(() => {
    let interval: any;
    if (step === 2 && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setStep(3);
    }
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  const startTimer = () => {
    setTimeLeft(30);
    setStep(2);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="bg-slate-900 text-white text-center py-12 px-6 overflow-visible relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="font-black text-xl">1</span>
              </div>
              <Eye className="mx-auto mb-6 text-amber-400" size={64} />
              <h2 className="text-2xl font-black mb-4 leading-tight">
                Close your eyes and picture the scene.<br />
                <span className="text-slate-400 text-lg font-medium italic">Gözünüzü kapatın ve sahneyi canlandırın.</span>
              </h2>
              <Button
                icon={Play}
                labelEn="Start 30s Timer"
                labelTr="30sn Sayacı Başlat"
                variant="secondary"
                onClick={startTimer}
                className="mt-4"
              />
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 bg-teal-900 rounded-3xl text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.1),transparent)] animate-pulse" />
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-8 border-teal-800 flex items-center justify-center mb-6 relative">
                 <svg className="absolute inset-0 -rotate-90">
                    <circle 
                      cx="96" cy="96" r="88" 
                      fill="transparent" 
                      stroke="currentColor" 
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={2 * Math.PI * 88 * (1 - timeLeft / 30)}
                      className="text-teal-400 transition-all duration-1000"
                    />
                 </svg>
                 <span className="text-6xl font-black tabular-nums">{timeLeft}</span>
              </div>
              <p className="text-center font-bold tracking-widest text-teal-300">BREATHE / NEFES AL</p>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="bg-white border-2 border-slate-100">
              <CardHeader titleEn="Describe the Scene" titleTr="Sahneyi Betimleyin" icon={<SearchIcon size={20} />} />
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-2">
                  {prompts.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-teal-200 hover:bg-teal-50 transition-colors">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-slate-400 group-hover:text-teal-600 transition-colors">
                        <p.icon size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 leading-none">{p.en}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{p.tr}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className={`p-6 rounded-3xl border-4 transition-all flex flex-col items-center justify-center gap-4 ${
                    isRecording ? 'border-red-500 bg-red-50 animate-pulse' : 'border-slate-100 bg-slate-50'
                  }`}>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl active:scale-90 transition-all ${
                        isRecording ? 'bg-red-500 text-white' : 'bg-teal-700 text-white'
                      }`}
                    >
                      {isRecording ? <Square fill="white" size={32} /> : <Mic size={32} />}
                    </button>
                    <div className="text-center">
                      <p className="font-bold text-slate-800">{isRecording ? 'Listening...' : 'Tap for Mic'}</p>
                      <p className="text-xs text-slate-500">{isRecording ? 'Daha fazla bilgi bekliyorum...' : 'Konuşmak için dokunun'}</p>
                    </div>
                  </div>
                  
                  {transcript && (
                    <div className="p-4 bg-white border border-slate-200 rounded-xl">
                      <p className="text-xs font-black text-slate-400 uppercase mb-2">Transcript / Döküm</p>
                      <p className="text-lg italic text-slate-700 leading-tight">"{transcript}"</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
