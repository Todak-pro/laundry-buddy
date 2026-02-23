import React from 'react';
import { DETERGENTS } from '../constants';
import { getDetergentResult } from '../utils/calculators';
import { Droplet, Info } from 'lucide-react';

interface DetergentListProps { kg: number; }

const DetergentList: React.FC<DetergentListProps> = ({ kg }) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full pb-8">
      {DETERGENTS.map((det) => {
        const result = getDetergentResult(kg, det);
        return (
          <div key={det.id} className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100 flex flex-col items-center gap-3 active:bg-slate-50 transition-colors text-center">
            <div className={`w-12 h-16 shrink-0 ${det.color} rounded-2xl relative shadow-md flex items-center justify-center text-white overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
                <Droplet className="w-5 h-5 z-10" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-black/20 rounded-b-md" />
            </div>
            <div className="flex flex-col items-center w-full">
                <h3 className="text-sm font-black text-slate-800 tracking-tight truncate w-full">{det.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                   <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Recom.</span>
                   <span className="text-xs font-black text-blue-600">{result.ml.toFixed(0)}<span className="text-[9px] ml-0.5">ml</span></span>
                </div>
            </div>
            <div className="bg-slate-100/50 w-full py-2 rounded-xl border border-slate-100/50 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-black text-slate-800 tabular-nums">{result.caps.toFixed(1)}</span>
                    <span className="text-[10px] font-black text-slate-400">컵</span>
                </div>
                <div className="text-[8px] font-black text-blue-500/60 uppercase tracking-widest mt-0.5">{det.capSize}ml Cap</div>
            </div>
          </div>
        );
      })}
      <div className="col-span-2 mt-2 p-4 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-3">
         <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
         <p className="text-[10px] text-slate-500 font-bold leading-relaxed">세제 제조사의 표준 투여량 데이터를 기반으로 한 자동 계산 결과입니다.</p>
      </div>
    </div>
  );
};
export default DetergentList;