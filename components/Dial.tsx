
import React from 'react';
import { useTickSound } from './SoundEffect';

interface DialProps {
  level: number;
  setLevel: (val: number) => void;
  max: number;
}

const Dial: React.FC<DialProps> = ({ level, setLevel, max }) => {
  const playTick = useTickSound();

  const handleLevelChange = (newLevel: number) => {
    if (newLevel !== level) {
      playTick();
      // Add haptic feedback for mobile
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      setLevel(newLevel);
    }
  };

  const rotation = (level - 1) * (180 / (max - 1)) - 90;

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      {/* Dial Knob Visualization */}
      <div className="relative w-48 h-48 bg-slate-50 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border-4 border-white flex items-center justify-center">
        {/* Scale Markers */}
        {[...Array(max)].map((_, i) => {
          const deg = i * (180 / (max - 1)) - 90;
          const isActive = level === i + 1;
          return (
            <div
              key={i}
              className="absolute w-full h-full pointer-events-none"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div className="flex flex-col items-center mt-2">
                 <div className={`w-1 h-3 rounded-full transition-all duration-300 ${isActive ? 'bg-blue-500 scale-y-125' : 'bg-slate-200'}`} />
                 <span className={`mt-1 text-[10px] font-black transition-all duration-300 ${isActive ? 'text-blue-600 scale-125' : 'text-slate-300'}`}>
                    {i + 1}
                 </span>
              </div>
            </div>
          );
        })}

        {/* Inner Knob */}
        <div 
          className="w-32 h-32 bg-white rounded-full shadow-lg border border-slate-100 relative cursor-pointer active:scale-95 transition-all duration-300 ease-out flex items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={() => handleLevelChange((level % max) + 1)}
        >
          {/* Indicator Grip */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-8 bg-blue-500 rounded-full shadow-sm" />
          
          {/* Center Text */}
          <div className="transform" style={{ transform: `rotate(${-rotation}deg)` }}>
             <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-slate-800 leading-none">{level}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Level</span>
             </div>
          </div>
        </div>
      </div>

      {/* Direct Level Select - Pill Shaped */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 shadow-inner">
        {[...Array(max)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleLevelChange(i + 1)}
            className={`w-10 h-10 rounded-xl text-sm font-black transition-all duration-200 ${
              level === i + 1 
              ? 'bg-white text-blue-600 shadow-sm scale-105' 
              : 'text-slate-400 hover:text-slate-600 active:bg-slate-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dial;
