
import React from 'react';

interface WashingMachineProps {
  level: number;
  max: number;
  currentKg: number;
}

const WashingMachine: React.FC<WashingMachineProps> = ({ level, max, currentKg }) => {
  const waterHeightPercent = (level / max) * 100;

  return (
    <div className="relative w-64 h-72">
      {/* Outer Shell - Blueprint Style */}
      <div className="absolute inset-0 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl overflow-hidden">
        
        {/* Top Panel Detail */}
        <div className="absolute top-0 left-0 w-full h-12 bg-slate-50/50 backdrop-blur-sm border-b border-slate-100 z-20 flex items-center justify-between px-6">
            <div className="w-3 h-3 rounded-full bg-slate-200" />
            <div className="w-16 h-1.5 bg-slate-200 rounded-full" />
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-blue-400" />
                <div className="w-1 h-1 rounded-full bg-slate-200" />
            </div>
        </div>

        {/* Water Level Scales - Left & Right */}
        <div className="absolute inset-x-0 top-16 bottom-8 flex justify-between px-4 z-20 pointer-events-none">
           <div className="flex flex-col justify-between items-start opacity-20">
              {[...Array(max)].map((_, i) => (
                <div key={i} className="w-4 h-px bg-slate-400" />
              ))}
           </div>
           <div className="flex flex-col justify-between items-end text-[9px] font-black text-slate-300">
              {[...Array(max)].map((_, i) => (
                <div key={i} className="flex items-center gap-1">
                    <span className={level === max - i ? 'text-blue-500 scale-110' : ''}>{max - i}</span>
                    <div className={`h-1 rounded-full transition-all duration-500 ${level === max - i ? 'bg-blue-500 w-3' : 'bg-slate-200 w-1.5'}`} />
                </div>
              ))}
           </div>
        </div>

        {/* Glass Front Effect */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-br from-white/20 via-transparent to-black/[0.02]" />

        {/* Water Container */}
        <div 
          className="absolute bottom-0 left-0 w-full transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) bg-blue-400/10 overflow-hidden"
          style={{ height: `${waterHeightPercent}%` }}
        >
          {/* Animated Waves */}
          <div className="absolute top-0 left-0 w-[200%] h-full">
            <svg
              viewBox="0 0 120 28"
              preserveAspectRatio="none"
              className="absolute top-0 w-full h-8 animate-wave fill-blue-500/20"
            >
              <path d="M0 10C30 10 30 0 60 0C90 0 90 10 120 10V28H0V10Z" />
            </svg>
            <svg
              viewBox="0 0 120 28"
              preserveAspectRatio="none"
              className="absolute top-1 w-full h-8 animate-wave fill-blue-400/30"
              style={{ animationDirection: 'reverse', animationDuration: '6s' }}
            >
              <path d="M0 10C30 10 30 0 60 0C90 0 90 10 120 10V28H0V10Z" />
            </svg>
          </div>
          
          {/* Bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute bg-white/40 rounded-full animate-pulse"
                 style={{
                   width: Math.random() * 6 + 2 + 'px',
                   height: Math.random() * 6 + 2 + 'px',
                   left: Math.random() * 100 + '%',
                   bottom: Math.random() * 90 + '%',
                   animationDuration: (Math.random() * 3 + 2) + 's',
                   animationDelay: Math.random() * 5 + 's'
                 }}
               />
            ))}
          </div>
        </div>
      </div>

      {/* Weight Badge */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-slate-800 text-white px-5 py-2 rounded-2xl shadow-xl flex items-center gap-2 whitespace-nowrap">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Capacity</span>
            <span className="text-lg font-black">{currentKg.toFixed(1)}kg</span>
        </div>
      </div>
    </div>
  );
};

export default WashingMachine;
