import React, { useState } from 'react';
import { Brain, Shuffle, List } from 'lucide-react';
import { MindMapCategory } from '../types';
import { Card, CardHeader, CardContent } from './components/Card';
import { EmptyState } from './components/EmptyState';
import { Button } from './components/Button';

interface MindMapViewProps {
  categories: MindMapCategory[];
  onGenerate: () => void;
}

export const MindMapView: React.FC<MindMapViewProps> = ({ categories, onGenerate }) => {
  const [isSimpleView, setIsSimpleView] = useState(false);
  const [shuffledCategories, setShuffledCategories] = useState(categories);

  const handleReshuffle = () => {
    setShuffledCategories([...shuffledCategories].sort(() => Math.random() - 0.5));
  };

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={Brain}
        titleEn="Empty Mind Map"
        titleTr="Zihin Haritası Boş"
        descriptionEn="We need a story to map out the concepts visually."
        descriptionTr="Kavramları görselleştirmek için bir hikayeye ihtiyacımız var."
        action={<Button labelEn="Go to Story" labelTr="Hikayeye Git" variant="primary" onClick={onGenerate} />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Button
          icon={Shuffle}
          labelEn="Reshuffle Order"
          labelTr="Sırayı Karıştır"
          variant="outline"
          fullWidth
          onClick={handleReshuffle}
          disabled={isSimpleView}
        />
        <Button
          icon={List}
          labelEn={isSimpleView ? "Visual View" : "Simple View"}
          labelTr={isSimpleView ? "Görsel Görünüm" : "Basit Görünüm"}
          variant="outline"
          fullWidth
          onClick={() => setIsSimpleView(!isSimpleView)}
        />
      </div>

      {isSimpleView ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shuffledCategories.map((cat, idx) => (
            <Card key={idx} className="bg-white">
              <CardHeader titleEn={cat.title} titleTr="" />
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cat.keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                      {kw}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="relative min-h-[500px] bg-white rounded-3xl p-8 overflow-hidden border border-slate-100 flex items-center justify-center">
          {/* Radial Layout Visualization */}
          <div className="relative w-full h-full max-w-lg aspect-square">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold text-center z-10 shadow-xl border-4 border-white">
              STORY
            </div>
            
            {shuffledCategories.map((cat, idx) => {
              const angle = (idx * (360 / shuffledCategories.length)) * (Math.PI / 180);
              const radius = 140; // distance from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div 
                  key={idx} 
                  className="absolute animate-in zoom-in duration-500"
                  style={{ 
                    left: `calc(50% + ${x}px)`, 
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="bg-amber-100 border-2 border-amber-200 p-4 rounded-2xl shadow-sm min-w-[120px] text-center">
                    <h4 className="font-black text-amber-900 text-sm mb-2">{cat.title}</h4>
                    <div className="space-y-1">
                      {cat.keywords.map((kw, i) => (
                        <p key={i} className="text-[11px] font-bold text-slate-700">{kw}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
