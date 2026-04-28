import React from 'react';
import { Shuffle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from './components/Card';
import { EmptyState } from './components/EmptyState';
import { Button } from './components/Button';

interface OrderViewProps {
  orders: string[][];
  onGenerate: () => void;
}

export const OrderView: React.FC<OrderViewProps> = ({ orders, onGenerate }) => {
  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Shuffle}
        titleEn="No Orders Generated"
        titleTr="Sıralama Yok"
        descriptionEn="Need artifacts from the story to suggest different speaking flows."
        descriptionTr="Farklı konuşma akışları önermek için hikaye materyaline ihtiyaç var."
        action={<Button labelEn="Go to Story" labelTr="Hikayeye Git" variant="primary" onClick={onGenerate} />}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 mb-8">
        <h3 className="text-xl font-black text-amber-900 mb-2">Practice Flexible Flow / Esnek Akış Pratiği</h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          Try to talk about your story by following these alternative category orders. 
          This helps you stop relying on a fixed script.
          <br />
          <span className="italic mt-2 block">Bu alternatif sıraları takip ederek hikayenizden bahsetmeyi deneyin. Bu, sabit bir metne bağlı kalmanızı engeller.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {orders.map((order, idx) => (
          <Card key={idx} className="bg-white border-2 border-slate-50 hover:border-teal-100 transition-colors">
            <CardHeader titleEn={`Order Option ${idx + 1}`} titleTr={`Sıralama Seçeneği ${idx + 1}`} icon={<Shuffle size={18} />} />
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {order.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-teal-700 text-white font-black rounded-full text-xs shrink-0">
                      {i + 1}
                    </div>
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-50">
                <p className="text-[10px] uppercase font-black text-slate-400 mb-2">GUIDE / REHBER</p>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  Start with {order[0]}, move through {order[1]}, and conclude with {order[order.length - 1]}.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
