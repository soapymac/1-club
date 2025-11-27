import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in">
      <div className="mb-12 relative">
        <div className="absolute inset-0 bg-club-accent blur-[100px] opacity-20 rounded-full animate-pulse-slow"></div>
        <h1 className="relative text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 font-display tracking-tighter drop-shadow-lg">
          THE <span className="text-club-accent">1%</span> CLUB
        </h1>
        <p className="relative mt-4 text-xl md:text-2xl text-club-accent font-light tracking-[0.2em] uppercase">
          Logic &bull; Reasoning &bull; Survival
        </p>
      </div>

      <div className="max-w-2xl space-y-8 z-10">
        <p className="text-gray-300 text-lg leading-relaxed">
          Welcome to the ultimate test of logic. The questions start easy—answerable by 
          <span className="font-bold text-white"> 90%</span> of the country—but they get progressively harder.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400 mb-8">
          <div className="bg-club-blue/30 p-4 rounded-xl border border-club-blue/50 backdrop-blur-sm">
            <div className="text-club-gold text-xl font-bold mb-2">11 Levels</div>
            Progress from 90% down to the elite 1%.
          </div>
          <div className="bg-club-blue/30 p-4 rounded-xl border border-club-blue/50 backdrop-blur-sm">
            <div className="text-club-gold text-xl font-bold mb-2">One Life</div>
            Make a mistake, and the game is over.
          </div>
          <div className="bg-club-blue/30 p-4 rounded-xl border border-club-blue/50 backdrop-blur-sm">
            <div className="text-club-gold text-xl font-bold mb-2">Time Limit</div>
            Think fast. The clock is always ticking.
          </div>
        </div>

        <button 
          onClick={onStart}
          className="group relative px-12 py-5 bg-transparent overflow-hidden rounded-full font-bold text-xl tracking-widest text-white transition-all duration-300 hover:scale-105"
        >
           <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-club-accent to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></span>
           <span className="relative flex items-center justify-center gap-3">
             ENTER THE CLUB
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </span>
        </button>
      </div>
    </div>
  );
};
