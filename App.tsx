
import React, { useState, useMemo, useEffect } from 'react';
import Dial from './components/Dial';
import WashingMachine from './components/WashingMachine';
import DetergentList from './components/DetergentList';
import { MAX_DIAL_LEVEL, TOTAL_CAPACITY_KG } from './constants';
import { Shirt, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  // Persistence: Load last used level from local storage
  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('laundry-buddy-level');
    return saved ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('laundry-buddy-level', level.toString());
  }, [level]);

  const currentKg = useMemo(() => {
    return (level * TOTAL_CAPACITY_KG) / MAX_DIAL_LEVEL;
  }, [level]);

  return (
    <div className="min-h-screen-custom bg-slate-50 text-slate-900 pb-12 overflow-x-hidden flex flex-col items-center">
      {/* Header Area */}
      <header className="pt-10 pb-4 px-4 w-full max-w-md text-center">
        <div className="inline-flex bg-blue-600 p-2.5 rounded-2xl shadow-lg mb-3 text-white">
          <Shirt size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800">
          세탁기는 <span className="text-blue-600">내친구</span>
        </h1>
        <p className="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest">
          Smart Detergent Calculator
        </p>
      </header>

      <main className="w-full max-w-md px-5 flex flex-col items-center">
        {/* Main Interface: Dial and Machine */}
        <section className="w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-6 flex flex-col items-center gap-8 mt-4 mb-8">
          <div className="flex flex-col items-center w-full">
             <div className="flex items-center space-x-2 text-slate-300 font-bold text-[9px] uppercase tracking-[0.3em] mb-4">
                <Settings2 size={12} />
                <span>Water Level Control</span>
             </div>
             <Dial level={level} setLevel={setLevel} max={MAX_DIAL_LEVEL} />
          </div>

          <div className="w-full flex justify-center pb-2">
            <WashingMachine level={level} max={MAX_DIAL_LEVEL} currentKg={currentKg} />
          </div>
        </section>

        {/* Results Section */}
        <div className="w-full space-y-4">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2 pl-2">
                <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
                추천 세제량
            </h2>
            <DetergentList kg={currentKg} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 mb-8 text-center px-6">
        <p className="text-[10px] font-black tracking-[0.2em] text-slate-300 uppercase">
          Laundry Buddy &bull; 16kg Capacity Optimized
        </p>
      </footer>
    </div>
  );
};

export default App;
