import React from 'react';
import { GameState } from '../types';

interface EndScreenProps {
  gameState: GameState;
  score: number; // Max level reached
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ gameState, score, onRestart }) => {
  const isVictory = gameState === GameState.VICTORY;
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-fade-in">
       <div className="max-w-xl w-full bg-club-blue/20 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden">
         {/* Background Glow */}
         <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 blur-[80px] rounded-full ${isVictory ? 'bg-club-gold' : 'bg-club-danger'}`}></div>

         <h2 className={`relative text-5xl md:text-7xl font-display font-black mb-6 ${isVictory ? 'text-club-gold' : 'text-white'}`}>
           {isVictory ? '1% CLUB' : 'ELIMINATED'}
         </h2>

         <p className="relative text-xl text-gray-300 mb-8">
           {isVictory 
             ? "Congratulations. You have proven you possess elite reasoning skills." 
             : `You made it to the ${score}% question. That's better than ${100 - score}% of people.`}
         </p>

         {isVictory && (
           <div className="relative mb-8 p-6 bg-club-gold/10 border border-club-gold/30 rounded-xl">
             <div className="text-4xl">🏆</div>
             <p className="text-club-gold font-bold mt-2">Certified Genius</p>
           </div>
         )}

         <button 
           onClick={onRestart}
           className="relative px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-club-accent transition-colors"
         >
           Try Again
         </button>
       </div>
    </div>
  );
};
