
import React from 'react';
import { DETERGENTS } from '../constants';
import { getDetergentResult } from '../utils/calculators';
import { Droplet, Info } from 'lucide-react';

interface DetergentListProps {
  kg: number;
}

const DetergentList: React.FC<DetergentListProps> = ({ kg }) => {
  return (
    <div className="flex flex-col gap-3 w-full pb-8">
      {DETERGENTS.map((det) => {
        const result = getDetergentResult(kg, det.points, det.capSize);
        return (
          <div 
            key={det.id} 
            className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex items-center gap-4 active:bg-slate-50 transition-colors"
          >
            {/* Visual Brand Block */}
            <div className={`w-14 h-20 shrink-0 ${det.color} rounded-2xl relative shadow-md flex items-center justify-center text-white overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <Droplet className="w-6 h-6 z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/20 rounded-b-lg" />
            </div>

            {/* Info Block */}
            <div className="flex-1">
                <h3 className="text-base font-black text-slate-800 tracking-tight">{det.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Recom.</span>
                   <span className="text-sm font-black text-blue-600">{result.ml.toFixed(0)}<span className="text-[10px] ml-0.5">ml</span></span>
                </div>
            </div>
            
            {/* Result Block: Big Cap Numbers */}
            <div className="bg-slate-100/50 px-4 py-2 rounded-2xl border border-slate-100/50 flex flex-col items-center justify-center min-w-[90px]">
                <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-black text-slate-800 tabular-nums">
                        {result.caps.toFixed(1)}
                    </span>
                    <span className="text-xs font-black text-slate-400">컵</span>
                </div>
                <div className="text-[8px] font-black text-blue-500/60 uppercase tracking-widest mt-0.5">
                    {det.capSize}ml Cap
                </div>
            </div>
          </div>
        );
      })}
      
      {/* Disclaimer / Guide */}
      <div className="mt-4 p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3">
         <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
         <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
            세제 제조사의 표준 투여량 데이터를 기반으로 한 자동 계산 결과입니다. 세탁물이 많이 오염된 경우 약 10~20% 더 추가해 주세요.
         </p>
      </div>
    </div>
  );
};

export default DetergentList;
